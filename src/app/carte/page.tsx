import type { Metadata } from "next";
import WorldMap from "@/components/WorldMap";

export const metadata: Metadata = {
  title: "Carte mondiale — Indice Liberté",
  description:
    "Carte choroplèthe des pays selon leur liberté économique, qualité de vie, éducation ou score composite.",
};

export default function CartePage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
      {/* En-tête */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
          <span
            style={{
              fontSize: "0.6875rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--gold)",
              fontFamily: "Space Mono, monospace",
            }}
          >
            Visualisation
          </span>
          <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
        </div>
        <h1
          className="font-display"
          style={{ fontSize: "2rem", fontWeight: 700, color: "var(--text)", lineHeight: 1.15 }}
        >
          Carte mondiale
        </h1>
        <p style={{ marginTop: "0.5rem", color: "var(--text-2)", fontSize: "0.9375rem", maxWidth: "52rem" }}>
          Visualisez la distribution géographique de chaque indicateur ou du score composite.
          Survolez un pays pour voir son score, cliquez pour accéder à sa fiche détaillée.
        </p>
      </div>

      <WorldMap />
    </div>
  );
}
