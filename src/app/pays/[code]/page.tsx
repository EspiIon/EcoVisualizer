import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { COUNTRIES, getCountry } from "@/data/countries";
import { INDICATORS } from "@/data/indicators";
import { formatValue } from "@/lib/format";
import { getRank } from "@/lib/ranking";
import CountryRadar from "@/components/CountryRadar";

export function generateStaticParams() {
  return COUNTRIES.map((c) => ({ code: c.code }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ code: string }>;
}): Promise<Metadata> {
  const { code } = await params;
  const country = getCountry(code);
  return { title: country ? `${country.name} — Indice Liberté` : "Pays introuvable" };
}

export default async function PaysPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const country = getCountry(code);
  if (!country) notFound();

  // Navigation précédent / suivant dans l'ordre alphabétique
  const idx = COUNTRIES.findIndex((c) => c.code === code);
  const prevCountry = idx > 0 ? COUNTRIES[idx - 1] : COUNTRIES[COUNTRIES.length - 1];
  const nextCountry = idx < COUNTRIES.length - 1 ? COUNTRIES[idx + 1] : COUNTRIES[0];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>

      {/* Barre de navigation supérieure */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}
      >
        {/* Retour */}
        <Link
          href="/classements"
          className="btn-outline"
          style={{ fontSize: "0.8125rem", padding: "0.4rem 0.9rem" }}
        >
          ← Classements
        </Link>

        {/* Précédent / Suivant */}
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <Link
            href={`/pays/${prevCountry.code}`}
            className="btn-outline"
            style={{ fontSize: "0.8125rem", padding: "0.4rem 0.9rem" }}
            title={prevCountry.name}
          >
            ← {prevCountry.flag} {prevCountry.name}
          </Link>
          <Link
            href={`/pays/${nextCountry.code}`}
            className="btn-outline"
            style={{ fontSize: "0.8125rem", padding: "0.4rem 0.9rem" }}
            title={nextCountry.name}
          >
            {nextCountry.flag} {nextCountry.name} →
          </Link>
        </div>
      </div>

      {/* En-tête pays */}
      <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
        <span style={{ fontSize: "3.5rem", lineHeight: 1 }}>{country.flag}</span>
        <div>
          <h1
            className="font-display"
            style={{ fontSize: "2rem", fontWeight: 700, color: "var(--text)", lineHeight: 1.1 }}
          >
            {country.name}
          </h1>
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginTop: "0.4rem", flexWrap: "wrap" }}>
            <span className="badge badge-gold">{country.region}</span>
            <span style={{ fontSize: "0.75rem", color: "var(--text-3)" }}>
              {idx + 1} / {COUNTRIES.length} dans la base
            </span>
          </div>
        </div>
      </div>

      {/* Radar */}
      <CountryRadar country={country} />

      {/* Grille d'indicateurs */}
      <div
        style={{
          display: "grid",
          gap: "0.75rem",
          gridTemplateColumns: "repeat(auto-fill, minmax(16rem, 1fr))",
        }}
      >
        {INDICATORS.map((ind) => {
          const value = country[ind.key];
          const rankInfo = getRank(country.code, ind.key);
          return (
            <div key={ind.key} className="card" style={{ padding: "1rem 1.25rem" }}>
              <a
                href={ind.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: "0.75rem", color: "var(--text-3)" }}
              >
                {ind.label} ↗
              </a>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                  marginTop: "0.4rem",
                }}
              >
                <span
                  className="font-mono-data"
                  style={{
                    fontSize: "1.375rem",
                    fontWeight: 700,
                    color: value !== undefined ? "var(--text)" : "var(--text-3)",
                  }}
                >
                  {formatValue(value, ind)}
                </span>
                {rankInfo && (
                  <span className="font-mono-data" style={{ fontSize: "0.75rem", color: "var(--text-3)" }}>
                    <span style={{ color: rankInfo.rank <= 10 ? "var(--gold)" : "var(--text-2)" }}>
                      {rankInfo.rank}
                    </span>
                    <sup style={{ fontSize: "0.6rem" }}>
                      {rankInfo.rank === 1 ? "er" : "e"}
                    </sup>
                    <span> / {rankInfo.total}</span>
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation bas de page */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "0.5rem",
          paddingTop: "0.5rem",
          borderTop: "1px solid var(--border)",
        }}
      >
        <Link
          href={`/pays/${prevCountry.code}`}
          className="btn-outline"
          style={{ fontSize: "0.8125rem", padding: "0.4rem 0.9rem" }}
        >
          ← {prevCountry.flag} {prevCountry.name}
        </Link>

        <Link
          href="/classements"
          style={{ fontSize: "0.8125rem", color: "var(--text-3)" }}
        >
          ↑ Tous les classements
        </Link>

        <Link
          href={`/pays/${nextCountry.code}`}
          className="btn-outline"
          style={{ fontSize: "0.8125rem", padding: "0.4rem 0.9rem" }}
        >
          {nextCountry.flag} {nextCountry.name} →
        </Link>
      </div>

    </div>
  );
}
