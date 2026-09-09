import { createSandbox } from './sandbox';
import { parseManifests } from './manifest-parser';
import { scanRepositoryHeuristics } from './heuristic-scanner';
import { parseReadme, generateCapabilities } from './evidence';
import { Capability } from './types';

export interface AnalyzerResult {
  repoUrl: string;
  repoOwner: string;
  repoName: string;
  commitSha: string;
  fingerprint: string;
  capabilities: Capability[];
  rawManifest: any;
  rawHeuristics: any;
}

/**
 * Orchestrates Layer A: Deterministic Repository Intelligence
 */
export async function analyzeRepository(repoUrl: string): Promise<AnalyzerResult> {
  const sandbox = await createSandbox(repoUrl);
  
  try {
    // 1. Static Analysis
    const manifest = parseManifests(sandbox.tmpDirPath);
    const heuristics = scanRepositoryHeuristics(sandbox.tmpDirPath);
    
    // 2. Evidence Checker (Anti-hallucination)
    const readmeContent = parseReadme(sandbox.tmpDirPath);
    const capabilities = generateCapabilities(readmeContent, manifest, heuristics);

    // 3. Generate Fingerprint (hash of commitSha + capabilities structure)
    // This allows us to detect if a repo has fundamentally changed its capabilities
    const fingerprintRaw = JSON.stringify({
      commitSha: sandbox.commitSha,
      deps: manifest.dependencies.length,
      heuristics
    });
    
    // Using a fast non-crypto hash just for tracking diffs
    const fingerprint = Array.from(fingerprintRaw).reduce((s, c) => Math.imul(31, s) + c.charCodeAt(0) | 0, 0).toString(16);

    return {
      repoUrl: sandbox.repoUrl,
      repoOwner: sandbox.repoOwner,
      repoName: sandbox.repoName,
      commitSha: sandbox.commitSha,
      fingerprint,
      capabilities,
      rawManifest: manifest,
      rawHeuristics: heuristics
    };

  } finally {
    // Guarantee cleanup
    await sandbox.cleanup();
  }
}
