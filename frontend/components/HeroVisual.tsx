"use client";

import { motion } from "framer-motion";
import { Scissors, ArrowRight } from "lucide-react";

export default function HeroVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="relative my-6 sm:my-8 w-full max-w-xl mx-auto overflow-hidden rounded-[8px] bg-[#F4F0E6] p-4 sm:p-6 text-[#20241F] shadow-sm"
    >
      <div className="relative z-10 flex flex-col gap-3.5">
        {/* Top Header */}
        <div className="flex items-center justify-between text-xs text-[#20241F]/60">
          <span className="font-sans font-medium">Link transformation</span>
          <span className="text-[11px] font-mono text-[#20241F]/50">Precision cut</span>
        </div>

        {/* Long URL Representation with Strikethrough in --accent */}
        <div className="flex items-center justify-between gap-3 rounded-[6px] border border-[#B4B2A9]/40 bg-[#F4F0E6] px-3.5 py-2.5 font-mono text-xs text-[#20241F]/70">
          <span className="truncate line-through decoration-[#E8B84B] decoration-2">
            https://github.com/developer/portfolio-project-cutly-url-shortener?tab=readme-ov-file#installation
          </span>
          <span className="shrink-0 font-sans text-[10px] text-[#20241F]/50 uppercase tracking-wider">
            Original
          </span>
        </div>

        {/* Dashed cut line */}
        <div className="relative flex items-center justify-center my-0.5">
          <div className="w-full border-t border-dashed border-[#B4B2A9]" />

          <motion.div
            animate={{
              rotate: [0, -15, 0, 15, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute rounded-full border border-[#B4B2A9] bg-[#F4F0E6] p-1.5 text-[#E8B84B]"
          >
            <Scissors className="h-3.5 w-3.5" />
          </motion.div>
        </div>

        {/* Short URL Result */}
        <div className="flex items-center justify-between gap-3 rounded-[6px] border border-[#B4B2A9] bg-[#F4F0E6] px-3.5 py-2.5 font-mono text-xs font-semibold text-[#20241F]">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#E8B84B]" />
            <span>cutly.co/8xK2m</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-sans font-normal text-[#20241F]/60">
            <span>Ready</span>
            <ArrowRight className="h-3 w-3 text-[#20241F]/60" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
