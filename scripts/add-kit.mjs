#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const AVAILABLE_PROJECTS_TS = path.join(ROOT_DIR, 'src', 'lib', 'available-projects.ts');
const STATIC_CATALOG_TS = path.join(ROOT_DIR, 'src', 'lib', 'static-catalog.ts');
const PUBLIC_PROJECTS_DIR = path.join(ROOT_DIR, 'public', 'projects');
const FACTORY_DIR = path.join(ROOT_DIR, 'project-factory');

// Parse CLI flags
function parseArgs() {
  const args = process.argv.slice(2);
  const flags = {};
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg.startsWith('--')) {
      const key = arg.slice(2);
      if (i + 1 < args.length && !args[i + 1].startsWith('--')) {
        flags[key] = args[i + 1];
        i++;
      } else {
        flags[key] = true;
      }
    }
  }
  return flags;
}

// Read current available core slugs from available-projects.ts
function getCurrentReadySlugs() {
  const content = fs.readFileSync(AVAILABLE_PROJECTS_TS, 'utf-8');
  const match = content.match(/export const AVAILABLE_CORE_SLUGS = \[\s*([\s\S]*?)\] as const;/);
  if (!match) return [];
  return match[1]
    .split('\n')
    .map(l => l.replace(/['",]/g, '').trim())
    .filter(Boolean);
}

// Read projects in project-factory
function getFactoryProjects() {
  if (!fs.existsSync(FACTORY_DIR)) return [];
  return fs.readdirSync(FACTORY_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory() && !d.name.includes('template'))
    .map(d => d.name);
}

// Show list of projects
function showList() {
  const readySlugs = getCurrentReadySlugs();
  const factoryProjects = getFactoryProjects();

  console.log('\n======================================================');
  console.log('⚡ SUBMITKIT - READY TO SHIP KITS (' + readySlugs.length + ' total)');
  console.log('======================================================');
  readySlugs.forEach((slug, idx) => {
    console.log(` ${idx + 1}. [LIVE READY] ${slug}`);
  });

  console.log('\n======================================================');
  console.log('🏭 PROJECT FACTORY POOL (Can be activated in 1-click)');
  console.log('======================================================');
  const unactivated = factoryProjects.filter(p => !readySlugs.includes(p));
  if (unactivated.length === 0) {
    console.log('  All factory projects are already activated!');
  } else {
    unactivated.forEach((slug, idx) => {
      console.log(` ${idx + 1}. ${slug}`);
    });
  }
  console.log('======================================================\n');
}

// Generate or copy mock screenshots
function ensureScreenshots(slug) {
  const targetDir = path.join(PUBLIC_PROJECTS_DIR, slug);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const homeJpg = path.join(targetDir, '01-home.jpg');
  const dashJpg = path.join(targetDir, '02-dashboard.jpg');

  if (!fs.existsSync(homeJpg) || !fs.existsSync(dashJpg)) {
    // Copy fallback sample images from fake-news-detector if exists
    const sampleDir = path.join(PUBLIC_PROJECTS_DIR, 'fake-news-detector');
    if (fs.existsSync(path.join(sampleDir, '01-home.jpg'))) {
      if (!fs.existsSync(homeJpg)) {
        fs.copyFileSync(path.join(sampleDir, '01-home.jpg'), homeJpg);
      }
      if (!fs.existsSync(dashJpg)) {
        fs.copyFileSync(path.join(sampleDir, '02-dashboard.jpg'), dashJpg);
      }
      console.log(`📸 Initial screenshots provisioned in public/projects/${slug}/`);
    }
  }
}

// Add or update project in available-projects.ts
function updateAvailableProjects(kit) {
  let content = fs.readFileSync(AVAILABLE_PROJECTS_TS, 'utf-8');

  // 1. Check if slug in AVAILABLE_CORE_SLUGS
  const readySlugs = getCurrentReadySlugs();
  if (!readySlugs.includes(kit.slug)) {
    const slugInsert = `  '${kit.slug}',\n] as const;`;
    content = content.replace(/\] as const;/, slugInsert);
  }

  // 2. Add or update READY_PROJECTS entry
  const readyEntryRegex = new RegExp(`'${kit.slug}':\\s*\\{[\\s\\S]*?\\},`, 'm');
  const readyBlock = `  '${kit.slug}': {
    slug: '${kit.slug}',
    name: '${kit.title.replace(/'/g, "\\'")}',
    category: '${kit.category}',
    oneLiner: '${kit.oneLiner.replace(/'/g, "\\'")}',
    tenthGradeExplainer: '${kit.tenthGradeExplainer.replace(/'/g, "\\'")}',
    badge: '⚡ Instant Download',
    isReady: true,
    tier: '${kit.tier}',
    price: ${kit.price},
  },`;

  if (readyEntryRegex.test(content)) {
    content = content.replace(readyEntryRegex, readyBlock);
  } else {
    // Insert at the beginning of READY_PROJECTS
    content = content.replace(
      /export const READY_PROJECTS: Record<string, AvailableProjectMeta> = \{/,
      `export const READY_PROJECTS: Record<string, AvailableProjectMeta> = {\n${readyBlock}`
    );
  }

  fs.writeFileSync(AVAILABLE_PROJECTS_TS, content, 'utf-8');
  console.log(`✅ Updated ${path.basename(AVAILABLE_PROJECTS_TS)}`);
}

// Add or update project in static-catalog.ts
function updateStaticCatalog(kit) {
  let content = fs.readFileSync(STATIC_CATALOG_TS, 'utf-8');

  const slugRegex = new RegExp(`slug:\\s*'${kit.slug}',`);
  if (!slugRegex.test(content)) {
    const catalogEntry = `  {
    id: 'proj_${kit.slug.replace(/[^a-zA-Z0-9]/g, '_')}',
    slug: '${kit.slug}',
    title: '${kit.title.replace(/'/g, "\\'")}',
    category: '${kit.category}',
    tier: '${kit.tier}',
    price_inr: ${kit.price},
    description: '${kit.oneLiner.replace(/'/g, "\\'")}',
    problem_statement: '${kit.problemStatement.replace(/'/g, "\\'")}',
    architecture_details: '${kit.architecture.replace(/'/g, "\\'")}',
    tech_stack: [${kit.techStack.map(t => `'${t}'`).join(', ')}],
    features: [
      'Interactive User Interface with Real-Time Prediction & Feedback',
      'Production-Ready API & Backend Data Processing Pipeline',
      'IEEE Format Black Book Documentation (.docx) with Architecture Diagrams',
      'Defense Presentation (.pptx) with Project Flow & Speaker Notes',
      'Top 25 Viva Defense Questions with Step-by-Step Explanations',
      '1-Click Local Execution Environment with Sample Datasets',
    ],
    demo_video_id: null,
    demo_screenshots: ['/projects/${kit.slug}/01-home.jpg', '/projects/${kit.slug}/02-dashboard.jpg'],
    live_demo_url: null,
    s3_storage_key: 'kits/${kit.slug}.zip',
    report_template_key: 'reports/${kit.slug}.docx',
    is_active: true,
    created_at: new Date().toISOString(),
  },\n`;

    // Insert into VERIFIED_AVAILABLE_PROJECTS
    content = content.replace(
      /export const VERIFIED_AVAILABLE_PROJECTS: Project\[\] = \[/,
      `export const VERIFIED_AVAILABLE_PROJECTS: Project[] = [\n${catalogEntry}`
    );

    fs.writeFileSync(STATIC_CATALOG_TS, content, 'utf-8');
    console.log(`✅ Added to ${path.basename(STATIC_CATALOG_TS)}`);
  } else {
    console.log(`ℹ️ Project ${kit.slug} already present in static-catalog.ts`);
  }
}

// Main execution
async function main() {
  const flags = parseArgs();

  if (flags.list) {
    showList();
    process.exit(0);
  }

  let slug = flags.slug || flags.activate;
  let title = flags.title;
  let category = flags.category || 'AIML';
  let tier = flags.tier ? flags.tier.toUpperCase() : 'MINI';
  let price = flags.price ? parseInt(flags.price, 10) : (tier === 'MAJOR' ? 499 : 299);
  let oneLiner = flags.desc || '';

  // Interactive mode if no slug provided
  if (!slug) {
    showList();
    const rl = readline.createInterface({ input, output });

    console.log('👉 Enter project details (press ENTER to accept defaults):');
    slug = (await rl.question('Project Slug (e.g. plant-disease-detection): ')).trim();
    if (!slug) {
      console.log('❌ Slug is required.');
      rl.close();
      process.exit(1);
    }

    const defaultTitle = slug
      .split('-')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
    title = (await rl.question(`Project Title [${defaultTitle}]: `)).trim() || defaultTitle;
    category = (await rl.question('Category (AIML/Healthcare/FinTech/Cybersecurity/FullStack/Cloud) [AIML]: ')).trim() || 'AIML';
    tier = ((await rl.question('Tier (MINI/MAJOR) [MINI]: ')).trim() || 'MINI').toUpperCase();
    price = tier === 'MAJOR' ? 499 : 299;
    oneLiner = (await rl.question(`One-liner Description [Production-ready ${title} with real-time analytics]: `)).trim() || `Production-ready ${title} with real-time analytics.`;

    rl.close();
  } else if (!title) {
    title = slug
      .split('-')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  }

  if (!oneLiner) {
    oneLiner = `End-to-end ${title} with production architecture, dataset, and IEEE documentation.`;
  }

  const techStack = flags.tech
    ? flags.tech.split(',').map(t => t.trim())
    : category === 'AIML'
    ? ['Python', 'scikit-learn', 'FastAPI', 'Next.js', 'Tailwind CSS']
    : ['Next.js 14', 'Node.js', 'PostgreSQL', 'Tailwind CSS'];

  const kit = {
    slug,
    title,
    category,
    tier,
    price,
    oneLiner,
    tenthGradeExplainer: `Solves real-world challenges in ${category} by providing an easy-to-use interface and instant results.`,
    problemStatement: `${title} addresses critical operational and academic requirements with modular architecture and high accuracy.`,
    architecture: `Full-stack architecture utilizing modern reactive UI and high-performance backend processing pipelines.`,
    techStack,
  };

  console.log('\n🚀 Activating Project Kit:', kit.slug);
  console.log('------------------------------------------------------');
  console.log(` Title:    ${kit.title}`);
  console.log(` Category: ${kit.category}`);
  console.log(` Tier:     ${kit.tier} (₹${kit.price})`);
  console.log('------------------------------------------------------\n');

  ensureScreenshots(kit.slug);
  updateAvailableProjects(kit);
  updateStaticCatalog(kit);

  console.log('\n🎉 SUCCESS! Project Kit is now 100% LIVE and Ready to Ship:');
  console.log(` - Catalog Page:      http://localhost:3000/projects/${kit.slug}`);
  console.log(` - Interactive Demo:  http://localhost:3000/demo/${kit.slug}`);
  console.log(` - Home Page Grid:    http://localhost:3000/ (Under Available Now)`);
  console.log('\nRun "git status" to review changes.\n');
}

main().catch(err => {
  console.error('❌ Error executing add-kit:', err);
  process.exit(1);
});
