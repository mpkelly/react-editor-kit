import { RenderLeafProps } from "slate-react";
import { Plugin } from "../../plugins/Plugin";
import { renderLeaf } from "../leafs/LeafRenderer";
import { SuperscriptMarkdownTrigger } from "./SuperscriptMarkdownTrigger";
import { SuperscriptPluginAction } from "./SuperscriptPluginAction";

export const SuperscriptPlugin: Plugin = {
  name: "superscript",
  triggers: [SuperscriptMarkdownTrigger],
  actions: [SuperscriptPluginAction],
  renderLeaf: (props: RenderLeafProps) => {
    return renderLeaf(props, "superscript", "sup");
  },
};
