import { Page, Locator, expect } from '@playwright/test';

export abstract class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async waitForLoaderToDisappear(timeout = 10000) {
    try {
      await this.page.waitForSelector('css=div.loading-mask', { state: 'hidden', timeout });
    } catch (e) {
      console.warn(`Loader may not have disappeared in time: ${e}`);
    }
  }

  async scrollAndClick(locator: Locator, timeout = 10000) {
    await locator.waitFor({ state: 'visible', timeout });
    await locator.scrollIntoViewIfNeeded();
    await locator.click();
  }

  async safeFill(locator: Locator, value: string, timeout = 5000) {
    await locator.waitFor({ state: 'visible', timeout });
    await locator.fill(value);
  }

  async retryOperation(operation: () => Promise<void>, retries = 3, delayMs = 1000) {
    for (let i = 0; i < retries; i++) {
      try {
        await operation();
        return;
      } catch (err) {
        if (i === retries - 1) throw err;
        await new Promise(res => setTimeout(res, delayMs));
      }
    }
  }

  async takeScreenshot(name: string) {
    await this.page.screenshot({ path: `screenshots/${name}.png`, fullPage: true });
  }

  // Utility to parse price strings like "$12.34" or "-$5.00"
  parsePrice(text: string | null): number {
    if (!text) return 0;
    const normalized = text.replace(/[^0-9.-]+/g, '');
    return parseFloat(normalized) || 0;
  }
}
