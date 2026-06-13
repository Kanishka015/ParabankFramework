import { test, expect } from '@playwright/test';
import users from '../../test-data/users.json';
import { console } from 'inspector/promises';

test('KN-TC-019: API Response Time is under 2 seconds', async ({ request }) => {
    const startTime = Date.now();
    
    const response = await request.get(`/parabank/services/bank/login/${users.ValidUser.username}/${users.ValidUser.password}`, {
        headers: { 'Accept': 'application/json' }
    });
    
    const endTime = Date.now();
    const timeTaken = endTime - startTime;
    
    console.log(`API took ${timeTaken} milliseconds`);

    expect(response.status()).toBe(200);
    expect(timeTaken).toBeLessThan(2000);
});