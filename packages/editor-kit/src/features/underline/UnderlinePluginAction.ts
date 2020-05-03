import { toggleMark, isMarkActive } from "../marks/Marks";
import { PluginAction } from "../../plugins/PluginAction";

export const UnderlinePluginAction: PluginAction = {
  action: ({ editor }) => {
    toggleMark(editor, "underline");
  },
  isActionActive: ({ editor }) => isMarkActive(editor, "underline"),
};
