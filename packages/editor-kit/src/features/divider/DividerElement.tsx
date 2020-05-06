import React from "react";
import { RenderElementProps } from "slate-react";
import { ResizableElement } from "../elements/ResizableElement";

export const DividerElement = (props: RenderElementProps) => {
  const { attributes, element, children } = props;
  const borderTopWidth = element.size;
  return (
    <ResizableElement {...props}>
      <div className={`rek-divider`} style={{ borderTopWidth }} {...attributes}>
        {...children}
      </div>
    </ResizableElement>
  );
};
