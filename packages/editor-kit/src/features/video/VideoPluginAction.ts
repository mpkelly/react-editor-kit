import { PluginAction } from "../../plugins/PluginAction";
import { Transforms } from "slate";

export const VideoPluginAction: PluginAction = {
  action: ({ editor }) => {
    Transforms.insertNodes(editor, {
      type: "video",
      url: "",
      children: [{ text: "" }], //Include empty child
    });
  },
  isActionActive: ({ elementType }) => elementType === "video",
};
