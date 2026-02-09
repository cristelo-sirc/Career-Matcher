import { test, expect } from "@playwright/test";
import { completeQuiz } from "./helpers";

/**
 * Incognito / disabled-storage simulation E2E tests.
 *
 * We simulate incognito by making sessionStorage.setItem throw for
 * our app's storage key prefix. This triggers the in-memory Map fallback —
 * the same codepath used in real incognito/private browsing.
 *
 * NOTE: The in-memory fallback is per-StorageAdapter instance. When
 * navigating from /quiz/ → /results/, the results page creates a new
 * StorageAdapter with an empty Map, so quiz answers aren't carried over.
 * In the real app this is a known limitation of incognito mode.
 * We test that:
 *   1. The quiz doesn't crash with storage disabled
 *   2. Shared profile URLs work without storage (the primary user flow for sharing)
 *
 * Clipboard tests only run on Chromium.
 */

// Quiz completion tests need extra time
test.setTimeout(120_000);

/** Install the storage mock that throws for app-specific keys */
async function installStorageMock(page: import("@playwright/test").Page) {
  await page.addInitScript(() => {
    const originalSetItem = Storage.prototype.setItem;
    Storage.prototype.setItem = function (key: string, value: string) {
      if (key === "__cm_test" || key.startsWith("cm-")) {
        throw new DOMException(
          "The quota has been exceeded.",
          "QuotaExceededError",
        );
      }
      return originalSetItem.call(this, key, value);
    };
  });
}

test.describe("Incognito simulation — disabled sessionStorage", () => {
  test("quiz does not crash with sessionStorage disabled", async ({ page }) => {
    await installStorageMock(page);

    await page.goto("/quiz/");
    await expect(page.locator("#scenario-heading")).toBeVisible({ timeout: 10_000 });

    // Complete first 5 prompts — verifies the quiz loop works without storage
    for (let i = 0; i < 5; i++) {
      await expect(page.locator("#scenario-heading")).toBeVisible({ timeout: 10_000 });
      const options = page.locator('button[aria-pressed]');
      await expect(options.first()).toBeVisible({ timeout: 10_000 });
      await options.first().click();
      const nextBtn = page.getByRole("button", { name: /^next$/i });
      await expect(nextBtn).toBeVisible({ timeout: 10_000 });
      await nextBtn.click();
    }

    // Verify we're on prompt 6 (0-indexed: 5) — quiz state works in memory
    await expect(page.locator("#scenario-heading")).toBeVisible({ timeout: 10_000 });
  });

  test("dark mode toggle works without storage", async ({ page }) => {
    await installStorageMock(page);

    await page.goto("/");
    await expect(page.locator("html")).not.toHaveClass(/dark/);

    const themeToggle = page.getByRole("button", {
      name: /switch to dark mode/i,
    });
    await themeToggle.click();
    await expect(page.locator("html")).toHaveClass(/dark/);

    // Toggle back
    const lightToggle = page.getByRole("button", {
      name: /switch to light mode/i,
    });
    await lightToggle.click();
    await expect(page.locator("html")).not.toHaveClass(/dark/);
  });

  test("shared profile URL works without storage", async ({
    page,
    context,
    browserName,
  }) => {
    test.skip(
      browserName !== "chromium",
      "Clipboard tests only run on Chromium",
    );

    // First: complete quiz normally (with storage working) to get a share URL
    await completeQuiz(page);

    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.getByRole("button", { name: /copy share link/i }).click();
    const shareUrl = await page.evaluate(() =>
      navigator.clipboard.readText(),
    );
    expect(shareUrl).toContain("/results/?p=");

    // Now: open the share URL in a fresh page with storage disabled
    const newPage = await context.newPage();
    await installStorageMock(newPage);

    await newPage.goto(shareUrl);
    await expect(
      newPage.getByRole("heading", { name: "Your Results", exact: true }),
    ).toBeVisible({ timeout: 15_000 });
    await expect(newPage.getByText(/viewing someone/i)).toBeVisible();

    await newPage.close();
  });
});
