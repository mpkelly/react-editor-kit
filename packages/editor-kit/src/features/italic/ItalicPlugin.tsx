import { Plugin } from "../../plugins/Plugin";
import { RenderLeafProps, ReactEditor } from "slate-react";
import { renderLeaf } from "../leafs/LeafRenderer";
import { MatchResult } from "../../Index";
import { applyRegexMark } from "../marks/Marks";

export const ItalicPlugin: Plugin = {
  triggers: [{ pattern: /(^|[^*])\*([^*]+)\*/, range: "block" }],
  onTrigger: (editor: ReactEditor, matches: MatchResult[]) => {
    if (editor.isMarkSupported("italic")) {
      if (matches.length && matches[0].regexMatch) {
        matches[0].regexMatch[0] = matches[0].regexMatch[0].substring(
          matches[0].regexMatch[0].indexOf("*")
        );
        applyRegexMark(editor, matches[0], "italic");
      }
    }
  },
  renderLeaf: (props: RenderLeafProps) => {
    return renderLeaf(props, "italic", "em");
  }
};
