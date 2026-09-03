// src/components/common/Slot.jsx
//
// A labelled placeholder that occupies the exact frame a real asset will take.
//
// Case-study pages get built before their screens exist. The alternative —
// leaving the markup out until the image arrives — means the layout is never
// actually tested, and every asset drop turns into a fresh layout problem. This
// renders the frame at its final ratio and says what belongs in it, so the page
// can be reviewed now and the swap later is one prop.
//
// When the asset lands, pass `src` and the placeholder disappears; nothing else
// about the call site changes.
//
// FITHEIGHT. For a screenshot of desktop software, the useful constraint is
// height, not width: a 16:9 frame filling a 1600px column is 900px tall, so on
// a laptop the reader never sees a whole screen at once and has to scroll a
// picture. Passing `fitHeight="76vh"` caps the frame by viewport height and
// lets width follow from the ratio, so the screen always lands whole.

import React from "react";

const G = "#a3e635";

/* "16/9" → 1.7778. Anything unparseable falls back to 16:9 rather than
   producing a NaN in a calc() that would silently collapse the frame. */
function ratioToNumber(ratio) {
  const [w, h] = String(ratio)
    .split("/")
    .map((n) => parseFloat(n.trim()));
  return Number.isFinite(w) && Number.isFinite(h) && h !== 0 ? w / h : 16 / 9;
}

const Slot = ({
  src,
  alt = "",
  ratio = "16/9",
  label,
  note,
  kind = "Image",
  fitHeight,
  className = "",
}) => {
  // Height-bounded frames stay LEFT aligned rather than centring in the
  // leftover space. The whole case-study layout is built on a single left edge
  // — prose and media start at the same x and only the right edge moves — and
  // centring a capped frame would break that spine for the one element most
  // likely to be read against the heading above it.
  const bound = fitHeight
    ? { maxWidth: `calc(${fitHeight} * ${ratioToNumber(ratio)})` }
    : null;

  if (src) {
    return (
      <div
        className={`w-full overflow-hidden rounded-2xl border border-white/8 bg-white/[0.02] ${className}`}
        style={{ aspectRatio: ratio, ...bound }}
      >
        <img
          src={src}
          alt={alt || label || ""}
          loading="lazy"
          className="h-full w-full object-cover object-center"
        />
      </div>
    );
  }

  return (
    <figure
      className={`relative m-0 flex w-full flex-col items-center justify-center gap-2.5 rounded-2xl p-6 text-center ${className}`}
      style={{
        aspectRatio: ratio,
        border: `1px dashed ${G}33`,
        background: `linear-gradient(180deg, ${G}0A, ${G}04)`,
        ...bound,
      }}
    >
      {/* inner hairline — reads as a frame waiting for content, not a broken box */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-[7px] rounded-xl"
        style={{ border: `1px solid ${G}0F` }}
      />
      <span
        className="rounded-md px-2.5 py-1.5 text-[9.5px] font-semibold uppercase tracking-[0.2em]"
        style={{ color: G, border: `1px solid ${G}33`, background: `${G}0D` }}
      >
        {kind}
      </span>
      {label && (
        <figcaption className="max-w-[46ch] text-[14px] font-medium leading-[1.45] text-white/70">
          {label}
        </figcaption>
      )}
      {note && (
        <span className="max-w-[52ch] text-[12px] leading-[1.5] text-white/35">
          {note}
        </span>
      )}
    </figure>
  );
};

export default Slot;
