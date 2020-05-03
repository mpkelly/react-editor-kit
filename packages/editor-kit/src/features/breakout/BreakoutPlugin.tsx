import { Transforms, Editor, Node } from "slate";
import { ReactEditor, RenderElementProps } from "slate-react";
import { Plugin } from "../../plugins/Plugin";
import { BreakoutEnterHotKey } from "./BreakoutEnterKeyHandler";
import { BreakoutUpHotKey } from "./BreakoutUpKeyHandler";
import { BreakoutDownHotKey } from "./BreakoutDownKeyHandler";

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
    name: "breakout",
    ...options,
    withPlugin: (editor) => breakoutEditorExtension(editor, options),
    onHotKey: [BreakoutEnterHotKey, BreakoutUpHotKey, BreakoutDownHotKey],
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

export const breakoutEditorExtension = (
  editor: ReactEditor,
  options: BreakoutPluginOptions
) => {
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
      Transforms.setNodes(editor, { breakoutBottom: undefined }, { at: path });
    }
    return normalizeNode([node, path]);
  };
  return editor;
};
