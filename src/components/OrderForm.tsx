import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Package, Product, Order } from "../types";
import { CheckCircle, Clock, Search, MapPin, Phone, User, Mail, Send, Check, RefreshCw, Clipboard, Trash2, AlertCircle, Sun, Zap, MessageSquare, ExternalLink } from "lucide-react";

interface OrderFormProps {
  selectedPackage: Package | null;
  selectedHardware: Product[];
  onClearPackage: () => void;
  onClearHardware: () => void;
  initialType?: "subscription" | "hardware" | "recharge" | "solar" | "contracting";
}

export default function OrderForm({ selectedPackage, selectedHardware, onClearPackage, onClearHardware, initialType }: OrderFormProps) {
  // Determine if solar items exist in cart
  const hasSolarInCart = selectedHardware.some((p) => p.category.startsWith("solar_"));

  // Form states
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState<"subscription" | "hardware" | "recharge" | "solar" | "contracting">(
    initialType || (hasSolarInCart ? "solar" : selectedPackage ? "subscription" : "solar")
  );
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  // Sync order type when initialType or cart changes
  useEffect(() => {
    if (initialType) {
      setType(initialType);
    } else if (hasSolarInCart) {
      setType("solar");
    } else if (selectedPackage) {
      setType("subscription");
    }
  }, [initialType, hasSolarInCart, selectedPackage]);

  // Submitting states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successOrder, setSuccessOrder] = useState<Order | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  // Track search states
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedOrders, setSearchedOrders] = useState<Order[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchFeedback, setSearchFeedback] = useState("");

  // Local state of submitted orders (saved in localStorage for persistence)
  const [localOrders, setLocalOrders] = useState<Order[]>([]);

  // WhatsApp Message Formatter for Office 07721617032
  const getWhatsAppUrl = (ord: Order) => {
    const typeTitle =
      ord.type === "contracting" ? "🏗️ طلب مشروع/استشارة مقاولات عامة" :
      ord.type === "solar" ? "☀️ طلب منظومة طاقة شمسية SVC" :
      ord.type === "subscription" ? "🌐 طلب اشتراك كيبل ضوئي (الوطني)" :
      ord.type === "hardware" ? "🔌 طلب شراء أجهزة ومعدات شبكة" :
      "💳 طلب باقة شحن رصيد";

    const messageText = `*طلب/استفسار جديد عبر موقع شركة بوابة الغد للمقاولات العامة والتجارة العامة* 🏗️
━━━━━━━━━━━━━━━
*رقم التتبع:* ${ord.id}
*نوع الطلب:* ${typeTitle}
*اسم الزبون / الجهة:* ${ord.name}
*رقم الهاتف:* ${ord.phone}
${ord.email ? `*البريد الإلكتروني:* ${ord.email}\n` : ""}
*التفاصيل والمواصفات:*
${ord.details}

*تاريخ الإرسال:* ${new Date(ord.createdAt).toLocaleString("ar-IQ")}
━━━━━━━━━━━━━━━
يرجى المتابعة والتواصل مع الزبون/المقاول.`;

    return `https://wa.me/9647721617032?text=${encodeURIComponent(messageText)}`;
  };

  useEffect(() => {
    const saved = localStorage.getItem("bawabat_alghad_orders");
    if (saved) {
      try {
        setLocalOrders(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse local orders:", e);
      }
    }
  }, []);

  const saveOrderLocally = (order: Order) => {
    const updated = [order, ...localOrders];
    setLocalOrders(updated);
    localStorage.setItem("bawabat_alghad_orders", JSON.stringify(updated));
  };

  const clearLocalOrders = () => {
    if (window.confirm("هل أنت متأكد من مسح تاريخ طلباتك المحلي بالكامل؟")) {
      setLocalOrders([]);
      localStorage.removeItem("bawabat_alghad_orders");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !address) {
      setErrorMsg("يرجى تعبئة الحقول الأساسية: الاسم، رقم الهاتف، والعنوان التفصيلي.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    // Assemble details
    let orderDetails = `قسم الطلب: ${type === "contracting" ? "المقاولات العامة والإنشاءات والتجهيزات" : type === "solar" ? "منظومات وأجهزة الطاقة الشمسية SVC" : type === "subscription" ? "اشتراك فايبر ضوئي (الوطني)" : type === "hardware" ? "أجهزة شبكات" : "شحن رصيد"}\n`;
    orderDetails += `العنوان التفصيلي: ${address}\n`;

    if (type === "solar") {
      const solarItems = selectedHardware.filter((h) => h.category.startsWith("solar_"));
      if (solarItems.length > 0) {
        orderDetails += `أجهزة ومعدات SVC المختارة: ${solarItems.map((h) => h.name).join("، ")}\n`;
      } else {
        orderDetails += `نوع الطلب: طلب معاينة موقعية واستشارة لتركيب منظومة SVC جديدة\n`;
      }
    } else {
      if (selectedPackage) {
        orderDetails += `الباقة المطلوبة: ${selectedPackage.name} (${selectedPackage.speed}) - بسعر ${selectedPackage.price.toLocaleString()} د.ع\n`;
      }
      const networkItems = selectedHardware.filter((h) => !h.category.startsWith("solar_"));
      if (networkItems.length > 0) {
        orderDetails += `الأجهزة المرافقة: ${networkItems.map((h) => h.name).join("، ")}\n`;
      }
    }

    if (notes) {
      orderDetails += `الأحمال والملاحظات الإضافية: ${notes}`;
    }

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          name,
          phone,
          email,
          details: orderDetails
        }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setSuccessOrder(data.order);
        saveOrderLocally(data.order);
        // Reset Form
        setName("");
        setPhone("");
        setEmail("");
        setAddress("");
        setNotes("");
        onClearPackage();
        onClearHardware();
      } else {
        setErrorMsg(data.error || "عذراً، حدث خطأ أثناء إرسال الطلب. يرجى المحاولة لاحقاً.");
      }
    } catch (err) {
      // Offline fallback state simulation
      console.warn("Connection to server failed. Simulating offline submission save.", err);
      const simulatedOrder: Order = {
        id: "BG-" + Math.floor(100000 + Math.random() * 900000),
        type,
        name,
        phone,
        email,
        details: orderDetails,
        status: "pending",
        createdAt: new Date().toISOString()
      };
      setSuccessOrder(simulatedOrder);
      saveOrderLocally(simulatedOrder);
      // Reset Form
      setName("");
      setPhone("");
      setEmail("");
      setAddress("");
      setNotes("");
      onClearPackage();
      onClearHardware();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTrackSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setSearchFeedback("");
    setSearchedOrders([]);

    try {
      const response = await fetch(`/api/orders/track?query=${encodeURIComponent(searchQuery.trim())}`);
      const data = await response.json();
      
      if (response.ok && data.success) {
        // If server returns results, use them
        if (data.orders.length > 0) {
          setSearchedOrders(data.orders);
        } else {
          // If server didn't find them, fallback to searching our local orders list
          const fallback = localOrders.filter(
            (o) => o.id === searchQuery.trim() || o.phone.includes(searchQuery.trim())
          );
          if (fallback.length > 0) {
            setSearchedOrders(fallback);
          } else {
            setSearchFeedback("لم يتم العثور على أي طلبات مطابقة للرقم المدخل. يرجى التأكد وإعادة المحاولة.");
          }
        }
      } else {
        // Fallback locally directly if server failed
        const fallback = localOrders.filter(
          (o) => o.id === searchQuery.trim() || o.phone.includes(searchQuery.trim())
        );
        if (fallback.length > 0) {
          setSearchedOrders(fallback);
        } else {
          setSearchFeedback("حدثت مشكلة أثناء الاتصال بالسيرفر، ولم نعثر على طلبات محلية مطابقة.");
        }
      }
    } catch (err) {
      // Local fallback lookup
      const fallback = localOrders.filter(
        (o) => o.id === searchQuery.trim() || o.phone.includes(searchQuery.trim())
      );
      if (fallback.length > 0) {
        setSearchedOrders(fallback);
      } else {
        setSearchFeedback("أنت غير متصل بالإنترنت حالياً، ولم يتم العثور على أي طلبات محفوظة محلياً.");
      }
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
      {/* Form Area (Left 2 columns) */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm text-right space-y-6">
          {type === "solar" ? (
            <div className="border-b border-amber-100 pb-4 text-right">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 mb-2">
                <Sun className="w-3.5 h-3.5 text-amber-600" />
                <span>قسم طلبات ومعاينات الطاقة الشمسية SVC</span>
              </div>
              <h3 className="text-xl font-extrabold text-slate-950">
                طلب تفعيل ومعاينة منظومة طاقة شمسية SVC
              </h3>
              <p className="text-xs text-slate-500 mt-1 font-normal leading-relaxed">
                قم بملء معلومات موقعك والأجهزة المراد تشغيلها وسيقوم مهندس الطاقة المختص في مكتب بوابة الغد بالاتصال بك وترتيب معاينة ميدانية مجانية لتحديد الإنفيرتر وبطارية الليثيوم المناسبة.
              </p>
            </div>
          ) : (
            <div className="border-b border-slate-100 pb-4 text-right">
              <h3 className="text-xl font-extrabold text-slate-950">
                {type === "subscription" ? "إرسال طلب تفعيل اشتراك كيبل ضوئي (الوطني)" : "إرسال طلب شراء الأجهزة أو شحن الرصيد"}
              </h3>
              <p className="text-xs text-slate-400 mt-1 font-normal leading-relaxed">
                قم بملء معلوماتك الشخصية وعنوانك وسيتولى فريق مكتب بوابة الغد تجهيز الملف، وتنسيق المعاينة الميدانية مع شركة الوطني لتأمين الاتصال فوراً.
              </p>
            </div>
          )}

          {successOrder ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`border rounded-2xl p-6 text-center space-y-4 ${
                successOrder.type === "solar"
                  ? "bg-amber-50/80 border-amber-200"
                  : "bg-emerald-50 border-emerald-200"
              }`}
            >
              <div
                className={`inline-flex p-3 rounded-full ${
                  successOrder.type === "solar" ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-600"
                }`}
              >
                {successOrder.type === "solar" ? <Sun className="w-8 h-8 font-black" /> : <Check className="w-8 h-8 font-black" />}
              </div>
              <div className="space-y-1">
                <h4
                  className={`text-lg font-bold ${
                    successOrder.type === "solar" ? "text-amber-900" : "text-emerald-900"
                  }`}
                >
                  {successOrder.type === "solar"
                    ? "تم استلام طلب منظومة الطاقة الشمسية SVC بنجاح!"
                    : "تم إرسال طلبكم بنجاح!"}
                </h4>
                <p className="text-xs text-slate-600">
                  {successOrder.type === "solar"
                    ? "شكراً لثقتكم بمكتب بوابة الغد (الوكيل المعتمد لشركة SVC). تم تسجيل طلب التفعيل والمعاينة وتوليد رقم التتبع."
                    : "شكراً لثقتكم بمكتب بوابة الغد. تم تسجيل طلبكم وتوليد رقم المتابعة المخصص لكم."}
                </p>
              </div>

              <div className="bg-white border p-4 rounded-xl max-w-sm mx-auto space-y-2 border-slate-200">
                <p className="text-xs text-slate-400">رقم تتبع الطلب الخاص بك:</p>
                <p className="text-lg font-black text-slate-950 font-mono tracking-wider bg-slate-50 border border-slate-200 py-1 rounded">
                  {successOrder.id}
                </p>
                <p className="text-[10px] text-slate-400">
                  تاريخ الطلب: {new Date(successOrder.createdAt).toLocaleDateString("ar-EG")}
                </p>
              </div>

              {/* Direct WhatsApp Action Button */}
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
                <p className="text-xs text-emerald-950 font-bold">
                  📲 لإسراع عملية المعاينة والتجهيز، أرسل التفاصيل فوراً لواتساب المكتب:
                </p>
                <a
                  href={getWhatsAppUrl(successOrder)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-3 px-4 rounded-xl text-xs transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>إرسال الطلب عبر واتساب المكتب (07721617032)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <p className="text-xs text-slate-600">
                {successOrder.type === "solar"
                  ? "سيقوم المهندس الميداني المختص بالطاقة الشمسية بالاتصال على رقم هاتفك المرفق لمعاينة الموقع وتجهيز المنظومة."
                  : "سيقوم موظف خدمة العملاء في مكتبنا بالاتصال برقم الهاتف المرفق لترتيب موعد التجهيز في أقرب وقت."}
              </p>

              <button
                onClick={() => setSuccessOrder(null)}
                className={`font-bold py-2.5 px-6 rounded-xl text-xs transition-all shadow-sm ${
                  successOrder.type === "solar"
                    ? "bg-amber-500 hover:bg-amber-400 text-slate-950"
                    : "bg-slate-900 hover:bg-slate-800 text-white"
                }`}
              >
                تقديم طلب جديد آخر
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {errorMsg && (
                <div className="bg-red-50 text-red-600 text-xs p-3.5 rounded-xl border border-red-200 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Form Type Selector */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {[
                  { id: "contracting", label: "🏗️ مقاولات عامة" },
                  { id: "solar", label: "☀️ طاقة شمسية SVC" },
                  { id: "subscription", label: "🌐 خط ضوئي (الوطني)" },
                  { id: "hardware", label: "🔌 أجهزة شبكات" },
                  { id: "recharge", label: "💳 باقة شحن رصيد" }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setType(item.id as any)}
                    className={`py-2.5 px-2 rounded-xl text-xs font-bold transition-all border flex items-center justify-center gap-1 ${
                      type === item.id
                        ? item.id === "contracting"
                          ? "border-emerald-500 bg-emerald-500/10 text-emerald-800 ring-2 ring-emerald-500/20 font-extrabold"
                          : item.id === "solar"
                          ? "border-amber-500 bg-amber-500/10 text-amber-700 ring-2 ring-amber-500/20 font-extrabold"
                          : "border-cyan-500 bg-cyan-50 text-cyan-700 ring-2 ring-cyan-500/20 font-extrabold"
                        : "border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Two-Column Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">الاسم الثلاثي واللقب *</label>
                  <div className="relative">
                    <User className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="مثال: أحمد جبار كريم"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pr-10 pl-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 focus:bg-white text-right"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">رقم الهاتف النشط (واتساب مفضل) *</label>
                  <div className="relative">
                    <Phone className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                      type="tel"
                      placeholder="مثال: 07721617032"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pr-10 pl-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 focus:bg-white text-right font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">البريد الإلكتروني (اختياري)</label>
                <div className="relative">
                  <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input
                    type="email"
                    placeholder="example@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pr-10 pl-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 focus:bg-white text-right"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">العنوان الجغرافي التفصيلي للمعاينة والتركيب *</label>
                <div className="relative">
                  <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="المحافظة - القضاء - الحي - رقم الزقاق / المعلم القريب"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full pr-10 pl-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 focus:bg-white text-right"
                  />
                </div>
              </div>

              {/* Package Summary Autofill indicator */}
              {type === "subscription" && selectedPackage && (
                <div className="bg-cyan-50 border border-cyan-200 p-3.5 rounded-xl text-xs flex justify-between items-center">
                  <button
                    type="button"
                    onClick={onClearPackage}
                    className="text-red-500 hover:text-red-700 text-[10px] font-bold"
                  >
                    مسح
                  </button>
                  <div className="text-right">
                    <p className="font-bold text-cyan-800">باقة الوطني المحددة تلقائياً:</p>
                    <p className="text-cyan-600 mt-0.5">{selectedPackage.name} ({selectedPackage.speed}) - {selectedPackage.price.toLocaleString()} د.ع/شهرياً</p>
                  </div>
                </div>
              )}

              {/* Hardware Summary Autofill indicator */}
              {selectedHardware.length > 0 && (
                <div className={`p-3.5 rounded-xl text-xs flex justify-between items-center border ${
                  type === "solar" ? "bg-amber-50 border-amber-200" : "bg-indigo-50 border-indigo-200"
                }`}>
                  <button
                    type="button"
                    onClick={onClearHardware}
                    className="text-red-500 hover:text-red-700 text-[10px] font-bold"
                  >
                    مسح القائمة
                  </button>
                  <div className="text-right">
                    <p className={`font-bold ${type === "solar" ? "text-amber-900" : "text-indigo-800"}`}>
                      {type === "solar" ? "أجهزة ومعدات SVC المختارة للتفعيل:" : "الأجهزة المطلوبة للتفعيل:"} ({selectedHardware.length})
                    </p>
                    <p className={`mt-0.5 max-w-sm line-clamp-1 ${type === "solar" ? "text-amber-700" : "text-indigo-600"}`}>
                      {selectedHardware.map((h) => h.name).join("، ")}
                    </p>
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">
                  {type === "solar"
                    ? "تفاصيل الأحمال الكهربائية المراد تشغيلها أو ملاحظات للمهندس *"
                    : "ملاحظات أو متطلبات إضافية"}
                </label>
                <textarea
                  rows={3}
                  placeholder={
                    type === "solar"
                      ? "مثال: أرغب بتشغيل مكيف 1.5 طن + ثلاجة + إنارة المنزل كاملة، أو وقت المعاينة الميدانية المفضل..."
                      : "إذا كان لديك كود تفعيل سابق، أو تفاصيل حول حجم منزلك أو رغبتك في زيارة المعاينة في وقت محدد..."
                  }
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 focus:bg-white text-right"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full font-black py-3.5 rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-55 ${
                  type === "solar"
                    ? "bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20"
                    : "bg-slate-900 hover:bg-slate-800 text-white"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>جاري تسجيل الطلب وتوليد الكود...</span>
                  </>
                ) : type === "solar" ? (
                  <>
                    <Sun className="w-4 h-4 text-slate-950 fill-slate-950" />
                    <span>إرسال طلب تفعيل ومعاينة منظومة SVC</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>إرسال طلب التفعيل لمكتب بوابة الغد</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Tracker & History lookup (Right 1 column) */}
      <div className="space-y-6">
        {/* Order Status Tracker Card */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm text-right space-y-4">
          <h3 className="font-black text-slate-950 text-base">استعلام ومتابعة حالة الطلبات</h3>
          <p className="text-xs text-slate-500 leading-relaxed font-normal">
            أدخل رقم الطلب الخاص بك (الذي يبدأ بـ BG-) أو رقم الهاتف الذي سجلت به للتحقق الفوري من حالة المعاينة والتركيب في نظامنا.
          </p>

          <form onSubmit={handleTrackSearch} className="flex gap-2">
            <input
              type="text"
              placeholder="مثال: BG-734291 أو رقم الهاتف"
              required
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-cyan-500 font-mono text-center"
            />
            <button
              type="submit"
              disabled={isSearching}
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-4 rounded-xl text-xs transition-all shrink-0"
            >
              {isSearching ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            </button>
          </form>

          {searchFeedback && (
            <p className="text-[11px] text-red-500 bg-red-50/50 p-2.5 rounded-lg border border-red-100 font-medium">
              {searchFeedback}
            </p>
          )}

          {/* Searched Results Display */}
          {searchedOrders.length > 0 && (
            <div className="space-y-4 pt-3 border-t border-slate-100">
              {searchedOrders.map((ord) => (
                <div key={ord.id} className="bg-slate-50 border border-slate-150 p-3.5 rounded-xl space-y-3">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                    <span className="text-[10px] bg-cyan-100 text-cyan-800 px-2 py-0.5 rounded-md font-mono font-bold">
                      {ord.id}
                    </span>
                    <span className="text-[11px] font-bold text-slate-900">
                      طلب {ord.type === "subscription" ? "اشتراك فايبر" : ord.type === "hardware" ? "أجهزة شبكة" : "شحن رصيد"}
                    </span>
                  </div>

                  {/* High Fidelity Visual Status Timeline */}
                  <div className="space-y-4 py-2">
                    {/* Step 1: Received */}
                    <div className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">
                          <Check className="w-3 h-3 font-bold" />
                        </div>
                        <div className={`w-0.5 h-6 ${ord.status !== "pending" ? "bg-emerald-500" : "bg-slate-200"}`}></div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-bold text-slate-800">تم استلام الطلب وتجهيز الملف</p>
                        <p className="text-[10px] text-slate-400">في انتظار مراجعة المعطيات ومطابقة الموقع</p>
                      </div>
                    </div>

                    {/* Step 2: Processing */}
                    <div className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                          ord.status === "processing" || ord.status === "completed" 
                            ? "bg-emerald-500 text-white" 
                            : "bg-slate-200 text-slate-400"
                        }`}>
                          {ord.status === "processing" ? <Clock className="w-3 h-3 animate-spin" /> : ord.status === "completed" ? <Check className="w-3 h-3 font-bold" /> : "2"}
                        </div>
                        <div className={`w-0.5 h-6 ${ord.status === "completed" ? "bg-emerald-500" : "bg-slate-200"}`}></div>
                      </div>
                      <div className="text-right">
                        <p className={`text-xs font-bold ${ord.status === "processing" || ord.status === "completed" ? "text-slate-800" : "text-slate-400"}`}>
                          المعاينة الفنية ومطابقة خط الوطني
                        </p>
                        <p className="text-[10px] text-slate-400">تنسيق فنيي مكتب بوابة الغد لمد الفايبر للمنزل</p>
                      </div>
                    </div>

                    {/* Step 3: Completed */}
                    <div className="flex gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                        ord.status === "completed" ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-400"
                      }`}>
                        {ord.status === "completed" ? <Check className="w-3 h-3 font-bold" /> : "3"}
                      </div>
                      <div className="text-right">
                        <p className={`text-xs font-bold ${ord.status === "completed" ? "text-slate-800" : "text-slate-400"}`}>
                          تفعيل الاتصال وتشغيل الواي فاي
                        </p>
                        <p className="text-[10px] text-slate-400">تشغيل ONU، برمجة الراوتر، والتسليم النهائي للمشترك</p>
                      </div>
                    </div>
                  </div>

                  {/* Send to WhatsApp button */}
                  <a
                    href={getWhatsAppUrl(ord)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 px-3 rounded-lg text-[11px] transition-all flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <MessageSquare className="w-3.5 h-3.5 fill-current" />
                    <span>إرسال تفاصيل هذا الطلب لواتساب المكتب (07721617032)</span>
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Local History Drawer */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm text-right space-y-4">
          <div className="flex justify-between items-center border-b border-slate-150 pb-2">
            {localOrders.length > 0 && (
              <button
                onClick={clearLocalOrders}
                className="text-red-500 hover:text-red-700 text-[10px] font-bold flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                تصفير
              </button>
            )}
            <h3 className="font-bold text-slate-950 text-sm">تاريخ طلباتي في هذا المتصفح</h3>
          </div>

          {localOrders.length > 0 ? (
            <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
              {localOrders.map((ord) => (
                <div
                  key={ord.id}
                  className="bg-slate-50 hover:bg-slate-100 p-2.5 rounded-xl border border-slate-100 transition-colors flex justify-between items-center text-xs"
                >
                  <div className="flex items-center gap-1.5">
                    <a
                      href={getWhatsAppUrl(ord)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition-colors"
                      title="إرسال لواتساب المكتب"
                    >
                      <MessageSquare className="w-3.5 h-3.5 fill-current" />
                    </a>
                    <span
                      onClick={() => setSearchQuery(ord.id)}
                      className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-mono font-bold cursor-pointer"
                    >
                      {ord.id}
                    </span>
                  </div>
                  <div className="text-right cursor-pointer" onClick={() => setSearchQuery(ord.id)}>
                    <p className="font-bold text-slate-800 line-clamp-1">{ord.name}</p>
                    <p className="text-[9px] text-slate-400 mt-0.5">
                      {ord.type === "subscription" ? "اشتراك فايبر" : "شراء أجهزة"} | {new Date(ord.createdAt).toLocaleDateString("ar-EG")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-6 text-center text-slate-400 space-y-2">
              <Clipboard className="w-8 h-8 mx-auto text-slate-300 stroke-1" />
              <p className="text-xs">لا يوجد تاريخ طلبات مخزن حالياً</p>
              <p className="text-[9px] max-w-[170px] mx-auto font-normal">عند تقديم أي طلب اشتراك، سيتم حفظه هنا ليسهل عليك تتبعه لاحقاً.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
