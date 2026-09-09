import * as fs from 'fs';
import * as path from 'path';

export interface LicenseValidation {
  spdx: string | null;
  status: 'VERIFIED_COMMERCIAL' | 'RESTRICTED' | 'REQUIRES_REVIEW';
}

const PERMISSIVE_LICENSES = ['MIT', 'Apache-2.0', 'BSD-2-Clause', 'BSD-3-Clause', 'ISC'];
const RESTRICTIVE_LICENSES = ['GPL-2.0', 'GPL-3.0', 'AGPL-3.0'];

export function validateLicense(tmpDirPath: string): LicenseValidation {
  const possibleNames = ['LICENSE', 'LICENSE.md', 'LICENSE.txt', 'license'];
  
  for (const name of possibleNames) {
    const filePath = path.join(tmpDirPath, name);
    if (fs.existsSync(filePath)) {
      try {
        const content = fs.readFileSync(filePath, 'utf8').substring(0, 1000); // Read first 1000 chars
        
        // Simple heuristic matching
        if (content.includes('MIT License') || content.includes('The MIT License')) {
          return { spdx: 'MIT', status: 'VERIFIED_COMMERCIAL' };
        }
        if (content.includes('Apache License') && content.includes('Version 2.0')) {
          return { spdx: 'Apache-2.0', status: 'VERIFIED_COMMERCIAL' };
        }
        if (content.includes('GNU GENERAL PUBLIC LICENSE') || content.includes('GNU AFFERO')) {
          return { spdx: 'GPL-3.0', status: 'RESTRICTED' }; // Catch-all for viral GPL family
        }
        if (content.includes('BSD')) {
          return { spdx: 'BSD-3-Clause', status: 'VERIFIED_COMMERCIAL' };
        }
        
      } catch (e) {
        // ignore
      }
    }
  }

  // Fallback check in package.json
  const packageJsonPath = path.join(tmpDirPath, 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    try {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      if (packageJson.license) {
        const spdx = typeof packageJson.license === 'string' ? packageJson.license : packageJson.license.type;
        if (PERMISSIVE_LICENSES.includes(spdx)) return { spdx, status: 'VERIFIED_COMMERCIAL' };
        if (RESTRICTIVE_LICENSES.includes(spdx)) return { spdx, status: 'RESTRICTED' };
      }
    } catch (e) {
      // ignore
    }
  }

  return { spdx: null, status: 'REQUIRES_REVIEW' };
}
