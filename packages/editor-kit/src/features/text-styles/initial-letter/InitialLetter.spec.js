/** @jsx jsx */
/// <reference types="cypress" />
import { jsx } from "slate-hyperscript";

const paragraphs = (
  <fragment>
    <element type="paragraph">
      <text>The first one</text>
    </element>
    <element type="paragraph">
      <text>The second one</text>
    </element>
  </fragment>
);

describe("Initial Letter feature", () => {
  beforeEach(cy.loadEditor);

  it("Toggles on and off", () => {
    cy.enterText("First\n\n\n Second");
    cy.focusNode("[data-slate-editor] p");
    cy.get("[data-slate-editor]").get("p").rightclick(10, 10);

    cy.get(".rek-menu-item[data-name='Initial letter on']").click();
    cy.get(".rek-initial-letter").should("have.length", 1);

    cy.get("[data-slate-editor]").get("p").rightclick(10, 10);
    cy.get(".rek-menu-item[data-name='Initial letter off']").click();

    cy.get(".rek-initial-letter").should("have.length", 0);
  });

  it("Works with multiple paragraphs", () => {
    cy.setEditorValue(paragraphs);
    cy.focusNode("[data-slate-editor] p:last-child");
    cy.get("[data-slate-editor]").get("p:last-child").rightclick(10, 10);

    cy.get(".rek-menu-item[data-name='Initial letter on']").click();
    cy.get(".rek-initial-letter").should("have.length", 1);

    cy.focusNode("[data-slate-editor] p:first-child");
    cy.get("[data-slate-editor]").get("p:first-child").rightclick(10, 10);
    cy.get(".rek-menu-item[data-name='Initial letter on']").click();
    cy.get(".rek-initial-letter").should("have.length", 2);

    cy.focusNode("[data-slate-editor] p:last-child");
    cy.get("[data-slate-editor]")
      .get("p:last-child")

      .rightclick(10, 10, { force: true });
    cy.get(".rek-menu-item[data-name='Initial letter off']").click({
      force: true,
    });

    cy.focusNode("[data-slate-editor] p:first-child");
    cy.get("[data-slate-editor]")
      .get("p:first-child")
      .rightclick(10, 10, { force: true });
    cy.get(".rek-menu-item[data-name='Initial letter off']").click({
      force: true,
    });

    cy.get(".rek-initial-letter").should("have.length", 0);
  });
});
