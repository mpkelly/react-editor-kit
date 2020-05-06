import { Transforms, Editor } from "slate";
import { ReactEditor } from "slate-react";
import { moveToEndOfBlock } from "../../editor/Editor";
import { KeyHandler } from "../../plugins/KeyHandler";

export const BreakoutDownKeyHandler: KeyHandler = {
  pattern: "ArrowDown",
  handle: (state, event, plugin) => {
    const { editor, element } = state;
    if (
      element &&
      plugin.paddedBlocks &&
      plugin.paddedBlocks.includes(element.type)
    ) {
      const path = ReactEditor.findPath(editor, element);
      const next = Editor.next(editor, { at: path });
      if (!next || next[0].type !== "paragraph") {
        const after = next ? next[1] : undefined;
        if (!after) {
          moveToEndOfBlock(editor);
        }
        Transforms.insertNodes(
          editor,
          { type: "paragraph", breakoutBottom: true, children: [{ text: "" }] },
          {
            at: after,
          }
        );
        return true;
      }
    }
    return false;
  },
};
