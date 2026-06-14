import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test('Empty credentials stays on login page', async ({ page }) => {
    
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.login("", "");
    
    await expect(loginPage.errorMessage).toBeVisible();
    
    await expect(page).not.toHaveURL(/.*overview.htm/);
});