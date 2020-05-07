/** @jsx jsx */
/// <reference types="cypress" />
import { jsx } from "slate-hyperscript";

describe("Tables feature", () => {
  beforeEach(cy.loadEditor);

  it("Adds and removes columns", () => {
    addTable();

    cy.get(".rek-table-right").click({ force: true });

    cy.get("table").find("tr").should("have.length", 3);
    cy.get("table").find("td").should("have.length", 12);

    cy.get("td:first-child .rek-table-column-button").click({ force: true });
    cy.get(".rek-table-cell-toolbar .rek-icon").trigger("mousedown");

    checkInitial();
  });

  it("Inserts columns", () => {
    addTable();

    cy.get(".rek-table-column-insert-button-inner .rek-icon")
      .first()
      .trigger("mousedown", { force: true });

    cy.get("table").find("tr").should("have.length", 3);
    cy.get("table").find("td").should("have.length", 12);
  });

  it("Adds and removes rows", () => {
    addTable();

    cy.get(".rek-table-bottom").click({ force: true };

    cy.get("table").find("tr").should("have.length", 4);
    cy.get("table").find("td").should("have.length", 12);

    cy.get(".rek-table-row-button").first().click({ force: true });
    cy.get(".rek-table-cell-toolbar .rek-icon").trigger("mousedown");

    checkInitial();
  });

  it("Inserts rows", () => {
    addTable();

    cy.get(".rek-table-row-insert-button-inner .rek-icon")
      .first()
      .trigger("mousedown", { force: true });

    cy.get("table").find("tr").should("have.length", 4);
    cy.get("table").find("td").should("have.length", 12);
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
