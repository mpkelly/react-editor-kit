import { toggleElement, isElementActive } from "../elements/Elements";
import { PluginAction } from "../../plugins/PluginAction";

export const HeadingTogglePluginAction: PluginAction = {
  action: ({ editor }, plugin, args) => {
    if (args) {
      toggleElement(editor, args.heading);
    }
  },
  isActionActive: ({ editor }, plugin, args) =>
    Boolean(args && isElementActive(editor, args.heading)),
};
