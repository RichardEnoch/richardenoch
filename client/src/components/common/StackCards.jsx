// src/components/common/StackCards.jsx
//
// Cards that drop out from behind each other as the page scrolls.
//
// A run of equal cards stacked down a page is read as a list: you skim the
// headings and keep going. Pinning them to the same spot and letting each new
// one rise over the last turns the same content into a sequence — you have to
// arrive at each card, and the one you just read is still visible underneath,
// which is what makes it read as a stack rather than as three unrelated
// panels.
//
// The mechanism is `position: sticky` and nothing else, with each card
// stopping a few pixels lower than the one before so the stack's edges show.
// The only scroll-linked part is the settling: a card dims and shrinks
// slightly once the next one has covered it, so the top card is always the
// one being read.
//
// Two things break this and neither is obvious:
//   - `overflow-x: hidden` on ANY ancestor kills sticky everywhere below it.
//   - A card taller than the viewport can never be fully covered, so the
//     stack stops looking like a stack. Keep the cards short.
//
// Reduced motion drops the scale/opacity work and keeps plain sticky, which
// is not an animation.

import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

const Card = ({ child, i, n, top, step, gap, progress, reduced, last }) => {
  /* Card i is covered by card i+1 over its slice of the wrapper's scroll.
     Before that slice it is the card being read; after it, it is backing. */
  const from = i / n;
  const to = (i + 1) / n;
  const scale = useTransform(progress, [from, to], [1, 1 - 0.04 * (n - i)], {
    clamp: true,
  });
  const opacity = useTransform(progress, [from, to], [1, 0.45], {
    clamp: true,
  });

  return (
    <div
      className="sticky"
      style={{
        top: top + i * step,
        zIndex: i + 1,
        marginBottom: last ? 0 : gap,
      }}
    >
      <motion.div
        style={
          reduced || last
            ? undefined
            : { scale, opacity, transformOrigin: "50% 0%" }
        }
      >
        {child}
      </motion.div>
    </div>
  );
};

/* top:  where the first card comes to rest, in px from the viewport top.
   step: how much lower each following card stops, so the stack shows its edges.
   gap:  scroll distance between one card settling and the next arriving. */
const StackCards = ({
  children,
  top = 104,
  step = 16,
  gap = "26vh",
  className = "",
}) => {
  const wrapRef = React.useRef(null);
  const reduced = useReducedMotion();
  const items = React.Children.toArray(children);
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start 20%", "end 80%"],
  });

  return (
    <div ref={wrapRef} className={`relative ${className}`}>
      {items.map((child, i) => (
        <Card
          key={i}
          child={child}
          i={i}
          n={items.length}
          top={top}
          step={step}
          gap={gap}
          progress={scrollYProgress}
          reduced={reduced}
          last={i === items.length - 1}
        />
      ))}
    </div>
  );
};

export default StackCards;
