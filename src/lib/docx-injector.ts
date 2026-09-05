import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { s3 } from './s3';
import { env } from './env';

interface PersonalizationData {
  studentName: string;
  rollNumber: string;
  guideName: string;
  collegeName: string;
  projectTitle: string;
  submissionDate: string;
}

export async function generatePersonalizedDocx(
  templateKey: string,
  data: PersonalizationData,
  outputKey: string
): Promise<string> {
  // 1. Download template from S3
  const getCommand = new GetObjectCommand({
    Bucket: env.R2_BUCKET_NAME,
    Key: templateKey,
  });
  
  const response = await s3.send(getCommand);
  if (!response.Body) {
    throw new Error('Template file not found in S3');
  }
  
  const arrayBuffer = await response.Body.transformToByteArray();
  
  // 2. Load into pizzip and docxtemplater
  const zip = new PizZip(arrayBuffer);
  
  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });
  
  // 3. Inject data
  // Expected placeholders in docx: {STUDENT_NAME}, {ROLL_NUMBER}, etc.
  doc.render({
    STUDENT_NAME: data.studentName,
    ROLL_NUMBER: data.rollNumber || 'TBD',
    GUIDE_NAME: data.guideName || 'TBD',
    COLLEGE_NAME: data.collegeName || 'TBD',
    PROJECT_TITLE: data.projectTitle,
    SUBMISSION_DATE: data.submissionDate
  });
  
  // 4. Generate the new docx buffer
  const buf = doc.getZip().generate({
    type: 'nodebuffer',
    compression: 'DEFLATE',
  });
  
  // 5. Upload back to S3 in a temporary/personal folder
  const putCommand = new PutObjectCommand({
    Bucket: env.R2_BUCKET_NAME,
    Key: outputKey,
    Body: buf,
    ContentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  });
  
  await s3.send(putCommand);
  
  return outputKey;
}
