import { Plugin } from "../../plugins/Plugin";
import { RenderLeafProps } from "slate-react";
import { renderLeaf } from "../leafs/LeafRenderer";
import { ItalicToggleKeyHandler } from "./ItalicToggleKeyHandler";
import { ItalicMarkdownTrigger } from "./ItalicMarkdownTrigger";
import { ItalicPluginAction } from "./ItalicPluginAction";

export const ItalicPlugin: Plugin = {
  name: "italic",
  triggers: [ItalicMarkdownTrigger],
  actions: [ItalicPluginAction],
  renderLeaf: (props: RenderLeafProps) => {
    return renderLeaf(props, "italic", "em");
  },
  onKey: [ItalicToggleKeyHandler],
};
