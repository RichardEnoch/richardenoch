// src/components/Home/TwoDoors.jsx
//
// The fork, placed immediately under the hero.
//
// Two kinds of people land on this site and they want opposite things. A
// client wants to know what it costs and how to start. A hiring manager wants
// to know whether the work is any good and whether the person behind it can
// reason. The old homepage answered only the first — the whole page was a
// service menu, and a recruiter had to scroll past six pricing-shaped cards
// before reaching anything resembling a case study.
//
// So the site asks once, at the top, and then gets out of the way. Neither
// door is the "real" one; both are labelled in the reader's own words rather
// than in mine.

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import TiltCard from "../common/TiltCard";

const G = "#a3e635";
const EASE = [0.22, 0.61, 0.36, 1];

const DOORS = [
  {
    id: "hire",
    eyebrow: "You are hiring",
    title: "Look at the work, then the résumé",
    body: "Six years in design, three of them in product. Identity systems for a national institute, a fintech, an interiors company and a cleaning service — and the products they end up living inside. Every case says plainly whether it shipped.",
    primary: { to: "/resume", label: "Read the résumé" },
    secondary: { to: "/projects", label: "Browse the case studies" },
    accent: G,
  },
  {
    id: "work",
    eyebrow: "You have a project",
    title: "See what it costs, then start it",
    body: "Brand identity, product UI, websites, campaign and print. Rates are published, so the first conversation can be about the work instead of the number.",
    primary: { to: "/rate-details", label: "See the rates" },
    secondary: { to: "/contact", label: "Tell me about it" },
    accent: "#22d3ee",
  },
];

const Arrow = () => (
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
);

const Door = ({ door, i }) => (
  <motion.div
    initial={{ opacity: 0, y: 22 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.6, ease: EASE, delay: i * 0.1 }}
    className="h-full"
  >
    <TiltCard className="h-full" max={4}>
      <div className="sheen flex h-full flex-col rounded-2xl border border-white/8 bg-white/[0.025] p-7 backdrop-blur-sm transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.05] sm:p-9">
        <p
          className="text-[11px] font-bold uppercase tracking-[0.2em]"
          style={{ color: door.accent }}
        >
          {door.eyebrow}
        </p>

        <h3 className="mt-4 font-['Outfit'] text-[26px] font-semibold leading-[1.15] tracking-[-0.03em] text-white sm:text-[30px]">
          {door.title}
        </h3>

        <p className="mt-3 max-w-[44ch] text-[14.5px] leading-[1.7] text-white/50">
          {door.body}
        </p>

        <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-8">
          <Link
            to={door.primary.to}
            className="group/link inline-flex items-center gap-2 text-[14.5px] font-semibold text-white transition-colors"
            style={{ color: door.accent }}
          >
            {door.primary.label}
            <span className="transition-transform duration-300 group-hover/link:translate-x-1">
              <Arrow />
            </span>
          </Link>
          <Link
            to={door.secondary.to}
            className="text-[14px] text-white/40 underline-offset-4 transition-colors hover:text-white hover:underline"
          >
            {door.secondary.label}
          </Link>
        </div>
      </div>
    </TiltCard>
  </motion.div>
);

const TwoDoors = () => (
  <section className="relative w-full bg-[#050505] py-16 lg:py-24">
    <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black to-transparent" />

    <div className="relative mx-auto max-w-[1356px] px-4 lg:px-6">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="mb-8 text-center text-[13px] text-white/35"
      >
        Two ways in. Pick whichever one you came for.
      </motion.p>

      <div className="grid items-stretch gap-4 md:grid-cols-2">
        {DOORS.map((d, i) => (
          <Door key={d.id} door={d} i={i} />
        ))}
      </div>
    </div>
  </section>
);

export default TwoDoors;
