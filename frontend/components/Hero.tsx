"use client";

import { motion } from "framer-motion";
import HeroVisual from "./HeroVisual";

export default function Hero() {
  return (
    <section className="relative pt-10 pb-6 sm:pt-16 sm:pb-8 md:pt-20 md:pb-12 text-center px-4 sm:px-6 bg-[#1B2B22] bg-cutting-mat">
      <div className="mx-auto max-w-3xl">
        {/* Quiet status badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-[#8FA396]/20 bg-[#16221B] px-3.5 py-1 text-xs font-normal text-[#8FA396] mb-5 sm:mb-6"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#8FA396]" />
          Simple URL shortener
        </motion.div>

        {/* Headline: Weight 500 (font-medium), Sentence case, no all-caps */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-medium tracking-tight text-[#F4F0E6] leading-[1.08] font-sans"
        >
          Links without the length.
        </motion.h1>

        {/* Supporting text in --text-secondary */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 sm:mt-5 max-w-lg mx-auto text-sm sm:text-base text-[#8FA396] leading-relaxed px-2 font-normal"
        >
          Turn long URLs into clean, shareable links.
          <br className="hidden sm:inline" />
          No account. No clutter. Just Cutly.
        </motion.p>

        {/* Hero Visual Element */}
        <HeroVisual />
      </div>
    </section>
  );
}
