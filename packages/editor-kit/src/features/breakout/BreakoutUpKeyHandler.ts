import { Transforms, Editor } from "slate";
import { ReactEditor } from "slate-react";
import { KeyHandler } from "../../plugins/KeyHandler";

export const BreakoutUpKeyHandler: KeyHandler = {
  pattern: "ArrowUp",
  handle: (state, event, plugin) => {
    const { editor, element, elementType } = state;
    if (
      element &&
      plugin.paddedBlocks &&
      plugin.paddedBlocks.includes(elementType)
    ) {
      const path = ReactEditor.findPath(editor, element);
      if (event.keyCode === 38) {
        //ArrowUp
        const { selection } = editor;
        if (!selection || selection.focus.offset !== 0) {
          return false;
        }
        const previous = Editor.previous(editor, { at: path });
        if (!previous || previous[0].type !== "paragraph") {
          const before = Editor.before(editor, path);
          Transforms.insertNodes(
            editor,
            { type: "paragraph", breakoutTop: true, children: [{ text: "" }] },
            {
              at: before || path,
              mode: "highest",
            }
          );
          return true;
        }
      }
    }
    return false;
  },
};
