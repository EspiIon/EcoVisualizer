import { COUNTRIES, type Country } from "@/data/countries";
import { INDICATORS, INDICATOR_BY_KEY, type IndicatorKey } from "@/data/indicators";

export interface Bounds {
  min: number;
  max: number;
}

/** Bornes [min, max] d'un indicateur sur les pays ayant une valeur. */
export function indicatorBounds(key: IndicatorKey): Bounds | null {
  const vals = COUNTRIES.map((c) => c[key]).filter(
    (v): v is number => typeof v === "number",
  );
  if (vals.length === 0) return null;
  return { min: Math.min(...vals), max: Math.max(...vals) };
}

/** Toutes les bornes, calculées une seule fois (utile pour les composants). */
export function allBounds(): Partial<Record<IndicatorKey, Bounds>> {
  const out: Partial<Record<IndicatorKey, Bounds>> = {};
  for (const ind of INDICATORS) {
    const b = indicatorBounds(ind.key);
    if (b) out[ind.key] = b;
  }
  return out;
}

/**
 * Math pure : projette `value` sur 0–100 dans `bounds`, en inversant l'échelle
 * si `higherIsBetter === false`. Retourne null si bornes dégénérées.
 */
export function scaleTo100(
  value: number,
  bounds: Bounds,
  higherIsBetter: boolean | null,
): number | null {
  if (bounds.max === bounds.min) return null;
  let t = (value - bounds.min) / (bounds.max - bounds.min); // 0..1
  if (higherIsBetter === false) t = 1 - t;
  return Math.round(t * 1000) / 10; // 0..100, 1 décimale
}

/**
 * Projette une valeur sur 0–100 en respectant le sens de l'indicateur :
 * pour « bas = mieux » (Gini, pauvreté…), l'échelle est inversée pour que 100 = « bon ».
 * Retourne null si la valeur ou les bornes manquent.
 */
export function normalize(
  value: number | undefined,
  key: IndicatorKey,
  bounds?: Bounds | null,
): number | null {
  if (typeof value !== "number") return null;
  const b = bounds ?? indicatorBounds(key);
  if (!b) return null;
  return scaleTo100(value, b, INDICATOR_BY_KEY[key].higherIsBetter);
}

/** Indicateurs « directionnels » (un sens bon/mauvais clair), utilisés pour radar et score. */
export function directionalIndicators() {
  return INDICATORS.filter((ind) => ind.higherIsBetter !== null);
}

/**
 * Score composite 0–100 : moyenne pondérée des indicateurs directionnels normalisés
 * que possède le pays. Les poids sont renormalisés sur les indicateurs réellement présents
 * (les valeurs manquantes ne pénalisent pas). Retourne null si aucune donnée.
 */
export function compositeScore(
  country: Country,
  weights: Partial<Record<IndicatorKey, number>>,
  bounds?: Partial<Record<IndicatorKey, Bounds>>,
): number | null {
  let weightedSum = 0;
  let totalWeight = 0;
  for (const ind of directionalIndicators()) {
    const w = weights[ind.key];
    if (!w || w <= 0) continue;
    const n = normalize(country[ind.key], ind.key, bounds?.[ind.key]);
    if (n === null) continue;
    weightedSum += w * n;
    totalWeight += w;
  }
  if (totalWeight === 0) return null;
  return Math.round((weightedSum / totalWeight) * 10) / 10;
}
