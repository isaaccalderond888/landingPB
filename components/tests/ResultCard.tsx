import { TEST_CONFIGS, getBand, getSubScaleScore, getSubScaleBand, type TestId } from "@/lib/testData";

const SCALE_LABELS = ["Ningún día", "Varios días", "Más de la mitad", "Casi todos los días"];

interface Props {
  testId: TestId;
  score: number;
  answers: number[];
}

export default function ResultCard({ testId, score, answers }: Props) {
  const config = TEST_CONFIGS[testId];
  const band = getBand(testId, score);
  const { maxScore, minScore } = config;

  const barPct = Math.round(((score - minScore) / (maxScore - minScore)) * 100);

  const highItems = answers
    .map((a, i) => ({ i, a }))
    .filter(({ a }) => a > 0 && a >= Math.ceil(config.scale[config.scale.length - 1].value * 0.5))
    .sort((a, b) => b.a - a.a)
    .slice(0, 4);

  const isDesii = testId === "DESII";
  const isSwls = testId === "SWLS";

  return (
    <div className="border border-border-theme rounded-sm p-6 bg-surface space-y-6">
      {/* Score */}
      <div className="flex items-end gap-4">
        <div className="flex items-baseline gap-2">
          <span className="font-display text-6xl leading-none">{score}{isDesii ? "%" : ""}</span>
          {!isDesii && (
            <span className="text-foreground/30 text-base">/&thinsp;{maxScore}</span>
          )}
        </div>
        <div className="ml-auto text-right">
          <p className="text-xs tracking-widest uppercase opacity-40 mb-0.5">Nivel</p>
          <p className={`text-sm font-medium tracking-wide ${band.textClass}`}>{band.label}</p>
        </div>
      </div>

      {/* Bar */}
      <div className="h-1 bg-foreground/10 rounded-full overflow-hidden">
        <div
          className={`h-full ${band.barClass} transition-all duration-1000 ease-out`}
          style={{ width: `${barPct}%` }}
        />
      </div>

      {isSwls && (
        <div className="flex justify-between text-[10px] opacity-25">
          <span>Muy insatisfecho/a</span>
          <span>Muy satisfecho/a</span>
        </div>
      )}

      <p className="text-sm leading-relaxed opacity-65">{band.description}</p>

      {/* Subscales (DASS-21 etc.) */}
      {config.subScales && config.subScales.length > 0 && (
        <div className="space-y-3">
          <p className="text-xs tracking-widest uppercase opacity-35">Subescalas</p>
          <div className="grid grid-cols-3 gap-3">
            {config.subScales.map((sub) => {
              const subScore = getSubScaleScore(sub, answers);
              const subBand = getSubScaleBand(sub, subScore);
              return (
                <div key={sub.label} className="bg-foreground/5 rounded-sm p-3 space-y-1">
                  <p className="text-xs opacity-40 tracking-wide">{sub.label}</p>
                  <p className="font-display text-2xl">{subScore}</p>
                  <p className={`text-xs font-medium ${subBand.textClass}`}>{subBand.label}</p>
                  <div className="h-0.5 bg-foreground/10 rounded-full overflow-hidden mt-1">
                    <div
                      className={`h-full ${subBand.textClass.replace("text-", "bg-")} transition-all duration-700`}
                      style={{ width: `${(subScore / sub.maxScore) * 100}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* High items */}
      {highItems.length > 0 && (
        <div>
          <p className="text-xs tracking-widest uppercase opacity-35 mb-3">Áreas de mayor atención</p>
          <ul className="space-y-2">
            {highItems.map(({ i, a }) => {
              const scaleLabel = config.scale.find((s) => s.value === a)?.full ?? SCALE_LABELS[a] ?? `${a}`;
              return (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <span className="w-1 h-1 rounded-full bg-brand-gold flex-shrink-0 mt-1.5" />
                  <span className="opacity-65">
                    {config.shortLabels[i] ?? `Ítem ${i + 1}`}
                    <span className="opacity-50 ml-2 text-xs">— {scaleLabel}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <p className="text-xs opacity-25 leading-relaxed border-t border-foreground/10 pt-4">
        {config.disclaimer}
      </p>
    </div>
  );
}
