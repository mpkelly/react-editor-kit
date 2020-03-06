import { Plugin } from "../../plugins/Plugin";
import { RenderLeafProps, ReactEditor } from "slate-react";
import { renderLeaf } from "../leafs/LeafRenderer";
import { applyRegexMark } from "../marks/Marks";
import { MatchResult } from "../../Index";

export const InlineCodePlugin: Plugin = {
  triggers: [{ pattern: /(`)(.{1,})\1/, range: "block" }],
  onTrigger: (editor: ReactEditor, matches: MatchResult[]) => {
    applyRegexMark(editor, matches[0], "inline-code");
  },
  renderLeaf: (props: RenderLeafProps) => {
    return renderLeaf(props, "inline-code", "code");
  }
};
