const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Target max size: 9.5 MB to ensure 1000 projects stay safely under 10 GB limit
const MAX_ZIP_SIZE_MB = 9.5; 
const MAX_ZIP_SIZE_BYTES = MAX_ZIP_SIZE_MB * 1024 * 1024;

const TARGET_FOLDER = process.argv[2];

if (!TARGET_FOLDER) {
  console.error("❌ Usage: node pack_project.js <project-folder-name>");
  console.error("Example: node pack_project.js blood-bank-management");
  process.exit(1);
}

const targetPath = path.resolve(__dirname, '..', TARGET_FOLDER);
const zipPath = path.resolve(__dirname, '..', `${TARGET_FOLDER}.zip`);

if (!fs.existsSync(targetPath)) {
  console.error(`❌ Folder not found: ${targetPath}`);
  process.exit(1);
}

console.log(`📦 Packaging project: ${TARGET_FOLDER}...`);

// Use native tar on Windows to compress and exclude heavy directories
try {
  const cmd = `tar -a -c -f "${zipPath}" --exclude="node_modules" --exclude=".next" --exclude=".git" --exclude="dist" --exclude="build" --exclude=".vscode" "${TARGET_FOLDER}"`;
  execSync(cmd, { cwd: path.resolve(__dirname, '..') });
} catch (error) {
  console.error("❌ Compression failed:", error.message);
  process.exit(1);
}

// Verify bundle size
const fileStat = fs.statSync(zipPath);
const sizeMB = (fileStat.size / (1024 * 1024)).toFixed(2);

console.log(`📊 Bundle size: ${sizeMB} MB`);

if (fileStat.size > MAX_ZIP_SIZE_BYTES) {
  console.error(`\n🚨 ALERT: Bundle size (${sizeMB} MB) exceeds the strict ${MAX_ZIP_SIZE_MB} MB limit!`);
  console.error(`🚨 If you upload 1,000 projects at this size, it will exceed the 10 GB Cloudflare R2 Free Tier!`);
  console.error(`🚨 Action required: Remove heavy media, large databases, or compress images inside the project before uploading.\n`);
  
  // Optionally, we could delete the oversized zip to enforce the limit
  // fs.unlinkSync(zipPath);
  
  process.exit(1);
}

console.log(`✅ SUCCESS! Bundle is highly optimized and safely under the ${MAX_ZIP_SIZE_MB} MB limit.`);
console.log(`✅ Ready to upload: ${zipPath}`);
