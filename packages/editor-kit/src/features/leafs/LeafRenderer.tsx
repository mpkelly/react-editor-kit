import React, { memo, ReactNode } from "react";
import { RenderLeafProps } from "slate-react";

export const renderLeaf = (
  props: RenderLeafProps,
  leafType: string,
  reactType: string
): JSX.Element | undefined => {
  const { attributes, children, leaf } = props;
  if (leaf[leafType]) {
    return (
      <Leaf attributes={attributes}>
        {React.createElement(reactType, null, children)}
      </Leaf>
    );
  }
};

interface LeafProps {
  attributes: Object;
  children: ReactNode;
}

const Leaf = memo((props: LeafProps) => {
  const { attributes, children } = props;
  return <span {...attributes}>{children}</span>;
});
