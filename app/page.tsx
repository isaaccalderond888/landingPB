import Image from "next/image";
import ThemeToggle from "@/components/ThemeToggle";
import CalendlyEmbed from "@/components/CalendlyEmbed";
import CalendlyToggle from "@/components/CalendlyToggle";
import Logo from "@/components/Logo";

const SLUG_ENTREVISTA = "entrevista";

export default function Home() {
  return (
    <div className="bg-background text-foreground min-h-screen">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 bg-background/80 backdrop-blur-sm border-b border-foreground/5">
        <div className="flex items-center gap-3">
          <Logo size={32} variant="color" />
          <span className="text-sm tracking-widest uppercase opacity-60 hidden sm:block">
            Isaac Calderón Derat
          </span>
        </div>
        <div className="flex items-center gap-6 md:gap-8">
          <a href="#enfoque" className="text-xs tracking-widest uppercase opacity-50 hover:text-brand-teal hover:opacity-100 transition-all hidden md:block">
            Enfoque
          </a>
          <a href="#proceso" className="text-xs tracking-widest uppercase opacity-50 hover:text-brand-teal hover:opacity-100 transition-all hidden md:block">
            Proceso
          </a>
          <a href="#agendar" className="text-xs tracking-widest uppercase opacity-50 hover:text-brand-teal hover:opacity-100 transition-all hidden md:block">
            Agendar
          </a>
          <ThemeToggle />
        </div>
      </nav>

      {/* SECCIÓN 1 — HERO */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-20 pt-24 pb-20 bg-gradient-to-br from-brand-night via-brand-navy to-brand-night noise-texture radial-glow relative overflow-hidden">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">
          <div className="space-y-8">
            <div className="space-y-3">
              <p className="text-xs tracking-widest uppercase text-brand-gold">
                Psicólogo · Psicoterapeuta Transpersonal
              </p>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight text-white text-balance">
                Psicoterapia desde la profundidad.
              </h1>
              <p className="font-serif text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight text-brand-mint/60">
                Para quienes buscan transformación real.
              </p>
            </div>

            <p className="text-base md:text-lg leading-relaxed text-white/70 max-w-md">
              Trabajo con personas que han agotado las respuestas superficiales.
              Mi práctica integra psicotraumatología, trabajo somático y acompañamiento
              en estados ampliados de conciencia — cada proceso encuentra su propia
              forma y jerarquía. Atiendo online para hispanohablantes y presencial
              en Ciudad de México.
            </p>

            <a
              href="#agendar"
              className="inline-block bg-brand-gold text-brand-night px-6 py-3 text-sm tracking-widest uppercase font-medium hover:bg-brand-gold/90 transition-colors duration-300"
            >
              Solicitar entrevista informativa
            </a>
          </div>

          <div className="hidden md:block teal-glow">
            <Image 
              src="/isaac.jpg" 
              alt="Isaac Calderón Derat" 
              width={600} 
              height={750}
              className="aspect-[4/5] object-cover w-full relative z-10"
              priority
            />
          </div>
        </div>
      </section>

      {/* SECCIÓN 2 — ENFOQUE */}
      <section id="enfoque" className="px-6 md:px-12 lg:px-20 py-24 bg-background">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-widest uppercase text-brand-teal mb-16">
            Cómo trabajo
          </p>
          <div className="grid md:grid-cols-3 gap-12 md:gap-8 lg:gap-16">

            <div className="space-y-4 group">
              <div className="w-10 h-1 bg-brand-gold mb-6 group-hover:w-16 transition-all duration-300" />
              <h2 className="font-serif text-xl leading-snug">
                Psicotraumatología y enfoque somático
              </h2>
              <p className="text-sm leading-relaxed opacity-60">
                El trauma no vive solo en la mente — vive en el cuerpo, en los
                patrones de activación del sistema nervioso, en lo que no pudo
                ser dicho ni procesado. Trabajo con protocolos actualizados e
                informados en neurociencia, donde el cuerpo es territorio tanto
                del problema como de la solución.
              </p>
            </div>

            <div className="space-y-4 group">
              <div className="w-10 h-1 bg-brand-teal mb-6 group-hover:w-16 transition-all duration-300" />
              <h2 className="font-serif text-xl leading-snug">
                Neurofeedback e integración neurológica
              </h2>
              <p className="text-sm leading-relaxed opacity-60">
                Cuando el proceso lo requiere, integro evaluación y entrenamiento
                de ondas cerebrales como parte del trabajo clínico. No como
                tecnología separada, sino como información adicional sobre el
                sistema nervioso de cada persona.
              </p>
            </div>

            <div className="space-y-4 group">
              <div className="w-10 h-1 bg-brand-mint mb-6 group-hover:w-16 transition-all duration-300" />
              <h2 className="font-serif text-xl leading-snug">
                Terapia asistida con psicodélicos
              </h2>
              <p className="text-sm leading-relaxed opacity-60">
                Acompaño procesos de preparación, sesión e integración con
                sustancias psicoactivas en contexto clínico, ético y fundamentado
                en evidencia emergente. Como director de Ciencia Psicodélica,
                este trabajo forma parte de un compromiso más amplio: legitimar
                estas herramientas con el rigor que merecen.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* SECCIÓN 3 — EL PROCESO */}
      <section id="proceso" className="px-6 md:px-12 lg:px-20 py-24 bg-brand-navy">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-widest uppercase text-brand-teal mb-16">
            El proceso
          </p>
          <div className="space-y-0 divide-y divide-white/10">

            <div className="py-10 space-y-2">
              <h3 className="font-serif text-lg text-white flex items-baseline gap-3">
                Entrevista informativa
                <span className="font-sans text-xs text-brand-gold tracking-wide">20 min · sin costo</span>
              </h3>
              <p className="text-sm leading-relaxed text-white/60">
                Conversamos para conocernos y explorar si hay resonancia terapéutica.
                Sin compromiso.
              </p>
            </div>

            <div className="py-10 space-y-2">
              <h3 className="font-serif text-lg text-white">Sesión inicial</h3>
              <p className="text-sm leading-relaxed text-white/60">
                Evaluamos juntos el punto de partida y definimos el encuadre del proceso.
              </p>
            </div>

            <div className="py-10 space-y-2">
              <h3 className="font-serif text-lg text-white">Proceso terapéutico</h3>
              <p className="text-sm leading-relaxed text-white/60">
                La frecuencia y modalidad emergen de cada persona. No hay fórmula fija.
              </p>
            </div>

          </div>

          <p className="mt-12 text-sm text-brand-mint italic font-serif">
            Tengo pocos espacios disponibles. Si hay resonancia, comenzamos.
          </p>
        </div>
      </section>

      {/* SECCIÓN 4 — CALENDLY */}
      <section id="agendar" className="px-6 md:px-12 lg:px-20 py-24 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-[1fr,2fr] gap-12 md:gap-16 items-start">
            {/* Info lateral */}
            <div className="space-y-6">
              <div>
                <p className="text-xs tracking-widest uppercase text-brand-teal mb-3">
                  Agenda una sesión
                </p>
                <h2 className="font-serif text-2xl md:text-3xl leading-snug">
                  Entrevista informativa
                </h2>
              </div>
              
              <div className="space-y-4 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-gold/10 flex items-center justify-center">
                    <svg className="w-4 h-4 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="opacity-70">20 minutos</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-mint/10 flex items-center justify-center">
                    <svg className="w-4 h-4 text-brand-mint" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="opacity-70">Videollamada</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-teal/10 flex items-center justify-center">
                    <svg className="w-4 h-4 text-brand-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="opacity-70">Sin costo</span>
                </div>
              </div>

              <p className="text-sm opacity-50 leading-relaxed">
                Conversamos brevemente para conocernos y explorar si hay resonancia terapéutica. Sin compromiso.
              </p>
            </div>

            {/* Calendly widget */}
            <div>
              <CalendlyEmbed slug={SLUG_ENTREVISTA} />
            </div>
          </div>

          <CalendlyToggle />
        </div>
      </section>

      {/* SECCIÓN 5 — CONTEXTO INSTITUCIONAL */}
      <section className="px-6 md:px-12 lg:px-20 py-16 bg-brand-night">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-widest uppercase text-brand-teal/60 mb-8">
            Contexto institucional
          </p>
          <div className="flex flex-wrap gap-x-10 gap-y-3">

            <a
              href="https://ayam.world"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/40 hover:text-brand-gold transition-all"
            >
              Ayam Studio — Director ↗
            </a>

            <a
              href="https://cienciapsicodelica.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/40 hover:text-brand-gold transition-all"
            >
              Ciencia Psicodélica — Director ↗
            </a>

            <a
              href="https://newman.institute"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/40 hover:text-brand-gold transition-all"
            >
              Neuroclínica Newman — Psicoterapeuta ↗
            </a>

            <span className="text-sm text-white/40">
              El Sanador Interior / Enteogénesis — Co-facilitador
            </span>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-6 md:px-12 lg:px-20 py-10 bg-brand-night border-t border-white/5">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <p className="text-sm text-white/40">Ciudad de México</p>
            <a
              href="mailto:psic@isaaccalderon.me"
              className="text-sm text-white/40 hover:text-brand-teal transition-all"
            >
              psic@isaaccalderon.me
            </a>
          </div>
          <p className="text-xs text-white/25">
            © Isaac Calderón Derat
          </p>
        </div>
      </footer>

    </div>
  );
}
