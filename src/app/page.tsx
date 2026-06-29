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
    <div style={{ display: "flex", flexDirection: "column", gap: "4rem" }}>

      {/* Hero */}
      <section style={{ paddingTop: "1rem" }}>
        <div style={{ marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <div style={{ width: "2rem", height: "1px", background: "var(--gold)" }} />
          <span
            style={{
              fontSize: "0.6875rem",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--gold)",
            }}
          >
            {COUNTRIES.length} pays · {INDICATORS.length} indicateurs
          </span>
        </div>

        <h1
          className="font-display"
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 700,
            lineHeight: 1.1,
            color: "var(--text)",
            maxWidth: "36rem",
            marginBottom: "1.25rem",
          }}
        >
          Comparer les pays,{" "}
          <span style={{ color: "var(--gold)" }}>au-delà</span>
          {" "}des idées reçues.
        </h1>

        <p
          style={{
            color: "var(--text-2)",
            maxWidth: "36rem",
            lineHeight: 1.7,
            marginBottom: "2rem",
            fontSize: "1rem",
          }}
        >
          <strong style={{ color: "var(--text)", fontWeight: 600 }}>Indice Liberté</strong> rassemble
          plusieurs indicateurs clés par pays — liberté économique, niveau de vie, santé, éducation,
          pauvreté et fiscalité — pour explorer comment ils se classent et se corrèlent.
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
          <Link href="/classements" className="btn-gold">
            Voir les classements →
          </Link>
          <Link href="/score" className="btn-outline">
            Score composite
          </Link>
          <Link href="/correlations" className="btn-outline">
            Corrélations
          </Link>
        </div>
      </section>

      {/* Top 5 liberté éco */}
      <section>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "1rem" }}>
          <h2
            className="font-display"
            style={{ fontSize: "1.125rem", fontWeight: 600, color: "var(--text)" }}
          >
            Top 5 — Liberté économique 2026
          </h2>
          <Link
            href="/classements"
            style={{ fontSize: "0.8125rem", color: "var(--text-3)" }}
          >
            Voir tout →
          </Link>
        </div>

        <div className="card" style={{ overflow: "hidden" }}>
          {topFreedom.map((c, i) => (
            <Link
              key={c.code}
              href={`/pays/${c.code}`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                padding: "0.85rem 1.25rem",
                borderBottom: i < topFreedom.length - 1 ? "1px solid var(--border)" : "none",
                textDecoration: "none",
              }}
            >
              <span
                className="font-mono-data"
                style={{
                  width: "1.5rem",
                  textAlign: "right",
                  color: i === 0 ? "var(--gold)" : "var(--text-3)",
                  fontSize: "0.8125rem",
                  fontWeight: i === 0 ? 700 : 400,
                }}
              >
                {i + 1}
              </span>
              <span style={{ fontSize: "1.5rem", lineHeight: 1 }}>{c.flag}</span>
              <span style={{ flex: 1, color: "var(--text)", fontWeight: 500, fontSize: "0.9375rem" }}>
                {c.name}
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div
                  style={{
                    width: "6rem",
                    height: "3px",
                    background: "var(--border)",
                    borderRadius: "2px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${c.economicFreedom ?? 0}%`,
                      background: "linear-gradient(90deg, var(--gold) 0%, #e8c85a 100%)",
                      borderRadius: "2px",
                    }}
                  />
                </div>
                <span
                  className="font-mono-data"
                  style={{ color: "var(--gold)", fontWeight: 700, fontSize: "0.9375rem", minWidth: "2.5rem", textAlign: "right" }}
                >
                  {formatValue(c.economicFreedom, INDICATORS[0])}
                </span>
              </div>
            </Link>
          ))}
        </div>
        <p style={{ fontSize: "0.75rem", color: "var(--text-3)", marginTop: "0.5rem" }}>
          {COUNTRIES.length} pays au total dans la base.
        </p>
      </section>

      {/* Indicateurs */}
      <section>
        <h2
          className="font-display"
          style={{ fontSize: "1.125rem", fontWeight: 600, color: "var(--text)", marginBottom: "1rem" }}
        >
          Les {INDICATORS.length} indicateurs suivis
        </h2>
        <div
          style={{
            display: "grid",
            gap: "0.75rem",
            gridTemplateColumns: "repeat(auto-fill, minmax(17rem, 1fr))",
          }}
        >
          {INDICATORS.map((ind) => (
            <div
              key={ind.key}
              className="card"
              style={{ padding: "1rem 1.25rem" }}
            >
              <div style={{ fontWeight: 600, color: "var(--text)", fontSize: "0.875rem", marginBottom: "0.35rem" }}>
                {ind.label}
              </div>
              <p style={{ fontSize: "0.8125rem", color: "var(--text-2)", lineHeight: 1.55, marginBottom: "0.6rem" }}>
                {ind.description}
              </p>
              <a
                href={ind.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: "0.7rem", color: "var(--text-3)" }}
              >
                {ind.source} ↗
              </a>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
