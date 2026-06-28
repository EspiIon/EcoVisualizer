import type { IndicatorKey } from "./indicators";

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
}

// Données indicatives (~2022-2023), sources : Heritage 2023, EIU 2022, RSF 2023,
// FMI/BM 2023, OCDE PISA 2022. Valeurs manquantes = données non disponibles / non comparables.
export const COUNTRIES: Country[] = [
  // ── EUROPE ──────────────────────────────────────────────────────────────────
  { code: "CHE", name: "Suisse",          flag: "🇨🇭", region: "Europe",        economicFreedom: 83.8, democracyIndex: 9.14, pressFreedom: 85.1, gdpPerCapitaPpp: 89000,  lifeExpectancy: 84.0, pisaScore: 498, povertyRate: 9.9,  publicSpendingGdp: 34, taxBurdenGdp: 27 },
  { code: "IRL", name: "Irlande",         flag: "🇮🇪", region: "Europe",        economicFreedom: 82.0, democracyIndex: 9.05, pressFreedom: 84.1, gdpPerCapitaPpp: 126000, lifeExpectancy: 82.4, pisaScore: 504, povertyRate: 8.9,  publicSpendingGdp: 24, taxBurdenGdp: 21 },
  { code: "ISL", name: "Islande",         flag: "🇮🇸", region: "Europe",        economicFreedom: 77.9, democracyIndex: 9.52, pressFreedom: 92.3, gdpPerCapitaPpp: 78000,  lifeExpectancy: 82.7, pisaScore: 459, povertyRate: 7.5,  publicSpendingGdp: 44, taxBurdenGdp: 36 },
  { code: "EST", name: "Estonie",         flag: "🇪🇪", region: "Europe",        economicFreedom: 78.6, democracyIndex: 7.90, pressFreedom: 79.9, gdpPerCapitaPpp: 45000,  lifeExpectancy: 78.1, pisaScore: 516, povertyRate: 15.8, publicSpendingGdp: 41, taxBurdenGdp: 33 },
  { code: "LVA", name: "Lettonie",        flag: "🇱🇻", region: "Europe",        economicFreedom: 72.5, democracyIndex: 7.57, pressFreedom: 75.4, gdpPerCapitaPpp: 37000,  lifeExpectancy: 74.9, pisaScore: 481, povertyRate: 22.9, publicSpendingGdp: 43, taxBurdenGdp: 31 },
  { code: "LTU", name: "Lituanie",        flag: "🇱🇹", region: "Europe",        economicFreedom: 76.4, democracyIndex: 7.52, pressFreedom: 77.0, gdpPerCapitaPpp: 47000,  lifeExpectancy: 75.2, pisaScore: 478, povertyRate: 19.9, publicSpendingGdp: 40, taxBurdenGdp: 34 },
  { code: "LUX", name: "Luxembourg",      flag: "🇱🇺", region: "Europe",        economicFreedom: 78.4, democracyIndex: 8.68, pressFreedom: 79.1, gdpPerCapitaPpp: 142000, lifeExpectancy: 82.7, pisaScore: 466, povertyRate: 12.0, publicSpendingGdp: 43, taxBurdenGdp: 38 },
  { code: "NLD", name: "Pays-Bas",        flag: "🇳🇱", region: "Europe",        economicFreedom: 78.0, democracyIndex: 9.01, pressFreedom: 86.4, gdpPerCapitaPpp: 73000,  lifeExpectancy: 81.7, pisaScore: 488, povertyRate: 8.3,  publicSpendingGdp: 47, taxBurdenGdp: 38 },
  { code: "DNK", name: "Danemark",        flag: "🇩🇰", region: "Europe",        economicFreedom: 77.6, democracyIndex: 9.28, pressFreedom: 90.3, gdpPerCapitaPpp: 74000,  lifeExpectancy: 81.4, pisaScore: 489, povertyRate: 6.5,  publicSpendingGdp: 48, taxBurdenGdp: 43 },
  { code: "SWE", name: "Suède",           flag: "🇸🇪", region: "Europe",        economicFreedom: 77.5, democracyIndex: 9.39, pressFreedom: 88.2, gdpPerCapitaPpp: 67000,  lifeExpectancy: 83.1, pisaScore: 482, povertyRate: 9.3,  publicSpendingGdp: 49, taxBurdenGdp: 41 },
  { code: "FIN", name: "Finlande",        flag: "🇫🇮", region: "Europe",        economicFreedom: 77.1, democracyIndex: 9.29, pressFreedom: 87.9, gdpPerCapitaPpp: 60000,  lifeExpectancy: 81.9, pisaScore: 495, povertyRate: 6.7,  publicSpendingGdp: 53, taxBurdenGdp: 43 },
  { code: "NOR", name: "Norvège",         flag: "🇳🇴", region: "Europe",        economicFreedom: 76.9, democracyIndex: 9.81, pressFreedom: 95.2, gdpPerCapitaPpp: 82000,  lifeExpectancy: 83.2, pisaScore: 466, povertyRate: 8.0,  publicSpendingGdp: 46, taxBurdenGdp: 44 },
  { code: "DEU", name: "Allemagne",       flag: "🇩🇪", region: "Europe",        economicFreedom: 73.7, democracyIndex: 8.80, pressFreedom: 79.3, gdpPerCapitaPpp: 66000,  lifeExpectancy: 80.6, pisaScore: 480, povertyRate: 10.9, publicSpendingGdp: 49, taxBurdenGdp: 39 },
  { code: "AUT", name: "Autriche",        flag: "🇦🇹", region: "Europe",        economicFreedom: 71.4, democracyIndex: 8.20, pressFreedom: 79.1, gdpPerCapitaPpp: 69000,  lifeExpectancy: 81.1, pisaScore: 484, povertyRate: 9.8,  publicSpendingGdp: 52, taxBurdenGdp: 43 },
  { code: "CZE", name: "Tchéquie",        flag: "🇨🇿", region: "Europe",        economicFreedom: 71.9, democracyIndex: 7.97, pressFreedom: 76.6, gdpPerCapitaPpp: 50000,  lifeExpectancy: 79.1, pisaScore: 482, povertyRate: 6.1,  publicSpendingGdp: 45, taxBurdenGdp: 35 },
  { code: "SVK", name: "Slovaquie",       flag: "🇸🇰", region: "Europe",        economicFreedom: 68.2, democracyIndex: 7.15, pressFreedom: 68.8, gdpPerCapitaPpp: 36000,  lifeExpectancy: 76.9, pisaScore: 474, povertyRate: 13.3, publicSpendingGdp: 43, taxBurdenGdp: 34 },
  { code: "SVN", name: "Slovénie",        flag: "🇸🇮", region: "Europe",        economicFreedom: 63.1, democracyIndex: 7.93, pressFreedom: 74.8, gdpPerCapitaPpp: 48000,  lifeExpectancy: 81.3, pisaScore: 493, povertyRate: 12.7, publicSpendingGdp: 44, taxBurdenGdp: 38 },
  { code: "HRV", name: "Croatie",         flag: "🇭🇷", region: "Europe",        economicFreedom: 62.4, democracyIndex: 6.73, pressFreedom: 65.9, gdpPerCapitaPpp: 40000,  lifeExpectancy: 77.5, pisaScore: 472, povertyRate: 18.4, publicSpendingGdp: 46, taxBurdenGdp: 37 },
  { code: "BGR", name: "Bulgarie",        flag: "🇧🇬", region: "Europe",        economicFreedom: 68.9, democracyIndex: 6.65, pressFreedom: 54.7, gdpPerCapitaPpp: 28000,  lifeExpectancy: 73.6, pisaScore: 454, povertyRate: 22.1, publicSpendingGdp: 38, taxBurdenGdp: 31 },
  { code: "ROU", name: "Roumanie",        flag: "🇷🇴", region: "Europe",        economicFreedom: 66.5, democracyIndex: 6.49, pressFreedom: 60.1, gdpPerCapitaPpp: 38000,  lifeExpectancy: 74.3, pisaScore: 428, povertyRate: 23.4, publicSpendingGdp: 40, taxBurdenGdp: 28 },
  { code: "SRB", name: "Serbie",          flag: "🇷🇸", region: "Europe",        economicFreedom: 62.1, democracyIndex: 6.60, pressFreedom: 47.2, gdpPerCapitaPpp: 24000,  lifeExpectancy: 74.6, pisaScore: 440, povertyRate: 23.0, publicSpendingGdp: 40, taxBurdenGdp: 38 },
  { code: "GBR", name: "Royaume-Uni",     flag: "🇬🇧", region: "Europe",        economicFreedom: 69.9, democracyIndex: 8.54, pressFreedom: 78.6, gdpPerCapitaPpp: 56000,  lifeExpectancy: 80.7, pisaScore: 494, povertyRate: 11.2, publicSpendingGdp: 45, taxBurdenGdp: 35 },
  { code: "BEL", name: "Belgique",        flag: "🇧🇪", region: "Europe",        economicFreedom: 68.4, democracyIndex: 7.86, pressFreedom: 82.2, gdpPerCapitaPpp: 65000,  lifeExpectancy: 81.9, pisaScore: 487, povertyRate: 8.7,  publicSpendingGdp: 53, taxBurdenGdp: 42 },
  { code: "PRT", name: "Portugal",        flag: "🇵🇹", region: "Europe",        economicFreedom: 67.5, democracyIndex: 7.99, pressFreedom: 83.0, gdpPerCapitaPpp: 43000,  lifeExpectancy: 81.6, pisaScore: 472, povertyRate: 12.5, publicSpendingGdp: 46, taxBurdenGdp: 36 },
  { code: "POL", name: "Pologne",         flag: "🇵🇱", region: "Europe",        economicFreedom: 67.7, democracyIndex: 6.93, pressFreedom: 65.8, gdpPerCapitaPpp: 44000,  lifeExpectancy: 76.5, pisaScore: 489, povertyRate: 10.0, publicSpendingGdp: 45, taxBurdenGdp: 34 },
  { code: "ESP", name: "Espagne",         flag: "🇪🇸", region: "Europe",        economicFreedom: 65.0, democracyIndex: 7.94, pressFreedom: 71.3, gdpPerCapitaPpp: 50000,  lifeExpectancy: 83.2, pisaScore: 473, povertyRate: 14.7, publicSpendingGdp: 47, taxBurdenGdp: 38 },
  { code: "HUN", name: "Hongrie",         flag: "🇭🇺", region: "Europe",        economicFreedom: 64.4, democracyIndex: 6.47, pressFreedom: 47.5, gdpPerCapitaPpp: 42000,  lifeExpectancy: 74.5, pisaScore: 480, povertyRate: 8.0,  publicSpendingGdp: 49, taxBurdenGdp: 35 },
  { code: "FRA", name: "France",          flag: "🇫🇷", region: "Europe",        economicFreedom: 63.8, democracyIndex: 7.99, pressFreedom: 73.3, gdpPerCapitaPpp: 58000,  lifeExpectancy: 82.5, pisaScore: 474, povertyRate: 8.4,  publicSpendingGdp: 58, taxBurdenGdp: 46 },
  { code: "ITA", name: "Italie",          flag: "🇮🇹", region: "Europe",        economicFreedom: 62.0, democracyIndex: 7.69, pressFreedom: 71.7, gdpPerCapitaPpp: 54000,  lifeExpectancy: 83.2, pisaScore: 468, povertyRate: 14.2, publicSpendingGdp: 56, taxBurdenGdp: 43 },
  { code: "GRC", name: "Grèce",           flag: "🇬🇷", region: "Europe",        economicFreedom: 58.6, democracyIndex: 7.91, pressFreedom: 63.3, gdpPerCapitaPpp: 39000,  lifeExpectancy: 80.1, pisaScore: 450, povertyRate: 14.0, publicSpendingGdp: 53, taxBurdenGdp: 39 },
  { code: "UKR", name: "Ukraine",         flag: "🇺🇦", region: "Europe",        economicFreedom: 54.0, democracyIndex: 5.42, pressFreedom: 52.1, gdpPerCapitaPpp: 15000,  lifeExpectancy: 71.8,                                     publicSpendingGdp: 35, taxBurdenGdp: 33 },
  { code: "BLR", name: "Biélorussie",     flag: "🇧🇾", region: "Europe",        economicFreedom: 45.2, democracyIndex: 2.16, pressFreedom: 12.9, gdpPerCapitaPpp: 21000,  lifeExpectancy: 72.4,                                     publicSpendingGdp: 38, taxBurdenGdp: 36 },
  { code: "RUS", name: "Russie",          flag: "🇷🇺", region: "Europe",        economicFreedom: 53.8, democracyIndex: 2.28, pressFreedom: 22.9, gdpPerCapitaPpp: 38000,  lifeExpectancy: 70.0,                    povertyRate: 12.0, publicSpendingGdp: 36, taxBurdenGdp: 27 },

  // ── AMÉRIQUES ───────────────────────────────────────────────────────────────
  { code: "USA", name: "États-Unis",      flag: "🇺🇸", region: "Amériques",     economicFreedom: 70.6, democracyIndex: 7.85, pressFreedom: 71.7, gdpPerCapitaPpp: 80000,  lifeExpectancy: 76.4, pisaScore: 485, povertyRate: 18.0, publicSpendingGdp: 38, taxBurdenGdp: 27 },
  { code: "CAN", name: "Canada",          flag: "🇨🇦", region: "Amériques",     economicFreedom: 73.7, democracyIndex: 8.88, pressFreedom: 80.0, gdpPerCapitaPpp: 60000,  lifeExpectancy: 82.3, pisaScore: 506, povertyRate: 11.6, publicSpendingGdp: 42, taxBurdenGdp: 33 },
  { code: "URY", name: "Uruguay",         flag: "🇺🇾", region: "Amériques",     economicFreedom: 70.0, democracyIndex: 8.67, pressFreedom: 75.2, gdpPerCapitaPpp: 27000,  lifeExpectancy: 77.8, pisaScore: 421, povertyRate: 10.0, publicSpendingGdp: 32, taxBurdenGdp: 27 },
  { code: "CHL", name: "Chili",           flag: "🇨🇱", region: "Amériques",     economicFreedom: 71.1, democracyIndex: 8.00, pressFreedom: 65.3, gdpPerCapitaPpp: 30000,  lifeExpectancy: 80.2, pisaScore: 412, povertyRate: 16.5, publicSpendingGdp: 28, taxBurdenGdp: 21 },
  { code: "CRI", name: "Costa Rica",      flag: "🇨🇷", region: "Amériques",     economicFreedom: 64.3, democracyIndex: 8.12, pressFreedom: 72.3, gdpPerCapitaPpp: 25000,  lifeExpectancy: 79.8, pisaScore: 391, povertyRate: 20.0, publicSpendingGdp: 28, taxBurdenGdp: 23 },
  { code: "COL", name: "Colombie",        flag: "🇨🇴", region: "Amériques",     economicFreedom: 66.5, democracyIndex: 6.55, pressFreedom: 50.2, gdpPerCapitaPpp: 17000,  lifeExpectancy: 72.8, pisaScore: 391, povertyRate: 30.5, publicSpendingGdp: 35, taxBurdenGdp: 20 },
  { code: "PER", name: "Pérou",           flag: "🇵🇪", region: "Amériques",     economicFreedom: 67.9, democracyIndex: 5.51, pressFreedom: 53.4, gdpPerCapitaPpp: 15000,  lifeExpectancy: 73.5, pisaScore: 391, povertyRate: 30.0, publicSpendingGdp: 22, taxBurdenGdp: 17 },
  { code: "MEX", name: "Mexique",         flag: "🇲🇽", region: "Amériques",     economicFreedom: 64.9, democracyIndex: 5.57, pressFreedom: 45.8, gdpPerCapitaPpp: 23000,  lifeExpectancy: 75.1, pisaScore: 407, povertyRate: 16.6, publicSpendingGdp: 25, taxBurdenGdp: 17 },
  { code: "ARG", name: "Argentine",       flag: "🇦🇷", region: "Amériques",     economicFreedom: 51.2, democracyIndex: 6.84, pressFreedom: 65.8, gdpPerCapitaPpp: 27000,  lifeExpectancy: 76.5, pisaScore: 397,                    publicSpendingGdp: 38, taxBurdenGdp: 29 },
  { code: "BRA", name: "Brésil",          flag: "🇧🇷", region: "Amériques",     economicFreedom: 53.5, democracyIndex: 6.69, pressFreedom: 51.7, gdpPerCapitaPpp: 19000,  lifeExpectancy: 75.5, pisaScore: 401,                    publicSpendingGdp: 42, taxBurdenGdp: 33 },
  { code: "ECU", name: "Équateur",        flag: "🇪🇨", region: "Amériques",     economicFreedom: 51.6, democracyIndex: 5.32, pressFreedom: 50.8, gdpPerCapitaPpp: 12000,  lifeExpectancy: 74.5,                                     publicSpendingGdp: 26, taxBurdenGdp: 19 },
  { code: "BOL", name: "Bolivie",         flag: "🇧🇴", region: "Amériques",     economicFreedom: 40.2, democracyIndex: 5.30, pressFreedom: 51.3, gdpPerCapitaPpp: 10000,  lifeExpectancy: 67.3,                                     publicSpendingGdp: 35, taxBurdenGdp: 22 },
  { code: "VEN", name: "Venezuela",       flag: "🇻🇪", region: "Amériques",     economicFreedom: 25.2, democracyIndex: 2.23, pressFreedom: 25.2, gdpPerCapitaPpp: 8000,   lifeExpectancy: 72.0,                                     publicSpendingGdp: 30, taxBurdenGdp: 13 },

  // ── ASIE-PACIFIQUE ──────────────────────────────────────────────────────────
  { code: "SGP", name: "Singapour",       flag: "🇸🇬", region: "Asie-Pacifique", economicFreedom: 83.9, democracyIndex: 6.22, pressFreedom: 41.6, gdpPerCapitaPpp: 133000, lifeExpectancy: 83.5, pisaScore: 560,                    publicSpendingGdp: 18, taxBurdenGdp: 13 },
  { code: "TWN", name: "Taïwan",          flag: "🇹🇼", region: "Asie-Pacifique", economicFreedom: 80.7, democracyIndex: 8.99, pressFreedom: 72.4, gdpPerCapitaPpp: 73000,  lifeExpectancy: 80.4, pisaScore: 533,                    publicSpendingGdp: 19, taxBurdenGdp: 14 },
  { code: "MYS", name: "Malaisie",        flag: "🇲🇾", region: "Asie-Pacifique", economicFreedom: 70.9, democracyIndex: 7.30, pressFreedom: 53.0, gdpPerCapitaPpp: 34000,  lifeExpectancy: 76.9, pisaScore: 409,                    publicSpendingGdp: 25, taxBurdenGdp: 13 },
  { code: "NZL", name: "Nouvelle-Zélande",flag: "🇳🇿", region: "Asie-Pacifique", economicFreedom: 78.9, democracyIndex: 9.37, pressFreedom: 84.9, gdpPerCapitaPpp: 51000,  lifeExpectancy: 82.5, pisaScore: 495, povertyRate: 12.4, publicSpendingGdp: 40, taxBurdenGdp: 34 },
  { code: "AUS", name: "Australie",       flag: "🇦🇺", region: "Asie-Pacifique", economicFreedom: 74.8, democracyIndex: 8.71, pressFreedom: 72.8, gdpPerCapitaPpp: 66000,  lifeExpectancy: 83.3, pisaScore: 498, povertyRate: 12.6, publicSpendingGdp: 38, taxBurdenGdp: 30 },
  { code: "KOR", name: "Corée du Sud",    flag: "🇰🇷", region: "Asie-Pacifique", economicFreedom: 73.7, democracyIndex: 8.03, pressFreedom: 67.7, gdpPerCapitaPpp: 54000,  lifeExpectancy: 83.5, pisaScore: 520, povertyRate: 15.3, publicSpendingGdp: 38, taxBurdenGdp: 32 },
  { code: "JPN", name: "Japon",           flag: "🇯🇵", region: "Asie-Pacifique", economicFreedom: 69.3, democracyIndex: 8.40, pressFreedom: 68.1, gdpPerCapitaPpp: 51000,  lifeExpectancy: 84.5, pisaScore: 533, povertyRate: 15.7, publicSpendingGdp: 44, taxBurdenGdp: 34 },
  { code: "THA", name: "Thaïlande",       flag: "🇹🇭", region: "Asie-Pacifique", economicFreedom: 67.3, democracyIndex: 4.37, pressFreedom: 37.5, gdpPerCapitaPpp: 22000,  lifeExpectancy: 79.3, pisaScore: 395,                    publicSpendingGdp: 29, taxBurdenGdp: 17 },
  { code: "PHL", name: "Philippines",     flag: "🇵🇭", region: "Asie-Pacifique", economicFreedom: 63.8, democracyIndex: 6.36, pressFreedom: 53.6, gdpPerCapitaPpp: 10500,  lifeExpectancy: 71.2, pisaScore: 355,                    publicSpendingGdp: 22, taxBurdenGdp: 14 },
  { code: "VNM", name: "Viêt Nam",        flag: "🇻🇳", region: "Asie-Pacifique", economicFreedom: 60.6, democracyIndex: 2.89, pressFreedom: 25.1, gdpPerCapitaPpp: 13000,  lifeExpectancy: 73.6,                                     publicSpendingGdp: 28, taxBurdenGdp: 19 },
  { code: "IDN", name: "Indonésie",       flag: "🇮🇩", region: "Asie-Pacifique", economicFreedom: 64.2, democracyIndex: 6.71, pressFreedom: 57.4, gdpPerCapitaPpp: 15000,  lifeExpectancy: 67.6, pisaScore: 372,                    publicSpendingGdp: 18, taxBurdenGdp: 12 },
  { code: "BGD", name: "Bangladesh",      flag: "🇧🇩", region: "Asie-Pacifique", economicFreedom: 52.0, democracyIndex: 5.87, pressFreedom: 38.6, gdpPerCapitaPpp: 6000,   lifeExpectancy: 73.6,                                     publicSpendingGdp: 15, taxBurdenGdp: 8  },
  { code: "PAK", name: "Pakistan",        flag: "🇵🇰", region: "Asie-Pacifique", economicFreedom: 44.8, democracyIndex: 4.26, pressFreedom: 35.6, gdpPerCapitaPpp: 6500,   lifeExpectancy: 67.3,                                     publicSpendingGdp: 20, taxBurdenGdp: 13 },
  { code: "IND", name: "Inde",            flag: "🇮🇳", region: "Asie-Pacifique", economicFreedom: 52.9, democracyIndex: 7.04, pressFreedom: 41.1, gdpPerCapitaPpp: 9000,   lifeExpectancy: 67.7,                                     publicSpendingGdp: 28, taxBurdenGdp: 18 },
  { code: "CHN", name: "Chine",           flag: "🇨🇳", region: "Asie-Pacifique", economicFreedom: 48.3, democracyIndex: 1.94, pressFreedom: 23.0, gdpPerCapitaPpp: 23000,  lifeExpectancy: 78.2,                                     publicSpendingGdp: 33, taxBurdenGdp: 20 },

  // ── MOYEN-ORIENT ────────────────────────────────────────────────────────────
  { code: "ARE", name: "Émirats arabes",  flag: "🇦🇪", region: "Moyen-Orient",  economicFreedom: 67.8, democracyIndex: 2.76, pressFreedom: 21.2, gdpPerCapitaPpp: 79000,  lifeExpectancy: 78.7,  pisaScore: 435,                   publicSpendingGdp: 30, taxBurdenGdp: 2  },
  { code: "QAT", name: "Qatar",           flag: "🇶🇦", region: "Moyen-Orient",  economicFreedom: 63.9, democracyIndex: 3.19, pressFreedom: 31.7, gdpPerCapitaPpp: 124000, lifeExpectancy: 80.5,  pisaScore: 414,                   publicSpendingGdp: 36, taxBurdenGdp: 14 },
  { code: "SAU", name: "Arabie saoudite", flag: "🇸🇦", region: "Moyen-Orient",  economicFreedom: 60.3, democracyIndex: 2.08, pressFreedom: 17.8, gdpPerCapitaPpp: 59000,  lifeExpectancy: 76.6,  pisaScore: 373,                   publicSpendingGdp: 35, taxBurdenGdp: 5  },
  { code: "JOR", name: "Jordanie",        flag: "🇯🇴", region: "Moyen-Orient",  economicFreedom: 63.1, democracyIndex: 3.91, pressFreedom: 40.8, gdpPerCapitaPpp: 11000,  lifeExpectancy: 74.8,  pisaScore: 375,                   publicSpendingGdp: 30, taxBurdenGdp: 18 },
  { code: "ISR", name: "Israël",          flag: "🇮🇱", region: "Moyen-Orient",  economicFreedom: 68.0, democracyIndex: 7.93, pressFreedom: 57.1, gdpPerCapitaPpp: 49000,  lifeExpectancy: 82.6,  pisaScore: 458, povertyRate: 16.9, publicSpendingGdp: 41, taxBurdenGdp: 32 },
  { code: "IRN", name: "Iran",            flag: "🇮🇷", region: "Moyen-Orient",  economicFreedom: 44.0, democracyIndex: 1.96, pressFreedom: 18.2, gdpPerCapitaPpp: 18000,  lifeExpectancy: 76.1,                                     publicSpendingGdp: 20, taxBurdenGdp: 9  },
  { code: "TUR", name: "Turquie",         flag: "🇹🇷", region: "Moyen-Orient",  economicFreedom: 56.0, democracyIndex: 4.35, pressFreedom: 31.3, gdpPerCapitaPpp: 41000,  lifeExpectancy: 76.0,  pisaScore: 448, povertyRate: 14.4, publicSpendingGdp: 34, taxBurdenGdp: 21 },

  // ── AFRIQUE ─────────────────────────────────────────────────────────────────
  { code: "MUS", name: "Maurice",         flag: "🇲🇺", region: "Afrique",       economicFreedom: 73.3, democracyIndex: 8.14, pressFreedom: 67.2, gdpPerCapitaPpp: 25000,  lifeExpectancy: 74.8,                                     publicSpendingGdp: 24, taxBurdenGdp: 20 },
  { code: "MAR", name: "Maroc",           flag: "🇲🇦", region: "Afrique",       economicFreedom: 59.0, democracyIndex: 4.43, pressFreedom: 39.5, gdpPerCapitaPpp: 9500,   lifeExpectancy: 74.3,  pisaScore: 338,                   publicSpendingGdp: 32, taxBurdenGdp: 26 },
  { code: "ZAF", name: "Afrique du Sud",  flag: "🇿🇦", region: "Afrique",       economicFreedom: 58.9, democracyIndex: 7.05, pressFreedom: 53.0, gdpPerCapitaPpp: 16000,  lifeExpectancy: 62.3,                                     publicSpendingGdp: 33, taxBurdenGdp: 27 },
  { code: "GHA", name: "Ghana",           flag: "🇬🇭", region: "Afrique",       economicFreedom: 59.0, democracyIndex: 6.43, pressFreedom: 59.2, gdpPerCapitaPpp: 6500,   lifeExpectancy: 63.8,                                     publicSpendingGdp: 26, taxBurdenGdp: 15 },
  { code: "KEN", name: "Kenya",           flag: "🇰🇪", region: "Afrique",       economicFreedom: 53.7, democracyIndex: 4.77, pressFreedom: 58.2, gdpPerCapitaPpp: 5500,   lifeExpectancy: 63.7,                                     publicSpendingGdp: 28, taxBurdenGdp: 17 },
  { code: "TZA", name: "Tanzanie",        flag: "🇹🇿", region: "Afrique",       economicFreedom: 54.5, democracyIndex: 4.05, pressFreedom: 47.4, gdpPerCapitaPpp: 3300,   lifeExpectancy: 66.9,                                     publicSpendingGdp: 21, taxBurdenGdp: 13 },
  { code: "EGY", name: "Égypte",          flag: "🇪🇬", region: "Afrique",       economicFreedom: 49.7, democracyIndex: 2.93, pressFreedom: 27.4, gdpPerCapitaPpp: 14000,  lifeExpectancy: 70.2,                                     publicSpendingGdp: 29, taxBurdenGdp: 15 },
  { code: "NGA", name: "Nigéria",         flag: "🇳🇬", region: "Afrique",       economicFreedom: 53.0, democracyIndex: 4.23, pressFreedom: 49.6, gdpPerCapitaPpp: 5500,   lifeExpectancy: 53.4,                                     publicSpendingGdp: 12, taxBurdenGdp: 6  },
  { code: "ETH", name: "Éthiopie",        flag: "🇪🇹", region: "Afrique",       economicFreedom: 46.2, democracyIndex: 3.43, pressFreedom: 35.7, gdpPerCapitaPpp: 2800,   lifeExpectancy: 66.6,                                     publicSpendingGdp: 17, taxBurdenGdp: 11 },
];

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
