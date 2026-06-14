import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import credentials from '../../test-data/users.json';

test('Valid login redirects to overview', async ({ page }) => {
  
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(credentials.ValidUser.username, credentials.ValidUser.password);

    await expect(page).toHaveURL(/.*overview.htm/);
});