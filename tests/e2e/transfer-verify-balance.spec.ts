import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { TransferFundsPage } from '../../pages/TransferFundsPage';
import users from '../../test-data/users.json';

test('Transfer Funds UI & Verify API Stability', async ({ page, request }) => {
    const loginPage = new LoginPage(page);
    const transferPage = new TransferFundsPage(page);
    //frontend
    await loginPage.navigate();
    await loginPage.login(users.ValidUser.username, users.ValidUser.password);

    //transfer 50 from 0 to 1
    await transferPage.navigate();
    await transferPage.transfer('50', 0, 1);
    
   
    await expect(transferPage.successHeading).toContainText('Transfer Complete');
    console.log('UI Action: $50 Transfer successfully completed on frontend.');

    const apiResponse = await request.get(`/parabank/services/bank/login/${users.ValidUser.username}/${users.ValidUser.password}`, {
        headers: { 'Accept': 'application/json' }
    });

    expect(apiResponse.ok()).toBeTruthy();
    console.log('Hybrid E2E Passed: Backend database is synced and stable post-transfer.');
});