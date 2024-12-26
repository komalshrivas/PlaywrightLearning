const { test, expect } = require('@playwright/test');

// UI Test Case

test('UI Test for Login and Card Titles', async ({ browser }) => {
    // Create a new browser context and page
    const context = await browser.newContext();
    const page = await context.newPage();
    const Username = page.locator('#username');
    const Password = page.locator('#password');
    const Sign = page.locator('#signInBtn');
    const card = page.locator('.card-body a');
    // Navigate to the login page
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    // Log page title
    console.log(await page.title());
    // Attempt login with incorrect credentials
    await Username.fill('rahulshetty');
    await Password.fill('learning');
    await Sign.click();
    // Wait for the error message and verify it
    const errorMessage = page.locator("[style*='block']");
    await expect(errorMessage).toContainText('Incorrect username/password');
    console.log(await errorMessage.textContent());
    // Login with correct credentials
    await Username.fill('rahulshettyacademy');
    await Password.fill('learning');
    await Sign.click();
    // Verify card titles
    console.log(await card.first().textContent());
    console.log(await card.nth(1).textContent());
    // Capture all card titles
    const allTitles = await card.allTextContents();
    console.log(allTitles);
    // Close the context
    await context.close();
});

//=======(npx playwright test UIBasicetest.spec.js --debug)======================================

// //============== Handling UI Components========================================
   test('Handling UI', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const Username = page.locator('#username') ;
    const Sign = page.locator('#signInBtn');
    const dropdown = page.locator('select.form-control');
    const DocumentLink = page.locator("[href*='documents-request']");
    await dropdown.selectOption('consult');
   await page.locator('.radiotextsty').last().click();
   page.locator('#okayBtn').click()
   console.log(await page.locator('.radiotextsty').last().isChecked());
   await expect(page.locator('.radiotextsty').last()).toBeChecked();
   await page.locator('#terms').click();
   await expect(page.locator('#terms')).toBeChecked();
   await page.locator('#terms').uncheck();
   expect(await page.locator('#terms').isChecked()).toBeFalsy();
   await expect(DocumentLink).toHaveAttribute('class', 'blinkingText');
});
//=================Child Window Handel===========================================


test('Child Window Handel', async ({ browser }) => {
   
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const DocumentLink = page.locator("[href*='documents-request']");
    const [newPage] = await Promise.all([

        context.waitForEvent('page'),
        DocumentLink.click(),
    ])
    const text = await newPage.locator('.red').textContent();
    const arraytext= text.split('@')
    const domain = arraytext[1].split(' ')[0]
    console.log(domain);
    await page.locator('#username').fill(domain);
  
});


