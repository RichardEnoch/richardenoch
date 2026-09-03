// src/config/featureFlags.js
//
// Work that exists in the codebase but is not ready to be public yet.
//
// A flag rather than a deletion, so unpublishing costs one line and
// republishing costs the same line. The pages stay buildable and stay
// reachable in local development, which is where they get finished.

/* The ADLM Studio case study — hub, brand, design system, website and the
   six product pages.
 *
 * Off until the case study is finished. Its 85 image frames are still
 * empty and the product write-ups are still short-form pending Richard's
 * own account of the decisions, so publishing it now would show an
 * unfinished flagship as the flagship.
 *
 * Turning this on restores the routes under /projects/featured/adlm-studio
 * and every link into them: the four discipline cards in the project grid,
 * the featured deck on /projects, the "next project" pairs, the case link
 * on /website-design, and the ADLM entry on /resume.
 */
export const ADLM_CASE_STUDY_LIVE = false;
