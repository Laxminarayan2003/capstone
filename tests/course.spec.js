// courses.spec.js
import { test, expect } from '@playwright/test';
import { CoursesPage } from '../POM/coursesPage';

test.describe('Courses Page Tests', () => {
  let coursesPage;

  test.beforeEach(async ({ page }) => {
    // Login first
    await page.goto('https://edu-admin-hub--laxminarayanr.replit.app/login');

    await page.getByLabel('Email').fill('vinay@ibm.com');
    await page.getByLabel('Password').fill('Vinay@123');
    await page.getByRole('button', { name: /sign in/i }).click();

    // ✅ Ensure dashboard loaded
    await expect(page).toHaveURL(/dashboard/);

    // Initialize POM
    coursesPage = new CoursesPage(page);
  });

  test('Verify clicking Courses in navbar navigates to Courses page', async () => {
    await coursesPage.goToCoursesPage();
  });

  test('Verify Courses page heading', async () => {
    await coursesPage.goToCoursesPage();
    await coursesPage.verifyHeading('Explore Our Curriculum');
  });

  test('Verify selecting Business from dropdown', async () => {
    await coursesPage.goToCoursesPage();
    await coursesPage.selectDropdownOption('Business');
  });

  test('Verify selecting Arts from dropdown', async () => {
    await coursesPage.goToCoursesPage();
    await coursesPage.selectDropdownOption('Arts');
  });

  test('Verify Business selection shows correct image', async () => {
    await coursesPage.goToCoursesPage();
    await coursesPage.selectDropdownOption('Business');
    await coursesPage.verifyImageVisible('1516321497487');
  });

  test('Verify selecting Mathematics shows "Mathematics for Engineers"', async () => {
    await coursesPage.goToCoursesPage();
    await coursesPage.selectDropdownOption('Mathematics');
    await coursesPage.verifyCourseDisplayed('Mathematics for Engineers');
  });

  test('Verify search box placeholder in Courses page', async () => {
    await coursesPage.goToCoursesPage();
    await coursesPage.verifySearchPlaceholder();
  });

  test('Verify selecting Business shows "Business Administration"', async () => {
    await coursesPage.goToCoursesPage();
    await coursesPage.selectDropdownOption('Business');
    await coursesPage.verifyCourseDisplayed('Business Administration');
  });
});