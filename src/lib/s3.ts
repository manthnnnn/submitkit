import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { env } from '@/lib/env';

export const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${env.R2_ACCOUNT_ID || ''}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: env.R2_ACCESS_KEY_ID || '',
    secretAccessKey: env.R2_SECRET_ACCESS_KEY || ''
  }
});

export async function generateDownloadUrl(key: string, filename: string): Promise<string> {
  // Fail loudly in production if R2 is not configured — never silently redirect to example.com
  if (!env.R2_BUCKET_NAME || !env.R2_ACCOUNT_ID) {
    throw new Error(
      'R2 storage is not configured on this server. Please set R2_BUCKET_NAME, R2_ACCOUNT_ID, R2_ACCESS_KEY_ID and R2_SECRET_ACCESS_KEY in your environment variables.'
    );
  }

  // Sanitize filename to prevent HTTP Header Injection or corrupted downloads
  const sanitizedFilename = filename.replace(/[^a-zA-Z0-9.-]/g, '_');

  const command = new GetObjectCommand({
    Bucket: env.R2_BUCKET_NAME,
    Key: key,
    ResponseContentDisposition: `attachment; filename="${sanitizedFilename}"`
  });

  // URL expires in 10 minutes (600 seconds)
  return getSignedUrl(s3, command, { expiresIn: 600 });
}
