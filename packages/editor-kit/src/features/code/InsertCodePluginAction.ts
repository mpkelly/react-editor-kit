import { PluginAction } from "../../plugins/PluginAction";

export const InsertCodePluginAction: PluginAction = {
  action: ({ editor }) => {
    editor.insertNode({
      type: "code-block",
      children: [{ text: "" }],
      lang: "JavaScript",
    });
  },
  isActionActive: ({ element }) => Boolean(element && element.type == "code"),
};
