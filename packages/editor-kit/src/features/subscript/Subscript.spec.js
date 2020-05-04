/** @jsx jsx */
/// <reference types="cypress" />
import { jsx } from "slate-hyperscript";

const output = (
  <fragment>
    <element type="paragraph">
      <text subscript={true}>subscript</text>
      <text> plain </text>
      <text subscript={true}>subscript</text>
      <text> </text>
    </element>
  </fragment>
);

describe("Subscript feature", () => {
  beforeEach(cy.loadEditor);

  it("works with markdown", () => {
    cy.enterText("~subscript~plain ~subscript~");
    cy.check(output);
  });

  it("works with buttons", () => {
    cy.clickButton("subscript");
    cy.enterText("subscript");
    cy.clickButton("subscript");
    cy.enterText(" plain ");
    cy.clickButton("subscript");
    cy.enterText("subscript");
    cy.clickButton("subscript");
    cy.enterText(" ");
    cy.check(output);
  });
});
