import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { OpenAccountPage } from '../../pages/OpenAccountPage';
import users from '../../test-data/users.json';

test('Hybrid Validation - UI Creation & API Verification', async ({ page, request }) => {
    const loginPage = new LoginPage(page);
    const accountPage = new OpenAccountPage(page);

    //frontend
    await loginPage.navigate();
    await loginPage.login(users.ValidUser.username, users.ValidUser.password);

    await accountPage.openAccount('1');
    await expect(accountPage.successHeading).toContainText('Account Opened');

    const accountIdElement = page.locator('#newAccountId');
    await accountIdElement.waitFor();
    const newAccountId = await accountIdElement.innerText();
    
    console.log(`UI successfully created Account ID: ${newAccountId}`);
    expect(newAccountId).toBeTruthy(); // Ensure it isn't blank

    //backend
    
    console.log(`Pinging backend API to verify Account ID: ${newAccountId} exists...`);

    //hit api
    const apiResponse = await request.get(`/parabank/services/bank/accounts/${newAccountId}`, {
        headers: { 'Accept': 'application/json' }
    });

    expect(apiResponse.ok()).toBeTruthy();

    const accountData = await apiResponse.json();

    
    expect(accountData.id.toString()).toBe(newAccountId);
    
    console.log('Hybrid E2E Test Passed: Frontend UI and Backend API are perfectly synced!');
});