import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-geist-sans)", "Inter", "system-ui", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Paleta Sea from Space — Isaac Calderón Derat
        brand: {
          gold:   "#C99328", // oro cálido   — centro / acento
          mint:   "#5CC4A8", // menta turquesa
          teal:   "#1A96A6", // teal profundo — color primario de marca
          mid:    "#313855", // azul medio — glass/floating
          navy:   "#171e3a", // azul marino  — secciones
          night:  "#0a112d", // azul noche   — fondo principal
        },
      },
    },
  },
  plugins: [],
};
export default config;
