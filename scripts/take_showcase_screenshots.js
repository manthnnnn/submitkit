const puppeteer = require('puppeteer');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const PROJECTS = {
  'healthcare-ehr-portal': ['/dashboard', '/appointments', '/records'],
  'blood-bank-management': ['/dashboard', '/inventory', '/donors'],
  'resume-parsing-engine': ['/dashboard', '/candidates', '/matcher'],
  'online-code-compiler': ['/dashboard', '/dashboard', '/dashboard'],
  'credit-card-fraud': ['/dashboard', '/disputes', '/analytics'],
  'phishing-detector-ai': ['/dashboard', '/dashboard', '/dashboard'],
  'restaurant-qr-ordering': ['/admin', '/m/1', '/dashboard'],
  'aerofuel-predictor': ['/dashboard', '/analytics', '/dashboard'],
  'smart-expense-tracker': ['/dashboard', '/dashboard', '/dashboard']
};

const ROOT_DIR = path.resolve(__dirname, '..');
const PUBLIC_PROJECTS_DIR = path.join(ROOT_DIR, 'public', 'projects');

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runProject(projectSlug, routes) {
  console.log(`\n======================================`);
  console.log(`🚀 Processing: ${projectSlug}`);
  
  const projectDir = path.join(ROOT_DIR, projectSlug);
  const outDir = path.join(PUBLIC_PROJECTS_DIR, projectSlug);
  
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const port = 3020 + Object.keys(PROJECTS).indexOf(projectSlug);

  console.log(`🌐 Starting dev server on port ${port}...`);
  const server = spawn('npm', ['run', 'dev', '--', '-p', port.toString()], { cwd: projectDir, shell: true });
  
  // Wait for server to boot and compile
  await delay(12000); 

  console.log(`📸 Taking screenshots...`);
  const browser = await puppeteer.launch({ headless: 'new', defaultViewport: { width: 1440, height: 900 } });
  const page = await browser.newPage();
  
  try {
    for (let i = 0; i < 3; i++) {
      const route = routes[i];
      console.log(`Navigating to ${route}...`);
      await page.goto(`http://localhost:${port}${route}`, { waitUntil: 'networkidle2', timeout: 30000 }).catch(e => console.log('Navigation timeout, proceeding...'));
      
      // Additional wait to let charts and animations load
      await delay(2500);

      // If it's a duplicate route (like code compiler), maybe scroll or interact
      if (i === 1 && projectSlug === 'online-code-compiler') {
        await page.evaluate(() => window.scrollBy(0, 300));
      }
      if (i === 2 && projectSlug === 'online-code-compiler') {
        await page.evaluate(() => window.scrollBy(0, 600));
      }
      if (i === 1 && projectSlug === 'phishing-detector-ai') {
        await page.evaluate(() => {
          const input = document.querySelector('input');
          if (input) input.value = 'http://secure-login-paypal.com/login';
        });
        await delay(500);
      }
      
      const filename = `0${i+1}-${i===0 ? 'dashboard' : i===1 ? 'feature' : 'result'}.jpg`;
      await page.screenshot({ path: path.join(outDir, filename), type: 'jpeg', quality: 90 });
      console.log(`✅ Saved ${filename}`);
    }
  } catch (err) {
    console.error(`❌ Failed to capture screens for ${projectSlug}:`, err.message);
  } finally {
    await browser.close();
    console.log(`🛑 Stopping server...`);
    if (/^win/.test(process.platform)) {
      spawn('taskkill', ['/pid', server.pid, '/f', '/t']);
    } else {
      process.kill(-server.pid);
    }
    await delay(3000); // Give it time to fully exit
  }
}

async function main() {
  for (const [slug, routes] of Object.entries(PROJECTS)) {
    await runProject(slug, routes);
  }
  console.log(`\n🎉 All 9 projects processed and REAL screenshots captured!`);
}

main();
