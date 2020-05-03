import { Transforms, Element, Node } from "slate";
import { ReactEditor } from "slate-react";
import { getActiveNode, getAncestor } from "../../editor/Editor";
import { KeyHandler } from "../../plugins/KeyHandler";

export const ListTabKeyHandler: KeyHandler = {
  pattern: "enter",
  handle: ({ editor, elementType }, event, plugin) => {
    if (elementType !== "list-item") {
      return false;
    }
    const active = getActiveNode(editor);
    let ancestor = getAncestor(editor, active as Element, 1);

    if (!ancestor || ancestor!.type !== plugin.name) {
      return false;
    }

    if (event.shiftKey) {
      let ancestor = getAncestor(editor, active as Element, 2);
      // 1. tab+shift = move left to grandparent list if nested
      if (ancestor?.children.find((child) => child.type === "list-item")) {
        Transforms.liftNodes(editor);
      } else {
        const options = {
          at: ReactEditor.findPath(editor, active as Element),
        };
        // 2. tab+shift = unwrap and move to below parent if no grandparent list
        if (active?.children.length == 1) {
          Transforms.setNodes(editor, { type: "paragraph" }, options);
        } else {
          Transforms.unwrapNodes(editor, options);
        }
      }
      event.preventDefault();
      return true;
    }

    if (ancestor.children.length > 1) {
      event.preventDefault();
      const index = ancestor?.children.indexOf(active as Node) - 1;
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
        Transforms.wrapNodes(editor, { type: plugin.type, children: [] });
      }
      return true;
    }
    return false;
  },
};
