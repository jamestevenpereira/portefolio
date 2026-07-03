"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { TextReveal } from "@/components/motion/primitives";
import ContactForm from "@/components/ContactForm";
import { CONTACT_EMAIL, WHATSAPP_URL, SOCIALS } from "@/lib/site";

function InlineLink({
  href,
  children,
  external,
  hoverColor = "var(--ac)",
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  hoverColor?: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      style={{
        fontFamily: "var(--mono)",
        fontSize: 13,
        color: hovered ? hoverColor : "var(--text-dim)",
        borderBottom: `1px solid ${hovered ? hoverColor : "var(--border)"}`,
        paddingBottom: 2,
        transition: "color .2s, border-color .2s",
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
          padding: "104px 20px 80px",
          textAlign: "center",
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
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
          style={{ maxWidth: 620, margin: "40px auto 0" }}
        >
          <ContactForm />
        </motion.div>

        <motion.div
          variants={itemVariants}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px 26px",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 28,
            fontFamily: "var(--mono)",
            fontSize: 13,
            color: "var(--muted)",
          }}
        >
          <span>ou diretamente:</span>
          <InlineLink href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </InlineLink>
          <InlineLink href={WHATSAPP_URL} external hoverColor="var(--ok)">
            whatsapp ↗
          </InlineLink>
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
              href={SOCIALS.github}
              ariaLabel="GitHub (abre numa nova janela)"
            >
              github
            </FooterLink>
            <FooterLink
              href={SOCIALS.linkedin}
              ariaLabel="LinkedIn (abre numa nova janela)"
            >
              linkedin
            </FooterLink>
            <FooterLink
              href={SOCIALS.instagram}
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
