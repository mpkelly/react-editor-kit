import { KeyHandler } from "../../plugins/KeyHandler";
import { Transforms } from "slate";
import { blockEvent } from "../../ui/Utils";

export const BackspaceKeyHandler: KeyHandler = {
  pattern: "backspace",
  handle: ({ editor, selection, isElementEmpty }, event) => {
    if (selection && isElementEmpty) {
      Transforms.removeNodes(editor, { at: selection.focus });
      blockEvent(event);
      return true;
    }
    return false;
  },
};
