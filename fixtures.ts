import { test as base, expect as baseExpect, chromium, BrowserContext, Page } from '@playwright/test';

const blockedDomains = ['ads', 'doubleclick.net', 'googlesyndication', 'adservice'];

export const test = base.extend<{
  context: BrowserContext;
  page: Page;
}>({
  context: async ({}, use) => {

    const context = await chromium.launchPersistentContext('', {
      viewport: { width: 1920, height: 1080 },
      locale: 'en-US',
    });


    await context.route('**/*', (route) => {
      const url = route.request().url();
      if (blockedDomains.some(domain => url.includes(domain))) {
        console.log(`Blocked: ${url}`);
        return route.abort();
      }
      return route.continue();
    });

    await use(context);

    await context.close();
  },

  page: async ({ context }, use) => {
    const [page] = context.pages();

    if (!page) {
      throw new Error('No pages found in persistent context.');
    }

    page.once('load', async () => {
      try {
        await page.waitForTimeout(2000);
        for (const frame of page.frames()) {
          const consentButton = frame.locator('button:has-text("Consent"), button:has-text("Accept")');
          if (await consentButton.count() > 0 && await consentButton.isVisible()) {
            await consentButton.click();
            console.log('Dismissed cookie popup inside iframe');
            return;
          }
        }

        const selectors = [
          'button:has-text("Accept")',
          'button:has-text("I Agree")',
          'button:has-text("Allow All")',
          'button:has-text("Accept All Cookies")',
          '#onetrust-accept-btn-handler',
          '.cookie-consent-accept',
        ];

        for (const selector of selectors) {
          const el = page.locator(selector);
          if (await el.count() > 0 && await el.isVisible()) {
            await el.click();
            console.log(`Dismissed cookie popup using selector: ${selector}`);
            await page.waitForTimeout(500);
            break;
          }
        }
      } catch (err) {
        console.warn('No cookie popup dismissed:', err);
      }
    });

    await use(page);
  },
});

export const expect = baseExpect;
