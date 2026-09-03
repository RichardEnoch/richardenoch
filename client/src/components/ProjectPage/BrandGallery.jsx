import React, { useRef, useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import Slot from "../common/Slot";

/* ─── lightbox portal ─── */
function Lightbox({ images, index, onClose, onPrev, onNext }) {
  const img = images[index];
  const total = images.length;

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext]);

  return createPortal(
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[999] flex items-center justify-center"
        style={{ background: "rgba(0,0,0,0.93)", backdropFilter: "blur(20px)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
      >
        {/* image container */}
        <motion.div
          className="relative flex items-center justify-center"
          style={{ maxWidth: "88vw", maxHeight: "88vh" }}
          initial={{ scale: 0.88, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.88, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={img.src}
            alt={img.alt}
            className="rounded-2xl shadow-[0_32px_120px_rgba(0,0,0,0.9)] object-contain"
            style={{ maxWidth: "88vw", maxHeight: "82vh" }}
          />

          {/* label + counter */}
          <div
            className="absolute bottom-0 left-0 right-0 flex items-end justify-between px-5 py-4 rounded-b-2xl"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)",
            }}
          >
            <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-white/80">
              {img.label || img.alt}
            </p>
            <p className="text-[11px] font-mono text-white/40">
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(total).padStart(2, "0")}
            </p>
          </div>
        </motion.div>

        {/* prev */}
        {total > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            className="absolute left-4 sm:left-8 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white/70 backdrop-blur-sm transition hover:border-white/40 hover:bg-black/70 hover:text-white"
          >
            <svg
              width="18"
              height="18"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                d="M15 18l-6-6 6-6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}

        {/* next */}
        {total > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-4 sm:right-8 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white/70 backdrop-blur-sm transition hover:border-white/40 hover:bg-black/70 hover:text-white"
          >
            <svg
              width="18"
              height="18"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                d="M9 18l6-6-6-6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}

        {/* close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white/60 backdrop-blur-sm transition hover:border-white/40 hover:bg-black/70 hover:text-white"
        >
          <svg
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              d="M18 6L6 18M6 6l12 12"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </motion.div>
    </AnimatePresence>,
    document.body,
  );
}

/* ─── single bento cell ───
   The cell fills whatever box the grid hands it. That is the trade a real
   bento makes: a column masonry keeps every image's own shape but produces a
   wall of near-identical rectangles, which is what makes it read as generated.
   Varied spans read as composed — and nothing is lost, because the lightbox
   still shows the full uncropped frame on click. */
function BentoCell({
  src,
  alt = "",
  label = "",
  color = "#a3e635",
  delay = 0,
  onClick,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0 });

  return (
    <motion.div
      ref={ref}
      className={`sheen relative h-full w-full rounded-lg sm:rounded-2xl overflow-hidden border border-white/8 bg-white/[0.02] group ${src ? "cursor-zoom-in" : "cursor-default"}`}
      initial={{ opacity: 0, scale: 0.97, filter: "blur(4px)" }}
      animate={inView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.55, ease: [0.22, 0.61, 0.36, 1], delay }}
      whileHover={
        src
          ? {
              scale: 1.02,
              boxShadow: `0 0 0 1.5px ${color}60, 0 0 0 3px ${color}12, 0 16px 48px ${color}18`,
            }
          : {}
      }
      onClick={() => src && onClick && onClick()}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="h-full w-full block object-cover transition-transform duration-500 group-hover:scale-[1.05]"
          loading="lazy"
        />
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-2 px-4 py-10">
          <div className="w-8 h-8 rounded-full border border-dashed border-white/15 flex items-center justify-center">
            <svg
              width="14"
              height="14"
              fill="none"
              viewBox="0 0 24 24"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="1.5"
            >
              <rect x="3" y="3" width="18" height="18" rx="3" />
              <path d="M3 16l5-5 4 4 3-3 6 6" />
            </svg>
          </div>
          {(label || alt) && (
            <p className="text-[10px] text-white/20 text-center leading-relaxed max-w-[140px]">
              {label || alt}
            </p>
          )}
        </div>
      )}

      {/* label slides up from bottom on hover */}
      {src && (label || alt) && (
        <div className="absolute inset-x-0 bottom-0 px-4 py-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
          <p
            className="text-[10px] font-bold tracking-[0.18em] uppercase"
            style={{ color }}
          >
            {label || alt}
          </p>
        </div>
      )}
    </motion.div>
  );
}

/* ── the bento, as bands ──
   A span cycle plus `grid-auto-flow: dense` gets you variety and a wall full
   of holes: dense back-fills what it can and leaves the rest empty, and the
   final row strands whatever is left over.

   So the layout is authored as BANDS instead. Each band is a set of tiles whose
   spans add up to a complete rectangle across the grid, in placement order, so
   normal row auto-flow lands every tile exactly where it was drawn. A band that
   sums correctly cannot leave a hole — top, middle or bottom.

   The row unit is half a column width, so spans map to real ratios:
     3 cols × 4 rows → 3 : 2   ·  4 cols × 8 rows → 1 : 1
     3 cols × 8 rows → 3 : 4   ·  6 cols × 6 rows → 2 : 1
     3 cols × 12 rows → 1 : 2  ·  12 cols × 6 rows → 4 : 1
   Every tile is wide enough or tall enough to hold the thing it is meant to
   hold — a letterhead, a bottle, a keyring, a billboard. */

/* 12 columns. Six tiles across the top band, then it varies. */
const BANDS_12 = [
  /* band 1 — h 14: portrait · square · square · tall / square · landscape */
  [
    { c: 3, r: 8 }, // 3:4  portrait — letterhead, poster
    { c: 3, r: 6 }, // 1:1  square
    { c: 3, r: 6 }, // 1:1  square
    { c: 3, r: 14 }, // 3:7 tall — roll-up, bottle
    { c: 6, r: 8 }, // 3:2 landscape — spread, signage
    { c: 3, r: 6 }, // 1:1 square
  ],
  /* band 2 — h 12: two wide bands, a tall, two squares */
  [
    { c: 6, r: 6 }, // 2:1 wide — billboard, letterhead
    { c: 3, r: 12 }, // 1:2 tall — bottle, phone
    { c: 3, r: 6 }, // 1:1
    { c: 6, r: 6 }, // 2:1 wide
    { c: 3, r: 6 }, // 1:1
  ],
  /* band 3 — h 16: two squares, one tall, one long */
  [
    { c: 4, r: 8 }, // 1:1
    { c: 4, r: 8 }, // 1:1
    { c: 4, r: 16 }, // 1:2 tall
    { c: 8, r: 8 }, // 2:1 wide
  ],
];

/* 6 columns — the same idea, halved. */
const BANDS_6 = [
  [
    { c: 2, r: 4 }, // 1:1
    { c: 2, r: 4 }, // 1:1
    { c: 2, r: 8 }, // 1:2 tall
    { c: 4, r: 4 }, // 2:1 wide
  ],
  [
    { c: 3, r: 8 }, // 3:4 portrait
    { c: 3, r: 4 }, // 3:2 landscape
    { c: 3, r: 4 }, // 3:2 landscape
  ],
];

/* 2 columns. */
const BANDS_2 = [
  [
    { c: 1, r: 2 }, // 1:1
    { c: 1, r: 2 }, // 1:1
  ],
  [{ c: 2, r: 2 }], // 2:1 wide
  [
    { c: 1, r: 3 }, // 2:3 portrait
    { c: 1, r: 3 },
  ],
  [{ c: 2, r: 3 }], // 4:3 landscape
];

const BAND_SETS = { 12: BANDS_12, 6: BANDS_6, 2: BANDS_2 };

/* Whatever is left when the bands run out still has to close cleanly, so the
   tail is laid out as its own complete rows rather than trailing off. */
function closingBand(rem, cols) {
  const out = [];
  let left = rem;
  while (left > 0) {
    let k =
      left >= 3 && cols % 3 === 0 ? 3 : left >= 2 && cols % 2 === 0 ? 2 : 1;
    if (k > left) k = left;
    const c = cols / k;
    const r = k === 1 ? Math.round(cols * 0.5) : Math.round(c * 1.4);
    for (let i = 0; i < k; i++) out.push({ c, r });
    left -= k;
  }
  return out;
}

/* Walk the bands until every tile has a shape. */
function layoutFor(count, cols) {
  const bands = BAND_SETS[cols] || BANDS_6;
  const out = [];
  let b = 0;
  while (out.length < count) {
    const band = bands[b % bands.length];
    const remaining = count - out.length;
    if (band.length > remaining) {
      out.push(...closingBand(remaining, cols));
      break;
    }
    out.push(...band);
    b++;
  }
  return out.slice(0, count);
}

/* How many columns the grid is showing right now, and how tall a row is. Both
   are measured rather than assumed: the row unit is derived from the real
   column width, which is the only way the ratios above stay true. */
function useBentoGrid(ref) {
  const [state, setState] = React.useState({ cols: 12, rowH: 60 });
  React.useLayoutEffect(() => {
    const measure = () => {
      const el = ref.current;
      if (!el) return;
      const w = window.innerWidth;
      const cols = w >= 1024 ? 12 : w >= 640 ? 6 : 2;
      const gap = w >= 640 ? 12 : 8;
      const colW = (el.clientWidth - gap * (cols - 1)) / cols;
      setState({ cols, rowH: Math.max(18, (colW - gap) / 2) });
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (ref.current) ro.observe(ref.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [ref]);
  return state;
}

/* ═══════════════════════════════════════════════════════════
   BrandGallery — adaptive bento grid with lightbox.
   Renders however many images it's given; empty (src: null)
   entries are dropped and the grid reflows to stay full.
   Reusable for any brand identity page.
═══════════════════════════════════════════════════════════ */
export default function BrandGallery({
  n = "07",
  label = "TOUCHPOINTS",
  white = "The brand,",
  accent = "applied",
  description = "Selected touchpoints and application designs — the brand system in real-world use.",
  images = [],
  color = "#a3e635",
  cta = null,
}) {
  const navigate = useNavigate();
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0 });

  /* The bento measures itself, then every tile is given a shape from the
     band layout. Both depend on the live column count, so both recompute
     when the breakpoint changes rather than on first paint only. */
  const gridRef = useRef(null);
  const { cols, rowH } = useBentoGrid(gridRef);
  const shapes = React.useMemo(
    () => layoutFor(images.length, cols),
    [images.length, cols],
  );

  const filled = images.filter((item) => item.src);

  /* lightbox */
  const [lightboxNav, setLightboxNav] = useState(null); // index into filled
  const openLightbox = useCallback((i) => setLightboxNav(i), []);
  const closeLightbox = useCallback(() => setLightboxNav(null), []);
  const prevImage = useCallback(
    () => setLightboxNav((i) => (i - 1 + filled.length) % filled.length),
    [filled.length],
  );
  const nextImage = useCallback(
    () => setLightboxNav((i) => (i + 1) % filled.length),
    [filled.length],
  );

  /* stagger delay capped so late cells don't feel disconnected */
  const d = (i) => Math.min(i * 0.04, 0.35);

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 border-t border-white/5">
      <div className="max-w-[1560px] mx-auto">
        {/* header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
          animate={
            headerInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}
          }
          transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <p
            className="text-[11px] font-bold tracking-[0.3em] uppercase mb-5"
            style={{ color }}
          >
            {n} — {label}
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-[52px] font-semibold leading-[1.05] tracking-[-0.03em]">
            <span className="text-white">{white} </span>
            <span style={{ color }}>{accent}</span>
          </h2>
          <p className="mt-4 mb-10 text-[15px] sm:text-[16px] leading-[1.65] text-white/50 max-w-[520px]">
            {description}
          </p>
        </motion.div>

        {/* A real bento: six columns, fixed row height, and a repeating cycle
            of spans so the wall is made of wide rectangles, tall rectangles and
            squares rather than one shape twelve times. `grid-auto-flow: dense`
            back-fills any hole a large tile leaves behind, which is what stops
            the last row stranding a single orphan cell.

            The lightbox indexes `filled`, not this list, so mixing real shots
            with unshot placeholders cannot desynchronise it. */}
        <div
          ref={gridRef}
          className="grid gap-2 sm:gap-3"
          style={{
            gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
            gridAutoRows: `${rowH}px`,
            /* Not dense. Dense reorders tiles to fill holes, which would break
               the bands — and the bands are what guarantee there are none. */
            gridAutoFlow: "row",
          }}
        >
          {images.map((item, i) => (
            <div
              key={i}
              className="min-h-0"
              style={{
                gridColumn: `span ${shapes[i]?.c || 3}`,
                gridRow: `span ${shapes[i]?.r || 6}`,
              }}
            >
              {item.src ? (
                <BentoCell
                  src={item.src}
                  alt={item.alt}
                  label={item.label}
                  color={color}
                  delay={d(i)}
                  onClick={() => openLightbox(filled.indexOf(item))}
                />
              ) : (
                <div className="h-full [&>*]:!h-full [&>*]:!max-w-none">
                  <Slot
                    ratio={item.ratio || "4/3"}
                    kind="Shot"
                    label={item.label}
                    note={item.note}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* optional CTA */}
        {cta && (
          <div className="mt-10 flex justify-start">
            <Button
              variant="primary"
              size="md"
              onClick={() => navigate(cta.to)}
            >
              {cta.label}
              <svg
                width="14"
                height="14"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  d="M5 12h14M12 5l7 7-7 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
          </div>
        )}
      </div>

      {/* lightbox */}
      {lightboxNav !== null && filled.length > 0 && (
        <Lightbox
          images={filled}
          index={lightboxNav}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </section>
  );
}
