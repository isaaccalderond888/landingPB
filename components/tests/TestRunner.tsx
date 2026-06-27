"use client";

import { useState } from "react";
import type { TestConfig } from "@/lib/testData";

interface Props {
  config: TestConfig;
  onComplete: (answers: number[]) => void;
}

export default function TestRunner({ config, onComplete }: Props) {
  const total = config.questions.length;
  const [answers, setAnswers] = useState<(number | null)[]>(Array(total).fill(null));

  const answered = answers.filter((a) => a !== null).length;
  const allAnswered = answered === total;
  const isWide = config.scale.length <= 4;
  const isMedium = config.scale.length <= 7;

  function handleAnswer(qi: number, value: number) {
    setAnswers((prev) => {
      const next = [...prev];
      next[qi] = value;
      return next;
    });
  }

  function handleSubmit() {
    if (!allAnswered) return;
    onComplete(answers as number[]);
  }

  const btnW = isWide ? "w-20" : isMedium ? "w-14" : "w-11";

  return (
    <div className="space-y-8">
      {config.note && (
        <div className="border border-foreground/10 bg-foreground/5 rounded-sm p-4 text-sm opacity-70 leading-relaxed">
          {config.note}
        </div>
      )}

      <p className="text-sm leading-relaxed opacity-60 max-w-xl">{config.instructions}</p>

      {/* Scale header — desktop */}
      <div className="hidden md:flex items-center justify-end pr-1">
        {config.scale.map((s) => (
          <span key={s.value} className={`${btnW} text-center text-[10px] tracking-wide opacity-30 leading-tight`}>
            {s.full}
          </span>
        ))}
      </div>

      <div className="space-y-0 divide-y divide-foreground/8">
        {config.questions.map((q, qi) => {
          const isAnswered = answers[qi] !== null;
          return (
            <div key={qi} className="py-5">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <p className={`text-sm leading-relaxed flex-1 max-w-lg ${isAnswered ? "" : "opacity-80"}`}>
                  <span className="font-mono text-xs opacity-30 mr-2 select-none">{qi + 1}.</span>
                  {q}
                </p>

                <div
                  className="flex gap-1 md:flex-shrink-0 flex-wrap"
                  role="group"
                  aria-label={`Respuesta para ítem ${qi + 1}`}
                >
                  {config.scale.map((s) => {
                    const selected = answers[qi] === s.value;
                    return (
                      <button
                        key={s.value}
                        onClick={() => handleAnswer(qi, s.value)}
                        aria-pressed={selected}
                        className={`
                          ${btnW} py-2 rounded-sm text-xs font-medium transition-all duration-150 border
                          ${selected
                            ? config.btnSelectedClass
                            : `border-foreground/15 opacity-60 ${config.btnHoverClass} hover:opacity-100`
                          }
                        `}
                      >
                        {s.short}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Mobile scale labels */}
              <div className="md:hidden flex gap-1 mt-1.5 justify-end flex-wrap">
                {config.scale.map((s) => (
                  <span key={s.value} className={`${btnW} text-center text-[9px] opacity-25 leading-tight`}>
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
          <span>{answered} de {total} respondidas</span>
          {allAnswered && <span>Listo para ver resultado</span>}
        </div>
        <div className="h-0.5 bg-foreground/10 rounded-full overflow-hidden">
          <div
            className={`h-full ${config.barClass} transition-all duration-500`}
            style={{ width: `${(answered / total) * 100}%` }}
          />
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={!allAnswered}
        className={`
          w-full py-3.5 text-sm tracking-widest uppercase font-medium transition-all duration-300
          ${allAnswered
            ? `${config.btnSelectedClass} cursor-pointer hover:opacity-85`
            : "border border-foreground/15 opacity-30 cursor-not-allowed"
          }
        `}
      >
        Ver resultado
      </button>
    </div>
  );
}
