const fs = require('fs');
const path = require('path');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
require('dotenv').config({ path: '.env.local' });

const BUCKET_NAME = process.env.R2_BUCKET_NAME || 'projecthub';

const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || ''
  }
});

const UPLOAD_MAP = [
  { local: 'restaurant-qr-ordering.zip', key: 'bundles/mini/restaurant-qr-ordering.zip' },
  { local: 'blood-bank-management.zip', key: 'bundles/mini/blood-bank-management.zip' },
  { local: 'credit-card-fraud.zip', key: 'bundles/mini/credit-card-fraud.zip' },
  { local: 'phishing-detector-ai.zip', key: 'bundles/mini/phishing-detector-ai.zip' },
  { local: 'resume-parsing-engine.zip', key: 'bundles/mini/resume-parsing-engine.zip' },
  { local: 'online-code-compiler.zip', key: 'bundles/major/online-code-compiler.zip' },
  { local: 'healthcare-ehr-portal.zip', key: 'bundles/major/healthcare-ehr-portal.zip' },
  { local: 'aerofuel-predictor.zip', key: 'bundles/mini/aerofuel-predictor.zip' },
  { local: 'smart-expense-tracker.zip', key: 'bundles/mini/smart-expense-tracker.zip' }
];

async function uploadAll() {
  console.log(`🚀 Starting Cloudflare R2 bundle sync to "${BUCKET_NAME}"...\n`);

  for (const item of UPLOAD_MAP) {
    const localPath = path.join(__dirname, '..', item.local);
    if (!fs.existsSync(localPath)) {
      console.warn(`⚠️ Local zip not found: ${item.local} (skipping)`);
      continue;
    }

    const fileStream = fs.createReadStream(localPath);
    const stat = fs.statSync(localPath);
    const sizeMb = (stat.size / (1024 * 1024)).toFixed(2);

    try {
      await s3.send(new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: item.key,
        Body: fileStream,
        ContentType: 'application/zip',
        ContentLength: stat.size
      }));
      console.log(`✅ Uploaded ${item.local} (${sizeMb} MB) ➔ R2: "${item.key}"`);
    } catch (err) {
      console.error(`❌ Failed ${item.local}:`, err.message);
    }
  }

  console.log('\n🎉 Cloudflare R2 bundle sync complete!');
}

uploadAll();
