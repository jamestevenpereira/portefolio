"use client";

import { useState, useEffect } from "react";
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
  const isMobile = useIsMobile(640);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 48);
    handle();
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        height: 52,
        borderBottom: scrolled ? "1px solid var(--border-soft)" : "1px solid transparent",
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
          padding: "0 32px",
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
          <div style={{ display: "flex", gap: 26 }}>
            {sections.map((s) => (
              <NavLink key={s.href} {...s} />
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
