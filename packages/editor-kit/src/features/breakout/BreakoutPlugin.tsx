import React from "react";
import { ReactEditor } from "slate-react";
import { Plugin } from "../../plugins/Plugin";
import { Transforms, Editor } from "slate";
import { getActiveNode, moveToEndOfBlock } from "../../editor/Editor";

export interface BreakoutPluginOptions {
  blocks: string[];
}

export const DefaultOptions: BreakoutPluginOptions = {
  blocks: ["code-block", "quote", "info-alert", "warning-alert", "error-alert"],
};

export const createBreakoutPlugin = (options = DefaultOptions): Plugin => {
  return {
    onKeyDown: (event: React.KeyboardEvent, editor: ReactEditor) => {
      const block = getActiveNode(editor);
      if (block && options.blocks.includes(block.type)) {
        const path = ReactEditor.findPath(editor, block);
        if (event.keyCode === 40) {
          //ArrowDown
          const next = Editor.next(editor, { at: path });
          if (!next || next[0].type !== "paragraph") {
            const after = next ? next[1] : undefined;
            if (!after) {
              moveToEndOfBlock(editor);
            }
            Transforms.insertNodes(
              editor,
              { type: "paragraph", children: [{ text: "" }] },
              {
                at: after,
              }
            );
          }
        } else if (event.keyCode === 38) {
          //ArrowUp
          const { selection } = editor;
          if (!selection || selection.focus.offset !== 0) {
            return;
          }
          const previous = Editor.previous(editor, { at: path });
          if (!previous || previous[0].type !== "paragraph") {
            const before = Editor.before(editor, path);
            Transforms.insertNodes(
              editor,
              { type: "paragraph", children: [{ text: "" }] },
              {
                at: before || path,
                mode: "highest",
              }
            );
          }
        }
      }
      return false;
    },
  };
};
