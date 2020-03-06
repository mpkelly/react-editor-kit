/** @jsx jsx */
/// <reference types="cypress" />
import { jsx } from "slate-hyperscript";

const output = (
  <fragment>
    <element type="paragraph">
      <text strikethrough={true}>strikethrough</text>
      <text> plain </text>
      <text strikethrough={true}>strikethrough</text>
      <text> </text>
    </element>
  </fragment>
);

describe("Strikethrough feature", () => {
  beforeEach(cy.loadEditor);

  it("works with markdown", () => {
    cy.enterText("~~strikethrough~~plain ~~strikethrough~~");
    cy.expect(output);
  });

  it("works with buttons", () => {
    cy.clickMarkButton("strikethrough");
    cy.enterText("strikethrough");
    cy.clickMarkButton("strikethrough");
    cy.enterText(" plain ");
    cy.clickMarkButton("strikethrough");
    cy.enterText("strikethrough");
    cy.clickMarkButton("strikethrough");
    cy.enterText(" ");
    cy.expect(output);
  });
});
