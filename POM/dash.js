import { expect } from '@playwright/test';

export class DashboardPage {
    constructor(page) {
        this.page = page;

        //  Login عناصر
        this.emailInput = page.getByRole('textbox', { name: 'you@example.com' });
        this.passwordInput = page.locator('[name="password"]');
        this.signInBtn = page.getByRole('button', { name: /sign in/i });

        //  Navbar
        this.sellBike = page.getByText("Sell Bike").first();
        this.browseBike = page.getByText("Browse Bikes");
        this.myOrders = page.getByText("My Orders").first();
        this.messages = page.getByText("Messages");
        this.estimator = page.locator('//*[@id="root"]/div[1]/header/div/nav/a[6]');
        this.contact = page.locator('//*[@id="root"]/div[1]/header/div/nav/a[7]');

        //  Logout
        this.logout = page.locator('.lucide-log-out');

        //  Logo
        this.logo = page.getByText("Bike4Sell").first();

        //  Home Page Blocks
        this.sellBike2 = page.getByText("Sell Bike").last();
        this.myListings = page.getByText("My Listings");
        this.myOrdersBlock = page.getByText("My Orders").nth(1);
        this.activeChats = page.getByText("Active Chats");
        this.viewAllFirst = page.getByText("View all").first();
        this.viewAllLast = page.getByText("View all").last();
        this.browseAvailable = page.getByText("Browse available bikes");
    }

    //  Navigate to site
    async goto() {
        await this.page.goto("http://bike-value-estimator--praveensappaoff.replit.app/");
    }

    
    //  Login method
    async login(email, password) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);

        await Promise.all([
            this.page.waitForURL(/app/),
            this.signInBtn.click()
        ]);
    }

    //  Generic click + wait (stable)
    async clickAndWait(element, url) {
        await expect(element).toBeVisible();

        await Promise.all([
            this.page.waitForURL(url),
            element.click()
        ]);
    }

    //  Only click (no navigation)
    async clickOnly(element) {
        await expect(element).toBeVisible();
        await element.click();
    }

    //  Logout action
    async logoutUser() {
        await Promise.all([
            this.page.waitForURL(/login/),
            this.logout.click()
        ]);
    }
}