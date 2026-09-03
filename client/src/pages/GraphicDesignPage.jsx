// src/pages/GraphicDesignPage.jsx
// Flyers & Social Media Designs — local assets, no API calls.

import React from "react";
import GraphicHero from "../components/GraphicDesignPage/GraphicHero";
import GraphicOverview from "../components/GraphicDesignPage/GraphicOverview";
import GraphicGallery from "../components/GraphicDesignPage/GraphicGallery";
import BuildSection from "../components/Home/BuildSection";
import OtherProj from "../components/ProjectPage/OtherProj";
import PageMeta from "../components/common/PageMeta";

/* ── hero / overview background ── */
const GRAPHICS_ASSETS = import.meta.glob(
  "../assets/Graphics/**/*.{png,jpg,jpeg,webp,svg}",
  { eager: true, import: "default" },
);
/* Matches on basename only, ignoring the extension. The hero used to be
   looked up as "heroimg.png"; re-encoding it to .webp silently broke the
   match and left four pages with a src-less hero for weeks, because an empty
   string is a perfectly valid src as far as React is concerned. Comparing
   without the extension means a future format change cannot repeat that. */
function findAsset(name) {
  const want = name.toLowerCase().replace(/.[a-z0-9]+$/, "");
  const hit = Object.entries(GRAPHICS_ASSETS).find(([p]) => {
    const file = p.split("/").pop().toLowerCase();
    if (file.endsWith(".thumb.webp")) return false; // never the tile variant
    return file.replace(/.[a-z0-9]+$/, "") === want;
  });
  return hit ? hit[1] : "";
}
const HeroBg = findAsset("heroimg.png");
const OverviewImg = findAsset("overviewimg.png");

const HERO_BG_TWEAK = {
  fit: "cover",
  scale: 1.0,
  posX: 58,
  posY: 22,
  translateX: 0,
  translateY: 0,
  opacity: 0.99,
};

/* ── gallery: Richard's flyer and social design work, sourced from
   extra/Flyer Samples.

   This used to pool four folders — FlyerSamples, ADLMStudio, Whitespace and
   YDpayDesigns — shuffle them, and keep only 48. Two things were wrong with
   that. Most of the flyers were dropped at random on every visit, and the
   survivors were diluted by three other brands' social work, all of which
   already have their own dedicated pages (/adlm-studio-designs,
   /whitespace-designs, /ydpay-designs). This page is the flyer body of work,
   so it shows the flyer body of work — all of it. ── */
const GALLERY_ASSETS = import.meta.glob(
  "../assets/FlyerSamples/*.{png,jpg,jpeg,webp}",
  { eager: true, import: "default" },
);

// Fisher–Yates shuffle (runs once at load → random per visit, stable per session)
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildGallery() {
  const all = Object.entries(GALLERY_ASSETS)
    .filter(([path]) => !/\.thumb\.webp$/i.test(path)) // tiles resolve their own thumb
    .map(([, src], idx) => ({ id: `gfx-${idx}`, src }));
  // Shuffled so the page opens differently each visit, but nothing is dropped.
  return shuffle(all);
}

const DATA = {
  backLabel: "Back to Portfolio",
  titleTop: "Flyers & Social Media",
  titleBottom: "Designs",
  subtitle:
    "Designing high-impact visual systems that drive engagement, clarity, and brand consistency across digital platforms.",
  heroBg: HeroBg || "",
  heroBgTweak: HERO_BG_TWEAK,
  overviewTitle: "Overview",
  overviewText: [
    "This project showcases a collection of flyer and social media designs created for brands seeking strong visual presence and meaningful audience engagement. Each design was crafted with a clear strategic intent — balancing aesthetics with communication goals to ensure the message is not just seen, but understood and acted upon.",
    "Rather than focusing solely on visual appeal, the approach emphasized hierarchy, readability, brand alignment, and conversion-driven layouts. From event promotions to educational campaigns and community activations, every asset was designed to capture attention quickly while maintaining clarity across multiple screen sizes and platforms.",
    "The result is a cohesive body of work that demonstrates versatility, brand sensitivity, and the ability to translate ideas into compelling visual narratives that perform effectively in real-world contexts.",
  ],
  overviewImage: OverviewImg || "",
  gallery: buildGallery(),
  slug: "graphic-design",
  _id: "graphic-design",
};

export default function GraphicDesignPage() {
  return (
    <div className="relative min-h-screen bg-[#070707] text-white overflow-x-hidden">
      <PageMeta
        title="Graphic Design"
        description="Graphic design work by Richard Enoch — flyers, social media designs, and visual campaigns crafted for brands that want to be seen."
        url="/graphic-design"
      />
      <div className="pointer-events-none absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,#4ade80_0,transparent_65%)] opacity-[0.16] blur-3xl" />
      <div className="pointer-events-none absolute -right-44 top-[18%] h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle_at_center,#22c55e_0,transparent_70%)] opacity-[0.12] blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_0%,rgba(255,255,255,0.05)_0%,transparent_55%)]" />
      <main className="relative z-10">
        <GraphicHero data={DATA} />
        <GraphicOverview data={DATA} items={DATA.gallery} />
        <GraphicGallery items={DATA.gallery} />
        <OtherProj currentSlug={DATA.slug} currentKind="gallary" />
        <BuildSection />
      </main>
    </div>
  );
}
