/** @jsx jsx */
/// <reference types="cypress" />
import { jsx } from "slate-hyperscript";

describe("Constraints feature", () => {
  beforeEach(cy.loadEditor);

  it("disables all formatting", () => {
    cy.enterText(":code");
    cy.enterText("**bold** ");
    cy.enterText(":code ");
    cy.enterText("1. ");
    cy.expect(
      <fragment>
        <element type="paragraph">
          <text></text>
        </element>
        <element type="code-block" lang="JavaScript">
          <text>**bold** :code 1. </text>
        </element>
      </fragment>
    );
    cy.get(".rek-editor-toolbar .rek-icon-button").each($item => {
      expect($item).to.have.class("rek-disabled");
    });
  });

  it("handles inclusive", () => {
    cy.enterText(":quote");
    cy.enterText(":h1 ");
    cy.enterText("some text");
    cy.expect(
      <fragment>
        <element type="quote">
          <text>:h1 some text</text>
        </element>
      </fragment>
    );
    cy.get(".rek-editor-toolbar .rek-icon-button").each($item => {
      if ($item[0].dataset && $item[0].dataset["inlineButton"] === "link") {
        expect($item).to.not.have.class("rek-disabled");
      } else {
        expect($item).to.have.class("rek-disabled");
      }
    });
  });

  //TODO focus should be in top left not bottom right
  it("handles exclusive", () => {
    cy.enterText(":table");
    cy.enterText(":h1 ");
    cy.enterText("some text");
    cy.expect(
      <fragment>
        <element type="table">
          <element type="table-row">
            <element type="table-cell">
              <text></text>
            </element>
            <element type="table-cell">
              <text></text>
            </element>
          </element>
          <element type="table-row">
            <element type="table-cell">
              <text></text>
            </element>
            <element type="table-cell">
              <element type="h1">
                <text>some text</text>
              </element>
            </element>
          </element>
        </element>
      </fragment>
    );
    // cy.get(".rek-editor-toolbar .rek-icon-button").each($item => {
    //   if ($item[0].dataset && $item[0].dataset["inlineButton"] === "link") {
    //     expect($item).to.not.have.class("rek-disabled");
    //   } else {
    //     expect($item).to.have.class("rek-disabled");
    //   }
    // });
  });
});
