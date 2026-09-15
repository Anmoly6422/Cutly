"use client";

import { motion } from "framer-motion";
import HeroVisual from "./HeroVisual";

export default function Hero() {
  return (
    <section className="relative pt-10 pb-6 sm:pt-16 sm:pb-8 md:pt-24 md:pb-12 text-center px-4 sm:px-6">
      <div className="mx-auto max-w-4xl">
        {/* Subtle pill badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 sm:px-4 py-1.5 text-[11px] sm:text-xs font-semibold text-emerald-400 shadow-sm mb-5 sm:mb-6"
        >
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          Production-Ready URL Shortener Project
        </motion.div>

        {/* Editorial Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-7xl md:text-8xl font-black tracking-tight text-white leading-[0.95] uppercase font-sans"
        >
          Links <br />
          without <br />
          <span className="glow-emerald-gradient">
            the length<span className="text-emerald-400">.</span>
          </span>
        </motion.h1>

        {/* Supporting text */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 sm:mt-6 max-w-xl mx-auto text-sm sm:text-lg text-slate-400 leading-relaxed px-2"
        >
          Turn long, complex URLs into clean, shareable short links.
          <br className="hidden sm:inline" />
          No registration needed. Instant analytics included.
        </motion.p>

        {/* Hero Visual Element */}
        <HeroVisual />
      </div>
    </section>
  );
}
