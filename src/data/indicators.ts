export type IndicatorKey =
  | "economicFreedom"
  | "gdpPerCapitaPpp"
  | "lifeExpectancy"
  | "pisaScore"
  | "povertyRate"
  | "publicSpendingGdp"
  | "taxBurdenGdp"
  | "democracyIndex"
  | "pressFreedom";

export type Unit = "score" | "usd" | "years" | "percent" | "index10";

export interface IndicatorMeta {
  key: IndicatorKey;
  label: string;
  shortLabel: string;
  unit: Unit;
  decimals: number;
  higherIsBetter: boolean | null;
  source: string;
  description: string;
}

export const INDICATORS: IndicatorMeta[] = [
  {
    key: "economicFreedom",
    label: "Indice de liberté économique",
    shortLabel: "Liberté éco.",
    unit: "score",
    decimals: 1,
    higherIsBetter: true,
    source: "Heritage Foundation — Index of Economic Freedom 2023",
    description: "Score de 0 à 100 mesurant la liberté économique (droit de propriété, fiscalité, ouverture des marchés…).",
  },
  {
    key: "democracyIndex",
    label: "Indice de démocratie",
    shortLabel: "Démocratie",
    unit: "index10",
    decimals: 2,
    higherIsBetter: true,
    source: "Economist Intelligence Unit — Democracy Index 2022",
    description: "Score de 0 à 10 évaluant le processus électoral, les libertés civiles, la culture politique et le gouvernement.",
  },
  {
    key: "pressFreedom",
    label: "Liberté de la presse",
    shortLabel: "Presse libre",
    unit: "score",
    decimals: 1,
    higherIsBetter: true,
    source: "RSF — Reporters sans frontières, Indice 2023 (0–100)",
    description: "Score de 0 à 100 mesurant la liberté journalistique (conditions politiques, légales, économiques, de sécurité).",
  },
  {
    key: "gdpPerCapitaPpp",
    label: "PIB par habitant (PPA)",
    shortLabel: "PIB/hab. PPA",
    unit: "usd",
    decimals: 0,
    higherIsBetter: true,
    source: "FMI / Banque Mondiale (~2023, USD PPA)",
    description: "Niveau de vie matériel : PIB par habitant en parité de pouvoir d'achat.",
  },
  {
    key: "lifeExpectancy",
    label: "Espérance de vie",
    shortLabel: "Espérance de vie",
    unit: "years",
    decimals: 1,
    higherIsBetter: true,
    source: "Banque Mondiale (~2022)",
    description: "Espérance de vie à la naissance, en années — indicateur synthétique de santé.",
  },
  {
    key: "pisaScore",
    label: "Score PISA moyen",
    shortLabel: "PISA",
    unit: "score",
    decimals: 0,
    higherIsBetter: true,
    source: "OCDE — PISA 2022 (moyenne maths/lecture/sciences)",
    description: "Performance moyenne des élèves de 15 ans (maths, lecture, sciences).",
  },
  {
    key: "povertyRate",
    label: "Taux de pauvreté relative",
    shortLabel: "Pauvreté",
    unit: "percent",
    decimals: 1,
    higherIsBetter: false,
    source: "OCDE — taux de pauvreté relative (~2021, seuil 50 % revenu médian)",
    description: "Part de la population sous 50 % du revenu médian disponible.",
  },
  {
    key: "publicSpendingGdp",
    label: "Dépenses publiques / PIB",
    shortLabel: "Dépenses pub.",
    unit: "percent",
    decimals: 0,
    higherIsBetter: null,
    source: "OCDE / FMI (~2022)",
    description: "Dépenses des administrations publiques en pourcentage du PIB.",
  },
  {
    key: "taxBurdenGdp",
    label: "Pression fiscale / PIB",
    shortLabel: "Pression fiscale",
    unit: "percent",
    decimals: 0,
    higherIsBetter: null,
    source: "OCDE — Revenue Statistics (~2022)",
    description: "Total des recettes fiscales (impôts + cotisations) en pourcentage du PIB.",
  },
];

export const INDICATOR_BY_KEY: Record<IndicatorKey, IndicatorMeta> = INDICATORS.reduce(
  (acc, ind) => {
    acc[ind.key] = ind;
    return acc;
  },
  {} as Record<IndicatorKey, IndicatorMeta>,
);
