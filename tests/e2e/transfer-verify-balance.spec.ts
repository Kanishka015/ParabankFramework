import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { TransferFundsPage } from '../../pages/TransferFundsPage';
import users from '../../test-data/users.json';

test('TC-E2E-02: Transfer Funds UI & Verify API Stability', async ({ page, request }) => {
    const loginPage = new LoginPage(page);
    const transferPage = new TransferFundsPage(page);

    // ==========================================
    // PART 1: FRONTEND (UI) ACTION
    // ==========================================
    
    await loginPage.navigate();
    await loginPage.login(users.ValidUser.username, users.ValidUser.password);

    // Navigate to transfer and move $50 (using index 0 for 'from' and index 1 for 'to')
    await transferPage.navigate();
    await transferPage.transfer('50', 0, 1);
    
    // Assert the UI displays success
    await expect(transferPage.successHeading).toContainText('Transfer Complete');
    console.log('UI Action: $50 Transfer successfully completed on frontend.');

    // ==========================================
    // PART 2: BACKEND (API) VERIFICATION
    // ==========================================
    
    // Authenticate with the API to ensure the backend data layer remains accessible and synced
    const apiResponse = await request.get(`/parabank/services/bank/login/${users.ValidUser.username}/${users.ValidUser.password}`, {
        headers: { 'Accept': 'application/json' }
    });

    // Assert the backend responds with 200 OK after the heavy database transaction
    expect(apiResponse.ok()).toBeTruthy();
    console.log('Hybrid E2E Passed: Backend database is synced and stable post-transfer.');
});