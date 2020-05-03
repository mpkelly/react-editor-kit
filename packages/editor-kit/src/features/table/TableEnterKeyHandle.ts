import { Transforms } from "slate";
import { KeyHandler } from "../../plugins/KeyHandler";
import { isElementActive } from "../blocks/Elements";

export const TableEnterKeyHandler: KeyHandler = {
  pattern: "enter",
  handle: ({ editor }, event) => {
    if (!isElementActive(editor, "table-cell")) {
      return false;
    }
    if (event.shiftKey) {
      editor.insertText("\n");
    } else {
      // Default behaviour would add a new table cell to the parent row
      // so insert new paragraph instead
      Transforms.insertNodes(editor, {
        type: "paragraph",
        children: [{ text: "" }],
      });
    }
    event.preventDefault();
    return true;

    return true;
  },
};
