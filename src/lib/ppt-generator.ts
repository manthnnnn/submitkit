/**
 * Premium PPT Generator
 * Generates a professional PowerPoint presentation using pptxgenjs.
 * Student name appears on slide 1 ONLY when personalization is purchased.
 */

import PptxGenJS from 'pptxgenjs';
import { getProjectContent } from './project-content';

export interface PptOptions {
  projectSlug:   string;
  studentName?:  string;   // only when has_personalization = true
  rollNumber?:   string;
  guideName?:    string;
  collegeName?:  string;
}

// ── Design tokens ────────────────────────────────────────────────────────────
const NAVY    = '0F172A';
const BLUE    = '6366F1';
const LIGHT   = 'E2E8F0';
const WHITE   = 'FFFFFF';
const ACCENT  = '34D399';
const MUTED   = '94A3B8';
const CARD_BG = '1E293B';

export async function generatePPT(opts: PptOptions): Promise<Buffer> {
  const content = getProjectContent(opts.projectSlug);
  const prs = new PptxGenJS();

  prs.layout    = 'LAYOUT_16x9';
  prs.author    = 'SubmitKit Academic Projects';
  prs.title     = content.title;
  prs.subject   = `${content.category} — Final Year Project`;
  prs.company   = 'SubmitKit';

  // ── Slide master ──────────────────────────────────────────────────────────
  prs.defineSlideMaster({
    title: 'MAIN',
    background: { color: NAVY },
    objects: [
      // Bottom bar
      { rect: { x: 0, y: '92%', w: '100%', h: '8%', fill: { color: CARD_BG } } },
      { text: {
        text: `${content.title} | SubmitKit Academic Projects`,
        options: { x: '2%', y: '93%', w: '70%', h: '6%', fontSize: 9, color: MUTED, fontFace: 'Calibri' },
      }},
    ],
    slideNumber: { x: '92%', y: '93%', w: '6%', h: '5%', fontSize: 9, color: MUTED, fontFace: 'Calibri' },
  });

  // ── Slide helpers ─────────────────────────────────────────────────────────
  function addTitleSlide(slide: PptxGenJS.Slide, title: string, subtitle: string) {
    // Background gradient overlay
    slide.addShape(prs.ShapeType.rect, {
      x: 0, y: 0, w: '100%', h: '100%',
      fill: { color: NAVY },
    });
    // Left accent bar
    slide.addShape(prs.ShapeType.rect, {
      x: 0, y: 0, w: '0.8%', h: '100%',
      fill: { color: BLUE },
    });
    // Title
    slide.addText(title, {
      x: '5%', y: '28%', w: '90%', h: '20%',
      fontSize: 36, bold: true, color: WHITE,
      fontFace: 'Calibri', align: 'center',
      breakLine: false,
    });
    // Accent line
    slide.addShape(prs.ShapeType.rect, {
      x: '20%', y: '52%', w: '60%', h: '0.3%',
      fill: { color: BLUE },
    });
    // Subtitle
    slide.addText(subtitle, {
      x: '5%', y: '55%', w: '90%', h: '10%',
      fontSize: 16, color: LIGHT,
      fontFace: 'Calibri', align: 'center',
    });
  }

  function addSectionSlide(slide: PptxGenJS.Slide, title: string, bullets: string[], speakerNote?: string) {
    // Header bar
    slide.addShape(prs.ShapeType.rect, {
      x: 0, y: 0, w: '100%', h: '18%',
      fill: { color: CARD_BG },
    });
    slide.addShape(prs.ShapeType.rect, {
      x: 0, y: 0, w: '100%', h: '0.8%',
      fill: { color: BLUE },
    });

    // Title
    slide.addText(title, {
      x: '3%', y: '2%', w: '94%', h: '14%',
      fontSize: 24, bold: true, color: WHITE,
      fontFace: 'Calibri', valign: 'middle',
    });

    // Bullet points
    if (bullets.length > 0) {
      slide.addText(
        bullets.map((b, i) => ({
          text: b,
          options: {
            bullet: { type: 'bullet', code: '25CF' } as any,
            fontSize: bullets.length > 7 ? 13 : 15,
            color: i === 0 ? ACCENT : LIGHT,
            fontFace: 'Calibri',
            paraSpaceBefore: 4,
          },
        })),
        {
          x: '4%', y: '20%', w: '92%', h: '72%',
          fontFace: 'Calibri', valign: 'top',
        }
      );
    }

    if (speakerNote) {
      slide.addNotes(speakerNote);
    }
  }

  function addTwoColumnSlide(
    slide: PptxGenJS.Slide,
    title: string,
    leftTitle: string, leftItems: string[],
    rightTitle: string, rightItems: string[],
    note?: string,
  ) {
    slide.addShape(prs.ShapeType.rect, { x: 0, y: 0, w: '100%', h: '18%', fill: { color: CARD_BG } });
    slide.addShape(prs.ShapeType.rect, { x: 0, y: 0, w: '100%', h: '0.8%', fill: { color: BLUE } });
    slide.addText(title, {
      x: '3%', y: '2%', w: '94%', h: '14%',
      fontSize: 24, bold: true, color: WHITE, fontFace: 'Calibri', valign: 'middle',
    });

    // Left card
    slide.addShape(prs.ShapeType.roundRect, {
      x: '3%', y: '20%', w: '45%', h: '72%',
      fill: { color: CARD_BG }, rectRadius: 0.1,
      line: { color: BLUE, width: 1 },
    });
    slide.addText(leftTitle, {
      x: '4%', y: '22%', w: '42%', h: '6%',
      fontSize: 13, bold: true, color: ACCENT, fontFace: 'Calibri',
    });
    slide.addText(
      leftItems.map(t => ({ text: t, options: { bullet: { type: 'bullet' } as any, fontSize: 12, color: LIGHT, fontFace: 'Calibri', paraSpaceBefore: 2 } })),
      { x: '4%', y: '30%', w: '42%', h: '60%', fontFace: 'Calibri', valign: 'top' }
    );

    // Right card
    slide.addShape(prs.ShapeType.roundRect, {
      x: '52%', y: '20%', w: '45%', h: '72%',
      fill: { color: CARD_BG }, rectRadius: 0.1,
      line: { color: ACCENT, width: 1 },
    });
    slide.addText(rightTitle, {
      x: '53%', y: '22%', w: '42%', h: '6%',
      fontSize: 13, bold: true, color: BLUE, fontFace: 'Calibri',
    });
    slide.addText(
      rightItems.map(t => ({ text: t, options: { bullet: { type: 'bullet' } as any, fontSize: 12, color: LIGHT, fontFace: 'Calibri', paraSpaceBefore: 2 } })),
      { x: '53%', y: '30%', w: '42%', h: '60%', fontFace: 'Calibri', valign: 'top' }
    );

    if (note) slide.addNotes(note);
  }

  // ── Slide 1: Cover ─────────────────────────────────────────────────────────
  {
    const slide = prs.addSlide({ masterName: 'MAIN' });

    // Full background
    slide.addShape(prs.ShapeType.rect, { x: 0, y: 0, w: '100%', h: '100%', fill: { color: NAVY } });

    // Top accent strip
    slide.addShape(prs.ShapeType.rect, { x: 0, y: 0, w: '100%', h: '2%', fill: { color: BLUE } });
    slide.addShape(prs.ShapeType.rect, { x: 0, y: '2%', w: '100%', h: '1%', fill: { color: ACCENT } });

    // Category badge
    slide.addShape(prs.ShapeType.roundRect, {
      x: '35%', y: '10%', w: '30%', h: '7%',
      fill: { color: CARD_BG }, rectRadius: 0.15,
      line: { color: BLUE, width: 1.5 },
    });
    slide.addText(content.category.toUpperCase(), {
      x: '35%', y: '10%', w: '30%', h: '7%',
      fontSize: 11, color: BLUE, bold: true, fontFace: 'Calibri', align: 'center', valign: 'middle',
    });

    // Project title
    slide.addText(content.title, {
      x: '5%', y: '22%', w: '90%', h: '22%',
      fontSize: 32, bold: true, color: WHITE, fontFace: 'Calibri', align: 'center',
    });

    // Divider
    slide.addShape(prs.ShapeType.rect, { x: '20%', y: '46%', w: '60%', h: '0.4%', fill: { color: BLUE } });

    // Subtitle
    slide.addText('Final Year Engineering Project', {
      x: '5%', y: '48%', w: '90%', h: '7%',
      fontSize: 16, color: MUTED, fontFace: 'Calibri', align: 'center',
    });

    // Student name — ONLY if personalization purchased
    const yBase = 56;
    if (opts.studentName) {
      slide.addText(`Presented by: ${opts.studentName}${opts.rollNumber ? ` (${opts.rollNumber})` : ''}`, {
        x: '5%', y: `${yBase}%`, w: '90%', h: '6%',
        fontSize: 15, bold: true, color: ACCENT, fontFace: 'Calibri', align: 'center',
      });
    }
    if (opts.guideName) {
      slide.addText(`Guide: ${opts.guideName}`, {
        x: '5%', y: `${yBase + (opts.studentName ? 7 : 0)}%`, w: '90%', h: '6%',
        fontSize: 13, color: LIGHT, fontFace: 'Calibri', align: 'center',
      });
    }
    if (opts.collegeName) {
      slide.addText(opts.collegeName, {
        x: '5%', y: `${yBase + (opts.studentName ? 7 : 0) + (opts.guideName ? 7 : 0)}%`, w: '90%', h: '6%',
        fontSize: 12, color: MUTED, fontFace: 'Calibri', align: 'center',
      });
    }

    // SubmitKit brand + year
    slide.addText(`SubmitKit Academic Projects · ${new Date().getFullYear()}`, {
      x: '5%', y: '88%', w: '90%', h: '5%',
      fontSize: 10, color: MUTED, fontFace: 'Calibri', align: 'center',
    });

    slide.addNotes(content.pptSlides[0]?.speakerNote ?? 'Introduction slide.');
  }

  // ── Generate remaining slides from project content ─────────────────────────
  for (let i = 1; i < content.pptSlides.length; i++) {
    const slideData = content.pptSlides[i];
    const slide = prs.addSlide({ masterName: 'MAIN' });
    addSectionSlide(slide, slideData.title, slideData.bullets, slideData.speakerNote);
  }

  // ── Final slide: Thank You ─────────────────────────────────────────────────
  {
    const slide = prs.addSlide({ masterName: 'MAIN' });
    slide.addShape(prs.ShapeType.rect, { x: 0, y: 0, w: '100%', h: '100%', fill: { color: NAVY } });
    slide.addShape(prs.ShapeType.rect, { x: 0, y: 0, w: '100%', h: '2%', fill: { color: BLUE } });
    slide.addShape(prs.ShapeType.rect, { x: 0, y: '2%', w: '100%', h: '1%', fill: { color: ACCENT } });

    slide.addText('Thank You', {
      x: '5%', y: '30%', w: '90%', h: '18%',
      fontSize: 54, bold: true, color: WHITE, fontFace: 'Calibri', align: 'center',
    });
    slide.addShape(prs.ShapeType.rect, { x: '30%', y: '52%', w: '40%', h: '0.4%', fill: { color: ACCENT } });
    slide.addText('Questions & Discussion', {
      x: '5%', y: '55%', w: '90%', h: '8%',
      fontSize: 18, color: LIGHT, fontFace: 'Calibri', align: 'center',
    });

    if (opts.studentName) {
      slide.addText(opts.studentName, {
        x: '5%', y: '67%', w: '90%', h: '7%',
        fontSize: 16, bold: true, color: ACCENT, fontFace: 'Calibri', align: 'center',
      });
    }

    slide.addText('submitkit.in', {
      x: '5%', y: '78%', w: '90%', h: '6%',
      fontSize: 12, color: MUTED, fontFace: 'Calibri', align: 'center',
    });

    slide.addNotes('Thank your audience. Invite questions. Keep the project open on your laptop for demo.');
  }

  // Return as Buffer
  const result = await prs.write({ outputType: 'nodebuffer' });
  return result as Buffer;
}
