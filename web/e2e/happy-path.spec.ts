import { test, expect } from "@playwright/test";
import { completeQuiz } from "./helpers";

/**
 * Happy-path E2E test: complete user journey from landing → quiz → results.
 *
 * This is the critical smoke test. If this passes, the core user journey works.
 */

// The 32-prompt quiz loop needs extra time
test.setTimeout(120_000);

test.describe("Happy path — full quiz completion", () => {
  test("landing → 32 prompts → results with matches", async ({ page }) => {
    // 1. Landing page
    await page.goto("/");
    await expect(
      page.getByRole("heading", {
        name: /discover work environments that fit you/i,
      }),
    ).toBeVisible();

    // 2. Click "Get Started"
    await page.getByRole("link", { name: /get started/i }).click();
    await expect(page).toHaveURL(/\/quiz\//);

    // 3-4. Answer all 32 prompts and arrive at results
    await completeQuiz(page);

    // 5. Verify profile summary exists
    await expect(
      page.getByRole("heading", { name: /your preference profile/i }),
    ).toBeVisible();

    // 6. Verify at least one match card appears
    await expect(
      page.getByRole("heading", { name: /your top matches/i }),
    ).toBeVisible();
  });

  test("results page shows export actions", async ({ page }) => {
    await completeQuiz(page);

    // Verify export buttons are present
    await expect(
      page.getByRole("button", { name: /copy share link/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: /copy as text/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: /print.*save as pdf/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: /start over/i }),
    ).toBeVisible();
  });
});
