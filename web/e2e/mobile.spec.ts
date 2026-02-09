import { test, expect } from "@playwright/test";

/**
 * Mobile viewport E2E tests.
 *
 * Verifies no horizontal scroll, adequate touch targets, and proper layout
 * on small viewports (iPhone SE, 320px minimum).
 */

/** Helper: check no horizontal scroll on a page. */
async function assertNoHorizontalScroll(
  page: import("@playwright/test").Page,
) {
  const hasHScroll = await page.evaluate(
    () =>
      document.documentElement.scrollWidth >
      document.documentElement.clientWidth,
  );
  expect(hasHScroll).toBe(false);
}

test.describe("Mobile viewport — iPhone SE (375×667)", () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test("landing page has no horizontal scroll", async ({ page }) => {
    await page.goto("/");
    await assertNoHorizontalScroll(page);
  });

  test("quiz page has no horizontal scroll", async ({ page }) => {
    await page.goto("/quiz/");
    await expect(page.locator("#scenario-heading")).toBeVisible();
    await assertNoHorizontalScroll(page);
  });

  test("about page has no horizontal scroll", async ({ page }) => {
    await page.goto("/about/");
    await assertNoHorizontalScroll(page);
  });

  test("option cards have adequate touch targets (≥44px)", async ({
    page,
  }) => {
    await page.goto("/quiz/");
    await expect(page.locator("#scenario-heading")).toBeVisible();

    const options = page.locator('button[aria-pressed]');
    const count = await options.count();

    for (let i = 0; i < count; i++) {
      const box = await options.nth(i).boundingBox();
      expect(box).not.toBeNull();
      if (box) {
        expect(box.height).toBeGreaterThanOrEqual(44);
        expect(box.width).toBeGreaterThanOrEqual(44);
      }
    }
  });
});

test.describe("Mobile viewport — minimum 320px", () => {
  test.use({ viewport: { width: 320, height: 568 } });

  test("landing page has no horizontal scroll at 320px", async ({ page }) => {
    await page.goto("/");
    await assertNoHorizontalScroll(page);
  });

  test("quiz page has no horizontal scroll at 320px", async ({ page }) => {
    await page.goto("/quiz/");
    await expect(page.locator("#scenario-heading")).toBeVisible();
    await assertNoHorizontalScroll(page);
  });

  test("about page has no horizontal scroll at 320px", async ({ page }) => {
    await page.goto("/about/");
    await assertNoHorizontalScroll(page);
  });
});

test.describe("Mobile viewport — 4-option prompt", () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test("all options visible on a 4-option prompt at 375px", async ({
    page,
  }) => {
    await page.goto("/quiz/");

    // Navigate to find a prompt with 4 options (primaryLoadType prompts).
    // We iterate until we find one.
    let found4Options = false;
    for (let i = 0; i < 32; i++) {
      await expect(page.locator("#scenario-heading")).toBeVisible();
      const options = page.locator('button[aria-pressed]');
      const count = await options.count();

      if (count === 4) {
        found4Options = true;

        // All 4 options should be visible
        for (let j = 0; j < 4; j++) {
          await expect(options.nth(j)).toBeVisible();
          const box = await options.nth(j).boundingBox();
          expect(box).not.toBeNull();
          if (box) {
            expect(box.height).toBeGreaterThanOrEqual(44);
          }
        }

        // No horizontal scroll with 4 options
        await assertNoHorizontalScroll(page);
        break;
      }

      // Select first option and advance
      await options.first().click();
      await page.getByRole("button", { name: /^next$/i }).click();
    }

    expect(found4Options).toBe(true);
  });
});
