const fs = require('fs');
const path = require('path');
const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } = require('docx');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

// Setup S3 and Supabase
const BUCKET_NAME = process.env.R2_BUCKET_NAME || 'projecthub';
const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || ''
  }
});

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function createGenericTemplate() {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            text: "Project Report",
            heading: HeadingLevel.TITLE,
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 }
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 },
            children: [
              new TextRun({ text: "Project Title: ", bold: true, size: 28 }),
              new TextRun({ text: "{PROJECT_TITLE}", size: 28 })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
            children: [
              new TextRun({ text: "Submitted by: ", bold: true, size: 24 }),
              new TextRun({ text: "{STUDENT_NAME}", size: 24 })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
            children: [
              new TextRun({ text: "Roll Number: ", bold: true, size: 24 }),
              new TextRun({ text: "{ROLL_NUMBER}", size: 24 })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
            children: [
              new TextRun({ text: "College: ", bold: true, size: 24 }),
              new TextRun({ text: "{COLLEGE_NAME}", size: 24 })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 600 },
            children: [
              new TextRun({ text: "Guide: ", bold: true, size: 24 }),
              new TextRun({ text: "{GUIDE_NAME}", size: 24 })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
            children: [
              new TextRun({ text: "Date of Submission: ", bold: true, size: 24 }),
              new TextRun({ text: "{SUBMISSION_DATE}", size: 24 })
            ]
          }),
          new Paragraph({
            text: "This is a computer generated personalized project report cover and structural template.",
            alignment: AlignmentType.CENTER,
          }),
        ],
      },
    ],
  });

  return await Packer.toBuffer(doc);
}

async function run() {
  console.log('📝 Generating generic Docx template buffer...');
  const buffer = await createGenericTemplate();
  
  console.log('🔍 Fetching projects from Supabase...');
  const { data: projects, error } = await supabase.from('projects').select('slug, report_template_key');
  
  if (error) {
    console.error('Database error:', error);
    return;
  }

  for (const project of projects) {
    if (!project.report_template_key) continue;
    
    console.log(`📤 Uploading template for ${project.slug} to ${project.report_template_key}...`);
    try {
      await s3.send(new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: project.report_template_key,
        Body: buffer,
        ContentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      }));
      console.log(`✅ Success for ${project.slug}`);
    } catch (err) {
      console.error(`❌ Failed for ${project.slug}:`, err.message);
    }
  }
  
  console.log('🎉 All templates successfully uploaded to Cloudflare R2!');
}

run();
