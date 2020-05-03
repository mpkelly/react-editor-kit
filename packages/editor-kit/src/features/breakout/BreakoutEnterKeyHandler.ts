import { Transforms, Node } from "slate";
import { KeyHandler } from "../../plugins/KeyHandler";


export const BreakoutEnterHotKey: KeyHandler = {
  pattern: "enter",
  handle: (state, event) => {
    const { editor, element } = state;
    if (
      element &&
      element.type === "paragraph" &&
      Node.string(element).length == 0
    ) {
      if (element.breakoutTop) {
        event.preventDefault();
      } else if (element.breakoutBottom) {
        Transforms.insertNodes(editor, {
          type: "paragraph",
          children: [{ text: "" }],
        });
      }
      return true;
    }
    return false;
  },
};
