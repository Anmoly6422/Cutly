"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Copy, AlertCircle, Sparkles, RefreshCw, SlidersHorizontal, QrCode, BarChart2 } from "lucide-react";
import { shortenUrl } from "@/lib/api";
import QrCodeModal from "./QrCodeModal";
import AnalyticsModal from "./AnalyticsModal";
import { LinkHistoryItem } from "./RecentLinks";

interface UrlShortenerProps {
  onLinkCreated?: (item: LinkHistoryItem) => void;
}

export default function UrlShortener({ onLinkCreated }: UrlShortenerProps) {
  const [url, setUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [showCustomAlias, setShowCustomAlias] = useState(false);
  const [shortUrl, setShortUrl] = useState("");
  const [shortId, setShortId] = useState("");
  const [originalUrl, setOriginalUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  // Modals for current generated link
  const [showQrModal, setShowQrModal] = useState(false);
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);

  const isValidUrl = (urlString: string) => {
    try {
      const parsed = new URL(urlString.startsWith("http") ? urlString : `https://${urlString}`);
      return parsed.hostname.includes(".");
    } catch {
      return false;
    }
  };

  async function handleSubmit(e?: React.FormEvent) {
    if (e) e.preventDefault();

    const trimmedUrl = url.trim();
    if (!trimmedUrl) {
      setError("Please enter a long URL to shorten.");
      return;
    }

    if (!isValidUrl(trimmedUrl)) {
      setError("Please enter a valid URL (e.g. example.com or https://example.com).");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setCopied(false);

      const alias = showCustomAlias && customAlias.trim() ? customAlias.trim() : undefined;
      const data = await shortenUrl(trimmedUrl, alias);

      const resultUrl =
        data.shortUrl ||
        (data.id
          ? `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001"}/${data.id}`
          : "");

      setOriginalUrl(trimmedUrl);
      setShortUrl(resultUrl);
      setShortId(data.id);

      // Save to local history
      if (onLinkCreated && data.id) {
        onLinkCreated({
          id: data.id,
          shortUrl: resultUrl,
          originalUrl: trimmedUrl,
          createdAt: Date.now(),
        });
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to connect to service. Please verify your backend server is running."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleCopy() {
    if (!shortUrl) return;

    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = shortUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  }

  function handleReset() {
    setUrl("");
    setCustomAlias("");
    setShortUrl("");
    setShortId("");
    setOriginalUrl("");
    setError("");
    setCopied(false);
  }

  return (
    <section id="shortener" className="w-full max-w-2xl mx-auto px-4 sm:px-6 py-4">
      {/* Input Surface */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="rounded-2xl border border-white/10 bg-[#12131A] p-3.5 sm:p-4 shadow-2xl transition-all hover:border-emerald-500/30 glow-box-emerald"
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {/* Main Input Row */}
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                if (error) setError("");
              }}
              placeholder="Paste your long URL here..."
              disabled={loading}
              aria-label="Long URL input"
              className="h-13 sm:h-14 flex-1 rounded-xl bg-[#181A24] px-4 text-white placeholder:text-slate-500 outline-none border border-white/5 focus:border-emerald-500/50 focus:bg-[#1C1F2B] transition-all text-sm sm:text-base"
            />

            <button
              type="submit"
              disabled={loading || !url.trim()}
              className="h-13 sm:h-14 shrink-0 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#090A0F] font-extrabold px-6 transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-emerald-500 shadow-lg shadow-emerald-500/20 text-sm sm:text-base"
            >
              {loading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin text-[#090A0F]" />
                  <span>SHORTENING...</span>
                </>
              ) : (
                <>
                  <span>SHORTEN</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>

          {/* Custom Alias Toggle Bar */}
          <div className="flex items-center justify-between pt-1 sm:pt-2 px-1 text-xs">
            <button
              type="button"
              onClick={() => setShowCustomAlias(!showCustomAlias)}
              className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-1.5 font-medium text-[11px] sm:text-xs"
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              <span>{showCustomAlias ? "Hide Custom Alias" : "Custom Alias (Optional)"}</span>
            </button>

            <span className="text-slate-500 hidden sm:inline">No account required • Instant redirect</span>
          </div>

          {/* Custom Alias Input */}
          <AnimatePresence>
            {showCustomAlias && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden pt-1"
              >
                <div className="flex items-center rounded-xl bg-[#181A24] border border-white/5 px-3 py-2 text-xs font-mono text-slate-400">
                  <span className="text-slate-500 mr-1 select-none">cutly/</span>
                  <input
                    type="text"
                    value={customAlias}
                    onChange={(e) => setCustomAlias(e.target.value)}
                    placeholder="my-custom-link"
                    className="flex-1 bg-transparent text-white placeholder:text-slate-600 outline-none font-mono text-xs sm:text-sm"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </motion.div>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 12 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            className="overflow-hidden"
          >
            <div className="flex items-center gap-2.5 rounded-xl border border-red-500/30 bg-red-500/10 p-3.5 text-xs sm:text-sm text-red-300">
              <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Result Card */}
      <AnimatePresence>
        {shortUrl && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 rounded-2xl border border-emerald-500/30 bg-[#12131A] p-4 sm:p-5 shadow-2xl glow-box-emerald"
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-medium text-slate-400">
              <div className="flex items-center gap-1.5 text-emerald-400">
                <Sparkles className="h-3.5 w-3.5" />
                <span className="font-semibold">Short URL Generated!</span>
              </div>
              <button
                onClick={handleReset}
                className="text-slate-400 hover:text-white transition-colors underline underline-offset-2 text-[11px] sm:text-xs"
              >
                Shorten another link
              </button>
            </div>

            <div className="mt-4 flex flex-col gap-3">
              {/* Original snippet */}
              <div className="truncate text-xs text-slate-400 font-mono">
                Original: {originalUrl}
              </div>

              {/* Generated Short URL & Copy / Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-white/10 bg-[#181A24] p-3 sm:p-3.5">
                <a
                  href={shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm sm:text-base font-bold text-emerald-400 hover:underline truncate"
                >
                  {shortUrl}
                </a>

                <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto shrink-0 pt-1 sm:pt-0 border-t sm:border-t-0 border-white/5">
                  {/* Copy Button */}
                  <button
                    onClick={handleCopy}
                    className={`h-10 flex-1 sm:flex-none px-4 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      copied
                        ? "bg-emerald-500 text-[#090A0F]"
                        : "bg-white text-[#090A0F] hover:bg-slate-200"
                    }`}
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4" />
                        <span>Copied ✓</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        <span>Copy Link</span>
                      </>
                    )}
                  </button>

                  {/* QR Code */}
                  <button
                    onClick={() => setShowQrModal(true)}
                    title="Generate QR Code"
                    className="h-10 w-10 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-center"
                  >
                    <QrCode className="h-4 w-4" />
                  </button>

                  {/* Analytics */}
                  <button
                    onClick={() => setShowAnalyticsModal(true)}
                    title="Live Click Analytics"
                    className="h-10 w-10 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-emerald-400 hover:bg-white/10 transition-colors flex items-center justify-center"
                  >
                    <BarChart2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modals for active created link */}
      <QrCodeModal
        isOpen={showQrModal}
        onClose={() => setShowQrModal(false)}
        shortUrl={shortUrl}
      />
      <AnalyticsModal
        isOpen={showAnalyticsModal}
        onClose={() => setShowAnalyticsModal(false)}
        shortId={shortId}
        shortUrl={shortUrl}
      />
    </section>
  );
}
