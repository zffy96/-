import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { packages } from "../data";
import { Package } from "../types";
import { Check, Info, ShieldCheck, Zap, Laptop, ArrowLeft, RefreshCw, Star, Users, Gamepad, HelpCircle } from "lucide-react";

interface PackagesProps {
  onSelectPackage: (pkg: Package) => void;
  setActiveTab: (tab: string) => void;
}

export default function Packages({ onSelectPackage, setActiveTab }: PackagesProps) {
  // Quiz states
  const [quizActive, setQuizActive] = useState(false);
  const [quizStep, setQuizStep] = useState(1);
  const [answers, setAnswers] = useState({
    devices: "",
    usage: "",
    houseType: ""
  });
  const [recommendedPackage, setRecommendedPackage] = useState<Package | null>(null);

  const startQuiz = () => {
    setQuizStep(1);
    setAnswers({ devices: "", usage: "", houseType: "" });
    setRecommendedPackage(null);
    setQuizActive(true);
  };

  const handleSelectAnswer = (key: "devices" | "usage" | "houseType", value: string) => {
    const nextAnswers = { ...answers, [key]: value };
    setAnswers(nextAnswers);

    if (quizStep < 3) {
      setQuizStep(quizStep + 1);
    } else {
      // Calculate recommendation
      calculateRecommendation(nextAnswers);
    }
  };

  const calculateRecommendation = (finalAnswers: typeof answers) => {
    let score = 0;

    // Devices score
    if (finalAnswers.devices === "1-3") score += 1;
    else if (finalAnswers.devices === "4-7") score += 2;
    else if (finalAnswers.devices === "8-12") score += 3;
    else if (finalAnswers.devices === "13+") score += 4;

    // Usage score
    if (finalAnswers.usage === "basic") score += 1;
    else if (finalAnswers.usage === "streaming") score += 2;
    else if (finalAnswers.usage === "gaming") score += 3;
    else if (finalAnswers.usage === "heavy") score += 4;

    // House type score
    if (finalAnswers.houseType === "apartment") score += 1;
    else if (finalAnswers.houseType === "house") score += 2;
    else if (finalAnswers.houseType === "villa") score += 3;
    else if (finalAnswers.houseType === "office") score += 4;

    // Map score to packages
    let recommended: Package;
    if (score <= 4) {
      recommended = packages.find((p) => p.id === "pkg-fiber-35") || packages[0];
    } else if (score <= 7) {
      recommended = packages.find((p) => p.id === "pkg-fiber-50") || packages[1];
    } else if (score <= 10) {
      recommended = packages.find((p) => p.id === "pkg-fiber-75") || packages[2];
    } else {
      recommended = packages.find((p) => p.id === "pkg-fiber-150") || packages[3];
    }

    setRecommendedPackage(recommended);
    setQuizStep(4); // Show result
  };

  const selectAndSubscribe = (pkg: Package) => {
    onSelectPackage(pkg);
    setActiveTab("orders");
  };

  return (
    <div className="space-y-10 text-right">
      {/* Intro section */}
      <div className="relative rounded-3xl bg-gradient-to-br from-slate-950 via-sky-950 to-blue-950 p-8 sm:p-12 border border-sky-500/30 shadow-2xl text-white space-y-6 overflow-hidden">
        <div className="absolute top-0 left-0 w-80 h-80 bg-sky-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black bg-sky-500/20 text-sky-300 border border-sky-400/40 backdrop-blur-md">
            <Zap className="w-4 h-4 text-sky-400" />
            <span>قسم إنترنت الوطني الضوئي المتكامل</span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            إنترنت الوطني — باقات الكيبل الضوئي <span className="text-sky-400 font-mono">(FTTH)</span>
          </h2>

          <p className="text-sm sm:text-base text-sky-100/90 font-medium leading-relaxed max-w-2xl mx-auto">
            بشراكتنا الرسمية مع شركة الوطني، نقدم أسرع باقات الكيبل الضوئي المستقر في العراق. تصفح الباقات أدناه أو استخدم مساعد السرعة الذكي لاختيار السرعة المثالية لمنزلك:
          </p>

          <div className="flex flex-wrap justify-center gap-2.5 pt-2">
            <span className="px-3.5 py-1.5 bg-slate-900/90 border border-sky-500/30 rounded-2xl text-xs font-bold text-sky-200 shadow-sm">
              📦 باقات الكيبل الضوئي
            </span>
            <button 
              onClick={() => setActiveTab("orders")}
              className="px-3.5 py-1.5 bg-sky-500/20 hover:bg-sky-500/30 border border-sky-400/50 rounded-2xl text-xs font-bold text-sky-300 shadow-sm transition-all cursor-pointer"
            >
              💳 شحن وتجديد الاشتراكات
            </button>
            <span className="px-3.5 py-1.5 bg-slate-900/90 border border-sky-500/30 rounded-2xl text-xs font-bold text-sky-200 shadow-sm">
              ⚡ سرعات حقيقية مضمونة 100%
            </span>
          </div>
        </div>
      </div>

      {/* Quiz block */}
      <div className="bg-gradient-to-r from-slate-950 via-sky-950 to-blue-950 text-white p-6 sm:p-10 rounded-3xl shadow-2xl max-w-4xl mx-auto border border-sky-500/40 relative overflow-hidden">
        {/* Decorative background lights */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-sky-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl"></div>

        {!quizActive ? (
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
            <div className="space-y-4 text-right md:max-w-xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-sky-500/20 text-sky-300 border border-sky-400/40">
                <HelpCircle className="w-3.5 h-3.5 text-sky-300" />
                لست متأكداً من السرعة التي تحتاجها؟
              </span>
              <h3 className="text-2xl font-black text-white tracking-tight">مساعد اختيار السرعة والباقة الذكي</h3>
              <p className="text-sky-100/80 text-xs sm:text-sm leading-relaxed">
                أجب عن 3 أسئلة بسيطة حول عدد الأجهزة وطبيعة استخدام عائلتك للإنترنت، وسيقوم محركنا بتقدير السرعة المناسبة بدقة لضمان استمتاعك بدون أي بطء.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startQuiz}
              className="bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-300 hover:to-blue-400 text-slate-950 text-sm font-black py-3.5 px-8 rounded-2xl shadow-lg shadow-sky-500/30 transition-all whitespace-nowrap cursor-pointer"
            >
              ابدأ الاختبار الذكي الآن
            </motion.button>
          </div>
        ) : (
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-6 border-b border-sky-800/60 pb-4">
              <h4 className="text-lg font-black text-sky-300 flex items-center gap-2">
                <Zap className="w-5 h-5 text-sky-400 animate-pulse" />
                مساعد السرعة الذكي
              </h4>
              {quizStep < 4 && (
                <span className="text-xs font-bold text-sky-300 font-mono">
                  السؤال {quizStep} من 3
                </span>
              )}
            </div>

            <AnimatePresence mode="wait">
              {quizStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h5 className="text-xl font-bold">كم عدد الأجهزة (هواتف، لابتوبات، شاشات ذكية) التي ستتصل بالإنترنت في نفس الوقت؟</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { value: "1-3", label: "جهازين إلى 3 أجهزة", desc: "استخدام فردي أو ثنائي خفيف" },
                      { value: "4-7", label: "4 إلى 7 أجهزة", desc: "منزل متوسط الحجم (الاستخدام المعتاد)" },
                      { value: "8-12", label: "8 إلى 12 جهازاً", desc: "منزل نشط، أجهزة ذكية، شاشات متعددة" },
                      { value: "13+", label: "أكثر من 12 جهازاً", desc: "بيوت كبيرة، ألعاب ثقيلة، أو أعمال تجارية" }
                    ].map((item) => (
                      <button
                        key={item.value}
                        onClick={() => handleSelectAnswer("devices", item.value)}
                        className="bg-slate-900/90 hover:bg-sky-950 hover:border-sky-400 p-4 rounded-2xl border border-sky-800/70 text-right transition-all group cursor-pointer"
                      >
                        <p className="font-bold text-white group-hover:text-sky-300 transition-colors">{item.label}</p>
                        <p className="text-xs text-sky-200/70 mt-1">{item.desc}</p>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {quizStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h5 className="text-xl font-bold">ما هو النشاط الرئيسي والأكثر استهلاكاً في شبكتكم؟</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { value: "basic", label: "تصفح ومواقع تواصل", desc: "فيسبوك، واتساب، وتصفح مواقع الأخبار والدراسة" },
                      { value: "streaming", label: "مشاهدة الفيديو والبث بدقة عالية", desc: "يوتيوب، نيتفليكس، قنوات تلفزيونية بث مباشر بدقة HD/4K" },
                      { value: "gaming", label: "ألعاب أونلاين وتحميل تحديثات", desc: "ببجي، فيفا، بلاي ستيشن مع زمن استجابة منخفض جداً" },
                      { value: "heavy", label: "تحميل ملفات ضخمة وبث مباشر متواصل", desc: "صناعة محتوى، أعمال مكتبية، كاميرات مراقبة وتنزيلات كبيرة" }
                    ].map((item) => (
                      <button
                        key={item.value}
                        onClick={() => handleSelectAnswer("usage", item.value)}
                        className="bg-slate-900/90 hover:bg-sky-950 hover:border-sky-400 p-4 rounded-2xl border border-sky-800/70 text-right transition-all group cursor-pointer"
                      >
                        <p className="font-bold text-white group-hover:text-sky-300 transition-colors">{item.label}</p>
                        <p className="text-xs text-sky-200/70 mt-1">{item.desc}</p>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {quizStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h5 className="text-xl font-bold">أين سيتم تفعيل خط الإنترنت الضوئي؟</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { value: "apartment", label: "شقة سكنية صغيرة أو ملحق", desc: "مساحة صغيرة، حوائط قليلة" },
                      { value: "house", label: "بيت عائلي مستقل (طابق واحد أو طابقين)", desc: "مساحة متوسطة إلى كبيرة" },
                      { value: "villa", label: "فيلا كبيرة / منزل متعدد الطوابق", desc: "يتطلب تغطية ممتازة ومقويات إشارة" },
                      { value: "office", label: "مقر شركة / مكتب عمل أو متجر", desc: "استخدام مهني متواصل وموثوقية عالية" }
                    ].map((item) => (
                      <button
                        key={item.value}
                        onClick={() => handleSelectAnswer("houseType", item.value)}
                        className="bg-slate-900/90 hover:bg-sky-950 hover:border-sky-400 p-4 rounded-2xl border border-sky-800/70 text-right transition-all group cursor-pointer"
                      >
                        <p className="font-bold text-white group-hover:text-sky-300 transition-colors">{item.label}</p>
                        <p className="text-xs text-sky-200/70 mt-1">{item.desc}</p>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {quizStep === 4 && recommendedPackage && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-6 space-y-6"
                >
                  <div className="inline-flex p-3 rounded-full bg-sky-500/20 border border-sky-400/40 text-sky-300 mb-2">
                    <Star className="w-8 h-8 animate-spin-slow" />
                  </div>
                  <div>
                    <h5 className="text-xs text-sky-300 uppercase tracking-widest font-extrabold">الباقة الموصى بها لك هي</h5>
                    <p className="text-3xl font-black text-white mt-1">{recommendedPackage.name}</p>
                    <p className="text-sky-400 font-mono text-2xl font-black mt-1">سرعة {recommendedPackage.speed}</p>
                  </div>

                  <div className="bg-slate-900/80 p-5 rounded-2xl max-w-md mx-auto text-right border border-sky-800/80 space-y-3">
                    <p className="text-xs text-sky-100/80 leading-relaxed font-normal">
                      بناءً على إجاباتك: اتصال أجهزة متعددة واستخدام نشط في {answers.houseType === "villa" ? "منزل كبير" : answers.houseType === "apartment" ? "شقة سكنية" : answers.houseType === "office" ? "مكتب أعمال" : "منزل عائلي"}.
                    </p>
                    <div className="flex justify-between items-center border-t border-sky-800/60 pt-3">
                      <span className="text-sm text-sky-200">السعر الشهري التقريبي:</span>
                      <span className="text-lg font-black text-sky-300 font-mono">
                        {recommendedPackage.price.toLocaleString()} د.ع
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-center gap-3">
                    <button
                      onClick={() => selectAndSubscribe(recommendedPackage)}
                      className="bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-300 hover:to-blue-400 text-slate-950 font-black px-8 py-3.5 rounded-2xl text-sm transition-all shadow-md shadow-sky-500/30 cursor-pointer"
                    >
                      إختر الباقة وتابع للتفعيل
                    </button>
                    <button
                      onClick={startQuiz}
                      className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-3.5 rounded-2xl text-sm transition-all border border-sky-700/60 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <RefreshCw className="w-4 h-4 text-sky-400" />
                      إعادة المحاولة
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Package Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {packages.map((pkg, idx) => {
          const isFeatured = pkg.id === "pkg-fiber-50";
          return (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`rounded-3xl border transition-all hover:shadow-2xl flex flex-col justify-between overflow-hidden relative ${
                isFeatured
                  ? "bg-gradient-to-b from-sky-950 via-slate-900 to-slate-950 border-2 border-sky-400 shadow-2xl shadow-sky-500/20 scale-102 z-10"
                  : "bg-slate-900/95 border-sky-900/60 text-white hover:border-sky-500/70 shadow-xl"
              }`}
            >
              {isFeatured && (
                <div className="bg-gradient-to-r from-sky-400 via-cyan-400 to-sky-500 text-slate-950 text-xs font-black text-center py-2 px-4 tracking-wider shadow-md">
                  ⭐ الباقة الموصى بها للعائلات
                </div>
              )}

              <div className="p-6 sm:p-8 space-y-6">
                {/* Header info */}
                <div className="space-y-2">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="text-xl font-black text-white">{pkg.name}</h3>
                    {pkg.badge && (
                      <span className="text-[10px] font-black px-2.5 py-1 rounded-full uppercase border bg-sky-500/20 text-sky-300 border-sky-400/40">
                        {pkg.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-mono text-sky-300/80">{pkg.nameEn}</p>
                </div>

                {/* Speed indicator & Price */}
                <div className="space-y-1">
                  <p className="text-3xl sm:text-4xl font-black text-sky-400 font-mono tracking-tight">{pkg.speed}</p>
                  <p className="text-xs text-sky-200/80 font-medium">سرعة تدفق فايبر ضوئي مستقر</p>
                  
                  <div className="pt-4 flex items-baseline gap-1.5">
                    <span className="text-3xl font-black text-white font-mono">
                      {pkg.price.toLocaleString()}
                    </span>
                    <span className="text-xs text-sky-300 font-bold">د.ع / شهرياً</span>
                  </div>
                </div>

                <p className="text-sky-100/80 text-xs leading-relaxed font-medium min-h-[50px]">
                  {pkg.description}
                </p>

                <hr className="border-sky-900/50" />

                {/* Features */}
                <ul className="space-y-3">
                  {pkg.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2.5 text-xs text-sky-100/90 font-medium">
                      <span className="bg-sky-500/20 text-sky-300 p-0.5 rounded-full mt-0.5 shrink-0 border border-sky-400/30">
                        <Check className="w-3.5 h-3.5 font-black" />
                      </span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action buttons */}
              <div className="p-6 sm:p-8 bg-slate-950/90 border-t border-sky-900/50 mt-auto">
                <button
                  onClick={() => selectAndSubscribe(pkg)}
                  className={`w-full py-3.5 px-4 rounded-2xl text-xs font-black transition-all shadow-md cursor-pointer ${
                    isFeatured
                      ? "bg-gradient-to-r from-sky-400 via-cyan-400 to-sky-500 hover:from-sky-300 hover:to-cyan-300 text-slate-950 shadow-sky-500/30"
                      : "bg-sky-600 hover:bg-sky-500 text-white"
                  }`}
                >
                  إختر الباقة واطلب التفعيل
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Trust & installation info banner */}
      <div className="bg-gradient-to-r from-slate-950 via-sky-950 to-slate-950 rounded-3xl p-6 border border-sky-500/30 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl text-white">
        <div className="flex items-center gap-4 text-right">
          <div className="bg-sky-500/20 text-sky-300 p-3.5 rounded-2xl shrink-0 border border-sky-400/30">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h4 className="font-extrabold text-white text-base">تركيب وتشغيل تحت إشراف فريق بوابة الغد</h4>
            <p className="text-xs text-sky-100/80 leading-relaxed font-medium">
              نوفر كادر فني مجهز لمد أسلاك الألياف الضوئية بدقة متناهية وفحص قوة الضوء لضمان عدم وجود تشويش أو فقدان للسرعة في منزلك.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-sky-300 border border-sky-500/40 bg-slate-900/80 rounded-xl px-4 py-2 shrink-0">
          <Info className="w-4 h-4 text-sky-400 shrink-0" />
          <span>مدة التركيب المعتادة: 24 - 48 ساعة</span>
        </div>
      </div>
    </div>
  );
}
