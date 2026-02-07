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

- **Version:** 0.3.0 — All remediation phases complete (1–5, 6.1, 6.3)
- **Stack:** TypeScript 5.3.3 strict, Vitest 1.2.0, zero runtime dependencies
- **Architecture:** 4-phase pipeline: Measure (prompts) → Score → Match → Format
- **Tests:** 72 passing (scoring, matching, results, validation, integration, boundary)
- **Jobs:** 52 jobs across 12+ sectors with O*NET-informed profiles
- **Prompts:** 32 situational prompts (4 per dimension)
- **CI:** GitHub Actions pipeline (lint, test, build)
- **Reviews completed:**
  - `DESIGN_REVIEW.md` — V&V engineering review (10 findings: V-01..V-05, VAL-01..VAL-05)
  - `EXPERT_REVIEW_VOCATIONAL_PSYCHOLOGY.md` — independent domain expert review (verdict: conditionally sound)

## Build / Test / Lint

```bash
npm test          # vitest run — all tests
npm run test:watch # vitest watch mode
npm run lint      # tsc --noEmit (type-check only)
npm run build     # tsc → dist/
```

## Key Design Rules (Do Not Violate)

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
6. **No external runtime dependencies.** This library must remain zero-dependency for
   security, auditability, and trust (it targets minors).

## File Map

```
src/
  index.ts              — Public API surface; re-exports all consumer-facing symbols
  types.ts              — Core interfaces: Job, UserDimensionProfile, MatchResult, etc.
  dimensions.ts         — 8 dimension definitions, level types, metadata, ordinal flags
  jobs.ts               — 52 job profiles with O*NET-informed dimensions and metadata
  prompts.ts            — 32 situational prompts, 4 per dimension
  scoring.ts            — Phase 2: nudge accumulation, level resolution, profile generation
  scoring.test.ts       — Tests for scoring engine (incl. out-of-bounds warnings)
  matcher.ts            — Phase 3: scoreJob(), matchJobs() — ordinal distance + elimination
  matcher.test.ts       — Tests for matcher (archetypes, center/conflicted, boundaries)
  results.ts            — Phase 4: fitBand(), formatResults(), renderResultsAsText()
  results.test.ts       — Tests for result formatting (fit bands, soft language, no-matches)
  validate.ts           — Data integrity validation for prompts and jobs
  validate.test.ts      — Tests for validation (valid data + malformed data detection)
  integration.test.ts   — End-to-end pipeline tests (responses → text output)
.github/
  workflows/ci.yml      — CI: checkout → type-check → test → build
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
| 6 | primaryLoadType | physical, analytical, creative, organizational | Primary | No | OK — documented as interest dimension (RIASEC correspondence) |
| 7 | errorPressure | low, moderate, high | Primary | Yes | OK — prompts rewritten to measure environmental tolerance |
| 8 | workValue | autonomy, security, altruism, achievement | Secondary | No | OK — replaced debunked learningMode |

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

# REMEDIATION PLAN

Below is the phased plan to address all findings from both reviews. Completed phases are
marked with ✓.

## Phase 1: Fix the Construct Model ✓ COMPLETE

### 1.1 Replace "Learning Mode" with "Work Values" dimension ✓

Replaced debunked learningMode (Pashler et al., 2008) with workValue dimension
(autonomy/security/altruism/achievement). Updated all files: dimensions.ts, types.ts,
prompts.ts (4 new wv-* prompts), jobs.ts (all profiles), matcher.ts, scoring.ts,
index.ts, and all test files.

### 1.2 Reclassify "Primary Load Type" as an interest dimension ✓

Added JSDoc documentation in dimensions.ts noting Holland RIASEC correspondence
(physical ≈ Realistic, analytical ≈ Investigative, creative ≈ Artistic,
organizational ≈ Enterprising/Conventional). No structural changes — documentation fix.

### 1.3 Rewrite Error Pressure prompts ✓

Replaced 2 prompts measuring emotional reaction to mistakes with 4 prompts measuring
environmental tolerance for high-stakes work. Frame as preference between environments,
not reaction to mistakes.

### 1.4 Increase item count to 4 prompts per dimension ✓

Expanded from 16 to 32 prompts (4 per dimension). Option presentation order varied
across prompts to mitigate order bias. All archetypal profiles produce sensible results.

## Phase 2: Fix the Matching Algorithm ✓ COMPLETE

### 2.1 Replace percentage scores with ordinal fit bands ✓

Added fitBand() function mapping fitScore to Strong fit/Possible fit/Stretch/Unlikely fit.
fitPercent kept in data model for debug use but not displayed to users.

### 2.2 Soften elimination language ✓

Changed "Ruled Out" to "Less Likely Fits (based on your current preferences)".
Added scope disclaimer header and temporal footer to output.

### 2.3 Add ordinal distance to mismatch scoring ✓

Added ordinal flag to DimensionMeta. Adjacent mismatches = 0.5, full = 1.0.
Elimination threshold: weighted mismatch >= 2.0. Softer friction messages for adjacency.

## Phase 3: Fix Verification Gaps ✓ MOSTLY COMPLETE

### 3.1 Add prompt/job data integrity validation ✓

Created validate.ts with validateDataIntegrity() function. Validates all prompt
dimensions, nudgeToward values, and job profile levels against DIMENSION_META.
4 tests covering valid data and malformed data detection.

### 3.2 Tighten the `DimensionScores` type — DEFERRED

Complex type-level refactor with diminishing returns given Phase 3.1's runtime
validation covers the same risk surface. May revisit in a future iteration.

### 3.3 Add warning for out-of-bounds option indices ✓

processResponses() now returns { scores, warnings } with descriptive warning messages
for invalid response indices.

### 3.4 Document tie-breaking behavior ✓

Added JSDoc to resolveLevel (insertion order per ES2015+ spec) and matchJobs
(stable sort by input array position).

## Phase 4: Fix Validation Gaps ✓ COMPLETE

### 4.1 Add end-to-end integration test ✓

Created integration.test.ts with full pipeline tests for Quiet Builder and Social
Organizer archetypes. Verifies: profile resolution from prompt responses, job ranking
correctness, fit band display, metadata output, scope disclaimer, and soft elimination
language. 13 tests.

### 4.2 Add ambiguous/center profile testing ✓

Added Moderate Middle profile (all center values) — verifies no crash, many survivors,
deterministic ranking. Added Conflicted profile (solo + constant interaction) — verifies
graceful handling, appropriate eliminations, accurate friction messages. 5 tests.

### 4.3 Add adversarial "no matches" test ✓

Created 3 extreme synthetic jobs against an opposite profile. Verifies all eliminated,
empty topMatches, "No strong matches found" in output, and scope disclaimer present
even with zero matches. 4 tests.

### 4.4 Add elimination boundary tests ✓

Tested all boundary conditions with synthetic jobs: 1 full mismatch (not eliminated),
2 full (eliminated at 2.0), 2 adjacent (not eliminated at 1.0), 1 full + 1 adjacent
(not eliminated at 1.5), 1 full + 2 adjacent (eliminated at 2.0), 4 adjacent
(eliminated at 2.0), 3 adjacent (not eliminated at 1.5), and 2-step ordinal gap
verified as full mismatch. 8 tests.

## Phase 5: Expand Job Database ✓ COMPLETE

### 5.1 Add 25+ new jobs covering missing sectors ✓

Expanded from 25 to 52 jobs. Added 27 new jobs across: healthcare (registered nurse,
pharmacist, physical therapist, medical assistant), education (teacher, school counselor),
STEM (civil engineer, environmental scientist, cybersecurity analyst), finance (financial
advisor, bank teller), government/public service (firefighter, social worker, urban
planner, police officer), emerging tech (UX designer, robotics technician, renewable
energy installer), arts/entertainment (sound engineer, animator, museum curator),
entrepreneurship (small business owner), and additional roles (plumber, journalist,
personal trainer, real estate agent, flight attendant, athletic coach, veterinarian).
Each job references O*NET Work Context descriptors in source comments.

### 5.2 Add job metadata fields ✓

Added optional `typicalEducation` and `outlookNote` to Job interface. Populated for all
52 jobs. Displayed in renderResultsAsText after friction points.

## Phase 6: Operational Readiness — PARTIALLY COMPLETE

### 6.1 Add CI pipeline ✓

Created `.github/workflows/ci.yml` — triggers on push/PR to main. Steps: checkout,
setup-node (20.x), npm ci, type-check, test, build.

### 6.2 Add option-order randomization support — PENDING

**Tasks:**
1. In `types.ts`: Add a `shuffleSeed?: number` parameter to `processResponses` (or a
   wrapper function `createShuffledPrompts`).
2. Implement Fisher-Yates shuffle of option order within each prompt, seeded for
   reproducibility.
3. This is a presentation-layer concern — it does not change scoring logic. The
   response index still maps to the original option array.

### 6.3 Add scope disclaimer to output ✓

Added scope disclaimer header and temporal footer to renderResultsAsText output.

---

## Remaining Work

### Deferred (nice-to-have, not blocking)
- 3.2: Tighten DimensionScores type (low priority — runtime validation in place)
- 6.2: Option-order randomization (presentation-layer concern)

## Testing Invariants (Assert After Every Phase)

After completing any phase, verify:

```bash
npm run lint   # Zero type errors
npm test       # All tests pass
```

Additionally, manually verify with the 4 archetypal profiles (Quiet Builder, Social
Organizer, Careful Analyst, Creative Burst) that results are sensible — physical jobs
for the builder, analytical for the analyst, creative for the creative, etc. If any
archetype's top-5 flips to nonsensical results, the change introduced a regression.
