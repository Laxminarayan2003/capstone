// loginPage.js
import { expect } from '@playwright/test';

export class LoginPage {
  constructor(page) {
    this.page = page;

    // Locators
    this.emailInput = page.getByLabel(/email|username/i);
    this.passwordInput = page.getByLabel(/password/i);
    this.signInButton = page.getByRole('button', { name: /sign in/i });
  }

  // Navigate to Login Page
  async goToLogin() {
    await this.page.goto('https://edu-admin-hub--laxminarayanr.replit.app/login');
  }

  // Login method
  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }

  // Verify placeholder texts
  async verifyPlaceholders() {
    await expect(this.emailInput).toHaveAttribute('placeholder', 'student@lumina.edu');
    await expect(this.passwordInput).toHaveAttribute('placeholder', '••••••••');
  }

  // Verify login button visible
  async verifyLoginButton() {
    await expect(this.signInButton).toBeVisible();
  }

  // Verify password field is masked
  async verifyPasswordMasked() {
    await expect(this.passwordInput).toHaveAttribute('type', 'password');
  }

  // Verify empty submission validation
  async verifyEmptySubmissionError() {
    await this.signInButton.click();
    await expect(this.page.locator('text=required')).toBeVisible();
  }

  // Verify invalid login stays on login page
  async verifyInvalidLogin(email, password) {
    await this.login(email, password);
    await expect(this.page).toHaveURL('https://edu-admin-hub--laxminarayanr.replit.app/login');
  }

  // Verify successful login
  async verifySuccessfulLogin(email, password) {
    await this.login(email, password);
    await expect(this.page.getByText(/Welcome back/i)).toBeVisible();
  }
}