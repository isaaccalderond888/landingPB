"use client";

import { useEffect, useRef, useState } from "react";

interface CalendlyEmbedProps {
  slug: string;
  hideDetails?: boolean;
}

/** Inyecta el CSS de Calendly de forma no bloqueante (solo una vez) */
function injectCalendlyCSS() {
  if (document.getElementById("calendly-css")) return;
  const link = document.createElement("link");
  link.id = "calendly-css";
  link.rel = "stylesheet";
  link.href = "https://assets.calendly.com/assets/external/widget.css";
  document.head.appendChild(link);
}

/** Espera a que window.Calendly esté disponible y llama el callback */
function whenCalendlyReady(callback: () => void, maxWait = 8000) {
  if (window.Calendly) { callback(); return; }
  const start = Date.now();
  const interval = setInterval(() => {
    if (window.Calendly) {
      clearInterval(interval);
      callback();
    } else if (Date.now() - start > maxWait) {
      clearInterval(interval);
    }
  }, 100);
}

export default function CalendlyEmbed({ slug, hideDetails = true }: CalendlyEmbedProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  const params = new URLSearchParams({
    hide_event_type_details: hideDetails ? "1" : "0",
    hide_gdpr_banner: "1",
    primary_color: "C99328",
  });

  const url = `https://calendly.com/isaac-calderon-d/${slug}?${params.toString()}`;

  // Lazy: activa cuando el contenedor se acerca al viewport
  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          injectCalendlyCSS();
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Inicializa el widget cuando el div interior esté en el DOM y Calendly listo
  useEffect(() => {
    if (!visible || !innerRef.current) return;
    const parentElement = innerRef.current;

    whenCalendlyReady(() => {
      window.Calendly?.initInlineWidget({ url, parentElement });
    });
  }, [visible, url]);

  return (
    <div ref={outerRef} style={{ minWidth: "320px", height: "700px" }}>
      {visible && (
        <div
          ref={innerRef}
          className="w-full h-full"
          style={{ minWidth: "320px", height: "700px" }}
        />
      )}
    </div>
  );
}
