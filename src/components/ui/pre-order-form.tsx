'use client';
import { useState } from 'react';
import { Lock, Bell, CheckCircle2, Loader2, Clock, Zap } from 'lucide-react';

interface PreOrderFormProps {
  projectSlug: string;
  projectTitle: string;
  priceInr: number;
  isMajor: boolean;
}

export function PreOrderForm({ projectSlug, projectTitle, priceInr, isMajor }: PreOrderFormProps) {
  const [name,    setName]    = useState('');
  const [email,   setEmail]   = useState('');
  const [phone,   setPhone]   = useState('');
  const [college, setCollege] = useState('');
  const [loading, setLoading] = useState(false);
  const [done,    setDone]    = useState(false);
  const [error,   setError]   = useState<string | null>(null);

  const fmt = (n: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError(null);
    try {
      const res  = await fetch('/api/preorder', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ projectSlug, projectTitle, name, email, phone, college }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong');
      setDone(true);
    } catch (err) { setError(err instanceof Error ? err.message : 'Something went wrong'); }
    finally { setLoading(false); }
  };

  const inputSty: React.CSSProperties = { width: '100%', background: 'var(--surface-2)', border: '1.5px solid var(--line)', borderRadius: '10px', padding: '.6875rem .875rem', fontSize: '.9375rem', color: 'var(--ink)', outline: 'none', fontFamily: 'var(--font-sans)', transition: 'border-color 150ms' };

  return (
    <div className="card" style={{ overflow: 'hidden', borderTop: '4px solid var(--amber)' }}>

      {/* Status banner */}
      <div style={{ background: 'var(--amber-50)', borderBottom: '1px solid var(--amber-100)', padding: '.875rem 1.25rem', display: 'flex', alignItems: 'center', gap: '.625rem' }}>
        <Lock style={{ width: '1rem', height: '1rem', color: 'var(--amber)', flexShrink: 0 }} />
        <p style={{ fontSize: '.8125rem', fontWeight: 700, color: '#92400E' }}>
          🚧 Under development — not available for purchase yet.
        </p>
      </div>

      {/* Info */}
      <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--line)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '.875rem', marginBottom: '1rem' }}>
          <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '10px', background: 'var(--amber-50)', border: '1px solid var(--amber-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Clock style={{ width: '1.125rem', height: '1.125rem', color: 'var(--amber)' }} />
          </div>
          <div>
            <p style={{ fontSize: '.9375rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '.25rem' }}>We&apos;re Building This</p>
            <p style={{ fontSize: '.8125rem', color: 'var(--ink-3)', lineHeight: 1.65 }}>
              Our engineering team is actively working on this project kit. Drop your email below and we&apos;ll notify you the moment it&apos;s ready.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
          {[
            { Icon: Clock, text: `Estimated delivery: 7–14 days`, accent: 'var(--amber)' },
            { Icon: Zap,   text: `Price when ready: ${fmt(priceInr)} (locked for you)`, accent: 'var(--teal)' },
            { Icon: Bell,  text: 'No payment now. Notification only — pay when it\'s ready.', accent: 'var(--violet)' },
          ].map(({ Icon, text, accent }) => (
            <div key={text} style={{ display: 'flex', alignItems: 'flex-start', gap: '.5rem', fontSize: '.8125rem', color: 'var(--ink-3)' }}>
              <Icon style={{ width: '.9375rem', height: '.9375rem', color: accent, flexShrink: 0, marginTop: '.0625rem' }} />
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Form */}
      <div style={{ padding: '1.25rem' }}>
        {done ? (
          <div style={{ textAlign: 'center', padding: '1.5rem 1rem' }}>
            <div style={{ width: '3.5rem', height: '3.5rem', borderRadius: '50%', background: 'var(--emerald-50)', border: '1px solid var(--emerald-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
              <CheckCircle2 style={{ width: '1.625rem', height: '1.625rem', color: 'var(--emerald)' }} />
            </div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '.5rem' }}>You&apos;re on the list! ✅</h3>
            <p style={{ fontSize: '.875rem', color: 'var(--ink-3)', lineHeight: 1.65, maxWidth: '18rem', margin: '0 auto' }}>
              We&apos;ll send the download link to your inbox the moment this project is ready. No payment until then.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '.625rem' }}>
            <p style={{ fontSize: '.8125rem', fontWeight: 600, color: 'var(--ink-3)', marginBottom: '.25rem' }}>Enter your details to join the waitlist:</p>
            <input required type="text"  placeholder="Full Name"                value={name}    onChange={e => setName(e.target.value)}    style={inputSty} />
            <input required type="email" placeholder="Email Address"            value={email}   onChange={e => setEmail(e.target.value)}   style={inputSty} />
            <input type="tel"            placeholder="WhatsApp Number (optional)" value={phone}   onChange={e => setPhone(e.target.value)}   style={inputSty} />
            <input type="text"           placeholder="College Name (optional)"   value={college} onChange={e => setCollege(e.target.value)} style={inputSty} />

            {error && (
              <div style={{ padding: '.625rem .875rem', borderRadius: '10px', background: 'var(--rose-50)', border: '1px solid var(--rose-100)', fontSize: '.8125rem', color: 'var(--rose)', fontWeight: 500 }}>{error}</div>
            )}

            <button type="submit" disabled={loading}
              style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '.5rem', padding: '.875rem', borderRadius: '12px', background: 'var(--amber)', color: '#fff', fontWeight: 700, fontSize: '.9375rem', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? .7 : 1, fontFamily: 'var(--font-sans)', transition: 'all 150ms' }}
            >
              {loading ? <><Loader2 style={{ width: '1rem', height: '1rem', animation: 'spin .7s linear infinite' }} /> Saving…</> : <><Bell style={{ width: '1rem', height: '1rem' }} /> Notify Me When It&apos;s Ready</>}
            </button>

            <p style={{ textAlign: 'center', fontSize: '.75rem', color: 'var(--ink-4)', fontWeight: 500 }}>
              🔒 No payment charged now. You&apos;ll only pay when the project is delivered.
            </p>
          </form>
        )}
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
