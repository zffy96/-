import React, { useState } from "react";
import { motion } from "motion/react";
import { Wifi, Phone, MapPin, Activity, ShieldCheck, Sparkles, QrCode } from "lucide-react";
import QrCodeModal from "./QrCodeModal";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
}

export default function Header({ activeTab, setActiveTab, cartCount }: HeaderProps) {
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  return (
    <>
      <header className="bg-slate-900 text-white sticky top-0 z-40 shadow-md border-b border-slate-800">
        {/* Upper small info bar */}
        <div className="bg-slate-950 text-slate-400 text-xs py-2 px-3 sm:px-6 lg:px-8 overflow-hidden">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-center sm:text-right">
            <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2 sm:gap-4">
              <span className="flex items-center gap-1 text-[11px] sm:text-xs text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>شركة بوابة الغد للتجارة والمقاولات العامة محدودة المسؤولية</span>
              </span>
              <span className="hidden md:inline-block">|</span>
              <span className="hidden md:flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                تفعيل اشتراكات فوري وموثوق
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsQrModalOpen(true)}
                className="flex items-center gap-1.5 bg-cyan-950/80 hover:bg-cyan-900 text-cyan-300 border border-cyan-500/40 px-2.5 py-0.5 rounded-lg text-[11px] font-bold transition-all shadow-sm"
              >
                <QrCode className="w-3.5 h-3.5 text-cyan-400" />
                <span>رمز QR للموقع</span>
              </button>

              <a href="tel:07721617032" className="flex items-center gap-1 hover:text-white transition-colors">
                <Phone className="w-3.5 h-3.5 text-cyan-400" />
                اتصل بنا: 07721617032
              </a>
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[11px] text-emerald-400 font-mono">سيرفر الوطني: مستقر وفائق السرعة</span>
              </div>
            </div>
          </div>
        </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div 
            className="flex items-center gap-3.5 cursor-pointer group"
            onClick={() => setActiveTab("home")}
          >
            <div className="relative">
              <img 
                src="/logo.jpg" 
                alt="شعار بوابة الغد" 
                referrerPolicy="no-referrer"
                onError={(e) => { 
                  const target = e.currentTarget;
                  if (!target.dataset.triedJpeg) {
                    target.dataset.triedJpeg = "true";
                    target.src = "/logo.jpeg";
                  }
                }}
                className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-2xl border-2 border-cyan-400/80 shadow-xl shadow-cyan-500/20 group-hover:scale-105 transition-all bg-slate-900"
              />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight flex items-center gap-2">
                شركة بوابة الغد
                <span className="text-cyan-400 text-xs font-normal border border-cyan-500/30 px-2 py-0.5 rounded-lg bg-cyan-950/50 hidden sm:inline-block">
                  تجارة عامة & مقاولات محدودة المسؤولية
                </span>
              </h1>
              <p className="text-[11px] text-slate-400 tracking-wider font-mono">BAWABAT AL-GHAD GENERAL CONTRACTING</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => setActiveTab("home")}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === "home"
                  ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 font-semibold"
                  : "text-slate-300 hover:text-white hover:bg-slate-800"
              }`}
            >
              الرئيسية
            </button>
            <button
              onClick={() => setActiveTab("contracting")}
              className={`px-3.5 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-1.5 ${
                activeTab === "contracting"
                  ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20 font-black"
                  : "text-emerald-400 hover:text-emerald-300 hover:bg-slate-800"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              مقاولات عامة
            </button>
            <button
              onClick={() => setActiveTab("packages")}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === "packages"
                  ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 font-semibold"
                  : "text-slate-300 hover:text-white hover:bg-slate-800"
              }`}
            >
              🌐 إنترنت الوطني
            </button>
            <button
              onClick={() => setActiveTab("solar")}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                activeTab === "solar"
                  ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold"
                  : "text-amber-300 hover:text-amber-200 hover:bg-slate-800"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              طاقة شمسية SVC
            </button>
            <button
              onClick={() => setActiveTab("store")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                activeTab === "store"
                  ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 font-semibold"
                  : "text-slate-300 hover:text-white hover:bg-slate-800"
              }`}
            >
              متجر الأجهزة ومقويات الإشارة
              {cartCount > 0 && (
                <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("simulator")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === "simulator"
                  ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 font-semibold"
                  : "text-slate-300 hover:text-white hover:bg-slate-800"
              }`}
            >
              محاكي التغطية الذكي
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === "orders"
                  ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 font-semibold"
                  : "text-slate-300 hover:text-white hover:bg-slate-800"
              }`}
            >
              طلبات التفعيل
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                activeTab === "history"
                  ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 font-semibold"
                  : "text-slate-300 hover:text-white hover:bg-slate-800"
              }`}
            >
              <span>سجل طلباتي</span>
            </button>
          </nav>

          {/* Header Right Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsQrModalOpen(true)}
              className="hidden sm:flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-2 rounded-xl text-xs font-bold transition-all"
              title="عرض رمز QR للمسح بالهاتف"
            >
              <QrCode className="w-4 h-4 text-cyan-400" />
              <span>QR الموقع</span>
            </button>

            <button
              onClick={() => setActiveTab("ai-chat")}
              className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all border border-cyan-400/20"
            >
              <Sparkles className="w-4 h-4 text-cyan-200 animate-spin-slow" />
              <span>المستشار الذكي للدعم</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Bar */}
      <div className="lg:hidden bg-slate-850 overflow-x-auto border-t border-slate-800 flex whitespace-nowrap no-scrollbar px-2 py-2 w-full max-w-full min-w-0">
        <div className="flex gap-1.5 w-max px-1">
          <button
            onClick={() => setActiveTab("home")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "home" ? "bg-cyan-500 text-slate-950" : "text-slate-300 bg-slate-800"
            }`}
          >
            الرئيسية
          </button>
          <button
            onClick={() => setActiveTab("contracting")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === "contracting" ? "bg-emerald-500 text-slate-950" : "text-emerald-300 bg-emerald-950/40 border border-emerald-500/30"
            }`}
          >
            🏗️ مقاولات عامة
          </button>
          <button
            onClick={() => setActiveTab("packages")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "packages" ? "bg-cyan-500 text-slate-950" : "text-slate-300 bg-slate-800"
            }`}
          >
            🌐 إنترنت الوطني
          </button>
          <button
            onClick={() => setActiveTab("solar")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === "solar" ? "bg-amber-500 text-slate-950" : "text-amber-300 bg-amber-950/40 border border-amber-500/30"
            }`}
          >
            ☀️ طاقة شمسية SVC
          </button>
          <button
            onClick={() => setActiveTab("store")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "store" ? "bg-cyan-500 text-slate-950" : "text-slate-300 bg-slate-800"
            }`}
          >
            الأجهزة {cartCount > 0 && `(${cartCount})`}
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "orders" ? "bg-cyan-500 text-slate-950" : "text-slate-300 bg-slate-800"
            }`}
          >
            تقديم طلب
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "history" ? "bg-cyan-500 text-slate-950" : "text-slate-300 bg-slate-800"
            }`}
          >
            سجل طلباتي
          </button>
          <button
            onClick={() => setIsQrModalOpen(true)}
            className="px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 text-cyan-300 bg-cyan-950/60 border border-cyan-500/30"
          >
            <QrCode className="w-3.5 h-3.5 text-cyan-400" />
            <span>QR الموقع</span>
          </button>
        </div>
      </div>
    </header>

    <QrCodeModal isOpen={isQrModalOpen} onClose={() => setIsQrModalOpen(false)} />
    </>
  );
}
