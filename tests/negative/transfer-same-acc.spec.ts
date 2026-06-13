import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { TransferFundsPage } from '../../pages/TransferFundsPage';
import users from '../../test-data/users.json';

test('KN-TC-025: Prevent Transfer to Same Account', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const transferPage = new TransferFundsPage(page);

    await loginPage.navigate();
    await loginPage.login(users.ValidUser.username, users.ValidUser.password);

    await transferPage.navigate();
    
    // Step 2: Use index 0 for both the 'From' and 'To' dropdowns
    await transferPage.transfer('50', 0, 0);

    // Step 3: Verify the success message is hidden because the transfer is invalid
    await expect(transferPage.successHeading).toBeHidden();
});