"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

const projects = [
  {
    year: "2026",
    type: "design + dev",
    num: "001",
    title: "Silkadelics",
    tags: ["Next.js", "Tailwind", "banda"],
    role: "banda de casamentos premium",
    detail:
      "Website completo para banda de casamentos de alta gama, com galeria de atuações, repertório e contacto directo.",
    image: "/projects/silkadelics.jpg",
    url: "https://www.silkadelics.pt/",
  },
  {
    year: "2026",
    type: "design + dev",
    num: "002",
    title: "Dra. Conceição Lopes",
    tags: ["Next.js", "Tailwind", "jurídico"],
    role: "advogada em Viseu",
    detail:
      "Site para advogada com 7+ anos de experiência. 6 áreas de prática, depoimentos de clientes e sistema de marcação de consultas.",
    image: "/projects/conceicao-lopes.jpg",
    url: "https://advogada-sable.vercel.app/",
  },
  {
    year: "2026",
    type: "design + dev",
    num: "003",
    title: "Irmãos J. Santos",
    tags: ["Angular", "Node.js", "construção"],
    role: "empresa de obras com 30+ anos",
    detail:
      "Website institucional para empresa de construção civil em Nelas. Serviços, portefólio de obras e formulário de pedido de orçamento.",
    image: "/projects/irmaos-santos.jpg",
    url: "https://ijsantos-site.pages.dev/",
  },
  {
    year: "2026",
    type: "design + dev",
    num: "004",
    title: "The T Lab",
    tags: ["Next.js", "Tailwind", "institucional"],
    role: "identidade e presença online",
    detail:
      "Website institucional desenvolvido de raiz, do design ao código ao domínio final.",
    image: "/projects/the-t-lab.jpg",
    url: "https://the-t-lab.com/",
  },
];

function ProjectCard({
  p,
  isMobile,
}: {
  p: (typeof projects)[0];
  isMobile: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={p.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "block",
        border: `1px solid ${hovered ? "var(--ac-deep)" : "var(--border)"}`,
        borderRadius: 16,
        background: "var(--surface)",
        overflow: "hidden",
        transition: "transform .3s, border-color .3s, box-shadow .3s",
        transform: hovered && !isMobile ? "translateY(-4px)" : "none",
        boxShadow:
          hovered && !isMobile ? "0 28px 64px -38px rgba(0,0,0,.75)" : "none",
        textDecoration: "none",
        cursor: "pointer",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* imagem do projeto */}
      <div
        style={{
          width: "100%",
          aspectRatio: "16/9",
          background: "var(--surface-2)",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <img
          src={p.image}
          alt={p.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transition: "transform .4s ease",
            transform: hovered && !isMobile ? "scale(1.04)" : "scale(1)",
          }}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
            const parent = e.currentTarget.parentElement;
            if (parent) {
              parent.style.display = "flex";
              parent.style.alignItems = "center";
              parent.style.justifyContent = "center";
              parent.innerHTML = `<span style="font-family:var(--mono);font-size:13px;color:var(--muted-2);letter-spacing:.1em">${p.num}</span>`;
            }
          }}
        />
      </div>

      {/* conteúdo */}
      <div style={{ padding: isMobile ? 22 : 26 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "var(--mono)",
            fontSize: 12,
            color: "var(--muted)",
            letterSpacing: ".04em",
            marginBottom: 12,
          }}
        >
          <span>
            {p.year} · {p.type}
          </span>
          <span style={{ color: "var(--ac-deep)" }}>{p.num}</span>
        </div>

        <h3
          style={{
            fontFamily: "var(--serif)",
            fontSize: isMobile ? 26 : 30,
            lineHeight: 1.1,
            color: "var(--text)",
            margin: "0 0 6px",
          }}
        >
          {p.title}
        </h3>

        <div
          style={{
            fontFamily: "var(--mono)",
            fontSize: 13,
            color: "var(--ac)",
            marginBottom: 16,
          }}
        >
          {p.role}
        </div>

        <div
          style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 16 }}
        >
          {p.tags.map((t) => (
            <span
              key={t}
              style={{
                fontFamily: "var(--mono)",
                fontSize: 11.5,
                padding: "4px 10px",
                border: "1px solid var(--border)",
                borderRadius: 999,
                color: "var(--text-dim)",
              }}
            >
              {t}
            </span>
          ))}
        </div>

        <p
          style={{
            fontSize: 15,
            lineHeight: 1.55,
            color: "var(--text-dim)",
            margin: 0,
          }}
        >
          {p.detail}
        </p>
      </div>
    </a>
  );
}

export default function Work() {
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  const yOffset = reduced ? 0 : 28;

  const headerVariants = {
    hidden: { opacity: 0, y: yOffset },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: reduced ? 0 : 36 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 240, damping: 20 },
    },
  };

  return (
    <section
      id="work"
      style={{
        maxWidth: 1180,
        margin: "0 auto",
        padding: isMobile ? "60px 20px 30px" : "78px 32px 30px",
      }}
    >
      <motion.div
        style={{ marginBottom: 42 }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.7 }}
        variants={headerVariants}
      >
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
          }}
        >
          <span style={{ color: "var(--muted-2)" }}>02</span> trabalhos
          selecionados
        </div>
        <h2
          style={{
            fontFamily: "var(--serif)",
            fontWeight: 400,
            fontSize: "clamp(34px, 4.5vw, 54px)",
            lineHeight: 1.05,
            letterSpacing: "-.01em",
            color: "var(--text)",
            marginTop: 16,
          }}
        >
          Provas de execução, não galeria.
        </h2>
      </motion.div>

      <motion.div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
          gap: 18,
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={containerVariants}
      >
        {projects.map((p) => (
          <motion.div key={p.num} variants={cardVariants}>
            <ProjectCard p={p} isMobile={isMobile} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
