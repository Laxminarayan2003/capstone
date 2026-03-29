// studentPortalPage.js
import { expect } from '@playwright/test';

export class StudentPortalPage {
  constructor(page) {
    this.page = page;

    // Login Page
    this.emailInput = page.getByLabel('Email');
    this.passwordInput = page.getByLabel('Password');
    this.signInButton = page.getByRole('button', { name: /sign in/i });

    // Dashboard
    this.dashboardHeading = page.getByRole('heading', { name: /Student Portal/i });
    this.navDashboard = page.getByRole('link', { name: /dashboard/i });
    this.navCourses = page.getByRole('link', { name: /courses/i });
    this.navCart = page.getByRole('link', { name: /cart/i });
    this.logoutButton = page.getByRole('button', { name: /logout/i });
    this.browseMoreLink = page.getByRole('link', { name: /browse more/i });
    this.recentPaymentsText = page.getByText('Recent Payments');
    this.welcomeText = page.getByText("Welcome back, vinay. Here's");

    // Courses
    this.coursesHeading = page.getByRole('heading', { name: /explore our curriculum/i });

    // Profile
    this.editButton = page.getByRole('button', { name: /edit/i });
    this.saveChangesButton = page.getByRole('button', { name: /save changes/i });
  }

  // Login method
  async login(email, password) {
    await this.page.goto('https://edu-admin-hub--laxminarayanr.replit.app/login');
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
    await expect(this.page).toHaveURL(/dashboard/);
  }

  // Navigate to dashboard
  async goToDashboard() {
    await this.page.goto('https://edu-admin-hub--laxminarayanr.replit.app/dashboard');
  }

  // Click Browse more
  async clickBrowseMore() {
    await this.browseMoreLink.click();
  }

  // Click Edit
  async clickEdit() {
    await this.editButton.click();
  }

  // Click Recent Payments
  async clickRecentPayments() {
    await this.recentPaymentsText.click();
  }
}