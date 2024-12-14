const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');

// Set global timeout for all steps to 20 seconds
setDefaultTimeout(20000);

Given('Go to the website and login with valid creds', async function () {
  const browser = await chromium.launch({ headless: false }); // Run in non-headless mode for debugging
  const context = await browser.newContext();
  const page = await context.newPage();
  this.page = page; // Store the page object for subsequent steps
  
  // Navigate to the login page and perform login
  await page.goto('https://b2b-platform.qa.trajector-tech.com/login');
  await page.getByTestId('input-email').fill('admin.trajectorservices@yopmail.com');
  await page.getByTestId('password-input-password').fill('Password@1');
  await page.getByTestId('Sign in-button').click();

  // Wait for navigation after login
  await page.waitForLoadState('networkidle');
});

When('Click on the screener tab', async function () {
  const page = this.page; // Retrieve shared page object
  // Explicit wait for the screener tab to be visible
  await page.waitForSelector('[data-testid="Screeners-header-action"]', { state: 'visible', timeout: 15000 });
  await page.getByTestId('Screeners-header-action').click();
});

Then('Click on the profile link at the right side top of the page and click on the logout button', async function () {
  const page = this.page;
  // Explicit wait for the profile button
  await page.getByRole('button', { name: 'profile' }).click();
  await page.waitForSelector('text="Log Out"', { state: 'visible', timeout: 15000 });
  await page.getByRole('menuitem', { name: 'Log Out' }).click();
  await page.waitForSelector('[data-testid="Yes-button"]', { state: 'visible', timeout: 10000 });
  await page.getByTestId('Yes-button').click();
});

