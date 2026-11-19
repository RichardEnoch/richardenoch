// scripts/prerender.mjs
//
// Runs after `vite build`. Turns every public page into a finished HTML file.
//
// Why: the site is a React app, so the server used to send every address the
// same empty <div id="root"></div> and let JavaScript build the page. Browsers
// do that. Link previews (LinkedIn, WhatsApp, Slack), AI tools, recruiting
// tools and most crawlers do not — to them every page was blank, with the
// same generic title. Now each page is sent with its text, title and preview
// tags already in it, and React takes over once it loads.
//
// Which pages: everything in public/sitemap.xml. One list decides both what
// search engines are told about and what gets pre-rendered, so the two cannot
// drift. Anything not listed (booking forms, private offer links) is served
// the plain app shell (_app.html) and renders in the browser as before.

// React's production build: faster, and the same code the browser runs.
process.env.NODE_ENV = "production";

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const ssrEntry = path.join(root, "dist-ssr", "entry-server.js");

const sitemap = fs.readFileSync(path.join(root, "public", "sitemap.xml"), "utf8");
const paths = [
  ...new Set(
    [...sitemap.matchAll(/<loc>https?:\/\/[^/<]+(\/[^<]*)<\/loc>/g)].map(
      (m) => m[1].replace(/\/+$/, "") || "/",
    ),
  ),
];

const shell = fs.readFileSync(path.join(dist, "index.html"), "utf8");
// The untouched shell, for every address that is not pre-rendered.
fs.writeFileSync(path.join(dist, "_app.html"), shell);

const { render } = await import(pathToFileURL(ssrEntry).href);

/* React emits the page's <title>, <meta> and <link> tags first, ahead of the
   markup. Peel them off so they can go in <head>, where scrapers look. */
const HEAD_TAG = /^(?:<title>[\s\S]*?<\/title>|<meta\b[^>]*\/?>|<link\b[^>]*\/?>)/;

function splitHead(html) {
  const tags = [];
  let rest = html;
  for (let m = rest.match(HEAD_TAG); m; m = rest.match(HEAD_TAG)) {
    tags.push(m[0]);
    rest = rest.slice(m[0].length);
  }
  return { tags, body: rest };
}

const keyOf = (tag) => {
  if (tag.startsWith("<title")) return "title";
  const m = tag.match(/\b(name|property)="([^"]+)"/);
  if (m) return `${m[1]}:${m[2]}`;
  if (/rel="canonical"/.test(tag)) return "canonical";
  return null;
};

function buildPage(tags, body) {
  // Image preloads are dropped: the images are now in the HTML itself, so the
  // browser finds them anyway, and a preload list can only get stale.
  const head = tags
    .filter((t) => !/rel="preload"/.test(t))
    // Marked so main.jsx can remove them once React writes its own copies.
    .map((t) => t.replace(/^<(title|meta|link)\b/, "<$1 data-prerender"));
  const replaced = new Set(head.map(keyOf).filter(Boolean));

  // Remove the site-wide fallback tags this page provides its own version of.
  let out = shell.replace(
    /\s*(?:<title>[\s\S]*?<\/title>|<meta\b[^>]*>|<link\b[^>]*rel="canonical"[^>]*>)/g,
    (tag) => {
      const k = keyOf(tag.trim());
      return k && replaced.has(k) ? "" : tag;
    },
  );

  out = out.replace("</head>", `    ${head.join("\n    ")}\n  </head>`);
  out = out.replace('<div id="root"></div>', `<div id="root">${body}</div>`);
  return out;
}

let failed = 0;
for (const p of paths) {
  try {
    const result = await render(p);
    if (result.redirect) {
      console.warn(`  skip  ${p}  (redirect)`);
      continue;
    }
    if (result.status && result.status !== 200) {
      throw new Error(`rendered with status ${result.status}`);
    }
    if (result.deferred) {
      console.warn(`  warn  ${p}  part of the page still needs JavaScript`);
    }
    const { tags, body } = splitHead(result.html);
    // /projects/niqs -> projects/niqs.html, served at /projects/niqs by
    // Vercel's cleanUrls. The home page overwrites index.html.
    const file = p === "/" ? "index.html" : `${p.slice(1)}.html`;
    const target = path.join(dist, file);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, buildPage(tags, body));
    console.log(`  ok    ${p}`);
  } catch (err) {
    failed++;
    console.error(`  FAIL  ${p}  ${err?.message || err}`);
  }
}

console.log(`\nPre-rendered ${paths.length - failed} of ${paths.length} pages.`);
// A page that fails to render still works in the browser (it falls back to
// the shell), so warn rather than break the deploy.
if (failed) console.warn(`${failed} page(s) fell back to the app shell.`);
