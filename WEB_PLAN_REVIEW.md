# Product Design Review: Web Application Development Plan

**Reviewer role:** Product Designer (UX/UI)
**Document reviewed:** CLAUDE.md — Phases W-1 through W-11
**Date:** 2026-02-07

---

## Overall Assessment

This is an unusually well-considered development plan. The theoretical grounding
(TWA/Dawis & Lofquist), the COPPA-first architecture, and the "exploration not
foreclosure" language philosophy are substantive, not performative. The core library's
clean 4-phase pipeline gives the web layer a solid foundation.

That said, there are real UX problems, missing design considerations, and some decisions
that work against the plan's own stated goals. Covered below in priority order.

---

## 1. The 400ms Auto-Advance Is a Significant UX Risk

**Phase W-4** specifies: *"Tapping/clicking an option selects it and auto-advances to
the next prompt after a 400ms delay."*

This is the single most consequential interaction design decision in the plan, and it's
problematic:

- **Accidental taps on mobile are common.** Teens scrolling on phones frequently trigger
  unintended taps. With auto-advance, a mistap becomes a wrong answer *plus*
  disorientation (they're suddenly on a new question). The plan says "back button always
  available," but recovering from a mistap requires: (a) noticing it happened, (b) pressing
  back, (c) re-answering. That's 3 steps to fix 1 error.

- **400ms is too fast for cognitive confirmation.** Research on selection confidence
  (Hick-Hyman law extensions) suggests users need ~600–800ms to feel certain their
  selection registered correctly. At 400ms, the transition begins before the user has
  fully processed the visual feedback.

- **It violates WCAG 3.2.2 (On Input).** Auto-advancing on selection is a context change
  triggered by input without advance warning. The plan *does* mention screen reader
  announcements, but the auto-advance itself is the issue. Users with motor impairments
  who accidentally activate a button lose context.

**Recommendation:** Replace auto-advance with a visible "Next" button that becomes active
after selection. Keep the option card selection as a distinct step from navigation. If
auto-advance is kept, increase the delay to 800ms minimum and add a clear "undo"
affordance (not just "back") visible during the delay window. Provide a user setting to
disable auto-advance entirely.

---

## 2. The 32-Question Length Needs Stronger Mitigation

The plan acknowledges this is a 5–8 minute experience and adds encouragement banners at
25%/50%/75%. This is insufficient for the target audience.

- **Teens abandon long forms.** Industry data on teen survey completion shows steep
  drop-off after ~15 questions. 32 questions is in the danger zone.

- **The encouragement banners are the wrong intervention.** "Great start! You're a quarter
  of the way through" actually *reminds* the teen how much is left, which is demotivating.
  Progress bars create anxiety when completion is distant.

- **No save/resume mechanism.** If a teen is interrupted (class ends, parent calls, phone
  dies), they lose everything. The plan only saves to sessionStorage, which dies with the
  tab. There's no "come back later" path.

**Recommendations:**

- Show progress as section-based milestones rather than "N of 32": *"Energy Style — done!
  Next: People & Space"* (8 sections of 4 questions feels shorter than 32 individual
  questions).

- Replace percentage encouragement with dimension-reveal teasers: *"You just finished the
  People section. 6 more mini-sections to go."* This reframes the remaining work as
  smaller chunks.

- Consider a URL-based progress save: encode partial responses in a URL the teen can
  bookmark. The shareable URL mechanism (Phase W-6) already exists — extend it to partial
  states.

---

## 3. The Results Page Has an Information Hierarchy Problem

The plan specifies this order:

1. Scope disclaimer
2. Top Matches
3. Less Likely Fits
4. Preference Profile
5. Explore Further
6. Save/Export

The profile summary is buried at position 4. This contradicts usability for the results
page's actual job — helping the teen *understand* their results.

- **The matches are meaningless without profile context.** A teen seeing "Software
  Developer — Strong fit" can't evaluate that claim without first understanding *why*.
  The profile provides the "why." Putting it after 5–8 match cards means most users will
  never scroll to it.

- **The scope disclaimer at position 1 creates a negative first impression.** The teen
  just finished 32 questions. Their emotional state is anticipatory. Leading with a
  legal-toned disclaimer ("this is not a career assessment") is deflating. It should
  exist, but not as the first thing they see.

**Recommended order:**

1. Brief congratulatory moment + 1-line scope context (inline, not a banner)
2. Your Preference Profile (compact — this is the "here's what we learned about you"
   moment)
3. Top Matches (now the teen has context to evaluate them)
4. Less Likely Fits (collapsed)
5. Explore Further
6. Save/Export
7. Full scope disclaimer (footer-level)

---

## 4. The Dimension Bar Visualization Is Underdeveloped

Phase W-5 describes dimension bars as segmented bars with one highlighted segment.

This is conceptually fine but has design gaps:

- **No indication of confidence/strength.** The core library accumulates weighted nudges,
  but the display is binary (you're "steady" or you're not). A teen who answered 3/4
  prompts toward "steady" and 1 toward "burst" sees the same display as someone who
  answered 4/4 "steady." This flattens meaningful variation.

- **No indication of which dimensions matter most for their results.** All 8 dimensions
  display equally, but some drove the matching more than others. A teen whose
  `primaryLoadType=analytical` was the key differentiator has no way to know that.

- **The segmented bar is deceptively ordinal for non-ordinal dimensions.**
  `energyRhythm` (steady/burst/mixed) and `primaryLoadType` (physical/analytical/
  creative/organizational) are *not* ordinal — the plan says so explicitly. But a
  segmented horizontal bar implies a spectrum with meaningful adjacency. "Steady" next
  to "burst" next to "mixed" suggests "mixed" is between them, which isn't the semantic
  intent.

**Recommendations:**

- For non-ordinal dimensions, use a chip/card selection model instead of a bar: show all
  options as cards/chips, highlight the resolved one. This avoids implying a spectrum.

- For ordinal dimensions, the segmented bar works. Consider showing a subtle gradient or
  shading to indicate confidence strength (not a number — just visual weight).

- In match card "why this fits" sections, bold or highlight which dimensions were the key
  drivers.

---

## 5. Missing: What Happens When Results Feel Wrong?

The plan has no mechanism for a teen who sees their results and thinks "this doesn't feel
right." This is a critical gap for an exploration tool targeting a self-discovering
audience.

- Teens' self-perception is still forming. A 15-year-old may answer prompts based on what
  they *think* they prefer (or what peers would approve of) rather than genuine preference.
  When results feel off, the tool should help them explore why.

- The only current option is "Start Over," which means re-answering all 32 questions.

**Recommendations:**

- Add a "Something feel off?" link on the results page that explains: *"Your results
  depend on the options you picked today. If a match surprises you, try tapping into it
  to see which preferences drove it — you might want to go back and reconsider a few
  answers."*

- Allow selective replay: let the teen revisit specific dimension sections (4 prompts
  each) without redoing the entire quiz. The URL-encoded state makes this technically
  feasible — decode, modify 4 responses, re-encode.

---

## 6. The Share URL Design Has a Social Context Problem

The plan says: *"No 'share to social media' buttons (privacy: teens shouldn't be pushed
to share preference data publicly)."* This is the right instinct, but the "Copy Share
Link" feature still has issues:

- **The URL reveals preferences.** Even without social buttons, teens *will* share links
  in group chats, Discord servers, and social media. The encoded state in the URL is
  decodable. A peer could run the same URL and see exactly what another teen's preferences
  are. For teens, this creates vulnerability.

- **No context travels with the link.** When someone opens a shared link, they see results
  with no explanation of whose results these are, when they were taken, or what the tool
  is. The plan doesn't specify a landing experience for shared-URL recipients.

**Recommendations:**

- Add a clear "These are someone's results" banner when a URL is decoded (not a fresh
  session).

- Include a "Take the quiz yourself" CTA on shared-result pages.

- Consider whether the encoding should be one-way (results-only, not responses). Encode
  the `FormattedResults` output rather than the raw responses. This prevents re-running
  someone else's answers but still shows the results they wanted to share.

---

## 7. Mobile Touch Target Math Doesn't Add Up

The plan specifies 44×44px minimum touch targets (WCAG 2.5.5) and shows option cards as
"full-width" on mobile with "min-height: 56px" and "padding: 16px." For prompts with 3
options this works. For `primaryLoadType` prompts with 4 options, the math gets tight:

- Viewport height on iPhone SE: 667px
- Sticky header: ~48px
- Progress bar: ~24px
- Scenario text (3 lines at 18px): ~80px
- 4 option cards at 56px + 8px gap: ~248px
- Padding/margins: ~48px
- **Total: ~448px**

This fits, but barely — and only if scenario text is short. Longer scenarios (the plan
shows multi-line scenarios) will push the 4th option below the fold, requiring a scroll
that isn't obvious.

**Recommendation:** For 4-option prompts on small viewports, reduce option card padding
from 16px to 12px or use a more compact card style. Test specifically with the longest
scenario text on iPhone SE (375×667).

---

## 8. Dark Mode Needs Design Specification, Not Just "Support"

The plan mentions dark mode throughout but never specifies the dark palette beyond "same
hue family at lower saturation." For a tool where color carries meaning (fit badges), dark
mode is a design challenge, not a toggle:

- `fit-strong: emerald-600` on a dark background needs to shift — emerald-600 on gray-900
  has different perceived contrast than on white.

- Badge legibility in dark mode requires testing each color at both sizes.

- Print output from dark mode should still produce a light/readable document.

**Recommendation:** Define an explicit dark-mode color token set for all semantic colors
(fit bands, surface, text, muted). Don't rely on Tailwind's automatic dark variant for
meaning-carrying colors.

---

## 9. PDF Generation Is Over-Scoped

The plan describes two approaches: print CSS (primary) and `html-to-canvas + jsPDF`
(secondary). The secondary approach is a significant implementation effort for marginal
gain:

- `html-to-canvas` produces rasterized output (blurry text, large files).
- `jsPDF` adds ~80KB to the bundle (against the 200KB total target).
- The primary use case (teen brings results to counselor) is fully served by print CSS +
  "Save as PDF" from the browser print dialog.

**Recommendation:** Ship with print CSS only. If user research later reveals that the
browser print dialog is a barrier, add PDF generation as a post-launch enhancement. This
saves significant complexity in Phase W-6 and protects the bundle budget.

---

## 10. Smaller Issues Worth Noting

**a. The "5–8 minutes" claim needs validation.** 32 prompts × (read time + think time +
select time) could easily hit 10–12 minutes for slower readers or more deliberate
thinkers. Under-promising and over-delivering is better: say "about 10 minutes" and have
them finish in 7.

**b. The encouragement copy is patronizing to older teens.** "Great start!" and "Nice
work!" read well for 14-year-olds but may alienate 19–22-year-olds. Consider age-neutral
phrasing: "8 down, 24 to go" or make encouragement copy a progressive disclosure (show
it, but subtly).

**c. The "About & Methodology" page is undefined.** The plan mentions it in navigation
but never specs it. This page matters for credibility — counselors and parents will look
for it. Spec it.

**d. No error recovery for corrupted storage.** If sessionStorage contains malformed JSON
(browser extensions, cosmic rays), the plan doesn't specify what happens. The storage
adapter should validate on read and fail gracefully to a fresh start.

**e. The PWA offline story conflicts with the "static export" story.** A fully static
site already works offline once cached. The service worker adds complexity for marginal
benefit. Given the target audience (school networks with restrictive proxies that may
block service worker registration), consider whether PWA is worth the implementation cost
in Phase W-9 or if a simple cache-control header strategy is sufficient.

---

## Summary of Priority Recommendations

| Priority | Issue | Action |
|----------|-------|--------|
| **P0** | Auto-advance UX risk | Replace with explicit "Next" button or add undo + longer delay |
| **P0** | Results information hierarchy | Move profile summary above matches |
| **P1** | 32-question drop-off | Section-based progress + dimension teasers |
| **P1** | No "results feel wrong" path | Add selective replay and explanation links |
| **P1** | Non-ordinal dimension visualization | Use chips/cards instead of bars for categorical dimensions |
| **P2** | Share URL social context | Encode results not responses; add recipient context |
| **P2** | Dark mode color spec | Define explicit dark-mode semantic tokens |
| **P2** | PDF over-scoping | Ship print CSS only; defer jsPDF |
| **P3** | Touch target math on 4-option prompts | Test and adjust for iPhone SE |
| **P3** | Time estimate, copy tone, about page | Adjust copy; spec the methodology page |

---

## Conclusion

The plan is structurally sound — the phased approach, the privacy-first architecture,
and the theoretical grounding are well-executed. The issues above are refinements, not
foundational problems. The most impactful changes would be rethinking the auto-advance
interaction and the results page hierarchy, as these affect every single user session.
