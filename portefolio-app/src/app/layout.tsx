import type { Metadata } from "next";
import { Hanken_Grotesk, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-hanken",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-serif-var",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-mono-var",
});

export const metadata: Metadata = {
  title: "James Steven — Desenvolvedor Web | Viseu",
  description:
    "Websites completos para profissionais e empresas em Viseu. Design e código na mesma cabeça, do rascunho ao ar.",
  keywords: ["desenvolvedor web", "freelancer", "next.js", "viseu", "web design", "engenharia informática"],
  authors: [{ name: "James Steven" }],
  openGraph: {
    title: "James Steven — Desenvolvedor Web | Viseu",
    description: "Websites completos para profissionais e empresas. Design e código na mesma cabeça.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-PT"
      className={`${hanken.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <Nav />
        <main style={{ paddingTop: 52 }}>
          {children}
        </main>
      </body>
    </html>
  );
}
