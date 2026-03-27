import { test, expect } from '@playwright/test';

test('Verify user navigates to Dashboard after valid login', async ({ page }) => {

  // Step 1: Navigate to Login Page
  await page.goto('https://edu-admin-hub--laxminarayanr.replit.app/login');

  // Step 2: Enter valid credentials
  await page.getByLabel('Email').fill('vinay@ibm.com');
  await page.getByLabel('Password').fill('Vinay@123');

  // Step 3: Click Login button
  await page.getByRole('button', { name: /sign in/i }).click();

  // Step 4: Verify URL is Dashboard
  await expect(page).toHaveURL('https://edu-admin-hub--laxminarayanr.replit.app/dashboard');

  // Step 5: Extra validation (Dashboard UI element)
  await expect(page.getByRole('heading', { name: /Student Portal/i })).toBeVisible();
});

test.beforeEach(async ({ page }) => {
  // Login before each test
  await page.goto('https://edu-admin-hub--laxminarayanr.replit.app/login');
  await page.getByLabel('Email').fill('vinay@ibm.com');
  await page.getByLabel('Password').fill('Vinay@123');
  await page.getByRole('button', { name: /sign in/i }).click();

  // Ensure dashboard is loaded
  await expect(page).toHaveURL(/dashboard/);
});

test('Verify navbar elements', async ({ page }) => {
  await expect(page.getByRole('link', { name: /dashboard/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /courses/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /cart/i })).toBeVisible();
  await expect(page.getByRole('button', { name: /logout/i })).toBeVisible();
});

test.beforeEach(async ({ page }) => {
  // Login before test
  await page.goto('https://edu-admin-hub--laxminarayanr.replit.app/login');
  await page.getByLabel('Email').fill('vinay@ibm.com');
  await page.getByLabel('Password').fill('Vinay@123');
  await page.getByRole('button', { name: /sign in/i }).click();

  await expect(page).toHaveURL(/dashboard/);
});

test('Verify clicking "Browse more" navigates to Courses page', async ({ page }) => {
  
  // Step 1: Click on "Browse more"
  await page.getByRole('link', { name: /browse more/i }).click();

  // Step 2: Verify URL
  await expect(page).toHaveURL('https://edu-admin-hub--laxminarayanr.replit.app/courses');

  // Step 3: Verify Courses page loaded
  await expect(page.getByRole('heading', { name: /explore our curriculum/i })).toBeVisible();
});

test('Verify Save Changes button is visible after clicking Edit', async ({ page }) => {

  // Step 1: Click Edit button
  await page.getByRole('button', { name: /edit/i }).click();

  // Step 3: Verify Save Changes button
  await expect(page.getByRole('button', { name: /save changes/i })).toBeVisible();

});

test('Verify Recent Payments section is visible and clickable', async ({ page }) => {

  // Step 1: Navigate to dashboard
  await page.goto('https://edu-admin-hub--laxminarayanr.replit.app/dashboard');

  // Step 2: Verify "Recent Payments" is visible
  const recentPayments = page.getByText('Recent Payments');
  await expect(recentPayments).toBeVisible();

  // Step 3: Click on it
  await recentPayments.click();

});


test('Verify Welcome back message is displayed on dashboard', async ({ page }) => {

  // Step 1: Navigate to dashboard
  await page.goto('https://edu-admin-hub--laxminarayanr.replit.app/dashboard');

  // Step 2: Verify welcome text is visible
  await expect(
    page.getByText("Welcome back, vinay. Here's")
  ).toBeVisible();

});

