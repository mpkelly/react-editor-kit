import React from "react";
import { RenderLeafProps } from "slate-react";
import "./Dropcaps";
import { Plugin } from "../../plugins/Plugin";
import { EditorIcon } from "../icons/Icon";
import { createInitialLetterContextMenu } from "./InitialLetterContextMenu";
import { InitialLetterPluginAction } from "./InitialLetterPluginAction";

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
        margin-right:4px;
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
    actions: [InitialLetterPluginAction],
    onContextMenu: createInitialLetterContextMenu(options),
    renderLeaf: (props: RenderLeafProps) => {
      const { leaf, children, attributes } = props;
      if (leaf["initial-letter"]) {
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
