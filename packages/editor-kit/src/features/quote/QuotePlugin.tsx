import { Plugin } from "../../plugins/Plugin";
import { RenderElementProps, ReactEditor } from "slate-react";
import { renderElement } from "../elements/ElementRenderer";
import { toggleBlock } from "../blocks/Blocks";
import { MatchResult } from "../../editor/Matching";
import { deleteBackward } from "../../editor/Editor";

export const QuotePlugin: Plugin = {
  triggers: [
    { pattern: `:quote`, range: "line-before" },
    { pattern: /^>\s$/, range: "line-before" }
  ],
  onTrigger: (editor: ReactEditor, matches: MatchResult[]) => {
    if (matches[0]) {
      const range = matches[0].range;
      const length = range.focus.offset - range.anchor.offset;
      deleteBackward(editor, length);
      toggleBlock(editor, "quote");
    }
  },
  renderElement: (props: RenderElementProps) => {
    return renderElement(props, "quote", "blockquote");
  }
};
