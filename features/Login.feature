Feature: Login and Logout functionality

  Scenario: Verify login and logout functionality on the B2B project
    Given Go to the website and login with valid creds
    When Click on the screener tab
    Then Click on the profile link at the right side top of the page and click on the logout button
    
