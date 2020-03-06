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
    cy.expect(output);
  });

  it("works with buttons", () => {
    cy.clickMarkButton("italic");
    cy.enterText("italic");
    cy.clickMarkButton("italic");
    cy.enterText(" plain ");
    cy.clickMarkButton("italic");
    cy.enterText("italic");
    cy.clickMarkButton("italic");
    cy.enterText(" ");
    cy.expect(output);
  });
});
