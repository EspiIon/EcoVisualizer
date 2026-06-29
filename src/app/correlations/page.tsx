import type { Metadata } from "next";
import CorrelationsView from "@/components/CorrelationsView";

export const metadata: Metadata = {
  title: "Corrélations — Indice Liberté",
};

export default function CorrelationsPage() {
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
            Analyse
          </span>
        </div>
        <h1
          className="font-display"
          style={{ fontSize: "1.75rem", fontWeight: 700, color: "var(--text)", marginBottom: "0.5rem" }}
        >
          Corrélations entre indicateurs
        </h1>
        <p style={{ color: "var(--text-2)", maxWidth: "42rem", lineHeight: 1.6, fontSize: "0.9375rem" }}>
          Choisissez deux indicateurs pour les croiser, ou consultez la matrice qui résume toutes
          les corrélations. Le coefficient de Pearson (r) mesure la relation linéaire observée.
        </p>
      </div>
      <CorrelationsView />
    </div>
  );
}
