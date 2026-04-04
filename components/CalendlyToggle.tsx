"use client";

import { useState } from "react";
import CalendlyEmbed from "./CalendlyEmbed";

export default function CalendlyToggle() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-8 border-t border-foreground/10 pt-8">
      <button
        onClick={() => setOpen(!open)}
        className="text-sm opacity-50 hover:text-brand-teal hover:opacity-100 transition-all flex items-center gap-2"
      >
        <span>¿Ya eres paciente? Agenda tu siguiente sesión</span>
        <span className={`transition-transform ${open ? "rotate-90" : ""}`}>→</span>
      </button>

      {open && (
        <div className="mt-6">
          <CalendlyEmbed slug="sesion-de-psicoterapia" />
        </div>
      )}
    </div>
  );
}
