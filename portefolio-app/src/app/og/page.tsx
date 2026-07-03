import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

/**
 * Cartão Open Graph (1200×630). Não é linkada de lado nenhum — serve apenas
 * para gerar o public/og.png por screenshot (ver README § Open Graph).
 */
export default function OgCard() {
  return (
    <div
      style={{
        width: 1200,
        height: 630,
        position: "relative",
        overflow: "hidden",
        background: "var(--bg)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 72px",
      }}
    >
      {/* grelha técnica */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(var(--border-soft) 1px, transparent 1px), linear-gradient(90deg, var(--border-soft) 1px, transparent 1px)",
          backgroundSize: "76px 76px",
          opacity: 0.55,
          maskImage:
            "radial-gradient(900px 560px at 30% 0%, black, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(900px 560px at 30% 0%, black, transparent 80%)",
        }}
      />
      {/* brilho de acento */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(720px 480px at 88% -10%, color-mix(in srgb, var(--ac) 18%, transparent), transparent 68%)",
        }}
      />

      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          gap: 14,
          fontFamily: "var(--mono)",
          fontSize: 20,
          letterSpacing: ".14em",
          textTransform: "uppercase",
          color: "var(--muted)",
        }}
      >
        <span
          style={{
            display: "grid",
            placeItems: "center",
            width: 44,
            height: 44,
            borderRadius: 11,
            background: "var(--ac)",
            color: "#15100a",
            fontWeight: 600,
            fontSize: 19,
            letterSpacing: 0,
          }}
        >
          JS
        </span>
        viseu · desenvolvedor web · freelancer
      </div>

      <div style={{ position: "relative" }}>
        <div
          style={{
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: 34,
            color: "var(--text-dim)",
            marginBottom: 10,
          }}
        >
          Olá, sou o James.
        </div>
        <h1
          style={{
            fontFamily: "var(--serif)",
            fontWeight: 400,
            fontSize: 96,
            lineHeight: 1.02,
            letterSpacing: "-.015em",
            color: "var(--text)",
            margin: 0,
          }}
        >
          Crio sites que{" "}
          <span style={{ fontStyle: "italic", color: "var(--ac)" }}>
            geram resultado
          </span>
          .
        </h1>
      </div>

      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily: "var(--mono)",
          fontSize: 19,
          color: "var(--muted)",
        }}
      >
        <span>design + código + publicação, na mesma cabeça</span>
        <span style={{ color: "var(--ac-deep)" }}>
          next.js ◆ typescript ◆ tailwind
        </span>
      </div>
    </div>
  );
}
