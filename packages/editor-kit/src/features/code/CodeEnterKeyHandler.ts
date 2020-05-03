import { KeyHandler } from "../../plugins/KeyHandler";

export const CodeEnterKeyHandler: KeyHandler = {
  pattern: "enter",
  handle: ({ element, editor }, event) => {
    if (element && element.type === "code") {
      event.preventDefault();
      editor.insertText("\n");
      return true;
    }
    return false;
  },
};
