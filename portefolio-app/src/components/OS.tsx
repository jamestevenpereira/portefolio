"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

const liveProjects = [
  {
    title: "Silkadelics",
    tags: "Next.js · banda",
    url: "https://www.silkadelics.pt/",
  },
  {
    title: "Dra. Conceição Lopes",
    tags: "Next.js · jurídico",
    url: "https://advogada-sable.vercel.app/",
  },
  {
    title: "Irmãos J. Santos",
    tags: "Angular · construção",
    url: "https://ijsantos-site.pages.dev/",
  },
  {
    title: "The T Lab",
    tags: "Next.js · institucional",
    url: "https://the-t-lab.com/",
  },
];

export default function OS() {
  const [time, setTime] = useState("--:--:--");
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  const yOffset = reduced ? 0 : 22;

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("pt-PT", {
          hour12: false,
          timeZone: "Europe/Lisbon",
        })
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

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
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: reduced ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 250, damping: 22 },
    },
  };

  return (
    <section
      id="os"
      style={{
        maxWidth: 1180,
        margin: "0 auto",
        padding: isMobile ? "72px 20px 30px" : "96px 32px 30px",
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
          <span style={{ color: "var(--muted-2)" }}>03</span> sistema operacional
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
          Meu sistema, ao vivo.
        </h2>
      </motion.div>

      <motion.div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
          gap: 16,
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={containerVariants}
      >
        {/* foco atual */}
        <motion.div
          variants={cardVariants}
          style={{
            border: "1px solid var(--border)",
            borderRadius: 16,
            background: "linear-gradient(150deg, var(--surface), var(--bg-2))",
            padding: 26,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            minHeight: 210,
          }}
        >
          <div
            style={{
              fontFamily: "var(--mono)",
              fontSize: 11.5,
              letterSpacing: ".1em",
              textTransform: "uppercase",
              color: "var(--muted)",
            }}
          >
            foco atual
          </div>
          <div>
            <div
              style={{
                fontFamily: "var(--serif)",
                fontSize: 30,
                lineHeight: 1.15,
                color: "var(--text)",
                marginBottom: 14,
              }}
            >
              Websites para profissionais e empresas
            </div>
            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: 12,
                color: "var(--muted)",
              }}
            >
              next.js · tailwind · full design + dev · viseu
            </div>
          </div>
        </motion.div>

        {/* disponibilidade */}
        <motion.div
          variants={cardVariants}
          style={{
            border: "1px solid var(--border)",
            borderRadius: 16,
            background: "var(--surface)",
            padding: 26,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            minHeight: 210,
          }}
        >
          <div
            style={{
              fontFamily: "var(--mono)",
              fontSize: 11.5,
              letterSpacing: ".1em",
              textTransform: "uppercase",
              color: "var(--muted)",
            }}
          >
            disponibilidade
          </div>
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 9,
                fontFamily: "var(--mono)",
                fontSize: 13,
                color: "var(--ok)",
                padding: "6px 12px",
                border:
                  "1px solid color-mix(in srgb, var(--ok) 35%, var(--border))",
                borderRadius: 999,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "var(--ok)",
                  animation: "pulseDot 2s infinite",
                }}
              />{" "}
              aberto a projetos
            </div>
            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: 26,
                color: "var(--text)",
                marginTop: 18,
              }}
            >
              {time}
            </div>
            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: 12,
                color: "var(--muted)",
                marginTop: 4,
              }}
            >
              viseu · gmt+1
            </div>
          </div>
        </motion.div>

        {/* projetos no ar */}
        <motion.div
          variants={cardVariants}
          style={{
            gridColumn: isMobile ? "span 1" : "1 / -1",
            border: "1px solid var(--border)",
            borderRadius: 16,
            background: "var(--surface)",
            padding: 26,
          }}
        >
          <div
            style={{
              fontFamily: "var(--mono)",
              fontSize: 11.5,
              letterSpacing: ".1em",
              textTransform: "uppercase",
              color: "var(--muted)",
              marginBottom: 20,
            }}
          >
            projetos no ar
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
              gap: 10,
            }}
          >
            {liveProjects.map((p) => (
              <a
                key={p.title}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                  padding: "12px 16px",
                  border: "1px solid var(--border-soft)",
                  borderRadius: 10,
                  background: "var(--bg-2)",
                  textDecoration: "none",
                  transition: "border-color .2s, background .2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor =
                    "var(--ac-deep)";
                  (e.currentTarget as HTMLAnchorElement).style.background =
                    "var(--surface-2)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor =
                    "var(--border-soft)";
                  (e.currentTarget as HTMLAnchorElement).style.background =
                    "var(--bg-2)";
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: "var(--ok)",
                      flexShrink: 0,
                    }}
                  />
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--sans)",
                        fontSize: 14,
                        color: "var(--text)",
                        fontWeight: 500,
                      }}
                    >
                      {p.title}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--mono)",
                        fontSize: 11.5,
                        color: "var(--muted)",
                        marginTop: 2,
                      }}
                    >
                      {p.tags}
                    </div>
                  </div>
                </div>
                <span
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 13,
                    color: "var(--muted-2)",
                    flexShrink: 0,
                  }}
                >
                  ↗
                </span>
              </a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
