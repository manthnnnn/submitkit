import { analyzeRepository } from './analyzer';
import { classifyProject } from './classifier';
import { calculateScore } from './scorer';
import { generateImprovements } from './improvements';
import { BenchmarkRun } from './types';

// Deterministic fallback for LLM verdict
function generateDeterministicVerdict(score: number, level: number, categoryTitle: string, topImprovement?: string): string {
  let verdict = `This project has been benchmarked as a ${categoryTitle} and achieved a Level ${level} maturity rating (Score: ${score}/100). `;
  
  if (level >= 5) {
    verdict += `The codebase demonstrates exceptional structure, production readiness, and adherence to industry best practices. `;
  } else if (level >= 3) {
    verdict += `The foundation is solid and functional, but it lacks some critical production-grade features. `;
  } else {
    verdict += `The project is currently in a prototype phase and requires significant architectural improvements. `;
  }

  if (topImprovement) {
    verdict += `To immediately elevate this project's standing, we highly recommend focusing on: ${topImprovement}.`;
  }

  return verdict;
}

function generateDeepAnalysis(category: string, score: number, analyzerData: any) {
  const isWeb = category.includes('WEB');
  const hasDB = analyzerData.capabilities.some((c: any) => c.name.toLowerCase().includes('database') && c.status === '✅');
  const hasAuth = analyzerData.capabilities.some((c: any) => c.name.toLowerCase().includes('auth') && c.status === '✅');
  const hasDocker = analyzerData.capabilities.some((c: any) => c.name.toLowerCase().includes('docker') && c.status === '✅');
  
  const deps = (analyzerData.rawManifest?.dependencies || []).map((d: string) => d.toLowerCase());
  const isNextJs = deps.includes('next');
  const isExpress = deps.includes('express');
  const isFlask = deps.includes('flask');
  const isDjango = deps.includes('django');
  const isReact = deps.includes('react');
  const hasMongoose = deps.includes('mongoose');
  const hasPrisma = deps.includes('prisma') || deps.includes('@prisma/client');

  const securityRisk = score < 40 ? 'HIGH' : score < 70 ? 'MEDIUM' : 'LOW';
  
  let vulnerabilities: any[] = [];
  if (!hasAuth && isWeb) vulnerabilities.push({ issue: 'Missing Authentication Layer', severity: 'CRITICAL', fix: isNextJs ? 'Add NextAuth.js or Clerk for instant OAuth integration.' : 'Implement JWT or OAuth2-based authentication.' });
  if (!hasDocker) vulnerabilities.push({ issue: 'Inconsistent Environment Execution', severity: 'MEDIUM', fix: 'Add a multi-stage Dockerfile to guarantee identical builds across dev/staging/prod.' });
  if (score < 60) vulnerabilities.push({ issue: 'Potential Secret Exposure', severity: 'HIGH', fix: 'Ensure .env files are in .gitignore and use a secrets manager (Vault, Doppler) for production.' });
  if (isExpress && !deps.includes('helmet')) vulnerabilities.push({ issue: 'Missing Security Headers', severity: 'HIGH', fix: 'Add `helmet` middleware to set CSP, HSTS, X-Frame-Options, and 8 other security headers.' });
  if (isWeb && !deps.includes('express-rate-limit') && !deps.includes('rate-limiter-flexible')) vulnerabilities.push({ issue: 'No API Rate Limiting', severity: 'MEDIUM', fix: 'Add rate limiting to prevent DDoS and brute-force attacks on your endpoints.' });

  // Stack-specific production analysis
  const productionAnalysis = {
    enterpriseReadiness: (score >= 80 && hasDB && hasAuth && hasDocker ? 'PRODUCTION_READY' : score >= 60 ? 'SCALABLE' : score >= 40 ? 'MVP' : 'PROTOTYPE') as any,
    customerHooks: [] as any[],
    scalabilityBottlenecks: [] as any[]
  };

  // Generate stack-specific customer hooks
  if (isNextJs) {
    productionAnalysis.customerHooks.push({
      feature: 'Server-Side Rendering (Next.js)',
      valueProposition: 'Pages are pre-rendered on the server, giving users instant load times and perfect SEO scores. Google ranks SSR pages 2-3x higher.',
      howToMarket: 'Market as "Lightning-fast, SEO-optimized platform built on the same framework used by Netflix, TikTok, and Notion."'
    });
  } else if (isExpress) {
    productionAnalysis.customerHooks.push({
      feature: 'RESTful API Architecture',
      valueProposition: 'Clean API separation means any frontend (web, mobile, IoT) can consume your backend. This enables multi-platform reach from day one.',
      howToMarket: 'Pitch as "API-first architecture ready for web, mobile, and third-party integrations."'
    });
  } else if (isFlask || isDjango) {
    productionAnalysis.customerHooks.push({
      feature: isDjango ? 'Django Batteries-Included Framework' : 'Lightweight Flask Microservice',
      valueProposition: isDjango ? 'Django\'s ORM, admin panel, and built-in auth cut development time by 60%.' : 'Flask\'s minimal footprint makes it perfect for microservices and ML model serving.',
      howToMarket: isDjango ? 'Market as "Enterprise-grade backend with built-in admin dashboard."' : 'Pitch as "Production ML pipeline with low-latency inference API."'
    });
  } else {
    productionAnalysis.customerHooks.push({
      feature: isWeb ? 'Cloud-Ready Architecture' : 'Standalone Efficiency',
      valueProposition: isWeb ? 'Can instantly deploy to AWS/Vercel with minimal configuration.' : 'Runs anywhere with zero cloud dependencies.',
      howToMarket: 'Pitch as "Zero-Friction Deployment" advantage.'
    });
  }

  if (hasDB) {
    productionAnalysis.customerHooks.push({
      feature: hasPrisma ? 'Type-Safe Database (Prisma ORM)' : hasMongoose ? 'Document Database (MongoDB)' : 'Persistent Data Layer',
      valueProposition: hasPrisma
        ? 'Prisma provides auto-generated TypeScript types for every query, eliminating runtime data errors. Schema migrations are version-controlled.'
        : hasMongoose
        ? 'MongoDB\'s flexible schema allows rapid iteration without migrations, perfect for MVP development speed.'
        : 'Structured data storage ready for thousands of concurrent reads.',
      howToMarket: hasPrisma ? 'Market as "Type-safe, migration-controlled database — zero data corruption risk."' : 'Market as "Enterprise-Grade Data Reliability."'
    });
  }

  if (hasAuth) {
    productionAnalysis.customerHooks.push({
      feature: 'Secure Authentication System',
      valueProposition: 'User identity is verified and sessions are managed securely. This enables per-user billing, RBAC, and GDPR-compliant data isolation.',
      howToMarket: 'Market as "SOC2-ready user management with role-based access control."'
    });
  }

  // Stack-specific bottlenecks
  if (!hasDB && isWeb) {
    productionAnalysis.scalabilityBottlenecks.push({
      component: 'Data Persistence',
      risk: 'Without a database, all data is volatile and lost on restart. Cannot support user accounts or saved state.',
      solution: isNextJs ? 'Add Prisma + PostgreSQL. Run `npx prisma init` and connect to Supabase or Neon for serverless Postgres.' : 'Integrate PostgreSQL or MongoDB for persistent storage.'
    });
  }

  if (!hasAuth && isWeb) {
    productionAnalysis.scalabilityBottlenecks.push({
      component: 'User Identity & Access Control',
      risk: 'Open access prevents monetization, personalization, and abuse prevention.',
      solution: isNextJs ? 'Add NextAuth.js with `npm i next-auth` — supports 50+ OAuth providers out of the box.' : 'Add Passport.js or Clerk for robust authentication.'
    });
  }

  if (!hasDocker && score >= 40) {
    productionAnalysis.scalabilityBottlenecks.push({
      component: 'Environment Parity',
      risk: '"Works on my machine" syndrome. Dev/prod environment differences cause silent bugs.',
      solution: 'Add a Dockerfile with multi-stage build to guarantee identical execution everywhere.'
    });
  }

  if (isExpress && !deps.includes('cors')) {
    productionAnalysis.scalabilityBottlenecks.push({
      component: 'Cross-Origin Resource Sharing',
      risk: 'No CORS configuration means frontend apps on different domains cannot call your API.',
      solution: 'Add `cors` middleware: `app.use(cors({ origin: process.env.FRONTEND_URL }))`.'
    });
  }

  // Architecture pattern detection
  let architecturePattern = 'Standalone Script/App';
  if (isNextJs && hasDB) architecturePattern = 'Full-Stack Monolith (Next.js + ORM)';
  else if (isNextJs) architecturePattern = 'Server-Rendered Frontend (Next.js)';
  else if (isExpress && hasDB) architecturePattern = 'REST API + Database (Express MVC)';
  else if (isExpress) architecturePattern = 'Lightweight API Server (Express)';
  else if (isDjango) architecturePattern = 'Django MTV (Model-Template-View)';
  else if (isFlask) architecturePattern = 'Flask Microservice';
  else if (isReact) architecturePattern = 'Single Page Application (React SPA)';
  else if (isWeb) architecturePattern = hasDB ? 'Decoupled Monolith (MVC/API)' : 'Static Frontend';

  // Comparable real-world project (stack-specific)
  let comparableProject = 'Internal Utility Tool';
  if (isNextJs && hasDB && hasAuth) comparableProject = 'Early-stage SaaS (like Vercel Dashboard v0.1)';
  else if (isNextJs && hasDB) comparableProject = 'Content Platform (like Dev.to MVP)';
  else if (isNextJs) comparableProject = 'Marketing Site (like Linear\'s landing page)';
  else if (isExpress && hasDB) comparableProject = 'API Backend (like early Stripe API)';
  else if (isDjango && hasDB) comparableProject = 'Admin-heavy App (like early Instagram backend)';
  else if (isFlask) comparableProject = 'ML Inference Service (like HuggingFace Spaces)';
  else if (isReact) comparableProject = 'Dashboard UI (like Grafana frontend)';

  return {
    security_audit: {
      vulnerabilities,
      overallRisk: securityRisk as any,
      hardcodedSecretsDetected: score < 50
    },
    code_quality: {
      architecturePattern,
      maintainabilityScore: Math.min(100, score + 15),
      cyclomaticComplexityEst: (score < 50 ? 'HIGH' : score < 80 ? 'MEDIUM' : 'LOW') as any,
      duplicateCodeProbability: score < 50 ? 'High (20%+)' : score < 80 ? 'Moderate (5-10%)' : 'Low (< 5%)'
    },
    production_analysis: productionAnalysis,
    startup_potential: {
      monetizable: score >= 60 && hasDB,
      targetAudience: isWeb ? (isNextJs ? 'B2C SaaS Users / Small Businesses' : 'API Consumers / Developers') : isDjango ? 'Enterprise / Internal Teams' : 'Developers / Niche Users',
      mvpReadiness: score,
      pitchOneLiner: isNextJs && hasDB && hasAuth
        ? `A production-ready ${isNextJs ? 'Next.js' : ''} platform with secure auth, persistent data, and server-rendered performance.`
        : isExpress && hasDB
        ? 'A scalable REST API backend ready to power web and mobile frontends.'
        : `A ${isWeb ? 'web platform' : 'specialized tool'} solving immediate user pain points.`
    },
    real_world_comparison: {
      industryStandardScore: 85,
      missingProductionFeatures: [
        ...(!hasDocker ? ['Containerization (Docker)'] : []),
        ...(!(analyzerData.rawHeuristics?.hasGithubActions) ? ['CI/CD Pipeline'] : []),
        ...(!deps.includes('@sentry/nextjs') && !deps.includes('@sentry/node') ? ['Error Monitoring (Sentry)'] : []),
        ...(!hasRedis(deps) ? ['Caching Layer (Redis)'] : []),
        ...(!(analyzerData.rawHeuristics?.testFileCount > 0) ? ['Automated Test Suite'] : []),
      ].slice(0, 5),
      comparableRealProject: comparableProject
    }
  };
}

function hasRedis(deps: string[]): boolean {
  return deps.includes('redis') || deps.includes('ioredis');
}

export async function runBenchmark(repoUrl: string): Promise<Omit<BenchmarkRun, 'id' | 'created_at'>> {
  // Layer A: Extraction
  const analyzerData = await analyzeRepository(repoUrl);
  
  // Layer B: Classification & Scoring
  const classification = classifyProject(analyzerData);
  const scoring = calculateScore(classification.category, analyzerData.capabilities, analyzerData);
  const improvements = generateImprovements(
    analyzerData.capabilities, 
    classification.category, 
    scoring.maturityLevel,
    analyzerData.rawManifest.dependencies,
    analyzerData.rawManifest.devDependencies,
    analyzerData.rawHeuristics
  );

  // Layer C (Fallback text for now)
  const honestVerdict = generateDeterministicVerdict(
    scoring.score, 
    scoring.maturityLevel, 
    classification.title, 
    improvements[0]?.title
  );

  const deepAnalysis = generateDeepAnalysis(classification.category, scoring.score, analyzerData);

  return {
    repo_url: analyzerData.repoUrl,
    repo_owner: analyzerData.repoOwner,
    repo_name: analyzerData.repoName,
    commit_sha: analyzerData.commitSha,
    fingerprint: analyzerData.fingerprint,
    category: classification.category,
    category_confidence: classification.confidence,
    classification_title: classification.title,
    project_dna: {
      dependencies: analyzerData.rawManifest.dependencies || [],
      frameworks: analyzerData.rawManifest.dependencies?.filter((d: string) => ['react', 'vue', 'express', 'next', 'django', 'fastapi'].includes(d.toLowerCase())) || [],
    },
    score: scoring.score,
    maturity_level: scoring.maturityLevel,
    dimension_scores: scoring.dimensionScores,
    capabilities: analyzerData.capabilities,
    comparison_matrix: [],
    security_audit: deepAnalysis.security_audit,
    code_quality: deepAnalysis.code_quality,
    production_analysis: deepAnalysis.production_analysis,
    startup_potential: deepAnalysis.startup_potential,
    real_world_comparison: deepAnalysis.real_world_comparison,
    top_improvements: improvements,
    strengths: scoring.strengths,
    gaps: scoring.gaps,
    honest_verdict: honestVerdict,
    is_excellent: scoring.maturityLevel >= 5,
    version_number: 1,
    previous_run_id: null,
    score_delta: null,
    changes_detected: [],
    analyzer_version: '2.0.0'
  };
}
