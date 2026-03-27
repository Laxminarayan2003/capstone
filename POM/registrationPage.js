import { test, expect } from '@playwright/test';

export class RegistrationPage {
  constructor(page) {
    this.page = page;

    // URLs
    this.loginUrl = 'https://edu-admin-hub--laxminarayanr.replit.app/login';
    this.registerUrl = 'https://edu-admin-hub--laxminarayanr.replit.app/register';

    // Locators
    this.applyNowBtn = page.locator('text=Apply now');
    this.heading = page.locator('h1');

    this.firstName = page.getByLabel('First name');
    this.lastName = page.getByLabel('Last name');
    this.email = page.locator('input[name="email"]');
    this.phone = page.getByPlaceholder('+1 (555) 000-0000');
    this.password = page.locator('input[name="password"]');

    this.submitBtn = page.locator('button:has-text("Complete Application")');
    this.backToSignIn = page.getByRole('link', { name: 'Back to sign in' });

    this.luminaLogo = page.locator('text=Lumina').first();
  }

  // Navigation
  async navigateToLogin() {
    await this.page.goto(this.loginUrl);
  }

  async clickApplyNow() {
    await expect(this.applyNowBtn).toBeVisible();
    await this.applyNowBtn.click();
    await expect(this.page).toHaveURL(/register/);
  }

  async navigateToRegister() {
    await this.page.goto(this.registerUrl);
  }

  // Validations
  async verifyHeading() {
    await expect(this.heading).toHaveText('Create an Account');
  }

  async verifyFirstNamePlaceholder() {
    await expect(this.firstName).toHaveAttribute('placeholder', 'Jane');
  }

  async verifyLastNamePlaceholder() {
    await expect(this.lastName).toHaveAttribute('placeholder', 'Doe');
  }

  async verifyLuminaLogo() {
    await expect(this.luminaLogo).toBeVisible();
  }

  async verifySubmitButtonVisible() {
    await expect(this.submitBtn).toBeVisible();
  }

  async verifyButtonEnabled() {
    await expect(this.submitBtn).toBeEnabled();
  }

  // Actions
  async fillFirstName(value) {
    await this.firstName.fill(value);
  }

  async fillLastName(value) {
    await this.lastName.fill(value);
  }

  async fillEmail(value) {
    await this.email.fill(value);
  }

  async fillPhone(value) {
    await this.phone.fill(value);
    await this.phone.blur();
  }

  async fillPassword(value) {
    await this.password.fill(value);
  }

  async clickSubmit() {
    await this.submitBtn.click();
  }

  async clickBackToSignIn() {
    await this.backToSignIn.click();
  }

  // Assertions
  async verifyValidEmail() {
    await expect(this.page.locator('text=Invalid email')).not.toBeVisible();
  }

  async verifyValidPhone() {
    await expect(this.page.locator('text=Invalid phone number')).toHaveCount(0);
  }

  async verifyValidPassword() {
    await expect(this.page.locator('text=Weak')).not.toBeVisible();
  }

  async verifyPasswordError(text) {
    await expect(this.page.locator(`text=${text}`)).toBeVisible();
  }
}