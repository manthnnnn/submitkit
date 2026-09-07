const { S3Client, DeleteObjectCommand } = require('@aws-sdk/client-s3');
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

const OLD_KEYS = [
  'bundles/mini/resume-parser.zip',
  'bundles/major/healthcare-ehr.zip',
  'bundles/mini/aerofuel.zip',
  'bundles/mini/expense-tracker.zip'
];

async function deleteOld() {
  console.log(`🗑️ Starting Cloudflare R2 cleanup in "${BUCKET_NAME}"...\n`);

  for (const key of OLD_KEYS) {
    try {
      await s3.send(new DeleteObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key
      }));
      console.log(`✅ Deleted old bundle: "${key}"`);
    } catch (err) {
      console.error(`❌ Failed to delete "${key}":`, err.message);
    }
  }

  console.log('\n🎉 Cleanup complete!');
}

deleteOld();
