import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import users from '../../test-data/users.json';

test('Login Fails with Wrong Password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.login(users.ValidUser.username, 'WrongPassword123!');

    await expect(loginPage.errorMessage).toBeAttached();
    
    await expect(page.locator('a[href="/parabank/logout.htm"]')).toBeHidden();
});