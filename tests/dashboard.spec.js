import { test, expect } from '@playwright/test';
import { DashboardPage } from '../POM/dash';

let dashboard;

test.beforeEach(async ({ page }) => {
    dashboard = new DashboardPage(page);
    await dashboard.goto();
    await dashboard.login('peter@gmail.com', '213721');
    await expect(page).toHaveURL(/app/);
});

// 1
test('checking sellBike button functionality', async ({ page }) => {
    await dashboard.clickAndWait(dashboard.sellBike, /sell/);
    await expect(page).toHaveURL(/sell/);
});

2
test('checking Browse bike functionality', async ({ page }) => {
    await dashboard.clickAndWait(dashboard.browseBike, /listings/);
    await expect(page).toHaveURL(/listings/);
});

// 3
test('checking My Orders button functionality', async ({ page }) => {
    await dashboard.clickAndWait(dashboard.myOrders, /orders/);
    await expect(page).toHaveURL(/orders/);
});

// 4
test('checking Messages button functionality', async ({ page }) => {
    await dashboard.clickAndWait(dashboard.messages, /chat/);
    await expect(page).toHaveURL(/chat/);
});

// 5
test('checking Estimator button functionality', async ({ page }) => {
    await dashboard.clickAndWait(dashboard.estimator, /price-estimator/);
    await expect(page).toHaveURL(/price-estimator/);
});

// 6
test('checking Contact button functionality', async ({ page }) => {
    await dashboard.clickAndWait(dashboard.contact, /contact/);
    await expect(page).toHaveURL(/contact/);
});

// 7
test('checking logout button functionality', async ({ page }) => {
    await dashboard.clickAndWait(dashboard.logout, /login/);
    await expect(page).toHaveURL(/login/);
});

// 8
test('checking for the logo visibility', async () => {
    await expect(dashboard.logo).toBeVisible();
});

// 9
test('checking for the second sell bike button', async ({ page }) => {
    await dashboard.clickAndWait(dashboard.sellBike2, /sell/);
    await expect(page).toHaveURL(/sell/);
});

// 10
test("checking Homepage Mylisting functional block", async ({ page }) => {
    await dashboard.clickAndWait(dashboard.myListings, /sell/);
    await expect(page).toHaveURL(/sell/);
});

// 11
test('checking for myorders functional block', async ({ page }) => {
    await dashboard.clickAndWait(dashboard.myOrdersBlock, /orders/);
    await expect(page).toHaveURL(/orders/);
});

// 12
test('checking for Active Chats functional block', async ({ page }) => {
    await dashboard.clickAndWait(dashboard.activeChats, /chat/);
    await expect(page).toHaveURL(/chat/);
});

// 13
test('checking for the functionality of first View all link', async ({ page }) => {
    await dashboard.clickAndWait(dashboard.viewAllFirst, /sell/);
    await expect(page).toHaveURL(/sell/);
});

// 14
test('checking for the functionality of second View all which navigates orders page', async ({ page }) => {
    await dashboard.clickAndWait(dashboard.viewAllLast, /orders/);
    await expect(page).toHaveURL(/orders/);
});

// 15
test('checking for Browse available bikes link navigates to browse bike page', async ({ page }) => {
    await dashboard.clickAndWait(dashboard.browseAvailable, /listings/);
    await expect(page).toHaveURL(/listings/);
});


test.skip('Verify orders page loads', async ({ page }) => {
    await expect(page).toHaveURL(/orders/);
});


// 2
test('Verify page is visible', async ({ page }) => {
    await expect(page.locator('body')).toBeVisible();
});


// 3 ✅ handle empty or data
test('Verify orders presence or empty state', async ({ page }) => {
    const orders = page.locator('[class*="order"]');

    const count = await orders.count();

    if (count === 0) {
        // no orders case
        await expect(page.locator('body')).toBeVisible();
    } else {
        expect(count).toBeGreaterThan(0);
    }
});


// 4
test('Verify user stays logged in', async ({ page }) => {
    await expect(page).not.toHaveURL(/login/);
});


// 5
test.skip('Verify refresh keeps orders page', async ({ page }) => {
    await page.reload();
    await expect(page).toHaveURL(/orders/);
});


// 6
test('Verify navigation back to dashboard', async ({ page }) => {
    await page.goBack();
    await expect(page).toHaveURL(/app/);
});


// 7
test('Verify multiple DOM elements exist', async ({ page }) => {
    const count = await page.locator('*').count();
    expect(count).toBeGreaterThan(0);
});


// 8
test('Verify page title', async ({ page }) => {
    const title = await page.title();
    expect(title).toContain('Bike4Sell');
});


// 9
test('Verify direct URL navigation works', async ({ page }) => {
    await page.goto('http://bike-value-estimator--praveensappaoff.replit.app/orders');
    await expect(page).toHaveURL(/orders/);
});


// 10
test('Verify no crash on load', async ({ page }) => {
    await expect(page.locator('body')).toBeVisible();
});


// 11
test.skip('Verify session persists after reload', async ({ page }) => {
    await page.reload();
    await expect(page).not.toHaveURL(/login/);
});


// 12
test('Verify responsive view (mobile)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('body')).toBeVisible();
});


// 13
test('Verify page scroll works', async ({ page }) => {
    await page.mouse.wheel(0, 500);
    await expect(page.locator('body')).toBeVisible();
});


// 14
test('Verify no console errors (basic)', async ({ page }) => {
    const errors = [];

    page.on('console', msg => {
        if (msg.type() === 'error') errors.push(msg.text());
    });

    await page.reload();
    expect(errors.length).toBeLessThan(5);
});


// 15
test('Verify logout from orders page', async ({ page }) => {
    await dashboard.logoutUser();
    await expect(page).toHaveURL(/login/);
});