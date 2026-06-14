import { test, expect } from '@playwright/test';
import users from '../../test-data/users.json';

test('Verify account balance is a valid numeric format', async ({ request }) => {
 
    const loginResponse = await request.get(`/parabank/services/bank/login/${users.ValidUser.username}/${users.ValidUser.password}`, {
        headers: { 'Accept': 'application/json' }
    });
    const customerData = await loginResponse.json();
    const customerId = customerData.id;

    const accountsResponse = await request.get(`/parabank/services/bank/customers/${customerId}/accounts`, {
        headers: { 'Accept': 'application/json' }
    });
    const accounts = await accountsResponse.json();
    
    const firstAccountBalance = accounts[0].balance;
    console.info(`Fetched Balance: $${firstAccountBalance}`);

    const numericBalance = Number(firstAccountBalance);
    expect(isNaN(numericBalance)).toBeFalsy();
});