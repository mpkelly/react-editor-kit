import { Transforms } from "slate";
import { ReactEditor } from "slate-react";
import { getAncestor } from "../../editor/Editor";
import { KeyHandler } from "../../plugins/KeyHandler";

export const LisShiftTabKeyHandler: KeyHandler = {
  pattern: "shift+tab",
  handle: ({ editor, element, elementType }, event, plugin) => {
    if (!element || elementType !== "list-item") {
      return false;
    }

    let ancestor = getAncestor(editor, element, 1);
    if (!ancestor || ancestor!.type !== plugin.name) {
      return false;
    }

    if (event.shiftKey) {
      let ancestor = getAncestor(editor, element, 2);
      // 1. tab+shift = move left to grandparent list if nested
      if (ancestor?.children.find((child) => child.type === "list-item")) {
        Transforms.liftNodes(editor);
      } else {
        const options = {
          at: ReactEditor.findPath(editor, element),
        };
        // 2. tab+shift = unwrap and move to below parent if no grandparent list
        if (element?.children.length == 1) {
          Transforms.setNodes(editor, { type: "paragraph" }, options);
        } else {
          Transforms.unwrapNodes(editor, options);
        }
      }
      event.preventDefault();
      return true;
    }
    return false;
  },
};
