import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "Indice Liberté — Comparaison des pays",
  description:
    "Comparez les pays selon la liberté économique, le niveau de vie, la santé, l'éducation (PISA), la pauvreté et la fiscalité. Classements et graphiques de corrélation.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className="h-full">
      <body className="antialiased min-h-full flex flex-col">
        <Nav />
        <main className="flex-1 mx-auto max-w-6xl w-full px-4 py-8">{children}</main>
        <footer className="border-t border-black/10 text-xs text-slate-500 py-4">
          <div className="mx-auto max-w-6xl px-4 flex flex-wrap gap-x-4 gap-y-1">
            <span>Données indicatives (~2022-2023), à but exploratoire.</span>
            <span className="flex flex-wrap gap-x-3 gap-y-1">
              {([
                ["Heritage Foundation", "https://www.heritage.org/index/"],
                ["OCDE PISA", "https://www.oecd.org/pisa/"],
                ["OCDE fiscalité", "https://www.oecd.org/tax/revenue-statistics/"],
                ["OCDE pauvreté", "https://data.oecd.org/inequality/poverty-rate.htm"],
                ["Banque Mondiale", "https://data.worldbank.org/"],
                ["FMI WEO", "https://www.imf.org/en/Publications/WEO"],
                ["EIU Democracy", "https://www.eiu.com/n/campaigns/democracy-index-2022/"],
                ["RSF Presse", "https://rsf.org/fr/classement"],
              ] as [string, string][]).map(([label, url]) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-slate-700"
                >
                  {label}
                </a>
              ))}
            </span>
            <span>Les corrélations n&apos;impliquent pas de causalité.</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
