import { KeyHandler } from "../../plugins/KeyHandler";
import { blockEvent } from "../../ui/Utils";
import { Transforms } from "slate";

export const EnterKeyHandler: KeyHandler = {
  pattern: "enter",
  handle: ({ editor }, event) => {
    if (event.keyCode === 13) {
      //Enter key
      if (event.shiftKey) {
        editor.insertText("\n");
        blockEvent(event);
        return true;
      } else {
        Transforms.insertNodes(editor, {
          type: "paragraph",
          children: [{ text: "" }],
        });
        blockEvent(event);
        return true;
      }
    }
    return false;
  },
};
