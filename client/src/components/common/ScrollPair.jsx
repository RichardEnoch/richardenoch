// src/components/common/ScrollPair.jsx
//
// A short column and a tall one, travelling together.
//
// When a block of copy sits beside a tall image, one of them finishes early and
// the section spends its second half with a column of nothing in it. The fix
// used elsewhere on this site is to let the short column drift: it enters
// top-aligned with the tall one, moves down as the section scrolls, and leaves
// bottom-aligned. The two arrive and leave together and the gap never opens.
//
// It is measurement, not sticky positioning. `position: sticky` pins the short
// column to the viewport, which is a different effect — the copy stops moving
// relative to the screen. Here it keeps moving; it just moves slower than the
// page, by exactly the height difference between the two columns.
//
// If the short column is the taller of the two, nothing happens, which is the
// correct behaviour rather than a special case.

import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

const ScrollPair = ({
  content,
  media,
  className = "",
  /* Fraction of the height difference actually travelled. Below 1 the copy
     stops a little short of the bottom, which reads as deliberate rather than
     as the copy chasing the image down the page. */
  travel = 0.92,
  cols = "lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]",
  gap = "gap-10 lg:gap-16",
}) => {
  const wrapRef = React.useRef(null);
  const contentRef = React.useRef(null);
  const mediaRef = React.useRef(null);
  const reduced = useReducedMotion();
  const [drift, setDrift] = React.useState(0);

  /* ["start start", "end end"] only produces a usable range when the section
     is taller than the viewport; on a shorter one the two edges cross and the
     progress value barely moves, which is why nothing appeared to happen.
     This range runs from the moment the block enters to the moment it leaves. */
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start 88%", "end 12%"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, drift]);

  /* Remeasure on resize: the height difference is entirely layout-dependent,
     and a stale number leaves the copy stranded mid-section. */
  React.useLayoutEffect(() => {
    if (reduced) return;
    const measure = () => {
      const c = contentRef.current;
      const m = mediaRef.current;
      if (!c || !m) return;
      /* Below the lg breakpoint the two stack, so there is nothing to drift. */
      const stacked = window.innerWidth < 1024;
      const diff = m.offsetHeight - c.offsetHeight;
      setDrift(!stacked && diff > 40 ? diff * travel : 0);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (contentRef.current) ro.observe(contentRef.current);
    if (mediaRef.current) ro.observe(mediaRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [reduced, travel]);

  return (
    <div
      ref={wrapRef}
      className={`grid items-start ${cols} ${gap} ${className}`}
    >
      <motion.div ref={contentRef} style={reduced ? undefined : { y }}>
        {content}
      </motion.div>
      <div ref={mediaRef}>{media}</div>
    </div>
  );
};

export default ScrollPair;
