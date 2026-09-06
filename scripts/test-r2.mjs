import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3 = new S3Client({
  region: 'auto',
  endpoint: 'https://4eeab2e0fb37c3e3725e902aebcfc32f.r2.cloudflarestorage.com',
  credentials: {
    accessKeyId: '57578c95c9c6d7f616a193ccf40b7550',
    secretAccessKey: '3804b32bd8dbcaac90b2d5ae24c112ed5039b095b6eeaa8a85b226714a7bef13'
  }
});

const cmd = new GetObjectCommand({
  Bucket: 'projecthub',
  Key: 'bundles/mini/blood-bank-management.zip',
  ResponseContentDisposition: 'attachment; filename="blood-bank-management-bundle.zip"'
});

try {
  const url = await getSignedUrl(s3, cmd, { expiresIn: 60 });
  console.log('\n✅ R2 is working! Presigned URL generated successfully.');
  console.log('URL preview:', url.substring(0, 100) + '...\n');
} catch (e) {
  console.error('\n❌ FAILED:', e.message);
}
