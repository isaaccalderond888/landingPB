import type { Metadata } from "next";
import localFont from "next/font/local";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import CalendlyBadge from "@/components/CalendlyBadge";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
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
    // NOTA PARA ISAAC: reemplaza esta ruta con tu imagen de Open Graph (1200x630px)
    // images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
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
        <meta name="theme-color" content="#0D1430" />
      </head>
      <body className={`${geistSans.variable} ${playfair.variable} antialiased`}>
        {children}
        <CalendlyBadge />
      </body>
    </html>
  );
}
