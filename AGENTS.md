<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Book Library Client

Single Next.js 16 (App Router) app — no monorepo. Source lives in `src/`; the app entry is `src/app/layout.tsx` + `src/app/page.tsx`. Path alias: `@/*` → `./src/*`.

## Commands (npm; `package-lock.json` is the lockfile)

- Dev server: `npm run dev` (Turbopack)
- Lint: `npm run lint` (runs bare `eslint` over the flat config in `eslint.config.mjs`)
- Typecheck: `npx tsc --noEmit` — there is **no** `typecheck` script; `next build` also typechecks
- No test setup exists (no test runner, no CI workflows). Don't invent test commands.

## Framework/toolchain facts that matter

- Next `16.4.3` with `reactCompiler: true`, `cacheComponents: true`, and `partialPrefetching: true` in `next.config.ts`. With cache components, dynamic data access (e.g. `params`, `searchParams`) is async — expect `await` where older Next.js examples don't have it.
- Tailwind v4, configured **in CSS only** (`src/app/globals.css`: `@import "tailwindcss"` + `@theme`). There is no `tailwind.config.*`; CSS is loaded via the `@tailwindcss/turbopack` rule in `next.config.ts`, so it only works under Turbopack (`next dev` / `next build` in this Next version).
- shadcn CLI with the `base-nova` style (`components.json`) — components use **`@base-ui/react`, not Radix**. Don't swap primitives. Generate components with the shadcn CLI; utils in `src/lib/utils.ts`, UI in `src/components/ui/`.
- Keep the `<!-- BEGIN/END:nextjs-agent-rules -->` block above intact: `next dev` regenerates its contents, and deleting it just produces an uncommitted diff.
