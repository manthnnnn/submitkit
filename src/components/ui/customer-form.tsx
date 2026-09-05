'use client';
import { useState } from 'react';
import { CONSTANTS } from '@/lib/constants';
import { ShieldCheck, AlertCircle, Phone, Zap } from 'lucide-react';

interface CheckoutFormProps {
  projectId: string;
  price: number;
}

export function CustomerForm({ projectId, price }: CheckoutFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    collegeName: '',
    addPersonalization: false,
    addPlagiarismCert: false,
    addVivaCall: false,
  });

  const totalAmount = price
    + (formData.addPersonalization ? CONSTANTS.PRICING.ADDONS.PERSONALIZATION : 0)
    + (formData.addPlagiarismCert ? CONSTANTS.PRICING.ADDONS.PLAGIARISM_CERT : 0)
    + (formData.addVivaCall ? CONSTANTS.PRICING.ADDONS.VIVA_CALL : 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 1. Create order on our backend
      const res = await fetch('/api/orders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId, ...formData })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to initialize payment. Please try again.');
        setLoading(false);
        return;
      }

      // 2. Open Razorpay Checkout
      const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        name: CONSTANTS.APP_NAME,
        description: `Project Bundle Purchase`,
        order_id: data.razorpayOrderId,
        handler: async function (response: any) {
          try {
            // 3. CRITICAL: Verify payment signature on our server BEFORE redirecting
            const verifyRes = await fetch('/api/orders/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              })
            });

            const verifyData = await verifyRes.json();

            if (!verifyRes.ok || !verifyData.success) {
              setError('Payment verification failed. Please contact support with your payment ID: ' + response.razorpay_payment_id);
              setLoading(false);
              return;
            }

            // 4. Redirect to success page with the verified internal order ID
            const params = new URLSearchParams({
              order_id: verifyData.orderId,
              title: verifyData.projectTitle || 'Your Project Bundle',
            });
            window.location.href = `/order/success?${params.toString()}`;
          } catch (err) {
            setError('An error occurred after payment. Please contact support immediately.');
            setLoading(false);
          }
        },
        prefill: {
          name: formData.customerName,
          email: formData.customerEmail,
          contact: formData.customerPhone
        },
        theme: { color: '#6366f1' }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', function (response: any) {
        setError('Payment failed or was cancelled. Please try again.');
        setLoading(false);
      });
      rzp.open();
    } catch (err) {
      console.error(err);
      setError('An unexpected error occurred. Please refresh the page and try again.');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      {/* Inline Error Banner */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl flex items-start gap-2.5 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <p>{error}</p>
        </div>
      )}

      <div className="space-y-3">
        <input
          required type="text" placeholder="Your Full Name"
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all text-sm"
          value={formData.customerName} onChange={e => setFormData({ ...formData, customerName: e.target.value })}
        />
        <input
          required type="email" placeholder="Email Address (Download link sent here)"
          pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
          title="Please enter a valid email address"
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all text-sm"
          value={formData.customerEmail} onChange={e => setFormData({ ...formData, customerEmail: e.target.value })}
        />
        <div className="relative">
          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            required type="tel" placeholder="10-digit Phone Number"
            pattern="[0-9]{10}"
            title="Please enter a valid 10-digit phone number"
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all text-sm"
            value={formData.customerPhone} onChange={e => setFormData({ ...formData, customerPhone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
          />
        </div>
        <input
          type="text" placeholder="College Name (Optional)"
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all text-sm"
          value={formData.collegeName} onChange={e => setFormData({ ...formData, collegeName: e.target.value })}
        />
      </div>

      {/* Upsell Addons */}
      <div className="space-y-2 pt-2">
        <p className="text-[11px] text-zinc-600 font-medium uppercase tracking-wider px-1">Optional Add-ons</p>

        <label className="flex items-center gap-3 p-3 rounded-xl border border-white/5 bg-white/[0.03] cursor-pointer hover:bg-white/[0.06] transition-all group">
          <input
            type="checkbox" className="w-4 h-4 accent-indigo-500 rounded"
            checked={formData.addPersonalization} onChange={e => setFormData({ ...formData, addPersonalization: e.target.checked })}
          />
          <div className="flex-grow min-w-0">
            <span className="text-white text-xs font-medium block">Add My Name on Front Page</span>
            <span className="text-zinc-500 text-[11px]">We'll type your name & roll no on the cover</span>
          </div>
          <span className="text-emerald-400 text-xs font-bold shrink-0">+₹{CONSTANTS.PRICING.ADDONS.PERSONALIZATION}</span>
        </label>

        <label className="flex items-center gap-3 p-3 rounded-xl border border-white/5 bg-white/[0.03] cursor-pointer hover:bg-white/[0.06] transition-all group">
          <input
            type="checkbox" className="w-4 h-4 accent-indigo-500 rounded"
            checked={formData.addPlagiarismCert} onChange={e => setFormData({ ...formData, addPlagiarismCert: e.target.checked })}
          />
          <div className="flex-grow min-w-0">
            <span className="text-white text-xs font-medium block">Plagiarism-Free Certificate</span>
            <span className="text-zinc-500 text-[11px]">Real Turnitin report — under 10% similarity</span>
          </div>
          <span className="text-emerald-400 text-xs font-bold shrink-0">+₹{CONSTANTS.PRICING.ADDONS.PLAGIARISM_CERT}</span>
        </label>

        <label className="flex items-center gap-3 p-3 rounded-xl border border-brand-500/20 bg-brand-500/5 cursor-pointer hover:bg-brand-500/10 transition-all group relative overflow-hidden">
          <div className="absolute top-1.5 right-2">
            <span className="text-[10px] bg-brand-500/20 text-brand-400 px-1.5 py-0.5 rounded font-bold border border-brand-500/30">POPULAR</span>
          </div>
          <input
            type="checkbox" className="w-4 h-4 accent-indigo-500 rounded"
            checked={formData.addVivaCall} onChange={e => setFormData({ ...formData, addVivaCall: e.target.checked })}
          />
          <div className="flex-grow min-w-0 pr-16">
            <span className="text-white text-xs font-medium flex items-center gap-1.5"><Zap className="w-3 h-3 text-brand-400" />30-Min Viva Prep Call</span>
            <span className="text-zinc-500 text-[11px]">Expert tells you exactly what to say in the exam</span>
          </div>
          <span className="text-brand-400 text-xs font-bold shrink-0">+₹{CONSTANTS.PRICING.ADDONS.VIVA_CALL}</span>
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 mt-2 bg-white hover:bg-zinc-100 text-zinc-950 font-bold text-base rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
      >
        {loading ? 'Processing...' : `Pay ₹${totalAmount} →`}
      </button>

      <p className="text-center text-[11px] text-zinc-600 flex items-center justify-center gap-1.5">
        <ShieldCheck className="w-3 h-3" /> 100% Secure · Powered by Razorpay
      </p>
    </form>
  );
}
