// src/components/ProjectPage/PinnedEvidence.jsx
//
// The proof, pinned to the board.
//
// The findings list is twenty-two sentences about a site the reader has never
// seen. Every one of them is checkable — the old ADLM site is still live at
// www.adlmstudio.net — so the evidence sits right beside the claim.
//
// It does not sit there loudly. Two or three captures, tacked up at slightly
// wrong angles the way photographs end up on a wall, low enough in contrast
// that the reading order is still the findings. Hovering fans the stack;
// clicking opens it properly: the capture large, the finding beside it, and
// arrows to move through the rest.
//
// The point of hiding it behind a click is choice. Someone skimming for the
// argument reads the list and moves on. Someone who wants to check the work
// opens the stack. Neither reader is made to do the other one's job.

import React from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

const G = "#a3e635";
const EASE = [0.22, 0.61, 0.36, 1];

/* Angles and offsets are fixed per position rather than random: a random
   rotation on every render means the stack twitches whenever React re-renders,
   and "pinned to a board" should not move on its own. */
const PINS = [
  { rot: -6.5, x: 0, y: 0 },
  { rot: 4.2, x: 16, y: 10 },
  { rot: -2, x: 32, y: 20 },
];

const PinnedEvidence = ({ items = [], label = "See the old screens" }) => {
  const [open, setOpen] = React.useState(null);
  const shown = items.slice(0, 3);

  React.useEffect(() => {
    if (open === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((n) => (n + 1) % items.length);
      if (e.key === "ArrowLeft")
        setOpen((n) => (n - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", onKey);
    if (window.__lenis) window.__lenis.stop();
    return () => {
      window.removeEventListener("keydown", onKey);
      if (window.__lenis) window.__lenis.start();
    };
  }, [open, items.length]);

  if (!shown.length) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(0)}
        aria-label={`${label} — ${items.length} captures of the old site`}
        className="group/pin relative block w-full max-w-[220px] cursor-zoom-in pt-2 text-left"
        style={{ height: 148 }}
      >
        {shown
          .map((it, i) => ({ it, i }))
          .reverse()
          .map(({ it, i }) => (
            <motion.span
              key={it.src}
              className="absolute left-0 top-0 block overflow-hidden rounded-md border border-white/15 bg-[#0b0d10] shadow-[0_10px_30px_-12px_rgba(0,0,0,0.9)]"
              style={{ width: 168, zIndex: shown.length - i }}
              initial={false}
              animate={{
                rotate: PINS[i].rot,
                x: PINS[i].x,
                y: PINS[i].y,
              }}
              whileHover={{}}
              transition={{ duration: 0.35, ease: EASE }}
              variants={{}}
            >
              <img
                src={it.src}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="block h-[104px] w-full object-cover object-top opacity-45 transition-opacity duration-300 group-hover/pin:opacity-90"
              />
            </motion.span>
          ))}

        <span className="pointer-events-none absolute -bottom-1 left-0 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/25 transition-colors duration-300 group-hover/pin:text-[#a3e635]">
          <svg
            width="12"
            height="12"
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
          {label}
        </span>
      </button>

      {open !== null &&
        createPortal(
          <AnimatePresence>
            <motion.div
              key="pin-open"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(null)}
              role="dialog"
              aria-modal="true"
              aria-label="Captures of the old ADLM site"
              className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-8"
              style={{
                background: "rgba(4,7,12,0.86)",
                backdropFilter: "blur(20px)",
              }}
            >
              <motion.div
                initial={{ scale: 0.93, opacity: 0, y: 12 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.96, opacity: 0 }}
                transition={{ duration: 0.38, ease: EASE }}
                onClick={(e) => e.stopPropagation()}
                className="grid w-full max-w-[1640px] gap-8 rounded-2xl border border-white/10 bg-[#0A0D12] p-5 sm:p-7 lg:grid-cols-[minmax(0,2.15fr)_minmax(0,33ch)] lg:gap-10"
              >
                <div className="overflow-hidden rounded-xl border border-white/10 bg-black">
                  <img
                    src={items[open].src}
                    alt={items[open].alt || items[open].caption}
                    className="block max-h-[82vh] w-full object-contain"
                  />
                </div>

                <div className="flex flex-col">
                  <p className="type-eyebrow mb-3" style={{ color: G }}>
                    Before · {items[open].route}
                  </p>
                  <h3 className="type-h2 mb-4 text-white">
                    {items[open].caption}
                  </h3>
                  <p className="text-[15px] leading-[1.75] text-white/55">
                    {items[open].finding}
                  </p>

                  <div className="mt-auto pt-8">
                    <div className="mb-4 flex items-center gap-2">
                      {items.map((it, i) => (
                        <button
                          key={it.src}
                          type="button"
                          onClick={() => setOpen(i)}
                          aria-label={it.caption}
                          className="h-[3px] flex-1 rounded-full transition-colors duration-300"
                          style={{
                            background:
                              i === open ? G : "rgba(255,255,255,0.14)",
                          }}
                        />
                      ))}
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="text-[12.5px] tabular-nums text-white/30">
                        {open + 1} of {items.length}
                      </span>
                      <div className="flex items-center gap-2">
                        {[-1, 1].map((d) => (
                          <button
                            key={d}
                            type="button"
                            onClick={() =>
                              setOpen(
                                (n) => (n + d + items.length) % items.length,
                              )
                            }
                            aria-label={
                              d < 0 ? "Previous capture" : "Next capture"
                            }
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-white/35 hover:text-white"
                          >
                            <svg
                              width="15"
                              height="15"
                              viewBox="0 0 24 24"
                              fill="none"
                              aria-hidden="true"
                              style={{
                                transform: d < 0 ? "rotate(180deg)" : "none",
                              }}
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
                        ))}
                        <button
                          type="button"
                          onClick={() => setOpen(null)}
                          className="ml-1 rounded-full border border-white/15 px-4 py-2.5 text-[13px] font-semibold text-white/70 transition hover:border-white/35 hover:text-white"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                    <p className="mt-4 text-[12.5px] leading-[1.6] text-white/25">
                      Captured from the live site at www.adlmstudio.net, which
                      is still running the version this audit covers.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
};

export default PinnedEvidence;
