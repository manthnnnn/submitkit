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
    comparison_matrix: [], // To be implemented or populated by frontend UI
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
