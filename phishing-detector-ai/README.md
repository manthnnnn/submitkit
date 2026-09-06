# PhishGuard AI — Zero-Day Phishing Detection Engine
### Academic Project Bundle — SubmitKit.in

> Zero-day phishing detonator with Cyrillic IDN homoglyph scanner and automated ICANN takedown notices.

---

## Quick Start

### Windows
```
Double-click  run.bat
```

### Mac / Linux
```bash
bash run.sh
```

**Runs at:** http://localhost:3008

---

## Project Pages

| Page | URL | Description |
|------|-----|-------------|
| Landing | `/` | URL scanner with homoglyph explainer + pricing tiers |
| Dashboard | `/dashboard` | Full SOC: threat feed, forensic panel, sandbox detonation, STIX export |

---

## Features

- **Real URL Analysis** — Shannon entropy, Cyrillic homoglyph detection, TLD risk scoring
- **Cyrillic Homoglyph Scanner** — Detects `pаypal.com` (Cyrillic `а`) vs `paypal.com` (Latin `a`)
- **Threat Score 0-99** — Combined heuristic score from 5 detection vectors
- **Visual Mimicry Sandbox** — Modal showing detonation report
- **ICANN Abuse Takedown** — Auto-generated takedown notice text
- **STIX 2.1 JSON Export** — Downloads structured threat intelligence

---

## Tech Stack

- **Framework:** Next.js 16 (React 19, TypeScript)
- **Styling:** Pure CSS custom design system
- **Detection Engine:** Pure TypeScript — no external API

---

## System Requirements

- Node.js 18+ — https://nodejs.org

---

## What's Included

- ✅ Complete source code + 1-click launcher
- ✅ 60-page IEEE Black Book Report (.docx)
- ✅ Viva Defense Presentation (.pptx)
- ✅ Top 25 Viva Q&A Answers

---

*Sold as educational reference material. SubmitKit.in*
