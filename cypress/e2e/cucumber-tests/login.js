import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('I open login page', () => {
  cy.visit('http://localhost:4400/');
  cy.get('[data-test-id="login-menu"]').click();
  cy.get('[data-test-id="login-btn"]').click();
});

When('I enter username {string}', (username) => {
  cy.get('[data-test-id="username"]').type(username);
});

When('I enter password {string}', (password) => {
  cy.get('[data-test-id="password"]').type(password);
});

When('Submit the form', () => {
  cy.get('[data-test-id="submit"]').click();
});

Then('I should see homepage', () => {
  cy.get('app-product-card h1:first-child').should(
    'contain.text',
    'Pants jdad'
  );
});

Then('I should stay on the same page', () => {
  cy.url().should('contain', 'login');
});
