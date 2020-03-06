import React from "react";
import { RenderLeafProps } from "slate-react";

export const renderLeaf = (
  props: RenderLeafProps,
  leafType: string,
  rectType: string
): JSX.Element | undefined => {
  const { attributes, children, leaf } = props;
  if (leaf[leafType]) {
    return (
      <span {...attributes}>
        {React.createElement(rectType, null, children)}
      </span>
    );
  }
};
