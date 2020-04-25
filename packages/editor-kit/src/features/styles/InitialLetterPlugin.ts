import { Transforms, Editor } from "slate";
import { Plugin } from "../../plugins/Plugin";
import { EditorIcon } from "../icons/Icon";

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
            const [match] = Editor.nodes(editor, {
              match: (node) => node.type === "paragraph" && node.initialLetter,
            });
            return match === null;
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
            const [match] = Editor.nodes(editor, {
              match: (n) => n.type === "paragraph" && n.initialLetter,
            });
            return match !== null;
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
                  match: (node) =>
                    node.type === "paragraph" && node.initialLetter,
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
