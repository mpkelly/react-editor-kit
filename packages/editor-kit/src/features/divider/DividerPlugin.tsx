import React from "react";
import { Plugin } from "../../plugins/Plugin";
import { RenderElementProps } from "slate-react";
import { DividerEditorStyle } from "./DividerEditorStyle";
import { DividerElement } from "./DividerElement";
import { registerVoid } from "../void/VoidElement";
import { DividerMarkdownTrigger } from "./DividerMarkdownTrigger";
import { DividerPluginAction } from "./DividerPluginAction";

export const DividerPlugin: Plugin = {
  name: "divider",
  withPlugin: (editor) => registerVoid(editor, "divider"),
  actions: [DividerPluginAction],
  triggers: [DividerMarkdownTrigger],
  editorStyle: DividerEditorStyle,
  renderElement: (props: RenderElementProps) => {
    if (props.element.type === "divider") {
      return <DividerElement {...props} />;
    }
  },
};
