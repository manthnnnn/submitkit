<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

- Payment success pages must derive confirmation and purchased add-ons from the paid order record server-side, never from URL claims, so only verified purchases see order actions.
- Scope standalone-demo theme overrides to named outer-shell classes; keep IDE/editor surfaces dark for code readability and avoid leaking storefront styles into the demos.
- Production build scripts strip only the unsupported `--use-openssl-ca` option and use Webpack because Turbopack currently panics resolving project modules in this workspace.
- Use the Next.js 16 `proxy.ts` convention for request interception so middleware runs in the supported Node.js runtime.

# SubmitKit Academic Project Builder Standard (Antigravity Rules)
Whenever asked to build, modify, or publish an academic project kit for SubmitKit:
1. **Core Working Code:** Build a clean, self-contained, working web or python application in its own root-level directory or `project-factory/<slug>`.
2. **7 Mandatory Deliverables for Every Kit:**
   - `run.bat`: Windows 1-click double-click launcher (checks Node/Python, venv, installs dependencies, opens browser, starts server).
   - `run.sh`: Mac/Linux 1-click launcher (`chmod +x run.sh && ./run.sh`).
   - `README_FIRST.txt`: 30-second student setup guide and kit deliverable checklist.
   - `IEEE_Report.md`: Full 60-page academic standard project report (Certificate, Abstract, Chapters 1-7).
   - `Project_Report.docx`: Physical Microsoft Word IEEE document formatted for faculty submission.
   - `Presentation.pptx`: 15-slide PowerPoint defense presentation deck ready for Viva Voce examination.
   - `Viva_Presentation_Notes.md`: Slide-by-slide speaker presentation notes and Top 20 examiner Viva questions with answers.
3. **Packaging & Size Limit:**
   - Always run `node scripts/kit-master.mjs pack <folder>`.
   - Bundle size MUST strictly remain `< 9.5MB` (excludes `node_modules`, `.next`, `__pycache__`, `.venv`, `.git`).
4. **Publishing & Synchronization:**
   - Run `node scripts/kit-master.mjs publish <folder>` to:
     - Automatically audit and generate all missing deliverables (including `.docx` and `.pptx`).
     - Pack the clean bundle ZIP.
     - Upload to Cloudflare R2 bucket `projecthub` under `bundles/<slug>.zip`, `<slug>.zip`, and `kits/<slug>.zip`.
     - Synchronize record into Supabase `projects` database table with active status and storage key.
     - Register the slug in `AVAILABLE_CORE_SLUGS` in `src/lib/available-projects.ts`.
5. **Quality Verification:**
   - Run `node scripts/kit-master.mjs list` to verify all 7 deliverable badges are green `[✓]`.
