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
    cy.check(output);
  });

  it("works with buttons", () => {
    cy.clickButton("strikethrough");
    cy.enterText("strikethrough");
    cy.clickButton("strikethrough");
    cy.enterText(" plain ");
    cy.clickButton("strikethrough");
    cy.enterText("strikethrough");
    cy.clickButton("strikethrough");
    cy.enterText(" ");
    cy.check(output);
  });
});
