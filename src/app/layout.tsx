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
          <div className="mx-auto max-w-6xl px-4">
            Données indicatives (~2022-2023), à but exploratoire. Sources : Heritage
            Foundation, OCDE (PISA, fiscalité, pauvreté), Banque Mondiale, FMI. Les
            corrélations affichées n&apos;impliquent pas de lien de causalité.
          </div>
        </footer>
      </body>
    </html>
  );
}
