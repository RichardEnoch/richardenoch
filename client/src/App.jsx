// src/App.jsx
import { useState, useEffect, useRef, Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Lenis from "lenis";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import ScrollToTop from "./components/common/ScrollToTop.jsx";
import FontScaler from "./components/common/FontScaler.jsx";
import CustomCursor from "./components/common/CustomCursor.jsx";
import Preloader from "./components/common/Preloader.jsx";

const MIN_MS = 900; // floor, so the logo never just flashes
const MAX_MS = 9000; // ceiling, so a stalled asset can never trap anyone

function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const observerRef = useRef(null);
  /* Flipping this re-runs the Lenis effect, so changing the OS motion
     preference takes hold without a reload. */
  const [smoothScroll, setSmoothScroll] = useState(true);

  /* Real progress. Only eager images count — anything marked lazy is below
     the fold and deliberately not part of what the visitor waits for, so
     including it would leave the bar stuck short of 100 forever. Fonts get
     a slice of their own because text popping late is very visible. */
  useEffect(() => {
    const start = Date.now();
    let done = false;
    let raf;

    const finish = () => {
      if (done) return;
      done = true;
      setProgress(100);
      const wait = Math.max(0, MIN_MS - (Date.now() - start));
      setTimeout(() => setLoading(false), wait);
    };

    let fontsReady = false;
    document.fonts?.ready
      .then(() => {
        fontsReady = true;
      })
      .catch(() => {
        fontsReady = true;
      });

    const tick = () => {
      const imgs = Array.from(document.images).filter(
        (img) => img.loading !== "lazy" && img.src,
      );
      const loaded = imgs.filter(
        (img) => img.complete && img.naturalWidth > 0,
      ).length;
      const imgPct = imgs.length ? loaded / imgs.length : 1;
      const pct = Math.round((imgPct * 0.85 + (fontsReady ? 0.15 : 0)) * 100);

      setProgress((prev) => Math.max(prev, Math.min(99, pct)));

      if (imgs.length && loaded === imgs.length && fontsReady) finish();
      else raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onLoad = () => finish();
    if (document.readyState === "complete") finish();
    else window.addEventListener("load", onLoad, { once: true });

    const ceiling = setTimeout(finish, MAX_MS);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(ceiling);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  /* Once the page is revealed, quietly warm the images further down it —
     in small batches during idle time, so by the time someone scrolls to a
     section its artwork is already decoded and waiting. Re-runs per route. */
  useEffect(() => {
    if (loading) return;
    let cancelled = false;

    /* Warm images as they APPROACH the viewport, not the whole page. The
       first version of this pulled every lazy image on mount — on the home
       page that is 93 images, which is why a cold load measured 14.6 MB when
       the page only needs 2 MB. This widens the browser's lazy threshold
       (~1250px in Chrome) to about two screens ahead and stops there. */
    const warm = () => {
      if (cancelled) return;
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const img = entry.target;
            io.unobserve(img);
            if (img.complete || !img.src) return;
            const pre = new Image();
            pre.decoding = "async";
            pre.src = img.src;
          });
        },
        { rootMargin: "1800px 0px" }, // roughly two screens of runway
      );

      document
        .querySelectorAll('img[loading="lazy"]')
        .forEach((img) => io.observe(img));

      observerRef.current = io;
    };

    const id =
      typeof window.requestIdleCallback === "function"
        ? window.requestIdleCallback(warm, { timeout: 3000 })
        : setTimeout(warm, 1500);

    return () => {
      cancelled = true;
      observerRef.current?.disconnect();
      observerRef.current = null;
      if (typeof window.cancelIdleCallback === "function")
        window.cancelIdleCallback(id);
      else clearTimeout(id);
    };
  }, [loading, location.pathname]);

  /* Buttery smooth scrolling — Lenis eases native scroll, so
     scroll-driven framer-motion sections keep working untouched.

     Skipped entirely when the visitor has asked for reduced motion. Hijacked
     scrolling is one of the most common vestibular triggers there is, and it
     cannot be softened from CSS — the easing lives in JS, so the only honest
     answer is to hand the scroll back to the browser. Listening for changes
     means toggling the OS setting takes effect without a reload. */
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setSmoothScroll(!query.matches);
    query.addEventListener("change", onChange);

    if (query.matches) {
      // Native scrolling only. ScrollToTop falls back to window.scrollTo when
      // window.__lenis is absent, so leaving it null is the supported path.
      return () => query.removeEventListener("change", onChange);
    }

    const lenis = new Lenis({
      duration: 0.9,
      smoothWheel: true,
      wheelMultiplier: 1.2,
    });
    // Exposed so route changes (ScrollToTop) can reset Lenis's internal
    // target — a bare window.scrollTo leaves it stale and the next wheel
    // input animates back from the old position (feels like a hang).
    window.__lenis = lenis;
    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => {
      query.removeEventListener("change", onChange);
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.__lenis = null;
    };
  }, [smoothScroll]);

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0B0B] text-white w-full max-w-full">
      <AnimatePresence>
        {loading && <Preloader key="preloader" progress={progress} />}
      </AnimatePresence>

      <Nav />
      <ScrollToTop />

      <main className="w-full px-[4px] pt-0 pb-8 flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.45,
              ease: [0.22, 0.61, 0.36, 1],
            }}
          >
            {/* Every route except Home is a lazy chunk, so the landing page
                no longer ships the JavaScript for all 25 other pages. The
                fallback is a plain ground rather than a spinner — chunks are
                small and usually arrive within a frame or two. */}
            <Suspense fallback={<div className="min-h-screen bg-[#0B0B0B]" />}>
              <Outlet />
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
      <FontScaler />
      <CustomCursor />
    </div>
  );
}

export default App;
