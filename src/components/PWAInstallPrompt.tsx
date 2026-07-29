import React, { useState, useEffect } from "react";
import { Download, Smartphone, X, CheckCircle2 } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if app is already running in standalone mode
    if (window.matchMedia("(display-mode: standalone)").matches || (navigator as any).standalone) {
      setIsInstalled(true);
      return;
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    window.addEventListener("appinstalled", () => {
      setIsInstalled(true);
      setShowPrompt(false);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      // Guide iOS or non-prompt browsers
      alert("لتثبيت التطبيق على جهازك:\n- في أجهزة آيفون (iOS): اضغط زر المشاركة (Share) ثم اختر 'إضافة إلى الشاشة الرئيسية' (Add to Home Screen).\n- في أجهزة أندرويد: افتح قائمة المتصفح واختر 'تثبيت التطبيق' (Install App).");
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setShowPrompt(false);
    }
    setDeferredPrompt(null);
  };

  if (isInstalled || !showPrompt) return null;

  return (
    <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-slate-950 px-4 py-3 border-b border-amber-400 shadow-lg relative">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-right">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-slate-950 text-amber-400 flex items-center justify-center shrink-0 shadow-md">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-extrabold text-sm sm:text-base text-slate-950 leading-tight">
              تثبيت تطبيق بوابة الغد على هاتفك (App / PWA)
            </h4>
            <p className="text-xs text-slate-900 font-medium">
              احصل على وصول سريع وسلس بدون متصفح مع دعم التشغيل بدون إنترنت والتنبيهات الفورية.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={handleInstallClick}
            className="flex-1 sm:flex-none bg-slate-950 hover:bg-slate-900 text-amber-400 hover:text-amber-300 font-black px-4 py-2 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer active:scale-95"
          >
            <Download className="w-4 h-4 text-amber-400" />
            <span>تثبيت الآن على الهاتف</span>
          </button>
          <button
            onClick={() => setShowPrompt(false)}
            className="p-2 text-slate-950/70 hover:text-slate-950 rounded-lg hover:bg-amber-400/50 transition-colors"
            title="إغلاق التنبيه"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
