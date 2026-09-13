"use client";

import { useState } from "react";

/**
 * Muro de cortesía, no técnico: el contenido de la guía está abierto en la
 * página y el PDF vive en una URL pública. Por eso el copy NO insinúa que el
 * correo sea necesario para acceder al contenido — sería falso y se nota.
 *
 * El correo tiene una sola finalidad: enviar este PDF. Si eso cambia, hace
 * falta consentimiento aparte, no un ajuste de texto.
 */
export default function DescargaGuia() {
  const [correo, setCorreo] = useState("");
  const [estado, setEstado] = useState<"idle" | "enviando" | "listo" | "error">("idle");
  const [mensaje, setMensaje] = useState("");
  const [archivo, setArchivo] = useState("");

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    if (estado === "enviando") return;
    setEstado("enviando");
    setMensaje("");

    try {
      const res = await fetch("/api/descargar-guia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setEstado("error");
        setMensaje(data.error ?? "No se pudo completar. Intenta de nuevo.");
        return;
      }

      setArchivo(data.archivo);
      setEstado("listo");
    } catch {
      setEstado("error");
      setMensaje("No hubo conexión. Intenta de nuevo.");
    }
  }

  if (estado === "listo") {
    return (
      <div className="rounded-sm border border-[#EAD06A]/30 bg-[#EAD06A]/[0.06] p-7 sm:p-8">
        <p className="text-[11px] tracking-[0.16em] uppercase text-[#EAD06A] mb-3">Lista</p>
        <p className="font-display text-[22px] leading-snug text-[#eef2ec] mb-3">
          Aquí la tienes
        </p>
        <p className="text-[14px] leading-relaxed text-[#9BBDC2] mb-6 max-w-md">
          También te la envié a <span className="text-[#eef2ec]">{correo}</span>, por si
          quieres volver a ella desde otro dispositivo.
        </p>
        <a
          href={archivo}
          download
          className="inline-flex items-center gap-2.5 bg-[#EAD06A] text-[#0b1830] px-6 py-3 text-[13px] font-medium tracking-wide rounded-sm hover:bg-[#efdb8a] transition-colors"
        >
          <svg width="15" height="15" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M7 1v8M4 6l3 3 3-3M2 11h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Descargar el PDF
        </a>
      </div>
    );
  }

  return (
    <div className="rounded-sm border border-white/10 bg-[#183463]/40 p-7 sm:p-8">
      <p className="text-[11px] tracking-[0.16em] uppercase text-[#EAD06A] mb-3">
        Llévatela contigo
      </p>
      <p className="font-display text-[22px] leading-snug text-[#eef2ec] mb-3">
        La guía completa en PDF
      </p>
      <p className="text-[14px] leading-relaxed text-[#9BBDC2] mb-6 max-w-md">
        Todo lo anterior, maquetado para leer sin pantalla, imprimir o anotar. Incluye
        los formatos para escribir: el mapa de integración y el plan de continuidad.
      </p>

      <form onSubmit={enviar} className="flex flex-col sm:flex-row gap-3 max-w-lg">
        <label htmlFor="correo-guia" className="sr-only">Tu correo</label>
        <input
          id="correo-guia"
          type="email"
          required
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          placeholder="tu@correo.com"
          disabled={estado === "enviando"}
          className="flex-1 bg-[#0b1830]/60 border border-white/15 rounded-sm px-4 py-3 text-[14px] text-[#eef2ec] placeholder:text-[#9BBDC2]/50 focus:border-[#EAD06A]/60 focus:outline-none focus:ring-1 focus:ring-[#EAD06A]/30 transition-colors disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={estado === "enviando"}
          className="bg-[#EAD06A] text-[#0b1830] px-6 py-3 text-[13px] font-medium tracking-wide rounded-sm hover:bg-[#efdb8a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {estado === "enviando" ? "Enviando…" : "Enviármela"}
        </button>
      </form>

      {estado === "error" && (
        <p className="text-[13px] text-[#f0a5a5] mt-3">{mensaje}</p>
      )}

      <p className="text-[12px] leading-relaxed text-[#9BBDC2]/70 mt-4 max-w-md">
        Uso tu correo únicamente para enviarte esta guía. No te voy a escribir para nada
        más, no hay lista de correos y no se guarda en ninguna base de datos.
      </p>
    </div>
  );
}
