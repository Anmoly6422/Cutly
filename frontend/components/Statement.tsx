"use client";

import { motion } from "framer-motion";
import { Zap, ShieldCheck, QrCode, BarChart3 } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Instant redirection",
    desc: "Optimized server routing delivers fast, reliable link redirection.",
  },
  {
    icon: BarChart3,
    title: "Click analytics",
    desc: "Track total clicks and timestamp visit logs for every short link.",
  },
  {
    icon: QrCode,
    title: "QR code generator",
    desc: "Generate and download custom high-resolution QR codes instantly.",
  },
  {
    icon: ShieldCheck,
    title: "No signup required",
    desc: "Shorten URLs immediately without creating accounts or entering emails.",
  },
];

export default function Statement() {
  return (
    <section id="features" className="py-14 sm:py-20 px-4 sm:px-6 border-t border-[rgba(127,168,140,0.2)] bg-[#1B2B22]">
      <div className="mx-auto max-w-5xl">
        {/* Header in sentence case and weight 500 */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center md:text-left mb-12 sm:mb-14"
        >
          <span className="text-xs font-normal text-[#8FA396]">
            Engineered for simplicity
          </span>
          <h2 className="mt-1 text-2xl sm:text-4xl font-medium tracking-tight text-[#F4F0E6] leading-tight">
            No account. No complexity. No noise. Just short links.
          </h2>
        </motion.div>

        {/* Feature 4-up grid WITHOUT card background boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex flex-col"
              >
                <div className="h-8 w-8 rounded-[6px] bg-[#16221B] border border-[#8FA396]/20 flex items-center justify-center mb-3 text-[#8FA396]">
                  <Icon className="h-4 w-4" />
                </div>
                <h3 className="font-medium text-[#F4F0E6] text-sm sm:text-base mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-[#8FA396] leading-relaxed font-normal">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
