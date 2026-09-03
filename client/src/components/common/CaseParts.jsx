// src/components/common/CaseParts.jsx
//
// Shared layout and motion primitives for case-study pages.
//
// THE WIDTH RULE. Text and media want opposite things. Prose past ~68 characters
// gets hard to track back to the next line; a screenshot of desktop software
// inside 68 characters of width is decoration, not evidence. So they are
// separated: `Prose` holds the reading measure, `Media` takes the full content
// container, and `Section width="bleed"` gives a hero or a key screen the whole
// viewport minus gutters.
//
// Both share one left edge. Centering each block at its own width would leave
// the page with a ragged spine — instead everything starts at the same x and
// only the right edge differs, so wide media reads as an extension of the
// column rather than a separate composition.
//
// NO NEGATIVE-MARGIN BLEED. The usual `-mx-[50vw] w-screen` trick overshoots by
// the scrollbar width and pushes the document sideways. This site cannot clip
// that away — `overflow-x: hidden` on an ancestor kills `position: sticky`
// everywhere below it — so bleed sections simply carry no max-width instead.

import React from "react";
import { motion, useInView } from "framer-motion";

const G = "#a3e635";
const EASE = [0.22, 0.61, 0.36, 1];

/* ── section shell ───────────────────────────────────────────────────────── */

/* Bleed is not "no limit". Past ~1560px a heading line runs so far that the eye
   loses the return sweep, and a 16:9 frame gets taller than the viewport — at
   which point the reader can no longer see a whole screen at once, which is the
   entire reason these sections are wide. Media inside bleed should also carry a
   `fitHeight` so height, not width, is what bounds it. */
const WIDTHS = {
  default: "max-w-[1400px]",
  narrow: "max-w-[1120px]",
  bleed: "max-w-[1560px]",
};

export const Section = ({
  id,
  children,
  width = "default",
  first = false,
  className = "",
}) => (
  <section
    id={id}
    className={`scroll-mt-28 px-4 py-20 sm:px-8 sm:py-24 lg:px-12 ${
      first ? "" : "border-t border-white/5"
    } ${className}`}
  >
    <div className={`mx-auto ${WIDTHS[width] || WIDTHS.default}`}>
      {children}
    </div>
  </section>
);

/* Reading measure. Everything that is words lives in here. */
export const Prose = ({ children, className = "" }) => (
  <div className={`max-w-[68ch] ${className}`}>{children}</div>
);

/* ── motion ──────────────────────────────────────────────────────────────── */

/* Standard block entry: lift and fade, once. */
export const Rise = ({ children, delay = 0, className = "" }) => {
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.12 });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
};

/* Media entry: the same lift plus a slight scale-up, so a screen settles into
   place rather than sliding in. Slower than Rise because a large object moving
   at text speed reads as jumpy — bigger things should feel heavier. */
export const RiseMedia = ({ children, delay = 0, className = "" }) => {
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.08 });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40, scale: 0.965 }}
      animate={
        inView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 40, scale: 0.965 }
      }
      transition={{ duration: 0.95, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
};

/* Staggered group. Children arrive in sequence rather than as a slab, which is
   what makes a grid of cards read as a list being dealt out. Wrap each child in
   <StaggerItem>. */
export const Stagger = ({
  children,
  className = "",
  step = 0.07,
  delay = 0,
}) => {
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "shown" : "hidden"}
      variants={{
        hidden: {},
        shown: { transition: { staggerChildren: step, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem = ({ children, className = "" }) => (
  <motion.div
    className={className}
    variants={{
      hidden: { opacity: 0, y: 26 },
      shown: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
    }}
  >
    {children}
  </motion.div>
);

/* ── type ────────────────────────────────────────────────────────────────── */

export const SLabel = ({ n, t }) => (
  <p className="type-eyebrow mb-5" style={{ color: G }}>
    {n} — {t}
  </p>
);

/* Section heading. Two-tone by default — the second half carries the accent,
   which is the pattern every existing case study on the site already uses. */
export const SHead = ({ white, accent, className = "" }) => (
  <h2 className={`type-display-3 ${className}`}>
    <span className="text-white">{white} </span>
    {accent && <span style={{ color: G }}>{accent}</span>}
  </h2>
);

export const ACCENT = G;

/* A seam-killer.
   Two near-black bands butted together read as a mistake — the eye finds the
   line long before it finds the section change. This is a short gradient that
   carries one page colour into the next, so the change registers as a fade
   rather than an edge. `from` is the colour above it, `to` the colour below. */
export const Blend = ({ from = "#07090C", to = "#050505", h = 120 }) => (
  <div
    aria-hidden="true"
    style={{ height: h, background: `linear-gradient(${from}, ${to})` }}
  />
);
