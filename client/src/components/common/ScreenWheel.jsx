// src/components/common/ScreenWheel.jsx
//
// Six screens on a wheel.
//
// A run of six ScreenFrames is six identical rectangles scrolled past one after
// another — correct, and completely flat. This puts the same screens on a
// vertical carousel seen edge-on, the way the tread of a tyre faces a camera:
// the screen at the front sits square to the reader at full size, the ones
// above and below are rotated away on the rim, smaller, dimmer and softened, so
// only one is ever the subject.
//
// Two things make it work rather than just spin:
//
// 1. Geometry in the element's own units. translateY is a percentage, which CSS
//    resolves against the slide's own height, so the wheel keeps its proportions
//    on any viewport without measuring anything in JavaScript.
// 2. rotateX does the foreshortening, not a hand-tuned scale. The parent holds
//    the perspective; each slide is a flat panel tangent to the rim, so the
//    narrowing at the top and bottom of the stage is the projection doing it.
//
// The copy does not ride the wheel. It sits in a fixed strip under the stage and
// crossfades, because text tilted 30 degrees away from the reader is decoration.
//
// Reduced motion gets the honest fallback: the same screens, stacked, no wheel.

import React from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";

const G = "#a3e635";

/* Degrees between one slide and the next, measured around the rim. */
const STEP_DEG = 30;
/* Rim radius, in slide-heights. Sets how far apart the slides sit. */
const RADIUS = 2.05;
const RAD = Math.PI / 180;

const EASE = [0.22, 0.61, 0.36, 1];

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

/* One panel on the rim. `u` is the wheel's continuous position: u = 2.5 means
   halfway between the third and fourth slide. */
const Slide = ({ item, i, u, isActive, onOpen }) => {
  const d = useTransform(u, (v) => i - v);

  const y = useTransform(
    d,
    (v) => `${RADIUS * Math.sin(v * STEP_DEG * RAD) * 100}%`,
  );
  const rotateX = useTransform(d, (v) => -v * STEP_DEG);
  const scale = useTransform(d, (v) => clamp(1 - Math.abs(v) * 0.12, 0.6, 1));
  const opacity = useTransform(d, (v) => clamp(1 - Math.abs(v) * 0.5, 0, 1));
  const filter = useTransform(
    d,
    (v) => `blur(${Math.min(Math.abs(v) * 2.4, 7)}px)`,
  );
  const zIndex = useTransform(d, (v) => Math.round(100 - Math.abs(v) * 10));

  return (
    <motion.div
      style={{
        y,
        rotateX,
        scale,
        opacity,
        filter,
        zIndex,
        transformStyle: "preserve-3d",
        /* Wide on a tall display, self-limiting on a short one: the third term
           keeps the whole slide inside the stage rather than letting a 1240px
           screen run off the top and bottom of a laptop viewport. */
        width: "min(1240px, 90vw, calc(58vh * 1.6))",
      }}
      className="absolute"
    >
      {/* Only the front slide is interactive. A slide tilted 30 degrees away
          on the rim is scenery, and giving scenery a click target is how a
          reader ends up opening the wrong screen. */}
      <button
        type="button"
        onClick={isActive ? onOpen : undefined}
        tabIndex={isActive ? 0 : -1}
        aria-hidden={!isActive}
        aria-label={`Open ${item.title} full size`}
        className={`sheen group block w-full overflow-hidden rounded-2xl border border-white/12 bg-[#04101F] p-0 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)] ${isActive ? "cursor-zoom-in" : "pointer-events-none"}`}
        style={{ aspectRatio: "16/10" }}
      >
        <img
          src={item.src}
          alt={item.alt || item.title}
          loading="lazy"
          className="h-full w-full object-cover object-top"
        />
        {isActive && (
          <span className="pointer-events-none absolute bottom-4 right-4 z-[5] flex items-center gap-2 rounded-full border border-white/20 bg-black/55 px-3.5 py-2 text-[12px] font-semibold text-white/80 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M9 3H3v6M15 21h6v-6M21 9V3h-6M3 15v6h6"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Fill the screen
          </span>
        )}
      </button>
    </motion.div>
  );
};

const ScreenWheel = ({ items }) => {
  const trackRef = React.useRef(null);
  const reduced = useReducedMotion();
  const [active, setActive] = React.useState(0);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  const last = Math.max(items.length - 1, 1);
  const u = useTransform(scrollYProgress, (p) => p * last);

  const [open, setOpen] = React.useState(null);

  useMotionValueEvent(u, "change", (v) => {
    const n = clamp(Math.round(v), 0, items.length - 1);
    setActive((prev) => (prev === n ? prev : n));
  });

  /* Settle onto the nearest slide.
     Native CSS scroll-snap is not an option here: the site runs Lenis, and a
     smooth scroller and the browser's snap engine fight each other. So the snap
     is done by hand — wait for the wheel to stop, work out which slide is
     nearest, and drive Lenis to that exact offset. Without it the wheel comes
     to rest halfway between two screens, which is what makes it feel loose. */
  React.useEffect(() => {
    if (reduced) return;
    let timer = null;

    const settle = () => {
      const el = trackRef.current;
      if (!el || open !== null) return;
      const rect = el.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      const travel = el.offsetHeight - window.innerHeight;
      if (travel <= 0) return;

      /* Only snap while the wheel actually owns the viewport. */
      if (rect.top > 8 || rect.bottom < window.innerHeight - 8) return;

      const p = clamp((window.scrollY - top) / travel, 0, 1);
      const nearest = Math.round(p * last);
      const target = Math.round(top + (nearest / last) * travel);
      if (Math.abs(target - window.scrollY) < 4) return;

      if (window.__lenis) window.__lenis.scrollTo(target, { duration: 0.45 });
      else window.scrollTo({ top: target, behavior: "smooth" });
    };

    const onScroll = () => {
      clearTimeout(timer);
      timer = setTimeout(settle, 140);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [reduced, last, open]);

  /* Escape closes the expanded view, and the page underneath stays put. */
  React.useEffect(() => {
    if (open === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    if (window.__lenis) window.__lenis.stop();
    return () => {
      window.removeEventListener("keydown", onKey);
      if (window.__lenis) window.__lenis.start();
    };
  }, [open]);

  if (reduced) {
    return (
      <div className="space-y-10">
        {items.map((it) => (
          <div key={it.title}>
            <div
              className="overflow-hidden rounded-2xl border border-white/12 bg-[#04101F]"
              style={{ aspectRatio: "16/10" }}
            >
              <img
                src={it.src}
                alt={it.alt || it.title}
                loading="lazy"
                className="h-full w-full object-cover object-top"
              />
            </div>
            <p className="type-eyebrow mt-5 mb-2" style={{ color: G }}>
              {it.kicker}
            </p>
            <h3 className="type-h1 mb-3 text-white">{it.title}</h3>
            <p className="max-w-[68ch] text-[15px] leading-[1.75] text-white/55">
              {it.body}
            </p>
          </div>
        ))}
      </div>
    );
  }

  const cur = items[active] || items[0];

  return (
    /* One tall track; the stage inside it is what the reader actually sees.
       ~82vh of scroll per slide is enough to read the copy without the wheel
       feeling like it is being dragged. */
    <div
      ref={trackRef}
      style={{ height: `${items.length * 82}vh` }}
      className="relative"
    >
      <div className="sticky top-0 flex h-[100svh] flex-col justify-between overflow-hidden pt-20 pb-8">
        {/* The copy sits over the rim, so it gets its own ground rather than
           competing with whichever slide is arriving underneath it. */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[150] h-36"
          style={{ background: "linear-gradient(transparent, #050A12 62%)" }}
        />
        {/* the wheel */}
        <div
          className="relative flex flex-1 items-center justify-center"
          style={{ perspective: "1700px", perspectiveOrigin: "50% 50%" }}
        >
          {items.map((it, i) => (
            <Slide
              key={it.title}
              item={it}
              i={i}
              u={u}
              isActive={i === active}
              onOpen={() => setOpen(i)}
            />
          ))}

          {/* The rim runs off the top and bottom of the stage rather than
              stopping at a hard edge. */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-28"
            style={{ background: "linear-gradient(#050A12 10%, transparent)" }}
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-28"
            style={{ background: "linear-gradient(transparent, #050A12 90%)" }}
          />
        </div>

        {/* the copy, held still under the wheel */}
        <div className="relative z-[200] mx-auto w-full max-w-[1240px] px-4 pt-6 sm:px-6">
          <div className="mb-5 flex items-center gap-2" aria-hidden="true">
            {items.map((it, i) => (
              <span
                key={it.title}
                className="h-[3px] flex-1 rounded-full transition-colors duration-300"
                style={{
                  background: i === active ? G : "rgba(255,255,255,0.12)",
                }}
              />
            ))}
          </div>

          <motion.div
            key={cur.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
            className="grid gap-x-10 gap-y-3 md:grid-cols-[minmax(0,30ch)_minmax(0,1fr)]"
          >
            <div>
              <p className="type-eyebrow mb-2" style={{ color: G }}>
                {cur.kicker}
              </p>
              <h3 className="text-[21px] font-semibold leading-[1.25] text-white">
                {cur.title}
              </h3>
            </div>
            <div>
              <p className="max-w-[70ch] text-[15.5px] leading-[1.7] text-white/60">
                {cur.body}
              </p>
              {cur.href && (
                <a
                  href={cur.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-[14.5px] font-semibold"
                  style={{ color: "#7BF003" }}
                >
                  {cur.hrefLabel || "Open it live"}
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M7 17 17 7M9 7h8v8"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Filling the screen.
          A 16:10 capture at 1000px is a picture of an interface; the same
          capture at the full width of the reader's monitor is closer to using
          it. The blur behind it is doing the same job the wheel does — putting
          everything except the subject out of focus. */}
      <AnimatePresence>
        {open !== null && (
          <motion.div
            key="wheel-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            onClick={() => setOpen(null)}
            role="dialog"
            aria-modal="true"
            aria-label={items[open].title}
            className="fixed inset-0 z-[999] flex flex-col items-center justify-center gap-5 p-4 sm:p-8"
            style={{
              background: "rgba(4,7,12,0.82)",
              backdropFilter: "blur(18px)",
            }}
          >
            <motion.img
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.36, ease: EASE }}
              src={items[open].src}
              alt={items[open].alt || items[open].title}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[82vh] w-auto max-w-full rounded-xl border border-white/12 shadow-[0_60px_160px_-40px_rgba(0,0,0,0.95)]"
            />

            <div
              className="flex w-full max-w-[900px] flex-wrap items-center justify-between gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <p className="type-eyebrow mb-1" style={{ color: G }}>
                  {items[open].kicker}
                </p>
                <p className="text-[16px] font-semibold text-white">
                  {items[open].title}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setOpen((n) => (n > 0 ? n - 1 : items.length - 1))
                  }
                  aria-label="Previous screen"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-white/35 hover:text-white"
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                    style={{ transform: "rotate(180deg)" }}
                  >
                    <path
                      d="M5 12h14M13 6l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setOpen((n) => (n < items.length - 1 ? n + 1 : 0))
                  }
                  aria-label="Next screen"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-white/35 hover:text-white"
                >
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
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(null)}
                  className="ml-2 rounded-full border border-white/15 px-4 py-2.5 text-[13px] font-semibold text-white/70 transition hover:border-white/35 hover:text-white"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ScreenWheel;
