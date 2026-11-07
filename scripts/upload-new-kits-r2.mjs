import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

// Read .env.local
const envContent = fs.readFileSync(path.join(ROOT, '.env.local'), 'utf-8');
const env = {};
envContent.split('\n').forEach(line => {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) return;
  const idx = trimmed.indexOf('=');
  if (idx !== -1) {
    const k = trimmed.substring(0, idx).trim();
    let v = trimmed.substring(idx + 1).trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    env[k] = v;
  }
});

const BUCKET = env.R2_BUCKET_NAME || 'projecthub';

const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: env.R2_ACCESS_KEY_ID || '',
    secretAccessKey: env.R2_SECRET_ACCESS_KEY || '',
  },
});

const UPLOADS = [
  // Plant Disease Detection (and aliases)
  { local: 'plant-disease-detection.zip', key: 'plant-disease-detection.zip' },
  { local: 'plant-disease-detection.zip', key: 'kits/plant-disease-detection.zip' },
  { local: 'plant-disease-detection.zip', key: 'crop-disease-detector.zip' },
  { local: 'plant-disease-detection.zip', key: 'kits/crop-disease-detector.zip' },
  // Fake News Detector
  { local: 'fake-news-detector.zip', key: 'fake-news-detector.zip' },
  { local: 'fake-news-detector.zip', key: 'kits/fake-news-detector.zip' },
];

async function main() {
  console.log(`🚀 Uploading new project bundles to Cloudflare R2 bucket: "${BUCKET}"...\n`);

  for (const item of UPLOADS) {
    const filePath = path.join(ROOT, item.local);
    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️ File not found locally: ${item.local} — skipping`);
      continue;
    }

    const fileBuffer = fs.readFileSync(filePath);
    const sizeKb = (fileBuffer.length / 1024).toFixed(1);

    console.log(`Uploading ${item.local} -> "${item.key}" (${sizeKb} KB)...`);
    await s3.send(new PutObjectCommand({
      Bucket: BUCKET,
      Key: item.key,
      Body: fileBuffer,
      ContentType: 'application/zip',
    }));
    console.log(`  ✅ Successfully uploaded to R2: ${item.key}`);
  }

  console.log('\n🎉 All bundles compressed and pushed to Cloudflare R2 successfully!');
}

main().catch(err => {
  console.error('❌ Upload failed:', err);
  process.exit(1);
});
