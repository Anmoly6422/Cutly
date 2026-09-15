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
          dark: "#20241F",
          light: "#F4F0E6",
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-sm rounded-[8px] border border-[#8FA396]/30 bg-[#16221B] p-6 shadow-xl"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-[#8FA396] hover:text-[#F4F0E6] transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="h-9 w-9 rounded-[6px] bg-[#1B2B22] border border-[#8FA396]/20 flex items-center justify-center mb-3 text-[#8FA396]">
                <QrCode className="h-4 w-4" />
              </div>

              <h3 className="text-base font-medium text-[#F4F0E6]">QR code</h3>
              <p className="text-xs font-mono text-[#8FA396] mt-1 truncate max-w-xs">{shortUrl}</p>

              {/* QR Image on --paper background */}
              <div className="mt-5 rounded-[6px] bg-[#F4F0E6] p-3">
                {dataUrl ? (
                  <img src={dataUrl} alt="Short URL QR Code" className="h-44 w-44 object-contain" />
                ) : (
                  <div className="h-44 w-44 animate-pulse bg-[#B4B2A9]/20 rounded" />
                )}
              </div>

              <button
                onClick={handleDownload}
                className="mt-6 w-full h-10 rounded-[8px] bg-[#E8B84B] hover:bg-[#D9A93C] text-[#20241F] font-semibold text-xs transition-all flex items-center justify-center gap-2"
              >
                <Download className="h-3.5 w-3.5" />
                Download QR image
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
