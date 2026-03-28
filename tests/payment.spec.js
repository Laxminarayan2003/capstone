import { test, expect } from '@playwright/test';

// ---------- LOGIN ----------
test.beforeEach(async ({ page }) => {
  await page.goto('https://edu-admin-hub--laxminarayanr.replit.app/');

  await page.getByRole('textbox', { name: 'Email address' }).fill('vinay@ibm.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('Vinay@123');
  await page.getByRole('button', { name: 'Sign in' }).click();


  // ✅ Ensure dashboard loaded
  await expect(page.getByRole('link', { name: /cart/i })).toBeVisible();
});

// ---------- HELPER: ADD COURSE ----------
async function addCourse(page) {
  await page.getByRole('link', { name: 'Courses' }).click();
  await page.getByRole('link', { name: 'View Details' }).first().click();
  await page.getByRole('button', { name: 'Add to Cart' }).click();
}

// ---------- HELPER: GO TO PAYMENT ----------
async function goToPayment(page) {
  const cartLink = page.getByRole('link', { name: /cart/i });
  await expect(cartLink).toBeVisible();
  await cartLink.click();

  const proceedBtn = page.getByRole('button', { name: 'Proceed to Payment' });
  await expect(proceedBtn).toBeVisible();
  await proceedBtn.click();

  // ✅ Ensure payment page loaded
  await expect(page.getByRole('heading', { name: 'Secure Checkout' })).toBeVisible();
}
// ---------- TC01 ----------
test('TC01 - Navigate to payment page', async ({ page }) => {
  await addCourse(page);
  await goToPayment(page);
});

// ---------- TC02 ----------
test('TC02 - Verify Secure Checkout heading', async ({ page }) => {
  await addCourse(page);
  await goToPayment(page);

  await expect(page.getByRole('heading', { name: 'Secure Checkout' })).toBeVisible();
});

// ---------- TC03 ----------
test('TC03 - Verify all fields visible', async ({ page }) => {
  await addCourse(page);
  await goToPayment(page);

  await expect(page.getByRole('textbox', { name: 'Name on Card' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Card Number' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Month (MM)' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Year (YY)' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'CVV' })).toBeVisible();
});

// ---------- TC04 ----------
test('TC04 - Verify total visible (fixed strict mode)', async ({ page }) => {
  await addCourse(page);

  await page.getByRole('link', { name: 'Cart' }).click();

  await expect(
    page.getByText('Total', { exact: true })
  ).toBeVisible();
});

// ---------- TC05 ----------
test('TC05 - Verify Pay button visible', async ({ page }) => {
  await addCourse(page);
  await goToPayment(page);

  await expect(page.getByRole('button', { name: /Pay/i })).toBeVisible();
});

// ---------- TC06 ----------
test('TC06 - Click Pay without data (validation)', async ({ page }) => {
  await addCourse(page);
  await goToPayment(page);

  await page.getByRole('button', { name: /Pay/i }).click();

  await expect(page.locator('body')).toContainText(/required/i);
});

test('TC07 - Clear cart and validate empty', async ({ page }) => {
  await page.getByRole('link', { name: 'Cart' }).click();

  const removeBtns = page.getByRole('button', { name: /remove/i });

  while (await removeBtns.count() > 0) {
    await removeBtns.first().click();

    // wait for UI update
    await expect(removeBtns).toHaveCount(await removeBtns.count() - 1);
  }

  // ✅ Best validation
  await expect(removeBtns).toHaveCount(0);
});

test('TC08 - Verify Enrollment Summary visible', async ({ page }) => {
  await goToPayment(page);
  await expect(page.getByRole('heading', { name: 'Enrollment Summary' })).toBeVisible();
});

// ---------- TC09 ----------
test('TC09 - Verify Pay button visible', async ({ page }) => {
  await goToPayment(page);
  await expect(page.getByRole('button', { name: /Pay/i })).toBeVisible();
});

test('TC10 - Click Pay without entering data', async ({ page }) => {
  await goToPayment(page);
  await page.getByRole('button', { name: /Pay/i }).click();

  await expect(page.locator('body')).toContainText(/required/i);
});

// ---------- TC11 ----------
test('TC11 - Enter Name on Card', async ({ page }) => {
  await goToPayment(page);
  await page.getByRole('textbox', { name: 'Name on Card' }).fill('John Doe');
});

test('TC12 - Enter all card details (Number, Expiry, CVV)', async ({ page }) => {
  await goToPayment(page);

  // Enter Card Number
  await page.getByRole('textbox', { name: 'Card Number' }).fill('1234567812345678');

  // Enter Expiry
  await page.getByRole('textbox', { name: 'Month (MM)' }).fill('12');
  await page.getByRole('textbox', { name: 'Year (YY)' }).fill('26');

  // Enter CVV
  await page.getByRole('textbox', { name: 'CVV' }).fill('123');

  // Assertions
  await expect(page.getByRole('textbox', { name: 'Card Number' })).toHaveValue('1234567812345678');
  await expect(page.getByRole('textbox', { name: 'Month (MM)' })).toHaveValue('12');
  await expect(page.getByRole('textbox', { name: 'Year (YY)' })).toHaveValue('26');
  await expect(page.getByRole('textbox', { name: 'CVV' })).toHaveValue('123');
});

test('TC13 - Fill complete payment form successfully', async ({ page }) => {
  await goToPayment(page);

  // Fill all fields
  await page.getByRole('textbox', { name: 'Name on Card' }).fill('John Doe');
  await page.getByRole('textbox', { name: 'Card Number' }).fill('1234567812345678');
  await page.getByRole('textbox', { name: 'Month (MM)' }).fill('12');
  await page.getByRole('textbox', { name: 'Year (YY)' }).fill('26');
  await page.getByRole('textbox', { name: 'CVV' }).fill('123');

  // Assertions
  await expect(page.getByRole('textbox', { name: 'Name on Card' })).toHaveValue('John Doe');
  await expect(page.getByRole('textbox', { name: 'Card Number' })).toHaveValue('1234567812345678');
  await expect(page.getByRole('textbox', { name: 'Month (MM)' })).toHaveValue('12');
  await expect(page.getByRole('textbox', { name: 'Year (YY)' })).toHaveValue('26');
  await expect(page.getByRole('textbox', { name: 'CVV' })).toHaveValue('123');
});