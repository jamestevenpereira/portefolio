"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function About() {
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  const yOffset = reduced ? 0 : 24;

  const fadeUp = {
    hidden: { opacity: 0, y: yOffset },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 280, damping: 22 },
    },
  };

  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.13 } },
  };

  return (
    <section
      id="about"
      style={{
        maxWidth: 1180,
        margin: "0 auto",
        padding: isMobile ? "72px 20px 30px" : "104px 32px 30px",
      }}
    >
      <motion.div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : ".85fr 1.15fr",
          gap: isMobile ? 24 : 54,
          alignItems: "start",
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={stagger}
      >
        <motion.div
          variants={fadeUp}
          style={{
            fontFamily: "var(--mono)",
            fontSize: 13,
            letterSpacing: ".12em",
            textTransform: "uppercase" as const,
            color: "var(--ac)",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span style={{ color: "var(--muted-2)" }}>01</span> sobre
        </motion.div>
        <motion.div variants={stagger}>
          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: "var(--serif)",
              fontWeight: 400,
              fontSize: "clamp(27px, 3.2vw, 40px)",
              lineHeight: 1.28,
              letterSpacing: "-.01em",
              color: "var(--text)",
            }}
          >
            Tecnologia desde os 15. Comecei num curso técnico de eletrónica,
            passei por reparação de equipamentos, gestão de servidores e agora
            construo websites. A curiosidade técnica foi sempre a mesma;{" "}
            <span style={{ fontStyle: "italic", color: "var(--ac)" }}>
              só o contexto mudou
            </span>
            .
          </motion.p>
          <motion.p
            variants={fadeUp}
            style={{
              fontSize: 18,
              lineHeight: 1.65,
              color: "var(--text-dim)",
              maxWidth: "58ch",
              marginTop: 26,
            }}
          >
            Trato o site do cliente como um produto de engenharia: não só
            bonito, mas funcional, rápido e medível. Sou responsável pelo
            design e pelo código, sem intermediários entre as duas fases.
          </motion.p>
          <motion.p
            variants={fadeUp}
            style={{
              fontSize: 18,
              lineHeight: 1.65,
              color: "var(--muted)",
              maxWidth: "58ch",
              marginTop: 14,
            }}
          >
            Licenciado em Engenharia Informática pelo IPV. A base académica
            reforçou o que já sabia na prática: sistemas simples são mais
            difíceis de construir, mas vencem sempre.
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
}
