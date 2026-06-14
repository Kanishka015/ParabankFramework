import { test, expect } from '@playwright/test';

test('Prevent access to non-existent customer accounts', async ({ request }) => {
    const fakeCustomerId = '99999999';
   
    const response = await request.get(`/parabank/services/bank/customers/${fakeCustomerId}/accounts`, {
        headers: { 'Accept': 'application/json' }
    });

    expect(response.ok()).toBeFalsy();
    
    const responseText = await response.text();
    expect(responseText).toContain('Could not find customer');
});