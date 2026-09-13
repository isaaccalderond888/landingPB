import { Resend } from "resend";
import { NextRequest } from "next/server";
import { clientIp, rateLimit, tooManyRequests } from "@/lib/rateLimit";

const ISAAC_EMAIL = "psic@isaaccalderon.me";
// Remitente ya verificado en Resend para este dominio. Cambiarlo por otra
// dirección @isaaccalderon.me funciona, pero conviene probar el envío después.
const FROM_EMAIL = "evaluaciones@isaaccalderon.me";

const GUIA = {
  archivo: "/guias/Guia-Preparacion-Integracion.pdf",
  titulo: "Preparación e integración",
};

const HORA = 60 * 60 * 1000;
const DIA = 24 * HORA;

/** Descargas por IP y por hora. */
const POR_IP = { max: 5, windowMs: HORA };
/** Tope global diario — el formulario es público y sin autenticación. */
const GLOBAL = { max: 300, windowMs: DIA };

/**
 * Entrega la guía a cambio de un correo.
 *
 * El correo tiene UNA sola finalidad, declarada por Isaac: entregar este PDF.
 * No se guarda en base de datos, no alimenta ninguna lista y no se usa para
 * escribir después. Si eso cambia alguna vez, deja de ser finalidad primaria
 * y hay que pedir consentimiento aparte — no basta con editar este archivo.
 */
export async function POST(req: NextRequest) {
  const porIp = rateLimit(`descargar-guia:${clientIp(req)}`, POR_IP);
  if (!porIp.ok) {
    return tooManyRequests(
      porIp.retryAfter,
      "Ya pediste la guía varias veces seguidas. Espera un momento o escribe a psic@isaaccalderon.me."
    );
  }

  const global = rateLimit("descargar-guia:global", GLOBAL);
  if (!global.ok) {
    return tooManyRequests(
      global.retryAfter,
      "La descarga no está disponible en este momento. Escribe a psic@isaaccalderon.me y te la envío."
    );
  }

  let correo: unknown;
  try {
    ({ correo } = await req.json());
  } catch {
    return Response.json({ error: "No se pudo leer la solicitud." }, { status: 400 });
  }

  if (typeof correo !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(correo.trim())) {
    return Response.json({ error: "Escribe un correo válido." }, { status: 400 });
  }
  const destinatario = correo.trim().toLowerCase();

  const base = `https://${req.headers.get("host") ?? "www.isaaccalderon.me"}`;
  const enlace = `${base}${GUIA.archivo}`;

  // El envío no debe bloquear la descarga: si el correo falla, la persona ya
  // pidió la guía y merece recibirla igual. Por eso se responde ok en ambos casos.
  if (process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY);

    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: destinatario,
        subject: `Tu guía: ${GUIA.titulo}`,
        html: correoParaLaPersona(enlace),
      });
    } catch (err) {
      console.error("Resend (persona):", err);
    }

    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: ISAAC_EMAIL,
        subject: `[Guía descargada] ${destinatario}`,
        html: correoParaIsaac(destinatario),
      });
    } catch (err) {
      console.error("Resend (aviso):", err);
    }
  }

  return Response.json({ ok: true, archivo: GUIA.archivo });
}

function correoParaLaPersona(enlace: string): string {
  return `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#0b1830;font-family:Georgia,serif;color:#c8d0e0">
  <div style="max-width:560px;margin:0 auto;padding:40px 24px">
    <p style="font-size:11px;letter-spacing:.15em;text-transform:uppercase;color:#EAD06A;margin:0 0 10px">Isaac Calderón Derat</p>
    <h1 style="font-size:26px;color:#eef2ec;margin:0 0 20px;font-weight:normal">Preparación e integración</h1>
    <p style="font-size:15px;line-height:1.7;margin:0 0 24px">Aquí tienes la guía. Está pensada para leerse sin prisa y para volver a ella en distintos momentos del proceso.</p>
    <p style="margin:0 0 28px">
      <a href="${enlace}" style="display:inline-block;background:#EAD06A;color:#0b1830;padding:13px 26px;text-decoration:none;font-size:14px;font-weight:bold;border-radius:3px">Descargar la guía (PDF)</a>
    </p>
    <p style="font-size:14px;line-height:1.7;margin:0 0 24px">Si algo de lo que aparece ahí necesita ser conversado, escríbeme respondiendo a este correo.</p>
    <p style="font-size:12px;color:#9BBDC2;line-height:1.6;border-top:1px solid #1e2a4a;padding-top:18px;margin:0">
      Usé tu correo únicamente para enviarte esta guía. No te voy a escribir para nada más y no estás suscrito a ninguna lista.
    </p>
  </div>
</body></html>`;
}

function correoParaIsaac(destinatario: string): string {
  const cuando = new Date().toLocaleString("es-MX", { timeZone: "America/Mexico_City" });
  return `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#0b1830;font-family:Georgia,serif;color:#c8d0e0">
  <div style="max-width:560px;margin:0 auto;padding:36px 24px">
    <p style="font-size:11px;letter-spacing:.15em;text-transform:uppercase;color:#EAD06A;margin:0 0 8px">Guía descargada</p>
    <h1 style="font-size:22px;color:#eef2ec;margin:0 0 24px;font-weight:normal">Preparación e integración</h1>
    <table style="width:100%;border-collapse:collapse;font-size:14px">
      <tr><td style="padding:6px 0;color:#9BBDC2;width:90px">Correo</td><td style="padding:6px 0"><a href="mailto:${destinatario}" style="color:#EAD06A">${destinatario}</a></td></tr>
      <tr><td style="padding:6px 0;color:#9BBDC2">Cuándo</td><td style="padding:6px 0;color:#eef2ec">${cuando}</td></tr>
    </table>
    <p style="font-size:12px;color:#4a5578;line-height:1.6;border-top:1px solid #1e2a4a;padding-top:16px;margin:24px 0 0">
      Este correo es el único registro: no se guarda en ninguna base de datos.
    </p>
  </div>
</body></html>`;
}
