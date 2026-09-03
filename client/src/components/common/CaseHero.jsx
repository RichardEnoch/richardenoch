// src/components/common/CaseHero.jsx
//
// The opening frame of a case study.
//
// Full-bleed image, copy anchored to the bottom-left, meta strip under it. The
// existing brand case studies (TabStudio, Verde Luxe) already open this way, so
// the featured pages inherit the pattern rather than inventing a second one —
// but anchored left instead of centred, because the case-study body is built on
// a single left edge and the hero should start that line rather than break it.
//
// The gradient runs to the page background rather than to a flat black, so the
// image dissolves into the first section instead of ending at a seam. Anything
// that isn't full-strength dark at the bottom leaves a visible band where the
// hero stops.

import React from "react";
import { motion } from "framer-motion";

const G = "#a3e635";
const EASE = [0.22, 0.61, 0.36, 1];

const CaseHero = ({
  image,
  imageAlt = "",
  badge,
  title,
  lead,
  meta = [],
  /* Where the interesting part of the photograph sits. Most of these frames put
     their subject centre-right, and the copy sits bottom-left, so the default
     nudges the crop away from the text. */
  focus = "center",
  overlay = "#07090C",
  minHeight = "86vh",
}) => (
  <section
    className="relative flex w-full flex-col overflow-hidden"
    style={{ minHeight }}
  >
    {/* ── image + scrim ──
        Pages about system artefacts rather than buildings — the design system,
        the brand — pass no image and get a constructed ground instead: an
        accent glow over a faint measuring grid. Better than a photograph that
        has nothing to do with the subject, and better than a flat panel. */}
    <div className="pointer-events-none absolute inset-0">
      {!image && (
        <>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(${G}0E 1px, transparent 1px), linear-gradient(90deg, ${G}0E 1px, transparent 1px)`,
              backgroundSize: "72px 72px",
              maskImage:
                "radial-gradient(120% 90% at 30% 40%, #000 0%, transparent 72%)",
              WebkitMaskImage:
                "radial-gradient(120% 90% at 30% 40%, #000 0%, transparent 72%)",
            }}
          />
          <div
            className="absolute -left-40 top-0 h-[620px] w-[620px] rounded-full blur-[150px]"
            style={{ background: `${G}1F` }}
          />
          <div
            className="absolute -right-32 bottom-0 h-[520px] w-[520px] rounded-full blur-[140px]"
            style={{ background: "#239CFF22" }}
          />
        </>
      )}
      {image && (
        <motion.img
          src={image}
          alt={imageAlt}
          initial={{ scale: 1.06, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: EASE }}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: focus }}
        />
      )}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to bottom, ${overlay}CC 0%, ${overlay}99 30%, ${overlay}E6 72%, ${overlay} 100%)`,
        }}
      />
      {/* left-side scrim so the copy holds contrast over a busy frame */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to right, ${overlay}D9 0%, ${overlay}66 42%, transparent 70%)`,
        }}
      />
    </div>

    {/* ── copy ── */}
    <div className="relative z-10 mt-auto px-4 pb-16 pt-32 sm:px-8 sm:pb-20 lg:px-12">
      <div className="mx-auto max-w-[1560px]">
        {badge && (
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
            className="mb-7 inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold backdrop-blur"
            style={{ borderColor: `${G}44`, color: G, background: `${G}14` }}
          >
            {badge}
          </motion.span>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.24 }}
          className="type-display-1 mb-6 max-w-[18ch]"
          style={{
            background: "linear-gradient(180deg,#ffffff 0%,#b4b4b4 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {title}
        </motion.h1>

        {lead && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: EASE, delay: 0.34 }}
            className="max-w-[60ch] text-[17px] leading-[1.65] text-white/70 sm:text-[19px]"
          >
            {lead}
          </motion.p>
        )}

        {meta.length > 0 && (
          <motion.dl
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: EASE, delay: 0.46 }}
            className="mt-12 grid gap-x-10 gap-y-6 border-t border-white/12 pt-7 sm:grid-cols-2 lg:grid-cols-4"
          >
            {meta.map((m) => (
              <div key={m.label}>
                <dt className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">
                  {m.label}
                </dt>
                <dd className="m-0 text-[15px] font-medium leading-[1.4] text-white/85">
                  {m.value}
                </dd>
              </div>
            ))}
          </motion.dl>
        )}
      </div>
    </div>
  </section>
);

export default CaseHero;
