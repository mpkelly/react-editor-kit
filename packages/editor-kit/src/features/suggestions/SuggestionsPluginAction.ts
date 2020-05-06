import { isMarkActive } from "../marks/Marks";
import { PluginAction } from "../../plugins/PluginAction";
import { addMarkAtRange } from "../../editor/Editor";

export const SuggestionsPluginAction: PluginAction = {
  action: ({ editor, selection }, plugin, args) => {
    if (selection && args && args.matches) {
      const range = args.matches[0].range;
      addMarkAtRange(editor, range, `${plugin.name}-marker`, range);
    }
  },
  isActionActive: ({ editor }, plugin) =>
    isMarkActive(editor, `${plugin.name}-marker`),
};
