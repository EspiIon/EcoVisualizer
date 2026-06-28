"use client";

import { useMemo, useState } from "react";
import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  ComposedChart,
  ResponsiveContainer,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";
import { COUNTRIES, REGIONS, type Country, type Region } from "@/data/countries";
import { INDICATORS, INDICATOR_BY_KEY, type IndicatorKey } from "@/data/indicators";
import { interpretCorrelation, linearRegression, pearson } from "@/lib/stats";
import { formatByUnit, formatR, formatValue } from "@/lib/format";
import { getRank } from "@/lib/ranking";

const REGION_COLORS: Record<Region, string> = {
  Europe: "#2563eb",
  Amériques: "#dc2626",
  "Asie-Pacifique": "#16a34a",
  "Moyen-Orient": "#d97706",
  Afrique: "#7c3aed",
};

const DOT_SIZE = 300;
const DOT_RADIUS = Math.sqrt(DOT_SIZE / Math.PI); // ~9.8 px

interface Point {
  x: number;
  y: number;
  code: string;
  name: string;
  flag: string;
  region: Region;
}

function computeDomain(values: number[]): [number, number] {
  if (values.length === 0) return [0, 100];
  const min = Math.min(...values);
  const max = Math.max(...values);
  const pad = (max - min) * 0.06 || 1;
  return [min - pad, max + pad];
}

export default function ScatterCorrelation() {
  const [xKey, setXKey] = useState<IndicatorKey>("economicFreedom");
  const [yKey, setYKey] = useState<IndicatorKey>("gdpPerCapitaPpp");
  const [selected, setSelected] = useState<Country | null>(null);
  const [activeRegions, setActiveRegions] = useState<Set<Region>>(new Set(REGIONS));

  const xMeta = INDICATOR_BY_KEY[xKey];
  const yMeta = INDICATOR_BY_KEY[yKey];

  function toggleRegion(region: Region) {
    setSelected(null);
    setActiveRegions((prev) => {
      const next = new Set(prev);
      if (next.has(region)) {
        if (next.size === 1) return prev; // garder au moins une région active
        next.delete(region);
      } else {
        next.add(region);
      }
      return next;
    });
  }

  const points = useMemo<Point[]>(() => {
    return COUNTRIES.flatMap((c) => {
      if (!activeRegions.has(c.region)) return [];
      const x = c[xKey];
      const y = c[yKey];
      if (typeof x !== "number" || typeof y !== "number") return [];
      return [{ x, y, code: c.code, name: c.name, flag: c.flag, region: c.region }];
    });
  }, [xKey, yKey, activeRegions]);

  const { r, trend, xDomain, yDomain } = useMemo(() => {
    const xs = points.map((p) => p.x);
    const ys = points.map((p) => p.y);
    const r = pearson(xs, ys);
    const fit = linearRegression(xs, ys);
    const xDomain = computeDomain(xs);
    const yDomain = computeDomain(ys);
    let trend: { x: number; y: number }[] = [];
    if (fit && xs.length >= 2) {
      trend = [
        { x: xDomain[0], y: fit.slope * xDomain[0] + fit.intercept },
        { x: xDomain[1], y: fit.slope * xDomain[1] + fit.intercept },
      ];
    }
    return { r, trend, xDomain, yDomain };
  }, [points]);

  const byRegion = useMemo(() => {
    const map = new Map<Region, Point[]>();
    for (const p of points) {
      const arr = map.get(p.region) ?? [];
      arr.push(p);
      map.set(p.region, arr);
    }
    return map;
  }, [points]);

  function handleDotClick(data: unknown) {
    const pt = data as Point;
    const country = COUNTRIES.find((c) => c.code === pt.code) ?? null;
    setSelected(country);
  }

  return (
    <div>
      <div className="flex flex-wrap gap-6 mb-6">
        <AxisSelect label="Axe horizontal (X)" value={xKey} onChange={setXKey} exclude={yKey} />
        <AxisSelect label="Axe vertical (Y)"   value={yKey} onChange={setYKey} exclude={xKey} />
      </div>

      {/* Filtre régions */}
      <div className="flex flex-wrap gap-2 mb-5">
        {REGIONS.map((rg) => {
          const active = activeRegions.has(rg);
          return (
            <button
              key={rg}
              onClick={() => toggleRegion(rg)}
              className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                active
                  ? "text-white border-transparent"
                  : "bg-white text-slate-400 border-slate-200"
              }`}
              style={active ? { backgroundColor: REGION_COLORS[rg], borderColor: REGION_COLORS[rg] } : {}}
            >
              {rg}
            </button>
          );
        })}
        <button
          onClick={() => { setActiveRegions(new Set(REGIONS)); setSelected(null); }}
          className="px-3 py-1 rounded-full text-xs font-medium border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 transition-all"
        >
          Tout afficher
        </button>
      </div>

      <div className="grid gap-4 mb-6 sm:grid-cols-3">
        <Stat label="Coefficient r (Pearson)" value={formatR(r)} />
        <Stat label="Interprétation" value={interpretCorrelation(r)} />
        <Stat label="Pays comparés" value={String(points.length)} />
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <p className="text-xs text-slate-400 mb-2">Cliquez sur une bulle pour voir la fiche pays</p>
        <ResponsiveContainer width="100%" height={500}>
          <ComposedChart margin={{ top: 16, right: 32, bottom: 48, left: 24 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              type="number"
              dataKey="x"
              domain={xDomain}
              tickFormatter={(v) => formatByUnit(v, xMeta.unit, 0)}
              tick={{ fontSize: 11, fill: "#64748b" }}
              tickCount={7}
            >
              <Label value={xMeta.label} position="bottom" offset={28} fill="#334155" fontSize={12} />
            </XAxis>
            <YAxis
              type="number"
              dataKey="y"
              domain={yDomain}
              tickFormatter={(v) => formatByUnit(v, yMeta.unit, 0)}
              tick={{ fontSize: 11, fill: "#64748b" }}
              width={82}
            >
              <Label
                value={yMeta.label}
                angle={-90}
                position="insideLeft"
                offset={-8}
                style={{ textAnchor: "middle" }}
                fill="#334155"
                fontSize={12}
              />
            </YAxis>
            <ZAxis range={[DOT_SIZE, DOT_SIZE]} />
            <Legend verticalAlign="top" height={36} />

            {trend.length === 2 && (
              <Line
                data={trend}
                dataKey="y"
                type="linear"
                dot={false}
                stroke="#0f172a"
                strokeWidth={2}
                strokeDasharray="7 4"
                legendType="none"
                isAnimationActive={false}
                activeDot={false}
              />
            )}

            {REGIONS.filter((rg) => byRegion.has(rg)).map((rg) => (
              <Scatter
                key={rg}
                name={rg}
                data={byRegion.get(rg)}
                isAnimationActive={false}
                cursor="pointer"
                onClick={handleDotClick}
                shape={(props: unknown) => (
                  <CustomDot
                    {...(props as Record<string, unknown>)}
                    color={REGION_COLORS[rg]}
                    selectedCode={selected?.code}
                    hasSelection={selected !== null}
                  />
                )}
              />
            ))}
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <p className="text-xs text-slate-500 mt-2">
        Chaque bulle représente un pays. La droite en pointillés est la droite de régression
        linéaire. Une corrélation n&apos;implique pas de causalité.
      </p>

      {selected && (
        <CountryPreview country={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}

function CustomDot({
  cx, cy, payload, color, selectedCode, hasSelection,
}: {
  cx?: number; cy?: number;
  payload?: Point;
  color: string;
  selectedCode?: string;
  hasSelection: boolean;
}) {
  if (cx === undefined || cy === undefined || !payload) return null;
  const isSelected = payload.code === selectedCode;
  const opacity = hasSelection && !isSelected ? 0.25 : 0.85;

  return (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r={DOT_RADIUS}
        fill={color}
        fillOpacity={opacity}
        stroke={isSelected ? "#0f172a" : "transparent"}
        strokeWidth={isSelected ? 2.5 : 0}
      />
      {isSelected && (
        <text
          x={cx + DOT_RADIUS + 5}
          y={cy + 4}
          fontSize={12}
          fontWeight={600}
          fill="#0f172a"
          style={{ pointerEvents: "none", userSelect: "none" }}
        >
          {payload.flag} {payload.name}
        </text>
      )}
    </g>
  );
}

function CountryPreview({ country, onClose }: { country: Country; onClose: () => void }) {
  return (
    <div className="mt-6 rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      {/* En-tête */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{country.flag}</span>
          <div>
            <h2 className="text-lg font-bold text-slate-900">{country.name}</h2>
            <span className="text-xs text-slate-500">{country.region}</span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-700 transition-colors text-xl leading-none px-2"
          aria-label="Fermer"
        >
          ✕
        </button>
      </div>

      {/* Grille des indicateurs */}
      <div className="grid gap-3 p-5 sm:grid-cols-2 lg:grid-cols-3">
        {INDICATORS.map((ind) => {
          const value = country[ind.key];
          const rankInfo = getRank(country.code, ind.key);
          return (
            <div key={ind.key} className="rounded-lg border border-slate-100 bg-slate-50 px-4 py-3">
              <div className="text-xs text-slate-500 mb-1">{ind.label}</div>
              <div className="flex items-baseline justify-between">
                <span className="text-base font-semibold text-slate-800">
                  {formatValue(value, ind)}
                </span>
                {rankInfo && (
                  <span className="text-xs text-slate-400">
                    {rankInfo.rank}<sup>{rankInfo.rank === 1 ? "er" : "e"}</sup>
                    {" "}/ {rankInfo.total}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AxisSelect({
  label, value, onChange, exclude,
}: {
  label: string; value: IndicatorKey; onChange: (k: IndicatorKey) => void; exclude: IndicatorKey;
}) {
  return (
    <label className="flex flex-col gap-1 text-sm">
      <span className="text-slate-600 font-medium">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as IndicatorKey)}
        className="px-3 py-2 rounded-md border border-slate-300 bg-white min-w-64"
      >
        {INDICATORS.map((ind) => (
          <option key={ind.key} value={ind.key} disabled={ind.key === exclude}>
            {ind.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-4 py-3">
      <div className="text-xs text-slate-500">{label}</div>
      <div className="text-lg font-semibold text-slate-800">{value}</div>
    </div>
  );
}
