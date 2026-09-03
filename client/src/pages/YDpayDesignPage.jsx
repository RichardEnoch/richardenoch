// src/pages/YDpayDesignPage.jsx
// YDpay Social Media Designs — local assets, no API calls.

import React from "react";
import GraphicHero from "../components/GraphicDesignPage/GraphicHero";
import GraphicOverview from "../components/GraphicDesignPage/GraphicOverview";
import GraphicGallery from "../components/GraphicDesignPage/GraphicGallery";
import BuildSection from "../components/Home/BuildSection";
import OtherProj from "../components/ProjectPage/OtherProj";
import PageMeta from "../components/common/PageMeta";

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

const YDPAY_ASSETS = import.meta.glob(
  "../assets/YDpayDesigns/*.{png,jpg,jpeg,webp}",
  { eager: true, import: "default" },
);

/* Every source here has a 640px `name.thumb.webp` sibling generated beside
   it, and the glob above matches .webp — so without this filter the gallery
   listed each design twice, once at full size and once as its own tile. The
   tiles resolve their thumb through `thumbFor()`, so only the full-size files
   belong in the list. */
const GALLERY = Object.entries(YDPAY_ASSETS)
  .filter(([path]) => !/\.thumb\.webp$/i.test(path))
  .map(([, src], idx) => ({ id: `ydpay-${idx}`, src }));

const DATA = {
  backLabel: "Back to Portfolio",
  titleTop: "YDpay Social Media",
  titleBottom: "Designs",
  subtitle:
    "Brand-consistent social media graphics, card designs, and campaign visuals crafted for YDpay — a modern digital payment platform.",
  heroBg: HeroBg || "",
  heroBgTweak: HERO_BG_TWEAK,
  overviewTitle: "Overview",
  overviewText: [
    "YDpay is a digital payment platform operating at the intersection of fintech and everyday commerce. This collection covers the full breadth of their social media design output — from promotional campaign banners and card design mockups to seasonal greetings and community-building posts.",
    "Every design was created to align with YDpay's brand identity: bold, trustworthy, and forward-looking. The work balances high-energy campaign aesthetics with clear financial messaging, ensuring visual consistency across all digital touchpoints while driving user engagement and product awareness.",
  ],
  overviewImage: OverviewImg || "",
  gallery: GALLERY,
  slug: "ydpay-designs",
  _id: "ydpay-designs",
};

export default function YDpayDesignPage() {
  return (
    <div className="relative min-h-screen bg-[#070707] text-white overflow-x-hidden">
      <PageMeta
        title="YDpay Brand Designs"
        description="Brand identity and marketing design work by Richard Enoch for YDpay — a fintech brand built on trust, clarity, and confidence."
        url="/ydpay-designs"
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
