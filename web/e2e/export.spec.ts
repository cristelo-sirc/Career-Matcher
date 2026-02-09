import { test, expect } from "@playwright/test";
import { completeQuiz } from "./helpers";

/**
 * Export & sharing E2E tests.
 *
 * Tests: share URL round-trip, copy-as-text, print trigger, Start Over flow.
 *
 * Clipboard tests only run on Chromium (Firefox/WebKit have different
 * clipboard permission models). The underlying functionality is the same.
 */

// Quiz completion tests need extra time
test.setTimeout(120_000);

test.describe("Export & sharing", () => {
  test("Copy Share Link produces a valid share URL that loads results", async ({
    page,
    context,
    browserName,
  }) => {
    // Clipboard API only reliably testable on Chromium
    test.skip(browserName !== "chromium", "Clipboard tests only run on Chromium");

    await completeQuiz(page);

    // Grant clipboard permissions
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);

    // Click "Copy Share Link"
    await page.getByRole("button", { name: /copy share link/i }).click();

    // Read the copied URL from clipboard
    const shareUrl = await page.evaluate(() =>
      navigator.clipboard.readText(),
    );
    expect(shareUrl).toContain("/results/?p=");

    // Open the share URL in a new page (simulating a recipient)
    const newPage = await context.newPage();
    await newPage.goto(shareUrl);

    // The recipient should see the shared banner
    await expect(
      newPage.getByText(/viewing someone/i),
    ).toBeVisible();

    // The recipient should see results heading
    await expect(
      newPage.getByRole("heading", { name: "Your Results", exact: true }),
    ).toBeVisible();

    await newPage.close();
  });

  test("Copy as Text copies text content to clipboard", async ({
    page,
    context,
    browserName,
  }) => {
    test.skip(browserName !== "chromium", "Clipboard tests only run on Chromium");

    await completeQuiz(page);
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);

    await page.getByRole("button", { name: /copy as text/i }).click();

    const copiedText = await page.evaluate(() =>
      navigator.clipboard.readText(),
    );

    // Should contain structured result text
    expect(copiedText.length).toBeGreaterThan(50);
  });

  test("Print / Save as PDF triggers window.print", async ({ page }) => {
    await completeQuiz(page);

    // Mock window.print before clicking
    await page.evaluate(() => {
      const w = window as unknown as Window & { __printCalled: boolean };
      w.__printCalled = false;
      window.print = () => {
        w.__printCalled = true;
      };
    });

    await page.getByRole("button", { name: /print.*save as pdf/i }).click();

    const printCalled = await page.evaluate(() => (window as unknown as Window & { __printCalled: boolean }).__printCalled);
    expect(printCalled).toBe(true);
  });

  test("Start Over flow resets quiz and returns to landing", async ({
    page,
  }) => {
    await completeQuiz(page);

    // Click "Start Over"
    await page.getByRole("button", { name: /start over/i }).click();

    // Confirmation dialog should appear
    await expect(
      page.getByRole("heading", { name: /start a new exploration/i }),
    ).toBeVisible();

    // Click "Start Over" in the dialog
    await page
      .getByRole("dialog")
      .getByRole("button", { name: /start over/i })
      .click();

    // Should navigate to landing page
    await expect(page).toHaveURL(/\/$/);

    // Navigate to quiz — should start fresh
    await page.goto("/quiz/");
    await expect(page.locator("#scenario-heading")).toBeVisible();

    // No option should be selected
    const selectedOptions = page.locator('button[aria-pressed="true"]');
    await expect(selectedOptions).toHaveCount(0);
  });

  test("Start Over dialog can be cancelled", async ({ page }) => {
    await completeQuiz(page);

    await page.getByRole("button", { name: /start over/i }).click();
    await expect(
      page.getByRole("heading", { name: /start a new exploration/i }),
    ).toBeVisible();

    // Click "Go Back" to cancel
    await page
      .getByRole("dialog")
      .getByRole("button", { name: /go back/i })
      .click();

    // Dialog should close
    await expect(
      page.getByRole("heading", { name: /start a new exploration/i }),
    ).not.toBeVisible();

    // Should still be on results page
    await expect(page).toHaveURL(/\/results\//);
  });
});
