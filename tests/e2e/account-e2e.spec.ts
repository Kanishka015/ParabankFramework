import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { OpenAccountPage } from '../../pages/OpenAccountPage';
import { TransferFundsPage } from '../../pages/TransferFundsPage';
import users from '../../test-data/users.json';


test('Full User Account Lifecycle', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const accountPage = new OpenAccountPage(page);
    const transferPage = new TransferFundsPage(page);

    await loginPage.navigate();
    await loginPage.login(users.ValidUser.username, users.ValidUser.password);

    await accountPage.openAccount('0');
    await expect(accountPage.successHeading).toContainText('Account Opened');
  
    await page.waitForTimeout(2000);

    await transferPage.navigate();
   
    await transferPage.transfer('100', 0, 0); 
    
    await expect(transferPage.successHeading).toContainText('Transfer Complete');
   
});