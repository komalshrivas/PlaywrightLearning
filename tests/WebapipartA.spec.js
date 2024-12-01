const { faker } = require('@faker-js/faker');
const { test, expect, request } = require('@playwright/test');
const loginPayload = { email: "admin.trajectorservices@yopmail.com", password: "password" };
let token;
let responseData;
test.beforeAll('@API Login with the API', async () => {
    // Login through API and retrieve token
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post('https://ct9rbs00jc.execute-api.us-east-2.amazonaws.com/stg/auth/login', {
        data: loginPayload,
    });
    console.log(`Status: ${loginResponse.status()}`);
    expect(loginResponse.ok()).toBeTruthy();
    const responseText = await loginResponse.text();
   // console.log('Full response text:', responseText);
    try {
        responseData = JSON.parse(responseText);
    } catch (error) {
        console.error("Failed to parse response as JSON:", error);
        throw new Error("The response is not in JSON format.");
    }
   // console.log('Parsed response data:', responseData);
    token =  responseData.data?.tokenInfo.token;
    if (!token) {
        throw new Error("Token not found in the response.");
    }
  //  console.log('Access Token:', token);
});
test.beforeEach('Store the toekn in local & session storage',async ({ page }) => {
    await page.addInitScript((responseData) => { //// Set the token in localStorage before each test
        window.sessionStorage.setItem('access_token', JSON.stringify(responseData.data?.tokenInfo?.token));
        window.localStorage.setItem('user', JSON.stringify(responseData?.data?.user));
    }, responseData);
    await page.goto('https://b2b-platform.stg.trajector-tech.com/dashboard');
});
test('@API  Navigate to the website and login & logout the application', async ({ page }) => {
    await page.getByTestId('Screeners-header-action').click();
    await page.getByTestId('Add New Intake Screener-button').click();
    await page.getByRole('button', { name: 'profile' }).click();
    await page.getByRole('menuitem', { name: 'Log Out' }).click();
    await page.getByTestId('No-button').click();  
});
test('@API: Add user under admin role', async ({ page }) => {
   
    const firstName  =  faker.person.firstName();
    const lastName  =  faker.person.lastName();
    const email = faker.internet.email();
    const phone = faker.phone.number('(###) ###-####');
    
   await page.getByRole('button', { name: 'profile' }).click();
   await page.getByRole('menuitem', { name: 'Manage Users' }).click();
   await page.getByTestId('Add New User-button').click();
   await page.getByTestId('input-firstName').click();
   await page.getByTestId('input-firstName').fill(firstName);
   await page.getByTestId('input-lastName').click();
   await page.getByTestId('input-lastName').fill(lastName);
   await page.getByTestId('phone-input-phone').click();
   await page.getByTestId('phone-input-phone').fill(phone);
   await page.getByTestId('input-email').click();
   await page.getByTestId('input-email').fill(email);
   await page.locator('.css-19bb58m').click();
   await page.getByRole('option', { name: 'Mass Tort - Exactech' }).click();
   
//    await page.locator('form').click();
});


