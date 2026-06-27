const QUESTIONS_SHORT: Record<"PHQ9" | "GAD7", string[]> = {
  PHQ9: [
    "Poco interés o placer",
    "Ánimo deprimido",
    "Sueño alterado",
    "Fatiga o poca energía",
    "Apetito alterado",
    "Baja autoestima",
    "Dificultad para concentrarse",
    "Lentitud o agitación psicomotora",
    "Pensamientos de daño",
  ],
  GAD7: [
    "Nerviosismo o tensión",
    "Preocupación incontrolable",
    "Preocupación excesiva",
    "Dificultad para relajarse",
    "Inquietud o agitación",
    "Irritabilidad",
    "Miedo a que algo terrible ocurra",
  ],
};

const SCALE = ["Ningún día", "Varios días", "Más de la mitad", "Casi todos los días"];

type Band = {
  max: number;
  label: string;
  description: string;
  textClass: string;
  barClass: string;
};

const PHQ9_BANDS: Band[] = [
  { max: 4,  label: "Mínima",               textClass: "text-brand-mint", barClass: "bg-brand-mint", description: "Las puntuaciones en este rango sugieren síntomas muy leves o ausentes. El bienestar emocional parece estar mayormente preservado en este momento." },
  { max: 9,  label: "Leve",                 textClass: "text-brand-teal", barClass: "bg-brand-teal", description: "Hay algunas dificultades presentes que merecen atención. Los síntomas son manejables, pero explorarlos puede ser valioso para prevenir que escalen." },
  { max: 14, label: "Moderada",             textClass: "text-brand-gold", barClass: "bg-brand-gold", description: "El puntaje indica síntomas de intensidad moderada que probablemente están afectando áreas importantes de tu vida cotidiana. Vale la pena acompañamiento profesional." },
  { max: 19, label: "Moderadamente severa", textClass: "text-brand-gold", barClass: "bg-brand-gold", description: "Los síntomas son significativos. Hablar con un profesional de salud mental pronto puede marcar una diferencia real en cómo te sientes." },
  { max: 27, label: "Severa",               textClass: "text-red-400",    barClass: "bg-red-400",    description: "El nivel de síntomas es alto. Es importante buscar apoyo profesional lo antes posible. No tienes que atravesar esto solo/a." },
];

const GAD7_BANDS: Band[] = [
  { max: 4,  label: "Mínima",   textClass: "text-brand-mint", barClass: "bg-brand-mint", description: "Los síntomas de ansiedad son muy leves o prácticamente ausentes. El sistema nervioso parece estar en un estado de relativa calma en este momento." },
  { max: 9,  label: "Leve",     textClass: "text-brand-teal", barClass: "bg-brand-teal", description: "Hay cierto nivel de activación ansiosa presente. Los síntomas son manejables aunque merecen atención para evitar que se instalen con más fuerza." },
  { max: 14, label: "Moderada", textClass: "text-brand-gold", barClass: "bg-brand-gold", description: "El puntaje refleja una ansiedad de intensidad moderada que probablemente está afectando tu descanso, concentración o relaciones. Acompañamiento profesional puede ser muy útil." },
  { max: 21, label: "Severa",   textClass: "text-red-400",    barClass: "bg-red-400",    description: "El nivel de ansiedad es alto. Es importante buscar apoyo profesional pronto. Trabajar con el sistema nervioso puede traer alivio real." },
];

const MAX_SCORE = { PHQ9: 27, GAD7: 21 };

function getBand(score: number, test: "PHQ9" | "GAD7"): Band {
  const bands = test === "PHQ9" ? PHQ9_BANDS : GAD7_BANDS;
  return bands.find((b) => score <= b.max) ?? bands[bands.length - 1];
}

interface Props {
  score: number;
  answers: number[];
  test: "PHQ9" | "GAD7";
}

export default function ResultCard({ score, answers, test }: Props) {
  const band = getBand(score, test);
  const maxScore = MAX_SCORE[test];
  const questions = QUESTIONS_SHORT[test];

  const highItems = answers
    .map((a, i) => ({ i, score: a }))
    .filter((x) => x.score >= 2)
    .sort((a, b) => b.score - a.score);

  return (
    <div className="border border-foreground/10 rounded-sm p-6 bg-brand-navy/40 backdrop-blur-sm space-y-6">
      {/* Score + label */}
      <div className="flex items-end gap-4">
        <div className="flex items-baseline gap-2">
          <span className="font-serif text-6xl leading-none">{score}</span>
          <span className="text-foreground/30 text-base">/&thinsp;{maxScore}</span>
        </div>
        <div className="ml-auto text-right">
          <p className="text-xs tracking-widest uppercase opacity-40 mb-0.5">Nivel</p>
          <p className={`text-sm font-medium tracking-wide ${band.textClass}`}>{band.label}</p>
        </div>
      </div>

      {/* Score bar */}
      <div className="h-1 bg-foreground/10 rounded-full overflow-hidden">
        <div
          className={`h-full ${band.barClass} transition-all duration-1000 ease-out`}
          style={{ width: `${(score / maxScore) * 100}%` }}
        />
      </div>

      <p className="text-sm leading-relaxed opacity-65">{band.description}</p>

      {/* High-scoring items */}
      {highItems.length > 0 && (
        <div>
          <p className="text-xs tracking-widest uppercase opacity-35 mb-3">Áreas de mayor atención</p>
          <ul className="space-y-2">
            {highItems.map(({ i, score: s }) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <span className="w-1 h-1 rounded-full bg-brand-gold flex-shrink-0 mt-1.5" />
                <span className="opacity-65">
                  {questions[i]}
                  <span className="opacity-50 ml-2 text-xs">— {SCALE[s]}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="text-xs opacity-25 leading-relaxed border-t border-foreground/10 pt-4">
        El {test === "PHQ9" ? "PHQ-9" : "GAD-7"} es una herramienta de tamizaje clínico, no un diagnóstico. Los resultados deben interpretarse en contexto y en acompañamiento con un profesional de salud mental.
      </p>
    </div>
  );
}
