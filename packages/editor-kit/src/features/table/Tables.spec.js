/** @jsx jsx */
/// <reference types="cypress" />
import { jsx } from "slate-hyperscript";

describe("Tables feature", () => {
  beforeEach(cy.loadEditor);

  it("Adds and removes columns", () => {
    addTable();

    cy.focusNode("tr:nth-child(1) > td:nth-child(1) span span span");

    cy.get(".rek-table-cell-menu").click();
    cy.get(".rek-floating-content").contains("Add column").click();

    cy.get("table").find("tr").should("have.length", 3);
    cy.get("table").find("td").should("have.length", 12);

    cy.focusNode("tr:nth-child(1) > td:nth-child(1) span span span");

    cy.get(".rek-table-cell-menu").click();

    cy.get(".rek-floating-content").contains("Delete column").click();

    checkInitial();
  });

  it("Adds and removes rows", () => {
    addTable();

    cy.focusNode("tr:nth-child(1) > td:nth-child(1) span span span");

    cy.get(".rek-table-cell-menu").click();
    cy.get(".rek-floating-content").contains("Add row").click();

    cy.get("table").find("tr").should("have.length", 4);
    cy.get("table").find("td").should("have.length", 12);

    cy.focusNode("tr:nth-child(1) > td:nth-child(1) span span span");

    cy.get(".rek-table-cell-menu").click();

    cy.get(".rek-floating-content").contains("Delete row").click();

    checkInitial();
  });
});

const addTable = () => {
  cy.enterText(":table ");
  checkInitial();
};

const checkInitial = () => {
  cy.get("table").find("tr").should("have.length", 3);
  cy.get("table").find("td").should("have.length", 9);
};
