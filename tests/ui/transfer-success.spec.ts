import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { TransferFundsPage } from '../../pages/TransferFundsPage';
import users from '../../test-data/users.json';

test('TC-TF-UI-01: Transfer Funds Successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const transferPage = new TransferFundsPage(page);

    // Step 1: Log in
    await loginPage.navigate();
    await loginPage.login(users.ValidUser.username, users.ValidUser.password);

    // Step 2: Navigate to Transfer Funds page
    await transferPage.navigate();
    
    // Step 3: Transfer $50 from the first account (index 0) to the second account (index 1)
    await transferPage.transfer('50', 0, 1);

    
    await expect(transferPage.successHeading).toContainText('Transfer Complete');
});