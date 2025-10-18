// playwright.config.ts

import { defineConfig, devices } from '@playwright/test';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const baseURL = process.env.BASE_URL!;
const isCI = !!process.env.CI;

export default defineConfig({
  testDir: './tests',
  outputDir: path.join(__dirname, 'test-results'),
  testMatch: ['**/*.ts'],
  timeout: 90_000,
  expect: {
    timeout: 40_000,
  },
  fullyParallel: true,
  retries: isCI ? 2 : 0,
  workers: isCI ? 2 : 4,
  forbidOnly: isCI,
  reporter: [
    ['html', { open: isCI ? 'never' : 'on-failure' }],
    ['list'],
  ],
  use: {
    baseURL,
    headless: isCI,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 15_000,
    navigationTimeout: 60_000,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'Chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
});
