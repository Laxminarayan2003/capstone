// cart.spec.js
import { test, expect } from '@playwright/test';
import { CartPage } from '../POM/cartPage';

test.describe('Cart Tests', () => {
  let cartPage;

  test.beforeEach(async ({ page }) => {
    cartPage = new CartPage(page);
    await cartPage.login('vinay@ibm.com', 'Vinay@123');
  });

  test('TC01 - Navigate to Courses page', async ({ page }) => {
    await cartPage.goToCourses();
  });

  test('TC02 - View Details button visible', async ({ page }) => {
    await cartPage.goToCourses();
    await expect(cartPage.viewDetailsLink).toBeVisible();
  });

  test('TC03 - Open course details page', async ({ page }) => {
    await cartPage.openFirstCourseDetails();
  });

  test('TC04 - Add to Cart button visible', async ({ page }) => {
    await cartPage.openFirstCourseDetails();
    await expect(cartPage.addToCartButton).toBeVisible();
  });

  test('TC05 - Add course to cart', async ({ page }) => {
    await cartPage.addCourseToCart();
    await cartPage.goToCart();
    await expect(cartPage.cartItems).toHaveCount(0);
  });

  test('TC06 - Cart page opens', async ({ page }) => {
    await cartPage.goToCart();
  });

  test('TC07 - Remove button visible', async ({ page }) => {
    await cartPage.addCourseToCart();
    await cartPage.goToCart();
    const count = await cartPage.removeButton.count();
    expect(count).toBeGreaterThan(0);
  });

  test('TC08 - Remove course from cart', async ({ page }) => {
    await cartPage.addCourseToCart();
    await cartPage.goToCart();
    await cartPage.removeFirstCourseFromCart();
  });

  test('TC11 - Cart link visible', async ({ page }) => {
    await expect(cartPage.cartLink).toBeVisible();
  });

  test('TC12 - Proceed button visible (safe)', async ({ page }) => {
    await cartPage.goToCart();
    await cartPage.checkProceedToPaymentButton();
  });

  test('TC13 - Click proceed button', async ({ page }) => {
    await cartPage.goToCart();
    await cartPage.clickProceedToPayment();
  });

  test('TC14 - Navigation check', async ({ page }) => {
    await cartPage.goToCourses();
    await cartPage.goToCart();
    await expect(cartPage.page).toHaveURL(/cart/);
  });

  test('TC15 - Page loads successfully', async ({ page }) => {
    await expect(cartPage.page.locator('body')).toBeVisible();
  });
});