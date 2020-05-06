import { PluginAction } from "../../plugins/PluginAction";

export const InsertCodePluginAction: PluginAction = {
  action: ({ editor }) => {
    editor.insertNode({
      type: "code",
      children: [{ text: "" }],
      lang: "JavaScript",
    });
  },
  isActionActive: ({ elementType }) => elementType === "code",
};
