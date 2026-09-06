# QuickBite — Restaurant QR Ordering & Kitchen KDS
### Academic Project Bundle — SubmitKit.in

> Contactless table-side QR ordering, interactive menu, live kitchen display (KDS), and digital receipts.

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

**Runs at:** http://localhost:3002

The launcher automatically:
1. Installs npm packages (first run only)
2. Creates the SQLite database
3. Seeds 2 restaurants, 8 menu items, 2 live orders
4. Opens your browser

---

## Project Pages

| Page | URL | Description |
|------|-----|-------------|
| Landing | `/` | QR code generator with table selector |
| Customer Menu | `/m/spice-lounge?table=1` | Full mobile ordering UI — search, cart, AI taste matcher |
| Kitchen KDS | `/admin/spice-lounge/kds` | Real-time kitchen display with Kanban columns |
| QR Manager | `/admin/spice-lounge` | Print QR codes for all tables |
| Order Tracking | `/m/spice-lounge/order/[id]` | Live order status (polls every 3 seconds) |

---

## Test on a Mobile Phone

1. Make sure your phone is on the same Wi-Fi as your laptop
2. Open the app at `http://YOUR_LAPTOP_IP:3002` on your phone
3. Or scan the real QR code shown in the app — it encodes your LAN IP automatically

---

## Tech Stack

- **Framework:** Next.js 16 (React 19, TypeScript)
- **Database:** SQLite via Prisma ORM
- **QR Generation:** `qrcode` npm package (real, scannable QR codes)
- **Animations:** Framer Motion
- **Styling:** Tailwind CSS v4

---

## System Requirements

- Node.js 18+ — https://nodejs.org

---

## What's Included

- ✅ Complete source code + 1-click launcher
- ✅ 30-page IEEE Black Book Report (.docx)
- ✅ Viva Defense Presentation (.pptx)
- ✅ Top 25 Viva Q&A Answers

---

*Sold as educational reference material. SubmitKit.in*
