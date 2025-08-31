import { expect } from '@playwright/test';
import { BasePage } from './base_page';
import { PlaceOrderLocators as Loc } from '../locators/place_order_locators';

export class PlaceOrderPage extends BasePage {
  async placeOrderAndCaptureNumber(): Promise<string | null> {
    try {
      await this.scrollAndClick(this.page.locator(Loc.PLACE_ORDER_BUTTON));
      await this.page.waitForURL(Loc.SUCCESS_PAGE_URL, { timeout: 30000 });

      const thankYouMessage = this.page.locator(Loc.THANK_YOU_MESSAGE);
      await expect(thankYouMessage).toContainText('Thank you for your purchase!');

      const orderNumber = await this.page.locator(Loc.ORDER_NUMBER).innerText();
      console.log(`Order Number: ${orderNumber}`);

      return orderNumber;
    } catch (error) {
      console.error(`Failed to place order or capture number: ${error}`);
      await this.takeScreenshot('placeOrder_failure');
      return null;
    }
  }
}
