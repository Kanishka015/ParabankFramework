import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import users from '../../test-data/users.json';

test('KN-TC-023: Verify API Account shows up on UI', async ({ page, request }) => {
    // === PART 1: Ask the API ===
    const loginResponse = await request.get(`/parabank/services/bank/login/${users.ValidUser.username}/${users.ValidUser.password}`, {
        headers: { 'Accept': 'application/json' }
    });
    const customer = await loginResponse.json();
    
    const accountsResponse = await request.get(`/parabank/services/bank/customers/${customer.id}/accounts`, {
        headers: { 'Accept': 'application/json' }
    });
    const accountsList = await accountsResponse.json();
    
    // Save the ID we got from the API
    const apiAccountId = accountsList[0].id; 
    console.log(`Account ID from API is: ${apiAccountId}`);

    // === PART 2: Look at the UI ===
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(users.ValidUser.username, users.ValidUser.password);

    // Wait a brief moment for the Accounts Overview table to load
    await page.waitForTimeout(2000); 

    // Extract all the text physically visible on the webpage
    const pageText = await page.locator('body').innerText();
    
    // Assert that the page physically contains the API Account ID
    expect(pageText).toContain(apiAccountId.toString());
});