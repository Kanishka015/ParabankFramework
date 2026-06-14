import { test, expect } from '@playwright/test';
import users from '../../test-data/users.json';

test('Prevent API login with invalid credentials', async ({ request }) => {
    
    const response = await request.get(`/parabank/services/bank/login/${users.InvalidUser.username}/${users.InvalidUser.password}`, {
        headers: { 'Accept': 'application/json' }
    });

    expect(response.ok()).toBeFalsy();

    const responseText = await response.text();
    expect(responseText).toContain('Invalid username and/or password');
});