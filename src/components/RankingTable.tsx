"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { COUNTRIES, REGIONS, type Region } from "@/data/countries";
import { INDICATORS, type IndicatorKey } from "@/data/indicators";
import { formatValue } from "@/lib/format";

type SortKey = IndicatorKey | "name";
type SortDir = "asc" | "desc";

// Bornes [min, max] par indicateur pour la coloration heatmap.
function computeBounds() {
  const bounds: Partial<Record<IndicatorKey, { min: number; max: number }>> = {};
  for (const ind of INDICATORS) {
    const vals = COUNTRIES.map((c) => c[ind.key]).filter(
      (v): v is number => typeof v === "number",
    );
    if (vals.length) bounds[ind.key] = { min: Math.min(...vals), max: Math.max(...vals) };
  }
  return bounds;
}

// Couleur de fond (vert = "bon", rouge = "mauvais") selon le sens de l'indicateur.
function heatColor(
  value: number,
  key: IndicatorKey,
  bounds: { min: number; max: number },
  higherIsBetter: boolean | null,
): string {
  if (higherIsBetter === null) return "transparent";
  const { min, max } = bounds;
  if (max === min) return "transparent";
  let t = (value - min) / (max - min); // 0..1
  if (!higherIsBetter) t = 1 - t;
  // hsl du rouge (0) au vert (130)
  const hue = Math.round(t * 130);
  return `hsl(${hue} 70% 92%)`;
}

export default function RankingTable() {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState<Region | "all">("all");
  const [sortKey, setSortKey] = useState<SortKey>("economicFreedom");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const bounds = useMemo(computeBounds, []);

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
      // Valeurs manquantes toujours en bas
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
      <div className="flex flex-wrap gap-3 mb-4">
        <input
          type="search"
          placeholder="Rechercher un pays…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 rounded-md border border-slate-300 bg-white text-sm w-56"
        />
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value as Region | "all")}
          className="px-3 py-2 rounded-md border border-slate-300 bg-white text-sm"
        >
          <option value="all">Toutes les régions</option>
          {REGIONS.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
        <span className="text-sm text-slate-500 self-center">
          {rows.length} pays
        </span>
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-600">
              <th className="text-left px-3 py-2 font-medium sticky left-0 bg-slate-50">#</th>
              <th
                className="text-left px-3 py-2 font-medium cursor-pointer select-none whitespace-nowrap"
                onClick={() => toggleSort("name")}
              >
                Pays{sortIndicator("name")}
              </th>
              {INDICATORS.map((ind) => (
                <th
                  key={ind.key}
                  className="text-right px-3 py-2 font-medium cursor-pointer select-none whitespace-nowrap"
                  title={ind.description}
                  onClick={() => toggleSort(ind.key)}
                >
                  {ind.shortLabel}
                  {sortIndicator(ind.key)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((c, i) => (
              <tr key={c.code} className="border-t border-slate-100 hover:bg-slate-50/60">
                <td className="px-3 py-2 text-slate-400 tabular-nums">{i + 1}</td>
                <td className="px-3 py-2 whitespace-nowrap">
                  <Link
                    href={`/pays/${c.code}`}
                    className="hover:underline decoration-sky-400"
                  >
                    <span className="mr-1.5">{c.flag}</span>
                    {c.name}
                  </Link>
                </td>
                {INDICATORS.map((ind) => {
                  const v = c[ind.key];
                  const b = bounds[ind.key];
                  const bg =
                    typeof v === "number" && b
                      ? heatColor(v, ind.key, b, ind.higherIsBetter)
                      : "transparent";
                  return (
                    <td
                      key={ind.key}
                      className="px-3 py-2 text-right tabular-nums"
                      style={{ backgroundColor: bg }}
                    >
                      {formatValue(v, ind)}
                    </td>
                  );
                })}
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={INDICATORS.length + 2} className="px-3 py-8 text-center text-slate-400">
                  Aucun pays ne correspond à la recherche.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
