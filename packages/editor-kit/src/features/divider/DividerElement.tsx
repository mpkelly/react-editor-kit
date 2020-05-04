import React from "react";
import { RenderElementProps } from "slate-react";
import { DeletableElement } from "../elements/DeletableElement";

export const DividerElement = (props: RenderElementProps) => {
  const { attributes, element, children } = props;
  const borderTopWidth = element.size;
  return (
    <DeletableElement {...props}>
      <div className={`rek-divider`} style={{ borderTopWidth }} {...attributes}>
        {...children}
      </div>
    </DeletableElement>
  );
};
