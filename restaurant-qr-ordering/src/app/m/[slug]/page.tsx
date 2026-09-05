"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingBag, Plus, Minus, ChefHat, ArrowLeft, Loader2, Info, Sparkles, 
  BrainCircuit, X, Bell, Flame, Search, Check, Users, SlidersHorizontal, 
  Coffee, Utensils, Droplets, CheckCircle2, HeartHandshake, Wine
} from "lucide-react";
import { useParams } from "next/navigation";

// Macro lookup for dishes
const MACRO_DATA: { [key: string]: { cal: number; protein: number; carbs: number; fat: number; prepTime: string } } = {
  "Paneer Tikka": { cal: 320, protein: 18, carbs: 12, fat: 22, prepTime: "15 min" },
  "Chicken 65": { cal: 380, protein: 28, carbs: 14, fat: 24, prepTime: "18 min" },
  "Butter Chicken": { cal: 490, protein: 32, carbs: 16, fat: 34, prepTime: "20 min" },
  "Dal Makhani": { cal: 340, protein: 14, carbs: 38, fat: 16, prepTime: "15 min" },
  "Garlic Naan": { cal: 210, protein: 6, carbs: 36, fat: 5, prepTime: "8 min" },
  "Tandoori Roti": { cal: 120, protein: 4, carbs: 24, fat: 1, prepTime: "6 min" },
  "Mango Lassi": { cal: 240, protein: 7, carbs: 42, fat: 5, prepTime: "5 min" },
  "Masala Chai": { cal: 95, protein: 3, carbs: 14, fat: 3, prepTime: "4 min" },
};

// Recommended pairings
const PAIRING_DATA: { [key: string]: string } = {
  "Butter Chicken": "Garlic Naan",
  "Dal Makhani": "Tandoori Roti",
  "Paneer Tikka": "Mango Lassi",
  "Chicken 65": "Masala Chai",
};

const DEFAULT_MENU = [
  {
    id: "cat_starters",
    name: "Starters",
    items: [
      { id: "item_pt", name: "Paneer Tikka", description: "Clay oven roasted cottage cheese marinated in spiced yogurt and herbs", price: 280, isVeg: true, image: "/images/paneer_tikka.jpg" },
      { id: "item_c65", name: "Chicken 65", description: "Crispy spiced chicken bites infused with curry leaves and mustard seeds", price: 320, isVeg: false, image: "/images/butter_chicken.jpg" }
    ]
  },
  {
    id: "cat_mains",
    name: "Main Course",
    items: [
      { id: "item_bc", name: "Butter Chicken", description: "Tender chicken simmered in rich creamy tomato and butter gravy", price: 420, isVeg: false, image: "/images/butter_chicken.jpg" },
      { id: "item_dm", name: "Dal Makhani", description: "Slow-cooked black lentils simmered with churned butter and royal spices", price: 340, isVeg: true, image: "/images/paneer_tikka.jpg" }
    ]
  },
  {
    id: "cat_breads",
    name: "Breads",
    items: [
      { id: "item_gn", name: "Garlic Naan", description: "Soft leavened tandoor bread brushed with fresh garlic and melted ghee", price: 60, isVeg: true, image: "/images/garlic_naan.jpg" },
      { id: "item_tr", name: "Tandoori Roti", description: "Traditional whole wheat bread baked in clay tandoor", price: 30, isVeg: true, image: "/images/garlic_naan.jpg" }
    ]
  },
  {
    id: "cat_drinks",
    name: "Beverages",
    items: [
      { id: "item_ml", name: "Mango Lassi", description: "Chilled yogurt drink blended with sweet Alphonso mango pulp", price: 120, isVeg: true, image: "/images/mango_lassi.jpg" },
      { id: "item_mc", name: "Masala Chai", description: "Aromatic slow-brewed Indian tea infused with cardamom and ginger", price: 50, isVeg: true, image: "/images/mango_lassi.jpg" }
    ]
  }
];

export default function MenuPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [categories, setCategories] = useState<any[]>(DEFAULT_MENU);
  const [cart, setCart] = useState<{ [key: string]: any }>({});
  const [table, setTable] = useState("1");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [dietFilter, setDietFilter] = useState<"all" | "veg" | "nonveg">("all");

  // Ambience Theme State
  const [ambience, setAmbience] = useState<"obsidian" | "gold" | "crimson">("obsidian");

  // Waiter Service Bell State
  const [showServiceBell, setShowServiceBell] = useState(false);
  const [serviceAlert, setServiceAlert] = useState<string | null>(null);
  const [cartAlert, setCartAlert] = useState<string | null>(null);

  // Dish Customizer Modal State
  const [customizingItem, setCustomizingItem] = useState<any | null>(null);
  const [itemSpice, setItemSpice] = useState<"Mild" | "Medium" | "Hot">("Medium");
  const [customNotes, setCustomNotes] = useState<string[]>([]);

  // Bill Splitter State (inside Cart)
  const [splitCount, setSplitCount] = useState<number>(1);
  const [tipPercentage, setTipPercentage] = useState<number>(5);

  // AI Taste Matcher State
  const [showAI, setShowAI] = useState(false);
  const [aiStep, setAiStep] = useState(0);
  const [prefSpice, setPrefSpice] = useState(1);
  const [prefHunger, setPrefHunger] = useState(2);
  const [prefVeg, setPrefVeg] = useState(false);
  const [aiRecommendation, setAiRecommendation] = useState<any[]>([]);

  useEffect(() => {
    // Resolve slug reliably
    let targetSlug = slug;
    if (!targetSlug && typeof window !== "undefined") {
      const parts = window.location.pathname.split("/");
      const mIdx = parts.indexOf("m");
      if (mIdx !== -1 && parts[mIdx + 1]) targetSlug = parts[mIdx + 1];
    }
    if (!targetSlug) targetSlug = "spice-lounge";

    let tableNum = "1";
    if (typeof window !== "undefined") {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        tableNum = urlParams.get('table') || localStorage.getItem(`table_${targetSlug}`) || "1";
        localStorage.setItem(`table_${targetSlug}`, tableNum);
      } catch {
        tableNum = "1";
      }
    }
    setTable(tableNum);

    // Fetch live categories from database
    fetch(`/api/restaurants/${targetSlug}/menu`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setCategories(data);
        }
      })
      .catch(() => {});
  }, [slug]);

  // Cart operations
  const addToCart = (item: any, options?: { spice?: string; notes?: string }) => {
    setCartAlert(`Added ${item.name} to order!`);
    setTimeout(() => setCartAlert(null), 2500);

    setCart((prev) => {
      const existing = prev[item.id];
      const noteStr = options?.notes || (options?.spice ? `Spice: ${options.spice}` : "");
      if (existing) {
        return { 
          ...prev, 
          [item.id]: { 
            ...existing, 
            quantity: existing.quantity + 1,
            notes: noteStr || existing.notes
          } 
        };
      }
      return { 
        ...prev, 
        [item.id]: { 
          ...item, 
          quantity: 1, 
          notes: noteStr 
        } 
      };
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => {
      const existing = prev[id];
      if (!existing) return prev;
      const newCart = { ...prev };
      if (existing.quantity > 1) {
        newCart[id] = { ...existing, quantity: existing.quantity - 1 };
      } else {
        delete newCart[id];
      }
      return newCart;
    });
  };

  const cartItems = Object.values(cart);
  const cartSubtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const taxAmount = +(cartSubtotal * 0.05).toFixed(2);
  const tipAmount = +(cartSubtotal * (tipPercentage / 100)).toFixed(2);
  const cartGrandTotal = +(cartSubtotal + taxAmount + tipAmount).toFixed(2);
  const perPersonShare = +(cartGrandTotal / splitCount).toFixed(2);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Total macros for cart
  const cartMacros = useMemo(() => {
    return cartItems.reduce(
      (acc, item) => {
        const m = MACRO_DATA[item.name] || { cal: 250, protein: 10, carbs: 25, fat: 10 };
        return {
          cal: acc.cal + m.cal * item.quantity,
          protein: acc.protein + m.protein * item.quantity,
          carbs: acc.carbs + m.carbs * item.quantity,
          fat: acc.fat + m.fat * item.quantity,
        };
      },
      { cal: 0, protein: 0, carbs: 0, fat: 0 }
    );
  }, [cartItems]);

  const placeOrder = async () => {
    if (cartItems.length === 0) return;
    setSubmitting(true);
    
    try {
      const res = await fetch(`/api/restaurants/${slug}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tableNumber: table,
          items: cartItems.map((i) => ({
            id: i.id,
            price: i.price,
            quantity: i.quantity,
            notes: i.notes || "",
          })),
          totalAmount: cartGrandTotal,
        }),
      });
      
      const data = await res.json();
      if (data.id) {
        setCart({});
        window.location.href = `/m/${slug || "spice-lounge"}/order/${data.id}`;
      }
    } catch (err) {
      console.error(err);
      alert("Failed to place order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Waiter Service Request
  const handleServiceRequest = (reqType: string) => {
    setShowServiceBell(false);
    setServiceAlert(`Service alert: "${reqType}" sent to floor staff for Table ${table}! An attendant is arriving.`);
    setTimeout(() => setServiceAlert(null), 5000);
  };

  // AI Taste Matcher Logic
  const runAiMatcher = () => {
    setAiStep(1);
    setTimeout(() => {
      const allDishes = categories.flatMap((c) => c.items);
      let filtered = allDishes;
      if (prefVeg) {
        filtered = filtered.filter((d) => d.isVeg);
      }
      const shuffled = [...filtered].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, prefHunger === 1 ? 1 : prefHunger === 2 ? 2 : 3);
      setAiRecommendation(selected);
      setAiStep(2);
    }, 1200);
  };

  const addAiComboToCart = () => {
    aiRecommendation.forEach((item) => addToCart(item));
    setShowAI(false);
    setAiStep(0);
  };

  // Filtered categories and items
  const filteredCategories = useMemo(() => {
    return categories
      .map((cat) => {
        const filteredItems = cat.items.filter((item: any) => {
          const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                               (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
          const matchesDiet = dietFilter === "all" ? true : dietFilter === "veg" ? item.isVeg : !item.isVeg;
          const matchesCategory = selectedCategory === "all" || cat.id === selectedCategory;
          return matchesSearch && matchesDiet && matchesCategory;
        });
        return { ...cat, items: filteredItems };
      })
      .filter((cat) => cat.items.length > 0);
  }, [categories, searchQuery, dietFilter, selectedCategory]);



  // Ambience styling tokens
  const bgGlow = ambience === "gold" 
    ? "from-amber-600/15 via-black to-[#0B0F19]" 
    : ambience === "crimson" 
    ? "from-rose-700/15 via-black to-[#0B0F19]" 
    : "from-violet-700/15 via-black to-[#0B0F19]";

  return (
    <div className={`min-h-screen bg-[#0B0F19] text-white pb-36 font-sans relative selection:bg-amber-500/30`}>
      {/* Dynamic Background Glow */}
      <div className={`fixed inset-0 bg-gradient-to-b ${bgGlow} pointer-events-none transition-all duration-700`}></div>

      {/* Service Request Toast Banner */}
      <AnimatePresence>
        {serviceAlert && (
          <motion.div 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="fixed top-20 left-4 right-4 z-50 max-w-md mx-auto bg-emerald-500/90 text-slate-950 font-bold px-4 py-3 rounded-2xl backdrop-blur-md shadow-2xl flex items-center gap-3 border border-emerald-300/40 text-sm"
          >
            <CheckCircle2 size={20} className="flex-shrink-0" />
            <span>{serviceAlert}</span>
          </motion.div>
        )}
        {cartAlert && (
          <motion.div 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="fixed top-20 left-4 right-4 z-50 max-w-md mx-auto bg-amber-500 text-slate-950 font-black px-4 py-3 rounded-2xl shadow-2xl flex items-center justify-between border border-amber-300 text-xs"
          >
            <div className="flex items-center gap-2">
              <ShoppingBag size={18} className="flex-shrink-0 text-slate-950" />
              <span>{cartAlert}</span>
            </div>
            <button 
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="bg-slate-950 text-amber-400 px-3 py-1 rounded-xl text-[11px] font-black uppercase tracking-wider touch-manipulation cursor-pointer"
            >
              View Cart →
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky Header */}
      <header className="bg-[#0B0F19]/90 backdrop-blur-xl sticky top-0 z-30 border-b border-white/10 px-4 py-3.5">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a 
              href="/" 
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            >
              <ArrowLeft size={16} className="text-amber-400" />
            </a>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-black text-lg tracking-tight">Table {table}</h1>
                <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  LuxeBite
                </span>
              </div>
              <p className="text-[11px] text-slate-400">The Spice Lounge • Fine Dining</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Dining Ambience Selector */}
            <div className="hidden sm:flex items-center bg-white/5 p-1 rounded-xl border border-white/10 text-xs">
              <button 
                onClick={() => setAmbience("obsidian")} 
                className={`px-2 py-1 rounded-lg transition-all ${ambience === "obsidian" ? "bg-white/20 text-white font-bold" : "text-slate-400"}`}
                title="Obsidian Mood"
              >
                🌑
              </button>
              <button 
                onClick={() => setAmbience("gold")} 
                className={`px-2 py-1 rounded-lg transition-all ${ambience === "gold" ? "bg-amber-500/30 text-amber-300 font-bold" : "text-slate-400"}`}
                title="Gold Mood"
              >
                ✨
              </button>
              <button 
                onClick={() => setAmbience("crimson")} 
                className={`px-2 py-1 rounded-lg transition-all ${ambience === "crimson" ? "bg-rose-500/30 text-rose-300 font-bold" : "text-slate-400"}`}
                title="Crimson Mood"
              >
                🔥
              </button>
            </div>

            {/* AI Match Button */}
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAI(true)}
              className="flex items-center gap-1.5 bg-gradient-to-r from-violet-600 to-indigo-600 px-3.5 py-2 rounded-xl shadow-[0_0_20px_rgba(124,58,237,0.3)] border border-violet-400/30 text-white text-xs font-black tracking-wide uppercase"
            >
              <Sparkles size={14} className="text-violet-200" />
              <span>AI Match</span>
            </motion.button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="px-4 pt-4 max-w-2xl mx-auto relative z-10 space-y-5">
        
        {/* Search Bar & Dietary Filter */}
        <div className="space-y-3">
          <div className="relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes, ingredients, curries..."
              className="w-full bg-[#131824] border border-white/10 rounded-2xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors shadow-inner"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
                <X size={14} />
              </button>
            )}
          </div>

          {/* Diet Quick Filters */}
          <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 text-xs">
            <div className="flex items-center gap-1.5 bg-[#131824] p-1 rounded-xl border border-white/5">
              <button 
                onClick={() => setDietFilter("all")}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${dietFilter === "all" ? "bg-white/15 text-white" : "text-slate-400 hover:text-white"}`}
              >
                All Dishes
              </button>
              <button 
                onClick={() => setDietFilter("veg")}
                className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${dietFilter === "veg" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "text-slate-400 hover:text-white"}`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Veg Only
              </button>
              <button 
                onClick={() => setDietFilter("nonveg")}
                className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${dietFilter === "nonveg" ? "bg-rose-500/20 text-rose-400 border border-rose-500/30" : "text-slate-400 hover:text-white"}`}
              >
                <span className="w-2 h-2 rounded-full bg-rose-400"></span> Non-Veg
              </button>
            </div>

            {/* Quick Macro Stats Pill */}
            {cartCount > 0 && (
              <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono bg-white/5 px-3 py-1.5 rounded-xl border border-white/5 text-slate-300">
                <span>🔥 {cartMacros.cal} kcal</span>
                <span>•</span>
                <span>💪 {cartMacros.protein}g protein</span>
              </div>
            )}
          </div>

          {/* Category Horizontal Scrolling Tabs */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar py-1 text-xs font-bold">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all border ${
                selectedCategory === "all" 
                  ? "bg-amber-500 text-slate-950 border-amber-400 shadow-sm" 
                  : "bg-white/5 text-slate-400 border-white/5 hover:bg-white/10 hover:text-white"
              }`}
            >
              🍽️ Full Menu
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all border ${
                  selectedCategory === cat.id 
                    ? "bg-amber-500 text-slate-950 border-amber-400 shadow-sm" 
                    : "bg-white/5 text-slate-400 border-white/5 hover:bg-white/10 hover:text-white"
                }`}
              >
                {cat.name === "Starters" ? "🍢 Starters" : 
                 cat.name === "Main Course" ? "🍛 Main Course" : 
                 cat.name === "Breads" ? "🫓 Breads" : 
                 cat.name === "Beverages" ? "🍹 Beverages" : cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items List */}
        {filteredCategories.length === 0 ? (
          <div className="py-16 text-center text-slate-400 space-y-2">
            <Utensils size={32} className="mx-auto text-slate-600 mb-2" />
            <p className="font-bold">No dishes match your filters.</p>
            <button 
              onClick={() => { setSearchQuery(""); setDietFilter("all"); setSelectedCategory("all"); }}
              className="text-xs text-amber-500 underline"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          filteredCategories.map((cat) => (
            <section key={cat.id} className="space-y-4">
              <div className="flex items-center justify-between pt-2">
                <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
                  <span>{cat.name}</span>
                  <span className="text-xs font-normal text-slate-500 font-mono">({cat.items.length})</span>
                </h2>
                <div className="h-px flex-1 ml-4 bg-gradient-to-r from-white/10 to-transparent"></div>
              </div>

              <div className="space-y-4">
                {cat.items.map((item: any) => {
                  const macros = MACRO_DATA[item.name] || { cal: 280, protein: 12, carbs: 20, fat: 12, prepTime: "15 min" };
                  const pairing = PAIRING_DATA[item.name];

                  return (
                    <div
                      key={item.id}
                      onClick={() => {
                        setCustomizingItem(item);
                        setItemSpice("Medium");
                        setCustomNotes([]);
                      }}
                      className="bg-[#131824] rounded-3xl p-4 border border-white/10 flex flex-col sm:flex-row gap-4 relative overflow-hidden group shadow-lg hover:border-amber-500/30 transition-all cursor-pointer touch-manipulation active:scale-[0.99]"
                    >
                      {/* Dish Image */}
                      <div className="w-full sm:w-32 h-36 sm:h-32 rounded-2xl overflow-hidden bg-[#0B0F19] relative flex-shrink-0">
                        {item.image ? (
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ChefHat className="text-white/10" size={36} />
                          </div>
                        )}
                        
                        {/* Veg/Non-Veg Tag */}
                        <div className="absolute top-2.5 left-2.5 bg-black/70 backdrop-blur-md rounded-lg px-2 py-1 flex items-center gap-1.5 border border-white/15">
                          <span className={`w-2 h-2 rounded-full ${item.isVeg ? 'bg-emerald-400' : 'bg-rose-500'}`}></span>
                          <span className="text-[10px] font-bold uppercase">{item.isVeg ? 'Veg' : 'Non-Veg'}</span>
                        </div>

                        {/* Prep time badge */}
                        <div className="absolute bottom-2.5 right-2.5 bg-black/70 backdrop-blur-md rounded-lg px-2 py-0.5 text-[10px] text-slate-300 font-mono border border-white/10">
                          ⏱ {macros.prepTime}
                        </div>
                      </div>

                      {/* Content & Interactive Actions */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h3 className="font-bold text-lg text-white group-hover:text-amber-400 transition-colors">
                              {item.name}
                            </h3>
                            <p className="font-black text-amber-500 text-lg whitespace-nowrap">₹{item.price}</p>
                          </div>
                          
                          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3">
                            {item.description}
                          </p>

                          {/* Nutrition Macro Pills */}
                          <div className="flex flex-wrap gap-2 text-[10px] text-slate-400 font-mono mb-3">
                            <span className="bg-white/5 px-2 py-0.5 rounded-md">⚡ {macros.cal} kcal</span>
                            <span className="bg-white/5 px-2 py-0.5 rounded-md">🥩 {macros.protein}g protein</span>
                            <span className="bg-white/5 px-2 py-0.5 rounded-md">🌾 {macros.carbs}g carbs</span>
                          </div>

                          {/* Suggested Pairing Chip */}
                          {pairing && (
                            <div className="inline-flex items-center gap-1 text-[11px] text-violet-300 bg-violet-500/10 border border-violet-500/20 px-2.5 py-1 rounded-lg mb-2">
                              <Wine size={12} className="text-violet-400" />
                              <span>Chef recommends pairing with <strong>{pairing}</strong></span>
                            </div>
                          )}
                        </div>

                        {/* Bottom Actions: Customization & Add */}
                        <div className="flex items-center justify-between pt-2 border-t border-white/5 mt-1">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setCustomizingItem(item);
                              setItemSpice("Medium");
                              setCustomNotes([]);
                            }}
                            className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-bold transition-colors touch-manipulation cursor-pointer py-1"
                          >
                            <SlidersHorizontal size={13} /> Customize
                          </button>

                          <div className="w-28">
                            {!cart[item.id] ? (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  addToCart(item);
                                }}
                                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-black py-2.5 rounded-xl text-xs transition-transform active:scale-95 shadow-md flex items-center justify-center gap-1 touch-manipulation cursor-pointer"
                              >
                                <Plus size={15} /> ADD
                              </button>
                            ) : (
                              <div 
                                onClick={(e) => e.stopPropagation()}
                                className="w-full bg-amber-500 text-slate-950 font-black py-1.5 rounded-xl flex items-center justify-between px-2 text-xs shadow-md touch-manipulation"
                              >
                                <button 
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeFromCart(item.id);
                                  }} 
                                  className="p-1 hover:bg-black/15 active:scale-90 rounded-md touch-manipulation cursor-pointer"
                                >
                                  <Minus size={14}/>
                                </button>
                                <span className="font-mono text-sm">{cart[item.id].quantity}</span>
                                <button 
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    addToCart(item);
                                  }} 
                                  className="p-1 hover:bg-black/15 active:scale-90 rounded-md touch-manipulation cursor-pointer"
                                >
                                  <Plus size={14}/>
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))
        )}
      </main>

      {/* Floating Waiter Call Service Bell Button (Bottom Left) */}
      {/* Floating Waiter Call Service Bell Button */}
      <div className={`fixed ${cartCount > 0 ? 'bottom-24' : 'bottom-6'} left-4 z-40 transition-all duration-300`}>
        <button
          type="button"
          onClick={() => setShowServiceBell(true)}
          className="w-13 h-13 sm:w-14 sm:h-14 bg-gradient-to-br from-amber-500 to-rose-600 rounded-full shadow-[0_10px_30px_rgba(245,158,11,0.5)] flex items-center justify-center border-2 border-white/20 text-white active:scale-90 transition-transform touch-manipulation cursor-pointer"
          title="Call Floor Waiter"
        >
          <Bell size={22} className="text-white" />
        </button>
      </div>

      {/* Waiter Service Request Modal */}
      <AnimatePresence>
        {showServiceBell && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="bg-[#131824] w-full max-w-sm rounded-3xl border border-white/10 p-6 shadow-2xl relative"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                    <Bell size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white">Call Waiter</h3>
                    <p className="text-xs text-slate-400">Table {table} Instant Requests</p>
                  </div>
                </div>
                <button onClick={() => setShowServiceBell(false)} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white">
                  <X size={16} />
                </button>
              </div>

              <div className="space-y-2.5 my-4">
                {[
                  { label: "Refill Drinking Water", icon: <Droplets size={16} className="text-blue-400"/> },
                  { label: "Request Extra Cutlery & Napkins", icon: <Utensils size={16} className="text-amber-400"/> },
                  { label: "Clean Table Surface", icon: <Coffee size={16} className="text-emerald-400"/> },
                  { label: "Call Captain to Table", icon: <HeartHandshake size={16} className="text-rose-400"/> },
                  { label: "Request Paper Invoice", icon: <Info size={16} className="text-violet-400"/> },
                ].map((req) => (
                  <button
                    key={req.label}
                    onClick={() => handleServiceRequest(req.label)}
                    className="w-full text-left p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-amber-500/30 flex items-center gap-3 transition-all text-sm font-bold text-slate-200"
                  >
                    {req.icon}
                    <span>{req.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dish Customizer Modal */}
      <AnimatePresence>
        {customizingItem && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="bg-[#131824] w-full max-w-md rounded-3xl border border-white/15 p-6 shadow-2xl relative"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-xl text-white">{customizingItem.name}</h3>
                  <p className="text-xs text-amber-500 font-bold">Customize your preparation</p>
                </div>
                <button onClick={() => setCustomizingItem(null)} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white">
                  <X size={16} />
                </button>
              </div>

              {/* Spice Level Selector */}
              <div className="mb-5">
                <label className="block text-xs uppercase font-bold text-slate-400 tracking-wider mb-2">
                  Select Spice Level
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["Mild", "Medium", "Hot"] as const).map((sp) => (
                    <button
                      key={sp}
                      onClick={() => setItemSpice(sp)}
                      className={`py-2.5 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1 ${
                        itemSpice === sp 
                          ? "bg-amber-500 border-amber-400 text-slate-950 shadow-md" 
                          : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                      }`}
                    >
                      <Flame size={12} className={itemSpice === sp ? "text-slate-950" : "text-amber-500"} />
                      {sp}
                    </button>
                  ))}
                </div>
              </div>

              {/* Special Instructions Chips */}
              <div className="mb-6">
                <label className="block text-xs uppercase font-bold text-slate-400 tracking-wider mb-2">
                  Special Kitchen Instructions
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Less Oil", "Jain Preparation", "No Onion Garlic", 
                    "Extra Crispy", "Serve with Extra Lemon", "Less Salt"
                  ].map((note) => {
                    const isSelected = customNotes.includes(note);
                    return (
                      <button
                        key={note}
                        onClick={() => {
                          if (isSelected) {
                            setCustomNotes(customNotes.filter((n) => n !== note));
                          } else {
                            setCustomNotes([...customNotes, note]);
                          }
                        }}
                        className={`text-xs px-3 py-1.5 rounded-xl border transition-all ${
                          isSelected 
                            ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40 font-bold" 
                            : "bg-white/5 text-slate-400 border-white/5 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        {isSelected && <Check size={12} className="inline mr-1" />}
                        {note}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  const combinedNotes = `Spice: ${itemSpice}${customNotes.length > 0 ? " | " + customNotes.join(", ") : ""}`;
                  addToCart(customizingItem, { notes: combinedNotes, spice: itemSpice });
                  setCustomizingItem(null);
                }}
                className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-rose-600 text-slate-950 font-bold rounded-xl text-sm shadow-lg hover:scale-[1.02] active:scale-95 transition-transform touch-manipulation cursor-pointer"
              >
                Add with Customizations — ₹{customizingItem.price}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Bottom Cart Bar (Bottom Center/Full Width) */}
      <AnimatePresence>
        {cartCount > 0 && !isCartOpen && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-5 left-4 right-4 z-40 max-w-lg mx-auto"
          >
            <button 
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="bg-gradient-to-r from-amber-500 to-rose-600 text-white w-full rounded-2xl shadow-[0_10px_40px_rgba(245,158,11,0.5)] p-3.5 flex items-center justify-between cursor-pointer border border-white/20 active:scale-[0.98] transition-transform touch-manipulation"
            >
              <div className="flex items-center gap-3">
                <div className="relative bg-white/20 p-2.5 rounded-xl">
                  <ShoppingBag size={20} />
                  <span className="absolute -top-1.5 -right-1.5 bg-slate-900 text-amber-400 border border-amber-500/50 text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-white/80 uppercase tracking-widest font-bold">Total Bill</p>
                  <p className="font-black text-lg">₹{cartGrandTotal}</p>
                </div>
              </div>
              <div className="font-bold flex items-center gap-1.5 bg-white/20 px-3.5 py-1.5 rounded-xl text-xs">
                View Cart & Split <ArrowLeft size={14} className="rotate-180"/>
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Cart Sheet with Bill Splitter */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 bg-[#0B0F19] flex flex-col"
          >
            {/* Cart Header */}
            <header className="bg-[#0B0F19] px-4 py-4 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-3">
                <button onClick={() => setIsCartOpen(false)} className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                  <ArrowLeft size={18} className="text-white" />
                </button>
                <div>
                  <h2 className="font-bold text-lg">Your Order</h2>
                  <p className="text-xs text-slate-400">Table {table} • Live Kitchen Dispatch</p>
                </div>
              </div>
              <span className="text-xs font-mono text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 font-bold">
                {cartCount} items
              </span>
            </header>

            {/* Cart Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-4 max-w-2xl mx-auto w-full space-y-6">
              
              {/* Order Items */}
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div key={item.id} className="bg-[#131824] p-4 rounded-2xl border border-white/5 flex justify-between items-center">
                    <div className="flex-1 pr-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`w-2 h-2 rounded-full ${item.isVeg ? 'bg-emerald-400' : 'bg-rose-500'}`}></span>
                        <h4 className="font-bold text-white text-sm">{item.name}</h4>
                      </div>
                      <p className="text-xs text-amber-500 font-bold mb-1">₹{item.price}</p>
                      {item.notes && (
                        <p className="text-[11px] text-slate-400 italic bg-white/5 px-2 py-0.5 rounded inline-block">
                          Note: {item.notes}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 bg-[#0B0F19] border border-white/10 rounded-xl px-2 py-1 text-xs">
                        <button onClick={() => removeFromCart(item.id)} className="text-slate-400 hover:text-white p-1">
                          <Minus size={13}/>
                        </button>
                        <span className="font-bold w-4 text-center">{item.quantity}</span>
                        <button onClick={() => addToCart(item)} className="text-slate-400 hover:text-white p-1">
                          <Plus size={13}/>
                        </button>
                      </div>
                      <p className="font-black text-sm w-16 text-right">₹{item.price * item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Group Bill Splitter Module */}
              <div className="bg-[#131824] p-5 rounded-3xl border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-white flex items-center gap-2">
                    <Users size={16} className="text-amber-500" /> Split Bill with Friends
                  </h3>
                  <span className="text-xs text-slate-400">Equal Table Share</span>
                </div>

                {/* Split Stepper */}
                <div className="flex items-center justify-between bg-[#0B0F19] p-3 rounded-2xl border border-white/5">
                  <span className="text-xs text-slate-300 font-medium">Number of Guests</span>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => setSplitCount(Math.max(1, splitCount - 1))}
                      className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="font-black text-amber-500 text-base w-6 text-center">{splitCount}</span>
                    <button 
                      onClick={() => setSplitCount(splitCount + 1)}
                      className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                {splitCount > 1 && (
                  <div className="p-3 bg-amber-500/10 rounded-2xl border border-amber-500/20 flex items-center justify-between">
                    <span className="text-xs text-amber-300 font-bold">Each Person Pays:</span>
                    <span className="font-black text-xl text-amber-400">₹{perPersonShare}</span>
                  </div>
                )}

                {/* Tip Selector */}
                <div>
                  <label className="block text-[11px] uppercase font-bold text-slate-400 mb-2">Add Waiter Tip</label>
                  <div className="grid grid-cols-4 gap-2 text-xs">
                    {[0, 5, 10, 15].map((tip) => (
                      <button
                        key={tip}
                        onClick={() => setTipPercentage(tip)}
                        className={`py-2 rounded-xl font-bold border transition-all ${
                          tipPercentage === tip 
                            ? "bg-amber-500 text-slate-950 border-amber-400" 
                            : "bg-white/5 text-slate-400 border-white/5 hover:bg-white/10"
                        }`}
                      >
                        {tip === 0 ? "No Tip" : `${tip}%`}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bill Breakdown */}
              <div className="bg-[#131824] p-5 rounded-3xl border border-white/5 space-y-2.5 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Items Subtotal</span>
                  <span>₹{cartSubtotal}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>GST (5%)</span>
                  <span>₹{taxAmount}</span>
                </div>
                {tipPercentage > 0 && (
                  <div className="flex justify-between text-amber-400">
                    <span>Waiter Tip ({tipPercentage}%)</span>
                    <span>₹{tipAmount}</span>
                  </div>
                )}
                <div className="pt-3 border-t border-white/10 flex justify-between font-black text-xl text-white">
                  <span>Grand Total</span>
                  <span className="text-amber-500">₹{cartGrandTotal}</span>
                </div>
              </div>
            </div>

            {/* Place Order CTA */}
            <div className="p-4 bg-[#0B0F19] border-t border-white/10 max-w-2xl mx-auto w-full pb-8">
              <motion.button 
                whileTap={{ scale: 0.98 }}
                onClick={placeOrder}
                disabled={submitting}
                className="w-full bg-gradient-to-r from-amber-500 to-rose-600 text-slate-950 font-black text-base py-4 rounded-2xl shadow-[0_0_30px_rgba(245,158,11,0.3)] disabled:opacity-70 flex justify-center items-center gap-2"
              >
                {submitting ? (
                  <Loader2 className="animate-spin text-slate-950" />
                ) : (
                  <>Send Order to Kitchen (₹{cartGrandTotal}) <ChefHat size={18}/></>
                )}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Taste Matcher Modal */}
      <AnimatePresence>
        {showAI && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="bg-[#131824] w-full max-w-md rounded-3xl border border-violet-500/40 p-6 shadow-[0_0_50px_rgba(124,58,237,0.3)] relative overflow-hidden"
            >
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-violet-600/20 text-violet-400 flex items-center justify-center border border-violet-500/30">
                    <BrainCircuit size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white">AI Taste Sommelier</h3>
                    <p className="text-xs text-violet-300">Flavor Profile Algorithmic Pairing</p>
                  </div>
                </div>
                <button onClick={() => { setShowAI(false); setAiStep(0); }} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white">
                  <X size={16} />
                </button>
              </div>

              {aiStep === 0 && (
                <div className="space-y-5">
                  <p className="text-slate-300 text-xs leading-relaxed">
                    Tell our sommelier algorithm your hunger level and spice cravings to generate a curated dining combination.
                  </p>

                  <div>
                    <label className="block text-[11px] uppercase font-bold text-violet-400 mb-2">Spice Appetite</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Mild 🍃', 'Medium 🌶️', 'Fiery 🔥'].map((lvl, i) => (
                        <button 
                          key={lvl} 
                          onClick={() => setPrefSpice(i + 1)}
                          className={`py-2.5 rounded-xl text-xs font-bold border transition-all ${
                            prefSpice === i + 1 
                              ? 'bg-violet-600 border-violet-400 text-white' 
                              : 'bg-white/5 border-white/10 text-slate-400'
                          }`}
                        >
                          {lvl}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase font-bold text-violet-400 mb-2">Hunger Appetite</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Light Snack', 'Balanced Meal', 'Royal Feast'].map((lvl, i) => (
                        <button 
                          key={lvl} 
                          onClick={() => setPrefHunger(i + 1)}
                          className={`py-2.5 rounded-xl text-xs font-bold border transition-all ${
                            prefHunger === i + 1 
                              ? 'bg-violet-600 border-violet-400 text-white' 
                              : 'bg-white/5 border-white/10 text-slate-400'
                          }`}
                        >
                          {lvl}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase font-bold text-violet-400 mb-2">Dietary Constraint</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button 
                        onClick={() => setPrefVeg(false)}
                        className={`py-2.5 rounded-xl text-xs font-bold border transition-all ${
                          !prefVeg ? 'bg-violet-600 border-violet-400 text-white' : 'bg-white/5 border-white/10 text-slate-400'
                        }`}
                      >
                        Standard
                      </button>
                      <button 
                        onClick={() => setPrefVeg(true)}
                        className={`py-2.5 rounded-xl text-xs font-bold border transition-all ${
                          prefVeg ? 'bg-emerald-600 border-emerald-400 text-white' : 'bg-white/5 border-white/10 text-slate-400'
                        }`}
                      >
                        Pure Veg Only
                      </button>
                    </div>
                  </div>

                  <button 
                    onClick={runAiMatcher}
                    className="w-full py-3.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold rounded-xl text-sm shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
                  >
                    <Sparkles size={16} /> Run Flavor Match Algorithm
                  </button>
                </div>
              )}

              {aiStep === 1 && (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 border-4 border-violet-500/20 border-t-violet-500 rounded-full animate-spin mx-auto"></div>
                  <h4 className="font-bold text-white">Analyzing Flavor Profiles...</h4>
                  <p className="text-xs text-slate-400">Balancing palate heat and chef pairing combinations</p>
                </div>
              )}

              {aiStep === 2 && (
                <div className="space-y-4">
                  <div className="bg-violet-500/10 border border-violet-500/20 p-3 rounded-2xl flex items-center justify-between">
                    <span className="text-xs font-black text-violet-300 flex items-center gap-1.5">
                      <Sparkles size={14} className="text-violet-400" /> 98% Sommelier Match
                    </span>
                    <span className="text-[10px] text-slate-400">Curated Combo</span>
                  </div>

                  <div className="space-y-2.5 max-h-60 overflow-y-auto">
                    {aiRecommendation.map((dish) => (
                      <div key={dish.id} className="bg-white/5 p-3 rounded-2xl border border-white/5 flex items-center gap-3">
                        <img src={dish.image} alt={dish.name} className="w-12 h-12 rounded-xl object-cover" />
                        <div className="flex-1">
                          <p className="font-bold text-sm text-white">{dish.name}</p>
                          <p className="text-xs text-amber-400 font-bold">₹{dish.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={addAiComboToCart}
                    className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-rose-600 text-slate-950 font-black rounded-xl text-sm shadow-lg hover:scale-[1.02] transition-transform"
                  >
                    Add Entire Combo to Cart (₹{aiRecommendation.reduce((s, i) => s + i.price, 0)})
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
