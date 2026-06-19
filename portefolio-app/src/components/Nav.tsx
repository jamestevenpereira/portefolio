"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

const sections = [
  { href: "#about", label: "sobre" },
  { href: "#work", label: "trabalhos" },
  { href: "#os", label: "sistema" },
  { href: "#story", label: "história" },
  { href: "#principles", label: "princípios" },
  { href: "#contact", label: "contacto" },
];

function NavLink({ href, label }: { href: string; label: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      style={{
        fontFamily: "var(--mono)",
        fontSize: 12,
        letterSpacing: ".04em",
        color: hovered ? "var(--text)" : "var(--muted)",
        transition: "color .2s",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}
    </a>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile(640);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 48);
    handle();
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          height: 52,
          borderBottom: scrolled
            ? "1px solid var(--border-soft)"
            : "1px solid transparent",
          background: scrolled
            ? "color-mix(in srgb, var(--bg) 85%, transparent)"
            : "transparent",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(14px)" : "none",
          transition: "background .3s, border-color .3s",
        }}
      >
        <div
          style={{
            maxWidth: 1180,
            margin: "0 auto",
            padding: "0 20px",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <a
            href="#"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontFamily: "var(--mono)",
              fontSize: 13,
              color: "var(--muted)",
              textDecoration: "none",
            }}
          >
            <span
              style={{
                display: "grid",
                placeItems: "center",
                width: 26,
                height: 26,
                borderRadius: 7,
                background: "var(--ac)",
                color: "#15100a",
                fontWeight: 600,
                fontSize: 12,
              }}
            >
              JS
            </span>
            {!isMobile && "James Steven"}
          </a>

          {!isMobile && (
            <div style={{ display: "flex", gap: 26, paddingRight: 12 }}>
              {sections.map((s) => (
                <NavLink key={s.href} {...s} />
              ))}
            </div>
          )}

          {isMobile && (
            <button
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              onClick={() => setMenuOpen((v) => !v)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 6,
                display: "flex",
                flexDirection: "column",
                gap: 5,
                zIndex: 60,
                position: "relative",
              }}
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  style={{
                    display: "block",
                    width: 22,
                    height: 2,
                    borderRadius: 2,
                    background: "var(--text)",
                    transformOrigin: "center",
                  }}
                  animate={
                    menuOpen
                      ? i === 0
                        ? { rotate: 45, y: 7 }
                        : i === 1
                        ? { opacity: 0, scaleX: 0 }
                        : { rotate: -45, y: -7 }
                      : { rotate: 0, y: 0, opacity: 1, scaleX: 1 }
                  }
                  transition={{ duration: 0.22 }}
                />
              ))}
            </button>
          )}
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 45,
              background: "var(--bg)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 32,
            }}
          >
            {sections.map((s, i) => (
              <motion.a
                key={s.href}
                href={s.href}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.055, duration: 0.28 }}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: "clamp(30px, 9vw, 44px)",
                  color: "var(--text)",
                  textDecoration: "none",
                  letterSpacing: "-.01em",
                }}
              >
                {s.label}
              </motion.a>
            ))}

            <motion.a
              href="#contact"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: sections.length * 0.055 + 0.1 }}
              onClick={() => setMenuOpen(false)}
              style={{
                marginTop: 12,
                padding: "13px 30px",
                background: "var(--ac)",
                color: "#15100a",
                fontFamily: "var(--mono)",
                fontSize: 13,
                fontWeight: 600,
                borderRadius: 10,
                textDecoration: "none",
              }}
            >
              Vamos conversar
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
