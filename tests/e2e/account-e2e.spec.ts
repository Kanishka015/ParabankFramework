import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { OpenAccountPage } from '../../pages/OpenAccountPage';
import { TransferFundsPage } from '../../pages/TransferFundsPage';
import users from '../../test-data/users.json';

test('TC-E2E-03: Full User Account Lifecycle', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const accountPage = new OpenAccountPage(page);
    const transferPage = new TransferFundsPage(page);

    // Step 1: Secure Login
    await loginPage.navigate();
    await loginPage.login(users.ValidUser.username, users.ValidUser.password);

    // Step 2: Create a New Checking Account ('0')
    await accountPage.openAccount('0');
    await expect(accountPage.successHeading).toContainText('Account Opened');
    
    // Step 3: Wait a brief moment for the database to register the new account
    await page.waitForTimeout(2000);

    // Step 4: Transfer Initial Funding
    await transferPage.navigate();
    // Transfer $100 into the newly created account
    await transferPage.transfer('100', 0, 0); 
    
    // Final Assertion
    await expect(transferPage.successHeading).toContainText('Transfer Complete');
    console.log('Full Lifecycle E2E Passed: Login -> Create Account -> Fund Account.');
});