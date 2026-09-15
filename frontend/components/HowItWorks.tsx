"use client";

import { motion } from "framer-motion";
import { Link, Zap, Share2 } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Paste URL",
    description: "Paste your long destination link into the shortener input.",
    icon: Link,
  },
  {
    number: "02",
    title: "Generate",
    description: "Cutly creates a clean short link ready for instant sharing.",
    icon: Zap,
  },
  {
    number: "03",
    title: "Share & track",
    description: "Copy your link, download QR codes, and monitor click analytics.",
    icon: Share2,
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-14 sm:py-20 px-4 sm:px-6 border-t border-[rgba(127,168,140,0.2)] bg-[#16221B]">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center sm:text-left"
        >
          <span className="text-xs font-normal text-[#8FA396]">
            Process
          </span>
          <h2 className="mt-1 text-2xl sm:text-4xl font-medium tracking-tight text-[#F4F0E6]">
            Three steps. Zero friction.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative rounded-[8px] border border-[#8FA396]/20 bg-[#16221B] p-5 sm:p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-mono font-medium text-[#E8B84B]">
                    {step.number}
                  </span>
                  <div className="h-8 w-8 rounded-[6px] bg-[#1B2B22] border border-[#8FA396]/20 flex items-center justify-center text-[#8FA396]">
                    <Icon className="h-4 w-4" />
                  </div>
                </div>

                <h3 className="text-base font-medium text-[#F4F0E6] mb-1.5">
                  {step.title}
                </h3>
                <p className="text-xs text-[#8FA396] leading-relaxed font-normal">
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
