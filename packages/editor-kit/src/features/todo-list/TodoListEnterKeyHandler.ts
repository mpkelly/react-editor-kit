import { KeyHandler } from "../../plugins/KeyHandler";
import { isElementActive } from "../elements/Elements";
import { ReactEditor } from "slate-react";
import { Element, Transforms } from "slate";
import { defaultTodoItem } from "./TodoListAction";

export const TodoListEnterKeyHandler: KeyHandler = {
  pattern: "enter",
  handle: ({ editor, element, isElementEmpty }, event) => {
    if (isElementActive(editor, "todo-item")) {
      const { selection } = editor;
      if (!selection) {
        return false;
      }
      const path = ReactEditor.findPath(editor, element as Element);
      if (!event.shiftKey) {
        if (isElementEmpty) {
          const next = [path[0] + 1];
          Transforms.removeNodes(editor);
          Transforms.insertNodes(
            editor,
            {
              type: "paragraph",
              autoFocus: true,
              children: [{ text: "" }],
            },
            {
              at: next,
            }
          );
        } else {
          path[path.length - 1]++;
          Transforms.insertNodes(editor, defaultTodoItem({ autoFocus: true }), {
            at: path,
          });
        }
        event.preventDefault();
        return true;
      }
    }
    return false;
  },
};
