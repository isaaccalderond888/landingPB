import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";


// Tipografía única (display + body) — Sistema de Diseño - Marca Personal ICD
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.isaaccalderon.me"),
  title: "Isaac Calderón Derat — Psicoterapeuta Transpersonal | CDMX",
  description:
    "Psicoterapia informada en trauma. Trabajo con el cuerpo, el sistema nervioso y lo que no pudo ser procesado, integrando psicotraumatología clínica, neurofeedback informado en trauma y estados ampliados de conciencia. Presencial en Ciudad de México y en línea para hispanohablantes.",
  openGraph: {
    title: "Isaac Calderón Derat — Psicoterapeuta Transpersonal | CDMX",
    description:
      "Psicoterapia informada en trauma. Trabajo con el cuerpo, el sistema nervioso y lo que no pudo ser procesado, integrando psicotraumatología clínica, neurofeedback informado en trauma y estados ampliados de conciencia. Presencial en Ciudad de México y en línea para hispanohablantes.",
    url: "https://www.isaaccalderon.me",
    siteName: "Isaac Calderón Derat",
    locale: "es_MX",
    type: "website",
    // Imagen generada dinámicamente por app/opengraph-image.tsx
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#0B1830" />
        <script dangerouslySetInnerHTML={{ __html: "try{document.documentElement.classList.toggle('dark',localStorage.getItem('theme')!=='light')}catch(e){}" }} />
      </head>
      <body className={`${jakarta.variable} antialiased`}>
        {children}

      </body>
    </html>
  );
}
