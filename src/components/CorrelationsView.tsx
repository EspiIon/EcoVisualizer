"use client";

import { useState } from "react";
import ScatterCorrelation from "./ScatterCorrelation";
import CorrelationMatrix from "./CorrelationMatrix";

type Tab = "scatter" | "matrix";

export default function CorrelationsView() {
  const [tab, setTab] = useState<Tab>("scatter");

  return (
    <div>
      <div
        style={{
          display: "inline-flex",
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius)",
          padding: "0.25rem",
          marginBottom: "1.5rem",
          gap: "0.25rem",
        }}
      >
        <TabButton active={tab === "scatter"} onClick={() => setTab("scatter")}>
          Nuage de points
        </TabButton>
        <TabButton active={tab === "matrix"} onClick={() => setTab("matrix")}>
          Matrice de corrélation
        </TabButton>
      </div>

      {tab === "scatter" ? <ScatterCorrelation /> : <CorrelationMatrix />}
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "0.4rem 1rem",
        borderRadius: "6px",
        fontSize: "0.8125rem",
        fontWeight: 500,
        transition: "all 160ms ease",
        border: active ? "1px solid rgba(212,168,67,.25)" : "1px solid transparent",
        background: active ? "var(--gold-dim)" : "transparent",
        color: active ? "var(--gold)" : "var(--text-2)",
        cursor: "pointer",
        fontFamily: "inherit",
      }}
    >
      {children}
    </button>
  );
}
