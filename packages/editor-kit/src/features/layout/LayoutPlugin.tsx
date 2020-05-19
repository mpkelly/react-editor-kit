import React from "react";
import { Plugin } from "../../plugins/Plugin";
import { RenderElementProps } from "slate-react";
import { LayoutPluginAction } from "./LayoutPluginAction";
import { LayoutEditorStyle } from "./LayoutEditorStyle";
import { LayoutElement } from "./LayoutElement";
import { LayoutCellElement } from "./LayoutCellElement";
import { LayoutNamedTrigger } from "./LayoutNamedTrigger";
import { LayoutGlobalStyle } from "./LayoutGlobalStyle";

export const LayoutPlugin: Plugin = {
  name: "layout",
  actions: [LayoutPluginAction],
  triggers: [LayoutNamedTrigger],
  renderElement: (props: RenderElementProps) => {
    switch (props.element.type) {
      case "layout":
        return <LayoutElement {...props} />;
      case "layout-cell":
        return <LayoutCellElement {...props} />;
    }
  },
  editorStyle: LayoutEditorStyle,
  globalStyle: LayoutGlobalStyle,
};
