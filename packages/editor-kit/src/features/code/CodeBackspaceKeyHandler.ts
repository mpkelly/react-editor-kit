import { isAtStartOfNode } from "../../editor/Editor";
import { KeyHandler } from "../../plugins/KeyHandler";

export const CodeBackspaceKeyHandler: KeyHandler = {
  pattern: "backspace",
  handle: ({ element, editor }, event) => {
    if (element && element.type === "code") {
      if (isAtStartOfNode(editor)) {
        event.preventDefault();
        return true;
      }
    }
    return false;
  },
};
