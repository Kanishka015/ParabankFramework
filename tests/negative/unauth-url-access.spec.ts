import { test, expect } from '@playwright/test';

test('Direct URL Access Shows Error', async ({ page }) => {
    
    await page.goto('/parabank/overview.htm');
    
    await expect(page.locator('.title')).toHaveText('Error!');
    await expect(page.locator('.error')).toContainText('internal error');
   
    const loginPanel = page.locator('#loginPanel');
    await expect(loginPanel).toBeVisible();
});