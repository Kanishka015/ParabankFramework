import { test, expect } from '@playwright/test';

test('API-NEG-02: Prevent access to non-existent customer accounts', async ({ request }) => {
    const fakeCustomerId = '99999999';
    
    // Step 1: Ask the backend for accounts belonging to a fake user
    const response = await request.get(`/parabank/services/bank/customers/${fakeCustomerId}/accounts`, {
        headers: { 'Accept': 'application/json' }
    });

    // Step 2: Ensure the API rejects the request
    expect(response.ok()).toBeFalsy();
    
    // Step 3: Verify the exact error message
    const responseText = await response.text();
    expect(responseText).toContain('Could not find customer');
});