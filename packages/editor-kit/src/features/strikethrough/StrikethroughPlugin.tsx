import { Plugin } from "../../plugins/Plugin";
import { RenderLeafProps } from "slate-react";
import { renderLeaf } from "../leafs/LeafRenderer";
import { StrikethroughMarkdownTrigger } from "./StrikethroughMarkdownTrigger";
import { StrikethroughPluginAction } from "./StrikethroughPluginAction";

export const StrikethroughPlugin: Plugin = {
  name: "strikethrough",
  triggers: [StrikethroughMarkdownTrigger],
  actions: [StrikethroughPluginAction],
  renderLeaf: (props: RenderLeafProps) => {
    return renderLeaf(props, "strikethrough", "del");
  },
};
