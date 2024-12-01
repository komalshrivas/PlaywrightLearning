class LogoutPage {
    constructor(page) {
        this.page = page;

        // Define locators
        this.partnerTab = page.getByTestId('Partners-header-action');
        this.profileButton = page.getByRole('button', { name: 'profile' });
        this.logoutButton = page.getByRole('menuitem', { name: 'Log Out' });
        this.confirmLogoutButton = page.getByTestId('Yes-button');
    }

    async logoutapplication() {
        // Perform logout actions
        await this.partnerTab.click();
        await this.profileButton.click();
        await this.logoutButton.click();
        await this.confirmLogoutButton.click();
    }
}

module.exports = {LogoutPage};
