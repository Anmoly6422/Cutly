"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Copy, AlertCircle, RefreshCw, SlidersHorizontal, QrCode, BarChart2, Scissors } from "lucide-react";
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
      {/* Cream Paper Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="rounded-[8px] bg-[#F4F0E6] p-4 sm:p-5 text-[#20241F]"
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
              className="h-12 sm:h-13 flex-1 rounded-[6px] bg-[#F4F0E6] border border-[#B4B2A9] px-3.5 text-[#20241F] placeholder:text-[#20241F]/40 outline-none focus:border-[#20241F] transition-all text-sm font-sans"
            />

            {/* Primary Button in --accent fill with --ink dark text */}
            <button
              type="submit"
              disabled={loading || !url.trim()}
              className="h-12 sm:h-13 shrink-0 rounded-[8px] bg-[#E8B84B] hover:bg-[#D9A93C] text-[#20241F] font-semibold px-5 transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed border-0 text-sm"
            >
              {loading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin text-[#20241F]" />
                  <span>Shortening...</span>
                </>
              ) : (
                <>
                  <span>Shorten</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>

          {/* Custom Alias Toggle Bar */}
          <div className="flex items-center justify-between pt-1 px-0.5 text-xs text-[#20241F]/60">
            <button
              type="button"
              onClick={() => setShowCustomAlias(!showCustomAlias)}
              className="hover:text-[#20241F] transition-colors flex items-center gap-1.5 font-normal text-xs"
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              <span>{showCustomAlias ? "Hide custom alias" : "Custom alias (optional)"}</span>
            </button>

            <span className="hidden sm:inline text-[11px] text-[#20241F]/50">No account required</span>
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
                <div className="flex items-center rounded-[6px] bg-[#F4F0E6] border border-[#B4B2A9] px-3 py-2 text-xs font-mono text-[#20241F]">
                  <span className="text-[#20241F]/40 mr-1 select-none font-mono">cutly/</span>
                  <input
                    type="text"
                    value={customAlias}
                    onChange={(e) => setCustomAlias(e.target.value)}
                    placeholder="my-custom-link"
                    className="flex-1 bg-transparent text-[#20241F] placeholder:text-[#20241F]/40 outline-none font-mono text-xs"
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
            animate={{ opacity: 1, height: "auto", marginTop: 10 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            className="overflow-hidden"
          >
            <div className="flex items-center gap-2.5 rounded-[8px] border border-red-500/30 bg-red-950/20 p-3 text-xs sm:text-sm text-red-200">
              <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Result Card: Precision Cut paper card format */}
      <AnimatePresence>
        {shortUrl && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="mt-5 rounded-[8px] bg-[#F4F0E6] p-4 sm:p-5 text-[#20241F]"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#B4B2A9]/40 text-xs text-[#20241F]/60">
              <span className="font-sans font-medium">Link shortened</span>
              <button
                onClick={handleReset}
                className="hover:text-[#20241F] transition-colors underline underline-offset-2 text-xs"
              >
                Shorten another link
              </button>
            </div>

            <div className="mt-3.5 flex flex-col gap-3">
              {/* Long URL in monospace with strikethrough in --accent */}
              <div className="truncate text-xs font-mono text-[#20241F]/70 line-through decoration-[#E8B84B] decoration-2">
                {originalUrl}
              </div>

              {/* Dashed cut divider */}
              <div className="relative flex items-center justify-center my-0.5">
                <div className="w-full border-t border-dashed border-[#B4B2A9]" />
                <div className="absolute rounded-full border border-[#B4B2A9] bg-[#F4F0E6] p-1.5 text-[#E8B84B]">
                  <Scissors className="h-3.5 w-3.5" />
                </div>
              </div>

              {/* Short URL in monospace with --ink color */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-[6px] border border-[#B4B2A9] bg-[#F4F0E6] p-3">
                <a
                  href={shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm sm:text-base font-semibold text-[#20241F] hover:underline truncate"
                >
                  {shortUrl}
                </a>

                <div className="flex items-center gap-2 shrink-0 pt-1 sm:pt-0">
                  {/* Copy Button */}
                  <button
                    onClick={handleCopy}
                    className={`h-9 px-3.5 rounded-[6px] text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${
                      copied
                        ? "bg-[#20241F] text-[#F4F0E6]"
                        : "bg-[#20241F] text-[#F4F0E6] hover:bg-[#20241F]/90"
                    }`}
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-[#E8B84B]" />
                        <span>Copied ✓</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>

                  {/* QR Code */}
                  <button
                    onClick={() => setShowQrModal(true)}
                    title="Generate QR code"
                    className="h-9 w-9 rounded-[6px] border border-[#B4B2A9] bg-[#F4F0E6] text-[#20241F]/70 hover:text-[#20241F] transition-colors flex items-center justify-center"
                  >
                    <QrCode className="h-4 w-4" />
                  </button>

                  {/* Analytics */}
                  <button
                    onClick={() => setShowAnalyticsModal(true)}
                    title="Live click analytics"
                    className="h-9 w-9 rounded-[6px] border border-[#B4B2A9] bg-[#F4F0E6] text-[#20241F]/70 hover:text-[#20241F] transition-colors flex items-center justify-center"
                  >
                    <BarChart2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modals */}
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
