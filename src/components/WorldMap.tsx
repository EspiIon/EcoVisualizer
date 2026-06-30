"use client";

import { useMemo, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { COUNTRIES, getCountry } from "@/data/countries";
import { INDICATORS, INDICATOR_BY_KEY, type IndicatorKey } from "@/data/indicators";
import { normalize, compositeScore, allBounds, directionalIndicators } from "@/lib/normalize";
import { getRank } from "@/lib/ranking";
import { formatValue } from "@/lib/format";

const WORLD_TOPO_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// world-atlas@2 supprime toutes les propriétés ; seul geo.id (code numérique ISO 3166-1) reste.
const ISO3_BY_NUMERIC: Record<string, string> = {
  "4":"AFG","8":"ALB","12":"DZA","20":"AND","24":"AGO","28":"ATG","31":"AZE",
  "32":"ARG","36":"AUS","40":"AUT","44":"BHS","48":"BHR","50":"BGD","51":"ARM",
  "56":"BEL","64":"BTN","68":"BOL","70":"BIH","72":"BWA","76":"BRA","84":"BLZ",
  "96":"BRN","100":"BGR","104":"MMR","108":"BDI","112":"BLR","116":"KHM",
  "120":"CMR","124":"CAN","132":"CPV","140":"CAF","144":"LKA","148":"TCD",
  "152":"CHL","156":"CHN","158":"TWN","170":"COL","174":"COM","178":"COG",
  "180":"COD","188":"CRI","191":"HRV","192":"CUB","196":"CYP","203":"CZE",
  "204":"BEN","208":"DNK","214":"DOM","218":"ECU","222":"SLV","226":"GNQ",
  "231":"ETH","232":"ERI","233":"EST","242":"FJI","246":"FIN","250":"FRA",
  "262":"DJI","266":"GAB","268":"GEO","270":"GMB","276":"DEU","288":"GHA",
  "300":"GRC","308":"GRD","320":"GTM","324":"GIN","328":"GUY","332":"HTI",
  "336":"VAT","340":"HND","344":"HKG","348":"HUN","352":"ISL","356":"IND",
  "360":"IDN","364":"IRN","368":"IRQ","372":"IRL","376":"ISR","380":"ITA",
  "384":"CIV","388":"JAM","392":"JPN","398":"KAZ","400":"JOR","404":"KEN",
  "408":"PRK","410":"KOR","414":"KWT","417":"KGZ","418":"LAO","422":"LBN",
  "426":"LSO","428":"LVA","430":"LBR","434":"LBY","438":"LIE","440":"LTU",
  "442":"LUX","450":"MDG","454":"MWI","458":"MYS","462":"MDV","466":"MLI",
  "470":"MLT","478":"MRT","480":"MUS","484":"MEX","496":"MNG","498":"MDA",
  "499":"MNE","504":"MAR","508":"MOZ","512":"OMN","516":"NAM","524":"NPL",
  "528":"NLD","554":"NZL","558":"NIC","562":"NER","566":"NGA","578":"NOR",
  "586":"PAK","591":"PAN","598":"PNG","600":"PRY","604":"PER","608":"PHL",
  "616":"POL","620":"PRT","626":"TLS","630":"PRI","634":"QAT","642":"ROU",
  "643":"RUS","646":"RWA","682":"SAU","686":"SEN","688":"SRB","694":"SLE",
  "702":"SGP","703":"SVK","704":"VNM","705":"SVN","706":"SOM","710":"ZAF",
  "716":"ZWE","724":"ESP","729":"SDN","740":"SUR","752":"SWE","756":"CHE",
  "760":"SYR","762":"TJK","764":"THA","768":"TGO","780":"TTO","784":"ARE",
  "788":"TUN","792":"TUR","795":"TKM","800":"UGA","804":"UKR","807":"MKD",
  "818":"EGY","826":"GBR","834":"TZA","840":"USA","858":"URY","860":"UZB",
  "862":"VEN","887":"YEM","894":"ZMB",
};

type SelectionKey = IndicatorKey | "composite";

interface TooltipData {
  iso3: string;
  x: number;
  y: number;
}

function lerpColor(a: string, b: string, t: number): string {
  const parse = (hex: string) => [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ];
  const [ar, ag, ab] = parse(a);
  const [br, bg, bb] = parse(b);
  const r = Math.round(ar + (br - ar) * t);
  const g = Math.round(ag + (bg - ag) * t);
  const bch = Math.round(ab + (bb - ab) * t);
  return `rgb(${r},${g},${bch})`;
}

function scoreToColor(score: number | null): string {
  if (score === null) return "#e8e5dc";
  const t = Math.max(0, Math.min(100, score)) / 100;
  if (t < 0.5) return lerpColor("#fca5a5", "#fef9c3", t * 2);
  return lerpColor("#fef9c3", "#86efac", (t - 0.5) * 2);
}

export default function WorldMap() {
  const router = useRouter();
  const [selectedKey, setSelectedKey] = useState<SelectionKey>("composite");
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);

  const bounds = useMemo(() => allBounds(), []);
  const dirInds = useMemo(() => directionalIndicators(), []);
  const equalWeights = useMemo(() => {
    const w: Partial<Record<IndicatorKey, number>> = {};
    for (const ind of dirInds) w[ind.key] = 1;
    return w;
  }, [dirInds]);

  const scoreMap = useMemo(() => {
    const map = new Map<string, number | null>();
    for (const c of COUNTRIES) {
      if (selectedKey === "composite") {
        map.set(c.code, compositeScore(c, equalWeights, bounds));
      } else {
        const raw = c[selectedKey as IndicatorKey];
        const n = typeof raw === "number"
          ? normalize(raw, selectedKey as IndicatorKey, bounds[selectedKey as IndicatorKey])
          : null;
        map.set(c.code, n ?? null);
      }
    }
    return map;
  }, [selectedKey, bounds, equalWeights]);

  const handleMouseEnter = useCallback((iso3: string, evt: React.MouseEvent) => {
    setTooltip({ iso3, x: evt.clientX, y: evt.clientY });
  }, []);

  const handleMouseMove = useCallback((evt: React.MouseEvent) => {
    setTooltip((prev) => prev ? { ...prev, x: evt.clientX, y: evt.clientY } : null);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTooltip(null);
  }, []);

  const handleClick = useCallback((iso3: string) => {
    const country = getCountry(iso3);
    if (country) router.push(`/pays/${iso3}`);
  }, [router]);

  const tooltipCountry = tooltip ? getCountry(tooltip.iso3) : null;
  const tooltipScore = tooltip ? scoreMap.get(tooltip.iso3) ?? null : null;
  const tooltipRank = (tooltipCountry && selectedKey !== "composite")
    ? getRank(tooltipCountry.code, selectedKey as IndicatorKey)
    : null;

  const indMeta = selectedKey !== "composite" ? INDICATOR_BY_KEY[selectedKey as IndicatorKey] : null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      {/* Sélecteur */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
        <label style={{ fontSize: "0.8125rem", color: "var(--text-2)", fontWeight: 500 }}>
          Indicateur
        </label>
        <select
          value={selectedKey}
          onChange={(e) => setSelectedKey(e.target.value as SelectionKey)}
          style={{ minWidth: "18rem" }}
        >
          <option value="composite">Score composite (tous indicateurs)</option>
          <optgroup label="Indicateurs">
            {INDICATORS.map((ind) => (
              <option key={ind.key} value={ind.key}>{ind.label}</option>
            ))}
          </optgroup>
        </select>
        {indMeta && (
          <span style={{ fontSize: "0.75rem", color: "var(--text-3)" }}>
            {indMeta.description}
          </span>
        )}
      </div>

      {/* Carte */}
      <div
        className="card"
        style={{ padding: "0", overflow: "hidden", position: "relative" }}
        onMouseMove={handleMouseMove}
      >
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ scale: 130, center: [10, 15] }}
          style={{ width: "100%", height: "auto" }}
          viewBox="0 0 800 450"
        >
          <Geographies geography={WORLD_TOPO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const iso3 = ISO3_BY_NUMERIC[String(geo.id)] ?? "";
                const score = scoreMap.get(iso3) ?? null;
                const hasData = score !== null;
                const fill = scoreToColor(score);
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={fill}
                    stroke="var(--surface)"
                    strokeWidth={0.4}
                    style={{
                      default: { outline: "none" },
                      hover: { outline: "none", fill: hasData ? "var(--gold)" : fill, cursor: hasData ? "pointer" : "default" },
                      pressed: { outline: "none" },
                    }}
                    onMouseEnter={(evt: React.MouseEvent) => handleMouseEnter(iso3, evt)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleClick(iso3)}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>
      </div>

      {/* Légende */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
        <span style={{ fontSize: "0.75rem", color: "var(--text-3)" }}>Score normalisé 0–100</span>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flex: 1, minWidth: "12rem" }}>
          <span style={{ fontSize: "0.7rem", color: "var(--text-3)", whiteSpace: "nowrap" }}>0 (faible)</span>
          <div
            style={{
              flex: 1,
              height: "10px",
              borderRadius: "999px",
              background: "linear-gradient(to right, #fca5a5, #fef9c3, #86efac)",
              border: "1px solid var(--border)",
            }}
          />
          <span style={{ fontSize: "0.7rem", color: "var(--text-3)", whiteSpace: "nowrap" }}>100 (élevé)</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
          <div style={{ width: "14px", height: "10px", borderRadius: "3px", background: "#e8e5dc", border: "1px solid var(--border)" }} />
          <span style={{ fontSize: "0.7rem", color: "var(--text-3)" }}>Données manquantes</span>
        </div>
      </div>

      {/* Tooltip */}
      {tooltip && tooltipCountry && (
        <div
          style={{
            position: "fixed",
            left: tooltip.x + 14,
            top: tooltip.y - 10,
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "8px",
            padding: "0.6rem 0.875rem",
            boxShadow: "0 4px 20px rgba(0,0,0,.12)",
            pointerEvents: "none",
            zIndex: 100,
            minWidth: "10rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
            <span style={{ fontSize: "1.5rem", lineHeight: 1 }}>{tooltipCountry.flag}</span>
            <span style={{ fontWeight: 600, color: "var(--text)", fontSize: "0.875rem" }}>{tooltipCountry.name}</span>
          </div>
          {tooltipScore !== null ? (
            <>
              <div style={{ fontSize: "0.75rem", color: "var(--text-2)" }}>
                Score :{" "}
                <span className="font-mono-data" style={{ color: "var(--gold)", fontWeight: 700 }}>
                  {tooltipScore.toFixed(1)}
                </span>
                {" "}/ 100
              </div>
              {tooltipRank && (
                <div style={{ fontSize: "0.7rem", color: "var(--text-3)", marginTop: "0.15rem" }}>
                  Rang {tooltipRank.rank}<sup>{tooltipRank.rank === 1 ? "er" : "e"}</sup> / {tooltipRank.total}
                </div>
              )}
              {indMeta && (
                <div style={{ fontSize: "0.7rem", color: "var(--text-3)", marginTop: "0.15rem" }}>
                  {formatValue(tooltipCountry[indMeta.key as IndicatorKey], indMeta)}
                </div>
              )}
            </>
          ) : (
            <div style={{ fontSize: "0.75rem", color: "var(--text-3)" }}>Données indisponibles</div>
          )}
          <div style={{ fontSize: "0.65rem", color: "var(--gold)", marginTop: "0.3rem" }}>Cliquez pour la fiche →</div>
        </div>
      )}
    </div>
  );
}
