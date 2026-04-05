interface CalendlyBadgeOptions {
  url: string;
  text: string;
  color: string;
  textColor: string;
  branding?: boolean;
}

interface CalendlyInlineOptions {
  url: string;
  parentElement: HTMLElement;
  prefill?: Record<string, string>;
  utm?: Record<string, string>;
}

interface Window {
  Calendly?: {
    initBadgeWidget: (options: CalendlyBadgeOptions) => void;
    initInlineWidget: (options: CalendlyInlineOptions) => void;
    initInlineWidgets: () => void;
  };
}
