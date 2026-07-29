import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { QRCodeSVG } from "qrcode.react";
import Header from "./components/Header";
import Packages from "./components/Packages";
import HardwareStore from "./components/HardwareStore";
import Simulator from "./components/Simulator";
import OrderForm from "./components/OrderForm";
import OrderHistory from "./components/OrderHistory";
import AiChat from "./components/AiChat";
import SolarSection from "./components/SolarSection";
import Contracting from "./components/Contracting";
import QrCodeModal from "./components/QrCodeModal";
import PWAInstallPrompt from "./components/PWAInstallPrompt";
import { Package, Product } from "./types";
import { faqList, products } from "./data";
import { 
  Wifi, 
  Cpu, 
  Activity, 
  ChevronDown, 
  ChevronUp, 
  ArrowLeft, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  Zap, 
  CheckCircle,
  HelpCircle,
  Sun,
  BatteryCharging,
  QrCode,
  Smartphone,
  Share2,
  User,
  Building2,
  HardHat,
  Truck,
  Briefcase,
  Image as ImageIcon,
  Maximize2,
  Eye,
  X
} from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [previewImage, setPreviewImage] = useState<{ url: string; title: string; subtitle?: string } | null>(null);
  
  // App-level state for ordering flow
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [selectedHardware, setSelectedHardware] = useState<Product[]>([]);
  const [orderType, setOrderType] = useState<"subscription" | "hardware" | "recharge" | "solar" | "contracting">("subscription");

  // FAQ collapse state helper
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Cart operations
  const handleAddToCart = (product: Product) => {
    setSelectedHardware((prev) => {
      if (prev.some((p) => p.id === product.id)) {
        return prev;
      }
      return [...prev, product];
    });
  };

  const handleRemoveFromCart = (product: Product) => {
    setSelectedHardware((prev) => prev.filter((p) => p.id !== product.id));
  };

  const handleCheckoutCart = () => {
    const hasSolar = selectedHardware.some((p) => p.category.startsWith("solar_"));
    setOrderType(hasSolar ? "solar" : "hardware");
    setActiveTab("orders");
  };

  const handleSelectPackage = (pkg: Package) => {
    setSelectedPackage(pkg);
    setOrderType("subscription");
    setActiveTab("orders");
  };

  const handleClearPackage = () => {
    setSelectedPackage(null);
  };

  const handleClearHardware = () => {
    setSelectedHardware([]);
  };

  // Scroll to top when tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans overflow-x-hidden w-full max-w-full">
      {/* PWA Install Notification Bar */}
      <PWAInstallPrompt />

      {/* Dynamic Header & Navigation */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        cartCount={selectedHardware.length} 
      />

      {/* Main Container Content */}
      <main className="flex-1 max-w-7xl w-full max-w-full min-w-0 mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10">
        <AnimatePresence mode="wait">
          {activeTab === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-16 text-right"
            >
              {/* Massive Hero Section */}
              <section className="bg-gradient-to-tr from-slate-900 via-slate-800 to-indigo-950 text-white rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-xl border border-slate-700/60">
                {/* Visual light overlays */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[300px] bg-amber-500/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center relative z-10">
                  {/* Text block */}
                  <div className="lg:col-span-3 space-y-6 sm:space-y-8">
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                        شركة مقاولات عامة وتجارة عامة
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        <Sun className="w-3.5 h-3.5 text-amber-400" />
                        وكلاء طاقة شمسية SVC
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                        الوكيل المعتمد لشبكة الوطني (FTTH)
                      </span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight">
                      شركة بوابة الغد <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-l from-cyan-400 via-amber-300 to-emerald-400">
                        للتجارة والمقاولات العامة محدودة المسؤولية
                      </span>
                    </h2>

                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal max-w-2xl">
                      تعد **شركة بوابة الغد** صرحاً هائلاً يجمع بين خبرات **المقاولات العامة والبناء والإنشاءات الهندسية**، وتجهيز الحلول المتكاملة، بالإضافة إلى كونها المركز المعتمد لـ **منظومات الطاقة الشمسية الهجينة وبطاريات الليثيوم SVC** والوكيل الرسمي لخدمات **الإنترنت الضوئي الفائق (الوطني FTTH)** وتجهيز عتاد الشبكات في محافظة ميسان.
                    </p>

                    <div className="flex flex-wrap gap-3 pt-2">
                      <button
                        onClick={() => setActiveTab("contracting")}
                        className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-6 py-3.5 rounded-2xl text-sm transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
                      >
                        <HardHat className="w-4 h-4 text-slate-950 fill-slate-950" />
                        <span>قسم المقاولات العامة والإنشاءات</span>
                      </button>
                      <button
                        onClick={() => setActiveTab("solar")}
                        className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-6 py-3.5 rounded-2xl text-sm transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
                      >
                        <Sun className="w-4 h-4 text-slate-950 fill-slate-950" />
                        <span>طاقة شمسية SVC</span>
                      </button>
                      <button
                        onClick={() => setActiveTab("packages")}
                        className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold px-6 py-3.5 rounded-2xl text-sm transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2"
                      >
                        <Zap className="w-4 h-4 text-slate-950 font-bold" />
                        <span>الكيبل الضوئي (الوطني)</span>
                      </button>
                    </div>
                  </div>

                  {/* Official Company Banner & Profile Image Card (right columns) */}
                  <div className="lg:col-span-2 flex justify-center">
                    <div className="w-full max-w-md bg-slate-950/80 border border-slate-800/80 rounded-3xl p-4 sm:p-5 space-y-4 shadow-2xl relative overflow-hidden backdrop-blur-xs">
                      {/* Status light */}
                      <div className="flex justify-between items-center border-b border-slate-800/80 pb-3">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                          <span className="text-[11px] font-mono text-emerald-400 font-bold">معتمد وموثق رسميًا</span>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                          البروفايل الرسمي
                        </span>
                      </div>

                      {/* Official Image Container */}
                      <div 
                        onClick={() => setPreviewImage({
                          url: "/company_brochure.jpg",
                          title: "البروفايل والمنشور التعريفي الرسمي - شركة بوابة الغد للتجارة والمقاولات العامة محدودة المسؤولية",
                          subtitle: "يتضمن العنوان، أرقام الهواتف الرسمية، والبريد الإلكتروني للإدارة العامة"
                        })}
                        className="relative group rounded-2xl overflow-hidden cursor-pointer border border-slate-700/60 shadow-lg bg-slate-900"
                      >
                        <img 
                          src="/company_brochure.jpg" 
                          alt="المنشور التعريفي الرسمي لشركة بوابة الغد" 
                          referrerPolicy="no-referrer"
                          onError={(e) => { e.currentTarget.src = "/project_doc_new1.jpeg"; }}
                          className="w-full h-auto max-h-72 object-contain group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-bold text-xs backdrop-blur-2xs">
                          <Maximize2 className="w-5 h-5 text-cyan-400" />
                          <span>انقر لتكبير المنشور الرسمي</span>
                        </div>
                      </div>

                      <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800/80 flex justify-between items-center text-xs">
                        <div className="text-right">
                          <p className="font-extrabold text-slate-100 text-xs">شركة بوابة الغد للتجارة والمقاولات العامة محدودة المسؤولية</p>
                          <p className="text-[10px] text-slate-400 font-mono">الإدارة: المهندس أثير صابر</p>
                        </div>
                        <button 
                          onClick={() => setPreviewImage({
                            url: "/company_brochure.jpg",
                            title: "المنشور التعريفي الرسمي لشركة بوابة الغد",
                            subtitle: "العراق - ميسان - العمارة - شارع مستشفى الصدر | بغداد - الكرادة"
                          })}
                          className="bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 p-2 rounded-lg border border-cyan-500/40 transition-colors shrink-0"
                          title="عرض الصورة كاملة"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Bento Grid Divisions Section */}
              <section className="space-y-8">
                <div className="text-center max-w-2xl mx-auto space-y-3">
                  <h3 className="text-2xl font-extrabold text-slate-950 sm:text-3xl">قطاعات وأنشطة شركة بوابة الغد</h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                    نلبي كافة متطلبات المشاريع السكنية والتجارية والحكومية بأعلى معايير الجودة والموثوقية.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div 
                    onClick={() => setActiveTab("contracting")}
                    className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-lg transition-all space-y-4 text-right cursor-pointer group hover:border-emerald-300"
                  >
                    <div className="bg-emerald-50 text-emerald-600 p-3 rounded-2xl w-fit group-hover:scale-110 transition-transform">
                      <Building2 className="w-6 h-6" />
                    </div>
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-slate-900 text-sm group-hover:text-emerald-600 transition-colors">المقاولات العامة والإنشاءات</h4>
                      <ArrowLeft className="w-4 h-4 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed font-normal">
                      تنفيذ وإشراف على أحدث أعمال البناء، البنية التحتية، الأعمال المدنية والكهربائية والتجهيزات العامة للمؤسسات والمنازل.
                    </p>
                  </div>

                  <div 
                    onClick={() => setActiveTab("solar")}
                    className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-lg transition-all space-y-4 text-right cursor-pointer group hover:border-amber-300"
                  >
                    <div className="bg-amber-50 text-amber-600 p-3 rounded-2xl w-fit group-hover:scale-110 transition-transform">
                      <Sun className="w-6 h-6" />
                    </div>
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-slate-900 text-sm group-hover:text-amber-600 transition-colors">منظومات الطاقة الشمسية SVC</h4>
                      <ArrowLeft className="w-4 h-4 text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed font-normal">
                      توريد وتركيب إنفيرترات الموجة النقية وبطاريات الليثيوم المستديرة لتأمين طاقة كهربائية مستمرة بدون انقطاع.
                    </p>
                  </div>

                  <div 
                    onClick={() => setActiveTab("packages")}
                    className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-lg transition-all space-y-4 text-right cursor-pointer group hover:border-cyan-300"
                  >
                    <div className="bg-cyan-50 text-cyan-600 p-3 rounded-2xl w-fit group-hover:scale-110 transition-transform">
                      <Wifi className="w-6 h-6" />
                    </div>
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-slate-900 text-sm group-hover:text-cyan-600 transition-colors">الإنترنت الضوئي (الوطني FTTH)</h4>
                      <ArrowLeft className="w-4 h-4 text-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed font-normal">
                      تفعيل واشتراكات الكيبل الضوئي الأسرع في العراق بالتعاون مع شركة الوطني، مع ضمان استقرار تام للبث.
                    </p>
                  </div>

                  <div 
                    onClick={() => setActiveTab("store")}
                    className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-lg transition-all space-y-4 text-right cursor-pointer group hover:border-indigo-300"
                  >
                    <div className="bg-indigo-50 text-indigo-600 p-3 rounded-2xl w-fit group-hover:scale-110 transition-transform">
                      <Cpu className="w-6 h-6" />
                    </div>
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors">متجر عتاد الشبكات والأجهزة</h4>
                      <ArrowLeft className="w-4 h-4 text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed font-normal">
                      تجهيز أجهزة ONU هواوي الأصلية، راوترات TP-Link الجيجابت، منظومات Deco Mesh، ومعدات الربط المتقدمة.
                    </p>
                  </div>
                </div>
              </section>

              {/* Hardware highlight split banner */}
              <section className="bg-slate-100 rounded-3xl p-6 sm:p-10 border border-slate-200/80 grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
                <div className="lg:col-span-3 space-y-4">
                  <h3 className="text-2xl font-bold text-slate-950">تشكيلة واسعة من أحدث أجهزة الشبكات</h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    وليس هذا فحسب، فمكتب **بوابة الغد** يوفر لكم تشكيلة واسعة وموثوقة من أحدث أجهزة الشبكات والإنترنت الضوئي، بما في ذلك أجهزة الـ **ONU** المتوافقة، **الراوترات المتطورة**، و**مقويات الإشارة الذكية** التي تضمن تغطية واي فاي قوية ومستقرة في كل زاوية من منازلكم ومكاتبكم.
                  </p>
                  <button
                    onClick={() => setActiveTab("store")}
                    className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-3 rounded-xl text-xs transition-all shadow-sm flex items-center gap-1.5"
                  >
                    <span>تصفح متجر الأجهزة الذكية</span>
                    <ArrowLeft className="w-4 h-4 shrink-0" />
                  </button>
                </div>

                <div className="lg:col-span-2 grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-2xl border border-slate-200/60 text-center">
                    <p className="text-lg font-black text-cyan-600 font-mono">Wi-Fi 6</p>
                    <p className="text-xs text-slate-800 font-bold mt-1">الراوترات المتطورة</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">تبث النطاقين بإنتاجية فائقة</p>
                  </div>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200/60 text-center">
                    <p className="text-lg font-black text-cyan-600 font-mono">Mesh Net</p>
                    <p className="text-xs text-slate-800 font-bold mt-1">مقويات إشارة ذكية</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">تغطي كافة المساحات الشاسعة</p>
                  </div>
                </div>
              </section>

              {/* Official Single Company Poster / Brochure Section */}
              <section className="space-y-4 pt-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-200 pb-4">
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                      <ImageIcon className="w-3.5 h-3.5 text-emerald-600" />
                      <span>البروفايل والمنشور التعريفي الرسمي</span>
                    </div>
                    <h3 className="text-2xl font-extrabold text-slate-950">المنشور الرسمي لشركة بوابة الغد للمقاولات العامة</h3>
                  </div>
                  <p className="text-xs text-slate-500 max-w-md text-right font-normal">
                    انقر على الصورة في الأسفل للتكبير والاطلاع على التفاصيل الرسمية وعناوين الفروع الهندسية.
                  </p>
                </div>

                <div className="max-w-xl mx-auto bg-white rounded-3xl p-3 sm:p-4 border border-slate-200 shadow-md">
                  <div
                    onClick={() => setPreviewImage({
                      url: "/company_brochure.jpg",
                      title: "البروفايل والمنشور التعريفي الرسمي - شركة بوابة الغد للتجارة والمقاولات العامة محدودة المسؤولية",
                      subtitle: "إدارة الشركة: المهندس أثير صابر - ميسان والعمارة وبغداد"
                    })}
                    className="relative rounded-2xl overflow-hidden cursor-pointer group bg-slate-950 border border-slate-800"
                  >
                    <img
                      src="/company_brochure.jpg"
                      alt="المنشور التعريفي الرسمي لشركة بوابة الغد للمقاولات العامة"
                      referrerPolicy="no-referrer"
                      onError={(e) => { e.currentTarget.src = "/project_doc_new1.jpeg"; }}
                      className="w-full h-auto object-contain group-hover:scale-102 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white gap-2 text-sm font-bold backdrop-blur-2xs">
                      <Maximize2 className="w-5 h-5 text-cyan-400" />
                      <span>انقر لمشاهدة المنشور بالحجم الكامل</span>
                    </div>
                  </div>

                  <div className="pt-3 text-center space-y-1">
                    <h4 className="text-sm font-black text-slate-900">شركة بوابة الغد للتجارة والمقاولات العامة محدودة المسؤولية</h4>
                    <p className="text-xs text-slate-500">يتضمن كافة تفاصيل الاعتمادات والتراخيص الرسمية وتواصل الفروع</p>
                  </div>
                </div>
              </section>

              {/* Interactive FAQ Accordion */}
              <section className="max-w-4xl mx-auto space-y-6">
                <h3 className="text-xl font-bold text-slate-950 text-center flex items-center gap-2 justify-center">
                  <HelpCircle className="w-5 h-5 text-cyan-500" />
                  الأسئلة الشائعة حول خدمات الفايبر والشبكات
                </h3>

                <div className="space-y-3">
                  {faqList.map((faq, idx) => {
                    const isOpen = expandedFaq === idx;
                    return (
                      <div
                        key={idx}
                        className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden transition-all shadow-xs"
                      >
                        <button
                          onClick={() => setExpandedFaq(isOpen ? null : idx)}
                          className="w-full p-5 text-right flex justify-between items-center gap-4 hover:bg-slate-50/50 transition-colors"
                        >
                          {isOpen ? <ChevronUp className="w-5 h-5 text-slate-500" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                          <span className="font-bold text-slate-900 text-sm sm:text-base">{faq.q}</span>
                        </button>

                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: "auto" }}
                              exit={{ height: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="p-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal border-t border-slate-50 bg-slate-50/40">
                                {faq.a}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </section>
            </motion.div>
          )}

          {activeTab === "contracting" && (
            <motion.div
              key="contracting"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
            >
              <Contracting 
                onNavigateToOrder={() => {
                  setOrderType("contracting");
                  setActiveTab("orders");
                }} 
              />
            </motion.div>
          )}

          {activeTab === "packages" && (
            <motion.div
              key="packages"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
            >
              <Packages 
                onSelectPackage={handleSelectPackage} 
                setActiveTab={setActiveTab} 
              />
            </motion.div>
          )}

          {activeTab === "solar" && (
            <motion.div
              key="solar"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
            >
              <SolarSection
                onAddToCart={handleAddToCart}
                onNavigateToOrder={(productName) => {
                  if (productName) {
                    const foundProduct = products.find((p) => p.name.includes(productName));
                    if (foundProduct) handleAddToCart(foundProduct);
                  }
                  setOrderType("solar");
                  setActiveTab("orders");
                }}
              />
            </motion.div>
          )}

          {activeTab === "store" && (
            <motion.div
              key="store"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
            >
              <HardwareStore
                cart={selectedHardware}
                onAddToCart={handleAddToCart}
                onRemoveFromCart={handleRemoveFromCart}
                onCheckoutCart={handleCheckoutCart}
              />
            </motion.div>
          )}

          {activeTab === "simulator" && (
            <motion.div
              key="simulator"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
            >
              <Simulator />
            </motion.div>
          )}

          {activeTab === "orders" && (
            <motion.div
              key="orders"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
            >
              <OrderForm
                selectedPackage={selectedPackage}
                selectedHardware={selectedHardware}
                onClearPackage={handleClearPackage}
                onClearHardware={handleClearHardware}
                initialType={orderType}
              />
            </motion.div>
          )}

          {activeTab === "history" && (
            <motion.div
              key="history"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
            >
              <OrderHistory
                onNavigateToNewOrder={() => setActiveTab("orders")}
              />
            </motion.div>
          )}

          {activeTab === "ai-chat" && (
            <motion.div
              key="ai-chat"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
            >
              <AiChat />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Corporate footer */}
      <footer className="bg-slate-900 text-white border-t border-slate-800 py-12 px-4 sm:px-6 lg:px-8 mt-20 text-right">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: Info and logo */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 justify-end">
              <div className="text-right">
                <h4 className="text-lg font-black tracking-tight text-white">شركة بوابة الغد للتجارة والمقاولات العامة محدودة المسؤولية</h4>
                <p className="text-[10px] text-cyan-400 font-mono tracking-wider">BAWABAT AL-GHAD GENERAL CONTRACTING</p>
              </div>
              <img 
                src="/logo.jpg" 
                alt="شعار شركة بوابة الغد" 
                referrerPolicy="no-referrer"
                onError={(e) => { 
                  const target = e.currentTarget;
                  if (!target.dataset.triedJpeg) {
                    target.dataset.triedJpeg = "true";
                    target.src = "/logo.jpeg";
                  }
                }}
                className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-2xl border-2 border-cyan-400/80 shrink-0 shadow-xl bg-slate-900"
              />
            </div>
            <p className="text-slate-400 text-xs leading-relaxed font-normal">
              شركة عريقة متخصصة في تنفيذ مشاريع المقاولات العامة والبناء، تجهيز أنظمة الطاقة الشمسية الهجينة SVC، وخدمات وتفعيل الكيبل الضوئي (الوطني FTTH).
            </p>
            <div className="text-[11px] text-slate-500 font-mono">
              © {new Date().getFullYear()} Bawabat Al-Ghad General Contracting & Trade. All Rights Reserved.
            </div>
          </div>

          {/* Column 2: Quick navigation */}
          <div className="space-y-3">
            <h5 className="font-extrabold text-sm border-b border-slate-800 pb-2">روابط سريعة</h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => setActiveTab("home")} className="hover:text-cyan-400 transition-colors">الرئيسية</button>
              </li>
              <li>
                <button onClick={() => setActiveTab("solar")} className="hover:text-amber-400 transition-colors font-bold text-amber-300">☀️ منظومات الطاقة الشمسية SVC</button>
              </li>
              <li>
                <button onClick={() => setActiveTab("packages")} className="hover:text-cyan-400 transition-colors">باقات الوطني فايبر</button>
              </li>
              <li>
                <button onClick={() => setActiveTab("store")} className="hover:text-cyan-400 transition-colors">متجر الأجهزة والأقسام</button>
              </li>
              <li>
                <button onClick={() => setActiveTab("simulator")} className="hover:text-cyan-400 transition-colors">محاكي التغطية المنزلي</button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & address */}
          <div className="space-y-3 text-xs text-slate-400">
            <h5 className="font-extrabold text-sm text-white border-b border-slate-800 pb-2">معلومات المكتب والإدارة</h5>
            <div className="space-y-2.5">
              <p className="flex items-center gap-1.5 justify-end">
                <span>ميسان - العمارة - سايدين مستشفى الصدر - نهاية الشارع</span>
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
              </p>
              <p className="flex items-center gap-1.5 justify-end">
                <span className="font-mono">07721617032</span>
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
              </p>
              <p className="flex items-center gap-1.5 justify-end">
                <span>ساعات العمل: 9:00 صباحاً - 10:00 مساءً</span>
                <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
              </p>
              <p className="flex items-center gap-1.5 justify-end text-cyan-300 font-bold pt-1 border-t border-slate-800/80">
                <span>مدير الشركة: المهندس أثير صابر</span>
                <User className="w-4 h-4 text-cyan-400 shrink-0" />
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Image Preview Lightbox Modal */}
      <AnimatePresence>
        {previewImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewImage(null)}
            className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md p-4 sm:p-8 flex items-center justify-center cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="p-4 sm:p-5 bg-slate-950 border-b border-slate-800 flex justify-between items-center">
                <button
                  onClick={() => setPreviewImage(null)}
                  className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="text-right">
                  <h3 className="text-sm sm:text-base font-extrabold text-white">{previewImage.title}</h3>
                  {previewImage.subtitle && (
                    <p className="text-xs text-slate-400 font-normal mt-0.5">{previewImage.subtitle}</p>
                  )}
                </div>
              </div>

              {/* Modal Image Body */}
              <div className="p-2 sm:p-4 overflow-auto flex items-center justify-center bg-slate-950/60 min-h-[300px]">
                <img
                  src={previewImage.url}
                  alt={previewImage.title}
                  referrerPolicy="no-referrer"
                  onError={(e) => { e.currentTarget.src = "/project_doc_new1.jpeg"; }}
                  className="max-w-full max-h-[70vh] object-contain rounded-xl shadow-lg border border-slate-800"
                />
              </div>

              {/* Modal Footer */}
              <div className="p-3 sm:p-4 bg-slate-950 border-t border-slate-800 flex justify-between items-center text-xs text-slate-400 font-mono">
                <span>شركة بوابة الغد للتجارة والمقاولات العامة محدودة المسؤولية</span>
                <a
                  href={previewImage.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/30 transition-colors font-sans font-bold"
                >
                  فتح الصورة في نافذة جديدة
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Simple layout helper icons mapping
function Clock({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
  );
}
