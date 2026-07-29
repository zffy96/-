import { Package, Product } from "./types";

export const packages: Package[] = [
  {
    id: "pkg-fiber-35",
    name: "FIBER 35",
    nameEn: "FIBER 35",
    speed: "50 Mbps",
    price: 35000,
    description: "استمتع بسرعة 50 ميجابت/ثانية لتصفح الإنترنت، التواصل مع أحبابك، ولمشاهدة الفيديوهات بأعلى جودة.",
    features: [
      "FIBER 35 (سرعة 50 ميجابت/ثانية)",
      "خدمة البث التلفزيوني IPTV",
      "التحكم الأبوي والعائلي Parental Control",
      "سعة استخدام وتنزيل غير محدودة شهرياً",
      "دعم فني وتفعيل فوري من مكتب بوابة الغد"
    ],
    badge: "الباقة الاقتصادية",
    color: "from-emerald-50 to-teal-100 border-emerald-200 text-emerald-600"
  },
  {
    id: "pkg-fiber-50",
    name: "FIBER 50",
    nameEn: "FIBER 50",
    speed: "60 Mbps",
    price: 45000,
    description: "استمتع بسرعة 60 ميجابت/ثانية الفائقة، لتحميل فوري وقوي للملفات والفيديوهات.",
    features: [
      "FIBER 50 (سرعة 60 ميجابت/ثانية)",
      "خدمة البث التلفزيوني IPTV",
      "التحكم الأبوي والعائلي Parental Control",
      "بث فيديو دقة 4K و HD بدون تقطيع",
      "استقرار ممتاز وتصفح فائق السرعة"
    ],
    badge: "الأكثر شعبية",
    color: "from-cyan-50 to-indigo-100 border-cyan-200 text-cyan-600"
  },
  {
    id: "pkg-fiber-75",
    name: "FIBER 75",
    nameEn: "FIBER 75",
    speed: "90 Mbps",
    price: 65000,
    description: "استمتع بسرعة 90 ميجابت/ثانية بإنترنت مستقر، لتجربة سريعة ومثالية يومياً.",
    features: [
      "FIBER 75 (سرعة 90 ميجابت/ثانية)",
      "خدمة البث التلفزيوني IPTV",
      "التحكم الأبوي والعائلي Parental Control",
      "زمن استجابة (Ping) منخفض وثابت للألعاب",
      "مثالية لعشاق الجيمينج والبث الفضائي"
    ],
    badge: "لعشاق السرعة",
    color: "from-amber-50 to-orange-100 border-amber-200 text-amber-600"
  },
  {
    id: "pkg-fiber-150",
    name: "FIBER 150",
    nameEn: "FIBER 150",
    speed: "180 Mbps",
    price: 100000,
    description: "الخيار المثالي لأعمالك الصغيرة لزيادة النجاح والإنجازية بسرعة 180 ميجابت/ثانية.",
    features: [
      "FIBER 150 (سرعة 180 ميجابت/ثانية)",
      "خدمة البث التلفزيوني IPTV",
      "التحكم الأبوي والعائلي Parental Control",
      "أولوية قصوى على شبكة الوطني الضوئية",
      "سرعة خيالية للشركات والتحميل الحجمي"
    ],
    badge: "للأعمال والمحترفين",
    color: "from-purple-50 to-pink-100 border-purple-200 text-purple-600"
  }
];

export const products: Product[] = [
  // --- SOLAR POWER SYSTEMS & BATTERIES ---
  {
    id: "prod-pdf-bat-48v314ah",
    name: "بطارية ليثيوم BATTERY 48V/314Ah (BMF 51314)",
    category: "solar_battery",
    categoryAr: "بطاريات ليثيوم 48V",
    brand: "BMF / CORNEX",
    priceEstimate: "2,550,000 د.ع",
    description: "بطارية ليثيوم فوسفات الحديد (LiFePO4) سعة 48V/314Ah عالية الكفاءة مع شاشة لمس سريعة، تقنية Wi-Fi و Bluetooth، خلايا CORNEX CELL ونظام حماية PACE 200A BMS.",
    features: [
      "السعة والجهد: 48V / 314Ah",
      "عدد دورات التفريغ: >8000 دورة (25°C, 0.2C, 80% DOD)",
      "العمر الافتراضي: ضمان 5 سنوات، عمر تصميمي 10 سنوات",
      "ربط التوازي: يدعم ربط حتى 16 بطارية بالتوازي",
      "التقنية والاتصال: مزودة بـ Wi-Fi & Bluetooth وشاشة لمس سريعة",
      "اللغات: دعم العربية، الإنجليزية، الصينية، والفرنسية",
      "نوع الخلايا والـ BMS: خلايا CORNEX CELL + نظام PACE 200A BMS",
      "نوع البطارية: LiFePO4 (ليثيوم فوسفات الحديد)"
    ],
    image: "/solar_bat_314ah.jpg",
    specs: {
      voltage: "48V DC",
      capacity: "314Ah",
      batteryType: "LiFePO4 (CORNEX + PACE 200A)",
      warranty: "ضمان 5 سنوات (عمر تصميمي 10 سنوات)"
    }
  },
  {
    id: "prod-pdf-bat-48v100ah",
    name: "بطارية ليثيوم BATTERY 48V/100Ah (FBP48-100)",
    category: "solar_battery",
    categoryAr: "بطاريات ليثيوم 48V",
    brand: "FBP / CORNEX",
    priceEstimate: "850,000 د.ع",
    description: "بطارية ليثيوم سعة 48V/100Ah بعمر تصميمي 10 سنوات ودورة حياة تتجاوز 6000 دورة تفريغ، مزودة بشاشة لمس ونظام حماية PACE 100A BMS.",
    features: [
      "السعة والجهد: 48V / 100Ah",
      "عدد دورات التفريغ: >6000 دورة (25°C, 0.2C, 80% DOD)",
      "العمر الافتراضي: ضمان 5 سنوات، عمر تصميمي 10 سنوات",
      "ربط التوازي: يدعم ربط حتى 16 بطارية بالتوازي",
      "التقنية: شاشة لمس سريعة وتعدد لغات (إنجليزية، صينية، فرنسية)",
      "نوع الخلايا والـ BMS: خلايا CORNEX CELL + نظام PACE 100A BMS",
      "نوع البطارية: LiFePO4 (ليثيوم فوسفات الحديد)"
    ],
    image: "/solar_bat_100ah.jpg",
    specs: {
      voltage: "48V DC",
      capacity: "100Ah",
      batteryType: "LiFePO4 (CORNEX + PACE 100A)",
      warranty: "ضمان 5 سنوات (عمر تصميمي 10 سنوات)"
    }
  },
  {
    id: "prod-pdf-bat-24v314ah",
    name: "بطارية ليثيوم BATTERY 24V/314Ah (BMF25314)",
    category: "solar_battery",
    categoryAr: "بطاريات ليثيوم 24V",
    brand: "BMF / CORNEX",
    priceEstimate: "1,350,000 د.ع",
    description: "بطارية ليثيوم سعة 24V/314Ah مع كفاءة تفريغ تتجاوز 8000 دورة، دعم Wi-Fi و Bluetooth وشاشة لمس سريعة، خلايا CORNEX ونظام PACE 200A BMS.",
    features: [
      "السعة والجهد: 24V / 314Ah",
      "عدد دورات التفريغ: >8000 دورة (25°C, 0.2C, 80% DOD)",
      "العمر الافتراضي: ضمان 5 سنوات، عمر تصميمي 10 سنوات",
      "ربط التوازي: يدعم ربط حتى 16 بطارية بالتوازي",
      "التقنية والاتصال: مزودة بـ Wi-Fi & Bluetooth وشاشة لمس سريعة",
      "اللغات: دعم العربية، الإنجليزية، الصينية، والفرنسية",
      "نوع الخلايا والـ BMS: خلايا CORNEX CELL + نظام PACE 200A BMS",
      "نوع البطارية: LiFePO4 (ليثيوم فوسفات الحديد)"
    ],
    image: "/solar_bat_314ah.jpg",
    specs: {
      voltage: "24V DC",
      capacity: "314Ah",
      batteryType: "LiFePO4 (CORNEX + PACE 200A)",
      warranty: "ضمان 5 سنوات (عمر تصميمي 10 سنوات)"
    }
  },
  {
    id: "prod-pdf-bat-24v205ah",
    name: "بطارية ليثيوم BATTERY 24V/205Ah (FBP25205)",
    category: "solar_battery",
    categoryAr: "بطاريات ليثيوم 24V",
    brand: "FBP / NETC",
    priceEstimate: "1,000,000 د.ع",
    description: "بطارية ليثيوم سعة 24V/205Ah مع خلايا NETC CELL ونظام حماية PACE 200A BMS، يدعم الربط بالتوازي حتى 16 وحدة وتطبيق Bluetooth/Wi-Fi وشاشة لمس.",
    features: [
      "السعة والجهد: 24V / 205Ah",
      "عدد دورات التفريغ: >6000 دورة (25°C, 0.2C, 80% DOD)",
      "العمر الافتراضي: ضمان 5 سنوات، عمر تصميمي 10 سنوات",
      "ربط التوازي: يدعم ربط حتى 16 بطارية بالتوازي",
      "التقنية والاتصال: مزودة بـ Wi-Fi & Bluetooth وشاشة لمس سريعة",
      "نوع الخلايا والـ BMS: خلايا NETC CELL + نظام PACE 200A BMS",
      "نوع البطارية: LiFePO4 (ليثيوم فوسفات الحديد)"
    ],
    image: "/svc_battery.jpg",
    specs: {
      voltage: "24V DC",
      capacity: "205Ah",
      batteryType: "LiFePO4 (NETC + PACE 200A)",
      warranty: "ضمان 5 سنوات (عمر تصميمي 10 سنوات)"
    }
  },
  {
    id: "prod-pdf-allinone-bat-5kwh",
    name: "منظومة الكل في واحد All in One Battery 5KWH (RPS48-100)",
    category: "solar_battery",
    categoryAr: "منظومة All in One",
    brand: "RPS / All in One",
    priceEstimate: "950,000 د.ع",
    description: "منظومة بطارية ليثيوم مدمجة All in One بسعة 5KWH (48V/100Ah)، زمن تحويل سريع 10ms، ودعم متعدد اللغات لسهولة التشغيل والاستخدام.",
    features: [
      "النوع: All in One Battery System (5KWH)",
      "السعة والجهد: 48V / 100Ah",
      "زمن التحويل (Transfer Time): 10ms استجابة فورية",
      "دعم اللغات: الإنجليزية، الصينية، والفرنسية",
      "نوع البطارية: LiFePO4 (ليثيوم فوسفات الحديد)"
    ],
    image: "/solar_bat_100ah.jpg",
    specs: {
      voltage: "48V DC",
      capacity: "100Ah (5KWH)",
      batteryType: "LiFePO4 All in One",
      warranty: "ضمان الوكيل وتجهيز مباشر"
    }
  },
  {
    id: "prod-pdf-allinone-inv-5kva",
    name: "إنفيرتر متكامل All in One 5KVA Inverter (RPS5KV 48VDC)",
    category: "solar_inverter",
    categoryAr: "إنفيرترات All in One",
    brand: "RPS / All in One",
    priceEstimate: "800,000 د.ع",
    description: "إنفيرتر متكامل All in One بقدرة 5KVA لنظام 48VDC، مع زمن تحويل 10ms أوتوماتيكي بدون انقطاع للتيار، وشاشة تحكم متعددة اللغات.",
    features: [
      "النوع: All in One 5KVA Inverter",
      "الجهد التشغيلي: 48VDC",
      "زمن التحويل (Transfer Time): 10ms لا تؤثر على الأجهزة الحساسة",
      "واجهة التحكم: متعددة اللغات (إنجليزية، صينية، فرنسية)"
    ],
    image: "/svc_inverter.jpg",
    specs: {
      powerKW: "5 KVA (48VDC)",
      voltage: "48VDC / 220VAC",
      warranty: "ضمان حقيقي وصيانة محلية"
    }
  },
  {
    id: "prod-pdf-inv-11kva",
    name: "إنفيرتر هجين INVERTER 11KVA (phoenix 11P)",
    category: "solar_inverter",
    categoryAr: "إنفيرترات phoenix",
    brand: "phoenix",
    priceEstimate: "920,000 د.ع",
    description: "إنفيرتر هجين بقدرة 11KVA (11000W) مع خاصية التوصيل بالتوازي (Parallel Function)، يعمل بدون بطارية في النهار وموجة جيبية نقية PURE SINE WAVE.",
    features: [
      "القدرة الحقيقية: 11KVA / 11,000 Watt",
      "ميزة التوازي (Parallel Function): يدعم الربط بالتوازي لزيادة القدرة",
      "النظام: Off-Grid Solar Inverter",
      "موجة الخرج: Pure Sine Wave Output (تشغيل مباشر بدون بطارية)",
      "زمن التحويل (Transfer Time): 10ms"
    ],
    image: "/solar_inv_phoenix.jpg",
    specs: {
      powerKW: "11 KVA (11,000W)",
      voltage: "Pure Sine Wave / Off-Grid",
      warranty: "ضمان الوكيل وصيانة متوفرة"
    }
  },
  {
    id: "prod-pdf-inv-6-2kva",
    name: "إنفيرتر هجين INVERTER 6.2KVA (phoenix 6.2P)",
    category: "solar_inverter",
    categoryAr: "إنفيرترات phoenix",
    brand: "phoenix",
    priceEstimate: "600,000 د.ع",
    description: "إنفيرتر هجين بقدرة 6.2KVA (6200W)، موجة جيبية نقية Pure Sine Wave، يعمل بدون بطاريات أثناء سطوع الشمس وبزمن تحويل 10ms.",
    features: [
      "القدرة الحقيقية: 6.2KVA / 6,200 Watt",
      "النظام: Off-Grid Solar Inverter",
      "موجة الخرج: Pure Sine Wave Output (تشغيل بدون بطارية)",
      "زمن التحويل (Transfer Time): 10ms"
    ],
    image: "/solar_inv_phoenix.jpg",
    specs: {
      powerKW: "6.2 KVA (6,200W)",
      voltage: "Pure Sine Wave / Off-Grid",
      warranty: "ضمان حقيقي من بوابة الغد"
    }
  },
  {
    id: "prod-pdf-inv-3-5kva",
    name: "إنفيرتر هجين INVERTER 3.5KVA (phoenix 3.5/24V)",
    category: "solar_inverter",
    categoryAr: "إنفيرترات phoenix",
    brand: "phoenix",
    priceEstimate: "410,000 د.ع",
    description: "إنفيرتر هجين بقدرة 3.5KVA (3500W) لنظام 24V، موجة جيبية نقية Pure Sine Wave، يعمل بدون بطاريات في أوقات الشمس وزمن تحويل 10ms.",
    features: [
      "القدرة الحقيقية: 3.5KVA / 3,500 Watt (24V)",
      "النظام: Off-Grid Solar Inverter",
      "موجة الخرج: Pure Sine Wave Output (تشغيل بدون بطارية)",
      "زمن التحويل (Transfer Time): 10ms"
    ],
    image: "/solar_inv_phoenix.jpg",
    specs: {
      powerKW: "3.5 KVA (3,500W / 24V)",
      voltage: "24VDC / 220VAC Pure Sine",
      warranty: "ضمان وصيانة سريعة"
    }
  },
  {
    id: "prod-pdf-inv-1-2kva",
    name: "إنفيرتر هجين INVERTER 1.2KVA (1.2/12V)",
    category: "solar_inverter",
    categoryAr: "إنفيرترات مدمجة",
    brand: "phoenix",
    priceEstimate: "260,000 د.ع",
    description: "إنفيرتر هجين مدمج بقدرة 1.2KVA (1200W) لنظام 12V، موجة جيبية نقية Pure Sine Wave، يعمل بدون بطاريات أثناء السطوع وزمن تحويل 10ms.",
    features: [
      "القدرة الحقيقية: 1.2KVA / 1,200 Watt (12V)",
      "النظام: Off-Grid Solar Inverter",
      "موجة الخرج: Pure Sine Wave Output (تشغيل بدون بطارية)",
      "زمن التحويل (Transfer Time): 10ms"
    ],
    image: "/solar_inv_phoenix.jpg",
    specs: {
      powerKW: "1.2 KVA (1,200W / 12V)",
      voltage: "12VDC / 220VAC Pure Sine",
      warranty: "ضمان حقيقي"
    }
  },
  {
    id: "prod-pdf-wifi-key",
    name: "مفتاح واي فاي ذكي WiFi Key للتحكم بالهاتف",
    category: "solar_inverter",
    categoryAr: "ملحقات الطاقة الشمسية",
    brand: "phoenix / All in One",
    priceEstimate: "111,000 د.ع",
    description: "قطعة مفتاح الواي فاي الذكية للربط مع الإنفيرترات، تتيح مراقبة أداء الإنتاج وشحن البطارية والأحمال مباشرة عبر تطبيق الهاتف المحمول.",
    features: [
      "الاتصال: Wi-Fi محلي وعن بعد",
      "التحكم: تطبيق محمول ذكي لمتابعة القراءات والإنتاج لحظياً",
      "التوافق: متوافق مع إنفيرترات phoenix ومجموعات Solar Inverters"
    ],
    image: "/solar_wifi_dongle.jpg",
    specs: {
      voltage: "Wi-Fi Module",
      warranty: "ضمان تشغيلي"
    }
  },
  // --- NETWORKING & FIBER HARDWARE ---
  {
    id: "prod-onu-huawei-eg8145v5",
    name: "جهاز ONU ضوئي هواوي Huawei OptiXstar EG8145V5 Dual Band",
    category: "onu",
    categoryAr: "أجهزة الـ ONU (هواوي)",
    brand: "Huawei (هواوي أصلي)",
    priceEstimate: "متوفر بخصم مميز مع اشتراكات الفايبر الجديدة",
    description: "أحدث أجهزة الـ ONU الضوئية الجيجابت من شركة هواوي العالمية بشريط واي فاي ثنائي النطاق (2.4GHz + 5GHz) ومنافذ Full Gigabit LAN لتغطية ضوئية فائقة.",
    features: [
      "منافذ Full Gigabit Ethernet ثنائية البث الضوئي",
      "يدعم بروتوكول GPON / XPON المعتمد لشبكة الوطني الضوئية",
      "بث واي فاي قوي ثنائي النطاق AC1200 بسرعة فائقة",
      "هيكل أصلي مقاوم لارتفاع الحرارات مع ثبات تام في الاتصال",
      "مؤشرات ضوئية LED تفاعلية لمتابعة إشارة الـ LOS والـ PON"
    ],
    image: "/huawei_eg8145v5.jpg"
  },
  {
    id: "prod-onu-huawei-hg8010h",
    name: "جهاز ONU مدمج هواوي Huawei EchoLife HG8010H",
    category: "onu",
    categoryAr: "أجهزة الـ ONU (هواوي)",
    brand: "Huawei (هواوي)",
    priceEstimate: "متوفر لدى مكتب بوابة الغد",
    description: "جهاز استقبال ضوئي مدمج صغير الحجم من هواوي يُحفظ بسلاسة خلف الراوتر أو على الجدار، مع منفذ إيثرنت جيجابت واستجابة فايبر فائقة.",
    features: [
      "منفذ GPON حاد الاستجابة وسريع التزامن",
      "حجم مدمج وأنيق يستهلك طاقة كهربائية دنيا",
      "مناسب للربط المباشر مع راوترات TP-Link و Deco",
      "متوافق 100% مع شبكات الألياف الضوئية"
    ],
    image: "/huawei_hg8010h.jpg"
  },
  {
    id: "prod-deco-mesh-x20",
    name: "منظومة Mesh TP-Link Deco X20 Wi-Fi 6 الذكية",
    category: "router",
    categoryAr: "راوتر ديكو Deco Mesh",
    brand: "TP-Link Deco",
    priceEstimate: "حوالي 125,000 د.ع (طقم قطعتين)",
    description: "راوتر ديكو الشهير من TP-Link بتكنولوجيا Wi-Fi 6 Mesh. يقضي كلياً على ضعف الشبكة في البيوت والمنازل الكبيرة متعددة الطوابق بشبكة موحدة وبث ثابت.",
    features: [
      "تغطية كاملة وشبكة موحدة باسم ورمز سر واحد لكامل المنزل",
      "سرعات فايبر تصل إلى 1800Mbps بتكنولوجيا Wi-Fi 6",
      "ربط أكثر من 150 جهازاً في نفس الوقت دون أي انخفاض بالسرعة",
      "تنقل سلس ومباشر (Seamless Roaming) بين الطوابق والغرف",
      "تحكم كامل عبر تطبيق TP-Link Deco المكتبي والموبايل"
    ],
    image: "/tplink_deco.jpg"
  },
  {
    id: "prod-tplink-archer-ax23",
    name: "راوتر TP-Link Archer AX23 Wi-Fi 6 الجيجابت",
    category: "router",
    categoryAr: "راوترات TP-Link",
    brand: "TP-Link",
    priceEstimate: "حوالي 65,000 د.ع",
    description: "راوتر TP-Link Archer الجيجابت الاحترافي المزود بـ 4 هوائيات خارجية قوية وتقنية Wi-Fi 6 لمعالجة وتوزيع سرعات الفايبر الضوئي بكفاءة عالية.",
    features: [
      "سرعات جيل سادس فائقة تصل إلى 1.8Gbps",
      "4 هوائيات قوية بمدى إرسال عالي واختراق ممتاز للجدران",
      "منافذ Full Gigabit WAN/LAN متوافقة مع أجهزة الـ ONU",
      "تقنية OFDMA و Beamforming لتركيز الإشارة نحو الأجهزة"
    ],
    image: "/tplink_archer.jpg"
  },
  {
    id: "prod-tplink-archer-c6",
    name: "راوتر TP-Link Archer C6 AC1200 ثنائي النطاق",
    category: "router",
    categoryAr: "راوترات TP-Link",
    brand: "TP-Link",
    priceEstimate: "حوالي 45,000 د.ع",
    description: "الراوتر الأكثر مبيعاً واستقراراً لشبكات الفايبر المنزلي من شركة TP-Link مع 4 هوائيات خارجية وبث مزدوج 2.4GHz + 5GHz.",
    features: [
      "بث مزدوج AC1200 سرعة 867Mbps على تردد 5GHz",
      "4 هوائيات خارجية مع هوائي داخلي إضافي",
      "تقنية MU-MIMO لنقل البيانات لأكثر من جهاز بالتوازي",
      "منفذ WAN جيجابت أصلي لربط جهاز الـ ONU مباشرة"
    ],
    image: "/tplink_archer.jpg"
  },
  {
    id: "prod-booster-1",
    name: "منظومة Mesh Wi-Fi لتغطية المنازل الكبيرة",
    category: "booster",
    categoryAr: "مقويات إشارة",
    brand: "TP-Link Deco",
    priceEstimate: "حوالي 95,000 د.ع",
    description: "الحل النهائي لمشكلة ضعف الواي فاي في البيوت متعددة الطوابق والمساحات الكبيرة.",
    features: [
      "قضاء تام على جميع النقاط الميتة (Dead Zones)",
      "اسم شبكة ورمز سري واحد وموحد لكامل المنزل",
      "التنقل السلس والذكي بين القطع بدون انقطاع البث",
      "تطبيق موبايل متطور للتحكم بالكامل وفلترة المستخدمين"
    ],
    image: "/tplink_deco.jpg"
  }
];

export const faqList = [
  {
    q: "ما هي خدمات مكتب بوابة الغد في ميسان العمارة؟",
    a: "مكتب بوابة الغد هو الموزع والوكيل المعتمد لشبكة إنترنت الوطني الضوئية (FTTH) في ميسان، وبنفس الوقت الوكيل المعتمد لمنظومات الطاقة الشمسية وإنفيرترات وبطاريات الليثيوم من شركة SVC العالمية."
  },
  {
    q: "لماذا تُعد إنفيرترات وبطاريات SVC خياراً ممتازاً للمنازل والمحلات؟",
    a: "تتميز إنفيرترات SVC بالهجينة الكاملة (Pure Sine Wave) التي تعطي كهرباء صافية وآمنة كلياً للأجهزة الحساسة كالمكيفات والإنفرترات والثلاجات، بينما توفر بطاريات الليثيوم LiFePO4 من SVC عمراً تشغيلياً يتجاوز 10-15 سنة وضمان حقيقي 5 سنوات دون هبوط في الشحن."
  },
  {
    q: "ما هو الإنترنت الضوئي (FTTH) ومميزاته؟",
    a: "الإنترنت الضوئي هو تقنية توصيل الإنترنت مباشرة إلى منزلك عبر كابلات الألياف الضوئية المرنة بدلاً من كابلات النحاس التقليدية. يتميز بالسرعات الفائقة التي لا تتأثر بالظروف الجوية، وثبات تام في البنك (Ping) والاتصال، مع سرعة تحميل عالية متزامنة ممتازة للألعاب والبث ومكالمات الفيديو."
  },
  {
    q: "كيف أشترك في خدمة الإنترنت الضوئي أو أطلب منظومة طاقة شمسية SVC؟",
    a: "يمكنك تقديم طلب تفعيل مباشرة من خلال موقعنا الإلكتروني، أو الاتصال بالهاتف (07721617032)، أو زيارة موقع مكتبنا في ميسان - العمارة - سايدين مستشفى الصدر - نهاية الشارع. سيقوم مهندسونا بفحص الموقع وتحديد المنظومة المناسبة فوراً."
  },
  {
    q: "ماذا أفعل عندما يومض ضوء الـ LOS باللون الأحمر في جهاز الـ ONU؟",
    a: "الوميض الأحمر في ضوء LOS يعني أن جهاز الـ ONU لا يستقبل إشارة ضوئية من كابل الألياف الضوئية. ننصحك بالتأكد من أن الكابل الأصفر الرفيع المتصل بالـ ONU غير منثنٍ بشدة أو منقطع. إذا بدا الكابل سليماً، فالانقطاع قد يكون في الكابل الخارجي، يرجى تزويدنا برقمك ليرسل مكتب بوابة الغد فني الصيانة لحل المشكلة فوراً."
  }
];
