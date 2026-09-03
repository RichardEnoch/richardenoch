// src/data/projectStatus.js
//
// What actually happened to each project.
//
// A portfolio with no shipped-state on it invites the reader to assume
// everything shipped, and one unshipped project discovered later costs more
// trust than five unshipped projects disclosed up front. There are almost no
// measured business outcomes behind this work — inventing them is off the
// table — so the honest substitute is stating the state plainly and letting
// the reasoning carry the case.
//
// Vocabulary, kept small on purpose:
//   Live            — shipped and running in public
//   In use          — shipped and in daily or working use by its audience
//   Not yet adopted — delivered in full; not taken into build yet
//   Prototype       — taken to a working prototype, not built
//   Self-initiated  — my own brief, no client
//   Delivered       — handed over; a brand system rather than a running product
//
// "Not yet adopted" is deliberate. Delivered work that has not been picked up
// is not the same as work that was rejected, and saying "not adopted" flat
// closes a door the client has not closed.
//
// Keyed by the slug used in ProjectGrid. Anything missing simply renders no
// pill, which is better than guessing.

export const PROJECT_STATUS = {
  // ── ADLM Studio ───────────────────────────────────────────────────────
  "adlm-brand": { state: "In use", note: "The studio's working identity." },
  "adlm-design-system": {
    state: "In use",
    note: "Shipped; the live site is built on it.",
  },
  "adlm-product": { state: "Live", note: "Live and selling." },
  "adlm-graphics": { state: "Live", note: "Running campaign material." },

  // ── Product / UI ──────────────────────────────────────────────────────
  niqs: { state: "In use", note: "Live; the admin secretariat uses it daily." },
  "ydpay-mobile-redesign": {
    state: "Not yet adopted",
    note: "Delivered in full; not taken into build yet.",
  },
  savedup: { state: "Self-initiated", note: "My own brief, taken to design." },
  snotes: { state: "Self-initiated", note: "My own brief, taken to design." },

  // ── Brand ─────────────────────────────────────────────────────────────
  "ydpay-brand": {
    state: "In use",
    note: "Guideline adopted and in use.",
  },
  tabstudio: { state: "Delivered", note: "Handed over as a full system." },
  "verde-luxe": { state: "Delivered", note: "Handed over as a full system." },
  cleanstead: { state: "Delivered", note: "Handed over as a full system." },
  "book-rion": {
    state: "Delivered",
    note: "Identity only — the product was later rebuilt by another team.",
  },
};

/* Everything that is not a running product reads in the same neutral grey.
   Only work that is actually out in the world gets the lime, so the accent
   means something. */
const LIVE_STATES = new Set(["Live", "In use"]);

export const isLive = (state) => LIVE_STATES.has(state);

export const statusFor = (slug) => PROJECT_STATUS[slug] || null;
