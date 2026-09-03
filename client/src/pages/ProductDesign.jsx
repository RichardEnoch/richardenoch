// src/pages/ProductDesign.jsx — the product design discipline page.
//
// The method examples are spread deliberately across YDPay, BookRion, NIQS,
// the self-initiated work and ADLM, so the page does not read as though one
// client is the whole practice.
//
// The research rows are thinner than the brand page's on purpose: only three
// are written up because only three are documented. The YDPay and NIQS product
// research is real work but Richard has not yet given me his account of it,
// and a research row invented to fill a grid is worse than a shorter grid.

import React from "react";
import DisciplineLanding from "../components/common/DisciplineLanding";

/* The interfaces themselves, before the argument about how they were made.
   Same tessellating band as the brand identity page. */
import gDash from "../assets/ADLM/site/dashboard.webp";
import gQuiv from "../assets/ADLM/quiv-hero.webp";
import gSystem from "../assets/ADLM/site/designsystem.webp";
import gNiqsScreen from "../assets/NIQS/screen-home.webp";
import gNiqsSearch from "../assets/NIQS/screen-search-1.webp";
import gAdmin from "../assets/ADLM/site/admin.webp";

const GALLERY = [
  {
    src: gDash,
    alt: "ADLM Studio — the account dashboard every product writes back to",
    mobile: "col-span-2 aspect-[16/10]",
    cell: "col-span-2 lg:col-span-5 lg:row-span-10",
  },
  {
    src: gQuiv,
    alt: "QUIV — take-off inside Revit, where the drawings already are",
    cell: "lg:col-span-4 lg:row-span-5",
  },
  {
    src: gAdmin,
    alt: "The admin surface — density over decoration, for people using it all day",
    cell: "lg:col-span-4 lg:row-span-5",
  },
  {
    src: gSystem,
    alt: "The design system the six products are built from",
    mobile: "col-span-2 aspect-[16/10]",
    fit: "contain",
    cell: "lg:col-span-3 lg:row-span-10",
  },
  {
    src: gNiqsScreen,
    alt: "NIQS — the public site, live",
    mobile: "col-span-2 aspect-[16/9]",
    cell: "col-span-2 lg:col-span-7 lg:row-span-6",
  },
  {
    src: gNiqsSearch,
    alt: "NIQS — the public register lookup, usable without an account",
    mobile: "col-span-2 aspect-[16/9]",
    cell: "col-span-2 lg:col-span-5 lg:row-span-6",
  },
];

const METHOD = [
  {
    n: "01",
    title: "Understand the brief",
    body: "Then ask what it left out. A brief usually names a deliverable — a redesign, a dashboard — when the thing I need is the problem sitting underneath it.",
  },
  {
    n: "02",
    title: "Research",
    body: "What exists already, what competitors do, what the audience is used to. Sometimes that is a route-by-route audit of the old product; sometimes it is market research; on Savedup and Snotes it was competitor analysis on my own brief, with no client to ask.",
  },
  {
    n: "03",
    title: "Map it, then sketch it",
    body: "Information architecture and flows before layout. The flow is where the real decisions live — what happens on failure, what the user is holding in their head, and what the product must never do quietly.",
  },
  {
    n: "04",
    title: "Build it so it holds",
    body: "Tokens and components, so the hundredth screen still agrees with the first. YDPay ran to 96 screens across 14 flows on one token system; BookRion spanned three separate surfaces that had to read as one product.",
  },
];

const RESEARCH = {
  intro:
    "Desk and secondary research, done properly and named honestly. Route audits, comparative teardowns, competitor analysis, contrast testing — plus working knowledge of the domain, because I trained as a quantity surveyor before I designed for them. The three written up below all come from the same engagement, because that is the one where I documented the research as I went; the NIQS, YDPay, Savedup and Snotes research lives inside those case studies instead. Where a finding did not change a decision, it is not listed.",
  cases: [
    {
      project: "ADLM Studio — the marketing site",
      question: "Who is actually on this site, and what did they come for?",
      where:
        "All 112 routes of ADLM's legacy application, plus a comparative read of six reference sites in adjacent markets.",
      found:
        "Software and training courses shared one grid, and one product carried a different name on its own page than in the navigation.",
      changed:
        "Routes split by audience, and one product, one name — enforced across the whole site.",
    },
    {
      project: "QUIV — a product inside the ADLM suite",
      question:
        "Why are Lagos quantity surveyors not adopting BIM take-off tools?",
      where:
        "Market research into BIM adoption locally, read against my own training and network in the profession.",
      found:
        "The blockers were practical rather than conceptual — connectivity, a desktop-shaped workflow, and outputs that had to match the standard the work is measured against.",
      changed:
        "Four product principles set before a screen was drawn: offline-first, desktop-first, no silent overrides, BESMM-aligned outputs.",
    },
    {
      project: "ADLM Studio — the design system",
      question: "Does the palette survive both themes?",
      where:
        "A contrast pass across the token set, on the light ground and the dark one.",
      found:
        "The brand blue that reads well on dark navy does not carry enough contrast on white.",
      changed:
        "Two values for one role — a lighter blue on dark, a darker step on light — written into the tokens so the rule cannot be forgotten.",
    },
  ],
};

const ProductDesign = () => (
  <DisciplineLanding
    meta={{
      title: "Product Design",
      description:
        "Product design by Richard Enoch — information architecture, user flows, design systems and accessibility across fintech, publishing, professional bodies and construction technology.",
      url: "/product-design",
    }}
    accent="#22d3ee"
    eyebrow="Product design"
    headline="A hundred screens that behave like one."
    standfirst="Product is where most of my time goes now. The interesting part is rarely the screen — it is the map underneath it, the decisions about what the product refuses to do, and the system that keeps the hundredth screen agreeing with the first."
    years="Three years in product design, on top of six in design overall. Audits, information architecture, flow sets, design systems and accessibility work across fintech, publishing, a national professional body and construction technology."
    gallery={GALLERY}
    method={METHOD}
    research={RESEARCH}
    tab="Product UI/UX Designs"
    gridNote="Each case states plainly where it got to. Some of it is live and in daily use; some was delivered in full and has not been taken into build yet. The reasoning is worth the same either way."
    crossLink={{
      to: "/brand-identity",
      label: "Brand identity",
      blurb:
        "Identity systems taken out to signage, packaging and livery — where the practice started, and still the half I am hardest to talk out of.",
    }}
  />
);

export default ProductDesign;
