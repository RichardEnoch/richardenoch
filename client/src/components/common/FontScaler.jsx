// src/components/common/FontScaler.jsx
//
// The reader's own text-size control, floating bottom-right.
//
// On a desktop it sits in empty margin and costs nothing. On a 390px phone it
// is 180px of permanently-fixed furniture over the content — it was sitting
// squarely on top of the "Open the NIQS project" button on /projects, which
// makes a control meant to help accessibility into a conversion bug.
//
// Two changes fix that without removing the feature: it collapses to just the
// two buttons on small screens (the px readout is a nicety, not the control),
// and it gets out of the way while the reader is scrolling down, coming back
// the moment they scroll up or stop. That is the same behaviour phone browsers
// give their own chrome, so it needs no explanation.
import React, { useCallback, useEffect, useRef, useState } from "react";

const DEFAULT_SIZE = 20; // must match index.css html { font-size }
const MIN_SIZE = 14;
const MAX_SIZE = 28;
const STORAGE_KEY = "adlm-font-size";

const FontScaler = () => {
  const [size, setSize] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? Number(saved) : DEFAULT_SIZE;
    } catch {
      return DEFAULT_SIZE;
    }
  });

  // Apply to document root whenever size changes
  useEffect(() => {
    document.documentElement.style.fontSize = `${size}px`;
    try {
      localStorage.setItem(STORAGE_KEY, String(size));
    } catch {
      // ignore storage errors
    }
  }, [size]);

  const increase = useCallback(() => {
    setSize((prev) => Math.min(prev + 1, MAX_SIZE));
  }, []);

  const decrease = useCallback(() => {
    setSize((prev) => Math.max(prev - 1, MIN_SIZE));
  }, []);

  const reset = useCallback(() => {
    setSize(DEFAULT_SIZE);
  }, []);

  /* Hide while scrolling down, show on any upward scroll or after a pause.
     The 12px threshold keeps it still through the jitter of a touch scroll. */
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  useEffect(() => {
    let idle;
    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - lastY.current;
      if (Math.abs(dy) > 12) {
        setHidden(dy > 0 && y > 200);
        lastY.current = y;
      }
      clearTimeout(idle);
      idle = setTimeout(() => setHidden(false), 700);
    };
    lastY.current = window.scrollY;
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(idle);
    };
  }, []);

  return (
    <div
      className={`
        fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6
        flex items-center gap-0.5 sm:gap-1
        rounded-full
        border border-white/20
        bg-black/80 backdrop-blur-md
        px-1.5 py-1 sm:px-2 sm:py-1.5
        shadow-[0_4px_24px_rgba(0,0,0,0.6)]
        transition-[transform,opacity] duration-300 ease-out
        motion-reduce:transition-none
        ${hidden ? "pointer-events-none translate-y-6 opacity-0" : "translate-y-0 opacity-100"}
      `}
      aria-hidden={hidden}
      style={{ fontSize: "16px" }} /* fixed size so it doesn't scale itself */
    >
      {/* Decrease */}
      <button
        type="button"
        onClick={decrease}
        disabled={size <= MIN_SIZE}
        className="
          flex h-8 w-8 items-center justify-center
          rounded-full text-white/80
          hover:bg-white/10 hover:text-white
          disabled:opacity-30 disabled:cursor-not-allowed
          transition text-sm font-bold
        "
        title="Decrease text size"
        aria-label={`Decrease text size, currently ${size} pixels`}
      >
        A-
      </button>

      {/* Current size indicator */}
      <span
        className="
          hidden min-w-[36px] text-center sm:block
          text-[11px] font-medium text-white/60
          select-none
        "
      >
        {size}px
      </span>

      {/* Increase */}
      <button
        type="button"
        onClick={increase}
        disabled={size >= MAX_SIZE}
        className="
          flex h-8 w-8 items-center justify-center
          rounded-full text-white/80
          hover:bg-white/10 hover:text-white
          disabled:opacity-30 disabled:cursor-not-allowed
          transition text-sm font-bold
        "
        title="Increase text size"
        aria-label={`Increase text size, currently ${size} pixels`}
      >
        A+
      </button>

      {/* Reset */}
      {size !== DEFAULT_SIZE && (
        <button
          type="button"
          onClick={reset}
          className="
            ml-0.5 flex h-7 items-center justify-center
            rounded-full px-2
            text-[10px] font-medium text-lime-400
            hover:bg-lime-400/10
            transition
          "
          title="Reset to default"
        >
          Reset
        </button>
      )}
    </div>
  );
};

export default FontScaler;
