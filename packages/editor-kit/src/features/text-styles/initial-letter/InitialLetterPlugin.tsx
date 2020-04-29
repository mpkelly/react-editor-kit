import React from "react";
import { Transforms, Node, Editor } from "slate";
import { RenderLeafProps, ReactEditor } from "slate-react";
import "./Dropcaps";
import { Plugin } from "../../../plugins/Plugin";
import { EditorIcon } from "../../icons/Icon";
import { InitialLetterMenuItem } from "./InitialLetterMenuItem";
import { isInitialLetterActive } from "./InitialLetterAction";
import { useEditorKit } from "../../../editor/EditorKit";

export interface InitialLetterPluginOptions {
  style: string;
  onIcon: EditorIcon;
  offIcon: EditorIcon;
}

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
    withPlugin: (editor) => {
      const { normalizeNode } = editor;
      editor.normalizeNode = ([node, path]) => {
        if (node.children && node.children.length) {
          const child = node.children.find((text: Node) => text.initialLetter);
          //TODO force initial letter to be first char
        }
        return normalizeNode([node, path]);
      };
      return editor;
    },
    contextMenu: [
      {
        trigger: {
          matched: (editor) => {
            console.log("Check");
            return !isInitialLetterActive(editor);
          },
        },
        items: [
          <InitialLetterMenuItem
            labelKey={"initialLetterOn"}
            icon={options.onIcon}
          />,
        ],
      },
      {
        trigger: {
          matched: (editor) => {
            return isInitialLetterActive(editor);
          },
        },
        items: [
          <InitialLetterMenuItem
            labelKey={"initialLetterOff"}
            icon={options.onIcon}
          />,
        ],
      },
    ],
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
    editorStyles: () => options.style,
  };
};
