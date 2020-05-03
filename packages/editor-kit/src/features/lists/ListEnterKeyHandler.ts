import { Transforms, Editor, Element } from "slate";
import { isElementEmpty } from "../blocks/Elements";
import { getActiveNode, getAncestor } from "../../editor/Editor";
import { KeyHandler } from "../../plugins/KeyHandler";
import { toggleList } from "./ListPlugin";

export const ListEnterKeyHandler: KeyHandler = {
  pattern: "enter",
  handle: ({ editor, element, elementType }, event, plugin) => {
    if (elementType !== "list-item") {
      return false;
    }
    let ancestor = getAncestor(editor, element as Element, 1);

    if (!ancestor || ancestor!.type !== plugin.name) {
      return false;
    }
    event.preventDefault();
    //1. Current list item has content, so add a new one
    if (event.shiftKey) {
      event.preventDefault();
      editor.insertText("\n");
      return true;
    }
    if (!isElementEmpty(editor)) {
      Editor.withoutNormalizing(editor, () => {
        Transforms.insertNodes(editor, {
          type: "list-item",
          children: [{ text: "" }],
        });
      });
    } else {
      const active = getActiveNode(editor);
      if (!active) {
        return false;
      }
      const list = getAncestor(editor, active, 1) as Element;
      const listParent = getAncestor(editor, active, 2);

      if (listParent && listParent.children[0].type === "list-item") {
        //2. If nested then unwrap and move left
        Transforms.unwrapNodes(editor, {
          match: (n) => n.type === list.type,
          split: true,
        });
      } else {
        //3. At top level so cannot unwrap, insert new paragraph and break from list
        toggleList(editor, list.type);
      }
    }
    return true;
  },
};
