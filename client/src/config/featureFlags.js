// src/config/featureFlags.js
//
// Work that exists in the codebase but is not ready to be public yet.
//
// Flags rather than deletions, so unpublishing costs one line and
// republishing costs the same line. The pages stay buildable and stay
// reachable in local development, which is where they get finished.

/* The ADLM Studio case study, page by page.
 *
 * It publishes in pieces, because it was finished in pieces. Brand identity
 * and the design system have their photographs and their write-ups. The hub,
 * the website case and the six product pages do not — the product decisions
 * are still Richard's to tell, and inventing them is the one thing that must
 * not happen here.
 *
 * Flip a page to true and its route, its cards in the project grid and every
 * cross-link pointing at it come back together. Nothing else needs editing:
 * the sibling navigation and the "next" pairs filter themselves against this
 * map, so a published page never links to an unpublished one.
 */
export const ADLM_PAGES_LIVE = {
  hub: false,
  brand: true,
  "design-system": true,
  website: false,
  product: false,
};

export const ADLM_BASE = "/projects/featured/adlm-studio";

/** Is one ADLM page published? */
export const adlmLive = (page) => Boolean(ADLM_PAGES_LIVE[page]);

/** Any ADLM page published at all? Used to decide whether the hub is worth it. */
export const anyAdlmLive = () => Object.values(ADLM_PAGES_LIVE).some(Boolean);

/**
 * Which page does a path belong to?
 * Returns null for anything that is not an ADLM case-study path, so callers
 * can treat "not ADLM" and "ADLM and live" the same way.
 */
export function adlmPageOf(to = "") {
  const path = String(to).split("?")[0].replace(/\/+$/, "");
  if (!path.startsWith(ADLM_BASE)) return null;
  const rest = path.slice(ADLM_BASE.length);
  if (rest === "") return "hub";
  if (rest === "/brand") return "brand";
  if (rest === "/design-system") return "design-system";
  if (rest === "/website") return "website";
  if (rest.startsWith("/product")) return "product";
  return "hub";
}

/** True for a non-ADLM link, or an ADLM link whose page is published. */
export function linkIsLive(to) {
  const page = adlmPageOf(to);
  return page === null ? true : adlmLive(page);
}

/** Drop the links that would land on an unpublished page. */
export function liveLinks(links = []) {
  return links.filter((l) => linkIsLive(l && (l.to || l.href)));
}
