import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { OpenAccountPage } from '../../pages/OpenAccountPage';
import credentials from '../../test-data/users.json';

test('Create Savings Account', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const accountPage = new OpenAccountPage(page);

    await loginPage.navigate();

    await loginPage.login(
        credentials.ValidUser.username,
        credentials.ValidUser.password
    );

    await accountPage.openAccount('1');

    const message = await accountPage.getSuccessMessage();

    expect(message).toContain('Account Opened');

    await page.screenshot({ path: 'reports/screenshots/account-opened.png', fullPage: true });
});