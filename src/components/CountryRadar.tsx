"use client";

import { useMemo, useState } from "react";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { COUNTRIES, type Country } from "@/data/countries";
import { allBounds, directionalIndicators, normalize } from "@/lib/normalize";

type ReferenceGroup = "monde" | "europe" | "ocde";

const REFERENCE_LABELS: Record<ReferenceGroup, string> = {
  monde:  "Monde",
  europe: "Europe",
  ocde:   "OCDE",
};

const REFERENCE_COLORS: Record<ReferenceGroup, string> = {
  monde:  "var(--text-3)",
  europe: "#1a56db",
  ocde:   "#057a55",
};

// Membres de l'OCDE présents dans notre dataset
const OCDE_CODES = new Set([
  "AUS","AUT","BEL","CAN","CHL","COL","CRI","CZE","DNK","EST",
  "FIN","FRA","DEU","GRC","HUN","ISL","IRL","ISR","ITA","JPN",
  "KOR","LVA","LTU","LUX","MEX","NLD","NZL","NOR","POL","PRT",
  "SVK","SVN","ESP","SWE","CHE","TUR","GBR","USA",
]);

interface RadarRow {
  indicator: string;
  pays: number | null;
  ref: number | null;
}

function groupAvg(codes: string[], ind: Parameters<typeof normalize>[1], bounds: ReturnType<typeof allBounds>) {
  const norms = COUNTRIES
    .filter((c) => codes.includes(c.code))
    .map((c) => normalize(c[ind], ind, bounds[ind]))
    .filter((v): v is number => v !== null);
  return norms.length > 0
    ? Math.round((norms.reduce((a, b) => a + b, 0) / norms.length) * 10) / 10
    : null;
}

export default function CountryRadar({ country }: { country: Country }) {
  const [ref, setRef] = useState<ReferenceGroup>("monde");

  const data = useMemo<RadarRow[]>(() => {
    const bounds = allBounds();
    const europeCodes = COUNTRIES.filter((c) => c.region === "Europe").map((c) => c.code);
    const mondeCodes  = COUNTRIES.map((c) => c.code);
    const ocdeCodes   = COUNTRIES.filter((c) => OCDE_CODES.has(c.code)).map((c) => c.code);

    const groupCodes = ref === "europe" ? europeCodes : ref === "ocde" ? ocdeCodes : mondeCodes;

    return directionalIndicators().map((ind) => ({
      indicator: ind.shortLabel,
      pays: normalize(country[ind.key], ind.key, bounds[ind.key]),
      ref:  groupAvg(groupCodes, ind.key, bounds),
    }));
  }, [country, ref]);

  const refColor = REFERENCE_COLORS[ref];

  return (
    <div className="card" style={{ padding: "1.25rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.25rem", flexWrap: "wrap", gap: "0.5rem" }}>
        <h2 className="font-display" style={{ fontSize: "1rem", fontWeight: 600, color: "var(--text)" }}>
          Profil comparé
        </h2>
        <div style={{ display: "flex", gap: "0.25rem", alignItems: "center" }}>
          {(["monde", "europe", "ocde"] as ReferenceGroup[]).map((g) => (
            <button
              key={g}
              onClick={() => setRef(g)}
              style={{
                padding: "0.2rem 0.6rem",
                borderRadius: "999px",
                fontSize: "0.7rem",
                fontWeight: 500,
                border: `1px solid ${ref === g ? REFERENCE_COLORS[g] : "var(--border-2)"}`,
                background: ref === g ? `${REFERENCE_COLORS[g]}18` : "transparent",
                color: ref === g ? REFERENCE_COLORS[g] : "var(--text-3)",
                cursor: "pointer",
                transition: "all 160ms ease",
                fontFamily: "inherit",
              }}
            >
              {REFERENCE_LABELS[g]}
            </button>
          ))}
        </div>
      </div>
      <p style={{ fontSize: "0.75rem", color: "var(--text-3)", marginBottom: "0.5rem" }}>
        Indicateurs normalisés 0–100, comparés à la moyenne {REFERENCE_LABELS[ref].toLowerCase()}.
      </p>
      <ResponsiveContainer width="100%" height={340}>
        <RadarChart data={data} outerRadius="72%">
          <PolarGrid stroke="var(--border)" strokeDasharray="4 3" />
          <PolarAngleAxis
            dataKey="indicator"
            tick={{ fontSize: 11, fill: "var(--text-2)", fontFamily: "Outfit, sans-serif" }}
          />
          <PolarRadiusAxis
            domain={[0, 100]}
            tick={{ fontSize: 9, fill: "var(--text-3)" }}
            angle={90}
            stroke="var(--border)"
          />
          <Radar
            name={country.name}
            dataKey="pays"
            stroke="#e85d04"
            fill="#e85d04"
            fillOpacity={0.25}
            strokeWidth={2}
            isAnimationActive={false}
          />
          <Radar
            name={`Moy. ${REFERENCE_LABELS[ref]}`}
            dataKey="ref"
            stroke={refColor}
            fill={refColor}
            fillOpacity={0.1}
            strokeWidth={1.5}
            strokeDasharray="5 3"
            isAnimationActive={false}
          />
          <Legend
            wrapperStyle={{ fontSize: "0.75rem", color: "var(--text-2)", fontFamily: "Outfit, sans-serif" }}
          />
          <Tooltip
            formatter={(v) => (typeof v === "number" ? `${v} / 100` : "n/d")}
            contentStyle={{
              fontSize: "0.75rem",
              borderRadius: "var(--radius)",
              border: "1px solid var(--border-2)",
              background: "var(--surface-2)",
              color: "var(--text)",
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
