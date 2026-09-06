"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, QrCode, ChefHat, Sparkles, Smartphone, Layers,
  Database, ShieldCheck, X, Check, ShoppingBag, Clock
} from "lucide-react";
import TableQRCode from "./TableQRCode";

interface MenuItem {
  id: string;
  name: string;
  price: number;
  spice: "Mild" | "Medium" | "Fiery";
  desc: string;
}

const MENU_ITEMS: MenuItem[] = [
  { id: "1", name: "Murgh Makhani (Butter Chicken)", price: 340, spice: "Medium", desc: "Charcoal grilled tandoori chicken simmered in velvet cashew-tomato gravy." },
  { id: "2", name: "Paneer Tikka Angara",            price: 260, spice: "Fiery",  desc: "Clay-oven smoked cottage cheese marinated in Kashmiri red chilli." },
  { id: "3", name: "Awadhi Dum Biryani",             price: 380, spice: "Medium", desc: "Aged basmati rice sealed with saffron milk and slow-braised cuts." },
  { id: "4", name: "Truffle Garlic Butter Naan",     price: 110, spice: "Mild",   desc: "Leavened flatbread brushed with black truffle butter and roasted garlic." },
  { id: "5", name: "Kesari Mango Kulfi",             price: 150, spice: "Mild",   desc: "Traditional frozen milk delicacy with Alphonso mango and pistachios." },
];

type OrderStatus = "cart" | "placed" | "cooking" | "ready";
type KdsStatus   = "preparing" | "ready" | "done";

interface KdsTicket {
  id: string;
  table: string;
  items: { name: string; qty: number }[];
  status: KdsStatus;
  time: string;
}

export default function QuickBiteDemo() {
  const [selectedTable, setSelectedTable] = useState("1");
  const [activeModal, setActiveModal]   = useState<"none" | "guest" | "kds">("none");
  const [cart, setCart]                 = useState<Record<string, number>>({ "1": 1, "4": 2 });
  const [orderStatus, setOrderStatus]   = useState<OrderStatus>("cart");
  const [kdsTickets, setKdsTickets]     = useState<KdsTicket[]>([
    { id: "103", table: "4", items: [{ name: "Awadhi Dum Biryani", qty: 1 }, { name: "Kesari Mango Kulfi", qty: 1 }], status: "ready",    time: "8m ago" },
  ]);

  const origin      = typeof window !== "undefined" ? window.location.origin : "https://submitkit.in";
  const qrTargetUrl = `${origin}/demo/restaurant-qr-ordering?table=${selectedTable}`;

  const addToCart    = (id: string) => setCart(p => ({ ...p, [id]: (p[id] || 0) + 1 }));
  const removeFromCart = (id: string) => setCart(p => {
    const n = { ...p };
    if ((n[id] || 0) > 1) n[id]--; else delete n[id];
    return n;
  });

  const totalAmount = Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = MENU_ITEMS.find(m => m.id === id);
    return sum + (item ? item.price * qty : 0);
  }, 0);

  const resetOrder = () => {
    setCart({});
    setOrderStatus("cart");
  };

  const placeOrder = () => {
    if (totalAmount === 0 || orderStatus !== "cart") return;
    setOrderStatus("placed");

    // Wire cart into KDS
    const orderedItems = Object.entries(cart)
      .map(([id, qty]) => ({ name: MENU_ITEMS.find(m => m.id === id)?.name ?? id, qty }));

    const newTicket: KdsTicket = {
      id:     String(Date.now()).slice(-4),
      table:  selectedTable,
      items:  orderedItems,
      status: "preparing",
      time:   "Just now",
    };
    setKdsTickets(prev => [newTicket, ...prev]);

    setTimeout(() => setOrderStatus("cooking"),  1200);
    setTimeout(() => setOrderStatus("ready"),    4000);
  };

  const advanceTicket = (id: string) => {
    setKdsTickets(prev => prev.map(t => {
      if (t.id !== id) return t;
      const next: KdsStatus = t.status === "preparing" ? "ready" : "done";
      return { ...t, status: next };
    }).filter(t => t.status !== "done"));
  };

  const statusLabel: Record<OrderStatus, string> = {
    cart:    "",
    placed:  "Order Dispatched to Kitchen!",
    cooking: "🔥 Chef is Cooking your order!",
    ready:   "✅ Order Ready — Collect at Table!",
  };

  const kdsColor: Record<KdsStatus, string> = {
    preparing: "#f59e0b",
    ready:     "#10b981",
    done:      "#64748b",
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white font-sans overflow-hidden">
      {/* Ambient glows */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-violet-600/20 rounded-full mix-blend-screen filter blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-amber-500/10 rounded-full mix-blend-screen filter blur-[120px] pointer-events-none" />

      {/* Nav */}
      <nav className="relative z-20 flex items-center justify-between px-6 py-5 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-rose-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20">
            <QrCode size={20} className="text-white" />
          </div>
          <span className="font-black tracking-tight text-xl">QuickBite<span className="text-amber-500">.io</span></span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setActiveModal("guest")} className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-5 py-2.5 rounded-full text-sm transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)]">
            Guest Menu
          </button>
          <button onClick={() => setActiveModal("kds")} className="bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 font-bold px-4 py-2.5 rounded-full text-sm transition-all">
            Kitchen KDS
          </button>
        </div>
      </nav>

      {/* Hero */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-12 pb-24 flex flex-col items-center text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-bold uppercase tracking-widest mb-8">
          <Sparkles size={14} /> Full-Stack Engineering Capstone Project
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter leading-[1.15] mb-6 max-w-4xl">
          Smart Contactless Dining &amp; <br />
          <span className="bg-gradient-to-r from-amber-500 via-rose-500 to-violet-500 bg-clip-text text-transparent">
            Kitchen Intelligence System
          </span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg text-slate-400 max-w-3xl mb-10 leading-relaxed">
          End-to-end dining platform with real-time Kitchen Display syncing, QR dispatching, and live order tracking.
        </motion.p>

        {/* QR Card */}
        <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-gradient-to-b from-[#182032] to-[#101624] p-6 sm:p-8 rounded-3xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.5)] max-w-xl w-full mb-16 flex flex-col items-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase">LIVE DYNAMIC TABLE QR</span>
          </div>

          {/* Table selector */}
          <div className="flex items-center gap-2 mb-5 bg-[#0B0F19] p-1.5 rounded-2xl border border-white/5">
            {["1","2","4","7"].map(t => (
              <button key={t} onClick={() => setSelectedTable(t)}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${selectedTable === t ? "bg-amber-500 text-slate-900 shadow-md shadow-amber-500/30 scale-105" : "text-slate-400 hover:text-white"}`}>
                Table {t}
              </button>
            ))}
          </div>

          <div className="p-4 bg-white rounded-2xl shadow-2xl border-4 border-slate-800 mb-3 hover:scale-105 transition-transform flex flex-col items-center">
            <TableQRCode url={qrTargetUrl} size={190} />
          </div>
          <p className="text-[11px] font-mono text-slate-400 bg-black/40 px-3 py-1 rounded-lg border border-white/5 break-all max-w-sm text-center mb-5">{qrTargetUrl}</p>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
            <button onClick={() => setActiveModal("guest")} className="w-full sm:flex-1 py-3.5 bg-gradient-to-r from-amber-500 to-rose-600 rounded-xl font-bold text-slate-950 text-sm shadow-[0_0_25px_rgba(245,158,11,0.3)] flex items-center justify-center gap-2">
              Simulate Scanning Table {selectedTable} <ArrowRight size={16} />
            </button>
            <button onClick={() => setActiveModal("kds")} className="w-full sm:w-auto px-5 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-bold text-xs text-slate-300 flex items-center justify-center gap-2">
              <ChefHat size={16} /> Kitchen KDS
            </button>
          </div>
        </motion.div>

        {/* Portal cards */}
        <div id="portals" className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full mb-20">
          {[
            { icon: <Smartphone size={24} />, color: "amber", label: "Customer Portal", title: "Digital Guest Menu", desc: "Mobile-first contactless ordering with categorised dishes, spice filters, cart calculation, and instant kitchen dispatch.", action: () => setActiveModal("guest"), btn: `Launch Guest Menu (Table ${selectedTable})` },
            { icon: <ChefHat size={24} />,    color: "rose",  label: "Kitchen Staff Portal", title: "Kitchen Display System", desc: "Real-time ticket display with automatic state pipelines (Received → Preparing → Ready → Completed) and chef station timers.", action: () => setActiveModal("kds"), btn: "Launch Kitchen KDS" },
          ].map(p => (
            <motion.div key={p.title} whileHover={{ y: -4 }} className={`bg-[#131824] p-8 rounded-3xl border border-white/10 hover:border-${p.color}-500/50 transition-all flex flex-col justify-between group`}>
              <div>
                <div className={`w-12 h-12 bg-${p.color}-500/20 text-${p.color}-400 rounded-2xl flex items-center justify-center mb-6`}>{p.icon}</div>
                <span className={`text-[10px] font-black uppercase tracking-widest text-${p.color}-500 bg-${p.color}-500/10 px-2.5 py-1 rounded-md`}>{p.label}</span>
                <h3 className={`text-xl font-bold mb-3 mt-2 group-hover:text-${p.color}-400 transition-colors`}>{p.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">{p.desc}</p>
              </div>
              <button onClick={p.action} className={`w-full py-3.5 bg-white/5 hover:bg-${p.color}-500 hover:text-slate-900 border border-white/10 font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2`}>
                {p.btn} <ArrowRight size={16} />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Features */}
        <div id="features" className="w-full max-w-7xl border-t border-white/5 pt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black mb-2">Core Architectural Features</h2>
            <p className="text-slate-400 text-sm">High fault-tolerance, relational schema, sub-second order dispatching.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: <Sparkles size={20} />, color: "violet", title: "AI Taste Matcher",         body: "Multi-dimensional flavour pairing assessing spice tolerance and dietary preferences." },
              { icon: <Layers size={20} />,   color: "amber",  title: "Live KDS Sync",            body: "Automated kitchen state polling syncing pending orders with stage mutations in real time." },
              { icon: <Database size={20} />, color: "emerald",title: "Prisma & Relational DB",    body: "Relational schema handling tables, orders, nested items, and restaurant records with ACID transactions." },
              { icon: <ShieldCheck size={20}/>,color: "blue",  title: "Zero Dependency QR",       body: "Dynamic vector QR generation ensuring high readability from phone cameras even under dim dining light." },
            ].map(f => (
              <div key={f.title} className="bg-[#131824] p-6 rounded-2xl border border-white/5">
                <div className={`w-10 h-10 bg-${f.color}-500/20 text-${f.color}-400 rounded-xl flex items-center justify-center mb-4`}>{f.icon}</div>
                <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* ── GUEST MENU MODAL ── */}
      <AnimatePresence>
        {activeModal === "guest" && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#101624] border border-white/15 rounded-3xl max-w-lg w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">

              {/* Header */}
              <div className="p-4 bg-slate-900 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-bold text-sm text-white">Spice Lounge • Table #{selectedTable}</span>
                </div>
                <button onClick={() => setActiveModal("none")} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300"><X size={16} /></button>
              </div>

              {/* Status banner */}
              {orderStatus !== "cart" && (
                <div className="p-3 bg-emerald-500/20 border-b border-emerald-500/30 flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-emerald-500/30 text-emerald-300 flex items-center justify-center"><Check size={16} /></div>
                  <div>
                    <div className="text-xs font-bold text-emerald-300">{statusLabel[orderStatus]}</div>
                    <div className="text-[10px] text-emerald-400/80">Est. delivery to Table #{selectedTable}: 12 mins</div>
                  </div>
                </div>
              )}

              {/* Menu list */}
              <div className="p-5 overflow-y-auto space-y-3 flex-1">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">Chef Specials &amp; Starters</div>
                {MENU_ITEMS.map(item => {
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
                          <button onClick={() => addToCart(item.id)} className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-amber-500 hover:text-slate-900 text-xs font-bold transition-colors">+ Add</button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="p-4 bg-slate-900/90 border-t border-white/10 flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-slate-400">Total Bill</div>
                  <div className="text-lg font-black text-white font-mono">₹{totalAmount}</div>
                </div>
                {orderStatus === "cart" ? (
                  <button onClick={placeOrder} disabled={totalAmount === 0}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 font-bold text-slate-950 text-sm flex items-center gap-2 shadow-lg disabled:opacity-50">
                    <ShoppingBag size={16} /><span>Confirm Order (Table {selectedTable})</span>
                  </button>
                ) : (
                  <button onClick={resetOrder} className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 font-bold text-white text-sm flex items-center gap-2">
                    New Order
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── KDS MODAL ── */}
      <AnimatePresence>
        {activeModal === "kds" && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0c101d] border border-rose-500/30 rounded-3xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">

              <div className="p-4 bg-slate-900 border-b border-rose-500/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center"><ChefHat size={18} /></div>
                  <div>
                    <span className="font-bold text-sm text-white">Live Kitchen Display System (KDS)</span>
                    <div className="text-[10px] text-rose-400 font-mono">STATION #1 • HOT PREP &amp; TANDOOR</div>
                  </div>
                </div>
                <button onClick={() => setActiveModal("none")} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300"><X size={16} /></button>
              </div>

              <div className="p-5 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                {kdsTickets.length === 0 && (
                  <div className="col-span-2 flex items-center justify-center text-slate-500 py-12 text-sm">
                    No active tickets — place an order from the Guest Menu to see it here.
                  </div>
                )}
                {kdsTickets.map(ticket => (
                  <div key={ticket.id} className="p-4 rounded-2xl bg-slate-900/90 flex flex-col justify-between"
                    style={{ border: `1px solid ${kdsColor[ticket.status]}40` }}>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono font-bold" style={{ color: kdsColor[ticket.status] }}>
                          TICKET #{ticket.id} • TABLE #{ticket.table}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded font-mono flex items-center gap-1 text-slate-400 bg-slate-800">
                          <Clock size={10} /> {ticket.time}
                        </span>
                      </div>
                      <div className="space-y-1.5 text-xs text-slate-200 mt-3">
                        {ticket.items.map((it, i) => (
                          <div key={i} className="flex justify-between font-medium">
                            <span>{it.qty}x {it.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: kdsColor[ticket.status] }}>
                        {ticket.status === "preparing" ? "🔥 In Preparation" : "✅ Ready for Pickup"}
                      </span>
                      <button onClick={() => advanceTicket(ticket.id)}
                        className="px-3 py-1 rounded-lg text-xs font-bold transition-colors"
                        style={{ background: `${kdsColor[ticket.status]}20`, color: kdsColor[ticket.status], border: `1px solid ${kdsColor[ticket.status]}40` }}>
                        {ticket.status === "preparing" ? "Mark Ready" : "Complete"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
