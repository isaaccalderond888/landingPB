"use client";

import Script from "next/script";

export default function CalendlyBadge() {
  return (
    <Script
      src="https://assets.calendly.com/assets/external/widget.js"
      strategy="afterInteractive"
      onLoad={() => {
        if (window.Calendly) {
          window.Calendly.initBadgeWidget({
            url: "https://calendly.com/isaac-calderon-d/sesion-de-psicoterapia",
            text: "Programar sesión",
            color: "#C99328",
            textColor: "#0D1430",
            branding: false,
          });
        }
      }}
    />
  );
}
