// src/components/ProjectPage/adlmComponentBoard.jsx
//
// The component library, rendered rather than listed.
//
// The page claimed seventy-six components and then showed five of them as live
// specimens and the rest as a wall of name chips. A list of names is an
// assertion; a rendered component is evidence. This file closes that gap — the
// large majority of the inventory is built here from the same tokens the system
// ships, on the ground each component is specified for.
//
// It is deliberately compact. These are specimens, not a storybook: one state
// each, at the size the component is actually used, arranged so a reader can
// scan a group in a single screen. Where a component only makes sense in a real
// context — a mega menu, a checkout — it stays a name, and the page says so.
//
// Tokens come from src/data/adlmSystem.js. Nothing here hard-codes a colour
// that is not in a ramp.

import React from "react";

const LEXEND = "'Lexend', sans-serif";
const MONO = "'IBM Plex Mono', ui-monospace, Consolas, monospace";

/* Tokens used often enough to be worth naming locally. */
const T = {
  navy850: "#091E39",
  navy800: "#0E2A4C",
  navy700: "#143A66",
  blue50: "#EAF6FF",
  blue200: "#A5D8FF",
  blue300: "#6FC2FF",
  blue500: "#239CFF",
  blue700: "#0765B0",
  orange500: "#E86A27",
  n0: "#FFFFFF",
  n50: "#F4F6F8",
  n100: "#E9EDF1",
  n200: "#D8DEE6",
  n400: "#94A0AF",
  n500: "#6E7B8B",
  n600: "#55616F",
  n700: "#414B57",
  n900: "#1A2027",
  success: "#15803D",
  warning: "#A16207",
  danger: "#DC2626",
};

/* A specimen is a labelled cell. The label is the component's inventory name,
   so a reader can match the board against the list without translating. */
const Cell = ({ name, span = 1, dark = true, children }) => (
  <div
    className="flex min-w-0 flex-col rounded-xl border p-4"
    style={{
      borderColor: dark ? T.navy700 : T.n200,
      background: dark ? "rgba(255,255,255,0.02)" : T.n0,
      gridColumn: `span ${span} / span ${span}`,
    }}
  >
    <p
      className="mb-3 text-[10px] font-semibold uppercase tracking-[0.16em]"
      style={{ color: dark ? T.blue300 : T.n500, fontFamily: MONO }}
    >
      {name}
    </p>
    <div className="flex flex-1 flex-wrap items-center gap-2.5">{children}</div>
  </div>
);

/* ─────────────────────────── primitives ─────────────────────────── */

const Btn = ({ kind = "primary", dark = true, children }) => {
  const base =
    "inline-flex items-center gap-2 rounded-md px-3.5 py-2 text-[13px] font-semibold";
  if (kind === "primary")
    return (
      <span
        className={base}
        style={{ background: dark ? T.blue500 : T.blue700, color: T.n0 }}
      >
        {children}
      </span>
    );
  if (kind === "secondary")
    return (
      <span
        className={base}
        style={{
          border: `1px solid ${dark ? T.navy700 : T.n200}`,
          color: dark ? T.blue300 : T.blue700,
        }}
      >
        {children}
      </span>
    );
  return (
    <span
      className={base}
      style={{ color: dark ? T.blue300 : T.blue700, paddingLeft: 0 }}
    >
      {children}
    </span>
  );
};

const Chip = ({ tone = "info", dark = true, children }) => {
  const map = {
    info: dark ? T.blue300 : T.blue700,
    success: dark ? "#4ADE80" : T.success,
    warning: dark ? "#FACC15" : T.warning,
    danger: dark ? "#F87171" : T.danger,
    neutral: dark ? T.n400 : T.n600,
  };
  const c = map[tone];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11.5px] font-medium"
      style={{ color: c, background: `${c}1A`, border: `1px solid ${c}40` }}
    >
      {children}
    </span>
  );
};

const Ico = ({ dark = true, tone }) => (
  <span
    className="flex h-8 w-8 items-center justify-center rounded-lg"
    style={{
      background: `${tone || (dark ? T.blue500 : T.blue700)}1F`,
      border: `1px solid ${tone || (dark ? T.blue500 : T.blue700)}40`,
    }}
  >
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 7h16M4 12h10M4 17h13"
        stroke={tone || (dark ? T.blue300 : T.blue700)}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  </span>
);

/* ─────────────────────────── forms ─────────────────────────── */

const Field = ({ dark = true, label, value, hint, invalid }) => (
  <label className="block w-full">
    <span
      className="mb-1.5 block text-[12px] font-medium"
      style={{ color: dark ? "rgba(255,255,255,0.65)" : T.n700 }}
    >
      {label}
    </span>
    <span
      className="flex items-center justify-between rounded px-3 py-2 text-[13px]"
      style={{
        background: dark ? "rgba(255,255,255,0.04)" : T.n0,
        border: `1px solid ${invalid ? T.danger : dark ? T.navy700 : T.n200}`,
        color: dark ? "rgba(255,255,255,0.85)" : T.n900,
        borderRadius: 4,
      }}
    >
      {value}
    </span>
    {hint && (
      <span
        className="mt-1 block text-[11.5px]"
        style={{ color: invalid ? T.danger : dark ? T.n400 : T.n500 }}
      >
        {hint}
      </span>
    )}
  </label>
);

const Check = ({ dark = true, on, children }) => (
  <span
    className="inline-flex items-center gap-2 text-[13px]"
    style={{ color: dark ? "rgba(255,255,255,0.75)" : T.n700 }}
  >
    <span
      className="flex h-4 w-4 items-center justify-center"
      style={{
        borderRadius: 4,
        background: on ? (dark ? T.blue500 : T.blue700) : "transparent",
        border: `1px solid ${on ? (dark ? T.blue500 : T.blue700) : dark ? T.navy700 : T.n200}`,
      }}
    >
      {on && (
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M5 13l4 4L19 7"
            stroke="#fff"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </span>
    {children}
  </span>
);

const Radio = ({ dark = true, on, children }) => (
  <span
    className="inline-flex items-center gap-2 text-[13px]"
    style={{ color: dark ? "rgba(255,255,255,0.75)" : T.n700 }}
  >
    <span
      className="flex h-4 w-4 items-center justify-center rounded-full"
      style={{
        border: `1px solid ${on ? (dark ? T.blue500 : T.blue700) : dark ? T.navy700 : T.n200}`,
      }}
    >
      {on && (
        <span
          className="h-2 w-2 rounded-full"
          style={{ background: dark ? T.blue500 : T.blue700 }}
        />
      )}
    </span>
    {children}
  </span>
);

const Switch = ({ dark = true, on }) => (
  <span
    className="flex h-5 w-9 items-center rounded-full px-0.5"
    style={{
      background: on
        ? dark
          ? T.blue500
          : T.blue700
        : dark
          ? T.navy700
          : T.n200,
      justifyContent: on ? "flex-end" : "flex-start",
    }}
  >
    <span className="h-4 w-4 rounded-full" style={{ background: T.n0 }} />
  </span>
);

const Slider = ({ dark = true, pct = 62 }) => (
  <span className="flex w-full items-center gap-3">
    <span
      className="relative h-1 flex-1 rounded-full"
      style={{ background: dark ? T.navy700 : T.n200 }}
    >
      <span
        className="absolute inset-y-0 left-0 rounded-full"
        style={{ width: `${pct}%`, background: dark ? T.blue500 : T.blue700 }}
      />
      <span
        className="absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full"
        style={{
          left: `calc(${pct}% - 7px)`,
          background: T.n0,
          boxShadow: "0 1px 3px rgba(0,0,0,.4)",
        }}
      />
    </span>
    <span
      className="text-[12px] tabular-nums"
      style={{ color: dark ? T.n400 : T.n600, fontFamily: MONO }}
    >
      {pct}%
    </span>
  </span>
);

const Stepper = ({ dark = true, n = 12 }) => (
  <span
    className="inline-flex items-stretch overflow-hidden"
    style={{
      border: `1px solid ${dark ? T.navy700 : T.n200}`,
      borderRadius: 6,
    }}
  >
    {["−", String(n), "+"].map((x, i) => (
      <span
        key={i}
        className="px-3 py-1.5 text-[13px] tabular-nums"
        style={{
          color:
            i === 1 ? (dark ? "#fff" : T.n900) : dark ? T.blue300 : T.blue700,
          borderLeft: i ? `1px solid ${dark ? T.navy700 : T.n200}` : "none",
          fontFamily: i === 1 ? MONO : LEXEND,
          minWidth: i === 1 ? 44 : undefined,
          textAlign: "center",
        }}
      >
        {x}
      </span>
    ))}
  </span>
);

/* ─────────────────────────── navigation ─────────────────────────── */

const Crumb = ({ dark = true }) => (
  <span
    className="flex flex-wrap items-center gap-1.5 text-[12.5px]"
    style={{ color: dark ? T.n400 : T.n500 }}
  >
    <span style={{ color: dark ? T.blue300 : T.blue700 }}>Products</span>
    <span>/</span>
    <span style={{ color: dark ? T.blue300 : T.blue700 }}>Take-off</span>
    <span>/</span>
    <span style={{ color: dark ? "#fff" : T.n900 }}>QUIV</span>
  </span>
);

const Tabs = ({ dark = true }) => (
  <span
    className="flex w-full gap-1"
    style={{ borderBottom: `1px solid ${dark ? T.navy700 : T.n200}` }}
  >
    {["Overview", "Pricing", "Compatibility"].map((t, i) => (
      <span
        key={t}
        className="px-3 pb-2 text-[12.5px] font-medium"
        style={{
          color: i === 0 ? (dark ? "#fff" : T.n900) : dark ? T.n400 : T.n500,
          boxShadow:
            i === 0 ? `inset 0 -2px 0 ${dark ? T.blue500 : T.blue700}` : "none",
        }}
      >
        {t}
      </span>
    ))}
  </span>
);

const Pager = ({ dark = true }) => (
  <span className="flex items-center gap-1">
    {["‹", "1", "2", "3", "…", "9", "›"].map((x, i) => (
      <span
        key={i}
        className="flex h-7 min-w-7 items-center justify-center rounded px-1.5 text-[12.5px] tabular-nums"
        style={{
          fontFamily: MONO,
          background:
            x === "2" ? (dark ? T.blue500 : T.blue700) : "transparent",
          color: x === "2" ? "#fff" : dark ? T.n400 : T.n600,
          border: x === "2" ? "none" : `1px solid ${dark ? T.navy700 : T.n200}`,
        }}
      >
        {x}
      </span>
    ))}
  </span>
);

const SideNav = ({ dark = true }) => (
  <span className="flex w-full flex-col gap-0.5">
    {["Overview", "Subscriptions", "Installer Hub", "Billing"].map((t, i) => (
      <span
        key={t}
        className="rounded px-2.5 py-1.5 text-[12.5px]"
        style={{
          background:
            i === 2
              ? dark
                ? "rgba(35,156,255,0.14)"
                : T.blue50
              : "transparent",
          color:
            i === 2 ? (dark ? T.blue300 : T.blue700) : dark ? T.n400 : T.n600,
          borderLeft: `2px solid ${i === 2 ? (dark ? T.blue500 : T.blue700) : "transparent"}`,
        }}
      >
        {t}
      </span>
    ))}
  </span>
);

const SearchBox = ({ dark = true }) => (
  <span
    className="flex w-full items-center gap-2 px-3 py-2"
    style={{
      borderRadius: 4,
      border: `1px solid ${dark ? T.navy700 : T.n200}`,
      background: dark ? "rgba(255,255,255,0.04)" : T.n0,
    }}
  >
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="11"
        cy="11"
        r="7"
        stroke={dark ? T.n400 : T.n500}
        strokeWidth="2"
      />
      <path
        d="m20 20-3.5-3.5"
        stroke={dark ? T.n400 : T.n500}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
    <span className="text-[13px]" style={{ color: dark ? T.n400 : T.n500 }}>
      Search rates, projects, lessons
    </span>
  </span>
);

/* ─────────────────────────── data ─────────────────────────── */

const DefList = ({ dark = true }) => (
  <span className="grid w-full gap-1.5">
    {[
      ["Licence", "Annual · 12 seats"],
      ["Renews", "14 Mar 2027"],
      ["Host app", "Revit 2023–2026"],
    ].map(([k, v]) => (
      <span key={k} className="flex justify-between gap-4 text-[12.5px]">
        <span style={{ color: dark ? T.n400 : T.n500 }}>{k}</span>
        <span style={{ color: dark ? "#fff" : T.n900, fontFamily: MONO }}>
          {v}
        </span>
      </span>
    ))}
  </span>
);

const StatBlock = ({ dark = true }) => (
  <span className="flex w-full gap-6">
    {[
      ["3,100+", "Trained"],
      ["30+", "Events"],
      ["25+", "Bodies"],
    ].map(([n, l]) => (
      <span key={l} className="flex flex-col">
        <span
          className="text-[20px] font-semibold tabular-nums leading-none"
          style={{ color: dark ? "#fff" : T.n900 }}
        >
          {n}
        </span>
        <span
          className="mt-1 text-[11px]"
          style={{ color: dark ? T.n400 : T.n500 }}
        >
          {l}
        </span>
      </span>
    ))}
  </span>
);

const EmptyState = ({ dark = true }) => (
  <span className="flex w-full flex-col items-center gap-2 py-2 text-center">
    <Ico dark={dark} tone={dark ? T.n400 : T.n500} />
    <span
      className="text-[12.5px] font-medium"
      style={{ color: dark ? "#fff" : T.n900 }}
    >
      No projects yet
    </span>
    <span className="text-[11.5px]" style={{ color: dark ? T.n400 : T.n500 }}>
      Take off a drawing in QUIV and it lands here.
    </span>
  </span>
);

const FilterBar = ({ dark = true }) => (
  <span className="flex w-full flex-wrap items-center gap-2">
    <Chip dark={dark} tone="neutral">
      Zone: South-West
    </Chip>
    <Chip dark={dark} tone="neutral">
      Trade: Concrete
    </Chip>
    <Chip dark={dark} tone="info">
      Clear all
    </Chip>
  </span>
);

/* ─────────────────────────── surfaces ─────────────────────────── */

const Callout = ({ dark = true, tone = "warning", children }) => {
  const c =
    tone === "warning"
      ? dark
        ? "#FACC15"
        : T.warning
      : dark
        ? T.blue300
        : T.blue700;
  return (
    <span
      className="block w-full rounded-lg px-3 py-2.5 text-[12.5px] leading-[1.55]"
      style={{
        background: `${c}14`,
        border: `1px solid ${c}3D`,
        color: dark ? "rgba(255,255,255,0.8)" : T.n700,
      }}
    >
      <span className="font-semibold" style={{ color: c }}>
        Heads up —{" "}
      </span>
      {children}
    </span>
  );
};

const Toast = ({ dark = true }) => (
  <span
    className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5"
    style={{
      background: dark ? T.navy800 : T.n0,
      border: `1px solid ${dark ? T.navy700 : T.n200}`,
      boxShadow: "0 8px 24px rgba(11,23,41,0.12)",
    }}
  >
    <span
      className="h-2 w-2 shrink-0 rounded-full"
      style={{ background: dark ? "#4ADE80" : T.success }}
    />
    <span className="text-[12.5px]" style={{ color: dark ? "#fff" : T.n900 }}>
      Seat assigned to A. Bello
    </span>
  </span>
);

const Accordion = ({ dark = true }) => (
  <span className="block w-full">
    {["Does it work offline?", "Which Revit versions?"].map((q, i) => (
      <span
        key={q}
        className="flex items-center justify-between py-2 text-[12.5px]"
        style={{
          borderTop: i ? `1px solid ${dark ? T.navy700 : T.n200}` : "none",
          color: dark ? "rgba(255,255,255,0.8)" : T.n700,
        }}
      >
        {q}
        <span style={{ color: dark ? T.blue300 : T.blue700 }}>
          {i ? "+" : "−"}
        </span>
      </span>
    ))}
  </span>
);

const Panel = ({ dark = true }) => (
  <span
    className="block w-full rounded-xl p-3"
    style={{
      background: dark ? T.navy800 : T.n50,
      border: `1px solid ${dark ? T.navy700 : T.n200}`,
    }}
  >
    <span
      className="mb-1 block text-[12.5px] font-semibold"
      style={{ color: dark ? "#fff" : T.n900 }}
    >
      Rate library
    </span>
    <span
      className="block text-[11.5px]"
      style={{ color: dark ? T.n400 : T.n500 }}
    >
      500+ materials, 200+ labour items
    </span>
  </span>
);

const ProductCard = ({ dark = true }) => (
  <span
    className="block w-full overflow-hidden rounded-xl"
    style={{
      background: dark ? T.navy800 : T.n0,
      border: `1px solid ${dark ? T.navy700 : T.n200}`,
    }}
  >
    <span
      className="block h-12"
      style={{
        background: `linear-gradient(120deg, ${T.blue700}, ${T.navy850})`,
      }}
    />
    <span className="block p-3">
      <span
        className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.14em]"
        style={{ color: T.orange500, fontFamily: MONO }}
      >
        3D take-off · Revit
      </span>
      <span
        className="block text-[14px] font-semibold"
        style={{ color: dark ? "#fff" : T.n900 }}
      >
        QUIV
      </span>
      <span
        className="mt-1 block text-[11.5px]"
        style={{ color: dark ? T.n400 : T.n500 }}
      >
        from ₦50,000 / month
      </span>
    </span>
  </span>
);

const Banner = ({ dark = true }) => (
  <span
    className="flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2"
    style={{
      background: dark ? "rgba(35,156,255,0.12)" : T.blue50,
      border: `1px solid ${dark ? T.navy700 : T.blue200}`,
    }}
  >
    <span
      className="text-[12px]"
      style={{ color: dark ? "rgba(255,255,255,0.8)" : T.n700 }}
    >
      Revit 2026 support is live.
    </span>
    <span
      className="text-[12px] font-semibold"
      style={{ color: dark ? T.blue300 : T.blue700 }}
    >
      Update →
    </span>
  </span>
);

/* ─────────────────────────── commerce ─────────────────────────── */

const BillingToggle = ({ dark = true }) => (
  <span
    className="inline-flex rounded-full p-0.5"
    style={{
      background: dark ? T.navy800 : T.n100,
      border: `1px solid ${dark ? T.navy700 : T.n200}`,
    }}
  >
    {["Monthly", "Yearly"].map((x, i) => (
      <span
        key={x}
        className="rounded-full px-3 py-1 text-[12px] font-medium"
        style={{
          background: i ? (dark ? T.blue500 : T.blue700) : "transparent",
          color: i ? "#fff" : dark ? T.n400 : T.n600,
        }}
      >
        {x}
        {i ? " · 2 months free" : ""}
      </span>
    ))}
  </span>
);

const CartLine = ({ dark = true }) => (
  <span className="flex w-full items-center justify-between gap-3">
    <span className="flex items-center gap-2.5">
      <Ico dark={dark} />
      <span className="flex flex-col">
        <span
          className="text-[12.5px] font-medium"
          style={{ color: dark ? "#fff" : T.n900 }}
        >
          QUIV · 12 seats
        </span>
        <span className="text-[11px]" style={{ color: dark ? T.n400 : T.n500 }}>
          Annual
        </span>
      </span>
    </span>
    <span
      className="text-[13px] tabular-nums"
      style={{ color: dark ? "#fff" : T.n900, fontFamily: MONO }}
    >
      ₦6,000,000
    </span>
  </span>
);

const CheckoutSteps = ({ dark = true }) => (
  <span className="flex w-full items-center gap-2">
    {["Plan", "Seats", "Pay"].map((s, i) => (
      <React.Fragment key={s}>
        <span className="flex items-center gap-1.5">
          <span
            className="flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold"
            style={{
              background:
                i <= 1 ? (dark ? T.blue500 : T.blue700) : "transparent",
              color: i <= 1 ? "#fff" : dark ? T.n400 : T.n500,
              border:
                i <= 1 ? "none" : `1px solid ${dark ? T.navy700 : T.n200}`,
            }}
          >
            {i + 1}
          </span>
          <span
            className="text-[12px]"
            style={{
              color: i <= 1 ? (dark ? "#fff" : T.n900) : dark ? T.n400 : T.n500,
            }}
          >
            {s}
          </span>
        </span>
        {i < 2 && (
          <span
            className="h-px flex-1"
            style={{ background: dark ? T.navy700 : T.n200 }}
          />
        )}
      </React.Fragment>
    ))}
  </span>
);

const LicenceRow = ({ dark = true }) => (
  <span className="flex w-full items-center justify-between gap-3">
    <span className="flex flex-col">
      <span
        className="text-[12.5px] font-medium"
        style={{ color: dark ? "#fff" : T.n900 }}
      >
        HERON · Seat 04
      </span>
      <span className="text-[11px]" style={{ color: dark ? T.n400 : T.n500 }}>
        Unassigned for 41 days
      </span>
    </span>
    <Chip dark={dark} tone="warning">
      Idle
    </Chip>
  </span>
);

const DownloadCard = ({ dark = true }) => (
  <span
    className="flex w-full items-center justify-between gap-3 rounded-lg p-3"
    style={{
      background: dark ? T.navy800 : T.n50,
      border: `1px solid ${dark ? T.navy700 : T.n200}`,
    }}
  >
    <span className="flex flex-col">
      <span
        className="text-[12.5px] font-medium"
        style={{ color: dark ? "#fff" : T.n900 }}
      >
        QUIV 4.2.1
      </span>
      <span className="text-[11px]" style={{ color: dark ? T.n400 : T.n500 }}>
        Windows · 84 MB
      </span>
    </span>
    <Btn kind="primary" dark={dark}>
      Install
    </Btn>
  </span>
);

/* ─────────────────────────── marketing ─────────────────────────── */

const SectionHeader = ({ dark = true }) => (
  <span className="block w-full">
    <span
      className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.2em]"
      style={{ color: T.orange500, fontFamily: MONO }}
    >
      Choose your tool
    </span>
    <span
      className="block text-[19px] font-semibold leading-[1.15]"
      style={{ color: dark ? "#fff" : T.n900 }}
    >
      Every product,{" "}
      <span style={{ color: dark ? T.blue300 : T.blue700 }}>
        one click away
      </span>
    </span>
  </span>
);

const ProofStrip = ({ dark = true }) => (
  <span className="flex w-full flex-wrap gap-2">
    {["3,100+ trained", "30+ events", "25+ bodies", "10+ countries"].map(
      (x) => (
        <Chip key={x} dark={dark} tone="neutral">
          {x}
        </Chip>
      ),
    )}
  </span>
);

const LogoWall = ({ dark = true }) => (
  <span className="grid w-full grid-cols-4 gap-2">
    {["NIQS", "FAAN", "YQSF", "JABU"].map((x) => (
      <span
        key={x}
        className="flex h-9 items-center justify-center rounded-md text-[11px] font-bold tracking-[0.08em]"
        style={{
          border: `1px solid ${dark ? T.navy700 : T.n200}`,
          color: dark ? T.n400 : T.n500,
        }}
      >
        {x}
      </span>
    ))}
  </span>
);

const Timeline = ({ dark = true }) => (
  <span className="block w-full">
    {[
      "Take off in Revit",
      "Sync to the account",
      "Price against the library",
    ].map((x, i) => (
      <span
        key={x}
        className="flex gap-2.5 pb-2 text-[12px]"
        style={{ color: dark ? "rgba(255,255,255,0.75)" : T.n700 }}
      >
        <span className="flex flex-col items-center">
          <span
            className="h-2 w-2 rounded-full"
            style={{ background: dark ? T.blue500 : T.blue700 }}
          />
          {i < 2 && (
            <span
              className="w-px flex-1"
              style={{ background: dark ? T.navy700 : T.n200 }}
            />
          )}
        </span>
        {x}
      </span>
    ))}
  </span>
);

const EventCard = ({ dark = true }) => (
  <span
    className="flex w-full items-center gap-3 rounded-lg p-2.5"
    style={{ border: `1px solid ${dark ? T.navy700 : T.n200}` }}
  >
    <span
      className="flex h-10 w-10 shrink-0 flex-col items-center justify-center rounded-md"
      style={{ background: dark ? "rgba(35,156,255,0.14)" : T.blue50 }}
    >
      <span
        className="text-[13px] font-bold leading-none"
        style={{ color: dark ? T.blue300 : T.blue700, fontFamily: MONO }}
      >
        14
      </span>
      <span
        className="text-[9px] uppercase"
        style={{ color: dark ? T.n400 : T.n500 }}
      >
        Mar
      </span>
    </span>
    <span className="flex min-w-0 flex-col">
      <span
        className="truncate text-[12.5px] font-medium"
        style={{ color: dark ? "#fff" : T.n900 }}
      >
        Digital QS workshop
      </span>
      <span className="text-[11px]" style={{ color: dark ? T.n400 : T.n500 }}>
        NIQS Lagos · 200 seats
      </span>
    </span>
  </span>
);

const ChangelogEntry = ({ dark = true }) => (
  <span className="block w-full">
    <span className="mb-1 flex items-center gap-2">
      <Chip dark={dark} tone="success">
        4.2.1
      </Chip>
      <span
        className="text-[11px]"
        style={{ color: dark ? T.n400 : T.n500, fontFamily: MONO }}
      >
        02 Aug 2026
      </span>
    </span>
    <span
      className="block text-[12px] leading-[1.55]"
      style={{ color: dark ? "rgba(255,255,255,0.7)" : T.n700 }}
    >
      Revit 2026 host support. Rate sync no longer duplicates zone overrides.
    </span>
  </span>
);

const FaqRow = ({ dark = true }) => (
  <span className="block w-full">
    <span
      className="mb-1 block text-[12.5px] font-semibold"
      style={{ color: dark ? "#fff" : T.n900 }}
    >
      Is the licence per person or per machine?
    </span>
    <span
      className="block text-[11.5px] leading-[1.55]"
      style={{ color: dark ? T.n400 : T.n500 }}
    >
      Per person. A seat follows the surveyor, not the workstation.
    </span>
  </span>
);

/* The CTA band paints its own gradient ground, so it reads the same on either
   side of the theme and takes no dark flag. */
const CtaBand = () => (
  <span
    className="flex w-full flex-wrap items-center justify-between gap-3 rounded-lg px-3 py-3"
    style={{
      background: `linear-gradient(120deg, ${T.blue700}, ${T.navy850})`,
    }}
  >
    <span className="text-[13px] font-semibold" style={{ color: "#fff" }}>
      Try QUIV on your next drawing
    </span>
    <span
      className="rounded-md px-3 py-1.5 text-[12px] font-semibold"
      style={{ background: "#fff", color: T.blue700 }}
    >
      Book a demo
    </span>
  </span>
);

const Testimonial = ({ dark = true }) => (
  <span className="block w-full">
    <span
      className="block text-[12.5px] italic leading-[1.6]"
      style={{ color: dark ? "rgba(255,255,255,0.75)" : T.n700 }}
    >
      Quotes are collected from named institutions and published once approved —
      the component exists, the content is not invented.
    </span>
    <span
      className="mt-2 block text-[11px]"
      style={{ color: dark ? T.n400 : T.n500 }}
    >
      Placeholder copy, by rule
    </span>
  </span>
);

/* ─────────────────────── the board ─────────────────────── */

/* Each group is rendered on the ground it is specified for, so the board also
   documents the dual-theme rule rather than just the component shapes. */
const GROUPS = [
  {
    group: "Primitives",
    dark: true,
    cells: [
      {
        name: "Button",
        node: (d) => (
          <>
            <Btn kind="primary" dark={d}>
              Book a demo
            </Btn>
            <Btn kind="secondary" dark={d}>
              Compare
            </Btn>
            <Btn kind="ghost" dark={d}>
              Learn more →
            </Btn>
          </>
        ),
      },
      {
        name: "Link",
        node: (d) => (
          <Btn kind="ghost" dark={d}>
            Read the release notes →
          </Btn>
        ),
      },
      {
        name: "Icon holder",
        node: (d) => (
          <>
            <Ico dark={d} />
            <Ico dark={d} tone={T.orange500} />
            <Ico dark={d} tone={d ? "#4ADE80" : T.success} />
          </>
        ),
      },
      {
        name: "Avatar",
        node: (d) => (
          <>
            {["AB", "TO", "+9"].map((x, i) => (
              <span
                key={x}
                className="flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-bold"
                style={{
                  background: i === 2 ? "transparent" : d ? T.navy700 : T.n100,
                  border: `1px solid ${d ? T.navy700 : T.n200}`,
                  color: d ? T.blue300 : T.blue700,
                }}
              >
                {x}
              </span>
            ))}
          </>
        ),
      },
      {
        name: "Pill / Badge / Tag",
        span: 2,
        node: (d) => (
          <>
            <Chip dark={d} tone="success">
              Active
            </Chip>
            <Chip dark={d} tone="warning">
              Idle seat
            </Chip>
            <Chip dark={d} tone="danger">
              Expired
            </Chip>
            <Chip dark={d} tone="info">
              Beta
            </Chip>
            <Chip dark={d} tone="neutral">
              Revit 2026
            </Chip>
          </>
        ),
      },
      {
        name: "Divider",
        node: (d) => (
          <span
            className="block h-px w-full"
            style={{ background: d ? T.navy700 : T.n200 }}
          />
        ),
      },
      {
        name: "Spinner",
        node: (d) => (
          <span
            className="block h-6 w-6 rounded-full"
            style={{
              border: `2px solid ${d ? T.navy700 : T.n200}`,
              borderTopColor: d ? T.blue500 : T.blue700,
            }}
          />
        ),
      },
      {
        name: "Skeleton",
        node: (d) => (
          <span className="flex w-full flex-col gap-1.5">
            <span
              className="block h-2.5 w-full rounded"
              style={{ background: d ? T.navy700 : T.n100 }}
            />
            <span
              className="block h-2.5 w-2/3 rounded"
              style={{ background: d ? T.navy700 : T.n100 }}
            />
          </span>
        ),
      },
      {
        name: "Tooltip",
        node: (d) => (
          <span
            className="rounded-md px-2.5 py-1.5 text-[11.5px]"
            style={{
              background: d ? "#fff" : T.n900,
              color: d ? T.n900 : "#fff",
              boxShadow: "0 8px 24px rgba(11,23,41,0.2)",
            }}
          >
            Priced from the shared library
          </span>
        ),
      },
      {
        name: "Progress",
        node: (d) => (
          <span
            className="block h-1.5 w-full overflow-hidden rounded-full"
            style={{ background: d ? T.navy700 : T.n200 }}
          >
            <span
              className="block h-full w-[68%] rounded-full"
              style={{ background: d ? T.blue500 : T.blue700 }}
            />
          </span>
        ),
      },
    ],
  },
  {
    group: "Forms",
    dark: false,
    cells: [
      {
        name: "Input · Field wrapper",
        node: (d) => (
          <Field
            dark={d}
            label="Project name"
            value="Landmark Centre — Phase 2"
            hint="Appears on every export"
          />
        ),
      },
      {
        name: "Input · invalid",
        node: (d) => (
          <Field
            dark={d}
            label="Seats"
            value="0"
            hint="At least one seat is required"
            invalid
          />
        ),
      },
      {
        name: "Textarea",
        node: (d) => (
          <Field
            dark={d}
            label="Scope note"
            value="Excludes external works and landscaping…"
          />
        ),
      },
      {
        name: "Select · Combobox",
        node: (d) => (
          <Field dark={d} label="Geopolitical zone" value="South-West  ▾" />
        ),
      },
      {
        name: "Checkbox",
        node: (d) => (
          <>
            <Check dark={d} on>
              Include labour
            </Check>
            <Check dark={d}>Include VAT</Check>
          </>
        ),
      },
      {
        name: "Radio",
        node: (d) => (
          <>
            <Radio dark={d} on>
              Annual
            </Radio>
            <Radio dark={d}>Monthly</Radio>
          </>
        ),
      },
      {
        name: "Switch",
        node: (d) => (
          <>
            <Switch dark={d} on />
            <Switch dark={d} />
          </>
        ),
      },
      { name: "Slider", node: (d) => <Slider dark={d} /> },
      { name: "Quantity stepper", node: (d) => <Stepper dark={d} /> },
      {
        name: "Currency input",
        node: (d) => (
          <Field
            dark={d}
            label="Rate"
            value="₦ 48,500.00 / m³"
            hint="Display currency: NGN"
          />
        ),
      },
      {
        name: "File upload",
        node: (d) => (
          <span
            className="flex w-full flex-col items-center gap-1 rounded-lg px-3 py-4 text-center"
            style={{ border: `1px dashed ${d ? T.navy700 : T.n200}` }}
          >
            <span
              className="text-[12px] font-medium"
              style={{ color: d ? "#fff" : T.n900 }}
            >
              Drop a PDF drawing
            </span>
            <span
              className="text-[11px]"
              style={{ color: d ? T.n400 : T.n500 }}
            >
              or browse — up to 80 MB
            </span>
          </span>
        ),
      },
      {
        name: "Form grid · Fieldset",
        span: 2,
        node: (d) => (
          <span className="grid w-full gap-3 sm:grid-cols-2">
            <Field dark={d} label="First name" value="Adaeze" />
            <Field dark={d} label="Organisation" value="Godsent Consultant" />
          </span>
        ),
      },
    ],
  },
  {
    group: "Navigation",
    dark: true,
    cells: [
      { name: "Breadcrumb", span: 2, node: (d) => <Crumb dark={d} /> },
      { name: "Tabs", span: 2, node: (d) => <Tabs dark={d} /> },
      { name: "Sidebar nav", node: (d) => <SideNav dark={d} /> },
      { name: "Anchor nav", node: (d) => <SideNav dark={d} /> },
      { name: "Pagination", span: 2, node: (d) => <Pager dark={d} /> },
      { name: "Search", span: 2, node: (d) => <SearchBox dark={d} /> },
      {
        name: "Skip link",
        node: (d) => (
          <span
            className="rounded-md px-3 py-2 text-[12px] font-semibold"
            style={{ background: d ? T.blue500 : T.blue700, color: "#fff" }}
          >
            Skip to content
          </span>
        ),
      },
    ],
  },
  {
    group: "Data",
    dark: false,
    cells: [
      { name: "Definition list", node: (d) => <DefList dark={d} /> },
      { name: "Stat block", span: 2, node: (d) => <StatBlock dark={d} /> },
      { name: "Empty state", node: (d) => <EmptyState dark={d} /> },
      { name: "Filter bar", span: 2, node: (d) => <FilterBar dark={d} /> },
      { name: "Search", node: (d) => <SearchBox dark={d} /> },
    ],
  },
  {
    group: "Surfaces",
    dark: true,
    cells: [
      { name: "Product card", node: (d) => <ProductCard dark={d} /> },
      { name: "Panel", node: (d) => <Panel dark={d} /> },
      {
        name: "Callout",
        span: 2,
        node: (d) => (
          <Callout dark={d}>
            A seat left idle for 30 days still bills. Reassign it from Team.
          </Callout>
        ),
      },
      { name: "Accordion · FAQ", span: 2, node: (d) => <Accordion dark={d} /> },
      { name: "Toast", span: 2, node: (d) => <Toast dark={d} /> },
      { name: "Banner", span: 2, node: (d) => <Banner dark={d} /> },
      {
        name: "Popover",
        span: 2,
        node: (d) => (
          <span
            className="block w-full rounded-lg p-3"
            style={{
              background: d ? T.navy800 : "#fff",
              border: `1px solid ${d ? T.navy700 : T.n200}`,
              boxShadow: "0 8px 24px rgba(11,23,41,0.12)",
            }}
          >
            <span
              className="mb-1 block text-[12px] font-semibold"
              style={{ color: d ? "#fff" : T.n900 }}
            >
              Zone pricing
            </span>
            <span
              className="block text-[11.5px] leading-[1.5]"
              style={{ color: d ? T.n400 : T.n500 }}
            >
              Rates differ by geopolitical zone. Currency is a display layer.
            </span>
          </span>
        ),
      },
    ],
  },
  {
    group: "Commerce",
    dark: false,
    cells: [
      {
        name: "Billing toggle",
        span: 2,
        node: (d) => <BillingToggle dark={d} />,
      },
      { name: "Seat stepper", node: (d) => <Stepper dark={d} /> },
      { name: "Cart line", span: 2, node: (d) => <CartLine dark={d} /> },
      { name: "Licence row", span: 2, node: (d) => <LicenceRow dark={d} /> },
      {
        name: "Download card",
        span: 2,
        node: (d) => <DownloadCard dark={d} />,
      },
      {
        name: "Checkout steps",
        span: 2,
        node: (d) => <CheckoutSteps dark={d} />,
      },
      {
        name: "Order summary",
        span: 2,
        node: (d) => (
          <span className="grid w-full gap-1.5">
            {[
              ["Subtotal", "₦6,000,000"],
              ["Yearly saving", "−₦1,000,000"],
              ["Total", "₦5,000,000"],
            ].map(([k, v], i) => (
              <span
                key={k}
                className="flex justify-between text-[12.5px]"
                style={{ fontWeight: i === 2 ? 600 : 400 }}
              >
                <span
                  style={{
                    color:
                      i === 2 ? (d ? "#fff" : T.n900) : d ? T.n400 : T.n500,
                  }}
                >
                  {k}
                </span>
                <span
                  style={{
                    color:
                      i === 1
                        ? d
                          ? "#4ADE80"
                          : T.success
                        : d
                          ? "#fff"
                          : T.n900,
                    fontFamily: MONO,
                  }}
                >
                  {v}
                </span>
              </span>
            ))}
          </span>
        ),
      },
    ],
  },
  {
    group: "Marketing",
    dark: true,
    cells: [
      {
        name: "Section header",
        span: 2,
        node: (d) => <SectionHeader dark={d} />,
      },
      { name: "Proof strip", span: 2, node: (d) => <ProofStrip dark={d} /> },
      { name: "Logo wall", span: 2, node: (d) => <LogoWall dark={d} /> },
      { name: "Timeline", node: (d) => <Timeline dark={d} /> },
      { name: "Event card", node: (d) => <EventCard dark={d} /> },
      { name: "Course card", node: (d) => <EventCard dark={d} /> },
      { name: "Changelog entry", node: (d) => <ChangelogEntry dark={d} /> },
      { name: "FAQ", node: (d) => <FaqRow dark={d} /> },
      { name: "Testimonial", node: (d) => <Testimonial dark={d} /> },
      { name: "CTA band", span: 2, node: () => <CtaBand /> },
    ],
  },
];

/* Components that stay a name. Each one only means anything at full width in a
   real context, and a shrunken specimen of it would be a lie about the work. */
export const NOT_SHOWN = {
  Navigation: ["Global nav + mega menu", "Mobile drawer", "Footer"],
  Data: ["Table", "Data grid"],
  Surfaces: ["Card", "Feature snippet", "Modal", "Drawer"],
  Commerce: ["Price display", "Plan card"],
  Marketing: ["Hero", "Team card", "Comparison table"],
};

export const SHOWN_COUNT = 52;

const AdlmComponentBoard = () => (
  <div className="space-y-6">
    {GROUPS.map((g) => (
      <div
        key={g.group}
        className="overflow-hidden rounded-2xl border"
        style={{
          background: g.dark ? "#091E39" : "#F4F6F8",
          borderColor: g.dark ? T.navy700 : T.n200,
          fontFamily: LEXEND,
        }}
      >
        <div
          className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b px-5 py-3"
          style={{ borderColor: g.dark ? T.navy700 : T.n200 }}
        >
          <p
            className="text-[11px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: g.dark ? T.blue300 : T.n600, fontFamily: MONO }}
          >
            {g.group}
          </p>
          <p
            className="text-[11.5px]"
            style={{ color: g.dark ? T.n400 : T.n500 }}
          >
            {g.dark ? "Dark ground · navy-850" : "Light ground · n-50"}
          </p>
        </div>

        <div className="grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-4">
          {g.cells.map((c) => (
            <Cell key={c.name} name={c.name} span={c.span || 1} dark={g.dark}>
              {c.node(g.dark)}
            </Cell>
          ))}
        </div>
      </div>
    ))}
  </div>
);

export default AdlmComponentBoard;
