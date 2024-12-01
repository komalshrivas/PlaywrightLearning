import { test, expect } from '@playwright/test';
import fs from 'fs';
let webContext;

test.beforeAll('@API Login page B2B', async ({ browser }) => {
   
    const context = await browser.newContext();
    const page = await context.newPage();
  await page.goto('https://b2b-platform.qa.trajector-tech.com/login');
  await page.getByTestId('input-email').click();
  await page.getByTestId('input-email').fill('admin.trajectorservices@yopmail.com');
  await page.getByTestId('password-input-password').click();
  await page.getByTestId('password-input-password').fill('Password@1');
  await page.getByTestId('Sign in-button').click();
  await context.storageState({path: 'storageState.json'});
  webContext = await browser.newContext({storageState:'storageState.json'})


  })
test('@API test', async ({}) => {
    const page = await webContext.newPage();
    await page.goto('https://b2b-platform.qa.trajector-tech.com/dashboard');

  await page.getByTestId('Partners-header-action').click();
  await page.getByRole('button', { name: 'profile' }).click();
  await page.getByRole('menuitem', { name: 'Log Out' }).click();
  await page.getByTestId('Yes-button').click();
});
