/// <reference types="cypress" />

describe("visit home page", () => {
  const companyName = "business123";

  afterEach(() => {
    // Delete business from database
    cy.request("DELETE", `business/${companyName}`);
  });

  it("when company name doesn't exist then company should be created", () => {
    cy.visit("/get-started");

    cy.get("input[name=businessId]").type(`${companyName}{enter}`);

    cy.url().should("include", "/admin");
    cy.getCookie("session").should("exist");

    cy.get("h1").should("contain", "Admin");
  });

  it("when company name already exist then an error message should be display", () => {
    cy.visit("/get-started");
    cy.get("input[name=businessId]").type(`${companyName}{enter}`);
    cy.url().should("include", "/admin");

    cy.visit("/get-started");
    cy.get("input[name=businessId]").type(`${companyName}{enter}`);

    cy.url().should("include", "/get-started");
    cy.get("h1").should("contain", "Create");
  });
});
