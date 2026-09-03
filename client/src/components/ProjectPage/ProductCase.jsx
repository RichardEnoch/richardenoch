// src/components/ProjectPage/ProductCase.jsx
//
// The product page for everything in the suite that is not QUIV.
//
// QUIV is the flagship and gets the long form: the decisions, the flows, the
// snippets, the phone continuation. The other products in the suite are real
// and shipped, but the research behind each one has not been written up yet,
// and a page that fills that gap with invented reasoning is worse than a page
// that is short. So this is the short form, and every line in it comes from
// the client's own description of the product in `data/adlmSuite.js`.
//
// It carries: what the product is, where it sits in the measure → price →
// report sequence, what it does, and the frames its screens will land in. The
// frames are empty on purpose — the same treatment as every other unshot
// section on this site — and the page says so rather than leaving a reader to
// work it out.
//
// When the write-up for a product exists, that product graduates to its own
// file on the QUIV template. This is the holding pattern, not the ceiling.

import React from "react";
import PageMeta from "../common/PageMeta";
import SectionToc from "../common/SectionToc";
import CaseHero from "../common/CaseHero";
import NextPair from "../common/NextPair";
import Slot from "../common/Slot";
import GuidelineCarousel from "./GuidelineCarousel";
import BuildSection from "../Home/BuildSection";
import { WORKFLOW } from "../../data/adlmSuite";
/* Frames name a drop-in key rather than an import — see data/adlmAssets.js. */
import { asset, withAssets, assetProgress } from "../../data/adlmAssets";
import {
  Section,
  Rise,
  RiseMedia,
  Stagger,
  StaggerItem,
  SLabel,
  SHead,
  Blend,
  ACCENT as G,
} from "../common/CaseParts";

const BASE = "/projects/featured/adlm-studio";

const SECTIONS = [
  { id: "what", label: "What it is" },
  { id: "where", label: "Where it sits" },
  { id: "does", label: "What it does" },
  { id: "screens", label: "The screens" },
];

const ProductCase = ({
  product, // one entry from FLAGSHIPS or ALSO
  heroImage,
  heroAlt,
  heroFocus = "center",
  lead, // one sentence; defaults to the product's own blurb
  metaExtra = [],
  next, // { inProject, inCategory } for NextPair
  siblings = [],
}) => {
  /* Which step of the workflow names this product. Read from the workflow data
     rather than stated per page, so renaming a product in one place cannot
     leave a page claiming it belongs to a step it no longer does. */
  const stepIndex = WORKFLOW.findIndex((w) =>
    w.tools.split("·").some((t) => t.trim() === product.name),
  );

  /* How much of this product's shot list has actually landed. The status panel
     below reads from this rather than from a hard-coded sentence, so it stops
     saying "no screens yet" the moment the screens are dropped in. */
  const shots = assetProgress([
    product.heroKey,
    ...(product.shots || []).map((s) => s.key),
  ]);

  return (
    <div className="relative min-h-screen bg-[#07090C] font-['Outfit'] text-white">
      <PageMeta
        title={`${product.name} — Product Design`}
        description={`${product.name} is part of ADLM Studio's six-product suite. ${product.blurb}`}
        url={product.to}
      />

      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div
          className="absolute -left-60 -top-20 h-[500px] w-[500px] rounded-full blur-[160px]"
          style={{ background: "#091E3988" }}
        />
        <div
          className="absolute -right-60 top-1/2 h-[420px] w-[420px] rounded-full blur-[140px]"
          style={{ background: `${G}10` }}
        />
      </div>

      <SectionToc
        sections={SECTIONS}
        siblings={siblings}
        siblingsLabel="Elsewhere in ADLM"
      />

      <div className="relative z-10">
        <CaseHero
          image={heroImage}
          imageAlt={heroAlt}
          badge={`ADLM Studio · ${product.host}`}
          title={product.name}
          lead={lead || product.blurb}
          focus={heroFocus}
          meta={[
            { label: "Product", value: product.name },
            { label: "Runs in", value: product.host },
            { label: "Role", value: "Product design lead" },
            ...metaExtra,
          ]}
        />

        {/* ── 01 what it is ── */}
        <Section id="what" first>
          <Rise>
            <SLabel n="01" t="What it is" />
            <SHead
              white="One product in"
              accent="a six-part workflow."
              className="mb-10 max-w-[22ch]"
            />
          </Rise>

          <div className="grid gap-12 lg:grid-cols-[minmax(0,38ch)_minmax(0,1.55fr)] lg:gap-14">
            <Rise>
              <p className="text-[16px] leading-[1.75] text-white/60">
                {product.blurb}
              </p>
            </Rise>
            <RiseMedia delay={0.08}>
              <Slot
                src={asset(product.heroKey)}
                alt={product.heroLabel}
                ratio="16/10"
                kind="Screen"
                label={product.heroLabel}
                note={asset(product.heroKey) ? undefined : "Awaiting capture"}
                fitHeight="64vh"
              />
            </RiseMedia>
          </div>
        </Section>

        {/* ── 02 where it sits ── */}
        <Section id="where" width="bleed">
          <Rise>
            <SLabel n="02" t="Where it sits" />
            <SHead
              white="Measure, price,"
              accent="report."
              className="mb-4 max-w-[22ch]"
            />
            <p className="mb-12 max-w-[58ch] text-[16px] leading-[1.75] text-white/55">
              The suite is one sequence rather than six products. Everything
              measured writes to the same account, prices against the same rate
              library, and reports out of the same data.
            </p>
          </Rise>

          <Stagger className="grid gap-4 md:grid-cols-3">
            {WORKFLOW.map((w, i) => {
              const here = i === stepIndex;
              return (
                <StaggerItem key={w.step}>
                  <div
                    className="h-full rounded-2xl border p-7 transition-colors duration-300"
                    style={{
                      borderColor: here ? `${G}40` : "rgba(255,255,255,0.08)",
                      background: here ? `${G}0A` : "rgba(255,255,255,0.02)",
                    }}
                  >
                    <p
                      className="type-eyebrow mb-3"
                      style={{ color: here ? G : "rgba(255,255,255,0.3)" }}
                    >
                      {`0${i + 1}`} — {w.step}
                    </p>
                    <h3 className="mb-2 text-[19px] font-semibold text-white">
                      {w.tools}
                    </h3>
                    <p className="text-[14.5px] leading-[1.65] text-white/50">
                      {w.note}
                    </p>
                    {here && (
                      <p
                        className="mt-5 text-[12.5px] font-semibold uppercase tracking-[0.16em]"
                        style={{ color: G }}
                      >
                        {product.name} is here
                      </p>
                    )}
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </Section>

        {/* ── 03 what it does ── */}
        <Section id="does">
          <Rise>
            <SLabel n="03" t="What it does" />
            <SHead
              white="The capabilities,"
              accent="stated plainly."
              className="mb-10 max-w-[22ch]"
            />
          </Rise>

          <Stagger className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {product.capabilities.map((c) => (
              <StaggerItem key={c}>
                <div className="flex items-start gap-3 rounded-xl border border-white/8 bg-white/[0.025] px-5 py-4">
                  <span
                    className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: G }}
                  />
                  <p className="text-[15px] leading-[1.6] text-white/70">{c}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Section>

        {/* ── 04 the screens ──
            Empty frames in the site's own guideline viewer, at the ratio the
            captures will arrive in. The page is laid out and tested now; the
            swap later is one prop per frame. */}
        <GuidelineCarousel
          n="04"
          label="The screens"
          white={`${product.name},`}
          accent="frame by frame"
          description={`The shot list for ${product.name}. The frames are empty until the captures are made — the layout is real, the pictures are not there yet.`}
          orientation="landscape"
          slides={withAssets(product.shots || [])}
          skipLabel="Skip the frames"
        />

        {/* An honest note rather than an invented narrative. QUIV carries the
            long-form write-up; this product has not had one written yet. */}
        <Section width="narrow">
          <Rise>
            <div
              className="rounded-2xl border p-7 sm:p-9"
              style={{ borderColor: `${G}33`, background: `${G}06` }}
            >
              <p className="type-eyebrow mb-3" style={{ color: G }}>
                Still being written
              </p>
              <p className="text-[15.5px] leading-[1.75] text-white/60">
                {product.name} is shipped and in use. The decisions behind it —
                what the research found and what it changed — are not written up
                yet, and that section is better left out than filled with
                reasoning invented after the fact. The full treatment of a
                product in this suite is on the QUIV page.
              </p>
              {shots.filled < shots.total && (
                <p className="mt-4 text-[13.5px] leading-[1.7] text-white/35">
                  Screens: {shots.filled} of {shots.total} captured.
                </p>
              )}
              <a
                href={`${BASE}/product/quiv`}
                className="mt-6 inline-flex items-center gap-2 text-[13.5px] font-semibold"
                style={{ color: G }}
              >
                Read the QUIV case study
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </Rise>
        </Section>

        <Blend />
        <BuildSection />
        <NextPair {...next} />
      </div>
    </div>
  );
};

export default ProductCase;
