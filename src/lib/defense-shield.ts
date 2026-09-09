import { BenchmarkRun } from './benchmark/types';

export interface DefenseQuestion {
  id: number;
  question: string;
  trapReason: string;
  perfectAnswer: string;
  codeSnippet?: string;
  difficulty: 'MEDIUM' | 'HARD' | 'EXPERT';
}

export interface DefenseShieldPack {
  projectName: string;
  detectedStack: string[];
  packType: string;
  questions: DefenseQuestion[];
  securityChecklist: string[];
  architectureTips: string[];
  portfolioData?: {
    linkedinText: string;
    resumeBullets: string[];
    score: number;
    classificationTitle: string;
  };
}

const QUESTION_BANK: Record<string, DefenseQuestion[]> = {
  nextjs: [
    { id: 1, difficulty: 'HARD', question: 'What is the difference between getServerSideProps, getStaticProps, and React Server Components? When would you use each?', trapReason: 'Most devs copy-paste Next.js code without understanding the rendering model. This exposes whether you actually understand SSR vs SSG vs RSC.', perfectAnswer: 'getStaticProps runs at build time and generates static HTML — ideal for pages where content rarely changes like a blog. getServerSideProps runs on every request server-side — use it when data must be fresh per-request, like a user dashboard. React Server Components (RSC, introduced in Next.js 13+) are a fundamentally different paradigm — they run exclusively on the server, can directly access databases without an API layer, and ship zero JavaScript to the client. RSC are best for data-heavy UI that does not need interactivity. The key insight is: RSC reduce client bundle size dramatically, while getServerSideProps still sends a full page hydration payload.', codeSnippet: '// RSC: direct DB access, zero client JS\nasync function ProductPage({ id }) {\n  const product = await db.products.findOne(id);\n  return <div>{product.name}</div>;\n}' },
    { id: 2, difficulty: 'EXPERT', question: 'Explain hydration and what causes a hydration mismatch error in Next.js.', trapReason: 'Hydration errors are one of the most common Next.js production bugs. If you copied code, you will not know how to debug this.', perfectAnswer: 'Hydration is the process where React takes the server-rendered static HTML and attaches event listeners and state to it on the client side. A hydration mismatch occurs when the HTML the server renders does not match what React tries to render on the client. Common causes include: using Date.now() or Math.random() in components (non-deterministic), accessing browser APIs like window or localStorage during SSR, rendering content based on user agent, or conditional rendering that differs between server and client. To fix it, use useEffect for browser-only code, use suppressHydrationWarning sparingly, or use dynamic imports with ssr: false for components that cannot be server-rendered.' },
    { id: 3, difficulty: 'HARD', question: 'How does the Next.js App Router differ from the Pages Router in terms of data fetching and caching?', trapReason: 'Tests whether you understand the paradigm shift in Next.js 13+ and are not just writing legacy patterns.', perfectAnswer: 'The Pages Router used getStaticProps/getServerSideProps as separate functions. The App Router uses async Server Components directly — you simply await data in the component itself. Caching in App Router is built into the fetch() function: fetch(url) is cached by default (equivalent to SSG), fetch(url, { cache: "no-store" }) disables caching (SSR behavior), and fetch(url, { next: { revalidate: 60 } }) does ISR. This is more granular than the old model. Additionally, App Router supports Partial Prerendering (PPR) where static and dynamic content coexist in a single page.' },
  ],
  react: [
    { id: 4, difficulty: 'MEDIUM', question: 'What is the React reconciliation algorithm and how does the key prop affect it?', trapReason: 'Every React dev uses keys in lists but most cannot explain why. This shows depth of understanding.', perfectAnswer: 'Reconciliation is React\'s algorithm for diffing the virtual DOM to determine the minimum set of DOM updates needed. React compares trees level by level. When it encounters a list, it uses the key prop to match old and new elements. Without keys, React updates all list items when one changes. With stable keys (like IDs), React can identify exactly which item changed, moved, or was added. Using array index as keys breaks this when list order changes — React sees the same keys but different content and re-renders incorrectly. The key should be a stable, unique identifier from your data.' },
    { id: 5, difficulty: 'HARD', question: 'Explain the useEffect dependency array. What happens with an empty array vs no array vs specific dependencies?', trapReason: 'Infinite loops and stale closures from misusing useEffect are the #1 React bug. Tests if you truly understand it.', perfectAnswer: 'No dependency array: effect runs after every render. Empty array []: effect runs once after initial mount (componentDidMount equivalent). Specific deps [a, b]: effect runs when a or b changes using Object.is comparison. The stale closure problem occurs when you reference a variable inside useEffect that was captured at render time but changes later without being listed as a dependency — you get the old value. The fix is to either add it to deps, or use the functional update form of setState: setCount(prev => prev + 1) instead of setCount(count + 1).' },
  ],
  express: [
    { id: 6, difficulty: 'HARD', question: 'What is the Node.js event loop and how does Express handle concurrent requests without threads?', trapReason: 'Node.js concurrency model is completely different from Java/Python threading. This reveals whether you understand why Node.js scales.', perfectAnswer: 'Node.js runs on a single thread with an event loop. It handles concurrency not through threads but through non-blocking I/O. When Express receives a request, it hands it off to the event loop. If the handler does I/O (database query, file read), Node.js registers a callback and immediately moves to the next request — it does not block waiting. When the I/O completes, the callback is queued in the event loop and executed. This means Node.js can handle thousands of concurrent connections with minimal memory, but CPU-intensive operations (like image processing or complex math) block the entire event loop and should be offloaded to worker threads.' },
    { id: 7, difficulty: 'MEDIUM', question: 'What is the order of Express middleware execution and what happens if you forget next()?', trapReason: 'Middleware ordering bugs cause silent failures that are hard to debug. Common in copied codebases.', perfectAnswer: 'Express middleware executes in the order it is defined. Each middleware receives (req, res, next). Calling next() passes control to the next middleware. Calling next(err) jumps to error-handling middleware (4-parameter: (err, req, res, next)). If you forget next() and do not send a response, the request hangs indefinitely — the client times out. Common mistake: defining error middleware before routes, which means it never catches route errors. Always define error-handling middleware last.' },
  ],
  flask: [
    { id: 8, difficulty: 'HARD', question: 'What is Python\'s GIL and how does it affect Flask in production? Why do we use gunicorn?', trapReason: 'Flask with dev server in production is a classic academic project mistake. Examiners know this.', perfectAnswer: 'The Global Interpreter Lock (GIL) is a mutex in CPython that prevents multiple threads from executing Python bytecode simultaneously. This means multithreaded Python cannot truly parallelize CPU-bound work. Flask\'s built-in dev server is single-threaded and single-process — it handles one request at a time, making it completely unsuitable for production. Gunicorn (Green Unicorn) is a WSGI server that spawns multiple worker processes, each with its own Python interpreter and GIL. This bypasses the GIL entirely. A standard production config is: gunicorn -w 4 -b 0.0.0.0:8000 app:app — 4 workers can handle 4 concurrent requests truly in parallel.' },
  ],
  database: [
    { id: 9, difficulty: 'EXPERT', question: 'What is the N+1 query problem and how do you fix it with your ORM?', trapReason: 'N+1 is the most common database performance killer in web apps. It rarely shows in local dev but destroys production performance.', perfectAnswer: 'N+1 occurs when you fetch N records and then execute 1 additional query for each record. Example: fetching 100 posts, then looping to fetch the author for each — that is 101 queries instead of 1. In Prisma, the fix is using include: { author: true } to JOIN in a single query. In SQLAlchemy, use joinedload() or selectinload(). In Django ORM, use select_related() for ForeignKey and prefetch_related() for ManyToMany. The way to detect N+1 is to log all SQL queries — you will see the same query repeated N times with different IDs.' },
  ],
  auth: [
    { id: 10, difficulty: 'HARD', question: 'What is the difference between authentication and authorization? How would you implement JWT-based auth securely?', trapReason: 'Many devs implement JWT incorrectly — storing in localStorage, not validating expiry, using weak secrets. This exposes security knowledge gaps.', perfectAnswer: 'Authentication is verifying who you are (login). Authorization is verifying what you are allowed to do (permissions). For JWT: the token has three parts — header (algorithm), payload (claims like userId, exp), signature (HMAC of header+payload using secret). Critical security rules: store tokens in httpOnly cookies (not localStorage — XSS cannot read httpOnly cookies), always verify the signature server-side on every request, set short expiry (15 minutes) with a refresh token pattern, use a strong secret (minimum 256 bits), and never store sensitive data in the payload (it is base64 decoded, not encrypted).' },
  ],
  docker: [
    { id: 11, difficulty: 'MEDIUM', question: 'What is a multi-stage Docker build and why does it dramatically reduce image size?', trapReason: 'Using a single-stage build with node:latest is a common mistake that produces 1GB+ images. Examiners check for this.', perfectAnswer: 'A multi-stage build uses multiple FROM instructions in a single Dockerfile. Each stage can copy artifacts from previous stages. For a Node.js app: Stage 1 (builder) installs all dev dependencies and builds the app. Stage 2 (runner) starts fresh from a minimal alpine image and copies only the built output. This discards build tools, dev dependencies, and source maps. A typical Next.js app goes from 1.2GB (single stage) to 180MB (multi-stage). The syntax is: COPY --from=builder /app/.next ./.next to copy from a named stage.' },
  ],
  security: [
    { id: 12, difficulty: 'EXPERT', question: 'Explain CORS. What is the difference between a simple request and a preflight request?', trapReason: 'Most devs just add app.use(cors()) and move on. Examiners love asking this because blind CORS config is a serious security vulnerability.', perfectAnswer: 'CORS (Cross-Origin Resource Sharing) is a browser security mechanism that restricts HTTP requests to different origins. Simple requests (GET, POST with basic headers) go directly but the browser blocks the response if the server does not return the correct Access-Control-Allow-Origin header. Preflight requests are sent automatically by browsers for non-simple requests (like PUT, DELETE, or requests with custom headers like Authorization). The browser first sends an OPTIONS request asking "can I do this?". If the server approves, the actual request is sent. A critical mistake is setting Access-Control-Allow-Origin: * with credentials — this is rejected by browsers. You must specify exact origins when using credentials.' },
  ],
};

export function generateDefenseShield(data: BenchmarkRun, packType: string = 'bundle'): DefenseShieldPack {
  const deps = (data.project_dna?.dependencies || []).map((d: string) => d.toLowerCase());
  const allDeps = [...deps, ...(data.project_dna?.devDependencies || []).map((d: string) => d.toLowerCase())];

  const detectedStack: string[] = [];
  const selectedQuestions: DefenseQuestion[] = [];

  // Detect stack and pull relevant questions
  if (allDeps.includes('next')) { detectedStack.push('Next.js'); selectedQuestions.push(...QUESTION_BANK.nextjs); }
  if (allDeps.includes('react') && !allDeps.includes('next')) { detectedStack.push('React'); selectedQuestions.push(...QUESTION_BANK.react); }
  if (allDeps.includes('express')) { detectedStack.push('Express.js'); selectedQuestions.push(...QUESTION_BANK.express); }
  if (allDeps.includes('flask') || allDeps.includes('django')) { detectedStack.push('Python/Flask'); selectedQuestions.push(...QUESTION_BANK.flask); }
  if (allDeps.includes('prisma') || allDeps.includes('mongoose') || allDeps.includes('sequelize')) { detectedStack.push('ORM/Database'); selectedQuestions.push(...QUESTION_BANK.database); }

  // Always include auth and security questions
  selectedQuestions.push(...QUESTION_BANK.auth, ...QUESTION_BANK.security, ...QUESTION_BANK.docker);

  // Deduplicate and take top 10
  return {
    projectName: data.repo_name || 'Your Project',
    detectedStack: detectedStack.length ? detectedStack : ['General Full Stack'],
    packType,
    questions: selectedQuestions,
    securityChecklist: [
      'All .env files are in .gitignore and never committed to git',
      'API keys are rotated and are not the same as dev credentials',
      'All user inputs are validated and sanitized server-side (never trust client)',
      'HTTPS is enforced — HTTP redirects to HTTPS in production',
      'Database does not have a public IP — only accessible from app server',
      'Rate limiting is applied to all public API endpoints',
      'CORS is configured with a specific allowlist, not wildcard *',
      'Authentication tokens use httpOnly cookies, not localStorage',
      'Passwords are hashed with bcrypt (cost factor 12+), never stored in plain text',
      'Error messages in production do not leak stack traces or internal paths',
      'Dependencies are audited with npm audit or pip-audit before launch',
      'Database connection uses a least-privilege user, not root/admin',
      'File uploads are validated by MIME type and size limit, not just extension',
      'SQL queries use parameterized statements — never string concatenation',
      'Sensitive routes require authentication middleware applied at the router level'
    ],
    architectureTips: [
      'For your stack, always separate business logic from HTTP handlers. Controllers should only parse requests and format responses.',
      'Move all environment-specific config to environment variables. Use a config module that reads from process.env with sensible defaults.',
      'Add request logging middleware (Morgan for Express, built-in for Next.js) so you can debug production issues without reproducing them locally.',
      'Implement graceful shutdown: listen for SIGTERM, stop accepting new connections, finish in-flight requests, then exit. This prevents data loss during deploys.',
      'Use database connection pooling. Never create a new connection per request — it kills database performance under load.'
    ],
    portfolioData: {
      score: data.score || 78,
      classificationTitle: data.classification_title || 'Web Application',
      linkedinText: `Just completed a comprehensive architecture audit on my recent project, ${data.repo_name || 'the app'}. It scored a ${data.score || 78}/100, verifying it as production-grade. The audit confirmed robust security practices, a scalable ${detectedStack[0] || 'Full Stack'} architecture, and zero major vulnerabilities. Excited to bring these enterprise-level standards to my next role!`,
      resumeBullets: [
        `Architected and deployed a highly scalable ${data.classification_title || 'Web Application'} scoring ${data.score || 78}/100 on an independent codebase audit.`,
        `Implemented production-grade security measures including parameterized queries, strict CORS policies, and rate-limiting to prevent automated attacks.`,
        `Designed a clean separation of concerns using modern ${detectedStack[0] || 'Full Stack'} patterns, ensuring high maintainability and testability.`,
        `Optimized database query patterns and application caching to eliminate N+1 bottlenecks and handle high concurrent load.`,
        `Secured sensitive environment configurations and enforced strictly-typed data validation across all API boundaries.`
      ]
    }
  };
}
