"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useReducedMotion,
  useMotionTemplate,
} from "framer-motion";

/** Easing padrão do site — ver Design.md § Movimento */
export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const SPRING_SOFT = {
  type: "spring" as const,
  stiffness: 260,
  damping: 22,
};

/* ---------------------------------------------------------------- */
/* Barra de progresso de leitura, fixa no topo                       */
/* ---------------------------------------------------------------- */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 28,
    mass: 0.4,
  });
  return (
    <motion.div
      aria-hidden
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        transformOrigin: "0 50%",
        scaleX,
        background:
          "linear-gradient(90deg, var(--ac-deep), var(--ac), var(--ac-hot))",
        zIndex: 60,
      }}
    />
  );
}

/* ---------------------------------------------------------------- */
/* Wrapper magnético: o elemento inclina-se na direção do cursor     */
/* ---------------------------------------------------------------- */
export function Magnetic({
  children,
  strength = 0.28,
}: {
  children: React.ReactNode;
  strength?: number;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 240, damping: 18, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 240, damping: 18, mass: 0.5 });

  if (reduced) return <>{children}</>;

  return (
    <motion.div
      ref={ref}
      style={{ display: "inline-flex", x: sx, y: sy }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/* ---------------------------------------------------------------- */
/* Cartão com tilt 3D + spotlight que segue o cursor                 */
/* ---------------------------------------------------------------- */
export function Tilt({
  children,
  max = 6,
  radius = 16,
  style,
}: {
  children: React.ReactNode;
  max?: number;
  radius?: number;
  style?: React.CSSProperties;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 20 });
  const sry = useSpring(ry, { stiffness: 200, damping: 20 });
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const spotlight = useMotionTemplate`radial-gradient(440px circle at ${mx}% ${my}%, color-mix(in srgb, var(--ac) 10%, transparent), transparent 65%)`;

  return (
    <motion.div
      ref={ref}
      style={{
        position: "relative",
        rotateX: srx,
        rotateY: sry,
        transformPerspective: 1000,
        transformStyle: "preserve-3d",
        borderRadius: radius,
        ...style,
      }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || reduced) return;
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        mx.set(px * 100);
        my.set(py * 100);
        ry.set((px - 0.5) * 2 * max);
        rx.set(-(py - 0.5) * 2 * max);
      }}
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") setHovered(true);
      }}
      onPointerLeave={() => {
        setHovered(false);
        rx.set(0);
        ry.set(0);
      }}
    >
      {children}
      <motion.div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: radius,
          background: spotlight,
          pointerEvents: "none",
          zIndex: 2,
        }}
        animate={{ opacity: hovered && !reduced ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

/* ---------------------------------------------------------------- */
/* Fade-up genérico ao entrar no viewport                            */
/* ---------------------------------------------------------------- */
export function Reveal({
  children,
  delay = 0,
  y = 26,
  amount = 0.3,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  amount?: number;
  style?: React.CSSProperties;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: reduced ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.7, ease: EASE, delay }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/* ---------------------------------------------------------------- */
/* Reveal de texto palavra a palavra, com máscara vertical           */
/* ---------------------------------------------------------------- */
export type TextSegment = { text: string; style?: React.CSSProperties };

export function TextReveal({
  segments,
  delay = 0,
  stagger = 0.05,
  amount = 0.6,
  immediate = false,
}: {
  segments: TextSegment[];
  delay?: number;
  stagger?: number;
  amount?: number;
  /** true = anima no mount (hero); false = anima ao entrar no viewport */
  immediate?: boolean;
}) {
  const reduced = useReducedMotion();

  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };

  const word = {
    hidden: reduced ? { opacity: 0 } : { y: "115%" },
    visible: reduced
      ? { opacity: 1, transition: { duration: 0.4 } }
      : { y: "0%", transition: { duration: 0.75, ease: EASE } },
  };

  return (
    <motion.span
      variants={container}
      initial="hidden"
      {...(immediate
        ? { animate: "visible" }
        : { whileInView: "visible", viewport: { once: true, amount } })}
    >
      {segments.map((seg, si) => {
        const words = seg.text.split(" ").filter(Boolean);
        const trailing = seg.text.endsWith(" ");
        const nextLeading = segments[si + 1]?.text.startsWith(" ") ?? false;
        return words.map((w, wi) => {
          const isLast = si === segments.length - 1 && wi === words.length - 1;
          const needsSpace =
            !isLast && (wi < words.length - 1 || trailing || nextLeading);
          return (
            <span
              key={`${si}-${wi}`}
              style={{
                display: "inline-block",
                overflow: "hidden",
                verticalAlign: "bottom",
                paddingBottom: "0.12em",
                marginBottom: "-0.12em",
              }}
            >
              <motion.span
                variants={word}
                style={{ display: "inline-block", ...seg.style }}
              >
                {w}
                {needsSpace ? " " : ""}
              </motion.span>
            </span>
          );
        });
      })}
    </motion.span>
  );
}
