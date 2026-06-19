"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const principles = [
  { num: "01", title: "Engenharia primeiro", body: "Um website é um sistema. Decisões de design têm consequências técnicas, e vice-versa." },
  { num: "02", title: "Código e design na mesma cabeça", body: "Sem intermediários entre a ideia e a execução. O que se imagina é o que se constrói." },
  { num: "03", title: "Entrego, não prometo", body: "Algo no ar vale mais que dez maquetes perfeitas. A velocidade de entrega é uma vantagem competitiva." },
  { num: "04", title: "Contexto é tudo", body: "Anos em setores diferentes ensinaram a perguntar antes de construir. O problema descrito raramente é o problema real." },
  { num: "05", title: "Simples é difícil", body: "A elegância técnica está em remover, não em acrescentar. Sistemas simples são mais fáceis de manter e mais difíceis de construir." },
  { num: "06", title: "Resultados antes de estética", body: "O design serve o objetivo. Se ficou bonito mas não converte, não ficou bom." },
];

function Card({ num, title, body }: { num: string; title: string; body: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{
        background: hovered ? "var(--surface)" : "var(--bg-2)",
        padding: "30px 28px",
        transition: "background .25s",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span style={{ fontFamily: "var(--mono)", fontSize: 13, color: "var(--ac-deep)" }}>
        {num}
      </span>
      <h3
        style={{
          fontFamily: "var(--serif)",
          fontSize: 25,
          color: "var(--text)",
          margin: "12px 0 8px",
        }}
      >
        {title}
      </h3>
      <p style={{ fontSize: 15, lineHeight: 1.55, color: "var(--muted)" }}>{body}</p>
    </div>
  );
}

export default function Principles() {
  const reduced = useReducedMotion();
  const yOffset = reduced ? 0 : 28;

  const headerVariants = {
    hidden: { opacity: 0, y: yOffset },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: reduced ? 0 : 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 260, damping: 22 },
    },
  };

  return (
    <section
      id="principles"
      style={{ maxWidth: 1180, margin: "0 auto", padding: "96px 32px 30px" }}
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.7 }}
        variants={headerVariants}
      >
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
          <span style={{ color: "var(--muted-2)" }}>05</span> princípios
        </div>
        <h2
          style={{
            fontFamily: "var(--serif)",
            fontWeight: 400,
            fontSize: "clamp(34px, 4.5vw, 54px)",
            lineHeight: 1.05,
            letterSpacing: "-.01em",
            color: "var(--text)",
            marginBottom: 44,
          }}
        >
          Como eu opero.
        </h2>
      </motion.div>

      <motion.div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 1,
          background: "var(--border)",
          border: "1px solid var(--border)",
          borderRadius: 16,
          overflow: "hidden",
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={containerVariants}
      >
        {principles.map((p) => (
          <motion.div key={p.num} variants={cardVariants}>
            <Card {...p} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
