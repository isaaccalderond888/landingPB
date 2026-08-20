import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-jakarta)", "system-ui", "sans-serif"],
        sans: ["var(--font-jakarta)", "Inter", "system-ui", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        surface: "var(--surface)",
        "surface-elevated": "var(--surface-elevated)",
        "interactive-text": "var(--interactive-text)",
        "accent-text": "var(--accent-text)",
        "border-theme": "var(--border-theme)",
        // Paleta "Flores sobre agua" — Isaac Calderón Derat (design system)
        brand: {
          gold:   "#EAD06A", // sol — acento cálido
          mint:   "#BCD3D6", // bruma — azul claro secundario
          teal:   "#256D86", // petróleo — color primario de marca
          mid:    "#183463", // marino — superficies elevadas / glass
          navy:   "#0f2140", // navy-900 — secciones
          night:  "#0b1830", // navy-950 — fondo principal
        },
      },
    },
  },
  plugins: [],
};
export default config;
