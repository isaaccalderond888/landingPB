"use client";

import { useState } from "react";

const QUESTIONS = [
  "Sentirse nervioso/a, ansioso/a o muy alterado/a",
  "No poder dejar de preocuparse o no poder controlar la preocupación",
  "Preocuparse demasiado por diferentes cosas",
  "Dificultad para relajarse",
  "Estar tan inquieto/a que es difícil permanecer sentado/a tranquilamente",
  "Enojarse o irritarse fácilmente",
  "Sentir miedo, como si algo terrible fuera a ocurrir",
];

const SCALE = [
  { value: 0, short: "Nunca",   full: "Ningún día" },
  { value: 1, short: "Varios",  full: "Varios días" },
  { value: 2, short: "Mitad",   full: "Más de la mitad" },
  { value: 3, short: "Siempre", full: "Casi todos los días" },
];

interface Props {
  onComplete: (score: number, answers: number[]) => void;
}

export default function GAD7({ onComplete }: Props) {
  const [answers, setAnswers] = useState<(number | null)[]>(Array(7).fill(null));

  const allAnswered = answers.every((a) => a !== null);

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
          const answered = answers[qi] !== null;
          return (
            <div key={qi} className="py-5">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <p className={`text-sm leading-relaxed flex-1 max-w-lg ${answered ? "" : "opacity-80"}`}>
                  <span className="font-mono text-xs opacity-30 mr-2 select-none">{qi + 1}.</span>
                  {q}
                </p>

                <div className="flex gap-1.5 md:flex-shrink-0" role="group" aria-label={`Respuesta para ítem ${qi + 1}`}>
                  {SCALE.map((s) => {
                    const selected = answers[qi] === s.value;
                    return (
                      <button
                        key={s.value}
                        onClick={() => handleAnswer(qi, s.value)}
                        aria-pressed={selected}
                        className={`
                          w-20 py-2 rounded-sm text-xs font-medium transition-all duration-150 border
                          ${selected
                            ? "bg-brand-gold border-brand-gold text-brand-night"
                            : "border-foreground/15 opacity-60 hover:border-brand-gold/50 hover:opacity-100 hover:text-brand-gold"
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

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs opacity-30">
          <span>{answers.filter((a) => a !== null).length} de 7 respondidas</span>
          {allAnswered && <span>Listo para ver resultado</span>}
        </div>
        <div className="h-0.5 bg-foreground/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-brand-gold transition-all duration-500"
            style={{ width: `${(answers.filter((a) => a !== null).length / 7) * 100}%` }}
          />
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={!allAnswered}
        className={`
          w-full py-3.5 text-sm tracking-widest uppercase font-medium transition-all duration-300
          ${allAnswered
            ? "bg-brand-gold text-brand-night hover:bg-brand-gold/85 cursor-pointer"
            : "border border-foreground/15 opacity-30 cursor-not-allowed"
          }
        `}
      >
        Ver resultado
      </button>
    </div>
  );
}
