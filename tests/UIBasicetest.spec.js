const { test,  expect } = require('@playwright/test');
// const { log } = require('console');
// const exp = require('constants');
 //const { promises } = require('dns');,
//     // Correctly await the context creation
//     const context = await browser.newContext();
//     const page = await context.newPage();
//     const Username = page.locator('#username') ;
//     const Password = page.locator('#password');
//     const Sign = page.locator('#signInBtn');
//     const card = page.locator('.card-body a');
//     await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
//     console.log(await page.title());
//     await page.locator('#username').fill('rahulshett');
//     await page.locator('#password').fill('learning');
//     await page.locator('#signInBtn').click();
//     //Wait locater displayed
//    console.log(await page.locator("[style*='block']").textContent());
//    await expect(page.locator("[style*='block']")).toContainText("Incorrect username/password")
//    //// Typw & Fill
//   // Login with correct credes.
//    await Username.fill('');
//    await Username.fill('rahulshettyacademy');
//    await Password.fill('learning');
//    await Sign.click();
//    console.log(await page.locator('.card-body a').first().textContent());
//    console.log(await page.locator('.card-body a').nth(1).textContent());
//    const allTitle = await card.allTextContents();
//    console.log(allTitle)
// });

// //=======(npx playwright test UIBasicetest.spec.js --debug)======================================

// //============== Handling UI Components========================================
//    test('Handling UI', async ({ page }) => {
//     await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
//     const Username = page.locator('#username') ;
//     const Sign = page.locator('#signInBtn');
//     const dropdown = page.locator('select.form-control');
//     const DocumentLink = page.locator("[href*='documents-request']");
//     await dropdown.selectOption('consult');
//    await page.locator('.radiotextsty').last().click();
//    page.locator('#okayBtn').click()
//    console.log(await page.locator('.radiotextsty').last().isChecked());
//    await expect(page.locator('.radiotextsty').last()).toBeChecked();
//    await page.locator('#terms').click();
//    await expect(page.locator('#terms')).toBeChecked();
//    await page.locator('#terms').uncheck();
//    expect(await page.locator('#terms').isChecked()).toBeFalsy();
//    await expect(DocumentLink).toHaveAttribute('class', 'blinkingtext');
// });
//=================Child Window Handel===========================================


// test('Child Window Handel', async ({ browser }) => {
   
//     const context = await browser.newContext();
//     const page = await context.newPage();
//     await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
//     const DocumentLink = page.locator("[href*='documents-request']");
//     const [newPage] = await Promise.all([

//         context.waitForEvent('page'),
//         DocumentLink.click(),
//     ])
//     const text = await newPage.locator('.red').textContent();
//     const arraytext= text.split('@')
//     const domain = arraytext[1].split(' ')[0]
//     console.log(domain);
//     await page.locator('#username').fill(domain);
  
// });


