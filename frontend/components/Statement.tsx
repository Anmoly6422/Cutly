"use client";

import { motion } from "framer-motion";
import { Zap, ShieldCheck, QrCode, BarChart3 } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Instant Redirection",
    desc: "Optimized Node.js & Express routing delivers instant link redirection.",
  },
  {
    icon: BarChart3,
    title: "Click Analytics",
    desc: "Track total clicks and timestamp log history for every short URL created.",
  },
  {
    icon: QrCode,
    title: "QR Code Generator",
    desc: "Generate and download custom high-res QR codes with a single click.",
  },
  {
    icon: ShieldCheck,
    title: "Zero Sign-up Friction",
    desc: "Shorten URLs immediately without creating accounts or passwords.",
  },
];

export default function Statement() {
  return (
    <section id="features" className="py-14 sm:py-24 px-4 sm:px-6 border-t border-white/10 bg-[#12131A]">
      <div className="mx-auto max-w-5xl">
        {/* Statement Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center md:text-left mb-12 sm:mb-16"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
            Engineered for Simplicity
          </span>
          <div className="mt-3 text-3xl sm:text-6xl font-black text-white tracking-tight uppercase leading-[1.05]">
            No noise. <br />
            No mandatory login. <br />
            <span className="glow-emerald-gradient">
              Just fast short links<span className="text-emerald-400">.</span>
            </span>
          </div>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="rounded-2xl border border-white/10 bg-[#181A24] p-6 flex flex-col justify-between hover:border-emerald-500/30 transition-colors"
              >
                <div>
                  <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-4 text-emerald-400">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-white text-base mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
