import { test, expect } from '@playwright/test';
import users from '../../test-data/users.json';

test('API-NEG-01: Prevent API login with invalid credentials', async ({ request }) => {
    // Hit the login API directly with the bad user data from your JSON file
    const response = await request.get(`/parabank/services/bank/login/${users.InvalidUser.username}/${users.InvalidUser.password}`, {
        headers: { 'Accept': 'application/json' }
    });

    // Verify the server rejects the request (Status code should NOT be 200 OK)
    expect(response.ok()).toBeFalsy();

    // ParaBank returns a raw error string when auth fails, so we read the text and assert
    const responseText = await response.text();
    expect(responseText).toContain('Invalid username and/or password');
});