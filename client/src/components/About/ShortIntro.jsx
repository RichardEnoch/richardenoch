// src/components/About/ShortIntro.jsx
import React from "react";
import { motion } from "framer-motion";

const ShortIntro = () => {
  return (
    <section className="w-full bg-[#050505]">
      <div className="mx-auto max-w-[961px] px-4 pt-16 sm:pt-20 lg:pt-24 pb-16 sm:pb-20 lg:pb-24">
        {/* Heading */}
        <motion.h2
          className="
            text-[28px] sm:text-[34px] lg:text-[40px]
            font-['Outfit'] font-medium
            leading-tight
            tracking-[-0.05em]
            bg-gradient-to-b from-white via-white to-neutral-300
            bg-clip-text text-transparent
          "
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
        >
          Short introduction
        </motion.h2>

        {/* Bio — Option A */}
        <motion.p
          className="mt-5 text-[15px] sm:text-[16px] lg:text-[17px] leading-[1.75] text-neutral-300"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.6,
            ease: [0.22, 0.61, 0.36, 1],
            delay: 0.12,
          }}
        >
          I design{" "}
          <span className="text-white font-medium">
            brand identities and the products they end up living inside
          </span>
          . Six years in design, three of them in product — across fintech,
          publishing, interiors, professional bodies and construction
          technology. Identity is where I started; product is where most of my
          time goes now. I&apos;m drawn to work that demands both{" "}
          <span className="text-white font-medium">
            precision and restraint
          </span>{" "}
          — design that carries weight without announcing itself.
        </motion.p>

        <motion.p
          className="mt-4 text-[15px] sm:text-[16px] lg:text-[17px] leading-[1.75] text-neutral-300"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.6,
            ease: [0.22, 0.61, 0.36, 1],
            delay: 0.22,
          }}
        >
          I&apos;m also a trained Quantity Surveyor — which means when I&apos;m
          designing for the built environment, I already speak the language.{" "}
          <span className="text-lime-400 font-medium">
            I build things I design.
          </span>{" "}
          This portfolio was designed and coded by me.
        </motion.p>

        {/* Divider */}
        <motion.div
          className="mt-12 mb-10 h-px w-full bg-white/8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />

        {/* How I Work */}
        <motion.p
          className="text-[10px] font-bold tracking-[0.25em] uppercase text-lime-400 mb-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
        >
          How I Work
        </motion.p>

        <motion.p
          className="text-[15px] sm:text-[16px] lg:text-[17px] leading-[1.75] text-neutral-300 max-w-[720px]"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.6,
            ease: [0.22, 0.61, 0.36, 1],
            delay: 0.1,
          }}
        >
          It runs the same way whether the job is an identity, a website, a
          pitch deck or a hundred-screen product. I start with the brief — read
          it properly, then ask the questions it didn&apos;t answer, because
          most briefs describe a deliverable when what I need is the problem
          underneath it. Then research: what already exists, what the
          competition is doing, what the audience is used to. Then the messy
          part — sketching, drafting, mapping ideas out and throwing most of
          them away. Execution comes last, and it goes faster because of
          everything before it.
        </motion.p>

        <motion.p
          className="mt-4 text-[15px] sm:text-[16px] lg:text-[17px] leading-[1.75] text-neutral-300 max-w-[720px]"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.6,
            ease: [0.22, 0.61, 0.36, 1],
            delay: 0.18,
          }}
        >
          What holds it all together is a fairly simple belief:{" "}
          <span className="text-white font-medium">
            design in any form exists to solve a problem
          </span>
          . If the problem isn&apos;t solved, the work isn&apos;t done — however
          much of it there is and however good it looks. That is also why I keep
          picking up new niches. A brand job would need a website; a social
          campaign would need a deck; a deck would need motion. Each time I
          learned the next thing rather than hand the client on, and each one
          made the ones I already had sharper.
        </motion.p>

        <motion.p
          className="mt-4 text-[15px] sm:text-[16px] lg:text-[17px] leading-[1.75] text-neutral-300 max-w-[720px]"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.6,
            ease: [0.22, 0.61, 0.36, 1],
            delay: 0.26,
          }}
        >
          I also say plainly what happened to each project. Some of the work
          here shipped and is in daily use; some was delivered in full and has
          not been taken into build yet. Both are on the site, labelled.{" "}
          <span className="text-lime-400 font-medium">
            The reasoning is the part worth reading either way.
          </span>
        </motion.p>
      </div>
    </section>
  );
};

export default ShortIntro;
