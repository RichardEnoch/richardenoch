// src/pages/BrandIdentity.jsx — the brand identity discipline page.
//
// Sourced across the identity work rather than any single project: NIQS,
// Verde Luxe, Cleanstead, Tab Studio, YDPay and ADLM. The research rows come
// from Richard's own account of each job — see the interview notes — and no
// row is here unless the finding changed a decision.

import React from "react";
import DisciplineLanding from "../components/common/DisciplineLanding";

/* Six pieces of the identity work, one per client named in the research rows
   below, so the page shows the systems before it argues about them. The spans
   tessellate: 5+4+3 across the top with the 4 split into two stacked halves,
   then 7+5 underneath — no gaps, no ragged edge at the bottom. */
import gNiqs from "../assets/NIQS/guideline/g17.webp";
import gVerde from "../assets/VerdeLuxe/hero.webp";
import gClean from "../assets/Cleanstead/van.webp";
import gYdpay from "../assets/YDpay/brand-screens/billboard.webp";
import gAdlm from "../assets/ADLM/brand/evo-3.webp";
import gTab from "../assets/TabStudio/building-wall.webp";

const GALLERY = [
  {
    src: gNiqs,
    alt: "NIQS — the four official logo configurations, from the 60-page guideline",
    mobile: "col-span-2 aspect-[16/10]",
    cell: "col-span-2 lg:col-span-5 lg:row-span-10",
  },
  {
    src: gVerde,
    alt: "Verde Luxe — a mark drawn from the language of open floor plans",
    cell: "lg:col-span-4 lg:row-span-5",
  },
  {
    src: gClean,
    alt: "Cleanstead — the wordmark on livery, where restraint had to hold up at speed",
    cell: "lg:col-span-4 lg:row-span-5",
  },
  {
    src: gAdlm,
    alt: "ADLM Studio — one icon holding two meanings",
    mobile: "col-span-2 aspect-[16/10]",
    fit: "contain",
    cell: "lg:col-span-3 lg:row-span-10",
  },
  {
    src: gYdpay,
    alt: "YDPay — the identity at billboard scale",
    mobile: "col-span-2 aspect-[16/9]",
    cell: "col-span-2 lg:col-span-7 lg:row-span-6",
  },
  {
    src: gTab,
    alt: "Tab Studio — the mark carried onto a building wall",
    mobile: "col-span-2 aspect-[16/9]",
    cell: "col-span-2 lg:col-span-5 lg:row-span-6",
  },
];

const METHOD = [
  {
    n: "01",
    title: "Understand the brief",
    body: "Then ask what it left out. Verde Luxe asked for luxury — a word thrown around until it means nothing. The real brief underneath was to make something that felt refined instead of being labelled refined.",
  },
  {
    n: "02",
    title: "Research",
    body: "What already exists, what the competition looks like, what the audience already recognises, and the client's own back catalogue. Sometimes the answer is in a completely different discipline — the Verde Luxe mark came out of reading architectural floor plans.",
  },
  {
    n: "03",
    title: "Sketch, draft, map",
    body: "The messy part, on paper first. Most of it gets thrown away. What survives is usually one idea held properly rather than five variations of the same thought.",
  },
  {
    n: "04",
    title: "Take it all the way out",
    body: "Signage, packaging, livery, stationery, apparel, campaign — and a guideline someone who is not a designer can actually work from. A system that only I can run is not finished.",
  },
];

const RESEARCH = {
  intro:
    "Mostly desk research, and I will say so plainly: reference sweeps, competitor teardowns, reading a client's own back catalogue, and — where the sector is one I trained in — first-hand knowledge of the trade. It is not ethnography. It is enough to make a decision I can defend, and every row below changed one.",
  cases: [
    {
      project: "NIQS — Nigerian Institute of Quantity Surveyors",
      question: "How much of the NIQS mark are we allowed to touch?",
      where:
        "Fifty-six years of the institute's own material, and how members talk about the mark.",
      found:
        "The heraldic eagle, the shield, the navy and the gold carry real recognition. Members identify the mark across a room.",
      changed:
        "The mark stayed. The redesign rebuilt the system around it — stewardship, not a rebrand.",
    },
    {
      project: "Verde Luxe — interiors",
      question:
        "How do you make an interiors brand feel refined rather than just say it is?",
      where:
        "Architectural floor plans, and the client's own two-sided business — they design interiors and they sell interior products.",
      found:
        "Open floor plans read as clean walls with gaps where the doors are. Spatial, calm, considered — the exact register the brand was reaching for.",
      changed:
        "Verde Luxe's mark was built from that language: walls forming a defined space with an opening, a doorway you are invited through. Deep emerald followed, and the rest of the palette followed the green.",
    },
    {
      project: "Cleanstead — cleaning and property care",
      question: "How much identity does a cleaning service actually need?",
      where:
        "What Cleanstead does day to day, and what a customer handing over their keys needs to feel.",
      found:
        "Not much tension to design against — and that was worth saying plainly. A clean service does not need a clever loaded mark. It needs to feel tidy and sure of itself.",
      changed:
        "The whole identity stayed a wordmark and grew outward from it. Restraint was the idea, because it matches what the company actually does.",
    },
    {
      project: "NIQS — chapter communications",
      question:
        "Why does every chapter communication come through a designer first?",
      where:
        "The weekly request flow at NIQS, and what was actually asked for.",
      found:
        "The same handful of formats, over and over, with only the copy and the date changing.",
      changed:
        "A self-serve template library. The standing designer dependency came out of the weekly cycle entirely.",
    },
  ],
};

const BrandIdentity = () => (
  <DisciplineLanding
    meta={{
      title: "Brand Identity",
      description:
        "Brand identity design by Richard Enoch — identity systems for a national institute, an interiors company, a fintech, a cleaning service and a construction-technology studio, carried through to signage, packaging and livery.",
      url: "/brand-identity",
    }}
    accent="#a3e635"
    eyebrow="Brand identity"
    headline="Marks that hold up off the screen."
    standfirst="Identity is where I started and it is still the work I am hardest to talk out of. Not a logo and a colour palette — the whole system, taken far enough that someone who has never met me can produce on-brand material without asking permission."
    years="Six years in brand identity. Systems delivered for a national professional body, an interiors company, a crypto fintech, a cleaning service, a design studio and a construction-technology company — carried out to signage, packaging, vehicle livery, apparel and campaign."
    gallery={GALLERY}
    method={METHOD}
    research={RESEARCH}
    tab="Brand Identity Designs"
    gridNote="Each of these is a full system rather than a mark on its own. Every card states what happened to the project — delivered, in use, or delivered and not yet taken up."
    crossLink={{
      to: "/product-design",
      label: "Product design",
      blurb:
        "Flows, information architecture and design systems — the other half of the practice, and where most of my time goes now.",
    }}
  />
);

export default BrandIdentity;
