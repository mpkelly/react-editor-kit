import { Plugin } from "../../plugins/Plugin";
import { RenderLeafProps, ReactEditor } from "slate-react";
import { renderLeaf } from "../leafs/LeafRenderer";
import { MatchResult } from "../../Index";
import { applyRegexMark, toggleMark } from "../marks/Marks";
import { blockEvent } from "../../ui/Utils";

export const UnderlinePlugin: Plugin = {
  triggers: [{ pattern: /(__)(.{1,})\1/, range: "line-before" }],
  onTrigger: (editor: ReactEditor, matches: MatchResult[]) => {
    if (editor.isMarkSupported("underline")) {
      applyRegexMark(editor, matches[0], "underline");
    }
  },
  renderLeaf: (props: RenderLeafProps) => {
    return renderLeaf(props, "underline", "u");
  },
  onHotKey: [
    {
      pattern: "mod+u",
      handle: (editor, event) => {
        toggleMark(editor, "underline");
        return blockEvent(event);
      },
    },
  ],
};
