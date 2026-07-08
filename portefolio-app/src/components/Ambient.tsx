"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  useReducedMotion,
} from "framer-motion";

/**
 * Fundo ambiente de página inteira: grelha subtil, auroras em movimento
 * lento, spotlight que segue o cursor (só desktop) e grão de filme.
 * Tudo decorativo — pointer-events: none e aria-hidden.
 */
export default function Ambient() {
  const reduced = useReducedMotion();
  const mx = useMotionValue(-1000);
  const my = useMotionValue(-1000);
  const sx = useSpring(mx, { stiffness: 55, damping: 18, mass: 0.7 });
  const sy = useSpring(my, { stiffness: 55, damping: 18, mass: 0.7 });
  const spotlight = useMotionTemplate`radial-gradient(560px circle at ${sx}px ${sy}px, color-mix(in srgb, var(--ac) 6.5%, transparent), transparent 70%)`;

  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const move = (e: PointerEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [mx, my, reduced]);

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {/* grelha técnica, esvanece a partir do topo */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(var(--border-soft) 1px, transparent 1px), linear-gradient(90deg, var(--border-soft) 1px, transparent 1px)",
          backgroundSize: "76px 76px",
          opacity: 0.5,
          maskImage:
            "radial-gradient(1100px 640px at 50% -5%, black, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(1100px 640px at 50% -5%, black, transparent 78%)",
        }}
      />

      {/* auroras — cores do sistema, deriva lenta */}
      <div
        className="aurora"
        style={{
          top: "-22%",
          right: "-12%",
          width: "56vw",
          height: "56vw",
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--ac) 13%, transparent), transparent 62%)",
          animation: "drift1 26s ease-in-out infinite alternate",
        }}
      />
      <div
        className="aurora"
        style={{
          bottom: "-28%",
          left: "-14%",
          width: "48vw",
          height: "48vw",
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--warn) 7%, transparent), transparent 60%)",
          animation: "drift2 32s ease-in-out infinite alternate",
        }}
      />

      {/* spotlight que segue o cursor */}
      {!reduced && (
        <motion.div
          style={{ position: "absolute", inset: 0, background: spotlight }}
        />
      )}

      {/* grão de filme */}
      <div className="grain" />
    </div>
  );
}
