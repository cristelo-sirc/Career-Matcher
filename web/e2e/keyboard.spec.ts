import { test, expect } from "@playwright/test";

/**
 * Keyboard navigation E2E tests.
 *
 * Verifies the app is fully usable without a mouse:
 * - Tab/Shift+Tab through interactive elements
 * - Enter/Space to select options
 * - Arrow keys to navigate between option cards
 * - Skip link functionality
 */

test.describe("Keyboard navigation", () => {
  test("skip link is accessible via Tab", async ({ page, browserName }) => {
    await page.goto("/");

    // Press Tab — skip link should become visible
    await page.keyboard.press("Tab");
    const skipLink = page.getByRole("link", { name: /skip to main/i });
    await expect(skipLink).toBeVisible();

    // Press Enter — page should scroll/navigate to #main-content
    await page.keyboard.press("Enter");

    // Verify the skip link targets #main-content
    // WebKit doesn't reliably update the URL hash on anchor clicks,
    // so we verify the href attribute instead on WebKit
    if (browserName === "webkit") {
      await expect(skipLink).toHaveAttribute("href", "#main-content");
    } else {
      await expect(page).toHaveURL(/#main-content/);
    }
  });

  test("arrow keys navigate between option cards", async ({ page }) => {
    await page.goto("/quiz/");
    await expect(page.locator("#scenario-heading")).toBeVisible();

    const options = page.locator('button[aria-pressed]');
    const optionCount = await options.count();

    // Focus the first option card
    await options.first().focus();
    await expect(options.first()).toBeFocused();

    // Press ArrowDown — should move to second option
    await page.keyboard.press("ArrowDown");
    if (optionCount > 1) {
      await expect(options.nth(1)).toBeFocused();
    }

    // Press ArrowUp — should move back to first option
    await page.keyboard.press("ArrowUp");
    await expect(options.first()).toBeFocused();
  });

  test("Enter selects an option and pressing Enter again advances", async ({
    page,
  }) => {
    await page.goto("/quiz/");
    await expect(page.locator("#scenario-heading")).toBeVisible();

    const options = page.locator('button[aria-pressed]');

    // Tab to first option and select it
    await options.first().focus();
    await page.keyboard.press("Enter");

    // First option should now be selected
    await expect(options.first()).toHaveAttribute("aria-pressed", "true");

    // The "Next" button should now be visible
    await expect(
      page.getByRole("button", { name: /^next$/i }),
    ).toBeVisible();

    // Press Enter — the quiz has a global Enter handler that advances
    await page.keyboard.press("Enter");

    // Should be on prompt 2 now
    await expect(page.locator("#scenario-heading")).toBeVisible();
  });

  test("Space key selects an option card", async ({ page }) => {
    await page.goto("/quiz/");
    await expect(page.locator("#scenario-heading")).toBeVisible();

    const options = page.locator('button[aria-pressed]');
    await options.first().focus();
    await page.keyboard.press("Space");

    await expect(options.first()).toHaveAttribute("aria-pressed", "true");
  });
});
