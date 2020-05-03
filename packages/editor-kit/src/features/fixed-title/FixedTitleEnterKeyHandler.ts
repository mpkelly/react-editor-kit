import { KeyHandler } from "../../plugins/KeyHandler";
import { Transforms } from "slate";

export const FixedTitleEnterKeyHandler: KeyHandler = {
  pattern: "enter",
  handle: ({ editor, elementType }, event) => {
    if (elementType !== "fixed-title") {
      return false;
    }
    Transforms.insertNodes(editor, {
      type: "paragraph",
      children: [{ text: "" }],
    });
    event.preventDefault();
    return true;
  },
};
