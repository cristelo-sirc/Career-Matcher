import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { completeQuiz } from "./helpers";

/**
 * Accessibility E2E tests using axe-core.
 *
 * Runs automated WCAG 2.1 AA checks on every page in both light and dark mode.
 *
 * NOTE: The app uses a 200ms fade-in CSS animation on <main>.
 * We must wait for it to complete before scanning, otherwise axe-core
 * sees partially-opaque text and reports false color-contrast violations.
 */

// The quiz-completion tests need extra time
test.setTimeout(120_000);

/** Wait for the fade-in animation on <main> to finish. */
async function waitForFadeIn(page: import("@playwright/test").Page) {
  await page.waitForTimeout(350); // 200ms animation + safety margin
}

/** Helper to report axe violations in a readable format. */
function formatViolations(violations: Awaited<ReturnType<AxeBuilder["analyze"]>>["violations"]) {
  return violations.map((v) => ({
    id: v.id,
    impact: v.impact,
    help: v.help,
    nodes: v.nodes.length,
    targets: v.nodes.map((n) => n.target).flat(),
  }));
}

test.describe("Accessibility — axe-core WCAG 2.1 AA", () => {
  test("landing page has no violations", async ({ page }) => {
    await page.goto("/");
    await waitForFadeIn(page);
    const results = await new AxeBuilder({ page }).analyze();
    expect(
      results.violations,
      JSON.stringify(formatViolations(results.violations), null, 2),
    ).toEqual([]);
  });

  test("quiz page (first prompt) has no violations", async ({ page }) => {
    await page.goto("/quiz/");
    await expect(page.locator("#scenario-heading")).toBeVisible();
    await waitForFadeIn(page);

    const results = await new AxeBuilder({ page }).analyze();
    expect(
      results.violations,
      JSON.stringify(formatViolations(results.violations), null, 2),
    ).toEqual([]);
  });

  test("quiz page (mid-quiz, with back button visible) has no violations", async ({
    page,
  }) => {
    await page.goto("/quiz/");

    for (let i = 0; i < 3; i++) {
      await expect(page.locator("#scenario-heading")).toBeVisible();
      const options = page.locator('button[aria-pressed]');
      await expect(options.first()).toBeVisible();
      await options.first().click();
      const nextBtn = page.getByRole("button", { name: /^next$/i });
      await expect(nextBtn).toBeVisible();
      await nextBtn.click();
    }

    await expect(page.locator("#scenario-heading")).toBeVisible();
    await waitForFadeIn(page);
    const results = await new AxeBuilder({ page }).analyze();
    expect(
      results.violations,
      JSON.stringify(formatViolations(results.violations), null, 2),
    ).toEqual([]);
  });

  test("results page has no violations", async ({ page }) => {
    await completeQuiz(page);
    await waitForFadeIn(page);

    const results = await new AxeBuilder({ page }).analyze();
    expect(
      results.violations,
      JSON.stringify(formatViolations(results.violations), null, 2),
    ).toEqual([]);
  });

  test("about page has no violations", async ({ page }) => {
    await page.goto("/about/");
    await waitForFadeIn(page);

    const results = await new AxeBuilder({ page }).analyze();
    expect(
      results.violations,
      JSON.stringify(formatViolations(results.violations), null, 2),
    ).toEqual([]);
  });

  test("404 page has no violations", async ({ page }) => {
    await page.goto("/nonexistent-page/");
    await waitForFadeIn(page);

    const results = await new AxeBuilder({ page }).analyze();
    expect(
      results.violations,
      JSON.stringify(formatViolations(results.violations), null, 2),
    ).toEqual([]);
  });

  test("landing page in dark mode has no violations", async ({ page }) => {
    await page.goto("/");
    await waitForFadeIn(page);

    const themeToggle = page.getByRole("button", {
      name: /switch to dark mode/i,
    });
    await themeToggle.click();
    await expect(page.locator("html")).toHaveClass(/dark/);
    // Wait for transition-colors to settle on all elements
    await page.waitForTimeout(500);

    const results = await new AxeBuilder({ page }).analyze();
    expect(
      results.violations,
      JSON.stringify(formatViolations(results.violations), null, 2),
    ).toEqual([]);
  });

  test("results page in dark mode has no violations", async ({ page }) => {
    await completeQuiz(page);
    await waitForFadeIn(page);

    const themeToggle = page.getByRole("button", {
      name: /switch to dark mode/i,
    });
    await themeToggle.click();
    await expect(page.locator("html")).toHaveClass(/dark/);
    // Wait for transition-colors to settle on all elements
    await page.waitForTimeout(500);

    const results = await new AxeBuilder({ page }).analyze();
    expect(
      results.violations,
      JSON.stringify(formatViolations(results.violations), null, 2),
    ).toEqual([]);
  });
});
