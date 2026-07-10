"use client";

import { useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

type Pack = {
  name: string;
  price: string;
  badge: string | null;
  recommended: boolean;
  positioning: string;
  bullets: string[];
  setup: string;
  annual: string;
  cta: string;
};

const packages: Pack[] = [
  {
    name: "Starter",
    price: "29€",
    badge: null,
    recommended: false,
    positioning: "O essencial para o site estar sempre online e seguro.",
    bullets: [
      "Alojamento, SSL e CDN geridos",
      "Backups semanais com histórico de versões",
      "1 revisão de conteúdo /mês (até 30 min)",
      "Monitorização de uptime + relatório mensal",
      "Suporte por email (até 48h)",
    ],
    setup: "+50€ de setup inicial",
    annual: "ou 290€/ano (2 meses grátis)",
    cta: "Escolher Starter",
  },
  {
    name: "Crescimento",
    price: "65€",
    badge: "Recomendado",
    recommended: true,
    positioning: "Manutenção + visibilidade local para apareceres no Google.",
    bullets: [
      "Tudo do Starter, e ainda:",
      "Relatório SEO mensal",
      "Gestão do Google Maps (4 publicações/mês)",
      "Backups 2×/semana",
      "2 revisões de conteúdo /mês",
      "Suporte por email e WhatsApp (até 24h)",
    ],
    setup: "+75€ de setup inicial",
    annual: "ou 650€/ano (2 meses grátis)",
    cta: "Escolher Crescimento",
  },
  {
    name: "Full Service",
    price: "199€",
    badge: "Só 4 vagas",
    recommended: false,
    positioning: "Delegas a tua presença digital inteira e focas-te no negócio.",
    bullets: [
      "Tudo do Crescimento, e ainda:",
      "Gestão de 1 rede social (8 publicações/mês)",
      "Backups diários",
      "3 revisões de conteúdo /mês",
      "Suporte prioritário (mesmo dia útil) + linha de urgências",
    ],
    setup: "+100€ de setup inicial",
    annual: "ou 1990€/ano (2 meses grátis)",
    cta: "Escolher Full Service",
  },
];

function choosePack(name: string) {
  try {
    window.dispatchEvent(
      new CustomEvent("pack-prefill", { detail: `Olá, tenho interesse no Pack ${name}.` })
    );
  } catch {
    /* ambiente sem window — segue na mesma para #contact */
  }
}

function Card({ pack, isMobile, variants }: { pack: Pack; isMobile: boolean; variants: Variants }) {
  const [hovered, setHovered] = useState(false);
  const accent = pack.recommended;
  return (
    <motion.div
      variants={variants}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={!isMobile ? { y: -6 } : undefined}
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        background: accent ? "var(--surface)" : "var(--bg-2)",
        border: `1px solid ${accent ? "var(--ac)" : "var(--border)"}`,
        borderRadius: 16,
        padding: "30px 26px",
        marginTop: accent && !isMobile ? -8 : 0,
        boxShadow: accent
          ? "0 26px 60px -30px color-mix(in srgb, var(--ac) 70%, transparent)"
          : hovered
          ? "0 20px 50px -30px rgba(0,0,0,.6)"
          : "none",
        transition: "box-shadow .25s, background .25s, margin .25s",
      }}
    >
      {pack.badge && (
        <span
          style={{
            position: "absolute",
            top: -12,
            left: 22,
            fontFamily: "var(--mono)",
            fontSize: 11.5,
            letterSpacing: ".06em",
            padding: "5px 11px",
            borderRadius: 999,
            background: accent ? "var(--ac)" : "var(--surface-2)",
            color: accent ? "#15100a" : "var(--text-dim)",
            border: accent ? "none" : "1px solid var(--border)",
            fontWeight: 600,
          }}
        >
          {pack.badge}
        </span>
      )}

      <h3 style={{ fontFamily: "var(--serif)", fontWeight: 400, fontSize: 26, color: "var(--text)", marginTop: 6 }}>
        {pack.name}
      </h3>

      <div style={{ display: "flex", alignItems: "baseline", gap: 6, margin: "14px 0 2px" }}>
        <span style={{ fontFamily: "var(--serif)", fontSize: 40, color: "var(--text)" }}>{pack.price}</span>
        <span style={{ fontFamily: "var(--mono)", fontSize: 14, color: "var(--muted)" }}>/mês</span>
      </div>
      <span style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--muted-2)" }}>IVA incluído</span>

      <p style={{ fontSize: 14.5, lineHeight: 1.55, color: "var(--text-dim)", margin: "16px 0 18px", minHeight: isMobile ? 0 : 44 }}>
        {pack.positioning}
      </p>

      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10, margin: 0, padding: 0, flex: 1 }}>
        {pack.bullets.map((b, i) => {
          const isLead = b.endsWith(":");
          return (
            <li
              key={i}
              style={{
                display: "flex",
                gap: 9,
                fontSize: 14.5,
                lineHeight: 1.45,
                color: isLead ? "var(--muted)" : "var(--text-dim)",
                fontStyle: isLead ? "italic" : "normal",
              }}
            >
              {!isLead && <span style={{ color: "var(--ac)", flexShrink: 0 }}>·</span>}
              <span>{b}</span>
            </li>
          );
        })}
      </ul>

      <div style={{ marginTop: 22 }}>
        <div style={{ fontFamily: "var(--mono)", fontSize: 12.5, color: "var(--muted)" }}>{pack.setup}</div>
        <div style={{ fontFamily: "var(--mono)", fontSize: 12.5, color: "var(--muted)", marginTop: 3 }}>{pack.annual}</div>
      </div>

      <a
        href="#contact"
        onClick={() => choosePack(pack.name)}
        style={{
          marginTop: 20,
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "13px 22px",
          borderRadius: 11,
          fontWeight: 600,
          fontSize: 15,
          background: accent ? "var(--ac)" : "transparent",
          color: accent ? "#15100a" : "var(--text)",
          border: accent ? "none" : "1px solid var(--border)",
          transition: "background .2s, border-color .2s, color .2s",
        }}
      >
        {pack.cta}
      </a>
    </motion.div>
  );
}

export default function Packages() {
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  const yOffset = reduced ? 0 : 28;

  const headerVariants = {
    hidden: { opacity: 0, y: yOffset },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  };
  const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
  const cardVariants = {
    hidden: { opacity: 0, y: reduced ? 0 : 22 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 240, damping: 22 } },
  };

  return (
    <section id="packages" style={{ maxWidth: 1180, margin: "0 auto", padding: "96px 32px 30px" }}>
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.6 }} variants={headerVariants}>
        <div
          style={{
            fontFamily: "var(--mono)",
            fontSize: 13,
            letterSpacing: ".12em",
            textTransform: "uppercase",
            color: "var(--ac)",
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 14,
          }}
        >
          <span style={{ color: "var(--muted-2)" }}>06</span> pacotes
        </div>
        <h2
          style={{
            fontFamily: "var(--serif)",
            fontWeight: 400,
            fontSize: "clamp(34px, 4.5vw, 54px)",
            lineHeight: 1.05,
            letterSpacing: "-.01em",
            color: "var(--text)",
            marginBottom: 16,
          }}
        >
          Lançar é só o início.
        </h2>
        <p style={{ fontSize: 18, lineHeight: 1.6, color: "var(--text-dim)", maxWidth: "62ch", marginBottom: 44 }}>
          Um site lento, desatualizado ou em baixo afasta clientes, e quase ninguém te avisa:
          simplesmente fecha a página. Estes pacotes mantêm o teu site rápido, seguro e
          atualizado, todos os meses.
        </p>
      </motion.div>

      <motion.div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
          gap: isMobile ? 28 : 20,
          alignItems: "stretch",
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={containerVariants}
      >
        {packages.map((p) => (
          <Card key={p.name} pack={p} isMobile={isMobile} variants={cardVariants} />
        ))}
      </motion.div>

      <p
        style={{
          fontFamily: "var(--mono)",
          fontSize: 12.5,
          lineHeight: 1.6,
          color: "var(--muted-2)",
          textAlign: "center",
          marginTop: 30,
          maxWidth: "70ch",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        Todos os valores com IVA incluído. Sem fidelização. Cancelas com 30 dias de aviso.
        Domínio e email profissional não incluídos.
      </p>
    </section>
  );
}
