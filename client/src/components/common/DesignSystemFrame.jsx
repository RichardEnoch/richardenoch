// src/components/common/DesignSystemFrame.jsx
//
// The half-frame that appears on both the website page and the product page,
// offering a detour into the design system without demanding one.
//
// The design system governs two surfaces, so it can't live inside either case
// study — but a reader on either one needs to know it exists. This is the
// same component used in both places, pointing at the same destination. The
// design system page returns the favour with two buttons back.
//
// Deliberately half-and-half: the preview bleeds off its own edge so it reads
// as a window into something larger rather than a finished picture.

import React from "react";
import { Link } from "react-router-dom";
import Slot from "./Slot";

const G = "#a3e635";

const DesignSystemFrame = ({
  to,
  eyebrow = "Shared foundation",
  title = "ADLM Studio Design System",
  body = "Colour ramps, type scale, spacing, components and the contrast rule that decided the whole visual direction. It governs this surface and the product alike.",
  cta = "View the design system",
  previewSrc,
  previewLabel = "Design system overview — token sheet or component board",
  className = "",
}) => (
  <section
    className={`border-t border-white/5 px-4 py-16 sm:px-8 sm:py-20 lg:px-16 ${className}`}
  >
    <div className="mx-auto max-w-[1100px]">
      <div
        className="grid overflow-hidden rounded-3xl border md:grid-cols-2"
        style={{ borderColor: `${G}22`, background: `${G}06` }}
      >
        {/* preview half — cropped intentionally, so it reads as a window */}
        <div className="relative min-h-[240px] overflow-hidden p-6 sm:p-8 md:p-0">
          <div className="h-full w-full md:absolute md:inset-y-0 md:left-8 md:right-0 md:top-8">
            <Slot
              src={previewSrc}
              ratio="4/3"
              kind="Preview"
              label={previewLabel}
              note="Crops at the frame edge — the detail lives on the system page"
              className="h-full md:rounded-b-none md:rounded-r-none"
            />
          </div>
        </div>

        {/* copy half */}
        <div className="flex flex-col justify-center p-7 sm:p-10">
          <p className="type-eyebrow mb-4" style={{ color: G }}>
            {eyebrow}
          </p>
          <h2 className="type-h1 mb-4 text-white">{title}</h2>
          <p className="mb-8 max-w-[44ch] text-[15px] leading-[1.7] text-white/55">
            {body}
          </p>
          <Link
            to={to}
            className="inline-flex w-fit items-center gap-2 rounded-lg px-5 py-3 text-[14.5px] font-bold text-black transition-[filter] duration-200 hover:brightness-110"
            style={{
              background: "linear-gradient(180deg, #7BF003 0%, #3E7B00 100%)",
            }}
          >
            {cta}
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
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default DesignSystemFrame;
