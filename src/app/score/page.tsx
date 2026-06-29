import type { Metadata } from "next";
import CompositeRanking from "@/components/CompositeRanking";

export const metadata: Metadata = {
  title: "Score global — Indice Liberté",
};

export default function ScorePage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
          <div style={{ width: "1.5rem", height: "1px", background: "var(--gold)" }} />
          <span
            style={{
              fontSize: "0.6875rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--gold)",
            }}
          >
            Classement
          </span>
        </div>
        <h1
          className="font-display"
          style={{ fontSize: "1.75rem", fontWeight: 700, color: "var(--text)", marginBottom: "0.5rem" }}
        >
          Score global pondérable
        </h1>
        <p style={{ color: "var(--text-2)", maxWidth: "42rem", lineHeight: 1.6, fontSize: "0.9375rem" }}>
          Composez votre propre indice : ajustez le poids de chaque indicateur et observez le
          classement des pays se recalculer en direct. Les valeurs manquantes ne pénalisent pas un
          pays (poids renormalisés sur ses données disponibles).
        </p>
      </div>
      <CompositeRanking />
    </div>
  );
}
