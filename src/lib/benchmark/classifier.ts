import { Category } from './types';
import { AnalyzerResult } from './analyzer';

export interface ClassificationResult {
  category: Category;
  confidence: number;
  title: string;
}

export function classifyProject(analyzerData: AnalyzerResult): ClassificationResult {
  let scores: Record<Category, number> = {
    AIML: 0,
    WEB_FULLSTACK: 0,
    WEB_FRONTEND: 0,
    MOBILE: 0,
    DATA_SCIENCE: 0,
    ALGORITHM_CLI: 0,
    SOFTWARE_PROJECT: 0
  };

  const { rawManifest, rawHeuristics } = analyzerData;
  const deps = [...rawManifest.dependencies, ...rawManifest.devDependencies];
  
  const hasFrontendFramework = deps.some(d => ['react', 'vue', 'angular', 'svelte', 'next', 'nuxt'].includes(d.toLowerCase()));
  const hasBackendFramework = deps.some(d => ['express', 'nestjs', 'fastapi', 'django', 'flask', 'spring'].includes(d.toLowerCase())) || 
                              rawHeuristics.apiEndpointsCount > 0;
  const hasMobileFramework = deps.some(d => ['react-native', 'expo', 'flutter'].includes(d.toLowerCase()));
  
  const hasML = deps.some(d => ['torch', 'tensorflow', 'scikit-learn', 'pandas'].includes(d.toLowerCase())) || rawHeuristics.hasMachineLearning;
  const hasJupyter = (rawHeuristics.fileExtensions['.ipynb'] || 0) > 0;

  // AI/ML scoring
  if (hasML) scores.AIML += 50;
  if (hasML && hasBackendFramework) scores.AIML += 30; // Deployed AI
  if (hasJupyter && !hasBackendFramework) scores.DATA_SCIENCE += 60;
  
  // Web Fullstack scoring
  if (hasFrontendFramework && hasBackendFramework) scores.WEB_FULLSTACK += 80;
  if (hasFrontendFramework && rawHeuristics.hasDatabaseModels) scores.WEB_FULLSTACK += 70;
  
  // Web Frontend scoring
  if (hasFrontendFramework && !hasBackendFramework && !rawHeuristics.hasDatabaseModels) scores.WEB_FRONTEND += 70;

  // Mobile scoring
  if (hasMobileFramework) scores.MOBILE += 80;
  
  // CLI / Algorithmic
  if (!hasFrontendFramework && !hasBackendFramework && !hasMobileFramework && !hasML && !hasJupyter) {
    if (rawHeuristics.fileExtensions['.py'] || rawHeuristics.fileExtensions['.java'] || rawHeuristics.fileExtensions['.cpp']) {
      scores.ALGORITHM_CLI += 50;
    }
  }

  // Find the highest score
  let maxScore = 0;
  let detectedCategory: Category = 'SOFTWARE_PROJECT';

  for (const [cat, score] of Object.entries(scores)) {
    if (score > maxScore) {
      maxScore = score;
      detectedCategory = cat as Category;
    }
  }

  let confidence = Math.min(100, maxScore);
  
  // Fallback
  if (maxScore < 40) {
    detectedCategory = 'SOFTWARE_PROJECT';
    confidence = maxScore;
  }

  const titles: Record<Category, string> = {
    AIML: 'AI/ML Application',
    WEB_FULLSTACK: 'Full-Stack Web Application',
    WEB_FRONTEND: 'Frontend Web Application',
    MOBILE: 'Mobile Application',
    DATA_SCIENCE: 'Data Science / Analysis Project',
    ALGORITHM_CLI: 'CLI / Algorithmic Project',
    SOFTWARE_PROJECT: 'Software Project (General)'
  };

  return {
    category: detectedCategory,
    confidence,
    title: titles[detectedCategory]
  };
}
