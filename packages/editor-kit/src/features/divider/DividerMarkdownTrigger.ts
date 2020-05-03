import { Trigger } from "../../plugins/Trigger";

export const DividerMarkdownTrigger: Trigger = {
  pattern: /^\s?-{3,}\s/,
  onMatch: (state, matches, plugin) => {
    if (plugin.actions && matches[0].regexMatch) {
      const text = matches[0].regexMatch[0];
      const size = text.length - 2;
      plugin.actions[0].action(state, plugin, { size });
    }
  },
};
