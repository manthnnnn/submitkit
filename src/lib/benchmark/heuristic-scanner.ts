import * as fs from 'fs';
import * as path from 'path';

export interface HeuristicResults {
  hasDocker: boolean;
  hasGithubActions: boolean;
  hasDatabaseModels: boolean;
  apiEndpointsCount: number;
  hasAuthentication: boolean;
  testFileCount: number;
  hasMachineLearning: boolean;
  fileExtensions: Record<string, number>;
}

const IGNORE_DIRS = new Set(['node_modules', '.git', 'venv', 'env', '__pycache__', 'dist', 'build', '.next']);

export function scanRepositoryHeuristics(dirPath: string): HeuristicResults {
  const results: HeuristicResults = {
    hasDocker: false,
    hasGithubActions: false,
    hasDatabaseModels: false,
    apiEndpointsCount: 0,
    hasAuthentication: false,
    testFileCount: 0,
    hasMachineLearning: false,
    fileExtensions: {}
  };

  function walk(currentPath: string) {
    const entries = fs.readdirSync(currentPath, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.isDirectory()) {
        if (IGNORE_DIRS.has(entry.name)) continue;
        
        // Check for .github/workflows
        if (entry.name === '.github') {
          const workflowsPath = path.join(currentPath, entry.name, 'workflows');
          if (fs.existsSync(workflowsPath)) results.hasGithubActions = true;
        }

        walk(path.join(currentPath, entry.name));
      } else {
        const fullPath = path.join(currentPath, entry.name);
        const ext = path.extname(entry.name).toLowerCase();
        
        results.fileExtensions[ext] = (results.fileExtensions[ext] || 0) + 1;

        // Docker
        if (entry.name.toLowerCase() === 'dockerfile' || entry.name.toLowerCase() === 'docker-compose.yml') {
          results.hasDocker = true;
        }

        // Test files
        if (entry.name.includes('.test.') || entry.name.includes('.spec.') || entry.name.startsWith('test_')) {
          results.testFileCount++;
        }

        // Machine Learning artifacts
        if (['.pkl', '.onnx', '.pt', '.h5', '.ipynb'].includes(ext)) {
          results.hasMachineLearning = true;
        }

        // Deep Content Scanning for Source Files
        if (['.ts', '.js', '.py', '.java', '.go'].includes(ext)) {
          try {
            const content = fs.readFileSync(fullPath, 'utf8');

            // API detection
            const apiMatches = content.match(/@app\.get|router\.post|export async function GET|app\.post|@GetMapping/g);
            if (apiMatches) results.apiEndpointsCount += apiMatches.length;

            // Auth detection
            if (/jwt\.sign|createToken|passport\.use|next-auth|supabase\.auth/i.test(content)) {
              results.hasAuthentication = true;
            }

            // Database Model detection
            if (/schema\.prisma|mongoose\.Schema|class .* extends Model|Column\(|@Entity/i.test(content)) {
              results.hasDatabaseModels = true;
            }
            
            // ML imports
            if (/import torch|from sklearn|import tensorflow/i.test(content)) {
              results.hasMachineLearning = true;
            }

          } catch (e) {
            // Ignore read errors for binary or unreadable files
          }
        }
      }
    }
  }

  walk(dirPath);
  return results;
}
