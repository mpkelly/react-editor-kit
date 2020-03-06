import { Plugin } from "../../plugins/Plugin";
import { RenderLeafProps, ReactEditor } from "slate-react";
import { renderLeaf } from "../leafs/LeafRenderer";
import { MatchResult } from "../../Index";
import { applyRegexMark } from "../marks/Marks";

export const StrikethroughPlugin: Plugin = {
  triggers: [{ pattern: /(\~~)(.{1,})\1/, range: "block" }],
  onTrigger: (editor: ReactEditor, matches: MatchResult[]) => {
    if (editor.isMarkSupported("strikethrough")) {
      applyRegexMark(editor, matches[0], "strikethrough");
    }
  },
  renderLeaf: (props: RenderLeafProps) => {
    return renderLeaf(props, "strikethrough", "del");
  }
};
