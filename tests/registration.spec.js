import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../POM/registrationPage';

test.beforeEach(async ({ page }) => {
  const regPage = new RegistrationPage(page);
  await regPage.navigateToLogin();
  await regPage.clickApplyNow();
});

test('Apply Now navigation', async ({ page }) => {
  const regPage = new RegistrationPage(page);
  await expect(page).toHaveURL(/register/);
});

test('Validate heading', async ({ page }) => {
  const regPage = new RegistrationPage(page);
  await regPage.verifyHeading();
});

test('Verify First Name Placeholder', async ({ page }) => {
  const regPage = new RegistrationPage(page);
  await regPage.verifyFirstNamePlaceholder();
});

test('Verify Last Name Placeholder', async ({ page }) => {
  const regPage = new RegistrationPage(page);
  await regPage.verifyLastNamePlaceholder();
});

test('Verify Lumina logo', async ({ page }) => {
  const regPage = new RegistrationPage(page);
  await regPage.verifyLuminaLogo();
});

test('Valid Email', async ({ page }) => {
  const regPage = new RegistrationPage(page);
  await regPage.fillEmail('test.user@example.com');
  await regPage.clickSubmit();
  await regPage.verifyValidEmail();
});

test('Valid Phone Number', async ({ page }) => {
  const regPage = new RegistrationPage(page);
  await regPage.fillPhone('+1 (987) 654-3210');
  await regPage.verifyValidPhone();
});

test('Valid Password', async ({ page }) => {
  const regPage = new RegistrationPage(page);
  await regPage.fillPassword('Test@1234');
  await regPage.verifyValidPassword();
});

test('Short Password Error', async ({ page }) => {
  const regPage = new RegistrationPage(page);
  await regPage.fillPassword('T@1a');
  await regPage.verifyPasswordError('At least 8 characters');
});

test('Missing Uppercase', async ({ page }) => {
  const regPage = new RegistrationPage(page);
  await regPage.fillPassword('test@1234');
  await regPage.verifyPasswordError('uppercase');
});

test('Missing Lowercase', async ({ page }) => {
  const regPage = new RegistrationPage(page);
  await regPage.fillPassword('TEST@1234');
  await regPage.verifyPasswordError('lowercase');
});

test('Missing Special Character', async ({ page }) => {
  const regPage = new RegistrationPage(page);
  await regPage.fillPassword('Test1234');
  await regPage.verifyPasswordError('special character');
});

test('Verify Submit Button Visible', async ({ page }) => {
  const regPage = new RegistrationPage(page);
  await regPage.verifySubmitButtonVisible();
});

test('Verify Button Enabled when form valid', async ({ page }) => {
  const regPage = new RegistrationPage(page);

  await regPage.fillFirstName('John');
  await regPage.fillLastName('Doe');
  await regPage.fillEmail('john@test.com');
  await regPage.fillPassword('Test@1234');

  await regPage.verifyButtonEnabled();
});

test('Verify navigation after submit', async ({ page }) => {
  const regPage = new RegistrationPage(page);

  await regPage.fillFirstName('John');
  await regPage.fillLastName('Doe');
  await regPage.fillEmail('john@test.com');
  await regPage.fillPassword('Test@1234');

  await regPage.clickSubmit();

  await expect(page).toHaveURL(/register/);
});

test('Back to Sign In navigation', async ({ page }) => {
  const regPage = new RegistrationPage(page);

  await regPage.clickBackToSignIn();

  await expect(page).toHaveURL(/login/);
});