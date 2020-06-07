import React from "react";
import { Transforms, Editor } from "slate";
import { ReactEditor, RenderElementProps } from "slate-react";
import { Plugin } from "../../plugins/Plugin";
import { PageDividerElement } from "./PageDividerElement";
import { PageDividerEditorStyle } from "./PageDividerEditorStyle";
import { findAllNodes } from "../../editor/Editor";

export const createPageDividerPlugin = (pageArea: number): Plugin => {
  return {
    name: "page-divider",
    withPlugin: (editor) => {
      const { onChange, isVoid } = editor;

      editor.isVoid = (node) => {
        return node.type == "page-divider" ? true : isVoid(node);
      };

      editor.onChange = () => {
        onChange();
        const editorElement = ReactEditor.toDOMNode(editor, editor);
        const {
          height,
          width,
        } = editorElement?.getBoundingClientRect() as DOMRect;

        const pageHeight = pageArea / width;
        const pages = Math.floor(height / pageHeight);
        if (pages === editor.pages) {
          return;
        }

        findAllNodes(editor.children, "page-divider")
          .reverse()
          .forEach((node) => {
            Transforms.removeNodes(editor, {
              at: ReactEditor.findPath(editor, node),
            });
          });

        for (let i = 0; i < pages; i++) {
          Transforms.insertNodes(editor, {
            type: "page-divider",
            page: i + 1,
            width,
            height: pageHeight - 1,
            children: [{ text: "" }],
          });
        }
        editor.pages = pages;
      };
      return editor;
    },
    renderElement: (props: RenderElementProps) => {
      const { element } = props;
      if (element.type === "page-divider") {
        return <PageDividerElement {...props} />;
      }
      return undefined;
    },
    editorStyle: PageDividerEditorStyle,
  };
};
