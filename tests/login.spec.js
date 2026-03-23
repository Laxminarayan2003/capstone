import { test, expect } from '@playwright/test';

test('Verify placeholder text on Login page', async ({ page }) => {

  await page.goto('https://edu-admin-hub--laxminarayanr.replit.app/login');

  const emailInput = page.getByLabel(/email|username/i);
  await expect(emailInput).toHaveAttribute('placeholder', 'student@lumina.edu'); 

  const passwordInput = page.getByLabel(/password/i);
  await expect(passwordInput).toHaveAttribute('placeholder', '••••••••'); 
  
});

test('Verify login button is visible', async ({ page }) => {
  await page.goto('https://edu-admin-hub--laxminarayanr.replit.app/login');

  const loginBtn = page.getByRole('button', { name: /Sign in/i });

  await expect(loginBtn).toBeVisible();
});

test('Verify error messages on empty login submission', async ({ page }) => {
  // Step 1: Navigate to Login page
  await page.goto('https://edu-admin-hub--laxminarayanr.replit.app/login');

  // Step 2: Click Login button without entering data
  await page.getByRole('button', { name: /sign in/i }).click();

  // Step 3: Verify validation errors
  await expect(
    page.locator('text=required')
  ).toBeVisible();
});

test('Verify invalid login does not redirect', async ({ page }) => {
  await page.goto('https://edu-admin-hub--laxminarayanr.replit.app/login');

  await page.getByLabel(/email/i).fill('wrongUser');
  await page.getByLabel(/password/i).fill('wrongPass');

  await page.getByRole('button', { name: /Sign in/i }).click();

  // Verify still on login page
  await expect(page).toHaveURL('https://edu-admin-hub--laxminarayanr.replit.app/login');
});

test('Verify user can login and see Student Portal heading', async ({ page }) => {
  await page.goto('https://edu-admin-hub--laxminarayanr.replit.app/login');

  // Enter valid credentials
  await page.getByLabel(/email/i).fill('sanjay@ibm.com');
  await page.getByLabel(/password/i).fill('Sanjay@123');

  // Click Sign in
  await page.getByRole('button', { name: /Sign in/i }).click();

  // ✅ Verify heading after login
  await expect(
    page.getByRole('heading', { name: /Student Portal/i })
  ).toBeVisible();
});

test('Verify password field is masked on Login page', async ({ page }) => {
  // Step 1: Navigate to Login page
  await page.goto('https://edu-admin-hub--laxminarayanr.replit.app/login');

  // Step 2: Locate password field
  const passwordInput = page.getByLabel(/password/i);

  // Step 3: Verify input type is password
  await expect(passwordInput).toHaveAttribute('type', 'password');

  // Step 4 (Optional): Enter value and ensure it's not visible as plain text
  await passwordInput.fill('Test@1234');

  // This confirms it's still password type (masked)
  await expect(passwordInput).toHaveAttribute('type', 'password');
});


test('Verify user can logout and return to login page', async ({ page }) => {
  // 🔹 Step 1: Go to Login page
  await page.goto('https://edu-admin-hub--laxminarayanr.replit.app/login');

  // 🔹 Step 2: Login with valid credentials
  await page.getByLabel(/email/i).fill('sanjay@ibm.com');
  await page.getByLabel(/password/i).fill('Sanjay@123');

  await page.getByRole('button', { name: /sign in/i }).click();

  // 🔹 Step 3: Verify dashboard loaded
  await expect(
    page.getByRole('heading', { name: /student portal/i })
  ).toBeVisible();

  // 🔹 Step 4: Click Logout button (right side)
  const logoutBtn = page.getByRole('button', { name: /logout/i });
  await expect(logoutBtn).toBeVisible();
  await logoutBtn.click();

  // 🔹 Step 6 (Strong validation): Login UI should be visible
  await expect(
    page.getByRole('heading', { name: /welcome back/i })
  ).toBeVisible();
});