import { Page, expect } from '@playwright/test';
import { PlaceOrderLocators as Loc } from '../locators/place_order_locators';

export class PlaceOrderPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async placeOrderAndCaptureNumber(): Promise<string | null> {
    try {
      // Click Place Order button
      await this.page.locator(Loc.PLACE_ORDER_BUTTON).click();

      // Wait for redirection to success page
      await this.page.waitForURL(Loc.SUCCESS_PAGE_URL, { timeout: 30000 });

      // Confirm thank you message is visible
      const thankYouMessage = this.page.locator(Loc.THANK_YOU_MESSAGE);
      await expect(thankYouMessage).toContainText('Thank you for your purchase!');

      // Extract order number
      const orderNumber = await this.page.locator(Loc.ORDER_NUMBER).innerText();
      console.log(`Order Number: ${orderNumber}`);
      return orderNumber;

    } catch (error) {
      console.error(`Failed to place order or capture number: ${error}`);
      return null;
    }
  }
}
