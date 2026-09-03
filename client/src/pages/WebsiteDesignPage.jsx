import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { Link02Icon, ArrowDown01Icon } from "hugeicons-react";
import BuildSection from "../components/Home/BuildSection";
import PageMeta from "../components/common/PageMeta";

import niqsLogo from "../assets/partner/NiqsColor.svg";
import adlmLogo from "../assets/partner/ADLMLogo.png";

const HERO_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_115655_b4d9cd77-feed-43cd-a198-af78ebdf1f7a.mp4";

// ─── Project data ─────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    id: "adlm",
    number: "01",
    name: "ADLM Studio",
    category: "Construction Tech · Software",
    description:
      "A 112-route audit, a restructure around how people actually buy, and thirty-one rebuilt pages across three surfaces — the marketing site, the signed-in account, and the internal admin. The full case study covers the architecture, the five user flows and the design system underneath.",
    url: "https://www.adlmstudio.net/",
    liveUrl: "https://www.adlmstudio.net/",
    caseUrl: "/projects/featured/adlm-studio/website",
    logo: adlmLogo,
    scope: [
      "IA + audit",
      "User flows",
      "31 pages",
      "Design system",
      "Account + admin",
    ],
  },
  {
    id: "niqs",
    number: "02",
    name: "NIQS",
    category: "Professional Body · Institutional",
    description:
      "Digital presence redesign for the Nigerian Institute of Quantity Surveyors — bringing a legacy institution's online identity into the modern web while honouring its heritage.",
    url: "https://niqs-website.vercel.app/",
    liveUrl: "https://niqs-website.vercel.app/",
    logo: niqsLogo,
    scope: ["Website design", "Institutional IA"],
  },
  {
    id: "oluwatosin",
    number: "03",
    name: "Oluwatosin",
    category: "Personal Brand · Portfolio",
    description:
      "A personal brand website built to position a seasoned professional in front of the right audience. Clean, confident, and structured around a single clear enquiry path.",
    url: "https://oluwatosin-website.vercel.app/",
    liveUrl: "https://oluwatosin-website.vercel.app/",
    logo: null,
    logoText: "OT",
    scope: ["Website design", "Personal brand"],
  },
];

// ─── Scaled iframe ────────────────────────────────────────────────────────────
// Desktop (≥768px container): renders site at 1440px wide and scales down
//   → shows desktop layout of the site
// Mobile (<768px container): renders site at the container's actual width
//   → site responds and shows its own mobile layout, no scaling needed
const DESKTOP_W = 1440;
const DESKTOP_H = 900;
const MOBILE_BREAKPOINT = 768;

const ScaledIframe = ({ url, name }) => {
  const wrapRef = useRef(null);
  const [cfg, setCfg] = useState({
    renderW: DESKTOP_W,
    renderH: DESKTOP_H,
    scale: 1,
  });

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const update = () => {
      const w = el.offsetWidth;
      if (w >= MOBILE_BREAKPOINT) {
        // Desktop: scale 1440px layout down to container width
        setCfg({
          renderW: DESKTOP_W,
          renderH: DESKTOP_H,
          scale: w / DESKTOP_W,
        });
      } else {
        // Mobile: give the iframe the exact container width so it renders mobile layout
        setCfg({ renderW: w, renderH: Math.round(w * 2.8), scale: 1 });
      }
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={wrapRef}
      className="w-full overflow-hidden"
      style={{ height: cfg.renderH * cfg.scale }}
    >
      <iframe
        src={url}
        title={name}
        loading="lazy"
        style={{
          width: cfg.renderW,
          height: cfg.renderH,
          transform: `scale(${cfg.scale})`,
          transformOrigin: "top left",
          border: "none",
          display: "block",
        }}
      />
    </div>
  );
};

// ─── Browser chrome wrapper ───────────────────────────────────────────────────
const BrowserFrame = ({ url, name }) => {
  const domain = (() => {
    try {
      return new URL(url).hostname;
    } catch {
      return url;
    }
  })();

  return (
    <div
      className="mx-auto w-full max-w-[1222px] overflow-hidden rounded-2xl"
      style={{
        border: "1px solid rgba(255,255,255,0.07)",
        background: "#0d0d0d",
        boxShadow:
          "0 40px 100px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.04)",
      }}
    >
      {/* Chrome bar */}
      <div
        className="flex items-center gap-3 border-b px-4 py-3"
        style={{ background: "#111111", borderColor: "rgba(255,255,255,0.05)" }}
      >
        <div className="flex shrink-0 gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex flex-1 items-center gap-2 rounded-md bg-white/[0.05] px-3 py-1.5">
          <svg
            viewBox="0 0 14 14"
            fill="none"
            className="h-3 w-3 shrink-0 text-white/20"
          >
            <circle
              cx="7"
              cy="7"
              r="6"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <path
              d="M7 1a8 8 0 0 1 0 12M7 1a8 8 0 0 0 0 12M1 7h12"
              stroke="currentColor"
              strokeWidth="1.2"
            />
          </svg>
          <span className="truncate font-mono text-[11px] text-white/28">
            {domain}
          </span>
        </div>
        <svg
          viewBox="0 0 14 14"
          fill="none"
          className="h-3.5 w-3.5 shrink-0 text-white/15"
        >
          <path
            d="M11.5 2.5A6 6 0 1 0 13 7v-1.5"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
          <path
            d="M10 1l1.5 1.5L10 4"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <ScaledIframe url={url} name={name} />
    </div>
  );
};

// ─── Scope panel ──────────────────────────────────────────────────────────────
// This slot used to hold a client quote. Real quotes are still being collected,
// and an invented one is worse than none — so it carries what can be checked:
// what the work covered, and where the reader can go and look at it.
const ScopePanel = ({ project, isInView }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.65, delay: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
    className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6"
  >
    <div
      className="pointer-events-none absolute -bottom-8 -right-8 h-28 w-28 rounded-full"
      style={{
        background:
          "radial-gradient(circle, rgba(132,204,22,0.07) 0%, transparent 70%)",
      }}
    />
    <div>
      <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-white/28">
        What the work covered
      </p>
      <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
        {project.scope.map((sc) => (
          <li
            key={sc}
            className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[12.5px] text-white/60"
          >
            {sc}
          </li>
        ))}
      </ul>
    </div>
    {project.caseUrl && (
      <Link
        to={project.caseUrl}
        className="mt-6 inline-flex w-fit items-center gap-2 text-[13px] font-semibold text-lime-400 transition hover:text-lime-300"
      >
        Read the case study
        <Link02Icon size={13} />
      </Link>
    )}
  </motion.div>
);

// ─── Project section ──────────────────────────────────────────────────────────
const ProjectSection = ({ project, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.08 });

  return (
    <section
      ref={ref}
      className="relative px-6 py-16 lg:px-16 lg:py-24"
      style={index > 0 ? { borderTop: "1px solid rgba(255,255,255,0.04)" } : {}}
    >
      {/* ── Top row: info left + scope right ── */}
      <div className="mx-auto mb-6 w-full max-w-[1222px] flex flex-col gap-4 lg:flex-row lg:items-end lg:gap-3">
        {/* Left: counter, logo, name, description, button */}
        <motion.div
          className="flex flex-col gap-3 lg:w-[58%]"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
        >
          {/* Counter */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/18">
              {project.number} &mdash; 0{PROJECTS.length}
            </span>
            <span className="h-px w-10 bg-white/10" />
          </div>

          {/* Logo + category */}
          <div className="flex items-center gap-3">
            {project.logo ? (
              <img
                src={project.logo}
                alt={project.name}
                className="h-6 w-auto object-contain opacity-80"
              />
            ) : (
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white/10 text-[10px] font-bold text-white/60">
                {project.logoText}
              </span>
            )}
            <span className="text-[10px] font-bold uppercase tracking-widest text-lime-400">
              {project.category}
            </span>
          </div>

          {/* Name */}
          <h2
            className="font-['Outfit'] text-[clamp(2rem,3.5vw,2.8rem)] font-semibold leading-[0.95] tracking-[-0.04em]"
            style={{
              background: "linear-gradient(180deg, #ffffff 0%, #7a7a7a 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {project.name}
          </h2>

          {/* Description */}
          <p className="max-w-[500px] text-[14px] leading-[1.65] text-white/45">
            {project.description}
          </p>

          {/* CTA */}
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex w-fit items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/70 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
          >
            Visit live site
            <Link02Icon size={13} />
          </a>
        </motion.div>

        {/* Right: what the work actually covered */}
        <motion.div
          className="lg:flex-1"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.7,
            delay: 0.15,
            ease: [0.22, 0.61, 0.36, 1],
          }}
        >
          <ScopePanel project={project} isInView={isInView} />
        </motion.div>
      </div>

      {/* ── Browser frame below ── */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 0.61, 0.36, 1] }}
      >
        <BrowserFrame url={project.url} name={project.name} />
      </motion.div>
    </section>
  );
};

// ─── Hero ─────────────────────────────────────────────────────────────────────
const Hero = () => {
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
  };
  const item = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.75, ease: [0.22, 0.61, 0.36, 1] },
    },
  };

  return (
    <section className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden px-6 text-center">
      {/* Background video */}
      <video
        src={HERO_VIDEO}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-50"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/50 via-transparent to-[#050505]" />
      <div className="absolute inset-0 bg-[#050505]/15" />

      <motion.div
        className="relative flex flex-col items-center gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Tag */}
        <motion.div variants={item}>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/40 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-lime-400" />
            Web Design
          </span>
        </motion.div>

        {/* Headline — matches other pages */}
        <motion.h1
          variants={item}
          className="max-w-[820px] font-['Outfit'] text-[clamp(2.2rem,4.5vw,4rem)] font-semibold leading-[0.92] tracking-[-0.05em]"
          style={{
            background: "linear-gradient(180deg, #ffffff 0%, #7a7a7a 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Websites that
          <br />
          <span
            style={{
              background: "linear-gradient(180deg, #bef264 0%, #65a30d 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            actually work.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={item}
          className="max-w-[460px] text-[17px] leading-[1.65] text-white/38"
        >
          Three live sites. An institution, a software company, a personal brand
          — each one you can open and use right here.
        </motion.p>

        {/* Scroll hint */}
        <motion.div
          variants={item}
          className="mt-4 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.25em] text-white/22">
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown01Icon size={14} className="text-white/22" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────
const WebsiteDesignPage = () => (
  <div
    className="min-h-screen bg-[#050505] text-white"
    style={{ paddingTop: "56px" }}
  >
    <PageMeta
      title="Website Design"
      description="Website design projects by Richard Enoch — live, interactive sites built for national organisations and growing brands."
      url="/website-design"
    />
    <Hero />

    <div style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
      {PROJECTS.map((project, i) => (
        <ProjectSection key={project.id} project={project} index={i} />
      ))}
    </div>

    <BuildSection />
  </div>
);

export default WebsiteDesignPage;
