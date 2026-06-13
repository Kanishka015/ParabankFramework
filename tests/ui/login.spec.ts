import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import credentials from '../../test-data/users.json';

test('TC-LOGIN-01: Valid login redirects to overview', async ({ page }) => {
    //  Init Page Object
    const loginPage = new LoginPage(page);

    
    await loginPage.navigate();
    await loginPage.login(credentials.ValidUser.username, credentials.ValidUser.password);

    
    // should contain overview
    await expect(page).toHaveURL(/.*overview.htm/);
});