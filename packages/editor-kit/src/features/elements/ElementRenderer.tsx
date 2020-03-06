import React from "react";
import { RenderElementProps } from "slate-react";

export const renderElement = (
  props: RenderElementProps,
  elementType: string,
  reactType: string
) => {
  const { children, attributes, element } = props;
  if (element.type === elementType) {
    return React.createElement(reactType, attributes, children);
  }
};
