"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import ThemeToggle from "@/components/ThemeToggle";
import PHQ9 from "@/components/tests/PHQ9";
import GAD7 from "@/components/tests/GAD7";
import TestRunner from "@/components/tests/TestRunner";
import ResultCard from "@/components/tests/ResultCard";
import AIInterpret from "@/components/tests/AIInterpret";
import { TEST_CONFIGS, type TestId } from "@/lib/testData";

const TEST_ORDER: TestId[] = [
  "PHQ9", "GAD7", "DASS21",
  "PCL5", "DESII", "ACE",
  "SDS", "SWLS", "MEQ30",
];

export default function EvaluacionesPage() {
  const [selectedTest, setSelectedTest] = useState<TestId | null>(null);
  const [result, setResult] = useState<{ score: number; answers: number[] } | null>(null);

  function handleComplete(answers: number[]) {
    if (!selectedTest) return;
    const config = TEST_CONFIGS[selectedTest];
    const score = config.computeScore(answers);
    setResult({ score, answers });
  }

  function reset() {
    setResult(null);
    setSelectedTest(null);
  }

  const test = selectedTest ? TEST_CONFIGS[selectedTest] : null;

  return (
    <div className="bg-background text-foreground min-h-screen">

      {/* NAV */}
      <nav
        aria-label="Navegación"
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 bg-background/80 backdrop-blur-sm border-b border-foreground/5"
      >
        <Link href="/" className="flex items-center gap-3 group">
          <Logo size={32} variant="color" />
          <span className="text-sm tracking-widest uppercase opacity-50 group-hover:opacity-100 transition-opacity hidden sm:block">
            Isaac Calderón Derat
          </span>
        </Link>
        <div className="flex items-center gap-6 md:gap-8">
          <Link href="/#agendar" className="text-xs tracking-widest uppercase opacity-50 hover:text-brand-teal hover:opacity-100 transition-all hidden md:block">
            Agendar sesión
          </Link>
          <ThemeToggle />
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-32 pb-12 px-6 md:px-12 lg:px-20 bg-gradient-to-b from-brand-night via-brand-navy/60 to-background">
        <div className="max-w-4xl mx-auto space-y-4">
          <p className="text-xs tracking-widest uppercase text-brand-gold opacity-80">
            Herramientas clínicas
          </p>
          <h1 className="font-serif text-4xl md:text-5xl leading-tight">
            {test ? `${test.name} — ${test.subtitle}` : "Evaluaciones"}
          </h1>
          {!selectedTest && (
            <p className="text-base leading-relaxed opacity-60 max-w-xl">
              Instrumentos de tamizaje validados. Elige la prueba que quieras realizar.
            </p>
          )}
        </div>
      </section>

      {/* MAIN */}
      <main className="px-6 md:px-12 lg:px-20 py-12">
        <div className="max-w-4xl mx-auto">

          {/* SELECTOR */}
          {!selectedTest && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {TEST_ORDER.map((id) => {
                const t = TEST_CONFIGS[id];
                return (
                  <button
                    key={id}
                    onClick={() => setSelectedTest(id)}
                    className={`group text-left p-6 rounded-sm border bg-brand-navy/40 backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,0,0,0.2)] ${t.borderClass}`}
                  >
                    <p className={`text-xs tracking-widest uppercase mb-2 ${t.accentClass}`}>{t.subtitle}</p>
                    <p className="font-serif text-2xl mb-3">{t.name}</p>
                    <p className="text-xs leading-relaxed opacity-50">{t.cardDescription}</p>
                    <p className={`text-xs mt-4 opacity-0 group-hover:opacity-100 transition-opacity ${t.accentClass}`}>
                      Comenzar →
                    </p>
                  </button>
                );
              })}
            </div>
          )}

          {/* TEST ACTIVO */}
          {selectedTest && !result && (
            <div className="max-w-3xl space-y-8">
              <button
                onClick={() => setSelectedTest(null)}
                className="text-xs opacity-35 hover:opacity-70 transition-opacity"
              >
                ← Elegir otra prueba
              </button>
              {selectedTest === "PHQ9" && (
                <PHQ9 onComplete={(score, answers) => setResult({ score, answers })} />
              )}
              {selectedTest === "GAD7" && (
                <GAD7 onComplete={(score, answers) => setResult({ score, answers })} />
              )}
              {selectedTest !== "PHQ9" && selectedTest !== "GAD7" && (
                <TestRunner config={TEST_CONFIGS[selectedTest]} onComplete={handleComplete} />
              )}
            </div>
          )}

          {/* RESULTADO */}
          {selectedTest && result && (
            <div className="max-w-3xl space-y-10">
              <ResultCard testId={selectedTest} score={result.score} answers={result.answers} />

              <div className="border-t border-foreground/10 pt-8">
                <div className="mb-5 space-y-1">
                  <p className="text-xs tracking-widest uppercase opacity-35">Paso siguiente</p>
                  <p className="font-serif text-xl leading-snug">¿Quieres una lectura más contextualizada?</p>
                  <p className="text-sm opacity-55 leading-relaxed max-w-lg">
                    Puedo ofrecerte una interpretación de estos resultados desde una perspectiva transpersonal y somática.
                  </p>
                </div>
                <AIInterpret score={result.score} answers={result.answers} test={selectedTest} />
              </div>

              <div className="border-t border-foreground/10 pt-6 flex flex-wrap gap-6 items-center">
                <button onClick={() => setResult(null)} className="text-xs opacity-35 hover:opacity-70 transition-opacity underline underline-offset-4">
                  Repetir esta prueba
                </button>
                <button onClick={reset} className="text-xs opacity-35 hover:opacity-70 transition-opacity underline underline-offset-4">
                  Elegir otra prueba
                </button>
                <Link href="/#agendar" className="text-xs tracking-widest uppercase text-brand-teal opacity-70 hover:opacity-100 transition-opacity">
                  Agendar sesión →
                </Link>
              </div>
            </div>
          )}

        </div>
      </main>

      <footer className="mt-24 px-6 md:px-12 lg:px-20 py-10 border-t border-foreground/10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/" className="text-sm opacity-35 hover:text-brand-teal hover:opacity-100 transition-all">← Inicio</Link>
            <a href="mailto:psic@isaaccalderon.me" className="text-sm opacity-35 hover:text-brand-teal hover:opacity-100 transition-all">psic@isaaccalderon.me</a>
          </div>
          <p className="text-xs opacity-20">© Isaac Calderón Derat</p>
        </div>
      </footer>

    </div>
  );
}
