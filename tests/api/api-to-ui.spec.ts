import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import users from '../../test-data/users.json';

test('Verify API Account shows up on UI', async ({ page, request }) => {
  
    const loginResponse = await request.get(`/parabank/services/bank/login/${users.ValidUser.username}/${users.ValidUser.password}`, {
        headers: { 'Accept': 'application/json' }
    });
    const customer = await loginResponse.json();
    
    const accountsResponse = await request.get(`/parabank/services/bank/customers/${customer.id}/accounts`, {
        headers: { 'Accept': 'application/json' }
    });
    const accountsList = await accountsResponse.json();
    
    const apiAccountId = accountsList[0].id; 
    console.log(`Account ID from API is: ${apiAccountId}`);

    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(users.ValidUser.username, users.ValidUser.password);

    await page.waitForTimeout(2000); 

    const pageText = await page.locator('body').innerText();
   
    expect(pageText).toContain(apiAccountId.toString());
});