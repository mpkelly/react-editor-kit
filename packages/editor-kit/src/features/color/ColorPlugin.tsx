import React, { CSSProperties } from "react";
import { Plugin } from "../../plugins/Plugin";
import { RenderLeafProps } from "slate-react";
import { ColorGlobalStyle } from "./ColorGlobalStyle";

export const ColorPlugin: Plugin = {
  name: "color",
  renderLeaf: (props: RenderLeafProps) => {
    const { leaf, attributes, children } = props;
    const style: CSSProperties = {};
    if (leaf.color) {
      style.color = leaf.color;
    }
    if (leaf.backgroundColor) {
      style.backgroundColor = leaf.backgroundColor;
    }
    if (Object.keys(style).length) {
      return (
        <span {...attributes} style={style}>
          {children}
        </span>
      );
    }
  },
  globalStyle: ColorGlobalStyle,
};
