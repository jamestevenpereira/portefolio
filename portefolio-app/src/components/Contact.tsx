"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Magnetic, TextReveal } from "@/components/motion/primitives";

function Btn({
  href,
  children,
  baseStyle,
  hoverStyle,
  target,
  rel,
  className,
}: {
  href: string;
  children: React.ReactNode;
  baseStyle: React.CSSProperties;
  hoverStyle: React.CSSProperties;
  target?: string;
  rel?: string;
  className?: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 9,
        padding: "16px 30px",
        borderRadius: 11,
        fontWeight: 500,
        fontSize: 16,
        transition:
          "transform .2s, background .2s, box-shadow .2s, border-color .2s, color .2s",
        ...baseStyle,
        ...(hovered ? hoverStyle : {}),
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </a>
  );
}

function FooterLink({
  href,
  children,
  ariaLabel,
}: {
  href: string;
  children: React.ReactNode;
  ariaLabel?: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      style={{ transition: "color .2s", color: hovered ? "var(--ac)" : "inherit" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </a>
  );
}

export default function Contact() {
  const reduced = useReducedMotion();
  const yOffset = reduced ? 0 : 30;

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: yOffset },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 260, damping: 22 },
    },
  };

  const footerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  return (
    <section
      id="contact"
      style={{ position: "relative", overflow: "hidden", marginTop: 60 }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(700px 460px at 50% 120%, color-mix(in srgb, var(--ac) 16%, transparent), transparent 70%)",
        }}
      />
      <motion.div
        style={{
          position: "relative",
          maxWidth: 860,
          margin: "0 auto",
          padding: "104px 32px 80px",
          textAlign: "center",
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        variants={containerVariants}
      >
        <motion.div
          variants={itemVariants}
          style={{
            fontFamily: "var(--mono)",
            fontSize: 13,
            letterSpacing: ".12em",
            textTransform: "uppercase",
            color: "var(--ac)",
            marginBottom: 22,
          }}
        >
          06 vamos trabalhar
        </motion.div>
        <h2
          style={{
            fontFamily: "var(--serif)",
            fontWeight: 400,
            fontSize: "clamp(42px, 6.5vw, 76px)",
            lineHeight: 1.06,
            letterSpacing: "-.015em",
            color: "var(--text)",
          }}
        >
          <TextReveal
            amount={0.5}
            stagger={0.08}
            segments={[{ text: "Tem uma ideia parada?" }]}
          />
          <br />
          <TextReveal
            amount={0.5}
            stagger={0.08}
            delay={0.35}
            segments={[
              {
                text: "Vamos colocar no ar.",
                style: { fontStyle: "italic", color: "var(--ac)" },
              },
            ]}
          />
        </h2>
        <motion.p
          variants={itemVariants}
          style={{
            fontSize: 18,
            lineHeight: 1.6,
            color: "var(--text-dim)",
            maxWidth: "48ch",
            margin: "26px auto 0",
          }}
        >
          Conta em duas linhas o que queres construir. Respondo em menos de
          48 horas, sempre com um humano do outro lado.
        </motion.p>
        <motion.div
          variants={itemVariants}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 14,
            justifyContent: "center",
            marginTop: 36,
          }}
        >
          <Magnetic>
            <Btn
              href="mailto:jamestevenpereira@gmail.com"
              className="shine"
              baseStyle={{
                background: "var(--ac)",
                color: "#15100a",
                fontWeight: 600,
                boxShadow:
                  "0 14px 38px -16px color-mix(in srgb, var(--ac) 80%, transparent)",
              }}
              hoverStyle={{ background: "var(--ac-hot)" }}
            >
              Enviar um e-mail
            </Btn>
          </Magnetic>
          <Magnetic>
            <Btn
              href="https://wa.me/351968464987"
              target="_blank"
              rel="noopener noreferrer"
              baseStyle={{ border: "1px solid var(--border)", color: "var(--text)" }}
              hoverStyle={{ borderColor: "var(--ok)", color: "var(--ok)" }}
            >
              WhatsApp
            </Btn>
          </Magnetic>
        </motion.div>
      </motion.div>

      <motion.footer
        style={{ borderTop: "1px solid var(--border-soft)", background: "var(--bg-2)" }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.8 }}
        variants={footerVariants}
      >
        <div
          style={{
            maxWidth: 1180,
            margin: "0 auto",
            padding: "30px 32px",
            display: "flex",
            flexWrap: "wrap",
            gap: 20,
            alignItems: "center",
            justifyContent: "space-between",
            fontFamily: "var(--mono)",
            fontSize: 12.5,
            color: "var(--muted)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              style={{
                display: "grid",
                placeItems: "center",
                width: 26,
                height: 26,
                borderRadius: 7,
                background: "var(--ac)",
                color: "#15100a",
                fontWeight: 600,
                fontSize: 12,
              }}
            >
              JS
            </span>
            James Steven · © 2026
          </div>
          <div style={{ display: "flex", gap: 22 }}>
            <FooterLink
              href="https://github.com/jamestevenpereira"
              ariaLabel="GitHub (abre numa nova janela)"
            >
              github
            </FooterLink>
            <FooterLink
              href="https://www.linkedin.com/in/james-steven-8b9b1638a/"
              ariaLabel="LinkedIn (abre numa nova janela)"
            >
              linkedin
            </FooterLink>
            <FooterLink
              href="https://www.instagram.com/jamesteven_"
              ariaLabel="Instagram (abre numa nova janela)"
            >
              instagram
            </FooterLink>
          </div>
          <div style={{ color: "var(--muted-2)" }}>
            feito com código e curiosidade em viseu
          </div>
        </div>
      </motion.footer>
    </section>
  );
}
