import { Plugin } from "../../plugins/Plugin";
import { RenderLeafProps } from "slate-react";
import { renderLeaf } from "../leafs/LeafRenderer";
import { BoldPluginAction } from "./BoldPluginAction";
import { BoldMarkdownTrigger } from "./BoldMarkdownTrigger";
import { BoldToggleKeyHandler } from "./BoldToggleKeyHandler";

export const BoldPlugin: Plugin = {
  name: "bold",
  actions: [BoldPluginAction],
  triggers: [BoldMarkdownTrigger],
  onKey: [BoldToggleKeyHandler],
  renderLeaf: (props: RenderLeafProps) => {
    return renderLeaf(props, "bold", "strong");
  },
};
