import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright E2E test configuration for Career-Matcher.
 *
 * Runs tests against the production static export (out/) served locally.
 * Covers 5 browser configurations: 3 desktop + 2 mobile emulations.
 */
export default defineConfig({
  testDir: "./e2e",
  outputDir: "./playwright-results",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? "github" : "html",
  timeout: 60_000,

  use: {
    baseURL: "http://localhost:3001",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
    {
      name: "mobile-chrome",
      use: { ...devices["Pixel 7"] },
    },
    {
      name: "mobile-safari",
      use: { ...devices["iPhone 14"] },
    },
  ],

  webServer: {
    command: "npx serve out -l 3001 --no-clipboard",
    port: 3001,
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
});
