/** @jsx jsx */
/// <reference types="cypress" />
import { jsx } from "slate-hyperscript";

const output = (
  <fragment>
    <element type="paragraph">
      <text italic={true}>italic</text>
      <text> plain </text>
      <text italic={true}>italic</text>
      <text> </text>
    </element>
  </fragment>
);

describe("Italic feature", () => {
  beforeEach(cy.loadEditor);

  it("works with markdown", () => {
    cy.enterText("*italic*plain *italic*");
    cy.check(output);
  });

  it("works with buttons", () => {
    cy.clickButton("italic");
    cy.enterText("italic");
    cy.clickButton("italic");
    cy.enterText(" plain ");
    cy.clickButton("italic");
    cy.enterText("italic");
    cy.clickButton("italic");
    cy.enterText(" ");
    cy.check(output);
  });
});
