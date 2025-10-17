import { test, expect } from '../../fixtures';
import { HomePage } from '../../pages/home_page';
import { ProductPage } from '../../pages/product_page';
import { CheckoutPage } from '../../pages/checkout_page';
import { PlaceOrderPage } from '../../pages/place_order_page';
import { getE2ETestData } from '../../utils/excelUtils';

const testDataSet = getE2ETestData(); // Load all rows

for (const testData of testDataSet) {
  test.describe.skip(`Data-Driven E2E: ${testData.testName}`, () => {
    test(`Run for ${testData.user.firstName}`, async ({ page }) => {
      await page.goto('/');

      const { user, product, discountCode } = testData;

      const homePage = new HomePage(page);
      await homePage.clickTopMenuItem(product.category);
      await homePage.clickSidebarFilter(product.subCategory);
      await expect(page).toHaveURL(new RegExp(`${product.category}/${product.subCategory}`, 'i'));

      const heading = page.locator('h1.page-title span');
      await expect(heading).toContainText(product.subCategory);

      const productPage = new ProductPage(page);
      await productPage.applyFilters(product.filters);
      await productPage.clickFirstVisibleProduct();
      await productPage.customizeProductSelection(product.size, product.color, product.quantity);
      await productPage.addProductToCartAndVerify();
      await productPage.openMiniCart();
      await productPage.clickProceedToCheckout();

      const checkoutPage = new CheckoutPage(page);
      await checkoutPage.fillShippingAddress(user);
      await checkoutPage.selectFirstAvailableShippingMethod();
      await checkoutPage.clickNext();
      await checkoutPage.applyAndVerifyDiscount(discountCode);

      const placeOrderPage = new PlaceOrderPage(page);
      const orderNumber = await placeOrderPage.placeOrderAndCaptureNumber();

      expect(orderNumber).not.toBeNull();
      console.log(`Order placed successfully for ${user.firstName}. Order #: ${orderNumber}`);
    });
  });
}
