"use client";

import { useState } from "react";

interface EventItem {
  slug: string;
  name: string;
  label: string;          // nombre corto para el acordeón
  duration: number;
  tag: string;            // "gratuita" | "55 min" | etc.
  description: string;
  accent: string;         // color de barra izq.
  icon: string;           // emoji o símbolo
}

const EVENTS: EventItem[] = [
  {
    slug: "entrevista",
    name: "Entrevista Informativa de Psicoterapia",
    label: "Entrevista informativa",
    duration: 20,
    tag: "20 min · gratuita",
    description:
      "Conversamos para conocernos y explorar si hay resonancia terapéutica. No es una sesión — es una conversación honesta sobre lo que buscas y lo que puedo ofrecer. Sin compromisos.",
    accent: "#C99328",
    icon: "◎",
  },
  {
    slug: "sesion-de-psicoterapia",
    name: "Sesión de Psicoterapia (Pago adelantado)",
    label: "Sesión de psicoterapia",
    duration: 55,
    tag: "55 min · pago adelantado",
    description:
      "Reserva y paga por adelantado para enfocarte completamente en tu proceso. Vía Zoom.",
    accent: "#1A96A6",
    icon: "◈",
  },
  {
    slug: "sesion-individual",
    name: "Sesión para Pacientes Regulares",
    label: "Pacientes en proceso",
    duration: 55,
    tag: "55 min",
    description:
      "Para quienes ya tienen un proceso abierto. Continúa tu camino de introspección y crecimiento. Vía Zoom.",
    accent: "#5CC4A8",
    icon: "◇",
  },
  {
    slug: "intervencion-breve",
    name: "Intervención Breve",
    label: "Intervención breve",
    duration: 15,
    tag: "15 min · urgente",
    description:
      "Para situaciones de urgencia que no pueden esperar una cita regular. Llamada telefónica con prioridad en los próximos 3 días.",
    accent: "#ffa600",
    icon: "◉",
  },
];

const BASE_URL = "https://calendly.com/isaac-calderon-d";

export default function CalendlyAccordion() {
  const [open, setOpen] = useState<string | null>("entrevista");

  return (
    <div className="divide-y divide-foreground/10 border-t border-foreground/10">
      {EVENTS.map((ev) => {
        const isOpen = open === ev.slug;
        const href = `${BASE_URL}/${ev.slug}?hide_gdpr_banner=1&primary_color=C99328`;

        return (
          <div key={ev.slug}>
            {/* Cabecera del acordeón */}
            <button
              onClick={() => setOpen(isOpen ? null : ev.slug)}
              className="w-full flex items-center justify-between py-5 text-left group"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-4">
                {/* Barra de color + icono */}
                <span
                  className="text-lg w-5 text-center flex-shrink-0"
                  style={{ color: ev.accent }}
                  aria-hidden="true"
                >
                  {ev.icon}
                </span>

                <div>
                  <span className="font-serif text-lg leading-snug">
                    {ev.label}
                  </span>
                  <span
                    className="ml-3 font-sans text-xs tracking-wide opacity-50"
                    style={{ color: ev.accent }}
                  >
                    {ev.tag}
                  </span>
                </div>
              </div>

              {/* Chevron */}
              <svg
                className={`w-4 h-4 opacity-40 transition-transform duration-200 flex-shrink-0 ${
                  isOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Contenido expandido */}
            {isOpen && (
              <div className="pb-7 pl-9">
                <p className="text-sm leading-relaxed opacity-55 mb-5 max-w-lg">
                  {ev.description}
                </p>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm tracking-widest uppercase font-medium px-5 py-2.5 transition-colors duration-200"
                  style={{
                    backgroundColor: ev.accent,
                    color: "#0D1430",
                  }}
                >
                  Agendar
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
