import React, { CSSProperties } from "react";
import { Plugin } from "../../plugins/Plugin";
import { RenderLeafProps, RenderElementProps } from "slate-react";
import { PopupContentLayer } from "../../ui/Layers";
import { RgbaColor } from "./color/ColorPickerAction";

export interface StylePluginOptions {
  fontSizes: number[];
}

export interface Style extends Plugin {
  data: StylePluginOptions;
}

export const createStylePlugin = (): Plugin => {
  return {
    name: "styles",
    renderElement: (props: RenderElementProps) => {
      const { element, attributes, children } = props;
      if (element.type !== "styled-block") {
        return undefined;
      }
      const style: CSSProperties = {};
      if (element.textAlign) {
        style.textAlign = element.textAlign;
      }
      return (
        <div {...attributes} style={style}>
          {children}
        </div>
      );
    },
    renderLeaf: (props: RenderLeafProps) => {
      const { leaf, attributes, children } = props;
      const style: CSSProperties = {};
      if (leaf.fontSize) {
        style.fontSize = leaf.fontSize;
      }
      if (leaf.fontColor) {
        style.color = leaf.fontColor;
      }
      if (leaf.backgroundColor) {
        style.backgroundColor = leaf.backgroundColor;
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
    globalStyles: () => GlobalStyle,
  };
};

const GlobalStyle = `
.rek-font-size-select {
  width:60px;
}

.rek-font-size-select .rek-select-list {
  margin-top:24px;
  max-height:500px;
}

.rek-font-select input,
.rek-font-size-select input {
  border: none;
  background-color:rgba(0,0,0,0);
}

.rek-color-picker {
  display:flex;
}
.rek-color-picker-panel {
  display:flex;
  flex-direction:column;      
  padding:8px;
}

.rek-color-picker-panel:first-child {
  margin-right:4px;
}

.rek-color-picker-panel:last-child {
  margin-left:4px;
}

.rek-color-picker-row {
  display:flex;
}

.rek-color-picker-color {
  margin:3px;
  height:18px;
  width:18px;
  cursor:pointer;
  border: 1px solid transparent;
}

.rek-selected-color {
  border:1px solid var(--focus-color);
}

.compact-picker .flexbox-fix div,
.compact-picker .flexbox-fix div input {
  z-index:${PopupContentLayer};
  position:relative;
}
`;

export const StylePlugin: Plugin = createStylePlugin();
