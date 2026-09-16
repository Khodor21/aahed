<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Agent instructions for this repository

## Project context

- This repository is a Next.js 16 app using the App Router in `app/`.
- The app is a RTL Arabic product experience for Quran memorization and follow-up flows.
- The current UI is mostly route-level screens under `app/` with Tailwind styling and Arabic copy.

## Conventions to follow

- Prefer the App Router pattern: route folders with `page.tsx`, and keep page-specific UI local to the route unless a shared component is clearly reusable.
- Use server components by default; only add `'use client'` when browser interactivity is required.
- Keep styling consistent with the existing design system: utility classes, Arabic RTL layout, and theme tokens already used in `app/globals.css` and the current pages.
- Maintain `dir="rtl"` on page roots and prefer Arabic text patterns already present in the app.
- Use `next/image` for local static assets from `public/` and reference them with `/...` paths.
- Do not introduce backend/database/auth flows unless the task explicitly requires them; this repository currently looks like a front-end prototype.

## Validation

- Run `npm run lint` after code changes.
- Run `npm run build` when a change affects routing, rendering, or component behavior.
- Keep modifications minimal and aligned with the existing visual language and page structure.

## Files to inspect first

- `package.json` for scripts and dependencies
- `app/page.tsx` for the landing page pattern
- `app/login/page.tsx` for the current form and RTL styling conventions
- `app/layout.tsx` for metadata, global HTML language direction, and base app setup
- `app/globals.css` for shared theme tokens and utility classes

## Notes for agents

- The app uses Next.js 16 and React 19; do not rely on older App Router assumptions or deprecated APIs.
- When unsure about a framework API, consult the local Next.js docs in `node_modules/next/dist/docs/` before editing framework behavior.
- Preserve the existing Arabic copy and user-facing tone unless the task specifically calls for a different experience.
