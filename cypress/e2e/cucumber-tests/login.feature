Feature: Login to application
  As a valid user
  I want to log in into Application

  As an invalid user
  I want to get an error in the login form

  Scenario: Valid login
    Given I open login page
    When I enter username "adminSqli"
    And I enter password "adminSqli123"
    And Submit the form
    Then I should see homepage

  Scenario: Invalid login
    Given I open login page
    When I enter username "falseUsername"
    And I enter password "falsePassword"
    And Submit the form
    Then I should stay on the same page
