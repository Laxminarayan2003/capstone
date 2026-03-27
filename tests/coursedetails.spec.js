import { test, expect } from '@playwright/test';

test.describe('Course Details Page Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://edu-admin-hub--laxminarayanr.replit.app/courses/9');
  });

  // ✅ TC_01: Verify Course Title
  test('Verify course title is displayed', async ({ page }) => {
    await expect(page.getByText('Economics: Micro & Macro')).toBeVisible();
  });
});


test('Verify Back to curriculum navigation', async ({ page }) => {

  // Step 1: Navigate to course details page
  await page.goto('https://edu-admin-hub--laxminarayanr.replit.app/courses/9');

  // Step 2: Locate Back link
  const backLink = page.getByRole('link', { name: /back to curriculum/i });

  // Step 3: Ensure it is visible
  await expect(backLink).toBeVisible();

  // Step 4: Click on Back link
  await backLink.click();

  // Step 5: Verify navigation to courses page
  await expect(page).toHaveURL(/\/courses$/);

  // Step 6: Optional UI verification
  await expect(page.getByText(/courses/i)).toBeVisible();
});

test('Verify course title is displayed correctly', async ({ page }) => {

  // Step 1: Navigate to course details page
  await page.goto('https://edu-admin-hub--laxminarayanr.replit.app/courses/9');

  // Step 2: Locate heading
  const courseTitle = page.getByRole('heading', { name: 'Economics: Micro & Macro' });

  // Step 3: Verify visibility
  await expect(courseTitle).toBeVisible();

  // Step 4: Verify correct text
  await expect(courseTitle).toHaveText('Economics: Micro & Macro');
});

test('Verify About this course and What you’ll learn sections', async ({ page }) => {

  // Step 1: Navigate to course details page
  await page.goto('https://edu-admin-hub--laxminarayanr.replit.app/courses/9');

  // Step 2: Verify "About this course" section
  const aboutSection = page.getByRole('heading', { name: 'About this course' });
  await expect(aboutSection).toBeVisible();

  // Optional: verify description under it
  await expect(page.getByText(/understand economic/i)).toBeVisible();

  // Step 3: Verify "What you'll learn" section
  const learnSection = page.getByRole('heading', { name: /what you'll learn/i });
  await expect(learnSection).toBeVisible();

  // Step 4: Verify learning points
  await expect(page.getByText('Master core concepts')).toBeVisible();
  await expect(page.getByText('Collaborate with peers')).toBeVisible();
});

test('Verify Explore Courses link navigation', async ({ page }) => {

  // Step 1: Navigate to course details page
  await page.goto('https://edu-admin-hub--laxminarayanr.replit.app/courses/9');

  // Step 2: Locate Explore Courses link
  const exploreLink = page.getByRole('link', { name: /explore courses/i });

  // Step 3: Verify it is visible
  await expect(exploreLink).toBeVisible();

  // Step 4: Click on Explore Courses
  await exploreLink.click();

  // Step 5: Verify navigation to courses page
  await expect(page).toHaveURL(/\/courses$/);

  // Step 6: Verify Courses page content loaded
  await expect(page.getByText(/courses/i)).toBeVisible();
});
