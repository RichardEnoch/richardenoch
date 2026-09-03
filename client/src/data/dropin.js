// src/data/dropin.js
//
// The drop-in asset table for everything outside the ADLM case study.
//
// Same contract as `adlmAssets.js`, different folder: a frame names a KEY, and
// if a file with that name has been dropped into `src/assets/dropin/`, the
// frame fills itself. Nothing in `src/pages` changes when a picture arrives.
//
//   src/assets/dropin/snotes/hero.webp        →  key "snotes/hero"
//   src/assets/dropin/niqs/portal-dashboard.png →  key "niqs/portal-dashboard"
//
// Extension and case are ignored. `name.thumb.webp` siblings are never picked
// up as the full image.
//
// ADLM keeps its own folder (`assets/ADLM/dropin/`) because its keys were
// already published in ADLM-ASSETS.md and are in use. Two folders, one idea —
// see IMAGE-SLOTS.md for the full table of both.

const FILES = import.meta.glob(
  "../assets/dropin/**/*.{png,jpg,jpeg,webp,svg,avif}",
  { eager: true, import: "default" },
);

const BY_KEY = {};
for (const [path, url] of Object.entries(FILES)) {
  const rel = path.split("/dropin/")[1];
  if (!rel || /\.thumb\.[a-z0-9]+$/i.test(rel)) continue;
  BY_KEY[rel.replace(/\.[a-z0-9]+$/i, "").toLowerCase()] = url;
}

/**
 * Resolve one drop-in asset, or undefined when nothing has landed yet.
 * Every frame that uses this falls back to its own placeholder on undefined,
 * so a missing file is a labelled empty frame rather than a broken image.
 */
export function asset(key) {
  if (!key) return undefined;
  return BY_KEY[String(key).toLowerCase()];
}

/** Everything dropped into one folder, in filename order. */
export function assetsIn(prefix) {
  const p = String(prefix).toLowerCase().replace(/\/$/, "") + "/";
  return Object.keys(BY_KEY)
    .filter((k) => k.startsWith(p))
    .sort()
    .map((k) => ({ key: k, src: BY_KEY[k] }));
}

export default asset;
