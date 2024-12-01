class LoginPage {
    constructor(page) {
        this.page = page;

        // Define locators
        this.emailField = page.getByTestId('input-email');
        this.passwordField = page.getByTestId('password-input-password');
        this.signInButton = page.getByTestId('Sign in-button');
        this.partnerTab = page.getByTestId('Partners-header-action');
    }

    async goto() 
    {
        // Navigate to the login page
        await this.page.goto('https://b2b-platform.qa.trajector-tech.com/login');
    }

    async validLogin(email, password) {
        // Perform login actions
        await this.emailField.click();
        await this.emailField.fill(email);
        await this.passwordField.click();
        await this.passwordField.fill(password);
        await this.signInButton.click();
    }
}

module.exports = {LoginPage};
