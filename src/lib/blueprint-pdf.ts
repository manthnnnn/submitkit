/**
 * Blueprint PDF/DOCX Generator
 * Generates an official, branded SubmitKit blueprint document using the `docx` library.
 *
 * Designed for students:
 * - Clear, rich theory and conceptual baby steps (NO raw code clutter).
 * - "Build Without Coding in 10 Minutes with Antigravity" + Copy-Paste Master Prompt.
 * - Dense, publication-grade layout with zero artificial blank voids.
 * - Deep Viva defense pack with traps to avoid.
 */

import {
  Document, Packer, Paragraph, TextRun, HeadingLevel,
  AlignmentType, PageBreak, Table, TableRow, TableCell,
  WidthType, BorderStyle, Footer, PageNumber, Header,
  ShadingType, convertInchesToTwip,
} from "docx";
import { FullBlueprint, BuildStep, canBuildOnAntigravity } from "./blueprint-engine";

// ─── Brand Colors & Tokens ───────────────────────────────────────────────────
const BRAND_BLUE = "1E3A8A";      // Deep academic navy
const BRAND_ACCENT = "2563EB";    // Vibrant blue accent
const BRAND_LIGHT = "F0F7FF";     // Very light blue tint
const TEXT_DARK = "0F172A";       // Slate 900
const TEXT_MUTED = "475569";      // Slate 600
const BORDER_LIGHT = "CBD5E1";    // Slate 300
const AMBER_BG = "FFFBEB";        // Amber 50
const AMBER_TEXT = "92400E";      // Amber 800
const AMBER_BORDER = "F59E0B";    // Amber 500
const GREEN_BG = "F0FDF4";        // Emerald 50
const GREEN_TEXT = "166534";      // Emerald 800
const GREEN_BORDER = "10B981";    // Emerald 500
const RED_BG = "FEF2F2";          // Rose 50
const RED_TEXT = "991B1B";        // Rose 800
const RED_BORDER = "EF4444";      // Rose 500
const PROMPT_BG = "0F172A";       // Slate 900 (Dark IDE background)
const PROMPT_TEXT = "E2E8F0";     // Slate 200

// ─── Typography & Paragraph Helpers ──────────────────────────────────────────
function sectionHeading(text: string): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({
        text,
        bold: true,
        size: 26,
        color: BRAND_BLUE,
        font: "Calibri",
      }),
    ],
    spacing: { before: 320, after: 140 },
    border: {
      bottom: { color: BRAND_ACCENT, size: 8, space: 4, style: BorderStyle.SINGLE },
    },
  });
}

function subHeading(text: string): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({
        text,
        bold: true,
        size: 22,
        color: TEXT_DARK,
        font: "Calibri",
      }),
    ],
    spacing: { before: 180, after: 60 },
  });
}

function bodyText(text: string, opts?: { italic?: boolean; bold?: boolean; color?: string }): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({
        text,
        size: 21,
        color: opts?.color ?? TEXT_DARK,
        italics: opts?.italic ?? false,
        bold: opts?.bold ?? false,
        font: "Calibri",
      }),
    ],
    spacing: { before: 50, after: 70 },
    alignment: AlignmentType.JUSTIFIED,
  });
}

function bulletPoint(boldPrefix: string, text: string): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({ text: "• ", bold: true, size: 21, color: BRAND_ACCENT, font: "Calibri" }),
      ...(boldPrefix ? [new TextRun({ text: boldPrefix + ": ", bold: true, size: 21, color: TEXT_DARK, font: "Calibri" })] : []),
      new TextRun({ text, size: 21, font: "Calibri", color: TEXT_DARK }),
    ],
    spacing: { before: 40, after: 40 },
    indent: { left: convertInchesToTwip(0.25) },
  });
}

function labelRow(label: string, value: string): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({ text: label + ": ", bold: true, size: 21, color: TEXT_MUTED, font: "Calibri" }),
      new TextRun({ text: value, size: 21, color: TEXT_DARK, font: "Calibri", bold: true }),
    ],
    spacing: { before: 30, after: 30 },
  });
}

function emptyLine(): Paragraph {
  return new Paragraph({ text: "", spacing: { before: 40, after: 40 } });
}

// ─── Callout Card Helper ─────────────────────────────────────────────────────
function calloutCard(title: string, text: string, borderColor = BRAND_ACCENT, bgColor = BRAND_LIGHT): Table {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                children: [new TextRun({ text: title, bold: true, size: 21, color: BRAND_BLUE, font: "Calibri" })],
                spacing: { before: 40, after: 40 },
              }),
              new Paragraph({
                children: [new TextRun({ text, size: 20, color: TEXT_DARK, font: "Calibri" })],
                spacing: { before: 20, after: 40 },
              }),
            ],
            shading: { type: ShadingType.CLEAR, color: bgColor, fill: bgColor },
            margins: {
              top: convertInchesToTwip(0.1),
              bottom: convertInchesToTwip(0.1),
              left: convertInchesToTwip(0.2),
              right: convertInchesToTwip(0.2),
            },
            borders: {
              left: { color: borderColor, size: 24, style: BorderStyle.SINGLE },
              top: { style: BorderStyle.NONE },
              right: { style: BorderStyle.NONE },
              bottom: { style: BorderStyle.NONE },
            },
          }),
        ],
      }),
    ],
  });
}

// ─── Tech Stack Table ────────────────────────────────────────────────────────
function techStackTable(techStack: FullBlueprint["techStack"]): Table {
  const headerRow = new TableRow({
    children: [
      new TableCell({
        children: [new Paragraph({ children: [new TextRun({ text: "Component Layer", bold: true, font: "Calibri", size: 20, color: "FFFFFF" })] })],
        width: { size: 25, type: WidthType.PERCENTAGE },
        shading: { type: ShadingType.CLEAR, color: BRAND_BLUE, fill: BRAND_BLUE },
        margins: { top: convertInchesToTwip(0.08), bottom: convertInchesToTwip(0.08), left: convertInchesToTwip(0.12), right: convertInchesToTwip(0.12) },
      }),
      new TableCell({
        children: [new Paragraph({ children: [new TextRun({ text: "Selected Technology", bold: true, font: "Calibri", size: 20, color: "FFFFFF" })] })],
        width: { size: 25, type: WidthType.PERCENTAGE },
        shading: { type: ShadingType.CLEAR, color: BRAND_BLUE, fill: BRAND_BLUE },
        margins: { top: convertInchesToTwip(0.08), bottom: convertInchesToTwip(0.08), left: convertInchesToTwip(0.12), right: convertInchesToTwip(0.12) },
      }),
      new TableCell({
        children: [new Paragraph({ children: [new TextRun({ text: "Engineering Justification (Why Chosen)", bold: true, font: "Calibri", size: 20, color: "FFFFFF" })] })],
        width: { size: 50, type: WidthType.PERCENTAGE },
        shading: { type: ShadingType.CLEAR, color: BRAND_BLUE, fill: BRAND_BLUE },
        margins: { top: convertInchesToTwip(0.08), bottom: convertInchesToTwip(0.08), left: convertInchesToTwip(0.12), right: convertInchesToTwip(0.12) },
      }),
    ],
    tableHeader: true,
  });

  const dataRows = techStack.map((row, i) =>
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph({ children: [new TextRun({ text: row.component, font: "Calibri", size: 20, bold: true })] })],
          shading: i % 2 === 0
            ? { type: ShadingType.CLEAR, color: "F8FAFC", fill: "F8FAFC" }
            : { type: ShadingType.CLEAR, color: "FFFFFF", fill: "FFFFFF" },
          margins: { top: convertInchesToTwip(0.06), bottom: convertInchesToTwip(0.06), left: convertInchesToTwip(0.12), right: convertInchesToTwip(0.12) },
        }),
        new TableCell({
          children: [new Paragraph({ children: [new TextRun({ text: row.tool, bold: true, font: "Calibri", size: 20, color: BRAND_ACCENT })] })],
          shading: i % 2 === 0
            ? { type: ShadingType.CLEAR, color: "F8FAFC", fill: "F8FAFC" }
            : { type: ShadingType.CLEAR, color: "FFFFFF", fill: "FFFFFF" },
          margins: { top: convertInchesToTwip(0.06), bottom: convertInchesToTwip(0.06), left: convertInchesToTwip(0.12), right: convertInchesToTwip(0.12) },
        }),
        new TableCell({
          children: [new Paragraph({ children: [new TextRun({ text: row.reason, font: "Calibri", size: 19 })] })],
          shading: i % 2 === 0
            ? { type: ShadingType.CLEAR, color: "F8FAFC", fill: "F8FAFC" }
            : { type: ShadingType.CLEAR, color: "FFFFFF", fill: "FFFFFF" },
          margins: { top: convertInchesToTwip(0.06), bottom: convertInchesToTwip(0.06), left: convertInchesToTwip(0.12), right: convertInchesToTwip(0.12) },
        }),
      ],
    })
  );

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [headerRow, ...dataRows],
  });
}

// ─── Master Prompt Generator ─────────────────────────────────────────────────
function generateMasterPromptText(blueprint: FullBlueprint): string {
  const objectives = blueprint.objectives.map(o => `  • ${o}`).join("\n");
  const stack = blueprint.techStack.map(t => `  • ${t.component}: ${t.tool} — Reason: ${t.reason}`).join("\n");

  return `Act as a Senior Principal Software Architect and IIT/NIT Project Evaluation Committee Member.

Build a complete, 100% production-ready, functional codebase for the following project:

PROJECT NAME: "${blueprint.title}"
DISCIPLINE: ${blueprint.category}
ESTIMATED DIFFICULTY: ${blueprint.difficulty}/5
DATASET TO EMULATE/LOAD: ${blueprint.dataset.name}

PROJECT OBJECTIVES:
${objectives}

RECOMMENDED ARCHITECTURE & TECH STACK:
${stack}

TECHNICAL ARCHITECTURE & FLOW:
${blueprint.architectureExplanation}

DELIVERABLE INSTRUCTIONS FOR THE AI:
1. Directory Structure: Output a clean, modular project folder layout separating backend APIs, frontend UI, data ingestion, and models.
2. Full Working Logic: Provide complete, functional files. Do NOT omit logic or leave placeholders like "// implement here".
3. Standalone Mock Data Generator: Include a self-contained script (e.g., generate_data.py or seed.ts) that creates realistic synthetic data matching the real dataset schema so the application runs immediately on first launch.
4. Clean Web Dashboard: Implement a modern, responsive web dashboard with dark-mode aesthetic, live status cards, and real-time inference/demonstration view.
5. Automated Test Suite: Write unit tests verifying core algorithms, input sanitization, and output accuracy.
6. Setup Instructions: Include a complete README.md with exact setup commands (pip install / npm install), environment variables, and a step-by-step viva demo checklist.`;
}

// ─── Master Prompt Display Box (Dark IDE Styled) ─────────────────────────────
function renderMasterPromptBox(promptText: string): Table {
  const lines = promptText.split("\n");
  const paragraphs: Paragraph[] = lines.map(line =>
    new Paragraph({
      children: [
        new TextRun({
          text: line || " ",
          font: "Courier New",
          size: 17,
          color: PROMPT_TEXT,
        }),
      ],
      spacing: { before: 15, after: 15 },
      indent: { left: convertInchesToTwip(0.15), right: convertInchesToTwip(0.15) },
    })
  );

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: "📋 SUBMITKIT MASTER PROMPT — COPY & PASTE INTO ANTIGRAVITY / AI", bold: true, size: 18, color: "60A5FA", font: "Courier New" }),
                ],
                spacing: { before: 60, after: 60 },
                indent: { left: convertInchesToTwip(0.15) },
              }),
              ...paragraphs,
            ],
            shading: { type: ShadingType.CLEAR, color: PROMPT_BG, fill: PROMPT_BG },
            margins: {
              top: convertInchesToTwip(0.15),
              bottom: convertInchesToTwip(0.15),
              left: convertInchesToTwip(0.2),
              right: convertInchesToTwip(0.2),
            },
            borders: {
              left: { color: BRAND_ACCENT, size: 24, style: BorderStyle.SINGLE },
              top: { color: "1E293B", size: 6, style: BorderStyle.SINGLE },
              right: { color: "1E293B", size: 6, style: BorderStyle.SINGLE },
              bottom: { color: "1E293B", size: 6, style: BorderStyle.SINGLE },
            },
          }),
        ],
      }),
    ],
  });
}

// ─── Conceptual Baby-Step Derivation (Zero Code Dumps) ─────────────────────────
function deriveConceptualBabySteps(step: BuildStep): string[] {
  const t = step.title.toLowerCase();

  if (t.includes("install") || t.includes("environment") || t.includes("setup")) {
    return [
      "Initialize an isolated virtual environment (venv or conda) to prevent conflicting dependency versions across project packages.",
      "Install the foundational runtime libraries and verify that hardware acceleration (CUDA/Metal if available) is recognized by the compiler.",
      "Establish the root project directory structure with designated folders for /data, /models, /src, and /tests.",
      "Verify environment readiness by checking module version hashes against documented compatibility matrices."
    ];
  }

  if (t.includes("dataset") || t.includes("collect") || t.includes("photo") || t.includes("ingest")) {
    return [
      "Obtain raw data samples across balanced representative classes, ensuring sufficient intra-class variation (lighting, angle, noise).",
      "Apply spatial normalization: resize images to uniform dimensions, crop irrelevant background margins, and center the region of interest.",
      "Generate feature encodings or numerical embeddings (e.g. 128-dimensional vectors) that mathematically represent each sample uniquely.",
      "Store precomputed encodings into a persistent indexed file or database for rapid sub-millisecond retrieval during inference."
    ];
  }

  if (t.includes("engine") || t.includes("recognition") || t.includes("model") || t.includes("train")) {
    return [
      "Establish the input feed capture pipeline (webcam frame buffer or real-time network stream) operating at a stable sampling frequency.",
      "Execute the detection stage: scan each frame using spatial sliding filters or bounding-box anchors to locate target entities.",
      "Compare detected live vectors against stored baseline vectors using distance metric calculation (Euclidean L2 or Cosine Similarity).",
      "Apply confidence threshold filtering: classifications below the calibrated threshold are safely categorized as 'Unknown' to prevent false positives."
    ];
  }

  if (t.includes("web") || t.includes("flask") || t.includes("interface") || t.includes("ui") || t.includes("api")) {
    return [
      "Configure RESTful API endpoints or WebSocket channels to bridge the core algorithmic engine with the presentation client.",
      "Design database schema tables with relational foreign keys, timestamps, and indexing on frequently queried columns.",
      "Implement a clean, high-contrast user interface displaying live status cards, operational metrics, and export capabilities.",
      "Test client-server round-trip latency ensuring UI updates render within 50 milliseconds of backend event emission."
    ];
  }

  if (t.includes("test") || t.includes("edge") || t.includes("duplicate") || t.includes("verify")) {
    return [
      "Formulate challenging test fixtures: occluded inputs, low-light conditions, extreme angles, and corrupted payloads.",
      "Implement defensive deduplication logic (e.g., date-scoped sets or cooldown timers) so events cannot trigger duplicate writes within a session.",
      "Measure quantitative evaluation metrics: Accuracy, Precision, Recall, F1-Score, and average inference latency per transaction.",
      "Log unhandled edge cases into an error tracking registry to iteratively refine decision boundary thresholds."
    ];
  }

  return [
    `Architectural Initialization: Set up the core computational module for ${step.title.toLowerCase()} with proper configuration parameters.`,
    `Data Transformation Pipeline: Process inputs through sequential mathematical stages, ensuring invalid values are intercepted before execution.`,
    `State Management & Execution: Execute the step's primary logic while maintaining transactional integrity and thread safety.`,
    `Verification & Milestone Sign-off: Verify that the intermediate output satisfies acceptance criteria before handing off to the next stage.`
  ];
}

// ─── Render Step in Theory & Baby Steps ───────────────────────────────────────
function renderStepBabySteps(step: BuildStep): Paragraph[] {
  const paragraphs: Paragraph[] = [];

  paragraphs.push(
    new Paragraph({
      children: [
        new TextRun({
          text: `Step ${step.step}: ${step.title}`,
          bold: true,
          size: 22,
          color: BRAND_BLUE,
          font: "Calibri",
        }),
        new TextRun({
          text: `  [Estimated Duration: ${step.duration}]`,
          size: 19,
          color: TEXT_MUTED,
          italics: true,
          font: "Calibri",
        }),
      ],
      spacing: { before: 180, after: 60 },
      border: { bottom: { color: "E2E8F0", size: 4, space: 4, style: BorderStyle.SINGLE } },
    })
  );

  // Core Concept & Mechanism
  paragraphs.push(
    new Paragraph({
      children: [
        new TextRun({ text: "The Architectural Concept: ", bold: true, size: 21, color: TEXT_DARK, font: "Calibri" }),
        new TextRun({ text: step.description, size: 21, color: TEXT_DARK, font: "Calibri" }),
      ],
      spacing: { before: 40, after: 60 },
      alignment: AlignmentType.JUSTIFIED,
    })
  );

  // Baby-Step Walkthrough
  paragraphs.push(
    new Paragraph({
      children: [new TextRun({ text: "Baby-Step Conceptual Workflow (How to build it):", bold: true, size: 20, color: BRAND_ACCENT, font: "Calibri" })],
      spacing: { before: 60, after: 30 },
    })
  );

  const babySteps = deriveConceptualBabySteps(step);
  for (const bs of babySteps) {
    paragraphs.push(bulletPoint("", bs));
  }

  // Setup Commands (if any)
  if (step.commands && step.commands.length > 0) {
    paragraphs.push(
      new Paragraph({
        children: [new TextRun({ text: "Environment Setup Commands:", bold: true, size: 19, color: TEXT_MUTED, font: "Calibri" })],
        spacing: { before: 60, after: 30 },
      })
    );
    for (const cmd of step.commands) {
      paragraphs.push(
        new Paragraph({
          children: [new TextRun({ text: "$ " + cmd, font: "Courier New", size: 18, color: "1E293B" })],
          shading: { type: ShadingType.CLEAR, color: "F1F5F9", fill: "F1F5F9" },
          spacing: { before: 15, after: 15 },
          indent: { left: convertInchesToTwip(0.2) },
        })
      );
    }
  }

  // Milestone Verification Check
  paragraphs.push(
    new Paragraph({
      children: [
        new TextRun({ text: "✓ Milestone Verification: ", bold: true, size: 20, font: "Calibri", color: GREEN_TEXT }),
        new TextRun({ text: step.expectedOutput, size: 20, font: "Calibri", color: TEXT_DARK }),
      ],
      spacing: { before: 60, after: 120 },
      shading: { type: ShadingType.CLEAR, color: GREEN_BG, fill: GREEN_BG },
      indent: { left: convertInchesToTwip(0.1), right: convertInchesToTwip(0.1) },
    })
  );

  return paragraphs;
}

// ─── MAIN BLUEPRINT DOCX GENERATOR ───────────────────────────────────────────
export async function generateBlueprintDocx(
  blueprint: FullBlueprint,
  studentEmail: string
): Promise<Buffer> {
  const today = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const docId = `SK-BP-${new Date().getFullYear()}-${Math.floor(Math.random() * 90000) + 10000}`;
  const masterPromptText = generateMasterPromptText(blueprint);

  const headerEl = new Header({
    children: [
      new Paragraph({
        children: [
          new TextRun({ text: "SUBMITKIT PROJECT BLUEPRINT", bold: true, font: "Calibri", size: 18, color: BRAND_BLUE }),
          new TextRun({ text: "  •  " + blueprint.title, font: "Calibri", size: 18, color: TEXT_MUTED }),
        ],
        alignment: AlignmentType.LEFT,
        border: {
          bottom: { color: BRAND_ACCENT, size: 4, space: 4, style: BorderStyle.SINGLE },
        },
      }),
    ],
  });

  const footerEl = new Footer({
    children: [
      new Paragraph({
        children: [
          new TextRun({ text: "© SubmitKit Intelligence  •  submitkit.in  •  Doc ID: " + docId + "  •  Page ", font: "Calibri", size: 18, color: TEXT_MUTED }),
          new TextRun({ children: [PageNumber.CURRENT], font: "Calibri", size: 18, color: TEXT_MUTED, bold: true }),
        ],
        alignment: AlignmentType.CENTER,
        border: {
          top: { color: BORDER_LIGHT, size: 4, space: 4, style: BorderStyle.SINGLE },
        },
      }),
    ],
  });

  const doc = new Document({
    title: `SubmitKit Blueprint: ${blueprint.title}`,
    description: `Official engineering capstone blueprint for ${blueprint.title}`,
    styles: {
      paragraphStyles: [
        {
          id: "Normal",
          name: "Normal",
          run: { font: "Calibri", size: 21 },
        },
      ],
    },
    sections: [
      {
        headers: { default: headerEl },
        footers: { default: footerEl },
        properties: {
          page: {
            margin: {
              top: convertInchesToTwip(0.8),
              bottom: convertInchesToTwip(0.8),
              left: convertInchesToTwip(1.0),
              right: convertInchesToTwip(1.0),
            },
          },
        },
        children: [

          // ══════════════════════════════════════════════════════════════════
          // COVER PAGE & EXECUTIVE DOSSIER
          // ══════════════════════════════════════════════════════════════════
          new Paragraph({
            children: [
              new TextRun({
                text: "SUBMITKIT",
                bold: true,
                size: 44,
                color: BRAND_BLUE,
                font: "Calibri",
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { before: 300, after: 40 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "PROJECT INTELLIGENCE DOSSIER",
                bold: true,
                size: 20,
                color: BRAND_ACCENT,
                font: "Calibri",
              }),
              new TextRun({
                text: "  |  ACADEMIC & INDUSTRY DEFENSE BLUEPRINT",
                size: 18,
                color: TEXT_MUTED,
                font: "Calibri",
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 300 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: blueprint.title,
                bold: true,
                size: 34,
                color: BRAND_BLUE,
                font: "Calibri",
              }),
            ],
            alignment: AlignmentType.CENTER,
            border: {
              top: { color: BRAND_ACCENT, size: 8, space: 6, style: BorderStyle.SINGLE },
              bottom: { color: BRAND_ACCENT, size: 8, space: 6, style: BorderStyle.SINGLE },
            },
            spacing: { before: 180, after: 260 },
          }),

          // Metadata Grid
          labelRow("Authorized Student Licensee", studentEmail),
          labelRow("Academic Discipline & Category", blueprint.category),
          labelRow("Project Complexity Rating", "★".repeat(blueprint.difficulty) + "☆".repeat(5 - blueprint.difficulty) + ` (${blueprint.difficulty}/5 - Advanced Capstone)`),
          labelRow("Recommended Implementation Timeline", blueprint.buildTimeDays),
          labelRow("Blueprint Authentication ID", docId),
          labelRow("Date of Generation", today),

          emptyLine(),
          calloutCard(
            "Executive Summary & Quality Guarantee",
            "This blueprint contains the complete intellectual and engineering foundation required to construct, understand, and successfully defend this capstone project before university examination committees. It provides full theoretical baby steps, data pipelines, architecture specifications, a zero-coding Antigravity Master Prompt, and 15 examiner-grade viva defense analyses.",
            BRAND_ACCENT,
            BRAND_LIGHT
          ),

          // Clean break to begin official technical sections
          new Paragraph({ children: [new PageBreak()] }),

          // ══════════════════════════════════════════════════════════════════
          // SECTION 1: PROJECT OVERVIEW & REAL-WORLD INDUSTRY CONTEXT
          // ══════════════════════════════════════════════════════════════════
          sectionHeading("1. Project Overview & Industrial Context"),
          subHeading("What This System Accomplishes"),
          bodyText(blueprint.whatItDoes),
          emptyLine(),
          subHeading("Where This Technology Is Deployed in Industry"),
          bodyText(blueprint.realWorldUse),
          emptyLine(),
          calloutCard(
            "Why Examiners Respect This Project Topic",
            "Unlike outdated generic college projects (e.g. basic hospital or library portals), this topic tackles active contemporary engineering challenges. Examiners evaluate whether you understand computational trade-offs, dataset limitations, and edge-case handling.",
            AMBER_BORDER,
            AMBER_BG
          ),

          // ══════════════════════════════════════════════════════════════════
          // SECTION 2: IEEE-GRADE PROBLEM STATEMENT & OBJECTIVES
          // ══════════════════════════════════════════════════════════════════
          sectionHeading("2. Problem Statement & Measurable Objectives"),
          subHeading("Formal Problem Statement"),
          bodyText(blueprint.problemStatement),
          emptyLine(),
          subHeading("SMART Academic Objectives"),
          bodyText("The project is structured around the following quantifiable engineering deliverables:"),
          ...blueprint.objectives.map(obj => bulletPoint("Objective", obj)),

          // ══════════════════════════════════════════════════════════════════
          // SECTION 3: DATASET SPECIFICATION & INGESTION
          // ══════════════════════════════════════════════════════════════════
          sectionHeading("3. Dataset Specification & Data Pipeline"),
          labelRow("Benchmark Dataset Name", blueprint.dataset.name),
          labelRow("Storage Footprint & Partitioning", blueprint.dataset.size),
          labelRow("Payload Data Format", blueprint.dataset.format),
          labelRow("Primary Open Repository", blueprint.dataset.url),
          labelRow("Secondary Mirror Repository", blueprint.dataset.backupUrl),
          emptyLine(),
          subHeading("Dataset Schema & Ingestion Characteristics"),
          bodyText(blueprint.dataset.description),
          emptyLine(),
          calloutCard(
            "Data Preprocessing & Hygiene Rule",
            "Always partition the data strictly into 80% Training and 20% Testing sets BEFORE feature scaling. Never scale the entire dataset at once, as that creates 'data leakage' — an immediate red flag that external examiners look for during evaluation.",
            GREEN_BORDER,
            GREEN_BG
          ),

          // ══════════════════════════════════════════════════════════════════
          // SECTION 4: SYSTEM ARCHITECTURE & DATA FLOW
          // ══════════════════════════════════════════════════════════════════
          sectionHeading("4. System Architecture & End-to-End Pipeline"),
          subHeading("Stage-by-Stage Data Flow Explanation"),
          bodyText(blueprint.architectureExplanation),
          emptyLine(),
          subHeading("High-Level Pipeline Schematic"),
          new Paragraph({
            children: [
              new TextRun({
                text: blueprint.architectureDiagram,
                font: "Courier New",
                size: 18,
                color: "1E293B",
              }),
            ],
            shading: { type: ShadingType.CLEAR, color: "F1F5F9", fill: "F1F5F9" },
            spacing: { before: 60, after: 60 },
            indent: { left: convertInchesToTwip(0.2), right: convertInchesToTwip(0.2) },
          }),

          // ══════════════════════════════════════════════════════════════════
          // SECTION 5: TECHNOLOGY STACK & ARCHITECTURAL RATIONALES
          // ══════════════════════════════════════════════════════════════════
          sectionHeading("5. Technology Stack & Architectural Decisions"),
          bodyText("Every dependency in this architecture was selected specifically to maximize stability, reproducibility, and defensibility in front of technical evaluators:"),
          emptyLine(),
          techStackTable(blueprint.techStack),

          // Page break before the No-Code Master Prompt & Build Guide
          new Paragraph({ children: [new PageBreak()] }),

          // ══════════════════════════════════════════════════════════════════
          // SECTION 6: BUILD COMPLETE PROJECT IN ONE PROMPT (ANTIGRAVITY)
          // ══════════════════════════════════════════════════════════════════
          sectionHeading(
            canBuildOnAntigravity(blueprint)
              ? "6. Make This Complete Project in ONE Prompt with Antigravity AI (Zero Coding Required)"
              : "6. Build Complete Software & Simulation in ONE Prompt with Antigravity AI"
          ),
          calloutCard(
            canBuildOnAntigravity(blueprint)
              ? "⚡ 100% BUILDABLE IN ANTIGRAVITY WITHOUT CODING — ONE SINGLE PROMPT"
              : "⚡ 100% SOFTWARE & SIMULATION IN ONE PROMPT",
            "Save 40+ hours of tedious manual coding and environment setup! You do not need to write thousands of lines of code from scratch. Simply copy the Master Prompt below, paste it into Antigravity AI, and get the complete working project, synthetic data generator, core models, and responsive web dashboard generated in under 10 minutes.",
            BRAND_ACCENT,
            BRAND_LIGHT
          ),
          emptyLine(),
          subHeading("How to Build This Entire Project in 3 Easy Steps:"),
          bulletPoint("Step 1 (Open Antigravity)", "Launch Antigravity AI in an empty project folder."),
          bulletPoint("Step 2 (Paste Master Prompt)", "Copy the engineered prompt provided below and paste it into the agent chat window. The AI will scaffold all directories, generate synthetic sample data, write clean modular logic, and build a live web interface."),
          bulletPoint("Step 3 (Launch Live in 2 Commands)", "Run `pip install -r requirements.txt` (or `npm install`) followed by `python app.py`. Open http://localhost:5000 in your browser to view your live, interactive system ready for your college demo!"),
          emptyLine(),

          // Master Prompt Card
          renderMasterPromptBox(masterPromptText),
          emptyLine(),

          calloutCard(
            "💡 Base MVP Foundation & Your Creative Freedom",
            "NOTE: This Master Prompt delivers a 100% functional, end-to-end Base MVP (Minimum Viable Product) of your project right out of the box. Treat this as your solid operational launchpad! As per your personal creativity and college project guidelines, you can freely update, refine, and customize the system (e.g. asking the AI: 'Now add real-time Excel export', 'Change the dashboard theme', or 'Integrate cloud authentication'). You have complete freedom to expand it as far as you wish.",
            AMBER_BORDER,
            AMBER_BG
          ),
          emptyLine(),

          // ══════════════════════════════════════════════════════════════════
          // SECTION 7: STEP-BY-STEP CONCEPTUAL BUILD GUIDE (BABY STEPS)
          // ══════════════════════════════════════════════════════════════════
          sectionHeading("7. Step-by-Step Conceptual Build Guide (Baby Steps — Pure Theory)"),
          bodyText(
            "If you want to understand how each piece works under the hood (or if your examiner asks you to explain the build stages on a whiteboard), study these baby steps. They explain the pure engineering theory, data transformations, and decision logic — without confusing code clutter."
          ),
          emptyLine(),
          ...blueprint.buildSteps.flatMap((step) => renderStepBabySteps(step)),

          // Clean break before Core Engineering Concepts
          new Paragraph({ children: [new PageBreak()] }),

          // ══════════════════════════════════════════════════════════════════
          // SECTION 8: CORE ENGINEERING CONCEPTS & SYSTEM DEFENSE
          // ══════════════════════════════════════════════════════════════════
          sectionHeading("8. Core Engineering Concepts & Defense Mastery (Easy to Understand)"),
          bodyText(
            "You do not need to memorize complicated exam questions or recite textbook definitions. External evaluators look for clear, intuitive understanding of your system's architecture and trade-offs. Here is the plain-English breakdown of every core concept that powers this project:"
          ),
          emptyLine(),
          ...blueprint.vivaQA.flatMap((qa, i) => {
            const cleanTitle = qa.question
              .replace(/\?$/, "")
              .replace(/^(What is the|What is|Why did you choose|Why use|How does the|How does|Can you explain|What happens if|How would you handle|How do you)\s+/i, "")
              .trim();
            const conceptHeader = `Key Concept ${i + 1}: ${cleanTitle.charAt(0).toUpperCase() + cleanTitle.slice(1)}`;

            return [
              new Paragraph({
                children: [
                  new TextRun({
                    text: conceptHeader,
                    bold: true,
                    size: 21,
                    color: BRAND_BLUE,
                    font: "Calibri",
                  }),
                ],
                spacing: { before: 160, after: 40 },
                border: { bottom: { color: BORDER_LIGHT, size: 4, space: 2, style: BorderStyle.SINGLE } },
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: "✓ Plain-English Explanation: ", bold: true, size: 20, color: GREEN_TEXT, font: "Calibri" }),
                  new TextRun({ text: qa.perfectAnswer, size: 20, color: TEXT_DARK, font: "Calibri" }),
                ],
                spacing: { before: 30, after: 40 },
                shading: { type: ShadingType.CLEAR, color: GREEN_BG, fill: GREEN_BG },
                indent: { left: convertInchesToTwip(0.1), right: convertInchesToTwip(0.1) },
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: "Why This Matters in the Architecture: ", bold: true, italics: true, size: 19, color: TEXT_MUTED, font: "Calibri" }),
                  new TextRun({ text: qa.whyAsked, italics: true, size: 19, color: TEXT_MUTED, font: "Calibri" }),
                ],
                spacing: { before: 30, after: 40 },
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: "💡 Evaluator Scoring Edge & Key Insight: ", bold: true, size: 20, color: AMBER_TEXT, font: "Calibri" }),
                  new TextRun({
                    text: qa.avoidSaying.replace(/^(Do not say\s*"?|Trap:\s*"?)/i, "Always emphasize that: "),
                    size: 20,
                    color: TEXT_DARK,
                    font: "Calibri",
                    italics: true,
                  }),
                ],
                spacing: { before: 30, after: 120 },
                shading: { type: ShadingType.CLEAR, color: AMBER_BG, fill: AMBER_BG },
                indent: { left: convertInchesToTwip(0.1), right: convertInchesToTwip(0.1) },
              }),
            ];
          }),

          // ══════════════════════════════════════════════════════════════════
          // SECTION 9: FREE DEPLOYMENT & CAREER LAUNCHPAD
          // ══════════════════════════════════════════════════════════════════
          sectionHeading("9. Cloud Deployment & Career Launchpad"),
          subHeading("Free Live Cloud Deployment (Render / Vercel / Hugging Face)"),
          bodyText("Deploy your application to a live public URL so your examiner can interact with it on their own smartphone:"),
          ...blueprint.deploymentGuide.trim().split("\n").map(line => bodyText(line || " ")),
          emptyLine(),

          subHeading("ATS-Optimized Resume Bullet Points (Google XYZ Format)"),
          bodyText("Add these high-impact, quantified bullet points directly to your CV under 'Technical Projects':"),
          ...blueprint.resumeBullets.map(b => bulletPoint("Accomplishment", b)),
          emptyLine(),

          subHeading("LinkedIn Post Announcement Template"),
          bodyText("Copy and publish this narrative once your project submission is complete:"),
          new Paragraph({
            children: [
              new TextRun({
                text: blueprint.linkedinPost,
                font: "Calibri",
                size: 19,
                color: TEXT_DARK,
                italics: true,
              }),
            ],
            shading: { type: ShadingType.CLEAR, color: "F8FAFC", fill: "F8FAFC" },
            spacing: { before: 40, after: 80 },
            indent: { left: convertInchesToTwip(0.2), right: convertInchesToTwip(0.2) },
          }),

          // Back Cover
          emptyLine(),
          new Paragraph({
            children: [
              new TextRun({ text: "SUBMITKIT INTELLIGENCE  •  THE ₹19 ADVANTAGE", bold: true, size: 22, color: BRAND_BLUE, font: "Calibri" }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { before: 200, after: 30 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "submitkit.in  •  Engineered exclusively for " + studentEmail, size: 19, color: TEXT_MUTED, font: "Calibri" }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 100 },
          }),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  return Buffer.from(buffer);
}
