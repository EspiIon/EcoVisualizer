import assert from "node:assert/strict";
import { test } from "node:test";
import { compositeScore, scaleTo100 } from "./normalize";
import type { Country } from "@/data/countries";

const B = { min: 0, max: 100 };

test("scaleTo100 : haut = mieux, projection linéaire", () => {
  assert.equal(scaleTo100(0, B, true), 0);
  assert.equal(scaleTo100(50, B, true), 50);
  assert.equal(scaleTo100(100, B, true), 100);
});

test("scaleTo100 : bas = mieux, échelle inversée", () => {
  assert.equal(scaleTo100(0, B, false), 100);
  assert.equal(scaleTo100(100, B, false), 0);
});

test("scaleTo100 : indicateur neutre traité comme haut = mieux", () => {
  assert.equal(scaleTo100(25, B, null), 25);
});

test("scaleTo100 : bornes dégénérées => null", () => {
  assert.equal(scaleTo100(5, { min: 5, max: 5 }, true), null);
});

test("compositeScore : moyenne pondérée des indicateurs disponibles", () => {
  // economicFreedom (haut=mieux) = 80 ; lifeExpectancy (haut=mieux) = 80
  const country = { economicFreedom: 80, lifeExpectancy: 80 } as unknown as Country;
  const bounds = { economicFreedom: { min: 0, max: 100 }, lifeExpectancy: { min: 60, max: 90 } };
  // ef -> 80, le -> (80-60)/30*100 = 66.7
  const score = compositeScore(country, { economicFreedom: 1, lifeExpectancy: 1 }, bounds);
  assert.ok(score !== null && Math.abs(score - 73.4) < 0.5);
});

test("compositeScore : poids renormalisés quand une valeur manque", () => {
  const country = { economicFreedom: 80 } as unknown as Country; // lifeExpectancy absent
  const bounds = { economicFreedom: { min: 0, max: 100 }, lifeExpectancy: { min: 60, max: 90 } };
  const score = compositeScore(country, { economicFreedom: 1, lifeExpectancy: 1 }, bounds);
  assert.equal(score, 80); // seul ef compte
});

test("compositeScore : aucune donnée => null", () => {
  const country = {} as unknown as Country;
  assert.equal(compositeScore(country, { economicFreedom: 1 }), null);
});
