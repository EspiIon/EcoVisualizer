import type { IndicatorMeta, Unit } from "@/data/indicators";

const FR = "fr-FR";

/** Formate une valeur selon l'unité de l'indicateur. Gère les valeurs manquantes. */
export function formatValue(
  value: number | undefined | null,
  meta: Pick<IndicatorMeta, "unit" | "decimals">,
): string {
  if (value === undefined || value === null || Number.isNaN(value)) return "—";
  return formatByUnit(value, meta.unit, meta.decimals);
}

export function formatByUnit(value: number, unit: Unit, decimals: number): string {
  switch (unit) {
    case "usd":
      return new Intl.NumberFormat(FR, {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: decimals,
        minimumFractionDigits: 0,
      }).format(value);
    case "percent":
      return `${formatNumber(value, decimals)} %`;
    case "years":
      return `${formatNumber(value, decimals)} ans`;
    case "index10":
      return `${formatNumber(value, decimals)} / 10`;
    case "score":
    default:
      return formatNumber(value, decimals);
  }
}

export function formatNumber(value: number, decimals = 0): string {
  return new Intl.NumberFormat(FR, {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  }).format(value);
}

/** Formate le coefficient r avec 2 décimales (ou tiret si NaN). */
export function formatR(r: number): string {
  if (Number.isNaN(r)) return "—";
  return r.toFixed(2);
}
