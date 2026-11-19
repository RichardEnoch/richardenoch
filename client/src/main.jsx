// src/main.jsx — the browser entry.
import React from "react";
import ReactDom from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import "./index.css";
import { routes } from "./routes.jsx";

const router = createBrowserRouter(routes);

const app = (
  <React.StrictMode>
    <HelmetProvider>
      {/* reducedMotion="user" makes every motion component on the site honour
          the visitor's OS setting: transform and layout animations are held at
          their target value, while opacity and colour still cross-fade. That
          matters here because ~55 files animate and only one of them checked
          the preference on its own — this covers all of them at the root
          rather than asking every future component to remember. */}
      <MotionConfig reducedMotion="user">
        <RouterProvider router={router} />
      </MotionConfig>
    </HelmetProvider>
  </React.StrictMode>
);

/* Public pages arrive already rendered (scripts/prerender.mjs), so crawlers,
   link previews and AI tools can read them without running JavaScript. Those
   are hydrated: React takes over the HTML that is already there instead of
   throwing it away. Pages that are not pre-rendered (booking forms, private
   offer links) arrive as an empty shell and are rendered from scratch. */
const container = document.getElementById("root");
if (container.hasChildNodes()) {
  ReactDom.hydrateRoot(container, app);
  dropPrerenderedHead();
} else {
  ReactDom.createRoot(container).render(app);
}

/* The pre-rendered page carries its own <title> and meta tags for scrapers.
   Once React writes its copies (which it then keeps updated as you move
   around the site), the originals are stale duplicates, so they go. Waiting
   for React's title rather than removing them up front means the tab never
   shows a bare URL while the page's code is still loading. */
function dropPrerenderedHead() {
  const stale = () => document.head.querySelectorAll("[data-prerender]");
  if (!stale().length) return;
  const tryDrop = () => {
    if (!document.head.querySelector("title:not([data-prerender])")) return false;
    stale().forEach((el) => el.remove());
    return true;
  };
  if (tryDrop()) return;
  const observer = new MutationObserver(() => tryDrop() && observer.disconnect());
  observer.observe(document.head, { childList: true });
}
