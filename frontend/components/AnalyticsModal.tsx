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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-md rounded-[8px] border border-[#8FA396]/30 bg-[#16221B] p-6 shadow-xl"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-[#8FA396] hover:text-[#F4F0E6] transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="h-9 w-9 rounded-[6px] bg-[#1B2B22] border border-[#8FA396]/20 flex items-center justify-center text-[#8FA396]">
                <BarChart3 className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-base font-medium text-[#F4F0E6]">Analytics</h3>
                <a
                  href={shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#8FA396] hover:text-[#F4F0E6] flex items-center gap-1 font-mono"
                >
                  {shortId}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>

            {loading ? (
              <div className="py-10 text-center text-[#8FA396] text-xs flex flex-col items-center gap-2 font-normal">
                <div className="h-5 w-5 border-2 border-[#8FA396] border-t-transparent rounded-full animate-spin" />
                <span>Fetching analytics...</span>
              </div>
            ) : error ? (
              <div className="py-6 text-center text-red-300 text-xs">{error}</div>
            ) : data ? (
              <div className="space-y-5">
                <div className="rounded-[6px] border border-[#8FA396]/20 bg-[#1B2B22] p-4 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-[#8FA396] font-normal">
                      Total clicks
                    </span>
                    <div className="text-3xl font-medium text-[#F4F0E6] mt-0.5 font-mono">
                      {data.totalClicks}
                    </div>
                  </div>
                  <div className="h-10 w-10 rounded-[6px] bg-[#16221B] border border-[#8FA396]/20 flex items-center justify-center text-[#8FA396]">
                    <MousePointerClick className="h-5 w-5" />
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-normal text-[#8FA396] mb-2.5 flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-[#8FA396]" />
                    Visit log ({data.analytics.length})
                  </h4>

                  {data.analytics.length === 0 ? (
                    <div className="rounded-[6px] border border-[#8FA396]/15 bg-[#1B2B22] p-4 text-center text-xs text-[#8FA396]">
                      No visits recorded yet.
                    </div>
                  ) : (
                    <div className="max-h-44 overflow-y-auto space-y-2 pr-1">
                      {data.analytics.map((visit, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between rounded-[6px] border border-[#8FA396]/15 bg-[#1B2B22] px-3 py-2 text-xs text-[#8FA396]"
                        >
                          <span className="font-mono text-[#8FA396]">Click #{index + 1}</span>
                          <span className="font-mono text-[#F4F0E6]">
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
