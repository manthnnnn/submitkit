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

  const vivaQuestions: any[] = [
    {
      question: `Why did you choose this specific architecture for your ${isWeb ? 'web application' : 'project'}?`,
      difficulty: 'EASY',
      idealAnswer: 'I chose this architecture because it separates concerns. The frontend handles the UI independently, allowing the backend to scale and serve as an API. This is standard in modern microservices or decoupled monoliths.',
      trapToAvoid: 'Do not say "because the tutorial used it." Always refer to separation of concerns and scalability.'
    }
  ];

  if (hasDB) {
    vivaQuestions.push({
      question: 'How did you handle database schema design and normalization?',
      difficulty: 'MEDIUM',
      idealAnswer: 'I ensured the database is in 3rd Normal Form (3NF) to eliminate data redundancy, using foreign keys for relationships. This ensures data integrity when updates occur.',
      trapToAvoid: 'Avoid admitting to using a single massive table. If using NoSQL, mention document embedding vs referencing.'
    });
  } else {
    vivaQuestions.push({
      question: 'How is data persisted in your application?',
      difficulty: 'MEDIUM',
      idealAnswer: 'Currently, the application relies on in-memory or file-based storage. For a production environment, I would integrate a relational database like PostgreSQL.',
      trapToAvoid: 'Do not claim the app can handle millions of users if it lacks a real database.'
    });
  }

  vivaQuestions.push({
    question: 'If you had 10,000 concurrent users tomorrow, what would break first?',
    difficulty: 'PROFESSOR_LEVEL',
    idealAnswer: 'The database connections would likely bottleneck first, followed by the web server running out of memory. I would introduce connection pooling, Redis caching, and a load balancer to mitigate this.',
    trapToAvoid: 'Never say "Nothing will break." Professors want to see your understanding of system limits.'
  });

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
    viva_defense: vivaQuestions,
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
    viva_defense: deepAnalysis.viva_defense,
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
