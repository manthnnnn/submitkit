import fs from 'fs';
import path from 'path';

// Clean, standalone SVG for the SubmitKit Brand Mark
export const submitKitSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="100%" height="100%" fill="none">
  <defs>
    <!-- Top Facet (Submission Platform / Mint Emerald to Sky Cyan) -->
    <linearGradient id="sk-top-grad" x1="10" y1="14" x2="38" y2="14" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="50%" stop-color="#34d399"/>
      <stop offset="100%" stop-color="#10b981"/>
    </linearGradient>

    <!-- Left Facet (Code Core / Deep Electric Indigo) -->
    <linearGradient id="sk-left-grad" x1="10" y1="16" x2="23" y2="38" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#818cf8"/>
      <stop offset="100%" stop-color="#4338ca"/>
    </linearGradient>

    <!-- Right Facet (Documentation & Delivery / Cyan to Teal) -->
    <linearGradient id="sk-right-grad" x1="25" y1="16" x2="38" y2="38" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#06b6d4"/>
      <stop offset="100%" stop-color="#0f766e"/>
    </linearGradient>

    <!-- Subtle Ambient Glow -->
    <filter id="sk-prism-glow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#10b981" flood-opacity="0.35"/>
    </filter>
  </defs>

  <g filter="url(#sk-prism-glow)">
    <!-- Top Isometric Face -->
    <path d="M24 6L38.5 14.5L24 23L9.5 14.5L24 6Z" fill="url(#sk-top-grad)"/>
    
    <!-- Left Vertical Face -->
    <path d="M9.5 17L22.5 24.5V39L9.5 31.5V17Z" fill="url(#sk-left-grad)"/>
    
    <!-- Right Vertical Face -->
    <path d="M25.5 24.5L38.5 17V31.5L25.5 39V24.5Z" fill="url(#sk-right-grad)"/>

    <!-- Specular Highlight on Apex (Subtle launch arrow in negative space) -->
    <path d="M24 10L31 14.2L24 18.5L17 14.2L24 10Z" fill="#ffffff" fill-opacity="0.45"/>
    
    <!-- Micro central node -->
    <circle cx="24" cy="14.2" r="1.5" fill="#ffffff"/>
  </g>
</svg>`;

const targetSvgPath = path.join(process.cwd(), 'src', 'app', 'icon.svg');
const publicSvgPath = path.join(process.cwd(), 'public', 'icon.svg');

fs.writeFileSync(targetSvgPath, submitKitSvg, 'utf8');
fs.writeFileSync(publicSvgPath, submitKitSvg, 'utf8');

console.log('Saved icon.svg to src/app and public successfully.');
