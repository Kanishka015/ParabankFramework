import { test, expect } from '@playwright/test';
import users from '../../test-data/users.json';

test('Successfully fetch specific account by Account ID', async ({ request }) => {
    
    const loginResponse = await request.get(`/parabank/services/bank/login/${users.ValidUser.username}/${users.ValidUser.password}`, {
        headers: { 'Accept': 'application/json' }
    });
    const customerData = await loginResponse.json();

    const accountsResponse = await request.get(`/parabank/services/bank/customers/${customerData.id}/accounts`, {
        headers: { 'Accept': 'application/json' }
    });
    const accounts = await accountsResponse.json();
    const targetAccountId = accounts[0].id;

    const singleAccountResponse = await request.get(`/parabank/services/bank/accounts/${targetAccountId}`, {
        headers: { 'Accept': 'application/json' }
    });

    expect(singleAccountResponse.ok()).toBeTruthy();
    const singleAccountData = await singleAccountResponse.json();
    
    expect(singleAccountData.id).toBe(targetAccountId);
    console.info(`Successfully verified independent API lookup for Account ID: ${targetAccountId}`);
});