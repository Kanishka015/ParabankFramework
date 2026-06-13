import { defineConfig, devices } from "@playwright/test";
import { ENV } from "./config/env";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  retries: 1,
  workers: 2,
  timeout: 30000,
  expect: { timeout: 10000 },

  reporter: [
  ["html", { outputFolder: "reports/html", open: "never" }],
  ["allure-playwright", { outputFolder: "reports/allure-results" }],
  ["json", { outputFile: "reports/results.json" }],  // ← add this
  ["list"],
],

  use: {
    baseURL: ENV.BASE_URL,
    screenshot: "on",
    video: "on",
    trace: "on",
    viewport: { width: 1280, height: 720 },
    navigationTimeout: 15000,
    actionTimeout: 10000,
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
 
      testMatch: ["**/ui/**", "**/e2e/**", "**/performance/**", "**/negative/**", "**/api/**"], 
    },
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
      testMatch: ["**/ui/**", "**/e2e/**", "**/performance-lite/**"],
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
      testMatch: ["**/ui/**", "**/e2e/**"],
    },
    {
      name: "api",
      use: { ...devices["Desktop Chrome"] },
      testMatch: ["**/api/**"],
    },
  ],

  outputDir: "reports/test-artifacts",
});
