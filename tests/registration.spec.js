import { test, expect } from '@playwright/test';

const url = 'https://edu-admin-hub--laxminarayanr.replit.app';

test('test', async ({ page }) => {
  await page.goto('https://edu-admin-hub--laxminarayanr.replit.app/login');
});

test('Apply Now button navigation validation', async ({ page }) => {

  await page.goto('https://edu-admin-hub--laxminarayanr.replit.app/login');

  const applyNow = page.locator('text=Apply now');
  await expect(applyNow).toBeVisible();

  await applyNow.click();

  await expect(page).toHaveURL('https://edu-admin-hub--laxminarayanr.replit.app/register');

  await expect(page.locator('text=Create an Account')).toBeVisible();
  await expect(page.locator('input[name="email"]')).toBeVisible();
});

test('Validate Create an Account heading text', async ({ page }) => {

  await page.goto('https://edu-admin-hub--laxminarayanr.replit.app/register');

  const heading = page.locator('h1');

  await expect(heading).toHaveText('Create an Account');
});
test('Verify First Name Placeholder', async ({ page }) => {

  await page.goto('https://edu-admin-hub--laxminarayanr.replit.app/register');

   const firstName = page.getByLabel('First name');
   await expect(firstName).toHaveAttribute('placeholder', 'Jane');

});

test('Verify Last Name Placeholder', async ({ page }) => {

  await page.goto('https://edu-admin-hub--laxminarayanr.replit.app/register');

   const lastName = page.getByLabel('Last name');
   await expect(lastName).toHaveAttribute('placeholder', 'Doe');

});

  test.beforeEach(async ({ page }) => {
  await page.goto('https://edu-admin-hub--laxminarayanr.replit.app/login');
  
  await page.click('text=Apply now'); // navigate properly
  await expect(page).toHaveURL(/register/);
});

  test('should accept a valid email address', async ({ page }) => {
    await page.fill('input[name="email"]', 'test.user@example.com');
    await page.click('button:has-text("Complete Application")');

    await expect(page.locator('text=Invalid email')).not.toBeVisible();
  });


test.beforeEach(async ({ page }) => {
  await page.goto('https://edu-admin-hub--laxminarayanr.replit.app/login');
  
  await page.click('text=Apply now'); // navigate properly
  await expect(page).toHaveURL(/register/);
});

  test('should accept a valid phone number', async ({ page }) => {
    const phoneInput = page.getByPlaceholder('+1 (555) 000-0000');

    await phoneInput.fill('+1 (987) 654-3210');

    await phoneInput.blur();

    await expect(
      page.locator('text=Invalid phone number')
    ).toHaveCount(0);
  });

test('Verify Lumina logo appears on top-left after clicking Apply Now', async ({ page }) => {
  
  // Step 1: Go to Login page (correct starting point)
  await page.goto('https://edu-admin-hub--laxminarayanr.replit.app/login');

  // Step 2: Click Apply Now
  const applyNow = page.getByText('Apply now');
  await expect(applyNow).toBeVisible();
  await applyNow.click();

  // Step 3: Wait for Register page
  await expect(page).toHaveURL(/register/);

  // Step 4: Verify Lumina logo/text
  const luminaLogo = page.locator('text=Lumina').first();
  await expect(luminaLogo).toBeVisible();
});


test.beforeEach(async ({ page }) => {
  await page.goto('https://edu-admin-hub--laxminarayanr.replit.app/login');
  
  await page.click('text=Apply now'); // navigate properly
  await expect(page).toHaveURL(/register/);
});
  // ✅ Positive Test Case
  test('should accept a valid password', async ({ page }) => {
    const passwordInput = page.locator('input[name="password"]');

    await expect(passwordInput).toBeVisible();
    await passwordInput.fill('Test@1234');

    // Example: check strength or no error
    await expect(page.locator('text=Weak')).not.toBeVisible();
  });

  // ❌ Less than 8 characters
  test('should show error for short password', async ({ page }) => {
    await page.fill('input[name="password"]', 'T@1a');

    await expect(page.locator('text=At least 8 characters')).toBeVisible();
  });

  // ❌ Missing uppercase
  test('should show error if no uppercase letter', async ({ page }) => {
    await page.fill('input[name="password"]', 'test@1234');

    await expect(page.locator('text=uppercase')).toBeVisible();
  });

  // ❌ Missing lowercase
  test('should show error if no lowercase letter', async ({ page }) => {
    await page.fill('input[name="password"]', 'TEST@1234');

    await expect(page.locator('text=lowercase')).toBeVisible();
  });

 
  // ❌ Missing special character
  test('should show error if no special character', async ({ page }) => {
    await page.fill('input[name="password"]', 'Test1234');

    await expect(page.locator('text=special character')).toBeVisible();
  });
test('Verify Complete Application button is visible', async ({ page }) => {
  await page.goto('https://edu-admin-hub--laxminarayanr.replit.app/register');

  await expect(page.locator('button:has-text("Complete Application")')).toBeVisible();
});
test('Verify button enabled when form is valid', async ({ page }) => {
  await page.goto('https://edu-admin-hub--laxminarayanr.replit.app/register');

  await page.getByPlaceholder('input[name="firstname"]', 'John');
  await page.getByPlaceholder('input[name="lastname"]', 'Doe');
  await page.getByPlaceholder('input[name="email"]', 'john@test.com');
  await page.getByPlaceholder('input[name="password"]', 'Test@1234');

  const button = page.locator('button:has-text("Complete Application")');
  await expect(button).toBeEnabled();
});

test('Verify navigation after clicking Complete Application', async ({ page }) => {
  await page.goto('https://edu-admin-hub--laxminarayanr.replit.app/register');

  await page.getByPlaceholder('input[name="firstname"]', 'John');
  await page.getByPlaceholder('input[name="lastname"]', 'Doe');
  await page.getByPlaceholder('input[name="email"]', 'john@test.com');
  await page.getByPlaceholder('input[name="password"]', 'Test@1234');

  await page.click('button:has-text("Complete Application")');

  await expect(page).toHaveURL('https://edu-admin-hub--laxminarayanr.replit.app/register');
});
test('Verify Back to sign in redirects to login page', async ({ page }) => {
  // Step 1: Navigate via real user flow
 // await page.goto('https://edu-admin-hub--laxminarayanr.replit.app/login');
  //await page.getByText('Apply now').click();

  // Step 2: Ensure we are on register page
  await expect(page).toHaveURL('https://edu-admin-hub--laxminarayanr.replit.app/register');

  // Step 3: Click "Back to sign in"
  await page.getByRole('link', { name: 'Back to sign in' }).click();

  // Step 4: Verify redirect to login page
  await expect(page).toHaveURL('https://edu-admin-hub--laxminarayanr.replit.app/login');

  // Step 5 (Optional but strong validation)
//   await expect(page.getByRole('heading', { name: /sign in/i })).toBeVisible();
});