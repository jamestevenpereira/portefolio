"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

const counters = [
  { target: 4, label: "websites entregues" },
  { target: 14, label: "anos em tecnologia" },
  { target: 100, label: "clientes satisfeitos", suffix: "%" },
  { target: 2025, label: "Engenharia Informática", isStatic: true },
];

function useCountUp(target: number, active: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    const dur = 1400;
    const t0 = performance.now();
    let raf: number;
    const step = (now: number) => {
      const p = Math.min(1, (now - t0) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * e));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, target]);
  return value;
}

function Counter({
  target,
  label,
  suffix = "",
  active,
  index,
  isStatic,
}: {
  target: number;
  label: string;
  suffix?: string;
  active: boolean;
  index: number;
  isStatic?: boolean;
}) {
  const val = useCountUp(target, active);
  const reduced = useReducedMotion();
  const yOffset = reduced ? 0 : 20;
  const displayVal = isStatic ? String(target) : val.toLocaleString("pt-PT");

  return (
    <motion.div
      style={{ background: "var(--bg-2)", padding: "30px 26px" }}
      initial={{ opacity: 0, y: yOffset }}
      animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: yOffset }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 22,
        delay: index * 0.09,
      }}
    >
      <div
        style={{
          fontFamily: "var(--serif)",
          fontSize: "clamp(40px, 5vw, 58px)",
          lineHeight: 1,
          color: "var(--text)",
        }}
      >
        {displayVal}
        {suffix && <span style={{ color: "var(--ac)" }}>{suffix}</span>}
      </div>
      <div
        style={{
          fontFamily: "var(--mono)",
          fontSize: 12.5,
          letterSpacing: ".08em",
          textTransform: "uppercase",
          color: "var(--muted)",
          marginTop: 12,
        }}
      >
        {label}
      </div>
    </motion.div>
  );
}

export default function Proof() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [active, setActive] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isInView) setActive(true);
  }, [isInView]);

  return (
    <section
      id="proof"
      ref={ref}
      style={{
        maxWidth: 1180,
        margin: "0 auto",
        padding: isMobile ? "40px 20px" : "56px 32px",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
          gap: 1,
          background: "var(--border)",
          border: "1px solid var(--border)",
          borderRadius: 16,
          overflow: "hidden",
        }}
      >
        {counters.map((c, i) => (
          <Counter key={c.label} {...c} active={active} index={i} />
        ))}
      </div>
    </section>
  );
}
