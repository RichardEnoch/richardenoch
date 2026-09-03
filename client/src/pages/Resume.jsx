// src/pages/Resume.jsx
//
// The resume, on the site.
//
// A recruiter who lands here has one question — can this person do the job —
// and about forty seconds to answer it. So this page is deliberately the
// plainest thing on the site: no scroll-jacking, no reveals that hold copy
// hostage, no hero video. Content first, in the order a hiring manager reads.
//
// Two things it does that a PDF cannot. Every project in Selected work links
// to the actual case study, so the claim and the evidence are one click apart.
// And every project states whether it shipped, because "designed but never
// adopted" is a real and defensible outcome, and pretending otherwise is the
// fastest way to lose a room.
//
// It also prints. `@media print` strips the site chrome and lays the page out
// in black on white, so Ctrl+P produces a normal-looking CV instead of a
// screenshot of a dark website.

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageMeta from "../components/common/PageMeta";
import ResumePicker from "../components/common/ResumePicker";
import { buttonClasses } from "../components/ui";
import {
  PROFILE,
  SUMMARY,
  SELECTED_WORK,
  EXPERIENCE,
  SKILLS,
  CERTIFICATIONS,
  EDUCATION,
} from "../data/resume";

const G = "#a3e635";
const EASE = [0.22, 0.61, 0.36, 1];

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.5, ease: EASE, delay },
});

const Section = ({ label, children, className = "" }) => (
  <section
    className={`resume-section border-t border-white/8 py-12 ${className}`}
  >
    <div className="grid gap-8 lg:grid-cols-[minmax(0,180px)_minmax(0,1fr)]">
      <motion.h2
        {...rise()}
        className="text-[11px] font-bold uppercase tracking-[0.22em]"
        style={{ color: G }}
      >
        {label}
      </motion.h2>
      <div>{children}</div>
    </div>
  </section>
);

/* State reads as a fact, not a badge. Shipped work and unshipped work get the
   same typographic weight — the difference is in the words, not the colour. */
const State = ({ children }) => (
  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/12 px-2.5 py-1 text-[11px] font-medium text-white/55">
    <span
      aria-hidden="true"
      className="h-1.5 w-1.5 rounded-full"
      style={{ background: G }}
    />
    {children}
  </span>
);

const Resume = () => {
  const [pickerOpen, setPickerOpen] = React.useState(false);

  return (
    <div className="resume-page bg-[#050505] text-white">
      <PageMeta
        title="Resume"
        description="Richard Enoch Adesiyan — multidisciplinary designer. Six years in design, three in product. Brand identity, product design, and the construction-technology work in between."
        url="/resume"
      />

      <div className="mx-auto max-w-[1000px] px-4 pb-24 pt-28 sm:px-8 lg:pt-36">
        {/* ── Header ────────────────────────────────────────────────────── */}
        <motion.header {...rise()}>
          <p
            className="mb-4 text-[11px] font-bold uppercase tracking-[0.22em]"
            style={{ color: G }}
          >
            Resume
          </p>
          <h1 className="font-['Outfit'] text-4xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-5xl lg:text-[60px]">
            {PROFILE.name}
          </h1>
          <p className="mt-3 text-[17px] text-white/60 sm:text-[19px]">
            {PROFILE.title}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[14px] text-white/45">
            <span>{PROFILE.location}</span>
            <a
              href={`mailto:${PROFILE.email}`}
              className="underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              {PROFILE.email}
            </a>
            <a
              href={`tel:${PROFILE.phone.replace(/\s/g, "")}`}
              className="transition-colors hover:text-white"
            >
              {PROFILE.phone}
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noreferrer"
              className="underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              LinkedIn
            </a>
          </div>

          {/* Download opens the picker rather than firing a file: there are
            three résumés and the reader knows better than I do which one
            fits the role they are hiring for. */}
          <div className="resume-actions mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setPickerOpen(true)}
              className={buttonClasses("primary", "md")}
            >
              Download résumé
            </button>
            <Link to="/projects" className={buttonClasses("secondary", "md")}>
              See the work
            </Link>
            <button
              type="button"
              onClick={() => window.print()}
              className={buttonClasses("ghost", "md")}
            >
              Print this page
            </button>
          </div>
        </motion.header>

        {/* ── Summary ───────────────────────────────────────────────────── */}
        <Section label="In short">
          {SUMMARY.map((p, i) => (
            <motion.p
              key={i}
              {...rise(i * 0.06)}
              className="mb-4 max-w-[70ch] text-[15.5px] leading-[1.75] text-white/65 last:mb-0"
            >
              {p}
            </motion.p>
          ))}
        </Section>

        {/* ── Selected work ─────────────────────────────────────────────── */}
        <Section label="Selected work">
          <div className="space-y-8">
            {SELECTED_WORK.map((w, i) => (
              <motion.article key={w.id} {...rise(i * 0.05)}>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
                  <Link
                    to={w.to}
                    className="text-[19px] font-semibold text-white underline-offset-[6px] transition-colors hover:text-[#a3e635] hover:underline"
                  >
                    {w.name}
                  </Link>
                  <span className="text-[13px] text-white/35">{w.kind}</span>
                  <State>{w.state}</State>
                </div>
                <p className="mt-2.5 max-w-[70ch] text-[14.5px] leading-[1.7] text-white/55">
                  {w.body}
                </p>
              </motion.article>
            ))}
          </div>
          <p className="mt-8 max-w-[62ch] text-[13.5px] leading-[1.7] text-white/30">
            Each of these links to the case study behind it. Where something was
            designed but never shipped, it says so — the decisions are the part
            worth reading either way.
          </p>
        </Section>

        {/* ── Experience ────────────────────────────────────────────────── */}
        <Section label="Experience">
          <div className="space-y-10">
            {EXPERIENCE.map((job, i) => (
              <motion.article key={job.id} {...rise(i * 0.05)}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-[18px] font-semibold text-white">
                    {job.company}
                    <span className="font-normal text-white/45">
                      {" "}
                      — {job.role}
                    </span>
                  </h3>
                  <p className="text-[13px] tabular-nums text-white/35">
                    {job.period}
                  </p>
                </div>
                <p className="mt-1 text-[13px] text-white/30">{job.meta}</p>

                <ul className="mt-4 space-y-2.5">
                  {job.points.map((pt, j) => (
                    <li
                      key={j}
                      className="relative max-w-[74ch] pl-5 text-[14.5px] leading-[1.7] text-white/55"
                    >
                      <span
                        aria-hidden="true"
                        className="absolute left-0 top-[0.62em] h-1 w-1 rounded-full"
                        style={{ background: "rgba(163,230,53,0.6)" }}
                      />
                      {pt}
                    </li>
                  ))}
                </ul>

                {job.note && (
                  <p className="mt-3 max-w-[70ch] border-l-2 border-white/10 pl-3 text-[13px] leading-[1.65] text-white/30">
                    {job.note}
                  </p>
                )}
              </motion.article>
            ))}
          </div>
        </Section>

        {/* ── Skills ────────────────────────────────────────────────────── */}
        <Section label="Skills">
          <div className="grid gap-7 sm:grid-cols-2">
            {SKILLS.map((s, i) => (
              <motion.div key={s.group} {...rise(i * 0.04)}>
                <h3 className="mb-3 text-[14px] font-semibold text-white">
                  {s.group}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {s.items.map((it) => (
                    <span
                      key={it}
                      className="rounded-md border border-white/8 bg-white/[0.03] px-2.5 py-1 text-[12.5px] text-white/50"
                    >
                      {it}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* ── Education & certifications ────────────────────────────────── */}
        <Section label="Education">
          <motion.div {...rise()}>
            {EDUCATION.map((ed, i) => (
              <div key={ed.degree} className={i ? "mt-7" : ""}>
                <h3 className="text-[17px] font-semibold text-white">
                  {ed.degree}
                </h3>
                <p className="mt-1 text-[14px] text-white/45">
                  {ed.school} · {ed.year}
                </p>
                {ed.note && (
                  <p className="mt-4 max-w-[64ch] text-[14px] leading-[1.7] text-white/40">
                    {ed.note}
                  </p>
                )}
              </div>
            ))}

            <h3 className="mb-3 mt-9 text-[14px] font-semibold text-white">
              Certifications
            </h3>
            <ul className="space-y-1.5">
              {CERTIFICATIONS.map((c) => (
                <li key={c} className="text-[14px] text-white/50">
                  {c}
                </li>
              ))}
            </ul>
          </motion.div>
        </Section>

        {/* ── Close ─────────────────────────────────────────────────────── */}
        <Section label="Next" className="border-b border-white/8">
          <motion.div {...rise()}>
            <p className="max-w-[62ch] text-[15.5px] leading-[1.75] text-white/60">
              If the work looks like a fit, the fastest way to find out is a
              conversation. I am happy to walk through any of it — including the
              parts that did not ship.
            </p>
            <div className="resume-actions mt-6 flex flex-wrap gap-3">
              <Link to="/contact" className={buttonClasses("primary", "md")}>
                Start a conversation
              </Link>
              <Link to="/projects" className={buttonClasses("secondary", "md")}>
                Browse the work
              </Link>
            </div>
          </motion.div>
        </Section>
      </div>

      <ResumePicker open={pickerOpen} onClose={() => setPickerOpen(false)} />
    </div>
  );
};

export default Resume;
