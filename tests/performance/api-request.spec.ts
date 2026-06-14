import { test, expect } from '@playwright/test';

test('API successfully handles standard data requests', async ({ request }) => {
    
    const response = await request.get('/parabank/services/bank/customers/12212/accounts');
    
    expect(response.status()).toBe(200);
});