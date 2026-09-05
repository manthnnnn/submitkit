'use client';
import Link from "next/link";
import { motion } from "framer-motion";
import { CONSTANTS } from "@/lib/constants";
import { ArrowRight, CheckCircle2, Zap, Download, ShieldCheck, Star } from "lucide-react";
import { PricingHook } from "@/components/ui/pricing-hook";
import { CompareSlider } from "@/components/ui/compare-slider";
import { FleetSection } from "@/components/ui/fleet-section";
import { useEffect, useState, useRef } from "react";

// Animated counter hook
function useCounter(target: number, duration: number = 1500) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

function StatCounter({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  const { count, ref } = useCounter(target);
  return (
    <div ref={ref} className="text-center">
      <div className="text-2xl md:text-3xl font-display font-bold text-white">
        {count.toLocaleString('en-IN')}{suffix}
      </div>
      <div className="text-xs text-zinc-500 mt-1">{label}</div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-[#09090b]">

      {/* Background Orbs */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="glow-orb w-[800px] h-[600px] bg-brand-500/15 -translate-y-1/2 -translate-x-1/4" />
        <div className="glow-orb w-[600px] h-[600px] bg-emerald-500/10 translate-y-1/3 translate-x-1/3" />
      </div>

      {/* ═══════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════ */}
      <section className="relative pt-20 md:pt-28 pb-16">
        <div className="container mx-auto px-4 z-10 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Left: Pitch */}
            <div className="text-left max-w-xl">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-zinc-300 text-xs mb-5"
              >
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Trusted by 15,000+ students across India
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-display font-medium tracking-tight mb-5 text-white leading-[1.1]"
              >
                Skip the tension.<br />
                <span className="text-gradient font-bold">Project ready in 5 mins.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-base text-zinc-400 mb-7 leading-relaxed"
              >
                Stop begging seniors. Stop paying ₹10,000 to local shops. Get working code, a 60-page print-ready Black Book, and PPT slides — instantly.
              </motion.p>

              {/* Star rating social proof */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="flex items-center gap-2 mb-6"
              >
                <div className="flex">{[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />)}</div>
                <span className="text-zinc-300 text-sm font-medium">4.9/5</span>
                <span className="text-zinc-600 text-sm">from 1,200+ students</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-3"
              >
                <Link href="/projects" className="flex items-center gap-2 px-7 py-3 rounded-full bg-white hover:bg-zinc-100 text-zinc-950 font-bold text-sm transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.25)]">
                  Browse Projects <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="#pricing" className="flex items-center gap-2 px-7 py-3 rounded-full bg-transparent hover:bg-white/5 text-white font-medium text-sm transition-all border border-white/15">
                  See Pricing
                </Link>
              </motion.div>
            </div>

            {/* Right: Pricing Hook Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full"
            >
              <PricingHook />
            </motion.div>
          </div>

          {/* College Trust Row */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-14 pt-8 border-t border-white/5"
          >
            <p className="text-center text-xs text-zinc-600 mb-4 uppercase tracking-wider">Trusted by students from</p>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-zinc-600 font-medium">
              {['VTU', 'Mumbai University', 'Pune University', 'Anna University', 'JNTU', 'GTU', 'RGPV', 'MDU'].map(uni => (
                <span key={uni} className="hover:text-zinc-400 transition-colors cursor-default">{uni}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          STATS COUNTER SECTION
      ═══════════════════════════════════════ */}
      <section className="py-10 border-y border-white/5 bg-white/[0.01]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            <StatCounter target={15000} suffix="+" label="Students Helped" />
            <StatCounter target={51} suffix="+" label="Ready Projects" />
            <StatCounter target={99} suffix="%" label="Run On First Try" />
            <StatCounter target={4} suffix=" min" label="Avg Delivery Time" />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          BENTO GRID (What & Why)
      ═══════════════════════════════════════ */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4 z-10 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-display font-medium mb-3 text-white">Everything you need to pass</h2>
            <p className="text-zinc-500 max-w-lg mx-auto">One download. Zero headaches. Working in under 5 minutes.</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">

            {/* Compare Slider - spans 2 cols */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-2 glass-card rounded-3xl overflow-hidden"
            >
              <div className="p-5 pb-0">
                <h3 className="text-sm font-semibold text-zinc-400">Which side are you on at 3 AM before your Viva?</h3>
              </div>
              <div className="p-3 w-full flex items-center justify-center min-h-[380px]">
                <CompareSlider />
              </div>
            </motion.div>

            {/* Right column */}
            <div className="flex flex-col gap-5">

              {/* Why SubmitKit */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="glass-card rounded-3xl p-6 flex-grow"
              >
                <h3 className="text-sm font-semibold text-emerald-400 mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> The SubmitKit Way
                </h3>
                <ul className="space-y-3">
                  {[
                    'Starts from just ₹299',
                    '1-click run — zero errors',
                    'Top 25 Viva Q&As included',
                    'PPT Slides for your defense',
                    'Instant email delivery',
                  ].map(item => (
                    <li key={item} className="flex items-center gap-2.5 text-zinc-300 text-xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* 3 Steps */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="glass-card rounded-3xl p-6 bg-brand-500/5 border-brand-500/20"
              >
                <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-brand-400" /> 3 Steps to Submit
                </h3>
                <div className="flex flex-col gap-3">
                  {[
                    { num: '1', text: 'Buy instantly via UPI', color: 'bg-brand-500/20 text-brand-400' },
                    { num: '2', text: 'Download & run the code', color: 'bg-emerald-500/20 text-emerald-400' },
                    { num: '3', text: 'Print report & pass Viva', color: 'bg-amber-500/20 text-amber-400' },
                  ].map((step, i) => (
                    <div key={step.num}>
                      {i > 0 && <div className="w-px h-3 bg-white/10 ml-3.5 mb-3" />}
                      <div className="flex items-center gap-2.5">
                        <div className={`w-7 h-7 rounded-full ${step.color} font-bold flex items-center justify-center text-xs shrink-0`}>{step.num}</div>
                        <span className="text-xs text-zinc-300 font-medium">{step.text}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FLEET SECTION: AVAILABLE VS UPCOMING
      ═══════════════════════════════════════ */}
      <FleetSection />

      {/* ═══════════════════════════════════════
          PRICING SECTION
      ═══════════════════════════════════════ */}
      <section id="pricing" className="py-16 relative border-t border-white/5">
        <div className="container mx-auto px-4 text-center z-10 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-medium mb-3 text-white">Simple Pricing. No Hidden Charges.</h2>
            <p className="text-zinc-500 max-w-lg mx-auto mb-12">Pay once, download instantly. No subscriptions. No nonsense.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto text-left">

            {/* Mini */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass-card rounded-2xl p-8 flex flex-col hover-glow transition-all duration-500 hover:-translate-y-1 border-t-2 border-t-white/20"
            >
              <h3 className="text-xl font-medium text-white mb-1">Mini Project</h3>
              <p className="text-xs text-zinc-500 mb-5">Perfect for 5th or 6th semester submissions.</p>
              <div className="flex items-baseline gap-2 mb-6 pb-6 border-b border-white/5">
                <span className="text-4xl font-bold text-white">₹{CONSTANTS.PRICING.MINI_PROJECT}</span>
                <span className="text-zinc-600 text-sm line-through">₹1,499</span>
              </div>
              <ul className="space-y-3 mb-8 flex-grow">
                {['Working Source Code', 'Setup Guide', '30-page Black Book Report', 'Instant Download'].map(item => (
                  <li key={item} className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-zinc-500 shrink-0" />
                    <span className="text-zinc-400 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/projects?tier=MINI" className="block w-full py-3 px-4 bg-white/5 hover:bg-white/10 text-center rounded-xl text-white font-medium transition-all text-sm border border-white/10 hover:border-white/20">
                Browse Mini Projects
              </Link>
            </motion.div>

            {/* Major - Featured */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass-card rounded-2xl p-8 flex flex-col relative hover-glow transition-all duration-500 hover:-translate-y-2 border-t-2 border-t-brand-500 md:-translate-y-3 shadow-2xl shadow-brand-500/10"
            >
              <div className="absolute top-4 right-4 bg-brand-500/20 border border-brand-500/30 text-brand-400 text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                <Zap className="w-2.5 h-2.5 fill-brand-400" /> Most Popular
              </div>
              <h3 className="text-xl font-medium text-white mb-1">Major Project</h3>
              <p className="text-xs text-zinc-500 mb-5">Best for Final Year BE/BTech/MCA (7th/8th sem).</p>
              <div className="flex items-baseline gap-2 mb-6 pb-6 border-b border-white/5">
                <span className="text-4xl font-bold text-white">₹{CONSTANTS.PRICING.MAJOR_PROJECT}</span>
                <span className="text-zinc-600 text-sm line-through">₹3,999</span>
              </div>
              <ul className="space-y-3 mb-8 flex-grow">
                {['Advanced ML / Full-Stack App', '60-page IEEE Black Book', 'Defense PPT with Speaker Notes', 'Top 25 Viva Q&As', 'Instant Secure Download'].map(item => (
                  <li key={item} className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-brand-400 shrink-0" />
                    <span className="text-zinc-300 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/projects?tier=MAJOR" className="block w-full py-3 px-4 bg-white hover:bg-zinc-100 text-center rounded-xl text-zinc-950 font-bold transition-all text-sm shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                Browse Major Projects
              </Link>
            </motion.div>

          </div>

          {/* Trust strip below pricing */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-6 mt-10 text-xs text-zinc-600"
          >
            <div className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-zinc-500" /> Razorpay Secured</div>
            <div className="flex items-center gap-1.5"><Download className="w-4 h-4 text-zinc-500" /> Instant Delivery</div>
            <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-zinc-500" /> Bug-Free Code Guarantee</div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
