"use client";

import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Retour en haut"
      style={{
        position: "fixed",
        bottom: "1.75rem",
        right: "1.75rem",
        width: "2.5rem",
        height: "2.5rem",
        borderRadius: "50%",
        background: visible ? "var(--gold)" : "transparent",
        color: "#fff",
        border: "none",
        cursor: "pointer",
        fontSize: "1.1rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: visible ? "0 4px 16px rgba(232,93,4,.35)" : "none",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity 220ms ease, transform 220ms ease, box-shadow 220ms ease",
        transform: visible ? "translateY(0)" : "translateY(8px)",
        zIndex: 50,
      }}
    >
      ↑
    </button>
  );
}
