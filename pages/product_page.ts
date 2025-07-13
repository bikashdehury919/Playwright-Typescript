// ProductPage.ts
import { Page } from '@playwright/test';
import { ProductPageLocators as Loc } from '../locators/prodcut_page_locators';

export class ProductPage {
  readonly page: Page;
  readonly timeout: number;
  private productName: string | null = null;

  constructor(page: Page, timeout = 5000) {
    this.page = page;
    this.timeout = timeout;
  }

  private async isValid(value: any): Promise<boolean> {
    if (value === null || value === undefined) return false;
    if (typeof value === 'string' && value.trim() === '') return false;
    if (typeof value === 'number' && Number.isNaN(value)) return false;
    return true;
  }

  async applyFilters(filters: Record<string, string>): Promise<void> {
    try {
      await this.page.waitForTimeout(500);
      for (const [filterName, optionText] of Object.entries(filters)) {
        if (!await this.isValid(optionText)) {
          console.warn(`Skipping filter '${filterName}' due to invalid value: ${optionText}`);
          continue;
        }

        const filterSection = this.page.locator(Loc.filterSectionWithText(filterName)).first();
        await filterSection.scrollIntoViewIfNeeded();
        const filterTitle = filterSection.locator(Loc.FILTER_TITLE);
        await filterTitle.click({ timeout: this.timeout });

        const upperFilter = filterName.trim().toUpperCase();
        let optionSelector: string;
        if (upperFilter === 'COLOR') {
          optionSelector = Loc.swatchColorOption(optionText);
        } else if (upperFilter === 'SIZE') {
          optionSelector = Loc.swatchSizeOption(optionText);
        } else {
          optionSelector = Loc.filterOption(filterName, optionText);
        }

        const option = this.page.locator(optionSelector).first();
        await option.waitFor({ state: 'visible', timeout: this.timeout });
        await option.scrollIntoViewIfNeeded();
        await option.click();

        console.log(`Applied filter: ${filterName} -> ${optionText}`);
        await this.page.waitForTimeout(1000);
      }
    } catch (err) {
      console.error(`Failed to apply filters: ${err}`);
      throw err;
    }
  }

  async clickFirstVisibleProduct(): Promise<void> {
    try {
      await this.page.waitForTimeout(2000);
      const products = this.page.locator(Loc.PRODUCT_LINKS);
      const count = await products.count();
      if (count === 0) {
        console.warn('No products found after applying filters.');
        return;
      }
      const firstProduct = products.first();
      await firstProduct.waitFor({ state: 'visible', timeout: this.timeout });
      await firstProduct.scrollIntoViewIfNeeded();
      await firstProduct.click();
      console.log('Clicked first visible product.');
    } catch (err) {
      console.error(`Failed to click on first visible product: ${err}`);
      throw err;
    }
  }

  async selectSize(size: string): Promise<void> {
    try {
      await this.page.locator(Loc.sizeSelector(size)).click({ timeout: this.timeout });
      console.log(`Selected size: ${size}`);
    } catch (err) {
      console.error(`Failed to select size ${size}: ${err}`);
      throw err;
    }
  }

  async selectColor(color: string): Promise<void> {
    try {
      await this.page.locator(Loc.colorSelector(color)).click({ timeout: this.timeout });
      console.log(`Selected color: ${color}`);
    } catch (err) {
      console.error(`Failed to select color ${color}: ${err}`);
      throw err;
    }
  }

  async setQuantity(qty: number): Promise<void> {
    try {
      const qtyInput = this.page.locator(Loc.QUANTITY_INPUT);
      await qtyInput.fill(qty.toString(), { timeout: this.timeout });
      console.log(`Quantity set to: ${qty}`);
    } catch (err) {
      console.error(`Failed to set quantity ${qty}: ${err}`);
      throw err;
    }
  }

  async customizeProductSelection(size?: string, color?: string, quantity?: number): Promise<void> {
    if (size && await this.isValid(size)) {
      await this.selectSize(size);
    }
    if (color && await this.isValid(color)) {
      await this.selectColor(color);
    }
    if (quantity && await this.isValid(quantity)) {
      await this.setQuantity(quantity);
    }
  }

  async addProductToCartAndVerify(): Promise<void> {
    try {
      const productNameElem = this.page.locator(Loc.PRODUCT_NAME);
      await productNameElem.waitFor({ state: 'visible', timeout: this.timeout });
      this.productName = (await productNameElem.innerText()).trim();

      await this.page.locator(Loc.ADD_TO_CART_BUTTON).click({ timeout: this.timeout });
      console.log(`Clicked Add to Cart for product: ${this.productName}`);

      const expectedMessage = `You added ${this.productName} to your shopping cart.`;
      const successMessageElem = this.page.locator(Loc.SUCCESS_MESSAGE);
      await successMessageElem.waitFor({ state: 'visible', timeout: this.timeout });

      const actualMessage = (await successMessageElem.innerText()).trim();

      console.log(`Expected message: ${expectedMessage}`);
      console.log(`Actual message: ${actualMessage}`);

      if (!actualMessage.toLowerCase().includes(expectedMessage.toLowerCase())) {
        throw new Error('Success message did not match expected message');
      }
    } catch (err) {
      console.error(`Add to cart or verification failed: ${err}`);
      throw err;
    }
  }

  async openMiniCart(): Promise<void> {
    try {
      const cartIcon = this.page.locator(Loc.MINI_CART_ICON);
      await cartIcon.waitFor({ state: 'visible', timeout: this.timeout });
      await cartIcon.click({ timeout: this.timeout });
      console.log('Mini cart opened.');
    } catch (err) {
      console.error(`Failed to open mini cart: ${err}`);
      throw err;
    }
  }

  async clickProceedToCheckout(): Promise<void> {
    try {
      const checkoutBtn = this.page.locator(Loc.CHECKOUT_BUTTON);
      await checkoutBtn.waitFor({ state: 'visible', timeout: this.timeout });
      await checkoutBtn.click({ timeout: this.timeout });
      console.log('Clicked Proceed to Checkout.');
    } catch (err) {
      console.error(`Failed to click Proceed to Checkout: ${err}`);
      throw err;
    }
  }
}
