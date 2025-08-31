import { BasePage } from './base_page';
import { HomePageLocators as Loc } from '../locators/home_locators';

export class HomePage extends BasePage {
  async clickTopMenuItem(label: string) {
    const locator = this.page.locator(Loc.NAVIGATION_MENU).locator(Loc.navMenuItem(label));
    await locator.waitFor({ state: 'visible', timeout: 7000 });
    await this.scrollAndClick(locator);
    console.log(`Clicked top menu: ${label}`);
  }

  async clickSidebarFilter(filterLabel: string) {
    const locator = this.page.locator(Loc.SIDEBAR_FILTER(filterLabel));
    await locator.waitFor({ state: 'visible', timeout: 7000 });
    await this.scrollAndClick(locator);
    console.log(`Clicked sidebar filter: ${filterLabel}`);
  }
}
