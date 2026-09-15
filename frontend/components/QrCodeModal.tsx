"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, QrCode } from "lucide-react";
import QRCode from "qrcode";

interface QrCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  shortUrl: string;
}

export default function QrCodeModal({ isOpen, onClose, shortUrl }: QrCodeModalProps) {
  const [dataUrl, setDataUrl] = useState<string>("");

  useEffect(() => {
    if (shortUrl) {
      QRCode.toDataURL(shortUrl, {
        width: 300,
        margin: 2,
        color: {
          dark: "#090A0F",
          light: "#FFFFFF",
        },
      })
        .then((url) => setDataUrl(url))
        .catch(console.error);
    }
  }, [shortUrl]);

  function handleDownload() {
    if (!dataUrl) return;
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `cutly-qr-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative w-full max-w-sm rounded-2xl border border-white/10 bg-[#12131A] p-6 shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-3">
                <QrCode className="h-5 w-5 text-emerald-400" />
              </div>

              <h3 className="text-lg font-bold text-white">QR Code</h3>
              <p className="text-xs text-slate-400 mt-1 truncate max-w-xs">{shortUrl}</p>

              {/* QR Image */}
              <div className="mt-5 rounded-xl border border-white/10 bg-white p-3 shadow-inner">
                {dataUrl ? (
                  <img src={dataUrl} alt="Short URL QR Code" className="h-48 w-48 object-contain" />
                ) : (
                  <div className="h-48 w-48 animate-pulse bg-slate-200 rounded-lg" />
                )}
              </div>

              {/* Action */}
              <button
                onClick={handleDownload}
                className="mt-6 w-full h-11 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#090A0F] font-bold text-sm transition-all flex items-center justify-center gap-2 active:scale-98"
              >
                <Download className="h-4 w-4" />
                Download QR Image
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
