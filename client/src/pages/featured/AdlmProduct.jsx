// src/pages/featured/AdlmProduct.jsx
//
// One route for every product in the suite except QUIV.
//
// The five short-form products differ from each other in exactly three ways:
// the hero photograph, its crop, and the two exits at the foot of the page.
// Everything else — name, host, blurb, capabilities, shot list, which step of
// the workflow it belongs to — is already in `data/adlmSuite.js`. Five nearly
// identical page files would be five places to forget to change something, so
// there is one file and a small table.
//
// QUIV keeps its own file because it is the only product with the research
// written up, and that page is the template the others graduate onto.

import React from "react";
import { useParams, Navigate } from "react-router-dom";
import ProductCase from "../../components/ProjectPage/ProductCase";
import { productBySlug } from "../../data/adlmSuite";

import imgHeron from "../../assets/ADLM/gallery/gal-04.webp";
import imgRateGen from "../../assets/ADLM/gallery/gal-12.webp";
import imgMep from "../../assets/ADLM/gallery/gal-06.webp";
import imgTimePro from "../../assets/ADLM/gallery/gal-01.webp";
import imgCiviq from "../../assets/ADLM/gallery/gal-11.webp";

const BASE = "/projects/featured/adlm-studio";
const P = (slug) => `${BASE}/product/${slug}`;

/* Per-route presentation only. Nothing factual about a product lives here —
   that is all in adlmSuite.js, so a capability can never disagree between the
   suite page and the product page. */
const PRESENTATION = {
  heron: {
    image: imgHeron,
    alt: "A building drawn over the lines it was measured from",
    focus: "62% center",
    lead: "Most of the drawings a Nigerian quantity surveyor is handed are scans and PDFs, not models. HERON measures those — and pushes the result into a linked Excel bill.",
    meta: [{ label: "Measures", value: "2D · scanned · PDF" }],
    next: {
      inProject: {
        to: P("rategen"),
        title: "RateGen",
        blurb:
          "Next in the sequence: what the measured work gets priced against.",
      },
      inCategory: {
        to: P("quiv"),
        title: "QUIV",
        blurb:
          "The same capture-and-continue model, inside Revit instead of Planswift — and the one product with the full write-up.",
      },
    },
  },
  rategen: {
    image: imgRateGen,
    alt: "The data underneath a priced bill",
    focus: "55% center",
    lead: "A rate that is right in Lagos is wrong in Kano. RateGen builds rates up from their components and prices them by zone, so every other product in the suite prices against the same library.",
    meta: [{ label: "Prices in", value: "Six currencies" }],
    next: {
      inProject: {
        to: P("time-pro"),
        title: "Time Pro",
        blurb: "What happens to the priced work once it becomes a programme.",
      },
      inCategory: {
        to: P("quiv"),
        title: "QUIV",
        blurb:
          "The flagship, and the one product in the suite with the decisions written up in full.",
      },
    },
  },
  "revit-mep": {
    image: imgMep,
    alt: "Building services geometry",
    focus: "50% center",
    lead: "The plugin model QUIV proved, pointed at mechanical, electrical and plumbing services instead of the architectural and structural take-off.",
    meta: [{ label: "Measures", value: "Services" }],
    next: {
      inProject: {
        to: P("rategen"),
        title: "RateGen",
        blurb: "Where services quantities get priced, same as everything else.",
      },
      inCategory: {
        to: P("quiv"),
        title: "QUIV",
        blurb: "The plugin this one is built on the pattern of.",
      },
    },
  },
  "time-pro": {
    image: imgTimePro,
    alt: "A model open on a workstation",
    focus: "58% center",
    lead: "The reporting end of the workflow: priced work turned into a programme, and a programme turned into something a client will sign.",
    meta: [{ label: "Stage", value: "Report" }],
    next: {
      inProject: {
        to: P("civiq"),
        title: "CIVIQ",
        blurb: "The other half of the reporting end — civil works.",
      },
      inCategory: {
        to: P("quiv"),
        title: "QUIV",
        blurb: "Where the data in a Time Pro programme is first captured.",
      },
    },
  },
  civiq: {
    image: imgCiviq,
    alt: "A helmet resting on a set of drawings",
    focus: "45% center",
    lead: "Civil works measure differently from building works and the standard methods diverge. Same account, same rate library, different rules.",
    meta: [{ label: "Measures", value: "Civil works" }],
    next: {
      inProject: {
        to: `${BASE}/product`,
        title: "The full suite",
        blurb:
          "How the six products hand off to each other, and why they behave as one workflow.",
      },
      inCategory: {
        to: P("quiv"),
        title: "QUIV",
        blurb:
          "The flagship, and the one product in the suite with the decisions written up in full.",
      },
    },
  },
};

/* The rail of siblings, minus whichever product is being read. */
const siblingsFor = (slug) =>
  [
    { to: `${BASE}/product`, label: "← The full suite" },
    { to: P("quiv"), label: "QUIV" },
    { to: P("heron"), label: "HERON" },
    { to: P("rategen"), label: "RateGen" },
    { to: P("revit-mep"), label: "Revit MEP" },
    { to: P("time-pro"), label: "Time Pro" },
    { to: P("civiq"), label: "CIVIQ" },
  ].filter((s) => s.to !== P(slug));

export default function AdlmProduct() {
  const { slug } = useParams();
  const product = productBySlug(slug);
  const view = PRESENTATION[slug];

  /* An unknown slug lands on the suite rather than on a blank page. This is
     the one route on the site that can be typed wrong from the address bar. */
  if (!product || !view) return <Navigate to={`${BASE}/product`} replace />;

  return (
    <ProductCase
      key={slug}
      product={product}
      heroImage={view.image}
      heroAlt={view.alt}
      heroFocus={view.focus}
      lead={view.lead}
      metaExtra={view.meta}
      siblings={siblingsFor(slug)}
      next={view.next}
    />
  );
}
