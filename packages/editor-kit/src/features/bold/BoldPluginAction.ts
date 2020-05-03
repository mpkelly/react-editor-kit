import { toggleMark, isMarkActive } from "../marks/Marks";
import { PluginAction } from "../../plugins/PluginAction";

export const BoldPluginAction: PluginAction = {
  action: ({ editor }) => {
    toggleMark(editor, "bold");
  },
  isActionActive: ({ editor }) => isMarkActive(editor, "bold"),
};
