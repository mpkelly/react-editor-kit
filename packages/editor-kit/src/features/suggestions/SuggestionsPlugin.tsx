import React from "react";
import { Plugin } from "../../plugins/Plugin";
import { ReactEditor, RenderElementProps, RenderLeafProps } from "slate-react";
import { Range, Transforms, Editor, Node } from "slate";
import { Suggestion } from "./Suggestion";
import { Suggestions } from "./Suggestions";
import { addMarkAtRange, deleteBackward } from "../../editor/Editor";
import { MatchResult } from "../../editor/Matching";

export interface SuggestionPluginOptions {
  type: string;
  suggestions: Suggestions;
  globalStyle?: string;
  editorStyle?: string;
}

export const createSuggestionsPlugin = (
  options: SuggestionPluginOptions
): Plugin => {
  return {
    withPlugin: (editor: ReactEditor) => {
      const { isVoid, isInline } = editor;
      editor.isVoid = (element) => {
        return element.type === options.type ? true : isVoid(element);
      };
      editor.isInline = (element) => {
        return element.type === options.type ? true : isInline(element);
      };
      return editor;
    },
    triggers: options.suggestions.triggers,
    onTrigger: (editor: ReactEditor, matches: MatchResult[]) => {
      handleTrigger(editor, matches[0].range, options.type);
    },
    renderLeaf: (props: RenderLeafProps, editor: ReactEditor) => {
      const { leaf } = props;
      const handleChoice = (choice?: any, displayText?: string) => {
        ReactEditor.focus(editor);
        Transforms.setNodes(
          editor,
          { [`${options.type}-marker`]: undefined },
          { match: (node) => node[`${options.type}-marker`] }
        );
        if (choice) {
          deleteBackward(editor, Node.string(leaf).length);

          Transforms.insertNodes(editor, {
            type: options.type,
            children: [{ text: "" }],
            displayText,
            suggestion: choice,
          });
          Editor.insertText(editor, " ");
        }
      };
      if (leaf[`${options.type}-marker`]) {
        return (
          <Suggestion
            {...props}
            type={options.type}
            suggestions={options.suggestions}
            onChoice={handleChoice}
          />
        );
      }
      return undefined;
    },
    renderElement: (props: RenderElementProps) => {
      if (props.element.type === options.type) {
        return options.suggestions.renderSuggestion(props);
      }
    },
    globalStyles: () => `${GlobalStyle}${options.globalStyle || ""}`,
    editorStyles: () => options.editorStyle || "",
  };
};

const handleTrigger = (editor: ReactEditor, range: Range, type: string) => {
  const { selection } = editor;
  if (selection) {
    addMarkAtRange(editor, range, `${type}-marker`, range);
  }
};

const GlobalStyle = `
  .rek-suggestion-list {
    margin: 0;
    padding: 2px;
    background-color: white;    
    margin-top:24px;
    max-height: 250px;
    overflow:auto;
  }
  .rek-suggestion-list li {
    list-style-type: none;    
    padding: 8px;
    font-family:var(--editor-ui-font);    
  }

  .rek-suggestion-list li.active,
  .rek-suggestion-list li:hover {
    background-color: var(--control-hover-color);
  }

  .rek-suggestion-marker {
    color:blue;
  }

  .rek-suggestion-loading {
    height:50px;
    width:120px;
    display:flex;
    align-items:center;
    justify-content:center;
    margin-top:24px;
  }
`;
