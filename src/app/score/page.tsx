import type { Metadata } from "next";
import CompositeRanking from "@/components/CompositeRanking";

export const metadata: Metadata = {
  title: "Score global — Indice Liberté",
};

export default function ScorePage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Score global pondérable
        </h1>
        <p className="text-slate-600 mt-1">
          Composez votre propre indice : ajustez le poids de chaque indicateur et observez le
          classement des pays se recalculer en direct. Les valeurs manquantes ne pénalisent pas un
          pays (poids renormalisés sur ses données disponibles).
        </p>
      </div>
      <CompositeRanking />
    </div>
  );
}
