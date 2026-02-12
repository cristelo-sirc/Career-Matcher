# Changelog

All notable changes to Career-Matcher are documented in this file.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [0.12.0] — 2026-02-12

### Added
- 23 new future-proof jobs across Green Tech, Human-Machine Teaming, Longevity Economy, Experience Economy, and Resilient Fundamentals
- `futureOutlook` field to `Job` interface for forward-looking automation risk assessment
- `FUTURE_WORK_REPORT.md` comprehensive labor market analysis

### Changed
- Updated all 47 retained jobs with specific `futureOutlook` notes (Resilient, Transforming, Stable, etc.)
- Modernized `CLAUDE.md` with new job statistics and lessons learned on model resilience

### Removed
- 5 obsolete/high-risk jobs: Bank Teller, Accounting Clerk, Truck Driver, Office Administrator, Retail Sales Associate

## [0.11.0] — 2026-02-09

### Added
- PWA icons (192×192, 512×512, 180×180 Apple touch, 32×32 favicon)
- Open Graph image for social sharing
- `robots.txt` and `sitemap.xml`
- GitHub Actions CI pipeline (core + web lint/test/build)
- GitHub Actions deploy pipeline (GitHub Pages)
- Lighthouse CI configuration (`lighthouserc.json`)
- `.gitignore` for clean repository

## [0.10.0] — 2026-02-08

### Added
- 191 Playwright E2E tests across 5 browser configurations (Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari)
- Manual QA checklist for iPhone/iPad testing
- Dark mode infrastructure (class-based + prefers-color-scheme)
- Platform-specific CSS fixes for iOS Safari

### Fixed
- WCAG contrast ratios on fit band badges
- ESLint `any` casts replaced with `unknown` in E2E specs
- Vitest config excludes E2E directory

## [0.9.0] — 2026-02-07

### Added
- PWA `manifest.json` for "Add to Home Screen"
- Bundle size verification (all routes under 200KB gzipped)
- Performance audit pass

## [0.8.0] — 2026-02-06

### Added
- Content Security Policy meta tag
- Privacy notice page
- COPPA compliance verification (zero PII, zero cookies, zero third-party scripts)

## [0.7.0] — 2026-02-05

### Added
- Accessibility audit pass (WCAG 2.1 AA)
- Skip-to-content link
- Keyboard navigation with arrow keys for option cards
- Focus trap management in quiz flow
- axe-core integration in unit and E2E tests

## [0.6.0] — 2026-02-04

### Added
- Print CSS layout for results
- Shareable URL encoding (base64 profile → query param)
- Copy-as-text export for results
- "Start Over" functionality

## [0.5.0] — 2026-02-03

### Added
- Results dashboard with fit band categories (Strong, Possible, Stretch, Less Likely)
- Profile summary showing resolved dimension levels
- Match cards with fit reasons and friction points
- Empty state messaging for extreme profiles
- "Retake Quiz" option

## [0.4.0] — 2026-02-02

### Added — Core Library
- Expanded job database from 25 to 54 jobs (O*NET-informed profiles)
- Expanded prompts from 16 to 32 (4 per dimension)
- Replaced debunked "Learning Mode" dimension with "Work Value"
- Ordinal distance scoring (adjacency = 0.5 mismatch)
- Seeded PRNG option-order shuffling (Fisher-Yates + Mulberry32)
- `validateDataIntegrity()` build-time data validation
- `formatResults()` for fit band assignment

### Changed
- Elimination threshold updated to weighted mismatch ≥ 2.0
- "Ruled Out" language softened to "Less Likely Fits"
- Fit bands replace raw percentage scores

## [0.3.0] — 2026-02-01

### Added
- Quiz prompt flow (32 prompts, option cards, progress bar)
- Back navigation with answer persistence
- State management (React Context + useReducer)
- Storage abstraction (sessionStorage + in-memory fallback)

## [0.2.0] — 2026-01-31

### Added
- Design system: 8 UI primitives (Button, Card, Badge, ProgressBar, DimensionBar, Tooltip, SkipLink, ThemeToggle)
- Layout components (Header, Footer)
- Landing page with hero, "How It Works," and trust signals
- About page
- Custom 404 page
- Tailwind CSS v4 with `@theme` design tokens

## [0.1.0] — 2026-01-30

### Added — Initial Release
- Core matching library (TypeScript, zero runtime dependencies)
- 8 work-environment dimensions (7 primary + 1 secondary)
- 16 situational prompts (2 per dimension)
- 25 seed jobs with dimension profiles
- Scoring engine: response → dimension scores → user profile
- Matching engine: profile → ranked job matches with explanations
- 78 unit tests (Vitest)
