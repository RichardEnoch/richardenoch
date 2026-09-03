// src/pages/featured/AdlmQuiv.jsx
//
// ADLM Studio — QUIV. The product-page template.
//
// Section order is fixed across every product in the suite so all of them are
// producible from the same shot list: hero loop, in-context proof, the
// decisions, the flows, extracted feature snippets, the phone continuation,
// the output. HERON, RateGen and the rest follow this file.
//
// LAYOUT. QUIV is desktop software running inside Revit, so the frames that
// prove it need width. Text sits at reading measure inside Prose; every screen
// gets either the full content container or a bleed section. The table of
// contents is a ghost rail at the right edge and costs no layout width at all.
//
// Flow strips render as labelled Slots until real frames exist. Once they do,
// each strip swaps to the GuidelineCarousel in landscape orientation, which is
// already the site's snap-scrolled frame viewer — the Slot grid is scaffolding,
// not a second pattern.

import React from "react";
import StackCards from "../../components/common/StackCards";
import PageMeta from "../../components/common/PageMeta";
import SectionToc from "../../components/common/SectionToc";
import CaseHero from "../../components/common/CaseHero";
import NextPair from "../../components/common/NextPair";
import DesignSystemFrame from "../../components/common/DesignSystemFrame";
import Slot from "../../components/common/Slot";
/* Every frame on this page names a drop-in key rather than an import, so the
   captures publish by being dropped into a folder. See data/adlmAssets.js. */
import { asset } from "../../data/adlmAssets";
import GuidelineCarousel from "../../components/ProjectPage/GuidelineCarousel";
import dsThumb from "../../assets/ADLM/site/designsystem.webp";
import BuildSection from "../../components/Home/BuildSection";
import heroImg from "../../assets/ADLM/quiv-hero.webp";
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

/* Each principle traces to something found in the research rather than to a
   feature request. That mapping is the point of the section. */
const PRINCIPLES = [
  {
    n: "01",
    title: "Offline first",
    finding: "Connectivity on a Nigerian site office cannot be assumed.",
    decision:
      "A tool that stops working when the network drops gets abandoned inside a month. Take-off runs entirely offline and reconciles to the cloud when a connection returns.",
  },
  {
    n: "02",
    title: "Desktop, not forced onto the web",
    finding:
      "The drawings are large, the work is precise, and the files live on a machine.",
    decision:
      "Building this in a browser would have been the fashionable choice and the wrong one. QUIV runs where Revit runs.",
  },
  {
    n: "03",
    title: "No override on measured quantities",
    finding: "A bill is only worth anything if it survives being challenged.",
    decision:
      "A quantity that came off a drawing cannot be quietly edited to a different number. If it is wrong, the measurement gets corrected — never the output. That traceability is the entire value of the profession.",
  },
  {
    n: "04",
    title: "Aligned to the standard method",
    finding:
      "Output that ignores the standard has to be reworked by hand before anyone can use it.",
    decision:
      "Which removes the reason to use the tool at all. QUIV's collation follows BESMM, so what comes out is usable as it stands.",
  },
];

const FLOWS = [
  {
    name: "Import",
    note: "Bringing a model into QUIV and setting it up for measurement",
    key: "products/quiv/flow-import",
  },
  {
    name: "Measure",
    note: "Selecting elements in Revit and watching the panel fill",
    key: "products/quiv/flow-measure",
  },
  {
    name: "Collation",
    note: "The generated take-off list, grouped and BESMM-ordered",
    key: "products/quiv/flow-collation",
  },
  {
    name: "Export",
    note: "Out to a bill, a schedule or the cloud",
    key: "products/quiv/flow-export",
  },
];

const SNIPPETS = [
  {
    title: "The panel fills as you select",
    body: "Pick an element in the Revit view and its dimensions, material and details land in the side panel immediately. No dialog, no separate capture step — the measuring and the recording are the same action.",
    shot: "The side panel mid-capture, with one element selected in the view behind it",
    key: "products/quiv/snippet-panel-fills",
  },
  {
    title: "Quantities carry their source",
    body: "Every line in the collation knows which element it came from. Click it and the model highlights. That link is what makes the no-override rule enforceable rather than aspirational.",
    shot: "A collation row with its source element highlighted in the model",
    key: "products/quiv/snippet-source-link",
  },
  {
    title: "Grouped the way a bill is read",
    body: "The list arrives ordered against the standard method rather than in selection order, so what comes out reads like a bill instead of a log.",
    shot: "The collation list, BESMM-grouped, with section headers",
    key: "products/quiv/snippet-besmm-grouped",
  },
];

const SECTIONS = [
  { id: "what", label: "What it is" },
  { id: "context", label: "In context" },
  { id: "principles", label: "Four decisions" },
  { id: "flows", label: "The flows" },
  { id: "detail", label: "In detail" },
  { id: "continue", label: "Away from the desk" },
  { id: "output", label: "What comes out" },
];

const SIBLINGS = [
  { to: `${BASE}/product`, label: "← The full suite" },
  { to: `${BASE}/product/heron`, label: "HERON" },
  { to: `${BASE}/product/rategen`, label: "RateGen" },
  { to: `${BASE}/design-system`, label: "Design system" },
];

export default function AdlmQuiv() {
  return (
    <div className="relative min-h-screen bg-[#07090C] font-['Outfit'] text-white">
      <PageMeta
        title="QUIV — Product Design"
        description="QUIV is ADLM Studio's Revit take-off plugin. Select an item on the drawing and its dimensions collect into the side panel, sync to the cloud, and carry through to a bill — designed offline-first, desktop-first and BESMM-aligned."
        url="/projects/featured/adlm-studio/product/quiv"
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

      {/* Fixed to the right edge — takes no layout width. */}
      <SectionToc
        sections={SECTIONS}
        siblings={SIBLINGS}
        siblingsLabel="Elsewhere in ADLM"
      />

      <div className="relative z-10">
        <CaseHero
          image={heroImg}
          imageAlt="A building model open on a workstation with a take-off panel docked beside it"
          badge="ADLM Studio · Revit plugin"
          title="QUIV"
          lead="Take-off without leaving the model. Select an item on the drawing and its dimensions and details collect into the panel beside it — then follow you off the machine."
          focus="70% center"
          meta={[
            { label: "Product", value: "QUIV" },
            { label: "Runs in", value: "Autodesk Revit" },
            { label: "Role", value: "Product design lead" },
            { label: "Themes", value: "Light · Dark · Blue" },
          ]}
        />

        {/* ── 01 what ── */}
        <Section id="what" first>
          <Rise>
            <SLabel n="01" t="What it is" />
            <SHead
              white="Measurement that never leaves"
              accent="the drawing."
              className="mb-10 max-w-[22ch]"
            />
          </Rise>

          <div className="grid gap-12 lg:grid-cols-[minmax(0,38ch)_minmax(0,1.55fr)] lg:gap-14">
            <Rise>
              <p className="mb-5 text-[16px] leading-[1.75] text-white/60">
                QUIV docks inside Revit. A quantity surveyor selects an item in
                the model and its dimensions, material and details are captured
                into the QUIV panel sitting beside the view. There is no export,
                no re-keying, no second window to reconcile.
              </p>
              <p className="text-[16px] leading-[1.75] text-white/60">
                The captured data goes to that user's ADLM cloud storage, which
                is what turns a plugin into part of a workflow — the take-off
                can be picked up on a phone, priced against the shared rate
                library, and carried through to a bill without the machine that
                started it.
              </p>
            </Rise>
            <RiseMedia delay={0.08}>
              <Slot
                ratio="16/10"
                kind="Loop · 5–8s"
                src={asset("products/quiv/loop-capture")}
                label="Selecting an element in Revit and watching the QUIV panel fill"
                note="Muted autoplay, poster-frame fallback. The one action that explains the product without a caption."
              />
            </RiseMedia>
          </div>
        </Section>

        {/* ── 02 in context — bleed ── */}
        <Section id="context" width="bleed">
          <Prose className="mb-12">
            <Rise>
              <SLabel n="02" t="In context" />
              <SHead
                white="Built into the software they"
                accent="already have open."
                className="mb-6 max-w-[24ch]"
              />
              <p className="text-[16px] leading-[1.75] text-white/55">
                The adoption problem is not that quantity surveyors dislike
                software — it is that every new tool asks them to leave the one
                they know. A plugin asks nothing. The model stays where it is,
                the workflow stays where it is, and the capture happens in the
                margin.
              </p>
            </Rise>
          </Prose>
          <RiseMedia>
            <Slot
              ratio="16/9"
              fitHeight="78vh"
              kind="Screen · full width"
              src={asset("products/quiv/in-context")}
              label="Full Revit window with QUIV docked — the proof it is real software in a real host"
              note="Capture at 2560px and do not crop the Revit chrome out; the chrome is the point."
            />
          </RiseMedia>
        </Section>

        {/* ── 03 principles ── */}
        <Section id="principles" width="narrow">
          <Rise>
            <SLabel n="03" t="Four decisions" />
            <SHead
              white="Each one came from a finding,"
              accent="not a feature request."
              className="mb-6 max-w-[24ch]"
            />
            <Prose className="mb-14">
              <p className="text-[16px] leading-[1.75] text-white/55">
                The research question was never{" "}
                <em>what features are missing</em>. It was what has to be true
                for a practice here to actually adopt this. These four are the
                answers, and they constrained everything downstream.
              </p>
            </Prose>
          </Rise>

          <Stagger className="grid gap-4 sm:grid-cols-2">
            {PRINCIPLES.map((p) => (
              <StaggerItem key={p.n}>
                <div className="flex h-full flex-col rounded-2xl border border-white/8 bg-white/[0.02] p-7 sm:p-8">
                  <span
                    className="mb-4 text-[10px] font-semibold tabular-nums tracking-[0.2em]"
                    style={{ color: G }}
                  >
                    {p.n}
                  </span>
                  <h3 className="type-h2 mb-4 text-white">{p.title}</h3>
                  <p
                    className="mb-4 border-l-2 pl-4 text-[14px] italic leading-[1.6] text-white/45"
                    style={{ borderColor: `${G}44` }}
                  >
                    {p.finding}
                  </p>
                  <p className="text-[14.5px] leading-[1.7] text-white/60">
                    {p.decision}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Section>

        {/* ── 04 flows ── */}
        {/* One frame per flow, on the same carousel the brand guidelines use.
            The grid it replaced showed sixteen empty slots — four steps for
            four flows — which is a lot of scaffolding for a reader to walk
            past. A flow is one continuous action, so it gets one frame that
            runs it, with the sentence that explains it underneath. */}
        <GuidelineCarousel
          n="04"
          label="The flows"
          white="From a model to"
          accent="a priced bill."
          description="Four flows carry the product end to end, each designed across light, dark and blue themes and iterated from v3 to v4. Scroll to move through them."
          orientation="landscape"
          skipLabel="Skip the flows"
          slides={FLOWS.map((f) => ({
            src: f.src || asset(f.key) || null,
            alt: `${f.name} — ${f.note}`,
            title: f.name,
            caption: f.note,
          }))}
        />

        <Section width="bleed">
          <Rise delay={0.05} className="mt-16">
            <div
              className="max-w-[72ch] rounded-2xl border p-7 sm:p-9"
              style={{ borderColor: `${G}30`, background: `${G}07` }}
            >
              <p
                className="mb-4 text-[11px] font-bold uppercase tracking-[0.25em]"
                style={{ color: G }}
              >
                One scroll sequence, here only
              </p>
              <p className="text-[15.5px] leading-[1.7] text-white/65">
                The Measure flow gets a scroll-scrubbed frame sequence — the
                take-off action driven by scroll position rather than a play
                button. It is built once, on the flagship. Every other flow in
                the suite uses the snap carousel.
              </p>
            </div>
          </Rise>
        </Section>

        {/* ── 05 detail — alternating, media given the larger half ── */}
        <Section id="detail" width="bleed">
          <Prose className="mb-14">
            <Rise>
              <SLabel n="05" t="In detail" />
              <SHead
                white="Three things worth"
                accent="looking closely at."
                className="max-w-[24ch]"
              />
            </Rise>
          </Prose>

          {/* One template, repeated, and pinned. Alternating sides made each
              card look like a different size even though the grid was
              identical — consistency reads as a system, variation reads as an
              accident. Stacking them means each one has to be arrived at
              rather than skimmed past, and the card you just read stays
              visible under the one that replaced it. The panel is opaque
              rather than translucent for exactly that reason. */}
          <StackCards>
            {SNIPPETS.map((s) => (
              <div key={s.title}>
                <div className="grid items-center gap-10 rounded-3xl border border-white/10 bg-[#0B0E13] p-6 shadow-[0_28px_80px_-30px_rgba(0,0,0,0.95)] sm:p-10 lg:grid-cols-[minmax(0,34ch)_minmax(0,1.7fr)] lg:gap-12">
                  <div>
                    <h3 className="type-h1 mb-4 text-white">{s.title}</h3>
                    <p className="text-[15px] leading-[1.75] text-white/55">
                      {s.body}
                    </p>
                  </div>
                  <div>
                    <Slot
                      ratio="16/10"
                      kind="Snippet"
                      src={asset(s.key)}
                      label={s.shot}
                      note="Extracted component, not a full screen"
                    />
                  </div>
                </div>
              </div>
            ))}
          </StackCards>
        </Section>

        {/* ── 06 continue ── */}
        <Section id="continue" width="narrow">
          <Rise>
            <SLabel n="06" t="Away from the desk" />
            <SHead
              white="The take-off doesn't end at"
              accent="the machine that started it."
              className="mb-12 max-w-[24ch]"
            />
          </Rise>

          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,38ch)_minmax(0,1.5fr)] lg:gap-16">
            <Rise>
              <p className="mb-5 text-[16px] leading-[1.75] text-white/60">
                Extraction needs a PC — the drawings are there and the model is
                there. Everything after it does not. Adjusting cost data,
                reviewing quantities, checking a budget against a rate: none of
                that needs the workstation.
              </p>
              <p className="text-[16px] leading-[1.75] text-white/60">
                Because capture writes to the account rather than to the
                machine, the same take-off opens on a phone with nothing to
                export, sync or email. This is the frame that explains the whole
                product model, and it is the one most easily forgotten when
                capturing screens.
              </p>
            </Rise>
            <RiseMedia delay={0.08}>
              <Slot
                ratio="4/5"
                kind="Loop or frame"
                src={asset("products/quiv/on-phone")}
                label="The same take-off, open on a phone"
                note="Ideally shot as a continuation of the hero loop — same project, same data."
              />
            </RiseMedia>
          </div>
        </Section>

        {/* ── 07 output ── */}
        <Section id="output" width="bleed">
          <Prose className="mb-12">
            <Rise>
              <SLabel n="07" t="What comes out" />
              <SHead
                white="A bill you can"
                accent="defend."
                className="mb-6 max-w-[22ch]"
              />
              <p className="text-[16px] leading-[1.75] text-white/55">
                Grouped against the standard method, every quantity traceable to
                the element it came from, priced against the shared library.
                Usable as it stands rather than as a starting point for a day of
                manual rework.
              </p>
            </Rise>
          </Prose>
          <Stagger className="grid gap-5 lg:grid-cols-2">
            <StaggerItem>
              <Slot
                ratio="16/10"
                kind="Output"
                src={asset("products/quiv/output-list")}
                label="The generated take-off list"
              />
            </StaggerItem>
            <StaggerItem>
              <Slot
                ratio="16/10"
                kind="Output"
                src={asset("products/quiv/output-bill")}
                label="The priced bill it becomes"
              />
            </StaggerItem>
          </Stagger>
        </Section>

        <DesignSystemFrame to={`${BASE}/design-system`} previewSrc={dsThumb} />

        {/* ── close ── */}
        <Section width="narrow">
          <Prose>
            <Rise>
              <SHead
                white="What it taught me,"
                accent="in one line."
                className="mb-8 max-w-[22ch]"
              />
              <p className="mb-5 text-[16px] leading-[1.75] text-white/60">
                QUIV is the piece of this project I would put in front of anyone
                who wants to know whether I can design a product rather than a
                screen. Almost every decision on it was forced by a constraint
                somebody else would have argued away — no connectivity, no
                budget, no appetite to leave the software they already know —
                and the design is better for having had to take those seriously
                rather than design around them.
              </p>
              <p className="mb-8 text-[16px] leading-[1.75] text-white/60">
                The rule I keep from it is the no-override policy. It makes the
                product less convenient and more trustworthy, and choosing that
                trade deliberately is most of what product design actually is.
              </p>
              <a
                href="https://adlm-studio.vercel.app/quiv"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg px-5 py-3 text-[13.5px] font-bold text-black transition-[filter] duration-200 hover:brightness-110"
                style={{
                  background: "linear-gradient(180deg,#7BF003 0%,#3E7B00 100%)",
                }}
              >
                See QUIV on the ADLM site
                <svg
                  width="14"
                  height="14"
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
            </Rise>
          </Prose>
        </Section>

        <NextPair
          inProject={{
            to: `${BASE}/product/heron`,
            title: "HERON",
            blurb:
              "The same capture-and-continue model, for the drawings that never became a model.",
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
        {/* clears the mobile contents bar */}
        <div className="h-16 lg:hidden" />
      </div>
    </div>
  );
}
