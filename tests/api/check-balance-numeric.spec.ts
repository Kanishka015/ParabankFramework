import { test, expect } from '@playwright/test';
import users from '../../test-data/users.json';

test('API-01: Verify account balance is a valid numeric format', async ({ request }) => {
    // Step 1: Login to get the Customer ID
    const loginResponse = await request.get(`/parabank/services/bank/login/${users.ValidUser.username}/${users.ValidUser.password}`, {
        headers: { 'Accept': 'application/json' }
    });
    const customerData = await loginResponse.json();
    const customerId = customerData.id;

    // Step 2: Fetch the user's accounts
    const accountsResponse = await request.get(`/parabank/services/bank/customers/${customerId}/accounts`, {
        headers: { 'Accept': 'application/json' }
    });
    const accounts = await accountsResponse.json();
    
    // Step 3: Grab the balance of the first account
    const firstAccountBalance = accounts[0].balance;
    console.log(`Fetched Balance: $${firstAccountBalance}`);

    // Step 4: Assert the balance is a number (by checking it doesn't return 'NaN' when converted)
    const numericBalance = Number(firstAccountBalance);
    expect(isNaN(numericBalance)).toBeFalsy();
});