import { test, expect } from '@playwright/test';

test('TC-PERF-02: API successfully handles standard data requests', async ({ request }) => {
    
    // Step 1: Ask the database for the customer's accounts
    const response = await request.get('/parabank/services/bank/customers/12212/accounts');
    
    // Step 2: Assert that the database replied with a "200" (Success) code
    expect(response.status()).toBe(200);
});