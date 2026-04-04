"use client";

import { useEffect } from "react";
import Script from "next/script";

interface CalendlyWidgetProps {
  slug: "entrevista" | "sesion-de-psicoterapia";
}

export default function CalendlyWidget({ slug }: CalendlyWidgetProps) {
  const url = `https://calendly.com/isaac-calderon-d/${slug}?hide_event_type_details=1&hide_gdpr_banner=1&primary_color=C99328`;

  useEffect(() => {
    // Re-initialize Calendly widget when component mounts or slug changes
    if (typeof window !== "undefined" && (window as Window & { Calendly?: { initInlineWidgets?: () => void } }).Calendly) {
      (window as Window & { Calendly?: { initInlineWidgets?: () => void } }).Calendly?.initInlineWidgets?.();
    }
  }, [slug]);

  return (
    <>
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
        onLoad={() => {
          if (typeof window !== "undefined" && (window as Window & { Calendly?: { initInlineWidgets?: () => void } }).Calendly) {
            (window as Window & { Calendly?: { initInlineWidgets?: () => void } }).Calendly?.initInlineWidgets?.();
          }
        }}
      />
      <div
        className="calendly-inline-widget rounded-lg overflow-hidden"
        data-url={url}
        style={{ minWidth: "320px", height: "700px" }}
      />
    </>
  );
}
