import React from "react";
import { RenderElementProps } from "slate-react";

export const DividerElement = (props: RenderElementProps) => {
  const { attributes, element, children } = props;
  const borderTopWidth = element.size;
  return (
    <div className={`rek-divider`} style={{ borderTopWidth }} {...attributes}>
      {...children}
    </div>
  );
};
