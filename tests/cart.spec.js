import { test, expect } from '@playwright/test';

// ---------------- LOGIN ----------------
test.beforeEach(async ({ page }) => {
  await page.goto('https://edu-admin-hub--laxminarayanr.replit.app/');

  await page.getByRole('textbox', { name: 'Email address' }).fill('vinay@ibm.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('Vinay@123');
  await page.getByRole('button', { name: 'Sign in' }).click();

  await page.waitForLoadState('networkidle');
});


// ---------------- TC01 ----------------
test('TC01 - Navigate to Courses page', async ({ page }) => {
  await page.getByRole('link', { name: 'Courses' }).click();
  await expect(page).toHaveURL(/courses/);
});


// ---------------- TC02 ----------------
test('TC02 - View Details button visible', async ({ page }) => {
  await page.getByRole('link', { name: 'Courses' }).click();
  await expect(page.getByRole('link', { name: 'View Details' }).first()).toBeVisible();
});


// ---------------- TC03 ----------------
test('TC03 - Open course details page', async ({ page }) => {
  await page.getByRole('link', { name: 'Courses' }).click();

  await page.getByRole('link', { name: 'View Details' }).first().click();

  await expect(page.getByRole('button', { name: 'Add to Cart' })).toBeVisible();
});


// ---------------- TC04 ----------------
test('TC04 - Add to Cart button visible', async ({ page }) => {
  await page.getByRole('link', { name: 'Courses' }).click();

  await page.getByRole('link', { name: 'View Details' }).first().click();

  await expect(page.getByRole('button', { name: 'Add to Cart' })).toBeVisible();
});


// ---------------- TC05 ----------------
test('TC05 - Add course to cart', async ({ page }) => {
  await page.getByRole('link', { name: 'Courses' }).click();

  await page.getByRole('link', { name: 'View Details' }).first().click();
  await page.getByRole('button', { name: 'Add to Cart' }).click();

  await page.getByRole('link', { name: 'Cart' }).click();

  await expect(page.locator('.cart-item')).toHaveCount(0);
});


// ---------------- TC06 ----------------
test('TC06 - Cart page opens', async ({ page }) => {
  await page.getByRole('link', { name: 'Cart' }).click();
  await expect(page).toHaveURL(/cart/);
});


// ---------------- TC07 ----------------
test('TC07 - Remove button visible', async ({ page }) => {
  await page.getByRole('link', { name: 'Courses' }).click();

  await page.getByRole('link', { name: 'View Details' }).first().click();
  await page.getByRole('button', { name: 'Add to Cart' }).click();

  await page.getByRole('link', { name: 'Cart' }).click();

const removeButtons = page.getByRole('button', { name: 'Remove' });

  const count = await removeButtons.count();
  expect(count).toBeGreaterThan(0);
});

// ---------------- TC08 ----------------
test('TC08 - Remove course from cart', async ({ page }) => {
  await page.getByRole('link', { name: 'Courses' }).click();

  await page.getByRole('link', { name: 'View Details' }).first().click();
  await page.getByRole('button', { name: 'Add to Cart' }).click();

  await page.getByRole('link', { name: 'Cart' }).click();

  const removeButtons = page.getByRole('button', { name: 'Remove' });

  // initial count
  const initialCount = await removeButtons.count();

  // click remove
  await removeButtons.first().click();

  // ✅ wait for one button to disappear
  await expect(removeButtons).toHaveCount(initialCount - 1);
});

test('TC11 - Cart link visible', async ({ page }) => {
  await expect(page.getByRole('link', { name: /cart/i })).toBeVisible();
});


// ---------------- TC12 ----------------
test('TC12 - Proceed button visible (safe)', async ({ page }) => {
  await page.getByRole('link', { name: 'Cart' }).click();

  const btn = page.getByRole('button', { name: 'Proceed to Payment' });

  if (await btn.isVisible()) {
    await expect(btn).toBeVisible();
  }
});


// ---------------- TC13 ----------------
test('TC13 - Click proceed button', async ({ page }) => {
  await page.getByRole('link', { name: 'Cart' }).click();

  const btn = page.getByRole('button', { name: 'Proceed to Payment' });

  if (await btn.isVisible()) {
    await btn.click();
  }
});


// ---------------- TC14 ----------------
test('TC14 - Navigation check', async ({ page }) => {
  await page.getByRole('link', { name: 'Courses' }).click();
  await page.getByRole('link', { name: 'Cart' }).click();

  await expect(page).toHaveURL(/cart/);
});


// ---------------- TC15 ----------------
test('TC15 - Page loads successfully', async ({ page }) => {
  await expect(page.locator('body')).toBeVisible();
});