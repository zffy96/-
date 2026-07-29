import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { products } from "../data";
import { Product } from "../types";
import { Search, Filter, ShoppingCart, Info, Star, Plus, Check, Trash2, Tag, ArrowLeft, Send } from "lucide-react";

interface HardwareStoreProps {
  cart: Product[];
  onAddToCart: (product: Product) => void;
  onRemoveFromCart: (product: Product) => void;
  onCheckoutCart: () => void;
}

export default function HardwareStore({ cart, onAddToCart, onRemoveFromCart, onCheckoutCart }: HardwareStoreProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<"all" | "solar" | "onu" | "router" | "booster">("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Filter products
  const filteredProducts = products.filter((prod) => {
    const matchesSearch = prod.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          prod.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          prod.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = 
      selectedCategory === "all" || 
      (selectedCategory === "solar" && ["solar_inverter", "solar_battery", "solar_kit", "solar_panel"].includes(prod.category)) ||
      prod.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const getCategoryImage = (p: Product) => {
    if (p.image && p.image.startsWith("/")) {
      return (
        <div 
          className="w-full h-48 bg-slate-950 relative overflow-hidden flex items-center justify-center p-2 cursor-pointer group"
          onClick={() => setSelectedProduct(p)}
        >
          <img 
            src={p.image} 
            alt={p.name} 
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.src = p.category.includes("solar") ? "/svc_inverter.jpg" : "/huawei_eg8145v5.jpg";
            }}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" 
          />
          <div className="absolute top-3 right-3 bg-cyan-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded shadow z-10">
            {p.brand}
          </div>
          <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1 text-white font-bold text-xs backdrop-blur-2xs">
            <span>انقر لرؤية الصورة والتفاصيل</span>
          </div>
        </div>
      );
    }
    // Generate a beautiful, styled visual representation using CSS instead of broken remote images
    if (p.category === "onu") {
      return (
        <div className="w-full h-48 bg-gradient-to-tr from-slate-800 to-indigo-950 flex flex-col items-center justify-center relative overflow-hidden">
          {/* Circular lights */}
          <div className="absolute top-4 left-4 flex gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
          </div>
          {/* Device body */}
          <div className="w-32 h-10 bg-slate-900 border border-slate-700 rounded-lg shadow-2xl flex items-center justify-between px-3 relative">
            <div className="w-6 h-1.5 bg-cyan-500 rounded"></div>
            <div className="flex gap-1.5">
              <span className="w-1 h-1 rounded-full bg-slate-500"></span>
              <span className="w-1 h-1 rounded-full bg-slate-500"></span>
              <span className="w-1 h-1 rounded-full bg-slate-500"></span>
            </div>
          </div>
          {/* Fiber line */}
          <div className="absolute bottom-0 w-0.5 h-16 bg-gradient-to-t from-cyan-400 to-transparent"></div>
          <span className="text-[10px] text-cyan-400 font-mono mt-4">XPON ONT MODEM</span>
        </div>
      );
    } else if (p.category === "router") {
      return (
        <div className="w-full h-48 bg-gradient-to-tr from-slate-900 to-slate-800 flex flex-col items-center justify-center relative overflow-hidden">
          {/* Antennas */}
          <div className="flex gap-4 justify-center -mb-2">
            <div className="w-1 h-12 bg-slate-700 rounded-t transform -rotate-12 origin-bottom"></div>
            <div className="w-1 h-14 bg-slate-600 rounded-t"></div>
            <div className="w-1 h-14 bg-slate-600 rounded-t"></div>
            <div className="w-1 h-12 bg-slate-700 rounded-t transform rotate-12 origin-bottom"></div>
          </div>
          {/* Router Body */}
          <div className="w-36 h-8 bg-slate-950 border border-slate-800 rounded-lg shadow-2xl flex items-center justify-center px-4 relative z-10">
            <div className="flex gap-1.5 justify-center">
              <span className="w-1 h-1 rounded-full bg-cyan-400 animate-ping"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
            </div>
          </div>
          <div className="absolute top-4 right-4 flex flex-col items-end gap-1">
            <span className="bg-cyan-500/15 text-cyan-400 text-[9px] font-black font-mono px-1.5 py-0.5 rounded border border-cyan-500/25">AX1800</span>
            <span className="bg-indigo-500/15 text-indigo-400 text-[9px] font-black font-mono px-1.5 py-0.5 rounded border border-indigo-500/25">WI-FI 6</span>
          </div>
        </div>
      );
    } else {
      return (
        <div className="w-full h-48 bg-gradient-to-tr from-slate-800 to-cyan-950 flex flex-col items-center justify-center relative overflow-hidden">
          {/* Mesh node */}
          <div className="w-16 h-20 bg-slate-900 border border-slate-700/60 rounded-xl shadow-2xl flex flex-col justify-between p-3 relative">
            <div className="w-full h-1 bg-cyan-500 rounded"></div>
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse self-center"></div>
            <div className="w-full h-1 bg-slate-800 rounded"></div>
          </div>
          {/* Signal rings */}
          <div className="absolute w-24 h-24 border border-cyan-400/10 rounded-full animate-ping"></div>
          <span className="text-[10px] text-cyan-400 font-mono mt-3">WHOLE HOME MESH</span>
        </div>
      );
    }
  };

  const isProductInCart = (p: Product) => cart.some((item) => item.id === p.id);

  return (
    <div className="space-y-12">
      {/* Catalog Intro */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h2 className="text-3xl font-extrabold text-slate-950 sm:text-4xl tracking-tight">
          متجر أجهزة الشبكات والإنترنت الضوئي
        </h2>
        <p className="text-lg text-slate-600 font-normal leading-relaxed">
          يوفر لكم مكتب بوابة الغد تشكيلة واسعة من أحدث أجهزة الاتصالات عالية الجودة، المختارة والمعتمدة لتعمل بكفاءة مطلقة مع اشتراكات شبكة الوطني الضوئية.
        </p>
      </div>

      {/* Main filter & search bar */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:max-w-md">
          <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="ابحث عن جهاز، راوتر، مقوي إشارة..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pr-11 pl-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white transition-all text-right"
          />
        </div>

        {/* Filter Categories */}
        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 whitespace-nowrap">
          {[
            { id: "all", label: "جميع الأجهزة" },
            { id: "solar", label: "☀️ طاقة شمسية SVC" },
            { id: "onu", label: "أجهزة الـ ONU" },
            { id: "router", label: "الراوترات المتطورة" },
            { id: "booster", label: "مقويات الإشارة" }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat.id
                  ? "bg-slate-900 text-white shadow-md"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Content with Sidebar Cart */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Products Grid */}
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((prod) => {
              const inCart = isProductInCart(prod);
              return (
                <motion.div
                  key={prod.id}
                  layout
                  className="bg-white rounded-3xl border border-slate-200/85 overflow-hidden shadow-sm hover:shadow-lg transition-shadow flex flex-col justify-between"
                >
                  {/* Custom Device Image Component */}
                  {getCategoryImage(prod)}

                  <div className="p-5 space-y-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-black uppercase text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded-md border border-cyan-100">
                        {prod.categoryAr}
                      </span>
                      <h3 className="font-bold text-slate-900 text-base mt-2 line-clamp-1">{prod.name}</h3>
                      <p className="text-xs text-slate-400 font-mono">الشركة: {prod.brand}</p>
                    </div>

                    <p className="text-xs text-slate-500 leading-relaxed font-normal line-clamp-2 min-h-[36px]">
                      {prod.description}
                    </p>

                    <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <Tag className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                      <span className="font-semibold text-slate-700">{prod.priceEstimate}</span>
                    </div>
                  </div>

                  {/* Actions footer */}
                  <div className="p-5 pt-0 flex gap-2 border-t border-slate-50 mt-auto">
                    <button
                      onClick={() => setSelectedProduct(prod)}
                      className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all"
                    >
                      التفاصيل
                    </button>
                    <button
                      onClick={() => {
                        if (inCart) {
                          onCheckoutCart();
                        } else {
                          onAddToCart(prod);
                          onCheckoutCart();
                        }
                      }}
                      className="flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md shadow-cyan-500/10"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>{inCart ? "مطلوب - الذهاب للتفعيل" : "اطلب الجهاز"}</span>
                    </button>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="col-span-full py-16 text-center text-slate-400 bg-white rounded-3xl border border-slate-200">
              <p className="text-base font-semibold">لا توجد أجهزة مطابقة للبحث</p>
              <p className="text-xs mt-1">تأكد من كتابة الاسم أو الفئة بشكل صحيح.</p>
            </div>
          )}
        </div>

        {/* Sidebar Cart Drawer (Persistent right block on desktop) */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl border border-slate-200/85 p-5 shadow-sm sticky top-28 space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-slate-100">
              <h3 className="font-black text-slate-950 flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-cyan-600" />
                حقيبة طلبات الأجهزة
              </h3>
              <span className="bg-cyan-500 text-slate-950 text-xs font-black w-6 h-6 rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            </div>

            {cart.length > 0 ? (
              <div className="space-y-4">
                <div className="space-y-2.5 max-h-[250px] overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-xs"
                    >
                      <div className="text-right">
                        <p className="font-bold text-slate-900 line-clamp-1">{item.name}</p>
                        <p className="text-[10px] text-slate-400 font-mono mt-0.5">{item.brand}</p>
                      </div>
                      <button
                        onClick={() => onRemoveFromCart(item)}
                        className="p-1.5 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-lg transition-colors shrink-0"
                        title="إزالة"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <p className="text-[11px] text-slate-400 leading-relaxed font-normal">
                    بإرسال هذه الأجهزة، سيتم إدراجها تلقائياً كملحقات مطلوبة مع اشتراكك للحصول على حسم تركيب متكامل ومجاني من مكتب بوابة الغد.
                  </p>
                  <button
                    onClick={onCheckoutCart}
                    className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black py-3 rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-md shadow-cyan-500/10"
                  >
                    <Send className="w-4 h-4" />
                    تعبئة الطلب بهذه الأجهزة
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-10 text-center text-slate-400 space-y-2">
                <ShoppingCart className="w-8 h-8 mx-auto text-slate-300 stroke-1" />
                <p className="text-xs font-semibold">حقيبة الأجهزة فارغة</p>
                <p className="text-[10px] max-w-[150px] mx-auto font-normal">أضف الأجهزة المطلوبة للتفعيل فوراً مع الاشتراك.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl overflow-hidden max-w-2xl w-full border border-slate-200 shadow-2xl relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 left-4 p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full transition-colors z-20"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>

              {/* Image Banner */}
              {getCategoryImage(selectedProduct)}

              {/* Description body */}
              <div className="p-6 sm:p-8 space-y-6">
                <div className="space-y-1 text-right">
                  <span className="text-[10px] font-black uppercase text-cyan-600 bg-cyan-50 px-2.5 py-1 rounded-full border border-cyan-100">
                    {selectedProduct.categoryAr}
                  </span>
                  <h3 className="text-2xl font-black text-slate-950 mt-3">{selectedProduct.name}</h3>
                  <p className="text-sm font-mono text-slate-400">الشركة المصنعة: {selectedProduct.brand}</p>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed font-normal text-right">
                  {selectedProduct.description}
                </p>

                <div className="space-y-3 text-right">
                  <h4 className="font-bold text-slate-900 text-sm">مميزات ومواصفات الجهاز الأساسية:</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedProduct.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2 text-xs text-slate-600">
                        <span className="bg-emerald-50 text-emerald-600 p-0.5 rounded-full mt-0.5 shrink-0">
                          <Check className="w-3.5 h-3.5 font-bold" />
                        </span>
                        <span className="font-normal">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-100 w-full sm:w-auto">
                    <Tag className="w-4 h-4 text-cyan-500" />
                    <span className="text-sm font-bold text-slate-700">السعر التقريبي: {selectedProduct.priceEstimate}</span>
                  </div>

                  <div className="flex gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => {
                        const inCart = isProductInCart(selectedProduct);
                        if (inCart) {
                          onRemoveFromCart(selectedProduct);
                        } else {
                          onAddToCart(selectedProduct);
                        }
                        setSelectedProduct(null);
                      }}
                      className={`flex-1 sm:flex-initial px-6 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                        isProductInCart(selectedProduct)
                          ? "bg-red-50 hover:bg-red-100 text-red-600 border border-red-200"
                          : "bg-cyan-500 hover:bg-cyan-400 text-slate-950"
                      }`}
                    >
                      {isProductInCart(selectedProduct) ? (
                        <>
                          <Trash2 className="w-4 h-4" />
                          <span>إلغاء الطلب</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4" />
                          <span>أضف الجهاز لحقيبة التفعيل</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
