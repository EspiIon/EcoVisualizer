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
    <div className="flex flex-col gap-6">
      <Link href="/classements" className="text-sm text-sky-600 hover:underline">
        ← Retour aux classements
      </Link>

      <div className="flex items-center gap-3">
        <span className="text-4xl">{country.flag}</span>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">{country.name}</h1>
          <span className="text-sm text-slate-500">{country.region}</span>
        </div>
      </div>

      <CountryRadar country={country} />

      <div className="grid gap-3 sm:grid-cols-2">
        {INDICATORS.map((ind) => {
          const value = country[ind.key];
          const rankInfo = getRank(country.code, ind.key);
          return (
            <div key={ind.key} className="rounded-lg border border-slate-200 bg-white p-4">
              <a
                href={ind.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-slate-500 hover:underline"
                title={ind.source}
              >
                {ind.label} ↗
              </a>
              <div className="flex items-baseline justify-between mt-1">
                <span className="text-xl font-semibold text-slate-800">
                  {formatValue(value, ind)}
                </span>
                {rankInfo && (
                  <span className="text-xs text-slate-500">
                    {rankInfo.rank}
                    <sup>{rankInfo.rank === 1 ? "er" : "e"}</sup> / {rankInfo.total}
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
