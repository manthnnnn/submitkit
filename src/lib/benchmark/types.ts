export type Category = 'AIML' | 'WEB_FULLSTACK' | 'WEB_FRONTEND' | 'MOBILE' | 'DATA_SCIENCE' | 'ALGORITHM_CLI' | 'SOFTWARE_PROJECT';

export type CapabilityStatus = '✅' | '🟢' | '🟡' | '❌' | '⚪';

export interface Capability {
  id: string;
  name: string;
  status: CapabilityStatus;
  evidence: string;
}

export interface DimensionScore {
  name: string;
  score: number;
  maxScore: number;
  evidence: string[];
}

export interface Improvement {
  title: string;
  impact: 'VERY HIGH' | 'HIGH' | 'MEDIUM';
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  why: string;
}

export interface SecurityAudit {
  vulnerabilities: { issue: string; severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'; fix: string }[];
  overallRisk: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  hardcodedSecretsDetected: boolean;
}

export interface CodeQuality {
  architecturePattern: string;
  maintainabilityScore: number;
  cyclomaticComplexityEst: 'LOW' | 'MEDIUM' | 'HIGH' | 'EXTREME';
  duplicateCodeProbability: string;
}

export interface ProductionAnalysis {
  enterpriseReadiness: 'PROTOTYPE' | 'MVP' | 'SCALABLE' | 'PRODUCTION_READY';
  customerHooks: { feature: string; valueProposition: string; howToMarket: string }[];
  scalabilityBottlenecks: { component: string; risk: string; solution: string }[];
}

export interface StartupPotential {
  monetizable: boolean;
  targetAudience: string;
  mvpReadiness: number; // 0-100
  pitchOneLiner: string;
}

export interface RealWorldComparison {
  industryStandardScore: number; // 0-100
  missingProductionFeatures: string[];
  comparableRealProject: string;
}

export interface BenchmarkRun {
  id: string;
  repo_url: string;
  repo_owner: string;
  repo_name: string;
  commit_sha: string;
  fingerprint: string;
  category: Category;
  category_confidence: number;
  classification_title: string;
  project_dna: Record<string, string[]>;
  score: number;
  maturity_level: number;
  dimension_scores: DimensionScore[];
  capabilities: Capability[];
  comparison_matrix: Record<string, any>[];
  top_improvements: Improvement[];
  strengths: string[];
  gaps: string[];
  security_audit: SecurityAudit;
  code_quality: CodeQuality;
  production_analysis: ProductionAnalysis;
  startup_potential: StartupPotential;
  real_world_comparison: RealWorldComparison;
  honest_verdict: string;
  is_excellent: boolean;
  version_number: number;
  previous_run_id: string | null;
  score_delta: number | null;
  changes_detected: string[];
  analyzer_version: string;
  created_at: string;
}

export interface ProjectAcquisition {
  id: string;
  repo_url: string;
  candidate_title: string;
  category: string;
  license_spdx: string | null;
  license_status: 'VERIFIED_COMMERCIAL' | 'RESTRICTED' | 'REQUIRES_REVIEW';
  original_author: string | null;
  benchmark_score: number | null;
  upgrade_roadmap: string[];
  status: 'CANDIDATE' | 'IN_DEVELOPMENT' | 'DOCUMENTING' | 'PUBLISHED' | 'REJECTED';
  created_at: string;
  updated_at: string;
}
