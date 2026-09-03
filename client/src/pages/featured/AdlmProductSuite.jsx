// src/pages/featured/AdlmProductSuite.jsx
//
// ADLM Studio — Product / UI-UX.
//
// The suite page. Its job is the connective tissue: what the six products are
// collectively for, how they hand off to each other, and why they behave as one
// workflow rather than a product list. Individual products go deep on their own
// routes.
//
// Products with a full page: QUIV, HERON, RateGen. The remaining three are
// covered in place. That split is deliberate — Revit MEP repeats the plugin
// story QUIV and HERON already tell, and Time Pro and CIVIQ are narrower. It
// can be revisited once their screens are revamped.
//
// LAYOUT. Text sits at reading measure; product blocks and diagrams take the
// full viewport minus gutters. The table of contents is a ghost rail at the
// right edge and costs no layout width.

import React from "react";
import PageMeta from "../../components/common/PageMeta";
import SectionToc from "../../components/common/SectionToc";
import CaseHero from "../../components/common/CaseHero";
import NextPair from "../../components/common/NextPair";
import DesignSystemFrame from "../../components/common/DesignSystemFrame";
import ProductPreview from "../../components/ProjectPage/ProductPreview";
import Slot from "../../components/common/Slot";
/* Frames name a drop-in key rather than an import — see data/adlmAssets.js. */
import { asset } from "../../data/adlmAssets";
import ScrollPair from "../../components/common/ScrollPair";
import dsThumb from "../../assets/ADLM/site/designsystem.webp";
import BuildSection from "../../components/Home/BuildSection";
/* The products themselves live in one place — see the note in that file. */
import { WORKFLOW, FLAGSHIPS, ALSO } from "../../data/adlmSuite";
import heroImg from "../../assets/ADLM/suite-hero.webp";
import spineImg from "../../assets/ADLM/spine-bg.webp";
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

const SECTIONS = [
  { id: "problem", label: "The problem" },
  { id: "workflow", label: "Six, one workflow" },
  { id: "spine", label: "The spine" },
  { id: "flagships", label: "The three deep dives" },
  { id: "also", label: "Also in the suite" },
  { id: "role", label: "What I own" },
];

const SIBLINGS = [
  { to: BASE, label: "ADLM overview" },
  { to: `${BASE}/brand`, label: "Brand identity" },
  { to: `${BASE}/design-system`, label: "Design system" },
  { to: `${BASE}/website`, label: "Website" },
  { to: "/adlm-studio-designs", label: "Social & marketing" },
];

export default function AdlmProductSuite() {
  return (
    <div className="relative min-h-screen bg-[#07090C] font-['Outfit'] text-white">
      <PageMeta
        title="ADLM Studio — Product Design"
        description="Six products, one workflow. Product design for ADLM Studio's construction-technology suite — take-off plugins, a shared rate library, and one account that carries a quantity surveyor's data from the drawing to the bill."
        url="/projects/featured/adlm-studio/product"
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

      <SectionToc sections={SECTIONS} siblings={SIBLINGS} />

      <div className="relative z-10">
        <CaseHero
          image={heroImg}
          imageAlt="A building rendered in wireframe over a field of construction drawings"
          badge="ADLM Studio · Product / UI-UX"
          title="Six products, one workflow."
          lead="Measure where your drawings live. Price from one shared library. Report from one place."
          focus="60% center"
          meta={[
            { label: "Role", value: "Creative Lead" },
            { label: "Scope", value: "Six products, one account" },
            { label: "Since", value: "February 2022" },
            { label: "Sector", value: "Construction technology" },
          ]}
        />

        {/* ── 01 problem ── */}
        <Section id="problem" width="narrow" first>
          <Rise>
            <SLabel n="01" t="The problem" />
            <SHead
              white="Most quantity surveyors here still work"
              accent="on paper."
              className="mb-12 max-w-[20ch]"
            />
          </Rise>

          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <Rise>
              <p className="mb-5 text-[16px] leading-[1.75] text-white/60">
                Construction is the last industry to adopt new technology, and
                this part of the world sits at the back of that queue. A
                Nigerian quantity surveyor still works from pages of drawings
                and take-off sheets. Valuations, material schedules, the lot —
                done by hand.
              </p>
              <p className="text-[16px] leading-[1.75] text-white/60">
                The tools that would fix it exist. They are not unknown here.
                They are unaffordable — an annual licence for a Planswift or a
                CostX is a serious capital decision for a small practice and out
                of reach entirely for an individual. On top of the cost sits a
                technical learning curve nobody has spare time for.
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
                    Illegal, and no firm that wants to stay a firm will run
                    unlicensed software.
                  </li>
                  <li className="text-[15px] leading-[1.6] text-white/70">
                    <strong className="font-semibold text-white">
                      Buy it.
                    </strong>{" "}
                    Most cannot, and the ones who can still hit the learning
                    curve.
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
                  ADLM builds the option that isn't on that list: the same
                  processes, made affordable, made usable, and built for how the
                  work is actually done here.
                </p>
              </div>
            </Rise>
          </div>

          <Rise delay={0.1} className="mt-12">
            <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-8 sm:p-10">
              <p className="type-eyebrow mb-4 text-white/35">And the payoff</p>
              <p className="max-w-[70ch] text-[17px] leading-[1.6] text-white/75 sm:text-[21px]">
                With AI carrying the repetitive measurement work, a take-off
                that would take a quantity surveyor{" "}
                <strong className="text-white">weeks by hand</strong> comes back
                in <span style={{ color: G }}>about three minutes</span>.
              </p>
            </div>
          </Rise>
        </Section>

        {/* ── 02 workflow — bleed diagram ── */}
        <Section id="workflow" width="bleed">
          <Prose className="mb-14">
            <Rise>
              <SLabel n="02" t="Six, one workflow" />
              <SHead
                white="The suite maps to the job,"
                accent="not to a feature list."
                className="mb-6 max-w-[22ch]"
              />
              <p className="text-[16px] leading-[1.75] text-white/55">
                Each product owns one stage of how a bill of quantities actually
                gets made. That is why they read as a workflow rather than a
                catalogue — and why the handoffs between them mattered more than
                any individual screen.
              </p>
            </Rise>
          </Prose>

          <Stagger className="mb-6 grid gap-5 md:grid-cols-3">
            {WORKFLOW.map((w, i) => (
              <StaggerItem key={w.step}>
                <div className="flex h-full flex-col rounded-2xl border border-white/8 bg-white/[0.02] p-8">
                  <span className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/25">
                    Stage {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="type-h1 mb-3 text-white">{w.step}</h3>
                  <p
                    className="mb-4 text-[13px] font-medium"
                    style={{ color: G }}
                  >
                    {w.tools}
                  </p>
                  <p className="text-[14.5px] leading-[1.65] text-white/50">
                    {w.note}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <RiseMedia>
            <Slot
              ratio="21/9"
              fitHeight="64vh"
              kind="Diagram · full width"
              src={asset("site/workflow-diagram")}
              label="The workflow — drawing → measure → price → report, with the six products placed on it"
              note="One line, lime on dark. The single most explanatory image on this page."
            />
          </RiseMedia>
        </Section>

        {/* ── 03 spine ──
            The only section with a photographic ground. It earns one because
            this is the conceptual centre of the page — drawing becoming
            building — and because a single treated section reads as emphasis,
            where a second one would just read as wallpaper. */}
        <div className="relative isolate">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden"
          >
            <img
              src={spineImg}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover opacity-[0.16]"
              style={{ objectPosition: "center 40%" }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom, #07090C 0%, #07090CD9 26%, #07090CD9 74%, #07090C 100%)",
              }}
            />
          </div>

          {/* `relative z-10` is load-bearing. The photographic ground above is
              absolutely positioned, so inside this stacking context it paints
              after — and therefore over — a statically positioned sibling. Left
              static, the scrim washes straight across the copy. */}
          <Section id="spine" width="narrow" className="relative z-10">
            <Rise>
              <SLabel n="03" t="The spine" />
              <SHead
                white="One account, and"
                accent="your data follows you."
                className="mb-12 max-w-[20ch]"
              />
            </Rise>

            {/* The copy is short and the diagram is tall, so they travel
                together rather than the copy finishing halfway down the
                section — the pairing used on the YDPay identity page. */}
            <ScrollPair
              cols="lg:grid-cols-[minmax(0,50ch)_minmax(0,1fr)]"
              gap="gap-12 lg:gap-20"
              content={
                <Rise>
                  <p className="mb-5 text-[16px] leading-[1.75] text-white/60">
                    QUIV rides on Revit, HERON on Planswift. You select an item
                    on the drawing and its dimensions and details collect into
                    the ADLM side panel, right there in the host software. That
                    data goes to the user's ADLM cloud storage.
                  </p>
                  <p className="mb-5 text-[16px] leading-[1.75] text-white/60">
                    Which means the take-off does not end at the machine it
                    started on. Drawings need a PC. Everything downstream of
                    extraction — adjusting cost data, reviewing quantities,
                    checking a budget — does not. Pick it up on a phone and keep
                    going.
                  </p>
                  <p className="text-[16px] leading-[1.75] text-white/60">
                    That single idea is what makes six products behave as one
                    tool, and it is also what makes the roadmap obvious. Latch
                    onto Revit and Planswift today, because that is where the
                    drawings already are. Own the whole chain later, once there
                    is a reason for a practice to leave.
                  </p>
                </Rise>
              }
              media={
                <RiseMedia delay={0.08}>
                  <Slot
                    ratio="4/5"
                    kind="Diagram"
                    src={asset("site/spine-diagram")}
                    label="One account → entitlements → Installer Hub → six products → phone"
                    note="Vertical spine. Shows the handoff from desk to phone."
                  />
                </RiseMedia>
              }
            />
          </Section>
        </div>

        {/* ── 04 flagships — bleed ── */}
        <Section id="flagships" width="bleed">
          <Prose className="mb-14">
            <Rise>
              <SLabel n="04" t="The three deep dives" />
              <SHead
                white="Take-off, take-off, and"
                accent="the library they both price against."
                className="mb-6 max-w-[24ch]"
              />
              <p className="text-[16px] leading-[1.75] text-white/55">
                These three carry the workflow. Each has its own case study.
              </p>
            </Rise>
          </Prose>

          <div className="space-y-6">
            {FLAGSHIPS.map((p, i) => (
              <ProductPreview key={p.name} product={p} index={i} />
            ))}
          </div>
        </Section>

        {/* ── 05 also — bleed ── */}
        <Section id="also" width="bleed">
          <Prose className="mb-14">
            <Rise>
              <SLabel n="05" t="Also in the suite" />
              <SHead
                white="Three more, covered"
                accent="here."
                className="mb-6 max-w-[24ch]"
              />
              <p className="text-[16px] leading-[1.75] text-white/55">
                Revit MEP repeats the plugin story QUIV and HERON already tell
                in full, and Time Pro and CIVIQ are narrower in scope. They are
                shown here rather than stretched into thin pages of their own.
              </p>
            </Rise>
          </Prose>

          <div className="space-y-6">
            {ALSO.map((p, i) => (
              <ProductPreview key={p.name} product={p} index={i} />
            ))}
          </div>
        </Section>

        {/* ── 06 role ── */}
        <Section id="role" width="narrow">
          <Rise>
            <SLabel n="06" t="What I own" />
            <SHead
              white="Creative Lead,"
              accent="across the whole surface."
              className="mb-12 max-w-[22ch]"
            />
          </Rise>

          {/* The role/scope strip lives in the hero now — repeating it here
              would be the third time a reader sees the same four facts. */}
          <Stagger className="grid gap-5 md:grid-cols-3">
            <StaggerItem>
              <div className="h-full rounded-2xl border border-white/8 bg-white/[0.02] p-8">
                <h3 className="type-h3 mb-3 text-white">Mine</h3>
                <p className="text-[14.5px] leading-[1.7] text-white/50">
                  Product design across the six tools, the design system
                  underneath them, the information architecture, and the
                  interface work from flow to final screen.
                </p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="h-full rounded-2xl border border-white/8 bg-white/[0.02] p-8">
                <h3 className="type-h3 mb-3 text-white">Shared</h3>
                <p className="text-[14.5px] leading-[1.7] text-white/50">
                  Product direction with the founders, and implementation with
                  the engineers who build the plugins and the platform.
                </p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="h-full rounded-2xl border border-white/8 bg-white/[0.02] p-8">
                <h3 className="type-h3 mb-3 text-white">Theirs</h3>
                <p className="text-[14.5px] leading-[1.7] text-white/50">
                  The measurement engines, the AI extraction, the cloud
                  infrastructure and the plugin integrations with Revit and
                  Planswift.
                </p>
              </div>
            </StaggerItem>
          </Stagger>
        </Section>

        <DesignSystemFrame to={`${BASE}/design-system`} previewSrc={dsThumb} />

        <NextPair
          inProject={{
            to: `${BASE}/website`,
            title: "The ADLM website",
            blurb:
              "The audit that started it, the restructure, and the marketing site the suite sells through.",
          }}
          inCategory={{
            to: "/ui-projects/niqs",
            title: "NIQS",
            blurb:
              "A member portal, admin secretariat and template system for a national professional body.",
          }}
        />

        <Blend />

        <BuildSection />
        <div className="h-16 lg:hidden" />
      </div>
    </div>
  );
}
