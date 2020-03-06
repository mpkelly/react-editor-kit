import { Plugin } from "../../plugins/Plugin";
import { RenderLeafProps, ReactEditor } from "slate-react";
import { renderLeaf } from "../leafs/LeafRenderer";
import { MatchResult } from "../../Index";
import { applyRegexMark } from "../marks/Marks";

export const UnderlinePlugin: Plugin = {
  triggers: [{ pattern: /(__)(.{1,})\1/, range: "line-before" }],
  onTrigger: (editor: ReactEditor, matches: MatchResult[]) => {
    if (editor.isMarkSupported("underline")) {
      applyRegexMark(editor, matches[0], "underline");
    }
  },
  renderLeaf: (props: RenderLeafProps) => {
    return renderLeaf(props, "underline", "u");
  }
};
