import type { Metadata } from "next";

// ── Metadata — no indexable, semi-privada ─────────────────────────
export const metadata: Metadata = {
  title: "Guías de proceso · Isaac Calderón Derat",
  description: "Documentos de preparación, protocolo y integración para personas en proceso terapéutico.",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

// ── Tipos ─────────────────────────────────────────────────────────
interface GuideCard {
  id: string;
  title: string;
  description: string;
  tag: string;
  tagColor: "gold" | "teal" | "mint";
  filename: string; // PDF en /public/guias/
  available: boolean;
}

interface GuideBlock {
  marker: string;
  heading: string;
  subheading: string;
  guides: GuideCard[];
}

// ── Contenido ─────────────────────────────────────────────────────
const BLOCKS: GuideBlock[] = [
  {
    marker: "I",
    heading: "Antes de la sesión",
    subheading: "Preparación integral — cuerpo, mente, emoción y suplementación.",
    guides: [
      {
        id: "preparacion-completa",
        title: "Guía completa de preparación",
        description:
          "Nutrición física, emocional, mental y del alma para los días previos a la sesión. Incluye el objeto sagrado.",
        tag: "Preparación",
        tagColor: "gold",
        filename: "Guia_Completa_Participantes.pdf",
        available: true,
      },
      {
        id: "suplementacion",
        title: "Protocolo de suplementación",
        description:
          "Sugerencias de stack antioxidante y serotoninérgico antes, durante y después de la sesión.",
        tag: "MDMA",
        tagColor: "teal",
        filename: "Protocolo_Cuidado_Participantes.pdf",
        available: true,
      },
    ],
  },
  {
    marker: "II",
    heading: "Durante el proceso",
    subheading: "Qué esperar en la sesión experimental y cómo habitarla.",
    guides: [
      {
        id: "que-esperar",
        title: "Qué esperar en la sesión",
        description:
          "Efectos, tiempos, encuadre del espacio terapéutico y cómo relacionarte con lo que emerja.",
        tag: "MDMA",
        tagColor: "teal",
        filename: "Que_Esperar_Sesion.pdf",
        available: false,
      },
      {
        id: "consentimiento",
        title: "Comprensión del proceso",
        description:
          "Naturaleza del tratamiento, beneficios documentados, riesgos y compromisos mutuos.",
        tag: "Clínico",
        tagColor: "mint",
        filename: "Comprension_Proceso.pdf",
        available: false,
      },
    ],
  },
  {
    marker: "III",
    heading: "Después de la sesión",
    subheading: "Integración, cuidado post-sesión y señales de alerta.",
    guides: [
      {
        id: "integracion",
        title: "Guía de integración",
        description:
          "Ejes de trabajo, herramientas y estructura de las semanas siguientes a la sesión experimental.",
        tag: "Integración",
        tagColor: "gold",
        filename: "Guia_Integracion.pdf",
        available: false,
      },
      {
        id: "banderas-rojas",
        title: "Señales de alerta",
        description:
          "Cuándo contactar al equipo, qué síntomas requieren atención y cómo acceder a apoyo urgente.",
        tag: "Seguridad",
        tagColor: "mint",
        filename: "Senales_Alerta.pdf",
        available: false,
      },
    ],
  },
];

// ── Tag colors ────────────────────────────────────────────────────
const TAG_STYLES: Record<GuideCard["tagColor"], string> = {
  gold:  "bg-[#EAD06A]/10 text-[#EAD06A]   border border-[#EAD06A]/20",
  teal:  "bg-[#256D86]/10 text-[#256D86]   border border-[#256D86]/20",
  mint:  "bg-[#BCD3D6]/10 text-[#BCD3D6]   border border-[#BCD3D6]/20",
};

// ── Card ──────────────────────────────────────────────────────────
function GuideCard({ guide }: { guide: GuideCard }) {
  return (
    <div
      className={[
        "group relative flex flex-col gap-4 rounded-xl p-6",
        "bg-[#183463]/40 border border-white/5",
        "transition-all duration-300",
        guide.available
          ? "hover:border-[#EAD06A]/30 hover:bg-[#183463]/60"
          : "opacity-50",
      ].join(" ")}
    >
      {/* Tag */}
      <span
        className={`self-start rounded-full px-3 py-0.5 text-[11px] font-medium tracking-wide uppercase ${TAG_STYLES[guide.tagColor]}`}
      >
        {guide.tag}
      </span>

      {/* Texto */}
      <div className="flex flex-col gap-2 flex-1">
        <h3 className="text-[#eef2ec] font-medium text-[15px] leading-snug">
          {guide.title}
        </h3>
        <p className="text-[#9BBDC2] text-[13px] leading-relaxed">
          {guide.description}
        </p>
      </div>

      {/* Acción */}
      <div className="pt-2 border-t border-white/5">
        {guide.available ? (
          <a
            href={`/guias/${guide.filename}`}
            download
            className={[
              "inline-flex items-center gap-2 text-[13px] font-medium",
              "text-[#EAD06A] hover:text-[#efdb8a] transition-colors duration-200",
            ].join(" ")}
          >
            <DownloadIcon />
            Descargar
          </a>
        ) : (
          <span className="text-[12px] text-[#9BBDC2]/60 italic">
            Próximamente
          </span>
        )}
      </div>
    </div>
  );
}

// ── Divisor vertical marca ────────────────────────────────────────
function BlockMarker({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <span className="font-display italic font-medium text-[#EAD06A] text-[13px] tracking-widest">
        {label}
      </span>
      <div className="flex-1 h-px bg-gradient-to-r from-[#EAD06A]/40 to-transparent" />
    </div>
  );
}

// ── Icono descarga ────────────────────────────────────────────────
function DownloadIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M7 1v8M4 6l3 3 3-3M2 11h10"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ── Page ──────────────────────────────────────────────────────────
export default function GuiasPage() {
  return (
    <main className="min-h-screen bg-[#0b1830] text-[#eef2ec]">
      {/* Glow ambiental — consistente con el resto del sitio */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 overflow-hidden"
      >
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-[#256D86]/5 blur-[120px]" />
        <div className="absolute top-1/3 -right-20 w-[300px] h-[300px] rounded-full bg-[#EAD06A]/4 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 py-20 sm:py-28">

        {/* ── Encabezado ───────────────────────────────────────── */}
        <header className="mb-20">
          {/* Credencial */}
          <p className="text-[11px] tracking-[0.18em] uppercase text-[#9BBDC2] mb-6">
            Psicólogo · Psicoterapeuta Transpersonal
          </p>

          {/* Línea gold */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-8 h-px bg-[#EAD06A]" />
            <span className="text-[#EAD06A] text-[11px] tracking-widest uppercase">
              Isaac Calderón Derat
            </span>
          </div>

          {/* Título */}
          <h1 className="font-display text-[38px] sm:text-[52px] font-bold leading-[1.1] text-[#eef2ec] mb-6">
            Guías de{" "}
            <em className="italic text-[#EAD06A]">proceso</em>
          </h1>

          <p className="text-[#9BBDC2] text-[15px] leading-relaxed max-w-lg">
            Documentos de acompañamiento para personas en proceso terapéutico.
            Están aquí para que llegues más preparada, habites mejor la
            experiencia e integres lo que emerja.
          </p>
        </header>

        {/* ── Bloques de guías ─────────────────────────────────── */}
        <div className="flex flex-col gap-20">
          {BLOCKS.map((block) => (
            <section key={block.marker}>
              <BlockMarker label={block.marker} />

              {/* Encabezado del bloque */}
              <div className="mb-8">
                <h2 className="font-display text-[22px] font-semibold text-[#eef2ec] mb-2">
                  {block.heading}
                </h2>
                <p className="text-[#9BBDC2] text-[13px]">
                  {block.subheading}
                </p>
              </div>

              {/* Grid de tarjetas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {block.guides.map((guide) => (
                  <GuideCard key={guide.id} guide={guide} />
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* ── Pie ──────────────────────────────────────────────── */}
        <footer className="mt-28 pt-8 border-t border-white/5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-[#9BBDC2] text-[12px]">
              Cualquier duda sobre estos documentos, escríbeme.
            </p>
            <a
              href="mailto:psic@isaaccalderon.me"
              className="text-[12px] text-[#EAD06A] hover:text-[#efdb8a] transition-colors"
            >
              psic@isaaccalderon.me
            </a>
          </div>
        </footer>

      </div>
    </main>
  );
}
