import fs from 'fs';
import path from 'path';
import { getTopicById } from '../src/lib/blueprint-engine';
import { generateBlueprintDocx } from '../src/lib/blueprint-pdf';

async function main() {
  const topicId = 'face-recognition-attendance';
  console.log('Fetching topic:', topicId);
  const blueprint = getTopicById(topicId);

  if (!blueprint) {
    console.error('Topic not found!');
    process.exit(1);
  }

  console.log('Found blueprint:', blueprint.title);
  console.log('Category:', blueprint.category);
  console.log('Build steps count:', blueprint.buildSteps?.length);
  console.log('Viva Q&A count:', blueprint.vivaQuestions?.length);

  const studentEmail = 'rahul.sharma@vtu.ac.in';
  console.log('Generating official SubmitKit ₹19 Blueprint DOCX...');
  const buffer = await generateBlueprintDocx(blueprint, studentEmail);

  const outDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const outPathPublic = path.join(outDir, 'demo-blueprint-face-recognition.docx');
  const outPathRoot = path.join(process.cwd(), 'demo-blueprint-face-recognition.docx');
  fs.writeFileSync(outPathPublic, buffer);
  fs.writeFileSync(outPathRoot, buffer);

  console.log('Saved to:', outPathPublic);
  console.log('Saved to:', outPathRoot);
  console.log('File size:', buffer.length, 'bytes');
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
