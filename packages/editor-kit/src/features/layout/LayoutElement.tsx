import React from "react";
import { RenderElementProps } from "slate-react";
import { DeletableElement } from "../elements/DeletableElement";

export const LayoutElement = (props: RenderElementProps) => {
  const { attributes, children } = props;
  return (
    <DeletableElement {...props}>
      <div className="rek-layout" {...attributes}>
        {children}
      </div>
    </DeletableElement>
  );
};
