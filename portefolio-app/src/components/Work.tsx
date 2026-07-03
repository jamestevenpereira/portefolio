"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Tilt } from "@/components/motion/primitives";
import SectionHeader from "@/components/SectionHeader";

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
  const [imgError, setImgError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // se a imagem falhou antes da hidratação, o onError nunca dispara
  useEffect(() => {
    const el = imgRef.current;
    if (el && el.complete && el.naturalWidth === 0) setImgError(true);
  }, []);

  return (
    <Tilt max={4} radius={16} style={{ height: "100%" }}>
    <a
      href={p.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "block",
        height: "100%",
        border: `1px solid ${hovered ? "var(--ac-deep)" : "var(--border)"}`,
        borderRadius: 16,
        background: "var(--surface)",
        overflow: "hidden",
        transition: "border-color .3s, box-shadow .3s",
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
        {!imgError ? (
          <img
            ref={imgRef}
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
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              background:
                "linear-gradient(135deg, var(--surface-2) 0%, var(--bg-2) 100%)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--mono)",
                fontSize: 28,
                color: "var(--muted-2)",
                letterSpacing: ".06em",
              }}
            >
              {p.num}
            </span>
            <span
              style={{
                fontFamily: "var(--mono)",
                fontSize: 11,
                color: "var(--muted-2)",
                letterSpacing: ".12em",
                textTransform: "uppercase",
              }}
            >
              imagem em breve
            </span>
          </div>
        )}

        {/* selo "visitar" que aparece em hover (desktop) */}
        {!isMobile && (
          <span
            aria-hidden
            style={{
              position: "absolute",
              top: 14,
              right: 14,
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              padding: "8px 14px",
              borderRadius: 999,
              fontFamily: "var(--mono)",
              fontSize: 12,
              background: "color-mix(in srgb, var(--bg) 78%, transparent)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              border: "1px solid var(--border)",
              color: "var(--text)",
              opacity: hovered ? 1 : 0,
              transform: hovered
                ? "translateY(0) scale(1)"
                : "translateY(6px) scale(.96)",
              transition: "opacity .25s ease, transform .25s ease",
            }}
          >
            visitar <span style={{ color: "var(--ac)" }}>↗</span>
          </span>
        )}
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
    </Tilt>
  );
}

export default function Work() {
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();

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
      <SectionHeader
        index="02"
        kicker="trabalhos selecionados"
        segments={[
          { text: "Provas de " },
          {
            text: "execução,",
            style: { fontStyle: "italic", color: "var(--ac)" },
          },
          { text: " não galeria." },
        ]}
      />

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
          <motion.div key={p.num} variants={cardVariants} style={{ height: "100%" }}>
            <ProjectCard p={p} isMobile={isMobile} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
