import React from "react";
import { Plugin } from "../../plugins/Plugin";
import { ReactEditor, RenderElementProps, RenderLeafProps } from "slate-react";
import { Range, Transforms, Editor, Node } from "slate";
import { Suggestion } from "./Suggestion";
import { Suggestions } from "./Suggestions";
import { addMarkAtRange, deleteBackward } from "../../editor/Editor";
import { MatchResult } from "../../editor/Matching";
import { createSuggestionGlobalStyle } from "./SuggestionsGlobalStyle";
import { registerVoid } from "../void/VoidElement";
import { registerInline } from "../inlines/Inlines";
import { SuggestionsPluginAction } from "./SuggestionsPluginAction";

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
    name: options.type,
    withPlugin: (editor) =>
      registerInline(registerVoid(editor, options.type), options.type),
    triggers: options.suggestions.triggers,
    actions: [SuggestionsPluginAction],
    renderLeaf: (props: RenderLeafProps, { editor }) => {
      const { leaf } = props;
      const handleChoice = (choice?: any) => {
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
            value: choice,
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
    globalStyle: createSuggestionGlobalStyle(options.globalStyle),
    editorStyle: options.editorStyle || "",
  };
};
