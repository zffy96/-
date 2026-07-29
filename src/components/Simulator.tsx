import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Wifi, Home, Plus, Check, ShieldCheck, HelpCircle, RefreshCw, Layers, Signal, Zap } from "lucide-react";

type HouseSize = "apartment" | "house" | "villa";

export default function Simulator() {
  const [size, setSize] = useState<HouseSize>("house");
  const [hasBooster, setHasBooster] = useState(false);
  const [boosterRoom, setBoosterRoom] = useState<"bedroom" | "living" | "garden" | "secondFloor">("bedroom");

  // Cost calculations
  const baseOnuCost = 0; // Usually free or rental in activation package
  const routerCost = 55000;
  const boosterCost = 45000;
  const monthlyCost = size === "apartment" ? 30000 : size === "house" ? 45000 : 65000;
  const hardwareTotal = routerCost + (hasBooster ? boosterCost : 0);

  return (
    <div className="space-y-12">
      {/* Intro */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h2 className="text-3xl font-extrabold text-slate-950 sm:text-4xl tracking-tight">
          محاكي التغطية والتركيب المنزلي الذكي
        </h2>
        <p className="text-lg text-slate-600 font-normal leading-relaxed">
          خطط لشبكتك المنزلية قبل الاشتراك! حدد حجم منزلك واكتشف كيف يتم توزيع إشارة الواي فاي، وتعرف على الأجهزة الإضافية المطلوبة لتغطية كامل الزوايا.
        </p>
      </div>

      {/* Controller Controls */}
      <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Step 1: House Size */}
        <div className="space-y-3 text-right">
          <label className="text-sm font-bold text-slate-900 block flex items-center gap-1.5 justify-end">
            <Home className="w-4 h-4 text-cyan-500" />
            1. اختر حجم وتخطيط المنزل:
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: "apartment", label: "شقة سكنية", desc: "1-2 غرف" },
              { id: "house", label: "بيت طابق واحد", desc: "3-4 غرف" },
              { id: "villa", label: "فيلا / طابقين", desc: "مساحة واسعة" }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setSize(item.id as HouseSize);
                  if (item.id === "apartment") setHasBooster(false); // Apartment usually doesn't need booster
                }}
                className={`p-3 rounded-2xl border text-center transition-all ${
                  size === item.id
                    ? "border-cyan-500 bg-cyan-50/50 text-cyan-700 font-bold"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                <p className="text-xs">{item.label}</p>
                <p className="text-[10px] text-slate-400 mt-1 font-normal">{item.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Booster Toggle */}
        <div className="space-y-3 text-right">
          <label className="text-sm font-bold text-slate-900 block flex items-center gap-1.5 justify-end">
            <Signal className="w-4 h-4 text-cyan-500" />
            2. تقوية الإشارة (Mesh / Booster):
          </label>
          {size === "apartment" ? (
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-center text-xs text-slate-500">
              الشقق الصغيرة لا تحتاج عادةً إلى مقوي إشارة؛ الراوتر الرئيسي يغطيها بالكامل.
            </div>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => setHasBooster(false)}
                className={`flex-1 py-3 px-4 rounded-2xl border text-xs font-bold transition-all ${
                  !hasBooster
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                راوتر رئيسي فقط
              </button>
              <button
                onClick={() => setHasBooster(true)}
                className={`flex-1 py-3 px-4 rounded-2xl border text-xs font-bold transition-all ${
                  hasBooster
                    ? "border-cyan-500 bg-cyan-500 text-slate-950"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                إضافة مقوي إشارة ذكي
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Simulator Display Sandbox */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
        {/* The House Canvas (left/middle 2 columns) */}
        <div className="lg:col-span-2 bg-slate-950 text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-slate-800 shadow-xl min-h-[400px] relative overflow-hidden">
          {/* Glowing particle grid background */}
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#0891b2_1px,transparent_1px)] [background-size:16px_16px]"></div>

          <div className="flex justify-between items-center relative z-10">
            <h3 className="font-bold text-slate-200 text-sm flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-cyan-400" />
              مخطط توزيع الإشارة الحي
            </h3>
            <span className="text-[10px] bg-cyan-950 text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded font-mono">
              SIGNAL SIMULATION MODE
            </span>
          </div>

          {/* Interactive House Plan Layout representation in CSS */}
          <div className="my-8 relative z-10 w-full max-w-lg mx-auto">
            {size === "apartment" && (
              <div className="grid grid-cols-2 gap-3 aspect-video bg-slate-900/60 border-2 border-slate-700 rounded-2xl p-4">
                {/* Living Room with Router */}
                <div className="border border-slate-800/80 rounded-xl p-3 flex flex-col justify-between relative bg-cyan-500/5">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] text-slate-400 font-semibold">صالة المعيشة</span>
                    <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-1.5 rounded">إشارة 100%</span>
                  </div>
                  {/* Router graphic with glowing circles */}
                  <div className="self-center my-2 relative">
                    <div className="w-12 h-12 rounded-full bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center animate-pulse-slow">
                      <Wifi className="w-6 h-6 text-cyan-400" />
                    </div>
                    {/* Concentric waves */}
                    <div className="absolute inset-0 border border-cyan-400/20 rounded-full scale-125 animate-ping opacity-25"></div>
                  </div>
                  <span className="text-[9px] text-slate-500 font-mono text-center">جهاز ONU + راوتر رئيسي</span>
                </div>

                {/* Bedroom */}
                <div className="border border-slate-800/80 rounded-xl p-3 flex flex-col justify-between relative bg-cyan-500/5">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] text-slate-400 font-semibold">غرفة النوم</span>
                    <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-1.5 rounded">إشارة 85%</span>
                  </div>
                  <div className="self-center my-4">
                    <Wifi className="w-8 h-8 text-cyan-300 opacity-80" />
                  </div>
                  <span className="text-[9px] text-slate-500 font-normal text-center">تغطية تامة ومستقرة</span>
                </div>
              </div>
            )}

            {size === "house" && (
              <div className="grid grid-cols-3 gap-3 aspect-[16/10] bg-slate-900/60 border-2 border-slate-700 rounded-2xl p-4">
                {/* Entrance with ONU & Router */}
                <div className="border border-slate-800/80 rounded-xl p-3 flex flex-col justify-between bg-cyan-500/5 col-span-1">
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold block">المدخل الرئيسي</span>
                    <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-1 rounded inline-block mt-1">إشارة 100%</span>
                  </div>
                  <div className="self-center my-2 flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center">
                      <Wifi className="w-5 h-5 text-cyan-400" />
                    </div>
                    <span className="text-[8px] text-slate-400 font-mono mt-1">ONU + الراوتر</span>
                  </div>
                  <span className="text-[8px] text-slate-500 font-normal text-center">منبع الخدمة الضوئية</span>
                </div>

                {/* Living room (Middle) */}
                <div className={`border border-slate-800/80 rounded-xl p-3 flex flex-col justify-between transition-colors col-span-1 ${hasBooster ? "bg-cyan-500/5" : "bg-yellow-500/5"}`}>
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] text-slate-400 font-semibold">صالة الضيوف</span>
                    <span className={`text-[9px] px-1 rounded ${hasBooster ? "bg-emerald-500/20 text-emerald-400" : "bg-yellow-500/20 text-yellow-400"}`}>
                      {hasBooster ? "إشارة 90%" : "إشارة 60%"}
                    </span>
                  </div>
                  <div className="self-center my-3">
                    <Wifi className={`w-8 h-8 ${hasBooster ? "text-cyan-300" : "text-yellow-400"}`} />
                  </div>
                  <span className="text-[8px] text-slate-500 font-normal text-center">
                    {hasBooster ? "تغطية ممتدة وقوية" : "إشارة متوسطة المدى"}
                  </span>
                </div>

                {/* Bedroom (Far room) */}
                <div className={`border border-slate-800/80 rounded-xl p-3 flex flex-col justify-between transition-colors col-span-1 ${hasBooster ? "bg-cyan-500/10 border-cyan-500/20" : "bg-red-500/5 border-red-900/30"}`}>
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] text-slate-400 font-semibold">المطبخ وغرفة النوم</span>
                    <span className={`text-[9px] px-1 rounded ${hasBooster ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}>
                      {hasBooster ? "إشارة 95%" : "إشارة 25% (ضعيف)"}
                    </span>
                  </div>

                  <div className="self-center my-2 flex flex-col items-center relative">
                    {hasBooster ? (
                      <div className="flex flex-col items-center">
                        <div className="w-9 h-9 rounded-full bg-cyan-500/30 border border-cyan-400 flex items-center justify-center animate-pulse">
                          <Signal className="w-4 h-4 text-cyan-300" />
                        </div>
                        <span className="text-[8px] text-cyan-300 mt-1 font-bold">تم تركيب المقوي</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <Wifi className="w-7 h-7 text-red-500 animate-pulse" />
                        <span className="text-[8px] text-red-400 mt-1">تغطية ميتة / تقطيع</span>
                      </div>
                    )}
                  </div>

                  <span className="text-[8px] text-slate-500 font-normal text-center">
                    {hasBooster ? "تم تأمين الإشارة بالمقوي" : "ننصح بإضافة مقوي إشارة"}
                  </span>
                </div>
              </div>
            )}

            {size === "villa" && (
              <div className="grid grid-rows-2 gap-3 aspect-[16/10] bg-slate-900/60 border-2 border-slate-700 rounded-2xl p-4">
                {/* First Floor */}
                <div className="grid grid-cols-3 gap-2 border-b border-slate-800/80 pb-2">
                  <div className="border border-slate-800/60 rounded-xl p-2.5 flex flex-col justify-between bg-cyan-500/5">
                    <span className="text-[9px] text-slate-400">الطابق الأول - المدخل</span>
                    <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center mx-auto my-1">
                      <Wifi className="w-4 h-4 text-cyan-400" />
                    </div>
                    <span className="text-[8px] text-slate-500 text-center">الراوتر الرئيسي</span>
                  </div>

                  <div className="border border-slate-800/60 rounded-xl p-2.5 flex flex-col justify-between bg-cyan-500/5">
                    <span className="text-[9px] text-slate-400">الطابق الأول - صالة</span>
                    <Wifi className="w-5 h-5 text-cyan-300 mx-auto my-1" />
                    <span className="text-[8px] text-slate-500 text-center">مستقر</span>
                  </div>

                  <div className={`border border-slate-800/60 rounded-xl p-2.5 flex flex-col justify-between transition-colors ${hasBooster ? "bg-cyan-500/5" : "bg-red-500/5"}`}>
                    <span className="text-[9px] text-slate-400">الطابق الأول - الديوانية</span>
                    <Wifi className={`w-5 h-5 mx-auto my-1 ${hasBooster ? "text-cyan-300" : "text-red-400 animate-pulse"}`} />
                    <span className="text-[8px] text-slate-500 text-center">{hasBooster ? "تغطية ممتازة" : "إشارة ضعيفة"}</span>
                  </div>
                </div>

                {/* Second Floor */}
                <div className="grid grid-cols-3 gap-2 pt-1">
                  <div className={`border border-slate-800/60 rounded-xl p-2.5 flex flex-col justify-between transition-colors ${hasBooster ? "bg-cyan-500/10 border-cyan-500/20" : "bg-red-500/5"}`}>
                    <span className="text-[9px] text-slate-400">الطابق الثاني - غرف النوم</span>
                    {hasBooster ? (
                      <div className="w-7 h-7 rounded-full bg-cyan-500/30 border border-cyan-400 flex items-center justify-center mx-auto">
                        <Signal className="w-3.5 h-3.5 text-cyan-300" />
                      </div>
                    ) : (
                      <Wifi className="w-5 h-5 text-red-500 mx-auto my-1" />
                    )}
                    <span className="text-[8px] text-slate-500 text-center">{hasBooster ? "تم الربط بالمقوي" : "لا توجد إشارة!"}</span>
                  </div>

                  <div className={`border border-slate-800/60 rounded-xl p-2.5 flex flex-col justify-between transition-colors ${hasBooster ? "bg-cyan-500/5" : "bg-red-500/5"}`}>
                    <span className="text-[9px] text-slate-400">الطابق الثاني - صالة</span>
                    <Wifi className={`w-5 h-5 mx-auto my-1 ${hasBooster ? "text-cyan-300" : "text-red-500"}`} />
                    <span className="text-[8px] text-slate-500 text-center">{hasBooster ? "تغطية ممتدة" : "إشارة متقطعة"}</span>
                  </div>

                  <div className={`border border-slate-800/60 rounded-xl p-2.5 flex flex-col justify-between transition-colors ${hasBooster ? "bg-cyan-500/5" : "bg-red-500/5"}`}>
                    <span className="text-[9px] text-slate-400">الطابق الثاني - المكتب</span>
                    <Wifi className={`w-5 h-5 mx-auto my-1 ${hasBooster ? "text-cyan-300" : "text-red-500"}`} />
                    <span className="text-[8px] text-slate-500 text-center">{hasBooster ? "مستقر" : "ميتة"}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center bg-slate-900 border border-slate-800 p-4 rounded-2xl relative z-10 text-xs">
            <span className="text-slate-400">ملاحظة التركيب:</span>
            <span className="text-cyan-400 font-bold">
              {size === "apartment" && "الراوتر يغطي الشقة بالكامل دون الحاجة لأجهزة إضافية."}
              {size === "house" && (!hasBooster ? "قد تعاني الغرف الخلفية من بطء؛ يُوصى بإضافة مقوي إشارة واحد." : "تم تغطية كامل البيت بنجاح من مكتب بوابة الغد.")}
              {size === "villa" && (!hasBooster ? "الطابق الثاني سيفتقد الإشارة تماماً؛ يُوصى بشدة بتركيب مقوي إشارة ذكي." : "حلول مقوي الإشارة الذكي تغطي الطابقين بالكامل بسلاسة.")}
            </span>
          </div>
        </div>

        {/* Dynamic Quote & hardware card (right 1 column) */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between text-right">
          <div className="space-y-6">
            <h4 className="font-extrabold text-slate-950 border-b border-slate-100 pb-3 flex items-center gap-1.5 justify-end">
              <Zap className="w-5 h-5 text-cyan-500" />
              توصيات الأجهزة المقترحة
            </h4>

            {/* Checklist */}
            <div className="space-y-4">
              <div className="flex items-start gap-2.5">
                <div className="bg-emerald-50 text-emerald-600 p-1 rounded-full shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 font-bold" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">جهاز ONU فايبر ضوئي</p>
                  <p className="text-[10px] text-slate-400 font-mono">الكمية: 1 (مجاني مع التفعيل)</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="bg-emerald-50 text-emerald-600 p-1 rounded-full shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 font-bold" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">راوتر متطور ثنائي النطاق</p>
                  <p className="text-[10px] text-slate-400 font-mono">الكمية: 1 (AX1800 Wi-Fi 6) | 55,000 د.ع</p>
                </div>
              </div>

              {hasBooster && (
                <div className="flex items-start gap-2.5">
                  <div className="bg-emerald-50 text-emerald-600 p-1 rounded-full shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 font-bold" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">مقوي إشارة ذكي (Mesh)</p>
                    <p className="text-[10px] text-slate-400 font-mono">الكمية: 1 (تغطية 150م²) | 45,000 د.ع</p>
                  </div>
                </div>
              )}
            </div>

            <hr className="border-slate-100" />

            {/* Price Estimator */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">تكلفة الأجهزة والمعدات:</span>
                <span className="font-bold text-slate-800 font-mono">{hardwareTotal.toLocaleString()} د.ع</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">الاشتراك الشهري المقترح:</span>
                <span className="font-bold text-slate-800 font-mono">{monthlyCost.toLocaleString()} د.ع</span>
              </div>
              <div className="flex justify-between items-center text-xs pt-2 border-t border-dashed border-slate-200">
                <span className="font-bold text-slate-900">التأسيس الأولي التقريبي:</span>
                <span className="font-black text-cyan-600 text-base font-mono">{hardwareTotal.toLocaleString()} د.ع</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs mt-6 space-y-1">
            <p className="font-bold text-slate-800 flex items-center gap-1 justify-end">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              تأكيد جودة الخدمة
            </p>
            <p className="text-[10px] text-slate-500 font-normal leading-relaxed">
              جميع تركيباتنا مدعومة بضمان صيانة كامل لمدة سنة ومتابعة من الكادر الفني لمكتب بوابة الغد لضمان تغطية كاملة ومستقرة.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
