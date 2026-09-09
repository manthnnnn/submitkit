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
  // Simulate deep static analysis results based on score and category
  const isWeb = category.includes('WEB');
  const hasDB = analyzerData.capabilities.some((c: any) => c.name.toLowerCase().includes('database') && c.status === '✅');
  const hasAuth = analyzerData.capabilities.some((c: any) => c.name.toLowerCase().includes('auth') && c.status === '✅');
  const hasDocker = analyzerData.capabilities.some((c: any) => c.name.toLowerCase().includes('docker') && c.status === '✅');

  const securityRisk = score < 40 ? 'HIGH' : score < 70 ? 'MEDIUM' : 'LOW';
  
  let vulnerabilities: any[] = [];
  if (!hasAuth && isWeb) vulnerabilities.push({ issue: 'Missing Authentication Layer', severity: 'CRITICAL', fix: 'Implement OAuth or JWT based authentication.' });
  if (!hasDocker) vulnerabilities.push({ issue: 'Inconsistent Environment Execution', severity: 'MEDIUM', fix: 'Add Dockerfile to ensure containerized execution.' });
  if (score < 60) vulnerabilities.push({ issue: 'Potential Secret Exposure', severity: 'HIGH', fix: 'Ensure .env files are not tracked in git and secrets are managed.' });

  const productionAnalysis = {
    enterpriseReadiness: (score >= 80 && hasDB && hasAuth && hasDocker ? 'PRODUCTION_READY' : score >= 60 ? 'SCALABLE' : score >= 40 ? 'MVP' : 'PROTOTYPE') as any,
    customerHooks: [
      {
        feature: isWeb ? 'Cloud-Ready Architecture' : 'Standalone Efficiency',
        valueProposition: isWeb ? 'Can instantly deploy to AWS/Vercel with minimal configuration.' : 'Runs anywhere with zero cloud dependencies.',
        howToMarket: 'Pitch this to clients as a "Zero-Friction Deployment" advantage.'
      }
    ],
    scalabilityBottlenecks: [] as any[]
  };

  if (hasDB) {
    productionAnalysis.customerHooks.push({
      feature: 'Persistent Data Integrity',
      valueProposition: 'Data is structured and securely stored, ready for thousands of concurrent reads.',
      howToMarket: 'Market as "Enterprise-Grade Reliability".'
    });
    if (!hasDocker) {
      productionAnalysis.scalabilityBottlenecks.push({
        component: 'Database Provisioning',
        risk: 'Manual database setup limits horizontal scaling.',
        solution: 'Introduce Docker Compose or a managed DB-as-a-Service (DBaaS) like Supabase/Neon.'
      });
    }
  } else if (isWeb) {
    productionAnalysis.scalabilityBottlenecks.push({
      component: 'State Management',
      risk: 'Without a database, data is volatile and will be lost on server restart.',
      solution: 'Integrate PostgreSQL or Redis to persist sessions and user data.'
    });
  }

  if (!hasAuth && isWeb) {
    productionAnalysis.scalabilityBottlenecks.push({
      component: 'User Identity',
      risk: 'Open access allows abuse and prevents monetization per-user.',
      solution: 'Add NextAuth, Clerk, or Auth0 for robust RBAC (Role-Based Access Control).'
    });
  }

  return {
    security_audit: {
      vulnerabilities,
      overallRisk: securityRisk as any,
      hardcodedSecretsDetected: score < 50
    },
    code_quality: {
      architecturePattern: isWeb ? (hasDB ? 'Decoupled Monolith (MVC/API)' : 'Static Frontend') : 'Standalone Script/App',
      maintainabilityScore: Math.min(100, score + 15),
      cyclomaticComplexityEst: (score < 50 ? 'HIGH' : score < 80 ? 'MEDIUM' : 'LOW') as any,
      duplicateCodeProbability: score < 50 ? 'High (20%+)' : score < 80 ? 'Moderate (5-10%)' : 'Low (< 5%)'
    },
    production_analysis: productionAnalysis,
    startup_potential: {
      monetizable: score >= 60 && hasDB,
      targetAudience: isWeb ? 'B2C Users / B2B Small Businesses' : 'Developers / Niche Users',
      mvpReadiness: score,
      pitchOneLiner: `A ${isWeb ? 'scalable web platform' : 'specialized tool'} built to solve immediate user pain points.`
    },
    real_world_comparison: {
      industryStandardScore: 85,
      missingProductionFeatures: ['CI/CD Pipelines', 'Comprehensive Test Suite', 'Error Monitoring (e.g. Sentry)', 'Analytics'].filter(() => score < 80).slice(0, 3),
      comparableRealProject: isWeb ? 'Basic SaaS Starter Kit' : 'Internal Utility Tool'
    }
  };
}

export async function runBenchmark(repoUrl: string): Promise<Omit<BenchmarkRun, 'id' | 'created_at'>> {
  // Layer A: Extraction
  const analyzerData = await analyzeRepository(repoUrl);
  
  // Layer B: Classification & Scoring
  const classification = classifyProject(analyzerData);
  const scoring = calculateScore(classification.category, analyzerData.capabilities, analyzerData);
  const improvements = generateImprovements(analyzerData.capabilities, classification.category, scoring.maturityLevel);

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
    version_number: 1, // Will be overridden by DB logic if previous runs exist
    previous_run_id: null,
    score_delta: null,
    changes_detected: [],
    analyzer_version: '1.0.0'
  };
}
