// login.spec.js
import { test } from '@playwright/test';
import { LoginPage } from '../POM/loginPage';

test.describe('Login Page Tests', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goToLogin();
  });

  test('Verify placeholder text on Login page', async ({ page }) => {
    await loginPage.verifyPlaceholders();
  });

  test('Verify login button is visible', async ({ page }) => {
    await loginPage.verifyLoginButton();
  });

  test('Verify error messages on empty login submission', async ({ page }) => {
    await loginPage.verifyEmptySubmissionError();
  });

  test('Verify invalid login does not redirect', async ({ page }) => {
    await loginPage.verifyInvalidLogin('wrongUser', 'wrongPass');
  });

  [
    {email:"akash@gmail.com", password:"Akash@123"},
    {email:"abhinav@gmail.com", password:"Abhinav@123"},
    {email:"anjay@gmail.com", password:"Anjay@123"},
    {email:"sanjay@gmail.com", password:"Sanjay@123"},
    {email:"amith@gmail.com", password:"amith@123"}
  ].forEach(obj => {
    test(`Verify login for user ${obj.email}`, async ({ page }) => {
      await loginPage.verifySuccessfulLogin(obj.email, obj.password);
    });
  });

  test('Verify password field is masked on Login page', async ({ page }) => {
    await loginPage.verifyPasswordMasked();

    // Optional: enter value and check it's still masked
    await loginPage.passwordInput.fill('Test@1234');
    await loginPage.verifyPasswordMasked();
  });
});