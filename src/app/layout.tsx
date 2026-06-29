import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "Indice Liberté — Comparaison des pays",
  description:
    "Comparez les pays selon la liberté économique, le niveau de vie, la santé, l'éducation (PISA), la pauvreté et la fiscalité. Classements et graphiques de corrélation.",
};

const SOURCES: [string, string][] = [
  ["Heritage Foundation", "https://www.heritage.org/index/"],
  ["OCDE PISA", "https://www.oecd.org/pisa/"],
  ["OCDE fiscalité", "https://www.oecd.org/tax/revenue-statistics/"],
  ["OCDE pauvreté", "https://data.oecd.org/inequality/poverty-rate.htm"],
  ["Banque Mondiale", "https://data.worldbank.org/"],
  ["FMI WEO", "https://www.imf.org/en/Publications/WEO"],
  ["EIU Democracy", "https://www.eiu.com/n/campaigns/democracy-index-2022/"],
  ["RSF Presse", "https://rsf.org/fr/classement"],
];

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className="h-full">
      <body className="antialiased min-h-full flex flex-col">
        <Nav />
        <main className="flex-1 mx-auto max-w-6xl w-full px-4 py-10">{children}</main>
        <footer
          style={{
            borderTop: "1px solid var(--border)",
            padding: "1.5rem 0",
          }}
        >
          <div
            style={{
              maxWidth: "72rem",
              margin: "0 auto",
              padding: "0 1rem",
              display: "flex",
              flexWrap: "wrap",
              gap: "0.4rem 1rem",
              fontSize: "0.75rem",
              color: "var(--text-3)",
              alignItems: "center",
            }}
          >
            <span
              style={{
                color: "var(--gold)",
                fontFamily: "Fraunces, Georgia, serif",
                fontSize: "0.8125rem",
              }}
            >
              ◈
            </span>
            <span>Données indicatives (~2022-2026), à but exploratoire.</span>
            <span style={{ color: "var(--border-2)" }}>·</span>
            {SOURCES.map(([label, url], i) => (
              <span key={label}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  {label}
                </a>
                {i < SOURCES.length - 1 && (
                  <span style={{ color: "var(--border-2)", marginLeft: "1rem" }}>·</span>
                )}
              </span>
            ))}
            <span style={{ color: "var(--border-2)" }}>·</span>
            <span>Les corrélations n&apos;impliquent pas de causalité.</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
