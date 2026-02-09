# Career Matcher: UX/UI Design Evaluation

## Executive Summary

Career Matcher is a TypeScript engine that matches teens and young adults to career fits through situational prompts and an 8-dimension scoring model. The engine is well-architected as a backend library but has **no web application layer** — no frontend framework, no UI components, no routing, no visual design system. This review evaluates the existing engine's design decisions through a UX lens and identifies what a web application built on top of it must address.

**Overall Assessment:** The engine's foundational design choices are strong for the target audience. The scenario-based prompts, plain-language explanations, and elimination-before-optimization matching model are all sound from a user experience standpoint. However, several structural gaps and interaction design risks need to be addressed before this becomes a usable web product.

---

## 1. Assessment Design (Prompts & Scenarios)

### What Works Well

- **No Likert scales or self-labels.** This is the single best design decision in the project. Teens are notoriously unreliable self-assessors. Asking "how introverted are you on a scale of 1-5" produces noisy data. Asking "You get to pick where you work — a quiet room, a table with a few people, or a busy coffee shop?" produces behavioral signal. This is well-aligned with current UX research on reducing cognitive load in self-assessment tools.

- **Plain language throughout.** The prompts read naturally for a 15-18 year old. No jargon, no abstract constructs. The option text is concrete and visualizable.

- **Weighted nudges over binary gates.** The `weight: 0.8` vs `weight: 1.0` system allows some prompts to be weaker signals, which is more honest about measurement uncertainty than treating every answer as equally definitive.

### Issues and Risks

- **16 prompts is a UX bottleneck.** For a teen audience, 16 multiple-choice questions is borderline. Research on assessment completion rates shows steep drop-off after ~10 questions for ages 14-22. The current design has exactly 2 prompts per dimension with no adaptive shortcutting. If a user picks "solo" twice for People Density, the second question added no new information but still cost attention.

  **Recommendation:** Consider an adaptive flow where high-confidence dimensions (both prompts agree at weight 1.0) are resolved early, and ambiguous dimensions get a tiebreaker prompt instead. This keeps the maximum at 16 but the median closer to 10-12.

- **No progress indication in the data model.** The engine processes all responses at once via `processResponses()` (`scoring.ts:48`). There is no concept of partial completion, session resumption, or incremental scoring. A web app will need to handle users who close the tab at question 9 and come back later.

  **Recommendation:** The scoring engine should support incremental processing or the web layer needs to persist partial response state (e.g., localStorage or server-side session).

- **"Mixed" and "moderate" options may attract satisficing.** In UX research, middle options in any scale attract users who want to "play it safe" or don't want to think hard (satisficing bias). Several prompts have a middle option with lower weight (e.g., `er-1` "mixed" at 0.8, `sp-2` "variable" at 0.8). The lower weight partially addresses this, but the web UI should be designed to discourage defaulting to middle answers — for example, randomizing option order or not visually centering the "middle" option.

- **Option count varies (3-4 per prompt).** Most prompts have 3 options, but `primaryLoadType` prompts have 4. This inconsistency is minor but means the UI card layout must handle variable option counts gracefully. Not a problem, but worth noting for component design.

---

## 2. Dimension Model

### What Works Well

- **Splitting "social" into People Density and Interaction Demand is smart.** Most career quizzes collapse these, but they are genuinely independent. A truck driver is solo with minimal interaction; a librarian is in a small group with moderate interaction. This split produces better matching fidelity.

- **Primary vs. Secondary distinction.** Making Learning Mode a tiebreaker rather than an eliminator is the right call. It prevents a user from being ruled out of a career because they learn differently from the mode the job database assumes.

- **Dimension metadata is comprehensive.** Each level has a `label` and `description` in human-readable form (`dimensions.ts:73-163`). This makes the results explainable without additional translation layers.

### Issues and Risks

- **7 primary dimensions may over-eliminate.** The elimination rule is: 2+ primary dimension mismatches = eliminated (`matcher.ts:90`). With 7 primary dimensions, a user needs to match on 6 out of 7 to survive elimination. For a job that accepts only one level per dimension (e.g., Welder accepts only `steady`, `solo/small-group`, `minimal`, `predictable`, `strict`, `physical`, `high`), a user who prefers `burst` energy and `low` error pressure is eliminated even if the other 5 dimensions are perfect fits.

  **Recommendation:** Consider whether the 2-mismatch threshold is too aggressive given 7 dimensions. A 3-mismatch threshold or a weighted mismatch system (where some dimensions matter more for some jobs) may produce more useful results. Alternatively, surface "near misses" — jobs eliminated by exactly 2 mismatches — with an explanation like "This could work if you're flexible on X and Y."

- **No dimension importance weighting per job.** All primary dimensions are treated equally, but in reality, Error Pressure matters far more for a Paramedic than for a Landscaper. The flat weighting model (`matcher.ts:105`: `primaryScore = primaryMatches / primaryCount`) cannot express this.

  **Recommendation for v2:** Add an optional `weight` or `importance` field per dimension in the job profile so that critical dimensions carry more elimination power.

---

## 3. Job Database

### What Works Well

- **25 jobs across diverse categories.** The selection covers physical trades, analytical/technical, creative, organizational, people-heavy, and solo/quiet roles. This is a solid foundation that avoids the common trap of only listing "college-track" careers.

- **Jobs accept ranges, not points.** A Park Ranger accepts `solo` or `small-group` for People Density. This reflects reality and prevents over-precise elimination.

- **Plain-language descriptions.** "Diagnose and fix problems with cars and trucks" — a 14-year-old knows what this means. No Bureau of Labor Statistics jargon.

### Issues and Risks

- **25 jobs is thin for a real product.** Users who don't match well with any of the 25 will get weak results (low fitScores across the board) or see "No strong matches found." For a web launch, 50-75 jobs would provide meaningfully better coverage, especially in growing fields (healthcare aide, solar installer, content creator, UX designer, etc.).

- **No job metadata beyond the profile.** There is no salary range, education requirement, growth outlook, or "day in the life" content. The results page will feel thin if it only shows a title, one sentence, and a fit percentage. Teens and parents need more substance to take action on results.

  **Recommendation:** Add fields like `typicalEducation`, `medianSalary`, `growthOutlook`, and `dayInTheLife` to the `Job` type. Even a link to an external resource (BLS Occupational Outlook Handbook) would help.

- **Category labels are implicit.** Jobs are grouped by comments in the source code (`// ---- Physical / trades ----`) but there is no `category` field in the `Job` type. The web UI will likely want to group or filter by category.

---

## 4. Results & Explainability

### What Works Well

- **Every match and elimination is explained in plain language.** The fit reasons ("this job fits your preference for solo") and friction points ("you prefer burst, but this job is typically steady") are generated dynamically from the matching logic (`matcher.ts:76-86`). This is excellent — the #1 complaint about career quizzes is "why did it suggest X?" This engine answers that question by default.

- **Dual output: top matches + ruled out.** Showing eliminated jobs with reasons respects the user's intelligence and lets them disagree. "We ruled out Paramedic because you prefer low error pressure" lets the user say "actually, I'd be fine with that" — which is valuable self-reflection even if the tool doesn't act on it.

- **Profile summary before results.** `formatProfileSummary()` (`results.ts:19`) shows users their resolved profile before showing job matches. This is good practice — it lets users validate or challenge the system's understanding before seeing recommendations.

### Issues and Risks

- **Fit percentage may create false precision.** A score of "78% fit" vs "74% fit" implies a meaningful difference that the underlying model doesn't support with 16 questions and 3-level ordinal dimensions. Users (and especially parents) may fixate on small score differences.

  **Recommendation:** Consider bucketing scores into qualitative tiers ("Strong Fit," "Good Fit," "Possible Fit") rather than showing exact percentages, or show the percentage alongside the tier to manage expectations.

- **No actionable next steps.** The results tell users *what* fits but not *what to do about it*. A web app should include calls to action: "Learn more about this career," "Find training programs near you," "Talk to someone who does this job."

- **Eliminated jobs capped at 5 in text output.** `renderResultsAsText()` (`results.ts:130`) only shows the first 5 eliminated jobs. With 25 jobs in the database, many will be eliminated. The web UI should handle this more gracefully — perhaps a collapsible "See all ruled-out careers" section.

---

## 5. Web Application Architecture Gaps

The engine is a pure TypeScript library with no web application layer. Building a web frontend requires decisions on:

### 5.1 Framework & Rendering
No frontend framework is present. For the target audience (teens, mobile-first, accessible), a lightweight framework like Next.js (React) or SvelteKit would work. The engine is small enough to run entirely client-side — no API server is strictly needed. However, if the plan includes saving/sharing results or analytics, a backend will be necessary.

### 5.2 State Management
The assessment is a linear flow (16 questions -> scoring -> results), which is simple enough for local component state or URL-based state. But the lack of incremental scoring in the engine means the frontend must accumulate all responses and batch-process them. Consider whether the URL should encode progress (e.g., `/quiz/question/7`) for shareability and back-button support.

### 5.3 Mobile-First Design
Teens access the web primarily on phones. The UI must be designed mobile-first:
- Large tap targets for answer options (minimum 48x48px, ideally larger)
- One question per screen (not a scrolling form)
- Swipe or tap to advance
- Results that scroll vertically with cards, not dense tables

### 5.4 Accessibility
No accessibility considerations are documented. The engine's plain language helps, but the web layer must address:
- Screen reader compatibility for the quiz flow
- Keyboard navigation through options
- Color contrast (WCAG AA minimum, AAA preferred for this audience)
- Focus management between questions
- Reduced motion preferences for any transitions

### 5.5 Performance
The engine is ~25KB compiled, with 25 jobs and 16 prompts. Performance is not a concern for the matching logic. The web app's performance will depend entirely on the frontend framework choice, asset optimization, and hosting.

---

## 6. Interaction Design Recommendations for the Web App

### 6.1 Quiz Flow
- **One question per screen** with a clear progress indicator (e.g., "Question 5 of 16" or a progress bar).
- **No back button anxiety.** Let users change previous answers. The engine's batch-processing model (`processResponses`) supports this — just re-run with the updated response map.
- **Transition animations** between questions should be subtle and fast (150-200ms). Avoid gamification gimmicks (confetti, level-up sounds) that may feel patronizing to older teens.
- **Estimated time remaining** at the start: "This takes about 3-5 minutes."

### 6.2 Results Page
- **Lead with the #1 match** prominently, not a list. Show the top job as a hero card with its fit reasons, then show #2-5 below.
- **Expandable detail cards** for each job. Default view: title + fit tier + one-line description. Expanded: full fit reasons, friction points, and (when available) salary/education/next steps.
- **Profile summary as a sidebar or top section**, not inline with results. Users want to see their matches first, then understand why.
- **Share button.** Teens will share results with friends and parents. Generate a shareable link or image card.

### 6.3 Emotional Design
This tool surfaces identity-adjacent information for teenagers. The tone must be:
- **Encouraging but honest.** "These are starting points, not limits."
- **Non-deterministic.** Avoid language like "you should be a..." in favor of "careers that match how you work."
- **Friction points framed constructively.** "You prefer steady energy, but this job involves bursts — that's something to consider, not a dealbreaker" is better than "mismatch."

---

## 7. Data & Content Gaps

| Gap | Impact | Priority |
|---|---|---|
| No job metadata (salary, education, growth) | Results feel incomplete; parents can't evaluate | High |
| No job category field | Can't group/filter in UI | Medium |
| No "near miss" handling | Users miss jobs eliminated by a thin margin | Medium |
| No session persistence model | Users lose progress on tab close | High |
| No analytics/tracking hooks | Can't measure completion rates or drop-off | Medium |
| No A/B testing infrastructure | Can't iterate on prompt wording | Low (for v1) |
| No localization/i18n | English only | Low (for v1) |

---

## 8. Scoring Model Concerns

### 8.1 Default Values on Missing Data
`resolveProfile()` (`scoring.ts:91-102`) falls back to defaults when a dimension has no signal: `mixed` for energy, `small-group` for people density, `moderate` for most others, `analytical` for load type, `hands-on` for learning mode. These defaults bias toward a "safe middle" profile, which will match office-type jobs and underweight trades and extreme roles. If a user skips prompts (or the adaptive flow skips them), the defaults silently shape results.

**Recommendation:** Surface when defaults were used. "We didn't get a clear signal on your Error Pressure preference, so we assumed moderate. You can adjust this."

### 8.2 Tie-Breaking
`resolveLevel()` (`scoring.ts:72-82`) breaks ties by returning the first key encountered during `Object.entries()` iteration. Object key order in JavaScript is insertion order for string keys, which is deterministic but not semantically meaningful. If a user is genuinely torn between two levels, the tiebreaker is arbitrary.

**Recommendation:** When scores are tied, surface both levels to the user: "You seem equally comfortable with solo or small-group settings. We went with solo, but both apply." Or run matching against both and show the union of results.

---

## 9. Competitive Context

Career assessment tools for teens (e.g., YouScience, Xello, Roadtrip Nation) typically offer:
- 50-200+ careers
- Visual/interactive assessments (drag-and-drop, image-based)
- Integration with school counselor dashboards
- Longitudinal tracking (retake over time)
- Connection to local programs/colleges

Career Matcher's advantage is its transparency (explainable matching) and simplicity (no account required, fast completion). Its disadvantage is content depth and breadth. The web application should lean into the transparency advantage — make the "why" of every match front and center — rather than trying to compete on database size.

---

## 10. Summary of Priorities for Web Application Development

### Must Have (v1)
1. Mobile-first responsive quiz UI with one question per screen
2. Progress indicator and ability to change previous answers
3. Results page with tiered matches, fit reasons, and friction points
4. Session persistence (localStorage minimum) for partial completion
5. Accessibility compliance (WCAG AA)
6. Share functionality for results

### Should Have (v1.5)
7. Job metadata (salary, education, growth outlook)
8. Job category grouping and filtering on results page
9. "Near miss" section for narrowly eliminated jobs
10. Profile adjustment ("I disagree with this — let me change it")
11. Analytics for completion rates and drop-off points

### Nice to Have (v2)
12. Adaptive prompt flow (skip confident dimensions)
13. Per-job dimension importance weighting
14. Expanded job database (50-75 careers)
15. "Day in the life" content for top matches
16. Retake/compare functionality ("How have your preferences changed?")

---

*Review Date: 2026-02-07*
