// src/components/common/ScreenFrame.jsx
//
// A desktop screen beside its description.
//
// Screens on this site were being shown as full-page captures, which are three
// or four viewports tall and read as a scroll rather than an interface. Every
// frame here is locked to a real desktop viewport ratio (16:10), so a reader
// sees what a user sees — and every frame on the page is the same shape, which
// is what makes a run of them read as a set.
//
// Layout is screen-left, copy-right by default. `flip` exists for the rare case
// where a section needs the mirror, but a page should pick one and hold it:
// alternating sides makes identical frames look like different sizes.

import React from "react";
import { motion, useInView } from "framer-motion";

const G = "#a3e635";
const EASE = [0.22, 0.61, 0.36, 1];

const ScreenFrame = ({
  src,
  alt,
  kicker,
  title,
  body,
  chips = [],
  href,
  hrefLabel = "Open it live",
  flip = false,
  ratio = "16/10",
  children,
}) => {
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 34, scale: 0.985 }}
      animate={
        inView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 34, scale: 0.985 }
      }
      transition={{ duration: 0.85, ease: EASE }}
      className="overflow-hidden rounded-3xl border border-white/8 bg-white/[0.02] p-5 sm:p-8"
    >
      <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,36ch)] lg:gap-12">
        <div className={flip ? "lg:order-2" : ""}>
          <div
            className="overflow-hidden rounded-2xl border border-white/10 bg-[#04101F]"
            style={{ aspectRatio: ratio }}
          >
            <img
              src={src}
              alt={alt || title}
              loading="lazy"
              /* object-top, not object-cover-centre: a viewport capture is
                 meaningful from its top edge down, and centring would crop the
                 nav and the headline out of every frame. */
              className="h-full w-full object-cover object-top"
            />
          </div>
        </div>

        <div className={flip ? "lg:order-1" : ""}>
          {kicker && (
            <p className="type-eyebrow mb-3" style={{ color: G }}>
              {kicker}
            </p>
          )}
          <h3 className="type-h1 mb-4 text-white">{title}</h3>
          {body && (
            <p className="text-[15px] leading-[1.75] text-white/55">{body}</p>
          )}

          {chips.length > 0 && (
            <ul className="mt-6 flex list-none flex-wrap gap-2 p-0">
              {chips.map((c) => (
                <li
                  key={c}
                  className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-[12.5px] text-white/60"
                >
                  {c}
                </li>
              ))}
            </ul>
          )}

          {href && (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-[13px] font-semibold transition-colors duration-200"
              style={{ borderColor: "#5DB402", color: "#7BF003" }}
            >
              {hrefLabel}
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

          {children}
        </div>
      </div>
    </motion.div>
  );
};

export default ScreenFrame;
