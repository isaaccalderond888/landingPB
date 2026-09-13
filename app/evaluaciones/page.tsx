"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Logo from "@/components/Logo";
import ThemeToggle from "@/components/ThemeToggle";
import PHQ9 from "@/components/tests/PHQ9";
import GAD7 from "@/components/tests/GAD7";
import TestRunner from "@/components/tests/TestRunner";
import ResultCard from "@/components/tests/ResultCard";
import AIInterpret from "@/components/tests/AIInterpret";
import SendToTherapist from "@/components/tests/SendToTherapist";
import { TEST_CONFIGS, CATEGORY_ORDER, CATEGORY_LABELS, type TestId, type TestCategory } from "@/lib/testData";

// Qué se muestra en el selector público. NO es el catálogo: el catálogo completo
// vive en TEST_CONFIGS, y el deeplink (?test=XXX) lo lee de ahí directamente.
// Por eso una prueba puede quedar fuera de este menú y seguir siendo enviable por
// enlace directo a una persona concreta.
//
// AQ10 y AQ50 están fuera a propósito. El Autism Research Centre (Cambridge) los
// licencia solo para uso investigativo NO comercial y no permite adaptarlos sin
// permiso — la traducción al español ya es una adaptación. Se conservan en
// TEST_CONFIGS para uso investigativo propio por enlace directo; no deben volver
// al menú público ni entrar en una versión comercial sin licencia de ARC.
// Ver: https://www.autismresearchcentre.com/tests/
const CATEGORY_TESTS: Record<TestCategory, TestId[]> = {
  clinico:         ["PHQ9", "GAD7", "DASS21", "SDS", "CBI"],
  trauma:          ["PCL5", "DESII", "ACE"],
  bienestar:       ["SWLS", "PERMA"],
  neurodiversidad: ["CATQ", "ASRS"],
  postsesion:      ["MEQ30", "EBI", "CEQ"],
};

function EvaluacionesPageInner() {
  const searchParams = useSearchParams();
  const isDirectLink = !!searchParams.get("test");
  const [selectedTest, setSelectedTest] = useState<TestId | null>(() => {
    const param = searchParams.get("test")?.toUpperCase() as TestId | null;
    return param && TEST_CONFIGS[param] ? param : null;
  });
  const [result, setResult] = useState<{ score: number; answers: number[] } | null>(null);
  const [aiText, setAiText] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [selectedTest, result]);

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
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 bg-brand-night/90 text-[#EEF2EC] backdrop-blur-md border-b border-white/10 shadow-[0_4px_24px_rgba(11,24,48,0.18)]"
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

      {/* HERO */}
      <section className="pt-32 pb-12 px-6 md:px-12 lg:px-20 bg-gradient-to-b from-brand-night via-brand-navy to-brand-night text-[#EEF2EC]">
        <div className="max-w-4xl mx-auto space-y-4">
          <p className="text-xs tracking-widest uppercase text-brand-gold opacity-80">
            Herramientas clínicas
          </p>
          <h1 className="font-display text-4xl md:text-5xl leading-tight">
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
            <div className="space-y-12">
              {CATEGORY_ORDER.map((cat) => {
                const { title, description } = CATEGORY_LABELS[cat];
                const ids = CATEGORY_TESTS[cat];
                return (
                  <section key={cat}>
                    <div className="mb-5 border-l-2 border-brand-gold/40 pl-4">
                      <h2 className="font-display text-xl leading-snug">{title}</h2>
                      <p className="text-xs text-foreground/60 mt-1">{description}</p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {ids.map((id) => {
                        const t = TEST_CONFIGS[id];
                        return (
                          <button
                            key={id}
                            onClick={() => setSelectedTest(id)}
                            className={`group text-left p-6 rounded-sm border bg-surface transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(37,109,134,0.16)] ${t.borderClass}`}
                          >
                            <p className={`text-xs tracking-widest uppercase mb-2 ${t.accentClass}`}>{t.subtitle}</p>
                            <p className="font-display text-2xl mb-3">{t.name}</p>
                            <p className="text-xs leading-relaxed text-foreground/65">{t.cardDescription}</p>
                            <p className={`text-xs mt-4 opacity-0 group-hover:opacity-100 transition-opacity ${t.accentClass}`}>
                              Comenzar →
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </section>
                );
              })}
            </div>
          )}

          {/* TEST ACTIVO */}
          {selectedTest && !result && (
            <div className="max-w-3xl space-y-8">
              {isDirectLink ? (
                <Link href="/" className="text-xs opacity-35 hover:opacity-70 transition-opacity">← Inicio</Link>
              ) : (
                <button onClick={() => setSelectedTest(null)} className="text-xs opacity-35 hover:opacity-70 transition-opacity">
                  ← Elegir otra prueba
                </button>
              )}
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
                  <p className="font-display text-xl leading-snug">¿Quieres una lectura más contextualizada?</p>
                  <p className="text-sm opacity-55 leading-relaxed max-w-lg">
                    Puedo ofrecerte una interpretación de estos resultados desde una perspectiva transpersonal y somática.
                  </p>
                </div>
                <AIInterpret score={result.score} answers={result.answers} test={selectedTest} onComplete={setAiText} />
              </div>

              <SendToTherapist testId={selectedTest} score={result.score} answers={result.answers} aiText={aiText} />

              <div className="border-t border-foreground/10 pt-6 flex flex-wrap gap-6 items-center">
                <button onClick={() => setResult(null)} className="text-xs opacity-35 hover:opacity-70 transition-opacity underline underline-offset-4">
                  Repetir esta prueba
                </button>
                {isDirectLink ? (
                  <Link href="/" className="text-xs opacity-35 hover:opacity-70 transition-opacity underline underline-offset-4">
                    ← Inicio
                  </Link>
                ) : (
                  <button onClick={reset} className="text-xs opacity-35 hover:opacity-70 transition-opacity underline underline-offset-4">
                    Elegir otra prueba
                  </button>
                )}
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
            <Link href="/" className="text-sm text-foreground/60 hover:text-interactive-text transition-colors">← Inicio</Link>
            <a href="mailto:psic@isaaccalderon.me" className="text-sm text-foreground/60 hover:text-interactive-text transition-colors">psic@isaaccalderon.me</a>
            <Link href="/privacidad" className="text-sm text-foreground/60 hover:text-interactive-text transition-colors">Aviso de privacidad</Link>
          </div>
          <p className="text-xs text-foreground/40">© Isaac Calderón Derat</p>
        </div>
      </footer>

    </div>
  );
}

export default function EvaluacionesPage() {
  return (
    <Suspense>
      <EvaluacionesPageInner />
    </Suspense>
  );
}
