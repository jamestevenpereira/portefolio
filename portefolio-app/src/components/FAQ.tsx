"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const faqs = [
  {
    q: "Quanto custa um website?",
    a: "Depende do que precisas, mas trabalho sempre com um valor fixo acordado à partida, sem surpresas no fim. Diz-me o que tens em mente e digo-te um número antes de começarmos.",
  },
  {
    q: "Quanto tempo demora?",
    a: "Um site institucional fica no ar em 2 a 4 semanas, conforme o conteúdo e a complexidade. Prefiro entregar cedo e melhorar a partir daí do que prometer prazos longos.",
  },
  {
    q: "Como funciona o processo?",
    a: "Começamos por uma conversa para perceber o problema real, não só o que está descrito. Depois desenho e construo em paralelo, mostro-te versões já no ar, e ajustamos até ficar certo.",
  },
  {
    q: "Que tecnologias usas?",
    a: "Construo com Next.js e React. É rápido, bom para SEO e simples de manter. Mas a tecnologia serve o objetivo: escolho-a conforme o teu caso, não ao contrário.",
  },
  {
    q: "Fazes manutenção depois do lançamento?",
    a: "Sim. Tenho três pacotes de manutenção (Starter, Crescimento e Full Service) que mantêm o site seguro, atualizado e acompanhado. Vê a secção Pacotes aqui em cima.",
  },
  {
    q: "Trabalhas com clientes à distância?",
    a: "Estou em Viseu, mas trabalho com clientes em qualquer lugar. Quase todo o processo é remoto. O que importa é a comunicação, não a morada.",
  },
];

function Item({
  q,
  a,
  index,
  open,
  onToggle,
  reduced,
}: {
  q: string;
  a: string;
  index: number;
  open: boolean;
  onToggle: () => void;
  reduced: boolean;
}) {
  const panelId = `faq-panel-${index}`;
  const btnId = `faq-btn-${index}`;
  return (
    <div style={{ borderBottom: "1px solid var(--border-soft)" }}>
      <button
        id={btnId}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          padding: "22px 4px",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <span
          style={{
            fontFamily: "var(--serif)",
            fontSize: "clamp(19px, 2vw, 23px)",
            color: open ? "var(--ac)" : "var(--text)",
            transition: reduced ? "none" : "color .2s",
          }}
        >
          {q}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: reduced ? 0 : 0.2 }}
          style={{ flexShrink: 0, fontFamily: "var(--mono)", fontSize: 24, color: "var(--muted)", lineHeight: 1 }}
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={btnId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.28, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <p style={{ fontSize: 16, lineHeight: 1.65, color: "var(--muted)", padding: "0 4px 24px", maxWidth: "64ch" }}>
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState<number | null>(null);
  const yOffset = reduced ? 0 : 28;

  const headerVariants = {
    hidden: { opacity: 0, y: yOffset },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  return (
    <section id="faq" style={{ maxWidth: 880, margin: "0 auto", padding: "96px 32px 30px" }}>
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
          <span style={{ color: "var(--muted-2)" }}>07</span> perguntas frequentes
        </div>
        <h2
          style={{
            fontFamily: "var(--serif)",
            fontWeight: 400,
            fontSize: "clamp(34px, 4.5vw, 54px)",
            lineHeight: 1.05,
            letterSpacing: "-.01em",
            color: "var(--text)",
            marginBottom: 32,
          }}
        >
          Perguntas frequentes.
        </h2>
      </motion.div>

      <div style={{ borderTop: "1px solid var(--border-soft)" }}>
        {faqs.map((f, i) => (
          <Item
            key={i}
            q={f.q}
            a={f.a}
            index={i}
            open={open === i}
            onToggle={() => setOpen(open === i ? null : i)}
            reduced={!!reduced}
          />
        ))}
      </div>
    </section>
  );
}
