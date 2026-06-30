"use client";

import React, { useMemo, useState } from "react";
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
  Europe: "#1a56db",
  Amériques: "#057a55",
  "Asie-Pacifique": "#b45309",
  "Moyen-Orient": "#6c2bd9",
  Afrique: "#db2777",
};

const DOT_SIZE = 300;
const DOT_RADIUS = Math.sqrt(DOT_SIZE / Math.PI);

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
        if (next.size === 1) return prev;
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

  function handleChartClick(_data: unknown, event: React.MouseEvent<SVGElement>) {
    const target = event.target as SVGElement;
    if (target.tagName === "circle") return; // laisse le Scatter onClick gérer
    setSelected(null);
  }

  return (
    <div>
      {/* Axis selectors */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", marginBottom: "1.25rem" }}>
        <AxisSelect label="Axe horizontal (X)" value={xKey} onChange={setXKey} exclude={yKey} />
        <AxisSelect label="Axe vertical (Y)" value={yKey} onChange={setYKey} exclude={xKey} />
      </div>

      {/* Region filter */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.25rem" }}>
        {REGIONS.map((rg) => {
          const active = activeRegions.has(rg);
          return (
            <button
              key={rg}
              onClick={() => toggleRegion(rg)}
              style={{
                padding: "0.25rem 0.75rem",
                borderRadius: "999px",
                fontSize: "0.75rem",
                fontWeight: 500,
                border: `1px solid ${active ? REGION_COLORS[rg] : "var(--border-2)"}`,
                background: active ? `${REGION_COLORS[rg]}22` : "transparent",
                color: active ? REGION_COLORS[rg] : "var(--text-3)",
                cursor: "pointer",
                transition: "all 160ms ease",
                fontFamily: "inherit",
              }}
            >
              {rg}
            </button>
          );
        })}
        <button
          onClick={() => { setActiveRegions(new Set(REGIONS)); setSelected(null); }}
          style={{
            padding: "0.25rem 0.75rem",
            borderRadius: "999px",
            fontSize: "0.75rem",
            fontWeight: 500,
            border: "1px solid var(--border-2)",
            background: "transparent",
            color: "var(--text-3)",
            cursor: "pointer",
            fontFamily: "inherit",
            transition: "all 160ms ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-3)")}
        >
          Tout afficher
        </button>
      </div>

      {/* Stats strip */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "0.75rem",
          marginBottom: "1.25rem",
        }}
      >
        <Stat label="Coefficient r (Pearson)" value={formatR(r)} highlight />
        <Stat label="Interprétation" value={interpretCorrelation(r)} />
        <Stat label="Pays comparés" value={String(points.length)} />
      </div>

      {/* Chart */}
      <div className="card" style={{ padding: "1rem" }}>
        <p style={{ fontSize: "0.75rem", color: "var(--text-3)", marginBottom: "0.5rem" }}>
          Cliquez sur une bulle pour la sélectionner · cliquez sur le fond pour désélectionner
        </p>
        <ResponsiveContainer width="100%" height={500}>
          <ComposedChart margin={{ top: 16, right: 32, bottom: 48, left: 24 }} onClick={handleChartClick}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis
              type="number"
              dataKey="x"
              domain={xDomain}
              tickFormatter={(v) => formatByUnit(v, xMeta.unit, 0)}
              tick={{ fontSize: 11, fill: "var(--text-3)", fontFamily: "Space Mono, monospace" }}
              tickCount={7}
              stroke="var(--border)"
            >
              <Label value={xMeta.label} position="bottom" offset={28} fill="var(--text-2)" fontSize={12} />
            </XAxis>
            <YAxis
              type="number"
              dataKey="y"
              domain={yDomain}
              tickFormatter={(v) => formatByUnit(v, yMeta.unit, 0)}
              tick={{ fontSize: 11, fill: "var(--text-3)", fontFamily: "Space Mono, monospace" }}
              width={82}
              stroke="var(--border)"
            >
              <Label
                value={yMeta.label}
                angle={-90}
                position="insideLeft"
                offset={-8}
                style={{ textAnchor: "middle" }}
                fill="var(--text-2)"
                fontSize={12}
              />
            </YAxis>
            <ZAxis range={[DOT_SIZE, DOT_SIZE]} />
            <Legend
              verticalAlign="top"
              height={36}
              wrapperStyle={{ fontSize: "0.75rem", color: "var(--text-2)" }}
            />

            {trend.length === 2 && (
              <Line
                data={trend}
                dataKey="y"
                type="linear"
                dot={false}
                stroke="#e85d04"
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
                fill={REGION_COLORS[rg]}
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

      <p style={{ fontSize: "0.75rem", color: "var(--text-3)", marginTop: "0.5rem" }}>
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
  const opacity = hasSelection && !isSelected ? 0.2 : 0.85;

  return (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r={DOT_RADIUS}
        fill={color}
        fillOpacity={opacity}
        stroke={isSelected ? "var(--gold)" : "transparent"}
        strokeWidth={isSelected ? 2 : 0}
      />
      {isSelected && (
        <text
          x={cx + DOT_RADIUS + 5}
          y={cy + 4}
          fontSize={12}
          fontWeight={600}
          fill="var(--text)"
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
    <div
      className="card"
      style={{ marginTop: "1.5rem", overflow: "hidden" }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1rem 1.25rem",
          borderBottom: "1px solid var(--border)",
          background: "var(--surface-2)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
          <span style={{ fontSize: "2.25rem", lineHeight: 1 }}>{country.flag}</span>
          <div>
            <h2
              className="font-display"
              style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--text)" }}
            >
              {country.name}
            </h2>
            <span className="badge badge-gold" style={{ marginTop: "0.25rem", display: "inline-block" }}>
              {country.region}
            </span>
          </div>
        </div>
        <button
          onClick={onClose}
          style={{
            color: "var(--text-3)",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "1.25rem",
            lineHeight: 1,
            padding: "0.25rem 0.5rem",
            transition: "color 160ms",
            fontFamily: "inherit",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-3)")}
          aria-label="Fermer"
        >
          ✕
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gap: "0.6rem",
          padding: "1.25rem",
          gridTemplateColumns: "repeat(auto-fill, minmax(14rem, 1fr))",
        }}
      >
        {INDICATORS.map((ind) => {
          const value = country[ind.key];
          const rankInfo = getRank(country.code, ind.key);
          return (
            <div
              key={ind.key}
              className="card-elevated"
              style={{ padding: "0.75rem 1rem" }}
            >
              <div style={{ fontSize: "0.7rem", color: "var(--text-3)", marginBottom: "0.3rem" }}>
                {ind.label}
              </div>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
                <span
                  className="font-mono-data"
                  style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text)" }}
                >
                  {formatValue(value, ind)}
                </span>
                {rankInfo && (
                  <span
                    className="font-mono-data"
                    style={{ fontSize: "0.7rem", color: "var(--text-3)" }}
                  >
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
    <label style={{ display: "flex", flexDirection: "column", gap: "0.3rem", fontSize: "0.875rem" }}>
      <span style={{ color: "var(--text-2)", fontWeight: 500, fontSize: "0.75rem" }}>{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as IndicatorKey)}
        style={{ minWidth: "16rem" }}
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

function Stat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="card" style={{ padding: "0.75rem 1rem" }}>
      <div style={{ fontSize: "0.7rem", color: "var(--text-3)", marginBottom: "0.25rem" }}>{label}</div>
      <div
        className="font-mono-data"
        style={{
          fontSize: "1.125rem",
          fontWeight: 700,
          color: highlight ? "var(--gold)" : "var(--text)",
        }}
      >
        {value}
      </div>
    </div>
  );
}
