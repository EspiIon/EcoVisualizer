"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/classements", label: "Classements" },
  { href: "/carte", label: "Carte" },
  { href: "/score", label: "Score global" },
  { href: "/correlations", label: "Corrélations" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <header
      style={{
        background: "var(--surface)",
        borderBottom: "1px solid var(--border)",
        position: "sticky",
        top: 0,
        zIndex: 20,
        backdropFilter: "blur(12px)",
      }}
    >
      {/* Gold accent line at top */}
      <div className="accent-bar" />

      <div
        style={{
          maxWidth: "72rem",
          margin: "0 auto",
          padding: "0 1rem",
          height: "3.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link
          href="/"
          className="font-display"
          style={{
            fontSize: "1.125rem",
            fontWeight: 600,
            color: "var(--text)",
            letterSpacing: "-0.01em",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <span style={{ color: "var(--gold)", fontSize: "1rem" }}>◈</span>
          Indice Liberté
        </Link>

        <nav style={{ display: "flex", gap: "0.25rem" }}>
          {LINKS.map((l) => {
            const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                style={{
                  padding: "0.35rem 0.85rem",
                  borderRadius: "6px",
                  fontSize: "0.8125rem",
                  fontWeight: 500,
                  transition: "all 160ms ease",
                  color: active ? "var(--gold)" : "var(--text-2)",
                  background: active ? "var(--gold-dim)" : "transparent",
                  border: active ? "1px solid rgba(212,168,67,.25)" : "1px solid transparent",
                }}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
