// src/data/adlmSystem.js
//
// The ADLM Studio design tokens, as data.
//
// Source of truth is 02-design-system/DESIGN-SYSTEM.md in the ADLM repo. Kept
// separate from the specimen components so that file exports only components —
// mixing constants and components in one module breaks React Fast Refresh
// granularity, and the specimens are the part being iterated on.

export const RAMPS = {
  navy: {
    label: "Navy — ground and ink",
    note: "The brand's dominant surface, and the dark-theme ground.",
    steps: [
      { t: "navy-950", hex: "#04101F", use: "Deepest ground, dark-theme page" },
      { t: "navy-900", hex: "#071729", use: "Dark-theme surface" },
      { t: "navy-850", hex: "#091E39", use: "True brand navy", brand: true },
      { t: "navy-800", hex: "#0E2A4C", use: "Raised dark surface" },
      { t: "navy-700", hex: "#143A66", use: "Borders on dark" },
      { t: "navy-600", hex: "#1D4E85", use: "Muted dark accents" },
    ],
  },
  blue: {
    label: "Blue — primary action",
    note: "Ten steps, because this ramp has to work on two different grounds.",
    steps: [
      { t: "blue-50", hex: "#EAF6FF", use: "Wash, selected row" },
      { t: "blue-100", hex: "#CFEAFF", use: "Subtle fill" },
      { t: "blue-200", hex: "#A5D8FF", use: "Border on wash" },
      { t: "blue-300", hex: "#6FC2FF", use: "Dark-theme accent" },
      { t: "blue-400", hex: "#45AEFF", use: "Dark-theme hover" },
      { t: "blue-500", hex: "#239CFF", use: "True brand blue", brand: true },
      { t: "blue-600", hex: "#0B7FDB", use: "Hover on light" },
      { t: "blue-700", hex: "#0765B0", use: "Primary on light" },
      { t: "blue-800", hex: "#08528C", use: "Active / pressed on light" },
      { t: "blue-900", hex: "#0A4372", use: "Deepest" },
    ],
  },
  orange: {
    label: "Orange — brand accent",
    note: "Non-semantic and used sparingly. Barred from status use so it can never be confused with warning.",
    steps: [
      { t: "orange-50", hex: "#FDF1E9", use: "Wash" },
      { t: "orange-400", hex: "#F5853F", use: "Hover" },
      { t: "orange-500", hex: "#E86A27", use: "Brand orange", brand: true },
      { t: "orange-600", hex: "#C4531A", use: "Pressed" },
    ],
  },
  neutral: {
    label: "Neutral — blue-biased grey",
    note: "Chosen, not defaulted. A slight blue bias so neutrals sit with navy instead of fighting it.",
    steps: [
      { t: "n-0", hex: "#FFFFFF" },
      { t: "n-25", hex: "#FAFBFC" },
      { t: "n-50", hex: "#F4F6F8" },
      { t: "n-100", hex: "#E9EDF1" },
      { t: "n-200", hex: "#D8DEE6" },
      { t: "n-300", hex: "#BCC5D0" },
      { t: "n-400", hex: "#94A0AF" },
      { t: "n-500", hex: "#6E7B8B" },
      { t: "n-600", hex: "#55616F" },
      { t: "n-700", hex: "#414B57" },
      { t: "n-800", hex: "#2C343D" },
      { t: "n-900", hex: "#1A2027" },
    ],
  },
};

export const SEMANTIC = [
  { role: "Success", light: "#15803D", dark: "#4ADE80", wash: "#E8F6ED" },
  { role: "Warning", light: "#A16207", dark: "#FACC15", wash: "#FBF3DC" },
  { role: "Danger", light: "#DC2626", dark: "#F87171", wash: "#FDECEC" },
  { role: "Info", light: "#239CFF", dark: "#45AEFF", wash: "#EAF6FF" },
];

const SENTENCE = "Quantities come off the drawing wherever it already lives.";

export const TYPE_SCALE = [
  {
    t: "display-xl",
    size: 60,
    lh: 1.02,
    tr: "-0.030em",
    w: 500,
    sample: "Six products",
  },
  {
    t: "display-l",
    size: 48,
    lh: 1.05,
    tr: "-0.028em",
    w: 500,
    sample: "One workflow",
  },
  {
    t: "display-m",
    size: 38,
    lh: 1.08,
    tr: "-0.024em",
    w: 500,
    sample: "Measure where drawings live",
  },
  {
    t: "h1",
    size: 32,
    lh: 1.15,
    tr: "-0.020em",
    w: 500,
    sample: "Take-off, priced properly",
  },
  {
    t: "h2",
    size: 26,
    lh: 1.22,
    tr: "-0.016em",
    w: 550,
    sample: "Rate library and build-ups",
  },
  {
    t: "h3",
    size: 21,
    lh: 1.3,
    tr: "-0.012em",
    w: 550,
    sample: "Bill of quantities",
  },
  {
    t: "h4",
    size: 18,
    lh: 1.35,
    tr: "-0.008em",
    w: 600,
    sample: "Compatibility",
  },
  { t: "body-lg", size: 18, lh: 1.6, tr: "0", w: 400, sample: SENTENCE },
  { t: "body", size: 16, lh: 1.65, tr: "0", w: 400, sample: SENTENCE },
  { t: "body-sm", size: 14, lh: 1.6, tr: "0", w: 400, sample: SENTENCE },
  {
    t: "caption",
    size: 13,
    lh: 1.5,
    tr: "0",
    w: 400,
    sample: "Priced against the shared library",
  },
  {
    t: "micro",
    size: 11,
    lh: 1.4,
    tr: "0.10em",
    w: 600,
    sample: "SECTION LABEL",
    mono: true,
  },
];

export const SPACING = [0, 4, 8, 12, 16, 24, 32, 48, 64, 80, 96, 128];

export const RADII = [
  { t: "0", v: 0, use: "Flush edges" },
  { t: "2", v: 2, use: "Table cell" },
  { t: "4", v: 4, use: "Input" },
  { t: "6", v: 6, use: "Small control" },
  { t: "8", v: 8, use: "Nested surface" },
  { t: "12", v: 12, use: "Card" },
  { t: "16", v: 16, use: "Panel" },
  { t: "full", v: 999, use: "Pill, badge" },
];

export const ELEVATION = [
  { t: "e1", v: "0 1px 2px rgba(11,23,41,0.06)", use: "Resting card" },
  { t: "e2", v: "0 2px 8px rgba(11,23,41,0.08)", use: "Raised, hover" },
  { t: "e3", v: "0 8px 24px rgba(11,23,41,0.12)", use: "Dropdown, popover" },
  { t: "e4", v: "0 16px 48px rgba(11,23,41,0.18)", use: "Modal" },
];

export const MOTION = [
  {
    t: "fast",
    ms: 120,
    ease: "cubic-bezier(.2,0,.38,.9)",
    use: "Hover, focus, toggle",
  },
  {
    t: "base",
    ms: 180,
    ease: "cubic-bezier(.2,0,.38,.9)",
    use: "Dropdown, tooltip, tab",
  },
  {
    t: "slow",
    ms: 240,
    ease: "cubic-bezier(.16,1,.3,1)",
    use: "Modal, drawer, section",
  },
  {
    t: "reveal",
    ms: 420,
    ease: "cubic-bezier(.16,1,.3,1)",
    use: "Scroll entrance",
  },
];

export const INVENTORY = {
  Primitives: [
    "Button",
    "Link",
    "Icon",
    "Icon holder",
    "Avatar",
    "Pill",
    "Badge",
    "Tag",
    "Divider",
    "Spinner",
    "Skeleton",
    "Tooltip",
    "Progress",
  ],
  Forms: [
    "Input",
    "Textarea",
    "Select",
    "Combobox",
    "Checkbox",
    "Radio",
    "Switch",
    "Slider",
    "File upload",
    "Quantity stepper",
    "Currency input",
    "Field wrapper",
    "Fieldset",
    "Form grid",
  ],
  Navigation: [
    "Global nav + mega menu",
    "Mobile drawer",
    "Footer",
    "Breadcrumb",
    "Tabs",
    "Sidebar nav",
    "Pagination",
    "Anchor nav",
    "Skip link",
  ],
  Data: [
    "Table",
    "Data grid",
    "Definition list",
    "Stat block",
    "Empty state",
    "Filter bar",
    "Search",
  ],
  Surfaces: [
    "Card",
    "Product card",
    "Feature snippet",
    "Panel",
    "Accordion",
    "Modal",
    "Drawer",
    "Popover",
    "Toast",
    "Banner",
    "Callout",
  ],
  Commerce: [
    "Price display",
    "Plan card",
    "Billing toggle",
    "Seat stepper",
    "Cart line",
    "Order summary",
    "Checkout steps",
    "Licence row",
    "Download card",
  ],
  Marketing: [
    "Hero",
    "Section header",
    "Proof strip",
    "Logo wall",
    "Testimonial",
    "Timeline",
    "Team card",
    "Event card",
    "Course card",
    "Changelog entry",
    "Comparison table",
    "FAQ",
    "CTA band",
  ],
};

export const CONTRAST = [
  {
    pair: "White text on blue-500 #239CFF",
    ratio: "2.89:1",
    ok: false,
    note: "Fails",
  },
  {
    pair: "blue-500 #239CFF on navy-850 #091E39",
    ratio: "5.79:1",
    ok: true,
    note: "Excellent",
  },
  {
    pair: "blue-700 #0765B0 on white",
    ratio: "6.0:1",
    ok: true,
    note: "Passes",
  },
];

/* The two themes, as they actually ship.
   Pulled from the live site.css — :root for light, :root[data-theme="dark"]
   for dark. These are alias tokens: a component never references a ramp step,
   it references one of these, which is what makes the theme swap a data change
   rather than a second stylesheet. Dark is a re-map, not an inversion. */
export const THEME_TOKENS = [
  { t: "--bg", role: "Page ground", light: "#FFFFFF", dark: "#02080F" },
  { t: "--bg-alt", role: "Section ground", light: "#F4F8FC", dark: "#040D18" },
  {
    t: "--bg-inset",
    role: "Sunken surface",
    light: "#E9F0F7",
    dark: "#071729",
  },
  { t: "--ink", role: "Body text", light: "#061423", dark: "#F2F7FC" },
  { t: "--ink-2", role: "Secondary text", light: "#46586B", dark: "#AEC2D8" },
  { t: "--ink-3", role: "Muted text", light: "#72859A", dark: "#7E93AC" },
  {
    t: "--line",
    role: "Subtle border",
    light: "#E2EAF2",
    dark: "rgba(255,255,255,.09)",
  },
  {
    t: "--line-2",
    role: "Default border",
    light: "#CFDCE8",
    dark: "rgba(255,255,255,.16)",
  },
  {
    t: "--action",
    role: "Primary action",
    light: "#0B7FDB",
    dark: "#239CFF",
    note: "The contrast rule, in one row: brand blue on the dark ground, a darker step on white.",
  },
  {
    t: "--action-ink",
    role: "Text on action",
    light: "#FFFFFF",
    dark: "#02121F",
  },
  {
    t: "--accent",
    role: "Brand accent",
    light: "#E86A27",
    dark: "#E86A27",
    note: "Unchanged across themes — it is a brand colour, not a UI colour.",
  },
];

/* The rest of the contract, verbatim from the stylesheet. Radius and easing do
   not change between themes; only colour does. */
export const SHELL_TOKENS = [
  { t: "--r-btn", v: "10px", use: "Button" },
  { t: "--r-card", v: "22px", use: "Card" },
  { t: "--r-frame", v: "30px", use: "Frame, hero panel" },
  { t: "--shell", v: "1200px", use: "Max content width" },
  { t: "--font", v: "Lexend", use: "Everything" },
  { t: "--e-fast", v: "cubic-bezier(.22,.61,.36,1)", use: "Hover, focus" },
  { t: "--e-out", v: "cubic-bezier(.16,1,.3,1)", use: "Entrance" },
  { t: "--e-soft", v: "cubic-bezier(.33,1,.68,1)", use: "Layout shift" },
];
