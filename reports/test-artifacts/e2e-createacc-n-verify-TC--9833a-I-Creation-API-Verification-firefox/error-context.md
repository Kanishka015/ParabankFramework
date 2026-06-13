# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e\createacc-n-verify.spec.ts >> TC-E2E-01: Hybrid Validation - UI Creation & API Verification
- Location: tests\e2e\createacc-n-verify.spec.ts:6:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: apiRequestContext.get: Target page, context or browser has been closed
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - generic [ref=e3]:
      - link:
        - /url: admin.htm
        - img [ref=e4] [cursor=pointer]
      - link "ParaBank":
        - /url: index.htm
        - img "ParaBank" [ref=e5] [cursor=pointer]
      - paragraph [ref=e6]: Experience the difference
    - generic [ref=e7]:
      - list [ref=e8]:
        - listitem [ref=e9]: Solutions
        - listitem [ref=e10]:
          - link "About Us" [ref=e11] [cursor=pointer]:
            - /url: about.htm
        - listitem [ref=e12]:
          - link "Services" [ref=e13] [cursor=pointer]:
            - /url: services.htm
        - listitem [ref=e14]:
          - link "Products" [ref=e15] [cursor=pointer]:
            - /url: http://www.parasoft.com/jsp/products.jsp
        - listitem [ref=e16]:
          - link "Locations" [ref=e17] [cursor=pointer]:
            - /url: http://www.parasoft.com/jsp/pr/contacts.jsp
        - listitem [ref=e18]:
          - link "Admin Page" [ref=e19] [cursor=pointer]:
            - /url: admin.htm
      - list [ref=e20]:
        - listitem [ref=e21]:
          - link "home" [ref=e22] [cursor=pointer]:
            - /url: index.htm
        - listitem [ref=e23]:
          - link "about" [ref=e24] [cursor=pointer]:
            - /url: about.htm
        - listitem [ref=e25]:
          - link "contact" [ref=e26] [cursor=pointer]:
            - /url: contact.htm
    - generic [ref=e27]:
      - generic [ref=e28]:
        - paragraph [ref=e29]: Welcome John Smith
        - heading "Account Services" [level=2] [ref=e30]
        - list [ref=e31]:
          - listitem [ref=e32]:
            - link "Open New Account" [ref=e33] [cursor=pointer]:
              - /url: openaccount.htm
          - listitem [ref=e34]:
            - link "Accounts Overview" [ref=e35] [cursor=pointer]:
              - /url: overview.htm
          - listitem [ref=e36]:
            - link "Transfer Funds" [ref=e37] [cursor=pointer]:
              - /url: transfer.htm
          - listitem [ref=e38]:
            - link "Bill Pay" [ref=e39] [cursor=pointer]:
              - /url: billpay.htm
          - listitem [ref=e40]:
            - link "Find Transactions" [ref=e41] [cursor=pointer]:
              - /url: findtrans.htm
          - listitem [ref=e42]:
            - link "Update Contact Info" [ref=e43] [cursor=pointer]:
              - /url: updateprofile.htm
          - listitem [ref=e44]:
            - link "Request Loan" [ref=e45] [cursor=pointer]:
              - /url: requestloan.htm
          - listitem [ref=e46]:
            - link "Log Out" [ref=e47] [cursor=pointer]:
              - /url: logout.htm
      - generic [ref=e50]:
        - heading "Account Opened!" [level=1] [ref=e51]
        - paragraph [ref=e52]: Congratulations, your account is now open.
        - paragraph [ref=e53]:
          - text: "Your new account number:"
          - link "21780" [ref=e54] [cursor=pointer]:
            - /url: activity.htm?id=21780
  - generic [ref=e56]:
    - list [ref=e57]:
      - listitem [ref=e58]:
        - link "Home" [ref=e59] [cursor=pointer]:
          - /url: index.htm
        - text: "|"
      - listitem [ref=e60]:
        - link "About Us" [ref=e61] [cursor=pointer]:
          - /url: about.htm
        - text: "|"
      - listitem [ref=e62]:
        - link "Services" [ref=e63] [cursor=pointer]:
          - /url: services.htm
        - text: "|"
      - listitem [ref=e64]:
        - link "Products" [ref=e65] [cursor=pointer]:
          - /url: http://www.parasoft.com/jsp/products.jsp
        - text: "|"
      - listitem [ref=e66]:
        - link "Locations" [ref=e67] [cursor=pointer]:
          - /url: http://www.parasoft.com/jsp/pr/contacts.jsp
        - text: "|"
      - listitem [ref=e68]:
        - link "Forum" [ref=e69] [cursor=pointer]:
          - /url: http://forums.parasoft.com/
        - text: "|"
      - listitem [ref=e70]:
        - link "Site Map" [ref=e71] [cursor=pointer]:
          - /url: sitemap.htm
        - text: "|"
      - listitem [ref=e72]:
        - link "Contact Us" [ref=e73] [cursor=pointer]:
          - /url: contact.htm
    - paragraph [ref=e74]: © Parasoft. All rights reserved.
    - list [ref=e75]:
      - listitem [ref=e76]: "Visit us at:"
      - listitem [ref=e77]:
        - link "www.parasoft.com" [ref=e78] [cursor=pointer]:
          - /url: http://www.parasoft.com/
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { LoginPage } from '../../pages/LoginPage';
  3  | import { OpenAccountPage } from '../../pages/OpenAccountPage';
  4  | import users from '../../test-data/users.json';
  5  | 
  6  | test('TC-E2E-01: Hybrid Validation - UI Creation & API Verification', async ({ page, request }) => {
  7  |     const loginPage = new LoginPage(page);
  8  |     const accountPage = new OpenAccountPage(page);
  9  | 
  10 |     // ==========================================
  11 |     // PART 1: FRONTEND (UI) ACTION
  12 |     // ==========================================
  13 |     
  14 |     // Log in
  15 |     await loginPage.navigate();
  16 |     await loginPage.login(users.ValidUser.username, users.ValidUser.password);
  17 | 
  18 |     // Create a new Savings account ('1' is the value for Savings)
  19 |     await accountPage.openAccount('1');
  20 |     await expect(accountPage.successHeading).toContainText('Account Opened');
  21 | 
  22 |     // Extract the dynamically generated Account ID from the screen
  23 |     // ParaBank puts the new ID inside an element with the id 'newAccountId'
  24 |     const accountIdElement = page.locator('#newAccountId');
  25 |     await accountIdElement.waitFor();
  26 |     const newAccountId = await accountIdElement.innerText();
  27 |     
  28 |     console.log(`UI successfully created Account ID: ${newAccountId}`);
  29 |     expect(newAccountId).toBeTruthy(); // Ensure it isn't blank
  30 | 
  31 |     // ==========================================
  32 |     // PART 2: BACKEND (API) VERIFICATION
  33 |     // ==========================================
  34 |     
  35 |     console.log(`Pinging backend API to verify Account ID: ${newAccountId} exists...`);
  36 | 
  37 |     // Hit the ParaBank API to look up that specific account
> 38 |     const apiResponse = await request.get(`/parabank/services/bank/accounts/${newAccountId}`, {
     |                                       ^ Error: apiRequestContext.get: Target page, context or browser has been closed
  39 |         headers: { 'Accept': 'application/json' }
  40 |     });
  41 | 
  42 |     // Assert that the database successfully found it (Status 200 OK)
  43 |     expect(apiResponse.ok()).toBeTruthy();
  44 | 
  45 |     // Parse the JSON response from the database
  46 |     const accountData = await apiResponse.json();
  47 | 
  48 |     // Final Assertion: Does the ID in the database match the ID from the UI?
  49 |     expect(accountData.id.toString()).toBe(newAccountId);
  50 |     
  51 |     console.log('Hybrid E2E Test Passed: Frontend UI and Backend API are perfectly synced!');
  52 | });
```