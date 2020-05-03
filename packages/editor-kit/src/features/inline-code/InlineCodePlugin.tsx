import { Plugin } from "../../plugins/Plugin";
import { RenderLeafProps } from "slate-react";
import { renderLeaf } from "../leafs/LeafRenderer";
import { InlineCodeEditorStyle } from "./InlineCodeEditorStyle";
import { InlineCodeMarkdownTrigger } from "./InlineCodeMarkdownTrigger";
import { InlineCodePluginAction } from "./InlineCodePluginAction";

export const InlineCodePlugin: Plugin = {
  name: "inline-code",
  actions: [InlineCodePluginAction],
  triggers: [InlineCodeMarkdownTrigger],
  renderLeaf: (props: RenderLeafProps) => {
    return renderLeaf(props, "inline-code", "code");
  },
  editorStyle: InlineCodeEditorStyle,
};
