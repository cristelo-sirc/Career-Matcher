import { test, expect } from "@playwright/test";

/**
 * Navigation E2E tests: back button, page refresh, direct URLs, 404.
 */

test.describe("Navigation", () => {
  test("back button returns to previous prompt with answer preserved", async ({
    page,
  }) => {
    await page.goto("/quiz/");

    // Answer prompt 1
    await expect(page.locator("#scenario-heading")).toBeVisible();
    const firstScenario = await page.locator("#scenario-heading").textContent();
    const options = page.locator('button[aria-pressed]');
    await expect(options.first()).toBeVisible();
    await options.first().click();
    const nextBtn = page.getByRole("button", { name: /^next$/i });
    await expect(nextBtn).toBeVisible();
    await nextBtn.click();

    // Answer prompt 2
    await expect(page.locator("#scenario-heading")).toBeVisible();
    await expect(options.first()).toBeVisible();
    await options.first().click();
    await expect(nextBtn).toBeVisible();
    await nextBtn.click();

    // Answer prompt 3
    await expect(page.locator("#scenario-heading")).toBeVisible();
    await expect(options.first()).toBeVisible();
    await options.first().click();

    // Go back twice
    const backButton = page.getByRole("button", { name: /go back/i });
    await backButton.click();
    await backButton.click();

    // Should be back at prompt 1 with same scenario text
    const restoredScenario = await page
      .locator("#scenario-heading")
      .textContent();
    expect(restoredScenario).toBe(firstScenario);

    // First option should still be selected (aria-pressed="true")
    await expect(options.first()).toHaveAttribute("aria-pressed", "true");
  });

  test("page refresh mid-quiz restores state", async ({ page }) => {
    await page.goto("/quiz/");

    // Answer 3 prompts
    for (let i = 0; i < 3; i++) {
      await expect(page.locator("#scenario-heading")).toBeVisible();
      const options = page.locator('button[aria-pressed]');
      await options.first().click();
      await page.getByRole("button", { name: /^next$/i }).click();
    }

    // Remember the 4th prompt's scenario text
    await expect(page.locator("#scenario-heading")).toBeVisible();
    const scenario4 = await page.locator("#scenario-heading").textContent();

    // Reload the page
    await page.reload();

    // Should restore to the same prompt
    await expect(page.locator("#scenario-heading")).toBeVisible();
    const restoredScenario = await page
      .locator("#scenario-heading")
      .textContent();
    expect(restoredScenario).toBe(scenario4);
  });

  test("direct navigation to /results/ without answers shows incomplete state", async ({
    page,
  }) => {
    await page.goto("/results/");

    await expect(
      page.getByRole("heading", { name: /not quite done yet/i }),
    ).toBeVisible();

    await expect(
      page.getByRole("button", { name: /continue quiz/i }),
    ).toBeVisible();
  });

  test("custom 404 page renders for unknown routes", async ({ page }) => {
    await page.goto("/this-page-does-not-exist/");

    // Static export generates a 404.html that serves for unknown routes
    // The text "404" or "Page not found" should appear
    await expect(page.getByText("404")).toBeVisible();
    await expect(page.getByText(/page not found/i)).toBeVisible();
    await expect(
      page.getByRole("link", { name: /go home/i }),
    ).toBeVisible();
  });

  test("about page renders", async ({ page }) => {
    await page.goto("/about/");

    // About page should have content about methodology and privacy
    await expect(page.locator("#main-content")).toBeVisible();
  });
});
