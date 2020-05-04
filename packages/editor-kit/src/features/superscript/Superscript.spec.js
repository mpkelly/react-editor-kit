/** @jsx jsx */
/// <reference types="cypress" />
import { jsx } from "slate-hyperscript";

const output = (
  <fragment>
    <element type="paragraph">
      <text superscript={true}>superscript</text>
      <text> plain </text>
      <text superscript={true}>superscript</text>
      <text> </text>
    </element>
  </fragment>
);

describe("Superscript feature", () => {
  beforeEach(cy.loadEditor);

  it("works with markdown", () => {
    cy.enterText("^superscript^plain ^superscript^");
    cy.check(output);
  });

  it("works with buttons", () => {
    cy.clickButton("superscript");
    cy.enterText("superscript");
    cy.clickButton("superscript");
    cy.enterText(" plain ");
    cy.clickButton("superscript");
    cy.enterText("superscript");
    cy.clickButton("superscript");
    cy.enterText(" ");
    cy.check(output);
  });
});
