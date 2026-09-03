// src/pages/featured/AdlmDesignSystem.jsx
//
// ADLM Studio — the design system.
//
// WHY THIS IS ITS OWN PAGE. A design system is not brand work. Brand settles
// what the colour IS; the system settles what you are allowed to do with it —
// ramps, tokens, scale, components, states. They are different crafts, read by
// different people, and stapling the system onto the brand page buries it for
// the product reader who actually wants it.
//
// EVERYTHING HERE IS LIVE. The swatches, the type scale, the buttons, the
// inputs, the table — all rendered from the real token values in
// adlmSpecimens.jsx rather than shown as images. A design system page made of
// screenshots is a brochure; this one can be inspected, and it cannot drift
// from the system it documents.
//
// It also governs two surfaces rather than one, so it cannot live inside either
// case study. Hence the ending: two exits, back out to the website and to the
// product. Both of those carry a DesignSystemFrame pointing in here, so the
// three pages form a loop a reader can enter and leave at any point.

import React from "react";
import { Link } from "react-router-dom";
import PageMeta from "../../components/common/PageMeta";
import SectionToc from "../../components/common/SectionToc";
import CaseHero from "../../components/common/CaseHero";
import BuildSection from "../../components/Home/BuildSection";
import dsHero from "../../assets/ADLM/gallery/gal-12.webp";
import {
  RAMPS,
  SEMANTIC,
  TYPE_SCALE,
  SPACING,
  RADII,
  ELEVATION,
  MOTION,
  CONTRAST,
  THEME_TOKENS,
  SHELL_TOKENS,
} from "../../data/adlmSystem";
import {
  Ground,
  Ramp,
  TypeRow,
  AdlmButton,
  AdlmField,
  AdlmPill,
  AdlmTable,
  AdlmPrice,
} from "../../components/ProjectPage/adlmSpecimens";
import AdlmComponentBoard, {
  NOT_SHOWN,
} from "../../components/ProjectPage/adlmComponentBoard";
import {
  Section,
  Prose,
  Rise,
  Stagger,
  StaggerItem,
  SLabel,
  SHead,
  Blend,
  ACCENT as G,
} from "../../components/common/CaseParts";

const BASE = "/projects/featured/adlm-studio";
const MONO = "'IBM Plex Mono', ui-monospace, Consolas, monospace";

const SECTIONS = [
  { id: "before", label: "What existed" },
  { id: "colour", label: "Colour" },
  { id: "themes", label: "The two themes" },
  { id: "contrast", label: "The contrast rule" },
  { id: "type", label: "Typography" },
  { id: "space", label: "Space, radius, depth" },
  { id: "motion", label: "Motion" },
  { id: "components", label: "Components" },
  { id: "inventory", label: "The inventory" },
];

const SIBLINGS = [
  { to: BASE, label: "← ADLM overview" },
  { to: `${BASE}/brand`, label: "Brand identity" },
  { to: `${BASE}/website`, label: "Website" },
  { to: `${BASE}/product`, label: "Product / UI-UX" },
];

export default function AdlmDesignSystem() {
  return (
    <div className="relative min-h-screen bg-[#07090C] font-['Outfit'] text-white">
      <PageMeta
        title="ADLM Studio — Design System"
        description="The token layer beneath ADLM Studio: colour ramps built from the true brand values, a contrast measurement that set the whole visual direction, type, spacing, motion and live components across a marketing site and six products."
        url="/projects/featured/adlm-studio/design-system"
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
        siblings={SIBLINGS}
        siblingsLabel="Elsewhere in ADLM"
      />

      <div className="relative z-10">
        <CaseHero
          image={dsHero}
          imageAlt="A field of identical blue blocks receding into the dark"
          focus="50% 40%"
          badge="ADLM Studio · Design system"
          title="The layer everything else is built on."
          lead="ADLM had a logo, an icon library and a badge matrix. What it did not have was a single value anyone could point at. Everything on this page is rendered live from the real tokens — not pictured."
          meta={[
            { label: "Governs", value: "Marketing site + six products" },
            { label: "Typeface", value: "Lexend, self-hosted" },
            { label: "Built", value: "From the vector artwork" },
            { label: "Role", value: "Sole author" },
          ]}
          minHeight="72vh"
        />

        {/* ── 01 before ── */}
        <Section id="before" width="narrow" first>
          <Rise>
            <SLabel n="01" t="What existed" />
            <SHead
              white="An asset kit,"
              accent="not a design system."
              className="mb-12 max-w-[22ch]"
            />
          </Rise>

          <div className="grid gap-5 md:grid-cols-2">
            <Rise>
              <div className="h-full rounded-2xl border border-white/8 bg-white/[0.02] p-8">
                <h3 className="type-h3 mb-4 text-white">What was there</h3>
                <p className="text-[15px] leading-[1.7] text-white/55">
                  A Figma file built on Preline UI (Community): a complete logo
                  lockup system, a large icon library — line, solid, brand
                  marks, country flags, icon holders — avatars, and an
                  exhaustive pill and badge matrix. Genuinely useful assets,
                  well made.
                </p>
              </div>
            </Rise>
            <Rise delay={0.07}>
              <div
                className="h-full rounded-2xl border p-8"
                style={{ borderColor: `${G}30`, background: `${G}07` }}
              >
                <h3 className="type-h3 mb-4 text-white">What was missing</h3>
                <p className="text-[15px] leading-[1.7] text-white/60">
                  Any ADLM-owned variable. No colour tokens, no type scale, no
                  spacing or grid tokens — and no core components at all: no
                  buttons, forms, navigation, cards or tables. The only
                  libraries attached to the file were borrowed community kits.
                </p>
              </div>
            </Rise>
          </div>

          <Prose className="mt-10">
            <Rise>
              <p className="text-[16px] leading-[1.75] text-white/60">
                So this phase stopped being <em>read the system</em> and became{" "}
                <em>build the layer underneath the assets</em>. Everything below
                is new work, designed to sit beneath a set of assets that
                already existed and were not redrawn.
              </p>
            </Rise>
          </Prose>
        </Section>

        {/* ── 02 colour ── */}
        <Section id="colour" width="bleed">
          <Prose className="mb-12">
            <Rise>
              <SLabel n="02" t="Colour" />
              <SHead
                white="Built from the artwork,"
                accent="not the stylesheet."
                className="mb-6 max-w-[24ch]"
              />
              <p className="text-[16px] leading-[1.75] text-white/55">
                The live site and the logo files disagreed about ADLM's own
                colours, and the artwork turned out to be right — that story is
                on the{" "}
                <Link
                  to={`${BASE}/brand`}
                  className="underline decoration-white/25 underline-offset-4 transition-colors hover:text-[#a3e635]"
                >
                  brand page
                </Link>
                . Every ramp here derives from the true values.
              </p>
            </Rise>
          </Prose>

          <div className="space-y-10">
            {["navy", "blue", "orange", "neutral"].map((k) => (
              <Rise key={k}>
                <Ramp ramp={RAMPS[k]} />
              </Rise>
            ))}
          </div>

          <Rise className="mt-12">
            <h3 className="mb-2 text-[16px] font-medium text-white">
              Semantic — and one rule that keeps them apart
            </h3>
            <p className="mb-5 max-w-[68ch] text-[14.5px] leading-[1.65] text-white/45">
              Warning is deliberately pulled yellow, away from brand orange.
              Those two must never be confusable, which is why orange is barred
              from status use entirely and stays a brand accent.
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {SEMANTIC.map((s) => (
                <div
                  key={s.role}
                  className="overflow-hidden rounded-xl border border-white/10"
                >
                  <div className="flex h-12">
                    <div className="flex-1" style={{ background: s.light }} />
                    <div className="flex-1" style={{ background: s.dark }} />
                    <div className="flex-1" style={{ background: s.wash }} />
                  </div>
                  <div className="px-4 py-3">
                    <b className="block text-[13.5px] font-medium text-white">
                      {s.role}
                    </b>
                    <code
                      className="block text-[10.5px] text-white/35"
                      style={{ fontFamily: MONO }}
                    >
                      light · dark · wash
                    </code>
                  </div>
                </div>
              ))}
            </div>
          </Rise>
        </Section>

        {/* ── the two themes, as they ship ── */}
        {/* The ramps above are the raw material. These are the aliases a
            component is actually allowed to reference, and they are the whole
            theming mechanism: the values change, the component rules never do.
            Copied out of the live site.css rather than retyped, so the page
            cannot claim a value the product does not use. */}
        <Section id="themes" width="narrow">
          <Rise>
            <SLabel n="03" t="The two themes" />
            <SHead
              white="One set of names,"
              accent="two sets of values."
              className="mb-6 max-w-[24ch]"
            />
            <Prose className="mb-10">
              <p className="text-[16px] leading-[1.75] text-white/55">
                A component never reaches for a ramp step. It reaches for one of
                these eleven aliases, and the theme decides what that alias
                resolves to. Dark is a re-map rather than an inversion — the
                greys are pulled toward navy, and the action colour changes step
                so it stays legible on its own ground.
              </p>
            </Prose>
          </Rise>

          <Rise>
            <div className="overflow-x-auto rounded-2xl border border-white/8">
              <table className="w-full min-w-[680px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-white/8 bg-white/[0.02]">
                    <th
                      className="px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/35"
                      style={{ fontFamily: MONO }}
                    >
                      Token
                    </th>
                    <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/35">
                      Role
                    </th>
                    <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/35">
                      Light
                    </th>
                    <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/35">
                      Dark
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {THEME_TOKENS.map((t) => (
                    <tr
                      key={t.t}
                      className="border-b border-white/5 last:border-0"
                    >
                      <td
                        className="px-5 py-3.5 text-[13.5px] text-white/70"
                        style={{ fontFamily: MONO }}
                      >
                        {t.t}
                      </td>
                      <td className="px-5 py-3.5 text-[14px] text-white/50">
                        {t.role}
                        {t.note && (
                          <span className="mt-1 block text-[12.5px] leading-[1.5] text-white/25">
                            {t.note}
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="flex items-center gap-2.5">
                          <span
                            className="h-5 w-5 shrink-0 rounded border border-white/15"
                            style={{ background: t.light }}
                          />
                          <span
                            className="text-[13px] text-white/55"
                            style={{ fontFamily: MONO }}
                          >
                            {t.light}
                          </span>
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="flex items-center gap-2.5">
                          <span
                            className="h-5 w-5 shrink-0 rounded border border-white/15"
                            style={{ background: t.dark }}
                          />
                          <span
                            className="text-[13px] text-white/55"
                            style={{ fontFamily: MONO }}
                          >
                            {t.dark}
                          </span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Rise>

          <Rise>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {SHELL_TOKENS.map((t) => (
                <div
                  key={t.t}
                  className="rounded-xl border border-white/8 bg-white/[0.02] p-4"
                >
                  <p
                    className="text-[12.5px] text-white/60"
                    style={{ fontFamily: MONO }}
                  >
                    {t.t}
                  </p>
                  <p
                    className="mt-1 truncate text-[13px] text-white/40"
                    style={{ fontFamily: MONO }}
                  >
                    {t.v}
                  </p>
                  <p className="mt-2 text-[12.5px] text-white/25">{t.use}</p>
                </div>
              ))}
            </div>
          </Rise>

          <Rise>
            <p className="mt-6 max-w-[72ch] text-[14px] leading-[1.7] text-white/30">
              Every value on this page is read out of the ADLM project — the
              ramps and the contrast measurements from
              02-design-system/DESIGN-SYSTEM.md, these aliases straight from the
              shipped site.css. Nothing here is a reconstruction.
            </p>
          </Rise>
        </Section>

        {/* ── 03 contrast ── */}
        <Section id="contrast" width="narrow">
          <Rise>
            <SLabel n="03" t="The contrast rule" />
            <SHead
              white="A measurement decided"
              accent="how the whole thing looks."
              className="mb-6 max-w-[24ch]"
            />
            <Prose className="mb-12">
              <p className="text-[16px] leading-[1.75] text-white/55">
                Before committing to a direction I measured the true brand blue
                against the grounds it would actually sit on. The result did not
                just pass or fail an audit — it set the art direction, and it
                caught a live accessibility failure in a shipping product on the
                way.
              </p>
            </Prose>
          </Rise>

          <Rise>
            <div className="mb-8 overflow-x-auto rounded-2xl border border-white/8">
              <table className="w-full min-w-[520px] border-collapse text-[14.5px]">
                <thead>
                  <tr>
                    {["Pairing", "Contrast", "Verdict"].map((h) => (
                      <th
                        key={h}
                        className="border-b border-white/10 bg-white/[0.03] px-6 py-4 text-left text-[10px] font-semibold uppercase tracking-[0.16em] text-white/35"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {CONTRAST.map((c) => (
                    <tr key={c.pair}>
                      <td className="border-b border-white/6 px-6 py-4 text-white/80">
                        {c.pair}
                      </td>
                      <td className="border-b border-white/6 px-6 py-4 tabular-nums text-white/60">
                        {c.ratio}
                      </td>
                      <td
                        className="border-b border-white/6 px-6 py-4 font-medium"
                        style={{ color: c.ok ? G : "#E0764A" }}
                      >
                        {c.note}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Rise>

          <Rise>
            <p className="mb-5 max-w-[70ch] text-[15px] leading-[1.7] text-white/55">
              Which is why the primary button below is a different colour on
              each ground. Same component, same token names — the ramp step
              changes so the label stays readable.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <Ground theme="navy" label="On navy — blue-500, navy label">
                <div className="flex flex-wrap items-center gap-3">
                  <AdlmButton dark>Get a quotation</AdlmButton>
                  <AdlmButton dark variant="secondary">
                    Compare products
                  </AdlmButton>
                </div>
              </Ground>
              <Ground theme="light" label="On light — blue-700, white label">
                <div className="flex flex-wrap items-center gap-3">
                  <AdlmButton dark={false}>Get a quotation</AdlmButton>
                  <AdlmButton dark={false} variant="secondary">
                    Compare products
                  </AdlmButton>
                </div>
              </Ground>
            </div>
          </Rise>

          <Rise className="mt-8">
            <div
              className="rounded-2xl border p-7"
              style={{ borderColor: `${G}30`, background: `${G}07` }}
            >
              <p
                className="mb-3 text-[11px] font-bold uppercase tracking-[0.25em]"
                style={{ color: G }}
              >
                Caught on the way
              </p>
              <p className="max-w-[72ch] text-[15px] leading-[1.7] text-white/65">
                The same measurement flagged that QUIV's existing dashboard
                buttons put white text on blue-500. On a tool used for hours at
                a stretch, on laptop screens in daylight, that is a real
                usability problem rather than a theoretical one. It was
                corrected in the product phase.
              </p>
            </div>
          </Rise>
        </Section>

        {/* ── 04 type ── */}
        <Section id="type" width="narrow">
          <Rise>
            <SLabel n="04" t="Typography" />
            <SHead
              white="Size carries legibility,"
              accent="not weight."
              className="mb-6 max-w-[22ch]"
            />
            <Prose className="mb-6">
              <p className="mb-5 text-[16px] leading-[1.75] text-white/55">
                Optical weight rises with size, so the weight curve runs{" "}
                <em>inverse</em> to the size curve: display sits at 500, small
                text needs 600 to hold its shape. Reaching for Bold at display
                sizes makes a page shout without making it clearer. Emphasis
                inside a display line comes from colour, or from dropping the
                second line to a muted tone — never from a heavier cut.
              </p>
            </Prose>
          </Rise>

          <Rise>
            <div
              className="mb-10 rounded-2xl border p-6"
              style={{ borderColor: "#143A66", background: "#0E2A4C55" }}
            >
              <p
                className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6FC2FF]"
                style={{ fontFamily: MONO }}
              >
                A decision that changed
              </p>
              <p className="max-w-[74ch] text-[14.5px] leading-[1.7] text-white/60">
                The system originally specified three families — Archivo for
                display, IBM Plex Sans for UI, IBM Plex Mono for data. The
                shipped site collapsed to{" "}
                <strong className="text-white">Lexend</strong> alone,
                self-hosted at weights 300–700. Three families is a real cost in
                a Windows desktop plugin as well as on the web, and the spec had
                already flagged a two-family fallback. Mono is retained only
                where digits have to line up. The specimens below are set in
                what actually shipped.
              </p>
            </div>
          </Rise>

          <Rise>
            <div className="border-t border-white/8">
              {TYPE_SCALE.map((row) => (
                <TypeRow key={row.t} row={row} />
              ))}
            </div>
          </Rise>
        </Section>

        {/* ── 05 space / radius / depth ── */}
        <Section id="space" width="narrow">
          <Rise>
            <SLabel n="05" t="Space, radius, depth" />
            <SHead
              white="Applied by containers,"
              accent="never by margins."
              className="mb-12 max-w-[22ch]"
            />
          </Rise>

          <Rise className="mb-12">
            <h3 className="mb-2 text-[16px] font-medium text-white">
              Spacing — 4px base
            </h3>
            <p className="mb-5 max-w-[68ch] text-[14.5px] leading-[1.65] text-white/45">
              Set by layout containers through <code>gap</code>, never as
              per-element margins — margins collapse and double in ways a
              container gap cannot.
            </p>
            <div className="flex flex-wrap items-end gap-3">
              {SPACING.map((s) => (
                <div key={s} className="text-center">
                  <div
                    className="mb-2 rounded"
                    style={{
                      width: Math.max(s, 2),
                      height: 44,
                      background: "#239CFF",
                    }}
                  />
                  <code
                    className="text-[10.5px] text-white/40"
                    style={{ fontFamily: MONO }}
                  >
                    {s}
                  </code>
                </div>
              ))}
            </div>
          </Rise>

          <div className="grid gap-10 lg:grid-cols-2">
            <Rise>
              <h3 className="mb-2 text-[16px] font-medium text-white">
                Radius
              </h3>
              <p className="mb-5 max-w-[46ch] text-[14.5px] leading-[1.65] text-white/45">
                Used by component class, not one value everywhere. Inputs and
                table cells stay tight; cards sit at 8–12; pills go full.
              </p>
              <div className="flex flex-wrap gap-3">
                {RADII.map((r) => (
                  <div key={r.t} className="text-center">
                    <div
                      className="mb-2 border"
                      style={{
                        width: 64,
                        height: 48,
                        borderRadius: r.v,
                        borderColor: "#143A66",
                        background: "#0E2A4C",
                      }}
                    />
                    <code
                      className="block text-[10.5px] text-white/45"
                      style={{ fontFamily: MONO }}
                    >
                      {r.t}
                    </code>
                    <span className="block text-[10px] text-white/25">
                      {r.use}
                    </span>
                  </div>
                ))}
              </div>
            </Rise>

            <Rise delay={0.07}>
              <h3 className="mb-2 text-[16px] font-medium text-white">
                Elevation — navy-tinted, never black
              </h3>
              <p className="mb-5 max-w-[46ch] text-[14.5px] leading-[1.65] text-white/45">
                A neutral black shadow over a navy-family palette reads as dirt.
                Dark theme drops shadow entirely and separates with border and
                surface lightness instead.
              </p>
              <div className="grid grid-cols-2 gap-4 rounded-2xl bg-[#F4F6F8] p-6">
                {ELEVATION.map((e) => (
                  <div
                    key={e.t}
                    className="rounded-lg bg-white p-4"
                    style={{ boxShadow: e.v }}
                  >
                    <code
                      className="block text-[11px] font-semibold text-[#0765B0]"
                      style={{ fontFamily: MONO }}
                    >
                      {e.t}
                    </code>
                    <span className="text-[11.5px] text-[#55616F]">
                      {e.use}
                    </span>
                  </div>
                ))}
              </div>
            </Rise>
          </div>
        </Section>

        {/* ── 06 motion ── */}
        <Section id="motion" width="narrow">
          <Rise>
            <SLabel n="06" t="Motion" />
            <SHead
              white="Four durations,"
              accent="one job each."
              className="mb-6 max-w-[20ch]"
            />
            <Prose className="mb-10">
              <p className="text-[16px] leading-[1.75] text-white/55">
                Hover any card below to feel its token. Entrance animation is
                used once per section at most — never on every element — and
                every token respects the visitor's reduced-motion setting.
              </p>
            </Prose>
          </Rise>

          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {MOTION.map((m) => (
              <StaggerItem key={m.t}>
                <div
                  className="cursor-default rounded-xl border p-6"
                  style={{
                    borderColor: "#143A66",
                    background: "#0E2A4C",
                    transition: `transform ${m.ms}ms ${m.ease}, background ${m.ms}ms ${m.ease}`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-6px)";
                    e.currentTarget.style.background = "#143A66";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.background = "#0E2A4C";
                  }}
                >
                  <code
                    className="mb-2 block text-[12px] font-semibold text-[#6FC2FF]"
                    style={{ fontFamily: MONO }}
                  >
                    {m.t} · {m.ms}ms
                  </code>
                  <p className="m-0 text-[13.5px] leading-[1.5] text-white/50">
                    {m.use}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Section>

        {/* ── 07 components ── */}
        <Section id="components" width="bleed">
          <Prose className="mb-12">
            <Rise>
              <SLabel n="07" t="Components" />
              <SHead
                white="Documented with their states,"
                accent="not as pictures."
                className="mb-6 max-w-[26ch]"
              />
              <p className="text-[16px] leading-[1.75] text-white/55">
                A sheet that only shows the resting state hands the engineer a
                guess for everything else. Each component is specified on both
                grounds, because the system is dual-theme by token and a board
                showing one ground documents half of it.
              </p>
            </Rise>
          </Prose>

          <div className="grid gap-5 lg:grid-cols-2">
            <Rise>
              <Ground theme="navy" label="Buttons — navy ground">
                <div className="flex flex-wrap items-center gap-3">
                  <AdlmButton dark size="lg">
                    Primary
                  </AdlmButton>
                  <AdlmButton dark variant="secondary">
                    Secondary
                  </AdlmButton>
                  <AdlmButton dark variant="ghost">
                    Ghost
                  </AdlmButton>
                  <AdlmButton dark variant="danger">
                    Danger
                  </AdlmButton>
                  <AdlmButton dark size="sm">
                    Small
                  </AdlmButton>
                </div>
              </Ground>
            </Rise>
            <Rise delay={0.06}>
              <Ground theme="light" label="Buttons — light ground">
                <div className="flex flex-wrap items-center gap-3">
                  <AdlmButton dark={false} size="lg">
                    Primary
                  </AdlmButton>
                  <AdlmButton dark={false} variant="secondary">
                    Secondary
                  </AdlmButton>
                  <AdlmButton dark={false} variant="ghost">
                    Ghost
                  </AdlmButton>
                  <AdlmButton dark={false} variant="danger">
                    Danger
                  </AdlmButton>
                  <AdlmButton dark={false} size="sm">
                    Small
                  </AdlmButton>
                </div>
              </Ground>
            </Rise>

            <Rise>
              <Ground theme="navy" label="Forms — navy ground">
                <div className="grid gap-5 sm:grid-cols-2">
                  <AdlmField
                    dark
                    label="Project name"
                    value="Ikoyi Residences — Block C"
                  />
                  <AdlmField
                    dark
                    label="Rate zone"
                    value="South West"
                    hint="Rates price by geopolitical zone"
                  />
                  <AdlmField
                    dark
                    label="Seats"
                    value="2"
                    error="Team plan requires a minimum of three"
                  />
                  <AdlmField
                    dark
                    label="Licence key"
                    placeholder="ADLM-XXXX-XXXX-XXXX"
                  />
                </div>
              </Ground>
            </Rise>
            <Rise delay={0.06}>
              <Ground theme="light" label="Forms — light ground">
                <div className="grid gap-5 sm:grid-cols-2">
                  <AdlmField
                    dark={false}
                    label="Project name"
                    value="Ikoyi Residences — Block C"
                  />
                  <AdlmField
                    dark={false}
                    label="Rate zone"
                    value="South West"
                    hint="Rates price by geopolitical zone"
                  />
                  <AdlmField
                    dark={false}
                    label="Seats"
                    value="2"
                    error="Team plan requires a minimum of three"
                  />
                  <AdlmField
                    dark={false}
                    label="Licence key"
                    placeholder="ADLM-XXXX-XXXX-XXXX"
                  />
                </div>
              </Ground>
            </Rise>

            <Rise>
              <Ground
                theme="navy"
                label="Status pills — orange is absent by design"
              >
                <div className="flex flex-wrap gap-3">
                  <AdlmPill dark tone="success">
                    Priced
                  </AdlmPill>
                  <AdlmPill dark tone="warning">
                    Awaiting rate
                  </AdlmPill>
                  <AdlmPill dark tone="danger">
                    Extraction failed
                  </AdlmPill>
                  <AdlmPill dark tone="info">
                    BESMM
                  </AdlmPill>
                  <AdlmPill dark tone="brand">
                    New in v4
                  </AdlmPill>
                </div>
              </Ground>
            </Rise>
            <Rise delay={0.06}>
              <Ground theme="light" label="Status pills — light ground">
                <div className="flex flex-wrap gap-3">
                  <AdlmPill dark={false} tone="success">
                    Priced
                  </AdlmPill>
                  <AdlmPill dark={false} tone="warning">
                    Awaiting rate
                  </AdlmPill>
                  <AdlmPill dark={false} tone="danger">
                    Extraction failed
                  </AdlmPill>
                  <AdlmPill dark={false} tone="info">
                    BESMM
                  </AdlmPill>
                  <AdlmPill dark={false} tone="brand">
                    New in v4
                  </AdlmPill>
                </div>
              </Ground>
            </Rise>
          </div>

          <Rise className="mt-5">
            <Ground
              theme="navy"
              label="Table — tabular numerals, because a bill is a column people scan"
            >
              <AdlmTable dark />
            </Ground>
          </Rise>

          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            <Rise>
              <Ground theme="navy" label="Price display — navy">
                <AdlmPrice dark />
              </Ground>
            </Rise>
            <Rise delay={0.06}>
              <Ground theme="light" label="Price display — light">
                <AdlmPrice dark={false} />
              </Ground>
            </Rise>
          </div>
        </Section>

        {/* ── 08 inventory ── */}
        {/* The claim used to be seventy-odd components illustrated by five
            specimens and a wall of name chips. A name is an assertion; a
            rendered component is evidence — so the majority is now built here
            from the same tokens, and the handful that only reads at full width
            is listed separately rather than shrunk into a lie. */}
        <Section id="inventory" width="bleed">
          <Prose>
            <Rise>
              <SLabel n="08" t="The inventory" />
              <SHead
                white="Seventy-six components,"
                accent="fifty-two rendered here."
                className="mb-6 max-w-[24ch]"
              />
              <p className="mb-12 text-[16px] leading-[1.75] text-white/55">
                Built on top of the existing icon, avatar and badge libraries
                rather than replacing them. Commerce and marketing groups exist
                because ADLM sells directly — a quotation, a seat count and a
                licence row are product surfaces, not marketing decoration.
                Every specimen below is live markup on the ground that group is
                specified for, so the dual-theme rule is demonstrated by the
                board rather than asserted beside it.
              </p>
            </Rise>
          </Prose>

          <Rise>
            <AdlmComponentBoard />
          </Rise>

          <Rise>
            <div className="mt-10 rounded-2xl border border-white/8 bg-white/[0.02] p-6 sm:p-8">
              <p
                className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em]"
                style={{ color: G, fontFamily: MONO }}
              >
                Listed, not shown
              </p>
              <p className="mb-6 max-w-[68ch] text-[14.5px] leading-[1.7] text-white/45">
                The remaining twenty-four only mean anything at full width, in a
                real page — a mega menu, a data grid, a modal, a pricing table.
                They exist in the system; a thumbnail of one would misrepresent
                it. Two of them are elsewhere on this page as full specimens,
                and the rest are visible in the website case study.
              </p>
              <div className="space-y-4">
                {Object.entries(NOT_SHOWN).map(([group, items]) => (
                  <div
                    key={group}
                    className="grid gap-3 border-t border-white/8 pt-4 sm:grid-cols-[150px_minmax(0,1fr)]"
                  >
                    <h3
                      className="text-[11px] font-semibold uppercase tracking-[0.16em]"
                      style={{
                        color: "rgba(255,255,255,0.35)",
                        fontFamily: MONO,
                      }}
                    >
                      {group}
                    </h3>
                    <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
                      {items.map((i) => (
                        <li
                          key={i}
                          className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1.5 text-[13px] text-white/50"
                        >
                          {i}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </Rise>
        </Section>

        {/* ── the two exits ── */}
        <section className="border-t border-white/5 px-4 py-16 sm:px-8 sm:py-20 lg:px-12">
          <div className="mx-auto max-w-[1120px]">
            <Rise>
              <p className="type-eyebrow mb-3 text-white/30">See it applied</p>
              <h2 className="type-h1 mb-10 max-w-[30ch] text-white">
                The system governs two surfaces. Pick one.
              </h2>
            </Rise>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  to: `${BASE}/website`,
                  t: "On the website",
                  b: "Thirty-one marketing pages, navy-dominant because of the contrast finding above.",
                },
                {
                  to: `${BASE}/product`,
                  t: "In the product",
                  b: "Six tools, three themes, and the components a quantity surveyor works in all day.",
                },
              ].map((x) => (
                <Rise key={x.to}>
                  <Link
                    to={x.to}
                    className="flex h-full flex-col rounded-2xl border border-white/8 bg-white/[0.02] p-8 transition-colors duration-300 hover:border-[#a3e635]/30 hover:bg-white/[0.04]"
                  >
                    <h3 className="type-h2 mb-2 text-white">{x.t}</h3>
                    <p className="mb-6 text-[14.5px] leading-[1.65] text-white/50">
                      {x.b}
                    </p>
                    <span
                      className="mt-auto inline-flex items-center gap-2 text-[13px] font-semibold"
                      style={{ color: G }}
                    >
                      View
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
                  </Link>
                </Rise>
              ))}
            </div>
          </div>
        </section>

        <Blend />

        <BuildSection />
        <div className="h-16 lg:hidden" />
      </div>
    </div>
  );
}
