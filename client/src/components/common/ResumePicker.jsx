// src/components/common/ResumePicker.jsx
//
// Three résumés, fanned like the cards on the landing page.
//
// There is no single correct CV here. A brand studio, a product team and an
// agency looking for a generalist each want a different document, and Richard
// keeps three. Picking for the reader would be guessing, and burying the choice
// in a dropdown would waste the one moment they are actually paying attention.
//
// So the download opens the same interaction the homepage already taught them:
// a stack that fans out, cards that lift and tilt under the cursor, one click
// to take the one they want.
//
// The PDFs live in `client/public/resumes/`. Each card checks whether its file
// is actually there when the modal opens — a card whose file has not been
// uploaded says so plainly instead of handing someone a 404.

import React from "react";
import { createPortal } from "react-dom";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";

const EASE = [0.22, 0.61, 0.36, 1];

/* Where the three cards come to rest. Same geometry language as PickACard —
   a shallow arc, centre card upright, outer two leaning away. */
const FAN = [
  { rotate: -11, x: -276, y: 26 },
  { rotate: 0, x: 0, y: -8 },
  { rotate: 11, x: 276, y: 26 },
];

const W = 250;
const H = 340;

export const RESUMES = [
  {
    id: "brand",
    tag: "For brand roles",
    title: "Brand Identity Designer",
    blurb:
      "Identity systems, guideline documents, art direction and the production side of a brand.",
    file: "/resumes/brand-identity.pdf",
    preview: "/resumes/brand-identity.webp",
    accent: "#a3e635",
  },
  {
    id: "product",
    tag: "For product roles",
    title: "Product Designer",
    blurb:
      "Research, information architecture, flows, design systems and accessibility.",
    file: "/resumes/product-design.pdf",
    preview: "/resumes/product-design.webp",
    accent: "#22d3ee",
  },
  {
    id: "creative",
    tag: "For generalist roles",
    title: "Creative Designer",
    blurb:
      "The full range — brand, product, web, campaign, motion, print and presentation.",
    file: "/resumes/creative-designer.pdf",
    preview: "/resumes/creative-designer.webp",
    accent: "#f472b6",
  },
];

/* A card that has no uploaded preview still has to look like something. This
   is the fallback: the title set large on the card's own accent, which reads
   as deliberate rather than as a missing image. */
const PreviewFallback = ({ item }) => (
  <div
    className="absolute inset-0 flex flex-col justify-end p-5"
    style={{
      background: `linear-gradient(160deg, ${item.accent}22 0%, rgba(8,10,14,0.96) 62%)`,
    }}
  >
    <div
      aria-hidden="true"
      className="mb-auto mt-2 space-y-1.5 opacity-25"
      style={{ color: item.accent }}
    >
      {[92, 74, 84, 60, 78, 48].map((w, i) => (
        <span
          key={i}
          className="block h-[3px] rounded-full"
          style={{ width: `${w}%`, background: "currentColor" }}
        />
      ))}
    </div>
  </div>
);

const Card = ({ item, i, open, onPick, available }) => {
  const [hovered, setHovered] = React.useState(false);
  const [imgOk, setImgOk] = React.useState(true);
  const reduced = useReducedMotion();
  const ref = React.useRef(null);

  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const sx = useSpring(tiltX, { stiffness: 280, damping: 26 });
  const sy = useSpring(tiltY, { stiffness: 280, damping: 26 });

  const onMove = (e) => {
    if (!ref.current || reduced) return;
    const r = ref.current.getBoundingClientRect();
    tiltY.set(((e.clientX - (r.left + r.width / 2)) / (r.width / 2)) * 10);
    tiltX.set(-((e.clientY - (r.top + r.height / 2)) / (r.height / 2)) * 8);
  };
  const onLeave = () => {
    setHovered(false);
    tiltX.set(0);
    tiltY.set(0);
  };

  const fan = FAN[i];
  const unavailable = available === false;

  return (
    <motion.div
      className="absolute"
      style={{ width: W, height: H, zIndex: i === 1 ? 3 : 2 }}
      initial={{ rotate: 0, x: 0, y: 40, opacity: 0, scale: 0.9 }}
      animate={
        open
          ? {
              rotate: reduced ? 0 : fan.rotate,
              x: reduced ? (i - 1) * (W + 18) : fan.x,
              y: fan.y,
              opacity: 1,
              scale: 1,
            }
          : { rotate: 0, x: 0, y: 40, opacity: 0, scale: 0.9 }
      }
      transition={{
        duration: 0.62,
        ease: EASE,
        delay: open ? 0.06 + i * 0.07 : 0,
      }}
    >
      <div style={{ perspective: 900, width: "100%", height: "100%" }}>
        <motion.div
          ref={ref}
          animate={{ y: hovered ? -22 : 0 }}
          transition={{ type: "spring", stiffness: 380, damping: 22 }}
          style={{
            width: "100%",
            height: "100%",
            rotateX: sx,
            rotateY: sy,
            transformStyle: "preserve-3d",
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={onLeave}
          onMouseMove={onMove}
        >
          <button
            type="button"
            onClick={() => !unavailable && onPick(item)}
            disabled={unavailable}
            aria-label={
              unavailable
                ? `${item.title} résumé — not uploaded yet`
                : `Download the ${item.title} résumé`
            }
            className="block h-full w-full text-left"
            style={{ cursor: unavailable ? "not-allowed" : "pointer" }}
          >
            <div
              className="relative h-full w-full overflow-hidden rounded-[16px]"
              style={{
                border: hovered
                  ? `1px solid ${item.accent}60`
                  : "1px solid rgba(255,255,255,0.09)",
                boxShadow: hovered
                  ? `0 0 0 1px ${item.accent}30, 0 0 26px ${item.accent}40, 0 26px 56px rgba(0,0,0,0.85)`
                  : "0 6px 34px rgba(0,0,0,0.75)",
                transition: "box-shadow .25s ease, border-color .25s ease",
                opacity: unavailable ? 0.55 : 1,
              }}
            >
              {imgOk ? (
                <img
                  src={item.preview}
                  alt=""
                  aria-hidden="true"
                  onError={() => setImgOk(false)}
                  className="absolute inset-0 h-full w-full object-cover object-top"
                  style={{
                    filter: hovered
                      ? "grayscale(0) brightness(1)"
                      : "grayscale(1) brightness(0.7)",
                    transition: "filter .3s ease",
                  }}
                />
              ) : (
                <PreviewFallback item={item} />
              )}

              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.78) 30%, rgba(0,0,0,0.18) 58%, transparent 100%)",
                }}
              />

              <div className="absolute inset-0 flex flex-col justify-between p-5">
                <span
                  className="text-[9.5px] font-semibold uppercase tracking-[0.2em]"
                  style={{ color: item.accent }}
                >
                  {item.tag}
                </span>

                <div>
                  <h3 className="font-['Outfit'] text-[19px] font-semibold leading-tight tracking-[-0.02em] text-white">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-[12px] leading-[1.5] text-white/50">
                    {item.blurb}
                  </p>
                  <span
                    className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-semibold"
                    style={{
                      color: unavailable
                        ? "rgba(255,255,255,0.4)"
                        : item.accent,
                    }}
                  >
                    {unavailable ? (
                      "Not uploaded yet"
                    ) : (
                      <>
                        Download PDF
                        <svg
                          width="13"
                          height="13"
                          viewBox="0 0 24 24"
                          fill="none"
                          aria-hidden="true"
                        >
                          <path
                            d="M12 4v12m0 0l-5-5m5 5l5-5M4 20h16"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

const ResumePicker = ({ open, onClose }) => {
  /* undefined = not checked yet, true/false = HEAD result. Checking means a
     missing upload reads as "Not uploaded yet" rather than as a broken link. */
  const [available, setAvailable] = React.useState({});

  React.useEffect(() => {
    if (!open) return;
    let cancelled = false;
    /* `res.ok` alone is not enough: a single-page app serves index.html with a
       200 for any unknown path, so a missing PDF looks present. The content
       type is what actually distinguishes a file from the SPA fallback. */
    Promise.all(
      RESUMES.map((r) =>
        fetch(r.file, { method: "HEAD" })
          .then((res) => [
            r.id,
            res.ok &&
              (res.headers.get("content-type") || "")
                .toLowerCase()
                .includes("pdf"),
          ])
          .catch(() => [r.id, false]),
      ),
    ).then((pairs) => {
      if (!cancelled) setAvailable(Object.fromEntries(pairs));
    });
    return () => {
      cancelled = true;
    };
  }, [open]);

  /* The fan needs about 820px to sit properly. Below that it shrinks whole
     rather than breaking formation. */
  const [scale, setScale] = React.useState(1);
  React.useEffect(() => {
    const fit = () =>
      setScale(Math.min(1, Math.max(0.42, (window.innerWidth - 24) / 820)));
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    if (window.__lenis) window.__lenis.stop();
    return () => {
      window.removeEventListener("keydown", onKey);
      if (window.__lenis) window.__lenis.start();
    };
  }, [open, onClose]);

  const pick = (item) => {
    const a = document.createElement("a");
    a.href = item.file;
    a.download = "";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key="resume-picker"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Choose a résumé to download"
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center px-4 py-10"
          style={{
            background: "rgba(4,7,12,0.9)",
            backdropFilter: "blur(20px)",
          }}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="mb-8 max-w-[560px] text-center"
          >
            <p className="type-eyebrow mb-3 text-white/35">Three versions</p>
            <h2 className="font-['Outfit'] text-[26px] font-semibold tracking-[-0.03em] text-white sm:text-[32px]">
              Which one are you reading for?
            </h2>
            <p className="mt-3 text-[14.5px] leading-[1.65] text-white/45">
              Same career, three emphases. Take whichever matches the role — or
              take all three, I do not mind.
            </p>
          </motion.div>

          {/* The fan. Fixed height so the cards have room to lean, and scaled
              down rather than re-laid-out on narrow screens — a fan that
              reflows into a column stops being a fan. */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex w-full items-center justify-center"
            style={{
              height: (H + 90) * scale,
              transform: `scale(${scale})`,
              transformOrigin: "center center",
            }}
          >
            {RESUMES.map((r, i) => (
              <Card
                key={r.id}
                item={r}
                i={i}
                open={open}
                onPick={pick}
                available={available[r.id]}
              />
            ))}
          </div>

          <motion.button
            type="button"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="mt-6 rounded-full border border-white/15 px-5 py-2.5 text-[13px] font-semibold text-white/60 transition hover:border-white/35 hover:text-white"
          >
            Close
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default ResumePicker;
