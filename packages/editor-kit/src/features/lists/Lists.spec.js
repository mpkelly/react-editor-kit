/** @jsx jsx */
/// <reference types="cypress" />
import { jsx } from "slate-hyperscript";

const breakout = (
  <fragment>
    <element type="unordered-list">
      <element type="list-item">
        <text>Item 1</text>
      </element>
    </element>
    <element type="paragraph">
      <text />
    </element>
  </fragment>
);

describe("Lists feature", () => {
  beforeEach(cy.loadEditor);

  // it("Breakout of list", () => {
  //   cy.enterText("- Item 1");
  //   cy.get("li").type("{enter}{enter}");
  //   cy.check(breakout);
  // });

  // it("Toggle lists", () => {
  //   cy.enterText("1. Item 1");
  //   cy.get("li").type("{enter}");
  //   cy.enterText("Item 2");
  //   cy.get("ol > li").should("have.length", 2);
  //   cy.get("[data-slate-editor=true]").type("{selectAll}");
  //   cy.get("[data-id=toolbar-overflow-button]").click();
  //   cy.clickButton("unordered-list")
  //   cy.get("ul > li").should("have.length", 2);
  // });

  it("Nests lists", () => {
    cy.enterText("1. Item 1");
    cy.get("li").type("{enter}");
    cy.enterText("Item 2");
    cy.get("body").tab();    
    cy.get("ol > li").should("have.length", 2);
    cy.get("ol").should("have.length", 2);
    cy.get("[data-id=toolbar-overflow-button]").click();
    cy.clickButton("unordered-list")
    console.log("clicked")
    cy.get("ol").should("have.length", 1);
    cy.get("ul").should("have.length", 1);
    cy.get("ul > li span span span").click();
    cy.get("body").tab({shift:true});    
    cy.get("ol").should("have.length", 1);
    cy.get("ol > li").should("have.length", 2);
    
  });
});
});
