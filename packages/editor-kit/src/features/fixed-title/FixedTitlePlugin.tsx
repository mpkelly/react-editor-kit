import * as React from "react";
import { Plugin } from "../../plugins/Plugin";
import { Transforms } from "slate";
import { RenderElementProps } from "slate-react";
import { FixedTitleEditorStyle } from "./FixedTitleEditorStyle";
import { FixedTitleEnterKeyHandler } from "./FixedTitleEnterKeyHandler";
import { FixedTitleElement } from "./FixedTitleElement";

export const createEmptyFixedBlock = (text = "") => ({
  type: "fixed-title",
  children: [{ text }],
});

export const createFixedTitlePlugin = (
  placeholder = "Enter a title",
  createBlock = createEmptyFixedBlock
): Plugin => {
  return {
    name: "fixed-title",
    withPlugin: (editor) => {
      const { normalizeNode } = editor;
      editor.normalizeNode = (node) => {
        if (
          !editor.children.length ||
          editor.children[0].type !== "fixed-title"
        ) {
          Transforms.insertNodes(editor, createBlock(), { at: [0] });
        }
        return normalizeNode(node);
      };
      return editor;
    },
    renderElement: (props: RenderElementProps) => {
      if (props.element.type === "fixed-title") {
        return <FixedTitleElement {...props} placeholder={placeholder} />;
      }
      return undefined;
    },
    onKey: [FixedTitleEnterKeyHandler],
    editorStyle: FixedTitleEditorStyle,
  };
};
