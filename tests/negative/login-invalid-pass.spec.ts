import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import users from '../../test-data/users.json';

test('TC-NEG-01: Login Fails with Wrong Password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Step 1: Navigate and attempt a bad login
    await loginPage.navigate();
    await loginPage.login(users.ValidUser.username, 'WrongPassword123!');

    // Step 2: ParaBank's layout completely crashes here. 
    // The only reliable proof of failure is asserting the error message was attached to the DOM.
    await expect(loginPage.errorMessage).toBeAttached();
    
    // Step 3: Prove we did not get access to the account by ensuring the "Log Out" button never appeared.
    await expect(page.locator('a[href="/parabank/logout.htm"]')).toBeHidden();
});