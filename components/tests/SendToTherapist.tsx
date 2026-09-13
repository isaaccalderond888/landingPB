"use client";

import { useState } from "react";
import type { TestId } from "@/lib/testData";

interface Props {
  testId: TestId;
  score: number;
  answers: number[];
  aiText?: string;
}

export default function SendToTherapist({ testId, score, answers, aiText }: Props) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ nombre: "", apellido: "", telefono: "", correo: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  // Las respuestas de un instrumento clínico son datos personales sensibles:
  // la LFPDPPP exige consentimiento expreso, no inferido del uso del formulario.
  const [consiente, setConsiente] = useState(false);

  function set(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  const valid =
    !!form.nombre.trim() &&
    !!form.apellido.trim() &&
    /\S+@\S+\.\S+/.test(form.correo) &&
    consiente;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid) return;
    setStatus("sending");
    setErrorMsg(null);

    try {
      const res = await fetch("/api/send-results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, testId, score, answers, aiText }),
      });

      if (!res.ok) {
        // 429: el servidor explica por qué; en el resto, mensaje genérico.
        const { error } = await res.json().catch(() => ({ error: null }));
        setErrorMsg(res.status === 429 ? error ?? null : null);
        setStatus("error");
        return;
      }

      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="border border-brand-mint/20 bg-brand-mint/5 rounded-sm p-6 space-y-2">
        <p className="text-brand-mint text-sm font-medium tracking-wide">Resultados enviados</p>
        <p className="text-sm opacity-55 leading-relaxed">
          Isaac recibirá tus resultados y se pondrá en contacto contigo pronto.
        </p>
      </div>
    );
  }

  return (
    <div className="relative rounded-sm overflow-hidden border border-brand-teal/35 bg-brand-teal/[0.04] shadow-[0_0_24px_rgba(37,109,134,0.08)]">
      {/* Glow animado en el borde */}
      <div className="pointer-events-none absolute inset-0 rounded-sm animate-pulse ring-1 ring-brand-teal/20" />

      {/* Header / toggle */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="relative w-full flex items-center justify-between px-6 py-5 text-left hover:bg-brand-teal/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-brand-teal animate-pulse flex-shrink-0" />
          <div>
            <p className="text-sm font-medium tracking-wide">Enviar resultados al terapeuta</p>
            <p className="text-xs opacity-40 mt-0.5">Isaac recibirá un resumen de esta evaluación</p>
          </div>
        </div>
        <span className={`text-brand-teal text-xl transition-transform duration-200 ${open ? "rotate-45" : ""}`}>+</span>
      </button>

      {/* Form */}
      {open && (
        <form onSubmit={handleSubmit} className="px-6 pb-6 pt-2 space-y-4 border-t border-foreground/8">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs opacity-40 tracking-wide">Nombre *</label>
              <input
                type="text"
                value={form.nombre}
                onChange={(e) => set("nombre", e.target.value)}
                placeholder="Juan"
                required
                className="w-full bg-foreground/5 border border-foreground/15 rounded-sm px-3 py-2.5 text-sm text-foreground placeholder:text-foreground/35 focus:outline-none focus:border-brand-teal/50 transition-colors"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs opacity-40 tracking-wide">Apellido *</label>
              <input
                type="text"
                value={form.apellido}
                onChange={(e) => set("apellido", e.target.value)}
                placeholder="García"
                required
                className="w-full bg-foreground/5 border border-foreground/15 rounded-sm px-3 py-2.5 text-sm text-foreground placeholder:text-foreground/35 focus:outline-none focus:border-brand-teal/50 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs opacity-40 tracking-wide">Correo electrónico *</label>
            <input
              type="email"
              value={form.correo}
              onChange={(e) => set("correo", e.target.value)}
              placeholder="correo@ejemplo.com"
              required
              className="w-full bg-foreground/5 border border-foreground/15 rounded-sm px-3 py-2.5 text-sm text-foreground placeholder:text-foreground/35 focus:outline-none focus:border-brand-teal/50 transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs opacity-40 tracking-wide">Teléfono <span className="opacity-50">(opcional)</span></label>
            <input
              type="tel"
              value={form.telefono}
              onChange={(e) => set("telefono", e.target.value)}
              placeholder="+52 55 0000 0000"
              className="w-full bg-foreground/5 border border-foreground/15 rounded-sm px-3 py-2.5 text-sm text-foreground placeholder:text-foreground/35 focus:outline-none focus:border-brand-teal/50 transition-colors"
            />
          </div>

          {status === "error" && (
            <p className="text-xs text-red-400 opacity-80">
              {errorMsg ?? (
                <>
                  No se pudo enviar. Intenta de nuevo o escribe a{" "}
                  <a href="mailto:psic@isaaccalderon.me" className="underline underline-offset-2">psic@isaaccalderon.me</a>.
                </>
              )}
            </p>
          )}

          <button
            type="submit"
            disabled={!valid || status === "sending"}
            className={`w-full py-3 text-sm tracking-widest uppercase font-medium transition-all duration-200 rounded-sm
              ${valid && status !== "sending"
                ? "bg-brand-teal text-white hover:opacity-85 cursor-pointer"
                : "bg-foreground/10 opacity-30 cursor-not-allowed"
              }`}
          >
            {status === "sending" ? "Enviando…" : "Enviar resultados"}
          </button>

          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={consiente}
              onChange={(e) => setConsiente(e.target.checked)}
              className="mt-0.5 w-4 h-4 flex-shrink-0 accent-brand-teal cursor-pointer"
            />
            <span className="text-xs leading-relaxed opacity-60 group-hover:opacity-80 transition-opacity">
              Doy mi consentimiento expreso para que Isaac reciba y trate mis respuestas a
              esta evaluación, que son datos personales sensibles de salud, con la finalidad
              de leerlas y ponerse en contacto conmigo. He leído el{" "}
              <a
                href="/privacidad"
                target="_blank"
                rel="noopener noreferrer"
                className="text-interactive-text underline underline-offset-2"
                onClick={(e) => e.stopPropagation()}
              >
                aviso de privacidad
              </a>
              .
            </span>
          </label>

          <p className="text-xs opacity-25 leading-relaxed">
            Tus datos se usan únicamente para que Isaac pueda contactarte. No se comparten
            con terceros con fines comerciales. Puedes pedir su eliminación cuando quieras.
          </p>
        </form>
      )}
    </div>
  );
}
