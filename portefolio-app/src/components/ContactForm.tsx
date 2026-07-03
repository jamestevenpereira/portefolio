"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EASE, Magnetic } from "@/components/motion/primitives";
import { CONTACT_EMAIL, WHATSAPP_URL } from "@/lib/site";

type Status = "idle" | "sending" | "sent" | "error" | "unconfigured";

const labelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "var(--mono)",
  fontSize: 11.5,
  letterSpacing: ".1em",
  textTransform: "uppercase",
  color: "var(--muted)",
  marginBottom: 8,
  textAlign: "left",
};

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      {children}
    </div>
  );
}

function useInputStyle() {
  const [focused, setFocused] = useState<string | null>(null);
  const style = (key: string): React.CSSProperties => ({
    width: "100%",
    padding: "13px 16px",
    borderRadius: 10,
    border: `1px solid ${focused === key ? "var(--ac-deep)" : "var(--border)"}`,
    background: "var(--bg-2)",
    color: "var(--text)",
    fontFamily: "var(--sans)",
    fontSize: 15,
    lineHeight: 1.5,
    outline: "none",
    transition: "border-color .2s",
    resize: "vertical" as const,
  });
  return {
    style,
    onFocus: (key: string) => () => setFocused(key),
    onBlur: () => setFocused(null),
  };
}

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const openedAt = useRef<number>(0);
  const input = useInputStyle();

  // marca o momento em que o utilizador começa a interagir
  const markOpened = () => {
    if (!openedAt.current) openedAt.current = Date.now();
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          message: fd.get("message"),
          company: fd.get("company"),
          elapsed: openedAt.current ? Date.now() - openedAt.current : 0,
        }),
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else if (res.status === 503) {
        setStatus("unconfigured");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        style={{
          border: "1px solid color-mix(in srgb, var(--ok) 35%, var(--border))",
          borderRadius: 16,
          background: "var(--surface)",
          padding: "40px 32px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 34, marginBottom: 12 }} aria-hidden>
          ✓
        </div>
        <div
          style={{
            fontFamily: "var(--serif)",
            fontSize: 26,
            color: "var(--text)",
            marginBottom: 8,
          }}
        >
          Mensagem enviada.
        </div>
        <p style={{ fontSize: 15, color: "var(--text-dim)", lineHeight: 1.6 }}>
          Respondo em menos de 48 horas. Enviei-te também um email de
          confirmação — vê o spam se não aparecer.
        </p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      onFocusCapture={markOpened}
      style={{
        border: "1px solid var(--border)",
        borderRadius: 16,
        background: "var(--surface)",
        padding: "28px 26px",
        display: "grid",
        gap: 18,
        textAlign: "left",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 18,
        }}
      >
        <Field label="nome">
          <input
            name="name"
            required
            minLength={2}
            maxLength={120}
            autoComplete="name"
            placeholder="O teu nome"
            style={input.style("name")}
            onFocus={input.onFocus("name")}
            onBlur={input.onBlur}
          />
        </Field>
        <Field label="email">
          <input
            name="email"
            type="email"
            required
            maxLength={254}
            autoComplete="email"
            placeholder="para onde respondo"
            style={input.style("email")}
            onFocus={input.onFocus("email")}
            onBlur={input.onBlur}
          />
        </Field>
      </div>

      <Field label="mensagem">
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={5}
          placeholder="Conta em duas linhas o que queres construir…"
          style={input.style("message")}
          onFocus={input.onFocus("message")}
          onBlur={input.onBlur}
        />
      </Field>

      {/* honeypot — invisível para humanos, irresistível para bots */}
      <div
        aria-hidden
        style={{ position: "absolute", left: -9999, top: -9999 }}
      >
        <label>
          Empresa
          <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <AnimatePresence>
        {(status === "error" || status === "unconfigured") && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="alert"
            style={{
              fontSize: 14,
              lineHeight: 1.6,
              color: "var(--warn)",
              margin: 0,
            }}
          >
            {status === "unconfigured"
              ? "O formulário ainda não está ativo. "
              : "Não consegui enviar a mensagem. "}
            Fala comigo diretamente por{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              style={{ color: "var(--ac)", textDecoration: "underline" }}
            >
              email
            </a>{" "}
            ou{" "}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--ac)", textDecoration: "underline" }}
            >
              WhatsApp
            </a>
            .
          </motion.p>
        )}
      </AnimatePresence>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 16,
          marginTop: 4,
        }}
      >
        <Magnetic>
          <button
            type="submit"
            className="shine"
            disabled={status === "sending"}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 9,
              padding: "15px 30px",
              borderRadius: 11,
              border: "none",
              cursor: status === "sending" ? "wait" : "pointer",
              background: "var(--ac)",
              color: "#15100a",
              fontFamily: "var(--sans)",
              fontWeight: 600,
              fontSize: 16,
              opacity: status === "sending" ? 0.7 : 1,
              boxShadow:
                "0 14px 38px -16px color-mix(in srgb, var(--ac) 80%, transparent)",
              transition: "background .2s, opacity .2s",
            }}
          >
            {status === "sending" ? "A enviar…" : "Enviar mensagem"}
          </button>
        </Magnetic>
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: 12.5,
            color: "var(--muted)",
          }}
        >
          resposta em &lt; 48h
        </span>
      </div>
    </form>
  );
}
