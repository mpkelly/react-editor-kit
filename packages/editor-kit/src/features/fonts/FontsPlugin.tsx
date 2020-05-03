import React, { CSSProperties } from "react";
import { Plugin } from "../../plugins/Plugin";
import { RenderLeafProps } from "slate-react";
import { FontGlobalStyle } from "./FontGlobalStyle";

export const FontsPlugin: Plugin = {
  name: "fonts",
  renderLeaf: (props: RenderLeafProps) => {
    const { leaf, attributes, children } = props;
    const style: CSSProperties = {};
    if (leaf.fontSize) {
      style.fontSize = leaf.fontSize;
    }
    if (leaf.fontFamily) {
      style.fontFamily = leaf.fontFamily;
    }
    if (Object.keys(style).length) {
      return (
        <span {...attributes} style={style}>
          {children}
        </span>
      );
    }
  },
  globalStyle: FontGlobalStyle,
};
