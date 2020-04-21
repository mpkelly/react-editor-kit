import { Plugin } from "../../plugins/Plugin";
import { RenderElementProps, ReactEditor } from "slate-react";
import { renderElement } from "../elements/ElementRenderer";
import { toggleBlock } from "../blocks/Blocks";
import { MatchResult } from "../../editor/Matching";
import { deleteBackward } from "../../editor/Editor";

export const QuotePlugin: Plugin = {
  triggers: [
    { pattern: `:quote`, range: "line-before" },
    { pattern: /^\s?>$/, range: "block" },
  ],
  onTrigger: (editor: ReactEditor, matches: MatchResult[]) => {
    if (editor.isNodeSupported("quote") && matches[0]) {
      const range = matches[0].range;
      const length = range.focus.offset - range.anchor.offset;
      deleteBackward(editor, length);
      toggleBlock(editor, "quote");
    }
  },
  renderElement: (props: RenderElementProps) => {
    return renderElement(props, "quote", "blockquote");
  },
  editorStyles: () => EditorStyles,
};

const EditorStyles = `
  blockquote {
    border-left: 6px solid var(--divider-color);
    padding-top: 4px;
    padding-bottom: 4px;
    padding-left: 16px;
  }
`;
