/** @jsx jsx */
/// <reference types="cypress" />
import { jsx } from "slate-hyperscript";

const output = (
  <fragment>
    <element type="paragraph">
      <text inline-code={true}>code</text>
      <text> plain </text>
      <text inline-code={true}>code</text>
      <text> </text>
    </element>
  </fragment>
);

describe("Inline code feature", () => {
  beforeEach(cy.loadEditor);

  it("works with markdown", () => {
    cy.enterText("`code`plain `code`");
    cy.check(output);
  });

  it("works with buttons", () => {
    cy.clickMarkButton("inline-code");
    cy.enterText("code");
    cy.clickMarkButton("inline-code");
    cy.enterText(" plain ");
    cy.clickMarkButton("inline-code");
    cy.enterText("code");
    cy.clickMarkButton("inline-code");
    cy.enterText(" ");
    cy.check(output);
  });
});
