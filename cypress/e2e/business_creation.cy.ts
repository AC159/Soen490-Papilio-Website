/// <reference types="cypress" />

describe('Papilio Website', () => {
  const companyName = 'business123';
  const fakeEmail = 'fake@email.com';
  const fakePassword = 'password';
  const fakeCompany = 'ABC';
  const fakeFirstName = 'John';
  const fakeLastName = 'Doe';
  const otherFakeEmail = 'fake2@email.com';
  const role = 'Normal';
  let email;

  before(() => {
    email = randomEmail();
  });

  afterEach(() => {
    // Delete business from database
  });

  const randomEmail = () => {
    return `TESTING${Math.round(Math.random() * 100000)}@DONTYOUDARE.com`;
  };

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

  it('adds an employee when user is an admin', () => {
    loggedInAdminEmployee();
    cy.contains('Employees').click();
    cy.contains('Add employee').click();
    cy.get('#employeeFirstName').type(fakeFirstName);
    cy.get('#employeeLastName').type(fakeLastName);
    cy.get('#employeeEmail').type(email);
    cy.get('#employeePassword').type(fakePassword);
    cy.get('#role').type(role);

    cy.contains('Add employee').click();
    cy.get('table').should('exist');
  });

  it('deletes an employee when user is an admin', () => {
    loggedInAdminEmployee();
    cy.contains('Employees').click();
    cy.contains('Delete').click();
    cy.contains(email).should('exist');
    cy.contains(email)
      .parent()
      .within(() => {
        cy.get('input[type=checkbox]').click().should('be.checked');
      });
    cy.contains('Delete employee').should('not.be.disabled').click();
    cy.contains(/^Delete$/).click();
  });

  describe('Activity', () => {
    const activityTitle = 'Fun For Fun People';
    const activityAddress =
      '1455, Boulevard De Maisonneuve Est, H2L 2B2, Montreal, Quebec, Canada';
    const activityStartTime = '01-01-2222';
    const activityEndTime = '01-01-3333';
    const activityDescription = 'Only fun people allowed. We will checked. 🤪';
    const activityCostPerIndividual = '999.99';
    const activityCostPerGroup = '888.88';
    const activityGroupSize = '23';

    it('creates an activity when a employee is logged in', () => {
      loggedInAdminEmployee();
      cy.contains('Activity Manager').click();
      cy.contains('Add activity').click();
      cy.get('#title').type(activityTitle);
      cy.get('#address').type(activityAddress);
      cy.get('#startTime').type(activityStartTime);
      cy.get('#endTime').type(activityEndTime);
      cy.get('#description').type(activityDescription);
      cy.get('#costPerIndividual').clear().type(activityCostPerIndividual);
      cy.get('#costPerGroup').clear().type(activityCostPerGroup);
      cy.get('#groupSize').clear().type(activityGroupSize);
      cy.contains('Create activity').click();

      cy.visit(`/${fakeCompany}/dashboard/activities`);
      cy.contains(activityTitle);
    });

    it('displays the business activities to a logged in employee', () => {
      loggedInAdminEmployee();
      cy.contains('Activity Manager').click();

      cy.url().should('include', `${fakeCompany}/dashboard/activities`);
      cy.contains(activityTitle);
    });

    // it('delete the business activities when employee logged in', () => {
    //   loggedInAdminEmployee();
    //   cy.contains('Activity Manager').click();
    //   cy.contains('Delete activity').click();
    //   cy.contains(activityTitle)
    //     .parent()
    //     .within(() => {
    //       cy.get('input[type=checkbox]').click().should('be.checked');
    //     });
    //   cy.contains('Delete activities').click();
    //   cy.wait(500);
    //   cy.contains(activityTitle).should('not.exist');
    // });
  });

  describe('Business Creation', () => {
    const businessId = 'AwesomeId';
    afterEach(() => {
      cy.request('DELETE', `/api/business/${businessId}`);
    });

    it('creates a business', () => {
      cy.visit('/');
      cy.contains('Get Started').click();
      cy.get('#businessId').type(businessId);
      cy.contains('Create business').click();

      cy.get('#businessName').type(businessId);
      cy.get('#email').type(randomEmail());
      cy.get('#addressLineOne').type('1237 Boulevard René-Laennec');
      cy.get('#city').type('Laval');
      cy.get('#province').type('Quebec');
      cy.get('#postalCode').type('H7M 3L9');
      cy.get('#country').type('ca');
      cy.contains('Next').click();

      cy.get('#adminFirstName').type('John');
      cy.get('#adminLastName').type('Doe');
      cy.get('#adminEmail').type(randomEmail());
      cy.get('#adminPassword').type('password');
      cy.get('button').contains('Next').click();

      cy.get('button').contains('submit').click();
      cy.contains('Overview');
    });
  });
});
