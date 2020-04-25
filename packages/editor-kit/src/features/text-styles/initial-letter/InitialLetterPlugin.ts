import { Transforms, Editor, Range } from "slate";
import { Plugin } from "../../../plugins/Plugin";
import { EditorIcon } from "../../icons/Icon";
import { getActiveNode } from "../../../editor/Editor";
import { ReactEditor } from "slate-react";
import { isMarkActive, toggleMark } from "../../marks/Marks";

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
          {
            labelKey: "initialLetterOn",
            icon: options.onIcon,
            onClick: (editor) => {
              const node = getActiveNode(editor);
              const path = ReactEditor.findPath(editor, node as any);
              console.log(path, node);
              const selection: Range = {
                anchor: { path, offset: 0 },
                focus: { path, offset: 1 },
              };
              ReactEditor.focus(editor);
              Transforms.setSelection(editor, selection);
              setTimeout(() => {
                toggleMark(editor, "initialLetter", true);
              }, 1);
            },
            items: [],
          },
        ],
      },
      {
        trigger: {
          matched: (editor) => {
            return isMarkActive(editor, "initialLetter");
          },
        },
        items: [
          {
            labelKey: "initialLetterOff",
            icon: options.offIcon,
            onClick: (editor) => {
              Transforms.setNodes(
                editor,
                { initialLetter: undefined },
                {
                  match: (node) => node.initialLetter,
                }
              );
            },
            items: [],
          },
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
