import React from "react";
import { Transforms, Editor, Node } from "slate";
import { ReactEditor, RenderElementProps } from "slate-react";
import { Plugin } from "../../plugins/Plugin";
import { getActiveNode, moveToEndOfBlock } from "../../editor/Editor";

export interface BreakoutPluginOptions {
  breakoutBlocks: string[];
  paddedBlocks: string[];
}

export const DefaultOptions: BreakoutPluginOptions = {
  breakoutBlocks: [
    "code-block",
    "quote",
    "info-alert",
    "warning-alert",
    "error-alert",
    "video",
    "divider",
  ],
  paddedBlocks: ["table", "todo-list"],
};

export const createBreakoutPlugin = (options = DefaultOptions): Plugin => {
  return {
    withPlugin: (editor) => {
      const { onChange, normalizeNode } = editor;
      editor.childrenCount = editor.children.length;
      editor.onChange = () => {
        const count = editor.children.length;
        if (count !== editor.childrenCount) {
          editor.childrenCount = count;
          for (let [node, path] of Editor.nodes(editor)) {
            if (options.paddedBlocks.includes(node.type)) {
              const index = editor.children.indexOf(node);
              if (index === 0) {
                Transforms.insertNodes(
                  editor,
                  {
                    type: "paragraph",
                    breakoutTop: true,
                    children: [{ text: "" }],
                  },
                  { at: path }
                );
                editor.childrenCount++;
              }
              if (index === editor.children.length - 1) {
                path[0]++;
                Transforms.insertNodes(
                  editor,
                  {
                    type: "paragraph",
                    breakoutBottom: true,
                    children: [{ text: "" }],
                  },
                  { at: path }
                );
                editor.childrenCount++;
              }
            }
          }
        }
        onChange();
      };
      editor.normalizeNode = ([node, path]) => {
        //Remove breakout attributes when nodes have content
        if (node.breakoutTop && Node.string(node).length > 0) {
          Transforms.setNodes(editor, { breakoutTop: undefined }, { at: path });
        }
        if (node.breakoutBottom && Node.string(node).length > 0) {
          Transforms.setNodes(
            editor,
            { breakoutBottom: undefined },
            { at: path }
          );
        }
        return normalizeNode([node, path]);
      };
      return editor;
    },
    onKeyDown: (event: React.KeyboardEvent, editor: ReactEditor) => {
      if (event.keyCode === 13) {
        const block = getActiveNode(editor);
        if (
          block &&
          block.type === "paragraph" &&
          Node.string(block).length == 0
        ) {
          if (block.breakoutTop) {
            event.preventDefault();
          } else if (block.breakoutBottom) {
            Transforms.insertNodes(editor, {
              type: "paragraph",
              children: [{ text: "" }],
            });
          }
          return true;
        }
      }
      if (handleBreakoutDown(event, editor, options)) {
        return false;
      }
      if (handleBreakoutUp(event, editor, options)) {
        return false;
      }
      return false;
    },
    styleElement: (props: RenderElementProps) => {
      const { element } = props;
      if (
        element.type == "paragraph" &&
        (element.breakoutTop || element.breakoutBottom) &&
        Node.string(element).length == 0
      ) {
        return { height: 1, width: "100%", margin: 0 };
      }
      return undefined;
    },
  };
};

const handleBreakoutDown = (
  event: React.KeyboardEvent,
  editor: ReactEditor,
  options: BreakoutPluginOptions
) => {
  const block = getActiveNode(editor);
  if (block && options.breakoutBlocks.includes(block.type)) {
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
          { type: "paragraph", breakoutBottom: true, children: [{ text: "" }] },
          {
            at: after,
          }
        );
        return true;
      }
    }
  }
  return false;
};

const handleBreakoutUp = (
  event: React.KeyboardEvent,
  editor: ReactEditor,
  options: BreakoutPluginOptions
) => {
  const block = getActiveNode(editor);
  if (block && options.breakoutBlocks.includes(block.type)) {
    const path = ReactEditor.findPath(editor, block);
    if (event.keyCode === 38) {
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
};
