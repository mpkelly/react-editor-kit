import { KeyHandler } from "../../plugins/KeyHandler";

export const CodeDeleteKeyHandler: KeyHandler = {
  pattern: "delete",
  handle: ({ element, isElementEmpty }, event) => {
    if (element && element.type === "code") {
      if (isElementEmpty) {
        event.preventDefault();
        return true;
      }
    }
    return false;
  },
};
