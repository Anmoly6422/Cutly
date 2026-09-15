"use client";

import { motion } from "framer-motion";
import { Link, Zap, Share2 } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "PASTE URL",
    description: "Paste your long destination URL into the input field above.",
    icon: Link,
  },
  {
    number: "02",
    title: "GENERATE",
    description: "Cutly processes the link into a clean, trackable short URL.",
    icon: Zap,
  },
  {
    number: "03",
    title: "SHARE & TRACK",
    description: "Copy your link, generate QR codes, and monitor click analytics in real-time.",
    icon: Share2,
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-14 sm:py-24 px-4 sm:px-6 border-t border-white/10 bg-[#090A0F]">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center sm:text-left"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
            Simplified Architecture
          </span>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl">
            Three steps. High performance.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="group relative rounded-2xl border border-white/10 bg-[#12131A] p-6 transition-all hover:border-emerald-500/40 hover:bg-[#181A24]"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-black font-mono text-emerald-400">
                    {step.number}
                  </span>
                  <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 group-hover:text-emerald-400 group-hover:border-emerald-500/30 transition-colors">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>

                <h3 className="text-base font-bold text-white tracking-wide mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
