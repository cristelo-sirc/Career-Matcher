import { expect } from "@playwright/test";
import type { Page } from "@playwright/test";

/**
 * Shared helper: complete the full 32-prompt quiz by selecting the first option.
 * Used by multiple test files.
 */
export async function completeQuiz(page: Page) {
  await page.goto("/quiz/");
  for (let i = 0; i < 32; i++) {
    await expect(page.locator("#scenario-heading")).toBeVisible();
    const options = page.locator('button[aria-pressed]');
    await expect(options.first()).toBeVisible();
    await options.first().click();

    // Wait for the button to appear after selection
    if (i < 31) {
      const nextBtn = page.getByRole("button", { name: /^next$/i });
      await expect(nextBtn).toBeVisible();
      await nextBtn.click();
    } else {
      const seeResultsBtn = page.getByRole("button", { name: /see results/i });
      await expect(seeResultsBtn).toBeVisible();
      await seeResultsBtn.click();
    }
  }
  await expect(page).toHaveURL(/\/results\//);
  await expect(
    page.getByRole("heading", { name: "Your Results", exact: true }),
  ).toBeVisible();
}
