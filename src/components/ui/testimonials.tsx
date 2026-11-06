'use client';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const R = [
  { name:'Rahul Sharma',   college:'VTU · 8th Sem CSE',            av:'RS', project:'LifeDrop Blood Bank OS',        i:0, t:"Bought at 11 PM before submission. Ran it with one click, printed the Black Book, submitted by 9 AM. Got an A. The 25 Viva Q&As saved me completely." },
  { name:'Priya Nair',     college:'Mumbai University · 6th Sem IT', av:'PN', project:'TalentScan AI Resume Parser',   i:1, t:"Local shops quoted ₹8,000 and couldn't explain the code. Paid ₹499 here, got better code, better report, and PPT with speaker notes. Genuine value." },
  { name:'Arjun Patel',    college:'GTU · 7th Sem IT',              av:'AP', project:'SentinelPay AI Fraud Radar',    i:2, t:"Project ran perfectly on first try. My guide asked about the fraud algorithm during viva and I answered from the Q&A sheet. External examiner was impressed." },
  { name:'Sneha Kulkarni', college:'Pune University · 8th Sem',     av:'SK', project:'PhishGuard AI Threat Radar',    i:3, t:"Non-CS branch so I was scared about Node.js. The run.bat installed everything automatically. Just double-clicked and it opened in the browser. I could demo it." },
  { name:'Karthik Reddy',  college:'JNTU · 7th Sem BTech',          av:'KR', project:'AeroFuel Predictor AI',          i:4, t:"Paid ₹99 extra to get my name on the cover. Got the PDF in minutes. The panel saw my name on the title page and thought I'd been working on it for months." },
  { name:'Divya Menon',    college:'Anna University · 6th Sem CSE',  av:'DM', project:'QuickBite Restaurant QR System', i:5, t:"QR code actually worked on my phone. Professor asked me to demo live. He said it looked like a real product. I agree." },
];

const AVBG = [
  { bg:'#E6F7F5', c:'#0A7C72' },
  { bg:'#ECFDF5', c:'#059669' },
  { bg:'#F0FDFA', c:'#0F766E' },
  { bg:'#FFFBEB', c:'#D97706' },
  { bg:'#FFF1F2', c:'#E11D48' },
  { bg:'#F0F9FF', c:'#0284C7' },
];

export function Testimonials() {
  return (
    <section className="defer home-testimonials" style={{ background: 'transparent', borderTop: '1px solid var(--line)', padding: '4rem 1rem' }}>
      <div className="shell">
        <motion.div initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:.4 }}
          style={{ marginBottom: '2.5rem' }}
        >
          <span className="label-chip" style={{ marginBottom: '1rem', display: 'inline-flex' }}>Student Reviews</span>
          <h2 className="font-display font-black mt-3" style={{ fontSize: 'clamp(1.75rem,4vw,2.5rem)', letterSpacing: '-.035em', color: 'var(--navy)' }}>
            1,200+ students already submitted
          </h2>
        </motion.div>

        <div className="home-review-track grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {R.map((r, i) => {
            const av = AVBG[r.i % AVBG.length];
            return (
              <motion.div key={r.name}
                initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
                transition={{ duration:.35, delay:i*.06 }}
                className="card card-lift home-review-card"
                style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}
              >
                <div style={{ display: 'flex', gap: '2px', marginBottom: '1rem' }}>
                  {[1,2,3,4,5].map(s => <Star key={s} style={{ width: '13px', height: '13px', fill: '#F59E0B', color: '#F59E0B' }} />)}
                </div>
                <p style={{ fontSize: '.9375rem', color: 'var(--ink-2)', lineHeight: 1.75, flex: 1, marginBottom: '1.125rem' }}>
                  &ldquo;{r.t}&rdquo;
                </p>
                <span className="tag tag-teal" style={{ fontSize: '.6rem', width: 'fit-content', marginBottom: '1rem' }}>{r.project}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem', paddingTop: '.875rem', borderTop: '1px solid var(--line)' }}>
                  <div style={{ width: '2.25rem', height: '2.25rem', borderRadius: '50%', flexShrink: 0, background: av.bg, color: av.c, border: `1.5px solid ${av.bg}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.6875rem', fontWeight: 800 }}>
                    {r.av}
                  </div>
                  <div>
                    <p style={{ fontSize: '.9375rem', fontWeight: 700, color: 'var(--navy)', lineHeight: 1.3 }}>{r.name}</p>
                    <p style={{ fontSize: '.75rem', color: 'var(--ink-4)', marginTop: '.125rem' }}>{r.college}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
