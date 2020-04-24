import { Transforms } from "slate";
import { Plugin } from "../../plugins/Plugin";
import { getActiveNode } from "../../editor/Editor";
import { EditorIcon } from "../icons/Icon";

export interface InitialLetterPluginOptions {
  style: string;
  onIcon: EditorIcon;
  offIcon: EditorIcon;
}

export const InitialLetterDefaultOptions: InitialLetterPluginOptions = {
  style: `
    .rek-initial-letter::first-letter {
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
            const node = getActiveNode(editor);
            return Boolean(
              node && node.type === "paragraph" && !node.initialLetter
            );
          },
        },
        items: [
          {
            labelKey: "initialLetterOn",
            icon: options.onIcon,
            onClick: (editor) => {
              Transforms.setNodes(editor, { initialLetter: true });
            },
            items: [],
          },
        ],
      },
      {
        trigger: {
          matched: (editor) => {
            const node = getActiveNode(editor);
            return Boolean(
              node && node.type === "paragraph" && node.initialLetter
            );
          },
        },
        items: [
          {
            labelKey: "initialLetterOff",
            icon: options.offIcon,
            onClick: (editor) => {
              Transforms.setNodes(editor, { initialLetter: undefined });
            },
            items: [],
          },
        ],
      },
    ],
    getClasses: (element) => {
      if (element.initialLetter) {
        return "rek-initial-letter";
      }
    },
    editorStyles: () => options.style,
  };
};
