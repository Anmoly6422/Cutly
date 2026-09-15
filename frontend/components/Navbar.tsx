"use client";

import { motion } from "framer-motion";
import { History, Zap, ExternalLink } from "lucide-react";

interface NavbarProps {
  historyCount?: number;
}

export default function Navbar({ historyCount = 0 }: NavbarProps) {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#090A0F]/80 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Logo & Status */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <a href="#" className="flex items-center gap-2 group">
            <div className="h-8 w-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500/20 transition-all">
              <Zap className="h-4 w-4" />
            </div>
            <span className="font-extrabold tracking-tight text-lg sm:text-xl text-white">
              CUTLY<span className="text-emerald-400 font-black">.</span>
            </span>
          </a>

          <div className="hidden sm:flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>API Online</span>
          </div>
        </div>

        {/* Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
          <a href="#shortener" className="hover:text-white transition-colors">
            Shorten
          </a>
          <a href="#how-it-works" className="hover:text-white transition-colors">
            Process
          </a>
          <a href="#features" className="hover:text-white transition-colors">
            Features
          </a>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {historyCount > 0 && (
            <a
              href="#history"
              className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              <History className="h-3.5 w-3.5 text-emerald-400" />
              <span className="hidden xs:inline">History</span>
              <span className="rounded-full bg-emerald-500/20 px-1.5 py-0.2 text-[10px] text-emerald-400 font-bold">
                {historyCount}
              </span>
            </a>
          )}

          <a
            href="https://github.com/anmoly6422"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 sm:px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-white/10 transition-colors"
          >
            <span>GitHub</span>
            <ExternalLink className="h-3 w-3 text-slate-400" />
          </a>
        </div>
      </div>
    </motion.header>
  );
}
