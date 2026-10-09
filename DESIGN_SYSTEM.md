# NYX Portfolio — Design System 01

This portfolio uses **one custom visual language** rather than installing several competing component frameworks. The primary stylesheet is `public/styles/system.css`, loaded last by `src/app/layout.tsx`. Existing legacy style files and project media remain intact so content, interaction tests, and historical assets are preserved.

## Direction

An engineered, editorial portfolio: warm mineral backgrounds, forest-green ink, precise borders, disciplined typography, generous whitespace, and restrained micro-interactions. The interface should read as a thoughtfully assembled product rather than a component showcase.

- **Typography:** DM Sans for interface and body copy; Instrument Serif only for intentional editorial accents. Avoid novelty display fonts.
- **Color:** warm ivory base, dark evergreen text, sage surfaces and a single leafy green interactive accent. Reserve the dark forest surface for featured work and embedded screens.
- **Shape:** 9–12px for controls, 16px for cards and galleries, 24px for major image framing. Avoid inconsistent pill/button geometries.
- **Elevation:** thin strokes at rest, shallow shadows on surfaces, slightly increased shadow and vertical movement on hover. Avoid luminous borders, neon glows or heavy glass effects.
- **Motion:** 200–300ms for controls/cards; longer only for images. Honor `prefers-reduced-motion`. Preserve the existing orbit functionality.
- **Content:** prioritize real project screenshots, system decisions, technology names and work evidence over decorative mockups.

## Shared tokens

Defined in `:root` inside `public/styles/system.css`.

| Token | Role |
| --- | --- |
| `--bg`, `--ink`, `--muted`, `--line` | Compatibility with existing semantic elements |
| `--ui-surface`, `--ui-surface-muted`, `--ui-surface-hover` | Cards, filters, buttons and layers |
| `--ui-border` | Common structural stroke |
| `--ui-accent`, `--ui-accent-soft` | Selected states and focused interactions |
| `--ui-dark`, `--ui-dark-line`, `--ui-dark-muted` | Dark showcase surface |
| `--ui-radius-sm`, `--ui-radius`, `--ui-radius-lg` | Control, card and display radius |
| `--ui-shadow`, `--ui-shadow-lift`, `--ui-ease` | Consistent elevation/movement |

## Component contracts

| Existing component | Treatment |
| --- | --- |
| Header | Calm sticky navigation, strong contact action, accessible mobile menu |
| Hero | Editorial text, two action variants, one signature project orbit |
| Featured | Dark case-study display, real screenshots, caption hierarchy |
| Work | Unified project card, action rail, technology tags and preview strip |
| Repository list | Same surface, border, badge and elevation vocabulary as project cards |
| Toolbox | Soft segmented filters, structured technology grid, pauseable motion |
| Skills | Feature panels with consistent icon tile, label, title and body |
| Workflow | Accessible accordion with active surface and progress indicator |
| About | Portrait frame, editorial bio, restrained attribute chips |
| Contact/footer | Light-sage closing surface, purposeful email CTA and social grid |
| Dialogs | Consistent modal, tabs, image previews and gallery controls |

## Inspiration and licensing boundaries

We referenced patterns, not copied whole site designs:

- [shadcn/ui](https://ui.shadcn.com/): semantic tokens, control composition and focus conventions.
- [Untitled UI](https://www.untitledui.com/react/components): type hierarchy, polished application-card patterns and predictable spacing.
- [Mantine UI](https://ui.mantine.dev/): responsive composition and segmented filter interaction.
- [Uiverse](https://uiverse.io/): restrained hover/micro-interaction details.
- [Material UI](https://mui.com/): centralized theming discipline and consistent component states.

No third-party component runtime or framework CSS was installed. If new patterns are added, recreate them within this system using the current project's Next.js/React/CSS setup. Do not paste default Mantine, MUI, shadcn or Untitled UI themes into this portfolio.

## Implementing new components

1. Reuse existing type, spacing, surface, outline, radius, and shadow tokens. Add a token only when it represents a reusable decision.
2. Keep labels and controls readable at desktop, tablet and narrow mobile sizes. Small micro-labels must not carry essential meaning alone.
3. Every clickable surface needs keyboard activation/focus feedback, a pointer/hover state, and an appropriate accessible name.
4. For buttons, use filled for the primary decision and outlined for secondary actions. Do not introduce unrelated button color families.
5. Use genuine project imagery and correct alt text. Screen previews should not crop away essential UI.
6. Check responsive behavior, reduced-motion mode, project dialogs, the rotating showcase and gallery interactions.
7. Run `pnpm typecheck`, `pnpm lint`, `pnpm test`, and `pnpm build` before shipping.

> The older four CSS files remain deliberately untouched to retain the baseline's original bytes. Put new shared improvements in `system.css` instead of increasing the existing override sprawl.
