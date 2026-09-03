// src/components/common/LiveEmbed.jsx
//
// The real site, running, inside the case study.
//
// A screenshot proves a site was designed. An embed proves it works — a reader
// can scroll it, open the nav, follow a link. For a website case study that is
// a materially stronger claim, and it costs one iframe.
//
// Two things it has to get right:
//
// 1. It must not steal the page's scroll. The iframe stays inert until the
//    reader clicks into it, so scrolling past does not trap the wheel inside
//    the embedded document.
// 2. It must degrade. If the embedded origin refuses framing, the reader is
//    left with a blank rectangle and no idea why — so the poster stays until
//    the frame is actually interacted with, and the open-in-a-tab link is
//    always present rather than being a fallback nobody sees.

import React, { useState } from "react";

const G = "#a3e635";

const LiveEmbed = ({
  src,
  poster,
  title = "Live site",
  ratio = "16/10",
  openLabel = "Open in a new tab",
}) => {
  const [live, setLive] = useState(false);

  return (
    <div className="relative">
      <div
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#04101F]"
        style={{ aspectRatio: ratio }}
      >
        {live ? (
          <iframe
            src={src}
            title={title}
            loading="lazy"
            className="h-full w-full border-0"
            /* No allow-top-navigation: an embedded page must not be able to
               move the portfolio out from under the reader. */
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
          />
        ) : (
          <>
            {poster && (
              <img
                src={poster}
                alt={title}
                className="h-full w-full object-cover object-top"
              />
            )}
            <button
              type="button"
              onClick={() => setLive(true)}
              className="group absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/45 backdrop-blur-[2px] transition-colors duration-300 hover:bg-black/30"
            >
              <span
                className="flex h-16 w-16 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110"
                style={{ background: G, boxShadow: `0 0 40px ${G}55` }}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="#04101F"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="text-[14px] font-semibold text-white">
                Load the live site here
              </span>
              <span className="max-w-[42ch] text-center text-[13.5px] leading-[1.5] text-white/55">
                It runs inside this frame — scroll it, open the menu, follow a
                link.
              </span>
            </button>
          </>
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <a
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg px-5 py-3 text-[14.5px] font-bold text-black transition-[filter] duration-200 hover:brightness-110"
          style={{
            background: "linear-gradient(180deg,#7BF003 0%,#3E7B00 100%)",
          }}
        >
          {openLabel}
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M7 17 17 7M9 7h8v8"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
        {live && (
          <button
            type="button"
            onClick={() => setLive(false)}
            className="rounded-lg border px-4 py-2.5 text-[14px] font-semibold transition-colors duration-200"
            style={{
              borderColor: "rgba(255,255,255,0.16)",
              color: "rgba(255,255,255,0.6)",
            }}
          >
            Stop the embed
          </button>
        )}
      </div>
    </div>
  );
};

export default LiveEmbed;
