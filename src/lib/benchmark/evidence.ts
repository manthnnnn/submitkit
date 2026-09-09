import * as fs from 'fs';
import * as path from 'path';
import { ManifestDetails } from './manifest-parser';
import { HeuristicResults } from './heuristic-scanner';
import { Capability } from './types';

export function parseReadme(tmpDirPath: string): string {
  const possibleNames = ['README.md', 'readme.md', 'README.txt', 'readme.txt'];
  for (const name of possibleNames) {
    const filePath = path.join(tmpDirPath, name);
    if (fs.existsSync(filePath)) {
      try {
        return fs.readFileSync(filePath, 'utf8').toLowerCase();
      } catch (e) {
        // ignore
      }
    }
  }
  return '';
}

export function generateCapabilities(
  readmeContent: string, 
  manifest: ManifestDetails, 
  heuristics: HeuristicResults
): Capability[] {
  const capabilities: Capability[] = [];

  // Helper to safely check claims
  const checkClaim = (
    id: string, 
    name: string, 
    readmeKeywords: string[], 
    isActuallyDetected: boolean,
    positiveEvidence: string,
    negativeEvidence: string
  ) => {
    const claimedInReadme = readmeKeywords.some(kw => readmeContent.includes(kw.toLowerCase()));
    
    if (isActuallyDetected) {
      capabilities.push({
        id,
        name,
        status: '✅',
        evidence: positiveEvidence
      });
    } else if (claimedInReadme && !isActuallyDetected) {
      // Hallucination / Fake Claim
      capabilities.push({
        id,
        name,
        status: '❌',
        evidence: `README claims this feature, but static analysis found no evidence. ${negativeEvidence}`
      });
    } else {
      // Not claimed, not detected
      capabilities.push({
        id,
        name,
        status: '⚪',
        evidence: negativeEvidence
      });
    }
  };

  // 1. Authentication
  checkClaim(
    'auth',
    'Authentication',
    ['authentication', 'jwt', 'login', 'oauth', 'passport', 'auth'],
    heuristics.hasAuthentication,
    'Detected auth libraries and middleware signatures in source code.',
    'No authentication middleware or token generation found.'
  );

  // 2. Database
  checkClaim(
    'database',
    'Database Integration',
    ['database', 'postgres', 'mongodb', 'mysql', 'sql', 'prisma', 'orm'],
    heuristics.hasDatabaseModels,
    'Detected ORM schemas or database models.',
    'No database drivers or schema files detected.'
  );

  // 3. Deployment (Docker)
  checkClaim(
    'docker',
    'Containerization',
    ['docker', 'docker-compose', 'container'],
    heuristics.hasDocker,
    'Detected Dockerfile or docker-compose.yml.',
    'No Docker configurations found.'
  );

  // 4. CI/CD
  checkClaim(
    'cicd',
    'CI/CD Pipelines',
    ['ci/cd', 'github actions', 'pipeline', 'automated deployment'],
    heuristics.hasGithubActions,
    'Detected .github/workflows.',
    'No automated workflows detected.'
  );

  // 5. Testing
  checkClaim(
    'testing',
    'Automated Testing',
    ['testing', 'jest', 'pytest', 'unit tests', 'tdd'],
    heuristics.testFileCount > 0,
    `Detected ${heuristics.testFileCount} test files.`,
    'No test files detected.'
  );

  // 6. API
  checkClaim(
    'api',
    'REST/GraphQL API',
    ['api', 'rest', 'graphql', 'endpoints'],
    heuristics.apiEndpointsCount > 0,
    `Detected ~${heuristics.apiEndpointsCount} API route definitions.`,
    'No backend API routes detected.'
  );

  // 7. Machine Learning
  checkClaim(
    'ml',
    'Machine Learning / AI',
    ['machine learning', 'ai', 'model', 'pytorch', 'tensorflow', 'scikit'],
    heuristics.hasMachineLearning,
    'Detected ML libraries or model artifact files (.pt, .onnx).',
    'No ML libraries or model artifacts detected.'
  );

  return capabilities;
}
