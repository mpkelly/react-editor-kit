/** @jsx jsx */
/// <reference types="cypress" />
import { jsx } from "slate-hyperscript";

const output = (
  <fragment>
    <element type="paragraph">
      <text super={true}>superscript</text>
      <text> plain </text>
      <text super={true}>superscript</text>
      <text> </text>
    </element>
  </fragment>
);

describe("Superscript feature", () => {
  beforeEach(cy.loadEditor);

  it("works with markdown", () => {
    cy.enterText("^superscript^plain ^superscript^");
    cy.expect(output);
  });

  it("works with buttons", () => {
    cy.clickMarkButton("super");
    cy.enterText("superscript");
    cy.clickMarkButton("super");
    cy.enterText(" plain ");
    cy.clickMarkButton("super");
    cy.enterText("superscript");
    cy.clickMarkButton("super");
    cy.enterText(" ");
    cy.expect(output);
  });
});
