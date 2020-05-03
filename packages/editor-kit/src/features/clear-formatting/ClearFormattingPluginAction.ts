import { PluginAction } from "../../plugins/PluginAction";

export const ClearFormattingPluginAction: PluginAction = {
  action: (state, plugin) => {
    plugin.formats.forEach((mark: string) => {
      state.editor.removeMark(mark);
    });
  },
  isActionActive: () => false,
};
