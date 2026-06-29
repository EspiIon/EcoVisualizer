import type { Metadata } from "next";
import RankingTable from "@/components/RankingTable";

export const metadata: Metadata = {
  title: "Classements — Indice Liberté",
};

export default function ClassementsPage() {
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
            Données 2022–2026
          </span>
        </div>
        <h1
          className="font-display"
          style={{ fontSize: "1.75rem", fontWeight: 700, color: "var(--text)", marginBottom: "0.5rem" }}
        >
          Classements par indicateur
        </h1>
        <p style={{ color: "var(--text-2)", maxWidth: "42rem", lineHeight: 1.6, fontSize: "0.9375rem" }}>
          Cliquez sur un en-tête de colonne pour trier. La coloration indique les valeurs
          favorables <span style={{ color: "#34d399" }}>●</span> ou défavorables <span style={{ color: "#f87171" }}>●</span> selon le sens de l&apos;indicateur.
        </p>
      </div>
      <RankingTable />
    </div>
  );
}
