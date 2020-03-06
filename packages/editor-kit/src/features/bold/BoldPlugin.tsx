import { Plugin } from "../../plugins/Plugin";
import { RenderLeafProps, ReactEditor } from "slate-react";
import { renderLeaf } from "../leafs/LeafRenderer";
import { MatchResult } from "../../editor/Matching";
import { applyRegexMark } from "../marks/Marks";

export const BoldPlugin: Plugin = {
  triggers: [{ pattern: /(\*\*)(.{1,})\1/, range: "block" }],
  onTrigger: (editor: ReactEditor, matches: MatchResult[]) => {
    if (editor.isMarkSupported("bold")) {
      applyRegexMark(editor, matches[0], "bold");
    }
  },
  renderLeaf: (props: RenderLeafProps) => {
    return renderLeaf(props, "bold", "strong");
  }
};
