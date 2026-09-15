"use client";

import { motion } from "framer-motion";
import { Scissors, Sparkles, Link2 } from "lucide-react";

export default function HeroVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="relative my-6 sm:my-10 w-full max-w-xl mx-auto overflow-hidden rounded-2xl border border-white/10 bg-[#12131A] p-4 sm:p-6 shadow-2xl glow-box-emerald group"
    >
      {/* Background ambient lighting */}
      <div className="absolute -top-24 -left-24 h-48 w-48 rounded-full bg-emerald-500/20 blur-3xl group-hover:bg-emerald-500/30 transition-all duration-700" />
      <div className="absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl group-hover:bg-cyan-500/20 transition-all duration-700" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      <div className="relative z-10 flex flex-col gap-4">
        {/* Top Header */}
        <div className="flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1.5 font-mono">
            <Link2 className="h-3.5 w-3.5 text-emerald-400" />
            <span>Link Transformation Engine</span>
          </div>
          <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 text-[10px] text-emerald-400 font-medium">
            Active
          </span>
        </div>

        {/* Input representation */}
        <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-[#181A24] px-4 py-3 font-mono text-xs text-slate-300">
          <span className="truncate">https://github.com/developer/portfolio-project-cutly-url-shortener?tab=readme-ov-file#installation</span>
          <span className="shrink-0 rounded-md bg-white/10 px-2 py-0.5 text-[10px] uppercase font-sans tracking-wider text-slate-400 font-semibold">Long</span>
        </div>

        {/* Cut animation divider */}
        <div className="relative flex items-center justify-center my-1">
          <div className="w-full border-t border-dashed border-white/15" />

          <motion.div
            animate={{
              rotate: [0, -20, 0, 20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute rounded-full border border-emerald-500/40 bg-[#12131A] p-2.5 shadow-lg text-emerald-400"
          >
            <Scissors className="h-4 w-4" />
          </motion.div>
        </div>

        {/* Short URL output representation */}
        <div className="flex items-center justify-between gap-3 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 font-mono text-xs text-white font-semibold">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <span className="text-emerald-300">cutly/8xK2m</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-sans font-medium">
            <Sparkles className="h-3 w-3" />
            <span>Ready to Share</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
