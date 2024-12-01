const { test, expect, request } = require('@playwright/test');

const loginPayload = { email: "admin.trajectorservices@yopmail.com", password: "password" };
let token;
let responseData; // Declare responseData here to make it accessible across all tests
let previewData;

test.beforeAll('Login with the api', async () => {
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post(
        'https://ct9rbs00jc.execute-api.us-east-2.amazonaws.com/stg/auth/login',
        {
            data: loginPayload,
        }
    );
    expect(loginResponse.ok()).toBeTruthy();
    const responseText = await loginResponse.text();
    responseData = JSON.parse(responseText); // Store responseData here, accessible for the rest of the tests
    token = responseData?.data?.tokenInfo?.token;
    expect(token).toBeTruthy(); // Ensure token is valid
    // Step 2: Fetch data using the GET request and get the preview of the response
    const previewResponse = await apiContext.get(
        'https://ct9rbs00jc.execute-api.us-east-2.amazonaws.com/stg/partners',
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        }
    );
    expect(previewResponse.ok()).toBeTruthy();
    // Parse and store preview data in the global variable
    previewData = await previewResponse.json(); 
    console.log('Previewing first 3 items of the response:', previewData?.data?.slice(0, 3));
    console.log('Full Response Data for Preview:', previewData);
});
test.beforeEach('Set token and user data in local & session storage', async ({ page }) => {
    // Set token and user data in storage before each test
    await page.addInitScript((data) => {
        window.sessionStorage.setItem('access_token', data.tokenInfo.token);
        window.localStorage.setItem('user', JSON.stringify(data.user));
    }, responseData.data); // Use the responseData here
    // Navigate to the dashboard page
    await page.goto('https://b2b-platform.stg.trajector-tech.com/dashboard');
});
test('Navigate and interact with the Leads page', async ({ page }) => {
    // Example interaction with preview data
    console.log('Using previewData:', previewData); // Log the preview data for debugging purposes
    // Perform your test interaction, e.g., clicking on 'Leads' section
    await page.getByTestId('Leads-header-action').click();
});
