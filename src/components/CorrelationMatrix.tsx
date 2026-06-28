"use client";

import { useMemo } from "react";
import { COUNTRIES } from "@/data/countries";
import { INDICATORS, type IndicatorKey } from "@/data/indicators";
import { pearson } from "@/lib/stats";

interface Cell {
  r: number;
  n: number;
}

/** Couleur d'une case selon r : rouge (−1) → blanc (0) → vert (+1). */
function cellColor(r: number): string {
  if (Number.isNaN(r)) return "transparent";
  const hue = r >= 0 ? 140 : 0; // vert / rouge
  const sat = Math.round(Math.abs(r) * 65);
  const light = 96 - Math.round(Math.abs(r) * 36); // plus foncé = plus fort
  return `hsl(${hue} ${sat}% ${light}%)`;
}

export default function CorrelationMatrix() {
  const matrix = useMemo(() => {
    const keys = INDICATORS.map((i) => i.key);
    const grid: Record<IndicatorKey, Record<IndicatorKey, Cell>> = {} as never;
    for (const ky of keys) {
      grid[ky] = {} as Record<IndicatorKey, Cell>;
      for (const kx of keys) {
        const xs: number[] = [];
        const ys: number[] = [];
        for (const c of COUNTRIES) {
          const vx = c[kx];
          const vy = c[ky];
          if (typeof vx === "number" && typeof vy === "number") {
            xs.push(vx);
            ys.push(vy);
          }
        }
        grid[ky][kx] = { r: pearson(xs, ys), n: xs.length };
      }
    }
    return grid;
  }, []);

  return (
    <div>
      <p className="text-sm text-slate-600 mb-4">
        Coefficient de corrélation de Pearson (r) entre chaque paire d&apos;indicateurs.
        <span className="text-emerald-600 font-medium"> Vert</span> = corrélation positive,
        <span className="text-red-600 font-medium"> rouge</span> = négative ; plus la couleur est
        soutenue, plus la relation est forte.
      </p>

      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
        <table className="border-collapse text-sm">
          <thead>
            <tr>
              <th className="sticky left-0 z-10 bg-white p-2"></th>
              {INDICATORS.map((ind) => (
                <th
                  key={ind.key}
                  className="p-2 font-medium text-slate-600 align-bottom whitespace-nowrap text-xs"
                  title={ind.label}
                >
                  <span className="block [writing-mode:vertical-rl] rotate-180 mx-auto">
                    {ind.shortLabel}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {INDICATORS.map((rowInd) => (
              <tr key={rowInd.key}>
                <th
                  className="sticky left-0 z-10 bg-white text-left px-3 py-2 font-medium text-slate-600 whitespace-nowrap text-xs"
                  title={rowInd.label}
                >
                  {rowInd.shortLabel}
                </th>
                {INDICATORS.map((colInd) => {
                  const cell = matrix[rowInd.key][colInd.key];
                  const isDiag = rowInd.key === colInd.key;
                  return (
                    <td
                      key={colInd.key}
                      className="text-center tabular-nums px-2 py-2 border border-white"
                      style={{ backgroundColor: isDiag ? "#f1f5f9" : cellColor(cell.r) }}
                      title={`${rowInd.shortLabel} × ${colInd.shortLabel} — r = ${
                        Number.isNaN(cell.r) ? "n/a" : cell.r.toFixed(2)
                      } (n=${cell.n})`}
                    >
                      {isDiag ? (
                        <span className="text-slate-300">—</span>
                      ) : Number.isNaN(cell.r) ? (
                        ""
                      ) : (
                        cell.r.toFixed(2)
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-slate-500 mt-3">
        Calculé sur les pays disposant des deux valeurs. Une corrélation n&apos;implique pas de
        causalité.
      </p>
    </div>
  );
}
