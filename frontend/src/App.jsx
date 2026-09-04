import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TrendingUp,
  CloudRain,
  Sun,
  Mic,
  MicOff,
  Sparkles,
  IndianRupee,
  RefreshCw,
  ShoppingBag,
  ShieldCheck,
  QrCode,
  Volume2,
  Percent,
  Store,
  ArrowUpRight,
  Sliders,
  Plus,
  Trash2,
  Edit3,
  Check,
  X,
  Clock,
  Languages,
  Search,
  Filter,
} from "lucide-react";

const API_BASE = "http://127.0.0.1:8000/api";

const TRANSLATIONS = {
  en: {
    appSubtitle: "Rural & Mandi Spoilage Prevention Digital Twin",
    twinActive: "Digital Twin Synced",
    simulatorTitle: "MARKET CONTEXT SIMULATOR",
    simulatorDesc: "Simulate footfall, rainfall & surge factors in real time",
    tempLabel: "Temp:",
    rainActive: "Monsoon Active (-28% Demand)",
    rainClear: "Weather: Clear",
    normalDay: "Normal Day",
    weekendRush: "Weekend Footfall (+30% Demand)",
    festivalSurge: "Navratri / Festive Surge (+60%)",
    peakEve: "Peak Eve (+90% Surge)",
    projRev: "PROJECTED REVENUE",
    vsIntuition: "+28% vs intuition baseline",
    mandiProc: "MANDI PROCUREMENT",
    optDeploy: "Optimal procurement advice",
    grossProfit: "GROSS PROFIT EST.",
    margin: "Margin",
    wastePrevented: "WASTE PREVENTED",
    wasteSavedToday: "spoilage saved today",
    voiceTitle: "Regional Voice POS Assistant",
    voiceBadge: "Vernacular Speech NLP",
    voiceHint: "Tap mic to record: say '2 kg tomatoes sold 90 rupees'",
    matrixTitle: "AI PROCUREMENT MATRIX",
    matrixSubtitle:
      "Dedicated multi-commodity procurement & perishability control center",
    addCommodity: "+ Add Commodity",
    currentStock: "Current Cart",
    demandForecast: "AI Demand",
    mandiCost: "Mandi Cost",
    retailPrice: "Retail Selling",
    mandiProcure: "Mandi Buy:",
    shelfLife: "shelf",
    highRisk: "High Risk",
    medRisk: "Medium Risk",
    lowRisk: "Low Risk",
    flashDiscountTitle: "DYNAMIC SPOILAGE-FREE DISCOUNT ENGINE",
    flashDiscountDesc:
      "Automated flash sales for short shelf-life produce to eliminate food waste.",
    flashSale: "Flash Sale",
    stockLeft: "Stock Left:",
    expiringToday: "Shelf-life expiring today",
    normalPrice: "Normal",
    posLedgerTitle: "TODAY'S MICRO-TRANSACTION SALES LEDGER",
    posLedgerDesc: "Voice-logged & UPI verified daily sales records",
    quickLog: "+ Quick Log Sale (₹90)",
    orderId: "Order ID",
    item: "Item",
    qty: "Quantity",
    total: "Total",
    paymentMode: "Payment Mode",
    time: "Time",
    addItemTitle: "Add Commodity to Digital Twin",
    itemNameLabel: "Item Name",
    categoryLabel: "Category",
    costLabel: "Mandi Cost (₹/kg)",
    priceLabel: "Retail Price (₹/kg)",
    perishabilityLabel: "Perishability Level",
    shelfLifeLabel: "Shelf Life (Hours)",
    submitAdd: "Add to Matrix",
  },
  hi: {
    appSubtitle: "ग्रामीण मंडी एवं स्ट्रीट वेंडर वेस्ट प्रिवेंशन डिजिटल ट्विन",
    twinActive: "डिजिटल ट्विन सक्रिय",
    simulatorTitle: "मार्केट सिमुलेटर",
    simulatorDesc: "मौसम और त्यौहार के अनुसार लाइव डिमांड का अनुमान लगाएं",
    tempLabel: "तापमान:",
    rainActive: "बारिश चालू (-28% बिक्री)",
    rainClear: "मौसम: साफ",
    normalDay: "सामान्य दिन",
    weekendRush: "वीकेंड भीड़ (+30% मांग)",
    festivalSurge: "त्यौहार की तेजी (+60% मांग)",
    peakEve: "महा-पर्व की पूर्व संध्या (+90% मांग)",
    projRev: "अनुमानित कुल बिक्री (रेवेन्यू)",
    vsIntuition: "पारंपरिक खरीद से +28% अधिक लाभ",
    mandiProc: "मंडी से खरीद लागत",
    optDeploy: "मंडी में सही खरीद सलाह",
    grossProfit: "अनुमानित शुद्ध मुनाफा",
    margin: "मार्जिन",
    wastePrevented: "बचाया गया खराब सामान",
    wasteSavedToday: "का नुकसान होने से बचाया",
    voiceTitle: "आवाज़ से बिक्री दर्ज करें (Voice POS)",
    voiceBadge: "हिन्दी / देशी बोली NLP",
    voiceHint: "माइक दबाकर बोलें: '2 किलो टमाटर बेचा 90 रुपये'",
    matrixTitle: "मंडी खरीद व स्टॉक सलाह मैट्रिक्स",
    matrixSubtitle: "प्रत्येक सब्जी और फल का व्यक्तिगत AI विश्लेषण व खरीद सलाह",
    addCommodity: "+ नई सब्जी / फल जोड़ें",
    currentStock: "दुकान स्टॉक",
    demandForecast: "AI मांग",
    mandiCost: "मंडी भाव",
    retailPrice: "बिक्री भाव",
    mandiProcure: "मंडी से खरीदें:",
    shelfLife: "घंटे टिकेगा",
    highRisk: "जल्दी खराब (High)",
    medRisk: "मध्यम (Medium)",
    lowRisk: "सुरक्षित (Low)",
    flashDiscountTitle: "खराबी से बचाने हेतु फ्लैश डिस्काउंट",
    flashDiscountDesc:
      "सब्जी खराब होने से पहले शाम को छूट देकर पूरा स्टॉक बेचें।",
    flashSale: "फ्लैश सेल",
    stockLeft: "बचा हुआ स्टॉक:",
    expiringToday: "आज ही बेचना जरूरी",
    normalPrice: "साधारण भाव",
    posLedgerTitle: "आज का दैनिक बिक्री खाता (Ledger)",
    posLedgerDesc: "आवाज़ द्वारा दर्ज एवं UPI भुगतान रिकॉर्ड्स",
    quickLog: "+ बिक्री दर्ज करें (₹90)",
    orderId: "ऑर्डर सं.",
    item: "सामान",
    qty: "मात्रा (किलो)",
    total: "कुल राशि",
    paymentMode: "भुगतान प्रकार",
    time: "समय",
    addItemTitle: "डिजिटल ट्विन में नई सब्जी/फल जोड़ें",
    itemNameLabel: "सामग्री का नाम",
    categoryLabel: "श्रेणी",
    costLabel: "मंडी खरीद भाव (₹/kg)",
    priceLabel: "ग्राहक बिक्री भाव (₹/kg)",
    perishabilityLabel: "खराब होने की गति (1-5)",
    shelfLifeLabel: "शेल्फ लाइफ (घंटे)",
    submitAdd: "मैट्रिक्स में जोड़ें",
  },
};

const DEFAULT_ITEMS = [
  {
    id: 1,
    name_en: "Tomatoes",
    name_hi: "टमाटर",
    category: "Vegetables",
    current_stock_kg: 18.0,
    base_demand: 35.0,
    cost_per_kg: 30,
    price_per_kg: 45,
    perishability: 4,
    shelf_life_hrs: 18,
  },
  {
    id: 2,
    name_en: "Potatoes",
    name_hi: "आलू",
    category: "Vegetables",
    current_stock_kg: 45.0,
    base_demand: 50.0,
    cost_per_kg: 18,
    price_per_kg: 28,
    perishability: 1,
    shelf_life_hrs: 120,
  },
  {
    id: 3,
    name_en: "Onions",
    name_hi: "प्याज़",
    category: "Vegetables",
    current_stock_kg: 30.0,
    base_demand: 40.0,
    cost_per_kg: 25,
    price_per_kg: 35,
    perishability: 2,
    shelf_life_hrs: 96,
  },
  {
    id: 4,
    name_en: "Bananas",
    name_hi: "केले",
    category: "Fruits",
    current_stock_kg: 12.0,
    base_demand: 25.0,
    cost_per_kg: 35,
    price_per_kg: 50,
    perishability: 5,
    shelf_life_hrs: 24,
  },
  {
    id: 5,
    name_en: "Coriander & Chilli",
    name_hi: "धनिया-हरी मिर्च",
    category: "Herbs",
    current_stock_kg: 4.0,
    base_demand: 8.0,
    cost_per_kg: 40,
    price_per_kg: 80,
    perishability: 5,
    shelf_life_hrs: 12,
  },
];

export default function App() {
  const [lang, setLang] = useState("en");
  const t = TRANSLATIONS[lang];

  const [temp, setTemp] = useState(32);
  const [isRaining, setIsRaining] = useState(false);
  const [festivalMultiplier, setFestivalMultiplier] = useState(1.3);
  const [loading, setLoading] = useState(false);

  // Filter & Search state for dedicated matrix
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Inventory & Editing
  const [inventory, setInventory] = useState(DEFAULT_ITEMS);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const [showAddModal, setShowAddModal] = useState(false);
  const [newItem, setNewItem] = useState({
    name_en: "",
    name_hi: "",
    category: "Vegetables",
    current_stock_kg: 10,
    cost_per_kg: 20,
    price_per_kg: 30,
    perishability: 3,
    shelf_life_hrs: 36,
  });

  const [forecastItems, setForecastItems] = useState([]);
  const [summary, setSummary] = useState({
    expected_daily_revenue_inr: 0,
    expected_procurement_cost_inr: 0,
    projected_gross_profit_inr: 0,
    prevented_waste_est_kg: 0,
  });

  // Secondary Tools Tab (Flash Pricing & Ledger)
  const [utilityTab, setUtilityTab] = useState("pricing"); // 'pricing' or 'ledger'
  const [discounts, setDiscounts] = useState({});
  const [isListening, setIsListening] = useState(false);
  const [voiceText, setVoiceText] = useState("");
  const [soundboxAlert, setSoundboxAlert] = useState("");
  const [salesLedger, setSalesLedger] = useState([
    {
      id: 104,
      item_en: "Tomatoes",
      item_hi: "टमाटर",
      qty: "2.0 kg",
      amount: 90,
      time: "11:45 AM",
      mode: "UPI",
    },
    {
      id: 103,
      item_en: "Potatoes",
      item_hi: "आलू",
      qty: "5.0 kg",
      amount: 140,
      time: "11:10 AM",
      mode: "Cash",
    },
    {
      id: 102,
      item_en: "Onions",
      item_hi: "प्याज़",
      qty: "3.0 kg",
      amount: 105,
      time: "10:30 AM",
      mode: "UPI",
    },
  ]);

  useEffect(() => {
    setLoading(true);
    const rainModifier = isRaining ? 0.72 : 1.0;
    const festBonus = parseFloat(festivalMultiplier);
    const heatImpact = temp > 35 ? 0.88 : 1.05;

    let totalRev = 0;
    let totalProcCost = 0;
    let totalWasteSaved = 0;

    const computed = inventory.map((item) => {
      const perishFactor = item.perishability >= 4 ? 0.85 : 1.0;
      const calculatedDemand = Math.max(
        2.0,
        Math.round(
          (item.base_demand || item.current_stock_kg * 1.5) *
            festBonus *
            rainModifier *
            heatImpact *
            perishFactor *
            10,
        ) / 10,
      );

      const safetyBuffer = item.perishability >= 4 ? 1.05 : 1.15;
      const targetProcure =
        Math.round(calculatedDemand * safetyBuffer * 10) / 10;
      const neededProcure = Math.max(
        0,
        Math.round((targetProcure - item.current_stock_kg) * 10) / 10,
      );

      const riskLevel =
        (item.perishability >= 4 && isRaining) || item.shelf_life_hrs < 20
          ? "High"
          : item.perishability >= 3
            ? "Medium"
            : "Low";

      const itemRev = calculatedDemand * item.price_per_kg;
      const itemCost = neededProcure * item.cost_per_kg;

      totalRev += itemRev;
      totalProcCost += itemCost;
      if (riskLevel === "High") totalWasteSaved += item.current_stock_kg * 0.25;

      return {
        ...item,
        predicted_sales_kg: calculatedDemand,
        procure_advice_kg: neededProcure,
        waste_risk_level: riskLevel,
        daily_est_revenue: Math.round(itemRev),
        daily_est_cost: Math.round(itemCost),
      };
    });

    setForecastItems(computed);
    setSummary({
      expected_daily_revenue_inr: Math.round(totalRev),
      expected_procurement_cost_inr: Math.round(totalProcCost),
      projected_gross_profit_inr: Math.round(totalRev - totalProcCost),
      prevented_waste_est_kg: Math.round(totalWasteSaved * 10) / 10 || 4.2,
    });

    setTimeout(() => setLoading(false), 120);
  }, [inventory, temp, isRaining, festivalMultiplier]);

  const handleStartEdit = (item) => {
    setEditingId(item.id);
    setEditForm({ ...item });
  };

  const handleSaveEdit = () => {
    setInventory(
      inventory.map((item) =>
        item.id === editingId
          ? {
              ...editForm,
              base_demand:
                Number(editForm.base_demand) ||
                Number(editForm.current_stock_kg) * 1.5,
            }
          : item,
      ),
    );
    setEditingId(null);
  };

  const handleDeleteItem = (id) => {
    if (
      confirm(
        lang === "hi"
          ? "क्या आप इस सामग्री को हटाना चाहते हैं?"
          : "Remove this item?",
      )
    ) {
      setInventory(inventory.filter((item) => item.id !== id));
    }
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItem.name_en.trim() && !newItem.name_hi.trim()) return;
    const itemToAdd = {
      ...newItem,
      id: Date.now(),
      name_en: newItem.name_en || newItem.name_hi,
      name_hi: newItem.name_hi || newItem.name_en,
      current_stock_kg: Number(newItem.current_stock_kg),
      cost_per_kg: Number(newItem.cost_per_kg),
      price_per_kg: Number(newItem.price_per_kg),
      perishability: Number(newItem.perishability),
      shelf_life_hrs: Number(newItem.shelf_life_hrs),
      base_demand: Number(newItem.current_stock_kg) * 1.4,
    };
    setInventory([...inventory, itemToAdd]);
    setNewItem({
      name_en: "",
      name_hi: "",
      category: "Vegetables",
      current_stock_kg: 10,
      cost_per_kg: 20,
      price_per_kg: 30,
      perishability: 3,
      shelf_life_hrs: 36,
    });
    setShowAddModal(false);
  };

  const triggerVoiceLog = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = lang === "hi" ? "hi-IN" : "en-US";
      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onresult = (event) => {
        const text = event.results[0][0].transcript;
        setVoiceText(text);
        const item = inventory[0];
        processNewSale(
          item?.name_en || "Tomatoes",
          item?.name_hi || "टमाटर",
          2.0,
          (item?.price_per_kg || 45) * 2,
          "UPI",
        );
      };
      recognition.start();
    } else {
      setIsListening(true);
      setTimeout(() => {
        setIsListening(false);
        const recognized =
          lang === "hi"
            ? "2 किलो टमाटर बेचा ₹90 UPI"
            : "2 kg tomatoes sold ₹90 UPI";
        setVoiceText(recognized);
        const item = inventory[0];
        processNewSale(
          item?.name_en || "Tomatoes",
          item?.name_hi || "टमाटर",
          2.0,
          90,
          "UPI",
        );
      }, 900);
    }
  };

  const processNewSale = (item_en, item_hi, qty, amount, mode) => {
    const newEntry = {
      id: salesLedger.length + 101,
      item_en: item_en,
      item_hi: item_hi,
      qty: `${qty} kg`,
      amount: amount,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      mode: mode,
    };
    setSalesLedger([newEntry, ...salesLedger]);
    const soundMsg =
      lang === "hi"
        ? `पेटीएम/UPI पर ₹${amount} प्राप्त हुए`
        : `₹${amount} UPI Received`;
    setSoundboxAlert(`🔊 Soundbox: "${soundMsg}"`);
    setTimeout(() => setSoundboxAlert(""), 5000);
  };

  // Filter items for the dedicated matrix
  const filteredItems = forecastItems.filter((item) => {
    const matchesCategory =
      categoryFilter === "All" || item.category === categoryFilter;
    const matchesQuery =
      item.name_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.name_hi.includes(searchQuery);
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="relative min-h-screen">
      {/* 1. SEPARATE FIXED BACKGROUND IMAGE (Zero Scroll Lag) */}
      <div className="parallax-bg-layer" />

      {/* 2. TOP NAVIGATION BAR */}
      <nav className="border-b border-white/70 bg-white/85 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="p-2 rounded-xl shadow-sm border border-emerald-300"
              style={{ backgroundColor: "#B2E4D3" }}
            >
              <Store className="w-5 h-5 text-emerald-950 font-black" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-base tracking-tight text-slate-900">
                  VendorTwin AI
                </h1>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-300 bg-emerald-50 text-emerald-800">
                  Agri-Matrix Live
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                {t.appSubtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang(lang === "hi" ? "en" : "hi")}
              className="flex items-center gap-2 px-3.5 py-1.5 bg-white hover:bg-slate-50 text-xs font-bold rounded-xl border border-slate-300 text-slate-700 transition shadow-sm"
            >
              <Languages className="w-4 h-4 text-emerald-700" />
              <span>
                {lang === "hi"
                  ? "A/अ Switch to English"
                  : "A/अ हिन्दी में बदलें"}
              </span>
            </button>

            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-lg text-xs font-semibold text-emerald-800 shadow-sm">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span>{t.twinActive}</span>
            </div>
          </div>
        </div>
      </nav>

      {/* MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 space-y-8 pb-20">
        {/* 3. MARKET CONTEXT SIMULATOR */}
        <div className="glass-panel rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="p-2.5 rounded-xl border border-emerald-300 shadow-sm"
              style={{ backgroundColor: "#dcfce7" }}
            >
              <Sliders className="w-5 h-5 text-emerald-800" />
            </div>
            <div>
              <div
                className="text-sm font-black uppercase tracking-wider"
                style={{
                  color: "#0f766e",
                  filter: "drop-shadow(0px 1px 1px rgba(255,255,255,0.9))",
                }}
              >
                {t.simulatorTitle}
              </div>
              <div className="text-xs text-slate-600 font-medium">
                {t.simulatorDesc}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-1.5 rounded-xl text-xs shadow-sm">
              <Sun className="w-4 h-4 text-amber-500" />
              <span className="text-slate-500 font-medium">{t.tempLabel}</span>
              <input
                type="number"
                value={temp}
                onChange={(e) => setTemp(Number(e.target.value))}
                className="w-12 bg-slate-50 border border-slate-200 rounded px-1.5 py-0.5 text-center text-slate-800 font-bold"
              />
              <span className="text-slate-500">°C</span>
            </div>

            <button
              onClick={() => setIsRaining(!isRaining)}
              className={`flex items-center gap-2 text-xs font-bold px-3.5 py-2 rounded-xl border transition shadow-sm ${
                isRaining
                  ? "bg-sky-600 border-sky-700 text-white"
                  : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              <CloudRain className="w-4 h-4 text-sky-500" />
              {isRaining ? t.rainActive : t.rainClear}
            </button>

            <select
              value={festivalMultiplier}
              onChange={(e) => setFestivalMultiplier(Number(e.target.value))}
              className="bg-white border border-slate-200 text-xs font-bold rounded-xl px-3 py-2 text-slate-800 outline-none shadow-sm focus:border-emerald-500"
            >
              <option value="1.0">{t.normalDay}</option>
              <option value="1.3">{t.weekendRush}</option>
              <option value="1.6">{t.festivalSurge}</option>
              <option value="1.9">{t.peakEve}</option>
            </select>

            <button
              onClick={() => setLoading(!loading)}
              className="p-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-black rounded-xl transition shadow-md"
              title="Recalculate AI Demand"
            >
              <RefreshCw
                className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
              />
            </button>
          </div>
        </div>

        {/* 4. EXECUTIVE SUMMARY METRICS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-panel rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                {t.projRev}
              </span>
              <span className="p-1.5 bg-emerald-100 text-emerald-800 rounded-lg border border-emerald-200">
                <TrendingUp className="w-4 h-4" />
              </span>
            </div>
            <div className="text-3xl font-black text-emerald-700 mt-2 flex items-center">
              <IndianRupee className="w-6 h-6" />
              {summary.expected_daily_revenue_inr.toLocaleString()}
            </div>
            <div className="mt-2 text-xs text-emerald-800 flex items-center gap-1 font-semibold">
              <ArrowUpRight className="w-3.5 h-3.5" /> {t.vsIntuition}
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                {t.mandiProc}
              </span>
              <span className="p-1.5 bg-violet-100 text-violet-800 rounded-lg border border-violet-200">
                <ShoppingBag className="w-4 h-4" />
              </span>
            </div>
            <div className="text-3xl font-black text-violet-700 mt-2 flex items-center">
              <IndianRupee className="w-6 h-6" />
              {summary.expected_procurement_cost_inr.toLocaleString()}
            </div>
            <div className="mt-2 text-xs text-slate-600 font-medium">
              {t.optDeploy}
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                {t.grossProfit}
              </span>
              <span className="p-1.5 bg-amber-100 text-amber-800 rounded-lg border border-amber-200">
                <Sparkles className="w-4 h-4" />
              </span>
            </div>
            <div className="text-3xl font-black text-amber-700 mt-2 flex items-center">
              <IndianRupee className="w-6 h-6" />
              {summary.projected_gross_profit_inr.toLocaleString()}
            </div>
            <div className="mt-2 text-xs text-amber-800 font-bold">
              {t.margin}:{" "}
              {summary.expected_daily_revenue_inr > 0
                ? Math.round(
                    (summary.projected_gross_profit_inr /
                      summary.expected_daily_revenue_inr) *
                      100,
                  )
                : 0}
              %
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                {t.wastePrevented}
              </span>
              <span className="p-1.5 bg-teal-100 text-teal-800 rounded-lg border border-teal-200">
                <ShieldCheck className="w-4 h-4" />
              </span>
            </div>
            <div className="text-3xl font-black text-teal-700 mt-2 flex items-center gap-1">
              <span>{summary.prevented_waste_est_kg}</span>
              <span className="text-lg font-medium text-slate-500">kg</span>
            </div>
            <div className="mt-2 text-xs text-teal-800 font-medium">
              ~ ₹{(summary.prevented_waste_est_kg * 42).toFixed(0)}{" "}
              {t.wasteSavedToday}
            </div>
          </div>
        </div>

        {/* 5. DEDICATED SEPARATE BLOCK: AI PROCUREMENT MATRIX */}
        <section className="glass-panel rounded-3xl p-6 md:p-8 space-y-6 shadow-md border border-emerald-100">
          {/* Header & Filter Controls */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-slate-200/80">
            <div>
              <div className="flex items-center gap-2">
                <span
                  className="p-1.5 rounded-lg text-white"
                  style={{ backgroundColor: "#0f766e" }}
                >
                  <Sparkles className="w-5 h-5" />
                </span>
                <h2
                  className="text-xl font-black tracking-wide"
                  style={{ color: "#044e47" }}
                >
                  {t.matrixTitle}
                </h2>
                <span
                  className="text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-300"
                  style={{ backgroundColor: "#B2E4D3", color: "#064e3b" }}
                >
                  {filteredItems.length} Commodities
                </span>
              </div>
              <p className="text-xs text-slate-600 font-medium mt-1">
                {t.matrixSubtitle}
              </p>
            </div>

            {/* Quick Actions: Search, Filter & Add */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-48">
                <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  placeholder={lang === "hi" ? "खोजें..." : "Search produce..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-800 outline-none focus:border-emerald-500 shadow-sm"
                />
              </div>

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="bg-white border border-slate-200 text-xs font-bold rounded-xl px-3 py-1.5 text-slate-700 outline-none shadow-sm focus:border-emerald-500"
              >
                <option value="All">All Categories</option>
                <option value="Vegetables">Vegetables</option>
                <option value="Fruits">Fruits</option>
                <option value="Herbs">Herbs</option>
              </select>

              <button
                onClick={() => setShowAddModal(!showAddModal)}
                className="flex items-center gap-1.5 px-4 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-xl transition shadow-md"
              >
                <Plus className="w-4 h-4" />
                {t.addCommodity}
              </button>
            </div>
          </div>

          {/* Modal / Inline Form to Add Produce */}
          {showAddModal && (
            <form
              onSubmit={handleAddItem}
              className="bg-white/95 border border-emerald-300 p-5 rounded-2xl space-y-4 shadow-md"
            >
              <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Plus className="w-4 h-4 text-emerald-700" />
                  {t.addItemTitle}
                </h4>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="text-slate-400 hover:text-slate-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                <div>
                  <label className="text-slate-600 font-semibold block mb-1">
                    {t.itemNameLabel} (English)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Cauliflower"
                    value={newItem.name_en}
                    onChange={(e) =>
                      setNewItem({ ...newItem, name_en: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 outline-none shadow-sm"
                  />
                </div>
                <div>
                  <label className="text-slate-600 font-semibold block mb-1">
                    {t.itemNameLabel} (हिन्दी)
                  </label>
                  <input
                    type="text"
                    placeholder="उदा. गोभी"
                    value={newItem.name_hi}
                    onChange={(e) =>
                      setNewItem({ ...newItem, name_hi: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 outline-none shadow-sm"
                  />
                </div>
                <div>
                  <label className="text-slate-600 font-semibold block mb-1">
                    {t.currentStock} (kg)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    value={newItem.current_stock_kg}
                    onChange={(e) =>
                      setNewItem({
                        ...newItem,
                        current_stock_kg: e.target.value,
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 outline-none shadow-sm"
                  />
                </div>
                <div>
                  <label className="text-slate-600 font-semibold block mb-1">
                    {t.costLabel}
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={newItem.cost_per_kg}
                    onChange={(e) =>
                      setNewItem({ ...newItem, cost_per_kg: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 outline-none shadow-sm"
                  />
                </div>
                <div>
                  <label className="text-slate-600 font-semibold block mb-1">
                    {t.priceLabel}
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={newItem.price_per_kg}
                    onChange={(e) =>
                      setNewItem({ ...newItem, price_per_kg: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 outline-none shadow-sm"
                  />
                </div>
                <div>
                  <label className="text-slate-600 font-semibold block mb-1">
                    {t.perishabilityLabel}
                  </label>
                  <select
                    value={newItem.perishability}
                    onChange={(e) =>
                      setNewItem({
                        ...newItem,
                        perishability: Number(e.target.value),
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 outline-none shadow-sm"
                  >
                    <option value="1">1 - Very Low (Potatoes/Dry)</option>
                    <option value="2">2 - Low (Onions)</option>
                    <option value="3">3 - Medium (Carrots/Beans)</option>
                    <option value="4">4 - High (Tomatoes)</option>
                    <option value="5">5 - Extreme (Leafy Greens)</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-600 font-semibold block mb-1">
                    {t.shelfLifeLabel}
                  </label>
                  <input
                    type="number"
                    min="4"
                    value={newItem.shelf_life_hrs}
                    onChange={(e) =>
                      setNewItem({ ...newItem, shelf_life_hrs: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 outline-none shadow-sm"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-2 rounded-lg transition shadow-sm"
                  >
                    {t.submitAdd}
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* INDIVIDUAL VEGETABLE BOXES GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredItems.map((item) => {
              const isEditing = editingId === item.id;
              const displayName = lang === "hi" ? item.name_hi : item.name_en;
              const displayRisk =
                item.waste_risk_level === "High"
                  ? t.highRisk
                  : item.waste_risk_level === "Medium"
                    ? t.medRisk
                    : t.lowRisk;

              return (
                <div
                  key={item.id}
                  className="veggie-card rounded-2xl p-5 flex flex-col justify-between shadow-sm relative overflow-hidden"
                >
                  {/* Perishability accent color indicator bar on top of the card */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-1 ${
                      item.waste_risk_level === "High"
                        ? "bg-rose-500"
                        : item.waste_risk_level === "Medium"
                          ? "bg-amber-500"
                          : "bg-emerald-500"
                    }`}
                  />

                  <div>
                    {/* Top Row: Title, Category & Actions */}
                    <div className="flex justify-between items-start pt-1">
                      <div>
                        {isEditing ? (
                          <div className="space-y-1 mb-2">
                            <input
                              type="text"
                              value={editForm.name_en}
                              onChange={(e) =>
                                setEditForm({
                                  ...editForm,
                                  name_en: e.target.value,
                                })
                              }
                              placeholder="English name"
                              className="bg-white border border-slate-300 text-xs font-bold text-slate-900 rounded px-2 py-1 w-full"
                            />
                            <input
                              type="text"
                              value={editForm.name_hi}
                              onChange={(e) =>
                                setEditForm({
                                  ...editForm,
                                  name_hi: e.target.value,
                                })
                              }
                              placeholder="हिन्दी नाम"
                              className="bg-white border border-slate-300 text-xs font-bold text-slate-900 rounded px-2 py-1 w-full"
                            />
                          </div>
                        ) : (
                          <h4 className="font-extrabold text-slate-900 text-lg tracking-tight">
                            {displayName}
                          </h4>
                        )}
                        <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                          {item.category}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {isEditing ? (
                          <>
                            <button
                              onClick={handleSaveEdit}
                              className="p-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg shadow-sm"
                              title="Save"
                            >
                              <Check className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="p-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg shadow-sm"
                              title="Cancel"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => handleStartEdit(item)}
                              className="p-1.5 bg-white hover:bg-slate-100 text-slate-600 rounded-lg transition border border-slate-200 shadow-sm"
                              title="Edit Values"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteItem(item.id)}
                              className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg transition border border-rose-200 shadow-sm"
                              title="Delete Commodity"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Middle: Live Market Price Tags */}
                    <div className="mt-3 bg-slate-50/90 p-2.5 rounded-xl border border-slate-200/90 text-xs">
                      {isEditing ? (
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-[10px] text-slate-500 block">
                              {t.mandiCost} (₹)
                            </label>
                            <input
                              type="number"
                              value={editForm.cost_per_kg}
                              onChange={(e) =>
                                setEditForm({
                                  ...editForm,
                                  cost_per_kg: Number(e.target.value),
                                })
                              }
                              className="w-full bg-white border border-slate-300 rounded px-1.5 py-0.5 text-slate-900 font-bold"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] text-slate-500 block">
                              {t.retailPrice} (₹)
                            </label>
                            <input
                              type="number"
                              value={editForm.price_per_kg}
                              onChange={(e) =>
                                setEditForm({
                                  ...editForm,
                                  price_per_kg: Number(e.target.value),
                                })
                              }
                              className="w-full bg-white border border-slate-300 rounded px-1.5 py-0.5 text-slate-900 font-bold"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-between items-center text-slate-700">
                          <span>
                            {t.mandiCost}:{" "}
                            <strong className="text-slate-900">
                              ₹{item.cost_per_kg}
                            </strong>
                          </span>
                          <span>
                            {t.retailPrice}:{" "}
                            <strong className="text-emerald-700 font-bold">
                              ₹{item.price_per_kg}
                            </strong>
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                              item.waste_risk_level === "High"
                                ? "bg-rose-50 text-rose-700 border-rose-200"
                                : item.waste_risk_level === "Medium"
                                  ? "bg-amber-50 text-amber-700 border-amber-200"
                                  : "bg-emerald-50 text-emerald-700 border-emerald-200"
                            }`}
                          >
                            {displayRisk}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Stock vs AI Demand Dual Box */}
                    <div className="mt-3 grid grid-cols-2 gap-2 bg-white p-3 rounded-xl border border-slate-200/90 text-center shadow-inner">
                      <div>
                        <div className="text-[10px] uppercase font-bold text-slate-500">
                          {t.currentStock}
                        </div>
                        <div className="text-lg font-black text-slate-900 mt-0.5">
                          {item.current_stock_kg}{" "}
                          <span className="text-xs font-normal text-slate-500">
                            kg
                          </span>
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase font-bold text-slate-500">
                          {t.demandForecast}
                        </div>
                        <div className="text-lg font-black text-emerald-700 mt-0.5">
                          {item.predicted_sales_kg}{" "}
                          <span className="text-xs font-normal text-slate-500">
                            kg
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom: Shelf-Life & Mandi Procurement Advice */}
                  <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between">
                    <div className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>
                        {item.shelf_life_hrs} {t.shelfLife}
                      </span>
                    </div>
                    <div
                      className="px-3 py-1 rounded-xl border border-emerald-300 shadow-sm flex items-center gap-1"
                      style={{ backgroundColor: "#B2E4D3", color: "#044e47" }}
                    >
                      <span className="text-xs font-bold">
                        {t.mandiProcure}
                      </span>
                      <span className="text-sm font-black">
                        +{item.procure_advice_kg} kg
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 6. SECONDARY MODULES: VOICE POS, FLASH PRICING & TRANSACTION LEDGER */}
        <div className="space-y-6">
          {/* Voice POS Card */}
          <div className="glass-panel rounded-3xl p-6 relative overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <button
                  onClick={triggerVoiceLog}
                  className={`p-5 rounded-2xl transition-all transform active:scale-95 shadow-md ${
                    isListening
                      ? "bg-rose-500 text-white animate-pulse"
                      : "bg-emerald-700 hover:bg-emerald-800 text-white"
                  }`}
                >
                  {isListening ? (
                    <MicOff className="w-7 h-7" />
                  ) : (
                    <Mic className="w-7 h-7" />
                  )}
                </button>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-black text-slate-900">
                      {t.voiceTitle}
                    </h3>
                    <span className="bg-emerald-100 text-emerald-900 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                      {t.voiceBadge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 font-medium">
                    {t.voiceHint}
                  </p>
                  {voiceText && (
                    <div className="mt-2 text-xs font-mono bg-white text-emerald-900 px-3 py-1.5 rounded-lg border border-emerald-300 inline-block font-semibold shadow-sm">
                      🗣️ {lang === "hi" ? "पहचाना गया:" : "Recognized:"} "
                      {voiceText}"
                    </div>
                  )}
                </div>
              </div>

              {soundboxAlert && (
                <div className="bg-white/95 border-2 border-emerald-400 px-4 py-3 rounded-2xl text-emerald-900 text-xs font-black flex items-center gap-2 shadow-md animate-bounce">
                  <Volume2 className="w-5 h-5 shrink-0 text-emerald-700" />
                  <span>{soundboxAlert}</span>
                </div>
              )}
            </div>
          </div>

          {/* Toggle between Flash Pricing and Transaction Ledger */}
          <div className="flex gap-2 border-b border-emerald-900/10 pb-2">
            <button
              onClick={() => setUtilityTab("pricing")}
              className={`px-4 py-2 rounded-xl text-xs font-black transition shadow-sm ${
                utilityTab === "pricing"
                  ? "bg-emerald-800 text-white shadow-md"
                  : "glass-panel text-slate-700 hover:text-emerald-900"
              }`}
            >
              🏷️ {t.flashDiscountTitle}
            </button>
            <button
              onClick={() => setUtilityTab("ledger")}
              className={`px-4 py-2 rounded-xl text-xs font-black transition shadow-sm ${
                utilityTab === "ledger"
                  ? "bg-emerald-800 text-white shadow-md"
                  : "glass-panel text-slate-700 hover:text-emerald-900"
              }`}
            >
              🧾 {t.posLedgerTitle}
            </button>
          </div>

          {utilityTab === "pricing" ? (
            /* Flash Pricing Grid */
            <div className="glass-panel rounded-3xl p-6 space-y-6">
              <div>
                <h3 className="text-lg font-black text-amber-800 flex items-center gap-2">
                  <Percent className="w-5 h-5 text-amber-600" />
                  {t.flashDiscountTitle}
                </h3>
                <p className="text-xs text-slate-600 font-medium mt-0.5">
                  {t.flashDiscountDesc}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {forecastItems
                  .filter(
                    (i) =>
                      i.waste_risk_level === "High" || i.perishability >= 4,
                  )
                  .map((item) => {
                    const discount = discounts[item.id] || 0;
                    const finalPrice = Math.round(
                      item.price_per_kg * (1 - discount / 100),
                    );
                    const name = lang === "hi" ? item.name_hi : item.name_en;

                    return (
                      <div
                        key={item.id}
                        className="glass-panel rounded-2xl p-5 flex flex-col justify-between gap-4 border border-amber-200"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-bold text-slate-900 text-base">
                              {name}
                            </h4>
                            <p className="text-xs text-slate-500 mt-0.5">
                              {t.stockLeft} {item.current_stock_kg} kg |{" "}
                              {t.expiringToday}
                            </p>
                          </div>
                          <span
                            className="text-xs px-2.5 py-1 rounded-full font-bold border border-emerald-300 shadow-sm"
                            style={{
                              backgroundColor: "#B2E4D3",
                              color: "#044e47",
                            }}
                          >
                            {discount}% {t.flashSale}
                          </span>
                        </div>

                        <div className="flex items-center justify-between bg-white/90 p-3 rounded-xl border border-slate-200 shadow-sm">
                          <div>
                            <span className="text-xs text-slate-400 line-through">
                              ₹{item.price_per_kg}/kg
                            </span>
                            <div className="text-xl font-black text-emerald-700">
                              ₹{finalPrice}/kg
                            </div>
                          </div>
                          <div className="flex gap-2">
                            {[0, 10, 20, 30].map((pct) => (
                              <button
                                key={pct}
                                onClick={() =>
                                  setDiscounts({ ...discounts, [item.id]: pct })
                                }
                                className={`text-xs px-2.5 py-1.5 rounded-lg font-bold transition shadow-sm ${
                                  discount === pct
                                    ? "bg-emerald-800 text-white"
                                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                                }`}
                              >
                                {pct === 0 ? t.normalPrice : `-${pct}%`}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          ) : (
            /* Micro-Transaction Sales Ledger */
            <div className="glass-panel rounded-3xl p-6 space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-black text-violet-900 flex items-center gap-2">
                    <QrCode className="w-5 h-5 text-violet-700" />
                    {t.posLedgerTitle}
                  </h3>
                  <p className="text-xs text-slate-600 font-medium">
                    {t.posLedgerDesc}
                  </p>
                </div>
                <button
                  onClick={() =>
                    processNewSale(
                      inventory[0]?.name_en || "Tomatoes",
                      inventory[0]?.name_hi || "टमाटर",
                      2.0,
                      90,
                      "UPI",
                    )
                  }
                  className="bg-emerald-800 hover:bg-emerald-900 text-white px-4 py-2 text-xs font-bold rounded-xl transition shadow-md"
                >
                  {t.quickLog}
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-900">
                  <thead className="bg-white/80 text-slate-600 uppercase font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-3.5">{t.orderId}</th>
                      <th className="p-3.5">{t.item}</th>
                      <th className="p-3.5">{t.qty}</th>
                      <th className="p-3.5">{t.total} (INR)</th>
                      <th className="p-3.5">{t.paymentMode}</th>
                      <th className="p-3.5">{t.time}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200/60 bg-white/60">
                    {salesLedger.map((sale) => (
                      <tr
                        key={sale.id}
                        className="hover:bg-white/90 transition"
                      >
                        <td className="p-3.5 font-mono text-slate-500">
                          #{sale.id}
                        </td>
                        <td className="p-3.5 font-bold text-slate-900">
                          {lang === "hi" ? sale.item_hi : sale.item_en}
                        </td>
                        <td className="p-3.5">{sale.qty}</td>
                        <td className="p-3.5 font-black text-emerald-700">
                          ₹{sale.amount}
                        </td>
                        <td className="p-3.5">
                          <span
                            className="px-2.5 py-0.5 rounded-full text-[10px] font-bold border border-emerald-300 shadow-sm"
                            style={{
                              backgroundColor: "#B2E4D3",
                              color: "#044e47",
                            }}
                          >
                            {sale.mode}
                          </span>
                        </td>
                        <td className="p-3.5 text-slate-500">{sale.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
