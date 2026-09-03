// src/components/common/SectionToc.jsx
//
// Ghost table of contents for long case studies.
//
// WHY IT IS A GHOST. A persistent rail costs ~240px of width on every page it
// appears on, and these pages exist to show desktop software — a Revit plugin
// rendered into what is left of a 1100px column is not being shown, it is
// being referenced. Navigation is glanced at occasionally; the screens are the
// content. So the TOC collapses to a stack of ticks at the right edge and only
// becomes a list when someone reaches for it. Content keeps the full viewport.
//
// The collapsed state still does real work: one tick per section, the active
// one longer and lime, so position in the document is legible without hovering
// anything.
//
// Two things worth knowing before editing:
//
// 1. Lenis. Smooth scroll is installed site-wide in App.jsx and exposed as
//    window.__lenis. A native scrollIntoView or a raw hash jump fights it and
//    lands in the wrong place, so anchor clicks go through Lenis when present.
//
// 2. Active state is computed from section position rather than an
//    IntersectionObserver threshold. A section that fills the viewport never
//    fires a useful threshold event, and case-study sections routinely do.

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useReducedMotion } from "framer-motion";

const G = "#a3e635";

/* How far down the viewport a section's top must travel before it counts as
   the one being read. A third feels right: the heading has cleared the nav and
   the reader is into the body, but the next section hasn't arrived. */
const ACTIVE_LINE = 0.33;

const SectionToc = ({
  sections = [],
  siblings = [],
  siblingsLabel = "Elsewhere in this project",
}) => {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const reduce = useReducedMotion();
  const closeTimer = useRef(null);

  useEffect(() => {
    if (!sections.length) return;

    const read = () => {
      let best = 0;
      let bestTop = -Infinity;
      sections.forEach((s, i) => {
        const el = document.getElementById(s.id);
        if (!el) return;
        const top =
          el.getBoundingClientRect().top - window.innerHeight * ACTIVE_LINE;
        if (top <= 0 && top > bestTop) {
          bestTop = top;
          best = i;
        }
      });
      setActive(best);
    };

    read();
    window.addEventListener("scroll", read, { passive: true });
    window.addEventListener("resize", read);
    return () => {
      window.removeEventListener("scroll", read);
      window.removeEventListener("resize", read);
    };
  }, [sections]);

  /* A small close delay stops the panel snapping shut when the pointer crosses
     the gap between a tick and the label that just appeared next to it. */
  const hold = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  }, []);
  const release = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 240);
  }, []);
  useEffect(
    () => () => closeTimer.current && clearTimeout(closeTimer.current),
    [],
  );

  const go = useCallback(
    (e, id) => {
      e.preventDefault();
      const el = document.getElementById(id);
      if (!el) return;
      setMobileOpen(false);

      if (window.__lenis) {
        window.__lenis.scrollTo(el, { offset: -96 });
      } else {
        const y = el.getBoundingClientRect().top + window.scrollY - 96;
        window.scrollTo({ top: y, behavior: reduce ? "auto" : "smooth" });
      }
      window.history.replaceState(null, "", `#${id}`);
    },
    [reduce],
  );

  if (!sections.length) return null;

  const dur = reduce ? "0ms" : "260ms";

  return (
    <>
      {/* ══ desktop: ghost rail, pinned to the right edge ══
          Both the ticks and the panel are positioned `fixed` and centred to the
          VIEWPORT independently. An earlier version nested the panel inside the
          tick column and centred it on that — but the tick column is only a few
          dozen pixels tall and its own centre drifts with the number of
          sections, so the panel never sat true. Anchoring both to the viewport
          removes the dependency entirely.

          Hover is held on each element rather than on a wrapper: a wrapper wide
          enough to bridge them would have to capture pointer events down the
          whole right edge and would swallow clicks on the page beneath. They
          overlap anyway — the panel opens over the ticks — so there is no gap
          to cross. */}
      <nav aria-label="On this page" className="hidden lg:block">
        {/* ── collapsed: ticks ── */}
        <ul
          aria-hidden={open}
          onMouseEnter={hold}
          onMouseLeave={release}
          className="fixed right-0 top-1/2 z-40 m-0 flex -translate-y-1/2 list-none flex-col items-end gap-2.5 py-5 pl-8 pr-5"
          style={{
            opacity: open ? 0 : 1,
            transition: `opacity ${dur} ease`,
          }}
        >
          {sections.map((s, i) => (
            <li key={s.id}>
              <span
                className="block h-0.5 rounded-full"
                style={{
                  width: i === active ? 26 : 14,
                  background: i === active ? G : "rgba(255,255,255,0.22)",
                  boxShadow: i === active ? `0 0 10px ${G}66` : "none",
                  transition: `width ${dur} ease, background ${dur} ease`,
                }}
              />
            </li>
          ))}
        </ul>

        {/* ── expanded: the list ── */}
        <div
          onMouseEnter={hold}
          onMouseLeave={release}
          className="fixed right-5 top-1/2 z-40 overflow-y-auto overscroll-contain rounded-2xl border border-white/10 bg-black/80 p-4 backdrop-blur-xl"
          style={{
            width: 262,
            // Long case studies can list more sections than fit beside them.
            // Clamping to the viewport keeps the whole list reachable instead
            // of running off the top and bottom edges.
            maxHeight: "calc(100vh - 48px)",
            opacity: open ? 1 : 0,
            transform: `translateY(-50%) translateX(${open ? "0px" : "10px"})`,
            pointerEvents: open ? "auto" : "none",
            transition: `opacity ${dur} ease, transform ${dur} ease`,
          }}
        >
          <p className="mb-3 pl-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30">
            On this page
          </p>
          <ol className="m-0 list-none p-0">
            {sections.map((s, i) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={(e) => go(e, s.id)}
                  aria-current={i === active ? "true" : undefined}
                  tabIndex={open ? 0 : -1}
                  className="flex items-baseline gap-2.5 rounded-md border-l-2 py-1.5 pl-3 pr-2 text-[13px] leading-[1.4] transition-colors duration-200 hover:text-white"
                  style={{
                    borderColor: i === active ? G : "transparent",
                    color: i === active ? G : "rgba(255,255,255,0.5)",
                  }}
                >
                  <span
                    className="min-w-[15px] text-[10px] font-semibold tabular-nums"
                    style={{
                      color: i === active ? G : "rgba(255,255,255,0.28)",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s.label}
                </a>
              </li>
            ))}
          </ol>

          {siblings.length > 0 && (
            <>
              <div className="my-3 ml-3 h-px bg-white/10" />
              <p className="mb-1.5 pl-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30">
                {siblingsLabel}
              </p>
              {siblings.map((s) => (
                <Link
                  key={s.to}
                  to={s.to}
                  tabIndex={open ? 0 : -1}
                  className="block rounded-md py-1.5 pl-3 pr-2 text-[12.5px] leading-[1.4] text-white/40 transition-colors duration-200 hover:text-[#a3e635]"
                >
                  {s.label}
                </Link>
              ))}
            </>
          )}
        </div>
      </nav>

      {/* ══ mobile: bar at the bottom edge ══
          Bottom rather than top: thumb reach, and it doesn't stack under the
          site nav, which is already fixed above. */}
      <nav
        aria-label="On this page"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-black/92 backdrop-blur-xl lg:hidden"
      >
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          className="flex w-full items-center justify-between px-6 py-4 text-[13px] font-medium text-white/75"
        >
          <span className="truncate">
            {sections[active]?.label || "On this page"}
          </span>
          <span
            className="ml-4 shrink-0 text-[10px] font-semibold uppercase tracking-[0.14em]"
            style={{ color: G }}
          >
            {mobileOpen ? "Close" : "Contents"}
          </span>
        </button>
        <div
          className="overflow-y-auto transition-[max-height] duration-300 ease-out"
          style={{ maxHeight: mobileOpen ? "60vh" : 0 }}
        >
          <div className="px-4 pb-6">
            <ol className="m-0 list-none p-0">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    onClick={(e) => go(e, s.id)}
                    aria-current={i === active ? "true" : undefined}
                    className="flex items-baseline gap-2.5 border-l-2 py-2 pl-3.5 text-[13.5px] leading-[1.4]"
                    style={{
                      borderColor: i === active ? G : "transparent",
                      color: i === active ? G : "rgba(255,255,255,0.45)",
                    }}
                  >
                    <span className="min-w-[15px] text-[10px] font-semibold tabular-nums text-white/30">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {s.label}
                  </a>
                </li>
              ))}
            </ol>
            {siblings.length > 0 && (
              <>
                <div className="my-3 ml-3.5 h-px bg-white/10" />
                {siblings.map((s) => (
                  <Link
                    key={s.to}
                    to={s.to}
                    className="block py-2 pl-3.5 text-[12.5px] text-white/40"
                  >
                    {s.label}
                  </Link>
                ))}
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default SectionToc;
