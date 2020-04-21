Cypress.Commands.add("loadEditor", (value) => {
  cy.visit("./test/dist/index.html");
  cy.wait(500);
  cy.get("[data-slate-editor=true]").then(cy.focusEditor);
});

Cypress.Commands.add("focusEditor", (text) => {
  cy.window().then((window) => {
    window.focusEditor();
  });
});

Cypress.Commands.add("refreshEditor", (text) => {
  cy.window().then((window) => {
    window.refreshEditor();
  });
});

Cypress.Commands.add("focusNode", (selector) => {
  cy.window().then((window) => {
    const node = window.document.querySelector(selector);
    window.focusNode(node);
  });
});

Cypress.Commands.add("clickMarkButton", (type) => {
  cy.get(`[data-mark-button=${type}]`).click();
});

Cypress.Commands.add("enterText", (text) => {
  cy.window().then((window) => {
    const editor = window.document.querySelector("[data-slate-editor=true]");
    text.split("").forEach((char) => {
      window.editor.insertText(char);
      editor.dispatchEvent(createEvent(window, char));
    });
  });
});

Cypress.Commands.add("check", (value) => {
  cy.window().then((window) => {
    const { editor } = window;
    console.log(editor.children, value);
    console.log(JSON.stringify(editor.children));
    console.log(JSON.stringify(value));
    expect(editor.children).to.deep.equal(value);
  });
});

const createEvent = (element, char) => {
  var keyboardEvent = document.createEvent("KeyboardEvent");
  keyboardEvent.initKeyboardEvent(
    "keyup",
    true,
    true,
    element,
    false,
    false,
    false,
    false,
    char.charCodeAt(0),
    0
  );
  return keyboardEvent;
};
