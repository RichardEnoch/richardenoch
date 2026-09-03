// src/pages/featured/AdlmWebsite.jsx
//
// ADLM Studio — the website.
//
// SOURCE. 00-audit/CONTENT-INVENTORY.md §4 (the twenty-two findings),
// 01-ia/INFORMATION-ARCHITECTURE.md (sitemap, nav spec, five flows, page briefs,
// placeholder numbers, redirect map), and site/STATE.md. Screenshots are
// captured from the live site rather than mocked.
//
// WHAT THE PAGE HAS TO ARGUE. The earlier version led on ConstructTech and the
// dead footer links. Those are real but they are compliance bugs — they do not
// make the case for a redesign. The case is structural: an IA that mixed
// audiences with post-purchase, three overlapping learning destinations, a
// product named four different things across four surfaces, no pricing page on
// a site whose buyers decide on price, and a hierarchy that put "99.9% uptime"
// beside Rate Build-ups as a top-four selling point.
//
// It also covers three surfaces, not one: marketing, the signed-in account, and
// the ADLM admin. Omitting the last two understated the project by most of it.

import React from "react";
import PageMeta from "../../components/common/PageMeta";
import SectionToc from "../../components/common/SectionToc";
import CaseHero from "../../components/common/CaseHero";
import NextPair from "../../components/common/NextPair";
import DesignSystemFrame from "../../components/common/DesignSystemFrame";
import ScreenWheel from "../../components/common/ScreenWheel";
import LiveEmbed from "../../components/common/LiveEmbed";
import AdlmSitemap from "../../components/ProjectPage/AdlmSitemap";
import PinnedEvidence from "../../components/ProjectPage/PinnedEvidence";
import oldHome from "../../assets/ADLM/old/home.webp";
import oldProducts from "../../assets/ADLM/old/products.webp";
import oldRevit from "../../assets/ADLM/old/revit.webp";
import oldTrainings from "../../assets/ADLM/old/trainings.webp";
import oldTestimonials from "../../assets/ADLM/old/testimonials.webp";
import oldQuote from "../../assets/ADLM/old/quote.webp";
import oldCareers from "../../assets/ADLM/old/careers.webp";
import oldLearn from "../../assets/ADLM/old/learn.webp";
import oldQsTakeoff from "../../assets/ADLM/old/qstakeoff.webp";
import oldPlanswift from "../../assets/ADLM/old/planswift.webp";
import oldWhatsNew from "../../assets/ADLM/old/whatsnew.webp";
import oldPrivacy from "../../assets/ADLM/old/privacy.webp";
import oldSupport from "../../assets/ADLM/old/support.webp";
import dsThumb from "../../assets/ADLM/site/designsystem.webp";
import BuildSection from "../../components/Home/BuildSection";
import heroImg from "../../assets/ADLM/website-hero.webp";
import shotHome from "../../assets/ADLM/site/home.webp";
import shotProduct from "../../assets/ADLM/site/product.webp";
import shotPricing from "../../assets/ADLM/site/pricing.webp";
import shotSolutions from "../../assets/ADLM/site/solutions.webp";
import shotCustomers from "../../assets/ADLM/site/customers.webp";
import shotDashboard from "../../assets/ADLM/site/dashboard.webp";
import shotWork from "../../assets/ADLM/site/work.webp";
import shotAdmin from "../../assets/ADLM/site/admin.webp";
import shotCourse from "../../assets/ADLM/site/course.webp";
import shotWorkHome from "../../assets/ADLM/site/workhome.webp";
import shotQuotes from "../../assets/ADLM/site/quotations.webp";
import shotHub from "../../assets/ADLM/site/hub.webp";
import shotHowItWorks from "../../assets/ADLM/site/howitworks.webp";
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
const LIVE = "https://adlm-studio.vercel.app";

/* Grouped the way the audit grouped them, because the grouping is the argument:
   the structural failures are what justify a redesign, the broken links merely
   justify a fix. */
const FINDINGS = [
  {
    group: "Structure",
    items: [
      "The nav mixed audience-facing items with post-purchase ones and had no hierarchy — Products and Trainings sat beside Learn and What's New. There was no Pricing entry at all, on a site whose buyers decide on price.",
      "Two parallel product taxonomies. Software and courses shared one grid on /products, while courses also lived under /learn and events under /trainings — three overlapping learning destinations.",
      "No segmentation by audience, despite a training history that is heavily institutional. A solo surveyor and a fifty-seat firm were shown the same page.",
      "Pricing was monthly on one page and yearly on another, with no single place to compare. The two-months-free yearly discount was never actually stated.",
      "A homepage intro modal blocked the page before anyone could see the value proposition.",
    ],
  },
  {
    group: "Naming and hierarchy",
    items: [
      "One product had four names across four surfaces: QUIV, “QUIV for Revit”, “Revit Plugin”, and the URL /product/revit. HERON had three. Time Pro lived at /product/qs-takeoff.",
      "“99.9% Uptime” was presented as a top-four selling point beside Rate Build-ups and Take-off — infrastructure trivia competing with product value.",
      "Product detail printed its feature list twice on the same screen.",
      "Empty and error states were developer-voiced, printing raw JSON at the user.",
    ],
  },
  {
    group: "Content and proof",
    items: [
      "Numbers contradicted each other across three pages: 1,000+ professionals on the homepage, 3,103 attendees on trainings, 10,000+ customers on testimonials.",
      "The strongest proof on the site — NIQS chapters, The Big 5, NIOB, the Federal Airport Authority, thirty events — was buried in a gallery and never surfaced commercially.",
      "Marketing pages were adjective-heavy and vague while the changelog was specific and genuinely convincing. The wrong page was doing the selling.",
      "/testimonials shipped a template's brand name — “Hear from over 10,000+ satisfied customers who have transformed their construction projects with ConstructTech” — with fabricated stats beneath it, and a list that rendered “No testimonials found.”",
    ],
  },
  {
    group: "Broken and invisible",
    items: [
      "Five footer links returned 404, including Privacy and Terms — a legal and app-store prerequisite, not a UX gap.",
      "No SSR or prerender. Crawlers without JavaScript saw a title and one shared meta description; every page emitted the same OG image; /sitemap.xml returned the SPA shell.",
      "The mobile app existed and was downloadable, represented only by an unlabelled Play Store badge pointing at a Google Drive APK.",
      "An FX bug printed “≈ $2000.00 / month” for a ₦2,000 product.",
    ],
  },
];

const FLOWS = [
  {
    k: "A",
    t: "Self-serve",
    who: "RateGen, Time Pro",
    steps: [
      "Product page",
      "Pricing",
      "Create account",
      "Checkout",
      "Download the Hub",
      "Install & sign in",
      "Entitled",
    ],
    note: "Every step after checkout was absent. The confirmation now states what was bought, which account it is tied to, how to install, how many devices, and how to get help.",
  },
  {
    k: "B",
    t: "Sales-led",
    who: "QUIV, CIVIQ, Revit MEP, multi-seat",
    steps: [
      "Solutions or product",
      "Demo or quote",
      "Qualification",
      "Proposal",
      "Invoice",
      "Seats allocated",
      "Team assigns",
    ],
    note: "Heavy software needs a conversation. Qualification captures seats, tools already in use, host-app version and timeline before anyone is quoted.",
  },
  {
    k: "C",
    t: "Course purchase",
    who: "Individuals",
    steps: ["Courses", "Course detail", "Purchase", "Classroom", "Certificate"],
    note: "No software decision attached, so nothing about it should route through a sales conversation.",
  },
  {
    k: "D",
    t: "Institutional training",
    who: "NIQS chapters, universities, agencies",
    steps: ["Customers or events", "Solutions", "Enquiry", "Bespoke proposal"],
    note: "Enquiry-led and priced on scope. The proof this flow needs — thirty events, named institutions — finally sits where the buyer can see it.",
  },
  {
    k: "E",
    t: "Existing customer",
    who: "Signed in",
    steps: ["Sign in", "Account", "Renew or add seats", "Update via the Hub"],
    note: "The flow the old site had no surface for at all.",
  },
];

/* The three surfaces, as one wheel rather than six stacked frames. */
const WHEEL = [
  {
    src: shotHome,
    alt: "The rebuilt ADLM homepage",
    kicker: "6.2 — Marketing",
    title: "Structured around how people buy",
    body: "Thirty-one pages. Four audiences in priority order — firms, individual surveyors, students, institutions — and two conversion models, because ADLM sells two different things: software on a subscription and training by the seat.",
    href: LIVE,
    hrefLabel: "Open the site",
  },
  {
    src: shotProduct,
    alt: "The ADLM products page",
    kicker: "Marketing",
    title: "One template, six products",
    body: "Every product carries the same frame — outcome-led hero, capabilities, host-app compatibility, price and related learning — with the CTA matched to that product's conversion model instead of the same button everywhere.",
    href: `${LIVE}/products`,
    hrefLabel: "Open products",
  },
  {
    src: shotPricing,
    alt: "The ADLM pricing page",
    kicker: "Marketing",
    title: "The page the old site never had",
    body: "Monthly and yearly in one place, the two-months-free saving stated rather than implied, per-seat costs visible, and the quotation builder as the entry to a sales conversation instead of a substitute for a price.",
    href: `${LIVE}/pricing`,
    hrefLabel: "Open pricing",
  },
  {
    src: shotDashboard,
    alt: "The signed-in ADLM account overview",
    kicker: "6.3 — The account",
    title: "Where the spine becomes visible",
    body: "One identity carries subscriptions, entitlements and synced data; the Installer Hub delivers the software to the machine. The old site never explained this, so a buyer clicked Purchase with no model of what they would receive. Now it is a surface: what you own, which seats sit idle, what needs updating, what is due.",
    href: `${LIVE}/dash-home`,
    hrefLabel: "Open the account",
  },
  {
    src: shotHub,
    alt: "The Installer Hub, showing products and seats on the account",
    kicker: "The account · Installer Hub",
    title: "What you own, and what is idle",
    body: "Three of seven products are on this subscription. The other four are listed anyway, priced, with nothing charged until you add one — because a buyer needs to see the shape of the whole thing to know what they are inside. Seats, versions and updates all live here.",
    href: `${LIVE}/dash-products`,
    hrefLabel: "Open the Hub",
  },
  {
    src: shotWorkHome,
    alt: "Everything in hand across every ADLM product",
    kicker: "The account",
    title: "Everything in hand, in one view",
    body: "One page that answers what you are in the middle of, across every product on the account — work in hand, elements measured, priced items, how far through the learning you are, and the four things actually waiting on a decision.",
    href: `${LIVE}/work-home`,
    hrefLabel: "Open your work",
  },
  {
    src: shotWork,
    alt: "Projects and the shared rate library",
    kicker: "The account",
    title: "Where the quantities land",
    body: "Projects, the shared rate library and the programme — priced by geopolitical zone, with currency as a display layer, so one project reads correctly in six currencies without being duplicated six times.",
    href: `${LIVE}/work-projects`,
    hrefLabel: "Open projects",
  },
  {
    src: shotCourse,
    alt: "A lesson playing inside the ADLM course player",
    kicker: "The account · learning",
    title: "The training sits in the same account",
    body: "ADLM sells software and teaching, and the old site treated them as two businesses. Here a course runs beside the work: the lesson player, the week-by-week syllabus with what you have finished, the transcript, and the certificate that comes out the other end.",
    href: `${LIVE}/dash-course?c=bim&l=b4b`,
    hrefLabel: "Open a lesson",
  },
  {
    src: shotAdmin,
    alt: "The ADLM admin document composer",
    kicker: "6.4 — The admin",
    title: "The half nobody sees, that runs the rest",
    body: "Paste text or drop a file and the composer returns a firm-branded document in the house style, every block editable in place — built on one renderer shared with the product side so the two halves cannot drift apart.",
    href: `${LIVE}/admin/documents`,
    hrefLabel: "Open the composer",
  },
  {
    src: shotQuotes,
    alt: "The ADLM admin quotations queue",
    kicker: "The admin",
    title: "Where a quote becomes an invoice",
    body: "Quotes people build for themselves on the website, and the ones the sales side sends, land in one queue. One conversation, one record — not a half-finished quote sitting in somebody's inbox.",
    href: `${LIVE}/admin/quotations`,
    hrefLabel: "Open quotations",
  },
];

/* The four decisions §05 is built on. Written as found / decided / cost,
   because a decision with no cost attached is not a decision — it is a
   preference, and a reader can tell the difference. */
const DECISIONS = [
  {
    t: "Learning got one home",
    found:
      "Courses sat in the product grid, again under /learn, and events lived at /trainings. Three destinations, one question: where do I go to learn something.",
    did: "Collapsed all three into /learn, with /courses, /events and /guides beneath it. Events kept their own route because they are dated and sell differently to a course.",
    cost: "/trainings had the longest history on the site, so it redirects rather than disappearing. Fourteen redirects exist for this kind of reason.",
  },
  {
    t: "The price got published",
    found:
      "No pricing page. Monthly figures on one page, yearly only inside the quote builder, and the two-months-free saving never actually written down anywhere.",
    did: "Built a pricing page as the single source of truth, with the saving stated, and moved the quote builder underneath it.",
    cost: "Publishing a price gives up the sales conversation for smaller buyers. That is the right trade here — this audience compares against CostX and Planswift on price before it talks to anyone.",
  },
  {
    t: "One product, one name",
    found:
      "QUIV appeared as QUIV, “QUIV for Revit”, “Revit Plugin” and /product/revit. HERON had three names. Time Pro lived at /product/qs-takeoff.",
    did: "Fixed one name per product and carried it through the nav, the URL, the heading and the invoice.",
    cost: "Every old product URL had to be mapped, and the client had to give up wording they were attached to in two places.",
  },
  {
    t: "Audiences got their own routes",
    found:
      "A solo surveyor and a fifty-seat consultancy landed on the same grid, on a site whose training history is heavily institutional.",
    did: "Added /solutions with a route each for firms, individual professionals, students and institutions — and put the institutional proof where the institutional buyer actually lands.",
    cost: "Four more pages to write and keep true. Audience routing is only worth it if each route says something different, so the copy could not be templated.",
  },
];

/* Captures of the old site, one set per finding group. Every one of these is
   a screenshot of www.adlmstudio.net as it stands — the site this audit was
   written against is still live, so none of it has to be taken on trust. */
const EVIDENCE = {
  Structure: [
    {
      src: oldHome,
      route: "/",
      caption: "An intro video, before the site",
      finding:
        "A modal opened over the homepage on arrival and had to be dismissed before anything could be read. Behind it: “Trusted by 1,000+ QS professionals”, and a row of counters all reading zero.",
      alt: "The old ADLM homepage with an intro video modal covering it",
    },
    {
      src: oldProducts,
      route: "/products",
      caption: "Software and training in one grid",
      finding:
        "One page sold subscriptions and seats on a course from the same grid, with a Physical Trainings panel underneath reading “No trainings published yet” — on a company with thirty events behind it.",
      alt: "The old products page mixing software and training",
    },
    {
      src: oldLearn,
      route: "/learn",
      caption: "The second home for courses",
      finding:
        "Courses appeared here as well as in the product grid, and events lived at /trainings. Three destinations answering one question, and no way for a visitor to know which was the real one.",
      alt: "The old learn page listing courses again",
    },
    {
      src: oldQuote,
      route: "/quote",
      caption: "The only place a yearly price existed",
      finding:
        "There was no pricing page. Monthly figures sat on product pages, the yearly rate existed only inside this builder, and the two-months-free saving was never written down.",
      alt: "The old quotation builder",
    },
  ],
  "Naming and hierarchy": [
    {
      src: oldRevit,
      route: "/product/revit",
      caption: "One product, four names",
      finding:
        "The URL says revit. The heading says “QUIV: 3D Model QS Software”. The nav said “Revit Plugin”. The invoice said something else again. Four names, one product, and no way for a buyer to know that.",
      alt: "The old QUIV product page at /product/revit",
    },
    {
      src: oldQsTakeoff,
      route: "/product/qs-takeoff",
      caption: "Time Pro, living at someone else's address",
      finding:
        "The URL says qs-takeoff. The page is ADLM Time Pro, which is project management and does no take-off at all. The slug belonged to a different product and nobody had moved it.",
      alt: "The old Time Pro page served at /product/qs-takeoff",
    },
    {
      src: oldPlanswift,
      route: "/product/planswift",
      caption: "And three names for HERON",
      finding:
        "“HERON: PlanSwift / 2D Drawings QS Software” in the heading, HERON in the body, the host application in the URL. The same product answered to all three depending on where you met it.",
      alt: "The old HERON page at /product/planswift",
    },
  ],
  "Content and proof": [
    {
      src: oldTestimonials,
      route: "/testimonials",
      caption: "A competitor's name, still in the copy",
      finding:
        "The page ran on an unedited template: “10,000+ Happy Customers”, a 98% satisfaction rate nobody had measured, and a line telling visitors that leading construction companies rely on ConstructTech — a different company entirely.",
      alt: "The old testimonials page carrying template branding",
    },
    {
      src: oldTrainings,
      route: "/trainings",
      caption: "The real proof, parked on its own",
      finding:
        "Thirty events and 3,103 attendees, with named institutions and photographs — the strongest evidence on the site — on a page nothing linked to from a buying journey, while the homepage said 1,000+ and testimonials said 10,000+.",
      alt: "The old trainings gallery",
    },
    {
      src: oldWhatsNew,
      route: "/whats-new",
      caption: "The best writing, furthest from the buyer",
      finding:
        "Genuine release notes, per product, written by someone who knew the software. It sat at the far end of the nav, after About, where nobody deciding whether to buy would ever reach it.",
      alt: "The old What's New page",
    },
  ],
  "Broken and invisible": [
    {
      src: oldCareers,
      route: "/careers",
      caption: "Linked in the footer, 404 in the browser",
      finding:
        "Careers and Press were linked from every page and neither existed. A visitor following either one landed on a dead end with the company's own navigation still around it.",
      alt: "A 404 page where careers should be",
    },
    {
      src: oldPrivacy,
      route: "/privacy",
      caption: "No privacy policy on a site taking payments",
      finding:
        "Privacy, Terms and Licensing were all 404. This is not a broken-link problem — a site processing card payments and storing customer project data needs these to exist, and the footer promised they did.",
      alt: "A 404 page where the privacy policy should be",
    },
    {
      src: oldSupport,
      route: "/support",
      caption: "The footer that promised them",
      finding:
        "Every page carried a Legal column linking Privacy Policy, Terms of Service and Licensing. All three went nowhere. The links were the only evidence the pages had ever been planned.",
      alt: "The old support page, with the legal column in the footer",
    },
  ],
};

const SECTIONS = [
  { id: "start", label: "Where it started" },
  { id: "before", label: "How things were" },
  { id: "ia", label: "The architecture" },
  { id: "flows", label: "Five user flows" },
  { id: "did", label: "The decisions" },
  { id: "surfaces", label: "Three surfaces" },
  { id: "direction", label: "The direction" },
  { id: "close", label: "In closing" },
];

const SIBLINGS = [
  { to: BASE, label: "← ADLM overview" },
  { to: `${BASE}/brand`, label: "Brand identity" },
  { to: `${BASE}/design-system`, label: "Design system" },
  { to: `${BASE}/product`, label: "Product / UI-UX" },
];

export default function AdlmWebsite() {
  return (
    <div className="relative min-h-screen bg-[#07090C] font-['Outfit'] text-white">
      <PageMeta
        title="ADLM Studio — Website"
        description="A 112-route audit, a restructure around how people actually buy, five user flows, and thirty-one rebuilt pages across three surfaces — marketing, the signed-in account, and the ADLM admin."
        url="/projects/featured/adlm-studio/website"
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
          image={heroImg}
          imageAlt="Construction drawings resolving into a built structure"
          badge="ADLM Studio · Website"
          title="Six products, and no way to tell them apart."
          lead="A site selling six products across three surfaces, structured so that nobody could tell which product was which, what a licence included, or how the software would reach their machine."
          focus="58% center"
          meta={[
            { label: "Audited", value: "112 routes · 22 findings" },
            {
              label: "Restructured",
              value: "16 new · 4 merged · 14 redirects",
            },
            { label: "Built", value: "31 pages, three surfaces" },
            { label: "Broken links after", value: "Zero" },
          ]}
        />

        {/* ── preview + live link ── */}
        <Section id="start" width="bleed" first>
          {/* The site itself, running. A screenshot proves it was designed;
              an embed proves it works. */}
          <RiseMedia className="mb-16">
            <LiveEmbed
              src={LIVE}
              poster={shotHome}
              title="ADLM Studio"
              openLabel="Open the full site"
            />
          </RiseMedia>

          <Prose>
            <Rise>
              <SLabel n="01" t="Where it started" />
              <SHead
                white="Built by a developer,"
                accent="not by a designer."
                className="mb-6 max-w-[22ch]"
              />
              <p className="mb-5 text-[16px] leading-[1.75] text-white/60">
                The brief was to redesign the website, then the digital
                products. The site loaded, and in the narrow sense it worked —
                but it did not communicate the offer, and it had been assembled
                rather than designed. Visual hierarchy was arbitrary, the colour
                bore little relationship to the brand's own values, and the
                structure had grown by accretion around a business that had
                changed underneath it.
              </p>
              <p className="text-[16px] leading-[1.75] text-white/60">
                The agreed sequence put discovery first — scout, then
                information architecture and user flows, then the design system,
                then pages. Nothing was designed until the audit came back,
                which turned out to matter more than expected.
              </p>
            </Rise>
          </Prose>
        </Section>

        {/* ── 02 how things were ── */}
        <Section id="before" width="narrow">
          <Rise>
            <SLabel n="02" t="How things were" />
            <SHead
              white="Twenty-two findings,"
              accent="four of them structural."
              className="mb-6 max-w-[26ch]"
            />
            <Prose className="mb-14">
              <p className="text-[16px] leading-[1.75] text-white/55">
                The site was a client-rendered app, so reading it meant
                rendering every route rather than fetching it — which was itself
                the first finding. What came back was not a list of bugs. It was
                a structure that could not do the job it was built for.
              </p>
            </Prose>
          </Rise>

          <div className="space-y-12">
            {FINDINGS.map((f, gi) => (
              <Rise key={f.group}>
                <div className="grid gap-x-10 gap-y-5 border-t border-white/8 pt-8 lg:grid-cols-[minmax(0,200px)_minmax(0,1fr)]">
                  <div>
                    <span
                      className="mb-2 block text-[11px] font-semibold tabular-nums"
                      style={{ color: G }}
                    >
                      {String(gi + 1).padStart(2, "0")}
                    </span>
                    <h3 className="type-h3 text-white">{f.group}</h3>
                    {EVIDENCE[f.group] && (
                      <div className="mt-7 hidden lg:block">
                        <PinnedEvidence items={EVIDENCE[f.group]} />
                      </div>
                    )}
                  </div>
                  <ul className="m-0 list-none space-y-4 p-0">
                    {f.items.map((it, i) => (
                      <li
                        key={i}
                        className="border-l-2 border-white/10 pl-5 text-[15px] leading-[1.7] text-white/55"
                      >
                        {it}
                      </li>
                    ))}
                  </ul>
                  {EVIDENCE[f.group] && (
                    <div className="lg:hidden">
                      <PinnedEvidence items={EVIDENCE[f.group]} />
                    </div>
                  )}
                </div>
              </Rise>
            ))}
          </div>
        </Section>

        {/* ── 03 IA ── */}
        <Section id="ia" width="narrow">
          <Rise>
            <SLabel n="03" t="The architecture" />
            <SHead
              white="One insight decided"
              accent="the whole structure."
              className="mb-6 max-w-[24ch]"
            />
          </Rise>

          <div className="mb-12 grid gap-10 lg:grid-cols-2 lg:gap-16">
            <Rise>
              <p className="mb-5 text-[16px] leading-[1.75] text-white/60">
                The ADLM Account and the Installer Hub are the spine of the
                business. One identity signs into every product, carries
                subscriptions and entitlements, syncs project data, and delivers
                and updates the software. The site never said so.
              </p>
              <p className="text-[16px] leading-[1.75] text-white/60">
                The mobile app completes that spine. Drawings need a PC — but
                once quantities are extracted, adjusting cost data, reviewing
                rates and checking a budget do not. That split is a genuine
                differentiator and it was invisible.
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
                  So it appears in three places
                </p>
                <ol className="m-0 list-none space-y-4 p-0">
                  {[
                    "A How ADLM works page in the Products menu, diagram-led.",
                    "A post-purchase step built into every self-serve flow.",
                    "An account and entitlement surface after sign-in.",
                  ].map((s, i) => (
                    <li
                      key={i}
                      className="flex gap-4 text-[15px] leading-[1.6] text-white/70"
                    >
                      <span
                        className="shrink-0 font-semibold tabular-nums"
                        style={{ color: G }}
                      >
                        {i + 1}
                      </span>
                      {s}
                    </li>
                  ))}
                </ol>
              </div>
            </Rise>
          </div>

          <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                n: "16",
                t: "New pages, including Pricing, Solutions, Customers and Compare",
              },
              {
                n: "4",
                t: "Merged or removed — three learning destinations became one",
              },
              { n: "14", t: "Redirects, so no existing link dies" },
              { n: "5", t: "Legal and company 404s turned into real pages" },
            ].map((s) => (
              <StaggerItem key={s.t}>
                <div
                  className="border-l-2 pl-5"
                  style={{ borderColor: `${G}44` }}
                >
                  <b
                    className="mb-2 block text-[clamp(28px,3.2vw,38px)] font-semibold leading-none tabular-nums tracking-tight"
                    style={{ color: G }}
                  >
                    {s.n}
                  </b>
                  <span className="block text-[14.5px] leading-[1.5] text-white/50">
                    {s.t}
                  </span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          {/* The insight, made into a page. The section argues that the account
              and the Installer Hub are the spine and that the old site never
              said so; this is where it now says so. */}
          <RiseMedia delay={0.06}>
            <figure className="m-0 mt-12">
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#04101F]">
                <img
                  src={shotHowItWorks}
                  alt="The How ADLM works page, showing the four steps from account to measurement"
                  loading="lazy"
                  className="block w-full"
                />
              </div>
              <figcaption className="mt-3.5 text-[14px] leading-[1.6] text-white/35">
                /how-it-works — the first of the three places the spine now
                appears. Account, Installer Hub, host application, phone, in the
                order a buyer meets them.
              </figcaption>
            </figure>
          </RiseMedia>
        </Section>

        {/* ── 04 flows ── */}
        <Section id="flows" width="bleed">
          <Prose className="mb-14">
            <Rise>
              <SLabel n="04" t="Five user flows" />
              <SHead
                white="Two ways to buy,"
                accent="because there are two products."
                className="mb-6 max-w-[26ch]"
              />
              <p className="text-[16px] leading-[1.75] text-white/55">
                Heavy multi-seat software needs a conversation. Low-cost tools
                and courses should never need one. Splitting the conversion
                model is what let both stop getting in each other's way — and
                every flow now ends in an ADLM account, because that is where
                the business actually lives.
              </p>
            </Rise>
          </Prose>

          <div className="space-y-4">
            {FLOWS.map((f) => (
              <Rise key={f.k}>
                <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-7 sm:p-8">
                  <div className="mb-6 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <span
                      className="rounded-md px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em]"
                      style={{
                        color: G,
                        background: `${G}12`,
                        border: `1px solid ${G}33`,
                      }}
                    >
                      Flow {f.k}
                    </span>
                    <h3 className="type-h2 text-white">{f.t}</h3>
                    <span className="text-[14.5px] text-white/40">{f.who}</span>
                  </div>

                  <ol className="mb-5 flex list-none flex-wrap items-center gap-x-2 gap-y-3 p-0">
                    {f.steps.map((s, i) => (
                      <li key={s} className="flex items-center gap-2">
                        <span className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-[14px] text-white/70">
                          {s}
                        </span>
                        {i < f.steps.length - 1 && (
                          <span aria-hidden="true" className="text-white/20">
                            →
                          </span>
                        )}
                      </li>
                    ))}
                  </ol>

                  <p className="max-w-[80ch] text-[14.5px] leading-[1.7] text-white/45">
                    {f.note}
                  </p>
                </div>
              </Rise>
            ))}
          </div>
        </Section>

        {/* ── 05 the decisions ── */}
        {/* This section used to lead with a statistic — how a wrong number on
            three pages became one defensible number. True, and the least
            interesting thing on the page. What a reader is actually here for is
            the reasoning: what was decided, why, and what it cost. The number
            survives as a footnote, where it belongs. */}
        <Section id="did" width="narrow">
          <Rise>
            <SLabel n="05" t="The decisions" />
            <SHead
              white="Four calls that"
              accent="shaped the rest."
              className="mb-6 max-w-[20ch]"
            />
            <Prose className="mb-12">
              <p className="text-[16px] leading-[1.75] text-white/55">
                An audit that ends in a document changes nothing. These are the
                four decisions the rebuild actually turned on — each one with
                the reason behind it, and what it cost to take.
              </p>
            </Prose>
          </Rise>

          <div className="space-y-5">
            {DECISIONS.map((d, i) => (
              <Rise key={d.t} delay={i * 0.05}>
                <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-7 sm:p-9">
                  <div className="mb-5 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <span
                      className="text-[12px] font-bold tabular-nums"
                      style={{
                        color: G,
                        fontFamily: "ui-monospace, monospace",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="type-h2 text-white">{d.t}</h3>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-3">
                    <div>
                      <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#C2603A]">
                        What I found
                      </p>
                      <p className="text-[14.5px] leading-[1.7] text-white/50">
                        {d.found}
                      </p>
                    </div>
                    <div>
                      <p
                        className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em]"
                        style={{ color: G }}
                      >
                        What I decided
                      </p>
                      <p className="text-[14.5px] leading-[1.7] text-white/70">
                        {d.did}
                      </p>
                    </div>
                    <div>
                      <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/30">
                        What it cost
                      </p>
                      <p className="text-[14.5px] leading-[1.7] text-white/45">
                        {d.cost}
                      </p>
                    </div>
                  </div>
                </div>
              </Rise>
            ))}
          </div>

          <Rise>
            <p className="mt-8 max-w-[76ch] text-[14.5px] leading-[1.7] text-white/35">
              One housekeeping note, since it comes up. Three pages carried
              three different attendance figures and none of them held up.
              ADLM's own event records showed thirty events and 3,103 attendees,
              so the site now says 3,100+ and can prove it. Every other invented
              statistic came out rather than being reworded, and anything still
              unverified is marked in the IA as a placeholder waiting on the
              client.
            </p>
          </Rise>
        </Section>

        {/* ── 06 three surfaces ── */}
        {/* ── 06 three surfaces — the IA leads, then the three things it
            describes, each in one desktop viewport rather than a full-page
            scroll. ── */}
        <Section id="surfaces" width="bleed">
          <Prose className="mb-14">
            <Rise>
              <SLabel n="06" t="Three surfaces" />
              <SHead
                white="The website is"
                accent="the smallest part."
                className="mb-6 max-w-[22ch]"
              />
              <p className="text-[16px] leading-[1.75] text-white/55">
                The audit found 112 routes: roughly fifteen public marketing
                pages, an authenticated application, and about forty admin
                screens. The rebuild covers all three.
              </p>
            </Rise>
          </Prose>

          {/* 6.1 — the architecture, drawn */}
          <div className="mb-16">
            <Prose className="mb-8">
              <Rise>
                <p className="type-eyebrow mb-4" style={{ color: G }}>
                  6.1 — Information architecture
                </p>
                <h3 className="type-h1 mb-5 max-w-[24ch] text-white">
                  Fifteen routes that grew, against a structure that was decided
                </h3>
                <p className="text-[15.5px] leading-[1.75] text-white/55">
                  Sixteen new pages, four merged or removed, fourteen redirects
                  so no existing link dies. Three overlapping learning
                  destinations became one, pricing got a home, and every
                  audience got a route written for them rather than a shared
                  grid.
                </p>
              </Rise>
            </Prose>
            <Rise>
              <AdlmSitemap />
            </Rise>
          </div>

          {/* 6.2 – 6.4 — the surfaces themselves, on the wheel */}
          <Prose className="mb-8">
            <Rise>
              <p className="type-eyebrow mb-4" style={{ color: G }}>
                6.2 — The surfaces
              </p>
              <h3 className="type-h1 mb-5 max-w-[26ch] text-white">
                Six screens, one at a time
              </h3>
              <p className="text-[15.5px] leading-[1.75] text-white/55">
                Marketing, the signed-in account and the admin, each in a real
                desktop viewport. Scroll to turn the wheel.
              </p>
            </Rise>
          </Prose>
        </Section>

        <ScreenWheel items={WHEEL} />

        <DesignSystemFrame to={`${BASE}/design-system`} previewSrc={dsThumb} />

        {/* ── 07 direction ── */}
        <Section id="direction" width="bleed">
          <Prose className="mb-12">
            <Rise>
              <SLabel n="07" t="The direction" />
              <SHead
                white="Evidence,"
                accent="not illustration."
                className="mb-6 max-w-[20ch]"
              />
              <p className="text-[16px] leading-[1.75] text-white/55">
                The site's signature asset is the product itself. No metaphors,
                no invented graphic language standing in for what the software
                does — every visual claim is carried by a real interface.
              </p>
            </Rise>
          </Prose>

          {/* The rule, stated as a rule, then shown working. Asserting a
              principle and then showing two pretty pages does not demonstrate
              anything; the test is whether a reader can apply it. */}
          <Rise>
            <div
              className="mb-12 grid gap-px overflow-hidden rounded-2xl border md:grid-cols-2"
              style={{ borderColor: `${G}30`, background: `${G}20` }}
            >
              <div className="bg-[#0A0D12] p-8 sm:p-10">
                <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C2603A]">
                  What most sites do
                </p>
                <p className="mb-5 text-[15.5px] leading-[1.7] text-white/60">
                  Copy says <em>“budgets that balance to your rate”</em>. The
                  image is a generic chart, a glow field, or a stock photograph
                  of a hard hat.
                </p>
                <p className="text-[14.5px] leading-[1.65] text-white/40">
                  It fills the space where a product should be. Every reference
                  site in this category does some version of it — which is
                  usually a sign there is nothing worth showing.
                </p>
              </div>
              <div className="bg-[#0A0D12] p-8 sm:p-10">
                <p
                  className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em]"
                  style={{ color: G }}
                >
                  What this one does
                </p>
                <p className="mb-5 text-[15.5px] leading-[1.7] text-white/70">
                  The image is the budget row, with the balancing line visible.
                  If the claim cannot be shown, the claim is wrong — so the rule
                  edits the copy as often as it edits the picture.
                </p>
                <p className="text-[14.5px] leading-[1.65] text-white/45">
                  ADLM has six real interfaces. Using them is both the honest
                  option and the distinctive one.
                </p>
              </div>
            </div>
          </Rise>

          <Stagger className="grid gap-5 md:grid-cols-2">
            {[
              {
                src: shotSolutions,
                label:
                  "Solutions — the problem named before the product is offered",
              },
              {
                src: shotCustomers,
                label:
                  "Customers — where the institutional record finally sells",
              },
            ].map((x) => (
              <StaggerItem key={x.label}>
                <div className="overflow-hidden rounded-2xl border border-white/8">
                  <img
                    src={x.src}
                    alt={x.label}
                    loading="lazy"
                    className="block w-full"
                  />
                </div>
                <p className="mt-3 text-[14.5px] text-white/40">{x.label}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </Section>

        {/* ── the close ── */}
        {/* A case study that stops on its last screenshot leaves the reader to
            work out what the point was. This says it, plainly, and admits the
            part that is not finished. */}
        <Section id="close" width="narrow">
          <Rise>
            <SLabel n="08" t="In closing" />
            <div className="max-w-[72ch]">
              <p className="mb-6 text-[19px] leading-[1.65] text-white/75">
                The old site was not badly designed. It was designed once, for a
                smaller company, and then asked to carry six products, two
                business models and four audiences it was never drawn for.
              </p>
              <p className="mb-6 text-[16.5px] leading-[1.8] text-white/55">
                Almost none of the work was decoration. It was deciding that
                learning had one home instead of three; that a price is
                something you publish rather than something you ask for; that a
                product is called the same thing in the nav, the URL, the
                heading and the invoice. Most of the 112 routes changed because
                one of those decisions reached them, not because they needed a
                new look.
              </p>
              <p className="mb-6 text-[16.5px] leading-[1.8] text-white/55">
                What I would claim for it is narrow and checkable: the legal
                pages exist, the pricing page exists, every audience has a route
                written for them, the fourteen redirects mean no existing link
                dies, and a buyer can now see what they are buying and how it
                reaches their machine. What I would not claim is a number I have
                not been given. The site is live; the figures it will eventually
                produce belong to ADLM, and when they arrive they will be worth
                more than anything I could estimate here.
              </p>
              <p className="text-[16.5px] leading-[1.8] text-white/45">
                The design system underneath it is the part that outlasts the
                launch — the same tokens and components run the marketing site,
                the account and the admin, so the next thirty pages cost a
                fraction of the first thirty.
              </p>
            </div>
          </Rise>
        </Section>

        <NextPair
          inProject={{
            to: `${BASE}/product`,
            title: "The product suite",
            blurb:
              "Six tools, one account, and the workflow the website exists to sell.",
          }}
          inCategory={{
            to: "/website-design",
            title: "More website work",
            blurb: "Other sites, other briefs — the websites index.",
          }}
        />

        <Blend />

        <BuildSection />
        <div className="h-16 lg:hidden" />
      </div>
    </div>
  );
}
