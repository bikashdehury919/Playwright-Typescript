import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: ['**/*.ts'],
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,


  timeout: 60000, // 60 seconds per test
  expect: {
    timeout: 15000, // 10 seconds for expect() assertions
  },

  reporter: [['html', { open: 'never' }]],

  use: {
    headless: false,

    
    actionTimeout: 15000, // 10 seconds for each UI interaction
    navigationTimeout: 60000, // 30 seconds for navigation like page.goto
    baseURL: 'https://magento.softwaretestingboard.com',
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        headless: true,
      },
    },
  ],
});
