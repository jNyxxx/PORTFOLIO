# Nyx portfolio

Junex Glenn Baran's portfolio, migrated from the published version into a typed Next.js application. The migration preserves the existing design, content, original images, and interaction behavior.

## Stack

- Next.js 16 App Router, React 19, and strict TypeScript
- Tailwind CSS 4, with prefixed utilities and no Preflight reset
- pnpm with a committed lockfile
- ESLint configuration, Prettier, and Node test runner with React/JSDOM tests
- Static export: no database, API keys, backend service, or paid runtime required

## Run locally

Use Node.js 24 LTS and pnpm 11.25.0.

```sh
corepack enable
corepack prepare pnpm@11.25.0 --activate
pnpm install --frozen-lockfile
pnpm dev
```

Open http://localhost:3000.

## Verify and build

```sh
pnpm typecheck
pnpm test
pnpm build
pnpm verify:parity
pnpm start
```

`pnpm start` previews the exported `out/` folder locally. `pnpm lint` runs the configured ESLint rules; `pnpm format` formats source files. Original design styles and baseline fixtures are intentionally excluded from formatting.

## Project structure

```text
src/app/          App Router page, layout, metadata, Tailwind setup
src/components/   Page sections, technology views, dialogs, shared state
src/content/      Typed project descriptions, media, technologies, carousel entries
src/hooks/        Animation lifecycle, clipboard, clock, scroll reveals
src/lib/          Shared types and independently tested orbit calculations
public/assets/    Original project screenshots and portrait
public/styles/    Four preserved original stylesheets + the new shared system.css layer
scripts/          Static preview and export verification
tests/           Behavior tests and the published version's reference fixtures
```


## Editing content

- Project descriptions, gallery images, and technology records: `src/content/portfolio.ts`.
- Homepage section layouts and their editorial summaries: `src/components/`.
- To add AutomatedStructure images, place original files in `public/assets/outreach/` and populate `media.outreach.photos`.
- Keep all `ProjectId` entries in sync with project and media records. TypeScript enforces this relationship.
- External links use ordinary anchors. Image galleries link to original files and do not rely on Google Drive previews.

## Design parity

`public/styles/style.css`, `reference.css`, `elevated.css`, and `projects.css` are retained byte for byte. The layout loads them in that order. Tailwind is available for future work, but its reset is disabled and its utilities use the `tw:` prefix so they cannot alter existing semantic classes.

Original `<img>` rendering is intentional: introducing image optimization, rewritten sources, new fonts, or changed layout wrappers would complicate parity with the existing portfolio.

React now owns menus, filters, dialogs, gallery state, clipboard feedback, and workflow state. The orbit hook only writes per-frame transforms for performance; it cleans up listeners, observers, animation frames, and timers on unmount. No legacy runtime script or injected HTML powers the application.

The tests compare the hydrated homepage against the previous implementation, verify every original asset/style hash, preserve all project and media records, and exercise the main interactions. JSDOM does not render pixels. Browser screenshot comparison was unavailable in the authoring environment, so the migration is not represented as having passed pixel-diff testing.

The files in `tests/baseline/` are test fixtures from the previous publication. They are not copied into the public build.

## Publishing to Vercel

**Target host:** Vercel Hobby (free for eligible personal, non-commercial projects). This repository is prepared for Vercel, but the migration is not live until an authenticated production deployment succeeds.

`pnpm build` produces the static `out/` export. Vercel detects Next.js and deploys the build without a custom server. Use the app directory `D:\\PORTFOLIO\\nyx-portfolio`, not the parent `D:\\PORTFOLIO`.

The existing Vercel project is **nyx** in the **nyxsdlc-1110** Hobby team; the verified Vercel domain is **nyx-nyxsdlc-1110.vercel.app** (not live until production deployment). The preferred `nyx.vercel.app` alias is owned by another project. The target GitHub source is **jNyxxx/PORTFOLIO** on `main`. The repository is currently empty, and this local folder is not yet a Git checkout. Publish the *entire* working copy with its media assets using `powershell -ExecutionPolicy Bypass -File .\scripts\publish-vercel.ps1` from the project directory. See [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md) for the exact first-publish workflow, GitHub auto-deploy setup, and live-site checks.

The legacy `.openai/hosting.json` is retained locally for migration rollback and excluded from Vercel uploads and Git. The `.vercelignore` excludes legacy metadata, tests, development tools, and the old static export from CLI uploads. No custom domain purchase is required. Connect the GitHub repository to the **existing** Vercel project in Vercel Settings → Git after the first push to enable subsequent automatic deployments.

## Current content

Eight projects, 29 gallery images, four rotating showcase cards, and 21 technologies. Descriptions distinguish implemented foundations from planned features. No unverified production or adoption claims were added during migration.
