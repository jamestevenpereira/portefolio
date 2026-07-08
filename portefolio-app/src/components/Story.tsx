"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";
import SectionHeader from "@/components/SectionHeader";

const events = [
  {
    year: "2011",
    title: "A base técnica",
    body: "Aos 15 anos, entrei num curso profissional de Eletrónica, Automação e Computadores. Primeiro contacto sério com circuitos, sistemas e a lógica de como as coisas funcionam por dentro.",
    lesson: "o que ficou: não há atalho para entender os fundamentos.",
    glow: false,
  },
  {
    year: "2014",
    title: "Mãos na massa em 2 países",
    body: "Trabalhei na Ename, centro de reparação de equipamentos eletrónicos — um ano em Portugal, dois em França. Diagnóstico, reparação, clientes exigentes e prazos reais.",
    lesson: "o que ficou: resolver problemas sob pressão é uma competência treinável.",
    glow: false,
  },
  {
    year: "2022",
    title: "De volta aos livros com propósito",
    body: "Com anos de experiência no mercado, voltei à academia para formalizar o que sabia e aprender o que faltava. Licenciatura em Engenharia Informática no Instituto Politécnico de Viseu.",
    lesson: "o que ficou: a teoria faz mais sentido quando já se viveu a prática.",
    glow: false,
  },
  {
    year: "out. 2025",
    title: "O primeiro website pago",
    body: "No mesmo mês em que terminei a licenciatura, entreguei o primeiro projeto freelance pago. Do design ao código ao ar — em solo.",
    lesson: "o que ficou: entregar conta mais do que planear.",
    glow: false,
  },
  {
    year: "hoje",
    title: "A construir em paralelo",
    body: "Quatro websites entregues, todos full design + desenvolvimento. Cada projeto ensina algo novo. A construir o portefólio, um cliente de cada vez.",
    lesson: "o que ficou: o melhor portfólio é o resultado do cliente.",
    glow: true,
  },
];

export default function Story() {
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.14, delayChildren: 0.1 },
    },
  };

  const eventVariants = {
    hidden: { opacity: 0, x: reduced ? 0 : 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring" as const, stiffness: 240, damping: 22 },
    },
  };

  return (
    <section
      id="story"
      style={{
        maxWidth: 1180,
        margin: "0 auto",
        padding: isMobile ? "72px 20px 30px" : "96px 32px 30px",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : ".85fr 1.15fr",
          gap: isMobile ? 36 : 54,
          alignItems: "start",
        }}
      >
        <div style={{ position: isMobile ? "static" : "sticky", top: 96 }}>
          <SectionHeader
            index="04"
            kicker="como cheguei aqui"
            marginBottom={0}
            segments={[
              { text: "Menos um currículo, mais uma " },
              {
                text: "trajetória.",
                style: { fontStyle: "italic", color: "var(--ac)" },
              },
            ]}
          />
        </div>

        <motion.div
          style={{
            borderLeft: "1px solid var(--border)",
            paddingLeft: 34,
            display: "flex",
            flexDirection: "column",
            gap: 46,
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {events.map((ev) => (
            <motion.div
              key={ev.year}
              style={{ position: "relative" }}
              variants={eventVariants}
            >
              <span
                style={{
                  position: "absolute",
                  left: -41,
                  top: 6,
                  width: 13,
                  height: 13,
                  borderRadius: "50%",
                  background: ev.glow ? "var(--ac-hot)" : "var(--ac)",
                  boxShadow: ev.glow
                    ? "0 0 0 4px var(--bg), 0 0 18px var(--ac)"
                    : "0 0 0 4px var(--bg)",
                }}
              />
              <div
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 13,
                  color: "var(--ac)",
                  letterSpacing: ".05em",
                }}
              >
                {ev.year}
              </div>
              <h3
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: 27,
                  color: "var(--text)",
                  margin: "5px 0 10px",
                }}
              >
                {ev.title}
              </h3>
              <p
                style={{
                  fontSize: 17,
                  lineHeight: 1.6,
                  color: "var(--text-dim)",
                  maxWidth: "54ch",
                }}
              >
                {ev.body}
              </p>
              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.5,
                  color: "var(--muted)",
                  maxWidth: "54ch",
                  marginTop: 8,
                  fontStyle: "italic",
                }}
              >
                {ev.lesson}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
