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
    <div
      style={{
        display: "grid",
        gap: "1.25rem",
        gridTemplateColumns: "minmax(0,1fr)",
      }}
      className="lg-grid-2col"
    >
      <style>{`
        @media (min-width: 1024px) {
          .lg-grid-2col { grid-template-columns: 280px 1fr !important; }
        }
      `}</style>

      {/* Weight sliders */}
      <aside
        className="card"
        style={{
          padding: "1.25rem",
          height: "fit-content",
          position: "sticky",
          top: "5rem",
          alignSelf: "start",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
          <h2
            className="font-display"
            style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--text)" }}
          >
            Pondération
          </h2>
          <button
            onClick={() => setWeights(initialWeights())}
            style={{
              fontSize: "0.75rem",
              color: "var(--gold)",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "0",
              fontFamily: "inherit",
            }}
          >
            Réinitialiser
          </button>
        </div>
        <p style={{ fontSize: "0.75rem", color: "var(--text-3)", marginBottom: "1rem", lineHeight: 1.5 }}>
          Ajustez l&apos;importance de chaque indicateur. Le score combine les valeurs
          normalisées (0–100, 100 = meilleur).
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
          {DIRECTIONAL.map((ind) => (
            <label key={ind.key} style={{ fontSize: "0.75rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.3rem" }}>
                <span style={{ color: "var(--text-2)" }}>{ind.shortLabel}</span>
                <span
                  className="font-mono-data"
                  style={{ color: weights[ind.key] > 0 ? "var(--gold)" : "var(--text-3)", fontSize: "0.7rem" }}
                >
                  {weights[ind.key]}
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={weights[ind.key]}
                onChange={(e) => setWeight(ind.key, Number(e.target.value))}
                style={{ width: "100%" }}
              />
            </label>
          ))}
        </div>
      </aside>

      {/* Ranking list */}
      <div className="card" style={{ overflow: "hidden" }}>
        <div
          style={{
            padding: "0.65rem 1.25rem",
            borderBottom: "1px solid var(--border)",
            fontSize: "0.75rem",
            color: "var(--text-3)",
          }}
        >
          {ranked.length} pays classés
        </div>
        <ol>
          {ranked.map((r, i) => (
            <li
              key={r.country.code}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.875rem",
                padding: "0.7rem 1.25rem",
                borderBottom: "1px solid var(--border)",
                transition: "background 160ms",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface-2)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <span
                className="font-mono-data"
                style={{
                  width: "1.75rem",
                  textAlign: "right",
                  fontSize: "0.75rem",
                  color: i < 3 ? "var(--gold)" : "var(--text-3)",
                  fontWeight: i < 3 ? 700 : 400,
                  flexShrink: 0,
                }}
              >
                {i + 1}
              </span>
              <span style={{ fontSize: "1.25rem", lineHeight: 1, flexShrink: 0 }}>
                {r.country.flag}
              </span>
              <Link
                href={`/pays/${r.country.code}`}
                style={{
                  flex: 1,
                  color: "var(--text)",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text)")}
              >
                {r.country.name}
              </Link>
              <div
                style={{
                  display: "none",
                  width: "8rem",
                  height: "3px",
                  background: "var(--border)",
                  borderRadius: "2px",
                  overflow: "hidden",
                  flexShrink: 0,
                }}
                className="sm-block"
              >
                <div
                  style={{
                    height: "100%",
                    width: `${r.score}%`,
                    background: "linear-gradient(90deg, var(--gold) 0%, #e8c85a 100%)",
                    borderRadius: "2px",
                  }}
                />
              </div>
              <style>{`@media (min-width: 640px) { .sm-block { display: block !important; } }`}</style>
              <span
                className="font-mono-data"
                style={{
                  width: "3rem",
                  textAlign: "right",
                  fontSize: "0.875rem",
                  fontWeight: 700,
                  color: "var(--text)",
                  flexShrink: 0,
                }}
              >
                {r.score.toFixed(1)}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
