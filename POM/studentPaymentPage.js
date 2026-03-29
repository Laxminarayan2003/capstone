// studentPaymentPage.js
import { expect } from '@playwright/test';

export class StudentPaymentPage {
  constructor(page) {
    this.page = page;

    // Login
    this.emailInput = page.getByRole('textbox', { name: 'Email address' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.signInButton = page.getByRole('button', { name: 'Sign in' });

    // Dashboard / Navigation
    this.cartLink = page.getByRole('link', { name: /cart/i });
    this.coursesLink = page.getByRole('link', { name: 'Courses' });
    this.viewDetailsLink = page.getByRole('link', { name: 'View Details' }).first();
    this.addToCartButton = page.getByRole('button', { name: 'Add to Cart' });

    // Payment Page
    this.proceedToPaymentButton = page.getByRole('button', { name: 'Proceed to Payment' });
    this.secureCheckoutHeading = page.getByRole('heading', { name: 'Secure Checkout' });
    this.enrollmentSummaryHeading = page.getByRole('heading', { name: 'Enrollment Summary' });

    // Payment fields
    this.nameOnCard = page.getByRole('textbox', { name: 'Name on Card' });
    this.cardNumber = page.getByRole('textbox', { name: 'Card Number' });
    this.month = page.getByRole('textbox', { name: 'Month (MM)' });
    this.year = page.getByRole('textbox', { name: 'Year (YY)' });
    this.cvv = page.getByRole('textbox', { name: 'CVV' });
    this.payButton = page.getByRole('button', { name: /Pay/i });

    // Total
    this.totalText = page.getByText('Total', { exact: true });
  }

async login(email, password) {
  await this.page.goto('https://edu-admin-hub--laxminarayanr.replit.app/');
  await this.emailInput.fill(email);
  await this.passwordInput.fill(password);
  await this.signInButton.click();

  // Wait for dashboard to load
  await this.page.waitForSelector('text=Student Portal', { timeout: 10000 }); // more stable
}
  // Add first course to cart
  async addCourse() {
    await this.coursesLink.click();
    await this.viewDetailsLink.click();
    await this.addToCartButton.click();
  }

  // Go to payment page
  async goToPayment() {
    await expect(this.cartLink).toBeVisible();
    await this.cartLink.click();
    await expect(this.proceedToPaymentButton).toBeVisible();
    await this.proceedToPaymentButton.click();
    await expect(this.secureCheckoutHeading).toBeVisible();
  }

  // Fill payment form
  async fillPaymentForm({ name, number, month, year, cvv }) {
    if (name) await this.nameOnCard.fill(name);
    if (number) await this.cardNumber.fill(number);
    if (month) await this.month.fill(month);
    if (year) await this.year.fill(year);
    if (cvv) await this.cvv.fill(cvv);
  }

  // Clear cart
  async clearCart() {
    await this.cartLink.click();
    const removeBtns = this.page.getByRole('button', { name: /remove/i });
    while (await removeBtns.count() > 0) {
      await removeBtns.first().click();
      await this.page.waitForTimeout(300); // wait for UI update
    }
  }
}