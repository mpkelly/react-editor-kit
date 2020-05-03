import React from "react";
import { RenderLeafProps } from "slate-react";
import "./Dropcaps";
import { Plugin } from "../../plugins/Plugin";
import { EditorIcon } from "../icons/Icon";
import { createInitialLetterContextMenu } from "./InitialLetterContextMenu";

export interface InitialLetterPluginOptions {
  style: string;
  onIcon: EditorIcon;
  offIcon: EditorIcon;
}

export interface InitialLetterPlugin
  extends Plugin,
    InitialLetterPluginOptions {}

export const InitialLetterDefaultOptions: InitialLetterPluginOptions = {
  style: `
    .rek-initial-letter *{
        line-height:0 !important;
      }
    }
  `,
  onIcon: {
    className: "material-icons-round",
    ligature: "text_fields",
  },
  offIcon: {
    className: "material-icons-round",
    ligature: "text_fields",
  },
};

export const createInitialLetterPlugin = (
  options = InitialLetterDefaultOptions
): Plugin => {
  return {
    name: "initial-letter",
    ...options,
    withPlugin: (editor) => {
      const { normalizeNode } = editor;
      editor.normalizeNode = ([node, path]) => {
        if (node.children && node.children.length) {
          //TODO force initial letter to be first char
        }
        return normalizeNode([node, path]);
      };
      return editor;
    },
    onContextMenu: createInitialLetterContextMenu(options),
    renderLeaf: (props: RenderLeafProps) => {
      const { leaf, children, attributes } = props;
      if (leaf.initialLetter) {
        setTimeout(() => {
          const dropcaps = document.querySelectorAll(".rek-initial-letter");
          (window as any).Dropcap.layout(dropcaps, 3);
        }, 1);
        return (
          <span className="rek-initial-letter" {...attributes}>
            {children}
          </span>
        );
      }
    },
    editorStyle: options.style,
  };
};
