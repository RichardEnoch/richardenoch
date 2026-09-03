import React from "react";
import { motion } from "framer-motion";
import {
  Search01Icon,
  BulbIcon,
  PencilEdit01Icon,
  TestTubeIcon,
} from "hugeicons-react";

/* The four steps here used to be Discover / Ideate / Design / Test & Refine —
   the diagram every design site carries, which tells a reader nothing. These
   four are how the work actually runs, and they run the same way whether the
   job is an identity system, a pitch deck or a hundred-screen product. */
const steps = [
  {
    title: "Understand the brief",
    desc: "Read it properly, then ask the questions it did not answer. Most briefs describe a deliverable when what I need is the problem underneath it.",
    icon: Search01Icon,
  },
  {
    title: "Research",
    desc: "What already exists, what the competition is doing, what the audience is used to, and — where I have it — what I know of the trade first-hand.",
    icon: BulbIcon,
  },
  {
    title: "Brainstorm and ideate",
    desc: "Sketching, drafting, mapping ideas out and throwing most of them away. This is the messy part, and skipping it shows later.",
    icon: PencilEdit01Icon,
  },
  {
    title: "Execute",
    desc: "Build it, take it out to every place it has to live, and check it against the problem I started with. If the problem is not solved, it is not finished — however good it looks.",
    icon: TestTubeIcon,
  },
];

const DesignProcess = () => {
  return (
    <section className="relative w-full bg-[#050505] py-16 lg:py-24">
      {/* soft glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-lime-500/12 blur-[200px]" />
      </div>

      <div className="relative mx-auto max-w-[1356px] px-4 lg:px-6">
        {/* Header — centered, no card wrapper */}
        <div className="flex flex-col items-center gap-4 text-center">
          {/* pill */}
          <div className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-1.5 backdrop-blur">
            <span className="text-xs font-semibold tracking-tight text-white">
              Process
            </span>
          </div>

          {/* title */}
          <h2
            className="
              max-w-[880px]
              text-3xl sm:text-4xl md:text-5xl lg:text-[56px] xl:text-[64px]
              font-['Outfit'] font-semibold
              leading-tight lg:leading-[1.15]
              tracking-[-0.05em]
              bg-gradient-to-b from-white via-white to-neutral-300
              bg-clip-text text-transparent
            "
          >
            How the work actually goes
          </h2>

          <p className="max-w-[592px] text-[15px] sm:text-[17px] font-normal leading-7 text-neutral-200">
            Not a process diagram. This is the order things happen in, and what
            each step is for.
          </p>
        </div>

        {/* Steps grid — 4 columns, matching Figma 303px wide cards */}
        <div className="mt-14 grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                className="
                  group flex flex-col justify-start
                  rounded-[22px]
                  border border-[#202020]
                  bg-[#0b0b0b]
                  px-7 py-5
                  min-h-[181px]
                  transition
                  hover:-translate-y-[3px]
                  hover:border-lime-400
                  hover:shadow-[0_0_24px_rgba(190,242,100,0.18)]
                "
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  ease: [0.22, 0.61, 0.36, 1],
                  delay: 0.15 + idx * 0.12,
                }}
                viewport={{ once: true, amount: 0.4 }}
              >
                {/* icon box */}
                <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-md  bg-black/60">
                  <Icon size={24} className="text-lime-400" />
                </div>

                {/* text */}
                <div className="flex flex-col gap-2">
                  <h3
                    className="
                      font-['Outfit']
                      text-base sm:text-[17px] lg:text-[22px]
                      font-semibold
                      leading-[1.4]
                      bg-gradient-to-b from-white via-white to-neutral-300
                      bg-clip-text text-transparent
                      lg:mb-[-6px]
                    "
                  >
                    {step.title}
                  </h3>

                  <p className="text-[15px] sm:text-[16px] leading-[1.6] text-neutral-300">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DesignProcess;
