import puppeteer from 'puppeteer';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'public', 'projects', 'plant-disease-detection');
const ALIAS_DIR = path.join(ROOT, 'public', 'projects', 'crop-disease-detector');

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.mkdirSync(ALIAS_DIR, { recursive: true });

async function capture() {
  console.log('Launching browser to capture CropGuard screenshots...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

  // 1. Capture Overview Screen
  console.log('Navigating to http://localhost:3000/demo/plant-disease-detection ...');
  await page.goto('http://localhost:3000/demo/plant-disease-detection', {
    waitUntil: 'networkidle2',
    timeout: 30000
  });

  await new Promise(r => setTimeout(r, 2000));

  // Screenshot #cropguard-app directly so no store banners are included!
  const appElement = await page.$('#cropguard-app');
  if (appElement) {
    const homePath = path.join(OUT_DIR, '01-home.jpg');
    await appElement.screenshot({ path: homePath, type: 'jpeg', quality: 92 });
    console.log('✅ Captured 01-home.jpg');
    fs.copyFileSync(homePath, path.join(ALIAS_DIR, '01-home.jpg'));
    fs.copyFileSync(homePath, path.join(ROOT, 'public', 'projects', 'plant-disease-detection.jpg'));

    // Click sample 2 (Potato Late Blight) to capture distinct dashboard screen
    const buttons = await page.$$('button');
    for (const b of buttons) {
      const text = await page.evaluate(el => el.textContent, b);
      if (text && text.includes('Potato — Late Blight')) {
        await b.click();
        break;
      }
    }

    await new Promise(r => setTimeout(r, 1200));

    const dashPath = path.join(OUT_DIR, '02-dashboard.jpg');
    await appElement.screenshot({ path: dashPath, type: 'jpeg', quality: 92 });
    console.log('✅ Captured 02-dashboard.jpg');
    fs.copyFileSync(dashPath, path.join(ALIAS_DIR, '02-dashboard.jpg'));
  } else {
    console.error('❌ Could not find #cropguard-app element');
  }

  await browser.close();
  console.log('Done!');
}

capture().catch(err => {
  console.error('Capture failed:', err);
  process.exit(1);
});
