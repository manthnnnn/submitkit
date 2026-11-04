import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CONSTANTS } from '@/lib/constants';
import { BLOG_POSTS, getBlogPostBySlug, getFeaturedPosts } from '@/lib/blog-posts';
import { getBlogContent } from '@/lib/blog-content';
import { BreadcrumbsSchema, BlogPostSchema, FAQSchema } from '@/components/seo/SeoSchema';
import {
  Home, ChevronRight, Clock, BookOpen, Lightbulb,
  GraduationCap, FileText, Award, ArrowLeft, Share2,
  Check, ArrowRight, ShieldCheck, Zap
} from 'lucide-react';
import Script from 'next/script';

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'Project Ideas': <Lightbulb className="w-3.5 h-3.5 text-teal-600" />,
  'Guide': <BookOpen className="w-3.5 h-3.5 text-teal-600" />,
  'Viva Prep': <GraduationCap className="w-3.5 h-3.5 text-teal-600" />,
  'IEEE Format': <FileText className="w-3.5 h-3.5 text-teal-600" />,
  'Success Stories': <Award className="w-3.5 h-3.5 text-teal-600" />,
};

export const dynamic = 'force-static';
export const revalidate = 3600;

export function generateStaticParams() {
  return BLOG_POSTS.map(p => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) {
    return {
      title: 'Guide Not Found | SubmitKit',
      description: 'The requested project guide does not exist.',
    };
  }

  const url = `/blog/${post.slug}`;

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: [...post.keywords, ...CONSTANTS.SEO_KEYWORDS],
    alternates: { canonical: url },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    category: `engineering final year projects, ${post.category}`,
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      type: 'article',
      locale: 'en_IN',
      url,
      siteName: CONSTANTS.APP_NAME,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      tags: post.tags,
      images: [{
        url: `${CONSTANTS.APP_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: `${post.title} | ${CONSTANTS.APP_NAME}`,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metaTitle,
      description: post.metaDescription,
      creator: '@submitkit.in',
      images: [`${CONSTANTS.APP_URL}/og-image.jpg`],
    },
  };
}

export default async function BlogPostPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const contentEntry = getBlogContent(post.slug);
  const content = contentEntry?.content;
  const faqs = contentEntry?.faq || [];
  const related = getFeaturedPosts().filter(p => p.slug !== post.slug).slice(0, 3);

  return (
    <div style={{ background: 'var(--canvas-base)', minHeight: '100vh', color: 'var(--ink)' }} className="pb-20">
      <BreadcrumbsSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Project Guides', url: '/blog' },
        { name: post.title },
      ]} />
      <BlogPostSchema
        title={post.metaTitle}
        description={post.metaDescription}
        slug={post.slug}
        datePublished={post.publishedAt}
        dateModified={post.updatedAt}
        author={post.author}
        keywords={post.tags || post.keywords}
      />
      {faqs.length > 0 && <FAQSchema faqs={faqs} />}

      {/* Script for 1-click share/copy */}
      <Script id={`blog-copy-btn-${post.slug}`} strategy="afterInteractive">
        {`document.addEventListener('click', (e) => {
          const btn = e.target.closest('[data-copy-url-btn]');
          if (!btn) return;
          e.preventDefault();
          navigator.clipboard.writeText(window.location.href).then(() => {
            btn.setAttribute('data-copied', '1');
            const check = btn.querySelector('[data-check]');
            const copy = btn.querySelector('[data-copy]');
            if (check) check.classList.remove('hidden');
            if (copy) copy.classList.add('hidden');
            setTimeout(() => {
              btn.removeAttribute('data-copied');
              if (check) check.classList.add('hidden');
              if (copy) copy.classList.remove('hidden');
            }, 1800);
          });
        });`}
      </Script>

      {/* ── Fixed Ambient Background Orbs ── */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }} aria-hidden>
        <div
          className="aorb"
          style={{
            position: 'absolute',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(13,148,136,.07) 0%, transparent 70%)',
            top: '-10%',
            right: '-10%',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="aorb"
          style={{
            position: 'absolute',
            width: '450px',
            height: '450px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(217,119,6,.05) 0%, transparent 70%)',
            bottom: '20%',
            left: '-8%',
            filter: 'blur(70px)',
            animationDelay: '4s',
          }}
        />
      </div>

      {/* ════════════════════════════════════════════
          ARTICLE HEADER
      ════════════════════════════════════════════ */}
      <header
        className="relative z-10 border-b border-[var(--line)] pt-8 pb-10"
        style={{
          background: 'linear-gradient(180deg, rgba(253, 251, 247, 0.92) 0%, rgba(250, 246, 238, 0.98) 100%)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        <div className="shell max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center text-xs text-slate-500 mb-6 gap-1.5 flex-wrap">
            <Link href="/" className="hover:text-teal-700 transition-colors inline-flex items-center gap-1 font-semibold text-slate-600">
              <Home className="w-3.5 h-3.5" /> Home
            </Link>
            <ChevronRight className="h-3 w-3 shrink-0 text-slate-400" />
            <Link href="/blog" className="hover:text-teal-700 transition-colors font-semibold text-slate-600">
              Project Guides
            </Link>
            <ChevronRight className="h-3 w-3 shrink-0 text-slate-400" />
            <span className="text-teal-950 font-bold truncate max-w-[260px] sm:max-w-md">{post.title}</span>
          </nav>

          {/* Badges Bar */}
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/90 text-teal-800 text-xs font-bold uppercase tracking-wider shadow-2xs">
              {CATEGORY_ICONS[post.category]} {post.category}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-600 text-xs font-medium shadow-2xs">
              <Clock className="w-3.5 h-3.5 text-teal-600" /> {post.estimatedReadTime} read
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-600 text-xs font-medium shadow-2xs">
              Published {new Date(post.publishedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}
            </span>
            <button
              data-copy-url-btn
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-semibold hover:border-teal-300 hover:text-teal-900 transition-all shadow-2xs cursor-pointer active:scale-95"
              aria-label="Copy blog post URL"
            >
              <Share2 data-copy className="w-3.5 h-3.5 text-slate-500" />
              <Check data-check className="w-3.5 h-3.5 text-emerald-600 hidden" />
              <span data-copy>Share</span>
              <span data-check className="text-emerald-700 hidden font-bold">Copied!</span>
            </button>
          </div>

          <h1 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-slate-900 tracking-tight leading-snug mb-4">
            {post.title}
          </h1>

          <div className="flex items-center gap-4">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-800 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to All Guides
            </Link>
          </div>
        </div>
      </header>

      {/* ════════════════════════════════════════════
          ARTICLE CONTENT
      ════════════════════════════════════════════ */}
      <main className="relative z-10 shell max-w-4xl mx-auto pt-10">
        {content || (
          <div className="card p-12 text-center rounded-2xl border border-slate-200/90 bg-white/90">
            <p className="text-slate-500 mb-4">
              Guide content is currently compiling. Please check back shortly.
            </p>
            <Link href="/blog" className="btn btn-teal btn-sm">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Project Guides
            </Link>
          </div>
        )}

        {/* FAQs Section */}
        {faqs.length > 0 && (
          <section className="mt-14 pt-10 border-t border-[var(--line)]">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-800 uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              Common Student Questions
            </div>
            <h2 className="text-2xl font-display font-bold text-slate-900 mb-6">
              Frequently Asked Questions
            </h2>
            <div className="grid grid-cols-1 gap-3.5">
              {faqs.map((f: { question: string; answer: string }, i: number) => (
                <details
                  key={i}
                  className="card p-5 rounded-2xl border border-slate-200/90 transition-all group open:border-teal-300 open:shadow-md"
                  style={{
                    background: 'var(--surface)',
                    boxShadow: '0 2px 8px -2px rgba(15, 23, 42, 0.04)',
                  }}
                >
                  <summary className="cursor-pointer font-bold text-slate-900 text-sm sm:text-base flex items-start gap-3 select-none">
                    <span className="text-teal-700 font-black shrink-0 text-base">
                      Q{i + 1}.
                    </span>
                    <span className="leading-snug">{f.question}</span>
                  </summary>
                  <p className="text-xs sm:text-sm text-slate-600 pl-8 mt-3 leading-relaxed border-t border-slate-100 pt-3">
                    {f.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* ── 3D Turn-Key CTA Banner ── */}
        <div
          className="card card-lift mt-14 rounded-3xl p-6 sm:p-8 lg:p-10 relative overflow-hidden"
          style={{
            background: 'linear-gradient(145deg, #FFFFFF 0%, #F5FBF9 45%, #FCF9F5 100%)',
            border: '1.5px solid rgba(13, 148, 136, 0.22)',
            boxShadow: '0 20px 50px -12px rgba(13, 148, 136, 0.15)',
          }}
        >
          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-900 text-xs font-bold tracking-wide uppercase mb-3.5 shadow-2xs">
              <Zap className="w-3.5 h-3.5 text-teal-600" />
              Complete Working Project Bundle
            </div>

            <h3 className="font-display font-black text-2xl sm:text-3xl text-slate-900 mb-3 leading-tight">
              Need the Full Verified Turn-Key Project Kit?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 max-w-2xl">
              Get the 1-click runnable source code, full 60-page IEEE Black Book report (.docx), defense PPT slides, and top 25 Viva examiner Q&amp;A with model answers. Instant download. Mini ₹{CONSTANTS.PRICING.MINI_PROJECT}, Major ₹{CONSTANTS.PRICING.MAJOR_PROJECT}.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/projects"
                className="btn btn-teal btn-sm"
                style={{ borderRadius: '12px', padding: '0 1.25rem' }}
              >
                <span>Browse Project Kits</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
              <Link
                href="/blueprint"
                className="btn btn-outline btn-sm"
                style={{ borderRadius: '12px', padding: '0 1.25rem' }}
              >
                <span>Free Blueprint Starter</span>
              </Link>
              <a
                href={CONSTANTS.SUPPORT_WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-wa btn-sm"
                style={{ borderRadius: '12px', padding: '0 1.25rem' }}
              >
                <span>WhatsApp Support</span>
              </a>
            </div>
          </div>
        </div>

        {/* ── Related Guides ── */}
        {related.length > 0 && (
          <section className="mt-14 pt-10 border-t border-[var(--line)]">
            <h2 className="font-display font-bold text-2xl text-slate-900 tracking-tight mb-6">
              Related Engineering Guides
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {related.map(rp => (
                <article
                  key={rp.slug}
                  className="card card-lift p-5 rounded-2xl flex flex-col justify-between group relative overflow-hidden"
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid rgba(226, 232, 240, 0.9)',
                    boxShadow: '0 2px 8px -2px rgba(15, 23, 42, 0.05)',
                  }}
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-1 opacity-70 group-hover:opacity-100 transition-opacity"
                    style={{
                      background: 'linear-gradient(90deg, #0D9488 0%, #14B8A6 60%, #059669 100%)',
                    }}
                  />

                  <div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-teal-50 border border-teal-200/90 text-teal-800 text-[10px] font-bold uppercase tracking-wider">
                        {CATEGORY_ICONS[rp.category]} {rp.category}
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-600 text-[10px]">
                        <Clock className="w-2.5 h-2.5 text-teal-600" /> {rp.estimatedReadTime}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-sm text-slate-900 leading-snug mb-2 group-hover:text-teal-700 transition-colors line-clamp-2">
                      <Link href={`/blog/${rp.slug}`}>{rp.title}</Link>
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">
                      {rp.summary}
                    </p>
                  </div>

                  <Link
                    href={`/blog/${rp.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-teal-700 hover:text-teal-800 transition-colors pt-3 border-t border-slate-100"
                  >
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
