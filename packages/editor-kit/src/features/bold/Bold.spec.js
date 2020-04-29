/** @jsx jsx */
/// <reference types="cypress" />
import { jsx } from "slate-hyperscript";

const output = (
  <fragment>
    <element type="paragraph">
      <text bold={true}>bold</text>
      <text> plain </text>
      <text bold={true}>bold</text>
      <text> </text>
    </element>
  </fragment>
);

describe("Bold feature", () => {
  beforeEach(cy.loadEditor);

  it("works with markdown", () => {
    cy.enterText("**bold**plain **bold**");
    cy.check(output);
  });

  it("works with buttons", () => {
    cy.clickMarkButton("bold");
    cy.enterText("bold");
    cy.clickMarkButton("bold");
    cy.enterText(" plain ");
    cy.clickMarkButton("bold");
    cy.enterText("bold");
    cy.clickMarkButton("bold");
    cy.enterText(" ");
    cy.check(output);
  });

  it("works with hotkey", () => {
    cy.get("[data-slate-editor]").type("{cmd}b");
    cy.enterText("bold");
    cy.get("[data-slate-editor]").type("{cmd}b");
    cy.enterText(" plain ");
    cy.get("[data-slate-editor]").type("{cmd}b");
    cy.enterText("bold");
    cy.get("[data-slate-editor]").type("{cmd}b");
    cy.enterText(" ");
    cy.check(output);
  });
});
