import { test, expect } from '@playwright/test';
import users from '../../test-data/users.json';

test('API-03: Successfully fetch list of accounts for customer', async ({ request }) => {
    // Login
    const loginResponse = await request.get(`/parabank/services/bank/login/${users.ValidUser.username}/${users.ValidUser.password}`, {
        headers: { 'Accept': 'application/json' }
    });
    const customerData = await loginResponse.json();

    // Fetch accounts
    const accountsResponse = await request.get(`/parabank/services/bank/customers/${customerData.id}/accounts`, {
        headers: { 'Accept': 'application/json' }
    });

    expect(accountsResponse.ok()).toBeTruthy();
    const accounts = await accountsResponse.json();

    // Assert that the response is formatted as an Array, and it isn't empty
    expect(Array.isArray(accounts)).toBeTruthy();
    expect(accounts.length).toBeGreaterThan(0);
});