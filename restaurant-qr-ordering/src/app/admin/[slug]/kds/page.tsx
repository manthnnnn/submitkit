"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, ChefHat, CheckCircle2, LayoutDashboard, RefreshCw } from "lucide-react";

export default function KitchenDisplaySystem() {
  const params = useParams();
  const slug = params?.slug as string;
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = () => {
    if (!slug) return;
    fetch(`/api/restaurants/${slug}/orders`)
      .then((res) => res.json())
      .then((data) => {
        if(Array.isArray(data)) {
           setOrders(data);
        }
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 3000);
    return () => clearInterval(interval);
  }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    // Optimistic UI update
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
    
    try {
      await fetch(`/api/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch (err) {
      console.error(err);
      fetchOrders(); // Revert on failure
    }
  };

  const markPaid = async (id: string) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, paymentStatus: "PAID", status: "COMPLETED" } : o));
    try {
      await fetch(`/api/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentStatus: "PAID", status: "COMPLETED" }),
      });
    } catch (err) {
      console.error(err);
      fetchOrders();
    }
  };

  const receivedOrders = orders.filter(o => o.status === "RECEIVED");
  const preparingOrders = orders.filter(o => o.status === "PREPARING");
  const readyOrders = orders.filter(o => o.status === "READY");

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#05070a] text-white">
        <RefreshCw className="w-10 h-10 animate-spin text-amber-500" />
      </div>
    );
  }

  const OrderCard = ({ order, onAction, actionLabel, actionIcon: Icon, colorClass, borderClass }: any) => (
    <motion.div 
      layoutId={order.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      className={`bg-[#0B0F19] rounded-2xl p-5 shadow-2xl border ${borderClass} flex flex-col relative overflow-hidden group`}
    >
      <div className="absolute top-0 left-0 w-1 h-full bg-current opacity-50" style={{ color: 'inherit' }}></div>
      <div className="flex justify-between items-start mb-5">
        <div>
          <h3 className="text-2xl font-black text-white tracking-tight">Table {order.tableNumber}</h3>
          <p className="text-[10px] text-slate-500 font-mono mt-1 uppercase tracking-widest">#{order.id.slice(-6)}</p>
        </div>
        <div className="text-right">
          <p className="text-xs font-bold text-slate-400 bg-white/5 px-2 py-1 rounded-md">
            {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      </div>

      <div className="flex-1 space-y-3 mb-6">
        {order.items.map((item: any) => (
          <div key={item.id} className="flex gap-3 items-center">
            <span className="font-black text-white bg-white/10 w-6 h-6 flex items-center justify-center rounded text-xs">{item.quantity}</span>
            <div className="flex-1">
              <p className="font-medium text-slate-200 text-sm leading-tight">{item.menuItem.name}</p>
            </div>
          </div>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onAction(order.id)}
        className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg ${colorClass}`}
      >
        <Icon size={18} />
        {actionLabel}
      </motion.button>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-[#05070a] text-slate-300 p-6 font-sans selection:bg-amber-500/30">
      <header className="flex justify-between items-center mb-8 bg-[#0B0F19] p-5 rounded-3xl border border-white/5 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-rose-600 text-white rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.3)]">
            <LayoutDashboard size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-white tracking-tighter">Kitchen Dashboard</h1>
            <p className="text-xs text-amber-500 uppercase tracking-[0.2em] font-bold mt-1">LuxeBite OS</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right bg-white/5 px-6 py-3 rounded-2xl border border-white/5">
            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1">Today's Revenue</p>
            <p className="text-3xl font-black text-emerald-400 tracking-tight">
              ₹{orders.filter(o => o.paymentStatus === "PAID").reduce((sum, o) => sum + o.totalAmount, 0)}
            </p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-160px)]">
        {/* Column 1: Received */}
        <div className="flex flex-col h-full bg-[#0B0F19]/50 rounded-[2rem] border border-white/5 p-5">
          <div className="flex items-center justify-between mb-5 pb-3 border-b border-white/5">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></span> New Orders
            </h2>
            <span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-xs font-black border border-blue-500/20">{receivedOrders.length}</span>
          </div>
          <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
            <AnimatePresence>
              {receivedOrders.map(order => (
                <OrderCard
                  key={order.id}
                  order={order}
                  borderClass="border-blue-500/30 hover:border-blue-500/50"
                  colorClass="bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/20"
                  actionLabel="Start Preparing"
                  actionIcon={ChefHat}
                  onAction={(id: string) => updateStatus(id, "PREPARING")}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Column 2: Preparing */}
        <div className="flex flex-col h-full bg-[#0B0F19]/50 rounded-[2rem] border border-white/5 p-5">
          <div className="flex items-center justify-between mb-5 pb-3 border-b border-white/5">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.8)] animate-pulse"></span> Preparing
            </h2>
            <span className="bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full text-xs font-black border border-amber-500/20">{preparingOrders.length}</span>
          </div>
          <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
            <AnimatePresence>
              {preparingOrders.map(order => (
                <OrderCard
                  key={order.id}
                  order={order}
                  borderClass="border-amber-500/30 hover:border-amber-500/50"
                  colorClass="bg-amber-500 hover:bg-amber-400 text-slate-900 shadow-amber-500/20"
                  actionLabel="Mark Ready"
                  actionIcon={CheckCircle2}
                  onAction={(id: string) => updateStatus(id, "READY")}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Column 3: Ready for Pickup / Pay */}
        <div className="flex flex-col h-full bg-[#0B0F19]/50 rounded-[2rem] border border-white/5 p-5">
          <div className="flex items-center justify-between mb-5 pb-3 border-b border-white/5">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]"></span> Ready to Serve
            </h2>
            <span className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-xs font-black border border-emerald-500/20">{readyOrders.length}</span>
          </div>
          <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
            <AnimatePresence>
              {readyOrders.map(order => (
                <OrderCard
                  key={order.id}
                  order={order}
                  borderClass="border-emerald-500/30 hover:border-emerald-500/50"
                  colorClass="bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/20"
                  actionLabel="Settle Bill (Paid)"
                  actionIcon={CheckCircle2}
                  onAction={(id: string) => markPaid(id)}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
      `}} />
    </div>
  );
}
