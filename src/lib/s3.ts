import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${(process.env.CLOUDFLARE_ACCOUNT_ID || '').trim()}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: (process.env.R2_ACCESS_KEY_ID || '').trim(),
    secretAccessKey: (process.env.R2_SECRET_ACCESS_KEY || '').trim()
  }
});

export async function generateDownloadUrl(key: string, filename: string): Promise<string> {
  // Graceful fallback for local testing if R2 is not configured yet
  if (!process.env.R2_BUCKET_NAME || !process.env.CLOUDFLARE_ACCOUNT_ID) {
    console.warn('⚠️ R2_BUCKET_NAME or CLOUDFLARE_ACCOUNT_ID is not set. Returning dummy download URL for testing.');
    return `https://example.com/dummy-download?file=${encodeURIComponent(filename)}`;
  }

  // Sanitize filename to prevent HTTP Header Injection or corrupted downloads
  const sanitizedFilename = filename.replace(/[^a-zA-Z0-9.-]/g, '_');

  const command = new GetObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: key,
    ResponseContentDisposition: `attachment; filename="${sanitizedFilename}"`
  });

  // URL expires in 10 minutes (600 seconds)
  return getSignedUrl(s3, command, { expiresIn: 600 });
}
