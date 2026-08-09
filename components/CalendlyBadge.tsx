"use client";

import Script from "next/script";
import { useEffect } from "react";

export default function CalendlyBadge() {
  // El CSS debe cargarse inmediatamente para que el badge tenga position:fixed
  useEffect(() => {
    if (document.getElementById("calendly-css")) return;
    const link = document.createElement("link");
    link.id = "calendly-css";
    link.rel = "stylesheet";
    link.href = "https://assets.calendly.com/assets/external/widget.css";
    document.head.appendChild(link);
  }, []);

  return (
    <Script
      src="https://assets.calendly.com/assets/external/widget.js"
      strategy="afterInteractive"
      onLoad={() => {
        if (window.Calendly) {
          window.Calendly.initBadgeWidget({
            url: "https://calendly.com/isaac-calderon-d/sesion-de-psicoterapia",
            text: "Programar sesión",
            color: "#EAD06A",
            textColor: "#0B1830",
            branding: false,
          });
        }
      }}
    />
  );
}
