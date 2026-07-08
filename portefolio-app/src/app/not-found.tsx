export default function NotFound() {
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
        404
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
        Página não encontrada.
      </h1>
      <p style={{ fontSize: 16, color: "var(--muted)", maxWidth: "48ch" }}>
        A página que procura não existe ou foi movida.
      </p>
      <a
        href="/"
        style={{
          marginTop: 8,
          padding: "14px 28px",
          borderRadius: 11,
          background: "var(--ac)",
          color: "#15100a",
          fontFamily: "var(--sans)",
          fontWeight: 600,
          fontSize: 15,
          textDecoration: "none",
        }}
      >
        Voltar ao início
      </a>
    </div>
  );
}
