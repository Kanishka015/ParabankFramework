import { test, expect } from '@playwright/test';
import users from '../../test-data/users.json';

test('Verify account type strings are valid', async ({ request }) => {
  
    const loginResponse = await request.get(`/parabank/services/bank/login/${users.ValidUser.username}/${users.ValidUser.password}`, {
        headers: { 'Accept': 'application/json' }
    });
    const customerData = await loginResponse.json();

    const accountsResponse = await request.get(`/parabank/services/bank/customers/${customerData.id}/accounts`, {
        headers: { 'Accept': 'application/json' }
    });
    const accounts = await accountsResponse.json();

    const accountType = accounts[0].type;
  
    expect(['CHECKING', 'SAVINGS']).toContain(accountType);
});