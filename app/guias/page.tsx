import type { Metadata } from "next";
import DescargaGuia from "@/components/DescargaGuia";

// ── Metadata — no indexable, semi-privada ─────────────────────────
export const metadata: Metadata = {
  title: "Preparación e integración · Isaac Calderón Derat",
  description:
    "Guía de preparación e integración para personas en procesos con estados ampliados de conciencia. Contenido abierto y PDF descargable.",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

/**
 * Portal de una sola guía, no catálogo.
 *
 * Antes esta página anunciaba seis documentos, cinco de ellos en gris con
 * "Próximamente", que Isaac no sabía si iba a escribir. Prometer material que
 * quizá no exista lee como proyecto a medias; por eso ahora se ofrece
 * únicamente lo que está terminado. Cuando haya otra guía, se añade su sección.
 *
 * El contenido va ABIERTO en la página y el PDF se entrega a cambio del correo
 * — el patrón de la Integration Station de MAPS. El orden importa: el PDF es
 * "llévatelo contigo", no "paga con tu correo para enterarte".
 *
 * Fuente del texto: content/guias/preparacion-integracion.html (22 secciones).
 * Esta página es su síntesis navegable; si la fuente cambia, revísala.
 */

// ── Contenido ─────────────────────────────────────────────────────

interface Bloque {
  titulo?: string;
  texto?: string;
  lista?: string[];
}

interface Seccion {
  marca: string;
  titulo: string;
  entrada: string;
  bloques: Bloque[];
}

const SECCIONES: Seccion[] = [
  {
    marca: "I",
    titulo: "La pregunta central",
    entrada:
      "Antes de pensar en sustancia, fecha o facilitador, la pregunta es otra: ¿hay condiciones para que lo que se abra pueda ser sostenido?",
    bloques: [
      {
        texto:
          "La respuesta no depende sólo de cuánto deseas la experiencia. Incluye tu estado físico y emocional, el entorno, la calidad del acompañamiento, los límites, el consentimiento y la red disponible después.",
      },
      {
        titulo: "Inventario breve",
        lista: [
          "¿Tengo estabilidad básica en sueño, alimentación, vivienda y relaciones?",
          "¿Estoy atravesando una crisis activa, un duelo reciente o una urgencia extrema?",
          "¿Puedo decir que no, en cualquier momento, sin costo?",
          "¿Quién estará disponible los días siguientes?",
        ],
      },
    ],
  },
  {
    marca: "II",
    titulo: "Preparación: cuatro capas",
    entrada:
      "Ninguna capa garantiza una experiencia buena. Juntas permiten valorar si existe un contenedor suficiente.",
    bloques: [
      {
        titulo: "Corporal",
        texto:
          "El cuerpo no es el vehículo que te lleva a la experiencia: forma parte de ella. Observa sueño, descanso, alimentación, enfermedad reciente, dolor, agotamiento y medicamentos. No suspendas medicamentos ni cambies dosis sin acompañamiento médico.",
      },
      {
        titulo: "Emocional",
        texto:
          "Qué está vivo hoy, qué llevas sin procesar, y con qué recursos cuentas para sostener lo que aparezca sin actuarlo de inmediato.",
      },
      {
        titulo: "Relacional y contextual",
        texto:
          "Quién acompaña, con qué formación, con qué límites acordados. Dónde ocurre, quién más está, qué pasa si algo se complica.",
      },
      {
        titulo: "De sentido",
        texto:
          "Desde dónde llega el impulso. No es lo mismo curiosidad que urgencia, ni búsqueda que huida.",
      },
    ],
  },
  {
    marca: "III",
    titulo: "Intención encarnada",
    entrada:
      "Una intención madura orienta; no controla. En lugar de buscar una frase perfecta, escucha cómo responde tu cuerpo.",
    bloques: [
      {
        titulo: "Práctica de cinco minutos",
        lista: [
          "Siente el peso de los pies y haz tres respiraciones cómodas.",
          "Pregunta: ¿qué necesito en este momento de mi vida?",
          "Deja que aparezca una palabra, una imagen o una sensación.",
          "Nota dónde se siente: apertura, contracción, calma, urgencia o ambivalencia.",
          "Pregunta: ¿de dónde viene esto — amor, curiosidad, cansancio, miedo o escape?",
          "Escribe una frase sin convertirla en mandato.",
        ],
      },
    ],
  },
  {
    marca: "IV",
    titulo: "Durante: orientación sin prescripción",
    entrada:
      "Un insight puede sentirse absolutamente verdadero sin ser necesariamente un hecho verificable. Eso no lo invalida; pide tiempo.",
    bloques: [
      {
        titulo: "Tres anclas",
        lista: [
          "Orientación — nombra dónde estás, quién te acompaña y que el estado es temporal.",
          "Cuerpo — siente superficies estables, temperatura, postura y respiración sin forzar.",
          "Comunicación — expresa con claridad si necesitas menos estímulo, distancia, apoyo o atención médica.",
        ],
      },
    ],
  },
  {
    marca: "V",
    titulo: "Las primeras 24 a 48 horas",
    entrada:
      "Prioriza aterrizaje y funcionamiento antes que interpretación. El significado puede esperar; la estabilidad no.",
    bloques: [
      {
        titulo: "Puede ayudar",
        lista: [
          "Dormir y recuperar rutinas básicas de alimentación e hidratación.",
          "Reducir compromisos y estímulos innecesarios.",
          "Registrar recuerdos sin exigir coherencia.",
          "Hablar con alguien capaz de escuchar sin dramatizar ni idealizar.",
          "Posponer decisiones irreversibles hasta recuperar estabilidad y perspectiva.",
        ],
      },
      {
        titulo: "Conviene evitar",
        lista: [
          "Convertir de inmediato cada imagen en una certeza literal.",
          "Publicar detalles íntimos por impulso.",
          "Tomar decisiones grandes en caliente.",
        ],
      },
    ],
  },
  {
    marca: "VI",
    titulo: "Qué significa integrar",
    entrada:
      "Integrar es pasar del insight al hábito, del símbolo a la relación, y de la experiencia extraordinaria a una vida cotidiana más habitable.",
    bloques: [
      {
        texto:
          "Bathje, Majeski y Kudowor describen la integración como un proceso activo de revisar, trabajar, traducir y procesar una experiencia para incorporar gradualmente aprendizajes a la vida. No existe una única técnica ni un plazo universal.",
      },
      {
        titulo: "Integración sí es",
        lista: [
          "Dar tiempo a que el significado cambie.",
          "Contrastar insights con la realidad y con personas confiables.",
          "Cuidar cuerpo, relaciones y rutinas.",
          "Traducir lo vivido en acciones pequeñas y verificables.",
        ],
      },
    ],
  },
  {
    marca: "VII",
    titulo: "Seis territorios para revisar",
    entrada:
      "El Modelo Sintetizado de Integración organiza el proceso en seis dominios. Úsalos como preguntas, no como una lista que debas completar.",
    bloques: [
      {
        titulo: "Mente",
        texto:
          "¿Qué creencias se flexibilizaron? ¿Qué interpretación necesita permanecer provisional?",
      },
      {
        titulo: "Cuerpo",
        texto: "¿Cómo están mi sueño, apetito, energía, tensión y sensación de seguridad?",
      },
      {
        titulo: "Espíritu y sentido",
        texto: "¿Cambió mi relación con el propósito, la muerte, lo sagrado o la pertenencia?",
      },
      {
        titulo: "Estilo de vida",
        texto: "¿Qué hábito concreto sostiene lo que entendí? ¿Cuál lo contradice?",
      },
      {
        titulo: "Relaciones y comunidad",
        texto: "¿Con quién puedo hablar de esto sin ser idealizado ni corregido?",
      },
      {
        titulo: "Naturaleza",
        texto: "¿Qué lugar y qué ritmo me devuelven a una escala habitable?",
      },
    ],
  },
  {
    marca: "VIII",
    titulo: "Prácticas de integración",
    entrada:
      "Elige pocas prácticas y observa su efecto. Más actividad no equivale a más integración.",
    bloques: [
      {
        titulo: "Escritura",
        texto:
          "Distingue entre lo que ocurrió, lo que interpretaste y lo que quieres explorar.",
      },
      {
        titulo: "Escucha corporal",
        texto:
          "Nota una sensación concreta antes de explicarla. Si esto aumenta mucho la activación, detente y busca acompañamiento.",
      },
      {
        titulo: "Arte y simbolización",
        texto:
          "Dibujo, música, movimiento o collage pueden dar forma a contenido que todavía no cabe en palabras.",
      },
      {
        titulo: "Vínculo",
        texto:
          "Conversaciones donde puedas pensar en voz alta sin que nadie apure una conclusión.",
      },
    ],
  },
  {
    marca: "IX",
    titulo: "Discernimiento y ética",
    entrada:
      "Marc Aixalá propone una postura de no directividad, colaboración, curiosidad, compasión, límites y humildad. Sirve también para evaluar a quien te acompaña — incluido yo.",
    bloques: [
      {
        titulo: "Una persona acompañante responsable",
        lista: [
          "No impone significados ni afirma conocer tu verdad profunda.",
          "Distingue apoyo de psicoterapia y reconoce sus competencias.",
          "Mantiene límites claros, especialmente en estados de vulnerabilidad.",
          "No sexualiza la relación ni usa el contacto físico de forma ambigua.",
          "Acepta supervisión, deriva cuando corresponde y documenta acuerdos.",
          "No promete curación ni atribuye todo malestar a un proceso espiritual.",
        ],
      },
    ],
  },
  {
    marca: "X",
    titulo: "Señales de cuidado y señales de alerta",
    entrada:
      "La diferencia no está en la intensidad de la experiencia, sino en hacia dónde se mueve tu vida después.",
    bloques: [
      {
        titulo: "Integración saludable",
        lista: [
          "Recuperas o mejoras gradualmente el sueño y las rutinas.",
          "Puedes sostener ambigüedad sin actuar impulsivamente.",
          "Aumenta tu conexión con el cuerpo y con personas confiables.",
          "Los cambios son pequeños, observables y compatibles con tus responsabilidades.",
          "Puedes pedir ayuda y aceptar retroalimentación.",
        ],
      },
      {
        titulo: "Busca apoyo pronto si",
        lista: [
          "El miedo, la confusión, la despersonalización o el insomnio persisten o aumentan.",
          "Hay deterioro en trabajo, estudio, autocuidado o relaciones.",
          "Aparecen pensamientos suicidas, conducta peligrosa, agitación extrema o paranoia.",
          "No puedes alimentarte, dormir o sostener tus funciones básicas.",
        ],
      },
    ],
  },
];

// ── Piezas ────────────────────────────────────────────────────────

function BloqueVista({ b }: { b: Bloque }) {
  return (
    <div className="space-y-2">
      {b.titulo && (
        <h3 className="text-[#eef2ec] font-medium text-[15px] leading-snug">{b.titulo}</h3>
      )}
      {b.texto && <p className="text-[#9BBDC2] text-[14px] leading-relaxed">{b.texto}</p>}
      {b.lista && (
        <ul className="space-y-1.5">
          {b.lista.map((li) => (
            <li key={li} className="flex gap-3 text-[14px] leading-relaxed text-[#9BBDC2]">
              <span className="mt-[9px] h-[3px] w-[3px] flex-none rounded-full bg-[#EAD06A]/70" />
              <span>{li}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────
export default function GuiasPage() {
  return (
    <main className="relative min-h-screen bg-[#0b1830] text-[#eef2ec]">
      {/* Arte de cabecera: vetas doradas, el mismo registro que la portada del
          documento que esta página ofrece. Se desvanece hacia abajo para que
          el texto nunca compita con la imagen. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[560px] overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/arte/vetas.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b1830]/55 via-[#0b1830]/80 to-[#0b1830]" />
      </div>

      <div className="relative mx-auto max-w-3xl px-6 py-20 sm:py-28">

        {/* ── Encabezado ───────────────────────────────────────── */}
        <header className="mb-14">
          <p className="text-[11px] tracking-[0.18em] uppercase text-[#9BBDC2] mb-6">
            Psicólogo · Psicoterapeuta Transpersonal
          </p>

          <div className="flex items-center gap-4 mb-8">
            <div className="w-8 h-px bg-[#EAD06A]" />
            <span className="text-[#EAD06A] text-[11px] tracking-widest uppercase">
              Isaac Calderón Derat
            </span>
          </div>

          <h1 className="font-display text-[38px] sm:text-[52px] font-bold leading-[1.1] text-[#eef2ec] mb-6">
            Preparación e{" "}
            <em className="italic text-[#EAD06A]">integración</em>
          </h1>

          <p className="text-[#9BBDC2] text-[15px] leading-relaxed max-w-lg">
            Escribí esta guía para las personas que acompaño y para quienes están
            considerando una experiencia en estados ampliados de conciencia, ya la
            vivieron, o forman parte de la red de apoyo de alguien que la vivió.
          </p>
        </header>

        {/* ── Qué es y qué no es ───────────────────────────────── */}
        <div className="mb-20 rounded-sm border-l-2 border-[#EAD06A]/50 bg-white/[0.02] py-5 pl-6 pr-5">
          <p className="text-[14px] leading-relaxed text-[#9BBDC2]">
            No enseña a conseguir, dosificar ni administrar sustancias, y no sustituye
            una evaluación médica, psicológica o psiquiátrica.{" "}
            <span className="text-[#eef2ec]">
              Es un mapa para hacer mejores preguntas, reconocer límites y traducir una
              experiencia intensa en cuidado cotidiano.
            </span>
          </p>
        </div>

        {/* ── Secciones ────────────────────────────────────────── */}
        <div className="flex flex-col gap-16">
          {SECCIONES.map((s) => (
            <section key={s.marca}>
              <div className="flex items-center gap-4 mb-6">
                <span className="font-display italic font-medium text-[#EAD06A] text-[13px] tracking-widest">
                  {s.marca}
                </span>
                <div className="flex-1 h-px bg-gradient-to-r from-[#EAD06A]/40 to-transparent" />
              </div>

              <h2 className="font-display text-[26px] leading-snug text-[#eef2ec] mb-3">
                {s.titulo}
              </h2>
              <p className="text-[15px] leading-relaxed text-[#9BBDC2] mb-7 max-w-xl">
                {s.entrada}
              </p>

              <div className="flex flex-col gap-6">
                {s.bloques.map((b, i) => (
                  <BloqueVista key={i} b={b} />
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* ── Descarga ─────────────────────────────────────────── */}
        <div className="mt-20">
          <DescargaGuia />
        </div>

        {/* ── Pie ──────────────────────────────────────────────── */}
        <footer className="mt-20 pt-8 border-t border-white/5">
          <p className="text-[14px] leading-relaxed text-[#9BBDC2] mb-6 max-w-lg">
            Si algo de lo que aparece en estas páginas necesita ser conversado,
            escríbeme. Acompaño procesos de preparación e integración en Ciudad de
            México y en línea.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-[#9BBDC2]/70 text-[12px]">
              Isaac Calderón Derat · Psicólogo · Psicoterapeuta Transpersonal
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
