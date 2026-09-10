'use client';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CONSTANTS } from "@/lib/constants";
import { ArrowRight, CheckCircle2, Zap, Download, ShieldCheck, Star, Sparkles, MonitorPlay, Search, BookOpen, ChevronRight } from "lucide-react";
import { PricingHook } from "@/components/ui/pricing-hook";
import { CompareSlider } from "@/components/ui/compare-slider";
import { FleetSection } from "@/components/ui/fleet-section";
import { Testimonials } from "@/components/ui/testimonials";
import { LiveTicker } from "@/components/ui/live-ticker";
import { useEffect, useState, useRef } from "react";
import { searchTopics, TopicCard } from "@/lib/blueprint-engine";

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
  const router = useRouter();
  const [topicQuery, setTopicQuery] = useState("");
  const [topicResults, setTopicResults] = useState<TopicCard[]>([]);
  const [stats, setStats] = useState({ totalScans: 3847, moneySavedFormatted: "₹12 Lakh+", totalOrders: 150 });

  useEffect(() => {
    fetch('/api/stats/global')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(() => {});
  }, []);

  const handleTopicSearchChange = (val: string) => {
    setTopicQuery(val);
    if (val.trim().length >= 1) {
      setTopicResults(searchTopics(val).slice(0, 4));
    } else {
      setTopicResults([]);
    }
  };

  const handleTopicSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topicQuery.trim()) {
      const matches = searchTopics(topicQuery);
      if (matches.length > 0) {
        router.push(`/blueprint/${matches[0].id}`);
      } else {
        router.push('/blueprint');
      }
    } else {
      router.push('/blueprint');
    }
  };

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
              <LiveTicker />

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
                <span className="text-zinc-600 text-sm">from 500+ students</span>
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

              {/* Divider / Visual Separation */}
              <div className="mt-12 mb-8 w-full max-w-lg flex items-center gap-4">
                <div className="h-px bg-zinc-800 flex-1"></div>
                <span className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">Or Search Any Topic Free</span>
                <div className="h-px bg-zinc-800 flex-1"></div>
              </div>

              {/* Free Project Topic Blueprint Search */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="w-full max-w-lg bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 border border-zinc-800/80 rounded-2xl p-5 md:p-6 shadow-2xl backdrop-blur-md relative"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 shrink-0 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                    <BookOpen className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold tracking-tight text-lg">Free Project Topic Blueprint</h3>
                    <span className="inline-block text-[11px] text-emerald-400 font-medium">100% Free Search • 1000+ Topics</span>
                  </div>
                </div>
                <p className="text-zinc-400 text-sm mb-4 leading-relaxed">
                  Have a topic in mind? Search it to see what examiners expect, sample viva questions, and the complete build plan.
                </p>

                <form 
                  onSubmit={handleTopicSubmit}
                  className="relative flex items-center bg-black border border-zinc-700/80 rounded-xl p-1.5 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/20 transition-all shadow-inner"
                >
                  <Search className="w-4 h-4 text-zinc-500 ml-2 shrink-0" />
                  <input
                    type="text"
                    placeholder="Search e.g. Face Recognition, Fraud, IoT..."
                    value={topicQuery}
                    onChange={(e) => handleTopicSearchChange(e.target.value)}
                    className="w-full bg-transparent border-none text-white px-3 py-2 outline-none text-sm placeholder:text-zinc-600"
                  />
                  <button
                    type="submit"
                    className="shrink-0 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-1.5 transition-colors shadow-sm"
                  >
                    Search <ArrowRight className="w-4 h-4" />
                  </button>
                </form>

                {/* Instant Topic Autocomplete Results */}
                {topicResults.length > 0 && (
                  <div className="mt-3 bg-zinc-950 border border-zinc-800 rounded-xl divide-y divide-zinc-800/80 overflow-hidden shadow-xl">
                    {topicResults.map((t) => (
                      <Link
                        key={t.id}
                        href={`/blueprint/${t.id}`}
                        className="flex items-center justify-between p-3 hover:bg-blue-600/10 transition-colors group"
                      >
                        <div className="min-w-0 pr-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors truncate">
                              {t.title}
                            </span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 font-mono shrink-0">
                              {t.category}
                            </span>
                          </div>
                          <p className="text-[11px] text-zinc-500 truncate mt-0.5">{t.tagline}</p>
                        </div>
                        <span className="text-xs text-blue-400 font-semibold shrink-0 flex items-center gap-1">
                          Free Preview <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </Link>
                    ))}
                  </div>
                )}

                {/* Popular Quick Chips */}
                <div className="mt-4">
                  <span className="text-[11px] text-zinc-500 font-medium block mb-2">Trending topics:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { name: "Face Recognition", id: "face-recognition-attendance" },
                      { name: "Plant Disease", id: "plant-disease-detection" },
                      { name: "Fraud Detection", id: "credit-card-fraud-detection" },
                      { name: "Smart Traffic", id: "smart-traffic-system" },
                    ].map((chip) => (
                      <Link
                        key={chip.id}
                        href={`/blueprint/${chip.id}`}
                        className="text-[11px] px-2.5 py-1 rounded-full bg-zinc-800/60 hover:bg-blue-600/20 hover:text-blue-300 hover:border-blue-500/30 text-zinc-400 border border-zinc-700/60 transition-all"
                      >
                        {chip.name}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Blueprint Teaser & A-Z Link */}
                <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs">
                  <span className="text-zinc-500">Full 20-page build PDF only ₹19</span>
                  <Link
                    href="/blueprint"
                    className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
                  >
                    Browse 1000+ Trending Topics A-Z <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
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
          STATS ROW (Global Counter)
      ═══════════════════════════════════════ */}
      <section className="py-10 border-t border-b border-white/5 bg-zinc-950/50 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <StatCounter target={stats.totalScans} suffix="+" label="Projects Analyzed" />
            <StatCounter target={9}    suffix=""   label="Available Projects" />
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-display font-bold text-emerald-400">
                {stats.moneySavedFormatted}
              </div>
              <div className="text-xs text-zinc-500 mt-1">Saved from Local Shops</div>
            </div>
            <StatCounter target={stats.totalOrders} suffix="+" label="Students Passed" />
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════
          DEMO VIDEO (How it works)
      ═══════════════════════════════════════ */}
      <section className="py-16 border-b border-white/5 relative bg-zinc-950/50">
        <div className="container mx-auto px-4 z-10 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold mb-4 border border-blue-500/20 uppercase tracking-wider">
              <MonitorPlay className="w-3.5 h-3.5" /> 2-Minute Setup
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-medium mb-3 text-white">See it in action</h2>
            <p className="text-zinc-500 max-w-lg mx-auto">From instant download to a fully working localhost project in under 2 minutes.</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(59,130,246,0.1)] bg-black relative ring-1 ring-white/5"
          >
            <video 
              controls
              playsInline
              preload="metadata"
              poster="/video-poster.jpg"
              className="w-full aspect-video object-contain"
            >
              <source src="/demo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </motion.div>
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
          TESTIMONIALS
      ═══════════════════════════════════════ */}
      <Testimonials />

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
