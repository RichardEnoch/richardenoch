// src/components/common/TiltCard.jsx
//
// A card that leans toward the cursor.
//
// The tilt is small on purpose — six degrees at the corners. Big tilt reads as
// a demo of a hover effect; small tilt reads as a physical object, and the
// difference is entirely in the numbers.
//
// Two things travel with the pointer: the rotation, and a soft glare that
// tracks where the "light" is hitting. Both are driven by motion values rather
// than React state, so the pointer move never triggers a render.
//
// Nothing here is required for the card to work. Keyboard users get the focus
// ring and the link; readers who have asked for reduced motion get a flat card.
// The tilt is the last five per cent, and it is allowed to be absent.

import React from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";

const MAX_DEG = 6;

const TiltCard = ({
  children,
  className = "",
  glare = true,
  max = MAX_DEG,
  ...rest
}) => {
  const ref = React.useRef(null);
  const reduced = useReducedMotion();

  /* Pointer position within the card, normalised to -0.5 … 0.5. */
  const px = useMotionValue(0);
  const py = useMotionValue(0);

  const spring = { stiffness: 220, damping: 22, mass: 0.4 };
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [max, -max]), spring);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-max, max]), spring);

  /* The glare sits where the pointer is, so the highlight and the lean agree.
     Built here rather than inline in the JSX: the glare is conditional, and a
     hook inside a conditional branch is a hook that can stop being called. */
  const glareBg = useTransform(
    [px, py],
    ([x, y]) =>
      `radial-gradient(420px circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, rgba(255,255,255,0.13), transparent 62%)`,
  );

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };

  const reset = () => {
    px.set(0);
    py.set(0);
  };

  if (reduced) {
    return (
      <div ref={ref} className={className} {...rest}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        transformPerspective: 1100,
      }}
      className={`relative ${className}`}
      {...rest}
    >
      {children}
      {glare && (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[4] rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: glareBg }}
        />
      )}
    </motion.div>
  );
};

export default TiltCard;
