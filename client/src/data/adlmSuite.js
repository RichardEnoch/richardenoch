// src/data/adlmSuite.js
//
// The six products, stated once.
//
// WORKFLOW, FLAGSHIPS and ALSO used to live inside the suite page. Each
// product's own page needs the same facts — what it is, what host it runs in,
// what it does, and where it sits in the measure → price → report sequence —
// and a second copy of that on every product page is a copy that goes stale
// the first time a capability changes. Everything here is the client's own
// description of the products; nothing is written for effect.

const BASE = "/projects/featured/adlm-studio";

/* ─── the six, in workflow order ─── */
const WORKFLOW = [
  {
    step: "Measure",
    tools: "QUIV · HERON · Revit MEP",
    note: "Quantities come off the drawing or the model, wherever it already lives.",
  },
  {
    step: "Price",
    tools: "RateGen",
    note: "One shared rate library, built up properly and priced by zone.",
  },
  {
    step: "Report",
    tools: "Time Pro · CIVIQ",
    note: "Programme, valuation and the documents a client will accept.",
  },
];

const FLAGSHIPS = [
  {
    name: "QUIV",
    slug: "quiv",
    host: "Revit plugin · Take-off",
    to: `${BASE}/product/quiv`,
    blurb:
      "Select an item on the drawing and its dimensions and details collect into QUIV's side panel, without leaving Revit. The data lands in the user's ADLM cloud storage, so the take-off can be picked up on a phone and carried through to a bill.",
    capabilities: [
      "Model take-off",
      "Side-panel capture",
      "Cloud sync",
      "BESMM-aligned output",
      "Offline-first",
    ],
    heroLabel: "QUIV panel docked in Revit, mid take-off",
    heroKey: "products/quiv/hero",
    shots: [
      { label: "Import — bringing a model in", key: "products/quiv/01" },
      { label: "Measure — selection and capture", key: "products/quiv/02" },
      { label: "Collation — the generated list", key: "products/quiv/03" },
    ],
  },
  {
    name: "HERON",
    slug: "heron",
    host: "Planswift plugin · 2D take-off",
    to: `${BASE}/product/heron`,
    blurb:
      "Measures scanned and PDF drawings against the ADLM templates, then pushes straight to a fully linked Excel bill with material and labour budgets attached. The same capture-and-continue model as QUIV, for the drawings that never became a model.",
    capabilities: [
      "Scale & measure any drawing",
      "Image drawing scanning",
      "Linked Excel BoQ",
      "Valuation tracking",
    ],
    heroLabel: "HERON measuring a scanned drawing in Planswift",
    heroKey: "products/heron/hero",
    shots: [
      { label: "Scaling a scanned sheet", key: "products/heron/01" },
      { label: "Measurement in progress", key: "products/heron/02" },
      { label: "The linked Excel bill", key: "products/heron/03" },
    ],
  },
  {
    name: "RateGen",
    slug: "rategen",
    host: "Rate build-up",
    to: `${BASE}/product/rategen`,
    blurb:
      "The shared library everything else prices against. Rates are built up from their components rather than typed in, and they price by geopolitical zone — because a rate that is right in Lagos is wrong in Kano. Currency is a display layer, so one project reads correctly in six currencies without being duplicated.",
    capabilities: [
      "Rate library",
      "Component build-ups",
      "Zone pricing",
      "Six currencies",
      "Priced bills",
    ],
    heroLabel: "RateGen — the rate library and one build-up record",
    heroKey: "products/rategen/hero",
    shots: [
      { label: "The library, filtered by zone", key: "products/rategen/01" },
      { label: "A single build-up record", key: "products/rategen/02" },
      {
        label: "Priced bill with unpriced items surfaced",
        key: "products/rategen/03",
      },
    ],
  },
];

const ALSO = [
  {
    name: "Revit MEP",
    slug: "revit-mep",
    host: "Revit plugin · Services",
    to: `${BASE}/product/revit-mep`,
    blurb:
      "The same plugin model as QUIV, aimed at mechanical, electrical and plumbing services rather than the architectural and structural take-off. Same capture, same cloud, same downstream bill.",
    capabilities: ["MEP take-off", "Services scheduling", "Cloud sync"],
    heroLabel: "Revit MEP — services panel",
    heroKey: "products/revit-mep/hero",
    shots: [
      {
        label: "The services panel, docked in Revit",
        key: "products/revit-mep/01",
      },
      { label: "MEP take-off in progress", key: "products/revit-mep/02" },
      { label: "The services schedule, out", key: "products/revit-mep/03" },
    ],
  },
  {
    name: "Time Pro",
    slug: "time-pro",
    host: "Programme",
    to: `${BASE}/product/time-pro`,
    blurb:
      "Turns the priced work into a programme — what happens when, in what order, and what it costs at each point. The reporting end of the workflow rather than the measuring end.",
    capabilities: [
      "Programme building",
      "Progress tracking",
      "Time management",
    ],
    heroLabel: "Time Pro — programme view",
    heroKey: "products/time-pro/hero",
    shots: [
      {
        label: "The programme, built from priced work",
        key: "products/time-pro/01",
      },
      { label: "Progress tracked against it", key: "products/time-pro/02" },
      { label: "A report a client will accept", key: "products/time-pro/03" },
    ],
  },
  {
    name: "CIVIQ",
    slug: "civiq",
    host: "Civil engineering",
    to: `${BASE}/product/civiq`,
    blurb:
      "Civil works, where the quantities behave differently from building works and the standard methods diverge. Same account, same rate library, different measurement rules.",
    capabilities: ["Civil take-off", "Earthworks", "Shared rate library"],
    heroLabel: "CIVIQ — civil measurement",
    heroKey: "products/civiq/hero",
    shots: [
      { label: "Civil measurement, running", key: "products/civiq/01" },
      { label: "Earthworks quantities", key: "products/civiq/02" },
      { label: "Priced against the shared library", key: "products/civiq/03" },
    ],
  },
];

/* One flat list, in workflow order, for anything that needs to look a product
   up by its slug — the product route does exactly that. */
const PRODUCTS = [...FLAGSHIPS, ...ALSO];

function productBySlug(slug) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export { WORKFLOW, FLAGSHIPS, ALSO, PRODUCTS, productBySlug };
