import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Order } from "../types";
import {
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Search,
  Trash2,
  RefreshCw,
  MessageSquare,
  Copy,
  Check,
  ExternalLink,
  PlusCircle,
  Eye,
  Calendar,
  Phone,
  User,
  PackageCheck,
  Sun,
  Wifi,
  Cpu,
  CreditCard,
  ShieldCheck,
  Lock,
  Unlock,
  Send,
  Edit3,
  HelpCircle,
  UserCheck
} from "lucide-react";

interface OrderHistoryProps {
  onNavigateToNewOrder?: () => void;
}

export default function OrderHistory({ onNavigateToNewOrder }: OrderHistoryProps) {
  const [allServerOrders, setAllServerOrders] = useState<Order[]>([]);
  
  // Mode: Admin vs Customer
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return localStorage.getItem("bawabat_admin_mode") === "true";
  });
  const [adminPinInput, setAdminPinInput] = useState<string>("");
  const [isAdminAuthModalOpen, setIsAdminAuthModalOpen] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>("");

  // Customer state
  const [customerSearchQuery, setCustomerSearchQuery] = useState<string>("");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState<Order | null>(null);

  // Admin note editing state
  const [editingNoteOrderId, setEditingNoteOrderId] = useState<string | null>(null);
  const [noteInputValue, setNoteInputValue] = useState<string>("");

  // Sync state with backend server
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [lastSyncedAt, setLastSyncedAt] = useState<Date | null>(null);
  const [syncError, setSyncError] = useState<string>("");

  // Quick order creation modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [newOrderName, setNewOrderName] = useState("");
  const [newOrderPhone, setNewOrderPhone] = useState("");
  const [newOrderType, setNewOrderType] = useState<Order["type"]>("subscription");
  const [newOrderDetails, setNewOrderDetails] = useState("");

  // Fetch orders from Server API
  const fetchOrders = async () => {
    setIsSyncing(true);
    setSyncError("");

    try {
      const res = await fetch("/api/orders");
      if (!res.ok) throw new Error("تعذر الاتصال بالسيرفر");
      const data = await res.json();

      const serverOrders: Order[] = data.orders || [];
      setAllServerOrders(serverOrders);
      setLastSyncedAt(new Date());
    } catch (err: any) {
      console.warn("Server sync error:", err);
      setSyncError("تعذر المزامنة الحية مع السيرفر.");
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(() => {
      fetchOrders();
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Get customer's own order IDs from localStorage
  const getMyOrderIds = (): string[] => {
    try {
      const localOrdersRaw = localStorage.getItem("bawabat_alghad_orders");
      if (localOrdersRaw) {
        const parsed: Order[] = JSON.parse(localOrdersRaw);
        return parsed.map((o) => o.id);
      }
    } catch (e) {}
    return [];
  };

  // Toggle Admin Mode
  const handleAdminAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPinInput.trim() === "1996") {
      setIsAdmin(true);
      localStorage.setItem("bawabat_admin_mode", "true");
      setIsAdminAuthModalOpen(false);
      setAdminPinInput("");
      setAuthError("");
    } else {
      setAuthError("رمز الدخول غير صحيح. يرجى التأكد من الرمز والمحاولة مجدداً.");
    }
  };

  const handleLogoutAdmin = () => {
    setIsAdmin(false);
    localStorage.removeItem("bawabat_admin_mode");
  };

  // Status Change API
  const handleUpdateStatus = async (orderId: string, newStatus: Order["status"], newNote?: string) => {
    try {
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: newStatus,
          ...(newNote !== undefined ? { adminNote: newNote } : {})
        })
      });
      const data = await res.json();
      if (data.success && data.order) {
        setAllServerOrders((prev) =>
          prev.map((o) => (o.id === orderId ? data.order : o))
        );
        if (selectedOrderDetails?.id === orderId) {
          setSelectedOrderDetails(data.order);
        }
      }
    } catch (e) {
      console.error("Failed to update order status:", e);
    }
  };

  // Save Admin Note API
  const handleSaveAdminNote = async (orderId: string) => {
    const targetOrder = allServerOrders.find((o) => o.id === orderId);
    if (!targetOrder) return;

    await handleUpdateStatus(orderId, targetOrder.status, noteInputValue);
    setEditingNoteOrderId(null);
    setNoteInputValue("");
  };

  // Delete single order API
  const handleDeleteOrder = async (orderId: string) => {
    if (window.confirm(`هل أنت متأكد من حذف الطلب رقم ${orderId} نهائياً من السيرفر؟`)) {
      try {
        await fetch(`/api/orders/${orderId}`, { method: "DELETE" });
        setAllServerOrders((prev) => prev.filter((o) => o.id !== orderId));
        if (selectedOrderDetails?.id === orderId) {
          setSelectedOrderDetails(null);
        }
      } catch (e) {
        console.error("Failed to delete order:", e);
      }
    }
  };

  // Clear ALL orders API
  const handleClearAllOrders = async () => {
    if (window.confirm("⚠️ تحذير: هل أنت متأكد من مسح جميع الطلبات نهائياً من قاعدة بيانات السيرفر؟")) {
      try {
        await fetch("/api/orders", { method: "DELETE" });
        setAllServerOrders([]);
        setSelectedOrderDetails(null);
        localStorage.removeItem("bawabat_alghad_orders");
      } catch (e) {
        console.error("Failed to clear orders:", e);
      }
    }
  };

  // Copy tracking ID
  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Create manual order from form
  const handleCreateNewOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOrderName || !newOrderPhone) return;

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: newOrderType,
          name: newOrderName,
          phone: newOrderPhone,
          details: newOrderDetails || "طلب جديد"
        })
      });
      const data = await res.json();
      if (data.success && data.order) {
        // Add to local browser order IDs
        const existingLocal = getMyOrderIds();
        const myOrders = [data.order, ...allServerOrders.filter((o) => existingLocal.includes(o.id))];
        localStorage.setItem("bawabat_alghad_orders", JSON.stringify(myOrders));

        setIsAddModalOpen(false);
        setNewOrderName("");
        setNewOrderPhone("");
        setNewOrderDetails("");
        fetchOrders();
      }
    } catch (err) {
      console.error("Failed to create order:", err);
    }
  };

  // WhatsApp url generator
  const getWhatsAppUrl = (ord: Order) => {
    const statusLabel =
      ord.status === "completed" ? "مكتمل ✅" :
      ord.status === "processing" ? "قيد المعالجة 🔄" :
      ord.status === "cancelled" ? "ملغي ❌" : "قيد الانتظار ⏳";

    const text = `*متابعة طلب - شركة بوابة الغد* 🏗️
*رقم التتبع:* ${ord.id}
*الحالة الحالية:* ${statusLabel}
*الاسم:* ${ord.name}
*التفاصيل:* ${ord.details}

يرجى إفادتي بآخر التحديثات حول موعد الفحص والتركيب.`;

    return `https://wa.me/9647721617032?text=${encodeURIComponent(text)}`;
  };

  // Compute displayed orders depending on Admin vs Customer Mode
  const myOrderIds = getMyOrderIds();

  const displayedOrders = allServerOrders.filter((ord) => {
    // Status Filter
    if (selectedStatusFilter !== "all" && ord.status !== selectedStatusFilter) {
      return false;
    }

    // If Admin: show all, subject to search query
    if (isAdmin) {
      if (!customerSearchQuery) return true;
      const q = customerSearchQuery.trim().toLowerCase();
      return (
        ord.id.toLowerCase().includes(q) ||
        ord.name.toLowerCase().includes(q) ||
        ord.phone.includes(q) ||
        ord.details.toLowerCase().includes(q)
      );
    }

    // If Customer Mode:
    // Only show orders created on this device OR matching exact ID/phone searched
    const q = customerSearchQuery.trim().toLowerCase();
    if (q) {
      return (
        ord.id.toLowerCase().includes(q) ||
        ord.phone.includes(q)
      );
    }

    // Default: show orders created on this local device
    return myOrderIds.includes(ord.id);
  });

  // Badge configurations
  const getStatusBadge = (status: Order["status"]) => {
    switch (status) {
      case "processing":
        return {
          label: "قيد المعالجة",
          bg: "bg-amber-500/10 text-amber-700 border-amber-300/80",
          icon: <Clock className="w-3.5 h-3.5 text-amber-600 animate-spin-slow" />,
          dot: "bg-amber-500 animate-pulse"
        };
      case "completed":
        return {
          label: "مكتمل",
          bg: "bg-emerald-500/10 text-emerald-800 border-emerald-300/80",
          icon: <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />,
          dot: "bg-emerald-500"
        };
      case "cancelled":
        return {
          label: "ملغي",
          bg: "bg-rose-500/10 text-rose-800 border-rose-300/80",
          icon: <XCircle className="w-3.5 h-3.5 text-rose-600" />,
          dot: "bg-rose-500"
        };
      case "pending":
      default:
        return {
          label: "قيد الانتظار",
          bg: "bg-sky-500/10 text-sky-800 border-sky-300/80",
          icon: <AlertCircle className="w-3.5 h-3.5 text-sky-600" />,
          dot: "bg-sky-500"
        };
    }
  };

  const getTypeBadge = (type: Order["type"]) => {
    switch (type) {
      case "solar":
        return {
          label: "طاقة شمسية SVC",
          icon: <Sun className="w-3.5 h-3.5 text-amber-500" />,
          color: "text-amber-800 bg-amber-50 border-amber-200"
        };
      case "subscription":
        return {
          label: "اشتراك فايبر",
          icon: <Wifi className="w-3.5 h-3.5 text-cyan-600" />,
          color: "text-cyan-800 bg-cyan-50 border-cyan-200"
        };
      case "hardware":
        return {
          label: "أجهزة شبكة",
          icon: <Cpu className="w-3.5 h-3.5 text-indigo-600" />,
          color: "text-indigo-800 bg-indigo-50 border-indigo-200"
        };
      case "recharge":
        return {
          label: "شحن رصيد",
          icon: <CreditCard className="w-3.5 h-3.5 text-emerald-600" />,
          color: "text-emerald-800 bg-emerald-50 border-emerald-200"
        };
    }
  };

  return (
    <div className="space-y-8 text-right font-sans">
      {/* Top Banner Header */}
      <div className={`rounded-3xl p-6 sm:p-8 border shadow-lg relative overflow-hidden transition-all ${
        isAdmin 
          ? "bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white border-indigo-800/80" 
          : "bg-gradient-to-r from-slate-900 via-slate-800 to-cyan-950 text-white border-slate-800"
      }`}>
        <div className="absolute top-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 flex-wrap">
              {isAdmin ? (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-indigo-500/30 text-indigo-300 border border-indigo-400/40">
                  <ShieldCheck className="w-4 h-4 text-indigo-400" />
                  <span>لوحة التحكم الإدارية (صاحب الشركة)</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
                  <span>بوابة الزبون المباشرة لمتابعة الطلب</span>
                </div>
              )}

              {lastSyncedAt && (
                <span className="text-[11px] text-slate-400 font-mono">
                  تحديث مباشر: {lastSyncedAt.toLocaleTimeString("ar-IQ")}
                </span>
              )}
            </div>

            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              {isAdmin ? "إدارة وتتبع كافة طلبات العملاء" : "تتبع حالة طلبك وإجابة الإدارة"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              {isAdmin 
                ? `أهلاً بك في لوحة الإدارة. يمكنك رؤية كافة طلبات الزبائن (${allServerOrders.length} طلب)، وتغيير حالتها، وكتابة رد وإجابة مباشرة تظهر للزبون عند فتحه للرابط.`
                : "يمكنك متابعة حالة طلبك بشكل خاص وآمن فور إرسال الرابط لك، حيث تظهر لك حالة الطلب وتحديثات القسم الفني وإجابة الشركة مباشرة."}
            </p>

            {syncError && (
              <p className="text-xs text-amber-400 font-bold bg-amber-950/60 p-2 rounded-xl border border-amber-800/80">
                ⚠️ {syncError}
              </p>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {isAdmin ? (
              <>
                <button
                  onClick={handleClearAllOrders}
                  className="bg-rose-600 hover:bg-rose-500 text-white font-bold px-3.5 py-2.5 rounded-xl text-xs transition-all flex items-center gap-1.5 shadow-md"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>مسح كافة الطلبات من السيرفر</span>
                </button>

                <button
                  onClick={handleLogoutAdmin}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 font-bold px-3.5 py-2.5 rounded-xl text-xs transition-all flex items-center gap-1.5"
                >
                  <Unlock className="w-3.5 h-3.5 text-amber-400" />
                  <span>خروج من وضع الإدارة</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsAdminAuthModalOpen(true)}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-3.5 py-2.5 rounded-xl text-xs transition-all flex items-center gap-1.5 shadow-md"
              >
                <Lock className="w-3.5 h-3.5 text-indigo-200" />
                <span>دخول لوحة إدارة الشركة</span>
              </button>
            )}

            <button
              onClick={fetchOrders}
              disabled={isSyncing}
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-3.5 py-2.5 rounded-xl text-xs transition-all flex items-center gap-1.5 shadow-md disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 text-slate-950 ${isSyncing ? "animate-spin" : ""}`} />
              <span>تحديث</span>
            </button>

            {onNavigateToNewOrder && (
              <button
                onClick={onNavigateToNewOrder}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-4 py-2.5 rounded-xl text-xs transition-all flex items-center gap-1.5 shadow-md"
              >
                <PlusCircle className="w-4 h-4 text-slate-950 fill-slate-950" />
                <span>طلب جديد</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
          {/* Status Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {[
              { id: "all", label: "الكل", count: isAdmin ? allServerOrders.length : displayedOrders.length },
              {
                id: "processing",
                label: "قيد المعالجة",
                count: (isAdmin ? allServerOrders : displayedOrders).filter((o) => o.status === "processing").length,
              },
              {
                id: "completed",
                label: "مكتمل",
                count: (isAdmin ? allServerOrders : displayedOrders).filter((o) => o.status === "completed").length,
              },
              {
                id: "cancelled",
                label: "ملغي",
                count: (isAdmin ? allServerOrders : displayedOrders).filter((o) => o.status === "cancelled").length,
              }
            ].map((tab) => {
              const active = selectedStatusFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedStatusFilter(tab.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 border ${
                    active
                      ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                      : "bg-slate-50 text-slate-600 border-slate-200/80 hover:bg-slate-100"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-md text-[10px] font-mono ${
                      active ? "bg-slate-800 text-cyan-300" : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Input for Tracking */}
          <div className="relative flex-1 sm:w-72">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder={isAdmin ? "بحث باسم العميل أو رقمه أو كود BG-..." : "أدخل رقم تتبع طلبك BG-XXXXXX أو رقم هاتف..."}
              value={customerSearchQuery}
              onChange={(e) => setCustomerSearchQuery(e.target.value)}
              className="w-full pr-9 pl-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-cyan-500 font-sans"
            />
            {customerSearchQuery && (
              <button
                onClick={() => setCustomerSearchQuery("")}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Orders List Container */}
      {displayedOrders.length > 0 ? (
        <div className="space-y-4">
          {displayedOrders.map((ord) => {
            const badge = getStatusBadge(ord.status);
            const typeBadge = getTypeBadge(ord.type);
            const isEditingNote = editingNoteOrderId === ord.id;

            return (
              <motion.div
                key={ord.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all overflow-hidden"
              >
                {/* Header Strip */}
                <div className="p-5 sm:p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-2 flex-wrap">
                      {/* Tracking Code Chip */}
                      <div className="inline-flex items-center gap-1.5 bg-slate-100 border border-slate-200 px-3 py-1 rounded-xl text-xs font-mono font-bold text-slate-900">
                        <span>{ord.id}</span>
                        <button
                          onClick={() => handleCopyId(ord.id)}
                          className="text-slate-400 hover:text-cyan-600 transition-colors"
                          title="نسخ رقم التتبع"
                        >
                          {copiedId === ord.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>

                      {/* Type Badge */}
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold border ${typeBadge.color}`}
                      >
                        {typeBadge.icon}
                        <span>{typeBadge.label}</span>
                      </span>

                      {/* Date */}
                      <span className="text-[11px] text-slate-400 flex items-center gap-1 font-normal">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {new Date(ord.createdAt).toLocaleDateString("ar-IQ", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </span>
                    </div>

                    {/* Status Visual Badge */}
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black border ${badge.bg}`}
                      >
                        <span className={`w-2 h-2 rounded-full ${badge.dot}`}></span>
                        {badge.icon}
                        <span>الحالة: {badge.label}</span>
                      </span>
                    </div>
                  </div>

                  {/* Customer & Details overview */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div className="space-y-1">
                      <p className="text-slate-400 font-normal">اسم العميل:</p>
                      <p className="font-bold text-slate-900 flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        <span>{ord.name}</span>
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-slate-400 font-normal">رقم الهاتف:</p>
                      <p className="font-bold text-slate-900 font-mono flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        <span>{ord.phone}</span>
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-slate-400 font-normal">تفاصيل الطلب:</p>
                      <p className="font-medium text-slate-700 line-clamp-2 leading-relaxed">{ord.details}</p>
                    </div>
                  </div>

                  {/* ADMIN RESPONSE & NOTE BOX (FOR CUSTOMER & OWNER) */}
                  <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200/80 p-4 rounded-2xl space-y-2">
                    <div className="flex justify-between items-center text-xs font-bold text-cyan-950">
                      <span className="flex items-center gap-1.5">
                        <MessageSquare className="w-4 h-4 text-cyan-700" />
                        <span>إجابة وتحديث قسم المتابعة بشركة بوابة الغد:</span>
                      </span>

                      {isAdmin && !isEditingNote && (
                        <button
                          onClick={() => {
                            setEditingNoteOrderId(ord.id);
                            setNoteInputValue(ord.adminNote || "");
                          }}
                          className="text-xs text-indigo-700 hover:text-indigo-900 font-bold underline flex items-center gap-1"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>تعديل الإجابة للزبون</span>
                        </button>
                      )}
                    </div>

                    {isEditingNote ? (
                      <div className="space-y-2 pt-1">
                        <textarea
                          rows={2}
                          value={noteInputValue}
                          onChange={(e) => setNoteInputValue(e.target.value)}
                          placeholder="اكتب رد وملاحظة الإدارة التي ستظهر للزبون عند فتح الرابط..."
                          className="w-full p-2.5 bg-white border border-cyan-300 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-cyan-600 text-right"
                        />
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => setEditingNoteOrderId(null)}
                            className="bg-slate-200 text-slate-700 font-bold px-3 py-1.5 rounded-lg text-xs"
                          >
                            إلغاء
                          </button>
                          <button
                            onClick={() => handleSaveAdminNote(ord.id)}
                            className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>حفظ وإرسال التحديث</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-xs text-slate-800 leading-relaxed font-medium">
                        {ord.adminNote || "جاري مراجعة الطلب من قبل مهندس المنطقة وسيتم إفادتك بالتفاصيل فوراً."}
                      </p>
                    )}
                  </div>

                  {/* Actions & Interactive Controls Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                      <a
                        href={getWhatsAppUrl(ord)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 px-3.5 rounded-xl text-xs transition-all flex items-center gap-1.5 shadow-xs"
                      >
                        <MessageSquare className="w-3.5 h-3.5 fill-current" />
                        <span>مراسلة المكتب عبر الواتساب</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>

                      <button
                        onClick={() => setSelectedOrderDetails(ord)}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2 px-3 rounded-xl text-xs transition-all flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5 text-slate-600" />
                        <span>عرض التفاصيل</span>
                      </button>
                    </div>

                    {/* OWNER ONLY CONTROLS */}
                    {isAdmin && (
                      <div className="flex items-center gap-2 bg-indigo-50/80 p-1.5 rounded-xl border border-indigo-100">
                        <span className="text-[10px] text-indigo-900 font-bold">
                          تحديث الحالة:
                        </span>
                        <select
                          value={ord.status}
                          onChange={(e) => handleUpdateStatus(ord.id, e.target.value as Order["status"])}
                          className="bg-white border border-indigo-200 text-slate-900 font-bold py-1 px-2 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
                        >
                          <option value="processing">🔄 قيد المعالجة</option>
                          <option value="completed">✅ مكتمل</option>
                          <option value="cancelled">❌ ملغي</option>
                          <option value="pending">⏳ قيد الانتظار</option>
                        </select>

                        <button
                          onClick={() => handleDeleteOrder(ord.id)}
                          className="p-1.5 text-rose-600 hover:bg-rose-100 rounded-lg transition-colors"
                          title="حذف هذا الطلب"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-xs space-y-4 max-w-lg mx-auto">
          <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto border border-slate-200">
            <PackageCheck className="w-8 h-8 stroke-1" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900">
              {customerSearchQuery 
                ? "لم نجد طلب يطابق البحث"
                : isAdmin 
                ? "قاعدة بيانات الطلبات فارغة تماماً حالياً"
                : "لم تقم بتقديم طلب عبر هذا الجهاز بعد"}
            </h3>
            <p className="text-xs text-slate-500 font-normal leading-relaxed">
              {isAdmin 
                ? "تم مسح كافة الطلبات بنجاح. عند قيام أي زبون بتقديم طلب جديد سيظهر هنا فوراً في لوحة التحكم."
                : "يمكنك إدخال كود الطلب الخاص بك (BG-XXXXXX) في مربع البحث أعلاه أو تقديم طلب جديد لحجز خدمة الفايبر أو الطاقة الشمسية."}
            </p>
          </div>
          <div className="pt-2 flex justify-center gap-3">
            {onNavigateToNewOrder && (
              <button
                onClick={onNavigateToNewOrder}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 px-5 rounded-xl text-xs transition-all shadow-sm"
              >
                تقديم طلب جديد الآن
              </button>
            )}
          </div>
        </div>
      )}

      {/* ADMIN AUTH MODAL */}
      <AnimatePresence>
        {isAdminAuthModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full space-y-5 shadow-2xl border border-slate-200 text-right"
            >
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <button
                  onClick={() => setIsAdminAuthModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-sm font-bold"
                >
                  ✕
                </button>
                <h3 className="text-base font-extrabold text-slate-950 flex items-center gap-1.5">
                  <ShieldCheck className="w-5 h-5 text-indigo-600" />
                  <span>دخول لوحة إدارة الشركة</span>
                </h3>
              </div>

              <form onSubmit={handleAdminAuthSubmit} className="space-y-4">
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  أدخل رمز مرور الإدارة للوصول لرؤية جميع طلبات العملاء وتعديل حالاتها وإرسال الإجابات.
                </p>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">رمز دخول الإدارة (PIN):</label>
                  <input
                    type="password"
                    required
                    placeholder="أدخل رمز مرور الإدارة"
                    value={adminPinInput}
                    onChange={(e) => setAdminPinInput(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-center tracking-widest"
                  />
                  {authError && <p className="text-xs text-rose-600 font-bold pt-1">{authError}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl text-xs transition-all shadow-md"
                >
                  تأكيد الدخول
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ORDER DETAILS MODAL */}
      <AnimatePresence>
        {selectedOrderDetails && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl border border-slate-200 text-right overflow-y-auto max-h-[90vh]"
            >
              <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                <button
                  onClick={() => setSelectedOrderDetails(null)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-sm font-bold transition-colors"
                >
                  ✕
                </button>
                <div className="text-right">
                  <h3 className="text-base font-extrabold text-slate-950">تفاصيل الطلب الكاملة</h3>
                  <p className="text-xs text-slate-400 font-mono">رقم التتبع: {selectedOrderDetails.id}</p>
                </div>
              </div>

              {/* Status display */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-3">
                <div className="flex justify-between items-center">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black border ${
                      getStatusBadge(selectedOrderDetails.status).bg
                    }`}
                  >
                    {getStatusBadge(selectedOrderDetails.status).icon}
                    <span>{getStatusBadge(selectedOrderDetails.status).label}</span>
                  </span>
                  <span className="text-xs font-bold text-slate-700">حالة المتابعة الفنية</span>
                </div>
              </div>

              {/* Information grid */}
              <div className="space-y-3 text-xs">
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-1">
                  <p className="text-slate-400 font-normal">اسم صاحب الطلب:</p>
                  <p className="font-bold text-slate-900 text-sm">{selectedOrderDetails.name}</p>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-1">
                  <p className="text-slate-400 font-normal">رقم الهاتف المسجل:</p>
                  <p className="font-bold text-slate-900 text-sm font-mono">{selectedOrderDetails.phone}</p>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-1">
                  <p className="text-slate-400 font-normal">تفاصيل الطلب والعنوان:</p>
                  <p className="font-medium text-slate-800 leading-relaxed whitespace-pre-line">
                    {selectedOrderDetails.details}
                  </p>
                </div>

                <div className="bg-cyan-50 p-3.5 rounded-xl border border-cyan-200 space-y-1">
                  <p className="text-cyan-900 font-bold">رد وتحديث شركة بوابة الغد للزبون:</p>
                  <p className="font-semibold text-slate-800 leading-relaxed">
                    {selectedOrderDetails.adminNote || "جاري المعالجة والمتابعة."}
                  </p>
                </div>
              </div>

              {/* Action */}
              <div className="pt-2 flex flex-col gap-2">
                <a
                  href={getWhatsAppUrl(selectedOrderDetails)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-4 rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>تواصل مباشر مع مهندس المكتب بشأن هذا الطلب</span>
                </a>

                <button
                  onClick={() => setSelectedOrderDetails(null)}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2.5 px-4 rounded-xl text-xs transition-colors"
                >
                  إغلاق النافذة
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
