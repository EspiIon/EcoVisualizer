"use client";

import { useMemo } from "react";
import { COUNTRIES } from "@/data/countries";
import { INDICATORS, type IndicatorKey } from "@/data/indicators";
import { pearson } from "@/lib/stats";

interface Cell {
  r: number;
  n: number;
}

function cellColor(r: number): string {
  if (Number.isNaN(r)) return "transparent";
  const abs = Math.abs(r);
  if (r >= 0) {
    const l = 22 - Math.round(abs * 12);
    const s = 40 + Math.round(abs * 25);
    return `hsl(142 ${s}% ${l}%)`;
  } else {
    const l = 22 - Math.round(abs * 12);
    const s = 50 + Math.round(abs * 20);
    return `hsl(0 ${s}% ${l}%)`;
  }
}

function textColor(r: number): string {
  if (Number.isNaN(r)) return "var(--text-3)";
  return Math.abs(r) > 0.3 ? "var(--text)" : "var(--text-2)";
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
      <p style={{ fontSize: "0.875rem", color: "var(--text-2)", marginBottom: "1rem", lineHeight: 1.6 }}>
        Coefficient de corrélation de Pearson (r) entre chaque paire d&apos;indicateurs.{" "}
        <span style={{ color: "#34d399", fontWeight: 500 }}>Vert</span> = corrélation positive,{" "}
        <span style={{ color: "#f87171", fontWeight: 500 }}>rouge</span> = négative.
      </p>

      <div className="card" style={{ overflowX: "auto" }}>
        <table style={{ borderCollapse: "collapse", fontSize: "0.75rem" }}>
          <thead>
            <tr>
              <th
                style={{
                  position: "sticky",
                  left: 0,
                  zIndex: 10,
                  background: "var(--surface)",
                  padding: "0.5rem",
                  borderBottom: "1px solid var(--border)",
                }}
              />
              {INDICATORS.map((ind) => (
                <th
                  key={ind.key}
                  style={{
                    padding: "0.5rem",
                    fontWeight: 500,
                    color: "var(--text-2)",
                    verticalAlign: "bottom",
                    whiteSpace: "nowrap",
                    borderBottom: "1px solid var(--border)",
                    fontFamily: "Outfit, sans-serif",
                    fontSize: "0.7rem",
                    letterSpacing: "0.02em",
                  }}
                  title={ind.label}
                >
                  <span
                    style={{
                      display: "block",
                      writingMode: "vertical-rl",
                      rotate: "180deg",
                      margin: "0 auto",
                    }}
                  >
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
                  style={{
                    position: "sticky",
                    left: 0,
                    zIndex: 10,
                    background: "var(--surface)",
                    textAlign: "left",
                    padding: "0.4rem 0.75rem",
                    fontWeight: 500,
                    color: "var(--text-2)",
                    whiteSpace: "nowrap",
                    fontSize: "0.7rem",
                    fontFamily: "Outfit, sans-serif",
                    borderRight: "1px solid var(--border)",
                  }}
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
                      style={{
                        textAlign: "center",
                        fontFamily: "Space Mono, monospace",
                        fontSize: "0.7rem",
                        padding: "0.4rem 0.35rem",
                        border: "1px solid rgba(29,43,66,0.5)",
                        backgroundColor: isDiag ? "var(--surface-2)" : cellColor(cell.r),
                        color: isDiag ? "var(--text-3)" : textColor(cell.r),
                        minWidth: "3.5rem",
                      }}
                      title={`${rowInd.shortLabel} × ${colInd.shortLabel} — r = ${
                        Number.isNaN(cell.r) ? "n/a" : cell.r.toFixed(2)
                      } (n=${cell.n})`}
                    >
                      {isDiag ? "—" : Number.isNaN(cell.r) ? "" : cell.r.toFixed(2)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={{ fontSize: "0.75rem", color: "var(--text-3)", marginTop: "0.75rem" }}>
        Calculé sur les pays disposant des deux valeurs. Une corrélation n&apos;implique pas de
        causalité.
      </p>
    </div>
  );
}
