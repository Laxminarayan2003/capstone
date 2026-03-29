// coursedetailsPage.js
import { expect } from '@playwright/test';

export class CourseDetailsPage {
  constructor(page) {
    this.page = page;

    // Login locators
    this.emailInput = page.getByRole('textbox', { name: 'Email address' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.signInButton = page.getByRole('button', { name: 'Sign in' });

    // Navigation
    this.coursesLink = page.getByRole('link', { name: 'Courses' });
    this.cartLink = page.getByRole('link', { name: /cart/i });
    this.signInLink = page.getByRole('link', { name: 'Sign In', exact: true });

    // Course details page
    this.courseTitleHeading = page.getByRole('heading', { name: 'Economics: Micro & Macro' });
    this.backToCurriculumLink = page.getByRole('link', { name: /back to curriculum/i });
    this.aboutSectionHeading = page.getByRole('heading', { name: 'About this course' });
    this.learnSectionHeading = page.getByRole('heading', { name: /what you'll learn/i });
    this.exploreCoursesLink = page.getByRole('link', { name: /explore courses/i });

    // Course actions
    this.viewDetailsLink = page.getByRole('link', { name: 'View Details' }).first();
    this.addToCartButton = page.getByRole('button', { name: 'Add to Cart' });
  }

  // Login method
  async login(email, password) {
    await this.page.goto('https://edu-admin-hub--laxminarayanr.replit.app/login');
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.signInButton.click();

    // Wait for Courses link to ensure login success
    await expect(this.coursesLink).toBeVisible({ timeout: 10000 });
  }

  // Navigate to course details page by ID
  async navigateToCourse(courseId) {
    await this.page.goto(`https://edu-admin-hub--laxminarayanr.replit.app/courses/${courseId}`);
  }

  // Click Back to Curriculum
  async clickBackToCurriculum() {
    await expect(this.backToCurriculumLink).toBeVisible();
    await this.backToCurriculumLink.click();
    await expect(this.page).toHaveURL(/\/courses$/);
  }

  // Click Explore Courses
  async clickExploreCourses() {
    await expect(this.exploreCoursesLink).toBeVisible();
    await this.exploreCoursesLink.click();
    await expect(this.page).toHaveURL(/\/courses$/);
  }

  // Add first course to cart
  async addFirstCourseToCart() {
    await this.coursesLink.click();
    await this.viewDetailsLink.click();
    await expect(this.addToCartButton).toBeVisible();
    await this.addToCartButton.click();
  }

  // Navigate to Sign In page
  async goToSignIn() {
    await this.signInLink.click();
    await expect(this.page.getByRole('heading', { name: 'Welcome back' })).toBeVisible();
  }

  // Validate course title
  async validateCourseTitle() {
    await expect(this.courseTitleHeading).toBeVisible();
    await expect(this.courseTitleHeading).toHaveText('Economics: Micro & Macro');
  }

  // Validate course sections
  async validateCourseSections() {
    await expect(this.aboutSectionHeading).toBeVisible();
    await expect(this.page.getByText(/understand economic/i)).toBeVisible();
    await expect(this.learnSectionHeading).toBeVisible();
    await expect(this.page.getByText('Master core concepts')).toBeVisible();
    await expect(this.page.getByText('Collaborate with peers')).toBeVisible();
  }
}