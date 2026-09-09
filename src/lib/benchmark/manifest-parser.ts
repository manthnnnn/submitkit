import * as fs from 'fs';
import * as path from 'path';

/**
 * Parsed details from package.json, requirements.txt, etc.
 */
export interface ManifestDetails {
  projectName?: string;
  projectDescription?: string;
  dependencies: string[];
  devDependencies: string[];
  scripts: Record<string, string>;
  engines: Record<string, string>;
}

/**
 * Searches the repository root for common manifest files to extract raw dependencies.
 */
export function parseManifests(tmpDirPath: string): ManifestDetails {
  const details: ManifestDetails = {
    dependencies: [],
    devDependencies: [],
    scripts: {},
    engines: {}
  };

  // Node.js
  const packageJsonPath = path.join(tmpDirPath, 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    try {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      if (packageJson.name) details.projectName = packageJson.name;
      if (packageJson.description) details.projectDescription = packageJson.description;
      
      if (packageJson.dependencies) {
        details.dependencies.push(...Object.keys(packageJson.dependencies));
      }
      if (packageJson.devDependencies) {
        details.devDependencies.push(...Object.keys(packageJson.devDependencies));
      }
      if (packageJson.scripts) {
        details.scripts = packageJson.scripts;
      }
      if (packageJson.engines) {
        details.engines = packageJson.engines;
      }
    } catch (e) {
      console.warn('Failed to parse package.json', e);
    }
  }

  // Python: requirements.txt
  const reqTxtPath = path.join(tmpDirPath, 'requirements.txt');
  if (fs.existsSync(reqTxtPath)) {
    try {
      const content = fs.readFileSync(reqTxtPath, 'utf8');
      const deps = content.split('\n')
        .map(line => line.trim())
        .filter(line => line && !line.startsWith('#'))
        .map(line => line.split(/[=<>~]/)[0].trim());
      details.dependencies.push(...deps);
    } catch (e) {
      console.warn('Failed to parse requirements.txt', e);
    }
  }

  // Python: pyproject.toml (basic heuristic)
  const pyprojectPath = path.join(tmpDirPath, 'pyproject.toml');
  if (fs.existsSync(pyprojectPath)) {
    try {
      const content = fs.readFileSync(pyprojectPath, 'utf8');
      // Very crude regex for finding dependency lines in poetry/pipenv/flit
      const depsMatches = content.matchAll(/([a-zA-Z0-9_-]+)\s*=\s*["']/g);
      for (const match of depsMatches) {
        details.dependencies.push(match[1]);
      }
    } catch (e) {
      console.warn('Failed to parse pyproject.toml', e);
    }
  }

  // Return unique lists
  details.dependencies = Array.from(new Set(details.dependencies));
  details.devDependencies = Array.from(new Set(details.devDependencies));

  return details;
}
