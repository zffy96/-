import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChatMessage } from "../types";
import { Bot, Send, Sparkles, RefreshCw, AlertCircle, HelpCircle, ArrowLeft } from "lucide-react";

export default function AiChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "init-1",
      role: "model",
      content: "أهلاً بك! أنا مساعدك الذكي من مكتب **بوابة الغد**. 🌸\n\nأنا هنا لمساعدتك في العثور على باقة إنترنت الوطني الضوئي الأسرع والأنسب لعائلتك، أو مساعدتك في اختيار أفضل أجهزة الراوترات ومقويات الإشارة وتفاصيل أسعارها.\n\nكما يمكنني تقديم حلول فورية وسريعة لمشاكل الدعم الفني الشائعة (مثل وميض **الضوء الأحمر** في الـ ONU أو بطء الواي فاي). كيف يمكنني مساعدتك اليوم؟",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: "msg-" + Date.now(),
      role: "user",
      content: textToSend,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);
    setErrorMsg("");

    try {
      // Build history payload
      // Exclude initial greeting and map to server structure
      const historyPayload = messages
        .filter((m) => !m.id.startsWith("init"))
        .map((m) => ({
          role: m.role,
          content: m.content
        }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: historyPayload,
          userMessage: textToSend
        }),
      });

      const data = await response.json();
      if (response.ok && data.text) {
        setMessages((prev) => [
          ...prev,
          {
            id: "msg-" + (Date.now() + 1),
            role: "model",
            content: data.text,
            timestamp: new Date()
          }
        ]);
      } else {
        setErrorMsg(data.error || "عذراً، واجه المساعد صعوبة في صياغة الإجابة. يرجى المحاولة لاحقاً.");
      }
    } catch (err) {
      console.error("Chat proxy call failed:", err);
      setErrorMsg("لم نتمكن من الاتصال بسيرفر الدعم الذكي. يرجى التحقق من اتصالك بالإنترنت.");
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  const handleChipClick = (chipText: string) => {
    sendMessage(chipText);
  };

  const handleClearChat = () => {
    if (window.confirm("هل ترغب في إعادة ضبط المحادثة؟")) {
      setMessages([
        {
          id: "init-1",
          role: "model",
          content: "أهلاً بك مجدداً في الدعم الفني الذكي لبوابة الغد! كيف يمكنني خدمتك الآن بخصوص خطوط الوطني الضوئية أو أجهزة الراوترات ومقويات الإشارة؟",
          timestamp: new Date()
        }
      ]);
      setErrorMsg("");
    }
  };

  const commonChips = [
    "الضوء الأحمر يرمش في الـ ONU",
    "الإنترنت بطيء على الواي فاي",
    "ما هي باقات وسرعات الوطني الضوئي؟",
    "أريد مقوي إشارة مناسب للمنزل",
    "طريقة برمجة أو إعداد الراوتر"
  ];

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden flex flex-col h-[650px]">
      {/* Chat header */}
      <div className="bg-slate-900 text-white p-5 flex justify-between items-center border-b border-slate-800">
        <button
          onClick={handleClearChat}
          className="text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg transition-colors"
        >
          تصفير المحادثة
        </button>

        <div className="flex items-center gap-3 text-right">
          <div>
            <h3 className="font-extrabold text-sm flex items-center gap-1.5 justify-end">
              مساعد بوابة الغد الذكي
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
              </span>
            </h3>
            <p className="text-[10px] text-slate-400 font-normal">مدعوم بالذكاء الاصطناعي (Gemini 3.5)</p>
          </div>
          <div className="bg-gradient-to-tr from-cyan-500 to-indigo-600 p-2 rounded-xl text-white shadow-lg">
            <Bot className="w-5 h-5 animate-pulse-slow" />
          </div>
        </div>
      </div>

      {/* Messages layout box */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50">
        {messages.map((msg) => {
          const isUser = msg.role === "user";
          return (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-[85%] ${isUser ? "mr-auto flex-row-reverse" : "ml-auto"}`}
            >
              {/* Icon */}
              <div className={`p-2 rounded-xl shrink-0 h-9 w-9 flex items-center justify-center font-bold text-xs ${
                isUser ? "bg-cyan-500 text-slate-950" : "bg-slate-900 text-white"
              }`}>
                {isUser ? "أنت" : <Bot className="w-4 h-4" />}
              </div>

              {/* Text Bubble */}
              <div className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed text-right shadow-xs ${
                isUser 
                  ? "bg-cyan-500 text-slate-950 rounded-tr-none font-medium" 
                  : "bg-white border border-slate-200 text-slate-800 rounded-tl-none font-normal"
              }`}>
                {/* Parse Markdown and linebreaks elegantly */}
                <div className="space-y-2 whitespace-pre-wrap">
                  {msg.content.split("\n\n").map((para, pIdx) => {
                    // Check if paragraph contains bold tags (**text**)
                    const parts = para.split(/(\*\*.*?\*\*)/g);
                    return (
                      <p key={pIdx}>
                        {parts.map((part, partIdx) => {
                          if (part.startsWith("**") && part.endsWith("**")) {
                            return (
                              <strong key={partIdx} className={isUser ? "font-black" : "font-extrabold text-slate-950"}>
                                {part.slice(2, -2)}
                              </strong>
                            );
                          }
                          return part;
                        })}
                      </p>
                    );
                  })}
                </div>
                <span className={`text-[9px] mt-2 block font-mono ${isUser ? "text-slate-800" : "text-slate-400"}`}>
                  {msg.timestamp.toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
            </div>
          );
        })}

        {/* Typing placeholder indicator */}
        {isTyping && (
          <div className="flex gap-3 max-w-[80%] ml-auto">
            <div className="p-2 rounded-xl bg-slate-900 text-white shrink-0 h-9 w-9 flex items-center justify-center">
              <Bot className="w-4 h-4 animate-spin-slow" />
            </div>
            <div className="bg-white border border-slate-200 p-4 rounded-2xl rounded-tl-none shadow-xs text-right">
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                <span className="text-xs text-slate-400 mr-2 font-semibold">جاري التفكير وصياغة الرد الفني...</span>
              </div>
            </div>
          </div>
        )}

        {errorMsg && (
          <div className="bg-red-50 text-red-600 text-xs p-3 rounded-xl border border-red-200 flex items-center gap-2 max-w-md mx-auto text-right justify-end">
            <span>{errorMsg}</span>
            <AlertCircle className="w-4 h-4 shrink-0" />
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Common Quick Chips */}
      <div className="bg-white px-5 py-3 border-t border-slate-100 flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-none justify-end">
        <div className="flex gap-1.5 flex-row-reverse">
          {commonChips.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleChipClick(chip)}
              className="text-[11px] font-bold text-slate-600 hover:text-cyan-700 bg-slate-100 hover:bg-cyan-50 border border-slate-200/80 hover:border-cyan-200 px-3 py-1.5 rounded-full transition-all flex items-center gap-1"
            >
              <HelpCircle className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{chip}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Input bar */}
      <div className="bg-slate-50 p-4 border-t border-slate-200">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            placeholder="اكتب استفسارك هنا للدعم الفني أو المبيعات..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isTyping}
            className="flex-1 px-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-right disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isTyping}
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold p-3 sm:px-5 rounded-2xl transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline-block text-xs">إرسال</span>
          </button>
        </form>
      </div>
    </div>
  );
}
