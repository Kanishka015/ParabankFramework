import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { OpenAccountPage } from '../../pages/OpenAccountPage';
import users from '../../test-data/users.json';

test('TC-E2E-01: Hybrid Validation - UI Creation & API Verification', async ({ page, request }) => {
    const loginPage = new LoginPage(page);
    const accountPage = new OpenAccountPage(page);

    // ==========================================
    // PART 1: FRONTEND (UI) ACTION
    // ==========================================
    
    // Log in
    await loginPage.navigate();
    await loginPage.login(users.ValidUser.username, users.ValidUser.password);

    // Create a new Savings account ('1' is the value for Savings)
    await accountPage.openAccount('1');
    await expect(accountPage.successHeading).toContainText('Account Opened');

    // Extract the dynamically generated Account ID from the screen
    // ParaBank puts the new ID inside an element with the id 'newAccountId'
    const accountIdElement = page.locator('#newAccountId');
    await accountIdElement.waitFor();
    const newAccountId = await accountIdElement.innerText();
    
    console.log(`UI successfully created Account ID: ${newAccountId}`);
    expect(newAccountId).toBeTruthy(); // Ensure it isn't blank

    // ==========================================
    // PART 2: BACKEND (API) VERIFICATION
    // ==========================================
    
    console.log(`Pinging backend API to verify Account ID: ${newAccountId} exists...`);

    // Hit the ParaBank API to look up that specific account
    const apiResponse = await request.get(`/parabank/services/bank/accounts/${newAccountId}`, {
        headers: { 'Accept': 'application/json' }
    });

    // Assert that the database successfully found it (Status 200 OK)
    expect(apiResponse.ok()).toBeTruthy();

    // Parse the JSON response from the database
    const accountData = await apiResponse.json();

    // Final Assertion: Does the ID in the database match the ID from the UI?
    expect(accountData.id.toString()).toBe(newAccountId);
    
    console.log('Hybrid E2E Test Passed: Frontend UI and Backend API are perfectly synced!');
});