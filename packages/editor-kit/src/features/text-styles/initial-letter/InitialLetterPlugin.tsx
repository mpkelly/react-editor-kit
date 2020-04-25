import React from "react";
import { RenderLeafProps } from "slate-react";
import "./Dropcaps";
import { Plugin } from "../../../plugins/Plugin";
import { EditorIcon } from "../../icons/Icon";
import { InitialLetterMenuItem } from "./InitialLetterMenuItem";
import { isInitialLetterActive } from "./InitialLetterAction";

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
    contextMenu: [
      {
        trigger: {
          matched: (editor) => {
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
        // let textAlign = element.textAlign || "left";
        // if (textAlign == "left" || textAlign == "justify") {
        //   return "rek-initial-letter";
        // }
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
