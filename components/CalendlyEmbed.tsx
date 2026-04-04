"use client";

interface CalendlyEmbedProps {
  slug: string;
  hideDetails?: boolean;
}

export default function CalendlyEmbed({ slug, hideDetails = true }: CalendlyEmbedProps) {
  const params = new URLSearchParams({
    hide_event_type_details: hideDetails ? "1" : "0",
    hide_gdpr_banner: "1",
    primary_color: "C99328",  // brand-gold sin el #
  });

  const url = `https://calendly.com/isaac-calderon-d/${slug}?${params.toString()}`;

  return (
    <div
      className="calendly-inline-widget w-full"
      data-url={url}
      style={{ minWidth: "320px", height: "700px" }}
    />
  );
}
