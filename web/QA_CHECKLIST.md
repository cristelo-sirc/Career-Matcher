# Career-Matcher Manual QA Checklist

## How to Test on Your iPhone / iPad

1. On your Mac, open Terminal and run:
   ```
   cd web
   npx serve out -l 3001 --no-clipboard
   ```
2. Find your Mac's local IP address:
   - Go to System Settings > Wi-Fi > click your network > look for "IP address"
   - It will look like `192.168.1.XXX`
3. On your iPhone/iPad, make sure you're on the same Wi-Fi network
4. Open Safari and go to: `http://192.168.1.XXX:3001`

---

## iPhone Checklist

### 1. Landing Page
- [ ] Page loads without errors
- [ ] "Get Started" button is visible and tappable
- [ ] Text is readable without zooming
- [ ] No horizontal scrolling
- [ ] Footer links ("About & Methodology", "Privacy") work

### 2. Quiz Flow
- [ ] Tap "Get Started" — quiz page loads
- [ ] Scenario text is fully readable
- [ ] All option cards are visible without scrolling sideways
- [ ] Tapping an option card selects it (visual highlight)
- [ ] "Next" button appears after selecting an option
- [ ] Tapping "Next" advances to the next prompt
- [ ] Progress bar updates as you advance
- [ ] Section labels change (e.g., "Energy", "People", etc.)
- [ ] Back button (left arrow) returns to previous prompt
- [ ] Previous answer is preserved when going back
- [ ] Complete all 32 prompts — "See Results" button appears on #32
- [ ] Tapping "See Results" navigates to results page

### 3. Results Page
- [ ] "Your Results" heading is visible
- [ ] Profile summary shows 8 dimension bars
- [ ] Job matches are listed with fit badges (Strong, Possible, etc.)
- [ ] Each job card shows education, outlook info
- [ ] Scroll through the full results page — no layout issues
- [ ] "Save Your Results" section is visible at the bottom

### 4. Export Features
- [ ] Tap "Copy Share Link" — toast says "Link copied"
- [ ] Open a new Safari tab and paste the link — results load with "viewing someone's" banner
- [ ] Tap "Copy as Text" — toast says "Copied to clipboard"
- [ ] Paste in Notes app — formatted results text appears
- [ ] Tap "Print / Save as PDF" — print dialog opens
- [ ] Tap "Start Over" — confirmation dialog appears
- [ ] Tap "Go Back" in dialog — dialog closes, results stay
- [ ] Tap "Start Over" again, then confirm — returns to landing page

### 5. Dark Mode
- [ ] Tap the moon icon (top right) — dark mode activates
- [ ] All text remains readable in dark mode
- [ ] Navigate to quiz page — dark mode persists
- [ ] Navigate to about page — dark mode persists
- [ ] Tap the sun icon — light mode returns

### 6. About Page
- [ ] Tap "About" in the header — about page loads
- [ ] All sections readable (Methodology, Privacy, Scope)
- [ ] Privacy section explains no data collection
- [ ] "Take the Quiz" link works

### 7. Landscape Orientation
- [ ] Rotate to landscape — layout adjusts
- [ ] Quiz options still tappable
- [ ] No content cut off or overlapping
- [ ] Rotate back to portrait — layout returns to normal

### 8. Touch & Gestures
- [ ] All buttons/links have adequate tap targets (not too small)
- [ ] No accidental taps on wrong elements
- [ ] Scroll feels smooth (no jank)
- [ ] No overscroll bounce at top/bottom of pages

### 9. Incognito / Private Browsing
- [ ] Open a Private Browsing tab in Safari
- [ ] Navigate to `http://192.168.1.XXX:3001`
- [ ] Start the quiz — it should work normally
- [ ] (Known limitation: quiz state won't survive if you navigate away)

### 10. PWA — "Add to Home Screen"
- [ ] In Safari, tap the Share button (square with up arrow)
- [ ] Tap "Add to Home Screen"
- [ ] Give it a name (or use default) and tap "Add"
- [ ] App icon appears on home screen
- [ ] Tap the icon — app opens in standalone mode (no Safari chrome)
- [ ] Complete a quiz in standalone mode — it should work

---

## iPad Checklist

### All iPhone items above, PLUS:

### 11. Tablet Layout
- [ ] Content is centered and readable (not stretched too wide)
- [ ] Max width constraint (~768px) keeps content comfortable
- [ ] Good use of whitespace on the larger screen

### 12. Portrait & Landscape
- [ ] Portrait orientation — content fills width appropriately
- [ ] Landscape orientation — content still centered, not too wide

### 13. Split View (iPad)
- [ ] Open Career-Matcher in one half of Split View
- [ ] App layout adapts to the narrower width
- [ ] All interactive elements remain usable
- [ ] Quiz is still completable in Split View

---

## Quick Pass/Fail Summary

| Area | iPhone | iPad |
|------|--------|------|
| Landing page | [ ] | [ ] |
| Quiz flow (32 prompts) | [ ] | [ ] |
| Results page | [ ] | [ ] |
| Export features | [ ] | [ ] |
| Dark mode | [ ] | [ ] |
| About page | [ ] | [ ] |
| Landscape | [ ] | [ ] |
| Touch targets | [ ] | [ ] |
| Private browsing | [ ] | [ ] |
| PWA install | [ ] | [ ] |
| Split View | N/A | [ ] |

---

## Reporting Issues

If you find something that doesn't work:
1. Note which device (iPhone/iPad) and iOS version
2. Describe what you tapped and what happened
3. Take a screenshot if possible (press Power + Volume Up)
4. Tell me and I'll fix it!
