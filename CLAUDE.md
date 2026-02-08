# CLAUDE.md — Career-Matcher

## Mission

Career-Matcher is a **work-environment preference exploration tool** for teens and young
adults. It is NOT a career assessment, aptitude test, or guidance tool. This distinction
is non-negotiable — it determines what claims we can make, what language we use in output,
and how we frame results.

The tool helps teens discover which *work conditions* suit them (schedule structure, social
density, error stakes, etc.) and shows which real jobs share those conditions. It is one
input alongside interest inventories, values assessments, and conversations with counselors.

**Theoretical basis:** Theory of Work Adjustment (Dawis & Lofquist, 1984) — person-
environment correspondence on work conditions. Complemented by Holland's RIASEC for the
interest-domain dimension.

## Project State

- **Version:** 0.5.0 — Web application development phase
- **Core library:** Complete (v0.4.0) — TypeScript 5.3.3 strict, Vitest 1.2.0, zero runtime dependencies
- **Web app:** Planned — see Web Application Development Plan below
- **Architecture:** Core library = 4-phase pipeline (Measure → Score → Match → Format); Web app = Next.js consuming the core
- **Core tests:** 78 passing (scoring, matching, results, validation, integration, boundary, shuffle)
- **Jobs:** 52 jobs across 12+ sectors with O*NET-informed profiles
- **Prompts:** 32 situational prompts (4 per dimension)
- **CI:** GitHub Actions pipeline (lint, test, build)
- **Reviews completed:**
  - `DESIGN_REVIEW.md` — V&V engineering review (10 findings, all remediated)
  - `EXPERT_REVIEW_VOCATIONAL_PSYCHOLOGY.md` — independent domain expert review (verdict: conditionally sound, all conditions met)

## Build / Test / Lint

### Core Library
```bash
npm test              # vitest run — all 78 core tests
npm run test:watch    # vitest watch mode
npm run lint          # tsc --noEmit (type-check only)
npm run build         # tsc → dist/
```

### Web Application (once Phase W-1 is complete)
```bash
cd web
npm run dev           # Next.js dev server (localhost:3000)
npm run build         # Next.js production build (static export)
npm run start         # serve the static export locally
npm run lint          # ESLint + tsc --noEmit
npm run test          # Vitest — component + hook tests
npm run test:e2e      # Playwright — end-to-end browser tests
npm run test:a11y     # axe-core accessibility audit
npm run lighthouse    # Lighthouse CI performance audit
```

## Key Design Rules (Do Not Violate)

### Core Rules (Library + Web App)

1. **Explainability first.** Every result must include plain-language reasons a teen can
   understand. Never introduce a scoring mechanism that cannot be explained in one sentence.
2. **Behavioral prompts, not self-labels.** Prompts present scenarios ("You get to pick
   where you work…"), never identity claims ("Are you an introvert?").
3. **Jobs first, not traits.** Output leads with job titles and descriptions, not
   psychological profiles. The teen sees careers, not categories.
4. **Transparency over precision.** When confidence is low, say so. Never present a number
   with more precision than the measurement supports. Use ordinal fit bands, not percentages.
5. **Exploration, not foreclosure.** Language must keep doors open. We show fit gradients
   and friction points, never "you should" or "you can't." Use "Less Likely Fits" not
   "Ruled Out."
6. **No external runtime dependencies in the core library.** The core library must remain
   zero-dependency for security, auditability, and trust. The web app may use frameworks
   (React, Next.js, Tailwind) but the scoring/matching logic lives in the core library
   and must never be duplicated or modified in the web layer.

### Web App Rules

7. **COPPA compliance is non-negotiable.** This tool targets minors. Zero PII collection,
   zero third-party tracking, zero behavioral advertising, zero account creation. All
   computation happens client-side. No data is ever sent to a server. See Phase W-8.
8. **Incognito must work perfectly.** Every feature must function in private/incognito
   browsing. No localStorage dependence, graceful storage fallbacks, no functionality
   loss. See Phase W-8.
9. **Mobile-first, not mobile-also.** Design for phones first, enhance for tablets and
   desktops. Every interaction must work with touch, keyboard, mouse, and screen reader.
10. **No dark patterns.** No urgency cues, no "share to see results," no email gates,
    no engagement traps. The teen completes prompts, sees results, and can save/share
    freely. Respect their time and autonomy.
11. **Accessible by default.** WCAG 2.1 AA is the floor, not the ceiling. Every component
    must be keyboard-navigable, screen-reader-announced, and usable at 200% zoom. Color
    is never the sole indicator of meaning.
12. **Performance is a feature.** Teens are often on older phones with slow connections.
    Target < 200KB total JS gzipped, < 2s First Contentful Paint on 3G, 95+ Lighthouse
    scores across all categories.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│  Web Application (Next.js — static export, no server)       │
│                                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────────┐  │
│  │ Landing  │→ │  Prompt  │→ │ Results  │→ │  Report /  │  │
│  │  Page    │  │   Flow   │  │Dashboard │  │   Export   │  │
│  └──────────┘  └────┬─────┘  └────┬─────┘  └────────────┘  │
│                     │             │                          │
│              ┌──────┴─────────────┴──────┐                  │
│              │   State Manager (React    │                  │
│              │   Context + useReducer)   │                  │
│              │   + Storage Abstraction   │                  │
│              └──────────┬───────────────┘                   │
│                         │ imports                           │
├─────────────────────────┼───────────────────────────────────┤
│  Core Library (zero dependencies — unchanged)               │
│                                                             │
│  prompts → scoring → matcher → results                      │
│  32 prompts   profile    52 jobs    fit bands               │
│  8 dimensions  generation  ranking   formatting             │
└─────────────────────────────────────────────────────────────┘
```

The web app is a **pure presentation layer**. It calls the core library's public API
(`processResponses`, `resolveProfile`, `matchJobs`, `formatResults`,
`renderResultsAsText`, `createShuffledPrompts`) and renders the output. Scoring logic
never leaks into the web layer.

## File Map

```
src/                              ← Core library (unchanged)
  index.ts                        — Public API surface
  types.ts                        — Core interfaces
  dimensions.ts                   — 8 dimension definitions
  jobs.ts                         — 52 job profiles
  prompts.ts                      — 32 situational prompts
  scoring.ts                      — Nudge accumulation, profile generation, shuffle
  matcher.ts                      — scoreJob(), matchJobs()
  results.ts                      — fitBand(), formatResults(), renderResultsAsText()
  validate.ts                     — Data integrity validation
  *.test.ts                       — 78 tests across 5 test files

web/                              ← Web application (NEW)
  src/
    app/                          — Next.js App Router pages
      layout.tsx                  — Root layout: fonts, metadata, theme provider
      page.tsx                    — Landing page
      quiz/
        page.tsx                  — Prompt flow experience
      results/
        page.tsx                  — Results dashboard
      about/
        page.tsx                  — About, methodology, privacy notice
      not-found.tsx               — Custom 404
    components/
      ui/                         — Design system primitives
        Button.tsx                — Primary, secondary, ghost variants
        Card.tsx                  — Elevated surface with focus ring
        Badge.tsx                 — Fit band indicators
        ProgressBar.tsx           — Quiz progress indicator
        DimensionBar.tsx          — Profile visualization (bar for ordinal, chips for categorical)
        Tooltip.tsx               — Accessible tooltip (keyboard + touch)
        SkipLink.tsx              — Skip-to-content accessibility link
        ThemeToggle.tsx           — Light/dark mode switch
      prompts/
        PromptCard.tsx            — Single prompt display
        OptionCard.tsx            — Tappable option (not radio button)
        PromptNavigator.tsx       — Back/Next/progress orchestration
        NextButton.tsx            — Explicit "Next" / "See Results" button
        EncouragementBanner.tsx   — "No wrong answers" micro-copy
      results/
        ProfileSummary.tsx        — Dimension preference visualization
        MatchCard.tsx             — Single job match (expandable)
        FitBadge.tsx              — Color-coded fit band badge
        FrictionList.tsx          — Friction points display
        JobMetadata.tsx           — Education + outlook display
        EliminatedSection.tsx     — "Less Likely Fits" collapsible
        ExplorationPrompts.tsx    — "What to explore next" suggestions
        SectionReplay.tsx         — "Something feel off?" selective replay links
        EmptyState.tsx            — No-matches handling
      report/
        PrintLayout.tsx           — Print-optimized results
        ShareButton.tsx           — Generate shareable URL
        PrintButton.tsx           — Triggers window.print() for print/save-as-PDF
        CopyText.tsx              — Copy text summary to clipboard
      layout/
        Header.tsx                — App header with navigation
        Footer.tsx                — Scope disclaimer, about link
        PageTransition.tsx        — Animated page transitions
    hooks/
      useQuizState.ts             — Quiz state management (reducer)
      useStorage.ts               — Storage abstraction (session → memory)
      useTheme.ts                 — Dark/light mode management
      useReducedMotion.ts         — Respects prefers-reduced-motion
      useViewportHeight.ts        — iOS-safe viewport height (dvh)
      useKeyboardNav.ts           — Arrow key navigation for options
      useFocusManagement.ts       — Focus trapping and restoration
      useShareableURL.ts          — Encode/decode state in URL
    lib/
      storage.ts                  — StorageAdapter: sessionStorage → Map fallback
      url-state.ts                — Encode/decode resolved profile for shareable URLs
      pdf.ts                      — REMOVED (print CSS only — no JS PDF generation)
      analytics.ts                — Privacy-respecting analytics (optional, no PII)
      constants.ts                — App-wide constants, copy text
    styles/
      globals.css                 — Tailwind imports, CSS custom properties
      print.css                   — @media print styles
    __tests__/
      components/                 — Component unit tests (Vitest + Testing Library)
      hooks/                      — Hook unit tests
      e2e/                        — Playwright end-to-end tests
      a11y/                       — axe-core accessibility tests
  public/
    favicon.ico                   — App icon
    icon-192.png                  — PWA icon (192×192)
    icon-512.png                  — PWA icon (512×512)
    apple-touch-icon.png          — iOS home screen icon
    manifest.json                 — PWA manifest
    og-image.png                  — Open Graph social preview image
  next.config.ts                  — Static export config, headers
  tailwind.config.ts              — Design tokens, custom theme
  postcss.config.js               — PostCSS for Tailwind
  tsconfig.json                   — Extends root, adds JSX support
  package.json                    — Web-specific dependencies
  playwright.config.ts            — E2E test configuration
  .env.example                    — Environment variables template (no secrets)

.github/
  workflows/
    ci.yml                        — Updated: lint + test + build for both core and web
```

## Current Dimension Model

7 primary dimensions (can eliminate jobs) + 1 secondary (ranks/tiebreaks only):

| # | Dimension | Levels | Role | Ordinal | Status |
|---|-----------|--------|------|---------|--------|
| 1 | energyRhythm | steady, burst, mixed | Primary | No | OK |
| 2 | peopleDensity | solo, small-group, crowd | Primary | Yes | OK |
| 3 | interactionDemand | minimal, moderate, constant | Primary | Yes | OK |
| 4 | schedulePredictability | predictable, variable, chaotic | Primary | Yes | OK |
| 5 | ruleDensity | loose, moderate, strict | Primary | Yes | OK |
| 6 | primaryLoadType | physical, analytical, creative, organizational | Primary | No | OK — interest dimension (RIASEC) |
| 7 | errorPressure | low, moderate, high | Primary | Yes | OK — environmental tolerance |
| 8 | workValue | autonomy, security, altruism, achievement | Secondary | No | OK — ranks, never eliminates |

### Ordinal Distance Scoring

For ordinal dimensions, adjacent mismatches (1 step away) count as 0.5 instead of 1.0.
A job is eliminated when total weighted mismatch >= 2.0 across primary dimensions.

### Fit Bands

Results display ordinal fit bands instead of percentages:
- >= 0.85 → "Strong fit"
- >= 0.65 → "Possible fit"
- >= 0.45 → "Stretch"
- < 0.45 → "Unlikely fit"

### Job Metadata

Each job includes optional `typicalEducation` and `outlookNote` fields. These are
informational only — displayed in output but never affect scoring or elimination.

---

# LIBRARY REMEDIATION PLAN — COMPLETED

All 6 phases of the library remediation are complete (Phases 1–6). Summary:

- **Phase 1** ✓ — Fixed construct model (replaced learningMode, reclassified primaryLoadType,
  rewrote errorPressure prompts, expanded to 32 prompts)
- **Phase 2** ✓ — Fixed matching (ordinal fit bands, soft language, ordinal distance scoring)
- **Phase 3** ✓ — Fixed verification (data validation, tighter types, OOB warnings, tie-break docs)
- **Phase 4** ✓ — Fixed validation (integration tests, center/conflicted profiles, adversarial
  tests, elimination boundary tests) — 78 total tests
- **Phase 5** ✓ — Expanded jobs (52 jobs, education + outlook metadata)
- **Phase 6** ✓ — Operational readiness (CI pipeline, option-order shuffle, scope disclaimer)

For full remediation details, see git history on this branch.

---

# WEB APPLICATION DEVELOPMENT PLAN

## Technology Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | **Next.js 15** (App Router, static export) | File-based routing, static export = no server needed, React ecosystem, excellent performance defaults. Static export means hostable on any CDN with zero server cost. |
| Language | **TypeScript 5.x** (strict) | Same as core library. Shared type safety across the stack. |
| Styling | **Tailwind CSS v4** | Utility-first, built-in responsive design, small bundle (tree-shaken), design token system, dark mode support via `class` strategy. |
| Animation | **Framer Motion v11** | Declarative animations, `AnimatePresence` for exit animations, gesture support, built-in `useReducedMotion()`, layout animations for smooth prompt transitions. |
| Testing (unit) | **Vitest + React Testing Library** | Same test runner as core library, DOM-focused testing philosophy ("test what the user sees"). |
| Testing (e2e) | **Playwright** | Cross-browser (Chromium, Firefox, WebKit), mobile emulation, accessibility testing integration, screenshot comparison. |
| Testing (a11y) | **axe-core + @axe-core/playwright** | Automated WCAG 2.1 AA detection, integrated into both unit and e2e tests. |
| Performance | **Lighthouse CI** | Automated Core Web Vitals checks in CI pipeline. Fail the build if scores drop below 90. |
| PDF | **Print CSS only** (`@media print` stylesheet) | No server dependency. Print CSS handles all use cases. No JS-based PDF — saves ~80KB from the bundle budget. Users use browser print-to-PDF. |
| Linting | **ESLint + eslint-plugin-jsx-a11y** | Catch accessibility issues at authoring time, not just in testing. |
| Formatting | **Prettier** | Consistent code formatting across the team. |

### Why Not Native Apps?

A **Progressive Web App (PWA)** is the right choice for this project:
- Single codebase works on iOS, Android, and desktop
- "Add to Home Screen" provides app-like experience on both platforms
- No App Store review process, no 30% Apple/Google tax
- Instant updates — no waiting for store approval
- Offline-capable once loaded (service worker caches the app shell)
- Dramatically cheaper to build and maintain than 2–3 native apps
- The entire app is static — no server, no API, no database

---

## Design Philosophy & UX Principles

### Audience

Teens and young adults (roughly 14–22). Many will access this on phones, often older
models on slower connections. Some will be in school settings with restricted browsers.
Some will have disabilities. Design for all of them.

### Visual Identity

- **Tone:** Warm, approachable, trustworthy. Not childish, not corporate. Think
  "friendly guidance counselor's office" — inviting but professional.
- **Color palette:** A primary color (calm blue-green or teal) plus warm neutrals. Avoid
  red/green as primary meaning-carriers (color blindness). Fit bands use color + icon +
  text (triple-coded). Dark mode uses the same hue family at lower saturation.
- **Typography:** Clean sans-serif (Inter, or system font stack for zero network cost).
  Base size 16px minimum (prevents iOS zoom on input focus). Scale: 14/16/18/20/24/30/36px.
- **Spacing:** 4px base grid. Generous whitespace — teens disengage from cluttered screens.
  Minimum 16px padding on mobile, 24px on desktop.
- **Corners:** Rounded (8–12px radius on cards). Conveys approachability.
- **Elevation:** Subtle shadows for cards and interactive elements. Not flat, not skeuomorphic.
- **Icons:** Minimal, meaningful. Only where they add comprehension (fit band badges,
  navigation arrows). Never decorative-only.

### Interaction Principles

- **One question at a time.** Reduces cognitive load. The teen focuses on one scenario,
  not a wall of questions. Progress bar shows how far they've come.
- **Large, tappable option cards.** Not radio buttons. Each option is a full-width card
  (mobile) or generous card (desktop) with at least 48px height and 44px touch target.
  Clear selected state (border + background change + checkmark icon).
- **Encouraging micro-copy.** Before the first prompt: "There are no right or wrong
  answers — just pick what sounds most like you." Between sections: "Great, you're
  a third of the way through!" After completion: "Nice work! Here's what we found."
- **Back button always available.** Teens change their minds. Let them. No "are you sure?"
  dialogs. Going back restores the previous selection state.
- **No submit anxiety.** After the last prompt's "Next" tap, results appear with a
  smooth transition — no separate "Submit" button that creates performance anxiety.
- **Profile first, then matches.** The teen needs to understand their own preference
  profile before match cards make sense. Profile summary appears above the matches.
  This creates context — "here's what you told us" → "here's what fits."

---

## Phase W-1: Project Setup & Architecture

### Deliverables
- `web/` directory with initialized Next.js 15 project
- Tailwind CSS v4 configured with custom design tokens
- TypeScript strict mode, extending root tsconfig
- Core library importable from web app
- Dev server running on localhost:3000
- ESLint + Prettier configured
- Basic CI pipeline update (web lint + build)

### Technical Spec

**Next.js Configuration:**
```typescript
// next.config.ts
const config = {
  output: 'export',              // Static HTML export — no server needed
  images: { unoptimized: true }, // Required for static export
  trailingSlash: true,           // Better compatibility with static hosts
};
```

**Tailwind Design Tokens (tailwind.config.ts):**
```
Colors:
  primary: teal-600 / teal-400 (dark)     — main interactive color
  surface: white / gray-900 (dark)         — card and page backgrounds
  text:    gray-900 / gray-100 (dark)      — primary text
  muted:   gray-500 / gray-400 (dark)      — secondary text
  fit-strong:  emerald-600 / emerald-400 (dark)   — "Strong fit" badge
  fit-possible: blue-600 / blue-400 (dark)       — "Possible fit" badge
  fit-stretch: amber-600 / amber-400 (dark)      — "Stretch" badge
  fit-unlikely: gray-400 / gray-500 (dark)       — "Unlikely fit" badge
  danger:  red-600 / red-400 (dark)              — error states only

  Note: fit-band colors must meet WCAG contrast requirements against both
  light and dark surface backgrounds. Test each token pair explicitly —
  do not rely on automatic Tailwind dark variants, as the semantic meaning
  of these colors (fit quality) requires intentional dark-mode tuning.

Breakpoints:
  sm:  640px    — large phones (landscape)
  md:  768px    — tablets
  lg:  1024px   — small laptops
  xl:  1280px   — desktops

Fonts:
  sans: ['Inter', ...systemFontStack]      — or pure system stack for zero FOUT
```

**Import Strategy:**
The web app imports from the core library's source files directly (e.g.,
`import { PROMPTS, processResponses } from '../../src/index.js'`). This avoids a
separate build/publish step during development. For production, the core library
can optionally be published as an npm package.

### Acceptance Criteria
- [ ] `cd web && npm run dev` starts dev server without errors
- [ ] Tailwind classes render correctly
- [ ] Core library functions importable and callable
- [ ] TypeScript strict mode with zero errors
- [ ] ESLint passes with jsx-a11y plugin active
- [ ] CI pipeline runs web lint + build alongside core tests

---

## Phase W-2: Design System — Component Primitives

### Deliverables
- Complete set of reusable UI primitives in `web/src/components/ui/`
- Storybook-like visual verification (or a dedicated `/dev` page during development)
- All components keyboard-navigable and screen-reader-compatible
- Light and dark mode for every component

### Components

**Button**
- Variants: `primary` (filled), `secondary` (outlined), `ghost` (text only)
- Sizes: `sm`, `md`, `lg`
- States: default, hover, focus (visible ring), active, disabled
- Always renders as `<button>` (not `<div>`) or `<a>` for navigation
- Minimum touch target: 44×44px (WCAG 2.5.5)
- Loading state with spinner (for PDF generation, etc.)

**Card**
- Elevated surface with rounded corners and subtle shadow
- Variants: `default`, `interactive` (hover lift effect, cursor pointer), `selected`
  (border highlight + subtle background)
- Padding: 16px mobile, 24px desktop
- Focus ring visible when navigated to via keyboard

**Badge**
- Used for fit band indicators
- Variants map to fit bands: `strong` (emerald), `possible` (blue), `stretch` (amber),
  `unlikely` (gray)
- Always includes icon + text (never color alone): ✓ Strong fit, ~ Possible fit,
  ↗ Stretch, ○ Unlikely fit
- Small footprint, inline with text

**ProgressBar**
- Shows quiz completion as a visual bar with section-based labeling
- Header text shows section name + step within section (e.g., "Social (2 of 4)")
- The visual bar shows overall progress (0–100%) across all 32 prompts
- Section dots mark the 8 section boundaries (every 4 prompts = 1 dimension)
- Accessible: `role="progressbar"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`,
  `aria-label="Social section, question 2 of 4, overall 25% complete"`
- Animated fill (respects `prefers-reduced-motion`)

**DimensionBar**
- Renders the user's resolved level for one dimension using the correct visualization:
  - **Ordinal dimensions** (peopleDensity, interactionDemand, schedulePredictability,
    ruleDensity, errorPressure): horizontal segmented bar with one segment highlighted.
    Implies a spectrum — adjacent levels are visually adjacent.
  - **Categorical dimensions** (energyRhythm, primaryLoadType, workValue): row of
    discrete chips/cards with one highlighted. No implied spectrum or ordering.
- Label above, level name + explanation below
- Accessible: screen reader announces "People Density: solo"
- Used in Profile Summary section of results

**Tooltip**
- Triggered on hover (desktop) and long-press or tap (mobile)
- Keyboard accessible: shows on focus
- Auto-positioned (avoids viewport overflow)
- Used sparingly — only for supplemental info like "What does this mean?"
- `role="tooltip"`, `aria-describedby` on trigger

**SkipLink**
- Hidden by default, visible on first Tab press
- "Skip to main content" for keyboard/screen-reader users
- Required for WCAG 2.4.1

**ThemeToggle**
- Sun/moon icon toggle for light/dark mode
- Respects `prefers-color-scheme` as default, user override stored in sessionStorage
- `aria-label="Switch to dark mode"` / `"Switch to light mode"`

### Acceptance Criteria
- [ ] Every component renders correctly in light and dark mode
- [ ] Every interactive component has visible focus indicator
- [ ] Every component passes axe-core automated accessibility check
- [ ] Touch targets >= 44×44px on all interactive elements
- [ ] Components render correctly at 200% browser zoom

---

## Phase W-3: Layout, Navigation & Landing Page

### Deliverables
- Root layout with theme provider, font loading, metadata
- Header with navigation and theme toggle
- Footer with scope disclaimer and links
- Landing page that explains the tool and invites the teen to start
- Page transitions (smooth, respects reduced motion)
- Custom 404 page

### Landing Page Design

**Hero Section:**
- Headline: "Discover Work Environments That Fit You" (or similar — jobs-first framing)
- Subhead: "Answer 32 quick scenarios. See which real careers match your preferences.
  No sign-up. No data collected. Takes about 10 minutes."
- Primary CTA: large "Get Started" button
- Below CTA: "There are no wrong answers — this is about what you prefer, not what
  you're good at."

**How It Works Section (3 steps):**
1. "Read short scenarios about work situations" (icon: chat bubble)
2. "Pick the option that sounds most like you" (icon: tap/select)
3. "See jobs that match your work style" (icon: briefcase with checkmark)

**Trust Signals:**
- "Based on established vocational psychology research"
- "No data leaves your device — ever"
- "Not a test — there are no wrong answers"
- "One input among many — use alongside conversations with counselors and mentors"

**Footer (persistent across all pages):**
- "This tool explores work-environment preferences. It is not a career assessment,
  aptitude test, or guidance tool."
- Links: About & Methodology, Privacy Notice
- "Built on the Theory of Work Adjustment (Dawis & Lofquist, 1984)"

### About & Methodology Page (`/about`)

This page is linked from the footer and provides:

**About This Tool:**
- What Career-Matcher does (explores work-environment preferences)
- What it does NOT do (not an aptitude test, not career guidance, not a predictor)
- Who it's for (teens and young adults exploring career options)
- How to use the results (one input alongside counselor conversations, interest
  inventories, job shadows, etc.)

**Methodology:**
- Theory of Work Adjustment (Dawis & Lofquist, 1984) — brief explanation
- Holland RIASEC (used for the primaryLoadType dimension) — brief explanation
- The 8 dimensions measured and what they mean
- How matching works (fit bands, ordinal distance, elimination threshold)
- Link to O*NET as the source for job profile data

**Privacy Notice:**
- Zero data collection, zero cookies, zero third-party scripts
- All computation happens in the browser
- Closing the page erases everything unless the teen saves/shares
- COPPA compliance statement
- Contact information for questions

**Scope & Limitations:**
- 52-job database is a sample, not exhaustive
- Preferences change over time — results are a snapshot
- Not validated as a psychometric instrument
- Should not be used as a sole basis for career decisions

### Metadata (SEO & Social)

```html
<title>Career-Matcher — Discover Work Environments That Fit You</title>
<meta name="description" content="A free, private tool that helps teens explore
  which work environments match their preferences. No sign-up required." />
<meta property="og:image" content="/og-image.png" />
<!-- No tracking scripts. No third-party resources. -->
```

### Acceptance Criteria
- [ ] Landing page loads in < 2s on simulated 3G (Lighthouse)
- [ ] All text readable at 200% zoom without horizontal scroll
- [ ] Theme toggle works and persists for the session
- [ ] Skip link present and functional
- [ ] Footer disclaimer appears on every page
- [ ] Semantic HTML: proper heading hierarchy (h1 → h2 → h3), landmarks
  (`<header>`, `<main>`, `<footer>`, `<nav>`)

---

## Phase W-4: Prompt Flow Experience (Core UX)

This is the heart of the application. Get this right.

### Deliverables
- Full 32-prompt quiz flow with one-at-a-time presentation
- Option cards (not radio buttons) with clear selection state
- Progress indicator with section awareness
- Back navigation with state restoration
- Session state management (survives page refresh in non-incognito)
- Option-order shuffling (seeded, deterministic per session)
- Smooth animations between prompts (respects reduced motion)
- Keyboard navigation (arrow keys + Enter)
- Mobile-optimized layout

### State Architecture

```typescript
// Quiz state managed via useReducer
type QuizState = {
  responses: Map<string, number>;  // promptId → selected option index
  currentIndex: number;            // 0–31
  seed: number;                    // for option shuffle (generated once per session)
  startedAt: number;               // timestamp (not sent anywhere — local UX only)
};

type QuizAction =
  | { type: 'SELECT_OPTION'; promptId: string; optionIndex: number }
  | { type: 'GO_BACK' }
  | { type: 'GO_TO'; index: number }
  | { type: 'REPLAY_SECTION'; sectionIndex: number }  // re-enter prompts 4*n..4*n+3
  | { type: 'RESTORE'; state: QuizState };
```

**Storage Abstraction (critical for incognito):**
```typescript
// StorageAdapter tries in order:
// 1. sessionStorage (works in most incognito modes)
// 2. In-memory Map (always works, lost on tab close)
//
// NEVER use localStorage — Safari incognito throws on write,
// and we don't need cross-session persistence anyway.
//
// The adapter exposes: get(key), set(key, value), remove(key)
// All values are JSON-serialized strings.
```

### Prompt Presentation

**Layout (mobile — 320px to 767px):**
```
┌─────────────────────────────┐
│  ← Back    Social (2 of 4)  │  ← sticky header (section name + step within section)
├─────────────────────────────┤
│  ████████░░░░░░░░░░░░░░░░░  │  ← progress bar (overall, but labeled by section)
├─────────────────────────────┤
│                             │
│  "You get to pick where     │  ← scenario text (18px, semibold)
│   you work for the day.     │
│   Which sounds best?"       │
│                             │
│  ┌─────────────────────────┐│
│  │ A quiet room by myself  ││  ← option card (full width)
│  └─────────────────────────┘│    min-height: 56px
│                             │    padding: 16px
│  ┌─────────────────────────┐│    touch target: full card
│  │ A table with a few      ││
│  │ other people nearby     ││
│  └─────────────────────────┘│
│                             │
│  ┌─────────────────────────┐│
│  │ A busy coffee shop or   ││
│  │ open workspace with     ││
│  │ lots of energy          ││
│  └─────────────────────────┘│
│                             │
└─────────────────────────────┘
```

**Layout (desktop — 1024px+):**
```
┌───────────────────────────────────────────────────┐
│          ← Back       Social (2 of 4)             │
│          ████████░░░░░░░░░░░░░░░░░░░░░            │
├───────────────────────────────────────────────────┤
│                                                   │
│     "You get to pick where you work for the       │
│      day. Which sounds best?"                     │
│                                                   │
│   ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│   │ A quiet  │  │ A table  │  │ A busy   │       │
│   │ room by  │  │ with a   │  │ coffee   │       │
│   │ myself   │  │ few      │  │ shop or  │       │
│   │          │  │ people   │  │ open     │       │
│   │          │  │ nearby   │  │ workspace│       │
│   └──────────┘  └──────────┘  └──────────┘       │
│                                                   │
│          max-width: 720px, centered               │
└───────────────────────────────────────────────────┘
```

For prompts with 4 options (e.g., primaryLoadType), desktop uses a 2×2 grid.

**4-option prompts on small viewports (375px / iPhone SE):**
- 4 options stacked vertically may push the last option below the fold, especially
  with longer scenario text. This is acceptable — scrolling is fine — but each card
  must still meet the 44px minimum touch target and 16px padding.
- Test explicitly with the longest scenario text in the prompt set to ensure no
  option card is clipped or has its touch target compressed.
- If vertical space is critically tight, reduce card vertical padding from 16px to
  12px (still above 44px touch target minimum with text content) but never below.

**Selection Behavior:**
- Tapping/clicking an option selects it (visual: primary border + light background tint
  + subtle checkmark icon). Selection does NOT auto-advance. The teen must tap an
  explicit "Next" button to proceed. This prevents mistap frustration on mobile,
  gives time for cognitive confirmation, and satisfies WCAG 2.5.2 (no accidental
  activation) and WCAG 3.2.2 (no unexpected context change on input).
- The "Next" button appears below the options once a selection is made (disabled/hidden
  before selection). On desktop, it can also be triggered by pressing Enter.
- Changing the selection before tapping "Next" is free — just tap a different option.
- Keyboard: Arrow keys move between option cards. Enter or Space selects the focused
  option. Once selected, Tab moves focus to the "Next" button. Enter activates it.
- Screen reader: Each option is a `<button>` in a `<div role="group"
  aria-labelledby="scenario-heading">`. On selection, announce "Selected: [option text]."
  via `aria-live="polite"` region. "Next" button is announced when it becomes enabled.

**Transition Animation:**
- New prompt slides in from the right (or left if going back)
- Framer Motion `AnimatePresence` with `mode="wait"` for exit-before-enter
- Duration: 250ms ease-out (or instant if `prefers-reduced-motion`)
- The progress bar fills smoothly (CSS transition)

**Edge Cases:**
- First prompt: no "Back" button (or grayed out)
- Last prompt (32 of 32): "Next" button reads "See Results" and navigates to results page
- Refresh mid-quiz: state restored from sessionStorage (or lost if in-memory
  only — show "Looks like your progress was cleared. Start fresh?" with a friendly
  restart button)
- Corrupted storage: if saved state fails JSON.parse() or has unexpected shape,
  discard it silently and show the "progress was cleared" restart prompt. Never
  crash on bad storage data — treat storage as untrusted input.
- Browser back button: should navigate to previous prompt, not leave the quiz
  (use `history.pushState` or Next.js shallow routing)

**Section-Based Progress:**
- 32 prompts are grouped into 8 sections of 4 (one section per dimension).
- The progress header shows the **section name** and **step within the section**
  (e.g., "Social (2 of 4)") instead of "Question 8 of 32". This makes the task
  feel smaller and gives meaningful context about what's being asked.
- The overall progress bar still shows total progress (0–100%), but the primary
  framing is section-based.
- Section names use friendly labels, not dimension IDs:
  "Energy" · "Social" · "Interaction" · "Schedule" · "Structure" · "Work Type" ·
  "Pressure" · "Values"

**Section Transitions (shown between sections):**
- Brief inline banner between sections (not modal, not blocking, ~2s or dismiss):
  - After section 2 (25%): "Nice — 2 sections down, 6 to go."
  - After section 4 (50%): "Halfway there."
  - After section 6 (75%): "Almost done — just 2 sections left."
- Tone: factual, not patronizing. Appropriate for 14-year-olds and 22-year-olds
  alike. Avoid exclamation marks and phrases like "Great job!" that feel condescending
  to older teens.

### Acceptance Criteria
- [ ] All 32 prompts displayable with correct scenario text and options
- [ ] Option selection provides clear visual + accessible feedback
- [ ] Back navigation works and restores previous selection
- [ ] Progress shows section name + step within section (not "N of 32")
- [ ] Section transitions display between dimension groups
- [ ] State survives page refresh (sessionStorage path)
- [ ] State works in incognito mode (in-memory fallback)
- [ ] Keyboard navigation: Tab between options, Enter/Space to select, arrow keys work
- [ ] Screen reader: scenario announced, options announced, selection announced
- [ ] Explicit "Next" button advances to next prompt (no auto-advance)
- [ ] "Next" button disabled/hidden until an option is selected
- [ ] Last prompt shows "See Results" instead of "Next"
- [ ] Transitions smooth on 60fps target (or no animation if reduced motion)
- [ ] Works on 320px viewport (iPhone SE) without horizontal scroll
- [ ] 4-option prompts on 375px viewport: all cards meet 44px touch target minimum
- [ ] Longest scenario text + 4 options tested on iPhone SE viewport
- [ ] Options shuffled per session (same seed = same order)
- [ ] Browser back button navigates quiz (doesn't leave page)

---

## Phase W-5: Results Dashboard & Profile Summary

### Deliverables
- Results page with profile summary first, then matches (hierarchy: profile → matches)
- Profile summary visualization (bars for ordinal dimensions, chips for categorical)
- Expandable match cards with fit band, reasons, friction, metadata
- "Less Likely Fits" collapsible section
- "Something feel off?" selective replay by dimension section
- Empty state for no matches
- Exploration prompts / "what to do next" guidance
- Scope disclaimer as inline footer note (not banner)

### Results Page Layout

**Mobile Layout:**
```
┌─────────────────────────────┐
│  Your Results               │  ← h1
├─────────────────────────────┤
│                             │
│  ── Your Preference        │  ← h2 (profile FIRST — gives context)
│     Profile ───────────    │
│                             │
│  ┌─────────────────────────┐│
│  │ Energy Rhythm           ││  ← dimension visualization
│  │ [steady──●──burst─mixed]││    (bars for ordinal, chips for
│  │                         ││     categorical — see P1-5)
│  │ People Density          ││
│  │ [●solo──sm.grp──crowd] ││
│  │                         ││
│  │ ... (all 8 dimensions)  ││
│  └─────────────────────────┘│
│                             │
│  ── Your Top Matches ─────  │  ← h2 (matches SECOND — now meaningful)
│                             │
│  ┌─────────────────────────┐│
│  │ #1 Software Developer   ││  ← match card
│  │ [Strong fit ✓]          ││    fit badge (color + icon + text)
│  │                         ││
│  │ "Design and build apps  ││    job description
│  │  and websites..."       ││
│  │                         ││
│  │ ▸ Why this fits you     ││  ← expandable (tap to open)
│  │ ▸ Possible friction     ││  ← expandable
│  │ ▸ Education & outlook   ││  ← expandable
│  └─────────────────────────┘│
│                             │
│  ┌─────────────────────────┐│
│  │ #2 Data Scientist       ││  ← next match card
│  │ [Possible fit ~]        ││
│  │ ...                     ││
│  └─────────────────────────┘│
│                             │
│  ... (top 5–8 matches)      │
│                             │
│  ── Less Likely Fits ─────  │  ← h2, collapsed by default
│  │ (based on your current  ││
│  │  preferences)           ││
│  │ ▸ Show 12 less likely   ││  ← expand to see eliminated jobs
│  │   fits                  ││
│                             │
│  ── Something Feel Off? ── │  ← h2 (recovery path — see P1-4)
│  │ "You can revisit any    ││
│  │  section and change     ││
│  │  your answers."         ││
│  │ [↻ Redo: Schedule]      ││  ← per-section replay buttons
│  │ [↻ Redo: Social]        ││
│  │ ...                     ││
│                             │
│  ── Explore Further ─────  │  ← h2
│                             │
│  "These results reflect     │
│   your preferences today.   │
│   Preferences change — and  │
│   that's a good thing."     │
│                             │
│  • Talk to a school         │
│    counselor about jobs     │
│    that caught your eye     │
│  • Try a job-shadow day or  │
│    informational interview  │
│  • Revisit this tool in a   │
│    year — your answers may  │
│    surprise you             │
│                             │
│  ── Save Your Results ───  │  ← h2
│                             │
│  [🔗 Copy Share Link]       │  ← action buttons
│  [📋 Copy as Text]          │
│  [🖨 Print / Save as PDF]   │
│  [↻ Start Over]             │
│                             │
│  ─────────────────────────  │
│  Footer: scope disclaimer   │  ← scope disclaimer lives here
│  + temporal note + about    │    (inline note, not banner at top)
└─────────────────────────────┘
```

**Scope disclaimer:** Demoted from a top-of-page banner to an inline note in the
footer area. The disclaimer is important but should not dominate the first screen
of results. It reads: "This explores your work-environment preferences — not your
abilities or aptitude. Use alongside conversations with counselors and mentors."

**Desktop Layout:**
- Max-width: 800px centered
- Match cards can show fit reasons inline (not collapsed) since there's more space
- Profile summary uses horizontal bars/chips side-by-side
- Save/export buttons in a horizontal row
- Two-column layout for profile + matches side-by-side at wide viewports (1280px+)

### Match Card — Expanded View

When a match card is expanded ("Why this fits you"):

```
┌─────────────────────────────┐
│ #1 Software Developer       │
│ [Strong fit ✓]              │
│                             │
│ "Design and build apps      │
│  and websites..."           │
│                             │
│ Why this fits you:          │
│  • Matches your preference  │
│    for solo or small-group  │
│    work                     │
│  • Fits your interest in    │
│    analytical work          │
│  • Aligns with your         │
│    preference for moderate  │
│    schedule flexibility     │
│                             │
│ Possible friction:          │
│  • This role can involve    │
│    moderate error pressure  │
│    — slightly higher than   │
│    your preference          │
│                             │
│ Education: Bachelor's       │
│   degree in CS or related   │
│   (or self-taught +         │
│   portfolio)                │
│ Outlook: Very strong demand │
│   — projected growth 25%+   │
│                             │
│ ▾ Collapse                  │
└─────────────────────────────┘
```

### Profile Summary Visualization

**Two visualization styles** based on whether the dimension is ordinal or categorical:

**Ordinal dimensions** (peopleDensity, interactionDemand, schedulePredictability,
ruleDensity, errorPressure) — use a **segmented bar**. These dimensions have an
inherent spectrum (low → high) and a bar correctly implies adjacency and distance:

```
People Density
  ┌──────────┬──────────┬──────────┐
  │   solo   │ sm.group │  crowd   │
  │  ██████  │          │          │  ← "solo" highlighted
  └──────────┴──────────┴──────────┘
  Your preference: solo
  "You tend to prefer working on your own or with minimal company."
```

**Categorical dimensions** (energyRhythm, primaryLoadType, workValue) — use
**chips/cards**. These dimensions have no inherent order or spectrum, and a bar would
falsely imply that "burst" is between "steady" and "mixed", or that "creative" is
between "analytical" and "organizational":

```
Energy Rhythm
  ┌──────────┐  ┌──────────┐  ┌──────────┐
  │ ██steady██│  │  burst   │  │  mixed   │
  └──────────┘  └──────────┘  └──────────┘
  Your preference: steady
  "You tend to prefer a consistent, even-paced workday."

Work Type (primaryLoadType)
  ┌──────────┐  ┌──────────┐  ┌──────────────┐  ┌────────────────┐
  │ physical │  │██analyti.██│  │   creative   │  │ organizational │
  └──────────┘  └──────────┘  └──────────────┘  └────────────────┘
  Your preference: analytical
  "You're drawn to work that involves problem-solving and analysis."
```

**Common to both styles:**
- Highlighted item: primary color fill + bold text
- Non-highlighted items: muted background + muted text
- Below each visualization: one-sentence plain-language explanation
- Accessible: screen reader announces dimension name + resolved level + description
- Not interactive (display only) — no controls to change

### Exploration Prompts

The "Explore Further" section provides **actionable next steps** framed as exploration
(never prescription). These are static content, not generated — they're universal
suggestions for any teen regardless of profile:

1. "Talk to a school counselor or mentor about any jobs that caught your eye."
2. "Look up one of your top matches on the Bureau of Labor Statistics Occupational
   Outlook Handbook to learn more."
3. "Try a job-shadow day, informational interview, or volunteer experience related
   to a match."
4. "Take an interest inventory (like the Holland RIASEC) to explore from a different
   angle — interests and work environment are both important."
5. "Come back in 6–12 months and retake this — your preferences evolve, and that's
   perfectly normal."

### "Something Feel Off?" — Selective Replay

Teens may see results that don't resonate. Instead of forcing a full restart (32
questions), allow selective replay by dimension section:

- Display a "Something feel off?" collapsible section on the results page
- Inside, show one button per section: "Redo: Energy", "Redo: Social", etc.
- Tapping a section button navigates back to the quiz at that section's first prompt
  (e.g., prompt 5 for "Social"), with existing answers pre-selected
- The teen can change their answers for that 4-prompt section, then returns to results
- Results re-compute using the updated responses
- Also include a brief explanation: "Sometimes the wording doesn't click the first
  time. You can redo any section without starting over."

This addresses the "results feel wrong" scenario without requiring a full restart.

### Empty State (No Matches)

If all jobs are eliminated (rare but possible with extreme profiles):

```
┌─────────────────────────────┐
│  No strong matches found    │
│                             │
│  Your combination of        │
│  preferences is unusual —   │
│  that's not a problem,      │
│  it just means the jobs in  │
│  our current database don't │
│  align well.                │
│                             │
│  This could mean:           │
│  • Your ideal role might    │
│    be in a niche we haven't │
│    covered yet              │
│  • Talking to a counselor   │
│    could help surface       │
│    options we can't         │
│  • Your preferences might   │
│    shift over time          │
│                             │
│  [↻ Try Again]              │
│  [📋 View your profile]     │
└─────────────────────────────┘
```

### Acceptance Criteria
- [ ] Top 5–8 matches displayed with correct fit bands from core library
- [ ] Match cards expandable with reasons, friction, education, outlook
- [ ] Fit badges use color + icon + text (triple-coded for accessibility)
- [ ] "Less Likely Fits" collapsed by default, expandable
- [ ] Profile summary shows all 8 dimensions with correct resolved levels
- [ ] Ordinal dimensions use segmented bars; categorical dimensions use chips/cards
- [ ] Dimension visualizations accessible to screen readers
- [ ] Exploration prompts display (static, universal)
- [ ] Empty state handles zero-match case gracefully
- [ ] "Something feel off?" section with per-section replay buttons
- [ ] Selective replay navigates to correct section, pre-selects existing answers
- [ ] Results re-compute after section replay
- [ ] Profile summary appears ABOVE matches (provides context first)
- [ ] Scope disclaimer is an inline footer note (not a top-of-page banner)
- [ ] Temporal footer present ("preferences change")
- [ ] All content readable at 200% zoom, no horizontal scroll
- [ ] Page reachable via shareable URL (state decoded from URL hash)

---

## Phase W-6: Report Generation & Export

### Deliverables
- Print-friendly CSS layout (clean, no UI chrome) — this IS the PDF solution
- Shareable URL (resolved profile encoded in URL — no server)
- Copy-as-text to clipboard
- "Start Over" flow

### Print Layout (`@media print`)

- Hide: header, footer, navigation, theme toggle, expand/collapse buttons, export buttons
- Show: all match details expanded, full profile summary, scope disclaimer
- Typography: serif font for readability on paper, black text on white
- Page breaks: `break-inside: avoid` on match cards
- Margins: standard print margins (0.75in)
- Triggered by browser's native Ctrl/Cmd+P or "Print" button

### PDF / Print

- **Print CSS only** — no JS-based PDF generation (jsPDF + html-to-canvas would add
  ~80KB against the 200KB gzipped JS budget, for marginal benefit over browser
  print-to-PDF).
- The "Print / Save as PDF" button triggers `window.print()`, which opens the
  browser's native print dialog. Every modern browser offers "Save as PDF" in this
  dialog.
- The `@media print` stylesheet ensures the printed output includes:
  - Header with tool name and date
  - Scope disclaimer
  - All match cards (expanded) with fit bands
  - Profile summary
  - Exploration prompts
  - Footer with temporal note
- No server interaction. No additional JS dependencies.

### Shareable URL

**Encoding — encode results, not raw responses:**
- The share URL encodes the **resolved profile** (8 dimension levels), not the raw
  32 responses. This is both more compact and avoids exposing granular response data.
- 8 dimensions × ~2 bits each ≈ 16 bits = 2 bytes + 1 version byte = 3 bytes
- Base64url-encode → ~4–6 characters
- URL format: `https://domain.com/results/?p=<encoded-profile>`
- Recipient opens URL → profile decoded → `matchJobs()` called → results rendered
- No server storage, no database, no PII in the URL

**Implementation:**
```typescript
// Encode: ResolvedProfile → pack dimension levels into Uint8Array → base64url
// Decode: base64url → Uint8Array → unpack → ResolvedProfile → matchJobs()
// Include a version byte (first byte) for forward compatibility
// Note: selective replay is unavailable on shared links (no raw responses)
```

**Recipient context:**
- When a shared link is opened, display a brief banner at the top:
  "You're viewing someone's Career-Matcher results. Want to discover your own
  preferences? [Start yours →]"
- The recipient should understand they're seeing someone else's results, not
  taking the quiz themselves.

**Sharing UX:**
- "Copy Share Link" button → copies URL to clipboard → shows "Copied!" toast (2s)
- Link is self-contained — recipient sees full results without needing the sender's device
- No "share to social media" buttons (privacy: teens shouldn't be pushed to share
  preference data publicly)

### Copy as Text

- Formats results using the core library's `renderResultsAsText()` function
- Copies to clipboard via `navigator.clipboard.writeText()`
- Fallback: show text in a `<textarea>` for manual copy (older browsers)
- Shows "Copied!" toast confirmation

### Start Over

- "Start Over" button clears quiz state and navigates to landing page
- Confirmation: "Start a new exploration? Your current results won't be saved unless
  you've copied the link or downloaded a PDF." — two buttons: "Start Over" / "Go Back"
- Clear sessionStorage quiz state on confirmation

### Acceptance Criteria
- [ ] Print view is clean, readable, no UI chrome, proper page breaks
- [ ] Print button triggers native print dialog (browser save-as-PDF)
- [ ] Share URL encodes full state in < 50 characters
- [ ] Share URL decodes and renders correct results on a fresh browser
- [ ] Share URL works in incognito mode
- [ ] Copy-as-text produces readable plain text in clipboard
- [ ] "Start Over" clears state and returns to landing page
- [ ] All export features work on iOS Safari, Android Chrome, desktop browsers

---

## Phase W-7: Accessibility (WCAG 2.1 AA)

This phase is an audit and hardening pass — accessibility should be built into every
preceding phase. This phase verifies and fills gaps.

### Requirements Checklist

**Perceivable:**
- [ ] All images have alt text (or are aria-hidden if decorative)
- [ ] Color is never the sole indicator of meaning (fit bands: color + icon + text)
- [ ] Text contrast ratio >= 4.5:1 (normal text), >= 3:1 (large text/UI components)
- [ ] Content reflows at 320px CSS width without horizontal scroll (WCAG 1.4.10)
- [ ] Text scales to 200% without loss of content or functionality
- [ ] No text in images

**Operable:**
- [ ] All functionality available via keyboard (Tab, Shift+Tab, Enter, Space, Escape, arrows)
- [ ] No keyboard traps
- [ ] Skip-to-content link present and functional
- [ ] Focus order logical and sequential
- [ ] Focus indicators visible on all interactive elements (not just outline:none overrides)
- [ ] Touch targets >= 44×44px (WCAG 2.5.5 — AAA, but we target it)
- [ ] No content requires specific motion (tilting, shaking)
- [ ] Animations respect `prefers-reduced-motion`

**Understandable:**
- [ ] Language declared (`<html lang="en">`)
- [ ] Form elements have visible labels (not just placeholder text)
- [ ] Error messages clear and actionable
- [ ] Navigation consistent across pages
- [ ] No unexpected context changes on focus/input

**Robust:**
- [ ] Valid HTML (no duplicate IDs, proper nesting)
- [ ] ARIA roles and properties correct (`role="group"`, `aria-live`, `aria-label`, etc.)
- [ ] Tested with at least 2 screen readers (VoiceOver + NVDA or JAWS)
- [ ] Tested with browser zoom at 200%
- [ ] Tested with high-contrast mode (Windows)

### Screen Reader Interaction Flow

**Quiz:**
1. Page announces: "Question 8 of 32"
2. Scenario text read as heading
3. Options announced as a group of buttons
4. On selection: "Selected: A quiet room by myself. Moving to question 9."
5. Back button: "Go back to question 7"

**Results:**
1. Page announces: "Your Results — 5 job matches found"
2. Each match: "Number 1: Software Developer. Strong fit."
3. Expandable sections: "Why this fits you. Button, collapsed. Activate to expand."
4. Profile summary: "Your preference for People Density: solo."

### Testing Tools
- **axe-core** — automated scanning in unit tests and CI
- **Playwright + @axe-core/playwright** — automated scanning in E2E tests
- **Lighthouse accessibility audit** — CI gate (score >= 95)
- **Manual testing** — VoiceOver (macOS/iOS), NVDA (Windows), TalkBack (Android)

### Acceptance Criteria
- [ ] axe-core: zero violations across all pages
- [ ] Lighthouse accessibility: >= 95
- [ ] Full quiz completable via keyboard alone
- [ ] Full quiz completable via VoiceOver on iOS Safari
- [ ] Results navigable and understandable via screen reader
- [ ] All interactive elements have visible focus indicators
- [ ] No horizontal scroll at 320px viewport width

---

## Phase W-8: Privacy, COPPA Compliance & Incognito Support

### COPPA Compliance (Children's Online Privacy Protection Act)

This tool targets minors. COPPA is not optional. Violations carry FTC penalties
up to $50,000+ per incident.

**Architecture-level guarantees:**
- [ ] **Zero PII collection.** No names, emails, phone numbers, locations, photos,
  or any other personally identifiable information. Ever.
- [ ] **No account creation.** No login, no registration, no "save your profile."
- [ ] **No server-side state.** The web app is a static site. No API calls, no database,
  no backend. All computation happens in the browser.
- [ ] **No cookies.** Zero cookies of any kind — no session cookies, no analytics
  cookies, no advertising cookies.
- [ ] **No third-party scripts.** No Google Analytics, no Facebook Pixel, no Hotjar,
  no Intercom, no social media SDKs, no CDN-hosted fonts (bundle fonts locally or
  use system fonts), no third-party iframes.
- [ ] **No behavioral advertising.** No ad networks, no retargeting, no data brokers.
- [ ] **No fingerprinting.** Do not access device fingerprint signals (canvas fingerprint,
  WebGL renderer, battery status, etc.).
- [ ] **Content Security Policy headers** in next.config.ts restricting script-src,
  frame-src, connect-src to self only.

**Privacy Notice:**
- Required: a clear, age-appropriate privacy notice accessible from every page
- Language: "We don't collect your information. Your answers stay on your device.
  When you close this page, your responses are gone — unless you save or share your
  results yourself."
- Location: linked from footer, accessible from About page, shown during quiz intro

**If analytics are desired (optional):**
- Use a privacy-respecting, cookieless analytics tool (Plausible or Fathom)
- Configure to not collect any PII (no IP logging, no user agent logging)
- Aggregate page views only — no individual session tracking
- Disclose in privacy notice: "We count page views to improve the tool. We do not
  track you individually."
- Self-hosted Plausible preferred over cloud (maximum control)

### Incognito / Private Browsing Support

**Goal:** Every feature works identically in incognito mode. No degraded experience.

**Browser-specific behaviors to handle:**

| Browser | sessionStorage | localStorage | Service Worker | IndexedDB |
|---------|---------------|--------------|----------------|-----------|
| Chrome Incognito | ✓ works | ✓ works (cleared on close) | ✓ works | ✓ works |
| Safari Private | ✓ works | ✗ throws on write | ✗ disabled | ✗ disabled |
| Firefox Private | ✓ works | ✓ works (cleared on close) | ✗ disabled | ✗ disabled |
| Edge InPrivate | ✓ works | ✓ works (cleared on close) | ✓ works | ✓ works |

**Storage Abstraction Implementation:**

```typescript
class StorageAdapter {
  private fallback = new Map<string, string>();
  private useSessionStorage: boolean;

  constructor() {
    // Test if sessionStorage works (it does in all incognito modes)
    try {
      sessionStorage.setItem('__test', '1');
      sessionStorage.removeItem('__test');
      this.useSessionStorage = true;
    } catch {
      this.useSessionStorage = false;
    }
  }

  get(key: string): string | null {
    if (this.useSessionStorage) return sessionStorage.getItem(key);
    return this.fallback.get(key) ?? null;
  }

  set(key: string, value: string): void {
    if (this.useSessionStorage) {
      try { sessionStorage.setItem(key, value); } catch { this.fallback.set(key, value); }
    } else {
      this.fallback.set(key, value);
    }
  }

  remove(key: string): void {
    if (this.useSessionStorage) sessionStorage.removeItem(key);
    this.fallback.delete(key);
  }
}
```

**Incognito-specific UX notes:**
- If in-memory fallback is active (sessionStorage unavailable), show a subtle
  non-intrusive note: "Your progress is stored for this tab only. Refreshing
  the page will start over." This is informational, not a warning.
- Shareable URLs work regardless of storage mode (state is in the URL, not storage).
- PDF/print/copy-text work regardless of storage mode.
- Service worker may not work in some incognito modes — the app must function
  fully without it (service worker is a progressive enhancement, not a requirement).

### Acceptance Criteria
- [ ] Zero network requests to third-party domains (verify via DevTools Network tab)
- [ ] Zero cookies set (verify via DevTools Application tab)
- [ ] Content Security Policy header blocks third-party scripts
- [ ] Privacy notice accessible from every page
- [ ] Full quiz + results flow works in Safari Private Browsing
- [ ] Full quiz + results flow works in Chrome Incognito
- [ ] Full quiz + results flow works in Firefox Private Browsing
- [ ] sessionStorage fallback to in-memory works when storage is unavailable
- [ ] Share URL works when opened in incognito (decodes and renders results)
- [ ] No console errors in any incognito mode

---

## Phase W-9: Performance & Progressive Web App

### Performance Targets

| Metric | Target | Measured By |
|--------|--------|-------------|
| First Contentful Paint | < 1.5s (3G) | Lighthouse |
| Largest Contentful Paint | < 2.5s (3G) | Lighthouse |
| Total Blocking Time | < 200ms | Lighthouse |
| Cumulative Layout Shift | < 0.1 | Lighthouse |
| Time to Interactive | < 3.5s (3G) | Lighthouse |
| Total JS bundle (gzipped) | < 200KB | webpack-bundle-analyzer |
| Lighthouse Performance | >= 95 | Lighthouse CI |
| Lighthouse Accessibility | >= 95 | Lighthouse CI |
| Lighthouse Best Practices | >= 95 | Lighthouse CI |
| Lighthouse SEO | >= 95 | Lighthouse CI |

### Optimization Strategies

**Code Splitting:**
- Landing page: minimal JS (just the landing page + theme toggle)
- Quiz page: loads prompt data + quiz state logic
- Results page: loads matcher + results formatter + visualization components
- Print: uses `@media print` CSS only — no additional JS to load
- Next.js App Router handles this automatically with route-based splitting

**Font Loading:**
- Option A (recommended): System font stack (`-apple-system, BlinkMacSystemFont,
  "Segoe UI", Roboto, sans-serif`) — zero font requests, zero FOUT
- Option B: Self-hosted Inter with `font-display: swap` and preload link — slightly
  better visual consistency at the cost of one font request

**Image Optimization:**
- Minimal images needed (this is primarily a text/card-based UI)
- PWA icons: pre-optimized PNGs at exact required sizes (192, 512)
- OG image: pre-optimized, < 100KB
- Use SVG for icons (inline, not external files)

**Caching:**
- The app is a static export — CDN edge caching with appropriate `Cache-Control`
  headers handles most caching needs automatically.
- **Service worker is deferred.** A service worker adds complexity (update flow,
  cache invalidation, debugging) for marginal benefit over CDN caching on a static
  site. The app already loads fast without one. If offline support is later deemed
  essential, add a minimal service worker in a follow-up — but do not include it
  in the initial launch.
- The app must function fully without a service worker (it already does).

### Progressive Web App (PWA)

**manifest.json:**
```json
{
  "name": "Career-Matcher",
  "short_name": "CareerMatch",
  "description": "Discover work environments that fit you",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#0d9488",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

**Capabilities:**
- "Add to Home Screen" prompt on Android (automatic after engagement heuristics)
- "Add to Home Screen" on iOS (manual via Share → Add to Home Screen)
- Standalone display mode (no browser chrome)
- Custom theme color for status bar
- Offline support: full app usable without network after first load
- Splash screen on launch (icon + name)

### Acceptance Criteria
- [ ] Lighthouse Performance >= 95 on mobile simulation
- [ ] Total JS bundle < 200KB gzipped
- [ ] No layout shift during page load (CLS < 0.1)
- [ ] App installs as PWA on Android Chrome (manifest.json + icons)
- [ ] App installs as PWA on iOS Safari (Add to Home Screen)
- [ ] No render-blocking resources
- [ ] Service worker deferred to post-launch (app works without one)
- [ ] Fonts load without FOUT (or system fonts used)

---

## Phase W-10: Cross-Device & Cross-Browser Testing

### Test Matrix

| Device | Browser | Priority | Key Concerns |
|--------|---------|----------|-------------|
| iPhone SE (375×667) | Safari | Critical | Smallest common phone viewport, iOS quirks |
| iPhone 14/15 (390×844) | Safari | Critical | Dynamic Island safe area, dvh units |
| iPad (768×1024) | Safari | High | Tablet layout, touch + keyboard |
| Android phone (360×800) | Chrome | Critical | Most common Android viewport |
| Android tablet (800×1280) | Chrome | Medium | Tablet layout |
| Desktop (1920×1080) | Chrome | Critical | Primary desktop browser |
| Desktop (1920×1080) | Firefox | High | Second most common |
| Desktop (1440×900) | Safari | High | macOS users |
| Desktop (1920×1080) | Edge | Medium | Windows default |

### Platform-Specific Issues to Verify

**iOS Safari:**
- [ ] 100vh works correctly (use `100dvh` for dynamic viewport height that accounts
  for the address bar shrinking/growing)
- [ ] No zoom on input focus (ensure base font size >= 16px)
- [ ] Safe area insets respected (`env(safe-area-inset-*)` for notch/Dynamic Island)
- [ ] Touch targets work in all orientations
- [ ] No rubber-band bounce interfering with quiz scrolling
- [ ] App functions without service worker (deferred to post-launch)
- [ ] "Add to Home Screen" works and produces standalone app

**Android Chrome:**
- [ ] Virtual keyboard doesn't obscure option cards (use `visualViewport` API)
- [ ] Back button behavior correct (navigates quiz, doesn't leave app)
- [ ] PWA installation prompt appears
- [ ] Touch feedback (ripple or highlight) on option cards

**Desktop Browsers:**
- [ ] Mouse hover states on option cards (subtle, not required for function)
- [ ] Keyboard navigation complete (Tab, Shift+Tab, Enter, Space, Escape)
- [ ] Right-click context menu not broken by event handlers
- [ ] Ctrl/Cmd+P triggers print layout correctly
- [ ] Browser zoom to 200% — no horizontal scroll, no content loss

**Cross-Cutting:**
- [ ] Dark mode renders correctly on all platforms
- [ ] Animations smooth (60fps) or disabled (reduced motion) on all platforms
- [ ] Share URLs work when shared from one platform to another
- [ ] PDF download works on all platforms
- [ ] Copy-to-clipboard works on all platforms (with fallback on older browsers)

### Automated Testing (Playwright)

```typescript
// playwright.config.ts — test across 3 browser engines + mobile
export default defineConfig({
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    { name: 'mobile-chrome', use: { ...devices['Pixel 7'] } },
    { name: 'mobile-safari', use: { ...devices['iPhone 14'] } },
  ],
});
```

### Acceptance Criteria
- [ ] Playwright E2E tests pass on all 5 browser configurations
- [ ] Manual QA checklist completed for iOS Safari and Android Chrome
- [ ] No horizontal scroll on any viewport >= 320px
- [ ] No broken layouts in any tested browser
- [ ] All interactive features work on touch, mouse, and keyboard

---

## Phase W-11: Deployment & Operations

### Hosting

**Recommended: Vercel (free tier)**
- Native Next.js support (built by the same team)
- Automatic static export detection
- Global CDN (edge network)
- Free SSL
- Automatic deployments from git push
- Preview deployments for PRs
- Free tier: 100GB bandwidth/month (more than enough)

**Alternative: Cloudflare Pages (free tier)**
- Excellent global CDN performance
- Free SSL
- 500 builds/month, unlimited bandwidth
- Slightly more manual Next.js static export setup

**Either option:** Zero server costs. The app is a static site.

### Custom Domain

- Register a domain (e.g., `careermatcher.org` or similar)
- Point DNS to hosting provider
- SSL is automatic with both Vercel and Cloudflare

### CI/CD Pipeline (Updated)

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  # Job 1: Core library (unchanged)
  core:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: npm }
      - run: npm ci
      - run: npm run lint
      - run: npm test
      - run: npm run build

  # Job 2: Web application
  web:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: npm }
      - run: npm ci                         # root dependencies
      - run: cd web && npm ci               # web dependencies
      - run: cd web && npm run lint         # ESLint + tsc
      - run: cd web && npm run test         # Vitest component tests
      - run: cd web && npm run build        # Next.js static export

  # Job 3: E2E tests (after web build)
  e2e:
    needs: web
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: npm }
      - run: npm ci && cd web && npm ci
      - run: cd web && npx playwright install --with-deps
      - run: cd web && npm run test:e2e

  # Job 4: Lighthouse audit (after web build)
  lighthouse:
    needs: web
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: npm }
      - run: npm ci && cd web && npm ci
      - run: cd web && npm run build
      - name: Lighthouse CI
        uses: treosh/lighthouse-ci-action@v12
        with:
          configPath: web/lighthouserc.json
          uploadArtifacts: true
```

### Error Monitoring (Optional)

If error monitoring is desired:
- Use a self-hosted or privacy-respecting error tracker
- No PII in error reports (no user agent strings, no IP addresses)
- Log only: page URL, error message, stack trace, browser name
- Consider: simply relying on user feedback initially (simpler, no privacy concerns)

### Deployment Checklist

Before first public deployment:
- [ ] All Lighthouse scores >= 95
- [ ] All E2E tests pass
- [ ] All accessibility tests pass
- [ ] Privacy notice page live
- [ ] Content Security Policy headers verified
- [ ] No third-party network requests (DevTools audit)
- [ ] No cookies (DevTools audit)
- [ ] Tested in incognito on Safari, Chrome, Firefox
- [ ] PWA installable on iOS and Android
- [ ] Share URLs work cross-browser
- [ ] Print layout verified
- [ ] Custom 404 page works
- [ ] OG image and meta tags verified (use a social card validator)

---

## Web App Testing Strategy

### Test Pyramid

```
          ╱ ╲
         ╱ E2E╲            ~15 tests — Playwright, cross-browser
        ╱───────╲           Full user flows (landing → quiz → results → export)
       ╱ Integr. ╲         ~25 tests — Vitest + Testing Library
      ╱─────────────╲       Component composition, hooks, state management
     ╱    Unit       ╲      ~40 tests — Vitest
    ╱─────────────────╲     Individual components, utilities, storage adapter
   ╱  Core Library      ╲   78 tests — Vitest (existing, unchanged)
  ╱───────────────────────╲  Scoring, matching, formatting, validation
```

### E2E Test Scenarios (Playwright)

1. **Happy path:** Landing → Start → Complete 32 prompts → See results → Verify top match
2. **Back navigation:** Select option → Go back → Change answer → Verify updated results
3. **Keyboard-only:** Complete full quiz using only Tab + Enter/Space
4. **Share URL:** Complete quiz → Copy share link → Open in new tab → Verify same results
5. **Print:** Complete quiz → Trigger print → Verify print layout (screenshot comparison)
6. **Mobile viewport:** Repeat happy path on iPhone SE viewport
7. **Dark mode:** Toggle dark mode → Complete quiz → Verify results render in dark theme
8. **Incognito simulation:** Clear sessionStorage → Complete quiz → Verify in-memory works
9. **Refresh mid-quiz:** Answer 16 questions → Refresh → Verify state restored
10. **Empty state:** Use extreme synthetic profile → Verify empty state messaging
11. **Accessibility:** Run axe-core on every page during E2E flow
12. **PWA offline:** Load app → Go offline → Navigate quiz → Verify functionality

### Testing Invariants (Web App)

After completing any web phase, verify:

```bash
cd web
npm run lint        # Zero type errors, zero ESLint warnings
npm run test        # All component/hook tests pass
npm run test:e2e    # All Playwright tests pass
npm run test:a11y   # Zero accessibility violations
npm run lighthouse  # All scores >= 90 (target 95)
```

Additionally, manually verify on a real iPhone (Safari) and real Android phone (Chrome)
that the quiz flow feels natural, touch targets are comfortable, and text is readable.

---

## Phase Execution Order

Phases should be executed in this order due to dependencies:

```
W-1  Project Setup ──────────────────────────────────────────┐
  │                                                          │
W-2  Design System (can start after W-1) ─────────┐         │
  │                                                │         │
W-3  Layout & Landing (needs W-1 + W-2) ──────────┤         │
  │                                                │         │
W-4  Prompt Flow (needs W-2 + W-3) ───────────────┤         │
  │                                                │         │
W-5  Results Dashboard (needs W-2 + W-4) ─────────┤         │
  │                                                │         │
W-6  Report & Export (needs W-5) ──────────────────┤         │
  │                                                │         │
W-7  Accessibility Audit (needs W-4 + W-5 + W-6) ─┤         │
  │                                                │         │
W-8  Privacy & COPPA (can start after W-1,         │         │
  │   finalize after W-6) ─────────────────────────┤         │
  │                                                │         │
W-9  Performance & PWA (needs W-6) ────────────────┤         │
  │                                                │         │
W-10 Cross-Device QA (needs all above) ────────────┤         │
  │                                                │         │
W-11 Deployment (needs W-10) ──────────────────────┘         │
                                                             │
  Core library tests must pass at every phase ───────────────┘
```

W-7 (accessibility) and W-8 (privacy) are listed as distinct phases for audit purposes,
but their requirements should be built into W-2 through W-6 from the start. The dedicated
phases are verification passes, not "add accessibility later" phases.

---

## Remaining Work

**Core library:** Complete. No outstanding items.

**Web application:** All phases (W-1 through W-11) pending. Begin with W-1.

---

## Web Plan Review — Remediation Log

The web application development plan was reviewed and 10 findings were identified.
All 10 have been incorporated into the phase specs above. Summary:

| # | Priority | Finding | Resolution |
|---|----------|---------|------------|
| 1 | P0 | Auto-advance (400ms) is a UX risk — mistaps, WCAG 3.2.2 | Replaced with explicit "Next" button (Phase W-4) |
| 2 | P0 | Results page hierarchy inverted — profile buried below matches | Profile summary moved above matches; scope disclaimer demoted to footer note (Phase W-5) |
| 3 | P1 | "N of 32" progress is demotivating | Replaced with section-based milestones: "Social (2 of 4)" (Phase W-4) |
| 4 | P1 | No "results feel wrong" recovery path | Added selective per-section replay + "Something feel off?" section (Phases W-4, W-5) |
| 5 | P1 | Dimension bars misrepresent non-ordinal data | Segmented bars for ordinal dimensions; chips/cards for categorical (Phase W-5) |
| 6 | P2 | Share URL exposes raw responses | Encodes resolved profile instead; added recipient-facing context banner (Phase W-6) |
| 7 | P2 | Dark mode fit-band colors unspecified | Added explicit light/dark token pairs for all fit-band colors (Phase W-1) |
| 8 | P2 | jsPDF adds ~80KB against 200KB budget | Removed jsPDF; print CSS only, browser save-as-PDF (Phase W-6) |
| 9 | P3 | 4-option touch targets tight on iPhone SE | Added explicit testing requirements for longest scenario + 4 options on 375px (Phase W-4) |
| 10 | P3 | Misc: time estimate, patronizing copy, about page unspecified, corrupted storage, service worker complexity | Fixed: time → "about 10 minutes"; tone guidance added; About page spec added (Phase W-3); corrupted storage recovery added (Phase W-4); service worker deferred to post-launch (Phase W-9) |
