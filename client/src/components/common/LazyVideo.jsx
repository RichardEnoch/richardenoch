// src/components/common/LazyVideo.jsx
//
// Background loops are decoration, not content — they should never be part
// of what a visitor waits for. The <video> renders immediately with its
// poster, and the source is only attached once the page is past its critical
// work, so 5.8 MB of MP4 stops competing with the landing page.
//
//   eager  — above the fold. Attaches on the first idle frame after paint.
//   (default) below the fold. Attaches when it scrolls near the viewport.

import { useEffect, useRef, useState } from "react";

const LazyVideo = ({ src, poster, className = "", eager = false, ...rest }) => {
  const ref = useRef(null);
  const [source, setSource] = useState(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || source) return;
    const attach = () => setSource(src);

    if (eager) {
      /* Wait for an idle moment rather than a fixed delay — on a fast
         connection that is almost immediately, on a slow one it yields to
         whatever still matters more. */
      if (typeof window.requestIdleCallback === "function") {
        const id = window.requestIdleCallback(attach, { timeout: 2500 });
        return () => window.cancelIdleCallback?.(id);
      }
      const id = setTimeout(attach, 1200);
      return () => clearTimeout(id);
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          attach();
          io.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [src, eager, source]);

  return (
    <video
      ref={ref}
      src={source || undefined}
      poster={poster}
      preload="none"
      autoPlay
      muted
      loop
      playsInline
      className={className}
      {...rest}
    />
  );
};

export default LazyVideo;
