import type { IndicatorKey } from "./indicators";
import rawValues from "./values.json";

export type Region =
  | "Europe"
  | "Amériques"
  | "Asie-Pacifique"
  | "Moyen-Orient"
  | "Afrique";

export interface Country {
  code: string;
  name: string;
  flag: string;
  region: Region;
  economicFreedom?: number;
  democracyIndex?: number;
  pressFreedom?: number;
  gdpPerCapitaPpp?: number;
  lifeExpectancy?: number;
  pisaScore?: number;
  povertyRate?: number;
  publicSpendingGdp?: number;
  taxBurdenGdp?: number;
  hdi?: number;
  gini?: number;
  corruptionCpi?: number;
  happiness?: number;
}

// Les valeurs numériques sont dans src/data/values.json (généré par scripts/import-csv.ts)
const VALUES = rawValues as Record<string, Partial<Record<IndicatorKey, number>>>;

// Métadonnées statiques : code, nom, drapeau, région
const COUNTRY_META: Array<{ code: string; name: string; flag: string; region: Region }> = [
  // ── EUROPE ──────────────────────────────────────────────────────────────────
  { code: "CHE", name: "Suisse",             flag: "🇨🇭", region: "Europe" },
  { code: "IRL", name: "Irlande",            flag: "🇮🇪", region: "Europe" },
  { code: "ISL", name: "Islande",            flag: "🇮🇸", region: "Europe" },
  { code: "EST", name: "Estonie",            flag: "🇪🇪", region: "Europe" },
  { code: "LVA", name: "Lettonie",           flag: "🇱🇻", region: "Europe" },
  { code: "LTU", name: "Lituanie",           flag: "🇱🇹", region: "Europe" },
  { code: "LUX", name: "Luxembourg",         flag: "🇱🇺", region: "Europe" },
  { code: "NLD", name: "Pays-Bas",           flag: "🇳🇱", region: "Europe" },
  { code: "DNK", name: "Danemark",           flag: "🇩🇰", region: "Europe" },
  { code: "SWE", name: "Suède",              flag: "🇸🇪", region: "Europe" },
  { code: "FIN", name: "Finlande",           flag: "🇫🇮", region: "Europe" },
  { code: "NOR", name: "Norvège",            flag: "🇳🇴", region: "Europe" },
  { code: "DEU", name: "Allemagne",          flag: "🇩🇪", region: "Europe" },
  { code: "AUT", name: "Autriche",           flag: "🇦🇹", region: "Europe" },
  { code: "CZE", name: "Tchéquie",           flag: "🇨🇿", region: "Europe" },
  { code: "SVK", name: "Slovaquie",          flag: "🇸🇰", region: "Europe" },
  { code: "SVN", name: "Slovénie",           flag: "🇸🇮", region: "Europe" },
  { code: "HRV", name: "Croatie",            flag: "🇭🇷", region: "Europe" },
  { code: "BGR", name: "Bulgarie",           flag: "🇧🇬", region: "Europe" },
  { code: "ROU", name: "Roumanie",           flag: "🇷🇴", region: "Europe" },
  { code: "SRB", name: "Serbie",             flag: "🇷🇸", region: "Europe" },
  { code: "GBR", name: "Royaume-Uni",        flag: "🇬🇧", region: "Europe" },
  { code: "BEL", name: "Belgique",           flag: "🇧🇪", region: "Europe" },
  { code: "PRT", name: "Portugal",           flag: "🇵🇹", region: "Europe" },
  { code: "POL", name: "Pologne",            flag: "🇵🇱", region: "Europe" },
  { code: "ESP", name: "Espagne",            flag: "🇪🇸", region: "Europe" },
  { code: "HUN", name: "Hongrie",            flag: "🇭🇺", region: "Europe" },
  { code: "FRA", name: "France",             flag: "🇫🇷", region: "Europe" },
  { code: "ITA", name: "Italie",             flag: "🇮🇹", region: "Europe" },
  { code: "GRC", name: "Grèce",              flag: "🇬🇷", region: "Europe" },
  { code: "UKR", name: "Ukraine",            flag: "🇺🇦", region: "Europe" },
  { code: "BLR", name: "Biélorussie",        flag: "🇧🇾", region: "Europe" },
  { code: "RUS", name: "Russie",             flag: "🇷🇺", region: "Europe" },
  { code: "CYP", name: "Chypre",             flag: "🇨🇾", region: "Europe" },
  { code: "MLT", name: "Malte",              flag: "🇲🇹", region: "Europe" },
  { code: "ALB", name: "Albanie",            flag: "🇦🇱", region: "Europe" },
  { code: "MDA", name: "Moldavie",           flag: "🇲🇩", region: "Europe" },
  { code: "ARM", name: "Arménie",            flag: "🇦🇲", region: "Europe" },
  { code: "GEO", name: "Géorgie",            flag: "🇬🇪", region: "Europe" },

  // ── AMÉRIQUES ───────────────────────────────────────────────────────────────
  { code: "USA", name: "États-Unis",         flag: "🇺🇸", region: "Amériques" },
  { code: "CAN", name: "Canada",             flag: "🇨🇦", region: "Amériques" },
  { code: "URY", name: "Uruguay",            flag: "🇺🇾", region: "Amériques" },
  { code: "CHL", name: "Chili",              flag: "🇨🇱", region: "Amériques" },
  { code: "CRI", name: "Costa Rica",         flag: "🇨🇷", region: "Amériques" },
  { code: "COL", name: "Colombie",           flag: "🇨🇴", region: "Amériques" },
  { code: "PER", name: "Pérou",              flag: "🇵🇪", region: "Amériques" },
  { code: "MEX", name: "Mexique",            flag: "🇲🇽", region: "Amériques" },
  { code: "ARG", name: "Argentine",          flag: "🇦🇷", region: "Amériques" },
  { code: "BRA", name: "Brésil",             flag: "🇧🇷", region: "Amériques" },
  { code: "ECU", name: "Équateur",           flag: "🇪🇨", region: "Amériques" },
  { code: "BOL", name: "Bolivie",            flag: "🇧🇴", region: "Amériques" },
  { code: "VEN", name: "Venezuela",          flag: "🇻🇪", region: "Amériques" },
  { code: "PAN", name: "Panama",             flag: "🇵🇦", region: "Amériques" },
  { code: "PRY", name: "Paraguay",           flag: "🇵🇾", region: "Amériques" },
  { code: "DOM", name: "Rép. dominicaine",   flag: "🇩🇴", region: "Amériques" },
  { code: "JAM", name: "Jamaïque",           flag: "🇯🇲", region: "Amériques" },
  { code: "TTO", name: "Trinité-et-Tobago",  flag: "🇹🇹", region: "Amériques" },
  { code: "HND", name: "Honduras",           flag: "🇭🇳", region: "Amériques" },
  { code: "GTM", name: "Guatemala",          flag: "🇬🇹", region: "Amériques" },
  { code: "SLV", name: "Salvador",           flag: "🇸🇻", region: "Amériques" },
  { code: "CUB", name: "Cuba",               flag: "🇨🇺", region: "Amériques" },
  { code: "NIC", name: "Nicaragua",          flag: "🇳🇮", region: "Amériques" },

  // ── ASIE-PACIFIQUE ──────────────────────────────────────────────────────────
  { code: "SGP", name: "Singapour",          flag: "🇸🇬", region: "Asie-Pacifique" },
  { code: "TWN", name: "Taïwan",             flag: "🇹🇼", region: "Asie-Pacifique" },
  { code: "MYS", name: "Malaisie",           flag: "🇲🇾", region: "Asie-Pacifique" },
  { code: "NZL", name: "Nouvelle-Zélande",   flag: "🇳🇿", region: "Asie-Pacifique" },
  { code: "AUS", name: "Australie",          flag: "🇦🇺", region: "Asie-Pacifique" },
  { code: "KOR", name: "Corée du Sud",       flag: "🇰🇷", region: "Asie-Pacifique" },
  { code: "JPN", name: "Japon",              flag: "🇯🇵", region: "Asie-Pacifique" },
  { code: "THA", name: "Thaïlande",          flag: "🇹🇭", region: "Asie-Pacifique" },
  { code: "PHL", name: "Philippines",        flag: "🇵🇭", region: "Asie-Pacifique" },
  { code: "VNM", name: "Viêt Nam",           flag: "🇻🇳", region: "Asie-Pacifique" },
  { code: "IDN", name: "Indonésie",          flag: "🇮🇩", region: "Asie-Pacifique" },
  { code: "BGD", name: "Bangladesh",         flag: "🇧🇩", region: "Asie-Pacifique" },
  { code: "PAK", name: "Pakistan",           flag: "🇵🇰", region: "Asie-Pacifique" },
  { code: "IND", name: "Inde",               flag: "🇮🇳", region: "Asie-Pacifique" },
  { code: "CHN", name: "Chine",              flag: "🇨🇳", region: "Asie-Pacifique" },
  { code: "MNG", name: "Mongolie",           flag: "🇲🇳", region: "Asie-Pacifique" },
  { code: "LKA", name: "Sri Lanka",          flag: "🇱🇰", region: "Asie-Pacifique" },
  { code: "MMR", name: "Myanmar",            flag: "🇲🇲", region: "Asie-Pacifique" },
  { code: "KHM", name: "Cambodge",           flag: "🇰🇭", region: "Asie-Pacifique" },
  { code: "NPL", name: "Népal",              flag: "🇳🇵", region: "Asie-Pacifique" },

  // ── MOYEN-ORIENT ────────────────────────────────────────────────────────────
  { code: "ARE", name: "Émirats arabes",     flag: "🇦🇪", region: "Moyen-Orient" },
  { code: "QAT", name: "Qatar",              flag: "🇶🇦", region: "Moyen-Orient" },
  { code: "SAU", name: "Arabie saoudite",    flag: "🇸🇦", region: "Moyen-Orient" },
  { code: "JOR", name: "Jordanie",           flag: "🇯🇴", region: "Moyen-Orient" },
  { code: "ISR", name: "Israël",             flag: "🇮🇱", region: "Moyen-Orient" },
  { code: "IRN", name: "Iran",               flag: "🇮🇷", region: "Moyen-Orient" },
  { code: "TUR", name: "Turquie",            flag: "🇹🇷", region: "Moyen-Orient" },
  { code: "KWT", name: "Koweït",             flag: "🇰🇼", region: "Moyen-Orient" },
  { code: "BHR", name: "Bahreïn",            flag: "🇧🇭", region: "Moyen-Orient" },
  { code: "OMN", name: "Oman",               flag: "🇴🇲", region: "Moyen-Orient" },
  { code: "IRQ", name: "Irak",               flag: "🇮🇶", region: "Moyen-Orient" },
  { code: "LBN", name: "Liban",              flag: "🇱🇧", region: "Moyen-Orient" },
  { code: "YEM", name: "Yémen",              flag: "🇾🇪", region: "Moyen-Orient" },
  { code: "SYR", name: "Syrie",              flag: "🇸🇾", region: "Moyen-Orient" },
  { code: "AFG", name: "Afghanistan",        flag: "🇦🇫", region: "Moyen-Orient" },

  // ── AFRIQUE ─────────────────────────────────────────────────────────────────
  { code: "MUS", name: "Maurice",            flag: "🇲🇺", region: "Afrique" },
  { code: "MAR", name: "Maroc",              flag: "🇲🇦", region: "Afrique" },
  { code: "ZAF", name: "Afrique du Sud",     flag: "🇿🇦", region: "Afrique" },
  { code: "GHA", name: "Ghana",              flag: "🇬🇭", region: "Afrique" },
  { code: "KEN", name: "Kenya",              flag: "🇰🇪", region: "Afrique" },
  { code: "TZA", name: "Tanzanie",           flag: "🇹🇿", region: "Afrique" },
  { code: "EGY", name: "Égypte",             flag: "🇪🇬", region: "Afrique" },
  { code: "NGA", name: "Nigéria",            flag: "🇳🇬", region: "Afrique" },
  { code: "ETH", name: "Éthiopie",           flag: "🇪🇹", region: "Afrique" },
  { code: "TUN", name: "Tunisie",            flag: "🇹🇳", region: "Afrique" },
  { code: "DZA", name: "Algérie",            flag: "🇩🇿", region: "Afrique" },
  { code: "SEN", name: "Sénégal",            flag: "🇸🇳", region: "Afrique" },
  { code: "CIV", name: "Côte d'Ivoire",      flag: "🇨🇮", region: "Afrique" },
  { code: "CMR", name: "Cameroun",           flag: "🇨🇲", region: "Afrique" },
  { code: "BWA", name: "Botswana",           flag: "🇧🇼", region: "Afrique" },
  { code: "NAM", name: "Namibie",            flag: "🇳🇦", region: "Afrique" },
  { code: "RWA", name: "Rwanda",             flag: "🇷🇼", region: "Afrique" },
  { code: "UGA", name: "Ouganda",            flag: "🇺🇬", region: "Afrique" },
  { code: "ZMB", name: "Zambie",             flag: "🇿🇲", region: "Afrique" },
  { code: "AGO", name: "Angola",             flag: "🇦🇴", region: "Afrique" },
  { code: "MOZ", name: "Mozambique",         flag: "🇲🇿", region: "Afrique" },
  { code: "ZWE", name: "Zimbabwe",           flag: "🇿🇼", region: "Afrique" },
  { code: "MLI", name: "Mali",               flag: "🇲🇱", region: "Afrique" },
  { code: "SDN", name: "Soudan",             flag: "🇸🇩", region: "Afrique" },
  { code: "SOM", name: "Somalie",            flag: "🇸🇴", region: "Afrique" },
  { code: "COD", name: "RD Congo",           flag: "🇨🇩", region: "Afrique" },
  { code: "CAF", name: "Rép. centrafricaine",flag: "🇨🇫", region: "Afrique" },
];

export const COUNTRIES: Country[] = COUNTRY_META.map((m) => ({
  ...m,
  ...(VALUES[m.code] ?? {}),
}));

export const REGIONS: Region[] = [
  "Europe",
  "Amériques",
  "Asie-Pacifique",
  "Moyen-Orient",
  "Afrique",
];

export function getCountry(code: string): Country | undefined {
  return COUNTRIES.find((c) => c.code === code);
}

export function getValue(country: Country, key: IndicatorKey): number | undefined {
  return country[key];
}
