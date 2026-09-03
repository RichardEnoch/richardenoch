// src/components/ProjectPage/SitemapTree.jsx
//
// One band of an information architecture, drawn rather than photographed.
//
// This is the "after" half of AdlmSitemap pulled out so other case studies can
// use the same treatment. The rules that make it readable are the ones worth
// keeping: it runs across the page instead of down it, every label is real
// selectable text rather than a screenshot, and a destination is a short tree
// — a route, an optional line saying what it is for, and the children under it.
//
// A sitemap laid out as tall stacked columns becomes three viewports long and
// drops its type to a size nobody reads. A wide object gets a wide layout.

import React from "react";

const Tag = ({ label, color }) => (
  <span
    className="ml-2 rounded px-1.5 py-0.5 align-middle text-[10px] font-semibold uppercase tracking-[0.1em]"
    style={{ color, background: `${color}14`, border: `1px solid ${color}33` }}
  >
    {label}
  </span>
);

/* nodes: [{ t, note, tag, accent, kids: [{ t, note, tag }] }] */
const SitemapTree = ({
  nodes = [],
  accent = "#a3e635",
  kicker,
  title,
  sub,
  cols = "sm:grid-cols-2 lg:grid-cols-4",
  className = "",
}) => (
  <div
    className={`rounded-2xl border p-6 sm:p-8 ${className}`}
    style={{ borderColor: `${accent}30`, background: `${accent}07` }}
  >
    {(kicker || title || sub) && (
      <div className="mb-6 flex flex-wrap items-baseline gap-x-4 gap-y-1">
        {kicker && (
          <p
            className="text-[11px] font-semibold uppercase tracking-[0.2em]"
            style={{ color: accent }}
          >
            {kicker}
          </p>
        )}
        {title && (
          <h4 className="text-[16.5px] font-medium text-white">{title}</h4>
        )}
        {sub && <p className="text-[14px] text-white/35">{sub}</p>}
      </div>
    )}

    <ul className={`m-0 grid list-none gap-x-6 gap-y-7 p-0 ${cols}`}>
      {nodes.map((r) => (
        <li key={r.t}>
          <div
            className="border-l-2 pl-3.5"
            style={{ borderColor: r.accent || accent }}
          >
            <code className="block text-[15px] font-medium leading-[1.35] text-white">
              {r.t}
              {r.tag && <Tag label={r.tag} color={r.accent || accent} />}
            </code>
            {r.note && (
              <span className="mt-1 block text-[12.5px] leading-[1.5] text-white/40">
                {r.note}
              </span>
            )}
          </div>

          {r.kids?.length > 0 && (
            <ul className="m-0 mt-3 list-none space-y-2 p-0 pl-3.5">
              {r.kids.map((k) => (
                <li
                  key={k.t}
                  className="border-l pl-3.5"
                  style={{ borderColor: "rgba(255,255,255,0.12)" }}
                >
                  <code className="block text-[13.5px] leading-[1.45] text-white/60">
                    {k.t}
                    {k.tag && <Tag label={k.tag} color={r.accent || accent} />}
                  </code>
                  {k.note && (
                    <span className="mt-0.5 block text-[12px] leading-[1.5] text-white/30">
                      {k.note}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  </div>
);

export default SitemapTree;
