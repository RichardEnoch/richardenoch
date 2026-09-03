// src/data/ratePlans.js
//
// The rate card. Prices are held in USD and converted to naira at the live
// rate, so the card stays current without anyone re-pinning a number.
// Ported from the old server/config/plans.js.

import { PLANS } from "../config/plans";

/* Live USD→NGN, with a pinned fallback so the card always renders. The
   endpoint is public, keyless and sends Access-Control-Allow-Origin: *. */
const FX_ENDPOINT = "https://open.er-api.com/v6/latest/USD";
export const FALLBACK_RATE = 1364.77; // captured 2026-08-04
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
    /* fall through */
  }
  return FALLBACK_RATE;
}

export const toNGN = (usd, rate) =>
  `₦${(Math.round((usd * rate) / ROUND_TO) * ROUND_TO).toLocaleString("en-NG")}`;

/* Deposit taken to start work. */
export const DEPOSIT_PCT = 70;

/* ── Brand identity tiers ── */
const BRAND_TIERS = [
  {
    id: "silver",
    name: "Silver",
    usd: 150,
    description:
      "For small businesses starting out that need a subtle identity.",
  },
  {
    id: "gold",
    name: "Gold",
    usd: 350,
    description: "Launch your brand with everything you need to stand out.",
    isFeatured: true,
    badgeLabel: "Most popular",
  },
  {
    id: "platinum",
    name: "Platinum",
    usd: 450,
    description:
      "Full brand plus a professional website to position your business at the next level.",
  },
];

/* Comparison rows. Values are "check", "-", or literal text. */
const BRAND_DELIVERABLES = [
  ["logo", "Logo design", "check", "check", "check"],
  ["palette", "Colour palette", "check", "check", "check"],
  ["type", "Typography", "check", "check", "check"],
  ["patterns", "Brand patterns / textures", "-", "check", "check"],
  ["card", "Business card", "check", "check", "check"],
  ["signature", "Email signature", "-", "check", "check"],
  ["letterhead", "Letterhead", "-", "check", "check"],
  ["deck", "Presentation / deck template", "-", "check", "check"],
  ["guideline", "Brand guideline", "-", "15–30 pages", "30+ pages"],
  ["social", "Social media designs", "2", "2", "5"],
  ["banners", "Social media banners", "1", "3", "All platforms"],
  ["marketing", "Marketing designs", "-", "2", "5"],
  ["merch", "Merch designs", "1", "4", "10"],
  ["mockups", "Mockup images", "2", "7", "One per design"],
  ["website", "Website", "-", "5 pages", "Pages as required"],
  ["revisions", "Revision rounds", "2", "3", "As required"],
  [
    "files",
    "Final files",
    "JPEG, PNG",
    "+ SVG and website source",
    "All files and source",
  ],
];

export const BRAND_DELIVERABLE_ROWS = BRAND_DELIVERABLES.map(
  ([id, label, silver, gold, platinum]) => ({
    id,
    label,
    perPlan: { silver, gold, platinum },
  }),
);

/* Build the priced plan objects PlanSelection expects. */
export function buildBrandPlans(rate) {
  return BRAND_TIERS.map((tier) => ({
    id: tier.id,
    name: tier.name,
    price: toNGN(tier.usd, rate),
    currency: "NGN",
    description: tier.description,
    isFeatured: Boolean(tier.isFeatured),
    badgeLabel: tier.badgeLabel || "",
  }));
}

/* Categories whose pricing lived only in the retired admin panel. They show
   an enquiry prompt instead of an empty tab until real numbers exist. */
export const QUOTE_ON_REQUEST = new Set([
  "ui-ux",
  "publication-design",
  "presentation-design",
]);

/* ══════════════════════════════════════════════════════════════════════
   The rate card as one flat list of sections.

   Every service that sells in tiers is a section; every tier is a card.
   Prices that are quoted in dollars (brand) convert to naira; prices that
   are quoted in naira (websites, flyers) convert the other way, so both
   currencies show on every card without anyone maintaining two numbers.

   Card copy is deliberately thin. The eyebrow says who or what the tier is
   for, the list says what is in it, and that is the whole argument.
   ══════════════════════════════════════════════════════════════════════ */

const usdFrom = (ngn, rate) => Math.round(ngn / rate);
const ngnText = (v) => `₦${Number(v).toLocaleString("en-NG")}`;
const usdText = (v) => `$${Number(v).toLocaleString("en-US")}`;

/* ── Brand identity ── audience lines, read off each tier's own blurb. */
const BRAND_AUDIENCE = {
  silver: "Starting out",
  gold: "Ready to launch",
  platinum: "Positioning to scale",
};
const BRAND_DURATION = {
  silver: "21 days",
  gold: "14 days",
  platinum: "4–6 weeks",
};

/* ── Websites ── tiered by page count. */
const WEBSITE_TIERS = [
  {
    id: "starter",
    name: "Starter",
    audience: "Up to 5 pages",
    ngn: 200000,
    from: false,
    duration: "7 days",
    description: "A clean, credible presence for a business that needs one.",
    features: [
      "Up to 5 custom-designed pages",
      "Mobile-first responsive build",
      "Contact form + WhatsApp link",
      "Basic on-page SEO",
      "2 revision rounds",
    ],
  },
  {
    id: "business",
    name: "Business",
    audience: "Up to 10 pages",
    ngn: 380000,
    from: false,
    duration: "14 days",
    featured: true,
    badge: "Most booked",
    description: "Room to publish, room to grow, and analytics to see it.",
    features: [
      "Up to 10 custom-designed pages",
      "Everything in Starter",
      "Blog / CMS — edit your own content",
      "Analytics + SEO for every page",
      "3 revision rounds",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    audience: "15+ or custom",
    ngn: 650000,
    from: true,
    duration: "21 days",
    description: "A larger site or a web app, scoped around what it has to do.",
    features: [
      "15+ pages or a custom web app",
      "Everything in Business",
      "Store, booking, payments, or member area",
      "Source files + handover docs",
      "Revisions until launch-ready",
    ],
  },
];

/* ── Graphic design ── flyer and social packs. The more you book, the less
   each design costs, so the per-design rate is part of the price block. */
const FLYER_TIERS = [
  {
    id: "single",
    name: "Single Design",
    audience: "1 design",
    ngn: 15000,
    perDesign: 15000,
    duration: "2 days",
    description: "One flyer or social design, done properly.",
    features: [
      "1 flyer / social design",
      "Print + social-ready exports",
      "No source files",
    ],
  },
  {
    id: "triple",
    name: "3-Design Pack",
    audience: "3 designs",
    ngn: 39000,
    perDesign: 13000,
    duration: "8 days",
    description: "A short run at a lower rate per design.",
    features: [
      "3 flyer / social designs",
      "Print + social-ready exports",
      "No source files",
    ],
  },
  {
    id: "five",
    name: "5-Design Pack",
    audience: "5 designs",
    ngn: 55000,
    perDesign: 11000,
    duration: "15 days",
    featured: true,
    badge: "Best value",
    description: "The best rate per design, with your files to keep.",
    features: [
      "5 flyer / social designs",
      "Print + social-ready exports",
      "Source files included",
    ],
  },
  {
    id: "event",
    name: "Event Campaign",
    audience: "6+ designs",
    ngn: null,
    perDesign: 9000,
    duration: "Scoped",
    description: "A full set for one event, priced on the number of designs.",
    features: [
      "6+ designs — full event set",
      "Anticipate, countdown, speaker, thank-you",
      "Source files included",
    ],
  },
];

/* Services that are not sold in tiers. Presentation and publication work has
   no published price yet; product design is scoped per engagement. Stating
   that plainly beats an empty tab. */
export const SCOPED_SERVICES = [
  {
    id: "ui-ux",
    name: "Product UI/UX",
    text: "Scoped per engagement — the number of flows, surfaces and research rounds decides the price, not a tier.",
  },
  {
    id: "presentation-design",
    name: "Presentation design",
    text: "Decks and pitch collateral. Priced on deck length and how much of the narrative is already written.",
  },
  {
    id: "publication-design",
    name: "Publication design",
    text: "Reports, editorial spreads and books. Priced on page count and how the content arrives.",
  },
];

export function buildRateSections(rate) {
  return [
    {
      id: "brand-identity",
      label: "Brand identity",
      width: "standard",
      heading: "Brand identity",
      blurb:
        "Your brand is the first impression. Every tier below is a complete identity — they differ in how far it reaches.",
      tiers: ["silver", "gold", "platinum"].map((key) => {
        const usd = BRAND_TIERS.find((t) => t.id === key)?.usd ?? 0;
        return {
          id: key,
          name: PLANS[key].label,
          audience: BRAND_AUDIENCE[key],
          description: PLANS[key].blurb,
          priceMain: toNGN(usd, rate),
          priceSub: usdText(usd),
          cadence: "one-off project",
          duration: BRAND_DURATION[key],
          features: PLANS[key].deliverables,
          featured: key === "gold",
          badge: key === "gold" ? "Most popular" : "",
          href: `/book?plan=${key}`,
          cta: `Talk about ${PLANS[key].label}`,
        };
      }),
    },
    {
      id: "websites",
      label: "Websites",
      width: "standard",
      heading: "Website design & build",
      blurb:
        "Design and build together. Hosting and domain are billed separately — I can set both up on your behalf.",
      tiers: WEBSITE_TIERS.map((t) => ({
        id: t.id,
        name: t.name,
        audience: t.audience,
        description: t.description,
        priceMain: `${t.from ? "From " : ""}${ngnText(t.ngn)}`,
        priceSub: usdText(usdFrom(t.ngn, rate)),
        cadence: "one-off project",
        duration: t.duration,
        features: t.features,
        featured: Boolean(t.featured),
        badge: t.badge || "",
        href: `/book-website?plan=${t.id}`,
        cta: `Talk about ${t.name}`,
      })),
    },
    {
      id: "graphic-design",
      label: "Graphic design",
      /* Four tiers, so this one runs on the wide measure. */
      width: "wide",
      heading: "Flyers & social design",
      blurb:
        "Sold in packs. The more designs in a pack, the less each one costs.",
      tiers: FLYER_TIERS.map((t) => ({
        id: t.id,
        name: t.name,
        audience: t.audience,
        description: t.description,
        priceMain: t.ngn != null ? ngnText(t.ngn) : "Custom",
        priceSub:
          t.ngn != null
            ? `${usdText(usdFrom(t.ngn, rate))} · ${ngnText(t.perDesign)} per design`
            : `from ${ngnText(t.perDesign)} per design`,
        cadence: t.ngn != null ? "one-off pack" : "priced per design",
        duration: t.duration,
        features: t.features,
        featured: Boolean(t.featured),
        badge: t.badge || "",
        href: `/book-flyer?plan=${t.id}`,
        cta: t.ngn != null ? "Book this pack" : "Request a quote",
      })),
    },
  ];
}
