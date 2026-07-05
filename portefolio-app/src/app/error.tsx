"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div
      style={{
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 18,
        padding: "80px 24px",
        textAlign: "center",
        background: "var(--bg)",
      }}
    >
      <div
        style={{
          fontFamily: "var(--mono)",
          fontSize: 13,
          letterSpacing: ".12em",
          textTransform: "uppercase",
          color: "var(--ac)",
        }}
      >
        erro
      </div>
      <h1
        style={{
          fontFamily: "var(--serif)",
          fontWeight: 400,
          fontSize: "clamp(30px, 4vw, 44px)",
          color: "var(--text)",
          margin: 0,
        }}
      >
        Algo correu mal.
      </h1>
      <p style={{ fontSize: 16, color: "var(--muted)", maxWidth: "48ch" }}>
        Aconteceu um erro inesperado. Tente novamente — se persistir, fale
        comigo diretamente por email.
      </p>
      <button
        onClick={reset}
        style={{
          marginTop: 8,
          padding: "14px 28px",
          borderRadius: 11,
          border: "none",
          cursor: "pointer",
          background: "var(--ac)",
          color: "#15100a",
          fontFamily: "var(--sans)",
          fontWeight: 600,
          fontSize: 15,
        }}
      >
        Tentar novamente
      </button>
    </div>
  );
}
