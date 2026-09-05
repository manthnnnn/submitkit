"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, QrCode, ChefHat, Sparkles, Smartphone, Layers, 
  Database, ShieldCheck, Cpu, Wifi, Info, X, Check, ShoppingBag, Flame, Clock
} from "lucide-react";
import TableQRCode from "./TableQRCode";

interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  spice: "Mild" | "Medium" | "Fiery";
  desc: string;
}

const MENU_ITEMS: MenuItem[] = [
  { id: "1", name: "Murgh Makhani (Butter Chicken)", category: "Mains", price: 340, spice: "Medium", desc: "Charcoal grilled tandoori chicken simmered in velvet cashew-tomato gravy." },
  { id: "2", name: "Paneer Tikka Angara", category: "Starters", price: 260, spice: "Fiery", desc: "Clay-oven smoked cottage cheese marinated in Kashmiri red chilli and mustard oil." },
  { id: "3", name: "Awadhi Dum Biryani", category: "Rice", price: 380, spice: "Medium", desc: "Aged basmati rice sealed with fragrant saffron milk, whole spices, and slow-braised cuts." },
  { id: "4", name: "Truffle Garlic Butter Naan", category: "Breads", price: 110, spice: "Mild", desc: "Leavened flatbread brushed with black truffle butter and roasted garlic." },
  { id: "5", name: "Kesari Mango Kulfi", category: "Desserts", price: 150, spice: "Mild", desc: "Traditional frozen milk delicacy infused with Alphonso mango reduction and pistachios." },
];

export default function QuickBiteDemo() {
  const [selectedTable, setSelectedTable] = useState("1");
  const [activeModal, setActiveModal] = useState<"none" | "guest" | "kds">("none");
  const [cart, setCart] = useState<{ [id: string]: number }>({ "1": 1, "4": 2 });
  const [orderStatus, setOrderStatus] = useState<"cart" | "placed" | "cooking">("cart");

  const origin = typeof window !== "undefined" ? window.location.origin : "https://submitkit-eta.vercel.app";
  const qrTargetUrl = `${origin}/demo/restaurant-qr-ordering?table=${selectedTable}`;

  const addToCart = (id: string) => {
    setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => {
      const next = { ...prev };
      if (next[id] > 1) {
        next[id] -= 1;
      } else {
        delete next[id];
      }
      return next;
    });
  };

  const totalAmount = Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = MENU_ITEMS.find(m => m.id === id);
    return sum + (item ? item.price * qty : 0);
  }, 0);

  const placeOrder = () => {
    setOrderStatus("placed");
    setTimeout(() => {
      setOrderStatus("cooking");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white selection:bg-amber-500/30 overflow-hidden font-sans">
      {/* Dynamic Background Effects */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-violet-600/20 rounded-full mix-blend-screen filter blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-amber-500/10 rounded-full mix-blend-screen filter blur-[120px] pointer-events-none"></div>

      {/* Navigation */}
      <nav className="relative z-20 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-rose-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20">
            <QrCode size={20} className="text-white" />
          </div>
          <span className="font-black tracking-tight text-xl">QuickBite<span className="text-amber-500">.io</span></span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#portals" className="hover:text-white transition-colors">Live Portals</a>
          <a href="#features" className="hover:text-white transition-colors">Key Modules</a>
          <a href="#architecture" className="hover:text-white transition-colors">Tech Architecture</a>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setActiveModal("guest")} 
            className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-5 py-2.5 rounded-full text-sm transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)]"
          >
            Launch Guest Simulator
          </button>
          <button 
            onClick={() => setActiveModal("kds")} 
            className="bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 font-bold px-4 py-2.5 rounded-full text-sm transition-all"
          >
            Kitchen KDS
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 pt-16 pb-24 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-bold uppercase tracking-widest mb-8"
          >
            <Sparkles size={14} /> Full-Stack Engineering Capstone Project
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter leading-[1.15] mb-6 max-w-4xl"
          >
            Smart Contactless Dining & <br />
            <span className="bg-gradient-to-r from-amber-500 via-rose-500 to-violet-500 bg-clip-text text-transparent">
              Kitchen Intelligence System
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-slate-400 font-light max-w-3xl mb-10 leading-relaxed"
          >
            An end-to-end full-stack dining platform engineered with real-time Kitchen Display syncing, algorithmic AI taste matching, table-specific QR dispatching, and dynamic order tracking.
          </motion.p>

          {/* Interactive Live QR Display Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-gradient-to-b from-[#182032] to-[#101624] p-6 sm:p-8 rounded-3xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.5)] max-w-xl w-full mb-16 flex flex-col items-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>
            
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase">LIVE DYNAMIC TABLE QR</span>
            </div>

            {/* Table Selection Pills */}
            <div className="flex items-center gap-2 mb-5 bg-[#0B0F19] p-1.5 rounded-2xl border border-white/5">
              {["1", "2", "4", "7"].map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTable(t)}
                  className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedTable === t 
                      ? "bg-amber-500 text-slate-900 shadow-md shadow-amber-500/30 scale-105" 
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Table {t}
                </button>
              ))}
            </div>

            {/* The Actual Real QR Code */}
            <div className="p-4 bg-white rounded-2xl shadow-2xl border-4 border-slate-800 mb-3 transition-transform hover:scale-105 flex flex-col items-center">
              <TableQRCode url={qrTargetUrl} size={190} />
            </div>

            {/* Encoded URL breakdown */}
            <p className="text-[11px] font-mono text-slate-400 bg-black/40 px-3 py-1 rounded-lg border border-white/5 break-all max-w-sm text-center mb-5">
              {qrTargetUrl}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
              <button 
                onClick={() => setActiveModal("guest")}
                className="w-full sm:flex-1 py-3.5 bg-gradient-to-r from-amber-500 to-rose-600 rounded-xl font-bold text-slate-950 text-sm shadow-[0_0_25px_rgba(245,158,11,0.3)] hover:scale-102 transition-transform flex items-center justify-center gap-2"
              >
                Simulate Scanning Table {selectedTable} <ArrowRight size={16} />
              </button>
              <button 
                onClick={() => setActiveModal("kds")}
                className="w-full sm:w-auto px-5 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-bold text-xs text-slate-300 transition-colors flex items-center justify-center gap-2"
              >
                <ChefHat size={16} /> View Kitchen KDS
              </button>
            </div>
          </motion.div>
        </div>

        {/* Live Interactive Portals Section */}
        <div id="portals" className="max-w-7xl mx-auto px-6 pb-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-black mb-2">Interactive Project Portals</h2>
            <p className="text-slate-400 text-sm">Experience each interconnected module of the system in real time.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Portal 1: Customer Menu */}
            <motion.div 
              whileHover={{ y: -4 }}
              className="bg-[#131824] p-8 rounded-3xl border border-white/10 hover:border-amber-500/50 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 bg-amber-500/20 text-amber-400 rounded-2xl flex items-center justify-center mb-6">
                  <Smartphone size={24} />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-500 bg-amber-500/10 px-2.5 py-1 rounded-md">Customer Portal</span>
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-amber-400 transition-colors">Digital Guest Menu</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Mobile-first contactless ordering with categorized dishes, spice level filters, cart calculation, and instant kitchen dispatch.
                </p>
              </div>
              <button 
                onClick={() => setActiveModal("guest")}
                className="w-full py-3.5 bg-white/5 hover:bg-amber-500 hover:text-slate-900 border border-white/10 hover:border-amber-500 font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2"
              >
                Launch Guest Menu (Table {selectedTable}) <ArrowRight size={16} />
              </button>
            </motion.div>

            {/* Portal 2: Kitchen KDS */}
            <motion.div 
              whileHover={{ y: -4 }}
              className="bg-[#131824] p-8 rounded-3xl border border-white/10 hover:border-rose-500/50 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 bg-rose-500/20 text-rose-400 rounded-2xl flex items-center justify-center mb-6">
                  <ChefHat size={24} />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-rose-500 bg-rose-500/10 px-2.5 py-1 rounded-md">Kitchen Staff Portal</span>
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-rose-400 transition-colors">Kitchen Display System</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Real-time ticket display with automatic state pipelines (Received → Preparing → Ready → Completed) and chef station timers.
                </p>
              </div>
              <button 
                onClick={() => setActiveModal("kds")}
                className="w-full py-3.5 bg-white/5 hover:bg-rose-500 hover:text-white border border-white/10 hover:border-rose-500 font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2"
              >
                Launch Kitchen KDS <ArrowRight size={16} />
              </button>
            </motion.div>
          </div>
        </div>

        {/* Key Modules & Innovations */}
        <div id="features" className="max-w-7xl mx-auto px-6 py-20 border-t border-white/5">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black mb-4">Core Architectural Features</h2>
            <p className="text-slate-400 max-w-xl mx-auto text-sm">Engineered with high fault tolerance, relational schema, and sub-second order dispatching.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#131824] p-6 rounded-2xl border border-white/5">
              <div className="w-10 h-10 bg-violet-500/20 text-violet-400 rounded-xl flex items-center justify-center mb-4">
                <Sparkles size={20} />
              </div>
              <h3 className="font-bold text-lg mb-2">AI Taste Matcher</h3>
              <p className="text-slate-400 text-xs leading-relaxed">Multi-dimensional algorithmic flavor pairing assessing hunger level, spice tolerance, and dietary preferences.</p>
            </div>

            <div className="bg-[#131824] p-6 rounded-2xl border border-white/5">
              <div className="w-10 h-10 bg-amber-500/20 text-amber-400 rounded-xl flex items-center justify-center mb-4">
                <Layers size={20} />
              </div>
              <h3 className="font-bold text-lg mb-2">Live KDS Sync</h3>
              <p className="text-slate-400 text-xs leading-relaxed">Automated kitchen state polling syncing pending orders with stage mutations without page refreshes.</p>
            </div>

            <div className="bg-[#131824] p-6 rounded-2xl border border-white/5">
              <div className="w-10 h-10 bg-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center mb-4">
                <Database size={20} />
              </div>
              <h3 className="font-bold text-lg mb-2">Prisma & Relational DB</h3>
              <p className="text-slate-400 text-xs leading-relaxed">Relational schema handling tables, orders, nested items, and restaurant records with ACID transactions.</p>
            </div>

            <div className="bg-[#131824] p-6 rounded-2xl border border-white/5">
              <div className="w-10 h-10 bg-blue-500/20 text-blue-400 rounded-xl flex items-center justify-center mb-4">
                <ShieldCheck size={20} />
              </div>
              <h3 className="font-bold text-lg mb-2">Zero Dependency QR</h3>
              <p className="text-slate-400 text-xs leading-relaxed">Dynamic vector QR generation ensuring high readability from phone camera sensors even under dim dining light.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Guest Menu Interactive Simulator Modal */}
      <AnimatePresence>
        {activeModal === "guest" && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#101624] border border-white/15 rounded-3xl max-w-lg w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
            >
              {/* Modal Header */}
              <div className="p-4 bg-slate-900 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-bold text-sm text-white">Spice Lounge • Table #{selectedTable}</span>
                </div>
                <button 
                  onClick={() => setActiveModal("none")}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Order Status Banner */}
              {orderStatus !== "cart" && (
                <div className="p-3 bg-emerald-500/20 border-b border-emerald-500/30 flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-emerald-500/30 text-emerald-300 flex items-center justify-center">
                    <Check size={16} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-emerald-300">
                      {orderStatus === "placed" ? "Order Dispatched to Kitchen!" : "🔥 Chef is Cooking your order!"}
                    </div>
                    <div className="text-[10px] text-emerald-400/80">Est. delivery to Table #{selectedTable}: 12 mins</div>
                  </div>
                </div>
              )}

              {/* Menu List */}
              <div className="p-5 overflow-y-auto space-y-3 flex-1">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-400">Chef Specials & Starters</div>
                {MENU_ITEMS.map((item) => {
                  const qty = cart[item.id] || 0;
                  return (
                    <div key={item.id} className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-white">{item.name}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold">{item.spice}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">{item.desc}</p>
                        <div className="text-xs font-bold text-emerald-400 mt-1">₹{item.price}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        {qty > 0 ? (
                          <div className="flex items-center gap-2 bg-amber-500/20 border border-amber-500/40 rounded-xl px-2 py-1">
                            <button onClick={() => removeFromCart(item.id)} className="w-5 h-5 flex items-center justify-center text-amber-300 font-bold">-</button>
                            <span className="text-xs font-bold text-white min-w-[14px] text-center">{qty}</span>
                            <button onClick={() => addToCart(item.id)} className="w-5 h-5 flex items-center justify-center text-amber-300 font-bold">+</button>
                          </div>
                        ) : (
                          <button 
                            onClick={() => addToCart(item.id)}
                            className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-amber-500 hover:text-slate-900 text-xs font-bold transition-colors"
                          >
                            + Add
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Modal Footer / Checkout */}
              <div className="p-4 bg-slate-900/90 border-t border-white/10 flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-slate-400">Total Bill</div>
                  <div className="text-lg font-black text-white font-mono">₹{totalAmount}</div>
                </div>
                <button
                  onClick={placeOrder}
                  disabled={totalAmount === 0 || orderStatus !== "cart"}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 font-bold text-slate-950 text-sm flex items-center gap-2 shadow-lg disabled:opacity-50"
                >
                  <ShoppingBag size={16} />
                  <span>{orderStatus === "cart" ? `Confirm Order (Table ${selectedTable})` : "Order Dispatched"}</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Kitchen KDS Interactive Simulator Modal */}
      <AnimatePresence>
        {activeModal === "kds" && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0c101d] border border-rose-500/30 rounded-3xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden"
            >
              {/* KDS Header */}
              <div className="p-4 bg-slate-900 border-b border-rose-500/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
                    <ChefHat size={18} />
                  </div>
                  <div>
                    <span className="font-bold text-sm text-white">Live Kitchen Display System (KDS)</span>
                    <div className="text-[10px] text-rose-400 font-mono">STATION #1 • HOT PREP & TANDOOR</div>
                  </div>
                </div>
                <button 
                  onClick={() => setActiveModal("none")}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300"
                >
                  <X size={16} />
                </button>
              </div>

              {/* KDS Active Tickets Grid */}
              <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                {/* Ticket 1 */}
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-amber-500/30 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono font-bold text-amber-400">TICKET #104 • TABLE #{selectedTable}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono flex items-center gap-1">
                        <Clock size={10} /> 3m ago
                      </span>
                    </div>
                    <div className="space-y-1.5 text-xs text-slate-200 mt-3">
                      <div className="flex justify-between font-medium"><span>1x Murgh Makhani (Butter Chicken)</span> <span className="text-slate-400">Med</span></div>
                      <div className="flex justify-between font-medium"><span>2x Truffle Garlic Butter Naan</span> <span className="text-slate-400">Crisp</span></div>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[11px] text-amber-400 font-bold uppercase tracking-wider">🔥 In Preparation</span>
                    <button className="px-3 py-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 rounded-lg text-xs font-bold">
                      Mark Ready
                    </button>
                  </div>
                </div>

                {/* Ticket 2 */}
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-emerald-500/30 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono font-bold text-emerald-400">TICKET #103 • TABLE #4</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono flex items-center gap-1">
                        <Clock size={10} /> 8m ago
                      </span>
                    </div>
                    <div className="space-y-1.5 text-xs text-slate-200 mt-3">
                      <div className="flex justify-between font-medium"><span>1x Awadhi Dum Biryani</span> <span className="text-slate-400">Spicy</span></div>
                      <div className="flex justify-between font-medium"><span>1x Kesari Mango Kulfi</span> <span className="text-slate-400">Dessert</span></div>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[11px] text-emerald-400 font-bold uppercase tracking-wider">✅ Ready for Pickup</span>
                    <button className="px-3 py-1 bg-white/10 hover:bg-white/20 text-slate-300 rounded-lg text-xs font-bold">
                      Complete
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
