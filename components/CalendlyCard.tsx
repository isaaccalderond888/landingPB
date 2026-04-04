"use client";

interface CalendlyCardProps {
  title: string;
  description: string;
  duration: string;
  price?: string;
  slug: string;
  accentColor: "gold" | "teal" | "mint";
  icon: "chat" | "payment" | "user";
}

const icons = {
  chat: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  ),
  payment: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  ),
  user: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  ),
};

const colorClasses = {
  gold: {
    bg: "bg-brand-gold/10",
    text: "text-brand-gold",
    button: "bg-brand-gold hover:bg-brand-gold/90 text-brand-night",
    border: "border-brand-gold/20",
  },
  teal: {
    bg: "bg-brand-teal/10",
    text: "text-brand-teal",
    button: "bg-brand-teal hover:bg-brand-teal/90 text-white",
    border: "border-brand-teal/20",
  },
  mint: {
    bg: "bg-brand-mint/10",
    text: "text-brand-mint",
    button: "bg-brand-mint hover:bg-brand-mint/90 text-brand-night",
    border: "border-brand-mint/20",
  },
};

export default function CalendlyCard({
  title,
  description,
  duration,
  price,
  slug,
  accentColor,
  icon,
}: CalendlyCardProps) {
  const colors = colorClasses[accentColor];
  const calendlyUrl = `https://calendly.com/isaac-calderon-d/${slug}`;

  const handleSchedule = () => {
    window.open(calendlyUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className={`border ${colors.border} rounded-xl p-6 bg-background hover:shadow-lg transition-shadow duration-300`}>
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-full ${colors.bg} flex items-center justify-center flex-shrink-0`}>
          <svg className={`w-6 h-6 ${colors.text}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {icons[icon]}
          </svg>
        </div>
        
        <div className="flex-1 space-y-3">
          <div>
            <h3 className="font-serif text-xl">{title}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm opacity-50">{duration}</span>
              {price && (
                <>
                  <span className="text-sm opacity-30">·</span>
                  <span className={`text-sm ${colors.text}`}>{price}</span>
                </>
              )}
            </div>
          </div>
          
          <p className="text-sm opacity-60 leading-relaxed">
            {description}
          </p>
          
          <button
            onClick={handleSchedule}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium ${colors.button} transition-colors duration-200`}
          >
            Agendar cita
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
