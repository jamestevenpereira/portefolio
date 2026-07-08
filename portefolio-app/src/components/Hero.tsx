"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";
import {
  EASE,
  Magnetic,
  Tilt,
  TextReveal,
} from "@/components/motion/primitives";

function HoverBtn({
  href,
  children,
  baseStyle,
  hoverStyle,
  className,
}: {
  href: string;
  children: React.ReactNode;
  baseStyle: React.CSSProperties;
  hoverStyle: React.CSSProperties;
  className?: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        padding: "15px 26px",
        borderRadius: 11,
        fontSize: 15,
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

export default function Hero() {
  const [time, setTime] = useState("--:--:--");
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();

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

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: reduced ? 0 : 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.75, ease: EASE, delay },
  });

  return (
    <header style={{ position: "relative" }}>
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(820px 520px at 82% -12%, color-mix(in srgb, var(--ac) 15%, transparent), transparent 68%)",
        }}
      />

      <div
        style={{
          position: "relative",
          maxWidth: 1180,
          margin: "0 auto",
          padding: isMobile ? "48px 20px 48px" : "84px 32px 64px",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1.22fr .92fr",
          gap: isMobile ? 32 : 54,
          alignItems: "center",
        }}
      >
        <div>
          <motion.div
            {...fadeUp(0.05)}
            style={{
              fontFamily: "var(--mono)",
              fontSize: 13,
              letterSpacing: ".14em",
              textTransform: "uppercase",
              color: "var(--muted)",
              display: "flex",
              alignItems: "center",
              gap: 9,
            }}
          >
            viseu · gmt+1{" "}
            <span style={{ color: "var(--muted-2)" }}>/</span>{" "}
            desenvolvedor web · freelancer
          </motion.div>

          <motion.p
            initial={{
              opacity: 0,
              filter: reduced ? "blur(0px)" : "blur(8px)",
            }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
            style={{
              fontFamily: "var(--serif)",
              fontStyle: "italic",
              fontSize: 26,
              color: "var(--text-dim)",
              margin: "26px 0 6px",
            }}
          >
            Olá, sou o James.
          </motion.p>

          <h1
            style={{
              fontFamily: "var(--serif)",
              fontWeight: 400,
              fontSize: "clamp(46px, 7vw, 88px)",
              lineHeight: 1.04,
              letterSpacing: "-.015em",
              color: "var(--text)",
            }}
          >
            <TextReveal
              immediate
              delay={0.3}
              stagger={0.09}
              segments={[
                { text: "Crio sites que " },
                {
                  text: "geram resultado.",
                  style: { fontStyle: "italic", color: "var(--ac)" },
                },
              ]}
            />
          </h1>

          <motion.p
            {...fadeUp(0.65)}
            style={{
              fontSize: 19,
              lineHeight: 1.6,
              color: "var(--text-dim)",
              maxWidth: "50ch",
              marginTop: 28,
            }}
          >
            Entrego o site completo: design, código e publicação, tudo feito
            por mim. Cada decisão tem um propósito, e os resultados falam
            por si.
          </motion.p>
          <motion.p
            {...fadeUp(0.78)}
            style={{
              fontSize: 17,
              lineHeight: 1.6,
              color: "var(--muted)",
              maxWidth: "50ch",
              marginTop: 14,
            }}
          >
            Venho da engenharia e trabalhei em vários setores. Isso dá-me uma
            visão diferente de como os negócios funcionam na prática.
          </motion.p>

          <motion.div
            {...fadeUp(0.92)}
            style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 34 }}
          >
            <Magnetic>
              <HoverBtn
                href="#contact"
                className="shine"
                baseStyle={{
                  background: "var(--ac)",
                  color: "#15100a",
                  fontWeight: 600,
                  boxShadow:
                    "0 12px 34px -14px color-mix(in srgb, var(--ac) 75%, transparent)",
                }}
                hoverStyle={{
                  background: "var(--ac-hot)",
                  boxShadow:
                    "0 18px 44px -16px color-mix(in srgb, var(--ac) 85%, transparent)",
                }}
              >
                Vamos conversar
              </HoverBtn>
            </Magnetic>
            <Magnetic>
              <HoverBtn
                href="#work"
                baseStyle={{
                  border: "1px solid var(--border)",
                  color: "var(--text)",
                  fontWeight: 500,
                }}
                hoverStyle={{ borderColor: "var(--ac)", color: "var(--ac)" }}
              >
                Ver projetos ↓
              </HoverBtn>
            </Magnetic>
          </motion.div>
        </div>

        {!isMobile && (
          <motion.div
            initial={{
              opacity: 0,
              y: reduced ? 0 : 28,
              rotateY: reduced ? 0 : -8,
            }}
            animate={{ opacity: 1, y: 0, rotateY: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.5 }}
            style={{ transformPerspective: 1200 }}
          >
            <div
              className="floaty"
              style={{
                animation: reduced ? "none" : "floaty 7s ease-in-out infinite",
              }}
            >
              <Tilt max={5} radius={16}>
                <div
                  style={{
                    border: "1px solid var(--border)",
                    borderRadius: 16,
                    background:
                      "linear-gradient(180deg, var(--surface), var(--bg-2))",
                    overflow: "hidden",
                    boxShadow: "0 34px 90px -46px rgba(0,0,0,.85)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "13px 16px",
                      borderBottom: "1px solid var(--border-soft)",
                      background:
                        "color-mix(in srgb, var(--surface) 60%, transparent)",
                    }}
                  >
                    {(["#E5604D", "#E8B24D", "#5FB97E"] as const).map((c) => (
                      <span
                        key={c}
                        style={{
                          width: 11,
                          height: 11,
                          borderRadius: "50%",
                          background: c,
                        }}
                      />
                    ))}
                    <span
                      style={{
                        marginLeft: 8,
                        fontFamily: "var(--mono)",
                        fontSize: 12,
                        color: "var(--muted-2)",
                      }}
                    >
                      ~ / status
                    </span>
                  </div>
                  <div
                    style={{
                      padding: 20,
                      fontFamily: "var(--mono)",
                      fontSize: 13.5,
                      lineHeight: 2.0,
                      color: "var(--text-dim)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        color: "var(--ok)",
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
                      />
                      disponível para projetos
                    </div>
                    {[
                      { label: "foco", value: "websites e landing pages" },
                      { label: "local", value: "viseu · gmt+1" },
                      { label: "resposta", value: "< 48h" },
                    ].map(({ label, value }) => (
                      <div key={label}>
                        <span
                          style={{
                            display: "inline-block",
                            width: 96,
                            color: "var(--muted-2)",
                          }}
                        >
                          {label}
                        </span>{" "}
                        {value}
                      </div>
                    ))}
                    <div>
                      <span
                        style={{
                          display: "inline-block",
                          width: 96,
                          color: "var(--muted-2)",
                        }}
                      >
                        horário
                      </span>{" "}
                      <span style={{ color: "var(--ac)" }}>{time}</span>
                    </div>
                    <div
                      style={{
                        marginTop: 10,
                        paddingTop: 12,
                        borderTop: "1px solid var(--border-soft)",
                        color: "var(--muted)",
                      }}
                    >
                      $ npm run{" "}
                      <span style={{ color: "var(--text)" }}>deploy</span>{" "}
                      <span
                        style={{
                          display: "inline-block",
                          width: 8,
                          height: 15,
                          marginLeft: 2,
                          background: "var(--ac)",
                          verticalAlign: "middle",
                          animation: "blink 1.1s step-end infinite",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </Tilt>
            </div>
          </motion.div>
        )}
      </div>

      <motion.div
        className="marquee-mask"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.1 }}
        style={{
          overflow: "hidden",
          borderTop: "1px solid var(--border-soft)",
          borderBottom: "1px solid var(--border-soft)",
          background: "var(--bg-2)",
        }}
      >
        <div
          className="marquee-track"
          style={{
            display: "flex",
            width: "max-content",
            fontFamily: "var(--mono)",
            fontSize: 12.5,
            letterSpacing: ".18em",
            textTransform: "uppercase",
            color: "var(--muted)",
          }}
        >
          {[0, 1].map((i) => (
            <div
              key={i}
              aria-hidden={i === 1 ? true : undefined}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "13px 0",
              }}
            >
              {[
                "Next.js",
                "TypeScript",
                "Tailwind",
                "React",
                "Angular",
                "Node.js",
                "Supabase",
                "Framer Motion",
                "Figma",
              ].map((tech) => (
                <span
                  key={tech}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <span style={{ padding: "0 26px" }}>{tech}</span>
                  <span style={{ color: "var(--ac-deep)" }}>◆</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </motion.div>
    </header>
  );
}
