# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Pixie Project

### Artifacts
- **pixie-landing** — React landing page for the Pixie Mac app (Vite + Tailwind)
- **chrome-extension** — Chrome MV3 extension for element capture (hover/click/drag with annotations)
- **pixie-desktop** — Electron macOS desktop app (⌘⇧6 system-wide screenshot + annotation)

### Desktop App (pixie-desktop)
- Electron app: menu bar tray icon, no dock, fullscreen transparent overlay
- Shortcut: ⌘⇧6 activates capture
- Features: drag-to-select, pencil/eraser annotation, color swatches, round/sharp corner toggle, move selection, resize handles, copy to clipboard (⌘C), save to Desktop (Enter)
- Build: `npm install && npm run dist` produces .app and .dmg in dist/
- Download ZIP: `Pixie Desktop.zip` in project root and `artifacts/pixie-landing/public/`

### Landing Page Notes
- Nav: "Pixie" text pinned at left, pill nav with links fades in on scroll past 60px
- Mobile: full-screen gate ("Visit Pixie.app on desktop")
- Download buttons serve `Pixie Desktop.zip` (Electron source)
- Hero copy ("Capture it. Annotate it. Done.") is placeholder — user wants to revisit
