"use client";

import { useState } from "react";
import ScatterCorrelation from "./ScatterCorrelation";
import CorrelationMatrix from "./CorrelationMatrix";

type Tab = "scatter" | "matrix";

export default function CorrelationsView() {
  const [tab, setTab] = useState<Tab>("scatter");

  return (
    <div>
      <div className="inline-flex rounded-lg border border-slate-200 bg-white p-1 mb-6">
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
      className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
        active ? "bg-sky-600 text-white" : "text-slate-600 hover:bg-slate-100"
      }`}
    >
      {children}
    </button>
  );
}
