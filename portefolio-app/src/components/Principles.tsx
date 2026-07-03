"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import SectionHeader from "@/components/SectionHeader";

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
        height: "100%",
        background: hovered ? "var(--surface)" : "var(--bg-2)",
        padding: "30px 28px",
        transition: "background .25s, box-shadow .25s",
        boxShadow: hovered
          ? "inset 0 0 0 1px color-mix(in srgb, var(--ac) 25%, transparent)"
          : "inset 0 0 0 1px transparent",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        style={{
          fontFamily: "var(--mono)",
          fontSize: 13,
          color: hovered ? "var(--ac)" : "var(--ac-deep)",
          transition: "color .25s",
        }}
      >
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
      <SectionHeader
        index="05"
        kicker="princípios"
        marginBottom={44}
        segments={[
          { text: "Como eu " },
          {
            text: "opero.",
            style: { fontStyle: "italic", color: "var(--ac)" },
          },
        ]}
      />

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
          <motion.div key={p.num} variants={cardVariants} style={{ height: "100%" }}>
            <Card {...p} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
