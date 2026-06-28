import Link from "next/link";
import { COUNTRIES } from "@/data/countries";
import { INDICATORS } from "@/data/indicators";
import { formatValue } from "@/lib/format";

export default function Home() {
  const topFreedom = [...COUNTRIES]
    .filter((c) => typeof c.economicFreedom === "number")
    .sort((a, b) => (b.economicFreedom ?? 0) - (a.economicFreedom ?? 0))
    .slice(0, 5);

  return (
    <div className="flex flex-col gap-12">
      <section className="flex flex-col gap-4">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
          Comparer les pays, au-delà des idées reçues
        </h1>
        <p className="text-slate-600 max-w-2xl">
          <strong>Indice Liberté</strong> rassemble plusieurs indicateurs clés par pays —
          liberté économique, niveau de vie, santé, éducation, pauvreté et fiscalité — pour
          explorer comment ils se classent et comment ils se corrèlent entre eux.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/classements"
            className="px-4 py-2 rounded-md bg-sky-600 text-white text-sm font-medium hover:bg-sky-700"
          >
            Voir les classements →
          </Link>
          <Link
            href="/correlations"
            className="px-4 py-2 rounded-md border border-slate-300 bg-white text-sm font-medium hover:bg-slate-50"
          >
            Explorer les corrélations
          </Link>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-slate-800 mb-3">
          Les {INDICATORS.length} indicateurs suivis
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {INDICATORS.map((ind) => (
            <div key={ind.key} className="rounded-lg border border-slate-200 bg-white p-4">
              <div className="font-medium text-slate-800">{ind.label}</div>
              <p className="text-sm text-slate-600 mt-1">{ind.description}</p>
              <div className="text-xs text-slate-400 mt-2">
                Source :{" "}
                <a
                  href={ind.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-slate-600"
                >
                  {ind.source}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-slate-800 mb-3">
          Top 5 — Liberté économique
        </h2>
        <ol className="rounded-lg border border-slate-200 bg-white divide-y divide-slate-100">
          {topFreedom.map((c, i) => (
            <li key={c.code} className="flex items-center gap-3 px-4 py-2.5">
              <span className="text-slate-400 w-5 tabular-nums">{i + 1}</span>
              <span className="text-lg">{c.flag}</span>
              <Link href={`/pays/${c.code}`} className="flex-1 hover:underline">
                {c.name}
              </Link>
              <span className="font-semibold tabular-nums text-slate-800">
                {formatValue(c.economicFreedom, INDICATORS[0])}
              </span>
            </li>
          ))}
        </ol>
        <p className="text-sm text-slate-500 mt-2">
          {COUNTRIES.length} pays au total dans la base.
        </p>
      </section>
    </div>
  );
}
