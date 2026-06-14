import { test, expect } from '@playwright/test';
import users from '../../test-data/users.json';

test('Successfully fetch list of accounts for customer', async ({ request }) => {
   
    const loginResponse = await request.get(`/parabank/services/bank/login/${users.ValidUser.username}/${users.ValidUser.password}`, {
        headers: { 'Accept': 'application/json' }
    });
    const customerData = await loginResponse.json();

    const accountsResponse = await request.get(`/parabank/services/bank/customers/${customerData.id}/accounts`, {
        headers: { 'Accept': 'application/json' }
    });

    expect(accountsResponse.ok()).toBeTruthy();
    const accounts = await accountsResponse.json();

    expect(Array.isArray(accounts)).toBeTruthy();
    expect(accounts.length).toBeGreaterThan(0);
});