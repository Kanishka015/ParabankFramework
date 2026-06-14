import { test, expect } from '@playwright/test';
import users from '../../test-data/users.json';

test('Validate Account API Schema Fields', async ({ request }) => {
  
    const loginResponse = await request.get(`/parabank/services/bank/login/${users.ValidUser.username}/${users.ValidUser.password}`, {
        headers: { 'Accept': 'application/json' }
    });
    const customer = await loginResponse.json();

    const accountsResponse = await request.get(`/parabank/services/bank/customers/${customer.id}/accounts`, {
        headers: { 'Accept': 'application/json' }
    });
    const accountsList = await accountsResponse.json();
    const firstAccount = accountsList[0];
    
    expect(firstAccount).toHaveProperty('id');
    expect(firstAccount).toHaveProperty('customerId');
    expect(firstAccount).toHaveProperty('type');
    expect(firstAccount).toHaveProperty('balance');
});