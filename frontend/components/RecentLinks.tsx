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
    <section id="history" className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <div className="rounded-[8px] border border-[#8FA396]/20 bg-[#16221B] p-4 sm:p-5">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#8FA396]/20 mb-4">
          <div className="flex items-center gap-2">
            <History className="h-4 w-4 text-[#8FA396]" />
            <h3 className="font-medium text-sm text-[#F4F0E6]">Your shortened links</h3>
            <span className="rounded-full bg-[#8FA396]/15 px-2 py-0.5 text-[11px] font-mono text-[#F4F0E6]">
              {history.length}
            </span>
          </div>

          <button
            onClick={onClearHistory}
            className="text-xs text-[#8FA396] hover:text-red-300 transition-colors flex items-center gap-1 font-normal"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Clear history
          </button>
        </div>

        {/* Links List */}
        <div className="space-y-2.5">
          <AnimatePresence>
            {history.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-[6px] border border-[#8FA396]/15 bg-[#1B2B22] p-3.5 text-xs"
              >
                {/* Info */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <a
                      href={item.shortUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-sm font-semibold text-[#F4F0E6] hover:underline flex items-center gap-1"
                    >
                      {item.shortUrl}
                      <ExternalLink className="h-3 w-3 text-[#8FA396]" />
                    </a>
                  </div>
                  <p className="mt-1 truncate text-xs text-[#8FA396] font-mono">
                    {item.originalUrl}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0 pt-1 sm:pt-0">
                  {/* Copy Button */}
                  <button
                    onClick={() => handleCopy(item.id, item.shortUrl)}
                    className={`h-8 px-3 rounded-[6px] text-xs font-medium transition-all flex items-center gap-1.5 ${
                      copiedId === item.id
                        ? "bg-[#F4F0E6] text-[#20241F]"
                        : "bg-[#16221B] border border-[#8FA396]/20 text-[#F4F0E6] hover:bg-[#8FA396]/10"
                    }`}
                  >
                    {copiedId === item.id ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-[#E8B84B]" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5 text-[#8FA396]" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>

                  {/* QR Code Button */}
                  <button
                    onClick={() => setActiveQrUrl(item.shortUrl)}
                    title="Generate QR code"
                    className="h-8 w-8 rounded-[6px] bg-[#16221B] border border-[#8FA396]/20 text-[#8FA396] hover:text-[#F4F0E6] transition-colors flex items-center justify-center"
                  >
                    <QrCode className="h-3.5 w-3.5" />
                  </button>

                  {/* Analytics Button */}
                  <button
                    onClick={() => setActiveAnalyticsId({ id: item.id, url: item.shortUrl })}
                    title="View analytics"
                    className="h-8 w-8 rounded-[6px] bg-[#16221B] border border-[#8FA396]/20 text-[#8FA396] hover:text-[#F4F0E6] transition-colors flex items-center justify-center"
                  >
                    <BarChart2 className="h-3.5 w-3.5" />
                  </button>

                  {/* Remove Button */}
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    title="Remove item"
                    className="h-8 w-8 rounded-[6px] bg-[#16221B] border border-[#8FA396]/20 text-[#8FA396] hover:text-red-400 transition-colors flex items-center justify-center"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Modals */}
      <QrCodeModal
        isOpen={Boolean(activeQrUrl)}
        onClose={() => setActiveQrUrl(null)}
        shortUrl={activeQrUrl || ""}
      />
      <AnalyticsModal
        isOpen={Boolean(activeAnalyticsId)}
        onClose={() => setActiveAnalyticsId(null)}
        shortId={activeAnalyticsId?.id || ""}
        shortUrl={activeAnalyticsId?.url || ""}
      />
    </section>
  );
}
