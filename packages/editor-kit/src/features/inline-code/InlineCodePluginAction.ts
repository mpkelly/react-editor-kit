import { toggleMark, isMarkActive } from "../marks/Marks";
import { PluginAction } from "../../plugins/PluginAction";

export const InlineCodePluginAction: PluginAction = {
  action: (state) => {
    toggleMark(state.editor, "inline-code");
  },
  isActionActive: (state) => isMarkActive(state.editor, "inline-code"),
};
