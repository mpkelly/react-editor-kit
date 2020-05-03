import { toggleMark, isMarkActive } from "../marks/Marks";
import { PluginAction } from "../../plugins/PluginAction";

export const StrikethroughPluginAction: PluginAction = {
  action: ({ editor }) => {
    toggleMark(editor, "strikethrough");
  },
  isActionActive: ({ editor }) => isMarkActive(editor, "strikethrough"),
};
