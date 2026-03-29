// studentPayment.spec.js
import { test, expect } from '@playwright/test';
import { StudentPaymentPage } from '../POM/studentPaymentPage';

test.describe('Student Payment / Cart Tests', () => {
  let paymentPage;

  test.beforeEach(async ({ page }) => {
    paymentPage = new StudentPaymentPage(page);
    await paymentPage.login('vinay@ibm.com', 'Vinay@123');
  });

  test('TC01 - Navigate to payment page', async () => {
    await paymentPage.addCourse();
    await paymentPage.goToPayment();
  });

  test('TC02 - Verify Secure Checkout heading', async () => {
    await paymentPage.addCourse();
    await paymentPage.goToPayment();
    await expect(paymentPage.secureCheckoutHeading).toBeVisible();
  });

  test('TC03 - Verify all fields visible', async () => {
    await paymentPage.addCourse();
    await paymentPage.goToPayment();
    await expect(paymentPage.nameOnCard).toBeVisible();
    await expect(paymentPage.cardNumber).toBeVisible();
    await expect(paymentPage.month).toBeVisible();
    await expect(paymentPage.year).toBeVisible();
    await expect(paymentPage.cvv).toBeVisible();
  });

  test('TC04 - Verify total visible', async () => {
    await paymentPage.addCourse();
    await paymentPage.cartLink.click();
    await expect(paymentPage.totalText).toBeVisible();
  });

  test('TC05 - Verify Pay button visible', async () => {
    await paymentPage.addCourse();
    await paymentPage.goToPayment();
    await expect(paymentPage.payButton).toBeVisible();
  });

  test('TC06 - Click Pay without data (validation)', async () => {
    await paymentPage.addCourse();
    await paymentPage.goToPayment();
    await paymentPage.payButton.click();
    await expect(paymentPage.page.locator('body')).toContainText(/required/i);
  });

  test('TC07 - Clear cart and validate empty', async () => {
    await paymentPage.clearCart();
    const removeBtns = paymentPage.page.getByRole('button', { name: /remove/i });
    await expect(removeBtns).toHaveCount(0);
  });

  test('TC08 - Verify Enrollment Summary visible', async () => {
    await paymentPage.goToPayment();
    await expect(paymentPage.enrollmentSummaryHeading).toBeVisible();
  });

  test('TC09 - Verify Pay button visible', async () => {
    await paymentPage.goToPayment();
    await expect(paymentPage.payButton).toBeVisible();
  });

  test('TC10 - Click Pay without entering data', async () => {
    await paymentPage.goToPayment();
    await paymentPage.payButton.click();
    await expect(paymentPage.page.locator('body')).toContainText(/required/i);
  });

  test('TC11 - Enter Name on Card', async () => {
    await paymentPage.goToPayment();
    await paymentPage.nameOnCard.fill('John Doe');
  });

  test('TC12 - Enter all card details', async () => {
    await paymentPage.goToPayment();
    await paymentPage.fillPaymentForm({
      number: '1234567812345678',
      month: '12',
      year: '26',
      cvv: '123',
    });
    await expect(paymentPage.cardNumber).toHaveValue('1234567812345678');
    await expect(paymentPage.month).toHaveValue('12');
    await expect(paymentPage.year).toHaveValue('26');
    await expect(paymentPage.cvv).toHaveValue('123');
  });

  test('TC13 - Fill complete payment form successfully', async () => {
    await paymentPage.goToPayment();
    await paymentPage.fillPaymentForm({
      name: 'John Doe',
      number: '1234567812345678',
      month: '12',
      year: '26',
      cvv: '123',
    });
    await expect(paymentPage.nameOnCard).toHaveValue('John Doe');
  });

  test('TC14 - Fill payment form with different valid details', async () => {
    await paymentPage.goToPayment();
    await paymentPage.fillPaymentForm({
      name: 'Richa Sharma',
      number: '8765432187654321',
      month: '11',
      year: '27',
      cvv: '456',
    });
    await expect(paymentPage.nameOnCard).toHaveValue('Richa Sharma');
  });

  test('TC15 - Fill form and verify Pay button is enabled', async () => {
    await paymentPage.goToPayment();
    await paymentPage.fillPaymentForm({
      name: 'John Doe',
      number: '1234567812345678',
      month: '12',
      year: '26',
      cvv: '123',
    });
    await expect(paymentPage.payButton).toBeEnabled();
  });

  test('TC16 - Payment page UI text', async () => {
    await paymentPage.addCourse();
    await paymentPage.cartLink.click();
    await paymentPage.proceedToPaymentButton.click();
    await expect(paymentPage.secureCheckoutHeading).toBeVisible();
  });

  test('TC17 - Verify total amount text', async () => {
    await paymentPage.addCourse();
    await paymentPage.cartLink.click();
    await expect(paymentPage.totalText).toBeVisible();
  });

  test('TC18 - Validate card number length error', async () => {
    await paymentPage.goToPayment();
    await paymentPage.cardNumber.fill('1234');
    await paymentPage.payButton.click();
    await expect(paymentPage.page.locator('body')).toContainText(/16 digits/i);
  });

  test('TC19 - Validate required fields error', async () => {
    await paymentPage.goToPayment();
    await paymentPage.payButton.click();
    await expect(paymentPage.page.locator('body')).toContainText(/required/i);
  });
});