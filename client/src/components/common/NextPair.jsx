// src/components/common/NextPair.jsx
//
// The two exits at the foot of every sub-page of a featured project.
//
// A featured project is readable along two axes and this is what makes that
// real. One card continues through the PROJECT (ADLM Brand → ADLM Website);
// the other continues through the CRAFT (ADLM Brand → Verde Luxe Brand). A
// brand recruiter follows the second and never leaves brand work; someone
// judging range follows the first.
//
// Both are always offered. If a page genuinely has no sibling on one axis,
// pass only the other and the layout collapses to a single card.
//
// The section sits on the project's own imagery rather than on flat black, and
// bleeds into whatever comes next instead of meeting it at a hard line — two
// bands of near-black butted together read as a seam, not as a section change.

import React from "react";
import { Link } from "react-router-dom";
import TiltCard from "./TiltCard";
import groundImg from "../../assets/ADLM/gallery/gal-05.webp";

/* Destination thumbnails. The card is a door, and a door that shows what is
   behind it gets opened more often than one that only names it. Keyed by route
   so a caller can stay a { to, title, blurb } object — passing `img` on the
   caller side works too and wins. */
import thumbBrand from "../../assets/ADLM/brand/evo-3.webp";
import thumbSystem from "../../assets/ADLM/site/designsystem.webp";
import thumbWebsite from "../../assets/ADLM/site/home.webp";
import thumbProduct from "../../assets/ADLM/site/dashboard.webp";
import thumbQuiv from "../../assets/ADLM/quiv-hero.webp";
import thumbSocial from "../../assets/ADLM/gallery/gal-02.webp";
import thumbNiqs from "../../assets/websiteThumbs/niqs.webp";
import thumbVerde from "../../assets/VerdeLuxe/hero.webp";
import thumbSites from "../../assets/websiteThumbs/oluwatosin.webp";

const ADLM = "/projects/featured/adlm-studio";

const THUMBS = {
  [`${ADLM}/brand`]: thumbBrand,
  [`${ADLM}/design-system`]: thumbSystem,
  [`${ADLM}/website`]: thumbWebsite,
  [`${ADLM}/product`]: thumbProduct,
  [`${ADLM}/product/quiv`]: thumbQuiv,
  [`${ADLM}/product/heron`]: thumbProduct,
  [`${ADLM}/product/rategen`]: thumbProduct,
  [ADLM]: thumbBrand,
  "/adlm-studio-designs": thumbSocial,
  "/ui-projects/niqs": thumbNiqs,
  "/projects/verde-luxe": thumbVerde,
  "/website-design": thumbSites,
};

const G = "#a3e635";

const ExitCard = ({ to, kicker, title, blurb, img, align = "left" }) => {
  const thumb = img || THUMBS[to];
  return (
    <TiltCard className="group h-full" max={4}>
      <Link
        to={to}
        className={`sheen relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] p-7 backdrop-blur-sm transition-colors duration-300 hover:border-[#a3e635]/40 hover:bg-white/[0.06] sm:p-8 ${
          align === "right" ? "sm:items-end sm:text-right" : ""
        }`}
      >
        {/* Where you are going, behind the words. It sits at low opacity and
          lifts on hover, so the card still reads as type first. */}
        {thumb && (
          <>
            <img
              src={thumb}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-[0.16] transition-all duration-500 group-hover:scale-[1.05] group-hover:opacity-30"
            />
            <span
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  align === "right"
                    ? "linear-gradient(270deg, rgba(10,13,18,0.62) 0%, rgba(10,13,18,0.94) 62%)"
                    : "linear-gradient(90deg, rgba(10,13,18,0.94) 38%, rgba(10,13,18,0.62) 100%)",
              }}
            />
          </>
        )}
        <span className="relative flex h-full w-full flex-col">
          <p className="type-eyebrow mb-3" style={{ color: G }}>
            {kicker}
          </p>
          <h3 className="type-h2 mb-2 text-white">{title}</h3>
          {blurb && (
            <p className="max-w-[46ch] text-[14.5px] leading-[1.6] text-white/45">
              {blurb}
            </p>
          )}
          <span
            className="mt-6 inline-flex items-center gap-2 text-[14px] font-semibold transition-transform duration-300 group-hover:translate-x-1"
            style={{ color: G }}
          >
            Continue
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
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </span>
      </Link>
    </TiltCard>
  );
};

const NextPair = ({ inProject, inCategory, className = "" }) => {
  const both = inProject && inCategory;

  return (
    <section className={`relative overflow-hidden ${className}`}>
      {/* the ground */}
      <img
        src={groundImg}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ opacity: 0.3 }}
      />
      {/* Top and bottom fade to the page colour, so the band arrives and leaves
          without an edge. */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg,#07090C 0%,rgba(7,9,12,0.72) 26%,rgba(7,9,12,0.72) 74%,#07090C 100%)",
        }}
      />

      <div className="relative px-4 py-20 sm:px-8 sm:py-24 lg:px-16">
        <div className="mx-auto max-w-[1100px]">
          <p className="type-eyebrow mb-8 text-white/35">Where next</p>
          <div
            className={`grid gap-4 ${both ? "sm:grid-cols-2" : "sm:grid-cols-1"}`}
          >
            {inProject && (
              <ExitCard
                to={inProject.to}
                kicker="Next in this project"
                title={inProject.title}
                blurb={inProject.blurb}
              />
            )}
            {inCategory && (
              <ExitCard
                to={inCategory.to}
                kicker="Next in this discipline"
                title={inCategory.title}
                blurb={inCategory.blurb}
                align={both ? "right" : "left"}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NextPair;
