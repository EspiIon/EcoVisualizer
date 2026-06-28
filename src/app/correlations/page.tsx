import type { Metadata } from "next";
import CorrelationsView from "@/components/CorrelationsView";

export const metadata: Metadata = {
  title: "Corrélations — Indice Liberté",
};

export default function CorrelationsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Corrélations entre indicateurs
        </h1>
        <p className="text-slate-600 mt-1">
          Choisissez deux indicateurs pour les croiser, ou consultez la matrice qui résume toutes
          les corrélations. Le coefficient de Pearson (r) mesure la relation linéaire observée.
        </p>
      </div>
      <CorrelationsView />
    </div>
  );
}
