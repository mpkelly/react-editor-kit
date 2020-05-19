import { Transforms } from "slate";
import { PluginAction } from "../../plugins/PluginAction";
import { createLayout } from "./Layout";

export const LayoutPluginAction: PluginAction = {
  action: ({ editor }, plugin, args) => {
    let layout = [2, 1];
    if (args && args.layout) {
      layout = args.layout;
    }
    console.log("Here", layout);
    Transforms.insertNodes(editor, createLayout(layout));
  },
  isActionActive: ({ elementType }) => elementType === "layout-cell",
};
