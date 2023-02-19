/// <reference types="cypress" />

describe('Papilio Website', () => {
  const companyName = 'business123';
  const fakeEmail = 'fake@email.com';
  const fakePassword = 'password';
  const fakeCompany = 'ABC';

  afterEach(() => {
    // Delete business from database
  });

  const loggedInAdminEmployee = () => {
    cy.visit('/login');
    cy.get('#email').type(fakeEmail);
    cy.get('#password').type(fakePassword);
    cy.get('#businessId').type(fakeCompany);
    cy.get('button').click();
  };

  it('display home page with the company logo on start up', () => {
    cy.visit('/');
    cy.contains('Welcome to Papilio');
  });

  it('visit login from home page', () => {
    cy.visit('/');
    cy.contains('Login').click();
    cy.url().should('include', '/login');
  });

  it('login by provinding the correct credentials', () => {
    cy.visit('/login');
    cy.get('#email').type(fakeEmail);
    cy.get('#password').type(fakePassword);
    cy.get('#businessId').type(fakeCompany);
    cy.get('button').click();
    cy.url().should('include', `/${fakeCompany}/dashboard`);
  });

  it('logs out an employee', () => {
    loggedInAdminEmployee();
    cy.contains('Logout').click();
    cy.url().should('equal', `${Cypress.config().baseUrl}/`);
  });

  it('displays the business activities to a logged in employee', () => {
    loggedInAdminEmployee();
    cy.contains('Activity Manager').click();

    cy.url().should('include', `${fakeCompany}/dashboard/activities`);
    cy.contains('Just for fun');
  });

  it('displays the business employee to a logged in employee', () => {
    loggedInAdminEmployee();
    cy.contains('Employees').click();
    cy.url().should('include', `${fakeCompany}/dashboard/employees`);
    cy.contains('Sam');
  });

  it("can't delete itself when logged in as an admin", () => {
    loggedInAdminEmployee();
    cy.contains('Employees').click();
    cy.contains('Delete').click();

    cy.contains(fakeEmail)
      .parent()
      .get('input[type=checkbox]')
      .should('be.disabled');
  });

  it.skip('deletes an employee when user is an admin', () => {
    loggedInAdminEmployee();
    cy.contains('Employees').click();
    cy.contains('Delete').click();
  });
});
