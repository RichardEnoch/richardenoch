// src/pages/featured/AdlmHub.jsx
//
// ADLM Studio — the featured-project hub.
//
// This page is a router with a thesis, not a case study. It has to do two jobs
// a discipline page cannot: state the problem the whole business exists to
// solve, and hand each visitor off to the part they came for. So it stays
// deliberately short — long enough to make the argument, never long enough to
// compete with the pages it points at.
//
// Discipline cards are the navigation. A brand recruiter and a product
// recruiter both land here and should be one click from the right page.

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import dImgBrand from "../../assets/ADLM/brand/evo-3.webp";
import dImgSystem from "../../assets/ADLM/site/designsystem.webp";
import dImgWebsite from "../../assets/ADLM/site/home.webp";
import dImgProduct from "../../assets/ADLM/site/dashboard.webp";
import dImgSocial from "../../assets/ADLM/gallery/gal-02.webp";
import PageMeta from "../../components/common/PageMeta";
import SectionToc from "../../components/common/SectionToc";
import CaseHero from "../../components/common/CaseHero";
import Slot from "../../components/common/Slot";
/* Frames name a drop-in key rather than an import — see data/adlmAssets.js. */
import { asset } from "../../data/adlmAssets";
import BuildSection from "../../components/Home/BuildSection";
import heroImg from "../../assets/ADLM/hub-hero.webp";
import {
  Section,
  Prose,
  Rise,
  RiseMedia,
  Stagger,
  StaggerItem,
  SLabel,
  SHead,
  Blend,
  ACCENT as G,
} from "../../components/common/CaseParts";

const BASE = "/projects/featured/adlm-studio";

/* Spans are 12-column bento cells, in placement order, and they tessellate:
   7+5 across the top band with the 5 split into two stacked halves, then 5+7
   underneath. Nothing is left over, so the section ends on a straight edge
   rather than on a notch. Each card carries the first thing you see on the
   page it opens — a door showing what is behind it. */
const DISCIPLINES = [
  {
    to: `${BASE}/brand`,
    kicker: "Brand identity",
    title: "One shape, two readings",
    body: "An identity for a construction-technology company — one icon holding two meanings, four lockups, three colours, and a system built to be produced by people who are not designers.",
    img: dImgBrand,
    cell: "lg:col-span-7 lg:row-span-12",
  },
  {
    to: `${BASE}/design-system`,
    kicker: "Design system",
    title: "An asset kit, turned into a system",
    body: "There were logos, icons and badges but not a single ADLM-owned variable. Tokens, type scale, spacing, components and the contrast rule that decided the entire visual direction.",
    img: dImgSystem,
    cell: "lg:col-span-5 lg:row-span-6",
  },
  {
    to: `${BASE}/website`,
    kicker: "Website",
    title: "112 routes, read one at a time",
    body: "A full audit of what was actually live — including the things nobody knew were live — then a restructure around how people buy, and thirty-one rebuilt pages.",
    img: dImgWebsite,
    cell: "lg:col-span-5 lg:row-span-6",
  },
  {
    to: `${BASE}/product`,
    kicker: "Product · UI/UX",
    title: "Six products, one workflow",
    body: "Take-off plugins that ride inside Revit and Planswift, a shared rate library everything prices against, and one account that carries a surveyor's data from the drawing to the bill.",
    img: dImgProduct,
    cell: "lg:col-span-5 lg:row-span-8",
  },
  {
    to: "/adlm-studio-designs",
    kicker: "Social & marketing",
    title: "The brand, out in public",
    body: "Course launches, enrolment campaigns, event collateral and partnership announcements — the system doing its day job across every channel.",
    img: dImgSocial,
    cell: "lg:col-span-7 lg:row-span-8",
  },
];

const SECTIONS = [
  { id: "problem", label: "The problem" },
  { id: "what", label: "What ADLM is" },
  { id: "work", label: "The work" },
  { id: "role", label: "What I own" },
];

export default function AdlmHub() {
  return (
    <div className="relative min-h-screen bg-[#07090C] font-['Outfit'] text-white">
      <PageMeta
        title="ADLM Studio — Featured Project"
        description="Brand identity, design system, website and a six-product suite for ADLM Studio — construction technology built for Nigerian quantity surveyors priced out of the alternatives."
        url="/projects/featured/adlm-studio"
      />

      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div
          className="absolute -left-60 -top-20 h-[500px] w-[500px] rounded-full blur-[160px]"
          style={{ background: "#091E3988" }}
        />
        <div
          className="absolute -right-60 top-1/2 h-[420px] w-[420px] rounded-full blur-[140px]"
          style={{ background: `${G}10` }}
        />
      </div>

      <SectionToc
        sections={SECTIONS}
        siblings={DISCIPLINES.map((d) => ({ to: d.to, label: d.kicker }))}
        siblingsLabel="Jump to a discipline"
      />

      <div className="relative z-10">
        <CaseHero
          image={heroImg}
          imageAlt="A lit building standing among drawn outlines of unbuilt ones"
          badge="Featured project"
          title="Construction software for people the industry priced out."
          lead="ADLM Studio builds the tools Nigerian quantity surveyors actually use — six products, one account, and a brand and platform I have led since 2022."
          focus="62% center"
          meta={[
            { label: "Role", value: "Creative Lead" },
            { label: "Disciplines", value: "Brand · System · Web · Product" },
            { label: "Since", value: "February 2022" },
            { label: "Sector", value: "Construction technology" },
          ]}
        />

        {/* ── 01 problem ── */}
        <Section id="problem" width="narrow" first>
          <Rise>
            <SLabel n="01" t="The problem" />
            <SHead
              white="The last industry to adopt anything, in"
              accent="the last place it arrives."
              className="mb-12 max-w-[22ch]"
            />
          </Rise>

          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <Rise>
              <p className="mb-5 text-[16px] leading-[1.75] text-white/60">
                Construction is the slowest industry in the world to take up new
                technology, and this part of the world sits at the back of that
                queue. A Nigerian quantity surveyor still works from pages of
                drawings and take-off sheets. Valuations, material schedules,
                the lot — by hand.
              </p>
              <p className="text-[16px] leading-[1.75] text-white/60">
                It is not ignorance. The tools exist and people know about them.
                An annual licence is simply a serious capital decision for a
                small practice and out of reach entirely for an individual — and
                on top of the cost sits a learning curve nobody has spare time
                for.
              </p>
            </Rise>

            <Rise delay={0.08}>
              <div
                className="rounded-2xl border p-7 sm:p-8"
                style={{ borderColor: `${G}30`, background: `${G}07` }}
              >
                <p
                  className="mb-5 text-[11px] font-bold uppercase tracking-[0.25em]"
                  style={{ color: G }}
                >
                  So the real choice is
                </p>
                <ul className="m-0 list-none space-y-4 p-0">
                  <li className="text-[15px] leading-[1.6] text-white/70">
                    <strong className="font-semibold text-white">
                      Pirate it.
                    </strong>{" "}
                    Illegal, and no firm that intends to stay a firm runs
                    unlicensed software.
                  </li>
                  <li className="text-[15px] leading-[1.6] text-white/70">
                    <strong className="font-semibold text-white">
                      Buy it.
                    </strong>{" "}
                    Most cannot, and those who can still hit the learning curve.
                  </li>
                  <li className="text-[15px] leading-[1.6] text-white/70">
                    <strong className="font-semibold text-white">
                      Go back to paper.
                    </strong>{" "}
                    Which is what happens. It is available, it is understood,
                    and it works — slowly.
                  </li>
                </ul>
                <p className="mt-6 border-t border-white/10 pt-5 text-[15px] leading-[1.65] text-white/60">
                  ADLM builds the option that isn't on that list.
                </p>
              </div>
            </Rise>
          </div>
        </Section>

        {/* ── 02 what ── */}
        <Section id="what" width="bleed">
          <Prose className="mb-14">
            <Rise>
              <SLabel n="02" t="What ADLM is" />
              <SHead
                white="One account, and"
                accent="your data follows you."
                className="mb-6 max-w-[20ch]"
              />
              <p className="mb-5 text-[16px] leading-[1.75] text-white/55">
                Six products that map to how a bill of quantities actually gets
                made. The take-off tools ride inside the software the drawings
                already live in — Revit, Planswift — so nobody has to leave what
                they know. What they capture goes to the user's ADLM cloud,
                which is what turns a set of plugins into one continuous
                workflow.
              </p>
              <p className="text-[16px] leading-[1.75] text-white/55">
                Drawings need a PC. Everything after extraction does not. That
                single idea decides the product roadmap, the pricing model and
                the shape of the website.
              </p>
            </Rise>
          </Prose>

          <RiseMedia>
            <Slot
              ratio="21/9"
              fitHeight="62vh"
              kind="Diagram · full width"
              src={asset("site/spine-diagram")}
              label="One account → entitlements → Installer Hub → six products → phone"
              note="The spine diagram. The most explanatory single image across the whole project."
            />
          </RiseMedia>

          <Stagger className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { n: "6", t: "Products, one workflow" },
              { n: "2", t: "Host applications — Revit and Planswift" },
              { n: "6", t: "Currencies, applied as a display layer" },
              { n: "3 min", t: "For a take-off that took weeks by hand" },
            ].map((s) => (
              <StaggerItem key={s.t}>
                <div
                  className="border-l-2 pl-5"
                  style={{ borderColor: `${G}44` }}
                >
                  <b
                    className="mb-2 block text-[clamp(28px,3.4vw,40px)] font-semibold leading-none tabular-nums tracking-tight"
                    style={{ color: G }}
                  >
                    {s.n}
                  </b>
                  <span className="block text-[13.5px] leading-[1.5] text-white/50">
                    {s.t}
                  </span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Section>

        {/* ── 03 the work ── */}
        <Section id="work" width="bleed">
          <Prose className="mb-14">
            <Rise>
              <SLabel n="03" t="The work" />
              <SHead
                white="One project,"
                accent="five disciplines."
                className="mb-6 max-w-[20ch]"
              />
              <p className="text-[16px] leading-[1.75] text-white/55">
                Each stands on its own. Read whichever one you came for.
              </p>
            </Rise>
          </Prose>

          <Stagger className="grid auto-rows-[36px] grid-cols-1 gap-4 lg:grid-cols-12">
            {DISCIPLINES.map((d) => (
              <StaggerItem key={d.to} className={d.cell}>
                <motion.div
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.25, ease: [0.22, 0.61, 0.36, 1] }}
                  className="h-full"
                >
                  <Link
                    to={d.to}
                    className="sheen group relative flex h-full min-h-[260px] flex-col overflow-hidden rounded-2xl border border-white/8 bg-white/[0.02] p-8 transition-colors duration-300 hover:border-[#a3e635]/30 sm:p-9"
                  >
                    {/* The page behind the door. Low enough that the card still
                        reads as type first, brighter on hover. */}
                    <img
                      src={d.img}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover object-top opacity-[0.18] transition-all duration-700 group-hover:scale-[1.04] group-hover:opacity-[0.34]"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(160deg, rgba(7,9,12,0.92) 0%, rgba(7,9,12,0.74) 48%, rgba(7,9,12,0.94) 100%)",
                      }}
                    />
                    <span className="relative flex h-full w-full flex-col">
                      <p className="type-eyebrow mb-4" style={{ color: G }}>
                        {d.kicker}
                      </p>
                      <h3 className="type-h1 mb-3 text-white">{d.title}</h3>
                      <p className="mb-7 max-w-[52ch] text-[14.5px] leading-[1.7] text-white/55">
                        {d.body}
                      </p>
                      <span
                        className="mt-auto inline-flex items-center gap-2 text-[13px] font-semibold"
                        style={{ color: G }}
                      >
                        Open
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
                </motion.div>
              </StaggerItem>
            ))}
          </Stagger>
        </Section>

        {/* ── 04 role ── */}
        <Section id="role" width="narrow">
          <Rise>
            <SLabel n="04" t="What I own" />
            <SHead
              white="Creative Lead,"
              accent="across the whole surface."
              className="mb-12 max-w-[22ch]"
            />
          </Rise>

          <Stagger className="grid gap-5 md:grid-cols-3">
            {[
              {
                h: "Mine",
                b: "Brand identity and the design system beneath it. Product design across the six tools. Information architecture, interface design, and the front-end of the marketing site.",
              },
              {
                h: "Shared",
                b: "Product direction with the founders, and implementation with the engineers building the plugins, the platform and the extraction.",
              },
              {
                h: "Theirs",
                b: "The measurement engines, the AI extraction, cloud infrastructure, and the integrations with Revit and Planswift.",
              },
            ].map((c) => (
              <StaggerItem key={c.h}>
                <div className="h-full rounded-2xl border border-white/8 bg-white/[0.02] p-8">
                  <h3 className="type-h3 mb-3 text-white">{c.h}</h3>
                  <p className="text-[14.5px] leading-[1.7] text-white/50">
                    {c.b}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Section>

        <Blend />

        <BuildSection />
        <div className="h-16 lg:hidden" />
      </div>
    </div>
  );
}
