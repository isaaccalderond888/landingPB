"use client";

import { useState, useEffect } from "react";

interface Slot {
  start_time: string;
  scheduling_url: string;
}

interface EventItem {
  uri: string;
  slug: string;
  label: string;
  tag: string;
  description: string;
  accent: string;
  icon: string;
}

const EVENTS: EventItem[] = [
  {
    uri: "https://api.calendly.com/event_types/BEF55GQKST3RVWLD",
    slug: "entrevista",
    label: "Entrevista informativa",
    tag: "20 min · gratuita",
    description:
      "Conversamos para conocernos y explorar si hay resonancia terapéutica. No es una sesión — es una conversación honesta sobre lo que buscas y lo que puedo ofrecer. Sin compromisos.",
    accent: "#C99328",
    icon: "◎",
  },
  {
    uri: "https://api.calendly.com/event_types/3815cbe2-2657-4f0a-a385-b8bc2931c6d3",
    slug: "sesion-de-psicoterapia",
    label: "Sesión de psicoterapia",
    tag: "55 min · pago adelantado",
    description:
      "Reserva y paga por adelantado para enfocarte completamente en tu proceso. Vía Zoom.",
    accent: "#1A96A6",
    icon: "◈",
  },
  {
    uri: "https://api.calendly.com/event_types/CAA26AUMQPCM7EQP",
    slug: "sesion-individual",
    label: "Pacientes en proceso",
    tag: "55 min",
    description:
      "Para quienes ya tienen un proceso abierto. Continúa tu camino de introspección y crecimiento. Vía Zoom.",
    accent: "#5CC4A8",
    icon: "◇",
  },
  {
    uri: "https://api.calendly.com/event_types/4a4f18fd-d52e-4483-bdfc-f798747f067c",
    slug: "intervencion-breve",
    label: "Intervención breve",
    tag: "15 min · urgente",
    description:
      "Para situaciones de urgencia que no pueden esperar una cita regular. Llamada telefónica con prioridad en los próximos 3 días.",
    accent: "#ffa600",
    icon: "◉",
  },
];

const TZ = "America/Mexico_City";

function formatSlot(iso: string): string {
  const d = new Date(iso);
  const day = d.toLocaleDateString("es-MX", { weekday: "short", timeZone: TZ });
  const date = d.toLocaleDateString("es-MX", { day: "numeric", month: "short", timeZone: TZ });
  const time = d.toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit", hour12: true, timeZone: TZ });
  return `${day} ${date} · ${time}`;
}

function SlotPills({ uri, accent, slug }: { uri: string; accent: string; slug: string }) {
  const [slots, setSlots] = useState<Slot[] | null>(null);

  useEffect(() => {
    fetch(`/api/available-times?uri=${encodeURIComponent(uri)}`)
      .then((r) => r.json())
      .then((d) => setSlots(d.slots ?? []))
      .catch(() => setSlots([]));
  }, [uri]);

  const fallback = `https://calendly.com/isaac-calderon-d/${slug}?hide_gdpr_banner=1&primary_color=C99328`;

  if (slots === null) {
    return (
      <div className="flex gap-2 flex-wrap mb-5">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-8 w-40 rounded-sm animate-pulse"
            style={{ backgroundColor: accent + "22" }}
          />
        ))}
      </div>
    );
  }

  if (slots.length === 0) {
    return (
      <a
        href={fallback}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-xs opacity-50 hover:opacity-100 transition-opacity mb-5 underline underline-offset-4"
      >
        Ver disponibilidad en Calendly ↗
      </a>
    );
  }

  return (
    <div className="mb-5">
      <p className="text-xs tracking-widest uppercase opacity-40 mb-3">
        Próximos horarios disponibles
      </p>
      <div className="flex flex-wrap gap-2">
        {slots.map((s) => (
          <a
            key={s.start_time}
            href={s.scheduling_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs px-3 py-1.5 rounded-sm border transition-all duration-150 hover:text-brand-night font-medium"
            style={{
              borderColor: accent + "55",
              color: accent,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = accent;
              (e.currentTarget as HTMLAnchorElement).style.color = "#0D1430";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent";
              (e.currentTarget as HTMLAnchorElement).style.color = accent;
            }}
          >
            {formatSlot(s.start_time)}
          </a>
        ))}
        <a
          href={fallback}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs px-3 py-1.5 opacity-35 hover:opacity-70 transition-opacity"
        >
          Más horarios ↗
        </a>
      </div>
    </div>
  );
}

export default function CalendlyAccordion() {
  const [open, setOpen] = useState<string | null>("entrevista");

  return (
    <div className="divide-y divide-foreground/10 border-t border-foreground/10">
      {EVENTS.map((ev) => {
        const isOpen = open === ev.slug;

        return (
          <div key={ev.slug}>
            <button
              onClick={() => setOpen(isOpen ? null : ev.slug)}
              className="w-full flex items-center justify-between py-5 text-left group"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-4">
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
                    className="ml-3 font-sans text-xs tracking-wide opacity-60"
                    style={{ color: ev.accent }}
                  >
                    {ev.tag}
                  </span>
                </div>
              </div>

              <svg
                className={`w-4 h-4 opacity-40 transition-transform duration-200 flex-shrink-0 ${
                  isOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isOpen && (
              <div className="pb-7 pl-9">
                <p className="text-sm leading-relaxed opacity-55 mb-5 max-w-lg">
                  {ev.description}
                </p>

                <SlotPills uri={ev.uri} accent={ev.accent} slug={ev.slug} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
