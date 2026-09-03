// src/components/ProjectPage/ProductPreview.jsx
//
// A product's block on the suite page.
//
// This exists instead of embedding whole case studies inline. Six full cases on
// one route would be enormous to load, none of them would be separately
// linkable, and a reader who came for QUIV would have to scroll past five
// products they didn't ask for. So each product gets a block rich enough to
// read as embedded — key art, positioning line, capability chips, a strip of
// screens — and the detail stays on its own indexable page.
//
// The split is deliberately uneven. These are wide desktop tools, so the art
// takes the larger share and the copy is held to a reading measure rather than
// stretched to match it. A 50/50 grid would shrink every screen to the width of
// a paragraph.
//
// Every product in the suite now has its own route, so every block links out.
// `to` is still optional: a product without one ends at this block rather than
// rendering a dead link.
//
// Frames take a drop-in key as well as a src — see data/adlmAssets.js. Nothing
// here has to change when the screens are finally captured.

import React from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import Slot from "../common/Slot";
import { asset, withAssets } from "../../data/adlmAssets";

const G = "#a3e635";
const EASE = [0.22, 0.61, 0.36, 1];

const ProductPreview = ({ product, index = 0, flip = false }) => {
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.08 });

  const {
    name,
    host,
    blurb,
    capabilities = [],
    to,
    heroSrc,
    heroKey,
    heroLabel,
    shots = [],
  } = product;

  const heroImage = heroSrc || asset(heroKey);
  const frames = withAssets(shots);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.975 }}
      animate={
        inView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 40, scale: 0.975 }
      }
      transition={{ duration: 0.9, ease: EASE, delay: index * 0.05 }}
      className="overflow-hidden rounded-3xl border border-white/8 bg-white/[0.02]"
    >
      {/* Alternating sides use grid order rather than direction:rtl — swapping
          text direction to move a column also flips punctuation and scrollbar
          placement inside it, which is not what "put the image on the right"
          should mean. */}
      <div className="grid lg:grid-cols-[minmax(0,1.85fr)_minmax(0,34ch)]">
        {/* ── key art ── */}
        <div className={`p-5 sm:p-8 ${flip ? "lg:order-2" : ""}`}>
          <Slot
            src={heroImage}
            ratio="16/10"
            kind="Key art"
            label={heroLabel || `${name} — hero frame`}
            note={host ? `Shown running in ${host}` : undefined}
          />
        </div>

        {/* ── copy ── */}
        <div
          className={`flex flex-col justify-center p-7 sm:p-9 lg:py-12 ${
            flip ? "lg:order-1 lg:pl-10 lg:pr-2" : "lg:pl-2 lg:pr-10"
          }`}
        >
          {host && (
            <p className="type-eyebrow mb-3" style={{ color: G }}>
              {host}
            </p>
          )}
          <h3 className="type-h1 mb-4 text-white">{name}</h3>
          <p className="mb-7 text-[15px] leading-[1.7] text-white/55">
            {blurb}
          </p>

          {capabilities.length > 0 && (
            <ul className="mb-8 flex list-none flex-wrap gap-2 p-0">
              {capabilities.map((c) => (
                <li
                  key={c}
                  className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-[12.5px] text-white/60"
                >
                  {c}
                </li>
              ))}
            </ul>
          )}

          {to ? (
            <Link
              to={to}
              className="inline-flex w-fit items-center gap-2 rounded-lg px-5 py-3 text-[13.5px] font-bold text-black transition-[filter] duration-200 hover:brightness-110"
              style={{
                background: "linear-gradient(180deg, #7BF003 0%, #3E7B00 100%)",
              }}
            >
              Open the {name} case study
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
          ) : (
            <span className="text-[12.5px] italic text-white/30">
              Part of the suite — covered here rather than on its own page.
            </span>
          )}
        </div>
      </div>

      {/* ── screen strip ── */}
      {frames.length > 0 && (
        <div className="border-t border-white/6 px-5 pb-7 pt-6 sm:px-8">
          <div className="grid gap-4 sm:grid-cols-3">
            {frames.map((s, i) => (
              <Slot
                key={i}
                src={s.src}
                ratio="16/10"
                kind="Screen"
                label={s.label}
              />
            ))}
          </div>
        </div>
      )}
    </motion.article>
  );
};

export default ProductPreview;
