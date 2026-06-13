import { test, expect } from '@playwright/test';

test('TC-NEG-03: Direct URL Access Shows Error', async ({ page }) => {
    // Step 1: Try to bypass the login page
    await page.goto('/parabank/overview.htm');
    
    // Step 2: ParaBank fails to redirect the URL, but it DOES show an internal error.
    // Let's assert that the system caught the unauthorized access and threw the error text.
    await expect(page.locator('.title')).toHaveText('Error!');
    await expect(page.locator('.error')).toContainText('internal error');
    
    // Step 3: Verify the login panel is still visible on the left side, proving we are locked out
    const loginPanel = page.locator('#loginPanel');
    await expect(loginPanel).toBeVisible();
});