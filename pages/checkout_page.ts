import { Locator, expect } from '@playwright/test';
import { BasePage } from './base_page';
import { CheckoutLocators as Loc } from '../locators/checkout_locators';

interface ShippingAddress {
  email: string;
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  zipCode: string;
  country: string;
  phone: string;
}

export class CheckoutPage extends BasePage {

  async fillShippingAddress(address: ShippingAddress) {
    await this.waitForLoaderToDisappear();
    await this.page.locator(Loc.COUNTRY_SELECT).waitFor({ state: 'visible', timeout: 30000 });
    await this.page.selectOption(Loc.COUNTRY_SELECT, { label: address.country });
    await this.page.locator(Loc.POSTCODE_INPUT).waitFor();
    await this.page.locator(Loc.TELEPHONE_INPUT).waitFor();

    await this.safeFill(this.page.locator(Loc.EMAIL_INPUT), address.email);
    await this.safeFill(this.page.locator(Loc.FIRST_NAME_INPUT), address.firstName);
    await this.safeFill(this.page.locator(Loc.LAST_NAME_INPUT), address.lastName);
    await this.safeFill(this.page.locator(Loc.STREET_INPUT), address.street);
    await this.safeFill(this.page.locator(Loc.CITY_INPUT), address.city);
    await this.safeFill(this.page.locator(Loc.POSTCODE_INPUT), address.zipCode);
    await this.safeFill(this.page.locator(Loc.TELEPHONE_INPUT), address.phone);
    await this.waitForLoaderToDisappear();
  }

  async selectFirstAvailableShippingMethod() {
    await this.page.waitForSelector(Loc.SHIPPING_METHOD_ROWS);
    const shippingRows = this.page.locator(Loc.SHIPPING_METHOD_ROWS);
    const count = await shippingRows.count();

    if (count === 0) {
      throw new Error("No shipping methods available.");
    }

    const firstRow = shippingRows.nth(0);
    await this.scrollAndClick(firstRow.locator(Loc.SHIPPING_METHOD_RADIO));
    await this.waitForLoaderToDisappear();
  }

  async clickNext() {
    await this.scrollAndClick(this.page.locator(Loc.NEXT_BUTTON));
    await this.waitForLoaderToDisappear();
  }

  async applyAndVerifyDiscount(couponCode: string) {
    await this.page.click(Loc.DISCOUNT_TOGGLE);
    await this.page.fill(Loc.DISCOUNT_INPUT, couponCode);
    await this.page.click(Loc.APPLY_DISCOUNT_BUTTON);
    await this.page.waitForSelector(Loc.TOTALS_DISCOUNT_ROW);

    const subtotalText = await this.page.textContent(Loc.SUBTOTAL_PRICE);
    const discountText = await this.page.textContent(Loc.DISCOUNT_PRICE);
    const shippingText = await this.page.textContent(Loc.SHIPPING_PRICE);
    const totalText = await this.page.textContent(Loc.GRAND_TOTAL_PRICE);

    const subtotal = this.parsePrice(subtotalText);
    const discount = this.parsePrice(discountText);
    const shipping = this.parsePrice(shippingText);
    const total = this.parsePrice(totalText);

    const expectedTotal = parseFloat((subtotal - discount + shipping).toFixed(2));
    expect(total).toBeCloseTo(expectedTotal, 2);
  }
}
