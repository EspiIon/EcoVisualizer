export type IndicatorKey =
  | "economicFreedom"
  | "gdpPerCapitaPpp"
  | "lifeExpectancy"
  | "pisaScore"
  | "povertyRate"
  | "publicSpendingGdp"
  | "taxBurdenGdp"
  | "democracyIndex"
  | "pressFreedom"
  | "hdi"
  | "gini"
  | "corruptionCpi"
  | "happiness";

export type Unit = "score" | "usd" | "years" | "percent" | "index10" | "ratio";

export interface IndicatorMeta {
  key: IndicatorKey;
  label: string;
  shortLabel: string;
  unit: Unit;
  decimals: number;
  higherIsBetter: boolean | null;
  source: string;
  sourceUrl: string;
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
    sourceUrl: "https://www.heritage.org/index/",
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
    sourceUrl: "https://www.eiu.com/n/campaigns/democracy-index-2022/",
    description: "Score de 0 à 10 évaluant le processus électoral, les libertés civiles, la culture politique et le gouvernement.",
  },
  {
    key: "pressFreedom",
    label: "Liberté de la presse",
    shortLabel: "Presse libre",
    unit: "score",
    decimals: 1,
    higherIsBetter: true,
    source: "RSF — Reporters sans frontières, Indice mondial 2023",
    sourceUrl: "https://rsf.org/fr/classement",
    description: "Score de 0 à 100 mesurant la liberté journalistique (conditions politiques, légales, économiques, de sécurité).",
  },
  {
    key: "gdpPerCapitaPpp",
    label: "PIB par habitant (PPA)",
    shortLabel: "PIB/hab. PPA",
    unit: "usd",
    decimals: 0,
    higherIsBetter: true,
    source: "Banque Mondiale — GDP per capita, PPP (~2023)",
    sourceUrl: "https://data.worldbank.org/indicator/NY.GDP.PCAP.PP.CD",
    description: "Niveau de vie matériel : PIB par habitant en parité de pouvoir d'achat.",
  },
  {
    key: "lifeExpectancy",
    label: "Espérance de vie",
    shortLabel: "Espérance de vie",
    unit: "years",
    decimals: 1,
    higherIsBetter: true,
    source: "Banque Mondiale — Life expectancy at birth (~2022)",
    sourceUrl: "https://data.worldbank.org/indicator/SP.DYN.LE00.IN",
    description: "Espérance de vie à la naissance, en années — indicateur synthétique de santé.",
  },
  {
    key: "pisaScore",
    label: "Score PISA moyen",
    shortLabel: "PISA",
    unit: "score",
    decimals: 0,
    higherIsBetter: true,
    source: "OCDE — PISA 2022 (moyenne maths / lecture / sciences)",
    sourceUrl: "https://www.oecd.org/pisa/",
    description: "Performance moyenne des élèves de 15 ans (maths, lecture, sciences).",
  },
  {
    key: "povertyRate",
    label: "Taux de pauvreté relative",
    shortLabel: "Pauvreté",
    unit: "percent",
    decimals: 1,
    higherIsBetter: false,
    source: "OCDE — Poverty rate, 50 % median income (~2021)",
    sourceUrl: "https://data.oecd.org/inequality/poverty-rate.htm",
    description: "Part de la population sous 50 % du revenu médian disponible.",
  },
  {
    key: "publicSpendingGdp",
    label: "Dépenses publiques / PIB",
    shortLabel: "Dépenses pub.",
    unit: "percent",
    decimals: 0,
    higherIsBetter: null,
    source: "FMI — World Economic Outlook, General government expenditure (~2022)",
    sourceUrl: "https://www.imf.org/en/Publications/WEO",
    description: "Dépenses des administrations publiques en pourcentage du PIB.",
  },
  {
    key: "taxBurdenGdp",
    label: "Pression fiscale / PIB",
    shortLabel: "Pression fiscale",
    unit: "percent",
    decimals: 0,
    higherIsBetter: null,
    source: "OCDE — Revenue Statistics, total tax revenue (~2022)",
    sourceUrl: "https://www.oecd.org/tax/revenue-statistics/",
    description: "Total des recettes fiscales (impôts + cotisations) en pourcentage du PIB.",
  },
  {
    key: "hdi",
    label: "Indice de développement humain (IDH)",
    shortLabel: "IDH",
    unit: "ratio",
    decimals: 3,
    higherIsBetter: true,
    source: "PNUD — Human Development Report 2021/22",
    sourceUrl: "https://hdr.undp.org/data-center/human-development-index",
    description: "Indice composite (0–1) combinant espérance de vie, éducation et revenu national par habitant.",
  },
  {
    key: "gini",
    label: "Coefficient de Gini (inégalités)",
    shortLabel: "Gini",
    unit: "score",
    decimals: 1,
    higherIsBetter: false,
    source: "Banque Mondiale — Gini index (~2021)",
    sourceUrl: "https://data.worldbank.org/indicator/SI.POV.GINI",
    description: "Mesure des inégalités de revenus (0 = égalité parfaite, 100 = inégalité maximale).",
  },
  {
    key: "corruptionCpi",
    label: "Indice de perception de la corruption (CPI)",
    shortLabel: "Corruption (CPI)",
    unit: "score",
    decimals: 0,
    higherIsBetter: true,
    source: "Transparency International — CPI 2022",
    sourceUrl: "https://www.transparency.org/en/cpi/2022",
    description: "Perception de la corruption du secteur public (0 = très corrompu, 100 = très intègre).",
  },
  {
    key: "happiness",
    label: "Indice du bonheur",
    shortLabel: "Bonheur",
    unit: "index10",
    decimals: 2,
    higherIsBetter: true,
    source: "World Happiness Report 2023 (échelle de Cantril)",
    sourceUrl: "https://worldhappiness.report/",
    description: "Évaluation moyenne de la vie par les habitants, de 0 à 10 (échelle de Cantril).",
  },
];

export const INDICATOR_BY_KEY: Record<IndicatorKey, IndicatorMeta> = INDICATORS.reduce(
  (acc, ind) => {
    acc[ind.key] = ind;
    return acc;
  },
  {} as Record<IndicatorKey, IndicatorMeta>,
);
