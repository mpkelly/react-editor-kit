import React from "react";
import { RenderElementProps } from "slate-react";

export const LayoutCellElement = (props: RenderElementProps) => {
  const { attributes, element, children } = props;
  return (
    <div
      {...attributes}
      className="rek-layout-cell"
      style={{ width: `${element.width}%` }}
    >
      {children}
    </div>
  );
};
