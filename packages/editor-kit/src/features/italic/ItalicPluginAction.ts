import { toggleMark, isMarkActive } from "../marks/Marks";
import { PluginAction } from "../../plugins/PluginAction";

export const ItalicPluginAction: PluginAction = {
  action: ({ editor }) => {
    toggleMark(editor, "italic");
  },
  isActionActive: ({ editor }) => isMarkActive(editor, "italic"),
};
