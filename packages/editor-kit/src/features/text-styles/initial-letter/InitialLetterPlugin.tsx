import React from "react";
import { Plugin } from "../../../plugins/Plugin";
import { EditorIcon } from "../../icons/Icon";
import { isMarkActive } from "../../marks/Marks";
import { InitialLetterMenuItem } from "./InitialLetterMenuItem";
import { BoldMenuItem } from "../../blocks/BoldMenuItem";

export interface InitialLetterPluginOptions {
  style: string;
  onIcon: EditorIcon;
  offIcon: EditorIcon;
}

export const InitialLetterDefaultOptions: InitialLetterPluginOptions = {
  style: `
    .rek-initial-letter:first-of-type::first-letter {
      float: left;
      font-size: 75px;
      line-height: 60px;
      padding-top: 4px;
      padding-right: 8px;
      padding-left: 3px;
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
            return !isMarkActive(editor, "initialLetter");
          },
        },
        items: [
          <InitialLetterMenuItem
            labelKey={"initialLetterOn"}
            icon={options.onIcon}
          />,
          <BoldMenuItem text="Bold" />,
        ],
      },
      {
        trigger: {
          matched: (editor) => {
            return isMarkActive(editor, "initialLetter");
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
    getClasses: (element) => {
      if (!element.initialLetter) {
        return undefined;
      }
      let textAlign = element.textAlign || "left";
      if (textAlign == "left" || textAlign == "justify") {
        return "rek-initial-letter";
      }
    },
    editorStyles: () => options.style,
  };
};
