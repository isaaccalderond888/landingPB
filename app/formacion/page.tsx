import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/components/Logo";
import ThemeToggle from "@/components/ThemeToggle";

export const metadata: Metadata = {
  title: "Formación · Isaac Calderón Derat",
  description:
    "Certificaciones en psicotraumatología y terapia asistida con psicodélicos, formación transpersonal y trayectoria académica de Isaac Calderón Derat.",
};

/**
 * Página deliberadamente aparte: no se enlaza desde la portada.
 * Quien llega buscando acompañamiento no se topa con un currículum;
 * quien quiere verificar credenciales lo hace en un clic desde el pie.
 *
 * Cada insignia es el archivo oficial del emisor, sin recolorear ni alterar:
 * modificar una marca de certificación normalmente infringe sus condiciones
 * de uso. Conservan su transparencia original, así que se apoyan directamente
 * sobre la tarjeta. Por eso esta página existe aparte: cuatro sellos de dos
 * emisores distintos no se integran al sistema visual del sitio, se contienen.
 */

interface Certificacion {
  sigla: string;
  nombre: string;
  insignia: string;
  emitida: string;
  vigencia: string;
  id: string;
  url: string;
}

const CERTIFICACIONES: Certificacion[] = [
  {
    sigla: "CPT-I",
    nombre: "Profesional Certificado Informado en Trauma Nivel CPT-I",
    insignia: "/formacion/cpt-i.png",
    emitida: "21 de agosto de 2025",
    vigencia: "21 de agosto de 2027",
    id: "158803506",
    url: "https://www.credential.net/0bce19b8-caa3-4219-ae9d-ecb9fef3364e",
  },
  {
    sigla: "CPT-II",
    nombre: "Profesional Clínico Certificado en Trauma Psicológico CPT-II",
    insignia: "/formacion/cpt-ii.png",
    emitida: "25 de febrero de 2026",
    vigencia: "25 de febrero de 2028",
    id: "175486251",
    url: "https://www.credential.net/faa6a564-b674-4bf4-99f4-828157c2ca49",
  },
  {
    sigla: "CPT-III",
    nombre: "Clinical Certification in Complex Trauma & Dissociation Specialist",
    insignia: "/formacion/cpt-iii.png",
    emitida: "25 de marzo de 2026",
    vigencia: "25 de marzo de 2028",
    id: "177989370",
    url: "https://www.credential.net/59122258-4b6e-4812-ad15-59b1c205a288",
  },
  {
    sigla: "CPAT-I",
    nombre: "TraumaPro CPAT-I · Psychedelic-Assisted Therapy for Trauma",
    insignia: "/formacion/cpat-i.png",
    emitida: "11 de marzo de 2026",
    vigencia: "11 de marzo de 2028",
    id: "176749091",
    url: "https://www.credential.net/25d2bbe5-1955-4f95-b707-3c86352f2029",
  },
];

const NEWMAN = [
  { titulo: "Diplomado en Psicotraumatología CPT-III", detalle: "120 horas · diciembre 2024" },
  { titulo: "Diplomado en Terapia Asistida con Psicodélicos (TAPS)", detalle: "febrero 2026" },
  {
    titulo: "Tratamiento de Estabilización Informado en Trauma, Nivel 1 (TIST-N1)",
    detalle: "12 horas · 28 y 29 de noviembre de 2025 · con Janina Fisher",
  },
  {
    titulo: "Taller Finding Solid Ground",
    detalle: "16 horas · 14 y 15 de noviembre de 2025 · con Bethany Brand y Ruth Lanius",
  },
];

const NEUROFEEDBACK = [
  {
    titulo: "Uso clínico del neurofeedback y desarrollo de protocolos, teoría y práctica",
    detalle: "nivel intermedio · 3 a 5 de marzo de 2025",
  },
  {
    titulo: "Un enfoque integral sobre la aplicación de Neurofeedback y Biofeedback en Psicotrauma",
    detalle: "nivel intermedio · 6 y 7 de marzo de 2025",
  },
];

const EPTI = [
  "Especialización en Psicoterapia Transpersonal-Integral",
  "Coaching Primordial",
  "Danza Primal, Movimiento y Meditación Primordial",
];

export default function FormacionPage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <nav
        aria-label="Navegación"
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 bg-brand-night/90 text-[#EEF2EC] backdrop-blur-md border-b border-white/10"
      >
        <Link href="/" className="flex items-center gap-3 group">
          <Logo size={32} variant="color" />
          <span className="text-sm tracking-widest uppercase text-white/65 group-hover:text-white transition-colors hidden sm:block">
            Isaac Calderón Derat
          </span>
        </Link>
        <div className="flex items-center gap-6 md:gap-8">
          <Link href="/#agendar" className="rounded-sm text-xs tracking-widest uppercase text-white/60 hover:text-[#69A5BB] transition-colors hidden md:block">
            Agendar sesión
          </Link>
          <ThemeToggle />
        </div>
      </nav>

      <header className="pt-32 pb-12 px-6 md:px-12 lg:px-20 bg-gradient-to-b from-brand-night via-brand-navy to-brand-night text-[#EEF2EC]">
        <div className="max-w-4xl mx-auto space-y-4">
          <p className="text-xs tracking-widest uppercase text-brand-gold opacity-80">Trayectoria</p>
          <h1 className="font-display text-4xl md:text-5xl leading-tight">Formación</h1>
          <p className="text-base leading-relaxed opacity-60 max-w-xl">
            Las certificaciones de abajo son verificables: cada insignia enlaza al
            registro del emisor.
          </p>
        </div>
      </header>

      <main className="px-6 md:px-12 lg:px-20 py-14">
        <div className="max-w-4xl mx-auto space-y-16">

          {/* ── Certificaciones verificables ─────────────────── */}
          <section>
            <div className="mb-6 border-l-2 border-brand-gold/40 pl-4">
              <h2 className="font-display text-xl leading-snug">Psicotraumatología clínica</h2>
              <p className="text-xs text-foreground/60 mt-1">
                TraumaPro Certifications · aval externo, con vigencia y folio verificables
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {CERTIFICACIONES.map((c) => (
                <a
                  key={c.sigla}
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex gap-5 items-start p-5 rounded-sm border border-border-theme bg-surface hover:border-brand-teal/40 hover:shadow-[0_8px_32px_rgba(37,109,134,0.12)] transition-all duration-200"
                >
                  {/* Las insignias traen transparencia real: van sueltas sobre
                      la tarjeta, sin recuadro que la desperdicie. */}
                  <Image
                    src={c.insignia}
                    alt={`Insignia de la certificación ${c.sigla}`}
                    width={72}
                    height={72}
                    className="flex-shrink-0 w-[72px] h-[72px] object-contain"
                  />
                  <span className="min-w-0">
                    <span className="block font-display text-lg leading-none mb-1.5">{c.sigla}</span>
                    <span className="block text-xs leading-relaxed text-foreground/70 mb-2.5">{c.nombre}</span>
                    <span className="block text-[11px] leading-relaxed text-foreground/45">
                      Emitida el {c.emitida} · vigente hasta el {c.vigencia}
                      <br />
                      Folio {c.id}
                    </span>
                    <span className="block text-[11px] mt-2 text-interactive-text opacity-0 group-hover:opacity-100 transition-opacity">
                      Verificar ↗
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </section>

          {/* ── Newman ───────────────────────────────────────── */}
          <section>
            <div className="mb-6 border-l-2 border-brand-teal/40 pl-4">
              <h2 className="font-display text-xl leading-snug">Newman</h2>
              <p className="text-xs text-foreground/60 mt-1">
                Instituto de Psicotraumatología de Latinoamérica
              </p>
            </div>
            <ul className="divide-y divide-foreground/10 border-t border-foreground/10">
              {NEWMAN.map((n) => (
                <li key={n.titulo} className="py-4 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="text-sm">{n.titulo}</span>
                  <span className="text-xs text-foreground/45">{n.detalle}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* ── Neurofeedback ────────────────────────────────── */}
          <section>
            <div className="mb-6 border-l-2 border-brand-teal/40 pl-4">
              <h2 className="font-display text-xl leading-snug">Neurofeedback</h2>
              <p className="text-xs text-foreground/60 mt-1">
                Boston NeuroDynamics · Applied Neuroscience Center, Ciudad de México
              </p>
            </div>
            <ul className="divide-y divide-foreground/10 border-t border-foreground/10">
              {NEUROFEEDBACK.map((n) => (
                <li key={n.titulo} className="py-4 space-y-1">
                  <p className="text-sm leading-snug">{n.titulo}</p>
                  <p className="text-xs text-foreground/45">{n.detalle}</p>
                </li>
              ))}
            </ul>
            <p className="text-sm leading-relaxed text-foreground/70 mt-5">
              Integro evaluación y entrenamiento de ondas cerebrales en el proceso
              terapéutico. <strong className="text-foreground">La certificación está en
              proceso:</strong> quedan pendientes supervisiones y examen.
            </p>
          </section>

          {/* ── EPTI ─────────────────────────────────────────── */}
          <section>
            <div className="mb-6 border-l-2 border-brand-mint/40 pl-4">
              <h2 className="font-display text-xl leading-snug">Formación transpersonal</h2>
              <p className="text-xs text-foreground/60 mt-1">
                <a
                  href="https://www.transpersonals.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-interactive-text hover:underline underline-offset-4"
                >
                  Escuela de Psicología Transpersonal (EPTI) ↗
                </a>
              </p>
            </div>
            <ul className="divide-y divide-foreground/10 border-t border-foreground/10">
              {EPTI.map((e) => (
                <li key={e} className="py-4 text-sm">{e}</li>
              ))}
            </ul>
            <p className="text-sm leading-relaxed text-foreground/70 mt-5">
              En esa misma escuela fui <strong className="text-foreground">director académico y
              después director de la sede México</strong>, durante alrededor de seis años.
            </p>
            <p className="text-xs text-foreground/45 mt-2">
              Formación cursada a partir de 2012; los títulos conservan la denominación
              con la que se impartieron entonces. Diplomas en físico.
            </p>
          </section>

          {/* ── Pie de página ────────────────────────────────── */}
          <div className="border-t border-foreground/10 pt-8 flex flex-wrap gap-6 items-center">
            <Link href="/" className="text-sm text-foreground/60 hover:text-interactive-text transition-colors">
              ← Inicio
            </Link>
            <Link href="/#agendar" className="text-sm text-foreground/60 hover:text-interactive-text transition-colors">
              Agendar sesión
            </Link>
            <a href="mailto:psic@isaaccalderon.me" className="text-sm text-foreground/60 hover:text-interactive-text transition-colors">
              psic@isaaccalderon.me
            </a>
          </div>

        </div>
      </main>
    </div>
  );
}
