"use client";

import { motion } from "framer-motion";
import { History, Scissors, ExternalLink } from "lucide-react";

interface NavbarProps {
  historyCount?: number;
}

export default function Navbar({ historyCount = 0 }: NavbarProps) {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 z-40 w-full border-b border-[rgba(127,168,140,0.2)] bg-[#1B2B22]/90 backdrop-blur-md"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Logo & Status */}
        <div className="flex items-center gap-3">
          <a href="#" className="flex items-center gap-2 group">
            <div className="h-7 w-7 rounded-[6px] bg-[#16221B] border border-[#8FA396]/20 flex items-center justify-center text-[#E8B84B]">
              <Scissors className="h-3.5 w-3.5" />
            </div>
            <span className="font-semibold tracking-tight text-lg sm:text-xl text-[#F4F0E6]">
              Cutly<span className="text-[#E8B84B] font-bold">.</span>
            </span>
          </a>

          {/* Quiet Status Pill in --text-secondary */}
          <div className="hidden sm:flex items-center gap-2 rounded-full border border-[#8FA396]/20 bg-[#16221B] px-2.5 py-0.5 text-xs font-normal text-[#8FA396]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#8FA396]" />
            <span>API online</span>
          </div>
        </div>

        {/* Links in sentence case */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-normal text-[#8FA396]">
          <a href="#shortener" className="hover:text-[#F4F0E6] transition-colors">
            Shorten
          </a>
          <a href="#how-it-works" className="hover:text-[#F4F0E6] transition-colors">
            Process
          </a>
          <a href="#features" className="hover:text-[#F4F0E6] transition-colors">
            Features
          </a>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {historyCount > 0 && (
            <a
              href="#history"
              className="flex items-center gap-1.5 rounded-[6px] border border-[#8FA396]/20 bg-[#16221B] px-2.5 sm:px-3 py-1.5 text-xs font-medium text-[#8FA396] hover:text-[#F4F0E6] transition-colors"
            >
              <History className="h-3.5 w-3.5 text-[#8FA396]" />
              <span className="hidden xs:inline">History</span>
              <span className="rounded-full bg-[#8FA396]/15 px-1.5 py-0.2 text-[10px] text-[#F4F0E6] font-mono">
                {historyCount}
              </span>
            </a>
          )}

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-[6px] border border-[#8FA396]/20 bg-[#16221B] px-2.5 sm:px-3.5 py-1.5 text-xs font-medium text-[#8FA396] hover:text-[#F4F0E6] transition-colors"
          >
            <span>GitHub</span>
            <ExternalLink className="h-3 w-3 text-[#8FA396]" />
          </a>
        </div>
      </div>
    </motion.header>
  );
}
