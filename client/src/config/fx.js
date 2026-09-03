// src/config/fx.js
//
// One exchange rate for the whole site.
//
// Prices are quoted in dollars and shown in naira at the live rate. Naira is
// an indication, not a second price list — which is the point of pegging.
// Before this existed the rate card fetched the live rate while the booking
// flow used a rate pinned at 1,285.72, so the same plan showed two different
// naira figures depending on which page you were on.
//
// This module has no imports of its own, so both config/plans.js and
// data/ratePlans.js can use it without an import cycle.

/* Public, keyless, and sends Access-Control-Allow-Origin: *. */
const FX_ENDPOINT = "https://open.er-api.com/v6/latest/USD";

/* Used until the fetch resolves, and if it never does. Captured 2026-09-03. */
export const FALLBACK_RATE = 1333;

/* Naira figures are rounded to the nearest thousand. Quoting ₦199,950 implies
   a precision the exchange rate does not have. */
const ROUND_TO = 1000;

export async function getFxRate() {
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 5000);
    const res = await fetch(FX_ENDPOINT, { signal: ctrl.signal });
    clearTimeout(timer);
    const json = await res.json();
    if (json?.rates?.NGN) return json.rates.NGN;
  } catch {
    /* fall through to the pinned rate */
  }
  return FALLBACK_RATE;
}

/* The naira amount behind a dollar price, as a number. */
export const ngnAmount = (usd, rate) =>
  Math.round((usd * rate) / ROUND_TO) * ROUND_TO;

export const usdText = (usd) => `$${Number(usd).toLocaleString("en-US")}`;
export const ngnText = (ngn) => `₦${Number(ngn).toLocaleString("en-NG")}`;
export const toNGN = (usd, rate) => ngnText(ngnAmount(usd, rate));
