// homePage.ts
import { Page } from '@playwright/test';
import { HomePageLocators as Loc } from '../locators/home_locators';

export class HomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async clickTopMenuItem(label: string): Promise<void> {
    const locator = this.page.locator(Loc.NAVIGATION_MENU).locator(Loc.navMenuItem(label));
    await locator.waitFor({ state: 'visible', timeout: 7000 });
    await locator.click();
    console.log(`Clicked top menu: ${label}`);
  }

  async clickSidebarFilter(filterLabel: string): Promise<void> {
    const locator = this.page.locator(Loc.SIDEBAR_FILTER(filterLabel));
    await locator.waitFor({ state: 'visible', timeout: 7000 });
    await locator.click();
    console.log(`Clicked sidebar filter: ${filterLabel}`);
  }
}
