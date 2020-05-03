import { toggleMark, isMarkActive } from "../marks/Marks";
import { PluginAction } from "../../plugins/PluginAction";

export const SuperscriptPluginAction: PluginAction = {
  action: ({ editor }) => {
    toggleMark(editor, "superscript");
  },
  isActionActive: ({ editor }) => isMarkActive(editor, "superscript"),
};
