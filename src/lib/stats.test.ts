import assert from "node:assert/strict";
import { test } from "node:test";
import { interpretCorrelation, linearRegression, pearson } from "./stats";

test("pearson : corrélation parfaite positive (y = 2x) => 1", () => {
  const r = pearson([1, 2, 3, 4], [2, 4, 6, 8]);
  assert.ok(Math.abs(r - 1) < 1e-9);
});

test("pearson : corrélation parfaite négative => -1", () => {
  const r = pearson([1, 2, 3, 4], [8, 6, 4, 2]);
  assert.ok(Math.abs(r + 1) < 1e-9);
});

test("pearson : moins de 2 points => NaN", () => {
  assert.ok(Number.isNaN(pearson([1], [2])));
});

test("pearson : variance nulle => NaN", () => {
  assert.ok(Number.isNaN(pearson([1, 1, 1], [2, 4, 6])));
});

test("linearRegression : y = 2x + 1", () => {
  const fit = linearRegression([0, 1, 2, 3], [1, 3, 5, 7]);
  assert.ok(fit);
  assert.ok(Math.abs(fit.slope - 2) < 1e-9);
  assert.ok(Math.abs(fit.intercept - 1) < 1e-9);
});

test("interpretCorrelation : libellés cohérents", () => {
  assert.match(interpretCorrelation(0.95), /positive très forte/);
  assert.match(interpretCorrelation(-0.6), /négative assez forte/);
  assert.equal(interpretCorrelation(0.02), "Corrélation négligeable");
  assert.equal(interpretCorrelation(NaN), "Données insuffisantes");
});
