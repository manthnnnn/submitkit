import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';
import { getTopicById, generateAntigravityMasterPrompt } from '../src/lib/blueprint-engine';

async function main() {
  const topicId = 'face-recognition-attendance';
  const blueprint = getTopicById(topicId);

  if (!blueprint) {
    console.error('Topic not found!');
    process.exit(1);
  }

  const masterPrompt = generateAntigravityMasterPrompt(blueprint);
  const studentEmail = 'rahul.sharma@vtu.ac.in';
  const docId = `SK-BP-2026-${Math.floor(Math.random() * 90000) + 10000}`;
  const today = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>SubmitKit Project Blueprint: ${blueprint.title}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap');

    @page {
      size: A4;
      margin: 18mm 16mm 18mm 16mm;
      @bottom-center {
        content: "SubmitKit Intelligence  •  submitkit.in  •  Doc ID: ${docId}  •  Page " counter(page);
        font-family: 'Inter', sans-serif;
        font-size: 8pt;
        color: #64748b;
      }
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: #0f172a;
      background: #ffffff;
      font-size: 10pt;
      line-height: 1.55;
    }

    .page-break {
      page-break-before: always;
    }

    /* Top Running Header */
    .running-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid #2563eb;
      padding-bottom: 6px;
      margin-bottom: 20px;
      font-size: 8.5pt;
      color: #475569;
    }

    .running-header .brand {
      font-weight: 800;
      color: #1e3a8a;
      letter-spacing: 0.5px;
    }

    .running-header .doc-id {
      font-family: 'JetBrains Mono', monospace;
      color: #64748b;
    }

    /* Cover Header */
    .cover-card {
      border: 1px solid #e2e8f0;
      background: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%);
      border-radius: 12px;
      padding: 24px;
      margin-bottom: 20px;
      text-align: center;
      box-shadow: 0 4px 12px rgba(0,0,0,0.03);
    }

    .cover-logo {
      font-size: 26pt;
      font-weight: 900;
      letter-spacing: -0.5px;
      color: #1e3a8a;
      margin-bottom: 4px;
    }

    .cover-badge {
      display: inline-block;
      font-size: 8.5pt;
      font-weight: 700;
      color: #2563eb;
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      padding: 3px 12px;
      border-radius: 9999px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 14px;
    }

    .cover-title {
      font-size: 20pt;
      font-weight: 800;
      color: #0f172a;
      line-height: 1.25;
      margin-bottom: 8px;
    }

    .cover-tagline {
      font-size: 10.5pt;
      color: #475569;
      max-width: 90%;
      margin: 0 auto 16px auto;
    }

    .meta-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 14px;
      font-size: 9pt;
      text-align: left;
    }

    .meta-table td {
      padding: 6px 10px;
      border-bottom: 1px solid #e2e8f0;
    }

    .meta-table td.label {
      font-weight: 600;
      color: #475569;
      width: 35%;
      background: #f8fafc;
    }

    .meta-table td.val {
      color: #0f172a;
      font-weight: 500;
    }

    /* Section Headings */
    h2.section-title {
      font-size: 13pt;
      font-weight: 800;
      color: #1e3a8a;
      border-bottom: 2px solid #2563eb;
      padding-bottom: 4px;
      margin-top: 22px;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    h3.sub-title {
      font-size: 10.5pt;
      font-weight: 700;
      color: #0f172a;
      margin-top: 12px;
      margin-bottom: 4px;
    }

    p {
      margin-bottom: 8px;
      color: #1e293b;
      text-align: justify;
    }

    /* Callout Boxes */
    .callout {
      border-radius: 8px;
      padding: 10px 14px;
      margin: 10px 0;
      font-size: 9pt;
      border-left: 4px solid;
    }

    .callout-blue {
      background: #eff6ff;
      border-color: #2563eb;
      color: #1e3a8a;
    }

    .callout-amber {
      background: #fffbeb;
      border-color: #f59e0b;
      color: #78350f;
    }

    .callout-green {
      background: #f0fdf4;
      border-color: #10b981;
      color: #065f46;
    }

    .callout-title {
      font-weight: 700;
      margin-bottom: 2px;
      display: flex;
      align-items: center;
      gap: 5px;
    }

    /* ASCII Architecture Diagram Box */
    .ascii-box {
      background: #0f172a;
      color: #38bdf8;
      font-family: 'JetBrains Mono', monospace;
      font-size: 8pt;
      padding: 12px;
      border-radius: 8px;
      white-space: pre;
      overflow-x: auto;
      line-height: 1.35;
      margin: 8px 0 12px 0;
      border: 1px solid #1e293b;
    }

    /* Tech Stack Table */
    .tech-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 8.5pt;
      margin: 8px 0 12px 0;
    }

    .tech-table th, .tech-table td {
      border: 1px solid #cbd5e1;
      padding: 6px 9px;
      text-align: left;
    }

    .tech-table th {
      background: #1e3a8a;
      color: #ffffff;
      font-weight: 700;
    }

    .tech-table tr:nth-child(even) {
      background: #f8fafc;
    }

    /* Master Prompt Box */
    .prompt-box {
      background: #090d16;
      border: 1px solid #334155;
      border-radius: 8px;
      padding: 12px;
      margin: 10px 0;
      color: #e2e8f0;
      font-family: 'JetBrains Mono', monospace;
      font-size: 7.5pt;
      white-space: pre-wrap;
      line-height: 1.45;
      max-height: 380px;
      overflow-y: hidden;
      position: relative;
    }

    .prompt-header {
      background: #1e293b;
      color: #38bdf8;
      font-size: 8pt;
      font-weight: 700;
      padding: 6px 12px;
      border-radius: 6px 6px 0 0;
      display: flex;
      justify-content: space-between;
      border: 1px solid #334155;
      border-bottom: none;
    }

    /* Baby Steps Card */
    .step-card {
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 10px 12px;
      margin-bottom: 8px;
      background: #ffffff;
    }

    .step-title {
      font-weight: 700;
      color: #1e3a8a;
      font-size: 9.5pt;
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 4px;
    }

    .step-number {
      background: #eff6ff;
      color: #2563eb;
      font-family: 'JetBrains Mono', monospace;
      font-weight: 800;
      font-size: 8pt;
      padding: 1px 6px;
      border-radius: 4px;
      border: 1px solid #bfdbfe;
    }

    .cmd-box {
      background: #f1f5f9;
      color: #0f172a;
      font-family: 'JetBrains Mono', monospace;
      font-size: 8pt;
      padding: 4px 8px;
      border-radius: 4px;
      margin: 4px 0;
      border-left: 3px solid #2563eb;
    }

    /* Viva Defense Cards */
    .viva-card {
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 10px 12px;
      margin-bottom: 8px;
      background: #ffffff;
      box-shadow: 0 1px 3px rgba(0,0,0,0.02);
    }

    .viva-q {
      font-weight: 700;
      color: #0f172a;
      font-size: 9pt;
      margin-bottom: 4px;
    }

    .viva-ans {
      background: #f0fdf4;
      border-left: 3px solid #10b981;
      padding: 5px 8px;
      font-size: 8.5pt;
      color: #065f46;
      margin-bottom: 4px;
      border-radius: 0 4px 4px 0;
    }

    .viva-edge {
      background: #fffbeb;
      border-left: 3px solid #f59e0b;
      padding: 5px 8px;
      font-size: 8.5pt;
      color: #78350f;
      border-radius: 0 4px 4px 0;
    }

    /* Resume Bullets */
    .bullet-item {
      display: flex;
      align-items: flex-start;
      gap: 6px;
      margin-bottom: 4px;
      font-size: 9pt;
    }

    .bullet-dot {
      color: #2563eb;
      font-weight: 900;
    }

    /* Footer disclaimer */
    .back-footer {
      text-align: center;
      margin-top: 24px;
      padding-top: 12px;
      border-top: 1px solid #e2e8f0;
      font-size: 8pt;
      color: #64748b;
    }
  </style>
</head>
<body>

  <!-- ══════════════════════════════════════════════════════════
       PAGE 1: COVER & EXECUTIVE DOSSIER
  ══════════════════════════════════════════════════════════ -->
  <div class="running-header">
    <span class="brand">SUBMITKIT INTELLIGENCE DOSSIER</span>
    <span class="doc-id">DOC ID: ${docId}</span>
  </div>

  <div class="cover-card">
    <div class="cover-logo">SUBMITKIT</div>
    <div class="cover-badge">Academic &amp; Industry Capstone Blueprint</div>
    <h1 class="cover-title">${blueprint.title}</h1>
    <p class="cover-tagline">${blueprint.tagline}</p>

    <table class="meta-table">
      <tr>
        <td class="label">Authorized Student Licensee</td>
        <td class="val"><strong>${studentEmail}</strong></td>
      </tr>
      <tr>
        <td class="label">Academic Category</td>
        <td class="val">${blueprint.category} (Department of Computer Science &amp; Engineering)</td>
      </tr>
      <tr>
        <td class="label">Difficulty &amp; Scope</td>
        <td class="val">${"★".repeat(blueprint.difficulty)}${"☆".repeat(5 - blueprint.difficulty)} (${blueprint.difficulty}/5 · Advanced Major Capstone)</td>
      </tr>
      <tr>
        <td class="label">Recommended Build Timeline</td>
        <td class="val">${blueprint.buildTimeDays} (Antigravity AI: Under 10 minutes)</td>
      </tr>
      <tr>
        <td class="label">Authentication Code</td>
        <td class="val" style="font-family: 'JetBrains Mono', monospace; color: #2563eb;">${docId}</td>
      </tr>
      <tr>
        <td class="label">Generation Date</td>
        <td class="val">${today}</td>
      </tr>
    </table>
  </div>

  <div class="callout callout-blue">
    <div class="callout-title">📋 Executive Summary &amp; Institutional Quality Guarantee</div>
    This official blueprint provides the complete intellectual and engineering foundation required to build, understand, and defend this project before university examination panels. It includes step-by-step conceptual baby steps, system data pipelines, the copy-paste Antigravity Master Prompt, and 15 examiner-grade viva defense Q&amp;A breakdowns.
  </div>

  <h2 class="section-title">1. Project Overview &amp; Industrial Context</h2>
  <h3 class="sub-title">System Mission &amp; Purpose</h3>
  <p>${blueprint.whatItDoes}</p>

  <h3 class="sub-title">Real-World Industrial Application</h3>
  <p>${blueprint.realWorldUse}</p>

  <div class="callout callout-amber">
    <div class="callout-title">💡 Why Evaluators Respect This Topic</div>
    Unlike outdated generic college projects (e.g. basic hospital or library portals), this system addresses modern security, computer vision, and real-time inference requirements. Evaluators look for edge-case handling, anti-spoofing resilience, and live webcam pipeline stability.
  </div>

  <!-- ══════════════════════════════════════════════════════════
       PAGE 2: ARCHITECTURE, DATASET & TECH STACK
  ══════════════════════════════════════════════════════════ -->
  <div class="page-break"></div>
  <div class="running-header">
    <span class="brand">SUBMITKIT BLUEPRINT: ${blueprint.title}</span>
    <span class="doc-id">DOC ID: ${docId}</span>
  </div>

  <h2 class="section-title">2. Problem Statement &amp; Measurable Objectives</h2>
  <h3 class="sub-title">Formal Problem Statement</h3>
  <p>${blueprint.problemStatement}</p>

  <h3 class="sub-title">SMART Academic Objectives</h3>
  ${blueprint.objectives.map(obj => `
    <div class="bullet-item">
      <span class="bullet-dot">•</span>
      <span><strong>Objective:</strong> ${obj}</span>
    </div>
  `).join('')}

  <h2 class="section-title">3. Dataset Specification &amp; Pipeline Hygiene</h2>
  <table class="meta-table" style="margin-top: 6px;">
    <tr><td class="label">Benchmark Dataset</td><td class="val"><strong>${blueprint.dataset.name}</strong></td></tr>
    <tr><td class="label">Data Partitioning</td><td class="val">${blueprint.dataset.size} · Strict 80% Train / 20% Test Split</td></tr>
    <tr><td class="label">Payload Format</td><td class="val">${blueprint.dataset.format}</td></tr>
    <tr><td class="label">Primary Repository</td><td class="val" style="font-family:'JetBrains Mono',monospace; font-size:8pt; color:#2563eb;">${blueprint.dataset.url}</td></tr>
  </table>
  <div class="callout callout-green" style="margin-top: 8px;">
    <div class="callout-title">🛡️ Data Preprocessing &amp; Anti-Leakage Rule</div>
    Always fit feature scalers strictly on the training partition before transforming test data. Never normalize the complete dataset at once — data leakage is an immediate red flag that external evaluators examine in your methodology chapter.
  </div>

  <h2 class="section-title">4. System Architecture &amp; Data Flow</h2>
  <p>${blueprint.architectureExplanation}</p>
  <div class="ascii-box">${blueprint.architectureDiagram}</div>

  <h2 class="section-title">5. Technology Stack Decisions &amp; Rationales</h2>
  <table class="tech-table">
    <thead>
      <tr>
        <th style="width: 25%;">Layer / Component</th>
        <th style="width: 30%;">Selected Tool</th>
        <th style="width: 45%;">Engineering Rationale for Evaluator</th>
      </tr>
    </thead>
    <tbody>
      ${blueprint.techStack.map(t => `
        <tr>
          <td><strong>${t.component}</strong></td>
          <td><code>${t.tool}</code></td>
          <td>${t.reason}</td>
        </tr>
      `).join('')}
    </tbody>
  </table>

  <!-- ══════════════════════════════════════════════════════════
       PAGE 3: 1-PROMPT ANTIGRAVITY AI BUILDER
  ══════════════════════════════════════════════════════════ -->
  <div class="page-break"></div>
  <div class="running-header">
    <span class="brand">SUBMITKIT BLUEPRINT: ${blueprint.title}</span>
    <span class="doc-id">DOC ID: ${docId}</span>
  </div>

  <h2 class="section-title">6. Build Complete Project in ONE Prompt (Zero Coding Required)</h2>
  <div class="callout callout-blue">
    <div class="callout-title">⚡ 100% BUILDABLE IN ANTIGRAVITY WITHOUT WRITING CODE</div>
    Save 40+ hours of tedious environment debugging and manual code syntax. Simply copy the Master Prompt below, paste it into Antigravity AI, and get the entire project generated with synthetic sample data, core AI models, and an interactive dark-mode web dashboard in under 10 minutes.
  </div>

  <h3 class="sub-title">How to Run in 3 Easy Steps:</h3>
  <div class="bullet-item"><span class="bullet-dot">1.</span><span><strong>Launch Antigravity AI</strong> in an empty folder on your laptop.</span></div>
  <div class="bullet-item"><span class="bullet-dot">2.</span><span><strong>Copy &amp; Paste the Master Prompt below</strong> into the chat. The agent scaffolds all files, generates sample test data, and builds the UI.</span></div>
  <div class="bullet-item"><span class="bullet-dot">3.</span><span><strong>Double-click run.bat</strong> (or run <code>python app.py</code>). Open <code>http://localhost:5000</code> in your browser to view your live, fully functional project!</span></div>

  <div style="margin-top: 12px;">
    <div class="prompt-header">
      <span>ANTIGRAVITY MASTER PROMPT (${masterPrompt.length} CHARACTERS)</span>
      <span>COPY-PASTE READY</span>
    </div>
    <div class="prompt-box">${masterPrompt.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
  </div>

  <div class="callout callout-amber" style="margin-top: 10px;">
    <div class="callout-title">💡 Base MVP Foundation &amp; Creative Freedom</div>
    This Master Prompt delivers a 100% working <strong>Base MVP (Minimum Viable Product)</strong> right out of the box. Use this as your solid operational launchpad! As per your personal creativity and college project guidelines, you can freely update, refine, and customize the system (e.g. asking the AI: <em>"Now add real-time Excel export"</em>, <em>"Add dark/light theme switch"</em>, or <em>"Integrate email alerts"</em>).
  </div>

  <!-- ══════════════════════════════════════════════════════════
       PAGE 4: STEP-BY-STEP CONCEPTUAL BABY STEPS (NO CODE CLUTTER)
  ══════════════════════════════════════════════════════════ -->
  <div class="page-break"></div>
  <div class="running-header">
    <span class="brand">SUBMITKIT BLUEPRINT: ${blueprint.title}</span>
    <span class="doc-id">DOC ID: ${docId}</span>
  </div>

  <h2 class="section-title">7. Step-by-Step Conceptual Build Guide (Baby Steps — Pure Theory)</h2>
  <p>If your college guide or external examiner asks you to explain your system on a whiteboard, study these conceptual stages. They explain the pure engineering theory, data transformations, and decision logic — without confusing code clutter.</p>

  ${blueprint.buildSteps.slice(0, 5).map(step => `
    <div class="step-card">
      <div class="step-title">
        <span class="step-number">Stage ${step.step}</span>
        <span>${step.title}</span>
        <span style="font-size: 8pt; color: #64748b; font-weight: 500; margin-left: auto;">${step.duration}</span>
      </div>
      <p style="font-size: 8.5pt; color: #334155; margin-bottom: 4px;">${step.description}</p>
      ${step.commands && step.commands.length > 0 ? `
        <div class="cmd-box">$ ${step.commands.join(' && ')}</div>
      ` : ''}
      <div style="font-size: 8pt; color: #166534; font-weight: 600;">✓ Verification: ${step.expectedOutput}</div>
    </div>
  `).join('')}

  <!-- ══════════════════════════════════════════════════════════
       PAGE 5: VIVA DEFENSE MASTERY & EVALUATOR EDGE
  ══════════════════════════════════════════════════════════ -->
  <div class="page-break"></div>
  <div class="running-header">
    <span class="brand">SUBMITKIT BLUEPRINT: ${blueprint.title}</span>
    <span class="doc-id">DOC ID: ${docId}</span>
  </div>

  <h2 class="section-title">8. Core Engineering Concepts &amp; Viva Defense Mastery</h2>
  <p>You do not need to memorize textbook definitions. External evaluators look for clear, intuitive understanding of your system's architecture and trade-offs. Here is the plain-English breakdown of every core concept:</p>

  ${blueprint.vivaQA.slice(0, 4).map((qa, i) => `
    <div class="viva-card">
      <div class="viva-q">Q${i + 1}: ${qa.question}</div>
      <div class="viva-ans">
        <strong>✓ Plain-English Answer:</strong> ${qa.perfectAnswer}
      </div>
      <div style="font-size: 8pt; color: #475569; margin-bottom: 3px; font-style: italic;">
        <strong>Why Evaluator Asks This:</strong> ${qa.whyAsked}
      </div>
      <div class="viva-edge">
        <strong>💡 Evaluator Scoring Edge:</strong> ${qa.avoidSaying}
      </div>
    </div>
  `).join('')}

  <!-- ══════════════════════════════════════════════════════════
       PAGE 6: CAREER LAUNCHPAD & RESUME BUILDER
  ══════════════════════════════════════════════════════════ -->
  <div class="page-break"></div>
  <div class="running-header">
    <span class="brand">SUBMITKIT BLUEPRINT: ${blueprint.title}</span>
    <span class="doc-id">DOC ID: ${docId}</span>
  </div>

  <h2 class="section-title">9. Cloud Deployment &amp; Career Launchpad</h2>
  <h3 class="sub-title">ATS-Optimized Resume Bullet Points (Google XYZ Format)</h3>
  <p>Add these high-impact, quantified bullet points directly to your CV under "Technical Projects":</p>
  ${blueprint.resumeBullets.map(b => `
    <div class="bullet-item">
      <span class="bullet-dot">•</span>
      <span>${b}</span>
    </div>
  `).join('')}

  <h3 class="sub-title" style="margin-top: 14px;">LinkedIn Post Announcement Template</h3>
  <p>Copy and publish this narrative once your college viva is complete to showcase your engineering capability:</p>
  <div class="callout callout-blue" style="font-family: 'Inter', sans-serif; font-style: italic; font-size: 8.5pt;">
    ${blueprint.linkedinPost.replace(/\n/g, '<br>')}
  </div>

  <div class="back-footer">
    <strong style="color: #1e3a8a; font-size: 9pt;">SUBMITKIT INTELLIGENCE  •  THE ₹19 ADVANTAGE</strong><br>
    submitkit.in  •  Engineered exclusively for ${studentEmail}  •  All Rights Reserved.
  </div>

</body>
</html>`;

  // Write HTML to public/
  const htmlPath = path.join(process.cwd(), 'public', 'demo-blueprint-face-recognition.html');
  fs.writeFileSync(htmlPath, htmlContent);
  console.log('Saved HTML to:', htmlPath);

  // Generate PDF via Puppeteer
  console.log('Launching headless browser to generate publication-grade PDF...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

  const pdfPublicPath = path.join(process.cwd(), 'public', 'SubmitKit-Demo-Blueprint-Face-Recognition-Attendance.pdf');
  const pdfRootPath = path.join(process.cwd(), 'SubmitKit-Demo-Blueprint-Face-Recognition-Attendance.pdf');

  await page.pdf({
    path: pdfPublicPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '15mm', bottom: '15mm', left: '15mm', right: '15mm' },
  });

  // Copy to root
  fs.copyFileSync(pdfPublicPath, pdfRootPath);
  console.log('Generated PDF at:', pdfPublicPath);
  console.log('Copied PDF to:', pdfRootPath);

  // Take high-resolution preview screenshots of Page 1 (Cover), Page 2 (Architecture), Page 3 (Prompt), Page 4 (Viva)
  console.log('Capturing page preview screenshots for chat display...');
  const artifactDir = 'C:\\Users\\ASUS\\.gemini\\antigravity-ide\\brain\\60c8289d-61fd-4627-a3f2-ad8056aa7d4f';
  
  // Set viewport for high-DPI screenshots
  await page.setViewport({ width: 1200, height: 1600, deviceScaleFactor: 2 });
  
  // Screenshot top of page 1
  const shot1 = path.join(artifactDir, 'blueprint_preview_cover.png');
  await page.screenshot({ path: shot1, clip: { x: 0, y: 0, width: 1200, height: 1400 } });
  console.log('Captured:', shot1);

  // Scroll to page 2 (architecture)
  const shot2 = path.join(artifactDir, 'blueprint_preview_architecture.png');
  await page.evaluate(() => window.scrollTo(0, 1500));
  await page.screenshot({ path: shot2, clip: { x: 0, y: 0, width: 1200, height: 1400 } });
  console.log('Captured:', shot2);

  // Scroll to page 3 (master prompt)
  const shot3 = path.join(artifactDir, 'blueprint_preview_prompt.png');
  await page.evaluate(() => window.scrollTo(0, 2900));
  await page.screenshot({ path: shot3, clip: { x: 0, y: 0, width: 1200, height: 1400 } });
  console.log('Captured:', shot3);

  // Scroll to page 4 (viva defense)
  const shot4 = path.join(artifactDir, 'blueprint_preview_viva.png');
  await page.evaluate(() => window.scrollTo(0, 4400));
  await page.screenshot({ path: shot4, clip: { x: 0, y: 0, width: 1200, height: 1400 } });
  console.log('Captured:', shot4);

  await browser.close();
  console.log('All demo generation complete!');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
