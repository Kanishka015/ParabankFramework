import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { OpenAccountPage } from '../../pages/OpenAccountPage';
import credentials from '../../test-data/users.json';

test('TC-AC-UI-01: Create Checking Account', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const accountPage = new OpenAccountPage(page);

    await loginPage.navigate();
    await loginPage.login(
        credentials.ValidUser.username,
        credentials.ValidUser.password
    );

    // Using the new unified method! '0' = Checking
    await accountPage.openAccount('0');

    const message = await accountPage.getSuccessMessage();
    expect(message).toContain('Account Opened');
});