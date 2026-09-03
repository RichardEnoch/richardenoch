// src/components/common/DisciplineLanding.jsx
//
// The shape shared by /brand-identity and /product-design.
//
// The projects index is organised the way a portfolio is organised — by
// project. A recruiter reads the other way round: they have one discipline in
// mind and want to know how deep it goes before they commit to reading a case
// study. Sending them to /projects?tab=… technically works, but it drops them
// on a grid with no argument attached to it.
//
// So each discipline gets a page that states the position, shows the method,
// says out loud how the research actually happens, and only then opens the
// grid filtered to that category.
//
// Everything on these pages is either in the case studies already or in the
// CV. Nothing here is a claim that cannot be followed to a piece of work.

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ProjectGrid from "../Home/ProjectGrid";
import BuildSection from "../Home/BuildSection";
import PageMeta from "./PageMeta";
import TiltCard from "./TiltCard";
import { buttonClasses } from "../ui";

const EASE = [0.22, 0.61, 0.36, 1];

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.6, ease: EASE, delay },
});

const DisciplineLanding = ({
  meta, // { title, description, url }
  accent,
  eyebrow,
  headline,
  standfirst,
  years, // the honest experience line for this discipline
  method, // [{ n, title, body }]
  research, // { intro, cases: [{ question, where, found, changed }] }
  tab, // which ProjectGrid tab to open on
  gridNote,
  gallery, // [{ src, alt, cell }] — optional bento band under the hero
  crossLink, // { to, label, blurb }
}) => (
  <div className="bg-[#050505] text-white">
    <PageMeta {...meta} />

    {/* ── Position ──────────────────────────────────────────────────── */}
    <section className="relative overflow-hidden px-4 pb-16 pt-28 sm:px-8 lg:px-16 lg:pb-24 lg:pt-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full blur-[180px]"
        style={{ background: `${accent}1a` }}
      />

      <div className="relative mx-auto max-w-[1100px]">
        <motion.p
          {...rise()}
          className="text-[11px] font-bold uppercase tracking-[0.22em]"
          style={{ color: accent }}
        >
          {eyebrow}
        </motion.p>

        <motion.h1
          {...rise(0.06)}
          className="mt-5 max-w-[18ch] font-['Outfit'] text-4xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-5xl lg:text-[68px]"
        >
          {headline}
        </motion.h1>

        <motion.p
          {...rise(0.12)}
          className="mt-6 max-w-[64ch] text-[16px] leading-[1.75] text-white/55 sm:text-[18px]"
        >
          {standfirst}
        </motion.p>

        <motion.p {...rise(0.18)} className="mt-5 text-[14px] text-white/35">
          {years}
        </motion.p>

        <motion.div {...rise(0.24)} className="mt-9 flex flex-wrap gap-3">
          <Link to="/resume" className={buttonClasses("primary", "md")}>
            Read the résumé
          </Link>
          <Link to="/contact" className={buttonClasses("secondary", "md")}>
            Start a conversation
          </Link>
        </motion.div>
      </div>
    </section>

    {/* ── The work, before the argument about it ────────────────────
        A discipline page that opens with a headline, four method cards and a
        research table is a page about design with no design on it. This band
        is the evidence, placed before the reasoning rather than after it: the
        spans tessellate into two complete rectangles, so the section ends on a
        straight edge instead of a notch. ── */}
    {gallery?.length > 0 && (
      <section className="px-4 pb-4 sm:px-8 lg:px-16">
        {/* Two layouts, not one scaled down. The 12-column bento with 34px rows
            only makes sense at desktop width; on a phone those row spans made
            every frame a 60px letterbox strip with the image crushed inside it.
            Below lg this is a plain two-column grid where each frame states its
            own aspect ratio, so a portrait shot stays portrait. */}
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-4 lg:auto-rows-[34px] lg:grid-cols-12">
          {gallery.map((g, i) => (
            <motion.figure
              key={g.src}
              {...rise(i * 0.05)}
              className={`group relative m-0 overflow-hidden rounded-2xl border border-white/8 bg-white/[0.02] lg:aspect-auto ${g.mobile || "aspect-[4/5]"} ${g.cell}`}
            >
              <img
                src={g.src}
                alt={g.alt}
                loading={i < 2 ? "eager" : "lazy"}
                /* A photograph can be cropped to the frame; a logo cannot —
                   crop it and the mark is no longer the mark. Frames that hold
                   one ask to be fitted instead. */
                className={`h-full w-full transition-transform duration-[900ms] ease-out group-hover:scale-[1.03] ${
                  g.fit === "contain"
                    ? "object-contain p-6 sm:p-10"
                    : "object-cover"
                }`}
              />
              <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent px-4 pb-3 pt-10 text-[12px] font-medium leading-[1.4] text-white/0 transition-colors duration-300 group-hover:text-white/80">
                {g.alt}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </section>
    )}

    {/* ── Method ────────────────────────────────────────────────────── */}
    <section className="px-4 py-16 sm:px-8 lg:px-16 lg:py-24">
      <div className="mx-auto max-w-[1100px]">
        <motion.h2
          {...rise()}
          className="mb-3 font-['Outfit'] text-[28px] font-semibold tracking-[-0.03em] sm:text-[34px]"
        >
          How the work actually goes
        </motion.h2>
        <motion.p
          {...rise(0.06)}
          className="mb-10 max-w-[60ch] text-[15px] leading-[1.7] text-white/40"
        >
          Not a process diagram. This is the order things happen in, and what
          each step is for.
        </motion.p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {method.map((m, i) => (
            <motion.div key={m.title} {...rise(i * 0.06)} className="h-full">
              <TiltCard className="h-full" max={4}>
                <div className="sheen flex h-full flex-col rounded-2xl border border-white/8 bg-white/[0.025] p-6 transition-colors duration-300 hover:border-white/18">
                  <span
                    className="text-[12px] font-bold tabular-nums"
                    style={{ color: accent }}
                  >
                    {m.n}
                  </span>
                  <h3 className="mt-3 text-[17px] font-semibold text-white">
                    {m.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-[1.65] text-white/45">
                    {m.body}
                  </p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── Research ──────────────────────────────────────────────────── */}
    <section className="border-t border-white/8 px-4 py-16 sm:px-8 lg:px-16 lg:py-24">
      <div className="mx-auto max-w-[1100px]">
        <motion.h2
          {...rise()}
          className="mb-3 font-['Outfit'] text-[28px] font-semibold tracking-[-0.03em] sm:text-[34px]"
        >
          What I mean by research
        </motion.h2>
        <motion.p
          {...rise(0.06)}
          className="mb-12 max-w-[68ch] text-[15px] leading-[1.75] text-white/45"
        >
          {research.intro}
        </motion.p>

        <div className="space-y-px overflow-hidden rounded-2xl border border-white/8">
          {research.cases.map((c, i) => (
            <motion.div
              key={c.question}
              {...rise(i * 0.05)}
              className="bg-white/[0.02] p-6 sm:p-8"
            >
              {/* Which project this came from, stated on the row. It keeps a
                  reader from having to guess, and it makes an uneven spread
                  visible rather than quietly implied. */}
              {c.project && (
                <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/25">
                  {c.project}
                </p>
              )}
              <div className="grid gap-5 lg:grid-cols-4 lg:gap-8">
                {[
                  ["The question", c.question],
                  ["Where I looked", c.where],
                  ["What I found", c.found],
                  ["What changed", c.changed],
                ].map(([label, value], j) => (
                  <div key={label}>
                    <p
                      className="mb-2 text-[10.5px] font-bold uppercase tracking-[0.18em]"
                      style={{
                        color: j === 3 ? accent : "rgba(255,255,255,0.28)",
                      }}
                    >
                      {label}
                    </p>
                    <p
                      className={`text-[14px] leading-[1.65] ${
                        j === 3 ? "text-white/75" : "text-white/45"
                      }`}
                    >
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          {...rise(0.1)}
          className="mt-6 max-w-[66ch] text-[13.5px] leading-[1.7] text-white/28"
        >
          The fourth column is the one that matters. Research that does not
          change a decision is reading, and reading is not a deliverable.
        </motion.p>
      </div>
    </section>

    {/* ── The work ──────────────────────────────────────────────────── */}
    <section className="border-t border-white/8 pt-16 lg:pt-24">
      <div className="mx-auto mb-2 max-w-[1100px] px-4 sm:px-8 lg:px-16">
        <motion.h2
          {...rise()}
          className="font-['Outfit'] text-[28px] font-semibold tracking-[-0.03em] sm:text-[34px]"
        >
          The work
        </motion.h2>
        {gridNote && (
          <motion.p
            {...rise(0.06)}
            className="mt-3 max-w-[62ch] text-[15px] leading-[1.7] text-white/40"
          >
            {gridNote}
          </motion.p>
        )}
      </div>

      <ProjectGrid tab={tab} />
    </section>

    {/* ── Cross-link ────────────────────────────────────────────────── */}
    {crossLink && (
      <section className="border-t border-white/8 px-4 py-16 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-[1100px]">
          <p className="type-eyebrow mb-6 text-white/30">The other half</p>
          <TiltCard max={4}>
            <Link
              to={crossLink.to}
              className="sheen group flex flex-col rounded-2xl border border-white/8 bg-white/[0.025] p-7 transition-colors duration-300 hover:border-white/20 sm:p-9"
            >
              <h3 className="font-['Outfit'] text-[24px] font-semibold tracking-[-0.03em] text-white sm:text-[28px]">
                {crossLink.label}
              </h3>
              <p className="mt-2 max-w-[58ch] text-[14.5px] leading-[1.7] text-white/45">
                {crossLink.blurb}
              </p>
              <span
                className="mt-6 inline-flex items-center gap-2 text-[14px] font-semibold transition-transform duration-300 group-hover:translate-x-1"
                style={{ color: accent }}
              >
                Go there
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
              </span>
            </Link>
          </TiltCard>
        </div>
      </section>
    )}

    <BuildSection />
  </div>
);

export default DisciplineLanding;
