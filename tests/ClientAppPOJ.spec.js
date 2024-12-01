const { test, expect } = require('@playwright/test');
const { POManager } = require('./PageObject.js/POManager');

test('@B2B Application login', async ({ page }) => {
    // Constants for email and password
    const poManager = new POManager(page);
    const email = "admin.trajectorservices@yopmail.com";
    const password = "Password@1";
    // Initialize the POManager and page objects
    const loginPage = poManager.getLoginPage();
    const logoutPage = poManager.getLogoutPage();
    await loginPage.goto();
    await loginPage.validLogin(email, password);
    await logoutPage.logoutapplication();
});
