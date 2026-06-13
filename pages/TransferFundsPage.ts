import { Page, Locator } from '@playwright/test';

export class TransferFundsPage {
    page: Page;
    amountInput: Locator;
    fromAccountDropdown: Locator;
    toAccountDropdown: Locator;
    transferButton: Locator;
    successHeading: Locator;

    constructor(page: Page) {
        this.page = page;
        this.amountInput = page.locator('input#amount');
        this.fromAccountDropdown = page.locator('select#fromAccountId');
        this.toAccountDropdown = page.locator('select#toAccountId');
        this.transferButton = page.locator('input[value="Transfer"]');
        this.successHeading = page.locator('#showResult h1'); // The element that says "Transfer Complete"
    }

    async navigate() {
        await this.page.goto('/parabank/transfer.htm');
        await this.page.waitForTimeout(2000); // Give ParaBank a second to load the account dropdowns
    }

    async transfer(amount: string, fromIndex: number, toIndex: number) {
        await this.amountInput.fill(amount);
        await this.fromAccountDropdown.selectOption({ index: fromIndex });
        await this.toAccountDropdown.selectOption({ index: toIndex });
        await this.transferButton.click();
    }
} 