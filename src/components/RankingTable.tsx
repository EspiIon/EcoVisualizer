"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { COUNTRIES, REGIONS, type Region } from "@/data/countries";
import { INDICATORS, type IndicatorKey } from "@/data/indicators";
import { formatValue } from "@/lib/format";
import { allBounds } from "@/lib/normalize";

type SortKey = IndicatorKey | "name";
type SortDir = "asc" | "desc";

function heatColor(
  value: number,
  key: IndicatorKey,
  bounds: { min: number; max: number },
  higherIsBetter: boolean | null,
): string {
  if (higherIsBetter === null) return "transparent";
  const { min, max } = bounds;
  if (max === min) return "transparent";
  let t = (value - min) / (max - min);
  if (!higherIsBetter) t = 1 - t;
  const hue = t >= 0.5 ? 142 : 0;
  const intensity = Math.abs(t - 0.5) * 2;
  const lightness = 96 - Math.round(intensity * 16);
  const sat = 40 + Math.round(intensity * 35);
  return `hsl(${hue} ${sat}% ${lightness}%)`;
}

export default function RankingTable() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState<Region | "all">("all");
  const [sortKey, setSortKey] = useState<SortKey>("economicFreedom");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const bounds = useMemo(allBounds, []);

  const rows = useMemo(() => {
    const filtered = COUNTRIES.filter((c) => {
      const matchSearch = c.name.toLowerCase().includes(search.trim().toLowerCase());
      const matchRegion = region === "all" || c.region === region;
      return matchSearch && matchRegion;
    });

    const sorted = [...filtered].sort((a, b) => {
      if (sortKey === "name") {
        const cmp = a.name.localeCompare(b.name, "fr");
        return sortDir === "asc" ? cmp : -cmp;
      }
      const av = a[sortKey];
      const bv = b[sortKey];
      if (av === undefined && bv === undefined) return 0;
      if (av === undefined) return 1;
      if (bv === undefined) return -1;
      return sortDir === "asc" ? av - bv : bv - av;
    });
    return sorted;
  }, [search, region, sortKey, sortDir]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir(key === "name" ? "asc" : "desc");
    }
  }

  function sortIndicator(key: SortKey) {
    if (sortKey !== key) return "";
    return sortDir === "asc" ? " ▲" : " ▼";
  }

  return (
    <div>
      {/* Filtres */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginBottom: "1rem", alignItems: "center" }}>
        <input
          type="search"
          placeholder="Rechercher un pays…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: "14rem" }}
        />
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value as Region | "all")}
        >
          <option value="all">Toutes les régions</option>
          {REGIONS.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
        {search || region !== "all" ? (
          <button
            onClick={() => { setSearch(""); setRegion("all"); }}
            style={{
              fontSize: "0.8125rem",
              color: "var(--gold)",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "inherit",
              padding: 0,
            }}
          >
            Effacer les filtres ✕
          </button>
        ) : null}
        <span style={{ fontSize: "0.8125rem", color: "var(--text-3)", marginLeft: "auto" }}>
          {rows.length} pays
        </span>
      </div>

      <div className="card" style={{ overflowX: "auto" }}>
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ textAlign: "left", position: "sticky", left: 0, background: "var(--surface)" }}>
                #
              </th>
              <th
                className="sortable"
                style={{ textAlign: "left" }}
                onClick={() => toggleSort("name")}
              >
                Pays{sortIndicator("name")}
              </th>
              {INDICATORS.map((ind) => (
                <th
                  key={ind.key}
                  className="sortable"
                  style={{ textAlign: "right" }}
                  title={ind.description}
                  onClick={() => toggleSort(ind.key)}
                >
                  {ind.shortLabel}
                  <span style={{ color: sortKey === ind.key ? "var(--gold)" : "inherit" }}>
                    {sortIndicator(ind.key)}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((c, i) => (
              <tr
                key={c.code}
                onClick={() => router.push(`/pays/${c.code}`)}
                style={{ cursor: "pointer" }}
                title={`Voir la fiche de ${c.name}`}
              >
                <td
                  style={{
                    position: "sticky",
                    left: 0,
                    background: "var(--surface)",
                    color: "var(--text-3)",
                    transition: "background 120ms",
                  }}
                >
                  {i + 1}
                </td>
                <td style={{ whiteSpace: "nowrap", fontWeight: 500 }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "var(--text)" }}>
                    <span>{c.flag}</span>
                    {c.name}
                  </span>
                </td>
                {INDICATORS.map((ind) => {
                  const v = c[ind.key];
                  const b = bounds[ind.key];
                  const bg =
                    typeof v === "number" && b
                      ? heatColor(v, ind.key, b, ind.higherIsBetter)
                      : "transparent";
                  return (
                    <td key={ind.key} style={{ textAlign: "right", backgroundColor: bg }}>
                      {formatValue(v, ind)}
                    </td>
                  );
                })}
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td
                  colSpan={INDICATORS.length + 2}
                  style={{ textAlign: "center", padding: "2.5rem 0.75rem", color: "var(--text-3)" }}
                >
                  Aucun pays ne correspond à la recherche.{" "}
                  <button
                    onClick={() => { setSearch(""); setRegion("all"); }}
                    style={{
                      color: "var(--gold)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "inherit",
                      fontSize: "inherit",
                      padding: 0,
                    }}
                  >
                    Effacer les filtres
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p style={{ fontSize: "0.75rem", color: "var(--text-3)", marginTop: "0.5rem", textAlign: "right" }}>
        Cliquez sur une ligne pour voir la fiche pays · Cliquez sur un en-tête pour trier
      </p>
    </div>
  );
}
