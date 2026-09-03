// src/pages/featured/AdlmBrand.jsx
//
// ADLM Studio — brand identity.
//
// ASSETS. ADLM's own production files, the three evolution marks, the original
// sketch sheet, and real deliverables out of the project folder — the training
// certificate, the badge, the dashboard and the phone. Plus the generated
// ConTech imagery, which is brand work in its own right because the pictures a
// construction-technology brand needs do not exist to be licensed.
//
// The nineteen lockup SVGs ship out of Figma carrying a grey backing rect, the
// full artboard and the purple selection frame. Cleaned copies live in
// assets/ADLM/logo/ and render inline, so they are crisp at any size.
//
// NARRATIVE. The subject is the identity running now. The origin gets one
// section, because without it the candlestick is inexplicable. Colour is argued
// on what the brand needs today.

import React from "react";
import PageMeta from "../../components/common/PageMeta";
import SectionToc from "../../components/common/SectionToc";
import CaseHero from "../../components/common/CaseHero";
import NextPair from "../../components/common/NextPair";
import BrandGallery from "../../components/ProjectPage/BrandGallery";
import GuidelineCarousel from "../../components/ProjectPage/GuidelineCarousel";
/* Frames name a drop-in key rather than an import — see data/adlmAssets.js. */
import { withAssets } from "../../data/adlmAssets";
import BuildSection from "../../components/Home/BuildSection";
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

/* ADLM's real logo library — four lockups × five colourways, in a light-mode
   and a dark-mode cut. The dark-mode files are drawn for dark grounds rather
   than recoloured onto them, which is why the wordmark reverses cleanly instead
   of arriving inside a black backing box. */
import lightVariant from "../../assets/ADLM/logo/light-logo-variant-standard.svg";
import lightPrimary from "../../assets/ADLM/logo/light-primary-logo-standard.svg";
import lightSecondary from "../../assets/ADLM/logo/light-secondary-logo-standard.svg";
import lightMark from "../../assets/ADLM/logo/light-logo-mark-blue.svg";
import lightVariantOrange from "../../assets/ADLM/logo/light-logo-variant-orange.svg";
import darkVariant from "../../assets/ADLM/logo/dark-logo-variant-standard.svg";
import darkVariantGradient from "../../assets/ADLM/logo/dark-logo-variant-gradient.svg";
import evolutionMiddle from "../../assets/ADLM/logo/evolution-middle.svg";
import sketchImg from "../../assets/ADLM/brand/idea-sketch.webp";
import evo1 from "../../assets/ADLM/brand/evo-1.webp";
import certificateImg from "../../assets/ADLM/brand/certificate.webp";
import badgeImg from "../../assets/ADLM/brand/badge.webp";
import dashboardImg from "../../assets/ADLM/brand/dashboard.webp";
import phoneImg from "../../assets/ADLM/brand/phone.webp";
import heroImg from "../../assets/ADLM/gallery/gal-03.webp";
import plateBg from "../../assets/ADLM/gallery/gal-02.webp";
import gal01 from "../../assets/ADLM/gallery/gal-01.webp";
import gal02 from "../../assets/ADLM/gallery/gal-02.webp";
import gal03 from "../../assets/ADLM/gallery/gal-03.webp";
import gal04 from "../../assets/ADLM/gallery/gal-04.webp";
import gal05 from "../../assets/ADLM/gallery/gal-05.webp";
import gal06 from "../../assets/ADLM/gallery/gal-06.webp";
import gal07 from "../../assets/ADLM/gallery/gal-07.webp";
import gal08 from "../../assets/ADLM/gallery/gal-08.webp";
import gal09 from "../../assets/ADLM/gallery/gal-09.webp";
import gal10 from "../../assets/ADLM/gallery/gal-10.webp";
import gal11 from "../../assets/ADLM/gallery/gal-11.webp";
import gal12 from "../../assets/ADLM/gallery/gal-12.webp";
import gal13 from "../../assets/ADLM/gallery/gal-13.webp";
import gal15 from "../../assets/ADLM/gallery/gal-15.webp";
import gal16 from "../../assets/ADLM/gallery/gal-16.webp";

const BASE = "/projects/featured/adlm-studio";
const NAVY = "#091E39";
const BLUE = "#239CFF";
const ORANGE = "#E86A27";

/* `scale` sizes each lockup against the others rather than letting the box
   decide. The mark is nearly square and the variant is nearly 6:1, so filling
   the same plate would render one of them as a sliver. */
const LOCKUPS = [
  {
    src: lightPrimary,
    t: "Primary",
    b: "Mark above the wordmark. The default wherever there is vertical room.",
    scale: "h-[150px] w-auto",
  },
  {
    src: lightSecondary,
    t: "Secondary",
    b: "Mark beside a stacked wordmark. Square and near-square placements.",
    scale: "w-full max-h-[110px] object-contain",
  },
  {
    src: lightVariant,
    t: "Horizontal",
    b: "The working lockup — navigation, letterheads, signatures.",
    scale: "w-full max-h-[90px] object-contain",
  },
  {
    src: lightMark,
    t: "Mark",
    b: "Alone. Favicons, app icons, and any surface already carrying the name.",
    scale: "h-[130px] w-auto",
  },
];

const GROUNDS = [
  {
    t: "On light",
    b: "Full colour. Navy carries the mark and wordmark; blue and orange hold the window and the pill.",
    bg: "#F4F6F8",
    src: lightVariant,
  },
  {
    t: "On dark",
    b: "A separately drawn cut, not a recolour — the wordmark reverses to white and the mark keeps its own container, so nothing arrives inside a backing box.",
    bg: NAVY,
    src: darkVariant,
  },
  {
    t: "Single colour",
    b: "One-colour print, embroidery and engraving, where the full palette cannot survive the process.",
    bg: "#FBFBF9",
    src: lightVariantOrange,
  },
  {
    t: "Gradient",
    b: "For screen moments that can carry it — splash states, covers, and the app icon.",
    bg: NAVY,
    src: darkVariantGradient,
  },
];

const PALETTE = [
  {
    hex: NAVY,
    name: "Navy",
    ink: "#FAFAFA",
    role: "The ground.",
    b: "Everything sits on it — the site, the plugins, the documents. Dark enough to read as engineering rather than as a consumer app, steady enough that nothing else has to fight it.",
  },
  {
    hex: BLUE,
    name: "Blue",
    ink: "#04101F",
    role: "The working colour.",
    b: "Where action lives: buttons, links, live measurements, the selected state. It reaches full saturation on navy, which is why the brand leads dark rather than light.",
  },
  {
    hex: ORANGE,
    name: "Orange",
    ink: "#FAFAFA",
    role: "The one accent.",
    b: "Rationed on purpose and barred from status use, so it never competes with a warning. Because it is scarce, it still means something when it appears.",
  },
];

/* Two of the three are real vector now. Only the first mark exists solely as a
   raster, so it is the one still shown as an image. */
const EVOLUTION = [
  {
    src: evo1,
    t: "Drawn",
    b: "Monochrome, wordmark underlined. The building and the candlestick are both already here — every pass after this refines rather than replaces.",
  },
  {
    src: evolutionMiddle,
    t: "Contained",
    b: "Into a rounded container, so the mark holds at favicon size and on any ground. Colour enters the wordmark.",
  },
  {
    src: lightVariant,
    t: "Balanced",
    b: "Tighter. Orange becomes a solid pill carrying “Studio”, with a blue rule beneath — colour doing structural work instead of decorating.",
  },
];

const TYPE = [
  {
    name: "FM Bolyar Sans Pro",
    era: "The original",
    face: "'FM Bolyar Sans Pro', sans-serif",
    weight: 500,
    /* What it is asked to set. Showing each face setting the word it is
       actually responsible for says more than three specimens of their own
       names — Orbitron only ever sets ADLM, Lexend only ever sets everything
       else, and the specimen should show that rather than describe it. */
    sets: "ADLM Studio",
    retired: true,
    since: "2020 – 2022",
    note: "A conservative geometric sans with the right corporate register. Licensed, which is exactly why it could not stay: a brand that has to be produced by people who are not designers cannot depend on a font nobody else in the company owns.",
  },
  {
    name: "Orbitron",
    era: "The wordmark",
    face: "'Orbitron', sans-serif",
    weight: 700,
    sets: "ADLM",
    note: "Squared and structural. It holds the geometry of the face it replaced, sets the four letters of the wordmark and nothing else, and never appears in interface text.",
  },
  {
    name: "Lexend",
    era: "Everything else",
    face: "'Lexend', sans-serif",
    weight: 500,
    sets: "Studio",
    note: "Drawn for reading ease, wide weight range, as comfortable inside a Windows desktop plugin as on the web. It sets the second half of the lockup and every word of the product. Still the product typeface today.",
  },
];

/* Every deliverable in the platinum package, one cell each — the specific
   thing that gets photographed, not a category. Ratios are mixed so the
   masonry packs like the Tabstudio and Verde Luxe galleries rather than
   stacking into equal rectangles. Real shots go in as they are produced. */
const TOUCHPOINTS = [
  // produced
  {
    src: certificateImg,
    label: "Training certificate",
    alt: "ADLM training certificate",
  },
  {
    src: badgeImg,
    label: "Course completion seal",
    alt: "ADLM training badge",
  },
  // stationery and office
  { label: "Letterhead", ratio: "3/4", key: "touchpoints/letterhead" },
  {
    label: "Business cards, front and back",
    ratio: "4/3",
    key: "touchpoints/business-cards",
  },
  { label: "Envelope", ratio: "4/3", key: "touchpoints/envelope" },
  {
    label: "Document folder",
    ratio: "4/5",
    key: "touchpoints/document-folder",
  },
  { label: "Notepad", ratio: "4/5", key: "touchpoints/notepad" },
  { label: "Branded pen", ratio: "1/1", key: "touchpoints/branded-pen" },
  { label: "Desk calendar", ratio: "4/3", key: "touchpoints/desk-calendar" },
  // training and events
  { label: "Lanyard and ID card", ratio: "4/5", key: "touchpoints/lanyard" },
  { label: "Roll-up banner", ratio: "3/4", key: "touchpoints/roll-up-banner" },
  { label: "Event backdrop", ratio: "16/9", key: "touchpoints/event-backdrop" },
  // merchandise
  { label: "T-shirt", ratio: "1/1", key: "touchpoints/t-shirt" },
  { label: "Polo shirt", ratio: "4/5", key: "touchpoints/polo-shirt" },
  { label: "Hoodie", ratio: "4/5", key: "touchpoints/hoodie" },
  { label: "Face cap", ratio: "1/1", key: "touchpoints/face-cap" },
  { label: "Tote bag", ratio: "4/5", key: "touchpoints/tote-bag" },
  { label: "Paper bag", ratio: "4/5", key: "touchpoints/paper-bag" },
  { label: "Mug", ratio: "1/1", key: "touchpoints/mug" },
  { label: "Water bottle", ratio: "3/4", key: "touchpoints/water-bottle" },
  {
    label: "Branded flash drive",
    ratio: "4/3",
    key: "touchpoints/branded-flash-drive",
  },
  { label: "Keychain", ratio: "1/1", key: "touchpoints/keychain" },
  { label: "Sticker pack", ratio: "4/3", key: "touchpoints/sticker-pack" },
  { label: "Mouse pad", ratio: "4/3", key: "touchpoints/mouse-pad" },
];

/* The picture library. Generated where nothing licensable existed, sourced
   where it did, graded to one direction so the join does not show. */
const IMAGERY = [
  { src: gal01, label: "Model on the desk", alt: "BIM model on a workstation" },
  {
    src: gal02,
    label: "Blueprint field",
    alt: "Wireframe building over drawings",
  },
  {
    src: gal10,
    label: "Virtual projection",
    alt: "Architect working with a 3D projection",
  },
  {
    src: gal03,
    label: "Structure, lit",
    alt: "Illuminated structure at night",
  },
  {
    src: gal05,
    label: "Among the unbuilt",
    alt: "Building among drawn outlines",
  },
  {
    src: gal11,
    label: "Helmet and drawings",
    alt: "Site helmet on blueprints",
  },
  {
    src: gal04,
    label: "Drawing to build",
    alt: "Blueprint resolving into a building",
  },
  { src: gal06, label: "Site geometry", alt: "Construction geometry" },
  { src: gal12, label: "The data underneath", alt: "Data visualisation" },
  { src: gal07, label: "Night elevation", alt: "Building elevation at night" },
  { src: gal13, label: "For firms", alt: "Practice audience image" },
  { src: gal15, label: "For students", alt: "Student audience image" },
  {
    src: gal16,
    label: "For institutions",
    alt: "Institutional audience image",
  },
  { src: gal08, label: "Extraction", alt: "Quantity extraction imagery" },
  { src: gal09, label: "Measured", alt: "Measurement imagery" },
];

const GUIDELINE_SLIDES = [
  { alt: "Cover", key: "guideline/01" },
  { alt: "The mark and its construction", key: "guideline/02" },
  { alt: "Clearance and minimum size", key: "guideline/03" },
  { alt: "The four lockups", key: "guideline/04" },
  { alt: "Colourways", key: "guideline/05" },
  { alt: "Misuse", key: "guideline/06" },
  { alt: "Colour", key: "guideline/07" },
  { alt: "Typography", key: "guideline/08" },
  { alt: "Stationery", key: "guideline/09" },
  { alt: "Templates", key: "guideline/10" },
];

const SECTIONS = [
  { id: "rationale", label: "Logo rationale" },
  { id: "mark", label: "The mark" },
  { id: "lockups", label: "The lockups" },
  { id: "colour", label: "Colour" },
  { id: "grounds", label: "On any ground" },
  { id: "evolution", label: "How it evolved" },
  { id: "type", label: "Typography" },
  { id: "application", label: "In application" },
  { id: "deliverables", label: "The package" },
  { id: "imagery", label: "Imagery" },
];

const SIBLINGS = [
  { to: BASE, label: "← ADLM overview" },
  { to: `${BASE}/design-system`, label: "Design system" },
  { to: `${BASE}/website`, label: "Website" },
  { to: `${BASE}/product`, label: "Product / UI-UX" },
];

/* The mark on the brand's own ground: navy, one soft glow, a fine dot grid. */
const LogoPlate = ({ className = "", ratio = "5/4", width = "42%" }) => (
  <div
    className={`relative flex items-center justify-center overflow-hidden rounded-2xl ${className}`}
    style={{ background: NAVY, aspectRatio: ratio }}
  >
    <img
      src={plateBg}
      alt=""
      aria-hidden="true"
      className="absolute inset-0 h-full w-full object-cover"
      style={{ opacity: 0.42 }}
    />
    <div
      aria-hidden="true"
      className="absolute inset-0"
      style={{ background: `linear-gradient(180deg, ${NAVY}CC, ${NAVY}E6)` }}
    />
    <div
      aria-hidden="true"
      className="absolute inset-0"
      style={{
        backgroundImage: `radial-gradient(${BLUE}1A 1px, transparent 1px)`,
        backgroundSize: "26px 26px",
        maskImage:
          "radial-gradient(120% 100% at 50% 45%, #000 10%, transparent 72%)",
        WebkitMaskImage:
          "radial-gradient(120% 100% at 50% 45%, #000 10%, transparent 72%)",
      }}
    />
    <div
      aria-hidden="true"
      className="absolute left-1/2 top-1/2 h-[52%] w-[52%] min-h-[260px] min-w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[110px]"
      style={{ background: `${BLUE}33` }}
    />
    <img
      src={darkVariant}
      alt="ADLM Studio logo"
      className="relative max-w-[520px]"
      style={{ width }}
    />
  </div>
);

/* NIQS-pattern narrative block: eyebrow, headline, sub-head, copy, then the
   evidence at full width. Used three times to carry the applied story. */
const AppliedStory = ({ n, kicker, head, sub, body, children }) => (
  <div className="border-t border-white/6 pt-16 first:border-0 first:pt-0">
    <Prose className="mb-10">
      <Rise>
        <p className="type-eyebrow mb-4" style={{ color: G }}>
          {n} — {kicker}
        </p>
        <h3 className="type-h1 mb-6 max-w-[22ch] text-white">{head}</h3>
        <h4 className="mb-3 text-[16px] font-medium text-white/85">{sub}</h4>
        <p className="text-[15.5px] leading-[1.75] text-white/55">{body}</p>
      </Rise>
    </Prose>
    {children}
  </div>
);

export default function AdlmBrand() {
  return (
    <div className="relative min-h-screen bg-[#07090C] font-['Outfit'] text-white">
      <PageMeta
        title="ADLM Studio — Brand Identity"
        description="A mark that reads twice. Brand identity for ADLM Studio — the rationale, four lockups, a three-value palette, and the system carried across certificates, product and campaign."
        url="/projects/featured/adlm-studio/brand"
      />

      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div
          className="absolute -left-60 -top-20 h-[500px] w-[500px] rounded-full blur-[160px]"
          style={{ background: `${ORANGE}22` }}
        />
        <div
          className="absolute -right-60 top-1/2 h-[420px] w-[420px] rounded-full blur-[140px]"
          style={{ background: `${BLUE}1A` }}
        />
      </div>

      <SectionToc
        sections={SECTIONS}
        siblings={SIBLINGS}
        siblingsLabel="Elsewhere in ADLM"
      />

      <div className="relative z-10">
        <CaseHero
          image={heroImg}
          imageAlt="A building drawn in blue wireframe over its own dark elevation"
          focus="55% center"
          badge="ADLM Studio · Brand identity"
          title="One shape doing two jobs."
          lead="The identity behind a construction-technology company — one icon holding two meanings, four lockups, three colours, and a system built to be produced by people who are not designers."
          meta={[
            { label: "Role", value: "Brand designer, visual direction" },
            { label: "Scope", value: "Identity, palette, type, applications" },
            { label: "Live since", value: "2020, revised three times" },
            { label: "Sector", value: "Construction technology" },
          ]}
          minHeight="76vh"
        />

        {/* ── 01 rationale ── */}
        <Section id="rationale" width="narrow" first>
          <Rise>
            <SLabel n="01" t="Logo rationale" />
            <SHead
              white="One shape,"
              accent="two readings."
              className="mb-14 max-w-[18ch]"
            />
          </Rise>

          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
            <div>
              <RiseMedia>
                <div className="overflow-hidden rounded-2xl border border-white/8 bg-[#0D1B2E]">
                  <img
                    src={sketchImg}
                    alt="Original logo sketches and construction diagram"
                    className="block w-full"
                  />
                </div>
              </RiseMedia>
              <Rise>
                <p className="mt-5 text-[15px] leading-[1.7] text-white/55">
                  ADLM began as several businesses under one name, construction
                  and trading among them. The mark had to hold both, so it was
                  drawn as one form that reads twice: a building, whose slanted
                  edge is the rise and fall of a price, and whose inner block is
                  both a candle and a door.
                </p>
                <p className="mt-4 text-[15px] leading-[1.7] text-white/55">
                  When the company narrowed to construction technology the mark
                  did not need redrawing. The movement in it now reads as cost
                  rising and falling across a project — which is exactly what
                  the software measures.
                </p>
              </Rise>
            </div>

            <RiseMedia delay={0.08}>
              <LogoPlate />
              <p className="mt-5 text-[14px] leading-[1.6] text-white/40">
                The current lockup, on the brand's own ground.
              </p>
            </RiseMedia>
          </div>
        </Section>

        {/* ── 02 the mark, wide ── */}
        <Section id="mark" width="bleed">
          <RiseMedia>
            <LogoPlate ratio="21/9" width="34%" />
          </RiseMedia>
        </Section>

        {/* ── 03 lockups ── */}
        <Section id="lockups" width="bleed">
          <Prose className="mb-12">
            <Rise>
              <SLabel n="02" t="The lockups" />
              <SHead
                white="Four, so nobody has to"
                accent="improvise one."
                className="mb-6 max-w-[24ch]"
              />
              <p className="text-[16px] leading-[1.75] text-white/55">
                Most misuse is not defiance — it is someone needing a shape the
                system never gave them. Four lockups cover every placement the
                brand actually meets, so the answer is always to reach for one
                rather than stretch another.
              </p>
            </Rise>
          </Prose>

          <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {LOCKUPS.map((l) => (
              <StaggerItem key={l.t}>
                <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/8 bg-white/[0.02]">
                  {/* Each lockup carries its own sizing. Filling the plate would
                      render the near-square mark and the 6:1 horizontal at the
                      same visual weight, which is exactly wrong. */}
                  <div className="flex h-[210px] items-center justify-center bg-[#F4F6F8] p-9">
                    <img
                      src={l.src}
                      alt={`${l.t} lockup`}
                      className={l.scale}
                    />
                  </div>
                  <div className="flex-1 p-6">
                    <h3 className="mb-2 text-[16px] font-medium text-white">
                      {l.t}
                    </h3>
                    <p className="text-[13.5px] leading-[1.6] text-white/45">
                      {l.b}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Section>

        {/* ── 04 colour ── */}
        <Section id="colour" width="bleed">
          <Prose className="mb-12">
            <Rise>
              <SLabel n="03" t="Colour" />
              <SHead
                white="Three values,"
                accent="each with one job."
                className="mb-6 max-w-[22ch]"
              />
              <p className="text-[16px] leading-[1.75] text-white/55">
                A ground, a working colour and a single accent. Kept this narrow
                on purpose — a palette a chapter coordinator can apply correctly
                without a designer in the room is worth more than one with
                nowhere to go wrong on paper and everywhere to go wrong in
                practice.
              </p>
            </Rise>
          </Prose>

          <Stagger className="grid gap-5 lg:grid-cols-3">
            {PALETTE.map((c) => (
              <StaggerItem key={c.name}>
                <div
                  className="flex h-full min-h-[520px] flex-col justify-between rounded-2xl p-8 sm:p-9"
                  style={{ background: c.hex, color: c.ink }}
                >
                  <div>
                    <span className="block text-[clamp(38px,4.2vw,58px)] font-medium leading-none tracking-tight">
                      {c.name}
                    </span>
                    <span className="mt-3 block text-[15px] font-medium opacity-75">
                      {c.role}
                    </span>
                  </div>
                  <div>
                    <p className="mb-5 max-w-[34ch] text-[14.5px] leading-[1.6] opacity-80">
                      {c.b}
                    </p>
                    <code className="text-[13px] tracking-wide opacity-70">
                      {c.hex}
                    </code>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Section>

        {/* ── 05 grounds ── */}
        <Section id="grounds" width="bleed">
          <Prose className="mb-12">
            <Rise>
              <SLabel n="04" t="On any ground" />
              <SHead
                white="A cut drawn for each surface,"
                accent="not a recolour."
                className="mb-6 max-w-[26ch]"
              />
              <p className="text-[16px] leading-[1.75] text-white/55">
                Light theme, dark theme, one-colour print, and the smallest form
                the mark survives at. Each is its own file, so nobody has to
                decide what to do when the logo lands somewhere it was not
                planned for.
              </p>
            </Rise>
          </Prose>

          <Stagger className="grid gap-5 sm:grid-cols-2">
            {GROUNDS.map((g) => (
              <StaggerItem key={g.t}>
                <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/8">
                  <div
                    className="flex h-[250px] items-center justify-center p-12"
                    style={{ background: g.bg }}
                  >
                    <img
                      src={g.src}
                      alt={g.t}
                      className="max-h-[62px] w-[62%] object-contain"
                    />
                  </div>
                  <div className="flex-1 bg-white/[0.02] p-6">
                    <h3 className="mb-2 text-[16px] font-medium text-white">
                      {g.t}
                    </h3>
                    <p className="text-[14px] leading-[1.6] text-white/45">
                      {g.b}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Section>

        {/* ── 06 evolution ── */}
        <Section id="evolution" width="narrow">
          <Prose className="mb-12">
            <Rise>
              <SLabel n="05" t="How it evolved" />
              <SHead
                white="Refined three times,"
                accent="never replaced."
                className="mb-6 max-w-[22ch]"
              />
              <p className="text-[16px] leading-[1.75] text-white/55">
                What changed around the mark was containment, colour and balance
                — each pass making it work harder at smaller sizes and on more
                surfaces.
              </p>
            </Rise>
          </Prose>

          <Stagger className="grid gap-5 lg:grid-cols-3">
            {EVOLUTION.map((e, i) => (
              <StaggerItem key={e.t}>
                <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/8 bg-white/[0.02]">
                  <div className="flex h-[170px] items-center justify-center bg-[#F4F4F2] p-8">
                    <img
                      src={e.src}
                      alt={e.t}
                      loading="lazy"
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div className="flex-1 p-7">
                    <span
                      className="mb-3 block text-[10px] font-semibold tracking-[0.2em]"
                      style={{ color: G }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mb-2 text-[17px] font-medium text-white">
                      {e.t}
                    </h3>
                    <p className="text-[14px] leading-[1.65] text-white/45">
                      {e.b}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Section>

        {/* ── 07 type ── */}
        <Section id="type" width="narrow">
          <Prose className="mb-12">
            <Rise>
              <SLabel n="06" t="Typography" />
              <SHead
                white="Changed for a reason that had"
                accent="nothing to do with taste."
                className="mb-6 max-w-[26ch]"
              />
              <p className="text-[16px] leading-[1.75] text-white/55">
                A brand produced by a training coordinator in one chapter and a
                developer in another cannot depend on a typeface somebody has to
                buy a seat for. Both replacements had to hold the original
                geometry and be free to distribute.
              </p>
            </Rise>
          </Prose>

          <div className="space-y-4">
            {TYPE.map((t) => (
              <Rise key={t.name}>
                <div
                  className={`grid items-center gap-8 rounded-2xl border p-8 sm:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,32ch)] ${
                    t.retired
                      ? "border-dashed border-white/10 bg-white/[0.012]"
                      : "border-white/10 bg-white/[0.02]"
                  }`}
                >
                  <div
                    style={
                      t.retired
                        ? { opacity: 0.42, filter: "grayscale(1)" }
                        : null
                    }
                  >
                    <p
                      className="mb-3 flex flex-wrap items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em]"
                      style={{
                        color: t.retired ? "rgba(255,255,255,0.35)" : G,
                      }}
                    >
                      {t.era}
                      {t.retired && (
                        <span className="rounded border border-white/15 px-2 py-0.5 tracking-[0.14em] text-white/40">
                          Retired · {t.since}
                        </span>
                      )}
                    </p>
                    {/* Every face here is the real one — FM Bolyar self-hosted
                        from the licensed OTFs, Orbitron and Lexend from the
                        same source the brand uses. */}
                    {/* the word this face is responsible for */}
                    <p
                      className="m-0 text-[clamp(38px,6vw,80px)] leading-[1.02] text-white"
                      style={{
                        fontFamily: t.face,
                        fontWeight: t.weight,
                        textDecoration: t.retired ? "line-through" : "none",
                        textDecorationThickness: "1.5px",
                        textDecorationColor: "rgba(255,255,255,0.28)",
                      }}
                    >
                      {t.sets}
                    </p>
                    <p className="mt-2 text-[13px] font-semibold uppercase tracking-[0.18em] text-white/30">
                      {t.name}
                    </p>
                    <p
                      className="mt-5 text-[15px] leading-[1.6] text-white/40"
                      style={{ fontFamily: t.face, fontWeight: 400 }}
                    >
                      Bills of quantities, priced and defensible — 0123456789
                    </p>
                  </div>
                  <p
                    className="text-[14.5px] leading-[1.7]"
                    style={{
                      color: t.retired
                        ? "rgba(255,255,255,0.3)"
                        : "rgba(255,255,255,0.5)",
                    }}
                  >
                    {t.note}
                  </p>
                </div>
              </Rise>
            ))}
          </div>
        </Section>

        {/* Guideline — held at 1340, between full bleed and the reading column. */}
        <div className="mx-auto max-w-[1340px]">
          <GuidelineCarousel
            n="07"
            label="The guideline"
            white="The system,"
            accent="documented"
            description="Being rebuilt against the current direction. Frames are the intended spreads."
            slides={withAssets(GUIDELINE_SLIDES)}
            orientation="landscape"
          />
        </div>

        {/* ── 08 in application — three narrative beats ── */}
        <Section id="application" width="bleed">
          <Prose className="mb-16">
            <Rise>
              <SLabel n="08" t="In application" />
              <SHead
                white="Not a guideline"
                accent="on a shelf."
                className="mb-6 max-w-[22ch]"
              />
              <p className="text-[16px] leading-[1.75] text-white/55">
                An identity is only worth what survives contact with the things
                it has to appear on. Three places this one earns its keep.
              </p>
            </Rise>
          </Prose>

          <div className="space-y-16">
            <AppliedStory
              n="8.1"
              kicker="The artefact people keep"
              head="A certificate is the only piece a student takes home"
              sub="Training certificate and badge"
              body="Thirty events and thousands of attendees mean this is the most widely held piece of ADLM print in existence — and the one most likely to be photographed, framed and posted. It carries the full lockup, the navy ground and the seal, so the brand travels wherever the graduate does."
            >
              <div className="grid gap-5 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]">
                <RiseMedia>
                  <div className="overflow-hidden rounded-2xl border border-white/8">
                    <img
                      src={certificateImg}
                      alt="ADLM training certificate"
                      className="block w-full"
                    />
                  </div>
                </RiseMedia>
                <RiseMedia delay={0.07}>
                  <div className="flex h-full items-center justify-center overflow-hidden rounded-2xl border border-white/8 bg-[#0D1B2E] p-10">
                    <img
                      src={badgeImg}
                      alt="ADLM training badge"
                      className="max-h-[300px] w-auto"
                    />
                  </div>
                </RiseMedia>
              </div>
            </AppliedStory>

            <AppliedStory
              n="8.2"
              kicker="Brand inside the product"
              head="The identity has to survive being software"
              sub="Dashboard and mobile"
              body="Most brands stop at the marketing site. This one runs inside six products a quantity surveyor uses for hours at a stretch, which is a harder test — the palette has to stay legible against dense data, and the accent has to mean something when it appears beside a number somebody is about to price."
            >
              <div className="grid gap-5 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
                <RiseMedia>
                  <div className="overflow-hidden rounded-2xl border border-white/8">
                    <img
                      src={dashboardImg}
                      alt="ADLM dashboard"
                      className="block w-full"
                    />
                  </div>
                </RiseMedia>
                <RiseMedia delay={0.07}>
                  <div className="flex h-full items-center justify-center overflow-hidden rounded-2xl border border-white/8 bg-[#0D1B2E] p-8">
                    <img
                      src={phoneImg}
                      alt="ADLM mobile"
                      className="max-h-[420px] w-auto"
                    />
                  </div>
                </RiseMedia>
              </div>
            </AppliedStory>

            <AppliedStory
              n="8.3"
              kicker="Pictures that did not exist"
              head="When the imagery a brand needs cannot be licensed"
              sub="Generated art direction"
              body="Search any stock library for BIM take-off, a holographic quantity model, or construction software in use in West Africa and you will find nothing usable. So the imagery is generated to a direction rather than bought — dark, engineered, blue-lit, and consistent enough that a reader never notices it was made rather than shot."
            >
              <RiseMedia>
                <div className="overflow-hidden rounded-2xl border border-white/8">
                  <img
                    src={gal01}
                    alt="Generated ConTech imagery"
                    className="block w-full"
                  />
                </div>
              </RiseMedia>
            </AppliedStory>
          </div>
        </Section>

        {/* ── 09 the package — bento ── */}
        {/* ── 09 touchpoints — the masonry the other brand cases use.
            Not a viewport-height grid: every cell is one specific deliverable
            at its own shape, and the section is allowed to run tall. ── */}
        <BrandGallery
          n="09"
          label="Touchpoints"
          white="The brand,"
          accent="applied"
          images={withAssets(TOUCHPOINTS)}
          description="Every deliverable in the platinum package, one shot each. The certificate and badge are produced; the rest are specified and awaiting the shoot."
        />

        {/* ── 10 imagery ── */}
        <BrandGallery
          n="10"
          label="Imagery"
          white="Art directed,"
          accent="then made"
          images={IMAGERY}
          description="The picture library the brand runs on — generated where nothing licensable existed, sourced where it did, and graded to one direction so the two are indistinguishable."
          cta={{
            to: "/adlm-studio-designs",
            label: "See the social and marketing set",
          }}
        />

        {/* ── close ── */}
        <Section width="narrow">
          <Prose>
            <Rise>
              <SHead
                white="Still moving,"
                accent="on purpose."
                className="mb-8 max-w-[20ch]"
              />
              <p className="mb-5 text-[16px] leading-[1.75] text-white/60">
                I own the visual direction and revise it as the company changes
                — imagery, backgrounds, and the balance between light surfaces
                that read as modern software and dark ones that read as
                construction.
              </p>
              <p className="text-[16px] leading-[1.75] text-white/60">
                The part I would defend hardest is that nothing was thrown away.
                A mark drawn for a company doing several things still works for
                a company doing one, and the system around it got simpler every
                time rather than heavier.
              </p>
            </Rise>
          </Prose>
        </Section>

        <NextPair
          inProject={{
            to: `${BASE}/design-system`,
            title: "The design system",
            blurb:
              "Brand settles what the colour is. The system settles what you are allowed to do with it.",
          }}
          inCategory={{
            to: "/projects/verde-luxe",
            title: "Verde Luxe",
            blurb:
              "A lifestyle identity carried from mood and mark through look book, signage and packaging.",
          }}
        />

        <Blend />

        <BuildSection />
        <div className="h-16 lg:hidden" />
      </div>
    </div>
  );
}
