// src/hooks/useDragScroll.js
//
// Horizontal strips on this site are native `overflow-x-auto` containers.
// On touch that is already the best possible behaviour — the platform gives
// you momentum and rubber-banding for free, tuned better than anything we
// would write. On a desktop with a plain mouse there is no gesture at all:
// no horizontal wheel axis, no drag, so the content past the right edge is
// effectively unreachable unless someone finds the scrollbar.
//
// This adds the missing half. Press and drag with a mouse, release, and the
// strip keeps travelling and settles — the flick carries its velocity into
// the scroll instead of stopping dead where the pointer stopped.
//
//   const ref = useDragScroll();
//   <div ref={ref} className="flex gap-4 overflow-x-auto">…</div>
//
// Deliberately does nothing for pointerType "touch": the native behaviour is
// better, and running both at once fights the platform.

import { useCallback, useEffect, useRef } from "react";

/* Per-frame velocity retention. 0.95 at ~60fps decays to a stop in roughly
   three quarters of a second — long enough to feel like the strip has weight,
   short enough that it never feels like it is running away. */
const FRICTION = 0.95;
/* Below this (px/frame) the remaining travel is under a pixel, so keeping the
   rAF loop alive only burns battery. */
const MIN_VELOCITY = 0.08;
/* Pointer travel before we treat the gesture as a drag rather than a click.
   Matches the usual platform slop — small enough that a deliberate drag is
   recognised immediately, large enough to survive a shaky click. */
const DRAG_THRESHOLD = 4;

export default function useDragScroll() {
  const elRef = useRef(null);
  const cleanupRef = useRef(null);

  const attach = useCallback((node) => {
    // Detach from any previous node first — React can call a ref callback
    // again with a new node when the tree moves.
    if (cleanupRef.current) {
      cleanupRef.current();
      cleanupRef.current = null;
    }
    elRef.current = node;
    if (!node) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let dragging = false;
    let moved = false;
    let startX = 0;
    let startScroll = 0;
    let lastX = 0;
    let lastT = 0;
    let velocity = 0;
    let rafId = null;

    const isSnapTrack = () => {
      const t = getComputedStyle(node).scrollSnapType;
      return !!t && t !== "none";
    };

    const stopMomentum = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    };

    const glide = () => {
      velocity *= FRICTION;
      if (Math.abs(velocity) < MIN_VELOCITY) {
        rafId = null;
        return;
      }
      const before = node.scrollLeft;
      node.scrollLeft = before - velocity;
      // Hitting either end: the scroll position stops changing, so bleed the
      // remaining velocity off rather than spinning until friction wins.
      if (Math.abs(node.scrollLeft - before) < 0.5) {
        rafId = null;
        return;
      }
      rafId = requestAnimationFrame(glide);
    };

    const onPointerDown = (e) => {
      // Touch keeps the platform's own momentum, which is better than ours.
      if (e.pointerType === "touch") return;
      if (e.button !== 0) return;
      // Nothing to scroll — leave text selection and clicks alone.
      if (node.scrollWidth <= node.clientWidth) return;

      stopMomentum();
      dragging = true;
      moved = false;
      startX = lastX = e.clientX;
      startScroll = node.scrollLeft;
      lastT = e.timeStamp;
      velocity = 0;
      node.style.cursor = "grabbing";
      node.style.userSelect = "none";
    };

    const onPointerMove = (e) => {
      if (!dragging) return;
      const dx = e.clientX - startX;

      if (!moved) {
        if (Math.abs(dx) < DRAG_THRESHOLD) return;
        moved = true;
        // Claim the gesture only once it is clearly a drag, so a simple click
        // on a card inside the strip still reaches the card.
        node.setPointerCapture?.(e.pointerId);
      }

      node.scrollLeft = startScroll - dx;

      // Velocity from the most recent segment only. Averaging a longer window
      // smears a sharp flick into a limp one.
      const dt = e.timeStamp - lastT;
      if (dt > 0) velocity = ((e.clientX - lastX) / dt) * 16.67; // → px/frame
      lastX = e.clientX;
      lastT = e.timeStamp;
    };

    const endDrag = (e) => {
      if (!dragging) return;
      dragging = false;
      node.style.cursor = "";
      node.style.userSelect = "";
      if (e?.pointerId != null) node.releasePointerCapture?.(e.pointerId);

      if (!moved) return;
      // A flick that ended while the pointer was already still should not
      // coast: if the last sample is stale the finger had stopped.
      const stale = e && e.timeStamp - lastT > 90;
      if (reduceMotion || stale || Math.abs(velocity) <= MIN_VELOCITY) return;

      // A snap track has to end on a snap point, and driving scrollLeft frame
      // by frame fights the snapping the whole way. Instead, project where the
      // friction would have run out and hand that target to the browser, which
      // eases there and settles on the nearest snap point itself.
      // Sum of a geometric series: v + vf + vf² … = v / (1 - f).
      if (isSnapTrack()) {
        node.scrollTo({
          left: node.scrollLeft - velocity / (1 - FRICTION),
          behavior: "smooth",
        });
        return;
      }
      rafId = requestAnimationFrame(glide);
    };

    // Swallow the click that follows a drag, so releasing over a card does
    // not also open it.
    const onClickCapture = (e) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
        moved = false;
      }
    };

    // Any fresh input intent cancels the coast, the way flicking a scroll
    // view and then touching it again stops it.
    const onWheel = () => stopMomentum();

    node.style.cursor = node.scrollWidth > node.clientWidth ? "grab" : "";
    node.addEventListener("pointerdown", onPointerDown);
    node.addEventListener("pointermove", onPointerMove);
    node.addEventListener("pointerup", endDrag);
    node.addEventListener("pointercancel", endDrag);
    node.addEventListener("pointerleave", endDrag);
    node.addEventListener("click", onClickCapture, true);
    node.addEventListener("wheel", onWheel, { passive: true });

    cleanupRef.current = () => {
      stopMomentum();
      node.style.cursor = "";
      node.style.userSelect = "";
      node.removeEventListener("pointerdown", onPointerDown);
      node.removeEventListener("pointermove", onPointerMove);
      node.removeEventListener("pointerup", endDrag);
      node.removeEventListener("pointercancel", endDrag);
      node.removeEventListener("pointerleave", endDrag);
      node.removeEventListener("click", onClickCapture, true);
      node.removeEventListener("wheel", onWheel);
    };
  }, []);

  useEffect(
    () => () => {
      if (cleanupRef.current) cleanupRef.current();
    },
    [],
  );

  return attach;
}
