import { test, expect } from '@playwright/test';
import users from '../../test-data/users.json';

test('API-02: Successfully fetch specific account by Account ID', async ({ request }) => {
    // Step 1: Login to get the Customer ID
    const loginResponse = await request.get(`/parabank/services/bank/login/${users.ValidUser.username}/${users.ValidUser.password}`, {
        headers: { 'Accept': 'application/json' }
    });
    const customerData = await loginResponse.json();

    // Step 2: Fetch all accounts to grab a valid Account ID
    const accountsResponse = await request.get(`/parabank/services/bank/customers/${customerData.id}/accounts`, {
        headers: { 'Accept': 'application/json' }
    });
    const accounts = await accountsResponse.json();
    const targetAccountId = accounts[0].id;

    // Step 3: Ping the API for that SPECIFIC account ID
    const singleAccountResponse = await request.get(`/parabank/services/bank/accounts/${targetAccountId}`, {
        headers: { 'Accept': 'application/json' }
    });

    // Assert the API successfully found the specific account
    expect(singleAccountResponse.ok()).toBeTruthy();
    const singleAccountData = await singleAccountResponse.json();
    
    // Verify the ID matches
    expect(singleAccountData.id).toBe(targetAccountId);
    console.log(`Successfully verified independent API lookup for Account ID: ${targetAccountId}`);
});