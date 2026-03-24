import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // Login first
  await page.goto('https://edu-admin-hub--laxminarayanr.replit.app/login');
  await page.getByLabel('Email').fill('vinay@ibm.com');
  await page.getByLabel('Password').fill('Vinay@123');
  await page.getByRole('button', { name: /sign in/i }).click();

  // Ensure dashboard loaded
  await expect(page).toHaveURL(/dashboard/);
});
test('Verify clicking Courses in navbar navigates to Courses page', async ({ page }) => {

  // Step 1: Click Courses in navbar
  await page.getByRole('link', { name: 'Courses' }).click();

  // Step 2: Verify URL
  await expect(page).toHaveURL('https://edu-admin-hub--laxminarayanr.replit.app/courses');

});

test('Verify Courses page heading', async ({ page }) => {
  await page.getByRole('link', { name: 'Courses' }).click();
  await expect(page.getByText('Explore Our Curriculum')).toBeVisible();
});


test('Verify selecting Business from dropdown', async ({ page }) => {

  // Step 1: Navigate to Courses page
  await page.getByRole('link', { name: 'Courses' }).click();

  // Step 2: Click dropdown (combobox button)
  const dropdown = page.getByRole('combobox');
  await dropdown.click();

  // Step 3: Select "Business"
  await page.getByRole('option', { name: 'Business' }).click();

  // Step 4: Verify selected value is visible
  await expect(dropdown).toContainText('Business');

});

test('Verify selecting Arts from dropdown', async ({ page }) => {

  // Step 1: Navigate to Courses page
  await page.getByRole('link', { name: 'Courses' }).click();

  // Step 2: Click dropdown (combobox button)
  const dropdown = page.getByRole('combobox');
  await dropdown.click();

  // Step 3: Select "Business"
  await page.getByRole('option', { name: 'Arts' }).click();

  // Step 4: Verify selected value is visible
  await expect(dropdown).toContainText('Arts');

});

test('Verify Business selection shows correct image', async ({ page }) => {

  // Step 1: Navigate
  await page.getByRole('link', { name: 'Courses' }).click();

  // Step 2: Open dropdown
  const dropdown = page.getByRole('combobox');
  await dropdown.click();

  // Step 3: Select Business
  await page.getByRole('option', { name: 'Business' }).click();

  // Step 4: Verify correct image is displayed
  const image = page.locator('img[src*="1516321497487"]');

  await expect(image).toBeVisible();

});
test('Verify selecting Mathematics shows "Mathematics for Engineers"', async ({ page }) => {

  // Step 1: Navigate to Courses page
  await page.getByRole('link', { name: 'Courses' }).click();

  // Step 2: Open dropdown
  const dropdown = page.getByRole('combobox');
  await dropdown.click();

  // Step 3: Select Mathematics
  await page.getByRole('option', { name: 'Mathematics' }).click();

  // Step 4: Verify course is displayed
  await expect(page.getByText('Mathematics for Engineers')).toBeVisible();

});

test('Verify search box placeholder in Courses page', async ({ page }) => {

  // Step 1: Navigate to Courses page
  await page.getByRole('link', { name: 'Courses' }).click();

  // Step 2: Locate search input
  const searchBox = page.getByPlaceholder('Search courses by title or instructor...');

  // Step 3: Verify placeholder is visible
  await expect(searchBox).toBeVisible();

  // Step 4: Verify placeholder text
  await expect(searchBox).toHaveAttribute(
    'placeholder',
    'Search courses by title or instructor...'
  );

});

test('Verify selecting Business shows "Business Administration"', async ({ page }) => {

  // Step 1: Navigate to Courses page
  await page.getByRole('link', { name: 'Courses' }).click();

  // Step 2: Open dropdown
  const dropdown = page.getByRole('combobox');
  await dropdown.click();

  // Step 3: Select Mathematics
  await page.getByRole('option', { name: 'Business' }).click();

  // Step 4: Verify course is displayed
  await expect(page.getByText('Business Administration')).toBeVisible();

});
