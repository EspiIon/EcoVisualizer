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

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>

      {/* Breadcrumb */}
      <Link
        href="/classements"
        style={{
          fontSize: "0.8125rem",
          color: "var(--text-3)",
          display: "inline-flex",
          alignItems: "center",
          gap: "0.35rem",
        }}
      >
        ← Retour aux classements
      </Link>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
        <span style={{ fontSize: "3.5rem", lineHeight: 1 }}>{country.flag}</span>
        <div>
          <h1
            className="font-display"
            style={{ fontSize: "2rem", fontWeight: 700, color: "var(--text)", lineHeight: 1.1 }}
          >
            {country.name}
          </h1>
          <span
            className="badge badge-gold"
            style={{ marginTop: "0.4rem", display: "inline-block" }}
          >
            {country.region}
          </span>
        </div>
      </div>

      {/* Radar */}
      <CountryRadar country={country} />

      {/* Indicator grid */}
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
            <div
              key={ind.key}
              className="card"
              style={{ padding: "1rem 1.25rem" }}
            >
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
                  <span
                    className="font-mono-data"
                    style={{ fontSize: "0.75rem", color: "var(--text-3)" }}
                  >
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

    </div>
  );
}
