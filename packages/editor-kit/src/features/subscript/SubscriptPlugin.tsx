import { Plugin } from "../../plugins/Plugin";
import { RenderLeafProps } from "slate-react";
import { renderLeaf } from "../leafs/LeafRenderer";
import { SubscriptMarkdownTrigger } from "./SubscriptMarkdownTrigger";
import { SubscriptPluginAction } from "./SubscriptPluginAction";

export const SubscriptPlugin: Plugin = {
  name: "subscript",
  actions: [SubscriptPluginAction],
  triggers: [SubscriptMarkdownTrigger],
  renderLeaf: (props: RenderLeafProps) => {
    return renderLeaf(props, "subscript", "sub");
  },
};
