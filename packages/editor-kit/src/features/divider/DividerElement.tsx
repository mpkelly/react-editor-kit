import React from "react";
import { RenderElementProps } from "slate-react";
import { DeletableBlock } from "../blocks/DeletableBlock";

export const DividerElement = (props: RenderElementProps) => {
  const { attributes, element, children } = props;
  const borderTopWidth = element.size;
  return (
    <DeletableBlock {...props}>
      <div className={`rek-divider`} style={{ borderTopWidth }} {...attributes}>
        {...children}
      </div>
    </DeletableBlock>
  );
};
