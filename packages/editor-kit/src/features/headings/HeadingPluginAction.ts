import { isElementActive } from "../elements/Elements";
import { PluginAction } from "../../plugins/PluginAction";
import { Transforms } from "slate";

export const HeadingPluginAction: PluginAction = {
  action: ({ editor }, plugin) => {
    Transforms.setNodes(editor, { type: plugin.name });
  },
  isActionActive: ({ editor }, plugin) => isElementActive(editor, plugin.name),
};
