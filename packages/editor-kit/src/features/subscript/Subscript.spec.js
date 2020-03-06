/** @jsx jsx */
/// <reference types="cypress" />
import { jsx } from "slate-hyperscript";

const output = (
  <fragment>
    <element type="paragraph">
      <text sub={true}>subscript</text>
      <text> plain </text>
      <text sub={true}>subscript</text>
      <text> </text>
    </element>
  </fragment>
);

describe("Subscript feature", () => {
  beforeEach(cy.loadEditor);

  it("works with markdown", () => {
    cy.enterText("~subscript~plain ~subscript~");
    cy.expect(output);
  });

  it("works with buttons", () => {
    cy.clickMarkButton("sub");
    cy.enterText("subscript");
    cy.clickMarkButton("sub");
    cy.enterText(" plain ");
    cy.clickMarkButton("sub");
    cy.enterText("subscript");
    cy.clickMarkButton("sub");
    cy.enterText(" ");
    cy.expect(output);
  });
});
