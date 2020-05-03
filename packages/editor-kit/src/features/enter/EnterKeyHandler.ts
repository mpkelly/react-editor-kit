import { KeyHandler } from "../../plugins/KeyHandler";
import { blockEvent } from "../../ui/Utils";

export const EnterKeyHandler: KeyHandler = {
  pattern: "enter",
  handle: ({ editor }, event) => {
    if (event.keyCode === 13) {
      //Enter key
      if (event.shiftKey) {
        editor.insertText("\n");
        blockEvent(event);
        return true;
      }
    }
    return false;
  },
};
