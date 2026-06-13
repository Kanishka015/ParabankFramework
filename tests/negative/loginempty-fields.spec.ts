import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test('TC-NEG-02: Empty credentials stays on login page', async ({ page }) => {
    // Step 1: Initialize the Page Object
    const loginPage = new LoginPage(page);

    // Step 2: Navigate and try to login with blank strings
    await loginPage.navigate();
    await loginPage.login("", "");

    // Step 3: Assert the expected failure results
    // We expect the error message to be visible on the screen
    await expect(loginPage.errorMessage).toBeVisible();
    
    // We expect the URL to NOT change to the overview page
    await expect(page).not.toHaveURL(/.*overview.htm/);
});