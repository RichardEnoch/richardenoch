// src/utils/thumbs.js
//
// Grid tiles were being served the same file as the full-screen modal — a
// 1500px image rendered into a ~320px tile. These are 640px WebP variants
// generated alongside each gallery source (`name.thumb.webp`), used for the
// tile only. The modal keeps the full-size original, so nothing a visitor
// actually looks at closely loses any quality.
//
// Vite fingerprints asset filenames at build time, so the thumb URL can't be
// derived from the full URL by string surgery — both have to be imported.
// This glob does that once and keys the results by original basename.

const modules = import.meta.glob("../assets/**/*.thumb.webp", {
  eager: true,
  import: "default",
});

/* Vite flattens assets into one output directory, so at runtime the only
   thing recoverable from a built URL is the basename — the folder is gone.
   That makes this map unsafe for any name that exists in more than one
   source folder: "Call for Ambassadors.jpg" lives in both FlyerSamples and
   YDpayDesigns, and keying on basename alone silently served one project's
   thumbnail in place of another's.
   Ambiguous names are therefore recorded and never substituted — those few
   tiles load the full image instead. A slightly heavier tile is a trivial
   cost next to showing the wrong piece of work. */
const byBasename = {};
const ambiguous = new Set();
for (const [filePath, url] of Object.entries(modules)) {
  const key = filePath.split("/").pop().replace(/\.thumb\.webp$/i, "");
  if (key in byBasename) ambiguous.add(key);
  byBasename[key] = url;
}
ambiguous.forEach((key) => delete byBasename[key]);

/* Vite emits `name-HASH.ext`; strip the hash and extension to recover the
   original basename, then look up its thumb. Falls back to the full image
   whenever a thumb wasn't generated, so this can never blank an image. */
export function thumbFor(fullUrl) {
  if (!fullUrl || typeof fullUrl !== "string") return fullUrl;
  const file = decodeURIComponent(fullUrl.split("/").pop() || "");
  const base = file
    .replace(/\.[a-z0-9]+$/i, "")           // drop extension
    .replace(/-[A-Za-z0-9_-]{8}$/, "");     // drop Vite's content hash
  return byBasename[base] || fullUrl;
}

export default thumbFor;
