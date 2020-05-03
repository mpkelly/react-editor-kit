import { toggleMark, isMarkActive } from "../marks/Marks";
import { PluginAction } from "../../plugins/PluginAction";

export const SubscriptPluginAction: PluginAction = {
  action: ({ editor }) => {
    toggleMark(editor, "subscript");
  },
  isActionActive: ({ editor }) => isMarkActive(editor, "subscript"),
};
