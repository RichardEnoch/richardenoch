// src/components/common/StatusPill.jsx
//
// One pill, one fact: what happened to this project.
//
// Deliberately quieter than the discipline tags beside it. The state is not a
// badge to be won — "Not adopted" sits in exactly the same shape as "Live",
// and only work that is genuinely out in the world takes the accent colour.

import React from "react";
import { statusFor, isLive } from "../../data/projectStatus";

const StatusPill = ({ slug, state, note, className = "" }) => {
  const resolved = state ? { state, note } : statusFor(slug);
  if (!resolved) return null;

  const live = isLive(resolved.state);

  return (
    <span
      title={resolved.note || undefined}
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-[9px] border px-1.5 py-1 text-[10px] font-semibold sm:text-[11px] ${
        live
          ? "border-[#89ff00]/40 text-[#89ff00]/90"
          : "border-white/18 text-white/50"
      } ${className}`}
    >
      <span
        aria-hidden="true"
        className="h-1.5 w-1.5 rounded-full"
        style={{
          background: live ? "#89ff00" : "rgba(255,255,255,0.35)",
        }}
      />
      {resolved.state}
    </span>
  );
};

export default StatusPill;
