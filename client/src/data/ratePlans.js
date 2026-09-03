// src/data/ratePlans.js
//
// The rate card — one source for every price on the site.
//
// Prices are held in US dollars and shown in naira at the live rate, so a
// slide in the naira does not quietly discount the work. The FX helpers live
// in config/fx.js, which both this file and the booking flow read, so a plan
// cannot show one figure on the rate card and another at checkout.
//
// Deliverables are cumulative. A tier lists only what it adds to the tier
// below it, because the ladder is the argument: seventeen flat lines make
// Platinum look like a longer Silver rather than a different proposition.
// The base tier of each service carries the full list; `inherits` names the
// tier a card builds on.
//
// Durations are working days from the deposit clearing, assuming the client
// answers questions. They are ranges because they are estimates, and a range
// that is met beats a single number that is missed.

import { PLANS } from "../config/plans";
import { FALLBACK_RATE, getFxRate, toNGN, usdText } from "../config/fx";

export { FALLBACK_RATE, getFxRate };

/* Deposit taken to start work. */
export const DEPOSIT_PCT = 70;

/* ── Brand identity ───────────────────────────────────────────────────────
   Silver's list is PLANS.silver verbatim. Gold and Platinum state their
   additions only — kept here rather than derived, because "banners for three
   platforms rather than one" is a sentence, not a diff. */
export const BRAND_TIERS = [
  {
    id: "silver",
    usd: 150,
    audience: "Starting out",
    description:
      "For small businesses starting out that need a subtle identity.",
    duration: "10–14 days",
    features: PLANS.silver.deliverables,
  },
  {
    id: "gold",
    usd: 350,
    audience: "Ready to launch",
    description: "Launch your brand with everything you need to stand out.",
    duration: "3–4 weeks",
    featured: true,
    badge: "Most popular",
    inherits: "Silver",
    features: [
      "Brand guideline, 15–30 pages",
      "Brand patterns and textures",
      "Email signature, letterhead and deck template",
      "5-page website, source code included",
      "2 marketing designs, banners for 3 platforms",
      "4 merch designs and 7 mockups",
      "A third revision round, and SVG files",
    ],
  },
  {
    id: "platinum",
    usd: 450,
    audience: "Positioning to scale",
    description:
      "Full brand + professional website to position your business at the next level.",
    duration: "5–7 weeks",
    inherits: "Gold",
    features: [
      "Complete brand guideline, 30+ pages",
      "Website with as many pages as it needs",
      "5 social designs, banners for every platform",
      "5 marketing designs",
      "10 merch designs, one mockup for each",
      "Revisions until it is right, not a fixed count",
      "Every working file, plus website source",
    ],
  },
];

/* ── Websites ── tiered by page count. Design and build together. */
export const WEBSITE_TIERS = [
  {
    id: "starter",
    usd: 150,
    audience: "Up to 5 pages",
    description: "A clean, credible presence for a business that needs one.",
    duration: "2 weeks",
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
    usd: 285,
    audience: "Up to 10 pages",
    description: "Room to publish, room to grow, and analytics to see it.",
    duration: "3–4 weeks",
    featured: true,
    badge: "Most booked",
    inherits: "Starter",
    features: [
      "Up to 10 custom-designed pages",
      "Blog / CMS — edit your own content",
      "Analytics + SEO for every page",
      "A third revision round",
    ],
  },
  {
    id: "premium",
    usd: 490,
    from: true,
    audience: "15+ or custom",
    description: "A larger site or a web app, scoped around what it has to do.",
    duration: "6 weeks+, scoped",
    inherits: "Business",
    features: [
      "15+ pages, or a custom web app",
      "Store, booking, payments, or member area",
      "Source files + handover docs",
      "Revisions until launch-ready",
    ],
  },
];

/* ── Graphic design ── flyer and social packs. The more designs in a pack,
   the less each one costs, so the per-design rate is part of the price. */
export const FLYER_TIERS = [
  {
    id: "single",
    usd: 12,
    perDesignUSD: 12,
    audience: "1 design",
    description: "One flyer or social design, done properly.",
    duration: "2 days",
    features: [
      "1 flyer / social design",
      "Print + social-ready exports",
      "No source files",
    ],
  },
  {
    id: "triple",
    usd: 30,
    perDesignUSD: 10,
    audience: "3 designs",
    description: "A short run at a lower rate per design.",
    duration: "5 days",
    inherits: "the single design",
    features: ["2 more designs, 3 in total", "A lower rate for each of them"],
  },
  {
    id: "five",
    usd: 42,
    perDesignUSD: 8,
    audience: "5 designs",
    description: "The best rate per design, with your files to keep.",
    duration: "8 days",
    featured: true,
    badge: "Best value",
    inherits: "the 3-design pack",
    features: [
      "2 more designs, 5 in total",
      "Source files included",
      "The best rate per design",
    ],
  },
  {
    id: "event",
    usd: null,
    perDesignUSD: 7,
    audience: "6+ designs",
    description: "A full set for one event, priced on the number of designs.",
    duration: "Scoped",
    inherits: "the 5-design pack",
    features: [
      "6 designs or more, the full set",
      "Anticipate, countdown, speaker, thank-you",
      "Priced per design, so the set can grow",
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

/* Shared shape for a card. `priceMain` is the dollar figure, because dollars
   are the price; `priceSub` carries the naira indication. */
const toCard = (t, rate, { cadence, href, cta, perDesign }) => ({
  id: t.id,
  name: t.name,
  audience: t.audience,
  description: t.description,
  duration: t.duration,
  inherits: t.inherits,
  features: t.features,
  featured: Boolean(t.featured),
  badge: t.badge || "",
  priceMain:
    t.usd == null ? "Custom" : `${t.from ? "From " : ""}${usdText(t.usd)}`,
  priceSub:
    t.usd == null
      ? `from ${usdText(t.perDesignUSD)} per design`
      : perDesign
        ? `${toNGN(t.usd, rate)} · ${usdText(t.perDesignUSD)} per design`
        : `about ${toNGN(t.usd, rate)}`,
  cadence,
  href,
  cta,
});

export function buildRateSections(rate) {
  return [
    {
      id: "brand-identity",
      label: "Brand identity",
      width: "standard",
      heading: "Brand identity",
      blurb:
        "Your brand is the first impression. Every tier below is a complete identity — they differ in how far it reaches.",
      tiers: BRAND_TIERS.map((t) =>
        toCard({ ...t, name: PLANS[t.id].label }, rate, {
          cadence: "one-off project",
          href: `/book?plan=${t.id}`,
          cta: `Talk about ${PLANS[t.id].label}`,
        }),
      ),
    },
    {
      id: "websites",
      label: "Websites",
      width: "standard",
      heading: "Website design & build",
      blurb:
        "Design and build together. Hosting and domain are billed separately — I can set both up on your behalf.",
      tiers: WEBSITE_TIERS.map((t) =>
        toCard({ ...t, name: WEBSITE_NAMES[t.id] }, rate, {
          cadence: "one-off project",
          href: `/book-website?plan=${t.id}`,
          cta: `Talk about ${WEBSITE_NAMES[t.id]}`,
        }),
      ),
    },
    {
      id: "graphic-design",
      label: "Graphic design",
      /* Four tiers, so this one runs on the wide measure. */
      width: "wide",
      heading: "Flyers & social design",
      blurb:
        "Sold in packs. The more designs in a pack, the less each one costs.",
      tiers: FLYER_TIERS.map((t) =>
        toCard({ ...t, name: FLYER_NAMES[t.id] }, rate, {
          cadence: t.usd == null ? "priced per design" : "one-off pack",
          href: `/book-flyer?plan=${t.id}`,
          cta: t.usd == null ? "Request a quote" : "Book this pack",
          perDesign: true,
        }),
      ),
    },
  ];
}

export const WEBSITE_NAMES = {
  starter: "Starter",
  business: "Business",
  premium: "Premium",
};

export const FLYER_NAMES = {
  single: "Single Design",
  triple: "3-Design Pack",
  five: "5-Design Pack",
  event: "Event Campaign",
};

/* For the booking pages, which need the naira amount to invoice against. */
export const usdFor = (tiers, id) => tiers.find((t) => t.id === id)?.usd ?? 0;
