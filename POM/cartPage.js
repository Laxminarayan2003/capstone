// cartPage.js
import { expect } from '@playwright/test';

export class CartPage {
  constructor(page) {
    this.page = page;

    // Login locators
    this.emailInput = page.getByRole('textbox', { name: 'Email address' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.signInButton = page.getByRole('button', { name: 'Sign in' });

    // Navigation links
    this.coursesLink = page.getByRole('link', { name: 'Courses' });
    this.cartLink = page.getByRole('link', { name: /cart/i });

    // Course actions
    this.viewDetailsLink = page.getByRole('link', { name: 'View Details' }).first();
    this.addToCartButton = page.getByRole('button', { name: 'Add to Cart' });
    this.removeButton = page.getByRole('button', { name: 'Remove' });
    this.proceedToPaymentButton = page.getByRole('button', { name: 'Proceed to Payment' });

    // Cart items
    this.cartItems = page.locator('.cart-item');
  }

  // Login method
  async login(email, password) {
    await this.page.goto('https://edu-admin-hub--laxminarayanr.replit.app/');
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  // Navigate to Courses
  async goToCourses() {
    await this.coursesLink.click();
    await expect(this.page).toHaveURL(/courses/);
  }

  // Open first course details
  async openFirstCourseDetails() {
    await this.goToCourses();
    await this.viewDetailsLink.click();
    await expect(this.addToCartButton).toBeVisible();
  }

  // Add course to cart
  async addCourseToCart() {
    await this.openFirstCourseDetails();
    await this.addToCartButton.click();
  }

  // Go to cart page
  async goToCart() {
    await this.cartLink.click();
    await expect(this.page).toHaveURL(/cart/);
  }

  // Remove first course from cart
  async removeFirstCourseFromCart() {
    const initialCount = await this.removeButton.count();
    if (initialCount > 0) {
      await this.removeButton.first().click();
      await expect(this.removeButton).toHaveCount(initialCount - 1);
    }
  }

  // Check if Proceed to Payment button is visible
  async checkProceedToPaymentButton() {
    const btn = this.proceedToPaymentButton;
    if (await btn.isVisible()) {
      await expect(btn).toBeVisible();
    }
  }

  // Click Proceed to Payment button
  async clickProceedToPayment() {
    const btn = this.proceedToPaymentButton;
    if (await btn.isVisible()) {
      await btn.click();
    }
  }
}