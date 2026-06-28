import { COUNTRIES, type Country } from "@/data/countries";
import { INDICATOR_BY_KEY, type IndicatorKey } from "@/data/indicators";

export interface RankInfo {
  rank: number; // 1 = meilleur
  total: number; // nombre de pays ayant une valeur
}

/**
 * Rang d'un pays sur un indicateur, en tenant compte du sens (higherIsBetter).
 * Les pays sans valeur sont exclus du décompte. Retourne null si le pays n'a pas de valeur.
 */
export function getRank(code: string, key: IndicatorKey): RankInfo | null {
  const meta = INDICATOR_BY_KEY[key];
  const higherIsBetter = meta.higherIsBetter ?? true; // neutre traité comme "haut = mieux" pour l'ordre

  const withValue = COUNTRIES.filter((c): c is Country & Record<IndicatorKey, number> => {
    const v = c[key];
    return typeof v === "number";
  });

  const sorted = [...withValue].sort((a, b) =>
    higherIsBetter ? b[key] - a[key] : a[key] - b[key],
  );

  const idx = sorted.findIndex((c) => c.code === code);
  if (idx === -1) return null;
  return { rank: idx + 1, total: sorted.length };
}
