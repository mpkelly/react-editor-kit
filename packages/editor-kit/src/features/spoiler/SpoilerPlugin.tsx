import React from "react";
import { Plugin } from "../../plugins/Plugin";
import { RenderElementProps } from "slate-react";
import { SpoilerElement } from "./SpoilerElement";
import { registerInline } from "../inlines/Inlines";
import { SpoilerNamedTrigger } from "./SpoilerNamedTrigger";
import { SpoilerEditorStyle } from "./SpoilerEditorStyle";
import { SpoilerPluginAction } from "./SpoilerPluginAction";

export const SpoilerPlugin: Plugin = {
  name: "spoler",
  withPlugin: (editor) => registerInline(editor, "spoiler"),
  triggers: [SpoilerNamedTrigger],
  actions: [SpoilerPluginAction],
  renderElement: (props: RenderElementProps) => {
    if (props.element.type == "spoiler") {
      return <SpoilerElement {...props} />;
    }
    return undefined;
  },
  editorStyle: SpoilerEditorStyle,
};
