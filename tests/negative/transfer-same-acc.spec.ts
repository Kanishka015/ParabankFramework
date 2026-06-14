import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { TransferFundsPage } from '../../pages/TransferFundsPage';
import users from '../../test-data/users.json';

test('Prevent Transfer to Same Account', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const transferPage = new TransferFundsPage(page);

    await loginPage.navigate();
    await loginPage.login(users.ValidUser.username, users.ValidUser.password);

    await transferPage.navigate();
        
    await transferPage.transfer('50', 0, 0);

    await expect(transferPage.successHeading).toBeHidden();
});