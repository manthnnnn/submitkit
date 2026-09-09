import { Capability, Improvement, Category } from './types';

export function generateImprovements(
  capabilities: Capability[], 
  category: Category, 
  maturityLevel: number,
  dependencies?: string[],
  devDependencies?: string[],
  heuristics?: { testFileCount?: number; apiEndpointsCount?: number; hasGithubActions?: boolean }
): Improvement[] {
  const improvements: Improvement[] = [];
  const deps = dependencies || [];
  const devDeps = devDependencies || [];
  const allDeps = [...deps, ...devDeps].map(d => d.toLowerCase());
  
  // Find capabilities that are lacking
  const missingAuth = capabilities.find(c => c.id === 'auth' && (c.status === '❌' || c.status === '⚪'));
  const missingDb = capabilities.find(c => c.id === 'database' && (c.status === '❌' || c.status === '⚪'));
  const missingDocker = capabilities.find(c => c.id === 'docker' && (c.status === '❌' || c.status === '⚪'));
  const missingCicd = capabilities.find(c => c.id === 'cicd' && (c.status === '❌' || c.status === '⚪'));
  const missingTests = capabilities.find(c => c.id === 'testing' && (c.status === '❌' || c.status === '⚪'));
  const missingApi = capabilities.find(c => c.id === 'api' && (c.status === '❌' || c.status === '⚪'));

  const isWeb = category === 'WEB_FULLSTACK' || category === 'WEB_FRONTEND';
  const isNextJs = allDeps.includes('next');
  const isExpress = allDeps.includes('express');
  const isFlask = allDeps.includes('flask');
  const isDjango = allDeps.includes('django');
  const isReact = allDeps.includes('react');
  const hasPrisma = allDeps.includes('prisma') || allDeps.includes('@prisma/client');
  const hasMongoose = allDeps.includes('mongoose');
  const hasRedis = allDeps.includes('redis') || allDeps.includes('ioredis');
  const hasSentry = allDeps.includes('@sentry/nextjs') || allDeps.includes('@sentry/node') || allDeps.includes('sentry-sdk');
  const hasHelmet = allDeps.includes('helmet');
  const hasRateLimit = allDeps.includes('express-rate-limit') || allDeps.includes('rate-limiter-flexible');
  const hasEslint = allDeps.includes('eslint') || devDeps.map(d => d.toLowerCase()).includes('eslint');
  const hasTypescript = allDeps.includes('typescript');

  // === CORE INFRASTRUCTURE (for lower maturity) ===

  if (missingDb && isWeb) {
    improvements.push({
      title: 'Integrate a Database Layer',
      impact: 'VERY HIGH',
      difficulty: 'MEDIUM',
      why: isNextJs 
        ? 'Your Next.js app lacks a database. Add Prisma with PostgreSQL (`npx prisma init`) to manage structured data and enable server actions.'
        : isExpress
        ? 'Your Express server has no persistence. Add `mongoose` for MongoDB or `prisma` for PostgreSQL to store data beyond the current session.'
        : 'No database detected. Adding PostgreSQL, MySQL, or MongoDB is essential to move beyond a static prototype.'
    });
  }

  if (missingAuth && (isWeb || category === 'MOBILE')) {
    improvements.push({
      title: 'Implement User Authentication',
      impact: 'VERY HIGH',
      difficulty: 'MEDIUM',
      why: isNextJs
        ? 'No auth detected. Add NextAuth.js or Clerk (`npm i next-auth`) with Google/GitHub providers for instant secure login.'
        : isExpress
        ? 'Your Express API has no authentication. Add Passport.js with JWT strategy or integrate Supabase Auth for quick setup.'
        : isDjango
        ? 'Django has built-in auth but it\'s not detected. Run `python manage.py createsuperuser` and configure `django.contrib.auth`.'
        : 'No authentication system found. Implement JWT tokens or OAuth2 for secure user sessions.'
    });
  }

  if (missingApi && category === 'AIML') {
    improvements.push({
      title: 'Wrap Your Model in a REST API',
      impact: 'HIGH',
      difficulty: 'MEDIUM',
      why: isFlask
        ? 'Your Flask app exists but no API endpoints were detected. Add `@app.route("/predict", methods=["POST"])` to expose your model.'
        : 'Your ML model is isolated. Wrap it with FastAPI (`pip install fastapi uvicorn`) so frontends can consume predictions via HTTP.'
    });
  }

  // === DEVOPS & DEPLOYMENT ===

  if (missingDocker && maturityLevel >= 2) {
    improvements.push({
      title: 'Containerize with Docker',
      impact: 'HIGH',
      difficulty: 'MEDIUM',
      why: isNextJs
        ? 'Add a multi-stage Dockerfile: `FROM node:20-alpine AS builder` → `RUN npm run build` → `FROM node:20-alpine` → `CMD ["npm", "start"]`. This cuts your image size by 70%.'
        : isFlask || isDjango
        ? 'Add a `Dockerfile` with `FROM python:3.11-slim`, install requirements, and use `gunicorn` as the production server instead of the dev server.'
        : 'No Dockerfile found. Containerizing ensures "it works on my machine" never happens again.'
    });
  }

  if (missingCicd && maturityLevel >= 3) {
    improvements.push({
      title: 'Set up CI/CD Pipeline',
      impact: 'MEDIUM',
      difficulty: 'HARD',
      why: 'Create `.github/workflows/ci.yml` with steps to install dependencies, run linting, execute tests, and auto-deploy on push to main. This prevents broken code from reaching production.'
    });
  }

  // === TESTING & QUALITY ===

  if (missingTests && maturityLevel >= 2) {
    improvements.push({
      title: 'Add Automated Tests',
      impact: 'HIGH',
      difficulty: 'HARD',
      why: isNextJs || isReact
        ? 'No tests found. Add Jest + React Testing Library (`npm i -D jest @testing-library/react`) and write tests for your core components and API routes.'
        : isFlask || isDjango
        ? 'No tests found. Add `pytest` and write unit tests for your routes and models. Django has a built-in test runner (`python manage.py test`).'
        : 'No test files detected. Add a testing framework (Jest, PyTest, JUnit) and aim for at least 60% coverage on critical paths.'
    });
  }

  if (!hasEslint && (isWeb || hasTypescript)) {
    improvements.push({
      title: 'Add Linting & Code Formatting',
      impact: 'MEDIUM',
      difficulty: 'EASY',
      why: 'No ESLint config detected. Run `npm init @eslint/config` and add Prettier for consistent code style. This catches bugs before they reach production.'
    });
  }

  // === SECURITY ===

  if (isExpress && !hasHelmet) {
    improvements.push({
      title: 'Add Security Headers with Helmet',
      impact: 'HIGH',
      difficulty: 'EASY',
      why: 'Your Express server has no `helmet` middleware. Add `app.use(helmet())` — it\'s one line that sets 11 security headers (XSS protection, HSTS, CSP, etc.).'
    });
  }

  if ((isExpress || isNextJs) && !hasRateLimit) {
    improvements.push({
      title: 'Implement API Rate Limiting',
      impact: 'HIGH',
      difficulty: 'EASY',
      why: isExpress
        ? 'No rate limiter detected. Add `express-rate-limit` to prevent abuse: `app.use(rateLimit({ windowMs: 15*60*1000, max: 100 }))`. Without this, a single bot can DDoS your API.'
        : 'Your API routes have no rate limiting. Add middleware to cap requests per IP. Without this, your serverless functions can be abused and rack up costs.'
    });
  }

  // === MONITORING & OBSERVABILITY ===

  if (!hasSentry && isWeb && maturityLevel >= 3) {
    improvements.push({
      title: 'Add Error Monitoring (Sentry)',
      impact: 'MEDIUM',
      difficulty: 'EASY',
      why: isNextJs
        ? 'No error monitoring found. Run `npx @sentry/wizard@latest -i nextjs` to auto-configure Sentry. You\'ll get real-time alerts when users hit errors in production.'
        : 'No error tracking detected. Add Sentry or LogRocket to catch production errors before your users report them.'
    });
  }

  if (!hasRedis && isWeb && maturityLevel >= 4) {
    improvements.push({
      title: 'Add Caching Layer (Redis)',
      impact: 'MEDIUM',
      difficulty: 'MEDIUM',
      why: 'No caching layer detected. Adding Redis (via Upstash for serverless) for session storage and API response caching can reduce database load by 80% and speed up response times.'
    });
  }

  // === PERFORMANCE & UX ===

  if (isNextJs) {
    const hasSSG = false; // We can't easily detect this from deps alone, so always suggest
    improvements.push({
      title: 'Optimize with Static Generation (SSG/ISR)',
      impact: 'MEDIUM',
      difficulty: 'MEDIUM',
      why: 'You\'re using Next.js but may not be leveraging `generateStaticParams` or `revalidate` for ISR. Converting data-heavy pages to static generation can cut load times by 90% and reduce server costs.'
    });
  }

  if (isReact && !allDeps.includes('react-helmet') && !allDeps.includes('next')) {
    improvements.push({
      title: 'Add SEO Meta Tags',
      impact: 'MEDIUM',
      difficulty: 'EASY',
      why: 'No SEO management detected. Add `react-helmet-async` to manage `<title>`, `<meta>` tags dynamically. Without this, search engines see a blank page.'
    });
  }

  // === DOCUMENTATION ===

  if (maturityLevel <= 3) {
    improvements.push({
      title: 'Improve README Documentation',
      impact: 'MEDIUM',
      difficulty: 'EASY',
      why: 'A strong README needs: project description, setup instructions, screenshots, API docs, and a tech stack section. This is the first thing employers and professors evaluate.'
    });
  }

  // === DEPENDENCY HEALTH ===

  if (deps.length > 15) {
    improvements.push({
      title: 'Audit & Trim Dependencies',
      impact: 'MEDIUM',
      difficulty: 'EASY',
      why: `Your project has ${deps.length} production dependencies. Run \`npx depcheck\` to find unused packages. Fewer dependencies = smaller bundle, faster installs, fewer security vulnerabilities.`
    });
  }

  // Fallback if the project is excellent
  if (improvements.length === 0) {
    if (maturityLevel < 6) {
      improvements.push({
        title: 'Refactor for Clean Architecture',
        impact: 'MEDIUM',
        difficulty: 'EASY',
        why: 'Your core pillars are present. Elevate code quality through consistent naming, extracting shared utilities, and adding JSDoc/docstrings to public functions.'
      });
    }
  }

  // Sort by Impact (VERY HIGH > HIGH > MEDIUM) and return top 5
  const impactScore = { 'VERY HIGH': 3, 'HIGH': 2, 'MEDIUM': 1 };
  
  return improvements
    .sort((a, b) => impactScore[b.impact] - impactScore[a.impact])
    .slice(0, 5);
}
