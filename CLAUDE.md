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

- **Version:** 0.1.0 — foundation built, reviewed, not yet remediated
- **Stack:** TypeScript 5.3.3 strict, Vitest 1.2.0, zero runtime dependencies
- **Architecture:** 4-phase pipeline: Measure (prompts) → Score → Match → Format
- **Tests:** 30 passing (scoring, matching, results) — no integration tests yet
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
   with more precision than the measurement supports.
5. **Exploration, not foreclosure.** Language must keep doors open. We show fit gradients
   and friction points, never "you should" or "you can't."
6. **No external runtime dependencies.** This library must remain zero-dependency for
   security, auditability, and trust (it targets minors).

## File Map

```
src/
  index.ts          — Public API surface; re-exports all consumer-facing symbols
  types.ts          — Core interfaces: Job, UserDimensionProfile, MatchResult, etc.
  dimensions.ts     — 8 dimension definitions, level types, metadata (labels/descriptions)
  jobs.ts           — 25 seed job profiles (readonly)
  prompts.ts        — 16 situational prompts, 2 per dimension (will grow to 4+)
  scoring.ts        — Phase 2: nudge accumulation, level resolution, profile generation
  scoring.test.ts   — Tests for scoring engine
  matcher.ts        — Phase 3: scoreJob(), matchJobs() — elimination + ranking
  matcher.test.ts   — Tests for matcher (4 archetypal profiles + completeness)
  results.ts        — Phase 4: formatResults(), renderResultsAsText()
  results.test.ts   — Tests for result formatting
```

## Current Dimension Model

7 primary dimensions (can eliminate jobs) + 1 secondary (ranks/tiebreaks only):

| # | Dimension | Levels | Role | Status |
|---|-----------|--------|------|--------|
| 1 | energyRhythm | steady, burst, mixed | Primary | OK |
| 2 | peopleDensity | solo, small-group, crowd | Primary | OK |
| 3 | interactionDemand | minimal, moderate, constant | Primary | OK |
| 4 | schedulePredictability | predictable, variable, chaotic | Primary | OK |
| 5 | ruleDensity | loose, moderate, strict | Primary | OK |
| 6 | primaryLoadType | physical, analytical, creative, organizational | Primary | RECLASSIFY — see Phase 1 |
| 7 | errorPressure | low, moderate, high | Primary | REWRITE PROMPTS — see Phase 2 |
| 8 | learningMode | hands-on, verbal, abstract | Secondary | REPLACE — see Phase 1 |

---

# REMEDIATION PLAN

Below is the phased plan to address all findings from both reviews. Phases are ordered by
dependency — later phases depend on earlier ones being complete. Each task is a discrete,
testable unit of work.

## Phase 1: Fix the Construct Model (CRITICAL — do first)

These changes alter the dimensional model itself. Everything downstream (prompts, jobs,
scoring, matching, tests) must be updated to match.

### 1.1 Replace "Learning Mode" with "Work Values" dimension

**Why:** Learning Mode is based on the debunked learning-styles hypothesis (Pashler et al.,
2008). It lacks empirical validity. Work values (what outcomes matter to you) are a core
construct in TWA and Super's theory, and are the single most impactful missing piece.

**New dimension: `workValue`**
- Levels: `autonomy` | `security` | `altruism` | `achievement`
- Role: **Secondary** (never eliminates, ranks and tiebreaks)
- Labels:
  - Autonomy — "Freedom to do things your own way"
  - Security — "Steady income and a stable path"
  - Altruism — "Helping people or making a difference"
  - Achievement — "Being the best, getting recognized"

**Tasks:**
1. In `dimensions.ts`: Replace `LearningMode` type and `learningMode` metadata with
   `WorkValue` type and `workValue` metadata. Update `SECONDARY_DIMENSIONS`.
2. In `types.ts`: Replace `learningMode` field in `JobDimensionProfile` and
   `UserDimensionProfile` with `workValue`. Update `PromptOption.nudgeToward` comment.
3. In `prompts.ts`: Remove the 2 `lm-*` prompts. Write 4 new `wv-*` prompts (see 1.4
   for item count). Follow the behavioral-scenario pattern. Examples:
   - "You get to pick one reward for a job well done. Which sounds best?" →
     bonus/raise (achievement), flexible schedule (autonomy), thank-you from someone
     you helped (altruism), guaranteed contract renewal (security)
   - Frame as concrete outcomes, not abstract values.
4. In `jobs.ts`: Replace `learningMode` arrays with `workValue` arrays for all 25 jobs.
   Map using these heuristics:
   - Trades/physical roles → often `security`, sometimes `achievement`
   - Healthcare/people roles → often `altruism`, sometimes `security`
   - Creative roles → often `autonomy`, sometimes `achievement`
   - Analytical/organizational → often `achievement`, sometimes `security`
   - Most jobs should accept 2 values (jobs are not monolithic).
5. In `matcher.ts`: Update the secondary-dimension logic (line ~95) to reference
   `workValue` instead of `learningMode`.
6. In `scoring.ts`: Update `resolveProfile` default for the new dimension (fallback:
   `"security"` — the most common baseline for teens entering the workforce).
7. In `index.ts`: Update all re-exports (remove `LearningMode`, add `WorkValue`).
8. Update ALL test files to use `workValue` instead of `learningMode` in profiles
   and assertions.
9. Run `npm test` and `npm run lint` — zero failures, zero type errors.

### 1.2 Reclassify "Primary Load Type" as an interest dimension

**Why:** Primary Load Type (physical/analytical/creative/organizational) measures *what
kind of work you do* — an interest/activity domain, not a work condition. The other 6
primary dimensions measure *what the workday feels like*. This conflation is theoretically
inconsistent.

**The fix is documentation and framing, not removal.** Primary Load Type is the most
predictive dimension and maps loosely to Holland's RIASEC. Keep it as primary, but:

**Tasks:**
1. In `dimensions.ts`: Update the `description` field for `primaryLoadType` to:
   "What kind of tasks you're drawn to — this is about your interests, not just the
   environment." Add a comment noting the Holland RIASEC correspondence.
2. In the `DIMENSION_META` JSDoc block at the top of `dimensions.ts`: Add a note that
   `primaryLoadType` intentionally crosses from environmental conditions into interest
   domains, and explain why (it is the strongest differentiator in the model).
3. No structural code changes. This is a documentation/transparency fix.

### 1.3 Rewrite Error Pressure prompts

**Why:** Current prompts measure emotional reaction to mistakes (trait anxiety), not
tolerance for high-stakes environments. Conscientious teens suited for precision work
get misclassified.

**Tasks:**
1. Replace the 2 `ep-*` prompts in `prompts.ts` with 4 new prompts (see 1.4) that
   measure environmental tolerance, not emotional reaction. Examples:
   - "Imagine two jobs. One is low-stakes — if you mess up, it's easy to fix. The
     other is high-stakes — mistakes are costly but the work is more respected.
     Which appeals to you more?"
   - "You're choosing between two projects. One has no real consequences if it goes
     wrong. The other matters a lot and people are counting on you. Which do you pick?"
   - Frame as preference between environments, not reaction to mistakes.
2. Keep weights at 1.0 for clear preferences, 0.8 for hedged/middle options.
3. Update any test assertions that reference specific prompt IDs `ep-1` or `ep-2`.

### 1.4 Increase item count to 4 prompts per dimension

**Why:** 2 items per construct yields unacceptable reliability (estimated alpha .30-.50).
The minimum for low-stakes individual assessment is 4 items (target alpha >= .70).

**Tasks:**
1. For each of the 8 dimensions, write 2 additional situational prompts, bringing the
   total to 4 per dimension (32 prompts total).
2. Follow the existing prompt design rules:
   - Concrete scenarios, not abstract self-assessment
   - Plain language a 14-year-old can understand
   - Each option nudges exactly one dimension level
   - Weights: 1.0 for clear signals, 0.6-0.8 for weaker/mixed signals
3. Vary option presentation order across the 4 prompts for each dimension to mitigate
   order bias. (Prompt 1: low→high, Prompt 2: high→low, Prompt 3: mixed, Prompt 4: mixed.)
4. Update the `processResponses` test to expect 32 prompts.
5. Run full test suite. Verify that archetypal profiles still produce sensible rankings
   (the additional prompts should strengthen signal, not flip results).

**Prompt writing guidance for the new items:**
- Avoid repeating scenarios already used. Each prompt should present a *distinct* situation.
- Avoid "trick" prompts where multiple options plausibly map to the same level.
- The 3rd and 4th prompts can use slightly more nuanced scenarios since the user is warmed up.

## Phase 2: Fix the Matching Algorithm

### 2.1 Replace percentage scores with ordinal fit bands

**Why:** The fit score formula produces only 8 discrete values (0/7 through 7/7 primary
matches * 0.95 + optional 0.05 secondary bonus). Presenting these as "82% fit" implies
false precision. The measurement instrument cannot support quantitative claims.

**Tasks:**
1. In `results.ts`: Add a `fitBand` function that maps `fitScore` to ordinal categories:
   - `fitScore >= 0.85` → "Strong fit"
   - `fitScore >= 0.65` → "Possible fit"
   - `fitScore >= 0.45` → "Stretch"
   - `fitScore < 0.45` → "Unlikely fit"
2. Update `FormattedMatch` interface: add `fitBand: string` field.
3. In `formatResults`: populate `fitBand` for each match.
4. In `renderResultsAsText`: replace `(${match.fitPercent}% fit)` with
   `(${match.fitBand})`. Keep `fitPercent` in the data model for internal/debug use
   but do not display it to end users.
5. Update `results.test.ts` to assert on `fitBand` values.

### 2.2 Soften elimination language

**Why:** "Ruled Out" implies categorical judgment that the data cannot support.
Adolescents in the exploration stage (Super, 1980) should not receive premature
foreclosure signals.

**Tasks:**
1. In `results.ts` `renderResultsAsText`: Change section header from
   `"Ruled Out (not a great fit right now)"` to
   `"Less Likely Fits (based on your current preferences)"`.
2. Add a footer line to the results output:
   `"These results reflect your preferences today — they may change as you gain experience."`
3. Update `results.test.ts` assertions that match on "Ruled Out" text.

### 2.3 Add ordinal distance to mismatch scoring

**Why:** The current model treats all mismatches as equal. But for ordinal dimensions
(e.g., People Density: solo → small-group → crowd), being one step away is less of a
problem than being two steps away.

**Tasks:**
1. In `dimensions.ts`: Add an `ordinal: boolean` flag to `DimensionMeta`. Set to `true`
   for dimensions with ordered levels: `peopleDensity`, `interactionDemand`,
   `schedulePredictability`, `ruleDensity`, `errorPressure`. Set to `false` for
   `energyRhythm` (3 unordered), `primaryLoadType` (4 categorical).
2. In `matcher.ts`: For ordinal dimensions, when there is a mismatch, check if the
   user's level is *adjacent* to any of the job's accepted levels. If adjacent:
   - Count as a 0.5 mismatch instead of 1.0 (for elimination threshold purposes)
   - Add a softer friction message: "...but this job is close at [level]"
   - For fit score: award 0.5 match credit instead of 0.
3. Update elimination check: eliminate when total weighted mismatch >= 2.0 (instead of
   counting >= 2 binary mismatches). This means 4 adjacent mismatches still eliminate,
   but 1 full + 1 adjacent does not.
4. Add tests: construct a job that differs by exactly 1 adjacent level on 2 ordinal
   dimensions → should NOT be eliminated (2 * 0.5 = 1.0 < 2.0).
5. Add tests: construct a job that differs by 2 full levels on 2 dimensions → SHOULD
   be eliminated (2.0 >= 2.0).

## Phase 3: Fix Verification Gaps

### 3.1 Add prompt/job data integrity validation

**Why:** V-04 and V-05 — misspelled nudge targets or invalid level values are silently
accepted.

**Tasks:**
1. Create `src/validate.ts` with a `validateDataIntegrity()` function that:
   - For every prompt option: asserts `dimension` is in `ALL_DIMENSIONS`, asserts
     `nudgeToward` is a valid level for that dimension (check against
     `DIMENSION_META[dim].levels`).
   - For every job: asserts every dimension key exists, asserts every level value is
     valid for that dimension.
   - Returns an array of error strings (empty = valid).
2. Create `src/validate.test.ts`:
   - Test that current PROMPTS and JOBS pass validation.
   - Test that a deliberately malformed prompt/job is caught.
3. Export `validateDataIntegrity` from `index.ts`.

### 3.2 Tighten the `DimensionScores` type

**Why:** V-05 — `Record<string, number>` for level scores allows any string key.

**Tasks:**
1. In `types.ts`: Create a mapped type `DimensionLevelScores` that maps each dimension
   to `Record<ValidLevel, number>` where `ValidLevel` is the union of that dimension's
   levels. This requires a type-level map:
   ```typescript
   type DimensionLevelMap = {
     energyRhythm: EnergyRhythm;
     peopleDensity: PeopleDensity;
     // ... etc
   };
   type DimensionScores = {
     [D in Dimension]: Partial<Record<DimensionLevelMap[D], number>>;
   };
   ```
2. Update `scoring.ts` to work with the tighter type. The `applyNudge` function will
   need the `nudgeToward` field to be typed per-dimension (or use a runtime assertion
   with the validation from 3.1).
3. Run `npm run lint` to verify all existing code still type-checks.

### 3.3 Add warning for out-of-bounds option indices

**Why:** V-01 — silent discard of invalid response indices.

**Tasks:**
1. In `scoring.ts` `processResponses`: When `chosenIndex` is defined but
   `prompt.options[chosenIndex]` is undefined, push a warning to a `warnings: string[]`
   array.
2. Change `processResponses` return type to `{ scores: DimensionScores; warnings: string[] }`.
3. Update all callers and tests.

### 3.4 Document tie-breaking behavior

**Why:** V-02 — tie-breaking relies on undocumented JS object iteration order.

**Tasks:**
1. Add a JSDoc comment to `resolveLevel` explaining that ties are broken by insertion
   order (first key in the object wins), and that this is guaranteed by ES2015+ spec
   for string keys.
2. Add a JSDoc comment to `matchJobs` explaining that jobs with equal fit scores are
   ordered by their position in the input `jobs` array (stable sort).

## Phase 4: Fix Validation Gaps

### 4.1 Add end-to-end integration test

**Why:** VAL-02 — no test covers the full pipeline from prompt responses to formatted output.

**Tasks:**
1. Create `src/integration.test.ts`.
2. Test: Given the "Quiet Builder" prompt responses (choose specific option indices for
   all 32 prompts), run `processResponses` → `resolveProfile` → `matchJobs` →
   `formatResults` → `renderResultsAsText`. Assert:
   - Profile dimensions match expected values.
   - Top match is a physical/solo job.
   - Output text contains expected job titles.
   - Output text contains fit band labels (not percentages).
3. Repeat for 1-2 other archetypes.

### 4.2 Add ambiguous/center profile testing

**Why:** VAL-01 — no tests for users who are near the middle on most dimensions.

**Tasks:**
1. In `matcher.test.ts`: Add a "Moderate Middle" profile where every dimension is set
   to the middle/moderate value. Verify:
   - No crash or unexpected behavior.
   - Most jobs survive elimination (center profile has few hard mismatches).
   - Ranking is stable (deterministic order for tied scores).
2. Add a "Conflicted" profile with dimensions that rarely co-occur in the job database
   (e.g., solo + constant interaction). Verify:
   - The system handles it gracefully.
   - Many jobs are eliminated (expected).
   - The friction points accurately reflect the tension.

### 4.3 Add adversarial "no matches" test

**Why:** VAL-04 — the empty-results path is never triggered in tests.

**Tasks:**
1. Create a custom `Job[]` array with 3 jobs that are all extreme profiles (all crowd/
   chaotic/strict/physical). Create a user profile that is the opposite on all dimensions.
   Verify all 3 are eliminated.
2. Pass to `formatResults`. Verify `topMatches` is empty.
3. Pass to `renderResultsAsText`. Verify output contains "No strong matches found."

### 4.4 Add elimination boundary tests

**Why:** VAL-03 — the 1-vs-2 mismatch boundary is not explicitly tested.

**Tasks:**
1. Create a synthetic job that matches a known profile on exactly 6/7 primary dimensions
   (1 mismatch). Verify `eliminated === false`.
2. Create a synthetic job that matches on exactly 5/7 (2 mismatches). Verify
   `eliminated === true`.
3. After Phase 2.3 (ordinal distance): create a job with 2 adjacent mismatches (weighted
   total 1.0). Verify NOT eliminated. Create a job with 1 full + 1 adjacent mismatch
   (weighted total 1.5). Verify NOT eliminated. Create a job with 2 full mismatches
   (weighted total 2.0). Verify eliminated.

## Phase 5: Expand Job Database

### 5.1 Add 25+ new jobs covering missing sectors

**Why:** The current 25 jobs over-represent trades and entry-level roles. Missing sectors:
healthcare, education, STEM, finance, government, emerging tech, arts/entertainment.

**Tasks:**
1. Add jobs in batches of 5-8, organized by sector. Target: 50+ total jobs.
2. Each job must include all 8 dimensions (using `workValue` instead of `learningMode`).
3. Include at least:
   - **Healthcare:** Registered Nurse, Pharmacist, Physical Therapist
   - **Education:** Teacher, School Counselor
   - **STEM:** Civil Engineer, Environmental Scientist, Cybersecurity Analyst
   - **Finance:** Financial Advisor, Bank Teller
   - **Government/Public Service:** Firefighter, Social Worker, Urban Planner
   - **Emerging Tech:** UX Designer, Robotics Technician, Renewable Energy Installer
   - **Arts/Entertainment:** Sound Engineer, Animator, Museum Curator
   - **Entrepreneurship:** Small Business Owner (variable profile — accepts many levels)
4. For each new job: reference O*NET Work Context data (publicly available) to inform
   dimension mapping. Document which O*NET descriptors were consulted in a comment
   above each job entry.
5. Run the full archetypal dry-run tests to ensure new jobs surface appropriately
   (e.g., Registered Nurse should appear for altruism-valuing, people-oriented profiles).
6. Ensure no single archetype has >70% of its top-5 from one sector (diversity check).

### 5.2 Add job metadata fields

**Tasks:**
1. Extend the `Job` interface with optional metadata (does NOT affect matching):
   ```typescript
   outlookNote?: string;    // e.g., "High demand through 2030"
   typicalEducation?: string; // e.g., "Trade certification" | "Bachelor's degree"
   ```
2. Display in `renderResultsAsText` under each match, after friction points.
3. This is informational only — it does not influence scoring or elimination.

## Phase 6: Operational Readiness

### 6.1 Add CI pipeline

**Tasks:**
1. Create `.github/workflows/ci.yml`:
   - Trigger: push, pull_request
   - Steps: checkout, setup-node (20.x), npm ci, npm run lint, npm test
2. Add branch protection rules (require CI pass before merge) — document in README.

### 6.2 Add option-order randomization support

**Tasks:**
1. In `types.ts`: Add a `shuffleSeed?: number` parameter to `processResponses` (or a
   wrapper function `createShuffledPrompts`).
2. Implement Fisher-Yates shuffle of option order within each prompt, seeded for
   reproducibility.
3. This is a presentation-layer concern — it does not change scoring logic. The
   response index still maps to the original option array.

### 6.3 Add scope disclaimer to output

**Tasks:**
1. In `renderResultsAsText`: Add a header block:
   ```
   This tool explores which work environments might suit you based on your
   preferences today. It is not a career assessment or aptitude test. Use these
   results as a starting point for conversations, not as a final answer.
   ```
2. This addresses the scoping requirement from the expert review.

---

## Sequencing and Dependencies

```
Phase 1 (Construct Model)
  ├─ 1.1 Replace Learning Mode → must be done first (type changes cascade)
  ├─ 1.2 Reclassify Primary Load Type → documentation only, parallel with 1.1
  ├─ 1.3 Rewrite Error Pressure prompts → after 1.1 (prompt format established)
  └─ 1.4 Expand to 4 prompts/dimension → after 1.1 and 1.3 (includes new WV and EP prompts)

Phase 2 (Matching Algorithm) → after Phase 1 (dimension model must be stable)
  ├─ 2.1 Ordinal fit bands → independent
  ├─ 2.2 Soften elimination language → independent
  └─ 2.3 Ordinal distance → independent, but test after 2.1

Phase 3 (Verification) → after Phase 1 (types change)
  ├─ 3.1 Data integrity validation → independent
  ├─ 3.2 Tighten DimensionScores type → after 1.1 (type changes)
  ├─ 3.3 Out-of-bounds warnings → independent
  └─ 3.4 Document tie-breaking → independent, can be done anytime

Phase 4 (Validation) → after Phases 1-3 (tests must target remediated code)
  ├─ 4.1 Integration test → after all phases above
  ├─ 4.2 Ambiguous profile tests → after Phase 2.3
  ├─ 4.3 Adversarial "no matches" test → after Phase 2.1
  └─ 4.4 Elimination boundary tests → after Phase 2.3

Phase 5 (Job Database) → after Phase 1 (new dimension model must be in place)
  ├─ 5.1 Add 25+ jobs → after 1.1
  └─ 5.2 Job metadata → independent

Phase 6 (Operational) → anytime, but best after Phase 1
  ├─ 6.1 CI pipeline → independent (do early)
  ├─ 6.2 Option randomization → after 1.4
  └─ 6.3 Scope disclaimer → independent (do early)
```

## Critical Path

**1.1 → 1.3 → 1.4 → 2.3 → 4.1** — this is the minimum path to address all CRITICAL
and MAJOR findings from the expert review. Everything else can be parallelized around it.

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
