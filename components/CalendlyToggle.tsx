"use client";

import { useState } from "react";
import CalendlyEmbed from "./CalendlyEmbed";

export default function CalendlyToggle() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-12 pt-10 border-t border-foreground/10">
      <button
        onClick={() => setOpen(!open)}
        className="group flex items-center gap-3 text-sm text-foreground/50 hover:text-brand-teal transition-colors"
      >
        <span className={`w-6 h-6 rounded-full border border-current flex items-center justify-center transition-all ${open ? "bg-brand-teal border-brand-teal text-white" : ""}`}>
          <svg 
            className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
        <span>¿Ya eres paciente? Agenda tu siguiente sesión</span>
      </button>

      <div className={`grid transition-all duration-300 ease-in-out ${open ? "grid-rows-[1fr] opacity-100 mt-8" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="overflow-hidden">
          <CalendlyEmbed slug="sesion-de-psicoterapia" />
        </div>
      </div>
    </div>
  );
}
