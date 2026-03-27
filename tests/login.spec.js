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

[
  {email:"akash@gmail.com",password:"Akash@123"},
  {email:"abhinav@gmail.com",password:"Abhinav@123"},
  {email:"anjay@gmail.com",password:"Anjay@123"},
  {email:"sanjay@gmail.com",password:"Sanjay@123"},
  {email:"amith@gmail.com",password:"amith@123"}
  
].forEach(obj=>
{
  test(`Verify login for user ${obj.email}`, async ({ page }) => {
  await page.goto('https://edu-admin-hub--laxminarayanr.replit.app/login');

  // Enter valid credentials
  await page.getByLabel(/email/i).fill(obj.email);
  await page.getByLabel(/password/i).fill(obj.password);

  // Click Sign in
  await page.getByRole('button', { name: /Sign in/i }).click();

  // ✅ Verify heading after login
 await expect(page.getByText(/Welcome back/i)).toBeVisible();
});
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

