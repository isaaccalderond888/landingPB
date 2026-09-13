import { NextRequest } from "next/server";
import { clientIp, rateLimit, tooManyRequests } from "@/lib/rateLimit";

/**
 * Solicitud de cita PRESENCIAL en Clínica Newman.
 *
 * No reserva nada: entrega el lead al webhook de Prefrontis, que consulta
 * huecos en AgendaPro y propone horarios por WhatsApp. La reserva la crea
 * después Manitas en la interfaz de AgendaPro. Por eso la respuesta al
 * navegador no trae horarios — el flujo es diferido por diseño.
 *
 * Lo online va por Calendly y no pasa por aquí.
 */

const HORA = 60 * 60 * 1000;
const DIA = 24 * HORA;

/** Solicitudes por IP y por hora. */
const POR_IP = { max: 3, windowMs: HORA };
/** Tope global diario — el destino es el WhatsApp de Isaac, no un buzón anónimo. */
const GLOBAL = { max: 40, windowMs: DIA };

/** Nombres exactos de AgendaPro. El bot opera la interfaz, así que deben coincidir. */
const SERVICIOS = [
  "Mapeo QEEG",
  "Sesión Neurofeedback",
  "Sesión Orientativa",
  "Sesión de Psicoterapia",
] as const;

const FRANJAS = ["manana", "tarde", "indistinto"] as const;
const DIAS = ["lun", "mar", "mie", "jue", "vie"] as const;

/** E.164 mexicano: +52 y diez dígitos. */
const TELEFONO = /^\+52\d{10}$/;
const CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface Solicitud {
  servicio?: string;
  nombre?: string;
  apellido?: string;
  telefono?: string;
  correo?: string;
  dias_preferidos?: string[];
  franja?: string;
  nota?: string;
  consiente?: boolean;
  consentimiento_at?: string;
}

export async function POST(req: NextRequest) {
  const porIp = rateLimit(`agendar:${clientIp(req)}`, POR_IP);
  if (!porIp.ok) {
    return tooManyRequests(
      porIp.retryAfter,
      "Ya enviaste varias solicitudes. Espera un momento o escríbeme directamente por WhatsApp."
    );
  }

  const global = rateLimit("agendar:global", GLOBAL);
  if (!global.ok) {
    return tooManyRequests(
      global.retryAfter,
      "Las solicitudes no están disponibles en este momento. Escríbeme por WhatsApp."
    );
  }

  let body: Solicitud;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "JSON inválido" }, { status: 400 });
  }

  const { servicio, nombre, apellido, telefono, correo, franja, nota } = body;
  const dias = body.dias_preferidos;

  if (!nombre?.trim() || !apellido?.trim()) {
    return Response.json({ error: "Falta tu nombre" }, { status: 400 });
  }
  if (!servicio || !SERVICIOS.includes(servicio as (typeof SERVICIOS)[number])) {
    return Response.json({ error: "Servicio no reconocido" }, { status: 400 });
  }
  if (!telefono || !TELEFONO.test(telefono)) {
    return Response.json(
      { error: "El teléfono debe ir a diez dígitos, con lada de México" },
      { status: 400 }
    );
  }
  if (!correo || !CORREO.test(correo)) {
    return Response.json({ error: "Revisa tu correo electrónico" }, { status: 400 });
  }
  if (!franja || !FRANJAS.includes(franja as (typeof FRANJAS)[number])) {
    return Response.json({ error: "Elige una franja horaria" }, { status: 400 });
  }
  if (!Array.isArray(dias) || dias.length === 0 || dias.some((d) => !DIAS.includes(d as (typeof DIAS)[number]))) {
    return Response.json({ error: "Elige al menos un día" }, { status: 400 });
  }

  // Agendar transfiere datos de contacto a Clínica Newman, que los trata como
  // responsable propio. El aviso de privacidad lo declara y aquí se exige.
  if (body.consiente !== true) {
    return Response.json(
      { error: "Falta tu consentimiento para tratar y transferir tus datos de contacto" },
      { status: 400 }
    );
  }

  const url = process.env.GROK_WEBHOOK_URL;
  const key = process.env.GROK_WEBHOOK_KEY;
  if (!url || !key) {
    console.error("Falta GROK_WEBHOOK_URL o GROK_WEBHOOK_KEY");
    return Response.json(
      { error: "El agendado no está disponible ahora. Escríbeme por WhatsApp." },
      { status: 503 }
    );
  }

  // `request_id` lo genera el servidor, no el cliente: el bot lo usa para
  // ignorar duplicados y no queremos que nadie lo fije desde fuera.
  const payload = {
    request_id: crypto.randomUUID(),
    servicio,
    nombre: nombre.trim(),
    apellido: apellido.trim(),
    telefono,
    correo: correo.trim().toLowerCase(),
    dias_preferidos: dias,
    franja,
    // Avisos prácticos, no motivo de consulta: se recorta para que no acabe
    // siendo un relato clínico viajando por WhatsApp.
    nota: (nota ?? "").trim().slice(0, 280),
    consentimiento_at: body.consentimiento_at ?? new Date().toISOString(),
    origen: "isaaccalderon.me",
    callback_url: null,
  };

  try {
    const r = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10_000),
    });

    if (!r.ok) {
      console.error("Webhook de Prefrontis respondió", r.status);
      return Response.json(
        { error: "No se pudo registrar tu solicitud. Escríbeme por WhatsApp." },
        { status: 502 }
      );
    }

    return Response.json({ ok: true, request_id: payload.request_id });
  } catch (err) {
    console.error("Error llamando al webhook:", err);
    return Response.json(
      { error: "No se pudo registrar tu solicitud. Escríbeme por WhatsApp." },
      { status: 502 }
    );
  }
}
