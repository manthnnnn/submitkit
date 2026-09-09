import { exec } from 'child_process';
import { promisify } from 'util';
import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs';
import * as crypto from 'crypto';
import * as tar from 'tar';

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

  const tarFilePath = `${tmpDirPath}.tar.gz`;

  const cleanup = async () => {
    try {
      if (fs.existsSync(tmpDirPath)) {
        fs.rmSync(tmpDirPath, { recursive: true, force: true });
      }
      if (fs.existsSync(tarFilePath)) {
        fs.unlinkSync(tarFilePath);
      }
    } catch (err) {
      console.error(`Failed to cleanup sandbox at ${tmpDirPath}:`, err);
    }
  };

  try {
    // Download tarball via GitHub API
    const tarballUrl = `https://api.github.com/repos/${owner}/${repo}/tarball`;
    const response = await fetch(tarballUrl, {
      headers: { 'User-Agent': 'SubmitKit-Benchmark' },
      // add timeout logic if needed, but Vercel handles function timeout natively
    });

    if (!response.ok) {
      if (response.status === 404) throw new Error('Repository not found (is it private?)');
      throw new Error(`Failed to fetch repo: ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    
    if (arrayBuffer.byteLength > 100 * 1024 * 1024) {
      throw new Error(`Repository tarball exceeds maximum allowed size (100MB).`);
    }

    fs.writeFileSync(tarFilePath, Buffer.from(arrayBuffer));

    // Extract tarball
    await tar.x({
      file: tarFilePath,
      cwd: tmpDirPath,
      strip: 1 // GitHub tarballs contain a root folder `owner-repo-sha`
    });

    // Cleanup tar file immediately
    if (fs.existsSync(tarFilePath)) {
      fs.unlinkSync(tarFilePath);
    }

    // Get latest commit SHA via API since we don't have .git
    let commitSha = 'unknown';
    try {
      const commitResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits?per_page=1`, {
        headers: { 'User-Agent': 'SubmitKit-Benchmark' }
      });
      if (commitResponse.ok) {
        const commitData = await commitResponse.json();
        commitSha = commitData[0]?.sha || 'unknown';
      }
    } catch (e) {
      // ignore if commit sha fetch fails
    }

    // Verify folder size to protect against DoS
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
