import React from "react";
import { Plugin } from "../../plugins/Plugin";
import { RenderElementProps, RenderLeafProps, ReactEditor } from "slate-react";
import { highlightCode } from "./Highlighter";
import { NodeEntry, Editor } from "slate";
import { CodeBlock } from "./CodeBlock";
import {
  isAtStartOfNode,
  isNodeFocused,
  deleteBackward,
} from "../../editor/Editor";
import { isDeleting } from "../../ui/Utils";
import { MatchResult } from "../../editor/Matching";

export const CodeHighlighterPlugin: Plugin = {
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
  triggers: [
    { pattern: "```", range: "word-before" },
    { pattern: ":code", range: "line-before" },
  ],
  onTrigger: (editor: ReactEditor, matches: MatchResult[]) => {
    if (!editor.isNodeSupported("code-block")) {
      return;
    }
    if (matches[0]) {
      const range = matches[0].range;
      const length = range.focus.offset - range.anchor.offset;
      deleteBackward(editor, length);
      editor.insertNode({
        type: "code-block",
        children: [{ text: "" }],
        lang: "JavaScript",
      });
    }
  },
  onKeyDown: (event, editor) => {
    return handleKeyDown(event, editor);
  },
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
      return <CodeBlock {...props} />;
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
  editorStyles: () => EditorStyle,
  globalStyles: () => GlobalStyle,
};

const handleKeyDown = (event: React.KeyboardEvent, editor: ReactEditor) => {
  if (!isNodeFocused(editor, "code-block")) {
    return false;
  }

  if (event.keyCode === 9) {
    editor.insertText("  ");
    event.preventDefault();
    return true;
  }

  if (isDeleting(event)) {
    if (isAtStartOfNode(editor)) {
      event.preventDefault();
      return true;
    }
  } else if (event.keyCode === 13) {
    //Enter key
    event.preventDefault();
    editor.insertText("\n");
    return true;
  }
};

const GlobalStyle = `
  .rek-code-block-toolbar {
    display:flex;
    align-items:center;
    padding:4px;

    input {
      padding:4px;
      height:30px;
    }

    .rek-icon.rek-delete-icon path {
      cursor:pointer;
      fill:var(--secondary-text-color);      
    }

    .rek-icon.rek-delete-icon:hover path{
      fill:var(--danger-color);
    }
  }
`;

const EditorStyle = `
  .rek-code-block {
    background-color:var(--input-background-color);
    padding:8px;     
  }  

 .rek-code-block.sql,
 .rek-code-block.perl,
 .rek-code-block.css,
 .rek-code-block.go,
 .rek-code-block.clojure,
 .rek-code-block.markup,
 .rek-code-block.swift,
 .rek-code-block.clike,
 .rek-code-block.js {   
  
  .rek-code-keyword {
    color:blue;
  }
  
  .rek-code-keyword {
    color:blue;
  }
  
  .rek-code-function {
    color:blue;
  }
  
  .rek-code-punctuation {
    color:orange;
  }

  .rek-code-variable {
    color:blue;
  }
  
  .rek-code-number {
    color:mediumseagreen;
  }
  
  .rek-code-string {
    color:mediumseagreen;
  }

  .rek-code-boolean {
    color:mediumseagreen;
  }

  .rek-code-attr-value {
    color:mediumseagreen;
  }

  .rek-code-tag {
    color:blue;
  }
 }
`;
