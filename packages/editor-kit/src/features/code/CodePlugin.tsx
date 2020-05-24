import React from "react";
import { Plugin } from "../../plugins/Plugin";
import { RenderElementProps, RenderLeafProps, ReactEditor } from "slate-react";
import { highlightCode } from "./CodeHighlighter";
import { NodeEntry, Editor } from "slate";
import { CodeElement } from "./CodeElement";
import { CodeEditorStyle } from "./CodeEditorStyle";
import { CodeGlobalStyle } from "./CodeGlobalStyle";
import { CodeEnterKeyHandler } from "./CodeEnterKeyHandler";
import { CodeDeleteKeyHandler } from "./CodeDeleteKeyHandler";
import { CodeTabKeyHandler } from "./CodeTabKeyHandler";
import { CodeBackspaceKeyHandler } from "./CodeBackspaceKeyHandler";
import { CodeMarkdownTrigger } from "./CodeMarkdownTrigger";
import { CodeNamedTrigger } from "./CodeNamedTrigger";
import { CodePluginAction } from "./CodePluginAction";
import { getActiveNodeType } from "../../editor/Editor";

export type Code = Plugin & CodePluginOptions;

export interface CodePluginOptions {
  hideToolbar?: boolean;
}

export const createCodePlugin = (
  options: CodePluginOptions = { hideToolbar: false }
): Code => {
  return {
    name: "code",
    ...options,
    withPlugin: (editor) => {
      const { insertData } = editor;
      editor.insertData = (data) => {
        const type = getActiveNodeType(editor);
        if (type === "code") {
          const text = data.getData("text/plain");
          if (text) {
            editor.insertText(text);
            return;
          }
        }
        insertData(data);
      };
      return editor;
    },
    triggers: [CodeMarkdownTrigger, CodeNamedTrigger],
    actions: [CodePluginAction],
    onKey: [
      CodeTabKeyHandler,
      CodeDeleteKeyHandler,
      CodeBackspaceKeyHandler,
      CodeEnterKeyHandler,
    ],
    renderLeaf: (props: RenderLeafProps) => {
      const { attributes, children, leaf } = props;
      if (leaf.codeRange) {
        return (
          <span {...attributes} className={`rek-code-${leaf.type}`}>
            {children}
          </span>
        );
      }
    },
    renderElement: (props: RenderElementProps) => {
      if (props.element.type === "code") {
        return <CodeElement {...props} />;
      }
      return undefined;
    },
    decorate: (entry: NodeEntry, editor: ReactEditor) => {
      if (entry[1].length) {
        const [parent] = Editor.parent(editor, entry[1]);
        if (parent && parent.type === "code") {
          return highlightCode(entry, parent.lang);
        }
      }
      return [];
    },
    editorStyle: CodeEditorStyle,
    globalStyle: CodeGlobalStyle,
  };
};

export const CodePlugin = createCodePlugin();
