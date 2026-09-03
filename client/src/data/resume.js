// src/data/resume.js
//
// The CV, as data.
//
// There are three resume variants on disk (brand, product, multidisciplinary)
// and they had drifted from the site — the site said one thing about the years,
// the CV said another, and neither pointed at the other. This file is the
// single copy the site renders, taken from
// `Reni/resumes/Richard_Enoch_Multidisciplinary_Designer.md`.
//
// Rule for editing: nothing goes in here that isn't already true on the CV.
// If a claim can't be checked against a shipped thing, it doesn't get a number.

export const PROFILE = {
  name: "Richard Enoch Adesiyan",
  title: "Multidisciplinary Designer — Brand & Product",
  location: "Lagos, Nigeria · works remote",
  email: "enochrichard6@gmail.com",
  phone: "+234 903 852 2066",
  linkedin: "https://www.linkedin.com/in/richardenoch/",
  site: "richardenoch.vercel.app",
};

/* The years line, settled once so every surface says the same thing.
   Brand identity from 2020; product design from 2023. */
export const YEARS_LINE = "Six years in design, three of them in product.";

export const SUMMARY = [
  "I design brand identities and the products they end up living inside. Six years in design, three of them in product, across fintech, publishing, interiors, professional bodies and construction technology.",
  "The belief underneath all of it is simple: design exists to solve a problem. If the problem is not solved then the work is not done, however much of it there is and however good it looks.",
  "That is also why the range is as wide as it is. A brand job would need a website; a social campaign would need a deck; a deck would need motion. Each time I learned the next thing rather than hand the client on — and each one made the ones I already had sharper. It means I can take a problem from the first question to the thing that ships without a handover in the middle.",
  "I am a trained Quantity Surveyor, which is why the construction-technology work reads the way it does — I already know what the user is trying to do before they explain it. And I build what I design. This site is mine, front to back.",
];

/* Every entry carries an honest state. No metric appears unless it can be
   pointed at. */
export const SELECTED_WORK = [
  {
    id: "niqs",
    name: "NIQS",
    kind: "Brand · Platform",
    state: "Live and in use",
    to: "/ui-projects/niqs",
    body: "Brand strategy and a full redesign for the Nigerian Institute of Quantity Surveyors — a fifty-six-year-old professional body. Guideline system, stationery, environmental and ceremonial applications, then the website, member portal, admin dashboard and role-based access model. The self-serve template library took a standing designer dependency out of weekly chapter communications.",
  },
  {
    id: "ydpay",
    name: "YDPay",
    kind: "Brand · Product · Campaign",
    state: "Brand adopted · app not yet",
    to: "/ui-projects/ydpay-mobile-redesign",
    body: "Built the brand from nothing — typographic voice, colour framework, guideline, touchpoints — and redesigned the product end to end: 96 screens across 14 flows on a token-based system, plus SpinPop, a gamification layer with its own wallet and lobby. Then the motion work and the full tournament campaign. The brand system was adopted and is in use; the app redesign has not been taken into build yet.",
  },
  {
    id: "adlm",
    name: "ADLM Studio",
    kind: "Brand · Design system · Website · Product suite",
    state: "Live and selling",
    body: "A construction-technology company with six products and no way to tell them apart. Audited 112 routes of the legacy site, rebuilt the information architecture around who was actually visiting, wrote the design system, and designed the marketing site, dashboard, admin surfaces and product UI on top of it. QUIV — a BIM-powered take-off tool taken from market research to v4 — is one of the products inside that suite.",
  },
  {
    id: "identities",
    name: "Verde Luxe · Tab Studio · Cleanstead",
    kind: "Brand identity",
    state: "Delivered",
    to: "/brand-identity",
    body: "Three complete identity systems, each solving a different problem. Verde Luxe needed luxury that was felt rather than announced, so the mark came out of architectural floor plans. Cleanstead needed the opposite — a wordmark and the discipline to leave it alone. All three carried out to signage, environmental, packaging, livery, stationery, apparel and campaign.",
  },
  {
    id: "bookrion",
    name: "BookRion",
    kind: "Brand identity",
    state: "Delivered",
    to: "/projects/book-rion",
    body: "Identity system for an Africa-focused book platform — typography, colour and the visual assets around them, built alongside the product work. Only the identity appears here; the product was later rebuilt by another team.",
  },
  {
    id: "selfinitiated",
    name: "Savedup · Snotes",
    kind: "Product design",
    state: "Self-initiated",
    to: "/product-design",
    body: "My own briefs, taken from competitor analysis through to designed product. Nobody commissioned them; I wanted to find out whether I could frame the problem as well as solve it.",
  },
];

export const EXPERIENCE = [
  {
    id: "ydpay",
    company: "YDPay",
    role: "Creative Designer (Multidisciplinary)",
    period: "Feb 2026 – Jun 2026",
    meta: "Contract · Remote",
    points: [
      "Owned the visual language across every customer-facing surface — UI/UX, product, brand, social, motion, print and publication.",
      "Delivered a full product redesign: 96 screens, 14 flows, new onboarding, wallet and game surfaces, all on a documented token system.",
      "Designed SpinPop and the referral dashboard on a custom typographic and colour framework.",
      "Produced the motion work and the whole YDPay × AFC Free Fire Tournament campaign, which took the brand into gaming communities it had not reached.",
      "Ran AI-assisted workflows — Claude Code, Figma MCPs, Magic UI — to get from idea to a clickable thing faster.",
    ],
  },
  {
    id: "whitespace",
    company: "Whitespace Creatorverse",
    role: "Creative Designer",
    period: "Feb 2026 – Jun 2026",
    meta: "Contract · Remote",
    points: [
      "Brand identity, UI/UX, web and content design for fintech, wellness and creator-economy clients.",
      "Turned briefs and strategy into logo systems, typography, colour frameworks and full guideline documents.",
      "Designed responsive sites alongside developers and strategists, and held the craft together through handoff.",
    ],
  },
  {
    id: "bookrion",
    company: "Book Rion",
    role: "UI/UX & Brand Designer",
    period: "Jul 2025 – Mar 2026",
    meta: "Remote",
    points: [
      "Built and ran the brand identity system — typography, colour, visual assets — alongside the product work.",
      "Designed the interface patterns across three surfaces so they read as one product rather than three.",
      "Turned business goals and user research into wireframes, prototypes and high-fidelity screens, including the Community and Book Clubs experience.",
      "Ran usability sessions and designed to WCAG standards.",
    ],
    /* The product and website were later rebuilt by another team and I hold no
       showcase rights, so only the identity work appears in the portfolio. */
    note: "Brand identity only in the portfolio — the product was later rebuilt by another team.",
  },
  {
    id: "adlm",
    company: "ADLM Studio",
    role: "Creative Lead",
    period: "Feb 2022 – Present",
    meta: "Lagos, Nigeria",
    points: [
      "Lead creative direction across brand identity, product UI, marketing collateral and client deliverables.",
      "Set and maintain the studio design standards, brand guidelines and component libraries.",
      "Lead product design for QUIV from concept through v3 → v4, off the back of primary market research.",
      "Built an AI-integrated design workflow from scratch — Claude Code, Figma and Magic UI MCPs, a Figma to HTML and back loop deployed to Vercel.",
      "Work directly with engineers so design intent survives implementation, which cuts the rework.",
    ],
  },
];

export const SKILLS = [
  {
    group: "Brand",
    items: [
      "Visual identity systems",
      "Logo and mark design",
      "Typographic voice",
      "Colour frameworks",
      "Guideline documents",
      "Art direction",
      "Brand governance and template systems",
    ],
  },
  {
    group: "Product",
    items: [
      "User research",
      "Problem framing",
      "Competitive analysis",
      "Journey mapping",
      "Information architecture",
      "User flows",
      "Wireframing and prototyping",
      "Usability testing",
      "Accessibility (WCAG)",
      "Design tokens and component libraries",
    ],
  },
  {
    group: "On demand",
    items: [
      "Motion design",
      "Campaign and social systems",
      "Print and publication",
      "Editorial layout",
      "Packaging",
      "Environmental and signage",
      "Pitch decks and company profiles",
      "Book covers",
      "Landing pages",
    ],
  },
  {
    group: "Tools",
    items: [
      "Figma",
      "FigJam",
      "Illustrator",
      "Photoshop",
      "InDesign",
      "Canva",
      "Miro",
    ],
  },
  {
    group: "AI-integrated design",
    items: [
      "Claude Code",
      "Figma MCP",
      "Magic UI MCP",
      "AI-assisted prototyping",
      "Design-to-code workflows",
    ],
  },
  {
    group: "Engineering literacy",
    items: [
      "HTML / CSS",
      "React front-end",
      "Figma-to-code roundtripping",
      "Vercel deployment",
      "Handoff documentation",
    ],
  },
];

export const CERTIFICATIONS = [
  "Google UX Design Professional Certificate",
  "Product Design Certification — Creative Ferry",
  "Perxels Design School",
  "Logo Design Masterclass — Quality Studio",
  "Graphic Design Masterclass — Udemy",
];

/* Newest first. `note` is optional — only the QS degree needs explaining,
   because it is the reason the construction-technology work reads the way it
   does. */
export const EDUCATION = [
  {
    degree: "MBA, Marketing specialisation",
    school: "Miva Open University",
    year: "In view · began May 2026",
  },
  {
    degree: "BSc. Quantity Surveying",
    school: "Obafemi Awolowo University, Osun, Nigeria",
    year: "2024",
    note: "The degree is the reason the construction-technology work goes as deep as it does. I have stood on the other side of these tools.",
  },
];
