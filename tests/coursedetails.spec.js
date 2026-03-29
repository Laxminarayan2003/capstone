// coursedetails.spec.js
import { test, expect } from '@playwright/test';
import { CourseDetailsPage } from '../POM/coursedetailsPage';

test.describe('Course Details Page Tests', () => {
  let coursePage;

  test.beforeEach(async ({ page }) => {
    coursePage = new CourseDetailsPage(page);
  });

  test('TC01 - Verify course title is displayed', async ({ page }) => {
    await coursePage.navigateToCourse(9);
    await expect(page.getByText('Economics: Micro & Macro')).toBeVisible();
  });

  test('TC02 - Verify Back to curriculum navigation', async ({ page }) => {
    await coursePage.navigateToCourse(9);
    await coursePage.clickBackToCurriculum();
    await expect(page.getByText(/courses/i)).toBeVisible();
  });

  test('TC03 - Verify course title is displayed correctly', async ({ page }) => {
    await coursePage.navigateToCourse(9);
    await coursePage.validateCourseTitle();
  });

  test('TC04 - Verify About this course and What you’ll learn sections', async ({ page }) => {
    await coursePage.navigateToCourse(9);
    await coursePage.validateCourseSections();
  });

  test('TC05 - Verify Explore Courses link navigation', async ({ page }) => {
    await coursePage.navigateToCourse(9);
    await coursePage.clickExploreCourses();
    await expect(page.getByText(/courses/i)).toBeVisible();
  });

  test('TC06 - Verify navigation from Sign In to Welcome Back page', async ({ page }) => {
    await coursePage.navigateToCourse(9);
    await coursePage.goToSignIn();
  });

  test('TC07 - Verify user can login and add course to cart', async ({ page }) => {
    await coursePage.login('vinay@ibm.com', 'Vinay@123');
    await coursePage.addFirstCourseToCart();
  });
});