const fs = require('fs');
const path = require('path');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const BUCKET_NAME = process.env.R2_BUCKET_NAME || 'projecthub';

const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || ''
  }
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Clean simple keys — no subdirectory confusion
const UPLOAD_MAP = [
  { local: 'aerofuel-predictor.zip',       key: 'aerofuel-predictor.zip',       slug: 'aerofuel-predictor'       },
  { local: 'blood-bank-management.zip',    key: 'blood-bank-management.zip',    slug: 'blood-bank-management'    },
  { local: 'credit-card-fraud.zip',        key: 'credit-card-fraud.zip',        slug: 'credit-card-fraud'        },
  { local: 'healthcare-ehr-portal.zip',    key: 'healthcare-ehr-portal.zip',    slug: 'healthcare-ehr-portal'    },
  { local: 'online-code-compiler.zip',     key: 'online-code-compiler.zip',     slug: 'online-code-compiler'     },
  { local: 'phishing-detector-ai.zip',     key: 'phishing-detector-ai.zip',     slug: 'phishing-detector-ai'     },
  { local: 'restaurant-qr-ordering.zip',   key: 'restaurant-qr-ordering.zip',   slug: 'restaurant-qr-ordering'   },
  { local: 'resume-parsing-engine.zip',    key: 'resume-parsing-engine.zip',    slug: 'resume-parsing-engine'    },
  { local: 'smart-expense-tracker.zip',    key: 'smart-expense-tracker.zip',    slug: 'smart-expense-tracker'    },
];

async function uploadAll() {
  console.log(`\n🚀 Uploading to R2 bucket "${BUCKET_NAME}" with new credentials...\n`);

  const uploaded = [];

  for (const item of UPLOAD_MAP) {
    const localPath = path.join(__dirname, '..', item.local);

    if (!fs.existsSync(localPath)) {
      console.warn(`⚠️  Not found locally: ${item.local} — skipping`);
      continue;
    }

    const stat      = fs.statSync(localPath);
    const sizeMb    = (stat.size / (1024 * 1024)).toFixed(2);
    const fileStream = fs.createReadStream(localPath);

    try {
      await s3.send(new PutObjectCommand({
        Bucket:        BUCKET_NAME,
        Key:           item.key,
        Body:          fileStream,
        ContentType:   'application/zip',
        ContentLength: stat.size,
      }));
      console.log(`✅ ${item.local} (${sizeMb} MB)  →  R2: "${item.key}"`);
      uploaded.push(item);
    } catch (err) {
      console.error(`❌ Failed ${item.local}: ${err.message}`);
    }
  }

  // ── Update Supabase s3_storage_key for every successfully uploaded project ──
  if (uploaded.length > 0) {
    console.log('\n📦 Updating s3_storage_key in Supabase...\n');

    for (const item of uploaded) {
      const { error } = await supabase
        .from('projects')
        .update({ s3_storage_key: item.key })
        .eq('slug', item.slug);

      if (error) {
        console.error(`❌ DB update failed for ${item.slug}: ${error.message}`);
      } else {
        console.log(`✅ DB updated: ${item.slug}  →  s3_storage_key = "${item.key}"`);
      }
    }
  }

  console.log('\n🎉 All done! Downloads should work now.\n');
}

uploadAll();
