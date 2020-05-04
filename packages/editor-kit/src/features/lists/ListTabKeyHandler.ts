import { Transforms } from "slate";
import { ReactEditor } from "slate-react";
import { getAncestor } from "../../editor/Editor";
import { KeyHandler } from "../../plugins/KeyHandler";

export const ListTabKeyHandler: KeyHandler = {
  pattern: "tab",
  handle: ({ editor, element, elementType }, event, plugin) => {
    if (!element || elementType !== "list-item") {
      return false;
    }

    let ancestor = getAncestor(editor, element, 1);
    if (!ancestor || ancestor!.type !== plugin.name) {
      return false;
    }

    if (ancestor.children.length > 1) {
      event.preventDefault();
      const index = ancestor?.children.indexOf(element) - 1;
      if (ancestor.children[index].type !== "list-item") {
        // 3a. tab = move right. If the node above is a list then append to it.
        const otherList = ancestor.children[index];
        const destination = ReactEditor.findPath(
          editor,
          otherList.children[otherList.children.length - 1]
        );
        destination[destination.length - 1]++;
        Transforms.moveNodes(editor, {
          to: destination,
        });
      } else {
        // 3b. otherwise, wrap the item in a new list and nest in parent
        Transforms.wrapNodes(editor, { type: plugin.name, children: [] });
      }
      return true;
    }
    return false;
  },
};
