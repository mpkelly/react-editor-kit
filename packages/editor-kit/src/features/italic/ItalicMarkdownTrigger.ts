import { applyRegexMark } from "../marks/Marks";
import { Trigger } from "../../plugins/Trigger";

export const ItalicMarkdownTrigger: Trigger = {
  pattern: /(^|[^*])\*([^*]+)\*/,
  onMatch: (state, matches) => {
    if (matches[0].regexMatch) {
      matches[0].regexMatch[0] = matches[0].regexMatch[0].trim();
      applyRegexMark(state.editor, matches[0], "italic");
    }
  },
  clear: false,
};
