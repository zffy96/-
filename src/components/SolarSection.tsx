import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { products } from "../data";
import { Product } from "../types";
import {
  Sun,
  Zap,
  Battery,
  BatteryCharging,
  ShieldCheck,
  CheckCircle2,
  Tv,
  Fan,
  Wind,
  Droplet,
  Flame,
  Plus,
  Trash2,
  Play,
  Pause,
  Maximize2,
  PhoneCall,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ShoppingCart,
  Info,
  Check,
  Camera,
  Eye,
  X,
  Layers,
  Wrench,
  Cpu
} from "lucide-react";

interface SolarSectionProps {
  onAddToCart: (product: Product) => void;
  onNavigateToOrder: (productName?: string) => void;
}

export default function SolarSection({ onAddToCart, onNavigateToOrder }: SolarSectionProps) {
  // Preview Modal for enlarged product image
  const [previewModalImage, setPreviewModalImage] = useState<{ url: string; title: string; desc?: string } | null>(null);

  // Video Player State & Ref
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlayingVideo, setIsPlayingVideo] = useState(true);
  const [videoMode, setVideoMode] = useState<"solar" | "battery" | "grid">("solar");
  const [activeVideoTab, setActiveVideoTab] = useState<"video" | "gallery">("video");
  const [videoSource, setVideoSource] = useState<string>("/video.mp4");
  const [videoError, setVideoError] = useState(false);
  const [currentTime, setCurrentTime] = useState("01:45");
  const [duration, setDuration] = useState("01:52");
  const [progressPercent, setProgressPercent] = useState(93);

  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (isPlayingVideo) {
        videoRef.current.pause();
        setIsPlayingVideo(false);
      } else {
        videoRef.current.play().then(() => setIsPlayingVideo(true)).catch(() => setIsPlayingVideo(false));
      }
    } else {
      setIsPlayingVideo(!isPlayingVideo);
    }
  };

  // Photo Gallery & Video Lightbox State
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const handleExpandVideo = () => {
    if (videoRef.current) {
      const v = videoRef.current as any;
      if (v.webkitEnterFullscreen) {
        try {
          v.webkitEnterFullscreen();
          return;
        } catch (e) {
          // ignore error and open custom modal
        }
      }
    }
    setIsVideoModalOpen(true);
  };

  // Gallery Photos Data from actual installation team work
  const galleryPhotos = [
    {
      id: 1,
      title: "تجميع قاعدة بطارية الليثيوم LiFePO4 العمودية",
      stage: "المرحلة الأولى - تجهيز الموقع والقاعدة",
      desc: "فريق بوابة الغد الفني أثناء رص وتجميع القاعدة السفلية لبطارية SVC العمودية المدمجة ذات العمر الطويل.",
      image: "/svc_stage_1.jpg",
      tag: "تجهيز القاعدة",
    },
    {
      id: 2,
      title: "رفع ومحاذاة وحدة إنفيرتر SVC الهجين 5.5KW",
      stage: "المرحلة الثانية - التركيب الهيكلي",
      desc: "تعاون الفنيين والمهندسين لتركيب وحدة الإنفيرتر فوق البطارية بدقة عالية لربط المسارات الكهربائية المباشرة.",
      image: "/svc_stage_2.jpg",
      tag: "تركيب الإنفيرتر",
    },
    {
      id: 3,
      title: "التثبيت الميكانيكي وشد البراغي الاحترافي",
      stage: "المرحلة الثالثة - الأمان والتثبيت",
      desc: "استخدام معدات تثبيت احترافية لتأمين هيكل الإنفيرتر والصندوق الجانبي ومنع أي اهتزازات مستقبلاً.",
      image: "/svc_stage_3.jpg",
      tag: "شد البراغي والتثبيت",
    },
    {
      id: 4,
      title: "تسليك لوحة التوزيع وقواطع الحماية ATS",
      stage: "المرحلة الرابعة - الربط الكهربائي",
      desc: "تنظيم كابلات الفاز والنيوترال داخل صندوق التوزيع الرئيسي مع ربط محول التحويل التلقائي وجهاز حماية الفولتية.",
      image: "/svc_stage_4.jpg",
      tag: "تسليك القواطع",
    },
    {
      id: 5,
      title: "التشغيل النهائي واختبار التكييف (231V)",
      stage: "المرحلة الخامسة - التسليم والتشغيل",
      desc: "إضاءة الشاشة الرقمية واستقرار الفولتية عند 231V مع تشغيل التكييف السقفي بدون أي ترميش بالكهرباء.",
      image: "/svc_stage_5.jpg",
      tag: "التشغيل والربط",
    },
    {
      id: 6,
      title: "ربط كابلات بطارية الليثيوم والتوازن الجهد",
      stage: "ربط وتجهيز بنوك الليثيوم",
      desc: "فحص وتوصيل أطراف التغذية لبطارية LiFePO4 وضبط إعدادات الـ BMS الذكية.",
      image: "/svc_lithium_battery.jpeg",
      tag: "توصيل الليثيوم",
    },
    {
      id: 7,
      title: "محاذاة وتثبيت القواعد المعدنية المزدوجة",
      stage: "التثبيت الهيكلي الميداني",
      desc: "محاذاة دقيقة للهيكل الحامل لضمان ثبات الإنفيرتر والبطاريات تحت الظروف المناخية المختلفة.",
      image: "/svc_stage_2_mount.jpeg",
      tag: "تثبيت الهيكل",
    },
    {
      id: 8,
      title: "شد وتأمين براغي التثبيت الميكانيكية",
      stage: "دقة التنفيذ والسلامة",
      desc: "استعمال عزم دوران محدد لتثبيت الصناديق الهيكلية دون التأثير على البطاريات أو الإلكترونيات.",
      image: "/svc_stage_bolts.jpeg",
      tag: "أمان وصيانة",
    },
    {
      id: 9,
      title: "تنظيم الكابلات والقواطع داخل صندوق التوزيع",
      stage: "التسليك والتوجيه الميداني",
      desc: "توجيه مسارات النحاس والفيوزات المعتمدة لضمان أقصى درجات حماية للأجهزة والإنفيرتر.",
      image: "/svc_stage_wiring.jpeg",
      tag: "تسليك هندسي",
    },
    {
      id: 10,
      title: "توثيق ميداني لمشاريع وتنفيذ شركة بوابة الغد",
      stage: "توثيق المتابعة والتنفيذ الميداني",
      desc: "جانب من المتابعة الهندسية وأعمال التنفيذ الميدانية للكوادر المتخصصة.",
      image: "/project_doc_new1.jpeg",
      tag: "توثيق ميداني",
    },
    {
      id: 11,
      title: "سجل أعمال وتجهيزات المقاولات العامة",
      stage: "تجهيزات ومقاولات بوابة الغد",
      desc: "توثيق المواصفات الفنية المعتمدة والتجهيزات الميدانية للشركة.",
      image: "/project_doc_new2.jpeg",
      tag: "سجل الأعمال",
    },
    {
      id: 12,
      title: "معرض توثيق مشاريع ومقاولات شركة بوابة الغد",
      stage: "التوثيق الميداني للتنفيذ",
      desc: "توثيق الأعمال الميدانية والتنفيذية للكوادر الهندسية والفنية.",
      image: "/project_doc_new3.jpeg",
      tag: "توثيق المشاريع",
    },
  ];

  // Load Calculator State
  const [appliances, setAppliances] = useState([
    { id: "ac1", name: "مكيف 1.5 طن (إنفيرتر)", watts: 1500, count: 1, icon: Wind },
    { id: "fridge", name: "ثلاجة / مجمدة منزلي", watts: 350, count: 1, icon: Flame },
    { id: "tv_net", name: "شاشات + راوتر + فايبر ONU", watts: 150, count: 2, icon: Tv },
    { id: "lights_fans", name: "إنارة المنزل + مراوح", watts: 300, count: 1, icon: Fan },
    { id: "pump", name: "ماتور ماء 0.5 حصان", watts: 400, count: 0, icon: Droplet },
  ]);

  const updateCount = (id: string, delta: number) => {
    setAppliances((prev) =>
      prev.map((app) => {
        if (app.id === id) {
          const newCount = Math.max(0, app.count + delta);
          return { ...app, count: newCount };
        }
        return app;
      })
    );
  };

  // Calculations
  const totalWatts = appliances.reduce((sum, app) => sum + app.watts * app.count, 0);
  
  // Recommend Inverter
  let recommendedInverter = "3.5 KW (24V)";
  let recommendedBattery = "بطارية ليثيوم 24V 100Ah";
  let recommendedPanels = "4 إلى 6 ألواح (550W)";
  let systemCode = "SVC-3500";

  if (totalWatts > 3500) {
    recommendedInverter = "10 KW (48V Parallel)";
    recommendedBattery = "بطاريتين ليثيوم 48V 200Ah";
    recommendedPanels = "12 إلى 16 لوح (550W)";
    systemCode = "SVC-10000";
  } else if (totalWatts > 2200) {
    recommendedInverter = "5.5 KW (48V Pure Sine Wave)";
    recommendedBattery = "بطارية ليثيوم SVC 48V 100Ah / 200Ah";
    recommendedPanels = "6 إلى 8 ألواح (550W)";
    systemCode = "SVC-5500";
  }

  // Filter solar products catalog
  const solarProducts = products.filter((p) =>
    ["solar_inverter", "solar_battery", "solar_kit", "solar_panel"].includes(p.category)
  );

  return (
    <div className="space-y-16">
      {/* Hero Banner for Solar Agency */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-amber-950 via-slate-900 to-slate-950 border border-amber-500/30 p-8 sm:p-12 shadow-2xl text-white">
        {/* Background ambient lighting */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6 text-right">
            <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/40 px-3.5 py-1.5 rounded-full text-amber-300 text-xs font-black">
              <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
              <span>الوكيل المعتمد لمنظومات الطاقة الشمسية SVC في العراق</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight tracking-tight">
              أنظمة الطاقة الشمسية الهجينة من <span className="text-amber-400">شركة SVC</span>
              <br />
              <span className="text-xl sm:text-2xl font-normal text-slate-300">
                إنفيرترات هجينة + بطاريات ليثيوم LiFePO4 طويلة العمر
              </span>
            </h2>

            <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed max-w-2xl">
              يسر مكتب <strong className="text-white">بوابة الغد</strong> تقديم أحدث حلول الطاقة الشمسية والكهرباء البديلة في ميسان والعراق. نوفر إنفيرترات SVC الهجينة الذكية ذات الموجة النقية (Pure Sine Wave)، مع بطاريات الليثيوم الأحدث تشغيلياً بضمان يصل حتى 5 سنوات ومعاينة موقعية مجانية.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => onNavigateToOrder("منظومة طاقة شمسية SVC")}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-6 py-3.5 rounded-2xl font-black text-sm transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2"
              >
                <Zap className="w-4 h-4" />
                طلب معاينة وتجهيز منظومة
              </button>
              <a
                href="tel:07721617032"
                className="bg-slate-800/80 hover:bg-slate-800 text-white border border-slate-700 px-6 py-3.5 rounded-2xl font-bold text-sm transition-all flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-amber-400" />
                استشارة مهندس الطاقة: 07721617032
              </a>
            </div>

            {/* Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-800 text-xs font-semibold text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>ضمان الوكيل الرسمي</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>عمر بطارية 10-15 سنة</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>تركيب هندسي متخصص</span>
              </div>
            </div>
          </div>

          {/* Hero Image Showcase */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div 
              onClick={() => setPreviewModalImage({ url: "/svc_inverter.jpg", title: "إنفيرتر طاقة شمسية وبطارية ليثيوم SVC - 5.5KW / 48V Pure Sine Wave", desc: "وحدة إنفيرتر هجين ومجموعة بطارية ليثيوم LiFePO4 بضمان رسمي ومعاينة موقعية" })}
              className="relative rounded-3xl border-2 border-amber-500/30 overflow-hidden shadow-2xl bg-slate-900 group max-w-md w-full cursor-pointer"
            >
              <img
                src="/svc_inverter.jpg"
                alt="إنفيرتر طاقة شمسية وبطارية ليثيوم SVC"
                referrerPolicy="no-referrer"
                onError={(e) => { e.currentTarget.src = "/svc_battery.jpg"; }}
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
              
              <div className="absolute bottom-4 right-4 left-4 p-4 bg-slate-900/90 backdrop-blur-md rounded-2xl border border-amber-500/30 flex justify-between items-center text-xs">
                <div>
                  <p className="font-bold text-amber-400">SVC Hybrid Inverter & LiFePO4</p>
                  <p className="text-[10px] text-slate-300 font-mono">5.5KW / 48V Pure Sine Wave (انقر للتكبير)</p>
                </div>
                <span className="bg-amber-500 text-slate-950 text-[10px] font-black px-2 py-1 rounded">
                  SVC OFFICIAL
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Video & Field Installation Photo Showcase */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div className="space-y-1 text-right">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              <Camera className="w-3.5 h-3.5 text-amber-500" />
              <span>توثيق ميداني حصري لفرق بوابة الغد والوطني</span>
            </div>
            <h3 className="text-2xl font-black text-slate-950">
              عمل فرقنا الميدانية في تجهيز ونصب منظومات الطاقة الشمسية SVC
            </h3>
            <p className="text-xs text-slate-500">
              شاهد بالصور والفيديو مراحل التجهيز من تجميع الهيكل السقلي لبطاريات الليثيوم، تركيب إنفيرتر SVC، تسليك القواطع، وحتى التشغيل النهائي للتكييف المركزي (231V).
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setActiveVideoTab("video")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeVideoTab === "video"
                  ? "bg-slate-950 text-white shadow-md ring-2 ring-amber-400/30"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>فيديو كادر التجهيز</span>
            </button>
            <button
              onClick={() => setActiveVideoTab("gallery")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeVideoTab === "gallery"
                  ? "bg-slate-950 text-white shadow-md ring-2 ring-amber-400/30"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>معرض صور الفرق الميدانية ({galleryPhotos.length})</span>
            </button>
          </div>
        </div>

        {/* Real Installation Video Player OR Photo Gallery Grid */}
        {activeVideoTab === "video" ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Main Video Simulation Player */}
            <div className="lg:col-span-7 bg-slate-950 rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl relative">
              <div className="relative aspect-video w-full bg-slate-900 flex items-center justify-center overflow-hidden">
                {!videoError ? (
                  <video
                    ref={videoRef}
                    src={videoSource}
                    poster="/svc_stage_5.jpg"
                    className="w-full h-full object-cover"
                    playsInline
                    autoPlay
                    muted
                    loop
                    onPlay={() => setIsPlayingVideo(true)}
                    onPause={() => setIsPlayingVideo(false)}
                    onTimeUpdate={(e) => {
                      const cur = e.currentTarget.currentTime;
                      const dur = e.currentTarget.duration || 112;
                      const pct = Math.min(100, (cur / dur) * 100);
                      const fmt = (sec: number) => {
                        const m = Math.floor(sec / 60);
                        const s = Math.floor(sec % 60);
                        return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
                      };
                      setCurrentTime(fmt(cur));
                      if (dur > 0) setDuration(fmt(dur));
                      setProgressPercent(pct);
                    }}
                    onError={() => setVideoError(true)}
                  />
                ) : (
                  <img
                    src="/svc_stage_5.jpg"
                    alt="فيديو تركيب منظومة الطاقة الشمسية بوابة الغد"
                    referrerPolicy="no-referrer"
                    onError={(e) => { e.currentTarget.src = "/svc_inverter.jpg"; }}
                    className={`w-full h-full object-cover transition-transform duration-700 ${isPlayingVideo ? "scale-105" : "scale-100"}`}
                  />
                )}

                {/* Watermark badge on video screen */}
                <div className="absolute top-4 left-4 bg-slate-950/85 backdrop-blur-md border border-amber-500/40 px-3 py-1.5 rounded-xl text-[11px] text-amber-400 font-bold flex items-center gap-2 z-10 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                  <span>فيديو ميداني - كادر بوابة الغد (01:52)</span>
                </div>

                {/* Live LCD Dashboard Overlay */}
                <div className="absolute top-4 right-4 bg-slate-950/85 backdrop-blur-md border border-amber-500/40 p-3 rounded-2xl text-right font-mono space-y-1 z-10 text-[11px] text-slate-200 shadow-lg hidden sm:block">
                  <div className="flex items-center gap-2 justify-end text-amber-400 font-bold">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                    <span>SVC ALL-IN-ONE ESS</span>
                  </div>
                  <p className="text-slate-300">SOLAR / GRID: <span className="text-amber-400 font-bold">{videoMode === "solar" ? "3,850 W" : "220V AC"}</span></p>
                  <p className="text-slate-300">BATTERY SOC: <span className="text-emerald-400 font-bold">{videoMode === "battery" ? "88% (48.8V)" : "100% FULL"}</span></p>
                  <p className="text-slate-300">OUTPUT VOLTAGE: <span className="text-cyan-400 font-bold">231V / 50Hz</span></p>
                  <p className="text-slate-300">LOAD: <span className="text-indigo-400 font-bold">تكييف سقفي مركزي</span></p>
                </div>

                {/* Central Play Badge */}
                {!isPlayingVideo && (
                  <button
                    onClick={toggleVideoPlay}
                    className="absolute inset-0 m-auto w-16 h-16 bg-amber-500 text-slate-950 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-20"
                  >
                    <Play className="w-8 h-8 fill-slate-950 ml-1" />
                  </button>
                )}

                {/* Video Play / Status Bar Overlay */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent p-4 flex items-center justify-between text-white text-xs">
                  <button
                    onClick={toggleVideoPlay}
                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 p-2.5 rounded-full transition-transform hover:scale-110 flex items-center justify-center shadow-md"
                  >
                    {isPlayingVideo ? <Pause className="w-4 h-4 fill-slate-950" /> : <Play className="w-4 h-4 fill-slate-950 ml-0.5" />}
                  </button>

                  <div className="flex-1 mx-4 text-right">
                    <div className="flex justify-between text-[10px] text-slate-300 font-mono mb-1">
                      <span className="text-amber-400 font-bold">تجهيز منظومة SVC بواسطة فنيي مكتب بوابة الغد</span>
                      <span>{currentTime} / {duration}</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-400 rounded-full transition-all duration-300"
                        style={{ width: `${progressPercent}%` }}
                      ></div>
                    </div>
                  </div>

                  <button
                    onClick={handleExpandVideo}
                    className="bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 px-3 py-1.5 rounded-xl text-[11px] font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>تكبير المشهد</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Interactive Breakdown of Video Steps */}
            <div className="lg:col-span-5 space-y-4 text-right">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setActiveVideoTab("gallery")}
                  className="text-amber-600 hover:text-amber-700 font-bold text-xs flex items-center gap-1"
                >
                  <span>فتح المعرض الكامل ({galleryPhotos.length} صور)</span>
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <h4 className="text-lg font-black text-slate-950 flex items-center gap-2 justify-end">
                  <span>مراحل العمل من فيديو الفرق الفنية</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                </h4>
              </div>

              <div className="space-y-2 text-xs">
                {galleryPhotos.map((photo, index) => (
                  <div
                    key={photo.id}
                    onClick={() => setSelectedPhotoIndex(index)}
                    className="p-3 bg-slate-50 hover:bg-amber-50/60 border border-slate-200 hover:border-amber-300 rounded-2xl flex items-start gap-3 cursor-pointer transition-all group"
                  >
                    <span className="bg-amber-500 text-slate-950 font-black px-2 py-0.5 rounded text-[10px] group-hover:scale-105 transition-transform">
                      0{photo.id}
                    </span>
                    <div className="flex-1">
                      <p className="font-bold text-slate-900 group-hover:text-amber-900">{photo.title}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">{photo.desc}</p>
                    </div>
                    <Eye className="w-4 h-4 text-slate-400 group-hover:text-amber-600 shrink-0 self-center" />
                  </div>
                ))}
              </div>

              <button
                onClick={() => onNavigateToOrder("طلب معاينة موقعية وتجهيز طاقة شمسية")}
                className="w-full bg-slate-950 hover:bg-slate-800 text-white font-extrabold py-3.5 rounded-xl text-xs transition-all flex items-center justify-center gap-2 mt-2 shadow-md"
              >
                <Zap className="w-4 h-4 text-amber-400" />
                <span>طلب معاينة موقعية مجانية لتجهيز منزلك/مكتبك</span>
              </button>
            </div>
          </div>
        ) : (
          /* Photo Gallery Grid Mode */
          <div className="space-y-6">
            <div className="flex justify-between items-center text-xs text-slate-500">
              <span>انقر على أي صورة لفتحها بالحجم الكامل مع تفاصيل الخطوة الفنية</span>
              <span className="font-bold text-slate-900">{galleryPhotos.length} صور توثيقية حقيقية لفرق بوابة الغد والوطني</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryPhotos.map((photo, index) => (
                <div
                  key={photo.id}
                  onClick={() => setSelectedPhotoIndex(index)}
                  className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-amber-500/50 shadow-md hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="relative aspect-video w-full bg-slate-950 overflow-hidden">
                    <img
                      src={photo.image}
                      alt={photo.title}
                      referrerPolicy="no-referrer"
                      onError={(e) => { e.currentTarget.src = "/svc_stage_1.jpg"; }}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80"></div>
                    
                    <span className="absolute top-3 right-3 bg-amber-500 text-slate-950 font-black text-[10px] px-2.5 py-1 rounded-full shadow-md">
                      {photo.tag}
                    </span>

                    <div className="absolute bottom-3 right-3 left-3 text-right">
                      <p className="text-[10px] text-amber-400 font-mono font-bold">{photo.stage}</p>
                      <h5 className="text-sm font-black text-white line-clamp-1">{photo.title}</h5>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950/40 backdrop-blur-[2px]">
                      <span className="bg-amber-500 text-slate-950 px-3 py-1.5 rounded-full text-xs font-black flex items-center gap-1 shadow-lg">
                        <Eye className="w-3.5 h-3.5" />
                        <span>تكبير الصورة</span>
                      </span>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-900 text-right space-y-2">
                    <p className="text-xs text-slate-300 leading-relaxed">{photo.desc}</p>
                    <div className="flex justify-between items-center text-[10px] text-slate-500 border-t border-slate-800 pt-2 font-mono">
                      <span>كادر بوابة الغد الميداني</span>
                      <span>خطوة 0{photo.id} من 05</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 bg-amber-50 border border-amber-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-right">
              <div>
                <p className="font-bold text-amber-950 text-sm">هل ترغب بتجهيز منزلك أو محلك بنفس الدقة والاحترافية؟</p>
                <p className="text-xs text-amber-800">يقوم فريقنا الميداني في العمارة - ميسان بزيارة موقعك مجاناً لتحديد الأحمال الدقيقة والأنسب لك.</p>
              </div>
              <button
                onClick={() => onNavigateToOrder("طلب كشف وتجهيز منظومة طاقة شمسية")}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-6 py-3 rounded-xl text-xs transition-all shadow-md shrink-0"
              >
                حجز موعد كشف موقعي مجاني
              </button>
            </div>
          </div>
        )}
      </div>

      {/* FULL-SCREEN LIGHTBOX MODAL FOR VIDEO */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md p-3 sm:p-6 flex items-center justify-center"
            onClick={() => setIsVideoModalOpen(false)}
          >
            <div
              className="bg-slate-900 border border-slate-800 rounded-3xl max-w-5xl w-full max-h-[95vh] overflow-hidden shadow-2xl flex flex-col relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950 text-white">
                <button
                  onClick={() => setIsVideoModalOpen(false)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors flex items-center gap-1.5 text-xs font-bold cursor-pointer"
                >
                  <X className="w-5 h-5" />
                  <span className="hidden sm:inline">إغلاق المشهد</span>
                </button>

                <div className="text-right">
                  <span className="text-[10px] text-amber-400 font-mono font-bold bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/30">
                    عرض الفيديو المكبر
                  </span>
                  <h4 className="text-sm sm:text-base font-black text-white mt-0.5">
                    فيديو تجهيز ونصب منظومة SVC - كادر بوابة الغد الميداني
                  </h4>
                </div>
              </div>

              {/* Modal Video Area - Video Only */}
              <div className="relative flex-1 bg-black flex items-center justify-center p-2 sm:p-4 min-h-[300px] sm:min-h-[480px] overflow-hidden">
                {!videoError ? (
                  <video
                    src={videoSource}
                    poster="/svc_stage_5.jpg"
                    className="max-h-[75vh] w-full object-contain rounded-xl shadow-2xl"
                    controls
                    autoPlay
                    playsInline
                  />
                ) : (
                  <img
                    src="/svc_stage_5.jpg"
                    alt="فيديو تركيب منظومة الطاقة الشمسية بوابة الغد"
                    referrerPolicy="no-referrer"
                    onError={(e) => { e.currentTarget.src = "/svc_inverter.jpg"; }}
                    className="max-h-[75vh] w-full object-contain rounded-xl shadow-2xl"
                  />
                )}
              </div>

              {/* Modal Footer Description */}
              <div className="p-4 sm:p-5 bg-slate-950 border-t border-slate-800 text-right flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-xs text-slate-300 leading-relaxed">
                  تجهيز ونصب أجهزة ومعدات منظومة SVC بواسطة المهندسين والفنيين المعتمدين في ميسان.
                </p>
                <button
                  onClick={() => {
                    setIsVideoModalOpen(false);
                    onNavigateToOrder("طلب معاينة وتجهيز منظومة طاقة شمسية");
                  }}
                  className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-5 py-2.5 rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-lg shrink-0 cursor-pointer"
                >
                  <Zap className="w-4 h-4" />
                  <span>طلب معاينة وتجهيز موقعي</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FULL-SCREEN LIGHTBOX MODAL FOR GALLERY PHOTOS */}
      <AnimatePresence>
        {selectedPhotoIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md p-4 sm:p-8 flex items-center justify-center"
            onClick={() => setSelectedPhotoIndex(null)}
          >
            <div
              className="bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-4 sm:p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950 text-white">
                <button
                  onClick={() => setSelectedPhotoIndex(null)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="text-right">
                  <span className="text-[10px] text-amber-400 font-mono font-bold bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/30">
                    {galleryPhotos[selectedPhotoIndex].stage}
                  </span>
                  <h4 className="text-base sm:text-lg font-black text-white mt-0.5">
                    {galleryPhotos[selectedPhotoIndex].title}
                  </h4>
                </div>
              </div>

              {/* Modal Photo Display Area */}
              <div className="relative flex-1 bg-black flex items-center justify-center p-4 min-h-[300px] sm:min-h-[420px] overflow-hidden">
                <img
                  src={galleryPhotos[selectedPhotoIndex].image}
                  alt={galleryPhotos[selectedPhotoIndex].title}
                  referrerPolicy="no-referrer"
                  onError={(e) => { e.currentTarget.src = "/svc_stage_1.jpg"; }}
                  className="max-h-[60vh] max-w-full object-contain rounded-xl shadow-2xl"
                />

                {/* Navigation Arrows */}
                <button
                  onClick={() =>
                    setSelectedPhotoIndex((prev) =>
                      prev === null ? 0 : (prev - 1 + galleryPhotos.length) % galleryPhotos.length
                    )
                  }
                  className="absolute right-4 p-3 rounded-full bg-slate-900/80 hover:bg-amber-500 hover:text-slate-950 text-white border border-slate-700 transition-all shadow-lg"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                <button
                  onClick={() =>
                    setSelectedPhotoIndex((prev) =>
                      prev === null ? 0 : (prev + 1) % galleryPhotos.length
                    )
                  }
                  className="absolute left-4 p-3 rounded-full bg-slate-900/80 hover:bg-amber-500 hover:text-slate-950 text-white border border-slate-700 transition-all shadow-lg"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Footer Description */}
              <div className="p-4 sm:p-6 bg-slate-950 border-t border-slate-800 text-right space-y-4">
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {galleryPhotos[selectedPhotoIndex].desc}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-900 pt-3">
                  <span className="text-xs text-slate-500 font-mono">
                    صورة {selectedPhotoIndex + 1} من {galleryPhotos.length} - توثيق كادر بوابة الغد في ميسان
                  </span>

                  <button
                    onClick={() => {
                      setSelectedPhotoIndex(null);
                      onNavigateToOrder(`طلب تجهيز (${galleryPhotos[selectedPhotoIndex].title})`);
                    }}
                    className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-6 py-2.5 rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Zap className="w-4 h-4" />
                    <span>طلب معاينة وتجهيز موقعي بنفس المواصفات</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FULL-SCREEN LIGHTBOX MODAL FOR PRODUCT & HERO IMAGES */}
      <AnimatePresence>
        {previewModalImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md p-4 sm:p-8 flex items-center justify-center"
            onClick={() => setPreviewModalImage(null)}
          >
            <div
              className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950 text-white">
                <button
                  onClick={() => setPreviewModalImage(null)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="text-right">
                  <h4 className="text-sm sm:text-base font-black text-white">{previewModalImage.title}</h4>
                  <p className="text-xs text-amber-400 font-mono">تجهيز شركة بوابة الغد للمقاولات والطاقة</p>
                </div>
              </div>

              <div className="p-4 bg-slate-950 flex items-center justify-center min-h-[300px]">
                <img
                  src={previewModalImage.url}
                  alt={previewModalImage.title}
                  referrerPolicy="no-referrer"
                  onError={(e) => { e.currentTarget.src = "/svc_inverter.jpg"; }}
                  className="max-h-[65vh] max-w-full object-contain rounded-2xl shadow-2xl border border-slate-800"
                />
              </div>

              <div className="p-4 sm:p-5 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-xs text-slate-300 leading-relaxed text-right">
                  {previewModalImage.desc || "صورة توضيحية مكبرة للأجهزة والمعدات المتاحة لدى شركة بوابة الغد"}
                </p>
                <a
                  href={previewModalImage.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs text-center shrink-0"
                >
                  فتح الصورة بنشاط جديد
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Solar Load Calculator */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-800 text-white space-y-8 shadow-xl">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold px-3 py-1 rounded-full">
            حاسبة أحمال المنزل الذكية
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            احسب قدرة منظومة SVC المناسبة لمنزلك
          </h3>
          <p className="text-xs sm:text-sm text-slate-300">
            حدد الأجهزة الكهربائية التي ترغب بتشغيلها لمعرفة حجم الإنفيرتر وعدد بطاريات الليثيوم المطلوبة بالضبط.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Appliances Selection */}
          <div className="lg:col-span-7 space-y-4">
            <h4 className="font-bold text-sm text-amber-400 text-right border-b border-slate-800 pb-2">
              الأجهزة المراد تشغيلها على الإنفيرتر:
            </h4>

            <div className="space-y-3">
              {appliances.map((app) => {
                const Icon = app.icon;
                return (
                  <div
                    key={app.id}
                    className="flex items-center justify-between bg-slate-850 p-4 rounded-2xl border border-slate-800"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-slate-800 text-amber-400">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-sm text-white">{app.name}</p>
                        <p className="text-[10px] text-slate-400 font-mono">{app.watts} Watt للجهاز الواحد</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-700">
                      <button
                        onClick={() => updateCount(app.id, -1)}
                        className="w-7 h-7 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 flex items-center justify-center font-bold text-sm"
                      >
                        -
                      </button>
                      <span className="font-mono font-bold text-amber-400 min-w-[20px] text-center text-sm">
                        {app.count}
                      </span>
                      <button
                        onClick={() => updateCount(app.id, 1)}
                        className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 hover:bg-amber-400 flex items-center justify-center font-bold text-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Calculator Results Card */}
          <div className="lg:col-span-5 bg-gradient-to-b from-slate-850 to-slate-950 p-6 rounded-3xl border border-amber-500/30 space-y-6 text-right">
            <div className="space-y-1">
              <span className="text-[10px] text-amber-400 font-mono uppercase tracking-wider">SYSTEM SUMMARY</span>
              <h4 className="text-xl font-black text-white">النتيجة والمنظومة الموصى بها:</h4>
            </div>

            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">مجموع الحمل الكهربائي:</span>
                <span className="font-mono font-black text-amber-400 text-lg">{totalWatts} W</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (totalWatts / 5500) * 100)}%` }}
                ></div>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between bg-slate-900 p-3 rounded-xl border border-slate-800">
                <span className="font-bold text-white">{recommendedInverter}</span>
                <span className="text-slate-400">الإنفيرتر الهجين SVC:</span>
              </div>

              <div className="flex items-center justify-between bg-slate-900 p-3 rounded-xl border border-slate-800">
                <span className="font-bold text-emerald-400">{recommendedBattery}</span>
                <span className="text-slate-400">بطارية الليثيوم:</span>
              </div>

              <div className="flex items-center justify-between bg-slate-900 p-3 rounded-xl border border-slate-800">
                <span className="font-bold text-amber-300">{recommendedPanels}</span>
                <span className="text-slate-400">الألواح الشمسية:</span>
              </div>
            </div>

            <button
              onClick={() => onNavigateToOrder(`طلب منظومة طاقة شمسية SVC (${recommendedInverter})`)}
              className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-3.5 rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
            >
              <Zap className="w-4 h-4" />
              اطلب المنظومة فوراً (انتقال لطلبات التفعيل)
            </button>
          </div>
        </div>
      </div>

      {/* Solar Items Section */}
      <div className="space-y-8 pt-8 border-t border-slate-200">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="bg-amber-500/10 text-amber-700 border border-amber-500/20 text-xs font-bold px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
            <Sun className="w-4 h-4 text-amber-500" />
            كتالوج التجهيزات والمواصفات الفنية
          </span>
          <h3 className="text-2xl font-extrabold text-slate-950 sm:text-4xl">
            ايتمات وأجهزة الطاقة الشمسية المتاحة - شركة بوابة
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            تصفح أحدث إنفيرترات الطاقة الشمسية الهجينة وبطاريات الليثيوم LiFePO4 مع كافة التفاصيل الفنية والأسعار التنافسية.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solarProducts.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Image Container with Zoom On Click */}
                <div 
                  onClick={() => setPreviewModalImage({ url: p.image, title: p.name, desc: p.description })}
                  className="relative h-64 bg-slate-900 flex items-center justify-center p-4 cursor-pointer overflow-hidden"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = "/whatsapp_catalog_1.jpeg";
                    }}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-amber-500 text-slate-950 text-[11px] font-black px-3 py-1 rounded-full shadow-md z-10">
                    {p.brand}
                  </div>
                  {p.priceEstimate && (
                    <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-amber-400 text-xs font-black px-3 py-1 rounded-full border border-amber-500/30 shadow-md z-10">
                      {p.priceEstimate}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-white font-bold text-xs backdrop-blur-2xs">
                    <Maximize2 className="w-4 h-4 text-amber-400" />
                    <span>تكبير الصورة</span>
                  </div>
                </div>

                {/* Content & Details */}
                <div className="p-6 space-y-4 text-right">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                      {p.categoryAr}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                      تجهيز مباشر
                    </span>
                  </div>

                  <h4 className="font-extrabold text-slate-950 text-base leading-snug">{p.name}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{p.description}</p>

                  {/* Technical Specs Box */}
                  {p.specs && (
                    <div className="bg-slate-900 text-slate-200 p-3.5 rounded-2xl border border-slate-800 text-[11px] space-y-1 font-mono">
                      {p.specs.powerKW && <p className="text-amber-400 font-bold">⚡ القدرة: {p.specs.powerKW}</p>}
                      {p.specs.capacity && <p className="text-emerald-400 font-bold">🔋 السعة: {p.specs.capacity}</p>}
                      {p.specs.voltage && <p>🔌 الجهد: {p.specs.voltage}</p>}
                      {p.specs.batteryType && <p className="text-sky-300">⚙️ النوع: {p.specs.batteryType}</p>}
                      {p.specs.warranty && <p className="text-emerald-400 font-bold">🛡️ الضمان: {p.specs.warranty}</p>}
                    </div>
                  )}

                  {/* Features Bullet Points */}
                  {p.features && p.features.length > 0 && (
                    <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 space-y-1.5">
                      <p className="text-[11px] font-bold text-slate-900 mb-1 border-b border-slate-200 pb-1">
                        المواصفات الفنية بالتفصيل:
                      </p>
                      <ul className="space-y-1 text-[11px] text-slate-700">
                        {p.features.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Button: "اطلب الجهاز" */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => {
                    onAddToCart(p);
                    onNavigateToOrder(p.name);
                  }}
                  className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 py-3.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 shadow-md shadow-amber-500/20 cursor-pointer active:scale-98"
                >
                  <ShoppingCart className="w-4 h-4 font-bold" />
                  <span>اطلب الجهاز</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enlarged Image Preview Lightbox Modal */}
      <AnimatePresence>
        {previewModalImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setPreviewModalImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto space-y-4 text-white relative shadow-2xl"
            >
              <button
                onClick={() => setPreviewModalImage(null)}
                className="absolute top-4 left-4 bg-slate-800 hover:bg-slate-700 text-white p-2 rounded-full transition-colors cursor-pointer z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="bg-slate-950 p-4 rounded-2xl flex items-center justify-center min-h-[300px] border border-slate-800">
                <img
                  src={previewModalImage.url}
                  alt={previewModalImage.title}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = "/whatsapp_catalog_1.jpeg";
                  }}
                  className="max-h-[60vh] max-w-full object-contain rounded-xl"
                />
              </div>

              <div className="text-right space-y-2">
                <h3 className="text-xl font-bold text-amber-400">{previewModalImage.title}</h3>
                {previewModalImage.desc && <p className="text-xs text-slate-300 leading-relaxed">{previewModalImage.desc}</p>}
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => {
                    const found = solarProducts.find((p) => p.name === previewModalImage.title);
                    if (found) {
                      onAddToCart(found);
                    }
                    onNavigateToOrder(previewModalImage.title);
                    setPreviewModalImage(null);
                  }}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-6 py-3 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20"
                >
                  <ShoppingCart className="w-4 h-4 font-bold" />
                  <span>اطلب الجهاز الآن</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
