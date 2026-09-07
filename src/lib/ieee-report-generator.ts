/**
 * IEEE Report Generator
 * Generates a proper IEEE-format academic project report as a .docx buffer
 * entirely in code using the `docx` package — no template file required.
 *
 * Supports three sizes:
 *   - 'mini'     → ~15 pages  (abstract + problem + objectives + modules + conclusion)
 *   - 'standard' → ~20 pages  (+ algorithm + database + testing)
 *   - 'full'     → ~60 pages  (all sections fully expanded with max detail)
 *
 * Student name appears on the cover page ONLY when personalization is enabled.
 */

import {
  Document, Packer, Paragraph, TextRun, HeadingLevel,
  AlignmentType, PageBreak, Table, TableRow, TableCell,
  WidthType, BorderStyle, ShadingType,
  NumberFormat, convertInchesToTwip,
  LevelFormat, Footer, PageNumber,
  Header,
} from 'docx';
import { getProjectContent } from './project-content';

export type ReportSize = 'mini' | 'standard' | 'full';

export interface ReportOptions {
  projectSlug: string;
  size: ReportSize;
  // Personalization — only populated when has_personalization is true
  studentName?:  string;
  rollNumber?:   string;
  guideName?:    string;
  collegeName?:  string;
  department?:   string;
  academicYear?: string;
}

// ── All section builders return mixed paragraph/table arrays ──────────────
type DocElement = Paragraph | Table;

const BRAND = '#1e3a5f';  // dark navy — IEEE standard cover colour
const LINE   = '─'.repeat(80);

function heading1(text: string): Paragraph {
  return new Paragraph({
    text,
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 360, after: 120 },
    thematicBreak: false,
  });
}

function heading2(text: string): Paragraph {
  return new Paragraph({
    text,
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 240, after: 80 },
  });
}

function heading3(text: string): Paragraph {
  return new Paragraph({
    text,
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 180, after: 60 },
  });
}

function body(text: string, indent = false): Paragraph {
  return new Paragraph({
    children: [new TextRun({ text, size: 24, font: 'Times New Roman' })],
    alignment: AlignmentType.JUSTIFIED,
    spacing: { before: 60, after: 60, line: 360 },
    indent: indent ? { left: convertInchesToTwip(0.5) } : undefined,
  });
}

function bullet(text: string, level = 0): Paragraph {
  return new Paragraph({
    children: [new TextRun({ text, size: 24, font: 'Times New Roman' })],
    bullet: { level },
    alignment: AlignmentType.LEFT,
    spacing: { before: 40, after: 40, line: 320 },
  });
}

function numbered(text: string, level = 0): Paragraph {
  return new Paragraph({
    children: [new TextRun({ text, size: 24, font: 'Times New Roman' })],
    numbering: { reference: 'default-numbering', level },
    spacing: { before: 40, after: 40, line: 320 },
  });
}

function pageBreak(): Paragraph {
  return new Paragraph({ children: [new PageBreak()] });
}

function centeredBold(text: string, size = 28): Paragraph {
  return new Paragraph({
    children: [new TextRun({ text, bold: true, size, font: 'Times New Roman' })],
    alignment: AlignmentType.CENTER,
    spacing: { before: 120, after: 120 },
  });
}

function centeredText(text: string, size = 24): Paragraph {
  return new Paragraph({
    children: [new TextRun({ text, size, font: 'Times New Roman' })],
    alignment: AlignmentType.CENTER,
    spacing: { before: 80, after: 80 },
  });
}

function sectionDivider(): Paragraph {
  return new Paragraph({
    children: [new TextRun({ text: '', size: 24 })],
    spacing: { before: 120, after: 120 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: '999999' } },
  });
}

function twoColTable(rows: [string, string][]): Table {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: rows.map(([label, value]) => new TableRow({
      children: [
        new TableCell({
          width: { size: 30, type: WidthType.PERCENTAGE },
          children: [new Paragraph({
            children: [new TextRun({ text: label, bold: true, size: 22, font: 'Times New Roman' })],
            spacing: { before: 60, after: 60 },
          })],
          shading: { type: ShadingType.CLEAR, fill: 'EBF0F7' },
        }),
        new TableCell({
          width: { size: 70, type: WidthType.PERCENTAGE },
          children: [new Paragraph({
            children: [new TextRun({ text: value, size: 22, font: 'Times New Roman' })],
            spacing: { before: 60, after: 60 },
          })],
        }),
      ],
    })),
  });
}

// ── Cover page ───────────────────────────────────────────────────────────────
function buildCoverPage(opts: ReportOptions, content: ReturnType<typeof getProjectContent>): DocElement[] {
  const college   = opts.collegeName  || 'Department of Computer Science & Engineering';
  const dept      = opts.department   || 'Bachelor of Engineering (Computer Science)';
  const year      = opts.academicYear || new Date().getFullYear().toString();
  const guide     = opts.guideName    || '';
  const roll      = opts.rollNumber   || '';
  const name      = opts.studentName  || '';

  const paras: DocElement[] = [
    new Paragraph({ spacing: { before: 0, after: 240 } }),
    centeredBold(college.toUpperCase(), 28),
    centeredText(dept, 24),
    sectionDivider(),
    new Paragraph({ spacing: { before: 240, after: 0 } }),

    // Report type badge
    centeredBold('PROJECT REPORT', 24),
    centeredText('Submitted in partial fulfillment of the requirements for the award of the degree of', 22),
    centeredBold(dept.includes('Master') ? 'MASTER OF TECHNOLOGY' : 'BACHELOR OF ENGINEERING', 26),
    centeredText('in', 22),
    centeredBold('COMPUTER SCIENCE & ENGINEERING', 24),
    new Paragraph({ spacing: { before: 240, after: 0 } }),

    // Project title
    sectionDivider(),
    new Paragraph({ spacing: { before: 160, after: 0 } }),
    centeredBold(content.fullTitle.toUpperCase(), 28),
    new Paragraph({ spacing: { before: 0, after: 160 } }),
    sectionDivider(),
    new Paragraph({ spacing: { before: 240, after: 0 } }),
  ];

  // Student name — only if personalization purchased
  if (name) {
    paras.push(centeredText('Submitted by', 22));
    paras.push(centeredBold(name.toUpperCase(), 28));
    if (roll) paras.push(centeredText(`Roll No: ${roll}`, 24));
    paras.push(new Paragraph({ spacing: { before: 120, after: 0 } }));
  }

  if (guide) {
    paras.push(centeredText('Under the guidance of', 22));
    paras.push(centeredBold(guide, 24));
    paras.push(new Paragraph({ spacing: { before: 120, after: 0 } }));
  }

  paras.push(centeredText(`Academic Year: ${year}`, 22));
  paras.push(new Paragraph({ spacing: { before: 120, after: 0 } }));
  paras.push(centeredBold('SubmitKit Academic Projects', 22));
  paras.push(centeredText('https://submitkit.in', 20));
  paras.push(pageBreak());

  return paras;
}

// ── Declaration page ─────────────────────────────────────────────────────────
function buildDeclarationPage(opts: ReportOptions): DocElement[] {
  const name = opts.studentName || 'The Author(s)';
  return [
    heading1('DECLARATION'),
    body(`I/We hereby declare that the project work entitled "${opts.projectSlug.replace(/-/g, ' ').toUpperCase()}" submitted to the Department of Computer Science & Engineering in partial fulfillment of the requirements for the award of the degree is a record of original work done by me/us during the period of study under the supervision of the project guide.`),
    new Paragraph({ spacing: { before: 120, after: 0 } }),
    body('The information and data given in the report are authentic to the best of my/our knowledge. This project work is submitted for the first time and the results embodied in this project have not been submitted to any other university or institute for the award of any degree or diploma.'),
    new Paragraph({ spacing: { before: 240, after: 0 } }),
    body(`Student Name: ${name}`),
    opts.rollNumber ? body(`Roll Number: ${opts.rollNumber}`) : new Paragraph({ text: '' }),
    body(`Date: ${new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}`),
    pageBreak(),
  ];
}

// ── Certificate page ─────────────────────────────────────────────────────────
function buildCertificatePage(opts: ReportOptions): DocElement[] {
  const guide    = opts.guideName   || 'Project Guide';
  const college  = opts.collegeName || 'Department of Computer Science & Engineering';
  const name     = opts.studentName || 'the student(s)';
  return [
    heading1('CERTIFICATE'),
    body(`This is to certify that the project entitled "${opts.projectSlug.replace(/-/g, ' ')}" submitted by ${name} is a bonafide work carried out by the student(s) under my supervision and guidance.`),
    new Paragraph({ spacing: { before: 120, after: 0 } }),
    body('The project fulfills the requirements for the award of the degree of Bachelor of Engineering in Computer Science & Engineering from the above mentioned institution and is approved for its technical content and presentation.'),
    new Paragraph({ spacing: { before: 240, after: 0 } }),
    body(`Project Guide: ${guide}`),
    body(`Institution: ${college}`),
    body(`Date: ${new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}`),
    new Paragraph({ spacing: { before: 240, after: 0 } }),
    body('Signature of Guide: ____________________________'),
    new Paragraph({ spacing: { before: 120, after: 0 } }),
    body('Signature of HOD: _______________________________'),
    new Paragraph({ spacing: { before: 120, after: 0 } }),
    body('Signature of Principal: _________________________'),
    pageBreak(),
  ];
}

// ── Abstract ─────────────────────────────────────────────────────────────────
function buildAbstract(content: ReturnType<typeof getProjectContent>): DocElement[] {
  return [
    heading1('ABSTRACT'),
    body(content.abstract),
    new Paragraph({ spacing: { before: 120, after: 0 } }),
    new Paragraph({
      children: [new TextRun({ text: 'Keywords: ', bold: true, size: 24, font: 'Times New Roman' }),
                 new TextRun({ text: content.techStack.join(', '), size: 24, font: 'Times New Roman', italics: true })],
      spacing: { before: 60, after: 60 },
    }),
    pageBreak(),
  ];
}

// ── Acknowledgement ────────────────────────────────────────────────────────
function buildAcknowledgement(opts: ReportOptions): DocElement[] {
  const guide = opts.guideName || 'our Project Guide';
  return [
    heading1('ACKNOWLEDGEMENT'),
    body(`We would like to express our sincere gratitude to ${guide} for their invaluable guidance, continuous encouragement, and constructive suggestions throughout the course of this project. Their expertise and insights have been instrumental in shaping the direction and depth of this work.`),
    new Paragraph({ spacing: { before: 80, after: 0 } }),
    body('We are grateful to the Head of Department and all the faculty members of the Department of Computer Science & Engineering for providing the necessary facilities and support for the completion of this project.'),
    new Paragraph({ spacing: { before: 80, after: 0 } }),
    body('We would also like to thank our colleagues and friends for their moral support and encouragement during the course of this project.'),
    new Paragraph({ spacing: { before: 80, after: 0 } }),
    body('Finally, we extend our heartfelt thanks to our family members for their unwavering support and understanding throughout this endeavor.'),
    pageBreak(),
  ];
}

// ── Chapter 1: Introduction ─────────────────────────────────────────────────
function buildChapter1(content: ReturnType<typeof getProjectContent>, size: ReportSize): DocElement[] {
  const paras: DocElement[] = [
    heading1('CHAPTER 1: INTRODUCTION'),
    heading2('1.1 Background'),
    body(`The rapid advancement of technology in the field of ${content.category} has created new opportunities for innovation and problem-solving. ${content.abstract.substring(0, 300)}...`),
    new Paragraph({ spacing: { before: 80, after: 0 } }),
    heading2('1.2 Problem Statement'),
    body(content.problemStatement),
    new Paragraph({ spacing: { before: 80, after: 0 } }),
    heading2('1.3 Objectives'),
    body('The primary objectives of this project are:'),
    ...content.objectives.map(obj => bullet(obj)),
    new Paragraph({ spacing: { before: 80, after: 0 } }),
    heading2('1.4 Scope of the Project'),
    body(`This project focuses on the development and implementation of ${content.title} using ${content.techStack.slice(0, 3).join(', ')} and other modern technologies. The scope includes:`),
    ...content.modules.slice(0, 4).map(m => bullet(`${m.name}: ${m.description.substring(0, 100)}...`)),
    new Paragraph({ spacing: { before: 80, after: 0 } }),
  ];

  if (size !== 'mini') {
    paras.push(
      heading2('1.5 Organization of the Report'),
      body('This report is organized into the following chapters:'),
      bullet('Chapter 1 — Introduction: Provides background, problem statement, objectives and scope'),
      bullet('Chapter 2 — Literature Review: Discusses existing solutions and research in the domain'),
      bullet('Chapter 3 — System Design: Covers architecture, module design, and database schema'),
      bullet('Chapter 4 — Implementation: Describes the technical implementation details'),
      bullet('Chapter 5 — Testing and Results: Presents testing methodology and results'),
      bullet('Chapter 6 — Conclusion and Future Scope: Summarizes findings and future work'),
      new Paragraph({ spacing: { before: 80, after: 0 } }),
    );
  }

  if (size === 'full') {
    paras.push(
      heading2('1.6 Technology Overview'),
      body(`This project is built using the following technology stack: ${content.techStack.join(', ')}. Each technology was selected based on its performance characteristics, community support, and suitability for the problem domain.`),
      ...content.techStack.map(tech => bullet(`${tech}: Industry-standard technology widely used in ${content.category} applications`)),
      new Paragraph({ spacing: { before: 80, after: 0 } }),
      heading2('1.7 Project Methodology'),
      body('The project follows the Agile Software Development methodology with iterative sprints of 2-week duration. This approach allows for continuous feedback integration, adaptability to changing requirements, and incremental delivery of working features.'),
      body('Key Agile practices adopted:'),
      bullet('Sprint planning with defined user stories and acceptance criteria'),
      bullet('Daily standups for progress tracking and blocker identification'),
      bullet('Sprint reviews for stakeholder feedback and demonstration'),
      bullet('Retrospectives for continuous process improvement'),
      bullet('Test-driven development for critical business logic components'),
      new Paragraph({ spacing: { before: 80, after: 0 } }),
    );
  }

  paras.push(pageBreak());
  return paras;
}

// ── Chapter 2: Literature Review ────────────────────────────────────────────
function buildChapter2(content: ReturnType<typeof getProjectContent>, size: ReportSize): DocElement[] {
  if (size === 'mini') return [];

  const paras: DocElement[] = [
    heading1('CHAPTER 2: LITERATURE REVIEW'),
    heading2('2.1 Existing Solutions and Related Work'),
    body(`Several existing systems and research papers have been studied to understand the current state of the art in ${content.category}. A comprehensive review of these works informed the design decisions made in this project.`),
    new Paragraph({ spacing: { before: 80, after: 0 } }),
  ];

  if (content.references.length > 0) {
    paras.push(
      heading2('2.2 Survey of Existing Literature'),
      ...content.references.slice(0, Math.min(4, content.references.length)).map((ref, i) =>
        body(`[${i + 1}] ${ref}`, true)
      ),
      new Paragraph({ spacing: { before: 80, after: 0 } }),
    );
  }

  paras.push(
    heading2('2.3 Gaps in Existing Solutions'),
    body('After careful analysis of existing solutions, the following gaps and limitations were identified:'),
    bullet('Lack of integrated approach combining multiple functional requirements'),
    bullet('Limited scalability in existing open-source implementations'),
    bullet('Poor user experience and outdated interface design in legacy systems'),
    bullet('Absence of real-time capabilities in conventional approaches'),
    bullet('High cost of commercial solutions making them inaccessible to smaller organizations'),
    new Paragraph({ spacing: { before: 80, after: 0 } }),
    heading2('2.4 Proposed Improvements'),
    body(`The proposed system — ${content.title} — addresses these gaps by implementing a modern, cloud-native architecture with emphasis on performance, usability, and maintainability. The key improvements over existing solutions are:`),
    bullet('Modern full-stack architecture using industry-standard technologies'),
    bullet('Real-time data synchronization and responsive user interface'),
    bullet('Comprehensive feature set addressing all identified use cases'),
    bullet('Open-source implementation with no per-user licensing costs'),
    bullet('Scalable cloud deployment suitable for organizations of any size'),
    new Paragraph({ spacing: { before: 80, after: 0 } }),
  );

  if (size === 'full') {
    paras.push(
      heading2('2.5 Comparative Analysis'),
      body('The following table presents a comparative analysis of existing solutions against the proposed system:'),
      new Paragraph({ spacing: { before: 80, after: 0 } }),
      twoColTable([
        ['Feature', 'Proposed System'],
        ['Cost', 'Open Source — Zero licensing cost'],
        ['Deployment', 'Cloud-native, single-click deployment'],
        ['Scalability', 'Horizontal scaling via containerization'],
        ['User Interface', 'Modern, responsive, mobile-first design'],
        ['Integration', 'REST API with standard authentication'],
        ['Performance', 'Sub-200ms response time under normal load'],
      ]),
      new Paragraph({ spacing: { before: 120, after: 0 } }),
    );
  }

  paras.push(pageBreak());
  return paras;
}

// ── Chapter 3: System Design ─────────────────────────────────────────────────
function buildChapter3(content: ReturnType<typeof getProjectContent>, size: ReportSize): DocElement[] {
  const paras: DocElement[] = [
    heading1('CHAPTER 3: SYSTEM DESIGN'),
    heading2('3.1 System Architecture'),
    body(content.systemArchitecture),
    new Paragraph({ spacing: { before: 80, after: 0 } }),
    heading2('3.2 Module Design'),
    body('The system is divided into the following functional modules, each with a well-defined responsibility:'),
    new Paragraph({ spacing: { before: 80, after: 0 } }),
    ...content.modules.flatMap((m, i) => [
      heading3(`3.2.${i + 1} ${m.name}`),
      body(m.description),
      new Paragraph({ spacing: { before: 60, after: 0 } }),
    ]),
  ];

  paras.push(
    heading2('3.3 Database Design'),
    body(content.databaseDesign),
    new Paragraph({ spacing: { before: 80, after: 0 } }),
  );

  if (size !== 'mini') {
    paras.push(
      heading2('3.4 Technology Stack'),
      body('The following technologies were selected for implementing this project:'),
      ...content.techStack.map(tech => bullet(tech)),
      new Paragraph({ spacing: { before: 80, after: 0 } }),
      heading2('3.5 Data Flow Diagram'),
      body('The data flow in the system follows a standard three-tier architecture pattern:'),
      bullet('Level 0 (Context DFD): User interacts with the frontend → API processes the request → Database stores/retrieves data → Response returned to user'),
      bullet('Level 1 DFD: User authentication flow → Authenticated requests → Business logic processing → Data access layer → Database operations'),
      bullet('Level 2 DFD: Each module handles specific data transformations with defined input and output data stores'),
      new Paragraph({ spacing: { before: 80, after: 0 } }),
    );
  }

  if (size === 'full') {
    paras.push(
      heading2('3.6 Use Case Diagram'),
      body('The primary actors in the system and their interactions:'),
      bullet('End User: Authentication, data management, reporting, profile management'),
      bullet('Administrator: User management, system configuration, audit log review'),
      bullet('Guest: Public content viewing, registration, contact'),
      new Paragraph({ spacing: { before: 80, after: 0 } }),
      heading2('3.7 Entity Relationship Diagram'),
      body('The database schema consists of normalized tables with proper relationships:'),
      body('Primary entities: Users, Records, Transactions, Audit Logs — connected via foreign key relationships enforcing referential integrity.'),
      new Paragraph({ spacing: { before: 80, after: 0 } }),
      heading2('3.8 Security Design'),
      body('Security is implemented at multiple layers:'),
      bullet('Authentication: JWT tokens with short expiry and HTTP-only cookies'),
      bullet('Authorization: Role-based access control at API middleware level'),
      bullet('Input Validation: Schema-based validation on all user inputs'),
      bullet('SQL Injection Prevention: Parameterized queries via ORM'),
      bullet('XSS Prevention: Output encoding in frontend rendering'),
      bullet('CSRF Protection: SameSite cookie attributes and origin validation'),
      bullet('Rate Limiting: Per-IP rate limiting on all public endpoints'),
      new Paragraph({ spacing: { before: 80, after: 0 } }),
    );
  }

  paras.push(pageBreak());
  return paras;
}

// ── Chapter 4: Implementation ────────────────────────────────────────────────
function buildChapter4(content: ReturnType<typeof getProjectContent>, size: ReportSize): DocElement[] {
  const paras: DocElement[] = [
    heading1('CHAPTER 4: IMPLEMENTATION'),
    heading2('4.1 Development Environment Setup'),
    body('The development environment was configured with the following tools and frameworks:'),
    ...content.techStack.map(tech => bullet(tech)),
    new Paragraph({ spacing: { before: 80, after: 0 } }),
    heading2('4.2 Core Algorithm'),
    body(content.algorithmUsed),
    new Paragraph({ spacing: { before: 80, after: 0 } }),
    heading2('4.3 Implementation Details'),
    body('The following key implementation decisions were made during development:'),
    ...content.implementationDetails.map(d => bullet(d)),
    new Paragraph({ spacing: { before: 80, after: 0 } }),
  ];

  if (size !== 'mini') {
    paras.push(
      heading2('4.4 Module Implementation'),
      ...content.modules.slice(0, size === 'full' ? content.modules.length : 4).flatMap((m, i) => [
        heading3(`4.4.${i + 1} ${m.name} — Implementation`),
        body(`The ${m.name} was implemented with the following approach: ${m.description}`),
        body(`Key implementation aspects include proper error handling, input validation, and integration with adjacent modules through well-defined interfaces.`),
        new Paragraph({ spacing: { before: 60, after: 0 } }),
      ]),
    );
  }

  if (size === 'full') {
    paras.push(
      heading2('4.5 API Design'),
      body('The REST API follows standard HTTP conventions with the following endpoint structure:'),
      bullet('GET /api/resource — Retrieve list or single resource'),
      bullet('POST /api/resource — Create new resource'),
      bullet('PATCH /api/resource/:id — Partial update of existing resource'),
      bullet('DELETE /api/resource/:id — Remove resource (soft delete)'),
      body('All endpoints return JSON responses with consistent structure: { data, error, meta }'),
      new Paragraph({ spacing: { before: 80, after: 0 } }),
      heading2('4.6 Frontend Implementation'),
      body('The frontend is built using Next.js with React Server Components for improved performance. Key implementation decisions:'),
      bullet('Server-Side Rendering (SSR) for SEO-critical pages'),
      bullet('Client-side state management using React Query for server state'),
      bullet('Tailwind CSS for responsive design with mobile-first approach'),
      bullet('Progressive loading with skeleton states for better perceived performance'),
      bullet('Accessible components following WCAG 2.1 AA guidelines'),
      new Paragraph({ spacing: { before: 80, after: 0 } }),
      heading2('4.7 Performance Optimizations'),
      body('The following optimizations were implemented to ensure high performance:'),
      bullet('Database query optimization with composite indexes on frequently accessed columns'),
      bullet('Redis caching for expensive computations and frequent reads'),
      bullet('Image optimization using Next.js built-in image component with WebP format'),
      bullet('Code splitting via dynamic imports for reduced initial bundle size'),
      bullet('Connection pooling to prevent database connection exhaustion under load'),
      bullet('CDN delivery for static assets via Cloudflare R2 global network'),
      new Paragraph({ spacing: { before: 80, after: 0 } }),
    );
  }

  paras.push(pageBreak());
  return paras;
}

// ── Chapter 5: Testing & Results ─────────────────────────────────────────────
function buildChapter5(content: ReturnType<typeof getProjectContent>, size: ReportSize): DocElement[] {
  const paras: DocElement[] = [
    heading1('CHAPTER 5: TESTING AND RESULTS'),
    heading2('5.1 Testing Methodology'),
    body(content.testingStrategy),
    new Paragraph({ spacing: { before: 80, after: 0 } }),
    heading2('5.2 Results and Discussion'),
    body(content.resultsAndDiscussion),
    new Paragraph({ spacing: { before: 80, after: 0 } }),
  ];

  if (size !== 'mini') {
    paras.push(
      heading2('5.3 Test Cases'),
      body('The following test cases were executed to validate system functionality:'),
      new Paragraph({ spacing: { before: 80, after: 0 } }),
      twoColTable([
        ['Test Case ID', 'Description'],
        ['TC-001', 'User registration with valid inputs — Expected: Account created, confirmation email sent'],
        ['TC-002', 'User login with correct credentials — Expected: JWT token issued, session created'],
        ['TC-003', 'User login with incorrect password — Expected: 401 Unauthorized returned'],
        ['TC-004', 'Unauthorized access to protected route — Expected: 401/403 error returned'],
        ['TC-005', 'Create resource with valid data — Expected: Resource created, 201 response'],
        ['TC-006', 'Create resource with invalid data — Expected: 422 with field-level errors'],
        ['TC-007', 'Retrieve resource list with filters — Expected: Filtered results in correct order'],
        ['TC-008', 'Update resource with authorization — Expected: Resource updated, 200 response'],
        ['TC-009', 'Delete resource — Expected: Soft delete, resource not in list results'],
        ['TC-010', 'Export report — Expected: Valid file download with correct data'],
      ]),
      new Paragraph({ spacing: { before: 120, after: 0 } }),
    );
  }

  if (size === 'full') {
    paras.push(
      heading2('5.4 Performance Test Results'),
      body('Performance testing was conducted using k6 load testing tool with the following results:'),
      twoColTable([
        ['Metric', 'Result'],
        ['Average Response Time', '< 150ms'],
        ['p95 Response Time', '< 300ms'],
        ['p99 Response Time', '< 500ms'],
        ['Throughput', '500 requests/second'],
        ['Error Rate', '< 0.1%'],
        ['Database Query Time (avg)', '< 50ms'],
        ['Concurrent Users Supported', '1000+'],
      ]),
      new Paragraph({ spacing: { before: 120, after: 0 } }),
      heading2('5.5 Security Testing'),
      body('Security testing was performed using OWASP ZAP automated scanner and manual penetration testing:'),
      bullet('SQL Injection: No vulnerabilities found — parameterized queries in use'),
      bullet('XSS: No stored or reflected XSS — output encoding verified'),
      bullet('CSRF: Protected via SameSite cookie attributes'),
      bullet('Authentication bypass: All protected routes verified to require valid token'),
      bullet('Rate limiting: Verified to trigger at defined thresholds'),
      bullet('Information disclosure: No sensitive data in error responses'),
      new Paragraph({ spacing: { before: 80, after: 0 } }),
      heading2('5.6 User Acceptance Testing'),
      body('User acceptance testing was conducted with 5 target users over a 2-day period. Results:'),
      bullet('Overall satisfaction: 4.6/5'),
      bullet('Ease of use: 4.7/5'),
      bullet('Feature completeness: 4.4/5'),
      bullet('Performance: 4.8/5'),
      bullet('Design and aesthetics: 4.6/5'),
      body('All critical user journeys were completed successfully by all 5 testers without assistance.'),
      new Paragraph({ spacing: { before: 80, after: 0 } }),
    );
  }

  paras.push(pageBreak());
  return paras;
}

// ── Chapter 6: Conclusion ────────────────────────────────────────────────────
function buildChapter6(content: ReturnType<typeof getProjectContent>, size: ReportSize): DocElement[] {
  const paras: DocElement[] = [
    heading1('CHAPTER 6: CONCLUSION AND FUTURE SCOPE'),
    heading2('6.1 Conclusion'),
    body(content.conclusion),
    new Paragraph({ spacing: { before: 80, after: 0 } }),
    heading2('6.2 Future Scope'),
    body('The following enhancements are planned for future versions of the system:'),
    ...content.futureScope.map(f => bullet(f)),
    new Paragraph({ spacing: { before: 80, after: 0 } }),
  ];

  if (size === 'full') {
    paras.push(
      heading2('6.3 Lessons Learned'),
      body('The development of this project provided valuable insights and learning:'),
      bullet('Importance of thorough requirements analysis before development begins'),
      bullet('Value of test-driven development in catching bugs early'),
      bullet('Significance of iterative development and continuous stakeholder feedback'),
      bullet('Benefits of code review and pair programming for code quality'),
      bullet('Critical importance of security considerations from the design phase'),
      new Paragraph({ spacing: { before: 80, after: 0 } }),
      heading2('6.4 Summary'),
      body(`This project successfully demonstrates the feasibility and effectiveness of ${content.title} as a solution to the identified problem domain. The system meets all defined functional and non-functional requirements and has been validated through comprehensive testing. The open-source implementation ensures that the solution remains accessible and adaptable for future enhancements.`),
      new Paragraph({ spacing: { before: 80, after: 0 } }),
    );
  }

  paras.push(pageBreak());
  return paras;
}

// ── References ───────────────────────────────────────────────────────────────
function buildReferences(content: ReturnType<typeof getProjectContent>): DocElement[] {
  return [
    heading1('REFERENCES'),
    ...content.references.map((ref, i) =>
      new Paragraph({
        children: [
          new TextRun({ text: `[${i + 1}] `, bold: true, size: 22, font: 'Times New Roman' }),
          new TextRun({ text: ref, size: 22, font: 'Times New Roman' }),
        ],
        spacing: { before: 60, after: 60 },
        indent: { left: convertInchesToTwip(0.5), hanging: convertInchesToTwip(0.5) },
      })
    ),
    pageBreak(),
  ];
}

// ── Appendix ─────────────────────────────────────────────────────────────────
function buildAppendix(content: ReturnType<typeof getProjectContent>, size: ReportSize): DocElement[] {
  if (size !== 'full') return [];
  return [
    heading1('APPENDIX A: SYSTEM REQUIREMENTS'),
    heading2('A.1 Hardware Requirements'),
    twoColTable([
      ['Component', 'Minimum Specification'],
      ['Processor', 'Intel Core i3 or equivalent (2 GHz+)'],
      ['RAM', '4 GB (8 GB recommended)'],
      ['Storage', '20 GB free disk space'],
      ['Network', 'Broadband internet connection (10 Mbps+)'],
      ['Display', '1366 × 768 resolution or higher'],
    ]),
    new Paragraph({ spacing: { before: 120, after: 0 } }),
    heading2('A.2 Software Requirements'),
    twoColTable([
      ['Software', 'Version'],
      ['Operating System', 'Windows 10/11, macOS 12+, Ubuntu 20.04+'],
      ['Node.js', '18.x or higher'],
      ['PostgreSQL', '14.x or higher'],
      ['Browser', 'Chrome 100+, Firefox 100+, Safari 15+'],
      ['Git', '2.x or higher'],
    ]),
    new Paragraph({ spacing: { before: 120, after: 0 } }),
    heading1('APPENDIX B: INSTALLATION GUIDE'),
    heading2('B.1 Prerequisites'),
    body('Before running the project, ensure all dependencies are installed:'),
    numbered('Install Node.js from https://nodejs.org (version 18 or higher)'),
    numbered('Install PostgreSQL database server'),
    numbered('Clone the project repository'),
    heading2('B.2 Setup Instructions'),
    numbered('Extract the project ZIP file'),
    numbered('Double-click run.bat (Windows) or run bash run.sh (Mac/Linux)'),
    numbered('Wait for automatic dependency installation'),
    numbered('Open http://localhost:3000 in your browser'),
    new Paragraph({ spacing: { before: 80, after: 0 } }),
    pageBreak(),
  ];
}

// ── Main generator function ───────────────────────────────────────────────────
export async function generateIEEEReport(opts: ReportOptions): Promise<Buffer> {
  const content = getProjectContent(opts.projectSlug);
  const size    = opts.size;

  const allSections: DocElement[] = [
    ...buildCoverPage(opts, content),
    ...buildDeclarationPage(opts),
    ...buildCertificatePage(opts),
    ...buildAcknowledgement(opts),
    ...buildAbstract(content),
    ...buildChapter1(content, size),
    ...buildChapter2(content, size),
    ...buildChapter3(content, size),
    ...buildChapter4(content, size),
    ...buildChapter5(content, size),
    ...buildChapter6(content, size),
    ...buildReferences(content),
    ...buildAppendix(content, size),
  ];

  const doc = new Document({
    numbering: {
      config: [{
        reference: 'default-numbering',
        levels: [{
          level: 0,
          format: LevelFormat.DECIMAL,
          text: '%1.',
          alignment: AlignmentType.LEFT,
        }],
      }],
    },
    styles: {
      default: {
        document: {
          run: { font: 'Times New Roman', size: 24 },
          paragraph: { spacing: { line: 360 } },
        },
      },
      paragraphStyles: [
        {
          id: 'Heading1',
          name: 'Heading 1',
          basedOn: 'Normal',
          next: 'Normal',
          run: { bold: true, size: 32, font: 'Times New Roman', color: '1e3a5f' },
          paragraph: {
            spacing: { before: 480, after: 120 },
            border: { bottom: { style: BorderStyle.SINGLE, size: 2, color: '1e3a5f' } },
          },
        },
        {
          id: 'Heading2',
          name: 'Heading 2',
          basedOn: 'Normal',
          next: 'Normal',
          run: { bold: true, size: 26, font: 'Times New Roman', color: '2c4a7c' },
          paragraph: { spacing: { before: 320, after: 80 } },
        },
        {
          id: 'Heading3',
          name: 'Heading 3',
          basedOn: 'Normal',
          next: 'Normal',
          run: { bold: true, size: 24, font: 'Times New Roman' },
          paragraph: { spacing: { before: 200, after: 60 } },
        },
      ],
    },
    sections: [{
      properties: {
        page: {
          margin: {
            top:    convertInchesToTwip(1.0),
            bottom: convertInchesToTwip(1.0),
            left:   convertInchesToTwip(1.25),
            right:  convertInchesToTwip(1.0),
          },
        },
      },
      footers: {
        default: new Footer({
          children: [
            new Paragraph({
              children: [
                new TextRun({ text: `${content.title} | SubmitKit Academic Projects    `, size: 18, font: 'Times New Roman', color: '666666' }),
                new TextRun({ children: [PageNumber.CURRENT], size: 18, font: 'Times New Roman', color: '666666' }),
              ],
              alignment: AlignmentType.CENTER,
            }),
          ],
        }),
      },
      children: allSections,
    }],
  });

  return Packer.toBuffer(doc);
}

export function getReportPageCount(size: ReportSize): string {
  return { mini: '~15', standard: '~20', full: '~60' }[size];
}
