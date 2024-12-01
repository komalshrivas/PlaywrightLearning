const { LoginPage } = require('./LoginPage');
const { LogoutPage } = require('./LogoutPage');

class POManager 
{
    constructor(page) 
    {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.logoutPage = new LogoutPage(this.page);
    }

    getLoginPage() 
    {
        return this.loginPage;
    }

    getLogoutPage() 
    {
        return this.logoutPage;
    }
}

module.exports = {POManager};
