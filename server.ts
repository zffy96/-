import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

// Body parser
app.use(express.json());

// Initialize Gemini Client
let ai: GoogleGenAI | null = null;
const apiKey = process.env.GEMINI_API_KEY;

if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
  try {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
    console.log("Gemini API initialized successfully.");
  } catch (error) {
    console.error("Failed to initialize Gemini API:", error);
  }
} else {
  console.warn("GEMINI_API_KEY is not configured or holds default value. AI Features will run in Simulation Mode.");
}

// Durable File-backed Order Store
interface OrderRequest {
  id: string;
  type: "subscription" | "hardware" | "recharge" | "solar";
  name: string;
  phone: string;
  email?: string;
  details: string;
  status: "pending" | "processing" | "completed" | "cancelled";
  createdAt: string;
  price?: number;
  adminNote?: string;
}

const ORDERS_FILE_PATH = path.join(process.cwd(), "orders.json");

// Load initial orders from file system (or reset to empty as requested)
let orders: OrderRequest[] = [];

// Clean reset orders.json as requested by owner
try {
  orders = [];
  fs.writeFileSync(ORDERS_FILE_PATH, JSON.stringify([], null, 2), "utf-8");
  console.log("Cleared all orders from orders.json upon request.");
} catch (err) {
  console.error("Error writing empty orders.json:", err);
}

// Helper to save orders to file
const persistOrders = () => {
  try {
    fs.writeFileSync(ORDERS_FILE_PATH, JSON.stringify(orders, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to write orders to disk:", err);
  }
};

// API Endpoints for Orders

// 1. Get orders (Filtered for customer or All for owner/admin)
app.get("/api/orders", (req, res) => {
  const { ids, phone, query } = req.query;

  let result = orders;

  if (ids) {
    const idList = String(ids).split(",").map((i) => i.trim());
    result = orders.filter((o) => idList.includes(o.id));
  } else if (phone) {
    const p = String(phone).trim();
    result = orders.filter((o) => o.phone.includes(p));
  } else if (query) {
    const q = String(query).trim().toLowerCase();
    result = orders.filter(
      (o) => o.id.toLowerCase().includes(q) || o.phone.includes(q) || o.name.toLowerCase().includes(q)
    );
  }

  res.json({ success: true, orders: result, totalCount: orders.length });
});

// 2. Submit a connection / hardware order
app.post("/api/orders", (req, res) => {
  const { type, name, phone, email, details, price } = req.body;
  if (!name || !phone || !type || !details) {
    return res.status(400).json({ error: "الرجاء ملء جميع الحقول المطلوبة (الاسم، الهاتف، نوع الطلب، وتفاصيل الطلب)" });
  }

  const newOrder: OrderRequest = {
    id: "BG-" + Math.floor(100000 + Math.random() * 900000),
    type,
    name,
    phone,
    email: email || "",
    details,
    status: "processing",
    createdAt: new Date().toISOString(),
    price: price || undefined,
    adminNote: "تم استلام الطلب بنجاح وسيتم التواصل معك من قبل القسم الفني للمعاينة والتفعيل."
  };

  orders.unshift(newOrder);
  persistOrders();
  res.status(201).json({ success: true, order: newOrder });
});

// 3. Batch Sync Orders (Sync local storage orders to server)
app.post("/api/orders/sync", (req, res) => {
  const { clientOrders } = req.body;
  if (Array.isArray(clientOrders)) {
    let addedCount = 0;
    for (const cOrd of clientOrders) {
      if (cOrd && cOrd.id && !orders.some((o) => o.id === cOrd.id)) {
        orders.unshift(cOrd);
        addedCount++;
      }
    }
    if (addedCount > 0) {
      persistOrders();
    }
  }
  res.json({ success: true, orders });
});

// 4. Update Order Status and Admin Response Note
app.put("/api/orders/:id/status", (req, res) => {
  const { id } = req.params;
  const { status, adminNote } = req.body;

  const orderIndex = orders.findIndex((o) => o.id === id);
  if (orderIndex === -1) {
    return res.status(404).json({ error: "الطلب غير موجود في قاعدة بيانات السيرفر" });
  }

  if (status) {
    orders[orderIndex].status = status;
  }
  if (adminNote !== undefined) {
    orders[orderIndex].adminNote = adminNote;
  }

  persistOrders();
  res.json({ success: true, order: orders[orderIndex] });
});

// 5. Delete single order
app.delete("/api/orders/:id", (req, res) => {
  const { id } = req.params;
  const initialLen = orders.length;
  orders = orders.filter((o) => o.id !== id);
  if (orders.length !== initialLen) {
    persistOrders();
  }
  res.json({ success: true, remainingCount: orders.length });
});

// 6. Delete all orders
app.delete("/api/orders", (req, res) => {
  orders = [];
  persistOrders();
  res.json({ success: true, message: "تم مسح جميع الطلبات من السيرفر بنجاح" });
});

// 7. Track an order by ID or phone number
app.get("/api/orders/track", (req, res) => {
  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ error: "الرجاء إدخال رقم الطلب أو رقم الهاتف للبحث" });
  }

  const queryString = String(query).trim();
  const foundOrders = orders.filter(
    (o) => o.id === queryString || o.phone.includes(queryString) || o.name.includes(queryString)
  );

  res.json({ success: true, orders: foundOrders });
});

// 3. Gemini Support Chat Proxy
app.post("/api/chat", async (req, res) => {
  const { messages, userMessage } = req.body;

  if (!userMessage) {
    return res.status(400).json({ error: "الرسالة مطلوبة" });
  }

  const systemPrompt = `أنت المساعد الذكي لـ "شركة بوابة الغد للمقاولات العامة والتجارة العامة" (Bawabat Al-Ghad General Contracting & Trading Co.).
شركة بوابة الغد هي شركة مقاولات عامة وتجارة عامة عراقية رائدة تضم أقساماً متكاملة:
1. قسم المقاولات العامة والإنشاءات: تنفيذ مشاريع البناء والإنشاءات الهندسية، البنية التحتية، الأعمال المدنية والكهربائية والميكانيكية، تجهيز المواد والمستلزمات، والتصاميم الهندسية.
2. قسم الطاقة الشمسية والحلول الهجينة: الوكيل والمركز المعتمد لمنظومات الطاقة الشمسية الهجينة، الإنفيرترات، وبطاريات الليثيوم SVC LiFePO4 طويلة العمر.
3. قسم الاتصالات وشبكات الإنترنت الضوئي: الوكيل المعتمد لخدمات تفعيل واشتراكات الإنترنت الضوئي (الوطني FTTH) وأجهزة الـ ONU والراوترات الجيجابت ومقويات الـ Mesh.
4. قسم التجهيزات العامة وعتاد الشبكات والأجهزة الإلكترونية.

عنوان الشركة الرئيسي: العراق - ميسان - العمارة - سايدين مستشفى الصدر - نهاية الشارع.
رقم الهاتف / الواتساب والدعم: 07721617032.
المدير العام: الأستاذ أثير صابر عبد الحسين.

مهامك ومعلوماتك الأساسية:
1. تقديم الاستشارات والمعلومات حول خدمات المقاولات العامة ومشاريع البناء والبنية التحتية والتجهيزات العامة.
2. توفير معلومات حول اشتراكات إنترنت الوطني الضوئي (FTTH) ومميزاته وباقاته:
   - باقة FIBER 35: سرعة 50 ميجابت/ثانية (35,000 د.ع شهرياً).
   - باقة FIBER 50: سرعة 60 ميجابت/ثانية (45,000 د.ع شهرياً).
   - باقة FIBER 75: سرعة 90 ميجابت/ثانية (65,000 د.ع شهرياً).
   - باقة FIBER 150: سرعة 180 ميجابت/ثانية (100,000 د.ع شهرياً).
3. منظومات الطاقة الشمسية SVC (إنفيرترات 3.5KW, 5.5KW, 10KW وبطاريات ليثيوم SVC مع معاينة ميدانية للموقع).
4. توجيه الزبائن والمقاولين للاستفسار أو طلب معاينة مشروع/طاقة شمسية/كيبل ضوئي عبر استمارة التواصل في الموقع أو الاتصال بالشركة directly.

قواعد الإجابة:
- أجب دائماً باللغة العربية بأسلوب رسمي، احترافي، ترحيبي ومقنع يعكس مكانة وأصالة شركة بوابة الغد للمقاولات العامة والتجارة العامة.
- استخدم الخط العريض والنقاط المنظمة لتسهيل القراءة.`;

  if (!ai) {
    // Simulated Mode responses when API key is missing
    const query = userMessage.toLowerCase();
    let simResponse = "أهلاً بك في الدعم الفني لمكتب بوابة الغد لخدمات الإنترنت الضوئي! ";
    
    if (query.includes("أحمر") || query.includes("احمر") || query.includes("los") || query.includes("ضوء")) {
      simResponse += "بخصوص وميض الضوء الأحمر (LOS) في جهاز الـ ONU، فهذا يشير إلى انقطاع أو ضعف في إشارة الألياف الضوئية الواصلة إليك. يرجى التأكد من أن كابل الفايبر الأصفر الصغير غير مثني بشكل حاد وموصول بإحكام. إذا استمرت المشكلة، يرجى تزويدنا برقم هاتفك أو تقديم طلب دعم فني عبر استمارة الموقع ليرسل مكتب بوابة الغد فني الصيانة لفحص الكابل الخارجي.";
    } else if (query.includes("سعر") || query.includes("اشتراك") || query.includes("باقة") || query.includes("سرعة") || query.includes("باقات")) {
      simResponse += "نوفر اشتراكات إنترنت الوطني الضوئي (FTTH) بسرعات ممتازة وباقات تناسب الجميع:\n\n" +
        "1. **الباقة الاقتصادية (Eco)**: بسرعة 40 ميغابت/ثانية بسعر 30,000 د.ع شهرياً (للتصفح البسيط والتواصل).\n" +
        "2. **باقة العائلة (Family)**: بسرعة 80 ميغابت/ثانية بسعر 45,000 د.ع شهرياً (مثالية للفيديو والدراسة ولأجهزة متعددة).\n" +
        "3. **الباقة الفائقة (Turbo)**: بسرعة 150 ميغابت/ثانية بسعر 65,000 د.ع شهرياً (ممتازة للألعاب والبث المباشر والتحميل السريع).\n" +
        "4. **الباقة الذهبية للأعمال (Business Pro)**: بسرعة 300 ميغابت/ثانية بسعر 100,000 د.ع شهرياً (أداء فائق للشركات والمنازل الكبيرة).\n\n" +
        "يمكنك طلب الاشتراك مباشرة من خلال تعبئة استمارة التفعيل في موقعنا!";
    } else if (query.includes("راوتر") || query.includes("جهاز") || query.includes("onu") || query.includes("مقوي") || query.includes("تقوية") || query.includes("أجهزة")) {
      simResponse += "يوفر مكتب بوابة الغد تشكيلة متميزة من أحدث أجهزة الشبكات:\n" +
        "- **أجهزة الـ ONU الضوئية**: موديلات عالية الجودة تتوافق تماماً مع شبكة الوطني لضمان استقرار الاتصال.\n" +
        "- **الراوترات المتطورة**: راوترات Wi-Fi 6 ثنائية النطاق (Dual-Band) لبث السرعات العالية دون أي فقدان للإشارة.\n" +
        "- **مقويات الإشارة الذكية (Mesh)**: تضمن لك تغطية واي فاي قوية ومستمرة في كل غرف وطوابق المنزل وتنهي مشكلة ضعف الشبكة.\n\n" +
        "يمكنك استعراض الأجهزة في قسم المتجر وطلب عرض سعر وسنتواصل معك فوراً!";
    } else if (query.includes("بطء") || query.includes("بطي") || query.includes("ضعيف") || query.includes("تقطيع")) {
      simResponse += "إذا كنت تعاني من بطء الإنترنت، يرجى التحقق مما يلي:\n" +
        "1. هل البطء على جميع الأجهزة أم جهاز واحد؟ إذا كان جهازاً واحداً فقد تكون المشكلة فيه.\n" +
        "2. هل أنت متصل بتردد 2.4GHz أم 5GHz؟ تردد 5GHz يعطيك السرعة الكاملة بينما 2.4GHz يتأثر بالتشويش والحوائط.\n" +
        "3. يرجى تجربة إطفاء الراوتر وجهاز الـ ONU لمدة دقيقتين ثم إعادة تشغيلهما لتحديث الاتصال.\n" +
        "إذا استمر البطء، يمكنك إرسال شكوى عبر استمارة الدعم في الموقع وسنقوم بفحص خطك بالتعاون مع شركة الوطني.";
    } else {
      simResponse += "يسعدنا جداً خدمتك في مكتب بوابة الغد! يمكنك الاستفسار عن اشتراكات الوطني الضوئي الأسرع والأكثر استقراراً، باقات شحن الرصيد، أو تشكيلة الراوترات ومقويات الإشارة الذكية المتوفرة لدينا. كيف يمكنني مساعدتك اليوم؟";
    }

    return res.json({ text: simResponse, isSimulated: true });
  }

  try {
    // Format message history for generateContent
    // Each message has 'role' and 'parts'
    const formattedContents = [];
    
    // Add history if present
    if (messages && Array.isArray(messages)) {
      for (const msg of messages) {
        if (msg.role === "user" || msg.role === "model") {
          formattedContents.push({
            role: msg.role === "user" ? "user" : "model",
            parts: [{ text: msg.content }]
          });
        }
      }
    }

    // Append current user message
    formattedContents.push({
      role: "user",
      parts: [{ text: userMessage }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedContents,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      },
    });

    res.json({ text: response.text, isSimulated: false });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: "عذراً، حدث خطأ أثناء الاتصال بمساعد الذكاء الاصطناعي. يرجى المحاولة لاحقاً.", details: error.message });
  }
});

// Vite server integration or production static serving
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development middleware mounted.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Production static files server mounted.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Bawabat Al-Ghad server listening at http://0.0.0.0:${PORT} in ${process.env.NODE_ENV || "development"} mode.`);
  });
}

setupServer();
