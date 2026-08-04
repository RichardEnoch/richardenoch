// src/components/common/Preloader.jsx
//
// The bar reports real loading progress, not a fixed animation. App counts
// the assets the first screen actually needs and passes the percentage down,
// so the bar reaching 100% means the page behind it is genuinely ready.

import React from "react";
import { motion } from "framer-motion";

const Preloader = ({ progress = 0 }) => (
  <motion.div
    className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#050505]"
    exit={{ opacity: 0 }}
    transition={{ duration: 0.65, ease: [0.22, 0.61, 0.36, 1] }}
  >
    {/* Logo */}
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1], delay: 0.1 }}
      className="mb-7"
    >
      <img
        src="/reni-logo.png"
        alt=""
        className="h-[72px] w-[72px] object-contain"
        draggable="false"
      />
    </motion.div>

    {/* Progress track — width follows real asset progress */}
    <motion.div
      className="w-[100px] h-[2px] rounded-full overflow-hidden bg-white/10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.3 }}
    >
      <motion.div
        className="h-full rounded-full bg-lime-400"
        initial={{ width: "0%" }}
        animate={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      />
    </motion.div>

    {/* Name label + real percentage */}
    <motion.p
      className="mt-5 text-[10px] font-semibold tracking-[0.3em] uppercase text-white/25"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.35, duration: 0.4 }}
    >
      Richard Enoch
      <span className="ml-3 tabular-nums text-white/40">
        {Math.min(100, Math.round(progress))}%
      </span>
    </motion.p>
  </motion.div>
);

export default Preloader;
