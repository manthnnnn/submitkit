import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

async function generatePngAndIco() {
  const svgContent = fs.readFileSync(path.join(process.cwd(), 'src', 'app', 'icon.svg'), 'utf8');

  // Launch puppeteer
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Create an HTML wrapper with transparent background
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body {
            margin: 0;
            padding: 0;
            background: transparent;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100vw;
            height: 100vh;
            overflow: hidden;
          }
          svg {
            width: 100%;
            height: 100%;
          }
        </style>
      </head>
      <body>
        ${svgContent}
      </body>
    </html>
  `;

  await page.setContent(html, { waitUntil: 'networkidle0' });

  // 1. Generate 180x180 Apple Touch Icon
  await page.setViewport({ width: 180, height: 180, deviceScaleFactor: 2 });
  const appleIconBuffer = await page.screenshot({ omitBackground: true, type: 'png' });
  fs.writeFileSync(path.join(process.cwd(), 'src', 'app', 'apple-icon.png'), appleIconBuffer);
  fs.writeFileSync(path.join(process.cwd(), 'public', 'apple-icon.png'), appleIconBuffer);
  console.log('Generated apple-icon.png');

  // 2. Generate 48x48 icon.png
  await page.setViewport({ width: 48, height: 48, deviceScaleFactor: 2 });
  const icon48Buffer = await page.screenshot({ omitBackground: true, type: 'png' });
  fs.writeFileSync(path.join(process.cwd(), 'src', 'app', 'icon.png'), icon48Buffer);
  fs.writeFileSync(path.join(process.cwd(), 'public', 'icon.png'), icon48Buffer);
  console.log('Generated icon.png');

  // 3. For favicon.ico, write 32x32 PNG (modern browsers and Vercel accept PNG as favicon.ico directly or we write a basic ICO container)
  await page.setViewport({ width: 32, height: 32, deviceScaleFactor: 1 });
  const faviconBuffer = await page.screenshot({ omitBackground: true, type: 'png' });
  
  // Create valid ICO file wrapping PNG data:
  // ICO header: 0, 0, 1 (ICO type), 1 (1 image)
  // Directory entry: width (32), height (32), colors (0), reserved (0), planes (1), bpp (32), size, offset (22)
  const icoHeader = Buffer.alloc(6);
  icoHeader.writeUInt16LE(0, 0); // Reserved
  icoHeader.writeUInt16LE(1, 2); // 1 = ICO
  icoHeader.writeUInt16LE(1, 4); // Count of images

  const icoEntry = Buffer.alloc(16);
  icoEntry.writeUInt8(32, 0); // Width 32
  icoEntry.writeUInt8(32, 1); // Height 32
  icoEntry.writeUInt8(0, 2);  // Palette count
  icoEntry.writeUInt8(0, 3);  // Reserved
  icoEntry.writeUInt16LE(1, 4); // Color planes
  icoEntry.writeUInt16LE(32, 6); // Bits per pixel
  icoEntry.writeUInt32LE(faviconBuffer.length, 8); // Size of image data
  icoEntry.writeUInt32LE(22, 12); // Offset to image data (6 + 16 = 22)

  const icoFileBuffer = Buffer.concat([icoHeader, icoEntry, faviconBuffer]);

  fs.writeFileSync(path.join(process.cwd(), 'src', 'app', 'favicon.ico'), icoFileBuffer);
  fs.writeFileSync(path.join(process.cwd(), 'public', 'favicon.ico'), icoFileBuffer);
  console.log('Generated valid multi-format favicon.ico in src/app and public!');

  await browser.close();
}

generatePngAndIco().catch(err => {
  console.error('Error generating icons:', err);
  process.exit(1);
});
