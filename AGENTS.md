<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

- Payment success pages must derive confirmation and purchased add-ons from the paid order record server-side, never from URL claims, so only verified purchases see order actions.
- Scope standalone-demo theme overrides to named outer-shell classes; keep IDE/editor surfaces dark for code readability and avoid leaking storefront styles into the demos.
- Production build scripts strip only the unsupported `--use-openssl-ca` option from inherited `NODE_OPTIONS` before starting Next.js, so its build workers receive valid Node settings.
