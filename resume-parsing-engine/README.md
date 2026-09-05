# TalentScan AI — AI Resume Parsing & ATS Scoring Engine

An enterprise Applicant Tracking System (ATS) intelligence suite that parses raw resumes, extracts structured candidate vectors, calculates job description compatibility scores, and offers a recruiter candidate leaderboard and tailored interview question generator.

## 🌟 Key Features

1. **Intelligent Resume Parser & Entity Extractor**
   - Natural Language Processing (NLP) and regex entity recognition.
   - Extracts candidate contact vectors (Email, Phone, Location, LinkedIn, GitHub, Portfolio).
   - Categorizes skills into Languages, Frameworks, Cloud & DevOps, Databases, Tools, and Soft Skills.
   - Computes career duration, highlights work experience tenures, and parses educational degrees.

2. **Multi-Dimensional ATS Scoring Engine**
   - Evaluates overall job compatibility (0–100%) with animated radial score gauges and grades (A+, A, B, C, D).
   - Breaks down scoring weights: Required Skills (50%), Experience Longevity (30%), Education (10%), Formatting (10%).
   - Highlights matched mandatory skills vs. missing critical keywords.
   - Pinpoints concrete, actionable bullet-point suggestions to optimize resumes and beat automated ATS filters.

3. **Recruiter Leaderboard & Candidate Pipeline**
   - Comparative evaluation of multiple applicants against any job opening.
   - Sort candidates by ATS score, total years of experience, or name.
   - Manage hiring lifecycle stages (Applied ➔ Screening ➔ Shortlisted ➔ Interview ➔ Offer).

4. **Tailored Interview & Viva Question Generator**
   - Automatically constructs contextual technical questions, system architecture inquiries, and viva defense scenarios based on the candidate's exact profile and missing skill gaps.
   - Includes evaluation rubrics and model answer benchmarks.

## 🚀 Quick Start

### 1-Click Startup (Windows)
Double-click `run.bat` in the project root.

### Manual Startup
```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (or the assigned port) in your browser.

## 🛠️ Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Vanilla CSS with modern Glassmorphism and Executive Dark Mode
- **Icons**: Lucide React
