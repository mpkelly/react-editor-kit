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

export const CodePlugin: Plugin = {
  name: "code",
  withPlugin: (editor) => {
    const { insertData } = editor;
    editor.insertData = (data) => {
      const text = data.getData("text/plain");
      if (text) {
        editor.insertText(text);
        return;
      }
      insertData(data);
    };
    return editor;
  },
  triggers: [CodeMarkdownTrigger, CodeNamedTrigger],
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
    if (props.element.type === "code-block") {
      return <CodeElement {...props} />;
    }
    return undefined;
  },
  decorate: (entry: NodeEntry, editor: ReactEditor) => {
    if (entry[1].length) {
      const [parent] = Editor.parent(editor, entry[1]);
      if (parent && parent.type === "code-block") {
        return highlightCode(entry, parent.lang);
      }
    }
    return [];
  },
  editorStyle: CodeEditorStyle,
  globalStyle: CodeGlobalStyle,
};
