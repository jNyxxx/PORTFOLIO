# NYX Portfolio — Design System 04

This portfolio uses **one custom visual language** instead of combining five incompatible component frameworks. Actual MIT-licensed shadcn component implementations now live in `src/components/ui/button.tsx` and `src/components/ui/card.tsx`, alongside our compositions in `src/components/ui/controls.tsx` and sourced icon components in `src/components/ui/icon.tsx`. All share the NYX theme in `public/styles/system.css`. The stylesheet loads last by `src/app/layout.tsx`. The original four stylesheets and project media remain intact.

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
| Toolbox | Soft segmented filters, gap-balanced technology tiles, decorative continuous motion without a pause button |
| Skills | Feature panels with consistent icon tile, label, title and body |
| Workflow | Accessible accordion with active surface and progress indicator |
| About | Portrait frame, editorial bio, restrained attribute chips |
| Contact/footer | Light-sage closing surface, purposeful email CTA and social grid |
| Dialogs | Consistent modal, tabs, adjacent-image preloading, faster WebP previews, predictable arrow navigation, and detailed engineering case studies |

## Reusable components actually implemented

| JSX component | Location | Used on screen | Pattern adapted from |
| --- | --- | --- | --- |
| `Button` + `buttonVariants` | `src/components/ui/button.tsx` | All carousel controls, stack filters, contact copy, and hero link styling | [shadcn Base UI Button](https://ui.shadcn.com/docs/components/base/button), using real `@base-ui/react/button` and `class-variance-authority` |
| `Card`, `CardContent`, `CardFooter` | `src/components/ui/card.tsx` | Both DataAutomated media previews | [shadcn Card](https://ui.shadcn.com/docs/components/base/card) source composition |
| `FeaturedMediaCard` | `src/components/featured-media-card.tsx` | Featured project images with 16:9 aspect, rich captions, and fullscreen preview | Real shadcn Card plus custom editorial layout |
| `ActionLink` | `src/components/ui/controls.tsx` | Hero "See my work" and "Let's talk" | Real shadcn `buttonVariants` on semantic anchors |
| `IconButton` | Same | Carousel previous/next and pause controls | shadcn/ui icon buttons and Mantine action icons |
| `FilterOption` | Same | Six Toolbox technology filters | Mantine SegmentedControl and MUI single-select toggle group |
| `SocialTile` | Same | Facebook, Instagram, Email, GitHub cards | Untitled UI social buttons, custom outbound/link behavior |
| `Icon` | `src/components/ui/icon.tsx` | Brand icons, menu, selected skills, carousel and clipboard | Actual `lucide-react` icons and official `simple-icons` brand paths (including GitHub) |
| `ui-copy-address` | `src/components/contact.tsx` | Click directly on the email address, see copied confirmation | shadcn/ui button feedback patterns |

**Carousel geometry:** The original 32-second, continuous 360° sin/cos/rotateY orbit is preserved in `src/lib/motion.ts`. The same hook updates transforms, opacity, and focus in `src/hooks/use-orbit.ts`. A full-circle geometric collision regression test checks all 360 degrees at four widths. The front card stays readable without the side cards covering it. On mobile, side cards are hidden in favor of one focused preview plus accessible arrows.

These are **actual shadcn Base UI Button / Card source implementations and imported open-source primitives**, not merely inspired CSS. The shadcn components are owned by this repository, as intended by the shadcn model, with an original NYX visual theme. Installed dependencies: `@base-ui/react`, `class-variance-authority`, `lucide-react`, and `simple-icons`. We did not install five competing framework themes. Mantine, MUI, Uiverse and Untitled UI remain pattern references only.

## Gallery and engineering-case-study upgrades

The PhotoDialog and project screenshot view in `src/components/dialogs.tsx` reuse the lightweight preview-source mapper and immediate-neighbor preloader in `src/lib/photos.ts`. Nine existing DataAutomated WebP screenshots replace larger PNG downloads **inside the viewer only**; the original images still open through dedicated full-resolution links. The `PortfolioProvider` uses separate case-study and photo-selection contexts so moving to the next image does not re-render the hero, featured projects or work cards.

The deep technical architecture content is in `src/content/project-engineering.ts`, rendered as reusable panels through `src/components/project-engineering-details.tsx`. Every one of the eight systems receives:
- Status and a bounded product goal
- Layer-by-layer technology and each layer's responsibility
- An ordered data/execution pipeline
- Architecture decisions and why those boundaries matter
- An explicit explanation of verified features versus planned work

This additional content does not change the original canonical project summary data or imply a live deployment for unlaunched projects. Technical descriptions were grounded in the accessible GitHub READMEs for AutomatedStructure, CustomerSupportAgent (JGB-Code), SentinelAI, InsuranceLeadBot, FocusedSourcing, DivorceSecretary and AITestRun, plus existing verified portfolio material for DataAutomated.

Visual QA revisions: the first skills card now matches the other two cards' padding, the technology grid uses three equal-width columns and discrete tiles rather than a large empty tinted grid surface, and the Toolbox "Pause motion" control is removed. Responsive layouts and reduced-motion behavior remain in the shared design layer.

## Inspiration and licensing boundaries

We referenced patterns, not copied whole site designs:

- [shadcn/ui](https://ui.shadcn.com/): semantic tokens, control composition and focus conventions.
- [Untitled UI](https://www.untitledui.com/react/components): type hierarchy, polished application-card patterns and predictable spacing.
- [Mantine UI](https://ui.mantine.dev/): responsive composition and segmented filter interaction.
- [Uiverse](https://uiverse.io/): restrained hover/micro-interaction details.
- [Material UI](https://mui.com/): centralized theming discipline and consistent component states.

Base UI powers actual buttons, while semantic links use shadcn's `buttonVariants`; Card composition follows the shadcn MIT registry. Vector paths come directly from Lucide and Simple Icons. If new patterns are added, prefer the existing component contracts and do not paste default Mantine, MUI, shadcn or Untitled UI themes into this portfolio. Preserve reduced-motion and accessible focus states.

## Implementing new components

1. Reuse existing type, spacing, surface, outline, radius, and shadow tokens. Add a token only when it represents a reusable decision.
2. Keep labels and controls readable at desktop, tablet and narrow mobile sizes. Small micro-labels must not carry essential meaning alone.
3. Every clickable surface needs keyboard activation/focus feedback, a pointer/hover state, and an appropriate accessible name.
4. For buttons, use filled for the primary decision and outlined for secondary actions. Do not introduce unrelated button color families.
5. Use genuine project imagery and correct alt text. Screen previews should not crop away essential UI.
6. Check responsive behavior, reduced-motion mode, project dialogs, the rotating showcase and gallery interactions.
7. Run `pnpm typecheck`, `pnpm lint`, `pnpm test`, and `pnpm build` before shipping.

> The older four CSS files remain deliberately untouched to retain the baseline's original bytes. Put new shared improvements in `system.css` instead of increasing the existing override sprawl.
