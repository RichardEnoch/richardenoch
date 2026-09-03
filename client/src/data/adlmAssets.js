// src/data/adlmAssets.js
//
// The drop-in asset table for the ADLM case study.
//
// Most of this case study is built and empty: the guideline spreads, the merch
// and stationery shots, and the screens for five of the six products do not
// exist yet. The layout for all of them does. The thing that must not happen
// when the pictures finally arrive is a round of code edits, import lines and
// re-testing — that is where the bugs come from, and it is the worst possible
// moment to introduce them.
//
// So the frames do not name imports. They name KEYS. Every placeholder on the
// ADLM pages asks this file for a key; if a file with that name has been
// dropped into `src/assets/ADLM/dropin/`, the frame fills itself. If not, the
// frame stays a labelled placeholder. Nothing else changes either way, and no
// file in `src/pages` has to be touched to publish a picture.
//
//   src/assets/ADLM/dropin/guideline/03.webp   →  key "guideline/03"
//   src/assets/ADLM/dropin/touchpoints/mug.webp →  key "touchpoints/mug"
//
// Extension is ignored, so a .jpg can be re-encoded to .webp later without
// breaking the link. Case is ignored, because filenames come off a phone and a
// Mac and a Windows box and they will not agree.
//
// docs/ADLM-ASSETS.md lists every key the pages currently ask for.

const FILES = import.meta.glob(
  "../assets/ADLM/dropin/**/*.{png,jpg,jpeg,webp,svg,avif}",
  { eager: true, import: "default" },
);

/* Build the lookup once. Keys are the path under `dropin/`, lowercased, with
   the extension removed. A `.thumb.webp` sibling is never a candidate — the
   same trap that had four gallery pages listing every design twice. */
const BY_KEY = {};
for (const [path, url] of Object.entries(FILES)) {
  const rel = path.split("/dropin/")[1];
  if (!rel || /\.thumb\.[a-z0-9]+$/i.test(rel)) continue;
  BY_KEY[rel.replace(/\.[a-z0-9]+$/i, "").toLowerCase()] = url;
}

/**
 * Resolve one drop-in asset.
 * Returns undefined when nothing has been dropped in yet, which is exactly what
 * `Slot` and `GuidelineCarousel` want — both fall back to their placeholder on
 * a missing `src` rather than rendering a broken image.
 */
export function asset(key) {
  if (!key) return undefined;
  return BY_KEY[String(key).toLowerCase()];
}

/**
 * Everything dropped into one folder, in filename order.
 * Use for sets whose length is not known in advance — a guideline whose page
 * count is decided by the guideline, not by this file.
 */
export function assetsIn(prefix) {
  const p = String(prefix).toLowerCase().replace(/\/$/, "") + "/";
  return Object.keys(BY_KEY)
    .filter((k) => k.startsWith(p))
    .sort()
    .map((k) => ({ key: k, src: BY_KEY[k] }));
}

/** How many of a list of keys have actually landed. Used by the status strip. */
export function assetProgress(keys = []) {
  const filled = keys.filter((k) => Boolean(asset(k))).length;
  return { filled, total: keys.length };
}

/**
 * Attach `src` to a list of frames that carry a `key`.
 * The frame keeps every other property it had — label, ratio, alt — so a
 * placeholder and a filled frame are the same object with one field more.
 */
export function withAssets(frames = []) {
  return frames.map((f) => (f.src ? f : { ...f, src: asset(f.key) }));
}

export default asset;
