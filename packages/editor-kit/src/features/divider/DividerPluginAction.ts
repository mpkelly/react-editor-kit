import { Transforms } from "slate";
import { PluginAction } from "../../plugins/PluginAction";
import { isElementActive } from "../blocks/Elements";

export const DividerPluginAction: PluginAction = {
  action: ({ editor }, plugin, args) => {
    if (args) {
      Transforms.insertNodes(editor, {
        type: "divider",
        children: [{ text: "" }],
        size: args.size,
      });
    }
  },
  isActionActive: ({ editor }) => isElementActive(editor, "divider"),
};
