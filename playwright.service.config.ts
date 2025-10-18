import { defineConfig } from '@playwright/test';
import { getServiceConfig, ServiceOS } from '@azure/microsoft-playwright-testing';
import baseConfig from './playwright.config';

export default defineConfig({
  ...baseConfig,
  ...getServiceConfig(baseConfig, {
    exposeNetwork: '<loopback>',
    timeout: 30000,
    os: ServiceOS.LINUX,
    useCloudHostedBrowsers: true,
  }),
  reporter: [
    ['list'],
    ['@azure/microsoft-playwright-testing/reporter', {}],
  ],
});
