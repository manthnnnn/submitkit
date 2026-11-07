import puppeteer from 'puppeteer';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

async function cleanDOM(page) {
  await page.evaluate(() => {
    // Aggressively remove any floating WhatsApp widget, Next.js build watcher, or dev toast
    document.querySelectorAll(
      'nextjs-portal, [data-nextjs-toast], [data-nextjs-dev-overlay], #__next-build-watcher, [class*="whatsapp"], #whatsapp-widget, a[href*="wa.me"], div[style*="calc(5.5rem"]'
    ).forEach(el => el.remove());
  });
}

async function capture() {
  console.log('🚀 Launching clean screenshot capturer...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

  // ─────────────────────────────────────────────────────────────
  // 1. PLANT DISEASE DETECTION (CropGuard AI)
  // ─────────────────────────────────────────────────────────────
  console.log('📸 Capturing plant-disease-detection...');
  const cropDir = path.join(ROOT, 'public', 'projects', 'plant-disease-detection');
  const cropAliasDir = path.join(ROOT, 'public', 'projects', 'crop-disease-detector');
  fs.mkdirSync(cropDir, { recursive: true });
  fs.mkdirSync(cropAliasDir, { recursive: true });

  await page.goto('http://localhost:3000/demo/plant-disease-detection', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));
  await cleanDOM(page);

  const cropApp = await page.$('#cropguard-app');
  if (cropApp) {
    // 01-home.jpg
    const homePath = path.join(cropDir, '01-home.jpg');
    await cropApp.screenshot({ path: homePath, type: 'jpeg', quality: 92 });
    console.log('  ✅ Saved plant-disease-detection/01-home.jpg');
    fs.copyFileSync(homePath, path.join(cropAliasDir, '01-home.jpg'));
    fs.copyFileSync(homePath, path.join(ROOT, 'public', 'projects', 'plant-disease-detection.jpg'));

    // Switch to Potato Late Blight and scroll to command center for 02-dashboard.jpg
    const buttons = await page.$$('button');
    for (const b of buttons) {
      const text = await page.evaluate(el => el.textContent, b);
      if (text && text.includes('Potato — Late Blight')) {
        await b.click();
        break;
      }
    }
    await new Promise(r => setTimeout(r, 800));
    await cleanDOM(page);

    const dashPath = path.join(cropDir, '02-dashboard.jpg');
    await cropApp.screenshot({ path: dashPath, type: 'jpeg', quality: 92 });
    console.log('  ✅ Saved plant-disease-detection/02-dashboard.jpg');
    fs.copyFileSync(dashPath, path.join(cropAliasDir, '02-dashboard.jpg'));
  }

  // ─────────────────────────────────────────────────────────────
  // 2. FAKE NEWS DETECTOR (TruthLens AI) - CLEAN WITHOUT WHATSAPP
  // ─────────────────────────────────────────────────────────────
  console.log('📸 Capturing clean fake-news-detector...');
  const fakeDir = path.join(ROOT, 'public', 'projects', 'fake-news-detector');
  fs.mkdirSync(fakeDir, { recursive: true });

  await page.goto('http://localhost:3000/demo/fake-news-detector', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));
  await cleanDOM(page);

  const truthApp = await page.$('#truthlens-app');
  if (truthApp) {
    const fakeHomePath = path.join(fakeDir, '01-home.jpg');
    await truthApp.screenshot({ path: fakeHomePath, type: 'jpeg', quality: 92 });
    console.log('  ✅ Saved fake-news-detector/01-home.jpg');
    fs.copyFileSync(fakeHomePath, path.join(ROOT, 'public', 'projects', 'fake-news-detector.jpg'));

    // Click on a benchmark article to change dashboard output for 02-dashboard.jpg
    const buttons = await page.$$('button');
    for (const b of buttons) {
      const text = await page.evaluate(el => el.textContent, b);
      if (text && text.includes('Space Exploration')) {
        await b.click();
        break;
      }
    }
    await new Promise(r => setTimeout(r, 800));
    await cleanDOM(page);

    const fakeDashPath = path.join(fakeDir, '02-dashboard.jpg');
    await truthApp.screenshot({ path: fakeDashPath, type: 'jpeg', quality: 92 });
    console.log('  ✅ Saved fake-news-detector/02-dashboard.jpg');
  }

  await browser.close();
  console.log('🎉 Done capturing all clean screenshots!');
}

capture().catch(err => {
  console.error('Error during capture:', err);
  process.exit(1);
});

