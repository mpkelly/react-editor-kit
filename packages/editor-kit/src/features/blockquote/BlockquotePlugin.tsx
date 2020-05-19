import { Plugin } from "../../plugins/Plugin";
import { RenderElementProps } from "slate-react";
import { renderElement } from "../elements/ElementRenderer";
import { BlockquoteMarkdownTrigger } from "./BlockquoteMarkdownTrigger";
import { BlockquoteNamedTrigger } from "./BlockquoteNamedTrigger";
import { BlockquoteEditorStyles } from "./BlockquoteEditorStyle";
import { BlockquotePluginAction } from "./BlockquotePluginAction";

export const BlockquotePlugin: Plugin = {
  name: "blockquote",
  actions: [BlockquotePluginAction],
  triggers: [BlockquoteMarkdownTrigger, BlockquoteNamedTrigger],
  renderElement: (props: RenderElementProps) => {
    return renderElement(props, "blockquote", "blockquote");
  },
  editorStyle: BlockquoteEditorStyles,
};
