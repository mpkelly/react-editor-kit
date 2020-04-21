/** @jsx jsx */
/// <reference types="cypress" />
import { jsx } from "slate-hyperscript";

const breakout = (
  <fragment>
    <element type="unordered-list">
      <element type="list-item">
        <text>Item 1</text>
      </element>
    </element>
    <element type="paragraph">
      <text />
    </element>
  </fragment>
);

describe("Lists feature", () => {
  beforeEach(cy.loadEditor);

  it("Breakout of list", () => {
    cy.enterText("- Item 1");
    cy.get("li").type("{enter}{enter}");
    cy.check(breakout);
  });

  it("Toggle lists", () => {
    cy.enterText("1. Item 1");
    cy.get("li").type("{enter}");
    cy.enterText("Item 2");
    cy.get("ol > li").should("have.length", 2);
    cy.get("[data-slate-editor=true]").type("{selectAll}");
    cy.get(".more-icon").click();
    cy.get("[data-id-button-unordered-list]").click();
    cy.get("ul > li").should("have.length", 2);
  });
});
