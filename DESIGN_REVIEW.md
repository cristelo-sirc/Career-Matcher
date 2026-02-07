# Career-Matcher: Design & Assumptions Review + Verification & Validation Report

**Review Date:** 2026-02-06
**Reviewer Role:** Design & Assumptions Reviewer + Verification & Validation Engineer
**Project Version:** 0.1.0
**Codebase:** ~1,916 lines TypeScript (source + tests)

---

## Executive Summary

Career-Matcher is a decision-support library that matches teens and young adults with plausible career fits using an 8-dimension scoring model. The project implements a clean 4-phase pipeline (Measure -> Score -> Match -> Format) with a transparent, explainable design.

**Overall Assessment:** The foundation is well-architected and internally consistent. The core pipeline is sound, tests pass, and type safety is enforced. However, several design assumptions remain unvalidated, and the project has notable gaps in V&V coverage, edge-case handling, and operational readiness.

**Verdict:** Ready for controlled pilot testing. Not ready for production deployment or public release.

---

## Part 1: Design & Assumptions Review

### 1.1 Dimensional Model Assumptions

#### Assumption: 8 dimensions are sufficient to meaningfully differentiate careers

**Status: UNVALIDATED**

The 8 dimensions chosen (7 primary + 1 secondary) are sensible and experientially grounded, but the claim that they are *sufficient* has not been tested against real user data. Key concerns:

- **Missing dimension candidates:** Work-from-home vs. on-site, outdoor vs. indoor, travel frequency, income expectations, educational requirements, career growth trajectory. These could materially change which jobs surface.
- **No empirical validation.** The dimensions were selected by design reasoning, not by factor analysis or user research. This is acceptable for a v0.1 prototype but becomes a risk if the tool influences real career decisions.
- **Recommendation:** Flag this as a hypothesis to be validated through user testing. Track cases where users say "none of these fit" — those are signal that dimensions may be missing.

#### Assumption: Discrete 3-4 level scales capture meaningful variation

**Status: REASONABLE WITH CAVEATS**

Each dimension uses 3-4 discrete levels (e.g., "solo", "small-group", "crowd"). This is pragmatic for a teen audience and avoids the false precision of continuous scales. However:

- **Loss of granularity.** A person who is "mostly small-group but occasionally solo" has no way to express that preference; they must pick one. The scoring engine partially mitigates this by accumulating weighted nudges across two prompts, but with only 2 prompts per dimension, the signal is still coarse.
- **Ordinal assumption.** The matching engine treats levels as categorical (match/no-match), not ordinal. This means "solo" vs. "small-group" is treated as the same magnitude of mismatch as "solo" vs. "crowd." For some dimensions (People Density, Error Pressure), the ordinal distance matters — being one step away is less of a problem than being two steps away.

#### Assumption: Splitting "Social" into People Density + Interaction Demand is correct

**Status: WELL-REASONED**

This is one of the strongest design decisions. The rationale — that being *near* people (ambient presence) and being *required to engage* with people (interaction demand) are independent stressors — is psychologically sound and produces meaningfully different job profiles. For example, a warehouse worker has small-group density but minimal interaction, while a retail associate has crowd density and constant interaction.

#### Assumption: Learning Mode should be secondary (never eliminates)

**Status: REASONABLE BUT DEBATABLE**

The design argues Learning Mode shouldn't eliminate jobs because people can adapt their learning style. This is defensible for a decision-support tool (vs. a hard filter), but:

- Someone who strongly prefers hands-on learning being matched to a purely abstract/verbal role (e.g., data analyst) could feel like a poor recommendation.
- Consider making Learning Mode's non-elimination status a configurable parameter for future iterations.

### 1.2 Scoring Model Assumptions

#### Assumption: 2 prompts per dimension provide sufficient signal

**Status: RISKY**

With only 2 prompts per dimension, a single ambiguous or misunderstood prompt can swing the entire dimension result. The weighted nudge system helps (weights range 0.6-1.0), but:

- **Low redundancy.** If a user misreads one prompt, 50% of the signal for that dimension is corrupted. Standard psychometric instruments use 4-8 items per construct for reliability.
- **No test-retest data.** There is no evidence that the same user taking the assessment twice would get the same profile.
- **Mitigation:** The 2-mismatch elimination threshold partially compensates — one bad dimension score won't eliminate a good job. But it can still rank good fits lower than they should be.

#### Assumption: All primary dimensions are equally weighted in elimination

**Status: DESIGN DEBT**

The elimination logic treats all 7 primary dimensions equally — any 2 mismatches trigger elimination. But in practice, some mismatches are more tolerable than others:

- A mismatch on Error Pressure (user: low, job: high) represents genuine discomfort.
- A mismatch on Energy Rhythm (user: steady, job: burst) is more adaptable.

The flat elimination model is simple and explainable, which aligns with the project's design philosophy. But as the job database grows, this could produce false eliminations for users who are flexible on some dimensions.

#### Assumption: Fit score formula `primaryScore * 0.95 + secondaryBonus` is well-calibrated

**Status: UNTESTED**

The formula (`matcher.ts:107`) allocates 95% weight to primary dimensions and 5% to Learning Mode. The specific 0.95/0.05 split appears to be a design choice rather than an empirically calibrated value. Concerns:

- **Score compression.** Since primary score = `primaryMatches / 7`, the possible primary fit scores are: 0.000, 0.136, 0.271, 0.407, 0.543, 0.679, 0.814, 0.950. The secondary bonus shifts these by 0.05 at most. This means two jobs that differ by one primary match are always ~13.6% apart, which may be more separation than warranted.
- **No sensitivity analysis.** It's unclear how changes to the 0.95/0.05 split would affect the top-5 rankings in practice.

### 1.3 Prompt Design Assumptions

#### Assumption: Situational prompts avoid self-labeling bias

**Status: WELL-EXECUTED**

The prompts present concrete scenarios ("You get to pick where you work for the day") rather than asking for identity-level self-assessment ("Are you an introvert?"). This is a strong design choice for a teen audience — adolescent self-concepts are still forming, and behavioral prompts are more reliable than trait-based ones.

#### Assumption: Prompt option ordering doesn't bias responses

**Status: UNVALIDATED**

All 16 prompts present options in a consistent pattern (e.g., low-to-high, solo-to-crowd). This introduces potential order bias — users may default to middle options or first options. No randomization is implemented, and no data exists to measure this effect.

#### Assumption: Error Pressure prompts measure job tolerance, not anxiety

**Status: AMBIGUOUS**

The Error Pressure prompts ("You make a mistake at work. Which reaction fits you best?") measure how the user *feels about mistakes* rather than what level of error pressure they could *tolerate* in a job. A person who feels stressed about mistakes might actually perform well under high error pressure because they're careful. The current framing conflates emotional reaction with job fit.

### 1.4 Job Database Assumptions

#### Assumption: 25 seed jobs represent the career space adequately

**Status: INSUFFICIENT FOR PRODUCTION, ADEQUATE FOR PROTOTYPE**

25 jobs cover the major archetypes (physical trades, analytical, creative, organizational, people-heavy, solo/quiet) but leave significant gaps:

- **Missing sectors:** Healthcare (nurse, pharmacist), education (teacher), government (military, civil service), gig economy, arts/entertainment, agriculture, finance.
- **Bias toward blue-collar and entry-level roles.** Several careers that require degree-level education (lawyer, engineer, scientist, architect) are absent.
- **No career progression.** A teen who is a good fit for "IT Support" might also be a good fit for "Systems Architect" 10 years later. The tool doesn't hint at growth paths.

#### Assumption: Job profiles are accurately mapped to dimensions

**Status: PARTIALLY VALIDATED**

The job profiles appear sensible on inspection (e.g., Welder = solo/physical/strict/high-error-pressure), but:

- **No subject-matter expert review.** Job profiles were presumably created by the developers, not by people who hold those jobs.
- **Static profiles.** Real-world jobs vary by employer, region, and specialization. A restaurant chef and a corporate chef have different profiles.
- Specific profile concerns:
  - `software-developer` has `energyRhythm: ["burst", "mixed"]` but no "steady" — many developers work steady 9-5 schedules.
  - `retail-sales` is classified as `primaryLoadType: ["organizational"]` — the primary load is arguably more social/interpersonal than organizational.
  - `chef` has `schedulePredictability: ["chaotic"]` only — many kitchen jobs have predictable shift schedules even if the *work within a shift* is chaotic.

### 1.5 Results Presentation Assumptions

#### Assumption: Showing top 5 matches is the right default

**Status: REASONABLE**

`results.ts:57` defaults to `topN = 5`. With 25 jobs, this means showing 20% of the surviving pool. This is a sensible default, though the right number may depend on how many jobs survive elimination.

#### Assumption: Eliminated jobs should be shown ("Ruled Out" section)

**Status: STRONG DESIGN CHOICE**

Showing eliminated jobs with explanations is a significant transparency feature. Users (and parents) can see *why* certain jobs were ruled out, which builds trust and invites reflection. This is one of the best design decisions in the project.

---

## Part 2: Verification & Validation Report

### 2.1 Verification: Does the Code Correctly Implement the Design?

#### Build & Type Safety

| Check | Status |
|-------|--------|
| TypeScript strict mode | PASS |
| `tsc --noEmit` (lint) | PASS — zero type errors |
| Build (`tsc`) | PASS — compiles to `dist/` |
| No external runtime dependencies | PASS — only devDependencies |

#### Test Suite Results

| Test File | Tests | Status |
|-----------|-------|--------|
| `scoring.test.ts` | 10 | ALL PASS |
| `matcher.test.ts` | 13 | ALL PASS |
| `results.test.ts` | 7 | ALL PASS |
| **Total** | **30** | **ALL PASS** |

#### Code-Level Verification Findings

**V-01: `processResponses` silently ignores out-of-bounds option indices.**
- File: `scoring.ts:56` — `const option = prompt.options[chosenIndex]`
- If `chosenIndex` is 99, `prompt.options[99]` returns `undefined`, and the `if (option)` guard silently skips it.
- **Severity:** Low. This is defensive programming, but the failure mode is silent data loss — a user's response disappears without error. For a production system, this should log a warning or return an error.

**V-02: `resolveLevel` tie-breaking depends on JavaScript object iteration order.**
- File: `scoring.ts:75` — `for (const [level, score] of Object.entries(bucket))`
- The test at `scoring.test.ts:60-64` asserts tie-breaking by "first encountered" order. While modern JS engines maintain insertion order for string keys, this is an implementation detail being relied upon for a behavioral guarantee.
- **Severity:** Low. Practically safe in all target environments (ES2022+), but the assumption should be documented.

**V-03: `scoreJob` casting in `jobAcceptsLevel` bypasses type safety.**
- File: `matcher.ts:29` — `const accepted = job.profile[dimension] as readonly string[]`
- This cast discards the typed level information. If a job profile contained an invalid level string, the type system would not catch it.
- **Severity:** Low. The `as const` assertion on `JOBS` provides compile-time safety for the seed data, but dynamically-loaded jobs would not benefit from this.

**V-04: No validation of `PROMPTS` data integrity.**
- The 16 prompts in `prompts.ts` are not programmatically validated against the dimension definitions. If a prompt nudges a nonexistent dimension level (e.g., `nudgeToward: "extreme"` for `errorPressure`), it would silently accumulate into an invalid level that would never match any job.
- **Severity:** Medium. This should have a startup-time or build-time integrity check.

**V-05: `DimensionScores` type uses `Record<string, number>` for level scores.**
- File: `types.ts:85` — `Record<Dimension, Record<string, number>>`
- The inner `Record<string, number>` is untyped — any string key is accepted. This means misspelled nudge targets (e.g., "stedy" instead of "steady") would not be caught by the type system.
- **Severity:** Medium. A stricter type mapping dimension -> valid levels would catch data entry errors at compile time.

### 2.2 Validation: Does the System Meet Its Intended Purpose?

#### Archetypal Profile Dry Runs

The test suite includes 4 archetypal profiles that serve as validation proxies:

| Profile | Key Expected Behavior | Status |
|---------|----------------------|--------|
| Quiet Builder (solo/physical/predictable) | Physical/trade jobs in top 5 | PASS |
| Social Organizer (crowd/constant/chaotic) | Solo/quiet jobs eliminated | PASS |
| Careful Analyst (solo/analytical/strict/high-error) | Analytical jobs in top 5 | PASS |
| Creative Burst (burst/solo/creative/loose) | Creative jobs in top 5 | PASS |

These dry runs validate the *happy path* — profiles designed to have obvious best fits. They do not validate:

- **Ambiguous profiles** (user near the center on most dimensions)
- **Contradictory profiles** (user wants solo work but constant interaction)
- **Extreme profiles** (user at the extreme end of every dimension)

#### Missing Validation Coverage

**VAL-01: No ambiguous profile testing.**
A user whose scores are nearly tied across levels on multiple dimensions will get a profile based on small weight differences. The resulting matches could be unstable — a tiny change in one prompt response could flip the entire top-5 list. No tests verify graceful degradation for "I could go either way" users.

**VAL-02: No prompt-to-outcome traceability test.**
There is no end-to-end test that takes a set of prompt responses (the actual user input) and verifies the final job rankings. The tests validate each phase independently but not the complete pipeline from raw responses to formatted output.

**VAL-03: No boundary condition testing for elimination.**
The 2-mismatch elimination threshold is tested for clear cases (many mismatches or zero mismatches), but the exact boundary — 1 mismatch (keep) vs. 2 mismatches (eliminate) — is only implicitly tested. A focused test that constructs a job with exactly 1 and exactly 2 mismatches against a known profile would be valuable.

**VAL-04: No testing of "no good matches" scenario.**
If a user has a highly unusual profile that doesn't fit any of the 25 jobs, `formatResults` will show an empty "Jobs That Fit You" section with the message "No strong matches found." This path is tested by assertion (`results.test.ts:107-109`), but no test actually triggers it because the archetypal profiles all have matches. A profile deliberately designed to mismatch all jobs should be tested.

**VAL-05: No user acceptance testing evidence.**
The tool's target audience is teenagers. No evidence of user testing with actual teens has been documented. The prompts assume a certain reading level and cultural context that may not be universal.

### 2.3 Verification & Validation Gap Summary

| ID | Category | Description | Severity | Recommendation |
|----|----------|-------------|----------|----------------|
| V-01 | Verification | Silent discard of out-of-bounds responses | Low | Add warning log or error return |
| V-02 | Verification | Tie-breaking relies on JS object iteration order | Low | Document assumption, add comment |
| V-03 | Verification | Type cast in `jobAcceptsLevel` bypasses safety | Low | Add runtime assertion for dynamic data |
| V-04 | Verification | No build-time validation of prompt data integrity | Medium | Add startup integrity check |
| V-05 | Verification | Untyped level scores allow misspelled keys | Medium | Tighten `DimensionScores` type |
| VAL-01 | Validation | No ambiguous/tied profile testing | Medium | Add "center of the bell curve" test profiles |
| VAL-02 | Validation | No end-to-end prompt-to-output test | Medium | Add integration test |
| VAL-03 | Validation | Elimination boundary not explicitly tested | Low | Add 1-vs-2 mismatch boundary test |
| VAL-04 | Validation | "No matches" path never actually triggered in tests | Low | Add adversarial profile test |
| VAL-05 | Validation | No user acceptance testing | High | Conduct user testing with target demographic |

---

## Part 3: Operational Readiness Assessment

### 3.1 What's Present

- Clean 4-phase pipeline architecture with clear separation of concerns
- Full TypeScript strict mode with zero type errors
- 30 passing unit tests covering scoring, matching, and results formatting
- No external runtime dependencies (zero supply-chain risk)
- Explainable output with fit reasons and friction points
- Immutable data design (all job/prompt data is `readonly`)
- Public API surface cleanly exported from `src/index.ts`

### 3.2 What's Missing

| Gap | Impact | Priority |
|-----|--------|----------|
| **No CI/CD pipeline** | No automated quality gate on PRs/merges | High |
| **No integration tests** | Each phase tested in isolation only | Medium |
| **No input validation** | Library trusts all caller input implicitly | Medium |
| **No logging/observability** | No diagnostic output for debugging production issues | Medium |
| **No API/web layer** | Library-only; no way for end users to interact | Low (by design) |
| **No persistence** | Results are ephemeral; no session storage | Low (by design) |
| **No prompt randomization** | Option order bias unmitigated | Low |
| **No accessibility considerations** | No screen reader or i18n support in text output | Low for v0.1 |

### 3.3 Scoring Model Sensitivity

A quick analytical review of the scoring model reveals:

- **Maximum possible fit score:** 1.0 (7/7 primary + learning mode match)
- **Minimum non-eliminated score:** 0.95 * (6/7) + 0.05 = ~0.864 (6/7 primary + LM) or 0.95 * (6/7) = ~0.814 (6/7 primary, no LM)
- **Elimination boundary:** 5/7 primary matches = ~0.679 base score. Jobs at this threshold are eliminated regardless of secondary bonus.
- **Score resolution:** Primary matches increment score by ~0.136 each. This is coarse — only 8 possible primary scores exist. Two jobs can only differ meaningfully if they differ by at least one primary dimension match.

This means the top-5 ranking is likely to contain many tied scores, especially with only 25 jobs. The sort is stable (by insertion order of `JOBS` array), so ties are broken by the order jobs appear in `jobs.ts`. This is not documented and could surprise consumers.

---

## Part 4: Recommendations

### Immediate (Before Pilot Testing)

1. **Add a prompt data integrity check** — a build-time or startup-time function that validates all `nudgeToward` values are valid levels for their declared dimension.
2. **Add an end-to-end integration test** — from raw prompt responses through to formatted output.
3. **Add a CI pipeline** — even a minimal GitHub Actions workflow running `npm test && npm run lint`.
4. **Document the tie-breaking behavior** — both in `resolveLevel` (same-score ties) and in `matchJobs` (same-fitScore ties).

### Short-Term (Before User Testing)

5. **Add 2-3 more archetypal test profiles** covering ambiguous/center profiles.
6. **Review Error Pressure prompts** — reframe to measure tolerance rather than emotional reaction.
7. **Have subject-matter experts review 5-10 job profiles** for accuracy.
8. **Add prompt option randomization** (or at minimum, vary option order across the 16 prompts).

### Medium-Term (Before Production)

9. **Expand the job database** to 50+ jobs covering missing sectors.
10. **Consider ordinal distance** in matching — one step away on a dimension should be penalized less than two steps.
11. **Add a confidence indicator** — when two prompts for a dimension conflict, signal lower confidence rather than just picking the higher weight.
12. **Implement test-retest validation** — have a cohort of users take the assessment twice to measure stability.
13. **Tighten the `DimensionScores` type** to restrict level keys to valid values per dimension.

---

## Conclusion

Career-Matcher demonstrates strong engineering fundamentals: type safety, clean architecture, explainable algorithms, and meaningful test coverage. The design philosophy — elimination before optimization, behavioral prompts over self-labels, transparency over black-box scoring — is well-suited for a teen audience.

The primary risks are in the *assumptions* layer: the dimensional model is unvalidated against real users, the scoring model has untested edge cases, and the job profiles lack subject-matter expert review. These are expected gaps for a v0.1 prototype and are not blockers for pilot testing.

The project is in a solid state for controlled evaluation with a small user group. The recommendations above provide a clear path from prototype to production readiness.
