import { MatchResult } from "../../editor/Matching";
import { applyRegexMark } from "../marks/Marks";
import { Trigger } from "../../plugins/Trigger";
import { EditorState } from "../../editor/EditorState";

export const SubscriptMarkdownTrigger: Trigger = {
  pattern: /(^|[^~])\~([^~]+)\~/,
  onMatch: (state: EditorState, matches: MatchResult[]) => {
    if (matches[0].regexMatch) {
      matches[0].regexMatch[0] = matches[0].regexMatch[0].trim();
      applyRegexMark(state.editor, matches[0], "subscript");
    }
  },
  clear: false,
};
