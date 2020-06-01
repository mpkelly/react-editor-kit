import React from "react";
import { RenderElementProps } from "slate-react";
import { CSSProperties } from "styled-components";

export const LayoutCellElement = (props: RenderElementProps) => {
  const { attributes, element, children, ...rest } = props;
  let otherStyle: CSSProperties = (rest as any).style || {};
  return (
    <div
      {...attributes}
      className="rek-layout-cell"
      style={{ width: `${element.width}%`, ...otherStyle }}
    >
      {children}
    </div>
  );
};
