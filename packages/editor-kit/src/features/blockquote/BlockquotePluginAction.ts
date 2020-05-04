import { PluginAction } from "../../plugins/PluginAction";
import { toggleElement } from "../elements/Elements";

export const BlockquotePluginAction: PluginAction = {
  action: ({ editor }) => {
    toggleElement(editor, "blockquote");
  },
  isActionActive: ({ elementType }) => elementType == "blockquote",
};
