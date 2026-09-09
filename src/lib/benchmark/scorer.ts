import { CATEGORY_WEIGHTS, BENCHMARK_DIMENSIONS } from './constants';
import { Category, Capability, DimensionScore } from './types';
import { AnalyzerResult } from './analyzer';

export interface ScorerResult {
  score: number;
  maturityLevel: number;
  dimensionScores: DimensionScore[];
  strengths: string[];
  gaps: string[];
}

export function calculateScore(
  category: Category, 
  capabilities: Capability[],
  analyzerData: AnalyzerResult
): ScorerResult {
  const weights = CATEGORY_WEIGHTS[category];
  const dimensionScores: DimensionScore[] = [];
  let totalScore = 0;
  let totalMaxScore = 0;

  const strengths: string[] = [];
  const gaps: string[] = [];

  // Helper to map capabilities to dimensions and calculate a percentage (0-100) per dimension
  const evaluateDimension = (dimName: string, relevantCapIds: string[]): DimensionScore => {
    const caps = capabilities.filter(c => relevantCapIds.includes(c.id));
    if (caps.length === 0) return { name: dimName, score: 0, maxScore: weights[dimName] || 0, evidence: [] };

    let earned = 0;
    let possible = caps.length * 2; // ✅ = 2, 🟡 = 1, ❌/⚪ = 0
    const evidence: string[] = [];

    caps.forEach(c => {
      if (c.status === '✅') {
        earned += 2;
        strengths.push(`${c.name}: ${c.evidence}`);
      } else if (c.status === '🟡') {
        earned += 1;
      } else if (c.status === '❌' || c.status === '⚪') {
        gaps.push(`${c.name}: ${c.evidence}`);
      }
      evidence.push(`[${c.status}] ${c.name}`);
    });

    const percentage = possible > 0 ? (earned / possible) : 0;
    const maxDimensionPoints = weights[dimName] || 0;
    const actualPoints = Math.round(percentage * maxDimensionPoints);

    totalScore += actualPoints;
    totalMaxScore += maxDimensionPoints;

    return {
      name: dimName,
      score: actualPoints,
      maxScore: maxDimensionPoints,
      evidence
    };
  };

  // Map capabilities to dimensions
  dimensionScores.push(evaluateDimension('Core Functionality', ['auth', 'database']));
  dimensionScores.push(evaluateDimension('Deployment & DevOps', ['docker', 'cicd']));
  dimensionScores.push(evaluateDimension('Testing & Quality', ['testing']));
  dimensionScores.push(evaluateDimension('API & Integrations', ['api']));
  dimensionScores.push(evaluateDimension('AI/ML & Data Depth', ['ml']));
  
  // For dimensions without direct 1:1 capabilities mapped yet, we give a baseline based on heuristics
  const applyHeuristicDimension = (dimName: string, baseScore: number) => {
    const max = weights[dimName] || 0;
    const actual = Math.round((baseScore / 100) * max);
    totalScore += actual;
    totalMaxScore += max;
    dimensionScores.push({
      name: dimName,
      score: actual,
      maxScore: max,
      evidence: ['Evaluated via repository structure heuristics.']
    });
  };

  // Rough heuristics for other dimensions
  applyHeuristicDimension('Architecture & Design', analyzerData.rawManifest.dependencies.length > 5 ? 70 : 30);
  applyHeuristicDimension('Technical Depth', analyzerData.rawManifest.dependencies.length > 10 ? 80 : 40);
  applyHeuristicDimension('Documentation', analyzerData.capabilities.some(c => c.status === '❌') ? 40 : 80);
  applyHeuristicDimension('Security & Safety', analyzerData.rawHeuristics.hasAuthentication ? 80 : 20);
  applyHeuristicDimension('UX & Product Polish', category === 'WEB_FRONTEND' || category === 'WEB_FULLSTACK' ? 70 : 0);

  // Normalize to 100
  const normalizedScore = totalMaxScore > 0 ? Math.round((totalScore / totalMaxScore) * 100) : 0;

  // Maturity Ladder
  let maturityLevel = 1;
  if (normalizedScore > 30) maturityLevel = 2;
  if (normalizedScore > 50) maturityLevel = 3;
  if (normalizedScore > 70) maturityLevel = 4;
  if (normalizedScore > 85) maturityLevel = 5;
  if (normalizedScore > 95) maturityLevel = 6;

  // De-duplicate strengths/gaps
  const uniqueStrengths = Array.from(new Set(strengths)).slice(0, 5);
  const uniqueGaps = Array.from(new Set(gaps)).slice(0, 5);

  return {
    score: Math.min(100, Math.max(0, normalizedScore)),
    maturityLevel,
    dimensionScores,
    strengths: uniqueStrengths,
    gaps: uniqueGaps
  };
}
