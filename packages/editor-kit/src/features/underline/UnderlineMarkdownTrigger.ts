import { MatchResult } from "../../editor/Matching";
import { applyRegexMark } from "../marks/Marks";
import { Trigger } from "../../plugins/Trigger";
import { EditorState } from "../../editor/EditorState";

export const UnderlineMarkdownTrigger: Trigger = {
  pattern: /(__)(.{1,})\1/,
  range: "line-before",
  onMatch: (state: EditorState, matches: MatchResult[]) => {
    applyRegexMark(state.editor, matches[0], "underline");
  },
  clear: false,
};
