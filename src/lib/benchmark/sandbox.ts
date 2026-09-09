import { exec } from 'child_process';
import { promisify } from 'util';
import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs';
import * as crypto from 'crypto';

const execAsync = promisify(exec);

export interface SandboxInfo {
  repoUrl: string;
  repoOwner: string;
  repoName: string;
  tmpDirPath: string;
  commitSha: string;
  cleanup: () => Promise<void>;
}

/**
 * Extracts owner and repo name from a GitHub URL
 */
export function parseGitHubUrl(url: string): { owner: string; repo: string } {
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname !== 'github.com') {
      throw new Error('Only GitHub URLs are supported');
    }
    const parts = urlObj.pathname.split('/').filter(Boolean);
    if (parts.length < 2) {
      throw new Error('Invalid GitHub URL format');
    }
    return { owner: parts[0], repo: parts[1].replace('.git', '') };
  } catch (err: any) {
    throw new Error(`Failed to parse GitHub URL: ${err.message}`);
  }
}

/**
 * Safely creates an ephemeral workspace and shallow clones the repository.
 */
export async function createSandbox(repoUrl: string): Promise<SandboxInfo> {
  const { owner, repo } = parseGitHubUrl(repoUrl);
  
  // Create a unique temporary directory
  const runId = crypto.randomBytes(8).toString('hex');
  const tmpDirPath = path.join(os.tmpdir(), `submitkit_benchmark_${owner}_${repo}_${runId}`);
  
  fs.mkdirSync(tmpDirPath, { recursive: true });

  const cleanup = async () => {
    try {
      if (fs.existsSync(tmpDirPath)) {
        fs.rmSync(tmpDirPath, { recursive: true, force: true });
      }
    } catch (err) {
      console.error(`Failed to cleanup sandbox at ${tmpDirPath}:`, err);
    }
  };

  try {
    // Determine the clone URL
    const cloneUrl = `https://github.com/${owner}/${repo}.git`;
    
    // Shallow clone the repo. We use --depth 1 for speed and --single-branch
    // Adding a timeout of 15 seconds to prevent hanging on massive/unresponsive repos.
    await execAsync(`git clone --depth 1 --single-branch ${cloneUrl} ${tmpDirPath}`, {
      timeout: 15000, 
    });

    // Extract the latest commit SHA
    const { stdout: commitShaStdout } = await execAsync(`git rev-parse HEAD`, { cwd: tmpDirPath });
    const commitSha = commitShaStdout.trim();

    // Verify folder size to protect against DoS (e.g. limit to 100MB)
    const { stdout: sizeStdout } = await execAsync(`pwsh -Command "(Get-ChildItem -Recurse | Measure-Object -Property Length -Sum).Sum"`, { cwd: tmpDirPath }).catch(() => ({ stdout: "0" }));
    
    // Fallback to simple node.js folder size calc if powershell fails or on linux
    const getDirSize = (dirPath: string): number => {
      let size = 0;
      const files = fs.readdirSync(dirPath, { withFileTypes: true });
      for (const file of files) {
        if (file.name === '.git') continue;
        const fullPath = path.join(dirPath, file.name);
        if (file.isDirectory()) {
          size += getDirSize(fullPath);
        } else {
          size += fs.statSync(fullPath).size;
        }
      }
      return size;
    };

    const dirSizeMB = getDirSize(tmpDirPath) / (1024 * 1024);
    if (dirSizeMB > 100) {
      throw new Error(`Repository exceeds maximum allowed size (100MB). Actual: ${dirSizeMB.toFixed(2)}MB`);
    }

    return {
      repoUrl,
      repoOwner: owner,
      repoName: repo,
      tmpDirPath,
      commitSha,
      cleanup
    };
  } catch (error: any) {
    // If anything fails during setup, immediately clean up to avoid leaks
    await cleanup();
    throw new Error(`Failed to create sandbox: ${error.message}`);
  }
}
