// src/entry-server.jsx — the build-time entry.
//
// Used only by scripts/prerender.mjs, never shipped to the browser. Renders
// one address to HTML, waiting for every lazy page chunk to arrive, so the
// output is the finished page rather than the loading fallback.
import React from "react";
import { prerenderToNodeStream } from "react-dom/static";
import { HelmetProvider } from "react-helmet-async";
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from "react-router-dom";
import { MotionConfig } from "framer-motion";
import { routes } from "./routes.jsx";

const handler = createStaticHandler(routes);

export async function render(path) {
  const context = await handler.query(
    new Request(`https://richardenoch.com${path}`),
  );
  // A redirect route (e.g. /cv) has nothing to render.
  if (context instanceof Response) return { redirect: true };

  const router = createStaticRouter(handler.dataRoutes, context);
  const tree = (
    <React.StrictMode>
      <HelmetProvider>
        <MotionConfig reducedMotion="user">
          <StaticRouterProvider
            router={router}
            context={context}
            hydrate={false}
          />
        </MotionConfig>
      </HelmetProvider>
    </React.StrictMode>
  );

  const html = await toString(tree);
  return {
    html,
    status: context.statusCode,
    // Anything still deferred means some content will not be visible
    // without JavaScript; the prerender script reports it.
    deferred: html.includes('<template id="B:'),
  };
}

async function toString(tree) {
  /* By default React moves any large section (over ~12 KB) into a hidden
     block that a script swaps in later, so long pages can stream in pieces.
     That is exactly what a reader without JavaScript cannot see. The whole
     page is written at build time, so there is nothing to stream: keep every
     section inline. */
  const { prelude } = await prerenderToNodeStream(tree, {
    progressiveChunkSize: Infinity,
  });
  let html = "";
  for await (const chunk of prelude) html += chunk;
  return html;
}
