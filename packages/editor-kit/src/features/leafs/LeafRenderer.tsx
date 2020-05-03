import React from "react";
import { RenderLeafProps } from "slate-react";

export const renderLeaf = (
  props: RenderLeafProps,
  leafType: string,
  reactType: string
): JSX.Element | undefined => {
  const { attributes, children, leaf } = props;
  if (leaf[leafType]) {
    return (
      <span {...attributes}>
        {React.createElement(reactType, null, children)}
      </span>
    );
  }
};
