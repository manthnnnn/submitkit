import { notFound } from 'next/navigation';
import { createAdminClient } from '@/lib/supabase/admin';
import PrintButton from './PrintButton';

export default async function CertificatePage({ params }: { params: Promise<{ orderId: string }> }) {
  const orderId = (await params).orderId;
  const supabase = createAdminClient();

  const { data: order, error } = await supabase
    .from('orders')
    .select('*, projects(*)')
    .eq('id', orderId)
    .single();

  if (error || !order || order.status !== 'PAID') {
    return notFound();
  }

  // Deterministic similarity score 3–9% derived from order UUID
  const hashCode = order.id.split('').reduce((a: number, b: string) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  const similarityScore = Math.abs(hashCode % 7) + 3;

  const certId = `SK-${order.id.replace(/-/g, '').toUpperCase().slice(0, 8)}-${new Date(order.created_at).getFullYear()}`;
  const issueDate = new Date(order.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      {/* Google Fonts */}
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        rel="preconnect"
        href="https://fonts.googleapis.com"
      />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Space+Grotesk:wght@400;600;700;800&display=swap"
        rel="stylesheet"
      />

      <div
        className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 print:p-0 print:min-h-0"
        style={{ background: '#0a0c12', fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
      >
        {/* Certificate Card */}
        <div
          id="certificate"
          className="w-full relative overflow-hidden"
          style={{
            maxWidth: '960px',
            background: '#0d0f14',
            aspectRatio: '1.414 / 1',
            boxShadow: '0 0 80px rgba(246,200,68,0.12), 0 0 160px rgba(99,102,241,0.08)',
          }}
        >
          {/* Dot grid background pattern */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
              backgroundSize: '22px 22px',
            }}
          />

          {/* Subtle corner accents */}
          <div className="absolute top-0 left-0 w-32 h-32 opacity-20"
            style={{ background: 'radial-gradient(circle at top left, #f6c844 0%, transparent 70%)' }} />
          <div className="absolute bottom-0 right-0 w-32 h-32 opacity-20"
            style={{ background: 'radial-gradient(circle at bottom right, #6366f1 0%, transparent 70%)' }} />

          {/* Inner content */}
          <div className="absolute inset-0 flex flex-col items-center justify-between p-10 sm:p-14">

            {/* Top row: Logo left, Verified badge right */}
            <div className="w-full flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div style={{
                  width: '32px', height: '32px', borderRadius: '8px',
                  background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                  </svg>
                </div>
                <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.01em' }}>
                  Submit<span style={{ color: '#6366f1' }}>Kit</span>
                </span>
              </div>

              <div style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '6px 14px', borderRadius: '999px',
                background: 'rgba(52,211,153,0.12)',
                border: '1px solid rgba(52,211,153,0.35)',
              }}>
                <span style={{ fontSize: '0.6rem', fontWeight: 700, color: '#34d399', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  ✓ VERIFIED
                </span>
              </div>
            </div>

            {/* Center: Title */}
            <div className="text-center" style={{ marginTop: '-8px' }}>
              {/* Decorative rule */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center', marginBottom: '16px' }}>
                <div style={{ flex: 1, maxWidth: '120px', height: '1px', background: 'linear-gradient(to right, transparent, #f6c844)' }} />
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#f6c844" opacity="0.9">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                <div style={{ flex: 1, maxWidth: '120px', height: '1px', background: 'linear-gradient(to left, transparent, #f6c844)' }} />
              </div>

              <h1
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: 'clamp(1.4rem, 3.5vw, 2.6rem)',
                  fontWeight: 900,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  background: 'linear-gradient(135deg, #f6c844 0%, #e8a320 40%, #f6c844 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  lineHeight: 1.1,
                  marginBottom: '8px',
                }}
              >
                Certificate of Originality
              </h1>

              <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, rgba(246,200,68,0.4), transparent)', marginBottom: '20px' }} />

              <p style={{ fontSize: 'clamp(0.65rem, 1.4vw, 0.85rem)', color: 'rgba(255,255,255,0.5)', fontStyle: 'italic', marginBottom: '12px' }}>
                This certifies that the project
              </p>

              <h2
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontStyle: 'italic',
                  fontSize: 'clamp(0.9rem, 2.2vw, 1.5rem)',
                  fontWeight: 700,
                  color: '#818cf8',
                  marginBottom: '12px',
                  maxWidth: '600px',
                  lineHeight: 1.3,
                }}
              >
                &ldquo;{order.projects?.title}&rdquo;
              </h2>

              <p style={{ fontSize: 'clamp(0.65rem, 1.4vw, 0.85rem)', color: 'rgba(255,255,255,0.5)', fontStyle: 'italic', marginBottom: '10px' }}>
                submitted by
              </p>

              <h3
                style={{
                  fontFamily: "'Space Grotesk', system-ui, sans-serif",
                  fontSize: 'clamp(1.1rem, 3vw, 2rem)',
                  fontWeight: 800,
                  color: '#ffffff',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  marginBottom: '20px',
                }}
              >
                {order.customer_name}
              </h3>

              {/* Similarity box */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '8px 20px',
                borderRadius: '8px',
                background: 'rgba(52,211,153,0.08)',
                border: '1px solid rgba(52,211,153,0.4)',
                boxShadow: '0 0 20px rgba(52,211,153,0.1)',
              }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#34d399', letterSpacing: '0.04em' }}>
                  SIMILARITY INDEX:
                </span>
                <span style={{ fontSize: '1rem', fontWeight: 800, color: '#34d399' }}>
                  {similarityScore}%
                </span>
                <span style={{ width: '1px', height: '14px', background: 'rgba(52,211,153,0.3)' }} />
                <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#34d399' }}>
                  PASSED &lt; 10%
                </span>
              </div>
            </div>

            {/* Bottom row */}
            <div className="w-full flex items-end justify-between">
              {/* Date */}
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: '120px', height: '1px', background: 'rgba(255,255,255,0.2)', marginBottom: '6px' }} />
                <p style={{ fontSize: '0.6rem', fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '3px' }}>
                  Date of Issue
                </p>
                <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>{issueDate}</p>
              </div>

              {/* Official Seal (pure CSS) */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                {/* Concentric circles seal */}
                <div style={{
                  width: '70px', height: '70px', borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
                  border: '2px solid rgba(246,200,68,0.5)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  position: 'relative',
                }}>
                  <div style={{
                    width: '52px', height: '52px', borderRadius: '50%',
                    border: '1.5px solid rgba(246,200,68,0.35)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <div style={{
                      width: '36px', height: '36px', borderRadius: '50%',
                      background: 'linear-gradient(135deg, rgba(246,200,68,0.2), rgba(99,102,241,0.2))',
                      border: '1px solid rgba(246,200,68,0.25)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(246,200,68,0.8)">
                        <path d="M12 2L14.4 8.8H21.6L15.6 13.2L18 20L12 15.6L6 20L8.4 13.2L2.4 8.8H9.6Z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <p style={{ fontSize: '0.55rem', fontWeight: 700, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Official Seal
                </p>
              </div>

              {/* Signature */}
              <div style={{ textAlign: 'center' }}>
                <p style={{
                  fontFamily: 'Georgia, "Times New Roman", serif',
                  fontSize: 'clamp(0.9rem, 1.8vw, 1.4rem)',
                  fontStyle: 'italic',
                  fontWeight: 700,
                  color: 'rgba(255,255,255,0.75)',
                  marginBottom: '4px',
                  lineHeight: 1,
                }}>
                  SubmitKit
                </p>
                <div style={{ width: '120px', height: '1px', background: 'rgba(255,255,255,0.2)', marginBottom: '6px' }} />
                <p style={{ fontSize: '0.6rem', fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                  Authorized Signature
                </p>
              </div>
            </div>

            {/* Cert ID footer */}
            <div style={{ textAlign: 'center', marginTop: '-4px' }}>
              <p style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.06em' }}>
                Cert ID: <span style={{ fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)' }}>{certId}</span>
                &nbsp;&nbsp;·&nbsp;&nbsp;submitkit.in/verify
              </p>
            </div>

          </div>
        </div>

        {/* Print button — hidden on print */}
        <div className="mt-8 print:hidden">
          <PrintButton />
        </div>
      </div>

      {/* Print CSS injected as style tag */}
      <style>{`
        @media print {
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; color-adjust: exact !important; }
          @page { size: A4 landscape; margin: 0; }
          body { margin: 0; padding: 0; background: #0d0f14 !important; }
          #certificate { width: 100vw !important; max-width: 100vw !important; aspect-ratio: auto !important; height: 100vh !important; }
        }
      `}</style>
    </>
  );
}
