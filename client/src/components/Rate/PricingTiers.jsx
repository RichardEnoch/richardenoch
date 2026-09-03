// src/components/Rate/PricingTiers.jsx
//
// The whole rate card, on one scroll.
//
// It replaces a tab bar over six categories, three separate card renderers
// and a comparison table behind a toggle. Those were four kinds of button
// standing between a visitor and a price. Here every service is a section,
// every tier is the same card, and the only button on a card is the one
// that starts a conversation.
//
// Everything visual comes from the system rather than from this file:
// `.type-*` for the scale, `.card-surface` for the lit-top-edge card,
// `buttonClasses` for the two allowed button treatments, and hugeicons for
// the two glyphs. The only local decision is the lime treatment on a
// featured tier, which reuses the tokens the rest of the site does.
//
// Services with no tiers (product design) and no published price yet
// (presentation, publication) are stated as such at the foot rather than
// hidden behind an empty tab.
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CheckmarkCircle02Icon, ArrowRight01Icon } from "hugeicons-react";
import { buttonClasses } from "../ui/Button";
import SectionReveal from "../common/SectionReveal";
import {
  getFxRate,
  FALLBACK_RATE,
  buildRateSections,
  SCOPED_SERVICES,
  DEPOSIT_PCT,
} from "../../data/ratePlans";

/* Section measures.
   The page runs two widths rather than one. Reading matter and a row of
   three cards sit on the standard measure; a row of four needs more room
   than that or the cards squeeze and every heading wraps. Each section
   carries its own `width`, so the shell is a property of the section, not
   of the page.

   These have to be whole class strings — Tailwind scans source text, so a
   class assembled from a variable at runtime is never generated. */
const SHELL = {
  standard: "mx-auto max-w-[1200px] px-4 lg:px-6",
  wide: "mx-auto max-w-[1440px] px-4 lg:px-6",
};

/* The lit top edge is the system's card signature. A featured tier lights
   that same edge in lime and adds the card glow — it does not become a
   different card. */
const FEATURED =
  "border-t-lime-400/70 shadow-[0_0_24px_rgba(190,242,100,0.18)] " +
  "bg-[radial-gradient(circle_at_top,_rgba(132,204,22,0.10),transparent_62%),_rgba(255,255,255,0.03)]";

/* The card is four blocks: who it is for, what it costs, what is in it, and
   the way in. On a wide screen each block takes its height from the tallest
   equivalent in the row (`grid-rows-subgrid`), so the prices and the buttons
   line up across cards without any card reserving empty space for a wrap
   that only happens in one of them. Below lg the cards stack and it goes
   back to a plain column. */
const TierCard = ({ tier }) => (
  <div
    className={`card-surface card-surface-hover relative flex flex-col p-6 sm:p-7 lg:row-span-4 lg:grid lg:grid-rows-subgrid lg:gap-0 ${
      tier.featured ? FEATURED : ""
    }`}
  >
    {tier.badge && (
      <span className="absolute right-6 top-6 rounded-full bg-gradient-to-b from-[#A3E635] to-[#65A30D] px-3 py-1 text-[11px] font-bold tracking-[-0.02em] text-black shadow-[0_0_18px_rgba(132,204,22,0.4)]">
        {tier.badge}
      </span>
    )}

    <div>
      <p className="max-w-[68%] text-[12px] font-medium uppercase leading-[1.6] tracking-[0.22em] text-white/40">
        {tier.audience}
      </p>

      <h3 className="type-h1 mt-3 text-white">{tier.name}</h3>

      <p className="mt-3 text-[15px] leading-[1.55] text-white/50">
        {tier.description}
      </p>
    </div>

    <div>
      <div className="my-5 h-px w-full bg-white/10" />

      <p className="type-h1 text-white">{tier.priceMain}</p>
      <p className="mt-2 text-[15px] text-white/50">{tier.priceSub}</p>
      <p className="mt-2 text-[12px] font-medium uppercase tracking-[0.22em] text-white/30">
        {tier.cadence}
      </p>
      {tier.duration && (
        <p className="mt-4 text-[14px] font-medium text-lime-300/85">
          <span className="text-white/35">Delivery</span> · {tier.duration}
        </p>
      )}
    </div>

    <div>
      <div className="my-5 h-px w-full bg-white/10" />

      {/* A tier lists what it adds, not what it repeats. The line below is
          the whole value ladder in one sentence. */}
      {tier.inherits && (
        <p className="mb-4 text-[15px] font-medium leading-[1.5] text-white">
          Everything in {tier.inherits}, plus:
        </p>
      )}

      <ul className="flex flex-col gap-3">
        {tier.features.map((f) => (
          <li
            key={f}
            className="flex gap-3 text-[15px] leading-[1.5] text-white/75"
          >
            <CheckmarkCircle02Icon
              size={17}
              className="mt-[3px] shrink-0 text-lime-400"
            />
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </div>

    <Link
      to={tier.href}
      className={buttonClasses(
        tier.featured ? "primary" : "secondary",
        "md",
        "mt-8 w-full self-end",
      )}
    >
      {tier.cta}
      <ArrowRight01Icon size={18} />
    </Link>
  </div>
);

const PricingTiers = () => {
  /* Brand prices are quoted in dollars, website and flyer prices in naira.
     Both are shown in both currencies, so the card needs the live rate. */
  const [fxRate, setFxRate] = useState(FALLBACK_RATE);
  useEffect(() => {
    let alive = true;
    getFxRate().then((r) => alive && setFxRate(r));
    return () => {
      alive = false;
    };
  }, []);

  const sections = useMemo(() => buildRateSections(fxRate), [fxRate]);

  return (
    <section className="relative w-full bg-[#050505] pb-24 pt-16 lg:pb-28 lg:pt-20">
      {/* Lime radial glows sit behind every section on this site. */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-80px] top-0 h-72 w-72 rounded-full bg-lime-500/12 blur-[190px]" />
        <div className="absolute bottom-[-60px] right-[-60px] h-72 w-72 rounded-full bg-lime-500/8 blur-[200px]" />
      </div>

      <div className="relative">
        {/* ── Intro ── */}
        <div className={SHELL.standard}>
          <SectionReveal delay={0}>
            <div className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur">
              <span className="text-[12px] font-semibold tracking-[-0.02em] text-white">
                The rate card
              </span>
            </div>

            <h2 className="type-display-2 mt-6 max-w-[16ch] bg-gradient-to-b from-[#FFFFFF] to-[#8E8E8E] bg-clip-text text-transparent">
              Every price, on one page.
            </h2>

            <p className="type-measure mt-6 text-[17px] leading-[1.6] text-white/60">
              Three services sell in tiers. Pick the one that matches what you
              need, or scroll past them to the work that is scoped per project.
              A {DEPOSIT_PCT}% deposit starts any booking.
            </p>

            {/* Plain text links, not another row of buttons — they move you down
              the page rather than swapping what is on it. */}
            <nav className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-2 text-[15px]">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="text-white/45 underline-offset-4 transition-colors duration-300 hover:text-lime-400 hover:underline"
                >
                  {s.label}
                </a>
              ))}
              <a
                href="#scoped"
                className="text-white/45 underline-offset-4 transition-colors duration-300 hover:text-lime-400 hover:underline"
              >
                Scoped per project
              </a>
            </nav>

            <p className="mt-6 max-w-[70ch] text-[13px] leading-[1.6] text-white/35">
              Type licensing, stock and print proofs are quoted at cost on top
              of the figures below. Where a project needs a typeface bought or
              drawn, you see what it costs and nothing is marked up.
            </p>

            <p className="mt-3 max-w-[70ch] text-[13px] leading-[1.6] text-white/35">
              Naira and dollar figures are the same price in two currencies,
              converted at ₦{Math.round(fxRate).toLocaleString("en-NG")} to $1.
              The rate moves, so treat the second figure as an estimate.
            </p>
          </SectionReveal>
        </div>

        {/* ── One section per tiered service ── */}
        {sections.map((section, i) => (
          <div
            key={section.id}
            id={section.id}
            className={`scroll-mt-28 ${SHELL[section.width] ?? SHELL.standard}`}
          >
            <SectionReveal delay={0.05 + i * 0.05}>
              <div className="mt-16 border-t border-white/10 pb-1 pt-9">
                <p className="type-eyebrow text-white/30">{section.label}</p>
                <h3 className="type-display-3 mt-4 text-white">
                  {section.heading}
                </h3>
                <p className="type-measure mt-4 text-[16px] leading-[1.6] text-white/55">
                  {section.blurb}
                </p>
              </div>
            </SectionReveal>

            <div
              className={`mt-10 grid gap-5 sm:grid-cols-2 lg:grid-rows-[auto_auto_1fr_auto] ${
                section.tiers.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"
              }`}
            >
              {section.tiers.map((tier) => (
                <TierCard key={tier.id} tier={tier} />
              ))}
            </div>
          </div>
        ))}

        {/* ── Everything that is not sold in tiers ── */}
        <div id="scoped" className={`scroll-mt-28 ${SHELL.standard}`}>
          <SectionReveal delay={0.05}>
            <div className="mt-16 border-t border-white/10 pt-9">
              <p className="type-eyebrow text-white/30">No fixed tiers</p>
              <h3 className="type-display-3 mt-4 text-white">
                Scoped per project
              </h3>
              <p className="type-measure mt-4 text-[16px] leading-[1.6] text-white/55">
                These vary too much to sell in fixed tiers. Tell me what you
                have in mind and a quote and a timeline come back.
              </p>
            </div>
          </SectionReveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {SCOPED_SERVICES.map((s) => (
              <div
                key={s.id}
                className="card-surface card-surface-hover p-6 sm:p-7"
              >
                <h4 className="type-h3 text-white">{s.name}</h4>
                <p className="mt-3 text-[15px] leading-[1.55] text-white/50">
                  {s.text}
                </p>
              </div>
            ))}
          </div>

          <Link
            to="/contact"
            className={buttonClasses("primary", "md", "mt-10")}
          >
            Ask for a quote
            <ArrowRight01Icon size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PricingTiers;
