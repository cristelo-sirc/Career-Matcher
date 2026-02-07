# Career-Matcher: Branch Audit & Organization Report

**Date:** 2026-02-07
**Repository:** cristelo-sirc/Career-Matcher

---

## 1. Branch Inventory

| # | Branch | Local? | Remote? | Commits (total) | Status |
|---|--------|--------|---------|-----------------|--------|
| 1 | `claude/career-matcher-foundation-HWrR7` | No | Yes | 1 | Base foundation |
| 2 | `claude/review-dev-plan-ubpu4` | Yes | Yes (ahead of local) | 14 (local: 13, remote: 14) | Most advanced — all work here |
| 3 | `claude/review-project-design-TBQDW` | No | Yes | 13 | **Duplicate** of ubpu4 (local) |
| 4 | `claude/review-dev-plan-W9AVA` | No | Yes | 2 | Review doc only |
| 5 | `claude/audit-branch-organization-K2YjW` | Yes | Yes | 1 | This audit (current branch) |

---

## 2. Branch-by-Branch Analysis

### Branch 1: `claude/career-matcher-foundation-HWrR7`

**Purpose:** Initial project scaffolding — the foundational commit that every other branch builds on.

**Commits:** 1
- `cc0efe3` — Implement Career Matcher foundation: dimensions, jobs, prompts, scoring, matching, and results

**What was built:**
- Complete TypeScript engine layer (4-phase pipeline: Measure → Score → Match → Format)
- 7 primary fit dimensions + 1 secondary dimension
- 25 seed jobs profiled across all dimensions
- 16 situational prompts (2 per dimension) using scenarios instead of Likert scales
- Scoring engine, matching engine (elimination-first logic), results formatter
- 30 passing tests including archetypal profile dry runs

**Files:** 16 files, 3,792 lines added

| File | Purpose |
|------|---------|
| `src/dimensions.ts` | 8 dimension definitions with levels and metadata |
| `src/jobs.ts` | 25 job profiles with dimension scores |
| `src/prompts.ts` | 16 situational prompts |
| `src/scoring.ts` | Prompt response → dimension profile scoring |
| `src/matcher.ts` | Elimination + ranking matching algorithm |
| `src/results.ts` | Plain-language results formatter |
| `src/types.ts` | TypeScript type definitions |
| `src/index.ts` | Public API entry point |
| `src/*.test.ts` | Tests (matcher, results, scoring) |
| `package.json`, `tsconfig.json`, `vitest.config.ts` | Project config |

**Status:** This branch is frozen — all subsequent work happened on other branches that forked from this commit.

---

### Branch 2: `claude/review-dev-plan-ubpu4` (PRIMARY WORK BRANCH)

**Purpose:** The main development branch where all substantive work occurred — design reviews, 6-phase remediation of the core engine, and web app planning.

**Commits:** 14 (remote), 13 (local — missing the latest remote commit)

**Chronological commit history:**

| # | Hash | Date | Description | Files | +/- |
|---|------|------|-------------|-------|-----|
| 1 | `cc0efe3` | Feb 6, 01:20 | Foundation (same as Branch 1) | 16 | +3,792 |
| 2 | `2faabb6` | Feb 6, 03:14 | Design & V&V review | 1 | +322 |
| 3 | `e1fc9e8` | Feb 6, 03:25 | Vocational psychology expert review | 1 | +291 |
| 4 | `8290022` | Feb 6, 03:33 | CLAUDE.md with mission + 6-phase remediation plan | 1 | +~200 |
| 5 | `637fb1b` | Feb 6, 04:13 | **Phase 1:** Replace Learning Mode, rewrite prompts | 10 | +535/-90 |
| 6 | `443ffdf` | Feb 6, 04:14 | **Phase 6.1:** Add CI pipeline | 1 | +30 |
| 7 | `01af411` | Feb 6, 04:26 | **Phase 2:** Fix matching algorithm — fit bands, softer language | 5 | +160/-26 |
| 8 | `cc1ef11` | Feb 6, 11:29 | **Phase 3:** Validation, warnings, docs | 5 | +170/-6 |
| 9 | `64daeca` | Feb 7, 17:12 | **Phase 5:** Expand job database to 52 jobs | 3 | +669 |
| 10 | `c54ceec` | Feb 7, 17:17 | Update CLAUDE.md — reflect current state | 1 | +131/-330 |
| 11 | `31c9488` | Feb 7, 17:28 | **Phase 4:** Integration, boundary, adversarial tests | 3 | +528 |
| 12 | `ccd4223` | Feb 7, 17:29 | Update CLAUDE.md — Phase 4 complete | 1 | +39/-72 |
| 13 | `820a78f` | Feb 7, 18:53 | Complete remaining items — option randomization, tighter types | 5 | +163/-23 |
| 14 | `8c0c894` | Feb 7, 21:57 | Web application development plan in CLAUDE.md | 1 | +1,415/-134 |
| 15* | `2f6dbcf` | Feb 7 (remote only) | Product design review of web app plan | 1 | +320 |

*Commit 15 exists only on the remote; local branch is 1 commit behind.*

**Total changes vs. foundation:** 19 files changed, 4,724 insertions, 127 deletions (remote tip)

**Summary of work done:**

1. **Reviews (commits 2–3):** Two expert-level review documents were created:
   - `DESIGN_REVIEW.md` (322 lines) — Design & assumptions review + verification & validation report. Found 10 issues, all subsequently remediated.
   - `EXPERT_REVIEW_VOCATIONAL_PSYCHOLOGY.md` (291 lines) — Independent vocational psychology review. Verdict: "conditionally sound" with conditions that were then met.

2. **6-Phase Remediation (commits 4–13):** Systematic fixes based on the reviews:
   - **Phase 1:** Replaced "Learning Mode" dimension (based on debunked learning styles theory) with "Interest Domain" (grounded in Holland's RIASEC). Rewrote prompts from 16 to 32 (4 per dimension). Major overhaul of `prompts.ts` (+493 lines).
   - **Phase 2:** Fixed matching algorithm — introduced 3-tier fit bands (strong/moderate/weak), softer language, ordinal distance scoring instead of binary match/mismatch. Updated `matcher.ts`, `results.ts`.
   - **Phase 3:** Added `validate.ts` and `validate.test.ts` (input validation), scoring edge-case warnings, docs.
   - **Phase 4:** 528 lines of new tests — integration tests, boundary tests, adversarial tests.
   - **Phase 5:** Expanded job database from 25 to 52 jobs with O*NET-informed profiles and new metadata fields. (+648 lines to `jobs.ts`).
   - **Phase 6.1:** GitHub Actions CI pipeline (`.github/workflows/ci.yml`).

3. **Web App Planning (commits 14–15):** Comprehensive 11-phase web application development plan written into `CLAUDE.md` (1,415 lines). Followed by a product design review in `WEB_PLAN_REVIEW.md` (320 lines).

**Key files on this branch:**

| File | Lines | Role |
|------|-------|------|
| `CLAUDE.md` | ~1,600 | Project mission, design rules, web app plan |
| `DESIGN_REVIEW.md` | 322 | Engineering review |
| `EXPERT_REVIEW_VOCATIONAL_PSYCHOLOGY.md` | 291 | Domain expert review |
| `WEB_PLAN_REVIEW.md` | 320 | UX review of web plan (remote only) |
| `.github/workflows/ci.yml` | 30 | CI pipeline |
| `src/dimensions.ts` | ~200 | 8 dimensions |
| `src/jobs.ts` | ~1,100 | 52 jobs |
| `src/prompts.ts` | ~900 | 32 situational prompts |
| `src/matcher.ts` | ~230 | Matching algorithm |
| `src/scoring.ts` | ~190 | Scoring engine |
| `src/results.ts` | ~190 | Results formatter |
| `src/types.ts` | ~130 | Type definitions |
| `src/validate.ts` | 67 | Input validation |
| `src/integration.test.ts` | 227 | Integration tests |
| `src/matcher.test.ts` | ~390 | Matcher tests |
| `src/results.test.ts` | ~240 | Results tests |
| `src/scoring.test.ts` | ~210 | Scoring tests |
| `src/validate.test.ts` | 62 | Validation tests |

---

### Branch 3: `claude/review-project-design-TBQDW`

**Purpose:** Intended as a design review branch, but contains identical content to `review-dev-plan-ubpu4` (local).

**Commits:** 13 (same 13 commits as the local `review-dev-plan-ubpu4`)

**Analysis:** `git diff claude/review-dev-plan-ubpu4 origin/claude/review-project-design-TBQDW` produces **zero diff**. These branches are byte-for-byte identical. This branch is a duplicate that was likely pushed from the same local state before the remote-only commit (`2f6dbcf`) was added to `ubpu4`.

**Status:** DUPLICATE — can be safely deleted.

---

### Branch 4: `claude/review-dev-plan-W9AVA`

**Purpose:** A separate review of the web application development plan from a UX/UI perspective.

**Commits:** 2
- `cc0efe3` — Foundation (shared base)
- `2f44220` — Add UX/UI design evaluation of Career Matcher development plan

**What was built:**
- `REVIEW-dev-plan.md` (222 lines) — A UX/UI design evaluation covering:
  - Assessment design (prompts & scenarios) — praised no-Likert approach, flagged 16-prompt length
  - Dimension model analysis — praised People Density / Interaction Demand split
  - Scoring engine review — identified limitations
  - Matching algorithm analysis — flagged over-elimination risk
  - Results formatting evaluation
  - Recommendations for adaptive flow, progress indication, satisficing mitigation

**Total changes vs. foundation:** 1 file changed, 222 insertions

**Status:** Contains a unique review document (`REVIEW-dev-plan.md`) not present on any other branch. However, a similar but different review document (`WEB_PLAN_REVIEW.md`, 320 lines) exists on the remote tip of `review-dev-plan-ubpu4`. These are **different reviews** — `REVIEW-dev-plan.md` reviews the core engine's design, while `WEB_PLAN_REVIEW.md` reviews the web application development plan.

---

### Branch 5: `claude/audit-branch-organization-K2YjW` (CURRENT)

**Purpose:** This audit. Contains only the foundation commit (same as Branch 1) plus this document.

---

## 3. Overlap & Duplication Analysis

### Identical branches
- **`review-project-design-TBQDW` = `review-dev-plan-ubpu4` (local)**
  These are the same branch pushed under two names. `review-project-design-TBQDW` is redundant.

### Subset branches
- **`career-matcher-foundation-HWrR7` ⊂ every other branch**
  The foundation commit (`cc0efe3`) is the ancestor of all branches. This branch has no unique content.

### Unique content per branch

| Branch | Unique content |
|--------|----------------|
| `career-matcher-foundation-HWrR7` | None (subset of all others) |
| `review-dev-plan-ubpu4` (remote) | All remediation work + reviews + CI + web plan + `WEB_PLAN_REVIEW.md` |
| `review-project-design-TBQDW` | None (duplicate of ubpu4 local) |
| `review-dev-plan-W9AVA` | `REVIEW-dev-plan.md` (222-line UX review of core engine) |
| `audit-branch-organization-K2YjW` | This document |

### Overlapping review documents
There are **four** review documents across the branches:

| Document | Branch | Lines | Scope |
|----------|--------|-------|-------|
| `DESIGN_REVIEW.md` | ubpu4 | 322 | Engineering V&V of core engine |
| `EXPERT_REVIEW_VOCATIONAL_PSYCHOLOGY.md` | ubpu4 | 291 | Domain expert review of construct model |
| `WEB_PLAN_REVIEW.md` | ubpu4 (remote) | 320 | Product design review of web app plan |
| `REVIEW-dev-plan.md` | W9AVA | 222 | UX/UI evaluation of core engine design |

All four are distinct documents with different scopes. No content duplication among them, though `REVIEW-dev-plan.md` (on W9AVA) and `DESIGN_REVIEW.md` (on ubpu4) cover some overlapping ground from different perspectives (UX vs. engineering).

---

## 4. Repository State Diagram

```
cc0efe3 (Foundation)
├── career-matcher-foundation-HWrR7  [FROZEN — no unique content]
├── audit-branch-organization-K2YjW  [THIS BRANCH — audit only]
├── review-dev-plan-W9AVA
│   └── 2f44220  Add REVIEW-dev-plan.md (UX review)
│
└── review-dev-plan-ubpu4 / review-project-design-TBQDW  [IDENTICAL at local tip]
    ├── 2faabb6  DESIGN_REVIEW.md
    ├── e1fc9e8  EXPERT_REVIEW_VOCATIONAL_PSYCHOLOGY.md
    ├── 8290022  CLAUDE.md (mission + remediation plan)
    ├── 637fb1b  Phase 1: Construct model fix
    ├── 443ffdf  Phase 6.1: CI pipeline
    ├── 01af411  Phase 2: Matching algorithm fix
    ├── cc1ef11  Phase 3: Validation gaps
    ├── 64daeca  Phase 5: Expand to 52 jobs
    ├── c54ceec  CLAUDE.md update
    ├── 31c9488  Phase 4: Test expansion
    ├── ccd4223  CLAUDE.md update
    ├── 820a78f  Remaining items (randomization, types)
    ├── 8c0c894  Web app development plan  ← local tip / review-project-design tip
    └── 2f6dbcf  WEB_PLAN_REVIEW.md        ← remote-only (ubpu4)
```

---

## 5. Recommendations

### Immediate cleanup

1. **Delete `claude/review-project-design-TBQDW`** — It is an exact duplicate of `review-dev-plan-ubpu4` (at the local commit). No unique content will be lost.

2. **Delete `claude/career-matcher-foundation-HWrR7`** — It contains only the foundation commit that is the ancestor of all other branches. No unique content.

3. **Update local `review-dev-plan-ubpu4`** — The local branch is 1 commit behind the remote. Run `git pull origin claude/review-dev-plan-ubpu4` to sync.

### Consolidation

4. **Merge `REVIEW-dev-plan.md` from `review-dev-plan-W9AVA` into `review-dev-plan-ubpu4`** — This is the only unique content on the W9AVA branch (a 222-line UX review). Cherry-pick or merge it into the main work branch, then delete the W9AVA branch.

5. **After consolidation, `review-dev-plan-ubpu4` becomes the single source of truth** containing:
   - All source code (core engine, 52 jobs, 32 prompts, 78 tests)
   - All review documents (4 reviews)
   - CI pipeline
   - Web application development plan
   - Project documentation (CLAUDE.md)

### Going forward

6. **Adopt a clear branching strategy:**
   - Designate one branch as the canonical development branch (e.g., `main` or `develop`)
   - Merge the consolidated `review-dev-plan-ubpu4` into it
   - Use feature branches for isolated work (e.g., `feature/web-app-phase-w1`), then merge back
   - Avoid creating review branches that accumulate unrelated work — keep reviews as PRs or merge them promptly

7. **Branch naming:** The current `claude/review-*` and `claude/career-matcher-*` naming is inconsistent. Consider a convention:
   - `feature/<description>` for new functionality
   - `review/<description>` for review-only branches (if used at all)
   - `fix/<description>` for bug fixes

---

## 6. Summary Table

| Branch | Unique Content? | Action | Priority |
|--------|-----------------|--------|----------|
| `career-matcher-foundation-HWrR7` | No | Delete | Low |
| `review-dev-plan-ubpu4` | Yes — all core work | Keep as primary | — |
| `review-project-design-TBQDW` | No (duplicate) | Delete | High |
| `review-dev-plan-W9AVA` | Yes — `REVIEW-dev-plan.md` | Merge into ubpu4, then delete | Medium |
| `audit-branch-organization-K2YjW` | Yes — this audit | Merge or keep for reference | Low |

---

## 7. What Has Actually Been Built

For a quick reference, here is the current state of the project (on the most advanced branch, `review-dev-plan-ubpu4` remote tip):

**Core engine (complete):**
- 8-dimension preference model (7 primary + 1 secondary)
- 32 situational prompts (4 per dimension, scenario-based)
- 52 O*NET-informed job profiles across 12+ sectors
- 3-tier matching algorithm (strong/moderate/weak fit bands)
- Explainable results with plain-language fit reasons
- Input validation with edge-case warnings
- 78 passing tests (unit, integration, boundary, adversarial)
- GitHub Actions CI pipeline

**Documentation (complete):**
- `CLAUDE.md` — Project mission, design rules, 11-phase web app plan (~1,600 lines)
- `DESIGN_REVIEW.md` — Engineering V&V review (322 lines)
- `EXPERT_REVIEW_VOCATIONAL_PSYCHOLOGY.md` — Domain expert review (291 lines)
- `WEB_PLAN_REVIEW.md` — Product design review of web plan (320 lines)
- `REVIEW-dev-plan.md` — UX/UI evaluation (222 lines, on separate branch)

**Not yet built:**
- Web application (Next.js) — planned in 11 phases in CLAUDE.md but no code written yet
- No frontend, no UI, no routing, no deployment

---

## 8. Actions Taken (2026-02-07)

The following consolidation actions were executed:

### Completed

1. **Synced local `review-dev-plan-ubpu4`** with remote — pulled 1 missing commit (`2f6dbcf` — `WEB_PLAN_REVIEW.md`).

2. **Cherry-picked `REVIEW-dev-plan.md`** from `review-dev-plan-W9AVA` (commit `2f44220`) into `review-dev-plan-ubpu4`. Clean cherry-pick, no conflicts.

3. **Merged all consolidated work into `audit-branch-organization-K2YjW`** — this branch now contains everything:
   - All 20 source/config/test files
   - All 4 review documents
   - CI pipeline
   - CLAUDE.md with full web app plan
   - This audit document
   - 78 tests passing

4. **Created `cleanup-branches.sh`** — an interactive script to delete the 4 redundant remote branches.

### Remaining (requires manual action)

Session permissions prevented remote branch deletion. Run the cleanup script to finish:

```bash
./cleanup-branches.sh
```

This will delete these remote branches (with confirmation prompt):
- `claude/review-project-design-TBQDW` — exact duplicate
- `claude/career-matcher-foundation-HWrR7` — subset (no unique content)
- `claude/review-dev-plan-W9AVA` — unique content already merged
- `claude/review-dev-plan-ubpu4` — all content merged into this branch

### Post-cleanup state

After running the script, the repository will have a single branch (`audit-branch-organization-K2YjW`) containing all work. This can then be merged into `main` to establish a clean starting point for web app development.
