import { test, expect } from '@playwright/test';
import users from '../../test-data/users.json';

test('API-04: Verify account type strings are valid', async ({ request }) => {
    // Login
    const loginResponse = await request.get(`/parabank/services/bank/login/${users.ValidUser.username}/${users.ValidUser.password}`, {
        headers: { 'Accept': 'application/json' }
    });
    const customerData = await loginResponse.json();

    // Fetch accounts
    const accountsResponse = await request.get(`/parabank/services/bank/customers/${customerData.id}/accounts`, {
        headers: { 'Accept': 'application/json' }
    });
    const accounts = await accountsResponse.json();

    // Check the first account's type
    const accountType = accounts[0].type;
    
    // Assert that the type is one of the strictly allowed banking values
    expect(['CHECKING', 'SAVINGS']).toContain(accountType);
});