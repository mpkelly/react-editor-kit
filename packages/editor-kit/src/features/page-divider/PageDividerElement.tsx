import React from "react";
import { RenderElementProps } from "slate-react";

export const PageDividerElement = (props: RenderElementProps) => {
  const { attributes, element, children } = props;

  return (
    <div
      {...attributes}
      style={{
        top: element.page * element.height,
      }}
      className="rek-page-divider"
    >
      {children}
    </div>
  );
};
