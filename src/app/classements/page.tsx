import type { Metadata } from "next";
import RankingTable from "@/components/RankingTable";

export const metadata: Metadata = {
  title: "Classements — Indice Liberté",
};

export default function ClassementsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Classements</h1>
        <p className="text-slate-600 mt-1">
          Cliquez sur un en-tête de colonne pour trier. La coloration indique les valeurs
          favorables (vert) ou défavorables (rouge) selon le sens de l&apos;indicateur.
        </p>
      </div>
      <RankingTable />
    </div>
  );
}
