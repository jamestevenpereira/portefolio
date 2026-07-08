"use client";

import { motion, useReducedMotion } from "framer-motion";
import { TextReveal, type TextSegment, EASE } from "@/components/motion/primitives";

/**
 * Cabeçalho de secção padrão: kicker numerado em mono + título serif
 * com reveal palavra a palavra. Ver Design.md § Componentes.
 */
export default function SectionHeader({
  index,
  kicker,
  segments,
  marginBottom = 42,
}: {
  index: string;
  kicker: string;
  segments: TextSegment[];
  marginBottom?: number;
}) {
  const reduced = useReducedMotion();

  return (
    <div style={{ marginBottom }}>
      <motion.div
        initial={{ opacity: 0, y: reduced ? 0 : 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.7 }}
        transition={{ duration: 0.55, ease: EASE }}
        style={{
          fontFamily: "var(--mono)",
          fontSize: 13,
          letterSpacing: ".12em",
          textTransform: "uppercase",
          color: "var(--ac)",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span style={{ color: "var(--muted-2)" }}>{index}</span> {kicker}
        <motion.span
          aria-hidden
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
          style={{
            flex: "0 1 72px",
            height: 1,
            marginLeft: 6,
            background:
              "linear-gradient(90deg, var(--ac-deep), transparent)",
            transformOrigin: "0 50%",
          }}
        />
      </motion.div>
      <h2
        style={{
          fontFamily: "var(--serif)",
          fontWeight: 400,
          fontSize: "clamp(34px, 4.5vw, 54px)",
          lineHeight: 1.08,
          letterSpacing: "-.01em",
          color: "var(--text)",
          marginTop: 16,
        }}
      >
        <TextReveal segments={segments} delay={0.1} amount={0.5} />
      </h2>
    </div>
  );
}
