import { Plugin } from "../../plugins/Plugin";
import { RenderLeafProps } from "slate-react";
import { renderLeaf } from "../leafs/LeafRenderer";
import { UnderlineMarkdownTrigger } from "./UnderlineMarkdownTrigger";
import { UnderlinePluginAction } from "./UnderlinePluginAction";
import { UnderlineToggleKeyHandler } from "./UnderlineToggleKeyHandler";

export const UnderlinePlugin: Plugin = {
  name: "underline",
  triggers: [UnderlineMarkdownTrigger],
  actions: [UnderlinePluginAction],
  onKey: [UnderlineToggleKeyHandler],
  renderLeaf: (props: RenderLeafProps) => {
    return renderLeaf(props, "underline", "u");
  },
};
