"use client";

import { useMemo } from "react";
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

interface RadarRow {
  indicator: string;
  pays: number | null;
  monde: number | null;
}

export default function CountryRadar({ country }: { country: Country }) {
  const data = useMemo<RadarRow[]>(() => {
    const bounds = allBounds();
    return directionalIndicators().map((ind) => {
      const worldNorms = COUNTRIES.map((c) =>
        normalize(c[ind.key], ind.key, bounds[ind.key]),
      ).filter((v): v is number => v !== null);
      const worldAvg =
        worldNorms.length > 0
          ? Math.round((worldNorms.reduce((a, b) => a + b, 0) / worldNorms.length) * 10) / 10
          : null;
      return {
        indicator: ind.shortLabel,
        pays: normalize(country[ind.key], ind.key, bounds[ind.key]),
        monde: worldAvg,
      };
    });
  }, [country]);

  return (
    <div
      className="card"
      style={{ padding: "1.25rem" }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.25rem" }}>
        <h2
          className="font-display"
          style={{ fontSize: "1rem", fontWeight: 600, color: "var(--text)" }}
        >
          Profil comparé
        </h2>
        <span className="badge badge-gold">0 – 100</span>
      </div>
      <p style={{ fontSize: "0.75rem", color: "var(--text-3)", marginBottom: "0.5rem" }}>
        Indicateurs ramenés sur 0–100 (100 = meilleur du panel), comparés à la moyenne mondiale.
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
            name="Moyenne mondiale"
            dataKey="monde"
            stroke="var(--text-3)"
            fill="var(--text-3)"
            fillOpacity={0.1}
            strokeWidth={1.5}
            strokeDasharray="5 3"
            isAnimationActive={false}
          />
          <Legend
            wrapperStyle={{
              fontSize: "0.75rem",
              color: "var(--text-2)",
              fontFamily: "Outfit, sans-serif",
            }}
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
