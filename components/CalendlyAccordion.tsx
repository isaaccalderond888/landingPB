"use client";

import { useState, useEffect } from "react";

interface Slot {
  start_time: string;
  scheduling_url: string;
}

const SESSION = {
  uri: "https://api.calendly.com/event_types/3815cbe2-2657-4f0a-a385-b8bc2931c6d3",
  slug: "sesion-de-psicoterapia",
  label: "Sesión de psicoterapia",
  tag: "55 min",
  description:
    "Reserva y paga por adelantado para enfocarte completamente en tu proceso. Vía Zoom.",
  accent: "#1A96A6",
};

const TZ = "America/Mexico_City";

function formatSlot(iso: string): string {
  const d = new Date(iso);
  const day = d.toLocaleDateString("es-MX", { weekday: "short", timeZone: TZ });
  const date = d.toLocaleDateString("es-MX", { day: "numeric", month: "short", timeZone: TZ });
  const time = d.toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit", hour12: true, timeZone: TZ });
  return `${day} ${date} · ${time}`;
}

export default function CalendlyAccordion() {
  const [open, setOpen] = useState(true);
  const [slots, setSlots] = useState<Slot[] | null>(null);

  useEffect(() => {
    fetch(`/api/available-times?uri=${encodeURIComponent(SESSION.uri)}`)
      .then((r) => r.json())
      .then((d) => setSlots(d.slots ?? []))
      .catch(() => setSlots([]));
  }, []);

  const fallback = `https://calendly.com/isaac-calderon-d/${SESSION.slug}?hide_gdpr_banner=1&primary_color=C99328`;
  const entrevistaUrl = "https://calendly.com/isaac-calderon-d/entrevista?hide_gdpr_banner=1&primary_color=C99328";

  return (
    <div>
      {/* Sesión principal */}
      <div className="border-t border-foreground/10">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between py-5 text-left"
          aria-expanded={open}
        >
          <div className="flex items-center gap-4">
            <span className="text-lg w-5 text-center flex-shrink-0" style={{ color: SESSION.accent }} aria-hidden="true">◈</span>
            <div>
              <span className="font-serif text-lg leading-snug">{SESSION.label}</span>
              <span className="ml-3 font-sans text-xs tracking-wide opacity-60" style={{ color: SESSION.accent }}>
                {SESSION.tag}
              </span>
            </div>
          </div>
          <svg
            className={`w-4 h-4 opacity-40 transition-transform duration-200 flex-shrink-0 ${open ? "rotate-180" : ""}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {open && (
          <div className="pb-7 pl-9">
            <p className="text-sm leading-relaxed opacity-55 mb-5 max-w-lg">
              {SESSION.description}
            </p>

            {/* Slots */}
            {slots === null ? (
              <div className="flex gap-2 flex-wrap mb-5">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-8 w-40 rounded-sm animate-pulse" style={{ backgroundColor: SESSION.accent + "22" }} />
                ))}
              </div>
            ) : slots.length === 0 ? (
              <a href={fallback} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs opacity-50 hover:opacity-100 transition-opacity mb-5 underline underline-offset-4">
                Ver disponibilidad en Calendly ↗
              </a>
            ) : (
              <div className="mb-5">
                <p className="text-xs tracking-widest uppercase opacity-40 mb-3">Próximos horarios</p>
                <div className="flex flex-wrap gap-2">
                  {slots.slice(0, 3).map((s) => (
                    <a
                      key={s.start_time}
                      href={s.scheduling_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs px-3 py-1.5 rounded-sm border transition-all duration-150 font-medium"
                      style={{ borderColor: SESSION.accent + "55", color: SESSION.accent }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.backgroundColor = SESSION.accent;
                        (e.currentTarget as HTMLAnchorElement).style.color = "#0D1430";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent";
                        (e.currentTarget as HTMLAnchorElement).style.color = SESSION.accent;
                      }}
                    >
                      {formatSlot(s.start_time)}
                    </a>
                  ))}
                  <a href={fallback} target="_blank" rel="noopener noreferrer"
                    className="text-xs px-3 py-1.5 opacity-35 hover:opacity-70 transition-opacity">
                    Más horarios ↗
                  </a>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Entrevista informativa — opción discreta */}
      <div className="border-t border-foreground/10 py-4 flex items-center justify-between">
        <div>
          <span className="text-sm opacity-50">¿No sabes por dónde empezar?</span>
          <a
            href={entrevistaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 text-sm text-brand-gold opacity-70 hover:opacity-100 transition-opacity underline underline-offset-4"
          >
            Entrevista informativa gratuita · 20 min ↗
          </a>
        </div>
      </div>
    </div>
  );
}
