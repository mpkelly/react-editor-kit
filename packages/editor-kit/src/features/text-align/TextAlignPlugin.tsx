import { RenderElementProps } from "slate-react";
import { Plugin } from "../../plugins/Plugin";
import { TextAlignPluginAction } from "./TextAlignPluginAction";

export const TextAlignPlugin: Plugin = {
  name: "text-align",
  actions: [TextAlignPluginAction],
  styleElement: (props: RenderElementProps) => {
    const { element } = props;
    if (!element.textAlign) {
      return undefined;
    }
    return { textAlign: element.textAlign };
  },
};
