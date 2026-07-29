import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Building2,
  HardHat,
  Wrench,
  Truck,
  CheckCircle2,
  ArrowLeft,
  ShieldCheck,
  Award,
  Clock,
  Sparkles,
  FileText,
  MessageSquare,
  Maximize2
} from "lucide-react";

interface ContractingProps {
  onNavigateToOrder?: (serviceType?: string) => void;
}

export default function Contracting({ onNavigateToOrder }: ContractingProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [previewImage, setPreviewImage] = useState<{ url: string; title: string } | null>(null);

  const services = [
    {
      id: "civil",
      category: "civil",
      title: "أعمال البناء والإنشاءات المدنية",
      subtitle: "Civil Construction & Building Works",
      icon: <Building2 className="w-6 h-6 text-emerald-600" />,
      badge: "إنشاءات وتطوير",
      description: "تنفيذ كافة الهياكل الخرسانية والبناء المتكامل والمشاريع السكنية والتجارية والمباني المؤسسية بأعلى معايير الجودة والصلابة الهندسة.",
      features: [
        "تنفيذ الهياكل الخرسانية والمجمعات السكنية",
        "التشطيبات المعمارية الفاخرة والديكورات الداخلية",
        "تأهيل وتجديد المقرات والمباني الحكومية والخاصة",
        "إشراف هندسي متكامل ومخططات معتمدة"
      ],
      stats: "أكثر من 45 مشروع منجز"
    },
    {
      id: "infra",
      category: "infra",
      title: "البنية التحتية وتمديد شبكات الخدمات",
      subtitle: "Infrastructure & Cable Networks",
      icon: <HardHat className="w-6 h-6 text-cyan-600" />,
      badge: "بنية تحتية متطورة",
      description: "حفر وتمديد مسارات شبكات الألياف الضوئية (FTTH)، خطوط الكيبلات الرئيسية، والحفريات الميكانيكية والهيدروليكية ذات الدقة العالية.",
      features: [
        "حفر وتمديد مسارات الكيبل الضوئي والشبكات",
        "أعمال الحفريات الهيدروليكية والتسوية الترابية",
        "مد خطوط الخدمة الرئيسية بالأنابيب المعتمدة",
        "إعادة الرصف والأسفلت وفق المواصفات القياسية"
      ],
      stats: "تغطية مئات الكيلومترات"
    },
    {
      id: "mep",
      category: "mep",
      title: "الأعمال الكهربائية والميكانيكية (MEP)",
      subtitle: "Electrical & Mechanical Works",
      icon: <Wrench className="w-6 h-6 text-amber-600" />,
      badge: "حلول كهروميكانيكية",
      description: "تصميم وتنفيذ شبكات التغذية الكهربائية للدوائر والشركات والمنازل، تركيب المحولات الرئيسية، وأنظمة الحماية والسلامة.",
      features: [
        "تأسيس وتمديد الشبكات الكهربائية للقطع السكنية والشركات",
        "ربط منظومات الطاقة البديلة والشمسية المركزية",
        "تركيب لوحات التوزيع الرئيسية والحمايات الذكية",
        "صيانة واختبار شبكات التيار الجاري والمستمر"
      ],
      stats: "كادر مهندسين مجازين"
    },
    {
      id: "supply",
      category: "supply",
      title: "التجهيزات العامة والتوريدات التجارية",
      subtitle: "General Procurement & Supplies",
      icon: <Truck className="w-6 h-6 text-indigo-600" />,
      badge: "تجهيز وتوريد شامل",
      description: "تأمين وتوريد كافة المعدات والآليات ومستلزمات البناء وتجهيزات الشبكات السلكية واللاسلكية للشركات والمؤسسات.",
      features: [
        "تجهيز الأجهزة والمعدات التكنولوجية والشبكية",
        "توريد المواد الإنشائية ومستلزمات البنية التحتية",
        "عقود التجهيز السريع للمؤسسات والمشاريع الكبرى",
        "ضمان مناشئ عالمية معتمدة"
      ],
      stats: "عقود توريد موثوقة"
    }
  ];

  const contractingImages = [
    {
      url: "/project_doc_new3.jpeg",
      title: "معرض توثيق مشاريع ومقاولات شركة بوابة الغد",
      desc: "توثيق الأعمال الميدانية والتنفيذية للكوادر الهندسية والفنية"
    },
    {
      url: "/project_doc_new1.jpeg",
      title: "توثيق ميداني لمشاريع وتنفيذ شركة بوابة الغد",
      desc: "جانب من المتابعة الهندسية وأعمال التنفيذ الميدانية للكوادر المتخصصة"
    },
    {
      url: "/project_doc_new2.jpeg",
      title: "سجل أعمال وتجهيزات المقاولات العامة",
      desc: "توثيق المواصفات الفنية المعتمدة والتجهيزات الميدانية للشركة"
    },
    {
      url: "/company_brochure.jpg",
      title: "البروفايل التعريفي الرسمي لشركة بوابة الغد",
      desc: "التراخيص الرسمية، فروع بغداد وميسان، والتخصصات الهندسية"
    },
    {
      url: "/svc_stage_1.jpg",
      title: "أعمال تمديد وتثبيت القواعد والألواح",
      desc: "تركيب الهياكل الحديدية والمعدنية عالية الصلابة"
    },
    {
      url: "/svc_stage_2.jpg",
      title: "التوصيلات الكهروميكانيكية ولوحات التوزيع",
      desc: "تجهيز وربط الكابلات الرئيسية ولوحات الحماية"
    },
    {
      url: "/svc_stage_3.jpg",
      title: "تنفيذ وتجهيز بنوك الطاقة والبطاريات",
      desc: "حلول التغذية المستمرة للمباني والشركات والمنازل"
    },
    {
      url: "/svc_stage_4.jpg",
      title: "اختبار الجودة والسلامة قبل التسليم",
      desc: "فحص وتدقيق الأحمال بمعايير سلامة هندسية دقيقة"
    }
  ];

  const filteredServices = selectedCategory === "all"
    ? services
    : services.filter(s => s.category === selectedCategory);

  const handleOrderRedirect = (serviceTitle: string) => {
    if (onNavigateToOrder) {
      onNavigateToOrder(`طلب مقاولات عامة: ${serviceTitle}`);
    } else {
      window.location.href = `https://wa.me/9647721617032?text=${encodeURIComponent(
        `السلام عليكم، أود تقديم طلب استشارة/مشروع مقاولات عامة بخصوص (${serviceTitle}) عبر شركة بوابة الغد.`
      )}`;
    }
  };

  return (
    <div className="space-y-10 text-right font-sans pb-8">
      {/* Hero Header Section */}
      <div className="relative rounded-3xl bg-slate-950 text-white p-6 sm:p-10 md:p-12 border border-slate-800 shadow-xl overflow-hidden">
        <div className="absolute top-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            <Building2 className="w-4 h-4 text-emerald-400" />
            <span>شركة بوابة الغد للتجارة والمقاولات العامة محدودة المسؤولية</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white">
            قسم المقاولات العامة والإنشاءات والتجهيزات
          </h1>

          <p className="text-slate-200 text-xs sm:text-base leading-relaxed font-normal">
            نحن في <strong className="text-emerald-300 font-extrabold">شركة بوابة الغد</strong> نقدم حلولاً هندسية متكاملة في مجالات البناء، البنية التحتية، حفر وتمديد شبكات الألياف الضوئية، الأعمال الكهروميكانيكية، والتجهيزات العامة. نعمل برؤية حديثة وبإشراف الإدارة العامة للشركة <strong className="text-emerald-400 font-extrabold">(المهندس أثير صابر)</strong>.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => handleOrderRedirect("مشروع مقاولات عامة واستشارة")}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-6 py-3.5 rounded-2xl text-xs sm:text-sm transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-slate-950" />
              <span>تقديم طلب مشروع / استشارة مقاولات</span>
              <ArrowLeft className="w-4 h-4" />
            </button>

            <a
              href={`https://wa.me/9647721617032?text=${encodeURIComponent('السلام عليكم، أود الاستفسار عن خدمات المقاولات العامة بشركة بوابة الغد')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 px-5 py-3.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
              <span>التواصل المباشر عبر الواتساب</span>
            </a>
          </div>
        </div>
      </div>

      {/* Quick Statistics Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs text-center space-y-1">
          <ShieldCheck className="w-6 h-6 text-emerald-600 mx-auto" />
          <p className="text-xl font-black text-slate-900">100%</p>
          <p className="text-xs font-bold text-slate-600">التزام بالمواصفات والضمان</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs text-center space-y-1">
          <HardHat className="w-6 h-6 text-cyan-600 mx-auto" />
          <p className="text-xl font-black text-slate-900">كادر متخصص</p>
          <p className="text-xs font-bold text-slate-600">مهندسون وفنيون مجازون</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs text-center space-y-1">
          <Clock className="w-6 h-6 text-amber-600 mx-auto" />
          <p className="text-xl font-black text-slate-900">دقة المواعيد</p>
          <p className="text-xs font-bold text-slate-600">تسليم المشاريع في وقتها</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs text-center space-y-1">
          <Award className="w-6 h-6 text-indigo-600 mx-auto" />
          <p className="text-xl font-black text-slate-900">خبرة واسعة</p>
          <p className="text-xs font-bold text-slate-600">سجل حافل بالمشاريع الناجحة</p>
        </div>
      </div>

      {/* Services Filter and Cards */}
      <div className="space-y-6 w-full max-w-full min-w-0">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full min-w-0">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-black text-slate-950">تخصصات وأنواع مجالات المقاولات</h2>
            <p className="text-xs sm:text-sm text-slate-700 font-medium">
              اختر التخصص المطلوب للاطلاع على التفاصيل وتقديم طلب مباشر.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="w-full sm:w-auto max-w-full overflow-x-auto min-w-0 pb-2 sm:pb-0 flex items-center gap-2 no-scrollbar scroll-smooth">
            {[
              { id: "all", label: "كافة التخصصات" },
              { id: "civil", label: "البناء والإنشاءات" },
              { id: "infra", label: "البنية التحتية" },
              { id: "mep", label: "الكهروميكانيك" },
              { id: "supply", label: "التوريدات والتجهيز" }
            ].map((tab) => {
              const active = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap border cursor-pointer ${
                    active
                      ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                      : "bg-white text-slate-800 border-slate-300 hover:bg-slate-100"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid of Service Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredServices.map((service) => (
            <motion.div
              key={service.id}
              layout
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs hover:shadow-md transition-all space-y-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start gap-4">
                  <div className="p-3 bg-slate-100 border border-slate-200 rounded-2xl">
                    {service.icon}
                  </div>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-full text-[11px] font-extrabold">
                    {service.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-black text-slate-950">{service.title}</h3>
                  <p className="text-xs text-emerald-700 font-bold tracking-wide mt-0.5">{service.subtitle}</p>
                </div>

                <p className="text-xs text-slate-800 leading-relaxed font-medium">
                  {service.description}
                </p>

                <div className="space-y-2 pt-3 border-t border-slate-200">
                  <p className="text-xs font-extrabold text-slate-950">مميزات ونطاق العمل:</p>
                  <ul className="space-y-2">
                    {service.features.map((feat, i) => (
                      <li key={i} className="text-xs text-slate-800 flex items-start gap-2 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-3">
                <span className="text-xs font-extrabold text-slate-800 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-xl">
                  {service.stats}
                </span>

                <button
                  onClick={() => handleOrderRedirect(service.title)}
                  className="bg-slate-950 hover:bg-slate-800 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <span>طلب تنفيذ وتفعيل الخدمة</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Real Project Photos Section */}
      <div className="space-y-4 pt-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-200 pb-3">
          <div>
            <h3 className="text-xl font-black text-slate-950">معرض صور مشاريع وتوثيق شركة بوابة الغد</h3>
            <p className="text-xs text-slate-700 font-medium">لقطات ميدانية من بروفايل الشركة وأعمال التنفيذ والتركيب</p>
          </div>
          <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-extrabold rounded-full border border-emerald-300">
            توثيق حقيقي 📸
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {contractingImages.map((img, idx) => (
            <div
              key={idx}
              onClick={() => setPreviewImage({ url: img.url, title: img.title })}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-md transition-all group cursor-pointer"
            >
              <div className="relative aspect-16/10 bg-slate-900 overflow-hidden">
                <img
                  src={img.url}
                  alt={img.title}
                  referrerPolicy="no-referrer"
                  onError={(e) => { e.currentTarget.src = "/project_doc_new1.jpeg"; }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white gap-1.5 text-xs font-bold backdrop-blur-2xs">
                  <Maximize2 className="w-4 h-4 text-emerald-400" />
                  <span>عرض الصورة</span>
                </div>
              </div>
              <div className="p-3.5 space-y-1 text-right">
                <h4 className="text-xs font-black text-slate-950">{img.title}</h4>
                <p className="text-[11px] text-slate-600 font-medium">{img.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Direct Contracting Order CTA Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 rounded-3xl p-6 sm:p-8 text-white space-y-4 shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-2xl font-black text-white">هل لديك مشروع أو طلب مقاولات وتجهيزات؟</h3>
            <p className="text-xs sm:text-sm text-emerald-50 font-medium leading-relaxed">
              يمكنك إرسال تفاصيل المشروع، جدول الكميات، أو طلب المعاينة الميدانية مباشرة إلى الفريق الهندسي لشركة بوابة الغد.
            </p>
          </div>

          <button
            onClick={() => handleOrderRedirect("مشروع مقاولات جديد - جدول الكميات والمعاينة")}
            className="bg-slate-950 hover:bg-slate-900 text-white font-black px-6 py-3.5 rounded-2xl text-xs sm:text-sm transition-all shadow-lg flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <span>ارسل تفاصيل المشروع الآن</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Lightbox Image Preview Modal */}
      {previewImage && (
        <div
          onClick={() => setPreviewImage(null)}
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md p-4 flex items-center justify-center cursor-zoom-out"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-4 max-w-4xl w-full text-white space-y-4"
          >
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h4 className="text-sm font-bold text-white">{previewImage.title}</h4>
              <button
                onClick={() => setPreviewImage(null)}
                className="px-3 py-1 bg-slate-800 rounded-xl text-xs text-slate-300 hover:text-white"
              >
                إغلاق ✕
              </button>
            </div>
            <div className="flex justify-center bg-slate-950 rounded-2xl p-2 max-h-[70vh] overflow-auto">
              <img
                src={previewImage.url}
                alt={previewImage.title}
                referrerPolicy="no-referrer"
                onError={(e) => { e.currentTarget.src = "/project_doc_new1.jpeg"; }}
                className="max-h-[65vh] object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
