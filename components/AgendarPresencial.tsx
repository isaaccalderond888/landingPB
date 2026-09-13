"use client";

import { useState } from "react";

/**
 * Solicitud de cita presencial en Clínica Newman.
 *
 * No es un selector de horarios: el flujo es diferido a propósito. La persona
 * deja su preferencia, el bot consulta la agenda real —donde los consultorios
 * son compartidos con otros terapeutas— y propone horarios por WhatsApp.
 * Prometer disponibilidad en vivo exigiría una arquitectura distinta y
 * arriesgaría ofrecer huecos que otro terapeuta ya ocupó.
 */

const SERVICIOS = [
  { valor: "Sesión Orientativa", etiqueta: "Sesión orientativa", detalle: "45 min · sin costo" },
  { valor: "Sesión de Psicoterapia", etiqueta: "Sesión de psicoterapia", detalle: "1 h · $1,500" },
  { valor: "Sesión Neurofeedback", etiqueta: "Sesión de neurofeedback", detalle: "1 h · $800" },
  { valor: "Mapeo QEEG", etiqueta: "Mapeo QEEG", detalle: "1 h 30 min · $2,000" },
];

const DIAS = [
  { valor: "lun", etiqueta: "Lun" },
  { valor: "mar", etiqueta: "Mar" },
  { valor: "mie", etiqueta: "Mié" },
  { valor: "jue", etiqueta: "Jue" },
  { valor: "vie", etiqueta: "Vie" },
];

const FRANJAS = [
  { valor: "manana", etiqueta: "Mañana" },
  { valor: "tarde", etiqueta: "Tarde" },
  { valor: "indistinto", etiqueta: "Indistinto" },
];

export default function AgendarPresencial() {
  const [abierto, setAbierto] = useState(false);
  const [servicio, setServicio] = useState(SERVICIOS[0].valor);
  const [form, setForm] = useState({ nombre: "", apellido: "", telefono: "", correo: "" });
  const [dias, setDias] = useState<string[]>([]);
  const [franja, setFranja] = useState("indistinto");
  const [nota, setNota] = useState("");
  const [consiente, setConsiente] = useState(false);
  const [estado, setEstado] = useState<"idle" | "enviando" | "enviado" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  function set(campo: keyof typeof form, valor: string) {
    setForm((prev) => ({ ...prev, [campo]: valor }));
  }

  function alternarDia(d: string) {
    setDias((prev) => (prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]));
  }

  /** Acepta lo que la gente escribe y lo normaliza a E.164 mexicano. */
  function telefonoE164(valor: string): string | null {
    const d = valor.replace(/\D/g, "");
    if (d.length === 10) return `+52${d}`;
    if (d.length === 12 && d.startsWith("52")) return `+${d}`;
    if (d.length === 13 && d.startsWith("521")) return `+52${d.slice(3)}`;
    return null;
  }

  const telOk = telefonoE164(form.telefono) !== null;
  const valido =
    !!form.nombre.trim() &&
    !!form.apellido.trim() &&
    telOk &&
    /\S+@\S+\.\S+/.test(form.correo) &&
    dias.length > 0 &&
    consiente;

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    if (!valido || estado === "enviando") return;
    setEstado("enviando");
    setError(null);

    try {
      const res = await fetch("/api/agendar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          servicio,
          nombre: form.nombre,
          apellido: form.apellido,
          telefono: telefonoE164(form.telefono),
          correo: form.correo,
          dias_preferidos: dias,
          franja,
          nota,
          consiente,
          consentimiento_at: new Date().toISOString(),
        }),
      });

      if (!res.ok) {
        const { error: msg } = await res.json().catch(() => ({ error: null }));
        setError(msg ?? "No se pudo enviar. Intenta de nuevo.");
        setEstado("error");
        return;
      }
      setEstado("enviado");
    } catch {
      setError("No se pudo enviar. Revisa tu conexión e intenta de nuevo.");
      setEstado("error");
    }
  }

  if (estado === "enviado") {
    return (
      <div className="border border-brand-mint/25 bg-brand-mint/5 rounded-sm p-6 space-y-2">
        <p className="text-brand-mint text-sm font-medium tracking-wide">Solicitud recibida</p>
        <p className="text-sm opacity-60 leading-relaxed">
          Te escribo por WhatsApp con dos o tres horarios que encajen con lo que elegiste.
          Si prefieres adelantar algo, el número está abajo.
        </p>
      </div>
    );
  }

  const campo =
    "w-full bg-foreground/5 border border-foreground/15 rounded-sm px-3 py-2.5 text-sm text-foreground placeholder:text-foreground/35 focus:outline-none focus:border-brand-teal/50 transition-colors";

  return (
    <div className="border-t border-foreground/10">
      <button
        onClick={() => setAbierto((a) => !a)}
        className="w-full flex items-center justify-between py-5 text-left"
        aria-expanded={abierto}
      >
        <div className="flex items-center gap-4">
          <span className="text-lg w-5 text-center flex-shrink-0 text-brand-mint" aria-hidden="true">◈</span>
          <div>
            <span className="font-display text-lg leading-snug">Cita presencial</span>
            <span className="ml-3 font-sans text-xs tracking-wide text-foreground/50">
              Clínica Newman · Lomas de Chapultepec
            </span>
          </div>
        </div>
        <svg
          className={`w-4 h-4 opacity-40 transition-transform duration-200 flex-shrink-0 ${abierto ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {abierto && (
        <form onSubmit={enviar} className="pb-7 pl-9 space-y-5 max-w-lg">
          <p className="text-sm leading-relaxed text-foreground/65">
            Los consultorios se comparten con el resto del equipo, así que los horarios no
            se pueden mostrar aquí en vivo. Dime qué te acomoda y te escribo por WhatsApp
            con opciones reales.
          </p>

          <div className="space-y-1.5">
            <label htmlFor="servicio" className="text-xs opacity-40 tracking-wide block">Servicio</label>
            <select id="servicio" value={servicio} onChange={(e) => setServicio(e.target.value)} className={campo}>
              {SERVICIOS.map((s) => (
                <option key={s.valor} value={s.valor}>{s.etiqueta} — {s.detalle}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="nombre" className="text-xs opacity-40 tracking-wide block">Nombre *</label>
              <input id="nombre" type="text" required value={form.nombre}
                onChange={(e) => set("nombre", e.target.value)} placeholder="Juan" className={campo} />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="apellido" className="text-xs opacity-40 tracking-wide block">Apellido *</label>
              <input id="apellido" type="text" required value={form.apellido}
                onChange={(e) => set("apellido", e.target.value)} placeholder="García" className={campo} />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="telefono" className="text-xs opacity-40 tracking-wide block">
              WhatsApp * <span className="opacity-50">(diez dígitos)</span>
            </label>
            <input id="telefono" type="tel" required value={form.telefono}
              onChange={(e) => set("telefono", e.target.value)} placeholder="55 0000 0000" className={campo} />
            {form.telefono.length > 0 && !telOk && (
              <p className="text-xs text-foreground/45">Escríbelo a diez dígitos, sin lada internacional.</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="correo" className="text-xs opacity-40 tracking-wide block">Correo electrónico *</label>
            <input id="correo" type="email" required value={form.correo}
              onChange={(e) => set("correo", e.target.value)} placeholder="correo@ejemplo.com" className={campo} />
          </div>

          <fieldset className="space-y-2">
            <legend className="text-xs opacity-40 tracking-wide">Días que te acomodan *</legend>
            <div className="flex flex-wrap gap-2">
              {DIAS.map((d) => {
                const activo = dias.includes(d.valor);
                return (
                  <button key={d.valor} type="button" onClick={() => alternarDia(d.valor)}
                    aria-pressed={activo}
                    className={`px-3.5 py-2 text-xs rounded-sm border transition-colors ${
                      activo
                        ? "border-brand-teal bg-brand-teal/15 text-interactive-text"
                        : "border-foreground/15 text-foreground/55 hover:border-foreground/30"
                    }`}>
                    {d.etiqueta}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <fieldset className="space-y-2">
            <legend className="text-xs opacity-40 tracking-wide">Franja</legend>
            <div className="flex flex-wrap gap-2">
              {FRANJAS.map((f) => (
                <button key={f.valor} type="button" onClick={() => setFranja(f.valor)}
                  aria-pressed={franja === f.valor}
                  className={`px-3.5 py-2 text-xs rounded-sm border transition-colors ${
                    franja === f.valor
                      ? "border-brand-teal bg-brand-teal/15 text-interactive-text"
                      : "border-foreground/15 text-foreground/55 hover:border-foreground/30"
                  }`}>
                  {f.etiqueta}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="space-y-1.5">
            <label htmlFor="nota" className="text-xs opacity-40 tracking-wide block">
              Algo práctico que deba saber <span className="opacity-50">(opcional)</span>
            </label>
            <input id="nota" type="text" maxLength={280} value={nota}
              onChange={(e) => setNota(e.target.value)}
              placeholder="Accesibilidad, restricciones de horario…" className={campo} />
            <p className="text-xs opacity-30 leading-relaxed">
              Para avisos prácticos. Lo que te trae lo conversamos en sesión, no por aquí.
            </p>
          </div>

          <label className="flex items-start gap-3 cursor-pointer group">
            <input type="checkbox" checked={consiente}
              onChange={(e) => setConsiente(e.target.checked)}
              className="mt-0.5 w-4 h-4 flex-shrink-0 accent-brand-teal cursor-pointer" />
            <span className="text-xs leading-relaxed opacity-60 group-hover:opacity-80 transition-opacity">
              Autorizo que uses mis datos de contacto para proponerme horarios, y que se
              transfieran a Clínica Newman para crear la cita. He leído el{" "}
              <a href="/privacidad" target="_blank" rel="noopener noreferrer"
                className="text-interactive-text underline underline-offset-2"
                onClick={(e) => e.stopPropagation()}>
                aviso de privacidad
              </a>.
            </span>
          </label>

          {estado === "error" && error && (
            <p className="text-xs text-red-400 opacity-80">{error}</p>
          )}

          <button type="submit" disabled={!valido || estado === "enviando"}
            className={`w-full py-3 text-sm tracking-widest uppercase font-medium transition-all duration-200 rounded-sm ${
              valido && estado !== "enviando"
                ? "bg-brand-teal text-white hover:opacity-85 cursor-pointer"
                : "bg-foreground/10 opacity-30 cursor-not-allowed"
            }`}>
            {estado === "enviando" ? "Enviando…" : "Pedir horarios"}
          </button>
        </form>
      )}
    </div>
  );
}
