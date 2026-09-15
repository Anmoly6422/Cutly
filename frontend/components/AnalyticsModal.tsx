"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, BarChart3, MousePointerClick, Clock, ExternalLink } from "lucide-react";
import { getAnalytics } from "@/lib/api";

interface AnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
  shortId: string;
  shortUrl: string;
}

interface AnalyticsData {
  totalClicks: number;
  analytics: { timestamp: number }[];
}

export default function AnalyticsModal({ isOpen, onClose, shortId, shortUrl }: AnalyticsModalProps) {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (isOpen && shortId) {
      setLoading(true);
      setError("");
      getAnalytics(shortId)
        .then((res) => {
          setData(res);
        })
        .catch((err) => {
          setError(err instanceof Error ? err.message : "Failed to load analytics");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [isOpen, shortId]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#12131A] p-6 shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Live Analytics</h3>
                <a
                  href={shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-emerald-400 hover:underline flex items-center gap-1 font-mono"
                >
                  {shortId}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>

            {loading ? (
              <div className="py-12 text-center text-slate-400 text-sm flex flex-col items-center gap-2">
                <div className="h-6 w-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                <span>Fetching analytics from server...</span>
              </div>
            ) : error ? (
              <div className="py-8 text-center text-red-400 text-sm">{error}</div>
            ) : data ? (
              <div className="space-y-6">
                {/* Total Clicks Metric */}
                <div className="rounded-xl border border-white/10 bg-[#181A24] p-5 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                      Total Clicks
                    </span>
                    <div className="text-3xl font-extrabold text-white mt-1">
                      {data.totalClicks}
                    </div>
                  </div>
                  <div className="h-12 w-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <MousePointerClick className="h-6 w-6" />
                  </div>
                </div>

                {/* Click Timestamps */}
                <div>
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-slate-400" />
                    Visit History Log ({data.analytics.length})
                  </h4>

                  {data.analytics.length === 0 ? (
                    <div className="rounded-xl border border-white/5 bg-[#181A24]/40 p-6 text-center text-xs text-slate-500">
                      No visits recorded yet. Share your short link to track clicks!
                    </div>
                  ) : (
                    <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
                      {data.analytics.map((visit, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between rounded-lg border border-white/5 bg-[#181A24] px-3.5 py-2.5 text-xs text-slate-300"
                        >
                          <span className="font-mono text-slate-400">Click #{index + 1}</span>
                          <span className="font-mono text-emerald-400">
                            {new Date(visit.timestamp).toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : null}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
