'use client';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CONSTANTS } from "@/lib/constants";
import { ArrowRight, CheckCircle2, Zap, Download, ShieldCheck, Star, Sparkles, MonitorPlay, Search, BookOpen, ChevronRight, MessageCircle, Compass } from "lucide-react";
import { PricingHook } from "@/components/ui/pricing-hook";
import { CompareSlider } from "@/components/ui/compare-slider";
import { FleetSection } from "@/components/ui/fleet-section";
import { Testimonials } from "@/components/ui/testimonials";
import { LiveTicker } from "@/components/ui/live-ticker";
import { useEffect, useState, useRef } from "react";
import { searchTopics, TopicCard, ALL_TOPICS } from "@/lib/blueprint-engine";

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
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

function StatCounter({ target, suffix = '', label }: { target: number; suffix?: string; label: string }) {
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
  const [stats, setStats] = useState<{
    totalScans: number;
    totalOrders: number;
    moneySaved: number;
    moneySavedFormatted: string;
    recentActivities: any[];
  }>({
    totalScans: 852,
    totalOrders: 189,
    moneySaved: 120000,
    moneySavedFormatted: '₹1,20,000+',
    recentActivities: []
  });

  const [topicQuery, setTopicQuery] = useState("");
  const [topicResults, setTopicResults] = useState<TopicCard[]>([]);

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
      if (matches.length === 1) {
        router.push(`/blueprint/${matches[0].id}`);
      } else {
        router.push(`/blueprint?q=${encodeURIComponent(topicQuery.trim())}`);
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

              {/* Divider / Clean Visual Portal Entrance */}
              <div className="mt-12 mb-6 w-full max-w-lg flex items-center gap-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400/90 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  Topic Intelligence & 1-Prompt Roadmaps
                </span>
                <div className="h-px bg-gradient-to-r from-emerald-500/25 via-white/10 to-transparent flex-1" />
              </div>

              {/* Ultra-Professional Topic Explorer Portal */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="w-full max-w-lg relative rounded-3xl border border-white/10 bg-gradient-to-b from-zinc-900/95 via-zinc-950/95 to-black p-6 md:p-7 shadow-2xl backdrop-blur-2xl transition-all duration-300 hover:border-emerald-500/30 group"
              >
                {/* Ambient glow accent */}
                <div className="absolute -top-12 -right-12 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

                {/* Top header */}
                <div className="flex items-start gap-3.5 mb-4">
                  <div className="w-10 h-10 shrink-0 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-brand-500/10 border border-emerald-500/30 flex items-center justify-center shadow-inner">
                    <Compass className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-white font-bold tracking-tight text-lg md:text-xl">
                        Choose Your Project Topic
                      </h3>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 uppercase tracking-wide">
                        1,000+ Free
                      </span>
                    </div>
                    <p className="text-zinc-400 text-xs md:text-sm mt-1 leading-relaxed">
                      Full system architecture, step-by-step code roadmaps, and 1-Prompt AI build prompts.
                    </p>
                  </div>
                </div>

                {/* Frosted Modern Search Bar */}
                <form 
                  onSubmit={handleTopicSubmit}
                  className="relative flex items-center bg-black/70 border border-white/15 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 rounded-2xl p-1.5 transition-all shadow-inner"
                >
                  <Search className="w-4 h-4 text-zinc-400 ml-2.5 shrink-0" />
                  <input
                    type="text"
                    placeholder="Search e.g. Face Recognition, IoT, Fraud, RAG..."
                    value={topicQuery}
                    onChange={(e) => handleTopicSearchChange(e.target.value)}
                    className="w-full bg-transparent border-none text-white px-3 py-2 outline-none text-xs md:text-sm placeholder:text-zinc-500"
                  />
                  <button
                    type="submit"
                    className="shrink-0 bg-white hover:bg-zinc-100 text-zinc-950 px-4 py-2 rounded-xl font-bold text-xs md:text-sm flex items-center gap-1.5 transition-all shadow-sm hover:shadow-[0_0_15px_rgba(255,255,255,0.25)]"
                  >
                    Search <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>

                {/* Instant Topic Autocomplete Results */}
                {topicResults.length > 0 && (
                  <div className="mt-3 bg-zinc-950/95 border border-white/10 rounded-2xl divide-y divide-white/5 overflow-hidden shadow-2xl backdrop-blur-xl">
                    {topicResults.map((t) => (
                      <Link
                        key={t.id}
                        href={`/blueprint/${t.id}`}
                        className="flex items-center justify-between p-3 hover:bg-emerald-500/10 transition-colors group"
                      >
                        <div className="min-w-0 pr-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors truncate">
                              {t.title}
                            </span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-zinc-400 border border-white/10 font-mono shrink-0">
                              {t.category}
                            </span>
                          </div>
                          <p className="text-[11px] text-zinc-500 truncate mt-0.5">{t.tagline}</p>
                        </div>
                        <span className="text-xs text-emerald-400 font-semibold shrink-0 flex items-center gap-1">
                          View Roadmap <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </Link>
                    ))}
                  </div>
                )}

                {/* Popular Quick Chips with Domain Pills */}
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] text-zinc-400 font-medium">Trending searches:</span>
                    <span className="text-[10px] text-zinc-500">Free preview available</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { name: "Face Recognition", domain: "AI", id: "face-recognition-attendance" },
                      { name: "Plant Disease", domain: "Vision", id: "plant-disease-detection" },
                      { name: "Fraud Detection", domain: "Fintech", id: "credit-card-fraud-detection" },
                      { name: "IoT Telemetry", domain: "ESP32", id: "iot-smart-energy-meter" },
                    ].map((chip) => (
                      <Link
                        key={chip.id}
                        href={`/blueprint/${chip.id}`}
                        className="text-[11px] px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-white/10 hover:text-white hover:border-emerald-500/30 text-zinc-300 border border-white/10 transition-all flex items-center gap-1.5"
                      >
                        <span>{chip.name}</span>
                        <span className="text-[9px] px-1 py-0.2 rounded bg-white/10 text-zinc-400 font-mono">{chip.domain}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* High-Impact Direct Catalog Link */}
                <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs text-zinc-400">
                      Looking for a specific domain or stack?
                    </span>
                  </div>
                  <Link
                    href="/blueprint"
                    className="text-xs text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1.5 transition-colors group/link"
                  >
                    <span>Browse 1,000+ Topics A–Z</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
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
            <StatCounter target={ALL_TOPICS.length} suffix="+" label="Topic Blueprints" />
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto text-left">

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
                <span className="text-zinc-600 text-sm line-through">₹999</span>
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

            {/* Custom Project - Tailored Build */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="glass-card rounded-2xl p-8 flex flex-col hover-glow transition-all duration-500 hover:-translate-y-1 border-t-2 border-t-emerald-500/80 bg-emerald-950/10 relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-xl font-medium text-white">Custom Project</h3>
                <span className="bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[10px] uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5 text-emerald-400" /> Tailored Build
                </span>
              </div>
              <p className="text-xs text-zinc-500 mb-5">Engineered strictly to your specifications & feature requirements.</p>
              <div className="flex items-baseline gap-2 mb-6 pb-6 border-b border-white/5">
                <span className="text-4xl font-bold text-white">₹1,999</span>
                <span className="text-zinc-600 text-sm line-through">₹5,999</span>
                <span className="text-xs text-emerald-400 font-semibold ml-1">Starting from</span>
              </div>
              <ul className="space-y-3 mb-8 flex-grow">
                {[
                  'Custom feature scope & architecture',
                  'Production-ready source code repository',
                  '20-Page comprehensive technical report',
                  'Architecture & defense presentation slides',
                  '1-on-1 code walkthrough & setup guide',
                  '48-Hour delivery with dedicated engineer',
                ].map(item => (
                  <li key={item} className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span className="text-zinc-300 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href={`https://wa.me/918799814256?text=${encodeURIComponent("Hi SubmitKit team! I want to build a custom project. Here are my requirements:\n\n• Project Title / Idea:\n• Preferred Tech Stack:\n• Core Features Needed:\n• Target Timeline / Deadline:")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-center rounded-xl text-black font-bold transition-all text-sm shadow-[0_0_20px_rgba(37,211,102,0.25)] flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-black" /> Order Custom Build on WhatsApp
              </a>
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
