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
      // Moyenne mondiale normalisée = moyenne des valeurs normalisées de tous les pays.
      const worldNorms = COUNTRIES.map((c) => normalize(c[ind.key], ind.key, bounds[ind.key])).filter(
        (v): v is number => v !== null,
      );
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
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <h2 className="text-sm font-semibold text-slate-700 mb-1">Profil comparé</h2>
      <p className="text-xs text-slate-500 mb-2">
        Indicateurs ramenés sur une échelle 0–100 (100 = meilleur du panel), comparés à la moyenne
        mondiale.
      </p>
      <ResponsiveContainer width="100%" height={340}>
        <RadarChart data={data} outerRadius="72%">
          <PolarGrid stroke="#e2e8f0" />
          <PolarAngleAxis dataKey="indicator" tick={{ fontSize: 11, fill: "#475569" }} />
          <PolarRadiusAxis domain={[0, 100]} tick={{ fontSize: 9, fill: "#94a3b8" }} angle={90} />
          <Radar
            name={country.name}
            dataKey="pays"
            stroke="#0284c7"
            fill="#0284c7"
            fillOpacity={0.4}
            isAnimationActive={false}
          />
          <Radar
            name="Moyenne mondiale"
            dataKey="monde"
            stroke="#94a3b8"
            fill="#94a3b8"
            fillOpacity={0.15}
            isAnimationActive={false}
          />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Tooltip
            formatter={(v) => (typeof v === "number" ? `${v} / 100` : "n/d")}
            contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
