import { test, expect } from '../fixtures';
import { HomePage } from '../pages/home_page';
import { ProductPage } from '../pages/product_page';
import { CheckoutPage } from '../pages/checkout_page';
import { PlaceOrderPage } from '../pages/place_order_page';
import testData from '../data/testData.json';

test.describe('Demo Test case E2E Flow', () => {
  test('E2E Test case', async ({ page }) => {
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

    await page.waitForTimeout(5000);
    await checkoutPage.clickNext();
    await page.waitForTimeout(5000);

    await checkoutPage.applyAndVerifyDiscount(discountCode);

    const placeOrderPage = new PlaceOrderPage(page);
    const orderNumber = await placeOrderPage.placeOrderAndCaptureNumber();

    expect(orderNumber).not.toBeNull();
  });
});
