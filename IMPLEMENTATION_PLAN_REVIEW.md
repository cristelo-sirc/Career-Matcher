# Career-Matcher: Implementation Plan Review — Design & Assumptions + Verification & Validation

**Review Date:** 2026-02-08
**Reviewer Role:** Design & Assumptions Reviewer + Verification & Validation Engineer
**Scope:** (1) Remediation assessment (Phases 1–6 vs. prior review findings), (2) Web application plan (Phases W-1 through W-11) — design assumptions, risks, V&V gaps, internal consistency
**Project Version:** 0.5.0
**Core Library Tests:** 78 passing (5 test files, scoring/matching/results/integration/validation)
**Prior Reviews Considered:**
- `DESIGN_REVIEW.md` (V&V, 10 findings)
- `EXPERT_REVIEW_VOCATIONAL_PSYCHOLOGY.md` (domain expert, 6 conditions)
- `WEB_PLAN_REVIEW.md` (product design, 10 findings)
- `REVIEW-dev-plan.md` (UX/UI evaluation, 16 recommendations)

---

## Executive Summary

The Career-Matcher project has undergone a substantial and largely successful remediation cycle (Phases 1–6), addressing the most critical findings from both the V&V review and the vocational psychology expert review. The core library is internally consistent, well-tested, and correctly implements its stated design. The web application plan (Phases W-1 through W-11) is one of the most thorough implementation plans I have encountered for a project at this stage — it demonstrates genuine understanding of the target audience, the regulatory environment (COPPA), and the technical constraints.

However, the plan has structural risks that, if unaddressed, will compound during implementation. These fall into three categories: (1) unresolved tensions between prior review recommendations, (2) assumptions in the web plan that contradict established UX evidence or the project's own design principles, and (3) V&V gaps where the plan specifies behavior but provides no verification mechanism until late phases.

**Overall Verdict:** The remediation is substantially complete and well-executed. The web plan is architecturally sound but contains 7 design assumptions that should be resolved before implementation begins, and 5 V&V gaps that should be addressed in-phase rather than deferred to W-7/W-10. Ready to begin Phase W-1 with the adjustments recommended below.

---

## Part 1: Remediation Assessment (Phases 1–6 vs. Prior Findings)

### 1.1 DESIGN_REVIEW.md Findings — Disposition

| ID | Original Finding | Severity | Disposition | Verified |
|----|-----------------|----------|-------------|----------|
| V-01 | Silent discard of OOB responses | Low | **REMEDIATED.** `processResponses()` now returns a `warnings` array with descriptive messages for out-of-bounds indices (`scoring.ts:127-130`). | YES — tested in `scoring.test.ts` |
| V-02 | Tie-breaking relies on JS object iteration order | Low | **REMEDIATED.** `resolveLevel()` now has an explicit doc comment citing the ES2015+ spec guarantee for string key iteration order (`scoring.ts:142-147`). | YES — documented and tested |
| V-03 | Type cast in `jobAcceptsLevel` | Low | **ACKNOWLEDGED, NOT REMEDIATED.** The `as readonly string[]` cast at `matcher.ts:34` still exists. Mitigated by `validateDataIntegrity()` catching invalid levels at build time. | ACCEPTABLE — the runtime validator compensates |
| V-04 | No build-time validation of prompt data | Medium | **REMEDIATED.** `validateDataIntegrity()` in `validate.ts` validates all prompt dimensions and nudgeToward values against dimension metadata. | YES — tested in `validate.test.ts` |
| V-05 | Untyped `DimensionScores` level keys | Medium | **REMEDIATED.** `DimensionScores` type now uses a mapped type with `DimensionLevelMap` (`types.ts:106-108`), constraining level keys to valid values per dimension at compile time. | YES — verified in `types.ts` |
| VAL-01 | No ambiguous/center profile testing | Medium | **REMEDIATED.** Integration tests include center/conflicted profile tests (`integration.test.ts`). | YES — 13 integration tests passing |
| VAL-02 | No end-to-end prompt-to-output test | Medium | **REMEDIATED.** Integration tests run full pipeline from prompt responses through formatted results. | YES |
| VAL-03 | Elimination boundary not explicitly tested | Low | **REMEDIATED.** `matcher.test.ts` includes explicit boundary tests for 1-mismatch (keep) vs. 2-mismatch (eliminate), including the ordinal half-mismatch case. | YES — 26 matcher tests |
| VAL-04 | "No matches" path never triggered | Low | **REMEDIATED.** Adversarial profile test constructs a profile that eliminates all jobs. | YES |
| VAL-05 | No user acceptance testing | High | **NOT REMEDIATED.** No evidence of testing with actual teens. | EXPECTED — requires a running application |

**Remediation Grade: 9/10 findings addressed.** The sole open item (VAL-05, user testing) is correctly deferred until the web application exists. The technical remediations are thorough and properly tested.

### 1.2 EXPERT_REVIEW_VOCATIONAL_PSYCHOLOGY.md Conditions — Disposition

| # | Condition | Disposition | Verified |
|---|-----------|-------------|----------|
| 1 | Scope claim limited to "work-environment preference explorer" | **MET.** CLAUDE.md mission statement, results text output, and footer disclaimer all use correct framing. "NOT a career assessment, aptitude test, or guidance tool" appears in the mission, landing page copy, and footer. | YES |
| 2 | Learning Mode removed or replaced | **MET.** Learning Mode removed entirely. Replaced with Work Value (autonomy/security/altruism/achievement) as the secondary dimension. This is a stronger construct — work values have empirical validity (Super, 1970; TWA). | YES — `dimensions.ts` confirms `workValue` as secondary |
| 3 | Fit percentages reframed as ordinal bands | **MET.** `fitBand()` in `results.ts:23-28` maps scores to "Strong fit" / "Possible fit" / "Stretch" / "Unlikely fit". The `fitPercent` field is retained in `FormattedMatch` but marked as "internal/debug use — not displayed to end users" (`results.ts:62`). | YES |
| 4 | Elimination language softened | **MET.** "Ruled Out" replaced with "Less Likely Fits (based on your current preferences)" throughout (`results.ts:170`, CLAUDE.md rule #5). | YES |
| 5 | Tool positioned as one input among many | **MET.** Exploration prompts section in the web plan includes: "Take an interest inventory (like the Holland RIASEC)," "Talk to a school counselor," and temporal framing ("preferences evolve"). | YES — in plan; implementation pending |
| 6 | Item count increased to 4+ per dimension | **MET.** 32 prompts, 4 per dimension. This brings expected internal consistency into the acceptable range (alpha ~.60–.70 for 4-item scales with weighted nudges). Still below the .80 threshold for individual decision-making, but appropriate for an exploration tool. | YES — `prompts.ts` has 32 prompts |

**Condition Compliance: 6/6 met.** The expert review's "conditionally sound" verdict is now unconditionally satisfied at the library level.

### 1.3 Remediation Quality Assessment

**Strengths:**
- Ordinal distance scoring (`matcher.ts:57-76`) is a genuinely good addition — it prevents adjacent preferences from being treated as full mismatches, producing more realistic elimination behavior.
- The `DimensionScores` mapped type (`types.ts:106-108`) is an elegant solution to V-05 that catches misspelled levels at compile time without runtime overhead.
- The seeded PRNG for option shuffling (`scoring.ts:26-34`, Mulberry32) is a correct choice — deterministic, zero-dependency, and well-documented.
- Expanding from 25 to 54 jobs meaningfully improves coverage across sectors. The addition of healthcare (nurse, pharmacist, physical therapist, vet), education (teacher), creative (animator, sound engineer), and emerging fields (cybersecurity, renewable energy) addresses the "homogeneous recommendations" risk from the expert review.

**Residual Concerns:**

**R-1: `PromptOption.nudgeToward` remains typed as `string`, not as the dimension's level union.**
- `types.ts:71` — `nudgeToward: string`
- The `DimensionScores` type was tightened (V-05 fix), but the prompt option's `nudgeToward` field was not. This means a prompt could reference `nudgeToward: "stedy"` and the compiler would accept it. The runtime validator (`validateDataIntegrity`) catches this, but the type system should be the first line of defense, not the last.
- **Severity: Low.** Runtime validation compensates. But this is a missed opportunity from the V-05 remediation.

**R-2: The 54-job count in the codebase disagrees with the CLAUDE.md claim of 52.**
- `jobs.ts` contains 54 job definitions (verified by explorer count). CLAUDE.md states "52 jobs across 12+ sectors." This discrepancy is minor but suggests the documentation was not updated after the last batch of job additions.
- **Severity: Trivial.** Update the documentation.

**R-3: `processResponses` accepts `Record<string, number>`, not `Map<string, number>`.**
- The web plan (Phase W-4) specifies quiz state as `responses: Map<string, number>`, but `processResponses()` in `scoring.ts:115` accepts `Record<string, number>`. These are not interchangeable — the web layer will need to convert `Map` → `Record` before calling the core library, or the plan should specify `Record` for consistency.
- **Severity: Low.** But this is the kind of mismatch that causes confusion during Phase W-4 implementation.

---

## Part 2: Web Application Plan Review — Design Assumptions

### 2.1 Assumption: Static export (no server) is sufficient

**Status: SOUND, WITH ONE CAVEAT**

The decision to use Next.js 15 with `output: 'export'` (static HTML, no server) is well-reasoned for this project. The architecture guarantees:
- Zero server costs
- Zero data collection (COPPA compliance by architecture, not policy)
- Hostable on any CDN
- No attack surface for server-side vulnerabilities

**Caveat:** The plan specifies Content Security Policy headers in `next.config.ts`. Static exports via Next.js do not serve custom HTTP headers — headers require a server or CDN-level configuration. The plan should clarify that CSP headers must be configured at the hosting layer (Vercel, Cloudflare Pages) or via `<meta http-equiv>` tags in the HTML, not in Next.js config.

### 2.2 Assumption: 400ms auto-advance after option selection

**Status: PROBLEMATIC — CONFLICTS WITH PROJECT'S OWN PRINCIPLES**

The WEB_PLAN_REVIEW.md (Finding #1, priority P0) already identified this as a significant UX risk. The plan acknowledges the review but has not updated Phase W-4 to resolve the conflict. The auto-advance design contradicts:

1. **WCAG 3.2.2 (On Input):** "Changing the setting of any user interface component does not automatically cause a change of context unless the user has been advised of the behavior beforehand." Auto-advancing to a new question is a context change.

2. **The project's own rule #10:** "No dark patterns... Respect their time and autonomy." Auto-advance removes the teen's opportunity to reconsider before committing. The plan says "back button always available," but requiring a correction flow (notice mistake → press back → re-answer) is more disruptive than preventing the mistake (select → confirm → advance).

3. **The project's own rule #11:** "Accessible by default. WCAG 2.1 AA is the floor." Auto-advance at 400ms is below the floor.

**Recommendation:** Adopt the WEB_PLAN_REVIEW.md recommendation: explicit "Next" button that activates after selection. This is simpler to implement, accessible by default, and eliminates the mistap recovery problem. If auto-advance is retained as an option, it should be opt-in (not default), with an 800ms minimum delay and a visible undo affordance.

**V&V Impact:** If auto-advance ships as designed, Phase W-7 accessibility audit will fail it. Fixing it then requires reworking the core interaction model of Phase W-4. Fix the design before implementation, not after.

### 2.3 Assumption: Results page information hierarchy (matches before profile)

**Status: INTERNALLY CONTRADICTORY**

The CLAUDE.md web plan specifies this order: scope disclaimer → top matches → less likely fits → profile summary → exploration prompts → save/export.

The WEB_PLAN_REVIEW.md (Finding #3, priority P0) recommends moving the profile summary *above* the matches. The REVIEW-dev-plan.md (Section 4, "Results & Explainability") notes that `formatProfileSummary()` shows users their profile *before* matches and calls this "good practice."

The CLAUDE.md itself says (Phase W-5): "Results lead with jobs, not psychology." This is the stated rationale for matches-first ordering.

**The tension:** The "jobs first" principle serves first-impression engagement (teens want to see career names, not dimension labels). But the profile-first ordering serves *comprehension* (teens can evaluate matches only if they understand the basis for them). Both are valid — but the plan does not acknowledge the tradeoff or explain why it chose engagement over comprehension.

**Recommendation:** A compromise that serves both: show a *compact* profile summary (8 dimension chips/badges in a single row, no descriptions) above the matches as a visual anchor, then show the full profile summary with descriptions below. This gives the teen a quick "here's what you said" before showing "here's what we found," without burying the matches below a wall of text. The WEB_PLAN_REVIEW.md's chip/card suggestion for non-ordinal dimensions supports this approach.

### 2.4 Assumption: Framer Motion v11 for animations within a < 200KB JS budget

**Status: RISKY**

The Phase W-9 performance target is "< 200KB total JS gzipped." The technology stack specifies Framer Motion v11 for animations. Framer Motion's tree-shaken size is approximately 30–40KB gzipped for a typical usage pattern (`AnimatePresence`, `motion.div`, layout animations, gesture support). Combined with Next.js App Router runtime (~80–90KB gzipped) and React (~45KB gzipped), the framework baseline alone consumes ~155–175KB of the 200KB budget, leaving 25–45KB for the entire application (components, hooks, state management, quiz logic, results rendering, PDF generation).

**This is extremely tight.** The plan specifies lazy-loading for PDF generation (good), but the quiz flow page needs Framer Motion's `AnimatePresence` + gesture support, which is the heavier part of the library.

**Recommendation:** Evaluate whether CSS animations + the `View Transitions API` (available in Chromium and Safari as of 2025) can replace Framer Motion for the two main animation needs: prompt transitions and page transitions. CSS `@keyframes` with `prefers-reduced-motion` media query is zero-JS-cost and achieves the plan's stated animation goals. If Framer Motion is retained, conduct a bundle budget analysis before Phase W-2 commits to it.

### 2.5 Assumption: sessionStorage is sufficient for quiz state persistence

**Status: SOUND FOR THE STATED SCOPE, BUT CONFLICTS WITH REVIEW FEEDBACK**

The plan correctly identifies that `sessionStorage` works in all incognito modes (including Safari Private), making it the right default over `localStorage`. The in-memory `Map` fallback handles the edge case where even `sessionStorage` is unavailable.

**However:** Both the WEB_PLAN_REVIEW.md (Finding #2) and REVIEW-dev-plan.md (Section 1, "No progress indication in the data model") flag that session-only persistence means a teen who is interrupted (class ends, phone dies, tab accidentally closed) loses all progress. The plan acknowledges this risk but does not mitigate it.

The plan's own Phase W-6 specifies URL-encoded state for *completed* results. The WEB_PLAN_REVIEW.md suggests extending this to *partial* state — encoding partial responses in a bookmarkable URL. This is architecturally consistent (state in URL, no server) and solves the interruption problem without violating COPPA.

**Recommendation:** In Phase W-4, implement URL-based partial state encoding alongside sessionStorage. When a teen answers question N, update the URL hash with the encoded partial responses. If they bookmark or share the URL mid-quiz, they (or a recipient) can resume from that point. This is low implementation cost (the encoding logic is already planned for W-6) and high user value.

### 2.6 Assumption: 32 questions presented individually will sustain teen engagement

**Status: UNVALIDATED — HIGH DROPOUT RISK**

The plan includes encouragement banners at 25%/50%/75% milestones. The WEB_PLAN_REVIEW.md (Finding #2) notes that these banners may be counterproductive ("actually reminds the teen how much is left"). The REVIEW-dev-plan.md flags 16 prompts as a "UX bottleneck" — and the remediation *doubled* the count to 32.

The expert review's condition #6 (increase items to 4 per dimension) was correctly prioritized over the UX risk of length. But the web plan does not include any mitigation beyond static encouragement copy. Consider:

1. **Section-based framing** (WEB_PLAN_REVIEW.md recommendation): "Energy Style — done! Next: People & Space" reframes 32 questions as 8 mini-sections of 4. Psychologically, completing 8 small tasks feels faster than grinding through 32 sequential items.

2. **Dimension-reveal teasers:** After each 4-question section, briefly show the resolved dimension result: "Looks like you prefer solo or small-group settings." This provides intrinsic reward (learning something about yourself) that sustains engagement. The scoring engine supports this — `resolveLevel()` can be called incrementally after each 4-prompt section.

3. **Progress framing:** "Section 3 of 8" instead of "Question 9 of 32."

**Recommendation:** Adopt section-based progress framing in Phase W-4. Consider dimension-reveal teasers as a Phase W-4 enhancement (requires incremental `resolveLevel()` calls, which the engine already supports).

### 2.7 Assumption: The shareable URL encodes raw responses, not results

**Status: DESIGN TRADEOFF WITH PRIVACY IMPLICATIONS**

Phase W-6 specifies encoding the 32 raw responses (each 0–3) into a URL. The WEB_PLAN_REVIEW.md (Finding #6) raises a privacy concern: raw responses are decodable, meaning a peer who receives a shared link can reconstruct the sender's full preference profile (e.g., "this person prefers solo work, low error pressure, and loose rules").

The plan's rationale for encoding responses (not results) is that the recipient should see the *same* results the sender saw, computed fresh by the core library. This is technically correct — encoding results would be fragile if the job database changes between sharing and viewing.

**The tradeoff:** Response-based URLs are future-proof and self-contained, but expose the sender's raw preferences. Result-based URLs are privacy-preserving but may become stale.

**Recommendation:** The plan should explicitly acknowledge this tradeoff and make a deliberate choice. If response-based encoding is kept (reasonable), add a disclosure to the share UX: "This link contains your quiz answers. Anyone with the link can see your preferences." This respects rule #10 (respect their autonomy) by ensuring informed consent before sharing.

---

## Part 3: Verification & Validation Gap Analysis

### 3.1 V&V Gaps in the Web Plan

The plan defines acceptance criteria for each phase, which is commendable. However, several criteria are binary (checkbox) rather than measurable, and critical V&V activities are deferred to late phases (W-7 for accessibility, W-10 for cross-device) rather than integrated into each phase.

| ID | Gap | Phase(s) Affected | Risk | Recommendation |
|----|-----|-------------------|------|----------------|
| WV-01 | **No accessibility acceptance criteria in W-4.** Phase W-4 (Prompt Flow) specifies "Screen reader: scenario announced, options announced, selection announced" as acceptance criteria, but does not require axe-core zero-violation verification. The plan defers comprehensive accessibility testing to W-7. | W-4 | HIGH — prompt flow is the core UX; discovering accessibility violations in W-7 means reworking the most complex component | Add "axe-core: zero violations on quiz page" to W-4 acceptance criteria |
| WV-02 | **No performance budget verification until W-9.** The 200KB JS budget and Lighthouse targets are specified in W-9, but technology choices in W-1 (Next.js + Framer Motion + Tailwind) determine whether the budget is achievable. | W-1, W-2 | MEDIUM — discovering bundle bloat in W-9 may require replacing the animation library chosen in W-1 | Add a bundle size check to W-1 acceptance criteria: "Framework baseline (Next.js + React + Tailwind + animation library) < 160KB gzipped, leaving 40KB for application code" |
| WV-03 | **No incognito testing until W-8.** The plan specifies Safari Private Browsing, Chrome Incognito, and Firefox Private testing in W-8, but the storage abstraction is implemented in W-4. | W-4 | MEDIUM — if the StorageAdapter has bugs in Safari Private, all W-4 through W-6 work may need storage-layer fixes | Add "Full quiz completable in Safari Private Browsing" to W-4 acceptance criteria |
| WV-04 | **No core library regression gate per web phase.** The plan says "Core library tests must pass at every phase" in the dependency diagram but does not include it in any phase's acceptance criteria. | W-1 through W-11 | LOW — unlikely to break the core library from the web layer, but Murphy's Law applies | Add `npm test` (core) to every web phase's acceptance criteria. Also add to CI pipeline from W-1. |
| WV-05 | **Share URL round-trip is not tested until W-10.** Phase W-6 specifies "Share URL encodes full state in < 50 characters" and "Share URL decodes and renders correct results on a fresh browser." But cross-browser verification is deferred to W-10. The encoding/decoding logic itself needs a unit test in W-6. | W-6 | LOW — the encoding is straightforward (bit-packing + base64), but edge cases (all-zero responses, all-max responses, partial responses) should be tested | Add unit tests for URL encoding/decoding in W-6: round-trip for all-zero, all-max, mixed, and partial response sets |

### 3.2 Missing V&V: Core Library ↔ Web Layer Contract

The plan states the web app is a "pure presentation layer" that calls the core library's public API. This is a strong architectural boundary — but there is no contract test that verifies the boundary is maintained.

**Risk:** During implementation, a developer may duplicate scoring logic in a React component (e.g., re-implementing `fitBand()` with slightly different thresholds for UI color mapping), or pass incorrect types to the core API (e.g., `Map` instead of `Record` per R-3 above).

**Recommendation:** Add a contract test file (`web/src/__tests__/core-contract.test.ts`) that:
1. Imports every function from the core library's public API
2. Calls each with representative inputs
3. Asserts the output types and key behavioral invariants
4. Verifies that no scoring/matching/formatting logic exists in the web layer (a `grep` test that fails if `fitScore`, `eliminated`, or `mismatch` appear in web component files outside of type imports)

This is a Phase W-1 deliverable (cheap to write, high value for maintaining the boundary).

### 3.3 Missing V&V: Remediation Regression Tests

The remediation addressed 10 findings from DESIGN_REVIEW.md and 6 conditions from the expert review. However, there are no tests that explicitly document *which finding they remediate*. If future development accidentally reverts a remediation (e.g., removing the `warnings` array from `processResponses`), there is no test that says "this test exists because of finding V-01."

**Recommendation:** Add a comment to each remediation-specific test citing the finding it addresses. For example:

```typescript
// Remediation: DESIGN_REVIEW.md V-01 — processResponses must warn on OOB indices
test('warns on out-of-bounds option index', () => { ... });
```

This is documentation, not code change — zero risk, high traceability.

---

## Part 4: Internal Consistency Analysis

### 4.1 Conflicts Between Prior Reviews and Current Plan

The CLAUDE.md web plan was written *before* the WEB_PLAN_REVIEW.md and REVIEW-dev-plan.md reviews. Several review recommendations have not been incorporated back into the plan. This creates a "which document is authoritative?" problem for implementers.

| Topic | CLAUDE.md Plan Says | Review Says | Status |
|-------|-------------------|-------------|--------|
| Auto-advance timing | 400ms delay after selection | 800ms minimum or replace with explicit "Next" button | **UNRESOLVED** |
| Results page order | Matches before profile | Profile before matches | **UNRESOLVED** |
| Progress indicator | "Question 8 of 32" + encouragement banners | Section-based milestones ("Section 2 of 8") | **UNRESOLVED** |
| PDF generation | Print CSS + html-to-canvas + jsPDF | Print CSS only; defer jsPDF | **UNRESOLVED** |
| Dimension bar visualization | Segmented horizontal bars for all dimensions | Chips/cards for non-ordinal, bars for ordinal only | **UNRESOLVED** |
| Share URL encoding | Encode raw responses | Encode results, not responses (privacy) | **UNRESOLVED** |
| Service worker / PWA | Full PWA with service worker | Consider whether PWA complexity is justified | **UNRESOLVED** |

**Recommendation:** Before beginning Phase W-1, resolve each conflict with a one-line decision and rationale in a "Plan Amendments" section of CLAUDE.md. Implementers should not have to cross-reference four documents to determine the correct behavior.

### 4.2 Scope Creep Risk

The web plan specifies 11 phases with acceptance criteria totaling approximately 120 individual checkboxes. Some deliverables are ambitious for a static-export web app:

- **Client-side PDF generation** (W-6) — adds library weight and complexity for a feature that browser print-to-PDF already handles.
- **Full PWA with service worker** (W-9) — adds complexity for a static site that already caches well with standard HTTP headers.
- **Framer Motion animations** (W-4) — adds 30-40KB gzipped for animations that CSS can handle.
- **Custom 404 page** (W-3) — static exports on most CDNs require CDN-level 404 configuration; Next.js `not-found.tsx` may not work as expected.

Each of these is reasonable in isolation, but collectively they push the implementation toward the 200KB JS budget and increase the testing surface.

**Recommendation:** Apply the project's own principle ("exploration, not foreclosure") to the implementation plan itself: define a Minimum Viable Product (MVP) scope (W-1 through W-5 with CSS animations, print CSS only, sessionStorage only) and treat W-6 through W-11 as enhancement phases. This lets the team get a working tool into user testing (VAL-05 from the original design review) faster.

### 4.3 CLAUDE.md Documentation Accuracy

| Item | CLAUDE.md States | Actual | Impact |
|------|-----------------|--------|--------|
| Job count | "52 jobs across 12+ sectors" | 54 jobs in `jobs.ts` | Documentation drift — minor |
| Package version | "Version: 0.5.0" | `package.json` says `"version": "0.1.0"` | Confusing for contributors |
| Test count | "78 passing" | 78 passing (confirmed) | Accurate |
| Vitest version | "Vitest 1.2.0" | `package-lock.json` shows 1.6.1 installed | Minor version drift |
| TypeScript version | "TypeScript 5.3.3" | `package.json` shows `"^5.3.3"` (semver range) | Accurate as minimum |
| Web plan response type | `Map<string, number>` (W-4 state) | `Record<string, number>` in `processResponses()` | Type mismatch — will cause implementation confusion |

**Recommendation:** Update CLAUDE.md to correct the job count, reconcile the version number, and use `Record<string, number>` instead of `Map<string, number>` in the Phase W-4 state specification (or document the required conversion).

---

## Part 5: Risk Register

### Critical Risks (address before Phase W-1)

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| **Auto-advance violates WCAG 3.2.2** | Certain (if shipped as designed) | High — fails the project's own accessibility floor | Resolve design before W-4 implementation |
| **Bundle budget exceeded by framework choices** | High (framework baseline ~155-175KB of 200KB budget) | Medium — requires late-stage library replacement | Conduct bundle analysis in W-1 before committing to Framer Motion |
| **Conflicting review recommendations confuse implementers** | High (4 documents with unresolved conflicts) | Medium — inconsistent implementation, rework | Create "Plan Amendments" section resolving all conflicts |

### Moderate Risks (address during implementation)

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| **32-question dropout** | Medium-High (industry data on teen survey completion) | High — teens abandon before seeing results | Section-based progress framing, dimension teasers |
| **CSP headers not configurable in static export** | Certain (Next.js static export limitation) | Medium — COPPA compliance gap if CSP is omitted | Configure CSP at CDN/hosting level or via `<meta>` tags |
| **Share URLs expose raw preferences** | Medium (depends on teen sharing behavior) | Medium — privacy risk for minors | Add disclosure before sharing; consider results-only encoding |
| **Safari Private Browsing bugs discovered late** | Medium | Medium — storage layer rework | Test in Safari Private during W-4, not W-8 |

### Low Risks (monitor)

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Core library regression from web development | Low | High | Add `npm test` (core) to every web phase gate |
| Custom 404 not working on static host | Medium | Low | Test during W-3 on target host |
| `PromptOption.nudgeToward` type safety gap | Low (runtime validator catches it) | Low | Consider tightening type in future refactor |

---

## Part 6: Recommendations Summary

### Before Phase W-1 (Plan Amendments)

1. **Resolve the auto-advance design.** Choose explicit "Next" button (recommended) or opt-in auto-advance with 800ms delay + undo. Update Phase W-4 spec.

2. **Resolve the results page hierarchy.** Choose matches-first with compact profile header (recommended compromise) or profile-first. Update Phase W-5 spec.

3. **Conduct a bundle budget analysis.** Install Next.js 15 + React + Tailwind v4 + Framer Motion v11 in a test project. Measure the gzipped baseline. If it exceeds 160KB, replace Framer Motion with CSS animations before committing.

4. **Create a "Plan Amendments" section** in CLAUDE.md resolving all 7 conflicts identified in Section 4.1.

5. **Correct documentation inaccuracies** (Section 4.3): job count, version number, response type.

6. **Specify `Record<string, number>`** (not `Map`) for quiz state responses in Phase W-4, matching the core library's `processResponses()` signature.

### During Implementation (Phase-Level)

7. **W-1:** Add core library regression gate (`npm test`) and bundle size check to acceptance criteria.

8. **W-1:** Add a core library contract test file verifying the API boundary.

9. **W-4:** Add axe-core zero-violation check and Safari Private Browsing test to acceptance criteria. Implement section-based progress framing.

10. **W-4:** Implement URL-based partial state encoding (extend W-6 mechanism to partial responses).

11. **W-6:** Add unit tests for URL encoding round-trip (all-zero, all-max, partial, edge cases).

12. **All phases:** Add remediation traceability comments to existing tests that address DESIGN_REVIEW.md findings.

### Scope Management

13. **Define an MVP scope** (W-1 through W-5) that can be user-tested independently of W-6 through W-11. User testing (original VAL-05) is the highest-priority open item and should not wait for PDF generation, PWA support, or cross-browser QA.

14. **Defer jsPDF** in favor of print CSS only (per WEB_PLAN_REVIEW.md recommendation).

15. **Evaluate PWA necessity** — a static site with proper `Cache-Control` headers may provide sufficient offline support without service worker complexity.

---

## Conclusion

The Career-Matcher project is in a strong position. The core library remediation was thorough, well-tested, and properly addressed the concerns raised by both the V&V review and the domain expert review. The 6/6 expert conditions met and the 9/10 technical findings remediated represent high-quality engineering work.

The web application plan is comprehensive and demonstrates genuine care for the target audience. Its main weakness is that it was written before two rounds of review feedback and has not been updated to incorporate that feedback. The 7 unresolved conflicts between the plan and the reviews are not architectural — they are interaction design decisions that should be resolved before coding begins.

The most consequential recommendation in this review is **#13: define an MVP scope and get to user testing faster.** The original DESIGN_REVIEW.md flagged "no user acceptance testing" as the highest-severity validation gap (VAL-05). Eleven web phases, 120 acceptance criteria, and a full PWA implementation stand between the current state and a user-testable product. A leaner path — W-1 through W-5 with CSS animations, print CSS, and sessionStorage — could produce a testable product in a fraction of the time and provide the empirical data that every review has identified as the missing piece.

The engineering is ahead of the evidence. Close the gap.

---

*Review conducted against: CLAUDE.md (71KB), src/ (3,800 lines), 5 test files (78 tests), 4 prior review documents, git history.*
