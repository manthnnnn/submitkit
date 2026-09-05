const fs = require('fs');
const path = require('path');
const { S3Client, PutObjectCommand, HeadBucketCommand, CreateBucketCommand } = require('@aws-sdk/client-s3');
require('dotenv').config({ path: '.env.local' });

const REGION = 'auto'; // R2 uses 'auto'

// --- CONFIGURATION ---
const PROJECT_NAME = process.argv[2] || 'restaurant-qr-ordering';
const BUCKET_NAME = process.env.R2_BUCKET_NAME || 'projecthub'; 
const LOCAL_FILE_PATH = path.join(__dirname, `../${PROJECT_NAME}.zip`);
const R2_DESTINATION_KEY = `bundles/mini/${PROJECT_NAME}.zip`; 

// Initialize S3 Client for Cloudflare R2
const s3 = new S3Client({
  region: REGION,
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || ''
  }
});

async function main() {
  const bucketName = BUCKET_NAME;
  const zipPath = LOCAL_FILE_PATH;

  if (!fs.existsSync(zipPath)) {
    console.error('Zip file not found at:', zipPath);
    process.exit(1);
  }

  const fileStream = fs.createReadStream(zipPath);
  const fileStat = fs.statSync(zipPath);
  const key = R2_DESTINATION_KEY;

  console.log(`Checking bucket "${bucketName}" and uploading "${key}" (${(fileStat.size / (1024 * 1024)).toFixed(2)} MB)...`);

  try {
    const { ListBucketsCommand } = require('@aws-sdk/client-s3');
    const buckets = await s3.send(new ListBucketsCommand({}));
    console.log('Available R2 Buckets:', buckets.Buckets?.map(b => b.Name));
  } catch (e) {
    console.log('ListBuckets error:', e.message);
  }

  try {
    const uploadParams = {
      Bucket: bucketName,
      Key: key,
      Body: fileStream,
      ContentType: 'application/zip',
      ContentLength: fileStat.size
    };

    await s3.send(new PutObjectCommand(uploadParams));
    console.log(`✅ SUCCESS! Uploaded "${key}" to Cloudflare R2 bucket "${bucketName}".`);
  } catch (err) {
    console.error('❌ Upload error:', err.message);
  }
}

main();
