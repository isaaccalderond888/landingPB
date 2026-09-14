import type { Metadata } from "next";

/**
 * La página es componente cliente y no puede exportar `metadata`, así que el
 * noindex vive aquí.
 *
 * Decisión de Isaac: /evaluaciones se queda "suelta, no integrada dentro de mi
 * sitio web" porque es el germen de un producto aparte, un panel para
 * terapeutas. No estar enlazada no impide que un buscador la indexe, así que
 * hace falta decirlo explícitamente.
 *
 * Esto NO afecta a los enlaces directos con ?test=: siguen funcionando igual.
 * Sólo deja de aparecer en buscadores.
 */
export const metadata: Metadata = {
  title: "Evaluaciones · Isaac Calderón Derat",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function EvaluacionesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
