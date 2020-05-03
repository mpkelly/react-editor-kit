import { KeyHandler } from "../../plugins/KeyHandler";

export const CodeTabKeyHandler: KeyHandler = {
  pattern: "tab",
  handle: ({ editor, element }, event) => {
    if (element && element.type === "code") {
      editor.insertText("  ");
      event.preventDefault();
      return true;
    }
    return false;
  },
};
