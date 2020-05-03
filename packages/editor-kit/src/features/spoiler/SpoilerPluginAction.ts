import { PluginAction } from "../../plugins/PluginAction";
import { toggleInline } from "../inlines/Inlines";

export const SpoilerPluginAction: PluginAction = {
  action: ({ editor }) => toggleInline(editor, "spoiler"),
  isActionActive: ({ elementType }) => elementType === "spoiler",
};
