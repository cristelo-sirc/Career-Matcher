import { test, expect } from "@playwright/test";

/**
 * Dark mode E2E tests.
 *
 * Tests: toggle, persistence across pages, system preference, user override.
 */

test.describe("Dark mode", () => {
  test("toggle switches to dark mode", async ({ page }) => {
    await page.goto("/");

    // Initially should not have dark class
    await expect(page.locator("html")).not.toHaveClass(/dark/);

    // Click the theme toggle
    const toggle = page.getByRole("button", {
      name: /switch to dark mode/i,
    });
    await toggle.click();

    // Should now have dark class
    await expect(page.locator("html")).toHaveClass(/dark/);

    // Toggle button label should now say "light"
    await expect(
      page.getByRole("button", { name: /switch to light mode/i }),
    ).toBeVisible();
  });

  test("dark mode persists across page navigation", async ({ page }) => {
    await page.goto("/");

    // Enable dark mode
    await page
      .getByRole("button", { name: /switch to dark mode/i })
      .click();
    await expect(page.locator("html")).toHaveClass(/dark/);

    // Navigate to quiz
    await page.getByRole("link", { name: /get started/i }).click();
    await expect(page).toHaveURL(/\/quiz\//);

    // Dark mode should persist
    await expect(page.locator("html")).toHaveClass(/dark/);
  });

  test("dark mode persists after page reload", async ({ page }) => {
    await page.goto("/");

    await page
      .getByRole("button", { name: /switch to dark mode/i })
      .click();
    await expect(page.locator("html")).toHaveClass(/dark/);

    // Reload
    await page.reload();

    // Dark mode should persist (stored in sessionStorage)
    await expect(page.locator("html")).toHaveClass(/dark/);
  });

  test("system dark preference activates dark mode by default", async ({
    page,
  }) => {
    // Emulate dark system preference
    await page.emulateMedia({ colorScheme: "dark" });
    await page.goto("/");

    // Should start in dark mode
    await expect(page.locator("html")).toHaveClass(/dark/);
  });

  test("user toggle overrides system dark preference", async ({ page }) => {
    // Emulate dark system preference
    await page.emulateMedia({ colorScheme: "dark" });
    await page.goto("/");

    // Should start in dark mode
    await expect(page.locator("html")).toHaveClass(/dark/);

    // Toggle to light mode
    await page
      .getByRole("button", { name: /switch to light mode/i })
      .click();

    // Should now be light mode despite system preference
    await expect(page.locator("html")).not.toHaveClass(/dark/);
  });
});
