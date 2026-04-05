import ThemeToggle from "@/components/ThemeToggle";
import CalendlyEmbed from "@/components/CalendlyEmbed";
import CalendlyToggle from "@/components/CalendlyToggle";
import Logo from "@/components/Logo";

const SLUG_ENTREVISTA = "entrevista";

export default function Home() {
  return (
    <div className="bg-background text-foreground min-h-screen">

      {/* NAV */}
      <nav aria-label="Navegación principal" className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 bg-background/80 backdrop-blur-sm border-b border-foreground/5">
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
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-20 pt-24 pb-20 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-3">
              <p className="text-xs tracking-widest uppercase text-brand-gold opacity-80">
                Psicólogo · Psicoterapeuta Transpersonal
              </p>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight">
                Psicoterapia informada en trauma.
              </h1>
              <p className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight opacity-50">
                Somática, transpersonal y basada en evidencia.
              </p>
            </div>

            <p className="text-base md:text-lg leading-relaxed opacity-65 max-w-md">
              Trabajo desde la integración de cuerpo, sistema nervioso y psique
              para acompañar procesos de transformación real. No solo el alivio
              de los síntomas — sino el encuentro con ese misterio que somos.
              Atiendo online para hispanohablantes y presencial en Ciudad de México.
            </p>

            <a
              href="#agendar"
              aria-label="Solicitar entrevista informativa gratuita de 20 minutos"
              className="inline-block border border-brand-gold/60 text-brand-gold px-6 py-3 text-sm tracking-widest uppercase hover:bg-brand-gold hover:text-brand-night transition-colors duration-300"
            >
              Solicitar entrevista informativa
            </a>
          </div>

          {/* NOTA PARA ISAAC: reemplaza este placeholder con tu foto.
              1. Añade tu imagen en /public/isaac.jpg (recomendado 600x750px, proporción 4:5)
              2. Reemplaza el bloque completo con:
                 import Image from "next/image";
                 <div className="hidden md:block">
                   <Image src="/isaac.jpg" alt="Isaac Calderón Derat" width={600} height={750}
                     className="aspect-[4/5] object-cover w-full" />
                 </div>
          */}
          <div className="hidden md:flex items-center justify-center">
            <Logo size={320} variant="color" className="opacity-90" />
          </div>
        </div>
      </section>

      {/* SECCIÓN 2 — ENFOQUE */}
      <section id="enfoque" className="px-6 md:px-12 lg:px-20 py-24 border-t border-foreground/10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xs tracking-widest uppercase text-brand-teal opacity-70 mb-16">
            Cómo trabajo
          </h2>
          <div className="grid md:grid-cols-3 gap-12 md:gap-8 lg:gap-16">

            <div className="space-y-4">
              <div className="w-8 h-px bg-brand-gold mb-6" />
              <h3 className="font-serif text-xl leading-snug">
                El cuerpo como territorio de sanación
              </h3>
              <p className="text-sm leading-relaxed opacity-55">
                El trauma no vive solo en los recuerdos — vive en el sistema nervioso,
                en la tensión muscular, en los patrones de activación que el cuerpo
                aprendió para sobrevivir. Trabajo con psicotraumatología y enfoque
                somático: el cuerpo no es el problema, es parte de la solución.
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-8 h-px bg-brand-teal mb-6" />
              <h3 className="font-serif text-xl leading-snug">
                Tecnología al servicio del proceso
              </h3>
              <p className="text-sm leading-relaxed opacity-55">
                Cuando el proceso lo requiere, integro neurofeedback — evaluación
                y entrenamiento de ondas cerebrales — como información adicional
                sobre el sistema nervioso de cada persona. No como tecnología
                separada, sino como una capa más de comprensión.
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-8 h-px bg-brand-mint mb-6" />
              <h3 className="font-serif text-xl leading-snug">
                Más allá de lo personal
              </h3>
              <p className="text-sm leading-relaxed opacity-55">
                Hay heridas que van más allá de nuestra biografía individual —
                heridas generacionales, de la especie, cósmicas. La psicología
                transpersonal y el trabajo con estados ampliados de conciencia
                abren la posibilidad de sanar en esas capas más profundas,
                con el rigor clínico y ético que merecen.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* SECCIÓN 3 — EL PROCESO */}
      <section id="proceso" className="px-6 md:px-12 lg:px-20 py-24 border-t border-foreground/10">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xs tracking-widest uppercase text-brand-teal opacity-70 mb-16">
            El proceso
          </h2>
          <div className="space-y-0 divide-y divide-foreground/10">

            <div className="py-10 space-y-2">
              <h3 className="font-serif text-lg flex items-baseline gap-3">
                Entrevista informativa
                <span className="font-sans text-xs text-brand-gold opacity-80 tracking-wide">20 min · sin costo</span>
              </h3>
              <p className="text-sm leading-relaxed opacity-55">
                Un espacio para conocernos y explorar si hay resonancia terapéutica.
                No es una sesión, es una conversación honesta sobre lo que buscas
                y lo que puedo ofrecer. Sin compromisos.
              </p>
            </div>

            <div className="py-10 space-y-2">
              <h3 className="font-serif text-lg">Sesión inicial</h3>
              <p className="text-sm leading-relaxed opacity-55">
                Evaluamos juntos el punto de partida: tu historia, tus síntomas,
                lo que ya has intentado. A partir de ahí definimos el encuadre —
                la frecuencia, la modalidad y la dirección del proceso.
              </p>
            </div>

            <div className="py-10 space-y-2">
              <h3 className="font-serif text-lg">Proceso terapéutico</h3>
              <p className="text-sm leading-relaxed opacity-55">
                No hay fórmula fija. Cada proceso encuentra su propia forma y
                jerarquía. Trabajo explorando todas las capas posibles — desde
                lo bioquímico y fisiológico hasta las creencias, el sentido y
                lo que trasciende lo personal.
              </p>
            </div>

          </div>

          <p className="mt-12 text-sm text-brand-gold/60 italic font-serif">
            Vengo de haber atravesado mi propio caos. En la manera en que aprendí, acompaño.
          </p>
        </div>
      </section>

      {/* SECCIÓN 4 — CALENDLY */}
      <section id="agendar" className="px-6 md:px-12 lg:px-20 py-24 border-t border-foreground/10">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xs tracking-widest uppercase text-brand-teal opacity-70 mb-4">
            Agenda una sesión
          </h2>
          <p className="font-serif text-2xl mb-2">
            Entrevista informativa de psicoterapia
            <span className="font-sans text-sm text-brand-gold opacity-80 ml-3">20 min · gratuita</span>
          </p>
          <p className="text-sm opacity-40 mb-12">
            Zona horaria: Ciudad de México (GMT-6)
          </p>

          <CalendlyEmbed slug={SLUG_ENTREVISTA} />
          <CalendlyToggle />
        </div>
      </section>

      {/* SECCIÓN 5 — CONTEXTO INSTITUCIONAL */}
      <section className="px-6 md:px-12 lg:px-20 py-16 border-t border-foreground/10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xs tracking-widest uppercase text-brand-teal opacity-40 mb-8">
            Contexto institucional
          </h2>
          <div className="flex flex-wrap gap-x-10 gap-y-3">

            <a
              href="https://ayam.world"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm opacity-35 hover:text-brand-teal hover:opacity-100 transition-all"
            >
              Ayam Studio — Director ↗
            </a>

            <a
              href="https://cienciapsicodelica.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm opacity-35 hover:text-brand-teal hover:opacity-100 transition-all"
            >
              Ciencia Psicodélica — Director ↗
            </a>

            <a
              href="https://newman.institute"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm opacity-35 hover:text-brand-teal hover:opacity-100 transition-all"
            >
              Neuroclínica Newman — Psicoterapeuta ↗
            </a>

            <span className="text-sm opacity-35">
              El Sanador Interior / Enteogénesis — Co-facilitador
            </span>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-6 md:px-12 lg:px-20 py-10 border-t border-foreground/10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <p className="text-sm opacity-35">Ciudad de México</p>
            <a
              href="mailto:psic@isaaccalderon.me"
              className="text-sm opacity-35 hover:text-brand-teal hover:opacity-100 transition-all"
            >
              psic@isaaccalderon.me
            </a>
          </div>
          <p className="text-xs opacity-20">
            © Isaac Calderón Derat
          </p>
        </div>
      </footer>

    </div>
  );
}
