"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { COUNTRIES } from "@/data/countries";
import { type IndicatorKey } from "@/data/indicators";
import { allBounds, compositeScore, directionalIndicators } from "@/lib/normalize";

const DIRECTIONAL = directionalIndicators();
const DEFAULT_WEIGHT = 50;

function initialWeights(): Record<IndicatorKey, number> {
  const w = {} as Record<IndicatorKey, number>;
  for (const ind of DIRECTIONAL) w[ind.key] = DEFAULT_WEIGHT;
  return w;
}

export default function CompositeRanking() {
  const [weights, setWeights] = useState<Record<IndicatorKey, number>>(initialWeights);
  const bounds = useMemo(allBounds, []);

  const ranked = useMemo(() => {
    return COUNTRIES.map((c) => ({ country: c, score: compositeScore(c, weights, bounds) }))
      .filter((r): r is { country: (typeof COUNTRIES)[number]; score: number } => r.score !== null)
      .sort((a, b) => b.score - a.score);
  }, [weights, bounds]);

  function setWeight(key: IndicatorKey, value: number) {
    setWeights((w) => ({ ...w, [key]: value }));
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
      {/* Curseurs de pondération */}
      <aside className="rounded-lg border border-slate-200 bg-white p-4 h-fit lg:sticky lg:top-20">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-slate-700">Pondération</h2>
          <button
            onClick={() => setWeights(initialWeights())}
            className="text-xs text-sky-600 hover:underline"
          >
            Réinitialiser
          </button>
        </div>
        <p className="text-xs text-slate-500 mb-4">
          Ajustez l&apos;importance de chaque indicateur. Le score combine les indicateurs
          normalisés (0–100, 100 = meilleur).
        </p>
        <div className="flex flex-col gap-3">
          {DIRECTIONAL.map((ind) => (
            <label key={ind.key} className="text-xs">
              <div className="flex justify-between mb-0.5">
                <span className="text-slate-600">{ind.shortLabel}</span>
                <span className="tabular-nums text-slate-400">{weights[ind.key]}</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={weights[ind.key]}
                onChange={(e) => setWeight(ind.key, Number(e.target.value))}
                className="w-full accent-sky-600"
              />
            </label>
          ))}
        </div>
      </aside>

      {/* Classement */}
      <div className="rounded-lg border border-slate-200 bg-white overflow-hidden">
        <div className="px-4 py-2.5 border-b border-slate-100 text-sm text-slate-500">
          {ranked.length} pays classés
        </div>
        <ol className="divide-y divide-slate-100">
          {ranked.map((r, i) => (
            <li key={r.country.code} className="flex items-center gap-3 px-4 py-2.5">
              <span className="w-7 text-right tabular-nums text-slate-400">{i + 1}</span>
              <span className="text-lg">{r.country.flag}</span>
              <Link href={`/pays/${r.country.code}`} className="flex-1 hover:underline">
                {r.country.name}
              </Link>
              <div className="hidden sm:block w-40 h-2 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full bg-sky-500"
                  style={{ width: `${r.score}%` }}
                />
              </div>
              <span className="w-12 text-right font-semibold tabular-nums text-slate-800">
                {r.score.toFixed(1)}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
