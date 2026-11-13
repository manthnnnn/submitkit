// Script import removed
import { CONSTANTS } from '@/lib/constants';

interface ProductSchemaProps {
  name: string;
  description: string;
  price: number;
  priceCurrency?: string;
  image?: string;
  ratingValue?: number;
  reviewCount?: number;
  category?: string;
  slug?: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

export function HomeSchema() {
  const baseUrl = CONSTANTS.APP_URL.replace(/\/$/, '');
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${baseUrl}/#organization`,
        name: CONSTANTS.APP_NAME,
        alternateName: 'SubmitKit.in',
        url: baseUrl,
        logo: {
          '@type': 'ImageObject',
          url: `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
        },
        email: CONSTANTS.SUPPORT_EMAIL,
        telephone: CONSTANTS.SUPPORT_PHONE,
        sameAs: [
          'https://instagram.com/submitkit.in',
          CONSTANTS.SUPPORT_WHATSAPP,
        ],
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'IN',
          addressRegion: 'Maharashtra',
          addressLocality: 'Pune',
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${baseUrl}/#website`,
        url: baseUrl,
        name: CONSTANTS.APP_NAME,
        description: CONSTANTS.TAGLINE_LONG,
        publisher: { '@id': `${baseUrl}/#organization` },
        inLanguage: 'en-IN',
        potentialAction: [
          {
            '@type': 'SearchAction',
            target: `${baseUrl}/projects?q={search_term_string}`,
            'query-input': 'required name=search_term_string',
          },
          {
            '@type': 'SearchAction',
            target: `${baseUrl}/blueprint?q={search_term_string}`,
            'query-input': 'required name=search_term_string',
          },
        ],
      },
      {
        '@type': 'WebPage',
        '@id': `${baseUrl}/#webpage`,
        url: baseUrl,
        name: `${CONSTANTS.APP_NAME} - Final Year CSE Projects with Source Code & IEEE Report (₹299)`,
        description: CONSTANTS.TAGLINE_LONG,
        inLanguage: 'en-IN',
        isPartOf: { '@id': `${baseUrl}/#website` },
        about: { '@id': `${baseUrl}/#organization` },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
          ],
        },
      },
      {
        '@type': 'Product',
        name: `${CONSTANTS.APP_NAME} Major Project Kit (BE / BTech / MCA Final Year)`,
        description: '1-click runnable complete final year engineering project bundle. Full source code, 60-page IEEE Black Book editable report (.docx), Viva defense PPT slides, and top 25 external examiner Q&A with answers. Instant WhatsApp download across India.',
        brand: { '@type': 'Brand', name: CONSTANTS.APP_NAME },
        image: `${baseUrl}/og-image.jpg`,
        offers: [
          {
            '@type': 'Offer',
            name: 'Blueprint Starter (Topic Roadmap)',
            price: CONSTANTS.PRICING.BLUEPRINT,
            priceCurrency: 'INR',
            availability: 'https://schema.org/InStock',
            url: `${baseUrl}/blueprint`,
            seller: { '@id': `${baseUrl}/#organization` },
            priceValidUntil: '2026-12-31',
          },
          {
            '@type': 'Offer',
            name: 'Mini Project Kit (Sem 5 / Sem 6)',
            price: CONSTANTS.PRICING.MINI_PROJECT,
            priceCurrency: 'INR',
            availability: 'https://schema.org/InStock',
            url: `${baseUrl}/projects?tier=MINI`,
            seller: { '@id': `${baseUrl}/#organization` },
            priceValidUntil: '2026-12-31',
          },
          {
            '@type': 'Offer',
            name: 'Major Project Kit (Sem 7 / Sem 8 Final Year)',
            price: CONSTANTS.PRICING.MAJOR_PROJECT,
            priceCurrency: 'INR',
            availability: 'https://schema.org/InStock',
            url: `${baseUrl}/projects?tier=MAJOR`,
            seller: { '@id': `${baseUrl}/#organization` },
            priceValidUntil: '2026-12-31',
          },
          {
            '@type': 'Offer',
            name: 'Custom Project Build (48-Hour Delivery)',
            price: '1999',
            priceCurrency: 'INR',
            availability: 'https://schema.org/InStock',
            url: CONSTANTS.SUPPORT_WHATSAPP,
            seller: { '@id': `${baseUrl}/#organization` },
            priceValidUntil: '2026-12-31',
          },
        ],
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: '500',
          bestRating: '5',
          worstRating: '1',
        },
        areaServed: { '@type': 'Country', name: 'India' },
        audience: {
          '@type': 'Audience',
          audienceType: 'Non-Coders, Non-Technical Startup Founders, Engineering Students (BE / BTech / MCA), and Solo Innovators',
        },
      },
      {
        '@type': 'Service',
        '@id': `${baseUrl}/#custom-studio`,
        name: 'Done-For-You Custom Software Studio for Non-Coders & Founders',
        serviceType: 'Custom Software Development & Startup MVP Prototyping',
        provider: { '@id': `${baseUrl}/#organization` },
        description: 'Complete done-for-you custom software, web app, and startup MVP development built by senior engineers for non-coders and non-technical founders. 100% working source code, database architecture, 1-click launchers, and 1-on-1 walkthrough in 48-72 hours with zero coding required.',
        url: `${baseUrl}/custom`,
        offers: {
          '@type': 'Offer',
          price: '1999',
          priceCurrency: 'INR',
          url: `${baseUrl}/custom`,
        },
        audience: {
          '@type': 'Audience',
          audienceType: 'Non-Coders, Non-Technical Founders, Students & Innovators',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Can a non-coder build software with SubmitKit?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. SubmitKit operates as a done-for-you custom software engineering studio specifically built for non-coders and non-technical founders. You describe your idea or required features in everyday words. Our senior software engineers build 100% of the working code, design the database and UI, and guide you through a 1-on-1 walkthrough on WhatsApp or Google Meet so you understand and run your software with zero programming knowledge.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do non-technical founders use SubmitKit to build a startup MVP?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Non-technical founders use SubmitKit to turn their idea into a production-ready working MVP prototype in 48 to 72 hours starting at ₹1,999 (~$24 USD). SubmitKit delivers complete frontend UI, backend API, database, 1-click launchers, and full source code ownership without locking founders into expensive monthly no-code subscriptions or $5,000+ agency contracts.',
            },
          },
          {
            '@type': 'Question',
            name: 'Do I need any programming knowledge or terminal experience to run the software?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. Every SubmitKit software project includes automated 1-click launchers (run.bat for Windows and run.sh for Mac/Linux). Non-coders simply double-click the file — the launcher automatically handles dependencies, starts the server, and opens the application in your web browser.',
            },
          },
          {
            '@type': 'Question',
            name: 'Are SubmitKit projects 100% working and runnable?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Every project kit is tested end-to-end before upload. You get 1-click run scripts with zero manual setup. If any project does not run on your machine within 10 minutes, our team offers free WhatsApp support to debug and set it up.',
            },
          },
          {
            '@type': 'Question',
            name: 'Do I get the full IEEE format report and PPT?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Absolutely. Every mini project includes a 30-page editable IEEE format Black Book (.docx) and a Viva-ready PPT. Every major project includes a 60-page editable IEEE report and a full defense PPT with speaker notes. The Free Blueprint Starter includes a complete topic roadmap report and top 10 Viva Q&A.',
            },
          },
          {
            '@type': 'Question',
            name: 'How fast will I get the download after paying?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Instantly. As soon as your Razorpay payment is confirmed, the download link is sent to your WhatsApp number and email within 30-60 seconds. No waiting, no manual delivery. You can also look up your order from the Order Lookup page any time.',
            },
          },
          {
            '@type': 'Question',
            name: 'Which universities are these project kits aligned to?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'SubmitKit projects follow the standard 8-semester engineering syllabus used by all major Indian universities including VTU Karnataka, Mumbai University, Pune University (SPPU), Anna University Tamil Nadu, JNTU Hyderabad, GTU Gujarat, RGPV MP, MDU Haryana, and all autonomous and affiliated colleges. The IEEE report format is accepted across every AICTE-approved institution.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the difference between Blueprint (Free), Mini (₹299), and Major (₹499)?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Blueprint (Free) is a topic roadmap — full system architecture, 1-prompt AI build guide, dataset link, and top 10 Examiner Q&A (no source code). Mini Project (₹299) is for Sem 5/Sem 6 submissions: full runnable code + 30-page IEEE report + PPT + 15 Q&A. Major Project (₹499) is for Sem 7/Sem 8 final year: full production-level source code + 60-page IEEE Black Book + defense PPT + 25 Q&A + video setup guide.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I get a custom project built for my specific topic?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. SubmitKit builds custom projects from scratch to your exact problem statement, preferred tech stack, and college requirements. Delivery is guaranteed in 48 hours and includes a 1-on-1 code walkthrough on Google Meet. WhatsApp the team directly with your requirements to get a quote starting ₹1,999 (varies with complexity).',
            },
          },
        ],
      },
      {
        '@type': 'HowTo',
        name: 'How Non-Coders Build a Startup MVP with SubmitKit',
        description: '3-step rapid engineering process for non-technical founders to launch a custom working software prototype without writing code.',
        totalTime: 'P3D',
        estimatedCost: {
          '@type': 'MonetaryAmount',
          currency: 'INR',
          value: '1999',
        },
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Describe Your Startup Idea in Plain Words',
            text: 'Visit https://submitkit.in/custom and describe your application, required features, or problem statement without technical jargon or code.',
            url: `${baseUrl}/custom`,
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Senior Engineers Build Complete Architecture in 48-72h',
            text: 'SubmitKit engineers design the UI, build the frontend and backend APIs, configure the database, and write 100% production-ready code.',
            url: `${baseUrl}/custom`,
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: '1-Click Launch & 1-on-1 Walkthrough',
            text: 'Receive your complete codebase with 1-click Windows (run.bat) and Mac (run.sh) desktop launchers plus a 1-on-1 video walkthrough call.',
            url: `${baseUrl}/custom`,
          },
        ],
      },
    ],
  };

  return (
    <script
      id="ld-json-home-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ProductSchema({
  name,
  description,
  price,
  priceCurrency = 'INR',
  image,
  ratingValue = 4.9,
  reviewCount = 500,
  category,
  slug,
}: ProductSchemaProps) {
  const baseUrl = CONSTANTS.APP_URL.replace(/\/$/, '');
  const url = slug ? `${baseUrl}/projects/${slug}` : `${baseUrl}/projects`;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image: image || `${baseUrl}/og-image.jpg`,
    brand: { '@type': 'Brand', name: CONSTANTS.APP_NAME },
    category: category || 'Final Year Engineering Project',
    sku: slug || 'submitkit-project',
    url,
    offers: {
      '@type': 'Offer',
      url,
      price,
      priceCurrency,
      availability: 'https://schema.org/InStock',
      priceValidUntil: '2026-12-31',
      seller: {
        '@type': 'Organization',
        name: CONSTANTS.APP_NAME,
        url: baseUrl,
      },
      areaServed: { '@type': 'Country', name: 'India' },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: String(ratingValue),
      reviewCount: String(reviewCount),
      bestRating: '5',
      worstRating: '1',
    },
  };

  return (
    <script
      id={`ld-json-product-${slug || 'catalog'}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbsSchema({ items }: { items: Array<{ name: string; url?: string }> }) {
  const baseUrl = CONSTANTS.APP_URL.replace(/\/$/, '');
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: it.name,
      ...(it.url ? { item: it.url.startsWith('http') ? it.url : `${baseUrl}${it.url}` } : {}),
    })),
  };

  return (
    <script
      id="ld-json-breadcrumbs"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BlogPostSchema({
  title,
  description,
  slug,
  datePublished,
  dateModified,
  author,
  image,
  keywords,
}: {
  title: string;
  description: string;
  slug: string;
  datePublished?: string;
  dateModified?: string;
  author?: string;
  image?: string;
  keywords?: string[];
}) {
  const baseUrl = CONSTANTS.APP_URL.replace(/\/$/, '');
  const url = `${baseUrl}/blog/${slug}`;
  const now = new Date().toISOString();
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    image: image || `${baseUrl}/og-image.jpg`,
    datePublished: datePublished || now,
    dateModified: dateModified || now,
    author: {
      '@type': 'Organization',
      name: author || CONSTANTS.APP_NAME,
      url: baseUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: CONSTANTS.APP_NAME,
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/og-image.jpg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    url,
    keywords: keywords?.join(', ') || '',
    inLanguage: 'en-IN',
    articleSection: 'Education, Engineering, Final Year Projects',
  };

  return (
    <script
      id={`ld-json-blog-${slug}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BlueprintSchema({
  title,
  description,
  topicId,
  category,
  keywords,
}: {
  title: string;
  description: string;
  topicId: string;
  category?: string;
  keywords?: string[];
}) {
  const baseUrl = CONSTANTS.APP_URL.replace(/\/$/, '');
  const url = `${baseUrl}/blueprint/${topicId}`;
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: `${title} — Free Project Blueprint | SubmitKit`,
        description,
        inLanguage: 'en-IN',
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
            { '@type': 'ListItem', position: 2, name: 'Project Blueprints', item: `${baseUrl}/blueprint` },
            { '@type': 'ListItem', position: 3, name: title },
          ],
        },
      },
      {
        '@type': 'Article',
        headline: `${title} Final Year Project Blueprint`,
        description,
        image: `${baseUrl}/og-image.jpg`,
        datePublished: new Date('2026-01-01').toISOString(),
        dateModified: new Date().toISOString(),
        author: { '@type': 'Organization', name: CONSTANTS.APP_NAME, url: baseUrl },
        publisher: { '@type': 'Organization', name: CONSTANTS.APP_NAME, url: baseUrl },
        mainEntityOfPage: { '@type': 'WebPage', '@id': `${url}#webpage` },
        url,
        articleSection: category || 'Engineering',
        keywords: keywords?.join(', ') || '',
        inLanguage: 'en-IN',
      },
      {
        '@type': 'Product',
        name: `${title} — Topic Blueprint (Free)`,
        description: `Full roadmap, system architecture, 1-prompt AI build guide, dataset reference, and Viva Q&A for the project "${title}".`,
        brand: { '@type': 'Brand', name: CONSTANTS.APP_NAME },
        image: `${baseUrl}/og-image.jpg`,
        category: category || 'Blueprint Starter',
        offers: {
          '@type': 'Offer',
          url,
          price: CONSTANTS.PRICING.BLUEPRINT,
          priceCurrency: 'INR',
          availability: 'https://schema.org/InStock',
          priceValidUntil: '2026-12-31',
          seller: { '@type': 'Organization', name: CONSTANTS.APP_NAME, url: baseUrl },
        },
      },
    ],
  };

  return (
    <script
      id={`ld-json-blueprint-${topicId}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQSchema({ faqs }: { faqs: Array<{ question: string; answer: string }> }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      id="ld-json-faq"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
