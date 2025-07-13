// checkout_page.ts
import { Page, expect } from '@playwright/test';
import { CheckoutLocators as Loc } from '../locators/checkout_locators';

export class CheckoutPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async fillShippingAddress({
    email,
    firstName,
    lastName,
    street,
    city,
    zipCode,
    country,
    phone,
  }: {
    email: string;
    firstName: string;
    lastName: string;
    street: string;
    city: string;
    zipCode: string;
    country: string;
    phone: string;
  }) {
    await this.page.selectOption(Loc.COUNTRY_SELECT, { label: country });
    await this.page.locator(Loc.POSTCODE_INPUT).waitFor();
    await this.page.locator(Loc.TELEPHONE_INPUT).waitFor();

    await this.page.fill(Loc.EMAIL_INPUT, email);
    await this.page.fill(Loc.FIRST_NAME_INPUT, firstName);
    await this.page.fill(Loc.LAST_NAME_INPUT, lastName);
    await this.page.fill(Loc.STREET_INPUT, street);
    await this.page.fill(Loc.CITY_INPUT, city);
    await this.page.fill(Loc.POSTCODE_INPUT, zipCode);
    await this.page.fill(Loc.TELEPHONE_INPUT, phone);
  }

  async selectFirstAvailableShippingMethod() {
    await this.page.waitForSelector(Loc.SHIPPING_METHOD_ROWS);
    const shippingRows = this.page.locator(Loc.SHIPPING_METHOD_ROWS);
    const count = await shippingRows.count();

    if (count === 0) {
      throw new Error("No shipping methods available.");
    }

    const firstRow = shippingRows.nth(0);
    await firstRow.locator(Loc.SHIPPING_METHOD_RADIO).click();
  }

  async clickNext() {
    await this.page.locator(Loc.NEXT_BUTTON).click();
    await this.page.waitForSelector(Loc.LOADER, { state: "visible", timeout: 10000 });
    await this.page.waitForSelector(Loc.LOADER, { state: "hidden" });
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

    const subtotal = parseFloat(subtotalText?.replace("$", "") || "0");
    const discount = parseFloat(discountText?.replace(/[-$]/g, "") || "0");
    const shipping = parseFloat(shippingText?.replace("$", "") || "0");
    const total = parseFloat(totalText?.replace("$", "") || "0");

    const expectedTotal = parseFloat((subtotal - discount + shipping).toFixed(2));
    expect(total).toBeCloseTo(expectedTotal, 2);
  }
}
