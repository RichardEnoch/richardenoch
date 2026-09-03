// src/components/ProjectPage/adlmSpecimens.jsx
//
// Live specimens of the ADLM Studio design system.
//
// These are not screenshots. Every swatch, type row, button, input and table
// below is rendered in the browser from the real token values, which means the
// page cannot drift from the system it documents and the contrast rule can be
// demonstrated rather than asserted — the primary button genuinely changes
// colour between the navy and light grounds, for the reason stated beside it.
//
// Token values live in src/data/adlmSystem.js, sourced from
// 02-design-system/DESIGN-SYSTEM.md in the ADLM repo. Typography reflects what
// SHIPPED (Lexend), not the original three-family specification — see the note
// on the type section of the page.

import React from "react";

/* ─────────────────────── ground + shared shell ─────────────────────── */

const LEXEND = "'Lexend', sans-serif";
const MONO = "'IBM Plex Mono', ui-monospace, Consolas, monospace";

/* Every specimen is shown on the ground it is specified for. The system is
   dual-theme by token, so a component board that only shows one ground is
   documenting half of it. */
export const Ground = ({ theme = "navy", label, children, className = "" }) => {
  const dark = theme === "navy";
  return (
    <div
      className={`overflow-hidden rounded-2xl border ${className}`}
      style={{
        background: dark ? "#091E39" : "#F4F6F8",
        borderColor: dark ? "#143A66" : "#D8DEE6",
        fontFamily: LEXEND,
      }}
    >
      {label && (
        <div
          className="border-b px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.18em]"
          style={{
            borderColor: dark ? "#143A66" : "#D8DEE6",
            color: dark ? "#6FC2FF" : "#55616F",
            fontFamily: MONO,
          }}
        >
          {label}
        </div>
      )}
      <div className="p-6 sm:p-8">{children}</div>
    </div>
  );
};

/* ───────────────────────────── colour ───────────────────────────── */

export const Ramp = ({ ramp }) => (
  <div>
    <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
      <h3 className="text-[16px] font-medium text-white">{ramp.label}</h3>
      <p className="max-w-[54ch] text-[13px] leading-[1.5] text-white/40">
        {ramp.note}
      </p>
    </div>
    <div className="overflow-hidden rounded-xl border border-white/10">
      <div className="flex h-16 w-full">
        {ramp.steps.map((s) => (
          <div
            key={s.t}
            className="relative flex-1"
            style={{ background: s.hex }}
            title={`${s.t} ${s.hex}`}
          >
            {s.brand && (
              <span
                className="absolute inset-x-0 bottom-1 text-center text-[8px] font-bold uppercase tracking-[0.1em]"
                style={{ color: "#FAFAFA", mixBlendMode: "difference" }}
              >
                brand
              </span>
            )}
          </div>
        ))}
      </div>
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${ramp.steps.length}, minmax(0,1fr))`,
        }}
      >
        {ramp.steps.map((s) => (
          <div
            key={s.t}
            className="border-r border-white/6 px-2 py-2.5 last:border-r-0"
          >
            <code
              className="block text-[9.5px] leading-tight text-white/55"
              style={{ fontFamily: MONO }}
            >
              {s.t}
            </code>
            <code
              className="block text-[9px] leading-tight text-white/28"
              style={{ fontFamily: MONO }}
            >
              {s.hex}
            </code>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ──────────────────────────── typography ──────────────────────────── */

export const TypeRow = ({ row }) => (
  <div className="grid items-baseline gap-x-8 gap-y-2 border-b border-white/8 py-5 sm:grid-cols-[132px_minmax(0,1fr)]">
    <div>
      <code
        className="block text-[11px] text-[#6FC2FF]"
        style={{ fontFamily: MONO }}
      >
        {row.t}
      </code>
      <code
        className="block text-[10px] text-white/30"
        style={{ fontFamily: MONO }}
      >
        {row.size}/{row.lh} · {row.w}
      </code>
    </div>
    <p
      className="m-0 overflow-hidden text-white"
      style={{
        fontFamily: row.mono ? MONO : LEXEND,
        fontSize: `clamp(14px, ${row.size / 16}rem, ${row.size}px)`,
        lineHeight: row.lh,
        letterSpacing: row.tr,
        fontWeight: row.w,
        textTransform: row.mono ? "uppercase" : "none",
      }}
    >
      {row.sample}
    </p>
  </div>
);

/* ────────────────────────── live components ────────────────────────── */

/* The primary button is the contrast rule made physical: on navy it fills with
   blue-500 and takes a navy label, because white on blue-500 measures 2.89:1
   and fails. On light it steps down to blue-700, where white passes at 6.0:1.
   Same component, same token names, two grounds. */
export const AdlmButton = ({
  variant = "primary",
  size = "md",
  dark = true,
  children,
  ...rest
}) => {
  const pad =
    size === "sm" ? "8px 14px" : size === "lg" ? "14px 26px" : "11px 20px";
  const font = size === "sm" ? 13 : size === "lg" ? 16 : 14.5;

  const styles = {
    primary: dark
      ? { background: "#239CFF", color: "#04101F", border: "1px solid #239CFF" }
      : {
          background: "#0765B0",
          color: "#FFFFFF",
          border: "1px solid #0765B0",
        },
    secondary: dark
      ? {
          background: "transparent",
          color: "#6FC2FF",
          border: "1px solid #143A66",
        }
      : {
          background: "#FFFFFF",
          color: "#0765B0",
          border: "1px solid #D8DEE6",
        },
    ghost: dark
      ? {
          background: "transparent",
          color: "#A5D8FF",
          border: "1px solid transparent",
        }
      : {
          background: "transparent",
          color: "#0765B0",
          border: "1px solid transparent",
        },
    danger: dark
      ? {
          background: "transparent",
          color: "#F87171",
          border: "1px solid #F8717155",
        }
      : {
          background: "#DC2626",
          color: "#FFFFFF",
          border: "1px solid #DC2626",
        },
  }[variant];

  return (
    <button
      type="button"
      {...rest}
      style={{
        ...styles,
        padding: pad,
        fontSize: font,
        fontWeight: 600,
        borderRadius: 8,
        fontFamily: LEXEND,
        cursor: "pointer",
        transition: "filter 120ms cubic-bezier(.2,0,.38,.9)",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.filter = "brightness(1.12)")}
      onMouseLeave={(e) => (e.currentTarget.style.filter = "none")}
    >
      {children}
    </button>
  );
};

export const AdlmField = ({
  dark = true,
  label,
  hint,
  value,
  placeholder,
  error,
}) => (
  <label className="block" style={{ fontFamily: LEXEND }}>
    <span
      className="mb-2 block text-[13px] font-medium"
      style={{ color: dark ? "#E9EDF1" : "#2C343D" }}
    >
      {label}
    </span>
    <input
      readOnly
      defaultValue={value}
      placeholder={placeholder}
      className="w-full outline-none"
      style={{
        background: dark ? "#04101F" : "#FFFFFF",
        border: `1px solid ${error ? "#DC2626" : dark ? "#143A66" : "#D8DEE6"}`,
        borderRadius: 4,
        padding: "11px 14px",
        fontSize: 14.5,
        color: dark ? "#FAFAFA" : "#1A2027",
        fontFamily: LEXEND,
      }}
    />
    {(hint || error) && (
      <span
        className="mt-2 block text-[12.5px]"
        style={{ color: error ? "#F87171" : dark ? "#94A0AF" : "#6E7B8B" }}
      >
        {error || hint}
      </span>
    )}
  </label>
);

export const AdlmPill = ({ tone = "info", dark = true, children }) => {
  const map = {
    success: {
      fg: dark ? "#4ADE80" : "#15803D",
      bg: dark ? "#4ADE8018" : "#E8F6ED",
    },
    warning: {
      fg: dark ? "#FACC15" : "#A16207",
      bg: dark ? "#FACC1518" : "#FBF3DC",
    },
    danger: {
      fg: dark ? "#F87171" : "#DC2626",
      bg: dark ? "#F8717118" : "#FDECEC",
    },
    info: {
      fg: dark ? "#45AEFF" : "#0765B0",
      bg: dark ? "#239CFF18" : "#EAF6FF",
    },
    brand: {
      fg: dark ? "#F5853F" : "#C4531A",
      bg: dark ? "#E86A2718" : "#FDF1E9",
    },
  }[tone];
  return (
    <span
      style={{
        color: map.fg,
        background: map.bg,
        border: `1px solid ${map.fg}33`,
        borderRadius: 999,
        padding: "5px 12px",
        fontSize: 12.5,
        fontWeight: 500,
        fontFamily: LEXEND,
        display: "inline-block",
      }}
    >
      {children}
    </span>
  );
};

/* Tabular numerals are not decoration here — a bill of quantities is a column
   of numbers a surveyor scans for anomalies, and proportional digits make that
   scan unreliable. */
export const AdlmTable = ({ dark = true }) => {
  const rows = [
    {
      code: "D20/110",
      desc: "Excavate trench, n.e. 1.00m deep",
      unit: "m³",
      qty: "184.60",
      rate: "12,400.00",
    },
    {
      code: "E10/220",
      desc: "In-situ concrete, grade 25",
      unit: "m³",
      qty: "62.35",
      rate: "148,000.00",
    },
    {
      code: "F10/315",
      desc: "Blockwork, 225mm, in cement mortar",
      unit: "m²",
      qty: "1,208.75",
      rate: "9,850.00",
    },
  ];
  const bd = dark ? "#143A66" : "#D8DEE6";
  const fg = dark ? "#FAFAFA" : "#1A2027";
  const mu = dark ? "#94A0AF" : "#6E7B8B";
  return (
    <div
      className="overflow-x-auto"
      style={{ border: `1px solid ${bd}`, borderRadius: 8 }}
    >
      <table
        style={{
          width: "100%",
          minWidth: 560,
          borderCollapse: "collapse",
          fontFamily: LEXEND,
        }}
      >
        <thead>
          <tr>
            {["Code", "Description", "Unit", "Quantity", "Rate ₦"].map(
              (h, i) => (
                <th
                  key={h}
                  style={{
                    textAlign: i >= 3 ? "right" : "left",
                    padding: "11px 16px",
                    borderBottom: `1px solid ${bd}`,
                    background: dark ? "#0E2A4C" : "#E9EDF1",
                    color: mu,
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    fontFamily: MONO,
                  }}
                >
                  {h}
                </th>
              ),
            )}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.code}>
              <td
                style={{
                  padding: "12px 16px",
                  borderBottom: `1px solid ${bd}`,
                  color: mu,
                  fontSize: 13,
                  fontFamily: MONO,
                }}
              >
                {r.code}
              </td>
              <td
                style={{
                  padding: "12px 16px",
                  borderBottom: `1px solid ${bd}`,
                  color: fg,
                  fontSize: 14,
                }}
              >
                {r.desc}
              </td>
              <td
                style={{
                  padding: "12px 16px",
                  borderBottom: `1px solid ${bd}`,
                  color: mu,
                  fontSize: 13.5,
                }}
              >
                {r.unit}
              </td>
              <td
                style={{
                  padding: "12px 16px",
                  borderBottom: `1px solid ${bd}`,
                  color: fg,
                  fontSize: 14,
                  textAlign: "right",
                  fontVariantNumeric: "tabular-nums",
                  fontFamily: MONO,
                }}
              >
                {r.qty}
              </td>
              <td
                style={{
                  padding: "12px 16px",
                  borderBottom: `1px solid ${bd}`,
                  color: fg,
                  fontSize: 14,
                  textAlign: "right",
                  fontVariantNumeric: "tabular-nums",
                  fontFamily: MONO,
                }}
              >
                {r.rate}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const AdlmPrice = ({ dark = true }) => (
  <div
    style={{
      border: `1px solid ${dark ? "#143A66" : "#D8DEE6"}`,
      background: dark ? "#0E2A4C" : "#FFFFFF",
      borderRadius: 12,
      padding: 24,
      fontFamily: LEXEND,
      boxShadow: dark ? "none" : "0 2px 8px rgba(11,23,41,0.08)",
    }}
  >
    <div className="mb-3 flex items-center justify-between">
      <span
        style={{
          fontSize: 15,
          fontWeight: 600,
          color: dark ? "#FAFAFA" : "#1A2027",
        }}
      >
        QUIV — Team
      </span>
      <AdlmPill tone="info" dark={dark}>
        Most chosen
      </AdlmPill>
    </div>
    <div className="mb-1 flex items-baseline gap-1.5">
      <span
        style={{
          fontSize: 15,
          color: dark ? "#94A0AF" : "#6E7B8B",
          fontFamily: MONO,
        }}
      >
        ₦
      </span>
      <span
        style={{
          fontSize: 38,
          fontWeight: 500,
          letterSpacing: "-0.024em",
          color: dark ? "#FAFAFA" : "#1A2027",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        84,000
      </span>
      <span style={{ fontSize: 14, color: dark ? "#94A0AF" : "#6E7B8B" }}>
        / seat / month
      </span>
    </div>
    <p
      style={{
        margin: "0 0 20px",
        fontSize: 13.5,
        color: dark ? "#94A0AF" : "#6E7B8B",
      }}
    >
      Billed yearly. Minimum three seats.
    </p>
    <AdlmButton dark={dark} size="md">
      Get a quotation
    </AdlmButton>
  </div>
);
