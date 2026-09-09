import puppeteer from 'puppeteer';
import path from 'path';

async function capture() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });
  try {
    await page.goto('https://submitkit.in', { waitUntil: 'networkidle2', timeout: 25000 });
    const screenshotPath = path.join(
      'C:\\Users\\ASUS\\.gemini\\antigravity-ide\\brain\\60c8289d-61fd-4627-a3f2-ad8056aa7d4f',
      'new_navbar_logo.png'
    );
    await page.screenshot({ path: screenshotPath, clip: { x: 0, y: 0, width: 1280, height: 200 } });
    console.log('Saved navbar screenshot to:', screenshotPath);
  } catch (err) {
    console.error('Screenshot error:', err.message);
  } finally {
    await browser.close();
  }
}

capture();
