import { BLOG_POSTS, type BlogPost } from '@/lib/blog-posts';
import Link from 'next/link';
import { Clock, Tag, ArrowRight, BookOpen, ChevronRight, Home } from 'lucide-react';
import type { Metadata } from 'next';
import { BreadcrumbsSchema, FAQSchema } from '@/components/seo/SeoSchema';
import { CONSTANTS } from '@/lib/constants';

const CATEGORY_ICONS: Record<string, string> = {
  'Project Selection': '🎯',
  'IEEE Format': '📄',
  'Viva Defense': '🎓',
  'AI & ML': '🤖',
};

const HOME_FAQ = [
  {
    question: 'How do I choose a unique final year CSE project that gets approved?',
    answer: 'Pick a domain with clear societal or enterprise utility (e.g. Healthcare AI, Fraud Detection, IoT Smart Energy). Ensure you have a clear dataset or sensor source, and choose a project where you can benchmark at least two algorithms (e.g. Random Forest vs XGBoost) to prove academic rigor.',
  },
  {
    question: 'What is the standard IEEE Black Book format for final year submissions?',
    answer: 'The standard IEEE Black Book has 7 core chapters: 1. Introduction, 2. Literature Survey (with summary matrix of 10+ papers), 3. System Architecture & UML, 4. Methodology / Algorithm, 5. Results & Comparative Accuracy, 6. Conclusion & Future Scope, 7. References in IEEE numbered format [1], [2]. SubmitKit templates follow this exact structure.',
  },
  {
    question: 'Can I get complete source code and Black Book report from SubmitKit?',
    answer: 'Yes! SubmitKit offers verified, runnable project kits (Mini ₹299 / Major ₹499) that include 100% working source code, a 60-page IEEE format Black Book (.docx), defense PPT slides, and top 25 Viva Q&A with answers. Instant delivery via WhatsApp & Email.',
  },
  {
    question: 'How can I prepare for external examiner Viva defense?',
    answer: 'Examiners focus on three core questions: Why did you pick this algorithm? What are the limitations of your system? Can you walk me through this specific function in the code? SubmitKit includes 25 pre-written Viva answers specifically mapped to each project so you never get caught off guard.',
  },
];

export const metadata: Metadata = {
  title: 'Engineering Project Guides, 500+ Ideas & IEEE Black Book Templates | SubmitKit',
  description: 'Free engineering final year guides, CSE / AIML / IoT project ideas, IEEE Black Book report templates (.docx), and Viva defense tips. Written by verified engineers for VTU, SPPU, Mumbai, Anna, JNTU, GTU students.',
  alternates: { canonical: '/blog' },
};

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800">
      <BreadcrumbsSchema items={[{ name: 'Home', url: '/' }, { name: 'Blog' }]} />
      <FAQSchema faqs={HOME_FAQ} />

      <div className="bg-white border-b border-slate-200/90 pt-12 pb-14">
        <div className="container mx-auto px-4 max-w-6xl">
          <nav aria-label="Breadcrumb" className="flex items-center text-xs text-slate-500 mb-8 gap-1.5 flex-wrap">
            <Link href="/" className="hover:text-indigo-600 transition-colors inline-flex items-center gap-1 font-medium">
              <Home className="w-3.5 h-3.5" /> Home
            </Link>
            <ChevronRight className="h-3 w-3 shrink-0 text-slate-400" />
            <span className="text-slate-800 font-semibold">Blog</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-12">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-xs font-bold tracking-wide mb-5">
                <BookOpen className="w-3.5 h-3.5 text-teal-600" />
                FREE FINAL YEAR KNOWLEDGE BASE
              </div>
              <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-slate-900 tracking-tight leading-[1.1] mb-5">
                Project Guides, 500+ Ideas &amp;<br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-600 via-teal-500 to-emerald-600">
                  IEEE Report Templates
                </span>
              </h1>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed max-w-3xl mb-6">
                Everything you need to score 95% in your VTU / SPPU / Mumbai / Anna / JNTU / GTU final year submission. Written by SubmitKit Engineering team — 65+ university projects delivered &amp; verified.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/projects" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-all">
                  Browse Verified Project Kits <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/blueprint" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold text-xs sm:text-sm hover:bg-slate-50 transition-all shadow-xs">
                  Free Blueprint Starter (Topic Approval)
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 w-full md:w-auto md:min-w-[420px]">
              {[
                { num: BLOG_POSTS.length + '+', label: 'Published Guides', sub: 'Updated weekly' },
                { num: '500+', label: 'Project Ideas', sub: 'CSE AIML IoT Web' },
                { num: '60p', label: 'IEEE Templates', sub: 'VTU SPPU MU GTU' },
              ].map((s, i) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-xs">
                  <div className="font-display font-black text-2xl text-slate-900 leading-none">{s.num}</div>
                  <div className="text-[11px] font-bold text-indigo-700 mt-2 uppercase tracking-wide">{s.label}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl py-14 space-y-16">
        <section>
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="font-display font-bold text-2xl md:text-3xl text-slate-900 tracking-tight mb-2">
                Latest University Guides
              </h2>
              <p className="text-slate-600 text-sm md:text-base max-w-2xl leading-relaxed">
                Long-form, SEO-optimised deep dives. Each guide gives you the exact project structure, chapter-by-chapter report outline, working algorithms, and Viva Q&amp;A with examiner-approved answers.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BLOG_POSTS.map((post: BlogPost) => (
              <article
                key={post.slug}
                className="bg-white rounded-2xl border border-slate-200/90 p-6 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-indigo-300 transition-all group"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {CATEGORY_ICONS[post.category]} {post.category}
                    </span>
                    <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 inline-flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-500" /> {post.estimatedReadTime} read
                    </span>
                  </div>

                  <h3 className="font-display text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-snug mb-3">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">
                    {post.summary}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {post.tags.slice(0, 4).map((tag: string, i: number) => (
                      <span key={i} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200 text-slate-600 text-[10px] font-medium">
                        <Tag className="w-2.5 h-2.5 text-slate-400" /> {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs border border-indigo-200">
                      SK
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-900">{post.author}</div>
                      <div className="text-[10px] text-slate-400">{new Date(post.publishedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
                    </div>
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
                  >
                    Read <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Highlight Callout Box */}
        <section>
          <div className="rounded-2xl bg-gradient-to-r from-indigo-50/80 via-white to-emerald-50/80 border border-indigo-200/90 p-8 md:p-10 shadow-sm relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
              <div className="lg:col-span-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 border border-indigo-200 text-indigo-800 text-xs font-bold tracking-wide mb-4">
                  ⚡ FINAL YEAR SUBMISSION ACCELERATOR
                </div>
                <h3 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-slate-900 tracking-tight leading-tight mb-4">
                  60 Days to Submission?<br />
                  Get <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-emerald-600">Full Verified Project Kit</span> Today.
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl mb-6">
                  <strong>1-click runnable source code</strong> + <strong>60-page editable IEEE Black Book (.docx)</strong> + <strong>defense PPT with speaker notes</strong> + <strong>top 25 Viva Q&amp;A with examiner-approved answers</strong>. Instant download. Mini ₹{CONSTANTS.PRICING.MINI_PROJECT}, Major ₹{CONSTANTS.PRICING.MAJOR_PROJECT}.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link href="/projects" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-all">
                    Browse All Project Kits <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a href={CONSTANTS.SUPPORT_WHATSAPP} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 font-semibold text-xs sm:text-sm hover:bg-slate-50 transition-all shadow-xs">
                    Talk on WhatsApp ({CONSTANTS.SUPPORT_PHONE})
                  </a>
                </div>
              </div>

              <div className="lg:col-span-2 space-y-3">
                {[
                  { title: 'Mini Project Kit', price: `₹${CONSTANTS.PRICING.MINI_PROJECT}`, features: ['30-page IEEE report .docx', 'Source Code + README', '15-slide PPT', 'Top 15 Viva Q&A'] },
                  { title: 'Major Project Kit', price: `₹${CONSTANTS.PRICING.MAJOR_PROJECT}`, highlight: true, features: ['60-page IEEE report .docx', '1-click runnable full code', '25-slide defense PPT', 'Top 25 Viva Q&A + Answers'] },
                ].map((plan, i) => (
                  <div key={i} className={`p-5 rounded-xl border shadow-xs ${plan.highlight ? 'bg-white border-indigo-300' : 'bg-slate-50/80 border-slate-200'}`}>
                    <div className="flex items-center justify-between mb-2.5">
                      <div className="text-xs font-bold text-slate-900 uppercase tracking-wide">{plan.title}</div>
                      <div className="font-display font-black text-xl text-slate-900">{plan.price}</div>
                    </div>
                    <ul className="space-y-1.5">
                      {plan.features.map((f, j) => (
                        <li key={j} className="text-xs text-slate-600 flex items-center gap-2">
                          <span className="text-emerald-600 font-bold">✓</span> {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section>
          <div className="mb-8">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-slate-900 tracking-tight mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">Everything you need to know about final year projects and IEEE reports.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {HOME_FAQ.map((f, i) => (
              <details key={i} className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs group open:border-indigo-300 transition-all">
                <summary className="cursor-pointer font-bold text-slate-900 text-sm sm:text-base flex items-start gap-3 select-none">
                  <span className="text-indigo-600 font-black shrink-0 text-base">Q{i + 1}.</span>
                  <span>{f.question}</span>
                </summary>
                <p className="text-xs sm:text-sm text-slate-600 pl-8 mt-3 leading-relaxed">
                  {f.answer}
                </p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
