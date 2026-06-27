"use client";

import { useState } from "react";

interface Props {
  score: number;
  answers: number[];
}

export default function AIInterpret({ score, answers }: Props) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState(false);

  async function interpret() {
    setLoading(true);
    setText("");
    setError(false);
    setDone(false);

    try {
      const res = await fetch("/api/interpret", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ score, answers }),
      });

      if (!res.ok || !res.body) throw new Error(`Status ${res.status}`);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done: doneReading, value } = await reader.read();
        if (doneReading) break;
        setText((prev) => prev + decoder.decode(value, { stream: true }));
      }

      setDone(true);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  const paragraphs = text
    .split("\n\n")
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className="space-y-5">
      {/* Button — shown before text starts streaming */}
      {!text && !loading && !done && (
        <button
          onClick={interpret}
          className="w-full border border-brand-gold/40 text-brand-gold py-3.5 text-sm tracking-widest uppercase hover:bg-brand-gold/8 transition-all duration-300"
        >
          Obtener interpretación personalizada
        </button>
      )}

      {/* Loading spinner — before any text arrives */}
      {loading && !text && (
        <div className="flex items-center gap-3 py-4 opacity-60">
          <div className="w-4 h-4 rounded-full border-2 border-brand-teal border-t-transparent animate-spin flex-shrink-0" />
          <span className="text-sm">Elaborando interpretación…</span>
        </div>
      )}

      {/* Streaming / completed text */}
      {text && (
        <div className="space-y-1">
          <p className="text-xs tracking-widest uppercase opacity-35 mb-4">Interpretación</p>
          <div className="space-y-4 text-sm leading-relaxed opacity-80">
            {paragraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
            {loading && (
              <span className="inline-block w-0.5 h-[1.1em] bg-brand-teal align-middle animate-pulse ml-0.5" />
            )}
          </div>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="space-y-3">
          <p className="text-sm opacity-50">No se pudo obtener la interpretación.</p>
          <button
            onClick={interpret}
            className="text-xs text-brand-teal opacity-70 hover:opacity-100 underline underline-offset-4 transition-opacity"
          >
            Intentar de nuevo
          </button>
        </div>
      )}

      {/* Disclaimer after completion */}
      {done && (
        <p className="text-xs opacity-25 leading-relaxed border-t border-foreground/10 pt-4">
          Esta interpretación es orientativa y no sustituye una evaluación clínica presencial.
        </p>
      )}
    </div>
  );
}
