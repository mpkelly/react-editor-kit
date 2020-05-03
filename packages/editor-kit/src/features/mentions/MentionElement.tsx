import React from "react";
import { RenderElementProps } from "slate-react";

export const MentionElement = (props: RenderElementProps) => {
  const { attributes, element, children } = props;
  return (
    <div
      {...attributes}
      contentEditable={false}
      className={"rek-mention"}
      data-id-mention={element.name}
    >
      @{element.value.name}
      {children}
    </div>
  );
};
