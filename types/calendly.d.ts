interface CalendlyBadgeOptions {
  url: string;
  text: string;
  color: string;
  textColor: string;
  branding?: boolean;
}

interface Window {
  Calendly?: {
    initBadgeWidget: (options: CalendlyBadgeOptions) => void;
    initInlineWidgets: () => void;
  };
}
