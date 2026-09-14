import Image from "next/image";
import ThemeToggle from "@/components/ThemeToggle";
import CalendlyAccordion from "@/components/CalendlyAccordion";
import AgendarPresencial from "@/components/AgendarPresencial";
import Logo from "@/components/Logo";

const WA = "https://wa.me/524424752806?text=Hola%20Isaac%2C%20me%20interesa%20saber%20m%C3%A1s%20sobre%20tu%20trabajo";

export const metadata = { alternates: { canonical: "https://www.isaaccalderon.me/" } };

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://www.isaaccalderon.me/#isaac",
      "name": "Isaac Calderón Derat",
      "url": "https://www.isaaccalderon.me",
      "image": "https://www.isaaccalderon.me/isaac.jpg",
      "jobTitle": "Psicólogo y psicoterapeuta transpersonal",
      "knowsLanguage": "es",
      "subjectOf": {
        "@type": "WebPage",
        "url": "https://www.isaaccalderon.me/formacion"
      }
    },
    {
      "@type": "MedicalBusiness",
      "@id": "https://www.isaaccalderon.me/#consulta",
      "name": "Consulta de Isaac Calderón Derat",
      "url": "https://www.isaaccalderon.me",
      "employee": {
        "@id": "https://www.isaaccalderon.me/#isaac"
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Avenida Paseo de las Palmas 765, interior 202",
        "addressLocality": "Ciudad de México",
        "addressCountry": "MX"
      },
      "description": "Consulta presencial de psicoterapia en Clínica Newman y atención en línea."
    }
  ]
};

export default function Home() {
  return (
    <div className="bg-background text-foreground min-h-screen">

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\u003c") }} />

      {/* NAV */}
      <nav aria-label="Navegación principal" className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between gap-2 px-4 sm:px-6 md:px-12 py-3 md:py-5 bg-brand-night/90 text-[#EEF2EC] backdrop-blur-md border-b border-white/10 shadow-[0_4px_24px_rgba(11,24,48,0.18)]">
        <div className="flex items-center gap-3">
          <Logo size={32} variant="color" />
          <span className="text-xs sm:text-sm tracking-wide sm:tracking-widest uppercase text-white/80 max-w-[125px] sm:max-w-none">
            Isaac Calderón Derat
          </span>
        </div>
        <div className="flex items-center gap-2 md:gap-8">
          <a href="#enfoque" className="rounded-sm text-xs tracking-widest uppercase text-white/60 hover:text-[#69A5BB] transition-colors hidden md:block">Enfoque</a>
          <a href="#proceso" className="rounded-sm text-xs tracking-widest uppercase text-white/60 hover:text-[#69A5BB] transition-colors hidden md:block">Proceso</a>
          <a href="#agendar" className="rounded-sm text-xs tracking-widest uppercase text-white/60 hover:text-[#69A5BB] transition-colors inline-flex min-h-11 items-center px-2">Agendar</a>
          <ThemeToggle />
        </div>
      </nav>

      {/* SECCIÓN 1 — HERO */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-20 pt-24 pb-14 bg-gradient-to-br from-brand-night via-brand-navy to-brand-night noise-texture radial-glow relative overflow-hidden">
        {/* Curvas de nivel al pie del hero — el mismo motivo que la portada de
            la guía descargable. Decorativo: no lleva texto ni interacción. */}
        <div
          aria-hidden="true"
          className="curvas-hero pointer-events-none absolute inset-x-0 bottom-0 h-[44%] z-0"
        />

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center relative z-10">
          <div className="space-y-6 order-2 md:order-1">
            <div className="space-y-3">
              <p className="text-xs tracking-widest uppercase text-brand-gold opacity-90">
                Psicólogo · Psicoterapeuta Transpersonal
              </p>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight text-white text-balance">
                Psicoterapia informada en trauma.
              </h1>
              <p className="font-display text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight text-brand-mint/60">
                Trabajo con el cuerpo, el sistema nervioso y lo que no
                pudo ser procesado.
              </p>
            </div>

            <p className="text-base md:text-lg leading-relaxed text-white/70 max-w-md">
              Acompañamiento terapéutico presencial en Ciudad de México y
              en línea para hispanohablantes.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="#agendar"
                className="inline-block bg-brand-gold text-brand-night px-6 py-3 text-sm tracking-widest uppercase font-medium hover:bg-brand-gold/90 transition-colors duration-300"
              >
                Agendar sesión
              </a>
              <a
                href={WA}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-white/20 text-white/70 px-6 py-3 text-sm tracking-widest uppercase hover:border-white/50 hover:text-white transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </a>
            </div>
          </div>

          <div className="flex order-1 md:order-2 items-center justify-center teal-glow">
            <Image
              src="/isaac.jpg"
              alt="Isaac Calderón Derat, psicoterapeuta transpersonal en Ciudad de México"
              width={520}
              height={520}
              className="aspect-[4/5] object-cover object-center w-32 sm:w-40 md:w-full max-w-[420px] rounded-[20px] border border-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.28)] relative z-10"
              sizes="(max-width: 639px) 128px, (max-width: 767px) 160px, 420px"
              priority
            />
          </div>
        </div>
      </section>

      {/* SECCIÓN 2 — ENFOQUE */}
      <section id="enfoque" className="scroll-mt-20 px-6 md:px-12 lg:px-20 py-14 bg-background">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xs tracking-widest uppercase text-brand-teal opacity-70 mb-8">
            Cómo trabajo
          </h2>
          <div className="grid md:grid-cols-3 gap-5">

            <div className="group bg-surface border border-border-theme p-6 rounded-sm hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(37,109,134,0.18)] hover:border-brand-teal/40 transition-all duration-300 cursor-default">
              <div className="w-10 h-0.5 bg-brand-gold mb-5 group-hover:w-16 transition-all duration-300" />
              <h3 className="font-display text-xl leading-snug mb-3">
                Psicotraumatología y enfoque somático
              </h3>
              <p className="text-sm leading-relaxed text-foreground/70">
                El trauma vive en el cuerpo — en los patrones de activación
                del sistema nervioso, en lo que no pudo ser procesado.
                Por eso el cuerpo es parte central del proceso, no un
                añadido al final.
              </p>
            </div>

            <div className="group bg-surface border border-border-theme p-6 rounded-sm hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(37,109,134,0.18)] hover:border-brand-teal/40 transition-all duration-300 cursor-default">
              <div className="w-10 h-0.5 bg-brand-teal mb-5 group-hover:w-16 transition-all duration-300" />
              <h3 className="font-display text-xl leading-snug mb-3">
                Neurofeedback informado en trauma
              </h3>
              <p className="text-sm leading-relaxed text-foreground/70">
                Cuando el proceso lo requiere, integro evaluación y
                entrenamiento de ondas cerebrales. No como tecnología
                separada — como una capa más de comprensión del
                sistema nervioso.
              </p>
            </div>

            <div className="group bg-surface border border-border-theme p-6 rounded-sm hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(37,109,134,0.18)] hover:border-brand-teal/40 transition-all duration-300 cursor-default">
              <div className="w-10 h-0.5 bg-brand-mint mb-5 group-hover:w-16 transition-all duration-300" />
              <h3 className="font-display text-xl leading-snug mb-3">
                Terapia asistida con psicodélicos
              </h3>
              <p className="text-sm leading-relaxed text-foreground/70">
                Acompaño preparación e integración con medicina
                psicodélica y enteógenos en contexto clínico y ético. El
                trabajo está antes y después de la experiencia: eso es lo
                que la vuelve parte de un proceso.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* SECCIÓN 3 — EL PROCESO */}
      <section id="proceso" className="relative overflow-hidden scroll-mt-20 px-6 md:px-12 lg:px-20 py-14 bg-brand-navy">
        {/* Lleva texto corrido encima, así que aquí el motivo va al borde
            derecho y muy apagado: acompaña, no compite. */}
        <div aria-hidden="true" className="curvas-lateral pointer-events-none absolute inset-y-0 right-0 w-1/3" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-xs tracking-widest uppercase text-[#69A5BB] mb-8">
            El proceso
          </h2>
          <div className="space-y-0 divide-y divide-white/10">

            <div className="py-7 space-y-2">
              <h3 className="font-display text-lg text-white flex items-baseline gap-3">
                Entrevista informativa
                <span className="font-sans text-xs text-brand-gold tracking-wide">20 min · sin costo</span>
              </h3>
              <p className="text-sm leading-relaxed text-white/60">
                Una conversación breve para entender qué te trae y definir
                juntos qué línea de trabajo tiene más sentido para ti.
                Sin compromiso.
              </p>
            </div>

            <div className="py-7 space-y-2">
              <h3 className="font-display text-lg text-white">Sesión inicial</h3>
              <p className="text-sm leading-relaxed text-white/60">
                Evaluamos el punto de partida: tu historia, tus síntomas,
                lo que ya has intentado. Definimos el encuadre y la
                dirección del proceso.
              </p>
            </div>

            <div className="py-7 space-y-2">
              <h3 className="font-display text-lg text-white">Proceso terapéutico</h3>
              <p className="text-sm leading-relaxed text-white/60">
                No hay fórmula fija. Cada proceso encuentra su propia
                forma — desde lo fisiológico hasta las creencias, el
                sentido y lo que trasciende lo personal.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* SECCIÓN 4 — AGENDAR */}
      <section id="agendar" className="scroll-mt-20 px-6 md:px-12 lg:px-20 py-14 bg-background">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xs tracking-widest uppercase text-brand-teal opacity-70 mb-4">
            Agenda una sesión
          </h2>
          <p className="font-display text-2xl md:text-3xl mb-7">
            ¿Cuándo empezamos?
          </p>
          <CalendlyAccordion />
          {/* Presencial va junto a lo online, no aparte: quien busca cita no
              debería tener que averiguar cuál sistema le toca. */}
          <AgendarPresencial />
        </div>
      </section>

      {/* SECCIÓN 5 — CONTEXTO COLABORATIVO */}
      <section className="px-6 md:px-12 lg:px-20 py-10 border-t border-foreground/10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xs tracking-widest uppercase text-interactive-text mb-8">
            Dónde más trabajo
          </h2>
          <div className="flex flex-wrap gap-x-10 gap-y-3">
            <a href="https://ayam.world" target="_blank" rel="noopener noreferrer" className="text-sm text-foreground/60 hover:text-interactive-text transition-colors">Ayam Studio ↗</a>
            <a href="https://newman.institute" target="_blank" rel="noopener noreferrer" className="text-sm text-foreground/60 hover:text-interactive-text transition-colors">Neuroclínica Newman ↗</a>
            <a href="https://cienciapsicodelica.com" target="_blank" rel="noopener noreferrer" className="text-sm text-foreground/60 hover:text-interactive-text transition-colors">Ciencia Psicodélica ↗</a>
            <a href="https://terrasana.pro/products/25-27-septiembre-enteogenesis-retiro-de-exploracion-interior" target="_blank" rel="noopener noreferrer" className="text-sm text-foreground/60 hover:text-interactive-text transition-colors">Enteogénesis ↗</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-6 md:px-12 lg:px-20 py-10 border-t border-foreground/10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <p className="text-sm text-foreground/60">Ciudad de México</p>
            <a href="mailto:psic@isaaccalderon.me" className="text-sm text-foreground/60 hover:text-interactive-text transition-colors">psic@isaaccalderon.me</a>
            <a href={WA} target="_blank" rel="noopener noreferrer" className="text-sm text-foreground/60 hover:text-interactive-text transition-colors">WhatsApp ↗</a>
            <a href="/formacion" className="text-sm text-foreground/60 hover:text-interactive-text transition-colors">Formación</a>
            <a href="/privacidad" className="text-sm text-foreground/60 hover:text-interactive-text transition-colors">Aviso de privacidad</a>
          </div>
          <p className="text-xs text-foreground/40">© Isaac Calderón Derat</p>
        </div>
      </footer>

    </div>
  );
}
