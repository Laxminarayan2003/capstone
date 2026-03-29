// studentPortal.spec.js
import { test, expect } from '@playwright/test';
import { StudentPortalPage } from '../POM/studentPortalPage';

test.describe('Student Portal Tests', () => {

  let studentPortal;

  test.beforeEach(async ({ page }) => {
    studentPortal = new StudentPortalPage(page);
    await studentPortal.login('vinay@ibm.com', 'Vinay@123');
  });

  test('Verify user navigates to Dashboard after valid login', async () => {
    await expect(studentPortal.dashboardHeading).toBeVisible();
    await expect(studentPortal.page).toHaveURL('https://edu-admin-hub--laxminarayanr.replit.app/dashboard');
  });

  test('Verify navbar elements', async () => {
    await expect(studentPortal.navDashboard).toBeVisible();
    await expect(studentPortal.navCourses).toBeVisible();
    await expect(studentPortal.navCart).toBeVisible();
    await expect(studentPortal.logoutButton).toBeVisible();
  });

  test('Verify clicking "Browse more" navigates to Courses page', async () => {
    await studentPortal.clickBrowseMore();
    await expect(studentPortal.page).toHaveURL('https://edu-admin-hub--laxminarayanr.replit.app/courses');
    await expect(studentPortal.coursesHeading).toBeVisible();
  });

  test('Verify Save Changes button is visible after clicking Edit', async () => {
    await studentPortal.clickEdit();
    await expect(studentPortal.saveChangesButton).toBeVisible();
  });

  test('Verify Recent Payments section is visible and clickable', async () => {
    await studentPortal.goToDashboard();
    await expect(studentPortal.recentPaymentsText).toBeVisible();
    await studentPortal.clickRecentPayments();
  });

  test('Verify Welcome back message is displayed on dashboard', async () => {
    await studentPortal.goToDashboard();
    await expect(studentPortal.welcomeText).toBeVisible();
  });

});