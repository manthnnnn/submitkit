'use client';
import { useState } from 'react';
import { CONSTANTS } from '@/lib/constants';
import { ShieldCheck, AlertCircle, Phone, Zap, Check } from 'lucide-react';

interface Props { projectId: string; price: number; }

export function CustomerForm({ projectId, price }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);
  const [form, setForm] = useState({
    customerName: '', customerEmail: '', customerPhone: '', collegeName: '',
    addPersonalization: false, addPlagiarismCert: false, addVivaCall: false,
  });

  const total = price
    + (form.addPersonalization ? CONSTANTS.PRICING.ADDONS.PERSONALIZATION : 0)
    + (form.addPlagiarismCert  ? CONSTANTS.PRICING.ADDONS.PLAGIARISM_CERT  : 0)
    + (form.addVivaCall        ? CONSTANTS.PRICING.ADDONS.VIVA_CALL        : 0);

  const set = (k: string, v: string | boolean) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError(null);
    try {
      const res  = await fetch('/api/orders/create', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ projectId, ...form }) });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Failed to initialise payment.'); setLoading(false); return; }

      const opts = {
        key: data.key, amount: data.amount, currency: data.currency,
        name: CONSTANTS.APP_NAME, description: 'Project Bundle Purchase', order_id: data.razorpayOrderId,
        handler: async (r: any) => {
          try {
            const vr = await fetch('/api/orders/verify', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ razorpay_order_id: r.razorpay_order_id, razorpay_payment_id: r.razorpay_payment_id, razorpay_signature: r.razorpay_signature }) });
            const vd = await vr.json();
            if (!vr.ok || !vd.success) { setError('Payment verification failed. Contact support with ID: ' + r.razorpay_payment_id); setLoading(false); return; }
            const p = new URLSearchParams({ order_id: vd.orderId, title: vd.projectTitle || 'Your Project Bundle' });
            if (vd.hasPersonalization) p.set('personalize', '1');
            if (vd.hasPlagiarismCert) p.set('plagiarism', '1');
            if (vd.hasVivaCall)       p.set('viva', '1');
            window.location.href = `/order/success?${p.toString()}`;
          } catch { setError('Error after payment. Please contact support.'); setLoading(false); }
        },
        prefill: { name: form.customerName, email: form.customerEmail, contact: form.customerPhone },
        theme: { color: '#4F46E5' },
      };
      const rzp = new (window as any).Razorpay(opts);
      rzp.on('payment.failed', () => { setError('Payment failed or cancelled. Please try again.'); setLoading(false); });
      rzp.open();
    } catch { setError('Unexpected error. Please refresh and try again.'); setLoading(false); }
  };

  const inputSty: React.CSSProperties = {
    width: '100%', background: 'var(--surface)', border: '1.5px solid var(--line)',
    borderRadius: '11px', padding: '.6875rem 1rem', fontSize: '.9375rem',
    color: 'var(--ink)', outline: 'none', fontFamily: 'var(--font-sans)', transition: 'border-color 150ms, box-shadow 150ms',
  };

  const focus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.target.style.borderColor = 'var(--teal)';
    e.target.style.boxShadow   = '0 0 0 3px rgba(13,148,136,.15)';
  };
  const blur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.target.style.borderColor = 'var(--line)';
    e.target.style.boxShadow   = 'none';
  };

  const ADDONS = [
    { key: 'addPersonalization', label: 'Add My Name on Front Page',         sub: "We'll add your name & roll no on the cover",              price: CONSTANTS.PRICING.ADDONS.PERSONALIZATION, popular: false },
    { key: 'addPlagiarismCert',  label: 'SubmitKit Plagiarism Certificate',   sub: 'Certificate showing <10% similarity score',              price: CONSTANTS.PRICING.ADDONS.PLAGIARISM_CERT,  popular: false },
    { key: 'addVivaCall',        label: 'Custom Changes Request',             sub: 'Need tweaks? Our devs assist you on WhatsApp',           price: CONSTANTS.PRICING.ADDONS.VIVA_CALL,        popular: true  },
  ];

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

      {error && (
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '.625rem', padding: '.875rem 1rem', borderRadius: '12px', background: 'var(--rose-50)', border: '1px solid var(--rose-100)', fontSize: '.875rem', color: '#9F1239' }}>
          <AlertCircle style={{ width: '1.125rem', height: '1.125rem', flexShrink: 0, marginTop: '.125rem' }} />
          {error}
        </div>
      )}

      {/* Fields */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
        <input required type="text"  placeholder="Your Full Name" style={inputSty}
          value={form.customerName}  onChange={e => set('customerName', e.target.value)} onFocus={focus} onBlur={blur} />
        <input required type="email" placeholder="Email (Download link sent here)" style={inputSty}
          value={form.customerEmail} onChange={e => set('customerEmail', e.target.value)} onFocus={focus} onBlur={blur} />
        <div style={{ position: 'relative' }}>
          <Phone style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', width: '1.0625rem', height: '1.0625rem', color: 'var(--ink-4)', pointerEvents: 'none' }} />
          <input required type="tel" placeholder="10-digit Phone Number" pattern="[0-9]{10}"
            style={{ ...inputSty, paddingLeft: '2.875rem' }}
            value={form.customerPhone}
            onChange={e => set('customerPhone', e.target.value.replace(/\D/g, '').slice(0, 10))}
            onFocus={focus} onBlur={blur}
          />
        </div>
        <input type="text" placeholder="College Name (Optional)" style={inputSty}
          value={form.collegeName} onChange={e => set('collegeName', e.target.value)} onFocus={focus} onBlur={blur} />
      </div>

      {/* Add-ons */}
      <div>
        <p style={{ fontSize: '.6875rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--ink-4)', marginBottom: '.625rem' }}>
          Optional Add-ons
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
          {ADDONS.map(a => {
            const checked = (form as any)[a.key] as boolean;
            return (
              <label key={a.key}
                style={{
                  display: 'flex', alignItems: 'center', gap: '.875rem', padding: '.875rem 1rem',
                  borderRadius: '12px', cursor: 'pointer', transition: 'all 150ms',
                  border: `1.5px solid ${checked ? 'var(--teal)' : 'var(--line)'}`,
                  background: checked ? 'var(--teal-50)' : 'var(--surface)',
                }}
              >
                {/* Visual checkbox */}
                <div style={{ width: '1.125rem', height: '1.125rem', borderRadius: '5px', flexShrink: 0, border: `2px solid ${checked ? 'var(--teal)' : 'var(--line-2)'}`, background: checked ? 'var(--teal)' : 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 150ms' }}>
                  {checked && <Check style={{ width: '.75rem', height: '.75rem', color: '#fff', strokeWidth: 3 }} />}
                </div>
                <input type="checkbox" className="sr-only" checked={checked} onChange={e => set(a.key, e.target.checked)} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '.9375rem', fontWeight: 600, color: 'var(--ink)' }}>{a.label}</span>
                    {a.popular && (
                      <span style={{
                        fontSize: '.5625rem',
                        fontWeight: 800,
                        padding: '.125rem .5rem',
                        borderRadius: '9999px',
                        background: 'var(--teal-100)',
                        color: 'var(--teal-dark)',
                        border: '1px solid var(--teal-200)',
                        letterSpacing: '.06em',
                        textTransform: 'uppercase',
                        lineHeight: 1.3
                      }}>
                        Popular
                      </span>
                    )}
                  </div>
                  <span style={{ fontSize: '.8125rem', color: 'var(--ink-3)', display: 'block', marginTop: '.125rem' }}>{a.sub}</span>
                </div>
                <div style={{ flexShrink: 0, textAlign: 'right', marginLeft: '.75rem' }}>
                  <span style={{ fontSize: '.9375rem', fontWeight: 800, color: 'var(--green)' }}>+₹{a.price}</span>
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* Pay CTA */}
      <button
        type="submit"
        disabled={loading}
        className="btn btn-teal"
        style={{ width: '100%', marginTop: '.25rem', padding: '1rem', fontSize: '1.0625rem', borderRadius: '13px', opacity: loading ? .65 : 1, cursor: loading ? 'not-allowed' : 'pointer', transform: 'none' }}
      >
        {loading ? (
          <>
            <span style={{ width: '1.125rem', height: '1.125rem', border: '2.5px solid rgba(255,255,255,.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite', flexShrink: 0 }} />
            Processing…
          </>
        ) : (
          <>
            <Zap style={{ width: '1.125rem', height: '1.125rem', fill: 'white' }} />
            Pay ₹{total} — Get Instant Download
          </>
        )}
      </button>

      <p style={{ textAlign: 'center', fontSize: '.8125rem', color: 'var(--ink-4)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '.375rem', fontWeight: 500 }}>
        <ShieldCheck style={{ width: '.9375rem', height: '.9375rem', color: 'var(--green)' }} />
        100% Secure · Powered by Razorpay
      </p>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </form>
  );
}
