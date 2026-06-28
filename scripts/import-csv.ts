#!/usr/bin/env tsx
/**
 * Importe les données d'un CSV dans src/data/values.json
 *
 * Usage:
 *   npm run import-csv -- --indicator economicFreedom --file liberte.csv
 *
 * Le CSV doit avoir au minimum une colonne "Country" (nom anglais) et une colonne
 * contenant la valeur numérique. Par défaut la colonne de valeur est "Overall Score"
 * mais tu peux en préciser une autre avec --column "Score".
 *
 * Les lignes avec "N/A" ou vides sont ignorées (valeur supprimée du dataset).
 */

import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

// ── Mapping nom anglais → code ISO3 ──────────────────────────────────────────
const NAME_TO_CODE: Record<string, string> = {
  "Afghanistan": "AFG",
  "Albania": "ALB",
  "Algeria": "DZA",
  "Angola": "AGO",
  "Argentina": "ARG",
  "Armenia": "ARM",
  "Australia": "AUS",
  "Austria": "AUT",
  "Azerbaijan": "AZE",
  "Bahrain": "BHR",
  "Bangladesh": "BGD",
  "Barbados": "BRB",
  "Belarus": "BLR",
  "Belgium": "BEL",
  "Belize": "BLZ",
  "Benin": "BEN",
  "Bhutan": "BTN",
  "Bolivia": "BOL",
  "Bosnia and Herzegovina": "BIH",
  "Botswana": "BWA",
  "Brazil": "BRA",
  "Brunei Darussalam": "BRN",
  "Bulgaria": "BGR",
  "Burkina Faso": "BFA",
  "Burma": "MMR",
  "Myanmar": "MMR",
  "Burundi": "BDI",
  "Cabo Verde": "CPV",
  "Cambodia": "KHM",
  "Cameroon": "CMR",
  "Canada": "CAN",
  "Central African Republic": "CAF",
  "Chad": "TCD",
  "Chile": "CHL",
  "China": "CHN",
  "Colombia": "COL",
  "Comoros": "COM",
  "Congo, Dem. Rep.": "COD",
  "Democratic Republic of Congo": "COD",
  "DR Congo": "COD",
  "Republic of Congo": "COG",
  "Congo, Rep.": "COG",
  "Costa Rica": "CRI",
  "Côte d'Ivoire": "CIV",
  "Cote d'Ivoire": "CIV",
  "Ivory Coast": "CIV",
  "Croatia": "HRV",
  "Cuba": "CUB",
  "Cyprus": "CYP",
  "Czech Republic": "CZE",
  "Czechia": "CZE",
  "Denmark": "DNK",
  "Djibouti": "DJI",
  "Dominica": "DMA",
  "Dominican Republic": "DOM",
  "Ecuador": "ECU",
  "Egypt": "EGY",
  "El Salvador": "SLV",
  "Equatorial Guinea": "GNQ",
  "Eritrea": "ERI",
  "Estonia": "EST",
  "Eswatini": "SWZ",
  "Ethiopia": "ETH",
  "Fiji": "FJI",
  "Finland": "FIN",
  "France": "FRA",
  "Gabon": "GAB",
  "Georgia": "GEO",
  "Germany": "DEU",
  "Ghana": "GHA",
  "Greece": "GRC",
  "Guatemala": "GTM",
  "Guinea": "GIN",
  "Guinea-Bissau": "GNB",
  "Guyana": "GUY",
  "Haiti": "HTI",
  "Honduras": "HND",
  "Hungary": "HUN",
  "Iceland": "ISL",
  "India": "IND",
  "Indonesia": "IDN",
  "Iran": "IRN",
  "Iraq": "IRQ",
  "Ireland": "IRL",
  "Israel": "ISR",
  "Italy": "ITA",
  "Jamaica": "JAM",
  "Japan": "JPN",
  "Jordan": "JOR",
  "Kazakhstan": "KAZ",
  "Kenya": "KEN",
  "Kiribati": "KIR",
  "Kosovo": "XKX",
  "Kuwait": "KWT",
  "Kyrgyz Republic": "KGZ",
  "Kyrgyzstan": "KGZ",
  "Laos": "LAO",
  "Latvia": "LVA",
  "Lebanon": "LBN",
  "Lesotho": "LSO",
  "Liberia": "LBR",
  "Libya": "LBY",
  "Liechtenstein": "LIE",
  "Lithuania": "LTU",
  "Luxembourg": "LUX",
  "Madagascar": "MDG",
  "Malawi": "MWI",
  "Malaysia": "MYS",
  "Maldives": "MDV",
  "Mali": "MLI",
  "Malta": "MLT",
  "Mauritania": "MRT",
  "Mauritius": "MUS",
  "Mexico": "MEX",
  "Micronesia": "FSM",
  "Moldova": "MDA",
  "Mongolia": "MNG",
  "Montenegro": "MNE",
  "Morocco": "MAR",
  "Mozambique": "MOZ",
  "Namibia": "NAM",
  "Nepal": "NPL",
  "Netherlands": "NLD",
  "New Zealand": "NZL",
  "Nicaragua": "NIC",
  "Niger": "NER",
  "Nigeria": "NGA",
  "North Korea": "PRK",
  "North Macedonia": "MKD",
  "Norway": "NOR",
  "Oman": "OMN",
  "Pakistan": "PAK",
  "Panama": "PAN",
  "Papua New Guinea": "PNG",
  "Paraguay": "PRY",
  "Peru": "PER",
  "Philippines": "PHL",
  "The Philippines": "PHL",
  "Poland": "POL",
  "Portugal": "PRT",
  "Qatar": "QAT",
  "Romania": "ROU",
  "Russia": "RUS",
  "Rwanda": "RWA",
  "Saint Lucia": "LCA",
  "Saint Vincent and the Grenadines": "VCT",
  "Samoa": "WSM",
  "São Tomé and Príncipe": "STP",
  "Saudi Arabia": "SAU",
  "Senegal": "SEN",
  "Serbia": "SRB",
  "Seychelles": "SYC",
  "Sierra Leone": "SLE",
  "Singapore": "SGP",
  "Slovakia": "SVK",
  "Slovenia": "SVN",
  "Solomon Islands": "SLB",
  "Somalia": "SOM",
  "South Africa": "ZAF",
  "South Korea": "KOR",
  "Korea, Rep.": "KOR",
  "Spain": "ESP",
  "Sri Lanka": "LKA",
  "Sudan": "SDN",
  "Suriname": "SUR",
  "Sweden": "SWE",
  "Switzerland": "CHE",
  "Syria": "SYR",
  "Taiwan": "TWN",
  "Tajikistan": "TJK",
  "Tanzania": "TZA",
  "Thailand": "THA",
  "The Bahamas": "BHS",
  "Bahamas": "BHS",
  "The Gambia": "GMB",
  "Gambia": "GMB",
  "Timor-Leste": "TLS",
  "Togo": "TGO",
  "Tonga": "TON",
  "Trinidad and Tobago": "TTO",
  "Tunisia": "TUN",
  "Turkey": "TUR",
  "Türkiye": "TUR",
  "Turkmenistan": "TKM",
  "Uganda": "UGA",
  "Ukraine": "UKR",
  "United Arab Emirates": "ARE",
  "United Kingdom": "GBR",
  "United States": "USA",
  "Uruguay": "URY",
  "Uzbekistan": "UZB",
  "Vanuatu": "VUT",
  "Venezuela": "VEN",
  "Vietnam": "VNM",
  "Viet Nam": "VNM",
  "Yemen": "YEM",
  "Zambia": "ZMB",
  "Zimbabwe": "ZWE",
};

// ── Parsing des arguments ─────────────────────────────────────────────────────
function getArg(name: string): string | undefined {
  const idx = process.argv.indexOf(`--${name}`);
  return idx !== -1 ? process.argv[idx + 1] : undefined;
}

const indicator = getArg("indicator");
const file = getArg("file");
const column = getArg("column") ?? "Overall Score";

if (!indicator || !file) {
  console.error("Usage: npm run import-csv -- --indicator <key> --file <path.csv> [--column <colName>]");
  console.error("Exemple: npm run import-csv -- --indicator economicFreedom --file liberte.csv");
  process.exit(1);
}

// ── Lecture du CSV ────────────────────────────────────────────────────────────
const csvPath = resolve(file);
const csvText = readFileSync(csvPath, "utf-8");
const lines = csvText.split(/\r?\n/).filter((l) => l.trim());

if (lines.length < 2) {
  console.error("CSV vide ou sans données.");
  process.exit(1);
}

// Parse header
const headers = lines[0].split(",").map((h) => h.trim().replace(/^"|"$/g, ""));
const countryCol = headers.indexOf("Country");
const valueCol = headers.indexOf(column);

if (countryCol === -1) {
  console.error(`Colonne "Country" introuvable. Colonnes disponibles: ${headers.join(", ")}`);
  process.exit(1);
}
if (valueCol === -1) {
  console.error(`Colonne "${column}" introuvable. Colonnes disponibles: ${headers.join(", ")}`);
  console.error(`Utilise --column "NomDeLaColonne" pour préciser la bonne colonne.`);
  process.exit(1);
}

// ── Lecture du values.json ────────────────────────────────────────────────────
const valuesPath = resolve("src/data/values.json");
const values: Record<string, Record<string, number>> = JSON.parse(
  readFileSync(valuesPath, "utf-8")
);

// ── Traitement des lignes ─────────────────────────────────────────────────────
let updated = 0;
let skipped = 0;
let unknown = 0;

for (let i = 1; i < lines.length; i++) {
  const cols = lines[i].split(",").map((c) => c.trim().replace(/^"|"$/g, ""));
  const countryName = cols[countryCol];
  const rawValue = cols[valueCol];

  if (!countryName) continue;

  const code = NAME_TO_CODE[countryName];
  if (!code) {
    console.warn(`  ⚠ Pays inconnu: "${countryName}" — ignoré`);
    unknown++;
    continue;
  }

  if (!rawValue || rawValue === "N/A" || rawValue === "") {
    // Supprimer la valeur si elle existait
    if (values[code]?.[indicator] !== undefined) {
      delete values[code][indicator];
      console.log(`  ✗ ${code} (${countryName}): ${indicator} supprimé (N/A)`);
    }
    skipped++;
    continue;
  }

  const num = parseFloat(rawValue);
  if (isNaN(num)) {
    console.warn(`  ⚠ Valeur non numérique pour ${countryName}: "${rawValue}" — ignoré`);
    skipped++;
    continue;
  }

  if (!values[code]) values[code] = {};
  values[code][indicator] = num;
  updated++;
}

// ── Écriture du values.json mis à jour ───────────────────────────────────────
// Trier les clés de façon stable
const sorted: Record<string, Record<string, number>> = {};
for (const code of Object.keys(values).sort()) {
  sorted[code] = values[code];
}

writeFileSync(valuesPath, JSON.stringify(sorted, null, 2) + "\n");

console.log(`\n✅ Import terminé:`);
console.log(`   ${updated} pays mis à jour`);
console.log(`   ${skipped} lignes ignorées (N/A ou vide)`);
console.log(`   ${unknown} pays non reconnus`);
console.log(`   → src/data/values.json mis à jour`);
