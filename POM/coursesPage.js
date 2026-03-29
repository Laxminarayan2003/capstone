// coursesPage.js
import { expect } from '@playwright/test';

export class CoursesPage {
  constructor(page) {
    this.page = page;

    // Locators
    this.navCourses = page.getByRole('link', { name: 'Courses' });
    this.dropdown = page.getByRole('combobox');
    this.searchBox = page.getByPlaceholder('Search courses by title or instructor...');
  }

  async goToCoursesPage() {
    await this.navCourses.click();
    await expect(this.page).toHaveURL(/courses/);
  }

  async verifyHeading(text) {
    await expect(this.page.getByText(text)).toBeVisible();
  }

  async selectDropdownOption(optionName) {
    await this.dropdown.click();
    await this.page.getByRole('option', { name: optionName }).click();
    await expect(this.dropdown).toContainText(optionName);
  }

  async verifyCourseDisplayed(courseName) {
    await expect(this.page.getByText(courseName)).toBeVisible();
  }

  async verifyImageVisible(srcPartial) {
    const image = this.page.locator(`img[src*="${srcPartial}"]`);
    await expect(image).toBeVisible();
  }

  async verifySearchPlaceholder() {
    await expect(this.searchBox).toBeVisible();
    await expect(this.searchBox).toHaveAttribute(
      'placeholder',
      'Search courses by title or instructor...'
    );
  }
}