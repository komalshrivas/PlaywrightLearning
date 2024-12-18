const { test, expect } = require('@playwright/test');
test('@Web Client App login', async ({ page }) => {
    //js file- Login js, DashboardPage
    const email = "komalshrivas@yopmail.com"; // Define globel
   // const productName = 'zara coat 3'; // Define globel
   // const products = page.locator(".card-body"); // Define globel
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Password@1");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles); 
  
 })
test('@B2B login', async ({ page }) => {
    //js file- Login js, DashboardPage
    await page.goto('https://b2b-platform.qa.trajector-tech.com/login');
    await page.getByTestId('input-email').click();
    await page.getByTestId('input-email').fill('admin.trajectorservices@yopmail.com');
    await page.getByTestId('password-input-password').click();
    await page.getByTestId('password-input-password').fill('Password@1');
    await page.getByTestId('Sign in-button').click();
    await page.getByTestId('Screeners-header-action').click();
    await page.getByTestId('Add New Intake Screener-button').click();
 });