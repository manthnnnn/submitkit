"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { CheckCircle2, Clock, ChefHat, ArrowLeft, Loader2, QrCode, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function OrderStatusPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const slug = params?.slug as string;
  const [order, setOrder] = useState<any>(null);

  const fetchOrder = () => {
    if (!id) return;
    // We can still fetch by ID directly since order IDs are unique
    fetch(`/api/orders/${id}`)
      .then((res) => res.json())
      .then((data) => setOrder(data));
  };

  useEffect(() => {
    fetchOrder();
    const interval = setInterval(fetchOrder, 3000);
    return () => clearInterval(interval);
  }, [id]);

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B0F19]">
        <Loader2 className="w-10 h-10 animate-spin text-amber-500" />
      </div>
    );
  }

  const getStatusDisplay = () => {
    switch (order.status) {
      case "RECEIVED": return { icon: <Clock size={40} className="text-blue-400" />, text: "Order Received", desc: "Sent to the kitchen.", bg: "bg-blue-500/10", border: "border-blue-500/20" };
      case "PREPARING": return { icon: <ChefHat size={40} className="text-amber-400" />, text: "Preparing", desc: "Chef is crafting your meal.", bg: "bg-amber-500/10", border: "border-amber-500/20" };
      case "READY": return { icon: <Sparkles size={40} className="text-emerald-400" />, text: "Ready to Serve", desc: "Your food is on its way!", bg: "bg-emerald-500/10", border: "border-emerald-500/20" };
      case "COMPLETED": return { icon: <CheckCircle2 size={40} className="text-slate-400" />, text: "Completed", desc: "Hope you enjoyed your meal!", bg: "bg-white/5", border: "border-white/10" };
      default: return { icon: <Clock size={40} />, text: "Pending", desc: "", bg: "bg-white/5", border: "border-white/10" };
    }
  };

  const status = getStatusDisplay();

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white pb-20">
      <header className="bg-[#0B0F19]/80 backdrop-blur-xl sticky top-0 z-40 border-b border-white/5 px-4 py-5 flex items-center">
        <button onClick={() => router.push(`/m/${slug}`)} className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 mr-4 transition-colors">
          <ArrowLeft size={18} className="text-amber-500" />
        </button>
        <div>
          <h1 className="font-bold text-lg">Order Tracking</h1>
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">#{order.id.slice(-6).toUpperCase()}</p>
        </div>
      </header>

      <main className="px-4 py-8 max-w-xl mx-auto space-y-8">
        <AnimatePresence mode="wait">
          <motion.div 
            key={order.status}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 1.1, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={`${status.bg} rounded-[2rem] p-10 flex flex-col items-center justify-center text-center border ${status.border} shadow-2xl relative overflow-hidden`}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
            
            {order.status === "PREPARING" && (
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 animate-pulse pointer-events-none"></div>
            )}

            <motion.div 
              animate={order.status === "PREPARING" ? { rotate: [0, -10, 10, -10, 0] } : {}}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="bg-[#0B0F19] p-5 rounded-3xl shadow-inner border border-white/5 mb-6 relative z-10"
            >
              {status.icon}
            </motion.div>
            <h2 className="text-3xl font-black text-white mb-2 relative z-10 tracking-tight">{status.text}</h2>
            <p className="text-slate-400 font-medium relative z-10">{status.desc}</p>
          </motion.div>
        </AnimatePresence>

        <div className="bg-white/5 rounded-3xl p-6 border border-white/5 backdrop-blur-sm">
          <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
             <h3 className="font-bold text-white uppercase text-xs tracking-[0.2em]">Order Details</h3>
             <span className="bg-amber-500/20 text-amber-500 px-3 py-1 rounded-full text-xs font-bold border border-amber-500/20">Table {order.tableNumber}</span>
          </div>
          
          <div className="space-y-4">
            {order.items.map((item: any) => (
              <div key={item.id} className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="bg-white/10 text-white w-6 h-6 flex items-center justify-center rounded-md font-bold text-xs">{item.quantity}</span>
                  <span className="text-slate-300 font-medium">{item.menuItem.name}</span>
                </div>
                <span className="font-bold text-white">₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center">
            <span className="text-slate-400 text-sm">Total Amount</span>
            <span className="font-black text-2xl text-amber-500">₹{order.totalAmount}</span>
          </div>
        </div>

        {order.status === "READY" && order.paymentStatus === "PENDING" && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-[#131824] to-[#0B0F19] rounded-3xl p-8 text-center border border-amber-500/30 shadow-[0_0_30px_rgba(245,158,11,0.1)] relative overflow-hidden"
          >
            <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_50%,#f59e0b_100%)] animate-spin-slow opacity-20 pointer-events-none mix-blend-screen"></div>
            <div className="relative z-10">
              <div className="bg-white p-3 inline-block rounded-2xl mb-5 shadow-lg">
                 <QrCode size={64} className="text-[#0B0F19]" />
              </div>
              <h3 className="font-black text-xl mb-2">Scan to Pay</h3>
              <p className="text-slate-400 text-sm mb-6">Complete your payment at the counter.</p>
              <button className="w-full bg-amber-500 text-slate-900 font-black py-4 rounded-xl hover:bg-amber-400 transition-colors shadow-lg">
                Call Waiter
              </button>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
