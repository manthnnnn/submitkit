# Roadmap

- [x] Confirm UI direction with user (refined current brand, lean startup aesthetic)
- [x] Flatten & clean design system in src/app/globals.css (calmer shadows, less 3D, tighter tokens)
- [x] Polish navbar, footer, WhatsApp widget
- [x] Refresh homepage sections (stat cards, kit list, blueprint/custom cards, pricing card, CTA)
- [x] Flatten inline 3D styles across blog, blueprint, projects, custom pages
- [x] Audit key pages + mobile with browser screenshots — clean and consistent
- [x] Speed up page load (removed blocking external Google Fonts, self-hosted JetBrains Mono) and tightened hero entrance animations (~1.1s → ~0.35s, uniform smooth easing)
- [x] Mobile: app-style bottom nav (Home / Projects / Free Topics / Track / WhatsApp) with active states; body padding so content clears the bar
- [x] iOS-style pass: Apple motion curve + press feedback (buttons, tabs, drawer), frosted mobile drawer, springier drawer animation
- [x] Hero rewritten & resized: concrete copy ("Final-year project kits, ready to submit"), smaller type on mobile (30px) and desktop (52px)
- [x] Mobile-first refresh: shorten the home screen, clarify what SubmitKit sells, and simplify phone navigation with polished iOS-inspired motion; keep the existing no-image rule
- [x] Restore the homepage's rotating main hook titles, compact the phone layout, and leave one persistent WhatsApp button
- [x] Replace the setup-video cover with a custom branded SVG poster; keep generated imagery out of the app
- [x] Review the order-success page against the storefront UI, verify the demo video placement, and resolve payment-confirmation loading/error states
- [x] Scan customer-facing pages for remaining outdated dark UI and identify the intentionally dark sections
- [x] Shorten mobile homepage scrolling by hiding repeated kit/process sections on phones and condensing the final CTA; keep the main catalog and swipeable reviews
- [x] Audit browse, project detail, invalid checkout/verification, fake-order download denial, unauthenticated admin, TypeScript, existing order test, and production build
- [ ] Verify a real paid order and download end-to-end (blocked until payment/database configuration is available in preview)
