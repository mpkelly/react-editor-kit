import { PluginAction } from "../../plugins/PluginAction";
import { toggleElement } from "../blocks/Elements";

export const BlockquotePluginAction: PluginAction = {
  action: ({ editor }) => {
    toggleElement(editor, "blockquote");
  },
  isActionActive: ({ elementType }) => elementType == "blockquote",
};
