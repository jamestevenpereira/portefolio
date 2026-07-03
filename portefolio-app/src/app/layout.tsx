import type { Metadata } from "next";
import { Hanken_Grotesk, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Analytics from "@/components/Analytics";
import { SITE_URL, SITE_NAME, CONTACT_EMAIL, SOCIALS } from "@/lib/site";

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

const TITLE = "James Steven — Desenvolvedor Web | Viseu";
const DESCRIPTION =
  "Websites completos para profissionais e empresas em Viseu. Design e código na mesma cabeça, do rascunho ao ar.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "desenvolvedor web",
    "freelancer",
    "next.js",
    "viseu",
    "web design",
    "engenharia informática",
  ],
  authors: [{ name: SITE_NAME }],
  alternates: { canonical: "/" },
  openGraph: {
    title: TITLE,
    description:
      "Websites completos para profissionais e empresas. Design e código na mesma cabeça.",
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    locale: "pt_PT",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "James Steven — Crio sites que geram resultado.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
};

/** Dados estruturados schema.org — pessoa + serviço profissional local */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: SITE_NAME,
      jobTitle: "Desenvolvedor Web",
      email: `mailto:${CONTACT_EMAIL}`,
      url: SITE_URL,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Viseu",
        addressCountry: "PT",
      },
      sameAs: [SOCIALS.github, SOCIALS.linkedin, SOCIALS.instagram],
      knowsAbout: [
        "Next.js",
        "TypeScript",
        "React",
        "Web Design",
        "Engenharia Informática",
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#service`,
      name: `${SITE_NAME} — Desenvolvimento Web`,
      description: DESCRIPTION,
      url: SITE_URL,
      email: CONTACT_EMAIL,
      founder: { "@id": `${SITE_URL}/#person` },
      areaServed: { "@type": "Country", name: "Portugal" },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Viseu",
        addressCountry: "PT",
      },
      priceRange: "€€",
    },
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Nav />
        <main style={{ paddingTop: 52 }}>{children}</main>
        <Analytics />
      </body>
    </html>
  );
}
