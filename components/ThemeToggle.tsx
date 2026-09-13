"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      try { localStorage.setItem("theme", "light"); } catch { /* Storage may be unavailable. */ }
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      try { localStorage.setItem("theme", "dark"); } catch { /* Storage may be unavailable. */ }
      setIsDark(true);
    }
  }

  return (
    <button
      onClick={toggle}
      aria-label="Cambiar modo de color"
      className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-sm text-xs tracking-widest uppercase opacity-70 hover:opacity-100 transition-opacity"
    >
      {isDark ? (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
          <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      )}
    </button>
  );
}
