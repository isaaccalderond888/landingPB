import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import CalendlyBadge from "@/components/CalendlyBadge";

// Tipografía única (display + body) — design system "Flores sobre agua"
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://isaaccalderon.me"),
  title: "Isaac Calderón Derat — Psicoterapeuta Transpersonal | CDMX",
  description:
    "Psicoterapia informada en trauma, somática y transpersonal. Acompaño procesos de transformación real integrando psicotraumatología, neurofeedback y estados ampliados de conciencia. Online para hispanohablantes y presencial en CDMX.",
  openGraph: {
    title: "Isaac Calderón Derat — Psicoterapeuta Transpersonal | CDMX",
    description:
      "Psicoterapia informada en trauma, somática y transpersonal. Acompaño procesos de transformación real integrando psicotraumatología, neurofeedback y estados ampliados de conciencia. Online para hispanohablantes y presencial en CDMX.",
    url: "https://isaaccalderon.me",
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
      </head>
      <body className={`${jakarta.variable} antialiased`}>
        {children}
        <CalendlyBadge />
      </body>
    </html>
  );
}
