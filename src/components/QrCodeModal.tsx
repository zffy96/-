import React, { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import { QrCode, X, Copy, Check, Share2, Smartphone, Printer } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface QrCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QrCodeModal({ isOpen, onClose }: QrCodeModalProps) {
  const [copied, setCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  const handleCopyLink = () => {
    if (currentUrl) {
      navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md p-4 flex items-center justify-center"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 sm:p-8 text-white text-right space-y-6 shadow-2xl relative overflow-hidden"
        >
          {/* Top subtle background ambient glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-2xl -translate-y-12 translate-x-12 pointer-events-none"></div>

          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <QrCode className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-lg text-white">رمز الـ QR للموقع</h3>
                <p className="text-[10px] text-slate-400">امسح الكود بالهاتف للتصفح المباشر</p>
              </div>
            </div>
          </div>

          {/* QR Code Container */}
          <div className="bg-white p-6 rounded-2xl flex flex-col items-center justify-center space-y-4 shadow-inner border border-slate-200">
            {currentUrl ? (
              <QRCodeSVG
                value={currentUrl}
                size={210}
                bgColor="#FFFFFF"
                fgColor="#0F172A"
                level="H"
                includeMargin={true}
                imageSettings={{
                  src: "/logo.jpg",
                  x: undefined,
                  y: undefined,
                  height: 48,
                  width: 48,
                  excavate: true,
                }}
              />
            ) : (
              <div className="w-52 h-52 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 text-xs">
                جاري توليد الرمز...
              </div>
            )}

            <div className="text-center space-y-1">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-900 bg-slate-100 px-3 py-1 rounded-full border border-slate-300">
                <Smartphone className="w-3.5 h-3.5 text-cyan-600" />
                مكتب بوابة الغد - اتصالات & طاقة شمسية
              </span>
              <p className="text-[10px] text-slate-500 font-mono">الوطني للكيبل الضوئي & منظومات SVC</p>
            </div>
          </div>

          {/* Link display & actions */}
          <div className="space-y-3">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
              <button
                onClick={handleCopyLink}
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-3 py-1.5 rounded-lg font-bold font-sans flex items-center gap-1 transition-colors shrink-0"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "تم النسخ" : "نسخ الرابط"}</span>
              </button>
              <span className="truncate max-w-[200px] text-left dir-ltr pl-2 text-slate-300">
                {currentUrl || "..."}
              </span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handlePrint}
                className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-200 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 border border-slate-700"
              >
                <Printer className="w-4 h-4 text-cyan-400" />
                <span>طباعة رمز QR للمحل</span>
              </button>

              <button
                onClick={handleCopyLink}
                className="flex-1 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-black py-2.5 rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20"
              >
                <Share2 className="w-4 h-4" />
                <span>مشاركة الموقع</span>
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
