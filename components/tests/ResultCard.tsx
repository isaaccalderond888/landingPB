import { TEST_CONFIGS, getBand, getSubScaleScore, getSubScaleBand, type TestId } from "@/lib/testData";

const SCALE_LABELS = ["Ningún día", "Varios días", "Más de la mitad", "Casi todos los días"];

interface Props {
  testId: TestId;
  score: number;
  answers: number[];
}

/**
 * Jerarquía deliberada: cuando la prueba tiene subescalas, el perfil por dimensión
 * es la lectura principal y el puntaje global pasa a ser contexto.
 *
 * La razón es clínica, no estética: dos personas pueden obtener el mismo total y
 * necesitar intervenciones distintas — una cargada a alteraciones del afecto, otra
 * a hiperactivación. Mostrar solo el total esconde justo lo que cambia la decisión.
 * Cuando la prueba no tiene subescalas, el total sí es la lectura principal porque
 * no hay nada más que leer.
 */
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

  const subScales = config.subScales ?? [];
  const hasProfile = subScales.length > 0;

  // Perfil ordenado de mayor a menor carga relativa: lo primero que se lee es la
  // dimensión más alta, que es la pregunta clínica real.
  const profile = subScales
    .map((sub) => {
      const value = getSubScaleScore(sub, answers);
      return { sub, value, pct: Math.round((value / sub.maxScore) * 100), band: getSubScaleBand(sub, value) };
    })
    .sort((a, b) => b.pct - a.pct);

  return (
    <div className="border border-border-theme rounded-sm p-6 bg-surface space-y-7">

      {hasProfile ? (
        <>
          {/* Perfil por dimensión — lectura principal */}
          <div className="space-y-4">
            <div className="space-y-1">
              <p className="text-xs tracking-widest uppercase text-interactive-text">Perfil por dimensión</p>
              <p className="text-xs text-foreground/50 leading-relaxed max-w-md">
                Ordenadas de mayor a menor. Lo que orienta la lectura es qué dimensión
                destaca, no el puntaje global.
              </p>
            </div>

            <ul className="space-y-3.5">
              {profile.map(({ sub, value, pct, band: sb }) => (
                <li key={sub.label} className="space-y-1.5">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-sm font-medium">{sub.label}</span>
                    <span className="flex items-baseline gap-2 flex-shrink-0">
                      <span className={`text-xs font-medium ${sb.textClass}`}>{sb.label}</span>
                      <span className="font-display text-xl tabular-nums leading-none">{value}</span>
                      <span className="text-xs text-foreground/35 tabular-nums">/&thinsp;{sub.maxScore}</span>
                    </span>
                  </div>
                  <div className="h-1.5 bg-foreground/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${sb.textClass.replace("text-", "bg-")} transition-all duration-700 ease-out`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Puntaje global — contexto secundario */}
          <div className="border-t border-foreground/10 pt-5 space-y-2.5">
            <div className="flex items-baseline justify-between gap-4">
              <span className="text-xs tracking-widest uppercase text-foreground/40">Puntaje global</span>
              <span className="flex items-baseline gap-2">
                <span className={`text-xs font-medium ${band.textClass}`}>{band.label}</span>
                <span className="font-display text-2xl tabular-nums leading-none">
                  {score}{isDesii ? "%" : ""}
                </span>
                {!isDesii && <span className="text-xs text-foreground/35 tabular-nums">/&thinsp;{maxScore}</span>}
              </span>
            </div>
            <div className="h-1 bg-foreground/10 rounded-full overflow-hidden">
              <div
                className={`h-full ${band.barClass} transition-all duration-1000 ease-out`}
                style={{ width: `${barPct}%` }}
              />
            </div>
            <p className="text-sm leading-relaxed text-foreground/65">{band.description}</p>
          </div>
        </>
      ) : (
        /* Sin subescalas: el total es la única lectura disponible */
        <div className="space-y-5">
          <div className="flex items-end gap-4">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-6xl leading-none tabular-nums">
                {score}{isDesii ? "%" : ""}
              </span>
              {!isDesii && (
                <span className="text-foreground/30 text-base tabular-nums">/&thinsp;{maxScore}</span>
              )}
            </div>
            <div className="ml-auto text-right">
              <p className="text-xs tracking-widest uppercase text-foreground/40 mb-0.5">Nivel</p>
              <p className={`text-sm font-medium tracking-wide ${band.textClass}`}>{band.label}</p>
            </div>
          </div>

          <div className="h-1 bg-foreground/10 rounded-full overflow-hidden">
            <div
              className={`h-full ${band.barClass} transition-all duration-1000 ease-out`}
              style={{ width: `${barPct}%` }}
            />
          </div>

          {isSwls && (
            <div className="flex justify-between text-[10px] text-foreground/30">
              <span>Muy insatisfecho/a</span>
              <span>Muy satisfecho/a</span>
            </div>
          )}

          <p className="text-sm leading-relaxed text-foreground/65">{band.description}</p>
        </div>
      )}

      {/* Áreas de mayor atención */}
      {highItems.length > 0 && (
        <div className="border-t border-foreground/10 pt-5">
          <p className="text-xs tracking-widest uppercase text-foreground/40 mb-3">Áreas de mayor atención</p>
          <ul className="space-y-2">
            {highItems.map(({ i, a }) => {
              const scaleLabel = config.scale.find((s) => s.value === a)?.full ?? SCALE_LABELS[a] ?? `${a}`;
              return (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <span className="w-1 h-1 rounded-full bg-brand-gold flex-shrink-0 mt-1.5" />
                  <span className="text-foreground/70">
                    {config.shortLabels[i] ?? config.questions[i] ?? `Ítem ${i + 1}`}
                    <span className="text-foreground/45 ml-2 text-xs">— {scaleLabel}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <p className="text-xs text-foreground/40 leading-relaxed border-t border-foreground/10 pt-4">
        {config.disclaimer}
      </p>
    </div>
  );
}
