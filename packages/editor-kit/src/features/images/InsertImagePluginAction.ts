import { Transforms } from "slate";
import { PluginAction } from "../../plugins/PluginAction";

export const InsertImagePluginAction: PluginAction = {
  action: ({ editor }, plugin, args) => {
    if (args) {
      const image = { type: "image", ...args, children: [{ text: "" }] };
      Transforms.insertNodes(editor, image);
    }
  },
  isActionActive: ({ elementType }) => elementType === "image",
};
