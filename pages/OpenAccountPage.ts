import { Page, Locator } from '@playwright/test';

export class OpenAccountPage {
    page: Page;
    openAccountLink: Locator;
    accountTypeDropdown: Locator;
    openNewAccountButton: Locator;
    successHeading: Locator;

    constructor(page: Page) {
        this.page = page;
        this.openAccountLink = page.locator('a:has-text("Open New Account")');
        this.accountTypeDropdown = page.locator('#type');
        this.openNewAccountButton = page.locator('input[value="Open New Account"]');
        this.successHeading = page.locator('#openAccountResult h1');
    }

    async openAccount(typeValue: string) {
        await this.openAccountLink.click();
        await this.page.waitForTimeout(1000); 
        await this.accountTypeDropdown.selectOption(typeValue);
        await this.openNewAccountButton.click();
    }

    async getSuccessMessage() {
        return await this.successHeading.innerText();
    }
}