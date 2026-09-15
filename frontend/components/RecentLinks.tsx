"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, QrCode, BarChart2, Trash2, History, ExternalLink } from "lucide-react";
import QrCodeModal from "./QrCodeModal";
import AnalyticsModal from "./AnalyticsModal";

export interface LinkHistoryItem {
  id: string;
  shortUrl: string;
  originalUrl: string;
  createdAt: number;
}

interface RecentLinksProps {
  history: LinkHistoryItem[];
  onClearHistory: () => void;
  onRemoveItem: (id: string) => void;
}

export default function RecentLinks({ history, onClearHistory, onRemoveItem }: RecentLinksProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeQrUrl, setActiveQrUrl] = useState<string | null>(null);
  const [activeAnalyticsId, setActiveAnalyticsId] = useState<{ id: string; url: string } | null>(null);

  async function handleCopy(id: string, shortUrl: string) {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (e) {
      console.error(e);
    }
  }

  if (history.length === 0) return null;

  return (
    <section id="history" className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="rounded-2xl border border-white/10 bg-[#12131A] p-4 sm:p-6 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
              <History className="h-4 w-4 text-emerald-400" />
            </div>
            <h3 className="font-bold text-lg text-white">Your Shortened Links</h3>
            <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-semibold text-emerald-400">
              {history.length}
            </span>
          </div>

          <button
            onClick={onClearHistory}
            className="text-xs text-slate-400 hover:text-red-400 transition-colors flex items-center gap-1 font-medium"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Clear History
          </button>
        </div>

        {/* Links List */}
        <div className="space-y-3">
          <AnimatePresence>
            {history.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-white/5 bg-[#181A24] p-4 transition-all hover:border-emerald-500/30"
              >
                {/* Info */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <a
                      href={item.shortUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-sm font-bold text-emerald-400 hover:underline truncate flex items-center gap-1"
                    >
                      {item.shortUrl}
                      <ExternalLink className="h-3 w-3 opacity-70" />
                    </a>
                  </div>
                  <p className="mt-1 truncate text-xs text-slate-400 font-mono">
                    {item.originalUrl}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  {/* Copy Button */}
                  <button
                    onClick={() => handleCopy(item.id, item.shortUrl)}
                    className={`h-9 px-3 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                      copiedId === item.id
                        ? "bg-emerald-500 text-[#090A0F]"
                        : "bg-white/5 border border-white/10 text-white hover:bg-white/10"
                    }`}
                  >
                    {copiedId === item.id ? (
                      <>
                        <Check className="h-3.5 w-3.5" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>

                  {/* QR Code Button */}
                  <button
                    onClick={() => setActiveQrUrl(item.shortUrl)}
                    title="Generate QR Code"
                    className="h-9 w-9 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-center"
                  >
                    <QrCode className="h-4 w-4" />
                  </button>

                  {/* Analytics Button */}
                  <button
                    onClick={() => setActiveAnalyticsId({ id: item.id, url: item.shortUrl })}
                    title="View Analytics"
                    className="h-9 w-9 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-emerald-400 hover:bg-white/10 transition-colors flex items-center justify-center"
                  >
                    <BarChart2 className="h-4 w-4" />
                  </button>

                  {/* Remove Button */}
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    title="Remove item"
                    className="h-9 w-9 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-red-400 hover:bg-white/10 transition-colors flex items-center justify-center"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* QR Code Modal */}
      <QrCodeModal
        isOpen={Boolean(activeQrUrl)}
        onClose={() => setActiveQrUrl(null)}
        shortUrl={activeQrUrl || ""}
      />

      {/* Analytics Modal */}
      <AnalyticsModal
        isOpen={Boolean(activeAnalyticsId)}
        onClose={() => setActiveAnalyticsId(null)}
        shortId={activeAnalyticsId?.id || ""}
        shortUrl={activeAnalyticsId?.url || ""}
      />
    </section>
  );
}
