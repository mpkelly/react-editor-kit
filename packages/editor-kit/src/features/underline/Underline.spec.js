/** @jsx jsx */
/// <reference types="cypress" />
import { jsx } from "slate-hyperscript";

const output = (
  <fragment>
    <element type="paragraph">
      <text underline={true}>underline</text>
      <text> plain </text>
      <text underline={true}>underline</text>
      <text> </text>
    </element>
  </fragment>
);

describe("Underline feature", () => {
  beforeEach(cy.loadEditor);

  it("works with markdown", () => {
    cy.enterText("__underline__plain __underline__");
    cy.check(output);
  });

  it("works with buttons", () => {
    cy.clickMarkButton("underline");
    cy.enterText("underline");
    cy.clickMarkButton("underline");
    cy.enterText(" plain ");
    cy.clickMarkButton("underline");
    cy.enterText("underline");
    cy.clickMarkButton("underline");
    cy.enterText(" ");
    cy.check(output);
  });
});
