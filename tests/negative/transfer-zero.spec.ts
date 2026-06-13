import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { TransferFundsPage } from '../../pages/TransferFundsPage';
import users from '../../test-data/users.json';

test('KN-TC-024: Prevent Transferring Zero Amount', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const transferPage = new TransferFundsPage(page);

    // Step 1: Log in
    await loginPage.navigate();
    await loginPage.login(users.ValidUser.username, users.ValidUser.password);

    // Step 2: Try to transfer $0
    await transferPage.navigate();
    await transferPage.transfer('0', 0, 1);

    // Step 3: Verify the success message is hidden because the transfer should fail
    await expect(transferPage.successHeading).toBeHidden();
});