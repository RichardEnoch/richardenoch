// Shared plan/pricing config — single source of truth for the booking flow
// (and plan keys used by the Rate Card CTAs). Mirrored on the server in
// server/config/plans.js — keep the two in sync when prices change.

import { FALLBACK_RATE, getFxRate } from "./fx";

export const OWNER = {
  name: "Richard Enoch",
  fullName: "Adesiyan Richard Enoch",
  title: "Brand Identity & Product Designer",
  email: "des.richardenoch@gmail.com",
  whatsapp: "0903 852 2066",
  whatsappIntl: "2349038522066",
  site: "richardenoch.vercel.app",
};

/* PRICING — the brand tiers, in dollars.
   The rate is no longer pinned here. It was pinned at 1,285.72 so Gold
   landed on exactly NGN 450,000, which meant the booking flow and the rate
   card quoted two different naira figures for the same plan as soon as the
   market moved. Both now read config/fx.js. */
export const PRICING = {
  USD: { silver: 450, gold: 1200, platinum: 2500 },
  RATE_OVERRIDE: null, // the rate is never pinned — see config/fx.js
  FALLBACK_RATE,
  ROUND_TO: 1000,
};

export const DEPOSIT_PCT = 70;

export const PLANS = {
  silver: {
    label: "Silver",
    website: false,
    blurb: "For small businesses starting out that need a subtle identity.",
    deliverables: [
      "Logo Design",
      "Colour Palette",
      "Typography",
      "Business Card",
      "2 Social Media Designs",
      "1 Social Media Banner",
      "1 Merch Design",
      "2 Mockup Images",
      "2 Revision Rounds",
      "Final files: JPEG, PNG",
    ],
  },
  gold: {
    label: "Gold",
    website: false,
    blurb: "Launch your brand with everything you need to stand out.",
    deliverables: [
      "Logo Design",
      "Colour Palette",
      "Typography",
      "Brand Patterns / Textures",
      "Business Card",
      "Email Signature",
      "Letterhead",
      "Presentation / Deck Template",
      "Brand Guideline (15–30 pages)",
      "2 Social Media Designs",
      "3 Social Media Banners",
      "2 Marketing Designs",
      "4 Merch Designs",
      "7 Mockup Images",
      "3 Revision Rounds",
      "Final files: JPEG, PNG, SVG",
    ],
  },
  platinum: {
    label: "Platinum",
    website: false,
    blurb: "The complete system, documented well enough to be run without me.",
    deliverables: [
      "Logo Design",
      "Colour Palette",
      "Typography",
      "Brand Patterns / Textures",
      "Business Card",
      "Email Signature",
      "Letterhead",
      "Presentation / Deck Template",
      "Complete Brand Guideline (30+ pages)",
      "5 Social Media Designs",
      "Banners for All Social Platforms",
      "5 Marketing Designs",
      "10 Merch Designs",
      "One Mockup per Design",
      "Revisions as required",
      "All Files, in every format",
    ],
  },
};

export const PLAN_KEYS = Object.keys(PLANS);

/* ---- pricing helpers ---- */

export const initialFx = () => ({
  rate: PRICING.RATE_OVERRIDE || PRICING.FALLBACK_RATE,
  source: PRICING.RATE_OVERRIDE ? "pinned" : "fallback",
});

export async function fetchLiveRate() {
  const rate = await getFxRate();
  return rate === FALLBACK_RATE ? null : { rate, source: "live" };
}

export const planUSD = (key) => PRICING.USD[key] ?? 0;

export function planPrice(key, fxRate) {
  const usd = planUSD(key);
  const r = PRICING.ROUND_TO || 1;
  return Math.round((usd * fxRate) / r) * r;
}

export const pct = (n, p) => Math.round((n * p) / 100);

export const formatNGN = (n) => "NGN " + Number(n || 0).toLocaleString("en-NG");

/* Map a Rate Card plan object (from /api/rates, e.g. name "Silver") to a
   booking plan key. Returns "" when the plan isn't one of the three tiers. */
export function planKeyFromName(name) {
  const n = String(name || "").toLowerCase();
  return PLAN_KEYS.find((k) => n.includes(k)) || "";
}
