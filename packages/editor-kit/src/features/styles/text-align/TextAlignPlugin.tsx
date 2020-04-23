import { RenderElementProps } from "slate-react";
import { Plugin } from "../../../plugins/Plugin";

export const TextAlignPlugin: Plugin = {
  name: "text-align",
  styleElement: (props: RenderElementProps) => {
    const { element } = props;
    console.log("S", element.type, element.textAlign);
    if (!element.textAlign) {
      return undefined;
    }
    return { textAlign: element.textAlign };
  },
};
