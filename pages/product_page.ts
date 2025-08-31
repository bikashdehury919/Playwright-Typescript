import { BasePage } from './base_page';
import { ProductPageLocators as Loc } from '../locators/prodcut_page_locators';

export class ProductPage extends BasePage {
  private productName: string | null = null;
  private timeout: number;

  constructor(page: any, timeout = 5000) {
    super(page);
    this.timeout = timeout;
  }

  private async isValid(value: any): Promise<boolean> {
    if (value === null || value === undefined) return false;
    if (typeof value === 'string' && value.trim() === '') return false;
    if (typeof value === 'number' && Number.isNaN(value)) return false;
    return true;
  }

  async applyFilters(filters: Record<string, string>) {
    await this.page.waitForTimeout(5000);
    for (const [filterName, optionText] of Object.entries(filters)) {
      if (!await this.isValid(optionText)) {
        console.warn(`Skipping filter '${filterName}' due to invalid value: ${optionText}`);
        continue;
      }

      const filterSection = this.page.locator(Loc.filterSectionWithText(filterName)).first();
      await filterSection.scrollIntoViewIfNeeded();
      await filterSection.locator(Loc.FILTER_TITLE).click({ timeout: this.timeout });

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
  }

  async clickFirstVisibleProduct() {
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
    await this.page.waitForTimeout(5000);
    console.log('Clicked first visible product.');
  }

  async selectSize(size: string) {
    await this.scrollAndClick(this.page.locator(Loc.sizeSelector(size)), this.timeout);
    console.log(`Selected size: ${size}`);
  }

  async selectColor(color: string) {
    await this.scrollAndClick(this.page.locator(Loc.colorSelector(color)), this.timeout);
    console.log(`Selected color: ${color}`);
  }

  async setQuantity(qty: number) {
    const qtyInput = this.page.locator(Loc.QUANTITY_INPUT);
    await qtyInput.fill(qty.toString(), { timeout: this.timeout });
    console.log(`Quantity set to: ${qty}`);
  }

  async customizeProductSelection(size?: string, color?: string, quantity?: number) {
    if (size && await this.isValid(size)) await this.selectSize(size);
    if (color && await this.isValid(color)) await this.selectColor(color);
    if (quantity && await this.isValid(quantity)) await this.setQuantity(quantity);
  }

  async addProductToCartAndVerify() {
    const productNameElem = this.page.locator(Loc.PRODUCT_NAME);
    await productNameElem.waitFor({ state: 'visible', timeout: this.timeout });
    this.productName = (await productNameElem.innerText()).trim();

    await this.scrollAndClick(this.page.locator(Loc.ADD_TO_CART_BUTTON), this.timeout);
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
  }

  async openMiniCart() {
    const cartIcon = this.page.locator(Loc.MINI_CART_ICON);
    await cartIcon.waitFor({ state: 'visible', timeout: this.timeout });
    await cartIcon.click({ timeout: this.timeout });
    console.log('Mini cart opened.');
  }

  async clickProceedToCheckout() {
    const checkoutBtn = this.page.locator(Loc.CHECKOUT_BUTTON);
    await checkoutBtn.waitFor({ state: 'visible', timeout: this.timeout });
    await checkoutBtn.click({ timeout: this.timeout });
    console.log('Clicked Proceed to Checkout.');
  }
}
