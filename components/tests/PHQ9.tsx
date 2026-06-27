"use client";

import { useState } from "react";

const QUESTIONS = [
  "Poco interés o placer en hacer las cosas",
  "Sentirse decaído/a, deprimido/a o sin esperanzas",
  "Con dificultad para quedarse o permanecer dormido/a, o dormir demasiado",
  "Sentirse cansado/a o con poca energía",
  "Con poco apetito o comiendo en exceso",
  "Sintiéndose mal consigo mismo/a — o sintiéndose un fracaso o que ha fallado a usted mismo/a o a su familia",
  "Con dificultad para concentrarse en cosas tales como leer el periódico o ver televisión",
  "¿Se ha movido o hablado tan lento que otras personas podrían notarlo? O lo contrario: tan inquieto/a que se ha estado moviendo más de lo normal",
  "Pensamientos de que estaría mejor muerto/a o de hacerse daño de alguna manera",
];

const SCALE = [
  { value: 0, short: "Nunca",      full: "Ningún día" },
  { value: 1, short: "Varios",     full: "Varios días" },
  { value: 2, short: "Mitad",      full: "Más de la mitad" },
  { value: 3, short: "Siempre",    full: "Casi todos los días" },
];

interface Props {
  onComplete: (score: number, answers: number[]) => void;
}

export default function PHQ9({ onComplete }: Props) {
  const [answers, setAnswers] = useState<(number | null)[]>(Array(9).fill(null));

  const allAnswered = answers.every((a) => a !== null);
  const showSafetyNote = answers[8] !== null && (answers[8] as number) > 0;

  function handleAnswer(qi: number, value: number) {
    const next = [...answers];
    next[qi] = value;
    setAnswers(next);
  }

  function handleSubmit() {
    if (!allAnswered) return;
    const score = (answers as number[]).reduce((acc, a) => acc + a, 0);
    onComplete(score, answers as number[]);
  }

  return (
    <div className="space-y-8">
      <p className="text-sm leading-relaxed opacity-60 max-w-xl">
        En las últimas <span className="font-medium opacity-100">dos semanas</span>, ¿con qué frecuencia te han molestado los siguientes problemas?
      </p>

      {/* Scale header — desktop only */}
      <div className="hidden md:flex items-center justify-end gap-0 mb-2 pr-1">
        {SCALE.map((s) => (
          <span key={s.value} className="w-20 text-center text-[10px] tracking-wide opacity-30 leading-tight">
            {s.full}
          </span>
        ))}
      </div>

      <div className="space-y-0 divide-y divide-foreground/8">
        {QUESTIONS.map((q, qi) => {
          const isLast = qi === 8;
          const answered = answers[qi] !== null;
          return (
            <div key={qi} className={`py-5 ${isLast ? "border-t border-brand-gold/20 pt-6" : ""}`}>
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                {/* Question text */}
                <p className={`text-sm leading-relaxed flex-1 max-w-lg ${isLast ? "text-brand-gold/80" : answered ? "" : "opacity-80"}`}>
                  <span className="font-mono text-xs opacity-30 mr-2 select-none">{qi + 1}.</span>
                  {q}
                </p>

                {/* Option buttons */}
                <div className="flex gap-1.5 md:flex-shrink-0" role="group" aria-label={`Respuesta para ítem ${qi + 1}`}>
                  {SCALE.map((s) => {
                    const selected = answers[qi] === s.value;
                    const isHighRisk = isLast && s.value > 0;
                    return (
                      <button
                        key={s.value}
                        onClick={() => handleAnswer(qi, s.value)}
                        aria-pressed={selected}
                        className={`
                          w-20 py-2 rounded-sm text-xs font-medium transition-all duration-150 border
                          ${selected
                            ? isHighRisk
                              ? "bg-brand-gold border-brand-gold text-brand-night"
                              : "bg-brand-teal border-brand-teal text-white"
                            : "border-foreground/15 opacity-60 hover:border-brand-teal/50 hover:opacity-100 hover:text-brand-teal"
                          }
                        `}
                      >
                        <span className="md:hidden">{s.short}</span>
                        <span className="hidden md:inline">{s.value}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Mobile scale labels */}
              <div className="md:hidden flex gap-1.5 mt-1.5 justify-end">
                {SCALE.map((s) => (
                  <span key={s.value} className="w-20 text-center text-[9px] opacity-25 leading-tight">
                    {s.full}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Safety note for item 9 */}
      {showSafetyNote && (
        <div className="border border-brand-gold/30 bg-brand-gold/5 rounded-sm p-5 space-y-2">
          <p className="text-sm font-medium text-brand-gold">Nota importante</p>
          <p className="text-sm leading-relaxed opacity-70">
            Si tienes pensamientos de hacerte daño, es importante hablar con alguien ahora. Puedes escribirme directamente o contactar la línea de crisis{" "}
            <strong className="opacity-100">SAPTEL: 55 5259-8121</strong> (24 h, sin costo).
          </p>
        </div>
      )}

      {/* Progress indicator */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs opacity-30">
          <span>{answers.filter((a) => a !== null).length} de 9 respondidas</span>
          {allAnswered && <span>Listo para ver resultado</span>}
        </div>
        <div className="h-0.5 bg-foreground/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-brand-teal transition-all duration-500"
            style={{ width: `${(answers.filter((a) => a !== null).length / 9) * 100}%` }}
          />
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={!allAnswered}
        className={`
          w-full py-3.5 text-sm tracking-widest uppercase font-medium transition-all duration-300
          ${allAnswered
            ? "bg-brand-teal text-white hover:bg-brand-teal/85 cursor-pointer"
            : "border border-foreground/15 opacity-30 cursor-not-allowed"
          }
        `}
      >
        Ver resultado
      </button>
    </div>
  );
}
