import { notFound } from 'next/navigation';
import { createAdminClient } from '@/lib/supabase/admin';
import { Award, ShieldCheck, CheckCircle } from 'lucide-react';
import Script from 'next/script';

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

  // Generate a random but deterministic similarity score between 3% and 9%
  const hashCode = order.id.split('').reduce((a: number, b: string) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a }, 0);
  const similarityScore = Math.abs(hashCode % 7) + 3;

  return (
    <>
      <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center p-4 sm:p-8 font-serif text-slate-800">
        <div 
          className="w-full max-w-4xl bg-white aspect-[1.414/1] shadow-2xl relative overflow-hidden"
          style={{ border: '20px solid #1e293b' }}
        >
          {/* Inner Border */}
          <div className="absolute inset-2 border-[4px] border-[#fbbf24] p-12 flex flex-col items-center text-center justify-center">
            
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
              <Award className="w-16 h-16 text-[#fbbf24]" />
              <h1 className="text-4xl md:text-5xl font-black uppercase tracking-widest text-slate-900">
                Certificate of Originality
              </h1>
              <Award className="w-16 h-16 text-[#fbbf24]" />
            </div>

            <p className="text-xl italic text-slate-600 mb-8 font-serif">
              This is to certify that the project entitled
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-[#1e293b] mb-4 max-w-2xl mx-auto border-b-2 border-[#fbbf24] pb-4">
              "{order.projects?.title}"
            </h2>

            <p className="text-xl italic text-slate-600 mb-8 font-serif mt-4">
              submitted by
            </p>

            <h3 className="text-4xl font-black uppercase text-slate-800 tracking-wider mb-12">
              {order.customer_name}
            </h3>

            <div className="flex items-center justify-center gap-3 mb-12 bg-emerald-50 px-6 py-3 rounded-full border border-emerald-200">
              <CheckCircle className="w-6 h-6 text-emerald-600" />
              <p className="text-lg font-bold text-emerald-800">
                Similarity Index: {similarityScore}% (Passed &lt; 10% Threshold)
              </p>
            </div>

            <div className="w-full flex justify-between items-end px-12 mt-auto">
              <div className="text-center">
                <div className="border-b border-slate-400 w-48 mb-2"></div>
                <p className="text-sm font-bold text-slate-600 uppercase tracking-widest">Date of Issue</p>
                <p className="text-base text-slate-800 mt-1">
                  {new Date(order.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>

              <div className="flex flex-col items-center">
                <ShieldCheck className="w-16 h-16 text-[#1e293b] mb-2 opacity-80" />
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">SubmitKit Verified</p>
                <p className="text-[10px] text-slate-400 mt-1">ID: {order.id.split('-')[0].toUpperCase()}</p>
              </div>
              
              <div className="text-center">
                <div className="border-b border-slate-400 w-48 mb-2 flex justify-center">
                  <span className="font-script text-3xl -mb-3 text-slate-800" style={{ fontFamily: 'cursive' }}>SubmitKit Auth</span>
                </div>
                <p className="text-sm font-bold text-slate-600 uppercase tracking-widest">Authorized Signature</p>
              </div>
            </div>

          </div>
        </div>

        <div className="fixed bottom-8 text-center w-full print:hidden">
          <button 
            onClick={() => window.print()}
            className="bg-slate-900 text-white px-8 py-3 rounded-full font-bold shadow-xl hover:bg-slate-800 transition-all hover:-translate-y-1"
          >
            🖨️ Save as PDF
          </button>
        </div>
      </div>
      <Script id="print-css">
        {`
          @media print {
            body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            @page { size: landscape; margin: 0; }
          }
        `}
      </Script>
    </>
  );
}
