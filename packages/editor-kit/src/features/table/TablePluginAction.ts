import { PluginAction } from "../../plugins/PluginAction";
import { Transforms } from "slate";
import { clone } from "../../ui/Utils";
import { isElementActive } from "../elements/Elements";

export const TablePluginAction: PluginAction = {
  action: ({ editor }, plugin) => {
    Transforms.insertNodes(editor, clone(plugin.defaultTable));
  },
  isActionActive: ({ editor }) => isElementActive(editor, "table"),
};
