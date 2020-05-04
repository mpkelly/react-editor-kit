import { applyRegexMark } from "../marks/Marks";
import { Trigger } from "../../plugins/Trigger";

export const InlineCodeMarkdownTrigger: Trigger = {
  pattern: /(`)([^`]+)\1/,
  range: "line-before",
  onMatch: (state, matches) => {
    applyRegexMark(state.editor, matches[0], "inline-code");
  },
  clear: false,
};
