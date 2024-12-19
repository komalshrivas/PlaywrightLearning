import { test } from '@playwright/test';
import fs from 'fs';

let webContext;
test.beforeAll('@API Login page B2B', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  // Step 1: Navigate to login page and perform login
  await page.goto('https://b2b-platform.qa.trajector-tech.com/login');
  await page.getByTestId('input-email').fill('admin.trajectorservices@yopmail.com');
  await page.getByTestId('password-input-password').fill('Password@1');
  await page.getByTestId('Sign in-button').click();
  // Wait for dashboard to confirm successful login
  await page.waitForURL('**/dashboard');
  console.log('Login successful, on dashboard.');
  // Step 2: Dynamically capture localStorage and sessionStorage
  const localStorageData = await page.evaluate(() =>
    JSON.stringify(Object.entries(localStorage))
  );
  const sessionStorageData = await page.evaluate(() =>
    JSON.stringify(Object.entries(sessionStorage))
  );
  // Save data to JSON files
  fs.writeFileSync('localStorage.json', localStorageData);
  fs.writeFileSync('sessionStorage.json', sessionStorageData);
  console.log('LocalStorage and SessionStorage captured.');
  // Step 3: Save the storage state for cookies and localStorage
  await context.storageState({ path: 'storageState.json' });
  console.log('Storage state (cookies + localStorage) saved successfully!');
  // Step 4: Reuse storageState for the new browser context
  webContext = await browser.newContext({
    storageState: 'storageState.json',
  });
});

test('@API test with LocalStorage and SessionStorage', async () => {
  const page = await webContext.newPage();
  // Step 5: Inject sessionStorage before navigating
  const sessionData = JSON.parse(fs.readFileSync('sessionStorage.json', 'utf-8'));
  await page.addInitScript((sessionData) => {
    sessionData.forEach(([key, value]) => sessionStorage.setItem(key, value));
  }, sessionData);
  // Step 6: Navigate to the dashboard
  await page.goto('https://b2b-platform.qa.trajector-tech.com/dashboard');
  await page.waitForLoadState('networkidle');
  console.log('Navigated to the dashboard with localStorage and sessionStorage restored.');
  // Step 7: Perform actions
  await page.getByTestId('Partners-header-action').click();
  console.log('Clicked on Partners header.');
  // Perform logout
  await page.getByRole('button', { name: 'profile' }).click();
  await page.getByRole('menuitem', { name: 'Log Out' }).click();
  await page.getByTestId('Yes-button').click();
});
