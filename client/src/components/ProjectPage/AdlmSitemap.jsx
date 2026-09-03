// src/components/ProjectPage/AdlmSitemap.jsx
//
// The ADLM information architecture, drawn rather than photographed.
//
// A sitemap is the one diagram in a website case study that has to be legible
// at reading size, and a screenshot of a Figma board never is. Rendering it as
// markup keeps every label selectable, scales cleanly, and means the diagram
// cannot drift from 01-ia/INFORMATION-ARCHITECTURE.md.
//
// The layout runs across the page rather than down it. The first version stacked
// before and after as two tall columns, which made the diagram three viewports
// long and pushed the type down to sizes nobody reads. A sitemap is a wide
// object — a spread of destinations, each with a short list under it — so it is
// laid out as one: the old routes as a single band of tiles, the new structure
// as a row of trees beneath it, both using the full measure.

import React from "react";

const G = "#a3e635";

/* Top: the fifteen routes the audit found, in the order they appear in the nav.
   `warn` marks the ones that were broken, mislabelled or missing outright. */
const BEFORE = [
  { t: "/", note: "Intro modal blocks the page" },
  { t: "/products", note: "Software and courses in one grid" },
  { t: "/product/:key", note: "revit · planswift · qs-takeoff", warn: true },
  { t: "/trainings", note: "30 events, isolated" },
  { t: "/learn", note: "Courses again, second home" },
  { t: "/whats-new", note: "The best writing on the site" },
  { t: "/about" },
  { t: "/quote", note: "Yearly pricing lives here only" },
  { t: "/support" },
  { t: "/testimonials", note: "Template branding, unlinked", warn: true },
  { t: "/careers · /press", note: "404", warn: true },
  {
    t: "/privacy · /terms · /licensing",
    note: "404 — legal exposure",
    warn: true,
  },
  {
    t: "No pricing page",
    note: "On a site whose buyers decide on price",
    warn: true,
  },
  {
    t: "No audience routing",
    note: "Firms and students see one grid",
    warn: true,
  },
];

const AFTER = [
  {
    t: "/products",
    kids: [
      { t: "/quiv · /heron · /rategen" },
      { t: "/revit-mep · /civiq · /time-pro" },
      { t: "/mobile", isNew: true },
      { t: "/how-it-works", isNew: true, note: "Account + Installer Hub" },
      { t: "/compare", isNew: true },
    ],
  },
  {
    t: "/solutions",
    isNew: true,
    note: "One route per audience",
    kids: [
      { t: "/firms · /professionals" },
      { t: "/students · /institutions" },
    ],
  },
  {
    t: "/pricing",
    isNew: true,
    note: "Single source of truth",
    kids: [{ t: "/quote", note: "Builder, moved under Pricing" }],
  },
  {
    t: "/learn",
    note: "Three destinations became one",
    kids: [
      { t: "/courses · /lessons" },
      { t: "/events", note: "was /trainings" },
      { t: "/guides", isNew: true },
    ],
  },
  {
    t: "/company",
    kids: [
      { t: "/about · /whats-new" },
      { t: "/customers", isNew: true, note: "Where /testimonials went" },
      { t: "/careers · /press · /contact", isNew: true },
    ],
  },
  {
    t: "/legal",
    isNew: true,
    note: "The 404s, written",
    kids: [{ t: "/privacy · /terms · /licensing" }],
  },
  { t: "/demo", isNew: true, note: "Sales-led entry", kids: [] },
  {
    t: "ACCOUNT",
    signedIn: true,
    note: "Signed in",
    kids: [
      { t: "/products · /subscriptions · /billing" },
      { t: "/learning · /support · /settings" },
      { t: "/team", isNew: true, note: "Seat assignment for firms" },
    ],
  },
];

const NewTag = () => (
  <span
    className="ml-2 rounded px-1.5 py-0.5 align-middle text-[10px] font-semibold uppercase tracking-[0.1em]"
    style={{ color: G, background: `${G}14`, border: `1px solid ${G}33` }}
  >
    New
  </span>
);

const AdlmSitemap = () => (
  <div className="space-y-8">
    {/* ── before: one band, wrapped across the full measure ── */}
    <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-6 sm:p-8">
      <div className="mb-6 flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C2603A]">
          Before
        </p>
        <h4 className="text-[16.5px] font-medium text-white">
          Fifteen public routes, grown by accretion
        </h4>
        <p className="text-[14px] text-white/35">
          Five of them broken, mislabelled or missing
        </p>
      </div>

      <ul className="m-0 grid list-none gap-x-5 gap-y-4 p-0 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        {BEFORE.map((r) => (
          <li
            key={r.t}
            className="border-l-2 pl-3.5"
            style={{
              borderColor: r.warn ? "#C2603A66" : "rgba(255,255,255,0.12)",
            }}
          >
            <code
              className={`block text-[14px] leading-[1.4] ${r.warn ? "text-[#E0764A]" : "text-white/75"}`}
            >
              {r.t}
            </code>
            {r.note && (
              <span className="mt-1 block text-[12.5px] leading-[1.5] text-white/35">
                {r.note}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>

    {/* The turn, stated once so the two bands read as one argument rather than
        two unrelated diagrams. */}
    <div className="flex items-center gap-4">
      <span className="h-px flex-1" style={{ background: `${G}26` }} />
      <span
        className="text-[12px] font-semibold uppercase tracking-[0.18em]"
        style={{ color: G }}
      >
        Regrouped by intent · 16 new · 14 redirects
      </span>
      <span className="h-px flex-1" style={{ background: `${G}26` }} />
    </div>

    {/* ── after: a row of trees, one per top-level destination ── */}
    <div
      className="rounded-2xl border p-6 sm:p-8"
      style={{ borderColor: `${G}30`, background: `${G}07` }}
    >
      <div className="mb-6 flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <p
          className="text-[11px] font-semibold uppercase tracking-[0.2em]"
          style={{ color: G }}
        >
          After
        </p>
        <h4 className="text-[16.5px] font-medium text-white">
          Seven public destinations and one account
        </h4>
        <p className="text-[14px] text-white/35">
          Every audience has a route written for them
        </p>
      </div>

      <ul className="m-0 grid list-none gap-x-6 gap-y-7 p-0 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
        {AFTER.map((r) => (
          <li key={r.t}>
            <div
              className="border-l-2 pl-3.5"
              style={{ borderColor: r.signedIn ? "#239CFF" : G }}
            >
              <code className="block text-[15px] font-medium leading-[1.35] text-white">
                {r.t}
                {r.isNew && <NewTag />}
              </code>
              {r.note && (
                <span className="mt-1 block text-[12.5px] leading-[1.5] text-white/40">
                  {r.note}
                </span>
              )}
            </div>

            {r.kids.length > 0 && (
              <ul className="m-0 mt-3 list-none space-y-2 p-0 pl-3.5">
                {r.kids.map((k) => (
                  <li
                    key={k.t}
                    className="border-l pl-3.5"
                    style={{ borderColor: "rgba(255,255,255,0.12)" }}
                  >
                    <code className="block text-[13.5px] leading-[1.45] text-white/60">
                      {k.t}
                      {k.isNew && <NewTag />}
                    </code>
                    {k.note && (
                      <span className="mt-0.5 block text-[12px] leading-[1.5] text-white/30">
                        {k.note}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default AdlmSitemap;
