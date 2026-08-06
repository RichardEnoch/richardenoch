// src/components/common/ScrollAlign.jsx
//
// Two columns of unequal height sitting side by side look accidental: the
// short one runs out while the tall one keeps going, leaving a hole. This
// keeps them in relationship instead of fixing them in place.
//
// Tops line up as the section enters the viewport; bottoms line up as it
// leaves. Across that travel the SHORTER column drifts down by exactly the
// height difference, so the mismatch closes progressively rather than just
// sitting there. Both columns keep moving — this is not a sticky pin.
//
//   <ScrollAlign className="grid gap-10 lg:grid-cols-2" bClassName="lg:order-1">
//     <div>…text…</div>
//     <div>…image…</div>
//   </ScrollAlign>
//
// aClassName/bClassName land on the grid children themselves, so ordering and
// column-span utilities keep working — the wrapper IS the grid item.
//
// It measures rather than assumes, so it works whichever side is taller and
// re-measures when images finish loading or the window resizes.

import { Children, useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from "framer-motion";

const ScrollAlign = ({
  children,
  className = "",
  aClassName = "",
  bClassName = "",
  disabled = false,
}) => {
  const containerRef = useRef(null);
  const aRef = useRef(null);
  const bRef = useRef(null);
  const [heights, setHeights] = useState({ a: 0, b: 0 });
  const [stacked, setStacked] = useState(true);
  const reduceMotion = useReducedMotion();

  /* Measure both columns, and re-measure whenever anything inside them
     changes size — images decode late and would otherwise leave the drift
     calculated against a collapsed box. */
  useEffect(() => {
    const a = aRef.current;
    const b = bRef.current;
    if (!a || !b) return;

    const measure = () => {
      setHeights({ a: a.offsetHeight, b: b.offsetHeight });
      // Side by side only when the two columns actually sit on one row.
      setStacked(Math.abs(a.getBoundingClientRect().top - b.getBoundingClientRect().top) > 40);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(a);
    ro.observe(b);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [children]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const difference = Math.abs(heights.a - heights.b);
  const active = !disabled && !reduceMotion && !stacked && difference > 24;

  /* A touch of spring so the drift feels physical rather than mechanically
     tied to the wheel. Critically damped — no overshoot on a scroll. */
  const raw = useTransform(scrollYProgress, [0, 1], [0, active ? difference : 0]);
  const drift = useSpring(raw, { stiffness: 220, damping: 40, mass: 0.4 });

  const [first, second] = Children.toArray(children);
  const shorterIsFirst = heights.a < heights.b;

  return (
    <div ref={containerRef} className={className}>
      <motion.div
        ref={aRef}
        className={aClassName}
        style={{ y: active && shorterIsFirst ? drift : 0 }}
      >
        {first}
      </motion.div>
      <motion.div
        ref={bRef}
        className={bClassName}
        style={{ y: active && !shorterIsFirst ? drift : 0 }}
      >
        {second}
      </motion.div>
    </div>
  );
};

export default ScrollAlign;
