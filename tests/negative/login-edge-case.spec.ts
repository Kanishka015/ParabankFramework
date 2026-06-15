import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.skip('Login with Emojis (Blocked: Defect P1 - Auth Bypass)', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    
    await loginPage.login('😎', '12345');
    
    await expect(loginPage.errorMessage).toHaveText('Invalid username and/or password');
});