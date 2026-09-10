/**
 * Blueprint PDF Generator
 * Generates an official, branded SubmitKit blueprint PDF using the `docx` library.
 * Uses the same docx package already installed for IEEE report generation.
 *
 * Language rule: Simple English. Max 15 words per sentence. No jargon without explanation.
 */

import {
  Document, Packer, Paragraph, TextRun, HeadingLevel,
  AlignmentType, PageBreak, Table, TableRow, TableCell,
  WidthType, BorderStyle, Footer, PageNumber, Header,
  ShadingType, convertInchesToTwip,
} from "docx";
import { FullBlueprint } from "./blueprint-engine";

// ─── Brand Colors & Styles ──────────────────────────────────────────────────
const BRAND_BLUE = "1E3A8A";
const BRAND_LIGHT = "EFF6FF";
const BRAND_ACCENT = "3B82F6";
const TEXT_DARK = "111827";
const TEXT_GRAY = "6B7280";
const RED_BG = "FEF2F2";
const RED_TEXT = "DC2626";

// ─── Helper: Make a heading paragraph ───────────────────────────────────────
function sectionHeading(text: string): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({
        text,
        bold: true,
        size: 28,
        color: BRAND_BLUE,
        font: "Calibri",
      }),
    ],
    spacing: { before: 400, after: 160 },
    border: {
      bottom: { color: BRAND_ACCENT, size: 6, space: 4, style: BorderStyle.SINGLE },
    },
  });
}

function subHeading(text: string): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({
        text,
        bold: true,
        size: 24,
        color: TEXT_DARK,
        font: "Calibri",
      }),
    ],
    spacing: { before: 240, after: 80 },
  });
}

function bodyText(text: string, opts?: { italic?: boolean; color?: string }): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({
        text,
        size: 22,
        color: opts?.color ?? TEXT_DARK,
        italics: opts?.italic ?? false,
        font: "Calibri",
      }),
    ],
    spacing: { before: 80, after: 80 },
    alignment: AlignmentType.JUSTIFIED,
  });
}

function bulletPoint(text: string): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({ text: "• " + text, size: 22, font: "Calibri", color: TEXT_DARK }),
    ],
    spacing: { before: 60, after: 60 },
    indent: { left: convertInchesToTwip(0.3) },
  });
}

function labelRow(label: string, value: string): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({ text: label + ": ", bold: true, size: 22, color: TEXT_GRAY, font: "Calibri" }),
      new TextRun({ text: value, size: 22, color: TEXT_DARK, font: "Calibri" }),
    ],
    spacing: { before: 60, after: 60 },
  });
}

function codeBlock(code: string): Paragraph[] {
  const lines = code.trim().split("\n");
  return lines.map(line =>
    new Paragraph({
      children: [new TextRun({ text: line, font: "Courier New", size: 18, color: "1E293B" })],
      shading: { type: ShadingType.CLEAR, color: "F1F5F9", fill: "F1F5F9" },
      spacing: { before: 20, after: 20 },
      indent: { left: convertInchesToTwip(0.3), right: convertInchesToTwip(0.3) },
    })
  );
}

function emptyLine(): Paragraph {
  return new Paragraph({ text: "", spacing: { before: 60, after: 60 } });
}

// ─── Tech stack table ───────────────────────────────────────────────────────
function techStackTable(techStack: FullBlueprint["techStack"]): Table {
  const headerRow = new TableRow({
    children: [
      new TableCell({
        children: [new Paragraph({ children: [new TextRun({ text: "Component", bold: true, font: "Calibri", size: 20, color: "FFFFFF" })] })],
        width: { size: 25, type: WidthType.PERCENTAGE },
        shading: { type: ShadingType.CLEAR, color: BRAND_BLUE, fill: BRAND_BLUE },
      }),
      new TableCell({
        children: [new Paragraph({ children: [new TextRun({ text: "Technology", bold: true, font: "Calibri", size: 20, color: "FFFFFF" })] })],
        width: { size: 25, type: WidthType.PERCENTAGE },
        shading: { type: ShadingType.CLEAR, color: BRAND_BLUE, fill: BRAND_BLUE },
      }),
      new TableCell({
        children: [new Paragraph({ children: [new TextRun({ text: "Why We Chose It", bold: true, font: "Calibri", size: 20, color: "FFFFFF" })] })],
        width: { size: 50, type: WidthType.PERCENTAGE },
        shading: { type: ShadingType.CLEAR, color: BRAND_BLUE, fill: BRAND_BLUE },
      }),
    ],
    tableHeader: true,
  });

  const dataRows = techStack.map((row, i) =>
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph({ children: [new TextRun({ text: row.component, font: "Calibri", size: 20 })] })],
          shading: i % 2 === 0
            ? { type: ShadingType.CLEAR, color: "F8FAFC", fill: "F8FAFC" }
            : { type: ShadingType.CLEAR, color: "FFFFFF", fill: "FFFFFF" },
        }),
        new TableCell({
          children: [new Paragraph({ children: [new TextRun({ text: row.tool, bold: true, font: "Calibri", size: 20 })] })],
          shading: i % 2 === 0
            ? { type: ShadingType.CLEAR, color: "F8FAFC", fill: "F8FAFC" }
            : { type: ShadingType.CLEAR, color: "FFFFFF", fill: "FFFFFF" },
        }),
        new TableCell({
          children: [new Paragraph({ children: [new TextRun({ text: row.reason, font: "Calibri", size: 20 })] })],
          shading: i % 2 === 0
            ? { type: ShadingType.CLEAR, color: "F8FAFC", fill: "F8FAFC" }
            : { type: ShadingType.CLEAR, color: "FFFFFF", fill: "FFFFFF" },
        }),
      ],
    })
  );

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [headerRow, ...dataRows],
  });
}

// ─── MAIN GENERATOR ─────────────────────────────────────────────────────────
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

  const headerEl = new Header({
    children: [
      new Paragraph({
        children: [
          new TextRun({ text: "SubmitKit", bold: true, font: "Calibri", size: 20, color: BRAND_BLUE }),
          new TextRun({ text: "  |  " + blueprint.title, font: "Calibri", size: 20, color: TEXT_GRAY }),
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
          new TextRun({ text: "© SubmitKit 2026 | submitkit.in | ", font: "Calibri", size: 18, color: TEXT_GRAY }),
          new TextRun({ text: "Page ", font: "Calibri", size: 18, color: TEXT_GRAY }),
          new TextRun({ children: [PageNumber.CURRENT], font: "Calibri", size: 18, color: TEXT_GRAY }),
          new TextRun({ text: " | For personal use only.", font: "Calibri", size: 18, color: TEXT_GRAY }),
        ],
        alignment: AlignmentType.CENTER,
        border: {
          top: { color: BRAND_ACCENT, size: 4, space: 4, style: BorderStyle.SINGLE },
        },
      }),
    ],
  });

  const doc = new Document({
    title: `SubmitKit Blueprint: ${blueprint.title}`,
    description: `Official project blueprint for ${blueprint.title}`,
    styles: {
      paragraphStyles: [
        {
          id: "Normal",
          name: "Normal",
          run: { font: "Calibri", size: 22 },
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
              top: convertInchesToTwip(1),
              bottom: convertInchesToTwip(1),
              left: convertInchesToTwip(1.2),
              right: convertInchesToTwip(1.2),
            },
          },
        },
        children: [

          // ── COVER PAGE ──────────────────────────────────────────────────
          new Paragraph({
            children: [new TextRun({ text: "", size: 48 })],
            spacing: { before: 800 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "SUBMITKIT",
                bold: true,
                size: 52,
                color: BRAND_BLUE,
                font: "Calibri",
              }),
            ],
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "submitkit.in",
                size: 24,
                color: TEXT_GRAY,
                font: "Calibri",
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 600 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "PROJECT BLUEPRINT REPORT",
                bold: true,
                size: 36,
                color: TEXT_DARK,
                font: "Calibri",
              }),
            ],
            alignment: AlignmentType.CENTER,
            border: {
              top: { color: BRAND_ACCENT, size: 8, space: 8, style: BorderStyle.SINGLE },
              bottom: { color: BRAND_ACCENT, size: 8, space: 8, style: BorderStyle.SINGLE },
            },
            spacing: { before: 200, after: 200 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: blueprint.title,
                bold: true,
                size: 40,
                color: BRAND_BLUE,
                font: "Calibri",
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { before: 400, after: 600 },
          }),
          labelRow("Prepared for", studentEmail),
          labelRow("Category", blueprint.category),
          labelRow("Difficulty", "★".repeat(blueprint.difficulty) + "☆".repeat(5 - blueprint.difficulty)),
          labelRow("Estimated Build Time", blueprint.buildTimeDays),
          labelRow("Generated on", today),
          labelRow("Document ID", docId),
          new Paragraph({
            children: [
              new TextRun({
                text: "© 2026 SubmitKit | submitkit.in | This document is for personal use only.",
                size: 18,
                color: TEXT_GRAY,
                italics: true,
                font: "Calibri",
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { before: 800 },
          }),
          new Paragraph({ children: [new PageBreak()] }),

          // ── SECTION 1: PROJECT OVERVIEW ──────────────────────────────────
          sectionHeading("1. Project Overview"),
          bodyText(blueprint.whatItDoes),
          emptyLine(),
          subHeading("Real-World Use"),
          bodyText(blueprint.realWorldUse),
          emptyLine(),
          new Paragraph({ children: [new PageBreak()] }),

          // ── SECTION 2: PROBLEM STATEMENT & OBJECTIVES ────────────────────
          sectionHeading("2. Problem Statement & Objectives"),
          subHeading("Problem Statement"),
          bodyText(blueprint.problemStatement),
          emptyLine(),
          subHeading("Project Objectives"),
          ...blueprint.objectives.map(obj => bulletPoint(obj)),
          emptyLine(),
          new Paragraph({ children: [new PageBreak()] }),

          // ── SECTION 3: DATASET ──────────────────────────────────────────
          sectionHeading("3. Dataset & Data Collection"),
          labelRow("Dataset Name", blueprint.dataset.name),
          labelRow("Size", blueprint.dataset.size),
          labelRow("Format", blueprint.dataset.format),
          labelRow("Download Link", blueprint.dataset.url),
          emptyLine(),
          subHeading("What the Data Looks Like"),
          bodyText(blueprint.dataset.description),
          emptyLine(),
          subHeading("Backup Dataset"),
          labelRow("Name", blueprint.dataset.backupDataset),
          labelRow("Link", blueprint.dataset.backupUrl),
          emptyLine(),
          new Paragraph({ children: [new PageBreak()] }),

          // ── SECTION 4: SYSTEM ARCHITECTURE ──────────────────────────────
          sectionHeading("4. System Architecture"),
          subHeading("How the System Works (Step by Step)"),
          bodyText(blueprint.architectureExplanation),
          emptyLine(),
          subHeading("Architecture Diagram"),
          ...codeBlock(blueprint.architectureDiagram),
          emptyLine(),
          new Paragraph({ children: [new PageBreak()] }),

          // ── SECTION 5: TECH STACK ────────────────────────────────────────
          sectionHeading("5. Technology Stack"),
          bodyText("This is what we use to build the project, and why we chose each tool:"),
          emptyLine(),
          techStackTable(blueprint.techStack),
          emptyLine(),
          new Paragraph({ children: [new PageBreak()] }),

          // ── SECTION 6: BUILD GUIDE ───────────────────────────────────────
          sectionHeading("6. Step-by-Step Build Guide"),
          bodyText("Follow these steps in order. Each step tells you what to do, how to do it, and what you should see after."),
          emptyLine(),
          ...blueprint.buildSteps.flatMap((step) => [
            subHeading(`Step ${step.step}: ${step.title}  (⏱ ${step.duration})`),
            bodyText(step.description),
            ...(step.commands.length > 0
              ? [
                  new Paragraph({
                    children: [new TextRun({ text: "Commands to run:", bold: true, size: 20, color: TEXT_GRAY, font: "Calibri" })],
                    spacing: { before: 100, after: 60 },
                  }),
                  ...codeBlock(step.commands.join("\n")),
                ]
              : []),
            ...(step.codeSnippet
              ? [
                  new Paragraph({
                    children: [new TextRun({ text: "Code:", bold: true, size: 20, color: TEXT_GRAY, font: "Calibri" })],
                    spacing: { before: 100, after: 60 },
                  }),
                  ...codeBlock(step.codeSnippet),
                ]
              : []),
            new Paragraph({
              children: [
                new TextRun({ text: "Expected output: ", bold: true, size: 20, font: "Calibri", color: TEXT_GRAY }),
                new TextRun({ text: step.expectedOutput, size: 20, font: "Calibri", color: TEXT_DARK }),
              ],
              spacing: { before: 80, after: 160 },
            }),
          ]),
          new Paragraph({ children: [new PageBreak()] }),

          // ── SECTION 7: VIVA Q&A ──────────────────────────────────────────
          sectionHeading("7. Viva Defense Pack — 15 Questions & Answers"),
          bodyText("These are the actual questions your examiner will ask. Read each answer once. Practice saying it out loud."),
          emptyLine(),
          ...blueprint.vivaQA.flatMap((qa, i) => [
            new Paragraph({
              children: [
                new TextRun({
                  text: `Q${i + 1}. ${qa.question}`,
                  bold: true,
                  size: 22,
                  color: RED_TEXT,
                  font: "Calibri",
                }),
              ],
              spacing: { before: 240, after: 80 },
              shading: { type: ShadingType.CLEAR, color: RED_BG, fill: RED_BG },
            }),
            new Paragraph({
              children: [new TextRun({ text: "Why they ask this: ", bold: true, italics: true, size: 20, color: TEXT_GRAY, font: "Calibri" }),
                         new TextRun({ text: qa.whyAsked, italics: true, size: 20, color: TEXT_GRAY, font: "Calibri" })],
              spacing: { before: 60, after: 80 },
            }),
            new Paragraph({
              children: [new TextRun({ text: "Perfect answer: ", bold: true, size: 20, color: BRAND_BLUE, font: "Calibri" })],
              spacing: { before: 60, after: 40 },
            }),
            bodyText(qa.perfectAnswer),
            new Paragraph({
              children: [new TextRun({ text: "❌ Do NOT say: ", bold: true, size: 20, color: "DC2626", font: "Calibri" }),
                         new TextRun({ text: qa.avoidSaying, size: 20, color: "DC2626", font: "Calibri" })],
              spacing: { before: 60, after: 160 },
            }),
          ]),
          new Paragraph({ children: [new PageBreak()] }),

          // ── SECTION 8: DEPLOYMENT ────────────────────────────────────────
          sectionHeading("8. Free Deployment Guide"),
          ...blueprint.deploymentGuide.trim().split("\n").map(line => bodyText(line || " ")),
          emptyLine(),
          new Paragraph({ children: [new PageBreak()] }),

          // ── SECTION 9: RESUME & LINKEDIN ────────────────────────────────
          sectionHeading("9. Resume & LinkedIn Pack"),
          subHeading("Resume Bullet Points — Copy These Directly"),
          bodyText("Use these exact bullet points in your resume under 'Projects':"),
          ...blueprint.resumeBullets.map(b => bulletPoint(b)),
          emptyLine(),
          subHeading("LinkedIn Post — Post This After Submission"),
          bodyText("Copy this post and share on LinkedIn. Tag SubmitKit for a re-share."),
          ...codeBlock(blueprint.linkedinPost),
          emptyLine(),
          subHeading("GitHub README Template"),
          ...codeBlock(blueprint.githubReadmeTemplate),
          emptyLine(),

          // ── BACK COVER ──────────────────────────────────────────────────
          new Paragraph({ children: [new PageBreak()] }),
          new Paragraph({
            children: [
              new TextRun({ text: "Made with ❤️ by SubmitKit", bold: true, size: 28, color: BRAND_BLUE, font: "Calibri" }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { before: 800 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "submitkit.in", size: 24, color: BRAND_ACCENT, font: "Calibri" }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "This document was generated exclusively for: " + studentEmail,
                size: 20,
                color: TEXT_GRAY,
                italics: true,
                font: "Calibri",
              }),
            ],
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Document ID: ${docId}  |  Generated: ${today}`,
                size: 18,
                color: TEXT_GRAY,
                font: "Calibri",
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { before: 80 },
          }),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  return Buffer.from(buffer);
}
