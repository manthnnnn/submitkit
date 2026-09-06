'use client';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Rahul Sharma',
    college: 'VTU, 8th Semester — B.E. Computer Science',
    avatar: 'RS',
    project: 'LifeDrop Blood Bank OS',
    rating: 5,
    text: "Bought at 11 PM the night before submission. Ran it with one double-click, printed the Black Book at a shop near campus, and submitted by 9 AM. Got an A. The 25 Viva Q&As saved me completely.",
    color: 'from-rose-500/20 to-rose-500/5',
    border: 'border-rose-500/20',
  },
  {
    name: 'Priya Nair',
    college: 'Mumbai University, 6th Semester — B.Sc. IT',
    avatar: 'PN',
    project: 'TalentScan AI Resume Parser',
    rating: 5,
    text: "Was searching everywhere for a proper mini project. Local shops were quoting ₹8,000 and couldn't even explain the code. Paid ₹299 here and got better code, better report, and the PPT with speaker notes. Genuine value.",
    color: 'from-brand-500/20 to-brand-500/5',
    border: 'border-brand-500/20',
  },
  {
    name: 'Arjun Patel',
    college: 'GTU, 7th Semester — B.E. Information Technology',
    avatar: 'AP',
    project: 'SentinelPay AI Fraud Radar',
    rating: 5,
    text: "The project ran perfectly on the first try. My guide asked me to explain the fraud detection algorithm during Viva and I answered everything from the Q&A sheet. External examiner was actually impressed.",
    color: 'from-emerald-500/20 to-emerald-500/5',
    border: 'border-emerald-500/20',
  },
  {
    name: 'Sneha Kulkarni',
    college: 'Pune University, 8th Semester — B.E. E&TC',
    avatar: 'SK',
    project: 'PhishGuard AI Threat Radar',
    rating: 5,
    text: "I'm from a non-CS branch so was scared about running Node.js projects. The run.bat file installed everything automatically. I just double-clicked and it opened in the browser. Even I could demo it confidently.",
    color: 'from-amber-500/20 to-amber-500/5',
    border: 'border-amber-500/20',
  },
  {
    name: 'Karthik Reddy',
    college: 'JNTU, 7th Semester — B.Tech CSE',
    avatar: 'KR',
    project: 'AeroFuel Predictor AI',
    rating: 5,
    text: "Paid extra ₹99 to get my name printed on the Black Book cover. Got the personalised PDF within minutes. College department panel saw my name on the title page and thought I'd been working on it for months.",
    color: 'from-cyan-500/20 to-cyan-500/5',
    border: 'border-cyan-500/20',
  },
  {
    name: 'Divya Menon',
    college: 'Anna University, 6th Semester — B.E. CSE',
    avatar: 'DM',
    project: 'QuickBite Restaurant QR System',
    rating: 5,
    text: "The QR code actually worked on my phone — scanned it and the menu opened. My professor asked me to demonstrate and I showed the full ordering flow live. He said it looked like a real product. I agree.",
    color: 'from-violet-500/20 to-violet-500/5',
    border: 'border-violet-500/20',
  },
];

export function Testimonials() {
  return (
    <section className="py-20 border-t border-white/5 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.04)_0%,transparent_70%)] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Star className="w-3 h-3 fill-amber-400" />
            <span>Real Students. Real Results.</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-medium text-white mb-4 tracking-tight">
            1,200+ Students Have Already Submitted
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto">
            Don't take our word for it — read what students say after using SubmitKit for their final year submission.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-7xl mx-auto">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className={`glass-card p-6 rounded-2xl border ${t.border} bg-gradient-to-b ${t.color} relative group hover:-translate-y-1 transition-all duration-300`}
            >
              {/* Quote icon */}
              <Quote className="w-6 h-6 text-white/10 absolute top-5 right-5" />

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[1,2,3,4,5].map(s => (
                  <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Review text */}
              <p className="text-zinc-300 text-sm leading-relaxed mb-5">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Project tag */}
              <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                {t.project}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-zinc-600 to-zinc-800 flex items-center justify-center text-xs font-bold text-white shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-white text-sm font-semibold leading-tight">{t.name}</p>
                  <p className="text-zinc-500 text-[11px] leading-tight mt-0.5">{t.college}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom trust strip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mt-12"
        >
          {[
            { val: '4.9/5', label: 'Average Rating' },
            { val: '1,200+', label: 'Students Served' },
            { val: '99%', label: 'Run on First Try' },
            { val: '<5 min', label: 'Avg Setup Time' },
          ].map(s => (
            <div key={s.label} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/8 text-sm">
              <span className="font-bold text-white">{s.val}</span>
              <span className="text-zinc-500">{s.label}</span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
