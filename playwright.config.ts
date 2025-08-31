import { defineConfig, devices } from '@playwright/test';
import path from 'path';

const baseURL = process.env.BASE_URL || 'https://magento.softwaretestingboard.com';
const isCI = !!process.env.CI;

export default defineConfig({
  testDir: './tests',
  outputDir: path.join(__dirname, 'test-results'), // For screenshots, traces, videos

  testMatch: ['**/*.ts'],
  timeout: 90000, // 90 seconds per test
  expect: {
    timeout: 40000, // For expect() assertions
  },

  // Parallelism and retries
  fullyParallel: true,
  retries: isCI ? 2 : 0,
  workers: isCI ? 2 : 4,

  forbidOnly: isCI, // Prevent .only in CI

  // Reporters
  reporter: [
    ['html', { open: isCI ? 'never' : 'on-failure' }],
    ['list'], 
  ],

  // Global options for all tests
  use: {
    baseURL,
    headless: isCI, // Headless on CI
    viewport: { width: 1280, height: 720 },
    actionTimeout: 15000,
    navigationTimeout: 60000,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },

  // Multi-browser support
  projects: [
    {
      name: 'Chromium',
      use: {
        ...devices['Desktop Chrome'],
      
      },
    },
    
  ],


});
