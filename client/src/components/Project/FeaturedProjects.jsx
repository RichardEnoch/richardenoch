// src/components/Project/FeaturedProjects.jsx
//
// Featured projects, above the grid.
//
// The grid gives every project one tile of equal weight, which is right for a
// body of work and wrong for the two projects that carry the argument. A
// featured project is a top-tier one that cuts across several niches at once —
// ADLM Studio is brand identity, a design system, a website and a product
// suite for the same client; NIQS is a website, an admin product, a brand
// guideline and the collateral around it.
//
// The deck works the way the brand-guideline carousels do elsewhere on the
// site: the section pins, and scrolling moves through the cards rather than
// past them. A horizontal swipe track asked for a gesture nobody makes on a
// desktop, and the second card went unseen; scroll is the gesture everyone is
// already making. The card behind sits blurred and scaled back, so there is
// never a question about which one is being read — and it is visibly a card,
// not an edge-to-edge panel, so its shape can be taken in at a glance.
//
// Each card carries the project's sub-categories, and each of those leads to
// that discipline's own page — that is the job of this section. Everything
// else lives in the grid underneath.

import React from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import TiltCard from "../common/TiltCard";

import adlmHero from "../../assets/ADLM/hub-hero.webp";
import niqsHero from "../../assets/websiteThumbs/niqs.webp";
import { ADLM_CASE_STUDY_LIVE } from "../../config/featureFlags";

const ADLM = "/projects/featured/adlm-studio";
const EASE = [0.22, 0.61, 0.36, 1];

const ALL_PROJECTS = [
  {
    id: "adlm",
    name: "ADLM Studio",
    sector: "Construction technology",
    line: "One client, four disciplines.",
    blurb:
      "Take-off and estimating software for an industry that still measures by hand. The identity, the design system, the marketing site and the product interface are all mine, which makes this the one project where the whole range sits in a single body of work.",
    img: adlmHero,
    hub: ADLM,
    hubLabel: "Start with the overview",
    parts: [
      { to: `${ADLM}/brand`, t: "Brand identity" },
      { to: `${ADLM}/design-system`, t: "Design system" },
      { to: `${ADLM}/website`, t: "Website" },
      { to: `${ADLM}/product`, t: "Product · UI/UX" },
      { to: "/adlm-studio-designs", t: "Social & marketing" },
    ],
  },
  {
    id: "niqs",
    name: "NIQS",
    sector: "Professional body · Institutional",
    line: "A national institute, brought online.",
    blurb:
      "The Nigerian Institute of Quantity Surveyors had outdated media and a secretariat running on paper. The work covers the public website, the admin side that replaced the paperwork, the brand guideline, and the merchandise and stationery around it.",
    img: niqsHero,
    hub: "/ui-projects/niqs",
    hubLabel: "Open the NIQS project",
    /* NIQS has no discipline pages yet, so these are stated rather than
       linked. A chip that goes nowhere is worse than a label. */
    parts: [
      { t: "Brand identity" },
      { t: "Website" },
      { t: "Product · UI/UX" },
      { t: "Graphic design" },
    ],
  },
];

/* The fan needs a card that fits inside a pinned viewport, and that is a
   question about height as much as width. Below lg the card stacks and roughly
   doubles in height; above lg but on a short screen — a 1024×768 tablet in
   landscape, a laptop with a browser bar and a dock — the side-by-side card
   still runs past the bottom of the pin and gets its own edge cut off.
   Either condition drops the section to a plain scrolled column, which has no
   height requirement at all. */
function useIsNarrow() {
  const query = "(max-width: 1023px), (max-height: 799px)";
  const [narrow, setNarrow] = React.useState(() =>
    typeof window !== "undefined" && window.matchMedia
      ? window.matchMedia(query).matches
      : false,
  );
  React.useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia(query);
    const update = () => setNarrow(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return narrow;
}

const Chip = ({ part }) =>
  part.to ? (
    <Link
      to={part.to}
      className="group/chip inline-flex items-center gap-2 rounded-lg border border-white/12 bg-white/[0.05] px-3.5 py-2 text-[13px] font-semibold text-white/75 transition hover:border-[#89ff00]/70 hover:bg-[#89ff00]/10 hover:text-white"
    >
      {part.t}
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="opacity-35 transition group-hover/chip:translate-x-0.5 group-hover/chip:opacity-100"
      >
        <path
          d="M5 12h14M13 6l6 6-6 6"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  ) : (
    <span className="inline-flex items-center rounded-lg border border-white/8 px-3.5 py-2 text-[13px] font-medium text-white/35">
      {part.t}
    </span>
  );

/* One card in the fan. Position, scale, blur and depth are all read off a
   single spring-smoothed index, so a card cannot be half-way between two
   states — the same arrangement the guideline carousels use. */
/* The card itself, layout-agnostic. Below lg it stacks image-over-copy and
   grows to about twice the height of a phone screen — which is why the fan
   below is desktop-only. A pinned viewport clips a card that tall, and what
   falls off the bottom is the row of discipline chips, the one thing this
   section exists to hand a reader. */
/* ADLM leads this deck, and every one of its links goes into the gated case
   study. While that is off it drops out and the deck runs one project shorter,
   rather than opening with a card that cannot be clicked. */
const PROJECTS = ALL_PROJECTS.filter(
  (p) => p.id !== "adlm" || ADLM_CASE_STUDY_LIVE,
);

const CardBody = ({ p, i, total }) => (
  <TiltCard className="group h-full" max={4}>
    <div className="sheen h-full overflow-hidden rounded-[26px] border border-white/10 bg-[#0b0d10] transition-colors duration-300 group-hover:border-[#89ff00]/40">
      <div className="grid h-full lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
        {/* the thumbnail */}
        <div className="relative min-h-[200px] overflow-hidden lg:min-h-[380px]">
          <img
            src={p.img}
            alt={p.name}
            loading={i === 0 ? "eager" : "lazy"}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(11,13,16,0.15), rgba(11,13,16,0.55))",
            }}
          />
          <span className="absolute left-5 top-5 flex items-center gap-2.5 rounded-full border border-white/15 bg-black/45 px-3.5 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.2em] text-white/70 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-lime-400" />
            Featured
            <span className="font-mono tabular-nums text-white/35">
              {String(i + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
            </span>
          </span>
        </div>

        {/* the copy */}
        <div className="flex flex-col p-6 sm:p-8">
          <h3 className="font-['Outfit'] text-[clamp(1.9rem,3vw,2.7rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-white">
            {p.name}
          </h3>
          <p className="mt-2 text-[clamp(1rem,1.4vw,1.25rem)] font-medium leading-[1.25] tracking-[-0.02em] text-lime-400">
            {p.line}
          </p>
          <p className="mt-1.5 text-[11.5px] font-semibold uppercase tracking-[0.18em] text-white/30">
            {p.sector}
          </p>

          <p className="mt-5 text-[14.5px] leading-[1.7] text-white/50">
            {p.blurb}
          </p>

          <ul className="mt-6 flex list-none flex-wrap gap-2 p-0">
            {p.parts.map((part) => (
              <li key={part.t}>
                <Chip part={part} />
              </li>
            ))}
          </ul>

          <Link
            to={p.hub}
            className="sheen sheen-dark mt-auto inline-flex w-fit items-center gap-2 self-start rounded-xl bg-lime-400 px-5 py-3 text-[13.5px] font-bold text-black transition hover:brightness-110"
          >
            {p.hubLabel}
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M5 12h14M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  </TiltCard>
);

/* One card in the fan. Position, scale, blur and depth are all read off a
   single spring-smoothed index, so a card cannot be half-way between two
   states — the same arrangement the guideline carousels use. */
const FanCard = ({ p, i, total, index }) => {
  const x = useTransform(index, (v) => `${(i - v) * 26}vw`);
  const scale = useTransform(index, (v) =>
    Math.max(0.7, 1 - Math.min(Math.abs(i - v), 1) * 0.3),
  );
  const opacity = useTransform(index, (v) => {
    const d = Math.abs(i - v);
    if (d > 1.7) return 0;
    return Math.max(0.25, 1 - d * 0.55);
  });
  const filter = useTransform(
    index,
    (v) => `blur(${Math.min(Math.abs(i - v), 1) * 14}px)`,
  );
  const zIndex = useTransform(index, (v) =>
    Math.round(20 - Math.abs(i - v) * 10),
  );

  return (
    <motion.div
      className="absolute inset-0 m-auto flex items-center justify-center px-4"
      style={{ x, scale, opacity, filter, zIndex }}
    >
      <div className="w-[min(88vw,1080px)] max-h-full">
        <CardBody p={p} i={i} total={total} />
      </div>
    </motion.div>
  );
};

const Heading = () => (
  <div className="mx-auto flex w-full max-w-[1440px] shrink-0 flex-col gap-4 px-6 pb-4 pt-24 lg:flex-row lg:items-end lg:justify-between lg:px-16">
    <h2
      className="
        font-['Outfit'] font-semibold
        text-[38px] sm:text-5xl lg:text-[64px]
        leading-[1.02] tracking-[-0.03em]
        bg-gradient-to-b from-[#FCFCFC] via-[#E4E4E4] to-[#8E8E8E]
        bg-clip-text text-transparent
      "
    >
      Two clients, the whole range
    </h2>
    <p className="max-w-[44ch] text-[15px] leading-[1.7] text-white/45">
      Brand, system, site and product — all four for the same job. Pick the
      discipline you came for.
    </p>
  </div>
);

const FeaturedProjects = () => {
  const containerRef = React.useRef(null);
  const [active, setActive] = React.useState(0);
  const last = PROJECTS.length - 1;
  const narrow = useIsNarrow();

  /* Scroll through the section drives the deck. The range is mapped straight
     onto the cards so the final one lands exactly as the pin releases —
     leaving slack at the end reads as the section having stopped working. */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const raw = useTransform(scrollYProgress, [0, 1], [0, Math.max(1, last)]);

  /* Rounding commits each band of scroll to a single card, and the spring
     eases the hand-off, so the deck clicks between cards instead of drifting
     under the wheel. */
  const index = useSpring(
    useTransform(raw, (v) => Math.round(v)),
    { stiffness: 200, damping: 30, mass: 0.7 },
  );

  useMotionValueEvent(raw, "change", (v) => {
    const n = Math.max(0, Math.min(last, Math.round(v)));
    setActive((prev) => (prev === n ? prev : n));
  });

  const goTo = (n) => {
    const el = containerRef.current;
    if (!el) return;
    const scrollable = el.offsetHeight - window.innerHeight;
    const target =
      el.offsetTop +
      (Math.max(0, Math.min(last, n)) / Math.max(1, last)) * scrollable;
    if (window.__lenis) window.__lenis.scrollTo(target);
    else window.scrollTo({ top: target, behavior: "smooth" });
  };

  /* Phones and tablets: no pin, no fan, no dot rail. Two cards read top to
     bottom, which is the gesture the device is already making, and nothing is
     clipped. */
  /* containerRef is still attached here. useScroll above runs on every render
     and throws "target ref is defined but not hydrated" if its target never
     mounts — even in a branch where nothing reads the progress. */
  if (narrow) {
    return (
      <div ref={containerRef} className="relative pb-8">
        <Heading />
        <div className="flex flex-col gap-6 px-4 sm:px-6">
          {PROJECTS.map((p, i) => (
            <CardBody key={p.id} p={p} i={i} total={PROJECTS.length} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: `${PROJECTS.length * 88}vh` }}
    >
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        <Heading />

        {/* the deck */}
        <div className="relative w-full flex-1">
          {PROJECTS.map((p, i) => (
            <FanCard
              key={p.id}
              p={p}
              i={i}
              total={PROJECTS.length}
              index={index}
            />
          ))}
        </div>

        <div className="mx-auto flex w-full max-w-[1440px] shrink-0 items-center gap-4 px-6 pb-6 pt-3 lg:px-16">
          <p className="font-mono text-[11px] tabular-nums tracking-widest text-white/25">
            {String(active + 1).padStart(2, "0")} /{" "}
            {String(PROJECTS.length).padStart(2, "0")}
          </p>
          <div className="flex flex-1 items-center gap-2">
            {PROJECTS.map((p, i) => (
              <button
                key={p.id}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to ${p.name}`}
                className="h-[3px] flex-1 cursor-pointer rounded-full transition-colors duration-300 after:absolute after:inset-x-0 after:-inset-y-3 after:content-[''] relative"
                style={{
                  background:
                    i === active ? "#a3e635" : "rgba(255,255,255,0.12)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProjects;
