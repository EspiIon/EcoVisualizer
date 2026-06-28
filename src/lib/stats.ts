// Utilitaires statistiques (sans dépendance externe).

/**
 * Coefficient de corrélation linéaire de Pearson entre deux séries de même longueur.
 * Retourne NaN si moins de 2 points ou variance nulle.
 */
export function pearson(xs: number[], ys: number[]): number {
  const n = Math.min(xs.length, ys.length);
  if (n < 2) return NaN;

  let sumX = 0;
  let sumY = 0;
  for (let i = 0; i < n; i++) {
    sumX += xs[i];
    sumY += ys[i];
  }
  const meanX = sumX / n;
  const meanY = sumY / n;

  let cov = 0;
  let varX = 0;
  let varY = 0;
  for (let i = 0; i < n; i++) {
    const dx = xs[i] - meanX;
    const dy = ys[i] - meanY;
    cov += dx * dy;
    varX += dx * dx;
    varY += dy * dy;
  }

  const denom = Math.sqrt(varX * varY);
  if (denom === 0) return NaN;
  return cov / denom;
}

export interface LinearFit {
  slope: number;
  intercept: number;
}

/** Régression linéaire des moindres carrés : y = slope·x + intercept. */
export function linearRegression(xs: number[], ys: number[]): LinearFit | null {
  const n = Math.min(xs.length, ys.length);
  if (n < 2) return null;

  let sumX = 0;
  let sumY = 0;
  for (let i = 0; i < n; i++) {
    sumX += xs[i];
    sumY += ys[i];
  }
  const meanX = sumX / n;
  const meanY = sumY / n;

  let num = 0;
  let den = 0;
  for (let i = 0; i < n; i++) {
    const dx = xs[i] - meanX;
    num += dx * (ys[i] - meanY);
    den += dx * dx;
  }
  if (den === 0) return null;

  const slope = num / den;
  const intercept = meanY - slope * meanX;
  return { slope, intercept };
}

/** Interprétation qualitative (FR) d'un coefficient de corrélation. */
export function interpretCorrelation(r: number): string {
  if (Number.isNaN(r)) return "Données insuffisantes";
  const abs = Math.abs(r);
  const sens = r > 0 ? "positive" : "négative";
  let force: string;
  if (abs < 0.1) force = "négligeable";
  else if (abs < 0.3) force = "faible";
  else if (abs < 0.5) force = "modérée";
  else if (abs < 0.7) force = "assez forte";
  else if (abs < 0.9) force = "forte";
  else force = "très forte";
  if (abs < 0.1) return "Corrélation négligeable";
  return `Corrélation ${sens} ${force}`;
}
