'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  CheckCircle2, Download, AlertCircle, Share2, ArrowRight,
  Copy, Zap, ShieldCheck, FolderOpen, Terminal, Play, GraduationCap,
  Check, MessageCircle, FileText, Award, ChevronDown, ChevronUp,
  Loader2, BookOpen, Presentation
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { formatCurrency } from '@/lib/utils';

interface ConfirmedOrder {
  orderId: string;
  projectTitle: string;
  amountPaid: number;
  createdAt: string;
  downloadCount: number;
  downloadLimit: number;
  hasPersonalization: boolean;
  hasPlagiarismCert: boolean;
  hasVivaCall: boolean;
}

function SuccessContent() {
  const sp           = useSearchParams();
  const orderId      = sp.get('order_id');
  const [confirmation, setConfirmation] = useState<ConfirmedOrder | null>(null);
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const [checkingOrder, setCheckingOrder] = useState(true);
  const projectTitle = confirmation?.projectTitle ?? 'Your Project Bundle';
  const hasPerson    = confirmation?.hasPersonalization ?? false;
  const hasPlagiarism= confirmation?.hasPlagiarismCert ?? false;
  const hasViva      = confirmation?.hasVivaCall ?? false;
  const downloadsLeft = Math.max(0, (confirmation?.downloadLimit ?? 0) - (confirmation?.downloadCount ?? 0));

  const [error, setError]           = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [idCopied, setIdCopied]     = useState(false);
  const [copied, setCopied]         = useState(false);

  // Personalization form
  const [showPersonForm, setShowPersonForm] = useState(false);
  const [sName,  setSName]  = useState('');
  const [sRoll,  setSRoll]  = useState('');
  const [sGuide, setSGuide] = useState('');
  const [sEmail, setSEmail] = useState('');
  const [personalizing, setPersonalizing] = useState(false);
  const [personDone,    setPersonDone]    = useState(false);
  const [personError,   setPersonError]   = useState<string | null>(null);

  // Report/PPT
  const [reportSize, setReportSize] = useState<'mini'|'standard'|'full'>('standard');
  const [showReportForm, setShowReportForm] = useState(false);
  const [rName, setRName]     = useState('');
  const [rRoll, setRRoll]     = useState('');
  const [rGuide, setRGuide]   = useState('');
  const [rCollege, setRCollege] = useState('');
  const [genReport, setGenReport] = useState(false);
  const [genPPT, setGenPPT]       = useState(false);

  // Verify paid status before showing the confirmation or purchase controls.
  useEffect(() => {
    let cancelled = false;
    const checkOrder = async () => {
      if (!orderId || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(orderId)) {
        setVerificationError('This order link is incomplete or invalid. Use order lookup to find a paid purchase.');
        setCheckingOrder(false);
        return;
      }

      for (let attempt = 0; attempt < 6; attempt += 1) {
        try {
          const response = await fetch(`/api/orders/${encodeURIComponent(orderId)}/confirmation`, { cache: 'no-store' });
          if (response.status === 202 && attempt < 5) {
            await new Promise(resolve => window.setTimeout(resolve, 2000));
            continue;
          }
          if (!response.ok) {
            const body = await response.json().catch(() => ({}));
            throw new Error(body.error || 'We could not verify this order.');
          }
          const data = await response.json() as ConfirmedOrder;
          if (!cancelled) setConfirmation(data);
          return;
        } catch (caught) {
          if (attempt < 5 && !cancelled) {
            await new Promise(resolve => window.setTimeout(resolve, 1200));
            continue;
          }
          if (!cancelled) setVerificationError(caught instanceof Error ? caught.message : 'We could not verify this order.');
        } finally {
          if (!cancelled && attempt === 5) setCheckingOrder(false);
        }
      }
      if (!cancelled) setCheckingOrder(false);
    };

    void checkOrder();
    return () => { cancelled = true; };
  }, [orderId]);

  useEffect(() => {
    if (confirmation) setCheckingOrder(false);
  }, [confirmation]);

  const handleDownload = async () => {
    if (downloading || !confirmation) return;
    setDownloading(true); setError(null);
    try {
      const res = await fetch(`/api/downloads/${confirmation.orderId}`);
      if (!res.ok) {
        let msg = 'Download failed. Try again or email team@submitkit.in.';
        try { const b = await res.json(); if (b?.error) msg = b.error; } catch {}
        setError(msg); setDownloading(false); return;
      }
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else { setError('Missing download link.'); setDownloading(false); }
    } catch { setError('Network error. Check connection.'); setDownloading(false); }
  };

  const handlePersonalize = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirmation) return;
    setPersonalizing(true); setPersonError(null);
    try {
      const res = await fetch('/api/personalize', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ orderId: confirmation.orderId, customerEmail: sEmail, studentName: sName, rollNumber: sRoll, guideName: sGuide, size: 'full' }) });
      if (!res.ok) { const d = await res.json().catch(() => ({})); setPersonError(d.error || 'Generation failed. Contact team@submitkit.in.'); setPersonalizing(false); return; }
      const blob = await res.blob();
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement('a');
      a.href = url; a.download = `${projectTitle.replace(/\s+/g, '-')}-IEEE-Report.docx`;
      document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
      setPersonDone(true);
    } catch { setPersonError('Network error. Please try again.'); }
    setPersonalizing(false);
  };

  const buildReportUrl = (type: 'report'|'ppt') => {
    if (!confirmation) return '#';
    const p = new URLSearchParams();
    if (type === 'report') p.set('size', reportSize);
    if (hasPerson && rName) { p.set('name', rName); if (rRoll) p.set('roll', rRoll); if (rGuide) p.set('guide', rGuide); if (rCollege) p.set('college', rCollege); }
    return `/api/${type}/${confirmation.orderId}?${p.toString()}`;
  };

  const waLink = `https://wa.me/918799814256?text=${encodeURIComponent(`Hi! I purchased "${projectTitle}" (Order: ${confirmation?.orderId.split('-')[0].toUpperCase() ?? ''}). Ready to discuss custom changes!`)}`;
  const shortId = confirmation?.orderId.split('-')[0].toUpperCase() ?? '';
  const purchaseDate = confirmation ? new Date(confirmation.createdAt) : null;
  const purchaseDateLabel = purchaseDate && Number.isFinite(purchaseDate.getTime())
    ? purchaseDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    : 'Confirmed';

  const inputSty: React.CSSProperties = { width: '100%', background: 'var(--surface)', border: '1.5px solid var(--line)', borderRadius: '10px', padding: '.625rem .875rem', fontSize: '.9375rem', color: 'var(--ink)', outline: 'none', fontFamily: 'var(--font-sans)', transition: 'border-color 150ms' };

  return (
    <div className="order-success-page" style={{ background: 'var(--canvas)', minHeight: '100vh', paddingBottom: '4rem' }}>
      {!confirmation && (
        <div className="shell" style={{ maxWidth: '40rem', paddingTop: '3rem', position: 'relative', zIndex: 1 }}>
          <div className="card" style={{ padding: '2rem', textAlign: 'center' }} aria-live="polite">
            {checkingOrder ? (
              <>
                <Loader2 style={{ width: '2rem', height: '2rem', color: 'var(--teal)', margin: '0 auto 1rem', animation: 'spin .7s linear infinite' }} />
                <h1 style={{ fontSize: '1.375rem', color: 'var(--navy)', marginBottom: '.5rem' }}>Confirming your order</h1>
                <p style={{ color: 'var(--ink-3)', fontSize: '.9375rem' }}>This usually takes a few seconds. Please keep this page open.</p>
              </>
            ) : (
              <>
                <AlertCircle style={{ width: '2rem', height: '2rem', color: 'var(--amber)', margin: '0 auto 1rem' }} />
                <h1 style={{ fontSize: '1.375rem', color: 'var(--navy)', marginBottom: '.5rem' }}>We couldn’t confirm this order</h1>
                <p style={{ color: 'var(--ink-3)', fontSize: '.9375rem', marginBottom: '1.25rem' }}>{verificationError ?? 'Please look up your order or contact support.'}</p>
                <Link href="/order/lookup" className="btn btn-teal">Find my order <ArrowRight style={{ width: '1rem', height: '1rem' }} /></Link>
              </>
            )}
          </div>
        </div>
      )}
      {confirmation && (
      <>
      {/* Ambient orbs */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }} aria-hidden>
        <div className="aorb" style={{ position: 'absolute', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(13,148,136,.09) 0%,transparent 70%)', top: '-10%', left: '50%', transform: 'translateX(-50%)', filter: 'blur(70px)' }} />
      </div>

      <div className="shell" style={{ paddingTop: '2rem', position: 'relative', zIndex: 1 }}>
        {/* Success header */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .4 }}
          style={{ textAlign: 'center', marginBottom: '2rem' }}
        >
          <div style={{ width: '4rem', height: '4rem', borderRadius: '18px', background: 'var(--emerald-50)', border: '1px solid var(--emerald-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto .875rem' }}>
            <CheckCircle2 style={{ width: '1.875rem', height: '1.875rem', color: 'var(--emerald)' }} />
          </div>
          <h1 className="font-display" style={{ fontSize: 'clamp(1.75rem,4vw,2.25rem)', fontWeight: 900, color: 'var(--navy)', letterSpacing: '-.04em', marginBottom: '.5rem' }}>
            Payment Successful! 🎉
          </h1>
          <p style={{ fontSize: '.9375rem', color: 'var(--teal-dark)', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '.375rem' }}>
            <span className="dot-live apulse" />
            Your payment has been verified
          </p>
        </motion.div>

        <div className="order-success-content" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '58rem', margin: '0 auto' }}>

          {/* Order and downloads */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', minWidth: 0 }}>

            {/* Order card */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .4, delay: .08 }}
              className="card" style={{ overflow: 'hidden', borderTop: '4px solid var(--teal)' }}
            >
              <div style={{ padding: '1.375rem', borderBottom: '1px solid var(--line)' }}>
                <p style={{ fontSize: '.6875rem', fontWeight: 700, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: '.375rem' }}>Purchased Item</p>
                <p style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--navy)' }}>{projectTitle}</p>
                <div className="order-success-summary">
                  <span><strong>Paid</strong>{formatCurrency(confirmation?.amountPaid ?? 0)}</span>
                  <span><strong>Order date</strong>{purchaseDateLabel}</span>
                </div>

                {/* Order ID */}
                {confirmation && (
                  <div style={{ marginTop: '1rem', padding: '1rem', borderRadius: '12px', background: 'var(--amber-50)', border: '1.5px solid var(--amber-100)' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
                      <div>
                        <p style={{ fontSize: '.6875rem', fontWeight: 800, color: 'var(--amber)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: '.375rem' }}>
                          Save your Order ID
                        </p>
                        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1.75rem', fontWeight: 900, color: 'var(--navy)', letterSpacing: '.1em', lineHeight: 1 }}>{shortId}</p>
                        <p style={{ fontSize: '.75rem', color: 'var(--ink-3)', marginTop: '.375rem' }}>You need this to re-download or contact support</p>
                      </div>
                      <button type="button" aria-label="Copy order ID" onClick={() => { navigator.clipboard.writeText(confirmation.orderId); setIdCopied(true); setTimeout(() => setIdCopied(false), 2000); }}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: idCopied ? 'var(--teal)' : 'var(--ink-4)', padding: '.25rem', marginTop: '.25rem' }}
                      >
                        {idCopied ? <Check style={{ width: '1rem', height: '1rem' }} /> : <Copy style={{ width: '1rem', height: '1rem' }} />}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Download */}
              <div style={{ padding: '1.375rem' }}>
                {error ? (
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '.625rem', padding: '.875rem', borderRadius: '12px', background: 'var(--rose-50)', border: '1px solid var(--rose-100)', marginBottom: '1rem' }}>
                    <AlertCircle style={{ width: '1rem', height: '1rem', color: 'var(--rose)', flexShrink: 0, marginTop: '.125rem' }} />
                    <div>
                      <p style={{ fontSize: '.875rem', color: 'var(--rose)', fontWeight: 600, marginBottom: '.25rem' }}>Download unavailable</p>
                      <p style={{ fontSize: '.8125rem', color: 'var(--rose)', opacity: .8, lineHeight: 1.55 }}>{error}</p>
                      <button onClick={() => { setError(null); setDownloading(false); }} style={{ marginTop: '.5rem', background: 'none', border: 'none', cursor: 'pointer', fontSize: '.8125rem', fontWeight: 700, color: 'var(--rose)', textDecoration: 'underline', textUnderlineOffset: '2px' }}>Try again</button>
                    </div>
                  </div>
                ) : null}

                <div style={{ background: 'var(--emerald-50)', border: '1px solid var(--emerald-100)', borderRadius: '14px', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '.875rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '.8125rem', color: 'var(--emerald)', fontWeight: 600 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '.375rem' }}><Zap style={{ width: '.875rem', height: '.875rem' }} /> {downloadsLeft} download{downloadsLeft === 1 ? '' : 's'} remaining</span>
                    <span>{confirmation?.downloadCount ?? 0} / {confirmation?.downloadLimit ?? 0} used</span>
                  </div>
                  <button onClick={handleDownload} disabled={downloading || downloadsLeft === 0}
                    className="btn btn-teal"
                    style={{ width: '100%', justifyContent: 'center', minHeight: '56px', fontSize: '1.0625rem', fontWeight: 800, borderRadius: '12px', opacity: downloading || downloadsLeft === 0 ? .7 : 1 }}
                  >
                    {downloading ? <><Loader2 style={{ width: '1.125rem', height: '1.125rem', animation: 'spin .7s linear infinite' }} /> Preparing Your Bundle…</> : downloadsLeft === 0 ? 'Download limit reached' : <><Download style={{ width: '1.125rem', height: '1.125rem' }} /> Download Complete Bundle (.zip)</>}
                  </button>
                  <p style={{ textAlign: 'center', fontSize: '.8125rem', color: 'var(--ink-4)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '.375rem', fontWeight: 500 }}>
                    <ShieldCheck style={{ width: '.875rem', height: '.875rem', color: 'var(--teal)' }} /> Each download link is valid for 10 minutes
                  </p>
                  {downloadsLeft === 0 && <Link href={`/order/lookup?query=${encodeURIComponent(shortId)}`} style={{ textAlign: 'center', fontSize: '.8125rem', color: 'var(--teal-dark)', fontWeight: 700 }}>Need another copy? Contact support with your order ID.</Link>}
                </div>

                {/* Quick access links */}
                {confirmation && (
                  <div style={{ display: 'flex', gap: '.625rem', marginTop: '.875rem', flexWrap: 'wrap' }}>
                    <Link href={`/viva/${confirmation.orderId}`}
                      style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '.375rem', padding: '.625rem', borderRadius: '10px', background: 'var(--violet-50)', border: '1px solid var(--violet-100)', color: 'var(--violet)', fontSize: '.875rem', fontWeight: 700, textDecoration: 'none', minWidth: '8rem' }}
                    >
                      <GraduationCap style={{ width: '.9375rem', height: '.9375rem' }} /> View Viva Q&amp;A
                    </Link>
                    {hasPlagiarism && <Link href={`/certificate/${confirmation.orderId}`} target="_blank"
                      style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '.375rem', padding: '.625rem', borderRadius: '10px', background: 'var(--amber-50)', border: '1px solid var(--amber-100)', color: 'var(--amber)', fontSize: '.875rem', fontWeight: 700, textDecoration: 'none', minWidth: '8rem' }}
                    >
                      <Award style={{ width: '.9375rem', height: '.9375rem' }} /> Plagiarism Certificate
                    </Link>}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Setup guide immediately follows the bundle download actions. */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .4, delay: .12 }}
              className="card order-success-video" style={{ overflow: 'hidden' }}
            >
              <div style={{ padding: '1.125rem 1.375rem', borderBottom: '1px solid var(--line)' }}>
                <h3 style={{ fontSize: '.9375rem', fontWeight: 700, color: 'var(--navy)' }}>Setup guide</h3>
                <p style={{ fontSize: '.8125rem', color: 'var(--ink-3)', marginTop: '.25rem' }}>Watch while your project bundle downloads.</p>
              </div>
              <div style={{ background: 'var(--surface-2)' }}>
                <video controls playsInline preload="none" poster="/video-poster.jpg" className="w-full aspect-video">
                  <source src="/demo.mp4" type="video/mp4" />
                  Your browser does not support video playback.
                </video>
              </div>
            </motion.div>

            {/* Report + PPT generator */}
            {confirmation && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .4, delay: .14 }}
                className="card" style={{ padding: '1.375rem' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '.875rem', marginBottom: '1.25rem' }}>
                  <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '10px', background: 'var(--teal-50)', border: '1px solid var(--teal-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <BookOpen style={{ width: '1.125rem', height: '1.125rem', color: 'var(--teal)' }} />
                  </div>
                  <div>
                    <p style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--navy)', letterSpacing: '-.02em' }}>IEEE Report &amp; Presentation</p>
                    <p style={{ fontSize: '.8125rem', color: 'var(--ink-3)' }}>Generate your Black Book report and PPT slides{hasPerson ? ' — with your name on the cover' : ''}</p>
                  </div>
                </div>

                {/* Report size */}
                <p style={{ fontSize: '.6875rem', fontWeight: 700, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: '.625rem' }}>Report Size</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '.5rem', marginBottom: '1rem' }}>
                  {([{ v: 'mini', l: '15 Pages', d: 'Quick' }, { v: 'standard', l: '20 Pages', d: 'Recommended ✓' }, { v: 'full', l: '60 Pages', d: 'Full IEEE' }] as const).map(o => (
                    <button key={o.v} onClick={() => setReportSize(o.v)}
                      style={{ padding: '.625rem .5rem', borderRadius: '10px', border: `1.5px solid ${reportSize === o.v ? 'var(--teal)' : 'var(--line)'}`, background: reportSize === o.v ? 'var(--teal-50)' : 'var(--surface)', cursor: 'pointer', transition: 'all 150ms', textAlign: 'center', fontFamily: 'var(--font-sans)' }}
                    >
                      <p style={{ fontSize: '.8125rem', fontWeight: 700, color: reportSize === o.v ? 'var(--teal-dark)' : 'var(--ink-2)' }}>{o.l}</p>
                      <p style={{ fontSize: '.6875rem', color: 'var(--ink-4)', marginTop: '.125rem' }}>{o.d}</p>
                    </button>
                  ))}
                </div>

                {/* Name form if personalization purchased */}
                {hasPerson && (
                  <div style={{ marginBottom: '1rem' }}>
                    <button onClick={() => setShowReportForm(v => !v)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '.875rem', fontWeight: 700, color: 'var(--teal)', display: 'flex', alignItems: 'center', gap: '.25rem', marginBottom: '.625rem', fontFamily: 'var(--font-sans)' }}
                    >
                      {showReportForm ? <ChevronUp style={{ width: '.875rem', height: '.875rem' }} /> : <ChevronDown style={{ width: '.875rem', height: '.875rem' }} />}
                      {showReportForm ? 'Hide name details' : 'Add your name to cover (purchased)'}
                    </button>
                    {showReportForm && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
                        <input type="text" placeholder="Your Full Name (for cover page)" value={rName} onChange={e => setRName(e.target.value)} style={inputSty} />
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.5rem' }}>
                          <input type="text" placeholder="Roll Number (optional)" value={rRoll} onChange={e => setRRoll(e.target.value)} style={inputSty} />
                          <input type="text" placeholder="Guide Name (optional)" value={rGuide} onChange={e => setRGuide(e.target.value)} style={inputSty} />
                        </div>
                        <input type="text" placeholder="College Name (optional)" value={rCollege} onChange={e => setRCollege(e.target.value)} style={inputSty} />
                      </div>
                    )}
                  </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.625rem' }}>
                  <button onClick={() => { setGenReport(true); window.location.href = buildReportUrl('report'); setTimeout(() => setGenReport(false), 4000); }} disabled={genReport}
                    className="btn btn-teal"
                    style={{ justifyContent: 'center', borderRadius: '10px', opacity: genReport ? .7 : 1 }}
                  >
                    {genReport ? <Loader2 style={{ width: '1rem', height: '1rem', animation: 'spin .7s linear infinite' }} /> : <BookOpen style={{ width: '1rem', height: '1rem' }} />}
                    {genReport ? 'Building…' : 'Download Report'}
                  </button>
                  <button onClick={() => { setGenPPT(true); window.location.href = buildReportUrl('ppt'); setTimeout(() => setGenPPT(false), 4000); }} disabled={genPPT}
                    className="btn btn-outline"
                    style={{ justifyContent: 'center', borderRadius: '10px', opacity: genPPT ? .7 : 1 }}
                  >
                    {genPPT ? <Loader2 style={{ width: '1rem', height: '1rem', animation: 'spin .7s linear infinite' }} /> : <Presentation style={{ width: '1rem', height: '1rem' }} />}
                    {genPPT ? 'Building…' : 'Download PPT'}
                  </button>
                </div>
              </motion.div>
            )}

            {/* Personalization add-on */}
            {hasPerson && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .4, delay: .18 }}
                className="card-teal" style={{ padding: '1.375rem' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: personDone ? '0' : '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '.875rem' }}>
                    <FileText style={{ width: '1.25rem', height: '1.25rem', color: 'var(--teal)', flexShrink: 0 }} />
                    <div>
                      <p style={{ fontSize: '.9375rem', fontWeight: 700, color: 'var(--navy)' }}>Add My Name on Front Page</p>
                      <p style={{ fontSize: '.8125rem', color: 'var(--ink-3)' }}>We&apos;ll type your name &amp; roll no on the Black Book cover</p>
                    </div>
                  </div>
                  {!personDone && (
                    <button onClick={() => setShowPersonForm(v => !v)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '.8125rem', fontWeight: 700, color: 'var(--teal)', display: 'flex', alignItems: 'center', gap: '.25rem', fontFamily: 'var(--font-sans)', flexShrink: 0 }}
                    >
                      {showPersonForm ? <ChevronUp style={{ width: '.875rem', height: '.875rem' }} /> : <ChevronDown style={{ width: '.875rem', height: '.875rem' }} />}
                      {showPersonForm ? 'Hide' : 'Fill Details'}
                    </button>
                  )}
                </div>

                {personDone && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', color: 'var(--teal)', fontWeight: 600, fontSize: '.9rem' }}>
                    <Check style={{ width: '1rem', height: '1rem' }} /> 60-page IEEE report downloading! Check your Downloads folder.
                  </div>
                )}

                {showPersonForm && !personDone && (
                  <form onSubmit={handlePersonalize} style={{ display: 'flex', flexDirection: 'column', gap: '.625rem' }}>
                    <input required type="email" placeholder="Your email (same as order)" value={sEmail} onChange={e => setSEmail(e.target.value)} style={inputSty} />
                    <input required type="text" placeholder="Your Full Name (as it should appear on the cover)" value={sName} onChange={e => setSName(e.target.value)} style={inputSty} />
                    <input type="text" placeholder="Roll Number (e.g. 1RV21CS045)" value={sRoll} onChange={e => setSRoll(e.target.value)} style={inputSty} />
                    <input type="text" placeholder="Guide / Professor Name (optional)" value={sGuide} onChange={e => setSGuide(e.target.value)} style={inputSty} />
                    {personError && <p style={{ fontSize: '.8125rem', color: 'var(--rose)' }}>{personError}</p>}
                    <button type="submit" disabled={personalizing} className="btn btn-teal" style={{ justifyContent: 'center', borderRadius: '10px', opacity: personalizing ? .7 : 1 }}>
                      {personalizing ? <><Loader2 style={{ width: '1rem', height: '1rem', animation: 'spin .7s linear infinite' }} /> Generating 60-Page Report…</> : '⬇️ Generate & Download IEEE Report (60 Pages)'}
                    </button>
                  </form>
                )}
              </motion.div>
            )}

            {/* Custom Changes add-on */}
            {hasViva && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .4, delay: .22 }}
                className="card" style={{ padding: '1.375rem', display: 'flex', alignItems: 'flex-start', gap: '.875rem' }}
              >
                <MessageCircle style={{ width: '1.25rem', height: '1.25rem', color: 'var(--teal)', flexShrink: 0, marginTop: '.125rem' }} />
                <div>
                  <p style={{ fontSize: '.9375rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '.25rem' }}>Custom Changes Request</p>
                  <p style={{ fontSize: '.875rem', color: 'var(--ink-3)', marginBottom: '.875rem', lineHeight: 1.65 }}>Contact our developers on WhatsApp to request tweaks and modifications to the code.</p>
                  <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn btn-teal btn-sm" style={{ gap: '.375rem' }}>
                    <MessageCircle style={{ width: '.875rem', height: '.875rem' }} /> WhatsApp +91 87998 14256
                  </a>
                </div>
              </motion.div>
            )}

            {/* Action row */}
            <div style={{ display: 'flex', gap: '.625rem', flexWrap: 'wrap' }}>
              <button onClick={() => { const t = 'Just got my final year project bundle from SubmitKit! Running perfectly!'; if (navigator.share) navigator.share({ title: 'SubmitKit', text: t, url: 'https://submitkit.in' }).catch(() => {}); else { navigator.clipboard.writeText(t + ' https://submitkit.in'); setCopied(true); setTimeout(() => setCopied(false), 2000); } }}
                className="btn btn-outline"
                style={{ flex: 1, justifyContent: 'center', borderRadius: '10px', minWidth: '10rem' }}
              >
                <Share2 style={{ width: '1rem', height: '1rem' }} />
                {copied ? 'Link Copied!' : 'Recommend to classmates'}
              </button>
              <Link href="/projects" className="btn btn-outline" style={{ flex: 1, justifyContent: 'center', borderRadius: '10px', minWidth: '10rem', textDecoration: 'none' }}>
                Browse More Projects <ArrowRight style={{ width: '.9375rem', height: '.9375rem' }} />
              </Link>
            </div>

            {/* Support note */}
            <p style={{ fontSize: '.8125rem', color: 'var(--ink-4)', textAlign: 'center' }}>
              Need help? Email <a href="mailto:team@submitkit.in" style={{ color: 'var(--teal)', fontWeight: 600, textDecoration: 'none' }}>team@submitkit.in</a> with your Order ID <strong style={{ color: 'var(--navy)', fontFamily: 'var(--font-mono)' }}>{shortId}</strong>
            </p>
          </div>

        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '100vh', background: 'var(--canvas)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '2.5rem', height: '2.5rem', border: '3px solid var(--teal-100)', borderTopColor: 'var(--teal)', borderRadius: '50%', animation: 'spin .7s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
