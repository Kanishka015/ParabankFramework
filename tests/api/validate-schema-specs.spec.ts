import { test, expect } from '@playwright/test';
import users from '../../test-data/users.json';

test('KN-TC-021: Validate Account API Schema Fields', async ({ request }) => {
    // 1. Get the Customer ID
    const loginResponse = await request.get(`/parabank/services/bank/login/${users.ValidUser.username}/${users.ValidUser.password}`, {
        headers: { 'Accept': 'application/json' }
    });
    const customer = await loginResponse.json();

    // 2. Get the Accounts List
    const accountsResponse = await request.get(`/parabank/services/bank/customers/${customer.id}/accounts`, {
        headers: { 'Accept': 'application/json' }
    });
    const accountsList = await accountsResponse.json();
    
    // 3. Look at the very first account in the array
    const firstAccount = accountsList[0];

    // 4. Verify it has the exact fields (schema) we expect
    expect(firstAccount).toHaveProperty('id');
    expect(firstAccount).toHaveProperty('customerId');
    expect(firstAccount).toHaveProperty('type');
    expect(firstAccount).toHaveProperty('balance');
});