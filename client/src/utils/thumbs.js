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

const byBasename = {};
for (const [filePath, url] of Object.entries(modules)) {
  const key = filePath.split("/").pop().replace(/\.thumb\.webp$/i, "");
  byBasename[key] = url;
}

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
